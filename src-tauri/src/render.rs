use crate::{
    audio::{amp, db, decode, hash_file},
    dsp::process,
    model::Project,
};
use ebur128::{EbuR128, Mode};
use hound::{SampleFormat, WavSpec, WavWriter};
use std::{
    path::{Path, PathBuf},
    sync::atomic::{AtomicBool, Ordering},
};
#[derive(Clone, serde::Serialize)]
pub struct RenderResult {
    pub path: String,
    pub frames: u64,
    pub duration: f64,
    pub peak: f64,
    pub true_peak: f64,
    pub attenuation: f64,
    pub clipped: u64,
    pub nr: String,
    pub nr_reference: f64,
}
struct Temporary(Vec<PathBuf>);
impl Drop for Temporary {
    fn drop(&mut self) {
        for path in &self.0 {
            let _ = std::fs::remove_file(path);
        }
    }
}
fn check(cancel: &AtomicBool) -> Result<(), String> {
    if cancel.load(Ordering::Relaxed) {
        Err("Operazione annullata".into())
    } else {
        Ok(())
    }
}
pub fn render(
    p: &Project,
    side: usize,
    path: &Path,
    bits: u16,
    cancel: &AtomicBool,
    progress: impl Fn(f64, &str),
) -> Result<RenderResult, String> {
    p.validate()?;
    if side > 1 {
        return Err("Lato non valido".into());
    }
    if p.sides[side].is_empty() {
        return Err("Questo lato è vuoto".into());
    }
    if p.side_duration(side) > p.capacity[side] - p.margin {
        return Err("Il programma supera la capacità utilizzabile del lato".into());
    }
    if ![16, 24, 32].contains(&bits) {
        return Err("Profondità WAV non supportata".into());
    }
    let rate = p.processing.sample_rate;
    // Both the intermediate and final file must fit RIFF, regardless of final bit depth.
    if p.side_duration(side) * rate as f64 * 8.0 > u32::MAX as f64 - 1024.0 {
        return Err("Il master intermedio supera il limite RIFF di 4 GiB. Riduci frequenza o durata del lato.".into());
    }
    check(cancel)?;
    let temp = path.with_extension("premaster.partial.wav");
    let final_temp = path.with_extension("output.partial.wav");
    let encoded_temp = path.with_extension("nr.partial.wav");
    let vst_temp = path.with_extension("vst.partial.wav");
    let nr_output = path.with_extension("nr-encoded.partial.wav");
    let _cleanup = Temporary(vec![
        temp.clone(),
        final_temp.clone(),
        encoded_temp.clone(),
        vst_temp.clone(),
        nr_output.clone(),
    ]);
    let mut writer = WavWriter::create(
        &temp,
        WavSpec {
            channels: 2,
            sample_rate: rate,
            bits_per_sample: 32,
            sample_format: SampleFormat::Float,
        },
    )
    .map_err(|e| e.to_string())?;
    let mut count = 0u64;
    {
        let mut write = |samples: &[f32]| -> Result<(), String> {
            check(cancel)?;
            for &v in samples {
                if !v.is_finite() {
                    return Err("Il DSP ha prodotto un campione non finito".into());
                }
                writer.write_sample(v).map_err(|e| e.to_string())?;
                count += 1
            }
            Ok(())
        };
        let zeros = vec![0.0; rate as usize * 2];
        let silence = |secs: f64,
                       write: &mut dyn FnMut(&[f32]) -> Result<(), String>|
         -> Result<(), String> {
            let mut left = (secs * rate as f64).round() as usize * 2;
            while left > 0 {
                let n = left.min(zeros.len());
                write(&zeros[..n])?;
                left -= n
            }
            Ok(())
        };
        silence(p.leader, &mut write)?;
        let mut tail: Vec<f32> = vec![];
        for (i, id) in p.sides[side].iter().enumerate() {
            check(cancel)?;
            let t = p.track(id).ok_or("Traccia mancante")?;
            progress(i as f64 / p.sides[side].len() as f64 * 0.8, &t.title);
            if hash_file(Path::new(&t.path))
                .map_err(|e| format!("Sorgente non disponibile: {}. Usa Ricollega. {e}", t.title))?
                != t.hash
            {
                return Err(format!(
                    "La sorgente è cambiata: {}. Ricollega il file per analizzarlo di nuovo.",
                    t.title
                ));
            }
            let mut pcm = process(decode(Path::new(&t.path))?, t, p);
            if !tail.is_empty() {
                let n = tail.len().min(pcm.samples.len());
                for j in (0..n).step_by(2) {
                    let x = j as f32 / n as f32;
                    for c in 0..2 {
                        tail[j + c] = tail[j + c] * (1.0 - x) + pcm.samples[j + c] * x;
                    }
                }
                write(&tail)?;
                pcm.samples.drain(..n);
            }
            let overlap = if let Some(next) = p.sides[side].get(i + 1).and_then(|v| p.track(v)) {
                (p.processing
                    .crossfade
                    .min(t.length() / 2.0)
                    .min(next.length() / 2.0)
                    * rate as f64)
                    .round() as usize
                    * 2
            } else {
                0
            };
            let split = pcm.samples.len().saturating_sub(overlap);
            write(&pcm.samples[..split])?;
            tail = pcm.samples[split..].to_vec();
            if i + 1 < p.sides[side].len() && p.processing.crossfade == 0.0 {
                silence(t.gap, &mut write)?
            }
        }
        if !tail.is_empty() {
            write(&tail)?
        }
        silence(p.trailer, &mut write)?;
    }
    writer.finalize().map_err(|e| e.to_string())?;
    if let Some(effect) = p.processing.vst.as_ref().filter(|v| v.enabled) {
        progress(0.81, "Elaborazione VST3 del master…");
        crate::vst::transform(effect, &temp, &vst_temp, rate, cancel)?;
        std::fs::copy(&vst_temp, &temp).map_err(|e| e.to_string())?;
        count = hound::WavReader::open(&temp)
            .map_err(|e| e.to_string())?
            .len() as u64;
    }
    let profile = p
        .recording_profile
        .as_ref()
        .filter(|_| p.processing.use_drive_limits);
    let mut channel_gain = p.processing.channel_gain_db.map(amp);
    progress(0.84, "Verifico il true peak dopo tutti i processori…");
    let mut meter = EbuR128::new(2, rate, Mode::TRUE_PEAK).map_err(|e| e.to_string())?;
    let mut profile_guard = crate::recording_profile::LevelGuard::new(profile, rate)?;
    let mut reader = hound::WavReader::open(&temp).map_err(|e| e.to_string())?;
    let mut block = Vec::with_capacity(8192);
    for (i, sample) in reader.samples::<f32>().enumerate() {
        block.push((sample.map_err(|e| e.to_string())? as f64 * channel_gain[i % 2]) as f32);
        if block.len() == 8192 {
            check(cancel)?;
            meter.add_frames_f32(&block).map_err(|e| e.to_string())?;
            profile_guard.push(&block)?;
            block.clear()
        }
    }
    if !block.is_empty() {
        meter.add_frames_f32(&block).map_err(|e| e.to_string())?;
        profile_guard.push(&block)?;
    }
    let mut true_peak = (0..2)
        .filter_map(|c| meter.true_peak(c).ok())
        .fold(0f64, f64::max);
    let peak_gain = amp(p.processing.ceiling) / true_peak.max(1e-12);
    // Apply the deck level after normalization so even quiet material follows it.
    // The true-peak check and the optional profile guard can only lower it further.
    let requested_gain = amp(p.processing.ceiling - p.processing.premaster_ceiling());
    let mut gain = requested_gain.min(peak_gain).min(profile_guard.gain());
    let mut attenuation = db(gain);
    let mut final_source = temp.clone();
    if p.processing.nr == "type_b" {
        progress(0.86, "Codifica NR Type B dell’intero lato…");
        // Try at the requested level first. Every retry starts from the untouched
        // premaster and a fresh codec; never correct gain after NR encoding.
        let ceiling = amp(p.processing.ceiling);
        let mut pre_gain = gain.min(amp(-0.1) / true_peak.max(1e-12));
        let mut complete = false;
        for attempt in 0..8 {
            check(cancel)?;
            let mut reader = hound::WavReader::open(&temp).map_err(|e| e.to_string())?;
            let mut writer =
                WavWriter::create(&encoded_temp, reader.spec()).map_err(|e| e.to_string())?;
            for (i, sample) in reader.samples::<f32>().enumerate() {
                if i % 8192 == 0 {
                    check(cancel)?;
                }
                writer
                    .write_sample(
                        (sample.map_err(|e| e.to_string())? as f64 * channel_gain[i % 2] * pre_gain)
                            as f32,
                    )
                    .map_err(|e| e.to_string())?;
            }
            writer.finalize().map_err(|e| e.to_string())?;
            match crate::nr::transform_attempt(
                &encoded_temp,
                &nr_output,
                p.processing.nr_reference,
                false,
                cancel,
            )? {
                crate::nr::TransformOutcome::Clipped => {
                    pre_gain *= amp(-3.0);
                    progress(
                        0.87 + attempt as f64 * 0.005,
                        "Adatto il livello prima dell’encoder NR…",
                    );
                    continue;
                }
                crate::nr::TransformOutcome::Complete => {}
            }
            let mut nr_meter = EbuR128::new(2, rate, Mode::TRUE_PEAK).map_err(|e| e.to_string())?;
            let mut nr_guard = crate::recording_profile::LevelGuard::new(profile, rate)?;
            let mut reader = hound::WavReader::open(&nr_output).map_err(|e| e.to_string())?;
            let mut block = Vec::with_capacity(8192);
            for sample in reader.samples::<f32>() {
                let v = sample.map_err(|e| e.to_string())?;
                if !v.is_finite() {
                    return Err("Campione NR non finito".into());
                }
                block.push(v);
                if block.len() == 8192 {
                    check(cancel)?;
                    nr_meter.add_frames_f32(&block).map_err(|e| e.to_string())?;
                    nr_guard.push(&block)?;
                    block.clear();
                }
            }
            if !block.is_empty() {
                nr_meter.add_frames_f32(&block).map_err(|e| e.to_string())?;
                nr_guard.push(&block)?;
            }
            true_peak = (0..2)
                .map(|c| nr_meter.true_peak(c).map_err(|e| e.to_string()))
                .collect::<Result<Vec<_>, _>>()?
                .into_iter()
                .fold(0.0, f64::max);
            if true_peak <= ceiling && nr_guard.gain() >= 1.0 - 1e-6 {
                complete = true;
                break;
            }
            pre_gain *= (ceiling / true_peak).min(nr_guard.gain()).min(amp(-0.1)) * amp(-0.05);
            progress(
                0.87 + attempt as f64 * 0.005,
                "Adatto il livello ai picchi e al profilo dopo NR…",
            );
        }
        if !complete {
            return Err("Impossibile rispettare i limiti di picco e del profilo dopo otto tentativi NR. Riduci il livello prima della codifica; il riferimento NR è rimasto invariato.".into());
        }
        attenuation = db(pre_gain);
        gain = 1.0;
        channel_gain = [1.0; 2];
        final_source = nr_output.clone();
    }
    progress(0.94, "Scrittura del master e quantizzazione finale…");
    let mut writer = WavWriter::create(
        &final_temp,
        WavSpec {
            channels: 2,
            sample_rate: rate,
            bits_per_sample: bits,
            sample_format: if bits == 32 {
                SampleFormat::Float
            } else {
                SampleFormat::Int
            },
        },
    )
    .map_err(|e| e.to_string())?;
    let mut reader = hound::WavReader::open(&final_source).map_err(|e| e.to_string())?;
    let mut rng = 0x12345678u32;
    let mut peak = 0f64;
    let mut clipped = 0u64;
    for (i, sample) in reader.samples::<f32>().enumerate() {
        if i % 8192 == 0 {
            check(cancel)?
        }
        let v = sample.map_err(|e| e.to_string())? as f64 * channel_gain[i % 2] * gain;
        peak = peak.max(v.abs());
        if v.abs() > 1.0 {
            clipped += 1
        }
        if bits == 32 {
            writer.write_sample(v as f32).map_err(|e| e.to_string())?
        } else {
            rng ^= rng << 13;
            rng ^= rng >> 17;
            rng ^= rng << 5;
            let a = rng as f64 / u32::MAX as f64;
            rng ^= rng << 13;
            rng ^= rng >> 17;
            rng ^= rng << 5;
            let b = rng as f64 / u32::MAX as f64;
            let scale = if bits == 16 { 32768.0 } else { 8388608.0 };
            let n = (v * scale + a - b).round().clamp(-scale, scale - 1.0) as i32;
            if bits == 16 {
                writer.write_sample(n as i16).map_err(|e| e.to_string())?
            } else {
                writer.write_sample(n).map_err(|e| e.to_string())?
            }
        }
    }
    writer.finalize().map_err(|e| e.to_string())?;
    check(cancel)?;
    std::fs::rename(&final_temp, path).map_err(|e| e.to_string())?;
    progress(1.0, "Master pronto");
    Ok(RenderResult {
        path: path.to_string_lossy().into(),
        frames: count / 2,
        duration: count as f64 / 2.0 / rate as f64,
        peak: db(peak),
        true_peak: db(true_peak * gain),
        attenuation,
        nr: p.processing.nr.clone(),
        nr_reference: p.processing.nr_reference,
        clipped,
    })
}
pub fn tone(
    path: &Path,
    rate: u32,
    frequency: f64,
    level: f64,
    seconds: f64,
    kind: &str,
) -> Result<(), String> {
    if !(20.0..=20000.0).contains(&frequency)
        || !(-60.0..=0.0).contains(&level)
        || !(0.1..=30.0).contains(&seconds)
    {
        return Err("Parametri del tono fuori intervallo".into());
    }
    let mut writer = WavWriter::create(
        path,
        WavSpec {
            channels: 2,
            sample_rate: rate,
            bits_per_sample: 32,
            sample_format: SampleFormat::Float,
        },
    )
    .map_err(|e| e.to_string())?;
    let n = (rate as f64 * seconds) as usize;
    let mut rng = 42u32;
    for i in 0..n {
        let time = i as f64 / rate as f64;
        let fade = (i as f64 / (rate as f64 * 0.01))
            .min((n - i) as f64 / (rate as f64 * 0.01))
            .min(1.0);
        rng ^= rng << 13;
        rng ^= rng >> 17;
        rng ^= rng << 5;
        let noise = rng as f64 / u32::MAX as f64 * 2.0 - 1.0;
        let s = if kind == "noise" {
            noise
        } else {
            (time * frequency * std::f64::consts::TAU).sin()
        };
        let v = (s * amp(level) * fade) as f32;
        writer.write_sample(v).map_err(|e| e.to_string())?;
        writer.write_sample(v).map_err(|e| e.to_string())?;
    }
    writer.finalize().map_err(|e| e.to_string())
}

#[cfg(test)]
mod nr_tests {
    use super::*;
    use std::sync::atomic::AtomicU64;
    struct TestDir(PathBuf);
    impl TestDir {
        fn new() -> Self {
            static NEXT: AtomicU64 = AtomicU64::new(0);
            let path = std::env::temp_dir().join(format!(
                "cassette-nr-render-{}-{}",
                std::process::id(),
                NEXT.fetch_add(1, Ordering::Relaxed)
            ));
            std::fs::create_dir(&path).unwrap();
            Self(path)
        }
    }
    impl Drop for TestDir {
        fn drop(&mut self) {
            let _ = std::fs::remove_dir_all(&self.0);
        }
    }
    fn project(dir: &Path, frequency: f64, level: f64) -> Project {
        let source = dir.join("source.wav");
        tone(&source, 48000, frequency, level, 1.0, "sine").unwrap();
        let mut track = crate::audio::import(&source).unwrap();
        track.fade_in = 0.0;
        track.fade_out = 0.0;
        track.gap = 0.0;
        let mut project = Project {
            leader: 0.0,
            trailer: 0.0,
            margin: 0.0,
            ..Project::default()
        };
        project.processing.normalize = "off".into();
        project.processing.nr = "type_b".into();
        project.sides[0].push(track.id.clone());
        project.tracks.push(track);
        project
    }
    #[test]
    fn quiet_nr_master_has_zero_added_attenuation_and_no_post_gain() {
        for reference in [0.0, -18.0] {
            let dir = TestDir::new();
            let mut p = project(&dir.0, 400.0, -9.0);
            p.processing.nr_reference = reference;
            let output = dir.0.join("master.wav");
            let result = render(&p, 0, &output, 32, &AtomicBool::new(false), |_, _| {}).unwrap();
            assert_eq!(result.attenuation, 0.0);
            let expected = dir.0.join("direct.wav");
            crate::nr::transform_file(
                &dir.0.join("source.wav"),
                &expected,
                reference,
                false,
                &AtomicBool::new(false),
            )
            .unwrap();
            assert_eq!(
                decode(&output).unwrap().samples,
                decode(&expected).unwrap().samples
            );
        }
    }

    #[test]
    fn hot_high_frequency_master_is_reencoded_before_nr_to_respect_true_peak() {
        let dir = TestDir::new();
        let p = project(&dir.0, 10000.0, -3.0);
        let output = dir.0.join("master.wav");
        let retries = std::cell::Cell::new(0);
        let result = render(&p, 0, &output, 32, &AtomicBool::new(false), |_, label| {
            if label.contains("Adatto") {
                retries.set(retries.get() + 1);
            }
        })
        .unwrap();
        let measured = crate::audio::analyze(&decode(&output).unwrap()).unwrap();
        assert!(retries.get() > 0);
        assert!(
            result.attenuation < 0.0 && result.attenuation > -6.0,
            "{}",
            result.attenuation
        );
        assert!(measured.true_peak <= p.processing.ceiling + 0.01);
        assert_eq!(result.nr_reference, 0.0);
        assert_eq!(result.clipped, 0);
        // Recreate the actual pre-encoder level and compare bit for bit. This
        // proves there is no gain correction after the encoded stream.
        let source = decode(&dir.0.join("source.wav")).unwrap();
        let input = dir.0.join("attenuated.wav");
        let mut writer = WavWriter::create(
            &input,
            WavSpec {
                channels: 2,
                sample_rate: 48000,
                bits_per_sample: 32,
                sample_format: SampleFormat::Float,
            },
        )
        .unwrap();
        for sample in source.samples {
            writer
                .write_sample((sample as f64 * amp(result.attenuation)) as f32)
                .unwrap();
        }
        writer.finalize().unwrap();
        let direct = dir.0.join("direct.wav");
        crate::nr::transform_file(&input, &direct, 0.0, false, &AtomicBool::new(false)).unwrap();
        assert_eq!(
            decode(&output).unwrap().samples,
            decode(&direct).unwrap().samples
        );
    }
    #[test]
    fn cancellation_during_nr_retry_removes_all_intermediates() {
        let dir = TestDir::new();
        let p = project(&dir.0, 10000.0, -3.0);
        let output = dir.0.join("master.wav");
        let cancel = AtomicBool::new(false);
        let result = render(&p, 0, &output, 32, &cancel, |_, label| {
            if label.contains("Adatto") {
                cancel.store(true, Ordering::Relaxed);
            }
        });
        assert!(result.err().unwrap().contains("annullata"));
        assert!(!output.exists());
        assert!(std::fs::read_dir(&dir.0).unwrap().all(|entry| !entry
            .unwrap()
            .file_name()
            .to_string_lossy()
            .contains("partial")));
    }
}
