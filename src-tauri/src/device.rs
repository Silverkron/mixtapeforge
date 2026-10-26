// Audio streams live on their owning thread; the callback never performs file I/O.
use cpal::traits::{DeviceTrait, HostTrait, StreamTrait};
use ringbuf::{
    traits::{Consumer, Producer, Split},
    HeapRb,
};
use rustfft::{num_complex::Complex, FftPlanner};
use std::{
    path::PathBuf,
    sync::{
        atomic::{AtomicBool, AtomicU64, Ordering},
        Arc,
    },
    thread,
    time::Duration,
};
#[derive(Clone, serde::Serialize)]
pub struct DeviceInfo {
    pub index: usize,
    pub name: String,
    pub rate: u32,
    pub channels: u16,
    pub is_default: bool,
}
#[derive(Clone, serde::Serialize, Default)]
pub struct Telemetry {
    pub elapsed: f64,
    pub peak: [f64; 2],
    pub rms: [f64; 2],
    pub vu: [f64; 2],
    pub ppm: [f64; 2],
    pub spectrum: Vec<f32>,
    pub waveform: Vec<f32>,
    pub underruns: u64,
    pub input: bool,
    pub calibration_complete: bool,
    pub hd3: f64,
    pub frequency: f64,
}
pub fn list(input: bool) -> Result<Vec<DeviceInfo>, String> {
    let host = cpal::default_host();
    let default_name = if input {
        host.default_input_device()
    } else {
        host.default_output_device()
    }
    .and_then(|d| d.name().ok());
    let devices = if input {
        host.input_devices()
    } else {
        host.output_devices()
    }
    .map_err(|e| e.to_string())?;
    Ok(devices
        .enumerate()
        .filter_map(|(index, d)| {
            let cfg = if input {
                d.default_input_config()
            } else {
                d.default_output_config()
            }
            .ok()?;
            let name = d.name().ok()?;
            Some(DeviceInfo {
                index,
                is_default: default_name.as_deref() == Some(name.as_str()),
                name,
                rate: cfg.sample_rate().0,
                channels: cfg.channels(),
            })
        })
        .collect())
}
pub struct Running {
    pub cancel: Arc<AtomicBool>,
    pub paused: Arc<AtomicBool>,
    pub handle: Option<thread::JoinHandle<()>>,
}
#[derive(Default)]
struct Ballistics {
    vu: [f64; 2],
    ppm: [f64; 2],
}
impl Ballistics {
    fn update(&mut self, data: &[f32], rate: u32, t: &mut Telemetry) {
        let vu_a = (-1.0 / (rate as f64 * 0.3)).exp();
        let attack = (-1.0 / (rate as f64 * 0.005)).exp();
        let release = (-1.0 / (rate as f64 * 1.5)).exp();
        for frame in data.chunks_exact(2) {
            for (c, sample) in frame.iter().enumerate().take(2) {
                let x = sample.abs() as f64;
                self.vu[c] = vu_a * self.vu[c] + (1.0 - vu_a) * x;
                let a = if x > self.ppm[c] { attack } else { release };
                self.ppm[c] = a * self.ppm[c] + (1.0 - a) * x;
            }
        }
        for c in 0..2 {
            t.vu[c] = crate::audio::db(self.vu[c] * 1.11072);
            t.ppm[c] = crate::audio::db(self.ppm[c]);
        }
    }
}
impl Running {
    pub fn stop(&mut self) {
        self.cancel.store(true, Ordering::Relaxed);
        if let Some(h) = self.handle.take() {
            let _ = h.join();
        }
    }
}
impl Drop for Running {
    fn drop(&mut self) {
        self.stop()
    }
}
pub fn play(
    path: PathBuf,
    index: usize,
    offset: f64,
    limit: Option<f64>,
    notify: impl Fn(Telemetry) + Send + 'static,
    done: impl Fn(Result<(), String>) + Send + 'static,
) -> Running {
    let cancel = Arc::new(AtomicBool::new(false));
    let flag = cancel.clone();
    let paused = Arc::new(AtomicBool::new(false));
    let pause_flag = paused.clone();
    let handle = thread::spawn(move || {
        let result = play_inner(path, index, offset, limit, flag, pause_flag, notify);
        done(result)
    });
    Running {
        cancel,
        paused,
        handle: Some(handle),
    }
}
struct CancelOnDrop(Arc<AtomicBool>);
impl Drop for CancelOnDrop {
    fn drop(&mut self) {
        self.0.store(true, Ordering::Relaxed);
    }
}
fn output_config(
    default: Option<cpal::SupportedStreamConfig>,
    supported: impl Iterator<Item = cpal::SupportedStreamConfigRange>,
    rate: u32,
) -> Option<cpal::SupportedStreamConfig> {
    // CoreAudio may advertise total physical channels across several streams
    // while its default client stream is stereo. Prefer that stereo format.
    if let Some(config) = default.filter(|c| {
        c.channels() == 2
            && c.sample_format() == cpal::SampleFormat::F32
            && c.sample_rate().0 == rate
    }) {
        return Some(config);
    }
    supported
        .filter(|c| {
            c.channels() >= 2
                && c.sample_format() == cpal::SampleFormat::F32
                && c.min_sample_rate().0 <= rate
                && c.max_sample_rate().0 >= rate
        })
        .min_by_key(|c| c.channels())
        .map(|c| c.with_sample_rate(cpal::SampleRate(rate)))
}

fn play_inner(
    path: PathBuf,
    index: usize,
    offset: f64,
    limit: Option<f64>,
    cancel: Arc<AtomicBool>,
    paused: Arc<AtomicBool>,
    notify: impl Fn(Telemetry),
) -> Result<(), String> {
    let _cancel_on_exit = CancelOnDrop(cancel.clone());
    let host = cpal::default_host();
    let device = host
        .output_devices()
        .map_err(|e| e.to_string())?
        .nth(index)
        .ok_or("Uscita non disponibile")?;
    let mut reader = hound::WavReader::open(path).map_err(|e| e.to_string())?;
    let spec = reader.spec();
    let config = output_config(
        device.default_output_config().ok(),
        device.supported_output_configs().map_err(|e| e.to_string())?,
        spec.sample_rate,
    )
    .ok_or("Il device non supporta questo master stereo floating-point alla frequenza scelta. Cambia frequenza progetto o device.")?;
    let output_channels = config.channels() as usize;
    if spec.bits_per_sample != 32 || spec.sample_format != hound::SampleFormat::Float {
        return Err("L'ascolto richiede un master interno float32".into());
    }
    let _awake = crate::power::inhibit("MixtapeForge: uscita audio verso il deck")?;
    let total = reader.duration() as u64;
    let start = (offset.max(0.0) * spec.sample_rate as f64).round() as u32;
    let end = limit
        .map(|n| start as u64 + (n * spec.sample_rate as f64) as u64)
        .unwrap_or(total)
        .min(total);
    reader
        .seek(start.min(total as u32))
        .map_err(|e| e.to_string())?;
    let rb = HeapRb::<[f32; 2]>::new(spec.sample_rate as usize * 2);
    let (mut producer, mut consumer) = rb.split();
    let meter = HeapRb::<[f32; 2]>::new(spec.sample_rate as usize / 2);
    let (mut mp, mut mc) = meter.split();
    let finished = Arc::new(AtomicBool::new(false));
    let complete = finished.clone();
    let file_cancel = cancel.clone();
    let read_error = Arc::new(AtomicBool::new(false));
    let reader_error = read_error.clone();
    let producer_thread = thread::spawn(move || {
        let mut samples = reader.samples::<f32>();
        while let (Some(l), Some(r)) = (samples.next(), samples.next()) {
            if file_cancel.load(Ordering::Relaxed) {
                break;
            }
            let value = match (l, r) {
                (Ok(l), Ok(r)) => [l, r],
                _ => {
                    reader_error.store(true, Ordering::Relaxed);
                    break;
                }
            };
            let mut next = value;
            loop {
                match producer.try_push(next) {
                    Ok(()) => break,
                    Err(v) => {
                        next = v;
                        if file_cancel.load(Ordering::Relaxed) {
                            return;
                        }
                        thread::sleep(Duration::from_millis(1));
                    }
                }
            }
        }
        complete.store(true, Ordering::Release);
    });
    thread::sleep(Duration::from_millis(50));
    let position = Arc::new(AtomicU64::new(start as u64));
    let pos = position.clone();
    let misses = Arc::new(AtomicU64::new(0));
    let bad = misses.clone();
    let stream_error = Arc::new(AtomicBool::new(false));
    let error = stream_error.clone();
    let callback_cancel = cancel.clone();
    let stream = device
        .build_output_stream(
            &config.into(),
            move |out: &mut [f32], _| {
                let mut missed = false;
                render_output(out, output_channels, &callback_cancel, &paused, |frame| {
                    if pos.load(Ordering::Relaxed) >= end {
                        frame.fill(0.0);
                        return;
                    }
                    if let Some([l, r]) = consumer.try_pop() {
                        frame[0] = l;
                        frame[1] = r;
                        pos.fetch_add(1, Ordering::Relaxed);
                        let _ = mp.try_push([l, r]);
                    } else {
                        frame.fill(0.0);
                        missed = true;
                    }
                });
                if missed {
                    bad.fetch_add(1, Ordering::Relaxed);
                }
            },
            move |_| {
                error.store(true, Ordering::Relaxed);
            },
            None,
        )
        .map_err(|e| e.to_string())?;
    stream.play().map_err(|e| e.to_string())?;
    let mut data = vec![];
    let mut ballistics = Ballistics::default();
    while !cancel.load(Ordering::Relaxed) {
        if read_error.load(Ordering::Relaxed) {
            return Err("Lettura del master interrotta. Ferma il deck.".into());
        }
        if stream_error.load(Ordering::Relaxed) {
            cancel.store(true, Ordering::Relaxed);
            let _ = producer_thread.join();
            return Err("Device scollegato o errore dello stream. Ferma il deck.".into());
        }
        data.clear();
        while let Some(frame) = mc.try_pop() {
            data.extend_from_slice(&frame)
        }
        if !data.is_empty() {
            let mut t = telemetry(&data, spec.sample_rate, false);
            ballistics.update(&data, spec.sample_rate, &mut t);
            t.elapsed = position.load(Ordering::Relaxed) as f64 / spec.sample_rate as f64;
            t.underruns = misses.load(Ordering::Relaxed);
            notify(t)
        }
        if position.load(Ordering::Relaxed) >= end
            || (finished.load(Ordering::Acquire) && position.load(Ordering::Relaxed) >= total)
        {
            break;
        }
        thread::sleep(Duration::from_millis(60));
    }
    cancel.store(true, Ordering::Relaxed);
    drop(stream);
    let _ = producer_thread.join();
    Ok(())
}
pub fn monitor(
    index: usize,
    capture: Option<PathBuf>,
    calibration_auto_stop: bool,
    notify: impl Fn(Telemetry) + Send + 'static,
    done: impl Fn(Result<(), String>) + Send + 'static,
) -> Running {
    let cancel = Arc::new(AtomicBool::new(false));
    let flag = cancel.clone();
    let handle = thread::spawn(move || {
        let result = (|| {
            let _awake = if capture.is_some() {
                Some(crate::power::inhibit(
                    "Acquisizione del ritorno dalla piastra",
                )?)
            } else {
                None
            };
            let host = cpal::default_host();
            let device = host
                .input_devices()
                .map_err(|e| e.to_string())?
                .nth(index)
                .ok_or("Ingresso non disponibile")?;
            let cfg = device.default_input_config().map_err(|e| e.to_string())?;
            if cfg.sample_format() != cpal::SampleFormat::F32 {
                return Err("Questo prototipo richiede ingresso float32 dal driver".into());
            }
            let rate = cfg.sample_rate().0;
            let mut writer = if let Some(path) = capture {
                Some(
                    hound::WavWriter::create(
                        path,
                        hound::WavSpec {
                            channels: 2,
                            sample_rate: rate,
                            bits_per_sample: 32,
                            sample_format: hound::SampleFormat::Float,
                        },
                    )
                    .map_err(|e| e.to_string())?,
                )
            } else {
                None
            };
            let mut auto_stop = if writer.is_some() && calibration_auto_stop {
                Some(crate::calibration::CaptureAutoStop::new(rate))
            } else {
                None
            };
            let mut completed_telemetry = None;
            let mut recorded_frames = 0usize;
            let channels = cfg.channels() as usize;
            let rb = HeapRb::<[f32; 2]>::new(rate as usize);
            let (mut p, mut c) = rb.split();
            let error = Arc::new(AtomicBool::new(false));
            let e = error.clone();
            let overruns = Arc::new(AtomicU64::new(0));
            let callback_overruns = overruns.clone();
            let stream = device
                .build_input_stream(
                    &cfg.into(),
                    move |data: &[f32], _| {
                        for f in data.chunks_exact(channels) {
                            if p.try_push([f[0], if channels > 1 { f[1] } else { f[0] }])
                                .is_err()
                            {
                                callback_overruns.fetch_add(1, Ordering::Relaxed);
                            }
                        }
                    },
                    move |_| {
                        e.store(true, Ordering::Relaxed);
                    },
                    None,
                )
                .map_err(|e| e.to_string())?;
            stream.play().map_err(|e| e.to_string())?;
            let mut ballistics = Ballistics::default();
            while !flag.load(Ordering::Relaxed) {
                if error.load(Ordering::Relaxed) {
                    return Err("Ingresso audio interrotto".into());
                }
                let mut data = vec![];
                while let Some(frame) = c.try_pop() {
                    data.extend_from_slice(&frame)
                }
                if writer.is_some() && overruns.load(Ordering::Relaxed) > 0 {
                    return Err(
                        "Buffer ingresso saturo: acquisizione interrotta, ripeti il test.".into(),
                    );
                }
                if let Some(writer) = writer.as_mut() {
                    for &v in &data {
                        writer.write_sample(v).map_err(|e| e.to_string())?
                    }
                    recorded_frames += data.len() / 2;
                }
                let calibration_complete = auto_stop
                    .as_mut()
                    .is_some_and(|detector| detector.push(&data));
                if data.len() >= 2048 || calibration_complete {
                    let mut t = telemetry(&data, rate, true);
                    t.elapsed = recorded_frames as f64 / rate as f64;
                    t.underruns = overruns.load(Ordering::Relaxed);
                    ballistics.update(&data, rate, &mut t);
                    if calibration_complete {
                        t.calibration_complete = true;
                        completed_telemetry = Some(t);
                        break;
                    }
                    notify(t)
                }
                thread::sleep(Duration::from_millis(80));
                if recorded_frames >= rate as usize * 180 {
                    break;
                }
            }
            if let Some(writer) = writer {
                writer.finalize().map_err(|e| e.to_string())?
            }
            if let Some(t) = completed_telemetry {
                notify(t);
            }
            Ok(())
        })();
        done(result)
    });
    Running {
        cancel,
        paused: Arc::new(AtomicBool::new(false)),
        handle: Some(handle),
    }
}
// Called on the audio thread: no locks, waiting, allocation, or source consumption
// when paused/stopped. The driver may still have its own previously queued audio.
fn render_output(
    out: &mut [f32],
    channels: usize,
    cancel: &AtomicBool,
    paused: &AtomicBool,
    mut next: impl FnMut(&mut [f32]),
) {
    if cancel.load(Ordering::Relaxed) || paused.load(Ordering::Relaxed) {
        out.fill(0.0);
        return;
    }
    for frame in out.chunks_exact_mut(channels) {
        frame.fill(0.0);
        next(&mut frame[..2]);
    }
}

fn telemetry(data: &[f32], rate: u32, input: bool) -> Telemetry {
    let mut t = Telemetry {
        input,
        ..Default::default()
    };
    let frames = data.len() / 2;
    for c in 0..2 {
        let mut peak = 0f64;
        let mut sum = 0f64;
        for f in data.chunks_exact(2) {
            peak = peak.max(f[c].abs() as f64);
            sum += (f[c] as f64).powi(2)
        }
        t.peak[c] = crate::audio::db(peak);
        t.rms[c] = crate::audio::db((sum / frames.max(1) as f64).sqrt());
    }
    let n = 2048;
    let mut fft = vec![Complex::new(0.0, 0.0); n];
    // Contiguous samples preserve the frequency-bin spacing.
    for (i, z) in fft.iter_mut().enumerate() {
        let x = data.get(i * 2).copied().unwrap_or(0.0);
        z.re = x * (0.5 - 0.5 * (std::f32::consts::TAU * i as f32 / n as f32).cos());
    }
    FftPlanner::new().plan_fft_forward(n).process(&mut fft);
    t.spectrum = (0..48)
        .map(|i| {
            let low = (20.0f64 * (1000.0f64).powf(i as f64 / 48.0) * n as f64 / rate as f64).floor()
                as usize;
            let high = (20.0f64 * (1000.0f64).powf((i + 1) as f64 / 48.0) * n as f64 / rate as f64)
                .ceil() as usize;
            let mag = (low.max(1)..high.max(low + 1).min(n / 2))
                .map(|k| fft[k].norm())
                .fold(0f32, f32::max)
                / n as f32
                * 4.0;
            crate::audio::db(mag as f64) as f32
        })
        .collect();
    let k = (1..n / 2)
        .max_by(|&a, &b| fft[a].norm().total_cmp(&fft[b].norm()))
        .unwrap_or(1);
    t.frequency = k as f64 * rate as f64 / n as f64;
    let fundamental = fft[k].norm();
    let third = if k * 3 < n / 2 {
        fft[k * 3].norm()
    } else {
        0.0
    };
    t.hd3 = if fundamental > 1e-4 {
        third as f64 / fundamental as f64 * 100.0
    } else {
        0.0
    };
    t.waveform = (0..160)
        .map(|i| data.get(i * frames / 160 * 2).copied().unwrap_or(0.0))
        .collect();
    t
}

#[cfg(test)]
mod transport_tests {
    use super::*;

    #[test]
    fn prefers_default_stereo_over_total_physical_channel_count() {
        let config = output_config(
            Some(cpal::SupportedStreamConfig::new(
                2,
                cpal::SampleRate(44100),
                cpal::SupportedBufferSize::Unknown,
                cpal::SampleFormat::F32,
            )),
            [cpal::SupportedStreamConfigRange::new(
                4,
                cpal::SampleRate(44100),
                cpal::SampleRate(44100),
                cpal::SupportedBufferSize::Unknown,
                cpal::SampleFormat::F32,
            )]
            .into_iter(),
            44100,
        )
        .unwrap();
        assert_eq!(config.channels(), 2);
        assert_eq!(config.sample_rate().0, 44100);
    }

    #[test]
    fn never_uses_default_format_at_a_different_sample_rate() {
        let default = cpal::SupportedStreamConfig::new(
            2,
            cpal::SampleRate(44100),
            cpal::SupportedBufferSize::Unknown,
            cpal::SampleFormat::F32,
        );
        assert!(output_config(Some(default), std::iter::empty(), 48000).is_none());
    }

    #[test]
    fn pause_preserves_frames_and_resume_continues_at_same_position() {
        let cancel = AtomicBool::new(false);
        let paused = AtomicBool::new(false);
        let mut position = 0;
        let mut output = [0.0; 8];
        let mut render = |out: &mut [f32]| {
            render_output(out, 2, &cancel, &paused, |frame| {
                position += 1;
                frame.fill(position as f32);
            })
        };
        render(&mut output);
        assert_eq!(output, [1., 1., 2., 2., 3., 3., 4., 4.]);
        paused.store(true, Ordering::Relaxed);
        render(&mut output);
        assert_eq!(output, [0.; 8]);
        render(&mut output);
        assert_eq!(output, [0.; 8]);
        paused.store(false, Ordering::Relaxed);
        render(&mut output);
        assert_eq!(output, [5., 5., 6., 6., 7., 7., 8., 8.]);
    }

    #[test]
    fn stop_silences_next_callback_without_consuming_queued_audio() {
        let cancel = AtomicBool::new(true);
        let paused = AtomicBool::new(false);
        let mut output = [1.0; 256];
        render_output(&mut output, 2, &cancel, &paused, |_| {
            panic!("must not consume audio")
        });
        assert!(output.iter().all(|v| *v == 0.0));
        paused.store(true, Ordering::Relaxed);
        render_output(&mut output, 2, &cancel, &paused, |_| {
            panic!("stop wins over pause")
        });
        assert!(output.iter().all(|v| *v == 0.0));
    }

    #[test]
    fn multichannel_output_preserves_stereo_and_silences_other_channels() {
        let mut output = [9.; 12];
        let mut frames = 0;
        render_output(
            &mut output,
            4,
            &AtomicBool::new(false),
            &AtomicBool::new(false),
            |frame| {
                frames += 1;
                frame.copy_from_slice(&[frames as f32, -(frames as f32)]);
            },
        );
        assert_eq!(frames, 3);
        assert_eq!(output, [1., -1., 0., 0., 2., -2., 0., 0., 3., -3., 0., 0.]);
    }
}
