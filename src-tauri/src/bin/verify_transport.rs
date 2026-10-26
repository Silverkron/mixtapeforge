//! Real output-device transport check using silence, without playing user media.
use cassette_core::device;
use std::{
    sync::{
        atomic::{AtomicU64, Ordering},
        mpsc, Arc,
    },
    thread,
    time::{Duration, Instant},
};

fn wait_for(mut predicate: impl FnMut() -> bool) {
    let deadline = Instant::now() + Duration::from_secs(3);
    while !predicate() {
        assert!(Instant::now() < deadline, "audio position did not advance");
        thread::sleep(Duration::from_millis(10));
    }
}

#[cfg(target_os = "macos")]
fn check_power(active: bool) {
    let output = std::process::Command::new("/usr/bin/pmset")
        .args(["-g", "assertions"])
        .output()
        .expect("read power assertions");
    assert!(output.status.success());
    let assertions = String::from_utf8_lossy(&output.stdout);
    let owner = format!("pid {}(", std::process::id());
    let lines: Vec<_> = assertions
        .lines()
        .filter(|line| {
            line.contains(&owner) && line.contains("MixtapeForge: uscita audio verso il deck")
        })
        .collect();
    if active {
        assert!(lines
            .iter()
            .any(|line| line.contains("PreventUserIdleDisplaySleep")));
        assert!(lines
            .iter()
            .any(|line| line.contains("PreventUserIdleSystemSleep")));
    } else {
        assert!(
            lines.is_empty(),
            "power assertion remains after output stopped"
        );
    }
}

#[cfg(not(target_os = "macos"))]
fn check_power(_: bool) {}

fn main() -> Result<(), String> {
    let devices = device::list(false)?;
    let output = devices.first().ok_or("No output device available")?;
    let path = std::env::temp_dir().join(format!("cassette-transport-{}.wav", std::process::id()));
    let result = (|| {
        let mut writer = hound::WavWriter::create(
            &path,
            hound::WavSpec {
                channels: 2,
                sample_rate: output.rate,
                bits_per_sample: 32,
                sample_format: hound::SampleFormat::Float,
            },
        )
        .map_err(|e| e.to_string())?;
        for _ in 0..output.rate * 8 * 2 {
            writer.write_sample(0f32).map_err(|e| e.to_string())?;
        }
        writer.finalize().map_err(|e| e.to_string())?;
        let position = Arc::new(AtomicU64::new(0));
        let callback_position = position.clone();
        let (tx, rx) = mpsc::channel();
        let mut running = device::play(
            path.clone(),
            output.index,
            0.,
            None,
            move |t| {
                callback_position.store((t.elapsed * 1_000_000.) as u64, Ordering::Relaxed);
            },
            move |result| {
                let _ = tx.send(result);
            },
        );
        wait_for(|| position.load(Ordering::Relaxed) >= 300_000);
        check_power(true);
        running.paused.store(true, Ordering::Relaxed);
        // Allow the last pre-pause telemetry batch to arrive.
        thread::sleep(Duration::from_millis(150));
        let paused_at = position.load(Ordering::Relaxed);
        check_power(true);
        thread::sleep(Duration::from_millis(250));
        assert_eq!(
            position.load(Ordering::Relaxed),
            paused_at,
            "position moved during pause"
        );
        running.paused.store(false, Ordering::Relaxed);
        wait_for(|| position.load(Ordering::Relaxed) > paused_at + 100_000);
        let started = Instant::now();
        running.stop();
        let elapsed = started.elapsed();
        assert!(
            elapsed < Duration::from_millis(500),
            "stop took {elapsed:?}"
        );
        rx.recv_timeout(Duration::from_secs(1))
            .map_err(|e| e.to_string())??;
        check_power(false);
        println!(
            "Device: {}. Pause position stable at {:.3}s; resume advanced; stop closed in {:.1}ms.",
            output.name,
            paused_at as f64 / 1_000_000.,
            elapsed.as_secs_f64() * 1000.
        );
        let (end_tx, end_rx) = mpsc::channel();
        let mut ending = device::play(
            path.clone(),
            output.index,
            0.,
            Some(0.3),
            |_| {},
            move |r| {
                let _ = end_tx.send(r);
            },
        );
        end_rx
            .recv_timeout(Duration::from_secs(3))
            .map_err(|e| e.to_string())??;
        ending.stop();
        check_power(false);
        println!("Power assertions verified during output and pause, released after Stop and natural end.");
        Ok(())
    })();
    let _ = std::fs::remove_file(path);
    result
}
