//! Extra measurements from a single fixed-gain recording. They describe the loop,
//! not an independently calibrated recording head or magnetic flux.
use crate::{
    audio::{db, Pcm},
    calibration::{harmonics, rms, slice, Report, Segment},
};
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct BandQuality {
    pub snr_db: [f64; 2],
    pub spread_db: [f64; 2],
    pub dropout_db: [f64; 2],
    pub repeat_delta_db: Option<[f64; 2]>,
    pub reliable: bool,
}
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct FrequencyLevel {
    pub frequency: f64,
    pub input_dbfs: f64,
    pub output_dbfs: [f64; 2],
    pub compression_db: [f64; 2],
    pub distortion_percent: Option<[f64; 2]>,
    pub harmonics_measured: usize,
    pub snr_db: [f64; 2],
    pub stable: bool,
}
#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
pub struct DriveLimit {
    pub frequency: f64,
    pub max_input_peak_dbfs: f64,
}
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ExtendedReport {
    pub medium_response_db: Vec<[f64; 2]>,
    pub level_change_db: Vec<[f64; 2]>,
    pub quality: Vec<BandQuality>,
    pub level_tests: Vec<FrequencyLevel>,
    pub drive_limits: Vec<DriveLimit>,
    pub noise_change_db: [f64; 2],
    pub balance_spread_db: f64,
    pub reference_repeat_delta_db: [f64; 2],
}
fn median(mut values: Vec<f64>) -> f64 {
    values.sort_by(f64::total_cmp);
    values[values.len() / 2]
}
fn stability(x: &[f32], rate: u32) -> ([f64; 2], [f64; 2]) {
    let values: Vec<_> = x
        .chunks((rate as usize * 15 / 100) * 2)
        .filter(|x| x.len() >= rate as usize / 5)
        .map(|x| rms(x).map(db))
        .collect();
    if values.is_empty() {
        return ([180.; 2], [180.; 2]);
    }
    let spread = std::array::from_fn(|c| {
        values.iter().map(|v| v[c]).fold(-180., f64::max)
            - values.iter().map(|v| v[c]).fold(180., f64::min)
    });
    let dropout = std::array::from_fn(|c| {
        median(values.iter().map(|v| v[c]).collect())
            - values.iter().map(|v| v[c]).fold(180., f64::min)
    });
    (spread, dropout)
}
pub fn estimate_limits(points: &[FrequencyLevel]) -> Vec<DriveLimit> {
    let mut limits = Vec::new();
    for frequency in [315., 1000., 4000., 8000., 12500.] {
        let mut safe = None;
        for p in points.iter().filter(|p| p.frequency == frequency) {
            if p.snr_db.iter().any(|v| *v < 12.) {
                if safe.is_some() {
                    break;
                } else {
                    continue;
                }
            }
            let bad = !p.stable
                || p.compression_db.iter().any(|v| v.abs() > 1.)
                || p.distortion_percent
                    .is_some_and(|v| v.iter().any(|v| *v > 3.));
            if bad {
                break;
            }
            safe = Some(p.input_dbfs - 1.5);
        }
        if let Some(max_input_peak_dbfs) = safe {
            limits.push(DriveLimit {
                frequency,
                max_input_peak_dbfs,
            });
        }
    }
    limits
}
impl ExtendedReport {
    pub fn validate(&self, source_gain_db: f64) -> Result<(), String> {
        let finite = |v: &[f64]| v.iter().all(|v| v.is_finite());
        if !(-24. ..=0.).contains(&source_gain_db)
            || !source_gain_db.is_finite()
            || self.medium_response_db.len() != 10
            || self.level_change_db.len() != 10
            || self.quality.len() != 10
            || self.level_tests.len() != 31
            || !finite(&self.reference_repeat_delta_db)
            || !finite(&self.noise_change_db)
            || !self.balance_spread_db.is_finite()
            || self
                .medium_response_db
                .iter()
                .chain(&self.level_change_db)
                .any(|v| !finite(v))
            || self.quality.iter().any(|q| {
                !finite(&q.snr_db)
                    || !finite(&q.spread_db)
                    || !finite(&q.dropout_db)
                    || q.repeat_delta_db.is_some_and(|v| !finite(&v))
            })
            || self.level_tests.iter().any(|p| {
                ![315., 1000., 4000., 8000., 12500.].contains(&p.frequency)
                    || !p.input_dbfs.is_finite()
                    || !finite(&p.output_dbfs)
                    || !finite(&p.compression_db)
                    || !finite(&p.snr_db)
                    || p.distortion_percent.is_some_and(|v| !finite(&v))
                    || p.harmonics_measured > 2
            })
            || self.drive_limits != estimate_limits(&self.level_tests)
        {
            return Err("Misure della prova estesa non valide".into());
        }
        let expected: Vec<_> = [-30., -24., -18., -12., -9., -6., -3.]
            .into_iter()
            .map(|l| (315., l + source_gain_db))
            .chain([1000., 4000., 8000., 12500.].into_iter().flat_map(|f| {
                [-30., -24., -18., -12., -6., -3.]
                    .into_iter()
                    .map(move |l| (f, l + source_gain_db))
            }))
            .collect();
        if self
            .level_tests
            .iter()
            .zip(expected)
            .any(|(p, (f, l))| p.frequency != f || p.input_dbfs != l)
        {
            return Err("Ordine delle prove di livello non valido".into());
        }
        Ok(())
    }
    pub fn warnings(&self) -> Vec<String> {
        let mut warnings = Vec::new();
        if self.quality.iter().any(|q| !q.reliable) {
            warnings.push(
                "Alcune bande sono deboli o instabili: il profilo ne limiterà la correzione."
                    .into(),
            );
        }
        if self
            .quality
            .iter()
            .any(|q| q.dropout_db.iter().any(|v| *v > 3.))
        {
            warnings.push(
                "Cali di segnale nella prova: possibile dropout o instabilità della catena.".into(),
            );
        }
        if self.noise_change_db.iter().any(|v| v.abs() > 3.) {
            warnings
                .push("Il fondo cambia durante la prova: confronta le misure con prudenza.".into());
        }
        if self.drive_limits.len() < 5 {
            warnings.push("Non tutte le frequenze hanno un limite stimabile: nessun limite viene inventato per le misure incerte.".into());
        }
        warnings
    }
}
pub(crate) fn analyze(
    p: &Pcm,
    segments: &[Segment],
    delay: f64,
    scale: f64,
    report: &Report,
    source_gain_db: f64,
) -> ExtendedReport {
    let window = |s: &Segment| {
        slice(
            p,
            delay + (s.start + 0.3) * scale,
            delay + (s.start + s.duration - 0.25) * scale,
        )
    };
    let last_noise = rms(window(&segments[59])).map(db);
    let noise: [f64; 2] = std::array::from_fn(|c| report.noise_dbfs[c].max(last_noise[c]));
    let medium: Vec<_> = segments[21..31]
        .iter()
        .map(|s| rms(window(s)).map(db))
        .collect();
    let medium_response_db = medium
        .iter()
        .map(|v| std::array::from_fn(|c| v[c] - medium[5][c]))
        .collect();
    let level_change_db = medium
        .iter()
        .enumerate()
        .map(|(i, v)| std::array::from_fn(|c| v[c] - report.bands[i].rms_dbfs[c] - 12.))
        .collect();
    let repeated_reference = rms(window(&segments[55])).map(db);
    let reference_repeat_delta_db: [f64; 2] =
        std::array::from_fn(|c| repeated_reference[c] - report.reference_dbfs[c]);
    let quality = report
        .bands
        .iter()
        .enumerate()
        .map(|(i, b)| {
            let (a, ad) = stability(window(&segments[i + 1]), p.rate);
            let (m, md) = stability(window(&segments[i + 21]), p.rate);
            let spread_db = std::array::from_fn(|c| a[c].max(m[c]));
            let dropout_db = std::array::from_fn(|c| ad[c].max(md[c]));
            let repeated = segments[55..59].iter().find(|s| s.frequency == b.frequency);
            let repeat_delta_db = repeated.map(|s| {
                let v = rms(window(s)).map(db);
                std::array::from_fn(|c| v[c] - b.rms_dbfs[c])
            });
            let snr_db = std::array::from_fn(|c| b.rms_dbfs[c].min(medium[i][c]) - noise[c]);
            let reliable = reference_repeat_delta_db.iter().all(|v| v.abs() <= 1.5)
                && snr_db.iter().all(|v| *v >= 12.)
                && spread_db.iter().all(|v| *v <= 1.5)
                && repeat_delta_db.is_none_or(|v| v.iter().all(|v| v.abs() <= 1.5));
            BandQuality {
                snr_db,
                spread_db,
                dropout_db,
                repeat_delta_db,
                reliable,
            }
        })
        .collect();
    let mut level_tests = Vec::new();
    for indices in [(12, 19), (31, 37), (37, 43), (43, 49), (49, 55)] {
        let group = &segments[indices.0..indices.1];
        let base = group.iter().find_map(|s| {
            let v = rms(window(s)).map(db);
            v.iter()
                .zip(noise)
                .all(|(v, n)| *v - n >= 12.)
                .then_some((s.level, v))
        });
        for s in group {
            let w = window(s);
            let output_dbfs = rms(w).map(db);
            let baseline = base.unwrap_or((s.level, output_dbfs));
            let compression_db =
                std::array::from_fn(|c| baseline.1[c] + s.level - baseline.0 - output_dbfs[c]);
            let harmonics_measured = [2., 3.]
                .iter()
                .filter(|h| s.frequency / scale * **h < p.rate as f64 / 2. - 20.)
                .count();
            let distortion_percent =
                (harmonics_measured > 0).then(|| harmonics(w, p.rate, s.frequency / scale).0);
            let (spread, _) = stability(w, p.rate);
            level_tests.push(FrequencyLevel {
                frequency: s.frequency,
                input_dbfs: s.level + source_gain_db,
                output_dbfs,
                compression_db,
                distortion_percent,
                harmonics_measured,
                snr_db: std::array::from_fn(|c| output_dbfs[c] - noise[c]),
                stable: spread.iter().all(|v| *v <= 1.5),
            });
        }
    }
    let balances: Vec<_> = report.bands[1..9]
        .iter()
        .map(|b| b.rms_dbfs[1] - b.rms_dbfs[0])
        .collect();
    let balance_spread_db = balances.iter().copied().fold(-180., f64::max)
        - balances.iter().copied().fold(180., f64::min);
    let drive_limits = estimate_limits(&level_tests);
    ExtendedReport {
        reference_repeat_delta_db,
        medium_response_db,
        level_change_db,
        quality,
        level_tests,
        drive_limits,
        noise_change_db: std::array::from_fn(|c| last_noise[c] - report.noise_dbfs[c]),
        balance_spread_db,
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{audio::amp, calibration};
    #[test]
    fn extended_sequence_is_complete_and_ideal_at_all_project_rates() {
        for rate in [44100, 48000, 88200, 96000] {
            let pcm = calibration::signal_extended(rate);
            assert_eq!(
                pcm.samples.len(),
                (108.2 * rate as f64).round() as usize * 2
            );
            let report = calibration::analyze(&pcm, "extended-ideal.wav".into()).unwrap();
            assert_eq!(report.protocol, 2);
            report.validate().unwrap();
            assert!(report.correction_allowed);
            let ext = report.extended.unwrap();
            assert_eq!(ext.level_tests.len(), 31);
            assert!(
                ext.quality.iter().all(|q| q.reliable),
                "{rate}: {:?}",
                ext.quality
            );
            assert_eq!(ext.drive_limits.len(), 5, "{rate}: {:?}", ext.level_tests);
            assert!(ext
                .drive_limits
                .iter()
                .all(|l| l.max_input_peak_dbfs == -4.5));
            assert!(ext.level_change_db.iter().flatten().all(|v| v.abs() < 0.02));
            let high = ext
                .level_tests
                .iter()
                .find(|p| p.frequency == 12500.)
                .unwrap();
            assert_eq!(high.distortion_percent.is_some(), rate >= 88200);
        }
    }
    #[test]
    fn finds_high_frequency_compression_and_excludes_dropouts() {
        let rate = 44100;
        let mut pcm = calibration::signal_extended(rate);
        let (segments, _, _) = calibration::extended_layout();
        for s in &segments {
            if s.frequency == 8000. {
                let gain = amp(-4. - (s.level + 12.).max(0.) * 0.5) as f32;
                let start = (s.start * rate as f64).round() as usize * 2;
                let end = ((s.start + s.duration) * rate as f64).round() as usize * 2;
                for v in &mut pcm.samples[start..end] {
                    *v *= gain;
                }
            }
        }
        let s = &segments[8]; // 4 kHz at the low level.
        let start = ((s.start + 0.65) * rate as f64) as usize * 2;
        let end = ((s.start + 0.9) * rate as f64) as usize * 2;
        pcm.samples[start..end].fill(0.);
        let report = calibration::analyze(&pcm, "nonlinear-loop.wav".into()).unwrap();
        report.validate().unwrap();
        let ext = report.extended.as_ref().unwrap();
        assert!(!ext.quality[7].reliable);
        assert!(ext.quality[7].dropout_db[0] > 3.);
        assert!(ext.quality[8].reliable);
        assert_eq!(
            ext.drive_limits
                .iter()
                .find(|l| l.frequency == 8000.)
                .unwrap()
                .max_input_peak_dbfs,
            -13.5
        );
    }
    #[test]
    fn extended_auto_stop_preserves_end_and_accepts_delay_noise_and_drift() {
        let rate = 44100;
        let original = calibration::signal_extended(rate);
        let scale = 1.001;
        let delay = 3.;
        let total = (delay + 108.2 * scale + 2.) * rate as f64;
        let mut samples = vec![0.; total as usize * 2];
        let mut rng = 12345u32;
        for (i, frame) in samples.chunks_exact_mut(2).enumerate() {
            let at = ((i as f64 / rate as f64 - delay) / scale * rate as f64).round();
            rng ^= rng << 13;
            rng ^= rng >> 17;
            rng ^= rng << 5;
            let noise = (rng as f32 / u32::MAX as f32 - 0.5) * 0.0001;
            for (c, sample) in frame.iter_mut().enumerate() {
                *sample = if at >= 0. && (at as usize) * 2 + c < original.samples.len() {
                    -0.5 * original.samples[at as usize * 2 + c] + noise
                } else {
                    noise
                };
            }
        }
        let mut pcm = Pcm { samples, rate };
        let mut detector = calibration::CaptureAutoStop::new(rate);
        let mut consumed = 0;
        let mut stopped = false;
        for block in pcm.samples.chunks(rate as usize * 2 * 8 / 100) {
            consumed += block.len();
            if detector.push(block) {
                stopped = true;
                break;
            }
        }
        assert!(stopped);
        let time = consumed as f64 / 2. / rate as f64;
        assert!((111.4..111.8).contains(&time), "{time}");
        pcm.samples.truncate(consumed);
        let report = calibration::analyze(&pcm, "stopped-extended".into()).unwrap();
        assert_eq!(report.protocol, 2);
        report.validate().unwrap();
        assert!((report.time_scale - scale).abs() < 0.0001);
        let truncated = Pcm {
            samples: original.samples[..rate as usize * 2 * 60].to_vec(),
            rate,
        };
        assert!(calibration::analyze(&truncated, "truncated".into()).is_err());
    }
}
