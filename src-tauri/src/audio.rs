use crate::model::{Analysis, Track};
use ebur128::{EbuR128, Mode};
use sha2::{Digest, Sha256};
use std::{fs::File, io::Read, path::Path};
use symphonia::core::{
    audio::SampleBuffer, codecs::DecoderOptions, formats::FormatOptions, io::MediaSourceStream,
    meta::MetadataOptions, probe::Hint,
};

pub struct Pcm {
    pub samples: Vec<f32>,
    pub rate: u32,
}
pub fn db(v: f64) -> f64 {
    20.0 * v.max(1e-9).log10()
}
pub fn amp(v: f64) -> f64 {
    10f64.powf(v / 20.0)
}
pub fn hash_file(path: &Path) -> Result<String, String> {
    let mut file = File::open(path).map_err(|e| e.to_string())?;
    let mut hash = Sha256::new();
    let mut block = [0u8; 65536];
    loop {
        let n = file.read(&mut block).map_err(|e| e.to_string())?;
        if n == 0 {
            break;
        }
        hash.update(&block[..n]);
    }
    Ok(format!("{:x}", hash.finalize()))
}
fn read_tags(path: &Path) -> Option<(Option<String>, Option<String>)> {
    use symphonia::core::meta::StandardTagKey;
    let file = File::open(path).ok()?;
    let mut hint = Hint::new();
    if let Some(ext) = path.extension().and_then(|v| v.to_str()) {
        hint.with_extension(ext);
    }
    let mut probe = symphonia::default::get_probe()
        .format(
            &hint,
            MediaSourceStream::new(Box::new(file), Default::default()),
            &Default::default(),
            &Default::default(),
        )
        .ok()?;
    let mut title = None;
    let mut artist = None;
    let mut collect = |revision: &symphonia::core::meta::MetadataRevision| {
        for tag in revision.tags() {
            match tag.std_key {
                Some(StandardTagKey::TrackTitle) => title = Some(tag.value.to_string()),
                Some(StandardTagKey::Artist) => artist = Some(tag.value.to_string()),
                _ => {}
            }
        }
    };
    if let Some(meta) = probe.metadata.get() {
        if let Some(current) = meta.current() {
            collect(current)
        }
    }
    if let Some(current) = probe.format.metadata().current() {
        collect(current)
    }
    Some((title, artist))
}
pub fn decode(path: &Path) -> Result<Pcm, String> {
    let file = File::open(path).map_err(|e| e.to_string())?;
    let mut hint = Hint::new();
    if let Some(ext) = path.extension().and_then(|x| x.to_str()) {
        hint.with_extension(ext);
    }
    let probe = symphonia::default::get_probe()
        .format(
            &hint,
            MediaSourceStream::new(Box::new(file), Default::default()),
            &FormatOptions::default(),
            &MetadataOptions::default(),
        )
        .map_err(|e| format!("Formato non leggibile: {e}"))?;
    let mut format = probe.format;
    let track = format.default_track().ok_or("Nessuna traccia audio")?;
    let id = track.id;
    let rate = track
        .codec_params
        .sample_rate
        .ok_or("Frequenza audio sconosciuta")?;
    let mut decoder = symphonia::default::get_codecs()
        .make(&track.codec_params, &DecoderOptions::default())
        .map_err(|e| format!("Codec non disponibile: {e}"))?;
    let mut samples = Vec::new();
    loop {
        let packet = match format.next_packet() {
            Ok(p) => p,
            Err(symphonia::core::errors::Error::IoError(e))
                if e.kind() == std::io::ErrorKind::UnexpectedEof =>
            {
                break
            }
            Err(e) => return Err(format!("File audio incompleto: {e}")),
        };
        if packet.track_id() != id {
            continue;
        }
        let data = decoder
            .decode(&packet)
            .map_err(|e| format!("Errore di decodifica: {e}"))?;
        let channels = data.spec().channels.count();
        if channels == 0 || channels > 2 {
            return Err(
                "Sono supportati file mono o stereo; converti il multicanale prima di importarlo"
                    .into(),
            );
        }
        let mut buf = SampleBuffer::<f32>::new(data.capacity() as u64, *data.spec());
        buf.copy_interleaved_ref(data);
        for frame in buf.samples().chunks_exact(channels) {
            let l = frame[0];
            let r = if channels == 2 { frame[1] } else { l };
            if !l.is_finite() || !r.is_finite() {
                return Err("Campioni non finiti nel file".into());
            }
            samples.extend_from_slice(&[l, r]);
        }
        if samples.len() > 134_217_728 {
            return Err("File troppo grande per il prototipo (512 MiB PCM per sorgente). Dividi il file in brani.".into());
        }
    }
    if samples.is_empty() {
        return Err("File audio vuoto".into());
    }
    Ok(Pcm { samples, rate })
}
pub fn analyze(pcm: &Pcm) -> Result<Analysis, String> {
    let mut meter =
        EbuR128::new(2, pcm.rate, Mode::I | Mode::TRUE_PEAK).map_err(|e| e.to_string())?;
    meter
        .add_frames_f32(&pcm.samples)
        .map_err(|e| e.to_string())?;
    let lufs = meter.loudness_global().ok().filter(|v| v.is_finite());
    let true_peak = (0..2)
        .filter_map(|i| meter.true_peak(i).ok())
        .fold(0f64, f64::max);
    let mut sum = 0f64;
    let mut peak = 0f64;
    let mut peak_frame = 0usize;
    let frames = pcm.samples.len() / 2;
    let mut waveform = vec![0f32; 240];
    let window = pcm.rate as usize * 5;
    let mut max_energy = 0f64;
    let mut rolling = 0f64;
    let mut rms_frame = 0;
    let mut vu = 0.0f64;
    let mut vu_peak = 0.0f64;
    let alpha = (-1.0 / (pcm.rate as f64 * 0.3)).exp();
    let mut quasi = 0.0f64;
    let mut quasi_peak = 0.0f64;
    let qa = (-1.0 / (pcm.rate as f64 * 0.01)).exp();
    let mut first = None;
    let mut last = 0;
    for (i, frame) in pcm.samples.chunks_exact(2).enumerate() {
        let p = (frame[0].abs().max(frame[1].abs())) as f64;
        let e = (frame[0] as f64 * frame[0] as f64 + frame[1] as f64 * frame[1] as f64) / 2.0;
        sum += e;
        rolling += e;
        if i >= window {
            let a = pcm.samples[(i - window) * 2] as f64;
            let b = pcm.samples[(i - window) * 2 + 1] as f64;
            rolling -= (a * a + b * b) / 2.0;
        }
        if rolling > max_energy {
            max_energy = rolling;
            rms_frame = i.saturating_sub(window / 2);
        }
        if p > peak {
            peak = p;
            peak_frame = i
        }
        waveform[(i * 240 / frames).min(239)] = waveform[(i * 240 / frames).min(239)].max(p as f32);
        vu = alpha * vu + (1.0 - alpha) * (frame[0].abs() as f64 + frame[1].abs() as f64) / 2.0;
        vu_peak = vu_peak.max(vu * 1.11072);
        quasi = qa * quasi + (1.0 - qa) * e;
        quasi_peak = quasi_peak.max(quasi.sqrt() * std::f64::consts::SQRT_2);
        if p > amp(-55.0) {
            if first.is_none() {
                first = Some(i)
            }
            last = i;
        }
    }
    Ok(Analysis {
        peak: db(peak),
        rms: db((sum / frames as f64).sqrt()),
        lufs,
        true_peak: db(true_peak),
        peak_time: peak_frame as f64 / pcm.rate as f64,
        rms_time: rms_frame as f64 / pcm.rate as f64,
        vu_peak: db(vu_peak),
        quasi_peak: db(quasi_peak),
        waveform,
        silence_start: first.unwrap_or(0) as f64 / pcm.rate as f64,
        silence_end: if first.is_some() {
            (frames - last - 1) as f64 / pcm.rate as f64
        } else {
            0.0
        },
    })
}
pub fn import(path: &Path) -> Result<Track, String> {
    let pcm = decode(path)?;
    let analysis = analyze(&pcm)?;
    let hash = hash_file(path)?;
    let stem = path
        .file_stem()
        .and_then(|v| v.to_str())
        .unwrap_or("Senza titolo");
    let (artist, title) = stem.split_once(" - ").unwrap_or(("", stem));
    let (tag_title, tag_artist) = read_tags(path).unwrap_or_default();
    let stamp = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap()
        .as_nanos();
    Ok(Track {
        id: format!("t{stamp}"),
        path: path.to_string_lossy().into(),
        title: tag_title.unwrap_or_else(|| title.into()),
        artist: tag_artist.unwrap_or_else(|| artist.into()),
        duration: pcm.samples.len() as f64 / 2.0 / pcm.rate as f64,
        sample_rate: pcm.rate,
        hash,
        analysis,
        trim_start: 0.0,
        trim_end: 0.0,
        gain: 0.0,
        fade_in: 0.0,
        fade_out: 0.0,
        gap: 2.0,
        locked: false,
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn sine_measurement() {
        let rate = 48000;
        let mut samples = vec![];
        for i in 0..rate * 6 {
            let s = (i as f64 * 1000.0 * std::f64::consts::TAU / rate as f64).sin() as f32 * 0.5;
            samples.extend_from_slice(&[s, s]);
        }
        let a = analyze(&Pcm { samples, rate }).unwrap();
        assert!((a.peak + 6.0206).abs() < 0.01);
        assert!((a.rms + 9.0309).abs() < 0.02);
        assert!(a.lufs.unwrap().is_finite());
    }
    #[test]
    fn silence_is_serializable() {
        let a = analyze(&Pcm {
            samples: vec![0.0; 96000],
            rate: 48000,
        })
        .unwrap();
        assert!(a.lufs.is_none());
        assert!(serde_json::to_string(&a).is_ok())
    }
}
