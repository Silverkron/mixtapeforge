//! One-pass off-tape test. Measurements describe the entire analog loop.
use crate::audio::{amp, db, Pcm};
use rustfft::{num_complex::Complex, FftPlanner};
use serde::{Deserialize, Serialize};
use std::{f64::consts::PI, path::Path};
const RATE: u32 = 48000; // Reference rate for marker correlation; output uses project rate.
const MARKER: f64 = 0.6;
const FREQUENCIES: [f64; 10] = [
    31.5, 63., 125., 250., 500., 1000., 2000., 4000., 8000., 16000.,
];
#[derive(Clone, Deserialize)]
pub(crate) struct Segment {
    pub start: f64,
    pub duration: f64,
    pub frequency: f64,
    pub level: f64,
    pub channel: Option<usize>,
}
#[derive(Deserialize)]
struct Protocol {
    duration: f64,
    final_marker: f64,
    segments: Vec<Segment>,
}
pub(crate) fn extended_layout() -> (Vec<Segment>, f64, f64) {
    let spec: Protocol = serde_json::from_str(include_str!("../../src/calibration-protocol.json"))
        .expect("Bundled calibration protocol");
    (spec.segments, spec.final_marker, spec.duration)
}
fn layout() -> (Vec<Segment>, f64, f64) {
    let mut time = 4.;
    let mut segments = Vec::new();
    let mut add = |duration, frequency, level, channel| {
        segments.push(Segment {
            start: time,
            duration,
            frequency,
            level,
            channel,
        });
        time += duration;
    };
    add(2., 315., -18., None);
    for f in FREQUENCIES {
        add(1.8, f, -24., None);
    }
    add(4., 0., -120., None);
    for level in [-30., -24., -18., -12., -9., -6., -3.] {
        add(2., 315., level, None);
    }
    add(2., 1000., -18., Some(0));
    add(2., 1000., -18., Some(1));
    (segments, time + 1., time + 3.)
}
fn marker(t: f64) -> f64 {
    let envelope = (t / 0.02).min((MARKER - t) / 0.02).clamp(0., 1.);
    envelope
        * amp(-18.)
        * (0.65 * (2. * PI * (170. * t + 250. * t * t)).sin()
            + 0.35 * (2. * PI * (311. * t + 83. * t * t * t)).sin())
}
pub fn signal(rate: u32) -> Pcm {
    sequence(rate, layout())
}
pub fn signal_extended(rate: u32) -> Pcm {
    sequence(rate, extended_layout())
}
fn sequence(rate: u32, (segments, end, duration): (Vec<Segment>, f64, f64)) -> Pcm {
    let mut samples = vec![0.; (duration * rate as f64) as usize * 2];
    for s in segments {
        if s.frequency == 0. {
            continue;
        }
        for i in 0..(s.duration * rate as f64) as usize {
            let t = i as f64 / rate as f64;
            let fade = (t / 0.025).min((s.duration - t) / 0.025).clamp(0., 1.);
            let v = (amp(s.level) * fade * (2. * PI * s.frequency * t).sin()) as f32;
            let offset = ((s.start * rate as f64) as usize + i) * 2;
            for ch in 0..2 {
                if s.channel.is_none() || s.channel == Some(ch) {
                    samples[offset + ch] = v;
                }
            }
        }
    }
    for start in [2., end] {
        for i in 0..(MARKER * rate as f64) as usize {
            let at = ((start * rate as f64) as usize + i) * 2;
            let v = marker(i as f64 / rate as f64) as f32;
            samples[at] = v;
            samples[at + 1] = v;
        }
    }
    Pcm { samples, rate }
}
pub fn write_signal(path: &Path, rate: u32) -> Result<(), String> {
    write_signal_with_gain(path, rate, 0.)
}
pub fn write_signal_with_gain(path: &Path, rate: u32, gain_db: f64) -> Result<(), String> {
    write_sequence(path, rate, false, gain_db)
}
/// Internal player contract: stereo IEEE float32 at the project rate.
pub fn write_playback_signal(path: &Path, rate: u32) -> Result<(), String> {
    write_playback_signal_with_gain(path, rate, 0.)
}
pub fn write_playback_signal_with_gain(path: &Path, rate: u32, gain_db: f64) -> Result<(), String> {
    write_sequence(path, rate, true, gain_db)
}
fn write_sequence(path: &Path, rate: u32, playback: bool, gain_db: f64) -> Result<(), String> {
    if ![44100, 48000, 88200, 96000].contains(&rate) {
        return Err("Frequenza di calibrazione non supportata".into());
    }
    if !(-24. ..=0.).contains(&gain_db) || !gain_db.is_finite() {
        return Err("Attenuazione di calibrazione non valida".into());
    }
    let pcm = signal_extended(rate);
    let spec = hound::WavSpec {
        channels: 2,
        sample_rate: rate,
        bits_per_sample: if playback { 32 } else { 24 },
        sample_format: if playback {
            hound::SampleFormat::Float
        } else {
            hound::SampleFormat::Int
        },
    };
    let mut w = hound::WavWriter::create(path, spec).map_err(|e| e.to_string())?;
    for x in pcm.samples {
        let x = (x as f64 * amp(gain_db)) as f32;
        if playback {
            w.write_sample(x).map_err(|e| e.to_string())?;
        } else {
            w.write_sample((x as f64 * 8388607.).round() as i32)
                .map_err(|e| e.to_string())?;
        }
    }
    w.finalize().map_err(|e| e.to_string())
}
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Band {
    pub frequency: f64,
    pub response_db: [f64; 2],
    pub rms_dbfs: [f64; 2],
}
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Level {
    pub input_dbfs: f64,
    pub output_dbfs: [f64; 2],
    pub compression_db: [f64; 2],
    pub thd_percent: [f64; 2],
    pub hd3_percent: [f64; 2],
}
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Report {
    pub protocol: u32,
    pub source: String,
    pub sample_rate: u32,
    #[serde(default)]
    pub source_gain_db: f64,
    pub duration: f64,
    pub delay_seconds: f64,
    pub time_scale: f64,
    pub sync_confidence: f64,
    pub reference_dbfs: [f64; 2],
    pub imbalance_db: f64,
    pub noise_dbfs: [f64; 2],
    pub snr_db: [f64; 2],
    pub hiss_dbfs: [f64; 2],
    pub peak_dbfs: [f64; 2],
    pub clipped_samples: [usize; 2],
    pub crosstalk_db: [f64; 2],
    pub bands: Vec<Band>,
    pub levels: Vec<Level>,
    pub warnings: Vec<String>,
    pub correction_allowed: bool,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub extended: Option<crate::calibration_extended::ExtendedReport>,
}
impl Report {
    /// Derived policy, refreshed for reports saved by older versions as well.
    pub fn refresh_correction_eligibility(&mut self) {
        // At most 1 ms total per channel, independent of the capture's sample rate
        // and duration. A longer recording must not hide sustained clipping.
        let tolerance = self.sample_rate as usize / 1000;
        let significant_clipping = self.clipped_samples.iter().any(|&n| n > tolerance);
        self.warnings
            .retain(|w| !w.starts_with("Clipping digitale:"));
        if self.clipped_samples.iter().any(|&n| n > 0) {
            self.warnings.insert(0, if significant_clipping {
                "Clipping digitale: superata la tolleranza di 1 ms per canale. Abbassa il guadagno d’ingresso della scheda e ripeti la prova."
            } else {
                "Clipping digitale: picchi brevi entro la tolleranza di 1 ms per canale. Questi picchi non bloccano l’EQ; per una misura più precisa ripeti con un guadagno d’ingresso inferiore."
            }.into());
        }
        self.correction_allowed = !significant_clipping
            && self.reference_dbfs.iter().all(|v| *v > -50.)
            && self.crosstalk_db.iter().all(|v| *v < -10.)
            && self.sync_confidence >= 0.8;
    }
    pub fn validate(&self) -> Result<(), String> {
        let arrays = [
            self.reference_dbfs,
            self.noise_dbfs,
            self.snr_db,
            self.hiss_dbfs,
            self.peak_dbfs,
            self.crosstalk_db,
        ];
        if ![1, 2].contains(&self.protocol)
            || (self.protocol == 2) != self.extended.is_some()
            || !(-24. ..=0.).contains(&self.source_gain_db)
            || !self.source_gain_db.is_finite()
            || self.bands.len() != 10
            || self.levels.len() != 7
            || !self.time_scale.is_finite()
            || !(0.97..=1.03).contains(&self.time_scale)
            || !self.delay_seconds.is_finite()
            || !self.duration.is_finite()
            || !(0.0..=180.).contains(&self.duration)
            || !self.sync_confidence.is_finite()
            || !(0.0..=1.).contains(&self.sync_confidence)
            || !self.imbalance_db.is_finite()
            || arrays.iter().flatten().any(|v| !v.is_finite())
            || self.bands.iter().zip(FREQUENCIES).any(|(b, f)| {
                b.frequency != f
                    || b.response_db
                        .iter()
                        .chain(&b.rms_dbfs)
                        .any(|v| !v.is_finite())
            })
            || self.levels.iter().any(|l| {
                !l.input_dbfs.is_finite()
                    || [
                        l.output_dbfs,
                        l.compression_db,
                        l.thd_percent,
                        l.hd3_percent,
                    ]
                    .iter()
                    .flatten()
                    .any(|v| !v.is_finite())
            })
        {
            return Err("Rapporto di calibrazione non valido".into());
        }
        if let Some(extended) = &self.extended {
            extended.validate(self.source_gain_db)?;
        }
        Ok(())
    }
}
fn read(path: &Path) -> Result<Pcm, String> {
    let mut r = hound::WavReader::open(path).map_err(|e| format!("WAV non leggibile: {e}"))?;
    let s = r.spec();
    if s.channels != 2 || !(32000..=192000).contains(&s.sample_rate) {
        return Err("Importa un WAV stereo tra 32 e 192 kHz".into());
    }
    if r.duration() as f64 / s.sample_rate as f64 > 180. {
        return Err("La prova può durare al massimo 3 minuti".into());
    }
    let samples: Vec<f32> = match s.sample_format {
        hound::SampleFormat::Float => r
            .samples::<f32>()
            .collect::<Result<_, _>>()
            .map_err(|e| e.to_string())?,
        hound::SampleFormat::Int => r
            .samples::<i32>()
            .map(|x| x.map(|v| v as f32 / (2f64.powi(s.bits_per_sample as i32 - 1)) as f32))
            .collect::<Result<_, _>>()
            .map_err(|e| e.to_string())?,
    };
    if samples.iter().any(|x| !x.is_finite()) {
        return Err("Il WAV contiene valori audio non validi".into());
    }
    Ok(Pcm {
        samples,
        rate: s.sample_rate,
    })
}
pub fn analyze_file(path: &Path) -> Result<Report, String> {
    analyze_file_with_gain(path, 0.)
}
pub fn analyze_file_with_gain(path: &Path, gain_db: f64) -> Result<Report, String> {
    let pcm = read(path)?;
    analyze_with_gain(
        &pcm,
        path.file_name()
            .unwrap_or_default()
            .to_string_lossy()
            .into(),
        gain_db,
    )
}
// 2 kHz box averages are used ONLY to locate sync markers. Audio measurements
// below always use native contiguous samples, not a resampled waveform.
fn coarse(p: &Pcm) -> Vec<f64> {
    let frames = p.samples.len() / 2;
    (0..(frames as f64 * 2000. / p.rate as f64) as usize)
        .map(|i| {
            let a = (i as f64 * p.rate as f64 / 2000.) as usize;
            let b = (((i + 1) as f64 * p.rate as f64 / 2000.) as usize).min(frames);
            (a..b).map(|j| p.samples[j * 2] as f64).sum::<f64>() / (b - a).max(1) as f64
        })
        .collect()
}
fn locate(x: &[f64], template: &[f64], from: usize, to: usize) -> (usize, f64) {
    let to = to.min(x.len().saturating_sub(template.len()));
    if from >= to {
        return (0, 0.);
    }
    let slice = &x[from..to + template.len()];
    let n = (slice.len() + template.len()).next_power_of_two();
    let mut a = vec![Complex::new(0., 0.); n];
    let mut b = a.clone();
    for (i, v) in slice.iter().enumerate() {
        a[i].re = *v;
    }
    for (i, v) in template.iter().enumerate() {
        b[i].re = *v;
    }
    let mut planner = FftPlanner::<f64>::new();
    let fft = planner.plan_fft_forward(n);
    fft.process(&mut a);
    fft.process(&mut b);
    for (v, w) in a.iter_mut().zip(b) {
        *v *= w.conj();
    }
    planner.plan_fft_inverse(n).process(&mut a);
    let energy = template.iter().map(|v| v * v).sum::<f64>();
    let mut rolling = slice[..template.len()].iter().map(|v| v * v).sum::<f64>();
    let mut best = (0, 0.);
    for i in 0..to - from {
        if i > 0 {
            rolling += slice[i + template.len() - 1].powi(2) - slice[i - 1].powi(2);
        }
        if rolling < 1e-10 {
            continue;
        }
        let score = (a[i].re.abs() / n as f64 / (energy * rolling).sqrt()).min(1.);
        if score > best.1 {
            best = (i + from, score);
        }
    }
    best
}
/// Streaming detector for the guided test only. It never runs in the audio callback.
/// Both sync markers and their expected separation are required; silence alone cannot stop it.
pub struct CaptureAutoStop {
    rate: u32,
    frames: u64,
    sum: f64,
    count: usize,
    coarse: Vec<f64>,
    template: Vec<f64>,
    scanned: usize,
    first: Option<f64>,
    stop_at: Option<f64>,
    gaps: [f64; 2],
}
impl CaptureAutoStop {
    pub fn new(rate: u32) -> Self {
        let template = coarse(&Pcm {
            samples: (0..(MARKER * RATE as f64) as usize)
                .flat_map(|i| {
                    let v = marker(i as f64 / RATE as f64) as f32;
                    [v, v]
                })
                .collect(),
            rate: RATE,
        });
        Self {
            rate,
            frames: 0,
            sum: 0.,
            count: 0,
            coarse: Vec::new(),
            template,
            scanned: 0,
            first: None,
            stop_at: None,
            gaps: [45., extended_layout().1 - 2.],
        }
    }
    pub fn push(&mut self, stereo: &[f32]) -> bool {
        for frame in stereo.chunks_exact(2) {
            if self.frames >= self.rate as u64 * 180 {
                break;
            }
            self.sum += frame[0] as f64;
            self.count += 1;
            self.frames += 1;
            let boundary = (self.coarse.len() as u64 + 1) * self.rate as u64 / 2000;
            if self.frames >= boundary {
                self.coarse.push(self.sum / self.count as f64);
                self.sum = 0.;
                self.count = 0;
            }
        }
        let elapsed = self.frames as f64 / self.rate as f64;
        if let Some(stop_at) = self.stop_at {
            return elapsed >= stop_at;
        }
        let available = self.coarse.len().saturating_sub(self.template.len());
        if let Some(first) = self.first {
            for gap in self.gaps {
                let from = self.scanned.max(((first + gap * 0.97) * 2000.) as usize);
                let to = available.min(((first + gap * 1.03) * 2000.) as usize);
                if from >= to {
                    continue;
                }
                let (at, confidence) = locate(&self.coarse, &self.template, from, to);
                let position = at as f64 / 2000.;
                let scale = (position - first) / gap;
                if confidence >= 0.8 && (0.97..=1.03).contains(&scale) {
                    self.stop_at = Some(position + 2. * scale + 0.25);
                    break;
                }
            }
            self.scanned = self.scanned.max(available);
        } else {
            let to = available.min(30 * 2000);
            if to > self.scanned {
                let (at, confidence) = locate(&self.coarse, &self.template, self.scanned, to);
                self.scanned = to;
                if confidence >= 0.8 {
                    self.first = Some(at as f64 / 2000.);
                }
            }
        }
        self.stop_at.is_some_and(|end| elapsed >= end)
    }
}
pub(crate) fn slice(p: &Pcm, start: f64, end: f64) -> &[f32] {
    let a = (start * p.rate as f64).round().max(0.) as usize * 2;
    let b = (end * p.rate as f64).round().max(0.) as usize * 2;
    &p.samples[a.min(p.samples.len())..b.min(p.samples.len())]
}
pub(crate) fn rms(x: &[f32]) -> [f64; 2] {
    let mut mean = [0.; 2];
    let n = (x.len() / 2).max(1) as f64;
    for pair in x.chunks_exact(2) {
        for c in 0..2 {
            mean[c] += pair[c] as f64 / n;
        }
    }
    let mut energy = [0.; 2];
    for pair in x.chunks_exact(2) {
        for c in 0..2 {
            energy[c] += (pair[c] as f64 - mean[c]).powi(2) / n;
        }
    }
    energy.map(f64::sqrt)
}
fn spectrum(x: &[f32], rate: u32, channel: usize) -> Vec<f64> {
    let frames = (x.len() / 2).min(65536);
    let n = frames.next_power_of_two();
    let mut bins = vec![Complex::new(0., 0.); n];
    let mut norm = 0.;
    for i in 0..frames {
        let w = 0.5 - 0.5 * (2. * PI * i as f64 / (frames - 1).max(1) as f64).cos();
        bins[i].re = x[i * 2 + channel] as f64 * w;
        norm += w * w;
    }
    FftPlanner::new().plan_fft_forward(n).process(&mut bins);
    let _ = rate;
    bins[..n / 2 + 1]
        .iter()
        .enumerate()
        .map(|(i, v)| {
            v.norm_sqr() / norm.max(1e-20) / n as f64 * if i == 0 || i == n / 2 { 1. } else { 2. }
        })
        .collect()
}
fn band_power(power: &[f64], rate: u32, lo: f64, hi: f64) -> f64 {
    let n = (power.len() - 1) * 2;
    power
        .iter()
        .enumerate()
        .filter(|(i, _)| {
            let f = *i as f64 * rate as f64 / n as f64;
            f >= lo && f <= hi
        })
        .map(|(_, v)| v)
        .sum()
}
pub(crate) fn harmonics(x: &[f32], rate: u32, target: f64) -> ([f64; 2], [f64; 2]) {
    let mut thd = [0.; 2];
    let mut hd3 = [0.; 2];
    for c in 0..2 {
        let p = spectrum(x, rate, c);
        let n = (p.len() - 1) * 2;
        let bin = p
            .iter()
            .enumerate()
            .filter(|(i, _)| {
                let f = *i as f64 * rate as f64 / n as f64;
                (target * 0.95..target * 1.05).contains(&f)
            })
            .max_by(|a, b| a.1.total_cmp(b.1))
            .map(|v| v.0)
            .unwrap_or(0);
        let f = bin as f64 * rate as f64 / n as f64;
        let width = 12.;
        let fundamental = band_power(&p, rate, f - width, f + width).max(1e-20);
        let second = band_power(&p, rate, 2. * f - width, 2. * f + width);
        let third = band_power(&p, rate, 3. * f - width, 3. * f + width);
        thd[c] = ((second + third) / fundamental).sqrt() * 100.;
        hd3[c] = (third / fundamental).sqrt() * 100.;
    }
    (thd, hd3)
}
pub fn analyze(p: &Pcm, source: String) -> Result<Report, String> {
    analyze_with_gain(p, source, 0.)
}
pub fn analyze_with_gain(p: &Pcm, source: String, source_gain_db: f64) -> Result<Report, String> {
    if p.samples.len() < p.rate as usize * 2 * 40
        || p.samples.len() > p.rate as usize * 2 * 180
        || !(-24. ..=0.).contains(&source_gain_db)
        || !source_gain_db.is_finite()
        || p.samples.iter().any(|v| !v.is_finite())
    {
        return Err(
            "Prova incompleta o non valida: registra tutta la sequenza, inclusi i due marcatori"
                .into(),
        );
    }
    let x = coarse(p);
    let template = coarse(&Pcm {
        samples: (0..(MARKER * RATE as f64) as usize)
            .flat_map(|i| {
                let v = marker(i as f64 / RATE as f64) as f32;
                [v, v]
            })
            .collect(),
        rate: RATE,
    });
    let first = locate(&x, &template, 0, (30. * 2000.) as usize);
    let mut found = None;
    for protocol in [1, 2] {
        let (_, last_marker, _) = if protocol == 1 {
            layout()
        } else {
            extended_layout()
        };
        let gap = last_marker - 2.;
        let expected = first.0 as f64 + gap * 2000.;
        let radius = (gap * 0.031 + 0.1) * 2000.;
        let last = locate(
            &x,
            &template,
            (expected - radius).max(0.) as usize,
            (expected + radius) as usize,
        );
        let confidence = first.1.min(last.1);
        let scale = (last.0 as f64 - first.0 as f64) / 2000. / gap;
        if confidence >= 0.55
            && (0.97..=1.03).contains(&scale)
            && found
                .as_ref()
                .is_none_or(|&(_, _, previous)| confidence > previous)
        {
            found = Some((protocol, scale, confidence));
        }
    }
    let Some((protocol, scale, confidence)) = found else {
        return Err("Sequenza non riconosciuta: usa il WAV di calibrazione completo, con NR OFF. Conserva i marcatori iniziale e finale.".into());
    };
    let (segments, last_marker, _) = if protocol == 1 {
        layout()
    } else {
        extended_layout()
    };
    let delay = first.0 as f64 / 2000. - 2. * scale;
    let window = |s: &Segment| {
        slice(
            p,
            delay + (s.start + 0.3) * scale,
            delay + (s.start + s.duration - 0.25) * scale,
        )
    };
    if delay + (last_marker + MARKER) * scale > p.samples.len() as f64 / 2. / p.rate as f64 {
        return Err("Manca la fine della prova".into());
    }
    let reference = rms(window(&segments[0])).map(db);
    let base = rms(window(&segments[6])).map(db); // 1 kHz, -24 dBFS peak
    let mut bands = Vec::new();
    for (i, f) in FREQUENCIES.iter().enumerate() {
        let level = rms(window(&segments[i + 1])).map(db);
        bands.push(Band {
            frequency: *f,
            response_db: [level[0] - base[0], level[1] - base[1]],
            rms_dbfs: level,
        });
    }
    let noise_slice = window(&segments[11]);
    let noise = rms(noise_slice).map(db);
    let mut hiss = [0.; 2];
    for (c, h) in hiss.iter_mut().enumerate() {
        *h = db(band_power(&spectrum(noise_slice, p.rate, c), p.rate, 4000., 12000.).sqrt());
    }
    let mut levels = Vec::new();
    let initial = rms(window(&segments[12])).map(db);
    for s in &segments[12..19] {
        let w = window(s);
        let output = rms(w).map(db);
        let (thd, hd3) = harmonics(w, p.rate, 315. / scale);
        levels.push(Level {
            input_dbfs: s.level + source_gain_db,
            output_dbfs: output,
            compression_db: [
                initial[0] + s.level + 30. - output[0],
                initial[1] + s.level + 30. - output[1],
            ],
            thd_percent: thd,
            hd3_percent: hd3,
        });
    }
    let left = rms(window(&segments[19]));
    let right = rms(window(&segments[20]));
    let crosstalk = [
        db(left[1] / left[0].max(1e-9)),
        db(right[0] / right[1].max(1e-9)),
    ];
    let mut peaks = [0f64; 2];
    let mut clipped = [0usize; 2];
    for frame in slice(
        p,
        delay + 2. * scale,
        delay + (last_marker + MARKER) * scale,
    )
    .chunks_exact(2)
    {
        for c in 0..2 {
            peaks[c] = peaks[c].max((frame[c] as f64).abs());
            if frame[c].abs() >= 0.9999 {
                clipped[c] += 1;
            }
        }
    }
    let mut warnings = Vec::new();
    if reference.iter().any(|v| *v < -50.) {
        warnings.push(
            "Ritorno troppo debole o canale assente: controlla cavi e guadagno d’ingresso.".into(),
        );
    }
    if crosstalk.iter().any(|v| *v > -10.) {
        warnings.push("Separazione L/R insufficiente: controlla canali scambiati, ingresso mono o collegamenti.".into());
    }
    if confidence < 0.8 {
        warnings.push("Marcatori deboli: l’allineamento e le misure sono meno affidabili.".into());
    }
    if (scale - 1.).abs() > 0.005 {
        warnings
            .push("Scostamento di velocità elevato: verifica il trasporto della piastra.".into());
    }
    let snr = [reference[0] - noise[0], reference[1] - noise[1]];
    if snr.iter().any(|v| *v < 30.) {
        warnings.push(
            "Fondo elevato: le misure delle bande deboli possono includere molto rumore.".into(),
        );
    }
    let mut report = Report {
        protocol,
        source,
        sample_rate: p.rate,
        source_gain_db,
        duration: p.samples.len() as f64 / 2. / p.rate as f64,
        delay_seconds: delay,
        time_scale: scale,
        sync_confidence: confidence,
        reference_dbfs: reference,
        imbalance_db: reference[1] - reference[0],
        noise_dbfs: noise,
        snr_db: snr,
        hiss_dbfs: hiss,
        peak_dbfs: peaks.map(db),
        clipped_samples: clipped,
        crosstalk_db: crosstalk,
        bands,
        levels,
        warnings,
        correction_allowed: false,
        extended: None,
    };
    if protocol == 2 {
        let extended = crate::calibration_extended::analyze(
            p,
            &segments,
            delay,
            scale,
            &report,
            source_gain_db,
        );
        report.warnings.extend(extended.warnings());
        report.extended = Some(extended);
    }
    report.refresh_correction_eligibility();
    Ok(report)
}
#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn calibration_uses_requested_project_rate() {
        for rate in [44100, 96000] {
            let p = signal(rate);
            assert_eq!(p.rate, rate);
            assert_eq!(p.samples.len(), rate as usize * 49 * 2);
            let report = analyze(&p, "project-rate".into()).unwrap();
            assert_eq!(report.sample_rate, rate);
            assert!(report.sync_confidence > 0.99);
            assert!(report
                .bands
                .iter()
                .all(|b| b.response_db.iter().all(|v| v.abs() < 0.1)));
        }
        assert!(write_signal(Path::new("/invalid-rate-must-not-create.wav"), 41000).is_err());
    }
    #[test]
    fn playback_and_export_have_distinct_formats_and_identical_signal() {
        let directory = std::env::temp_dir().join(format!(
            "cassette-format-{}-{}",
            std::process::id(),
            std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .unwrap()
                .as_nanos()
        ));
        std::fs::create_dir_all(&directory).unwrap();
        for rate in [44100, 48000, 88200, 96000] {
            let internal = directory.join("playback.wav");
            let export = directory.join("export.wav");
            write_playback_signal(&internal, rate).unwrap();
            write_signal(&export, rate).unwrap();
            let mut player = hound::WavReader::open(&internal).unwrap();
            assert_eq!(player.spec().channels, 2);
            assert_eq!(player.spec().sample_rate, rate);
            assert_eq!(player.spec().bits_per_sample, 32);
            assert_eq!(player.spec().sample_format, hound::SampleFormat::Float);
            assert_eq!(
                player.duration(),
                (rate as f64 * extended_layout().2).round() as u32
            );
            let mut file = hound::WavReader::open(&export).unwrap();
            assert_eq!(file.spec().bits_per_sample, 24);
            assert_eq!(file.spec().sample_format, hound::SampleFormat::Int);
            for (a, b) in player.samples::<f32>().zip(file.samples::<i32>()) {
                assert!((a.unwrap() as f64 - b.unwrap() as f64 / 8388607.).abs() < 0.000001);
            }
        }
        std::fs::remove_dir_all(directory).unwrap();
    }
    #[test]
    fn gain_reduces_the_complete_calibration_signal() {
        let directory = std::env::temp_dir().join(format!(
            "cassette-gain-{}-{}",
            std::process::id(),
            std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .unwrap()
                .as_nanos()
        ));
        std::fs::create_dir_all(&directory).unwrap();
        let original_path = directory.join("original.wav");
        let reduced_path = directory.join("reduced.wav");
        write_playback_signal(&original_path, RATE).unwrap();
        write_playback_signal_with_gain(&reduced_path, RATE, -6.).unwrap();
        let mut original = hound::WavReader::open(&original_path).unwrap();
        let mut reduced = hound::WavReader::open(&reduced_path).unwrap();
        let ratio = 10f64.powf(-6. / 20.);
        for (a, b) in original
            .samples::<f32>()
            .take(1000)
            .zip(reduced.samples::<f32>().take(1000))
        {
            assert!((b.unwrap() as f64 - a.unwrap() as f64 * ratio).abs() < 0.000001);
        }
        let pcm = read(&reduced_path).unwrap();
        let report = analyze_with_gain(&pcm, "reduced".into(), -6.).unwrap();
        report.validate().unwrap();
        assert_eq!(report.source_gain_db, -6.);
        assert_eq!(report.levels[0].input_dbfs, -36.);
        assert_eq!(report.levels[6].input_dbfs, -9.);
        assert_eq!(report.extended.unwrap().level_tests[0].input_dbfs, -36.);
        std::fs::remove_dir_all(directory).unwrap();
    }
    fn stream_stop(p: &Pcm) -> Option<usize> {
        let mut detector = CaptureAutoStop::new(p.rate);
        let chunk = (p.rate as usize * 8 / 100) * 2;
        let mut samples = 0;
        for data in p.samples.chunks(chunk) {
            samples += data.len();
            if detector.push(data) {
                return Some(samples / 2);
            }
        }
        None
    }
    #[test]
    fn auto_stop_preserves_both_markers_and_tail_at_all_project_rates() {
        for rate in [44100, 48000, 88200, 96000] {
            let mut p = signal(rate);
            p.samples.splice(0..0, vec![0.; rate as usize * 2 * 3]);
            p.samples.extend(vec![0.; rate as usize * 2 * 2]);
            let frames = stream_stop(&p).expect("complete sequence must stop automatically");
            let end = frames as f64 / rate as f64;
            assert!((52.1..52.5).contains(&end), "rate={rate}, end={end}");
            p.samples.truncate(frames * 2);
            let report = analyze(&p, "auto-stopped".into()).unwrap();
            assert!(report.sync_confidence > 0.99);
            assert_eq!(report.levels.len(), 7);
        }
    }
    #[test]
    fn auto_stop_handles_gain_polarity_noise_and_small_transport_drift() {
        let rate = 44100;
        let original = signal(rate);
        let scale = 1.001;
        let mut samples = vec![0.; rate as usize * 2];
        let mut rng = 12345u32;
        for i in 0..(original.samples.len() as f64 / 2. * scale) as usize {
            let at = i as f64 / scale;
            let a = (at as usize).min(original.samples.len() / 2 - 2);
            let mix = (at - a as f64) as f32;
            for c in 0..2 {
                rng ^= rng << 13;
                rng ^= rng >> 17;
                rng ^= rng << 5;
                let noise = (rng as f32 / u32::MAX as f32 - 0.5) * 0.01;
                samples.push(
                    -0.4 * (original.samples[a * 2 + c] * (1. - mix)
                        + original.samples[(a + 1) * 2 + c] * mix)
                        + noise,
                );
            }
        }
        samples.extend(vec![0.; rate as usize * 2 * 2]);
        let mut p = Pcm { samples, rate };
        let frames = stream_stop(&p).expect("noisy delayed sequence must be recognized");
        assert!((50.1..50.6).contains(&(frames as f64 / rate as f64)));
        p.samples.truncate(frames * 2);
        assert!(analyze(&p, "noisy-autostop".into()).is_ok());
    }
    #[test]
    fn auto_stop_ignores_silence_tones_initial_sync_and_wrong_marker_spacing() {
        let rate = 32000;
        let silence = Pcm {
            samples: vec![0.; rate as usize * 2 * 60],
            rate,
        };
        assert!(stream_stop(&silence).is_none());
        let mut tone = Pcm {
            samples: silence.samples.clone(),
            rate,
        };
        for (i, frame) in tone.samples.chunks_exact_mut(2).enumerate() {
            let value = (0.1 * (2. * PI * 315. * i as f64 / rate as f64).sin()) as f32;
            frame.copy_from_slice(&[value, value]);
        }
        assert!(stream_stop(&tone).is_none());
        let mut first_only = Pcm {
            samples: silence.samples.clone(),
            rate,
        };
        let test = signal(rate);
        first_only.samples[..rate as usize * 2 * 4]
            .copy_from_slice(&test.samples[..rate as usize * 2 * 4]);
        assert!(stream_stop(&first_only).is_none());
        // Add a matching chirp too early: it must not be mistaken for the end.
        let from = (2. * rate as f64) as usize * 2;
        let len = (MARKER * rate as f64) as usize * 2;
        let to = rate as usize * 2 * 20;
        first_only.samples[to..to + len].copy_from_slice(&test.samples[from..from + len]);
        assert!(stream_stop(&first_only).is_none());
        let mut last_only = silence;
        let at = rate as usize * 2 * 47;
        last_only.samples[at..at + len].copy_from_slice(&test.samples[from..from + len]);
        assert!(stream_stop(&last_only).is_none());
    }
    #[test]
    fn ideal_loop_and_delay() {
        let mut p = signal(RATE);
        for v in &mut p.samples {
            *v *= 0.5;
        }
        p.samples.splice(0..0, vec![0.; RATE as usize]);
        let r = analyze(&p, "synthetic".into()).unwrap();
        assert!((r.delay_seconds - 0.5).abs() < 0.002);
        assert!((r.time_scale - 1.).abs() < 0.0001);
        assert!(r
            .bands
            .iter()
            .all(|b| b.response_db.iter().all(|v| v.abs() < 0.06)));
        assert!(r
            .levels
            .iter()
            .all(|b| b.compression_db.iter().all(|v| v.abs() < 0.06)));
        assert!(r
            .levels
            .iter()
            .all(|b| b.hd3_percent.iter().all(|v| *v < 0.1)));
        assert!(r.correction_allowed);
    }
    #[test]
    fn rejects_missing_markers_and_truncation() {
        let mut p = signal(RATE);
        p.samples.truncate(40 * RATE as usize * 2);
        assert!(analyze(&p, "short".into()).is_err());
        assert!(analyze(
            &Pcm {
                rate: RATE,
                samples: vec![0.; 60 * RATE as usize * 2]
            },
            "silent".into()
        )
        .is_err());
    }
    #[test]
    fn follows_transport_drift_with_noise() {
        let original = signal(RATE);
        let scale = 1.001;
        let frames = (original.samples.len() as f64 / 2. * scale) as usize;
        let mut rng = 32u32;
        let mut samples = Vec::with_capacity(frames * 2);
        for i in 0..frames {
            let source = i as f64 / scale;
            let a = source.floor() as usize;
            let b = (a + 1).min(original.samples.len() / 2 - 1);
            let mix = (source - a as f64) as f32;
            for c in 0..2 {
                rng ^= rng << 13;
                rng ^= rng >> 17;
                rng ^= rng << 5;
                let noise = (rng as f32 / u32::MAX as f32 - 0.5) * 0.0001;
                samples.push(
                    (original.samples[a * 2 + c] * (1. - mix) + original.samples[b * 2 + c] * mix)
                        * 0.6
                        + noise,
                );
            }
        }
        let report = analyze(
            &Pcm {
                samples,
                rate: RATE,
            },
            "drift".into(),
        )
        .unwrap();
        assert!((report.time_scale - scale).abs() < 0.0001);
        assert!(report.noise_dbfs.iter().all(|v| *v < -80. && *v > -100.));
        assert!(report.sync_confidence > 0.8);
    }
    #[test]
    fn noise_warns_without_blocking_eq_and_old_reports_are_refreshed() {
        let mut p = signal(RATE);
        let mut rng = 12345u32;
        for sample in &mut p.samples {
            rng ^= rng << 13;
            rng ^= rng >> 17;
            rng ^= rng << 5;
            *sample += (rng as f32 / u32::MAX as f32 - 0.5) * 0.02;
        }
        let mut report = analyze(&p, "noisy".into()).unwrap();
        assert!(report.snr_db.iter().all(|v| *v < 30.));
        assert!(report.warnings.iter().any(|w| w.contains("Fondo elevato")));
        assert!(report.correction_allowed);
        let measured_snr = report.snr_db;
        report.correction_allowed = false; // Policy used by older app versions.
        let project = crate::model::Project {
            calibration_report: Some(report),
            ..Default::default()
        };
        let path =
            std::env::temp_dir().join(format!("cassette-noise-policy-{}.json", std::process::id()));
        std::fs::write(&path, serde_json::to_vec(&project).unwrap()).unwrap();
        let loaded = crate::storage::load(&path).unwrap();
        std::fs::remove_file(path).unwrap();
        let restored = loaded.calibration_report.unwrap();
        assert!(restored.correction_allowed);
        assert!(restored
            .snr_db
            .iter()
            .zip(measured_snr)
            .all(|(actual, expected)| (actual - expected).abs() < 1e-10));
        assert!(restored
            .warnings
            .iter()
            .any(|w| w.contains("Fondo elevato")));
    }
    #[test]
    fn brief_clipping_is_tolerated_at_each_sample_rate_and_on_reload() {
        let clean = analyze(&signal(RATE), "brief peaks".into()).unwrap();
        let mut brief = signal(RATE);
        for frame in brief.samples[5 * RATE as usize * 2..][..20].chunks_exact_mut(2) {
            frame.copy_from_slice(&[1., -1.]);
        }
        let measured = analyze(&brief, "ten clipped samples".into()).unwrap();
        assert_eq!(measured.clipped_samples, [10, 10]);
        assert!(measured.correction_allowed);
        for frame in brief.samples[5 * RATE as usize * 2..][..2000].chunks_exact_mut(2) {
            frame.copy_from_slice(&[1., -1.]);
        }
        let sustained = analyze(&brief, "sustained clipping".into()).unwrap();
        assert_eq!(sustained.clipped_samples, [1000, 1000]);
        assert!(!sustained.correction_allowed);
        for rate in [44100, 48000, 88200, 96000] {
            let mut report = clean.clone();
            report.sample_rate = rate;
            let limit = rate as usize / 1000;
            for counts in [[0, 0], [1, 0], [limit, limit]] {
                report.clipped_samples = counts;
                report.refresh_correction_eligibility();
                assert!(report.correction_allowed, "{rate}: {counts:?}");
                assert_eq!(
                    report
                        .warnings
                        .iter()
                        .filter(|w| w.starts_with("Clipping digitale:"))
                        .count(),
                    usize::from(counts != [0, 0])
                );
            }
            for counts in [[limit + 1, 0], [0, limit + 1], [14970, 13787]] {
                report.clipped_samples = counts;
                report.refresh_correction_eligibility();
                assert!(!report.correction_allowed, "{rate}: {counts:?}");
                assert!(report
                    .warnings
                    .iter()
                    .any(|w| w.contains("superata la tolleranza")));
            }
        }
        let mut report = clean;
        report.clipped_samples = [1, 1];
        report.correction_allowed = false;
        report.warnings.push(
            "Clipping digitale: abbassa il guadagno d’ingresso della scheda e ripeti la prova."
                .into(),
        );
        report.warnings.push("Altro avviso da conservare".into());
        let project = crate::model::Project {
            calibration_report: Some(report),
            ..Default::default()
        };
        let path = std::env::temp_dir().join(format!(
            "cassette-clipping-policy-{}.json",
            std::process::id()
        ));
        std::fs::write(&path, serde_json::to_vec(&project).unwrap()).unwrap();
        let loaded = crate::storage::load(&path).unwrap();
        std::fs::remove_file(path).unwrap();
        let restored = loaded.calibration_report.unwrap();
        assert!(restored.correction_allowed);
        assert_eq!(restored.clipped_samples, [1, 1]);
        assert!(restored.warnings.iter().any(|w| w.contains("picchi brevi")));
        assert!(restored
            .warnings
            .iter()
            .any(|w| w == "Altro avviso da conservare"));
        assert!(!restored
            .warnings
            .iter()
            .any(|w| w.contains("superata la tolleranza")));
    }
    #[test]
    fn clipping_and_missing_channel_block_correction() {
        let mut p = signal(RATE);
        for pair in p.samples.chunks_exact_mut(2) {
            pair[0] = (pair[0] * 4.).clamp(-1., 1.);
            pair[1] = 0.;
        }
        let r = analyze(&p, "clipped".into()).unwrap();
        assert!(r.clipped_samples[0] > 0);
        assert!(!r.correction_allowed);
        assert!(!r.warnings.is_empty());
    }
    #[test]
    fn detects_noise_response_and_harmonics() {
        let mut p = signal(RATE);
        let (segments, _, _) = layout();
        let s = &segments[9];
        for pair in p.samples[(s.start * RATE as f64) as usize * 2
            ..((s.start + s.duration) * RATE as f64) as usize * 2]
            .chunks_exact_mut(2)
        {
            pair[0] *= 0.5;
            pair[1] *= 0.5;
        }
        let s = &segments[18];
        for (i, pair) in p.samples[(s.start * RATE as f64) as usize * 2
            ..((s.start + s.duration) * RATE as f64) as usize * 2]
            .chunks_exact_mut(2)
            .enumerate()
        {
            let v = (0.03 * amp(s.level) * (2. * PI * 945. * i as f64 / RATE as f64).sin()) as f32;
            pair[0] += v;
            pair[1] += v;
        }
        let r = analyze(&p, "altered".into()).unwrap();
        assert!((r.bands[8].response_db[0] + 6.0206).abs() < 0.1);
        assert!((r.levels[6].hd3_percent[0] - 3.).abs() < 0.2);
    }
}
