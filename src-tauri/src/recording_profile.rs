use crate::{audio::amp, calibration::Report};
use serde::{Deserialize, Serialize};

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
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub recording_level_db: Option<f64>,
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
    pub fn create(
        id: String,
        mut report: Report,
        conditions: Conditions,
        recording_level_db: Option<f64>,
    ) -> Result<Self, String> {
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
            recording_level_db,
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
            || self.recording_level_db.is_some_and(|level| {
                !(crate::calibration::MIN_RECORDING_LEVEL_DB..=0.).contains(&level)
            })
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
    use std::sync::atomic::{AtomicBool, AtomicU64, Ordering};
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
            None,
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
        let profile =
            RecordingProfile::create("v2".into(), report, profile().conditions, None).unwrap();
        assert_eq!(profile.version, 2);
        let mut project = Project {
            leader: 0.,
            trailer: 0.,
            recording_profile: Some(profile.clone()),
            ..Default::default()
        };
        project.processing.normalize = "off".into();
        project.processing.use_drive_limits = true;
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
        let quiet = RecordingProfile::create("quiet".into(), noisy, p.conditions, None).unwrap();
        assert_eq!(quiet.eq_bands[7], 0.);
    }
    #[test]
    fn saves_and_reopens_an_attenuated_profile_with_its_project() {
        let dir = Temp::new();
        let source = dir.0.join("attenuated-calibration.wav");
        calibration::write_playback_signal_with_gain(&source, 48000, -10.).unwrap();
        let report = calibration::analyze_file_with_gain(&source, -10.).unwrap();
        assert!((report.peak_dbfs[0] + 13.).abs() < 0.02);
        let profile = RecordingProfile::create(
            "attenuated".into(),
            report.clone(),
            Conditions {
                sample_rate: 48000,
                name: "Deck attenuato".into(),
                deck: "Deck".into(),
                tape: "Type I".into(),
                output: "UCA222".into(),
                input: "UCA222".into(),
                notes: "-13 dB".into(),
            },
            Some(-13.),
        )
        .unwrap();
        let mut project = Project {
            leader: 0.,
            trailer: 0.,
            calibration_report: Some(report),
            recording_profile: Some(profile),
            ..Default::default()
        };
        let tone = dir.0.join("tone.wav");
        render::tone(&tone, 48000, 1000., -6., 1., "sine").unwrap();
        let track = audio::import(&tone).unwrap();
        project.sides[0] = vec![track.id.clone()];
        project.tracks = vec![track];
        project.processing.normalize = "off".into();
        project.processing.ceiling = -5.;
        let path = dir.0.join("project.cassette.json");
        crate::storage::write_project(&path, &project).unwrap();
        let mut restored = crate::storage::load(&path).unwrap();
        assert_eq!(restored.processing.ceiling, -5.);
        assert_eq!(
            restored
                .recording_profile
                .as_ref()
                .unwrap()
                .recording_level_db,
            Some(-13.)
        );
        assert_eq!(
            restored
                .recording_profile
                .as_ref()
                .unwrap()
                .report
                .source_gain_db,
            -10.
        );
        assert_eq!(
            restored
                .calibration_report
                .as_ref()
                .unwrap()
                .extended
                .as_ref()
                .unwrap()
                .level_tests[0]
                .input_dbfs,
            -40.
        );
        for level in [-5., -13., -3.] {
            restored.processing.ceiling = level;
            let gain = level + 3.;
            let result = render::render(
                &restored,
                0,
                &dir.0.join("master.wav"),
                32,
                &AtomicBool::new(false),
                |_, _| {},
            )
            .unwrap();
            assert!((result.attenuation - gain).abs() < 0.001);
            assert!((result.true_peak - (-6. + gain)).abs() < 0.02);
        }
        restored.processing.normalize = "peak".into();
        restored.processing.ceiling = -13.;
        let normalized = render::render(
            &restored,
            0,
            &dir.0.join("normalized.wav"),
            32,
            &AtomicBool::new(false),
            |_, _| {},
        )
        .unwrap();
        assert!((normalized.true_peak + 13.).abs() < 0.02);
    }
    #[test]
    fn migrates_legacy_profile_settings_once_and_keeps_a_manual_eq() {
        let dir = Temp::new();
        let preset = profile();
        let project = Project {
            recording_profile: Some(preset.clone()),
            ..Default::default()
        };
        let mut legacy = serde_json::to_value(project).unwrap();
        let processing = legacy["processing"].as_object_mut().unwrap();
        for key in ["output_gain_db", "channel_gain_db", "use_drive_limits"] {
            processing.remove(key);
        }
        let path = dir.0.join("legacy.json");
        std::fs::write(&path, serde_json::to_vec(&legacy).unwrap()).unwrap();
        let mut migrated = crate::storage::load(&path).unwrap();
        assert_eq!(migrated.processing.legacy_output_gain_db, Some(0.));
        assert_eq!(migrated.processing.eq_bands, preset.eq_bands);
        assert_eq!(migrated.processing.channel_gain_db, preset.channel_gain_db);
        migrated.processing.eq_enabled = false;
        migrated.processing.channel_gain_db = [0.; 2];
        crate::storage::write_project(&path, &migrated).unwrap();
        let reopened = crate::storage::load(&path).unwrap();
        assert!(!reopened.processing.eq_enabled);
        assert_eq!(reopened.processing.channel_gain_db, [0.; 2]);

        let manual_path = dir.0.join("legacy-with-manual-eq.json");
        legacy["processing"]["eq_enabled"] = true.into();
        legacy["processing"]["eq_bands"][7] = 2.0.into();
        std::fs::write(&manual_path, serde_json::to_vec(&legacy).unwrap()).unwrap();
        let migrated = crate::storage::load(&manual_path).unwrap();
        assert_eq!(migrated.processing.eq_bands[7], 2.);
        let split_path = dir.0.join("legacy-split-levels.json");
        legacy["processing"]["ceiling"] = (-6.0).into();
        legacy["processing"]["output_gain_db"] = (-10.0).into();
        std::fs::write(&split_path, serde_json::to_vec(&legacy).unwrap()).unwrap();
        let migrated = crate::storage::load(&split_path).unwrap();
        assert_eq!(migrated.processing.ceiling, -13.);
        assert_eq!(migrated.processing.legacy_output_gain_db, Some(0.));
        crate::storage::write_project(&split_path, &migrated).unwrap();
        assert_eq!(
            crate::storage::load(&split_path)
                .unwrap()
                .processing
                .ceiling,
            -13.
        );
    }
    #[test]
    fn renderer_uses_editable_eq_and_stereo_trim_with_or_without_a_preset() {
        let dir = Temp::new();
        let source = dir.0.join("source.wav");
        render::tone(&source, 48000, 4000., -5., 1., "sine").unwrap();
        let mut track = audio::import(&source).unwrap();
        track.fade_in = 0.;
        track.fade_out = 0.;
        let preset = profile();
        let mut p = Project {
            leader: 0.,
            trailer: 0.,
            recording_profile: Some(preset.clone()),
            ..Default::default()
        };
        p.processing.normalize = "off".into();
        p.processing.ceiling = -3.;
        p.processing.eq_enabled = true;
        p.processing.eq_bands = preset.eq_bands;
        p.processing.channel_gain_db = preset.channel_gain_db;
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
        p.processing.ceiling = -8.;
        let reduced = render::render(&p, 0, &path, 32, &AtomicBool::new(false), |_, _| {}).unwrap();
        assert!((reduced.true_peak + 8.).abs() < 0.02);
        p.processing.ceiling = -3.;
        p.processing.eq_enabled = false;
        p.processing.channel_gain_db = [0.; 2];
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
        p.processing.sample_rate = 44100;
        assert!(render::render(&p, 0, &path, 32, &AtomicBool::new(false), |_, _| {}).is_ok());

        p.processing.sample_rate = 48000;
        p.processing.nr = "type_b".into();
        p.processing.eq_enabled = true;
        p.processing.channel_gain_db = [-2., 0.];
        p.processing.ceiling = -16.;
        let with_profile = dir.0.join("profile-nr.wav");
        render::render(&p, 0, &with_profile, 32, &AtomicBool::new(false), |_, _| {}).unwrap();
        p.recording_profile = None;
        let direct = dir.0.join("direct-nr.wav");
        render::render(&p, 0, &direct, 32, &AtomicBool::new(false), |_, _| {}).unwrap();
        assert_eq!(
            audio::decode(&with_profile).unwrap().samples,
            audio::decode(&direct).unwrap().samples
        );
    }
}
