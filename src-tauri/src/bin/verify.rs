//! Reproducible offline integration proof; no deck or audio output is required.
use cassette_core::{
    artwork, audio,
    model::{fit, Project},
    render,
};
use std::{path::PathBuf, sync::atomic::AtomicBool};
fn main() -> Result<(), String> {
    let dir = std::env::args()
        .nth(1)
        .map(PathBuf::from)
        .unwrap_or_else(|| PathBuf::from("test-results/audio"));
    std::fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
    let mut p = Project {
        title: "Verification mix".into(),
        leader: 0.25,
        trailer: 0.5,
        margin: 0.0,
        ..Default::default()
    };
    for (i, rate) in [44100, 48000].into_iter().enumerate() {
        let file = dir.join(format!("source-{i}.wav"));
        render::tone(
            &file,
            rate,
            if i == 0 { 400.0 } else { 1000.0 },
            -12.0,
            3.0,
            "sine",
        )?;
        let mut t = audio::import(&file)?;
        t.gap = 0.75;
        t.fade_in = 0.05;
        t.fade_out = 0.1;
        p.sides[0].push(t.id.clone());
        p.tracks.push(t)
    }
    p.validate()?;
    for (bits, name, crossfade) in [
        (32, "float", 0.0),
        (16, "pcm16", 0.0),
        (24, "pcm24", 0.0),
        (32, "crossfade", 0.4),
    ] {
        p.processing.crossfade = crossfade;
        let output = dir.join(format!("{name}.wav"));
        let r = render::render(&p, 0, &output, bits, &AtomicBool::new(false), |_, _| {})?;
        let expected = (p.side_duration(0) * 48000.0).round() as i64;
        assert!(
            (r.frames as i64 - expected).abs() <= 2,
            "duration mismatch {name}: {} vs {expected}",
            r.frames
        );
        let decoded = audio::decode(&output)?;
        let a = audio::analyze(&decoded)?;
        assert!(a.peak <= -2.9, "peak ceiling violated: {}", a.peak);
        assert!(
            a.true_peak <= p.processing.ceiling + 0.02,
            "final true peak exceeded ceiling"
        );
        assert!(a.lufs.is_some());
        assert_eq!(decoded.samples.len() / 2, r.frames as usize);
        println!(
            "PASS {name}: {} frames, peak {:.3} dBFS, loudness {:.2} LUFS",
            r.frames,
            a.peak,
            a.lufs.unwrap()
        );
    }
    let aborted = dir.join("cancelled.wav");
    assert!(render::render(&p, 0, &aborted, 16, &AtomicBool::new(true), |_, _| {}).is_err());
    assert!(!aborted.exists());
    assert!(!aborted.with_extension("partial.wav").exists());
    let balanced = fit(&p, true)?;
    assert!(balanced.sides[0].len() == 1 && balanced.sides[1].len() == 1);
    p.capacity = [10.0, 10.0];
    p.leader = 10.0;
    assert!(fit(&p, true).is_err());
    let json = serde_json::to_vec_pretty(&balanced).map_err(|e| e.to_string())?;
    let restored: Project = serde_json::from_slice(&json).map_err(|e| e.to_string())?;
    restored.validate()?;
    std::fs::write(dir.join("project.json"), json).map_err(|e| e.to_string())?;
    std::fs::write(dir.join("jcard.svg"), artwork::svg(&balanced)).map_err(|e| e.to_string())?;
    std::fs::write(dir.join("jcard.pdf"), artwork::pdf(&balanced)).map_err(|e| e.to_string())?;
    let folder = dir.join(format!(
        "portable-{}",
        std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_nanos()
    ));
    cassette_core::storage::collect(&balanced, &folder)?;
    let portable = cassette_core::storage::load(&folder.join("project.cassette.json"))?;
    assert!(portable
        .tracks
        .iter()
        .all(|t| std::path::Path::new(&t.path).exists()));
    for normalization in ["lufs", "vu", "quasi", "rms", "album"] {
        let mut configured = balanced.clone();
        configured.processing.normalize = normalization.into();
        let r = render::render(
            &configured,
            0,
            &dir.join(format!("mode-{normalization}.wav")),
            32,
            &AtomicBool::new(false),
            |_, _| {},
        )?;
        assert!(r.true_peak <= configured.processing.ceiling + 0.001);
    }
    for dynamics in ["compress", "expand", "alc", "fit"] {
        let mut configured = balanced.clone();
        configured.processing.dynamics = dynamics.into();
        configured.processing.eq = "70to120".into();
        configured.processing.eq_enabled = true;
        configured.processing.eq_bands = [6.0; 10];
        configured.processing.makeup_db = 6.0;
        let r = render::render(
            &configured,
            0,
            &dir.join(format!("dynamics-{dynamics}.wav")),
            24,
            &AtomicBool::new(false),
            |_, _| {},
        )?;
        assert!(r.true_peak <= configured.processing.ceiling + 0.001);
    }
    let mut nr = balanced.clone();
    nr.processing.nr = "type_b".into();
    nr.processing.eq_enabled = true;
    nr.processing.eq_bands = [3.0; 10];
    for bits in [16, 24, 32] {
        let file = dir.join(format!("nr-type-b-{bits}.wav"));
        let result = render::render(&nr, 0, &file, bits, &AtomicBool::new(false), |_, _| {})?;
        let measured = audio::analyze(&audio::decode(&file)?)?;
        assert!(measured.true_peak <= nr.processing.ceiling + 0.01);
        assert_eq!(result.nr, "type_b");
        assert_eq!(result.nr_reference, nr.processing.nr_reference);
        assert_eq!(result.clipped, 0);
        assert!((result.true_peak - measured.true_peak).abs() < 0.02);
        assert!((result.duration - nr.side_duration(0)).abs() < 0.001);
        println!(
            "PASS NR PCM{bits}: true peak {:.3}, pre-encoding attenuation {:.3}",
            measured.true_peak, result.attenuation
        );
    }
    let nr_json = serde_json::to_vec_pretty(&nr).map_err(|e| e.to_string())?;
    let restored_nr: Project = serde_json::from_slice(&nr_json).map_err(|e| e.to_string())?;
    restored_nr.validate()?;
    assert_eq!(restored_nr.processing.nr, "type_b");
    assert!(artwork::tracklist(&nr).contains("Type B"));
    assert!(artwork::svg(&nr).contains("NR TYPE B"));
    // PDF cover text is outlined with the bundled fonts. Check its source scene.
    assert!(artwork::scene(&nr)
        .iter()
        .any(|node| matches!(node, artwork::Node::Text { text, .. } if text == "NR TYPE B")));
    let cancellation = AtomicBool::new(false);
    let cancelled_nr = dir.join("cancelled-nr.wav");
    assert!(
        render::render(&nr, 0, &cancelled_nr, 32, &cancellation, |_, label| {
            if label.contains("Codifica NR") {
                cancellation.store(true, std::sync::atomic::Ordering::SeqCst);
            }
        })
        .is_err()
    );
    assert!(!cancelled_nr.exists());
    for ext in [
        "premaster.partial.wav",
        "output.partial.wav",
        "nr.partial.wav",
        "nr-encoded.partial.wav",
    ] {
        assert!(!cancelled_nr.with_extension(ext).exists());
    }
    println!("PASS NR roundtrip project, labels, cancellation cleanup");
    let mut changed = balanced.clone();
    changed.tracks[0].hash = "changed".into();
    assert!(render::render(
        &changed,
        0,
        &dir.join("changed.wav"),
        32,
        &AtomicBool::new(false),
        |_, _| {}
    )
    .is_err());
    println!("PASS portable project relink, normalization modes, dynamics/EQ final true-peak ceiling, changed-source refusal");
    println!("PASS cancellation cleanup, fit/order, impossible fit, project roundtrip, PDF/SVG generation");
    Ok(())
}
