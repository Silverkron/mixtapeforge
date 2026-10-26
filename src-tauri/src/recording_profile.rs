use crate::{
    audio::amp,
    calibration::Report,
    dsp::{PeakFilter, EQ_FREQUENCIES},
};
use serde::{Deserialize, Serialize};
use std::{
    path::Path,
    sync::atomic::{AtomicBool, Ordering},
};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Conditions {
    pub sample_rate: u32,
    pub name: String,
    pub deck: String,
    pub tape: String,
    pub output: String,
    pub input: String,
    pub notes: String,
}
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct RecordingProfile {
    pub version: u32,
    pub id: String,
    pub enabled: bool,
    pub conditions: Conditions,
    pub eq_bands: [f64; 10],
    pub channel_gain_db: [f64; 2],
    pub report: Report,
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    pub drive_limits: Vec<crate::calibration_extended::DriveLimit>,
}
fn correction(report: &Report) -> ([f64; 10], [f64; 2]) {
    let eq = std::array::from_fn(|i| {
        let band = &report.bands[i];
        let margin = (0..2)
            .map(|c| band.rms_dbfs[c] - report.noise_dbfs[c])
            .fold(f64::INFINITY, f64::min);
        if i == 9 || margin < 6. {
            return 0.;
        }
        if let Some(ext) = &report.extended {
            if !ext.quality[i].reliable || ext.level_change_db[i].iter().any(|v| v.abs() > 1.) {
                return 0.;
            }
            let target = -(band.response_db[0] + band.response_db[1]) / 4.;
            let max_boost = if i == 0 {
                0.
            } else {
                ((margin - 12.) / 6. * 1.5).clamp(0., 1.5)
            };
            return (target.clamp(-1.5, max_boost) * 4.).round() / 4.;
        }
        let max_boost = ((margin - 6.) / 6. * 3.).clamp(0., 3.);
        (-(band.response_db[0] + band.response_db[1]) / 2.)
            .clamp(-3., max_boost)
            .mul_add(2., 0.)
            .round()
            / 2.
    });
    let difference = report.reference_dbfs[1] - report.reference_dbfs[0];
    let trim = if let Some(ext) = &report.extended {
        if ext.quality.iter().filter(|q| q.reliable).count() < 6
            || ext.balance_spread_db > 0.75
            || difference.abs() < 0.5
            || ext.reference_repeat_delta_db.iter().any(|v| v.abs() > 0.5)
        {
            0.
        } else {
            (difference.abs().min(1.5) * 10.).round() / 10.
        }
    } else {
        (difference.abs().min(3.) * 10.).round() / 10.
    };
    (
        eq,
        if difference < 0. {
            [-trim, 0.]
        } else {
            [0., -trim]
        },
    )
}
impl RecordingProfile {
    pub fn create(id: String, mut report: Report, conditions: Conditions) -> Result<Self, String> {
        report.validate()?;
        report.refresh_correction_eligibility();
        if !report.correction_allowed {
            return Err("La prova non è abbastanza affidabile per creare un profilo. Risolvi gli avvisi bloccanti e ripetila.".into());
        }
        let (eq_bands, channel_gain_db) = correction(&report);
        let profile = Self {
            version: report.protocol,
            id,
            enabled: true,
            conditions,
            eq_bands,
            channel_gain_db,
            drive_limits: report
                .extended
                .as_ref()
                .map(|e| e.drive_limits.clone())
                .unwrap_or_default(),
            report,
        };
        profile.validate()?;
        Ok(profile)
    }
    pub fn validate(&self) -> Result<(), String> {
        self.report.validate()?;
        let mut measured = self.report.clone();
        measured.refresh_correction_eligibility();
        let c = &self.conditions;
        if ![44100, 48000, 88200, 96000].contains(&c.sample_rate)
            || ![1, 2].contains(&self.version)
            || self.version != self.report.protocol
            || self.id.is_empty()
            || self.id.len() > 128
            || !(32000..=192000).contains(&self.report.sample_rate)
            || c.name.trim().is_empty()
            || [&c.name, &c.deck, &c.tape, &c.output, &c.input, &c.notes]
                .iter()
                .any(|s| s.len() > 2048)
            || !measured.correction_allowed
            || self.eq_bands.iter().any(|v| !v.is_finite() || v.abs() > 3.)
            || self
                .channel_gain_db
                .iter()
                .any(|v| !v.is_finite() || !(-3. ..=0.).contains(v))
            || (self.eq_bands, self.channel_gain_db) != correction(&measured)
            || self.drive_limits
                != measured
                    .extended
                    .as_ref()
                    .map(|e| e.drive_limits.clone())
                    .unwrap_or_default()
        {
            return Err("Profilo di registrazione non valido o non coerente con la misura.".into());
        }
        Ok(())
    }
    pub fn transform(
        &self,
        source: &Path,
        target: &Path,
        cancel: &AtomicBool,
    ) -> Result<(), String> {
        self.validate()?;
        let mut reader = hound::WavReader::open(source).map_err(|e| e.to_string())?;
        let spec = reader.spec();
        if spec.channels != 2
            || spec.sample_format != hound::SampleFormat::Float
            || spec.bits_per_sample != 32
        {
            return Err("Il profilo richiede il master interno stereo float32.".into());
        }
        let mut writer = hound::WavWriter::create(target, spec).map_err(|e| e.to_string())?;
        let mut filters: Vec<_> = EQ_FREQUENCIES
            .iter()
            .zip(self.eq_bands)
            .filter(|(_, gain)| gain.abs() > 0.01)
            .map(|(&frequency, gain)| PeakFilter::new(frequency, gain, spec.sample_rate as f64))
            .collect();
        for (i, sample) in reader.samples::<f32>().enumerate() {
            if i % 8192 == 0 && cancel.load(Ordering::Relaxed) {
                return Err("Operazione annullata".into());
            }
            let channel = i % 2;
            let mut x = sample.map_err(|e| e.to_string())? as f64;
            for filter in &mut filters {
                x = filter.tick(x, channel);
            }
            x *= amp(self.channel_gain_db[channel]);
            if !x.is_finite() {
                return Err("Compensazione del profilo non finita.".into());
            }
            writer.write_sample(x as f32).map_err(|e| e.to_string())?;
        }
        writer.finalize().map_err(|e| e.to_string())
    }
}

/// Unity-gain RBJ bandpasses estimate the drive at each measured frequency.
/// The guard changes only the global pregain; it never clips or compresses samples.
pub(crate) struct LevelGuard {
    filters: Vec<(BandPass, ebur128::EbuR128, f64)>,
    buffer: Vec<f32>,
    gain: f64,
}
struct BandPass {
    b: [f64; 3],
    a: [f64; 2],
    z: [[f64; 2]; 2],
}
impl BandPass {
    fn new(frequency: f64, rate: f64) -> Self {
        let w = std::f64::consts::TAU * frequency / rate;
        let alpha = w.sin() / (2. * std::f64::consts::SQRT_2);
        let a0 = 1. + alpha;
        Self {
            b: [alpha / a0, 0., -alpha / a0],
            a: [-2. * w.cos() / a0, (1. - alpha) / a0],
            z: [[0.; 2]; 2],
        }
    }
    fn tick(&mut self, x: f64, c: usize) -> f64 {
        let z = &mut self.z[c];
        let y = self.b[0] * x + z[0];
        z[0] = self.b[1] * x - self.a[0] * y + z[1];
        z[1] = self.b[2] * x - self.a[1] * y;
        y
    }
}
impl LevelGuard {
    pub(crate) fn new(profile: Option<&RecordingProfile>, rate: u32) -> Result<Self, String> {
        let filters = profile
            .filter(|p| p.enabled)
            .map(|p| p.drive_limits.as_slice())
            .unwrap_or(&[])
            .iter()
            .map(|l| {
                let meter = ebur128::EbuR128::new(2, rate, ebur128::Mode::TRUE_PEAK)
                    .map_err(|e| e.to_string())?;
                Ok((
                    BandPass::new(l.frequency, rate as f64),
                    meter,
                    amp(l.max_input_peak_dbfs),
                ))
            })
            .collect::<Result<Vec<_>, String>>()?;
        Ok(Self {
            filters,
            buffer: Vec::new(),
            gain: 1.,
        })
    }
    pub(crate) fn push(&mut self, stereo: &[f32]) -> Result<(), String> {
        for (filter, meter, limit) in &mut self.filters {
            self.buffer.clear();
            self.buffer.reserve(stereo.len());
            for frame in stereo.chunks_exact(2) {
                for (c, &x) in frame.iter().enumerate() {
                    self.buffer.push(filter.tick(x as f64, c) as f32);
                }
            }
            meter
                .add_frames_f32(&self.buffer)
                .map_err(|e| e.to_string())?;
            for c in 0..2 {
                let peak = meter.true_peak(c).map_err(|e| e.to_string())?;
                self.gain = self.gain.min(*limit / peak.max(1e-20));
            }
        }
        Ok(())
    }
    pub(crate) fn gain(&self) -> f64 {
        self.gain.min(1.)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{audio, calibration, model::Project, render};
    use std::sync::atomic::AtomicU64;
    static NEXT: AtomicU64 = AtomicU64::new(0);
    struct Temp(std::path::PathBuf);
    impl Temp {
        fn new() -> Self {
            let path = std::env::temp_dir().join(format!(
                "cassette-profile-{}-{}",
                std::process::id(),
                NEXT.fetch_add(1, Ordering::Relaxed)
            ));
            std::fs::create_dir(&path).unwrap();
            Self(path)
        }
    }
    impl Drop for Temp {
        fn drop(&mut self) {
            let _ = std::fs::remove_dir_all(&self.0);
        }
    }
    fn profile() -> RecordingProfile {
        let mut report =
            calibration::analyze(&calibration::signal(48000), "test-loop.wav".into()).unwrap();
        report.bands[7].response_db = [-3., -3.];
        report.reference_dbfs[1] = report.reference_dbfs[0] - 1.;
        RecordingProfile::create(
            "test".into(),
            report,
            Conditions {
                sample_rate: 48000,
                name: "Deck + nastro".into(),
                deck: "Deck".into(),
                tape: "Type I".into(),
                output: "Output".into(),
                input: "Input".into(),
                notes: "REC LEVEL invariato".into(),
            },
        )
        .unwrap()
    }
    #[test]
    fn only_profile_name_is_required() {
        let mut p = profile();
        p.conditions.deck.clear();
        p.conditions.tape.clear();
        p.conditions.output.clear();
        p.conditions.input.clear();
        p.conditions.notes.clear();
        assert!(p.validate().is_ok());
        p.conditions.name = "  ".into();
        assert!(p.validate().is_err());
    }
    #[test]
    fn extended_profile_guards_only_the_relevant_bands_and_checks_nr_output() {
        let dir = Temp::new();
        let mut report =
            calibration::analyze(&calibration::signal_extended(48000), "v2".into()).unwrap();
        let ext = report.extended.as_mut().unwrap();
        for point in &mut ext.level_tests {
            if point.frequency == 8000. && point.input_dbfs > -12. {
                point.compression_db = [3.; 2];
            }
        }
        ext.drive_limits = crate::calibration_extended::estimate_limits(&ext.level_tests);
        let profile = RecordingProfile::create("v2".into(), report, profile().conditions).unwrap();
        assert_eq!(profile.version, 2);
        let mut project = Project {
            leader: 0.,
            trailer: 0.,
            recording_profile: Some(profile.clone()),
            ..Default::default()
        };
        project.processing.normalize = "off".into();
        for (frequency, nr) in [(8000., "off"), (315., "off"), (8000., "type_b")] {
            let source = dir.0.join(format!("source-{frequency}-{nr}.wav"));
            render::tone(&source, 48000, frequency, -6., 1., "sine").unwrap();
            let mut track = audio::import(&source).unwrap();
            track.fade_in = 0.;
            track.fade_out = 0.;
            project.tracks = vec![track.clone()];
            project.sides[0] = vec![track.id];
            project.processing.nr = nr.into();
            let target = dir.0.join(format!("master-{frequency}-{nr}.wav"));
            let result =
                render::render(&project, 0, &target, 32, &AtomicBool::new(false), |_, _| {})
                    .unwrap();
            if frequency == 8000. {
                assert!(result.attenuation < -7.4, "{}", result.attenuation);
            } else {
                assert_eq!(result.attenuation, 0.);
            }
            let mut guard = LevelGuard::new(Some(&profile), 48000).unwrap();
            guard
                .push(&audio::decode(&target).unwrap().samples)
                .unwrap();
            assert!(guard.gain() >= 1. - 1e-5, "{}", guard.gain());
            assert_eq!(result.clipped, 0);
        }
    }
    #[test]
    fn validates_measures_and_preserves_old_projects_and_profiles() {
        let p = profile();
        assert_eq!(p.eq_bands[7], 3.);
        assert_eq!(p.eq_bands[9], 0.);
        assert_eq!(p.channel_gain_db, [-1., 0.]);
        let mut old = serde_json::to_value(Project::default()).unwrap();
        old.as_object_mut().unwrap().remove("recording_profile");
        let restored: Project = serde_json::from_value(old).unwrap();
        assert!(restored.recording_profile.is_none());
        restored.validate().unwrap();
        let project = Project {
            recording_profile: Some(p.clone()),
            ..Default::default()
        };
        let restored: Project =
            serde_json::from_slice(&serde_json::to_vec(&project).unwrap()).unwrap();
        restored.validate().unwrap();
        assert_eq!(restored.recording_profile.unwrap().eq_bands, p.eq_bands);
        let mut different_input_rate = p.clone();
        different_input_rate.report.sample_rate = 44100;
        different_input_rate.validate().unwrap();
        assert_eq!(different_input_rate.conditions.sample_rate, 48000);
        let mut bad = p.clone();
        bad.eq_bands[7] = 12.;
        assert!(bad.validate().is_err());
        let mut bad = p.clone();
        bad.report.clipped_samples = [50000, 0];
        bad.report.correction_allowed = true;
        assert!(bad.validate().is_err());
        let mut noisy = p.report.clone();
        noisy.bands[7].rms_dbfs = [-65., -65.];
        noisy.noise_dbfs = [-60., -60.];
        let quiet = RecordingProfile::create("quiet".into(), noisy, p.conditions).unwrap();
        assert_eq!(quiet.eq_bands[7], 0.);
    }
    #[test]
    fn renderer_applies_profile_once_before_true_peak_and_preserves_frame_count() {
        let dir = Temp::new();
        let source = dir.0.join("source.wav");
        render::tone(&source, 48000, 4000., -5., 1., "sine").unwrap();
        let mut track = audio::import(&source).unwrap();
        track.fade_in = 0.;
        track.fade_out = 0.;
        let mut p = Project {
            leader: 0.,
            trailer: 0.,
            recording_profile: Some(profile()),
            ..Default::default()
        };
        p.processing.normalize = "off".into();
        p.processing.ceiling = -3.;
        p.sides[0] = vec![track.id.clone()];
        p.tracks = vec![track];
        let path = dir.0.join("master.wav");
        let result = render::render(&p, 0, &path, 32, &AtomicBool::new(false), |_, _| {}).unwrap();
        assert_eq!(result.frames, 48000);
        assert_eq!(result.clipped, 0);
        assert!(result.true_peak <= -2.99);
        assert!(result.attenuation < -0.5); // The +3 dB boost is included in peak protection.
        let pcm = audio::decode(&path).unwrap();
        let rms: [f64; 2] = std::array::from_fn(|c| {
            (pcm.samples[24000..72000]
                .chunks_exact(2)
                .map(|v| (v[c] as f64).powi(2))
                .sum::<f64>()
                / 24000.)
                .sqrt()
        });
        assert!((audio::db(rms[0] / rms[1]) + 1.).abs() < 0.01);
        p.recording_profile.as_mut().unwrap().enabled = false;
        let bypass = render::render(
            &p,
            0,
            &dir.0.join("bypass.wav"),
            32,
            &AtomicBool::new(false),
            |_, _| {},
        )
        .unwrap();
        assert_eq!(bypass.attenuation, 0.);
        p.recording_profile.as_mut().unwrap().enabled = true;
        p.processing.sample_rate = 44100;
        assert!(render::render(&p, 0, &path, 32, &AtomicBool::new(false), |_, _| {}).is_err());
        // Compare with an independently corrected source to prove the profile
        // runs before NR and is not applied a second time afterwards.
        p.processing.sample_rate = 48000;
        p.processing.nr = "type_b".into();
        let with_profile = dir.0.join("profile-nr.wav");
        render::render(&p, 0, &with_profile, 32, &AtomicBool::new(false), |_, _| {}).unwrap();
        let corrected = dir.0.join("corrected.wav");
        p.recording_profile
            .as_ref()
            .unwrap()
            .transform(&source, &corrected, &AtomicBool::new(false))
            .unwrap();
        let mut direct_track = audio::import(&corrected).unwrap();
        direct_track.fade_in = 0.;
        direct_track.fade_out = 0.;
        p.sides[0] = vec![direct_track.id.clone()];
        p.tracks = vec![direct_track];
        p.recording_profile = None;
        let direct = dir.0.join("direct-nr.wav");
        render::render(&p, 0, &direct, 32, &AtomicBool::new(false), |_, _| {}).unwrap();
        assert_eq!(
            audio::decode(&with_profile).unwrap().samples,
            audio::decode(&direct).unwrap().samples
        );
    }
}
