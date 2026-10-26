//! Plays five seconds of an existing master on an explicitly named output.
use cassette_core::device;
use std::{path::PathBuf, sync::mpsc, time::Duration};

fn main() -> Result<(), String> {
    let args: Vec<_> = std::env::args().collect();
    if args.len() != 3 {
        return Err("Usage: check_output <master.wav> <device name>; plays 5 seconds".into());
    }
    let output = device::list(false)?
        .into_iter()
        .find(|d| d.name == args[2])
        .ok_or("Named output not available")?;
    let (tx, rx) = mpsc::channel();
    let mut running = device::play(
        PathBuf::from(&args[1]),
        output.index,
        5.,
        Some(5.),
        |t| {
            println!(
                "{:.3}s L {:.1} dBFS R {:.1} dBFS, underruns {}",
                t.elapsed, t.peak[0], t.peak[1], t.underruns
            )
        },
        move |result| {
            let _ = tx.send(result);
        },
    );
    let result = rx
        .recv_timeout(Duration::from_secs(10))
        .map_err(|e| e.to_string());
    running.stop();
    result??;
    Ok(())
}
