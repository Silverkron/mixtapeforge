//! Deferred off-tape comparison. Aligns recorded return to the rendered reference.
//! This does not claim continuous clock-drift compensation or calibrated THD.
use crate::{
    audio::{db, Pcm},
    dsp::resample,
};
use rustfft::{num_complex::Complex, FftPlanner};
use std::path::Path;
#[derive(Clone, serde::Serialize)]
pub struct Comparison {
    pub delay_ms: f64,
    pub correlation: f64,
    pub level_difference: [f64; 2],
    pub residual_percent: f64,
    pub seconds: f64,
}
fn read_first(path: &Path) -> Result<Pcm, String> {
    let mut reader = hound::WavReader::open(path).map_err(|e| e.to_string())?;
    let s = reader.spec();
    if s.channels != 2 || s.sample_format != hound::SampleFormat::Float {
        return Err("Il confronto richiede master e ritorno interni float32 stereo".into());
    }
    let samples: Result<Vec<f32>, _> = reader
        .samples::<f32>()
        .take(s.sample_rate as usize * 2 * 30)
        .collect();
    Ok(Pcm {
        samples: samples.map_err(|e| e.to_string())?,
        rate: s.sample_rate,
    })
}
pub fn files(reference: &Path, recorded: &Path) -> Result<Comparison, String> {
    compare(read_first(reference)?, read_first(recorded)?)
}
pub fn compare(reference: Pcm, recorded: Pcm) -> Result<Comparison, String> {
    let rate = 2000;
    let reference = resample(reference, rate);
    let recorded = resample(recorded, rate);
    let a: Vec<f32> = reference.samples.chunks_exact(2).map(|v| v[0]).collect();
    let b: Vec<f32> = recorded.samples.chunks_exact(2).map(|v| v[0]).collect();
    if a.len() < rate as usize || b.len() < rate as usize {
        return Err("Servono almeno due registrazioni di un secondo".into());
    }
    let n = (a.len() + b.len()).next_power_of_two();
    let mut fa = vec![Complex::new(0.0, 0.0); n];
    let mut fb = fa.clone();
    for (i, &x) in a.iter().enumerate() {
        fa[i].re = x
    }
    for (i, &x) in b.iter().enumerate() {
        fb[i].re = x
    }
    let mut planner = FftPlanner::new();
    let forward = planner.plan_fft_forward(n);
    forward.process(&mut fa);
    forward.process(&mut fb);
    for i in 0..n {
        fb[i] *= fa[i].conj()
    }
    planner.plan_fft_inverse(n).process(&mut fb);
    let max_lag = (rate as usize * 10).min(a.len().min(b.len()) / 2);
    let lag = (-(max_lag as isize)..=max_lag as isize)
        .max_by(|&x, &y| {
            let ix = if x < 0 {
                (n as isize + x) as usize
            } else {
                x as usize
            };
            let iy = if y < 0 {
                (n as isize + y) as usize
            } else {
                y as usize
            };
            fb[ix].re.abs().total_cmp(&fb[iy].re.abs())
        })
        .unwrap_or(0);
    let begin = if lag < 0 { (-lag) as usize } else { 0 };
    let end = a.len().min((b.len() as isize - lag).max(0) as usize);
    if end <= begin {
        return Err("Nessuna sovrapposizione utile".into());
    }
    let mut aa = 0.0f64;
    let mut bb = 0.0f64;
    let mut ab = 0.0f64;
    let mut energy_a = [0.0; 2];
    let mut energy_b = [0.0; 2];
    for (i, &a_sample) in a.iter().enumerate().take(end).skip(begin) {
        let j = (i as isize + lag) as usize;
        aa += (a_sample as f64).powi(2);
        bb += (b[j] as f64).powi(2);
        ab += a_sample as f64 * b[j] as f64;
        for c in 0..2 {
            energy_a[c] += (reference.samples[i * 2 + c] as f64).powi(2);
            energy_b[c] += (recorded.samples[j * 2 + c] as f64).powi(2);
        }
    }
    let correlation = ab / (aa * bb).sqrt().max(1e-20);
    if correlation.abs() < 0.5 || aa < 1e-10 || bb < 1e-10 {
        return Err("Confronto non affidabile: segnale troppo debole o non correlabile. Usa la stessa musica e ripeti la cattura.".into());
    }
    let gain = ab / aa;
    let mut residual = 0.0;
    for (i, &a_sample) in a.iter().enumerate().take(end).skip(begin) {
        let j = (i as isize + lag) as usize;
        residual += (b[j] as f64 - gain * a_sample as f64).powi(2)
    }
    Ok(Comparison {
        delay_ms: lag as f64 / rate as f64 * 1000.0,
        correlation,
        level_difference: [
            db((energy_b[0] / energy_a[0].max(1e-20)).sqrt()),
            db((energy_b[1] / energy_a[1].max(1e-20)).sqrt()),
        ],
        residual_percent: (residual / bb).sqrt() * 100.0,
        seconds: (end - begin) as f64 / rate as f64,
    })
}
#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn finds_delayed_scaled_return() {
        let rate = 2000;
        let mut rng = 42u32;
        let mut samples = vec![];
        for _ in 0..8000 {
            rng ^= rng << 13;
            rng ^= rng >> 17;
            rng ^= rng << 5;
            let x = (rng as f32 / u32::MAX as f32 - 0.5) * 0.3;
            samples.extend_from_slice(&[x, x]);
        }
        let mut recorded = vec![0.0; 600];
        recorded.extend(samples.iter().map(|v| v * 0.5));
        let c = compare(
            Pcm { samples, rate },
            Pcm {
                samples: recorded,
                rate,
            },
        )
        .unwrap();
        assert!((c.delay_ms - 150.0).abs() < 0.6);
        assert!((c.level_difference[0] + 6.0206).abs() < 0.01);
        assert!(c.correlation > 0.999);
        assert!(c.residual_percent < 0.01)
    }
    #[test]
    fn rejects_silence() {
        assert!(compare(
            Pcm {
                samples: vec![0.0; 8000],
                rate: 2000
            },
            Pcm {
                samples: vec![0.0; 8000],
                rate: 2000
            }
        )
        .is_err())
    }
}
