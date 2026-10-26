//! Silent offline end-to-end proof; writes fixtures, never opens an audio device.
use cassette_core::{audio, calibration, dsp};
fn verify_auto_stop(path: &std::path::Path) -> Result<(), String> {
    let mut pcm = audio::decode(path)?;
    let original_duration = pcm.samples.len() as f64 / 2. / pcm.rate as f64;
    // A manually stopped capture may omit part of the trailing silence.
    // Extend only the in-memory verification input, never the user's file.
    pcm.samples.extend(vec![0.; pcm.rate as usize * 2 * 2]);
    let mut detector = calibration::CaptureAutoStop::new(pcm.rate);
    let chunk = (pcm.rate as usize * 8 / 100) * 2;
    let mut consumed = 0;
    for block in pcm.samples.chunks(chunk) {
        consumed += block.len();
        if detector.push(block) {
            let duration = consumed as f64 / 2. / pcm.rate as f64;
            pcm.samples.truncate(consumed);
            let report = calibration::analyze(&pcm, "autostop-verification".into())?;
            println!("Recorded input: {original_duration:.3} s; automatic stop: {duration:.3} s; padding used: {}; both markers preserved; analysis confidence: {:.3}; no audio played", duration > original_duration, report.sync_confidence);
            return Ok(());
        }
    }
    Err("Auto-stop did not recognize a complete calibration sequence".into())
}
fn main() -> Result<(), String> {
    if std::env::args().nth(1).as_deref() == Some("--extended") {
        let path = std::env::args().nth(2).ok_or("Pass a report output path")?;
        let report = calibration::analyze(
            &calibration::signal_extended(44100),
            "extended-ideal.wav".into(),
        )?;
        report.validate()?;
        std::fs::write(
            path,
            serde_json::to_string_pretty(&report).map_err(|e| e.to_string())?,
        )
        .map_err(|e| e.to_string())?;
        println!(
            "Extended report v{} generated offline; no audio played",
            report.protocol
        );
        return Ok(());
    }
    if std::env::args().nth(1).as_deref() == Some("--autostop") {
        let path = std::env::args()
            .nth(2)
            .ok_or("Pass a calibration capture path")?;
        return verify_auto_stop(std::path::Path::new(&path));
    }
    let dir = std::path::PathBuf::from(
        std::env::args()
            .nth(1)
            .unwrap_or_else(|| "/tmp/cassette-calibration-check".into()),
    );
    std::fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
    let signal = dir.join("calibration-v2.wav");
    calibration::write_signal(&signal, 48000)?;
    let report = calibration::analyze_file(&signal)?;
    assert!(report.correction_allowed);
    assert!(report
        .bands
        .iter()
        .all(|b| b.response_db.iter().all(|v| v.abs() < 0.1)));
    std::fs::write(
        dir.join("ideal-report.json"),
        serde_json::to_string_pretty(&report).unwrap(),
    )
    .map_err(|e| e.to_string())?;
    let pcm = dsp::resample(audio::decode(&signal)?, 44100);
    let path = dir.join("return-44100.wav");
    let mut w = hound::WavWriter::create(
        &path,
        hound::WavSpec {
            channels: 2,
            sample_rate: 44100,
            bits_per_sample: 16,
            sample_format: hound::SampleFormat::Int,
        },
    )
    .map_err(|e| e.to_string())?;
    for x in pcm.samples {
        w.write_sample((x * 0.5 * 32767.).round() as i16)
            .map_err(|e| e.to_string())?;
    }
    w.finalize().map_err(|e| e.to_string())?;
    let converted = calibration::analyze_file(&path)?;
    assert!(converted.correction_allowed);
    assert!((converted.time_scale - 1.).abs() < 0.0001);
    assert!((converted.bands[5].response_db[0]).abs() < 0.01);
    std::fs::write(
        dir.join("44100-report.json"),
        serde_json::to_string_pretty(&converted).unwrap(),
    )
    .map_err(|e| e.to_string())?;
    println!(
        "Protocol v{}: {} s, 10 bands, 7 levels; PCM24/48k and PCM16/44.1k passed; no sound played",
        report.protocol, report.duration
    );
    Ok(())
}
