//! The standalone GPLv2 encoder exchanges standard WAV files, never linked into this GPLv3 app.
use std::{
    path::{Path, PathBuf},
    process::{Command, Stdio},
    sync::atomic::{AtomicBool, Ordering},
    time::{Duration, Instant},
};
fn executable() -> Result<PathBuf, String> {
    let current = std::env::current_exe().map_err(|e| e.to_string())?;
    let name = if cfg!(windows) {
        "cassette-nr.exe"
    } else {
        "cassette-nr"
    };
    let bundled = current
        .parent()
        .ok_or("Directory applicazione assente")?
        .join(name);
    if bundled.is_file() {
        return Ok(bundled);
    }
    // Build/test path fixed by build.rs; never obtained from a project or user-controlled PATH.
    let built = PathBuf::from(env!("CM_NR_TOOL"));
    if built.is_file() {
        Ok(built)
    } else {
        Err("Encoder Type B assente dal pacchetto dell’app".into())
    }
}
#[derive(Debug, PartialEq)]
pub enum TransformOutcome {
    Complete,
    Clipped,
}
pub fn transform_file(
    input: &Path,
    output: &Path,
    reference: f64,
    decode: bool,
    cancel: &AtomicBool,
) -> Result<(), String> {
    match transform_attempt(input, output, reference, decode, cancel)? {
        TransformOutcome::Complete => Ok(()),
        TransformOutcome::Clipped => {
            Err("Codifica NR: uscita saturata; riduci il livello prima dell’encoder".into())
        }
    }
}
pub fn transform_attempt(
    input: &Path,
    output: &Path,
    reference: f64,
    decode: bool,
    cancel: &AtomicBool,
) -> Result<TransformOutcome, String> {
    if !reference.is_finite() || !(-36.0..=0.0).contains(&reference) {
        return Err("Riferimento NR non valido".into());
    }
    if cancel.load(Ordering::Relaxed) {
        return Err("Operazione annullata".into());
    }
    let mut command = Command::new(executable()?);
    command
        .args([if decode { "decode" } else { "encode" }])
        .arg(input)
        .arg(output)
        .arg(reference.to_string())
        .stdin(Stdio::null())
        .stdout(Stdio::null())
        .stderr(Stdio::piped());
    #[cfg(windows)]
    {
        use std::os::windows::process::CommandExt;
        command.creation_flags(0x08000000);
    }
    let mut child = command
        .spawn()
        .map_err(|e| format!("Avvio encoder NR: {e}"))?;
    let start = Instant::now();
    loop {
        if cancel.load(Ordering::Relaxed) || start.elapsed() > Duration::from_secs(1800) {
            let _ = child.kill();
            let _ = child.wait();
            let _ = std::fs::remove_file(output);
            return Err(if cancel.load(Ordering::Relaxed) {
                "Operazione annullata"
            } else {
                "Tempo limite encoder NR superato"
            }
            .into());
        }
        match child.try_wait() {
            Ok(Some(_)) => break,
            Ok(None) => std::thread::sleep(Duration::from_millis(25)),
            Err(e) => {
                let _ = child.kill();
                let _ = child.wait();
                let _ = std::fs::remove_file(output);
                return Err(e.to_string());
            }
        }
    }
    let result = child.wait_with_output().map_err(|e| e.to_string())?;
    if result.status.code() == Some(3) {
        let _ = std::fs::remove_file(output);
        return Ok(TransformOutcome::Clipped);
    }
    if !result.status.success() {
        let _ = std::fs::remove_file(output);
        return Err(format!(
            "Codifica NR: {}",
            String::from_utf8_lossy(&result.stderr).trim()
        ));
    }
    let expected = hound::WavReader::open(input).map_err(|e| e.to_string())?;
    let actual = hound::WavReader::open(output).map_err(|e| e.to_string())?;
    if actual.spec() != expected.spec() || actual.duration() != expected.duration() {
        let _ = std::fs::remove_file(output);
        return Err("Formato o durata del master NR inattesi".into());
    }
    Ok(TransformOutcome::Complete)
}
#[cfg(test)]
mod tests {
    use super::*;
    fn transform(samples: &[f32], rate: u32, decode: bool) -> Vec<f32> {
        transform_at(samples, rate, decode, -18.0)
    }
    fn transform_at(samples: &[f32], rate: u32, decode: bool, reference: f64) -> Vec<f32> {
        static NEXT: std::sync::atomic::AtomicU64 = std::sync::atomic::AtomicU64::new(0);
        let dir = std::env::temp_dir().join(format!(
            "cassette-nr-test-{}-{}",
            std::process::id(),
            NEXT.fetch_add(1, Ordering::Relaxed)
        ));
        std::fs::create_dir(&dir).unwrap();
        let input = dir.join("in.wav");
        let output = dir.join("out.wav");
        let mut writer = hound::WavWriter::create(
            &input,
            hound::WavSpec {
                channels: 2,
                sample_rate: rate,
                bits_per_sample: 32,
                sample_format: hound::SampleFormat::Float,
            },
        )
        .unwrap();
        for &v in samples {
            writer.write_sample(v).unwrap();
        }
        writer.finalize().unwrap();
        let result = transform_file(&input, &output, reference, decode, &AtomicBool::new(false));
        let samples = if result.is_ok() {
            hound::WavReader::open(&output)
                .unwrap()
                .samples::<f32>()
                .collect::<Result<Vec<_>, _>>()
                .unwrap()
        } else {
            vec![]
        };
        std::fs::remove_dir_all(&dir).unwrap();
        result.unwrap();
        samples
    }
    fn sine(f: f64, level: f64, rate: u32) -> Vec<f32> {
        (0..rate / 2)
            .flat_map(|i| {
                let v = (10f64.powf(level / 20.0)
                    * (2.0 * std::f64::consts::PI * f * i as f64 / rate as f64).sin())
                    as f32;
                [v, 0.0]
            })
            .collect()
    }
    fn rms(x: &[f32]) -> f64 {
        let x = &x[x.len() / 2..];
        (x.iter().map(|v| (*v as f64).powi(2)).sum::<f64>() / x.len() as f64).sqrt()
    }
    #[test]
    fn type_b_highs_roundtrip_and_stereo_all_rates() {
        for rate in [44100, 48000, 88200, 96000] {
            let input = sine(5000.0, -60.0, rate);
            let encoded = transform(&input, rate, false);
            let boost = 20.0 * (rms(&encoded) / rms(&input)).log10();
            assert!(boost > 5.0 && boost < 12.0, "boost {boost}");
            assert!(encoded.chunks_exact(2).all(|v| v[1].abs() < 1e-6));
            let decoded = transform(&encoded, rate, true);
            let error: Vec<_> = decoded.iter().zip(&input).map(|(a, b)| a - b).collect();
            assert!(
                rms(&error) / rms(&input) < 0.05,
                "roundtrip error {}",
                rms(&error) / rms(&input)
            );
        }
    }
    #[test]
    fn zero_reference_encodes_highs_instead_of_cutting_them() {
        for rate in [44100, 48000, 88200, 96000] {
            let input = sine(5000.0, -50.0, rate);
            let encoded = transform_at(&input, rate, false, 0.0);
            let boost = 20.0 * (rms(&encoded) / rms(&input)).log10();
            assert!(boost > 7.0 && boost < 11.0, "boost {boost}");
            let decoded = transform_at(&encoded, rate, true, 0.0);
            let error: Vec<_> = decoded.iter().zip(&input).map(|(a, b)| a - b).collect();
            assert!(rms(&error) / rms(&input) < 0.01);
        }
    }
    #[test]
    fn repeated_encoding_is_deterministic() {
        let input = sine(400.0, -30.0, 48000);
        assert!(transform(&input, 48000, false) == transform(&input, 48000, false));
    }
    #[test]
    fn saturated_codec_output_has_a_retryable_status_and_no_partial_file() {
        let dir = std::env::temp_dir().join(format!(
            "cassette-nr-clipped-{}-{}",
            std::process::id(),
            std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .unwrap()
                .as_nanos()
        ));
        std::fs::create_dir(&dir).unwrap();
        let input = dir.join("source.wav");
        let output = dir.join("encoded.wav");
        let mut writer = hound::WavWriter::create(
            &input,
            hound::WavSpec {
                channels: 2,
                sample_rate: 48000,
                bits_per_sample: 32,
                sample_format: hound::SampleFormat::Float,
            },
        )
        .unwrap();
        for sample in sine(10000., -0.1, 48000) {
            writer.write_sample(sample).unwrap();
        }
        writer.finalize().unwrap();
        let result = transform_attempt(&input, &output, 0., false, &AtomicBool::new(false));
        let output_exists = output.exists();
        std::fs::remove_dir_all(&dir).unwrap();
        assert_eq!(result.unwrap(), TransformOutcome::Clipped);
        assert!(!output_exists);
    }
}
