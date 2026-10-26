//! Real installed-plugin test, deliberately separate from portable unit tests.
use cassette_core::{
    audio,
    model::Project,
    render,
    vst::{self, VstEffect},
};
use std::{path::PathBuf, sync::atomic::AtomicBool};
fn main() -> Result<(), String> {
    let plugin = std::env::args()
        .nth(1)
        .ok_or("Pass the installed ValhallaFreqEcho.vst3 path")?;
    let dir = PathBuf::from("test-results/vst");
    std::fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
    let source = dir.join("impulse.wav");
    let spec = hound::WavSpec {
        channels: 2,
        sample_rate: 48000,
        bits_per_sample: 32,
        sample_format: hound::SampleFormat::Float,
    };
    let mut w = hound::WavWriter::create(&source, spec).map_err(|e| e.to_string())?;
    for frame in 0..48000 {
        for channel in 0..2 {
            w.write_sample(if frame == 4800 && channel == 0 {
                0.25f32
            } else {
                0.0
            })
            .map_err(|e| e.to_string())?;
        }
    }
    w.finalize().map_err(|e| e.to_string())?;
    let d = vst::inspect(&plugin)?;
    if d["name"] != "ValhallaFreqEcho" {
        return Err("This proof expects ValhallaFreqEcho".into());
    }
    let params = d["parameters"].as_array().unwrap();
    let mut values: Vec<f32> = params
        .iter()
        .map(|v| v["value"].as_f64().unwrap() as f32)
        .collect();
    for (i, p) in params.iter().enumerate() {
        match p["name"].as_str().unwrap() {
            "wetDry" => values[i] = 1.0,
            "delay" => values[i] = 0.5,
            "feedback" => values[i] = 0.35,
            "sync" => values[i] = 0.0,
            "lowCut" => values[i] = 0.0,
            "highCut" => values[i] = 1.0,
            _ => {}
        }
    }
    let effect = VstEffect {
        enabled: true,
        path: plugin,
        name: d["name"].as_str().unwrap().into(),
        uid: d["uid"].as_str().unwrap().into(),
        parameters: values,
        tail_seconds: 2.0,
    };
    let t = audio::import(&source)?;
    let mut p = Project {
        leader: 0.0,
        trailer: 0.0,
        margin: 0.0,
        ..Default::default()
    };
    p.processing.normalize = "off".into();
    p.processing.vst = Some(effect);
    p.sides[0].push(t.id.clone());
    p.tracks.push(t);
    let wet = dir.join("delay-master.wav");
    let r = render::render(&p, 0, &wet, 32, &AtomicBool::new(false), |_, _| {})?;
    assert_eq!(r.frames, 144000);
    assert_eq!(p.side_duration(0), 3.0);
    let pcm = audio::decode(&wet)?;
    let (peak_frame, peak) = pcm
        .samples
        .chunks_exact(2)
        .enumerate()
        .max_by(|a, b| a.1[0].abs().partial_cmp(&b.1[0].abs()).unwrap())
        .unwrap();
    assert!(
        peak_frame > 4800 + 100,
        "No measurable delay: peak at {peak_frame}"
    );
    assert!(peak[0].abs() > 0.01, "No wet signal");
    assert!(
        pcm.samples[9600].abs() < 0.001,
        "Dry impulse leaked into 100% wet"
    );
    assert!(pcm.samples.iter().all(|v| v.is_finite()));
    assert!(r.true_peak <= p.processing.ceiling + 0.02);
    println!(
        "PASS actual VST3: delayed impulse {:.2} ms, {} frames, true peak {:.2} dBTP",
        (peak_frame - 4800) as f64 / 48.0,
        r.frames,
        r.true_peak
    );
    let serialized = serde_json::to_string_pretty(&p).unwrap();
    std::fs::write(dir.join("delay-project.cassette.json"), &serialized).unwrap();
    let restored: Project = serde_json::from_str(&serialized).unwrap();
    let repeated = dir.join("delay-reloaded.wav");
    render::render(
        &restored,
        0,
        &repeated,
        32,
        &AtomicBool::new(false),
        |_, _| {},
    )?;
    let repeated = audio::decode(&repeated)?;
    assert_eq!(
        restored.processing.vst.as_ref().unwrap().parameters,
        p.processing.vst.as_ref().unwrap().parameters
    );
    let error = repeated
        .samples
        .iter()
        .zip(&pcm.samples)
        .map(|(a, b)| (a - b).abs())
        .fold(0f32, f32::max);
    assert!(
        error < 0.001,
        "Repeated effect differs beyond plugin noise: {error}"
    );
    println!("PASS reload: identical parameters, max audio difference {error:.7} (plugin noise)");
    p.processing.vst.as_mut().unwrap().enabled = false;
    let dry = dir.join("bypass-master.wav");
    let dry_r = render::render(&p, 0, &dry, 32, &AtomicBool::new(false), |_, _| {})?;
    assert_eq!(dry_r.frames, 48000);
    let dry = audio::decode(&dry)?;
    assert!((dry.samples[9600] - 0.25).abs() < 1e-6);
    p.processing.vst.as_mut().unwrap().enabled = true;
    let cancelled = dir.join("cancelled.wav");
    assert!(render::render(&p, 0, &cancelled, 32, &AtomicBool::new(true), |_, _| {}).is_err());
    assert!(!cancelled.exists());
    p.processing.vst.as_mut().unwrap().path = "/missing/Effect.vst3".into();
    let missing = dir.join("missing.wav");
    assert!(render::render(&p, 0, &missing, 32, &AtomicBool::new(false), |_, _| {}).is_err());
    assert!(!missing.exists());
    println!(
        "PASS saved parameters/reload, bypass, tail duration, cancellation and missing plugin"
    );
    Ok(())
}
