//! Emits a one-second reference at -30 dBFS to verify the native output pipeline.
use cassette_core::{device, render};
use std::{
    path::PathBuf,
    sync::{mpsc, Arc, Mutex},
    time::Duration,
};
fn main() -> Result<(), String> {
    let folder = PathBuf::from("test-results/audio");
    std::fs::create_dir_all(&folder).map_err(|e| e.to_string())?;
    let path = folder.join("playback-check.wav");
    render::tone(&path, 48000, 400.0, -30.0, 1.0, "sine")?;
    let devices = device::list(false)?;
    let selected = devices.first().ok_or("Nessuna uscita disponibile")?;
    let (tx, rx) = mpsc::channel();
    let readings = Arc::new(Mutex::new(Vec::new()));
    let values = readings.clone();
    let mut running = device::play(
        path,
        selected.index,
        0.0,
        None,
        move |t| values.lock().unwrap().push(t),
        move |r| {
            let _ = tx.send(r);
        },
    );
    rx.recv_timeout(Duration::from_secs(8))
        .map_err(|e| e.to_string())??;
    running.stop();
    let readings = readings.lock().unwrap();
    let max = readings.iter().map(|t| t.peak[0]).fold(-180f64, f64::max);
    let underruns = readings.iter().map(|t| t.underruns).max().unwrap_or(0);
    assert!(!readings.is_empty());
    assert!((max + 30.0).abs() < 0.2);
    assert_eq!(underruns, 0);
    println!(
        "PASS native output on {}: {} telemetry frames, {:.2} dBFS, zero underruns",
        selected.name,
        readings.len(),
        max
    );
    Ok(())
}
