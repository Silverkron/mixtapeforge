use serde::{Deserialize, Serialize};
use std::collections::HashSet;

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct Analysis {
    pub peak: f64,
    pub rms: f64,
    pub lufs: Option<f64>,
    pub true_peak: f64,
    pub peak_time: f64,
    pub rms_time: f64,
    pub vu_peak: f64,
    pub quasi_peak: f64,
    pub waveform: Vec<f32>,
    pub silence_start: f64,
    pub silence_end: f64,
}
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct Track {
    pub id: String,
    pub path: String,
    pub title: String,
    pub artist: String,
    pub duration: f64,
    pub sample_rate: u32,
    pub hash: String,
    pub analysis: Analysis,
    pub trim_start: f64,
    pub trim_end: f64,
    pub gain: f64,
    pub fade_in: f64,
    pub fade_out: f64,
    pub gap: f64,
    pub locked: bool,
}
impl Track {
    pub fn length(&self) -> f64 {
        (self.duration - self.trim_start - self.trim_end).max(0.0)
    }
}
#[derive(Clone, Serialize, Deserialize, Debug)]
#[serde(default)]
pub struct Processing {
    pub vst: Option<crate::vst::VstEffect>,
    pub normalize: String,
    pub target_lufs: f64,
    pub ceiling: f64,
    pub dynamics: String,
    pub threshold: f64,
    pub ratio: f64,
    pub nr: String,
    pub nr_reference: f64,
    pub eq: String,
    pub eq_enabled: bool,
    pub eq_bands: [f64; 10],
    pub attack_ms: f64,
    pub release_ms: f64,
    pub knee_db: f64,
    pub makeup_db: f64,
    pub crossfade: f64,
    pub sample_rate: u32,
}
impl Default for Processing {
    fn default() -> Self {
        Self {
            vst: None,
            normalize: "peak".into(),
            target_lufs: -18.0,
            ceiling: -3.0,
            dynamics: "off".into(),
            threshold: -12.0,
            ratio: 2.0,
            nr: "off".into(),
            nr_reference: 0.0,
            eq: "off".into(),
            eq_enabled: false,
            eq_bands: [0.0; 10],
            attack_ms: 5.0,
            release_ms: 150.0,
            knee_db: 6.0,
            makeup_db: 0.0,
            crossfade: 0.0,
            sample_rate: 48000,
        }
    }
}
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct Calibration {
    pub name: String,
    pub deck: String,
    pub tape: String,
    pub reference: f64,
    pub mol: f64,
    pub snr: f64,
    pub device: String,
    pub verified: bool,
    pub notes: String,
}
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct Project {
    pub schema: u32,
    pub title: String,
    pub subtitle: String,
    pub tape: String,
    pub capacity: [f64; 2],
    pub margin: f64,
    pub leader: f64,
    pub trailer: f64,
    pub tracks: Vec<Track>,
    pub sides: [Vec<String>; 2],
    pub processing: Processing,
    pub calibration: Option<Calibration>,
    #[serde(default)]
    pub calibration_report: Option<crate::calibration::Report>,
    #[serde(default)]
    pub recording_profile: Option<crate::recording_profile::RecordingProfile>,
    pub color: String,
    #[serde(default)]
    pub artwork: Option<crate::artwork::ArtworkSettings>,
}
impl Default for Project {
    fn default() -> Self {
        Self {
            schema: 1,
            title: "La mia mixtape".into(),
            subtitle: "".into(),
            tape: "C90".into(),
            capacity: [2700.0; 2],
            margin: 15.0,
            leader: 3.0,
            trailer: 3.0,
            tracks: vec![],
            sides: [vec![], vec![]],
            processing: Processing::default(),
            calibration: None,
            calibration_report: None,
            recording_profile: None,
            color: "#c4adff".into(),
            artwork: None,
        }
    }
}
impl Project {
    pub fn track(&self, id: &str) -> Option<&Track> {
        self.tracks.iter().find(|t| t.id == id)
    }
    pub fn side_duration(&self, side: usize) -> f64 {
        let tracks: Vec<_> = self.sides[side]
            .iter()
            .filter_map(|id| self.track(id))
            .collect();
        if tracks.is_empty() {
            return 0.0;
        }
        let mut n = self.leader
            + self.trailer
            + self
                .processing
                .vst
                .as_ref()
                .filter(|v| v.enabled)
                .map(|v| v.tail_seconds)
                .unwrap_or(0.0);
        for (i, t) in tracks.iter().enumerate() {
            n += t.length();
            if let Some(next) = tracks.get(i + 1) {
                if self.processing.crossfade > 0.0 {
                    n -= self
                        .processing
                        .crossfade
                        .min(t.length() / 2.0)
                        .min(next.length() / 2.0);
                } else {
                    n += t.gap;
                }
            }
        }
        n
    }
    pub fn validate(&self) -> Result<(), String> {
        if let Some(profile) = &self.recording_profile {
            profile.validate()?;
        }
        if let Some(report) = &self.calibration_report {
            report.validate()?;
        }
        if let Some(v) = &self.processing.vst {
            if !v.tail_seconds.is_finite()
                || !(0.0..=30.0).contains(&v.tail_seconds)
                || v.parameters.len() > 16384
                || v.parameters
                    .iter()
                    .any(|p| !p.is_finite() || !(0.0..=1.0).contains(p))
            {
                return Err("Parametri VST3 non validi".into());
            }
        }
        if self.schema != 1 {
            return Err("Versione del progetto non supportata".into());
        }
        if let Some(artwork) = &self.artwork {
            artwork.validate()?;
        }
        for n in self.capacity {
            if !n.is_finite() || !(10.0..=14400.0).contains(&n) {
                return Err("Durata lato non valida".into());
            }
        }
        for n in [
            self.margin,
            self.leader,
            self.trailer,
            self.processing.crossfade,
        ] {
            if !n.is_finite() || !(0.0..=120.0).contains(&n) {
                return Err("Durata o margine non validi".into());
            }
        }
        if ![44100, 48000, 88200, 96000].contains(&self.processing.sample_rate) {
            return Err("Frequenza progetto non supportata".into());
        }
        let q = &self.processing;
        if !["off", "type_b"].contains(&q.nr.as_str()) {
            return Err("Encoder NR non disponibile".into());
        }
        if !["off", "peak", "quasi", "vu", "rms", "lufs", "album"].contains(&q.normalize.as_str())
            || !["off", "compress", "expand", "alc", "fit"].contains(&q.dynamics.as_str())
            || !["off", "120to70", "70to120"].contains(&q.eq.as_str())
        {
            return Err("Processore sconosciuto".into());
        }
        for (v, min, max) in [
            (q.target_lufs, -36.0, -5.0),
            (q.ceiling, -24.0, 0.0),
            (q.threshold, -60.0, 0.0),
            (q.ratio, 1.0, 12.0),
            (q.nr_reference, -36.0, 0.0),
            (q.attack_ms, 0.1, 200.0),
            (q.release_ms, 10.0, 2000.0),
            (q.knee_db, 0.0, 24.0),
            (q.makeup_db, -12.0, 24.0),
        ] {
            if !v.is_finite() || v < min || v > max {
                return Err("Parametro DSP fuori intervallo".into());
            }
        }
        if q.eq_bands.iter().any(|v| !v.is_finite() || v.abs() > 12.0) {
            return Err("Banda EQ fuori intervallo".into());
        }
        let mut ids = HashSet::new();
        for t in &self.tracks {
            if !ids.insert(&t.id) {
                return Err("ID traccia duplicato".into());
            }
            if !t.duration.is_finite() || t.duration <= 0.0 {
                return Err("Durata traccia non valida".into());
            }
            for n in [t.trim_start, t.trim_end, t.fade_in, t.fade_out, t.gap] {
                if !n.is_finite() || n < 0.0 {
                    return Err("Tagli e transizioni devono essere positivi".into());
                }
            }
            if t.length() < 0.01
                || t.trim_start + t.trim_end >= t.duration
                || t.fade_in > t.length()
                || t.fade_out > t.length()
                || !t.gain.is_finite()
                || t.gain.abs() > 36.0
                || t.gap > 120.0
            {
                return Err(format!("Modifica non valida: {}", t.title));
            }
        }
        let mut placed = HashSet::new();
        for id in self.sides.iter().flatten() {
            if !ids.contains(id) || !placed.insert(id) {
                return Err("Riferimento traccia assente o duplicato nei lati".into());
            }
        }
        if placed.len() != ids.len() {
            return Err("Ogni traccia deve appartenere a un lato".into());
        }
        Ok(())
    }
}

pub fn fit(project: &Project, preserve: bool) -> Result<Project, String> {
    project.validate()?;
    if project.tracks.iter().any(|t| t.locked) && preserve {
        return Err(
            "Sblocca i brani per dividere mantenendo l'ordine, oppure usa il fit con vincoli"
                .into(),
        );
    }
    let mut result = project.clone();
    let order: Vec<String> = project.sides.iter().flatten().cloned().collect();
    if preserve {
        let mut best = None;
        for split in 0..=order.len() {
            let mut p = project.clone();
            p.sides = [order[..split].to_vec(), order[split..].to_vec()];
            let a = p.side_duration(0);
            let b = p.side_duration(1);
            if a <= p.capacity[0] - p.margin && b <= p.capacity[1] - p.margin {
                let score = (a - b).abs();
                if best.as_ref().is_none_or(|(s, _)| score < *s) {
                    best = Some((score, p));
                }
            }
        }
        return best
            .map(|(_, p)| p)
            .ok_or("Impossibile mantenere l'ordine senza superare la capacità".into());
    }
    result.sides = [vec![], vec![]];
    let mut free = vec![];
    for (side, list) in project.sides.iter().enumerate() {
        for id in list {
            if project.track(id).unwrap().locked {
                result.sides[side].push(id.clone())
            } else {
                free.push(id.clone())
            }
        }
    }
    free.sort_by(|a, b| {
        project
            .track(b)
            .unwrap()
            .length()
            .total_cmp(&project.track(a).unwrap().length())
    });
    for id in free {
        let mut choices = vec![];
        for side in 0..2 {
            let mut p = result.clone();
            p.sides[side].push(id.clone());
            let n = p.side_duration(side);
            if n <= p.capacity[side] - p.margin {
                choices.push((n / p.capacity[side], side))
            }
        }
        choices.sort_by(|a, b| a.0.total_cmp(&b.0));
        let side=choices.first().ok_or("Il fit non trova spazio con questi vincoli. Aumenta la durata o riduci i gap; nessun brano è stato rimosso.")?.1;
        result.sides[side].push(id);
    }
    // Restore relative order inside each side, including locked positions.
    for side in &mut result.sides {
        side.sort_by_key(|id| order.iter().position(|x| x == id).unwrap())
    }
    for (s, list) in project.sides.iter().enumerate() {
        for (index, id) in list.iter().enumerate() {
            if project.track(id).unwrap().locked && result.sides[s].get(index) != Some(id) {
                return Err(
                    "Il fit non può conservare la posizione di tutti i brani bloccati".into(),
                );
            }
        }
    }
    Ok(result)
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn nr_defaults_to_zero_and_preserves_saved_references() {
        let p = Project::default();
        assert_eq!(p.processing.nr_reference, 0.0);
        p.validate().unwrap();
        let mut json = serde_json::to_value(&p).unwrap();
        json["processing"]["nr_reference"] = serde_json::json!(-18.0);
        let mut old: Project = serde_json::from_value(json).unwrap();
        old.validate().unwrap();
        assert_eq!(old.processing.nr_reference, -18.0);
        old.processing.nr_reference = 0.5;
        assert!(old.validate().is_err());
    }
    #[test]
    fn processing_migrates_old_projects_and_rejects_bad_bands() {
        let mut value = serde_json::to_value(Project::default()).unwrap();
        for key in [
            "nr",
            "nr_reference",
            "eq_enabled",
            "eq_bands",
            "attack_ms",
            "release_ms",
            "knee_db",
            "makeup_db",
        ] {
            value["processing"].as_object_mut().unwrap().remove(key);
        }
        let mut p: Project = serde_json::from_value(value).unwrap();
        p.validate().unwrap();
        assert_eq!(p.processing.eq_bands, [0.0; 10]);
        assert_eq!(p.processing.attack_ms, 5.0);
        p.processing.eq_bands[0] = 12.1;
        assert!(p.validate().is_err());
        p.processing.eq_bands[0] = f64::NAN;
        assert!(p.validate().is_err());
    }
    #[test]
    fn empty_side_has_no_leader() {
        assert_eq!(Project::default().side_duration(0), 0.0)
    }
    #[test]
    fn rejects_unknown_schema() {
        let p = Project {
            schema: 2,
            ..Default::default()
        };
        assert!(p.validate().is_err())
    }
    #[test]
    fn rejects_bad_parameters() {
        let mut p = Project::default();
        p.processing.ratio = f64::NAN;
        assert!(p.validate().is_err())
    }
}
