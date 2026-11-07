use crate::{
    audio::{amp, db, Pcm},
    model::{Project, Track},
};

// Peaking biquads: RBJ / W3C Audio EQ Cookbook, Q = sqrt(2).
pub const EQ_FREQUENCIES: [f64; 10] = [
    31.5, 63.0, 125.0, 250.0, 500.0, 1000.0, 2000.0, 4000.0, 8000.0, 16000.0,
];
pub(crate) struct PeakFilter {
    b: [f64; 3],
    a: [f64; 2],
    z: [[f64; 2]; 2],
}
impl PeakFilter {
    pub(crate) fn new(frequency: f64, gain: f64, rate: f64) -> Self {
        let a = 10f64.powf(gain / 40.0);
        let w = 2.0 * std::f64::consts::PI * frequency / rate;
        let alpha = w.sin() / (2.0 * std::f64::consts::SQRT_2);
        let a0 = 1.0 + alpha / a;
        Self {
            b: [
                (1.0 + alpha * a) / a0,
                -2.0 * w.cos() / a0,
                (1.0 - alpha * a) / a0,
            ],
            a: [-2.0 * w.cos() / a0, (1.0 - alpha / a) / a0],
            z: [[0.0; 2]; 2],
        }
    }
    pub(crate) fn tick(&mut self, x: f64, channel: usize) -> f64 {
        let z = &mut self.z[channel];
        let y = self.b[0] * x + z[0];
        z[0] = self.b[1] * x - self.a[0] * y + z[1];
        z[1] = self.b[2] * x - self.a[1] * y;
        y
    }
}

pub fn resample(pcm: Pcm, rate: u32) -> Pcm {
    if pcm.rate == rate {
        return pcm;
    }
    let frames = pcm.samples.len() / 2;
    let count = (frames as f64 * rate as f64 / pcm.rate as f64).round() as usize;
    let mut samples = vec![0.0; count * 2];
    let cutoff = (rate as f64 / pcm.rate as f64).min(1.0) * 0.95;
    for i in 0..count {
        let pos = i as f64 * pcm.rate as f64 / rate as f64;
        let center = pos.floor() as isize;
        let mut norm = 0.0;
        for k in center - 16..=center + 16 {
            if k < 0 || k >= frames as isize {
                continue;
            }
            let x = pos - k as f64;
            let sx = x * cutoff;
            let sinc = if sx.abs() < 1e-10 {
                1.0
            } else {
                (std::f64::consts::PI * sx).sin() / (std::f64::consts::PI * sx)
            };
            let win = 0.5 + 0.5 * (std::f64::consts::PI * x / 17.0).cos();
            let w = sinc * win * cutoff;
            norm += w;
            for c in 0..2 {
                samples[i * 2 + c] += pcm.samples[k as usize * 2 + c] * w as f32
            }
        }
        if norm.abs() > 1e-8 {
            samples[i * 2] /= norm as f32;
            samples[i * 2 + 1] /= norm as f32
        }
    }
    Pcm { samples, rate }
}
pub fn gain_for(t: &Track, p: &Project) -> f64 {
    let q = &p.processing;
    let ceiling = q.premaster_ceiling();
    let a = &t.analysis;
    let requested = match q.normalize.as_str() {
        "peak" => ceiling - a.peak,
        "quasi" => ceiling - a.quasi_peak,
        "vu" => p.calibration.as_ref().map(|c| c.reference).unwrap_or(-18.0) - 3.0103 - a.vu_peak,
        "rms" => q.target_lufs - a.rms,
        "lufs" => a.lufs.map_or(0.0, |l| q.target_lufs - l),
        "album" => {
            let peak = p
                .tracks
                .iter()
                .map(|x| x.analysis.true_peak)
                .fold(-180f64, f64::max);
            ceiling - peak
        }
        _ => 0.0,
    };
    if q.normalize == "off" {
        t.gain
    } else {
        (requested + t.gain).min(ceiling - a.true_peak)
    }
}
pub fn process(mut pcm: Pcm, t: &Track, p: &Project) -> Pcm {
    let start = (t.trim_start * pcm.rate as f64).round() as usize * 2;
    let end = pcm
        .samples
        .len()
        .saturating_sub((t.trim_end * pcm.rate as f64).round() as usize * 2);
    pcm.samples.truncate(end);
    pcm.samples.drain(..start.min(end));
    let mut pcm = resample(pcm, p.processing.sample_rate);
    let rate = pcm.rate as f64;
    let gain = amp(gain_for(t, p));
    let q = &p.processing;
    let alc_ceiling = amp(q.premaster_ceiling());
    let mut envelope = 0.0f64;
    let mut previous_x = [0.0f64; 2];
    let mut previous_y = [0.0f64; 2];
    let mut correction = 1.0f64;
    let attack = (-1.0 / (rate * q.attack_ms / 1000.0)).exp();
    let release = (-1.0 / (rate * q.release_ms / 1000.0)).exp();
    let (tin, tout) = if q.eq == "120to70" {
        (120e-6, 70e-6)
    } else {
        (70e-6, 120e-6)
    };
    let den = 1.0 + 2.0 * rate * tin;
    let b0 = (1.0 + 2.0 * rate * tout) / den;
    let b1 = (1.0 - 2.0 * rate * tout) / den;
    let a1 = (1.0 - 2.0 * rate * tin) / den;
    let mut filters: Vec<_> = EQ_FREQUENCIES
        .iter()
        .zip(q.eq_bands)
        .map(|(&f, g)| PeakFilter::new(f, g, rate))
        .collect();
    let count = pcm.samples.len() / 2;
    for (i, frame) in pcm.samples.chunks_exact_mut(2).enumerate() {
        let input = (frame[0].abs().max(frame[1].abs())) as f64 * gain;
        let a = if input > envelope { attack } else { release };
        envelope = a * envelope + (1.0 - a) * input;
        let level = db(envelope);
        let mut dyn_gain = 0.0;
        if q.dynamics == "compress" || q.dynamics == "fit" {
            let knee = q.knee_db;
            let over = level - q.threshold;
            dyn_gain = if over > knee / 2.0 {
                (1.0 / q.ratio - 1.0) * over
            } else if over > -knee / 2.0 {
                (1.0 / q.ratio - 1.0) * (over + knee / 2.0).powi(2) / (2.0 * knee)
            } else {
                0.0
            };
        }
        if q.dynamics == "expand" && level < q.threshold {
            dyn_gain = ((level - q.threshold) * (q.ratio - 1.0)).max(-60.0)
        }
        if q.dynamics == "alc" {
            let wanted = alc_ceiling / envelope.max(1e-8);
            correction = correction * release + (1.0 - release) * wanted.min(1.0);
            dyn_gain = db(correction)
        }
        let mut fade = 1.0f64;
        if t.fade_in > 0.0 {
            fade = fade.min(i as f64 / (t.fade_in * rate))
        }
        if t.fade_out > 0.0 {
            fade = fade.min((count - i) as f64 / (t.fade_out * rate))
        }
        for (c, v) in frame.iter_mut().enumerate() {
            let makeup = if q.dynamics == "off" {
                0.0
            } else {
                q.makeup_db
            };
            let mut x = *v as f64 * gain * amp(dyn_gain + makeup) * fade;
            if q.eq_enabled {
                for filter in &mut filters {
                    x = filter.tick(x, c);
                }
            }
            if q.eq != "off" {
                let y = b0 * x + b1 * previous_x[c] - a1 * previous_y[c];
                previous_x[c] = x;
                previous_y[c] = y;
                x = y;
            }
            *v = x as f32;
        }
    }
    pcm
}

#[cfg(test)]
mod tests {
    use super::*;
    fn sine(gain: f64) -> Pcm {
        Pcm {
            samples: (0..48000)
                .flat_map(|i| {
                    let v = (amp(gain)
                        * (2.0 * std::f64::consts::PI * 1000.0 * i as f64 / 48000.0).sin())
                        as f32;
                    [v, v]
                })
                .collect(),
            rate: 48000,
        }
    }
    fn track(pcm: &Pcm) -> Track {
        Track {
            id: "test".into(),
            path: "".into(),
            title: "test".into(),
            artist: "".into(),
            duration: 1.0,
            sample_rate: pcm.rate,
            hash: "".into(),
            analysis: crate::audio::analyze(pcm).unwrap(),
            trim_start: 0.0,
            trim_end: 0.0,
            gain: 0.0,
            fade_in: 0.0,
            fade_out: 0.0,
            gap: 0.0,
            locked: false,
        }
    }
    fn rms_tail(samples: &[f32]) -> f64 {
        db((samples[samples.len() / 2..]
            .iter()
            .map(|v| (*v as f64).powi(2))
            .sum::<f64>()
            / (samples.len() / 2) as f64)
            .sqrt())
    }
    #[test]
    fn eq_center_gain_bypass_and_stereo() {
        for rate in [44100, 48000, 88200, 96000] {
            let mut filter = PeakFilter::new(1000.0, 6.0, rate as f64);
            let mut input = vec![];
            let mut output = vec![];
            for i in 0..rate {
                let v = (2.0 * std::f64::consts::PI * 1000.0 * i as f64 / rate as f64).sin() * 0.1;
                input.push(v as f32);
                output.push(filter.tick(v, 0) as f32);
                assert_eq!(filter.tick(0.0, 1), 0.0);
            }
            assert!((rms_tail(&output) - rms_tail(&input) - 6.0).abs() < 0.01);
        }
        let pcm = sine(-18.0);
        let t = track(&pcm);
        let mut p = Project::default();
        p.processing.normalize = "off".into();
        p.processing.eq_bands = [12.0; 10];
        let output = process(sine(-18.0), &t, &p);
        assert_eq!(output.samples, pcm.samples);
    }
    #[test]
    fn compression_reduces_level_and_makeup_restores_six_db() {
        let pcm = sine(-6.0);
        let t = track(&pcm);
        let mut p = Project::default();
        p.processing.normalize = "off".into();
        p.processing.dynamics = "compress".into();
        p.processing.threshold = -24.0;
        p.processing.ratio = 4.0;
        let compressed = process(sine(-6.0), &t, &p);
        assert!(rms_tail(&compressed.samples) < rms_tail(&pcm.samples) - 8.0);
        p.processing.makeup_db = 6.0;
        let makeup = process(sine(-6.0), &t, &p);
        assert!((rms_tail(&makeup.samples) - rms_tail(&compressed.samples) - 6.0).abs() < 0.01);
        p.processing.knee_db = 0.0;
        assert!(process(sine(-6.0), &t, &p)
            .samples
            .iter()
            .all(|v| v.is_finite()));
    }
    #[test]
    fn normalization_gain_respects_true_peak_and_album_relationships() {
        let pcm = sine(-18.0);
        let t = track(&pcm);
        let mut p = Project {
            tracks: vec![t.clone()],
            ..Default::default()
        };
        assert!((gain_for(&t, &p) - 15.0).abs() < 0.05);
        p.processing.normalize = "lufs".into();
        p.processing.target_lufs = -5.0;
        assert!(gain_for(&t, &p) <= p.processing.ceiling - t.analysis.true_peak);
        let mut quieter = t.clone();
        quieter.analysis.true_peak -= 6.0;
        quieter.analysis.peak -= 6.0;
        p.tracks.push(quieter.clone());
        p.processing.normalize = "album".into();
        assert_eq!(gain_for(&t, &p), gain_for(&quieter, &p));
    }
    #[test]
    fn resampling_length() {
        let p = resample(
            Pcm {
                samples: vec![0.0; 44100 * 2],
                rate: 44100,
            },
            48000,
        );
        assert_eq!(p.samples.len(), 96000)
    }
    #[test]
    fn resampling_dc() {
        let p = resample(
            Pcm {
                samples: vec![0.25; 4410 * 2],
                rate: 44100,
            },
            48000,
        );
        assert!(p.samples.iter().all(|v| (*v - 0.25).abs() < 0.0001))
    }
}
