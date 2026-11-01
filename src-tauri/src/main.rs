#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use cassette_core::{
    artwork, audio, device,
    model::{Project, Track},
    render,
};
use std::{
    collections::HashSet,
    path::{Path, PathBuf},
    sync::{
        atomic::{AtomicBool, Ordering},
        Arc, Mutex,
    },
};
use tauri::{Emitter, Manager};
#[derive(Default)]
struct State {
    output: Mutex<Option<device::Running>>,
    input: Mutex<Option<device::Running>>,
    cancel: Arc<AtomicBool>,
    busy: Arc<AtomicBool>,
    allowed: Mutex<HashSet<PathBuf>>,
}
struct BusyGuard(Arc<AtomicBool>);
impl Drop for BusyGuard {
    fn drop(&mut self) {
        self.0.store(false, Ordering::SeqCst);
    }
}
#[derive(serde::Serialize)]
struct Info {
    durations: [f64; 2],
    gains: Vec<(String, f64)>,
}
#[derive(Clone, serde::Serialize)]
struct Progress {
    value: f64,
    label: String,
}
fn cache(app: &tauri::AppHandle) -> Result<PathBuf, String> {
    let dir = app.path().app_cache_dir().map_err(|e| e.to_string())?;
    std::fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
    Ok(dir)
}
fn unique() -> String {
    std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap()
        .as_nanos()
        .to_string()
}
fn register(app: &tauri::AppHandle, path: &Path) {
    app.state::<State>()
        .allowed
        .lock()
        .unwrap()
        .insert(path.to_path_buf());
}
#[tauri::command]
fn default_project() -> Project {
    let mut project = Project::default();
    if let Ok(devices) = device::list(false) {
        if let Some(output) = devices.iter().find(|d| d.is_default) {
            if [44100, 48000, 88200, 96000].contains(&output.rate) {
                project.processing.sample_rate = output.rate;
            }
        }
    }
    project
}
#[tauri::command]
fn project_info(project: Project) -> Result<Info, String> {
    project.validate()?;
    Ok(Info {
        durations: [project.side_duration(0), project.side_duration(1)],
        gains: project
            .tracks
            .iter()
            .map(|t| (t.id.clone(), cassette_core::dsp::gain_for(t, &project)))
            .collect(),
    })
}
#[tauri::command]
fn fit_project(project: Project, preserve: bool) -> Result<Project, String> {
    cassette_core::model::fit(&project, preserve)
}
#[derive(serde::Serialize)]
struct ImportResult {
    tracks: Vec<Track>,
    errors: Vec<String>,
}
#[tauri::command]
async fn import_audio(app: tauri::AppHandle) -> Result<ImportResult, String> {
    let paths = rfd::AsyncFileDialog::new()
        .set_title(cassette_core::locale::text("Importa musica locale"))
        .add_filter(
            "Audio",
            &[
                "wav", "flac", "mp3", "m4a", "aac", "aiff", "aif", "ogg", "caf",
            ],
        )
        .pick_files()
        .await;
    tauri::async_runtime::spawn_blocking(move || {
        let mut tracks = vec![];
        let mut errors = vec![];
        if let Some(paths) = paths {
            let len = paths.len();
            for (i, path) in paths.into_iter().enumerate() {
                let _ = app.emit(
                    "job-progress",
                    Progress {
                        value: i as f64 / len as f64,
                        label: format!("Analisi {}", path.file_name()),
                    },
                );
                match audio::import(path.path()) {
                    Ok(t) => tracks.push(t),
                    Err(e) => errors.push(format!("{}: {}", path.file_name(), e)),
                }
            }
        }
        Ok(ImportResult { tracks, errors })
    })
    .await
    .map_err(|e| e.to_string())?
}
#[tauri::command]
async fn demo_project(app: tauri::AppHandle) -> Result<Project, String> {
    tauri::async_runtime::spawn_blocking(move || {
        let dir = cache(&app)?.join("demo");
        std::fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
        let mut p = Project {
            title: "After hours".into(),
            subtitle: "Demo · Quattro brani sintetici".into(),
            leader: 0.5,
            trailer: 0.5,
            ..Default::default()
        };
        for (i, (artist, title, seconds, freq)) in [
            ("MixtapeForge", "Neon avenue", 12.0, 220.0),
            ("MixtapeForge", "Violet hour", 10.0, 329.63),
            ("MixtapeForge", "Soft signals", 14.0, 261.63),
            ("MixtapeForge", "Last train home", 11.0, 174.61),
        ]
        .iter()
        .enumerate()
        {
            let path = dir.join(format!("{artist} - {title}.wav"));
            let mut writer = hound::WavWriter::create(
                &path,
                hound::WavSpec {
                    channels: 2,
                    sample_rate: 48000,
                    bits_per_sample: 32,
                    sample_format: hound::SampleFormat::Float,
                },
            )
            .map_err(|e| e.to_string())?;
            let n = (*seconds * 48000.0) as usize;
            for j in 0..n {
                let time = j as f64 / 48000.0;
                let env = (j as f64 / 2400.0).min((n - j) as f64 / 6000.0).min(1.0);
                for c in 0..2 {
                    let v = ((time * freq * std::f64::consts::TAU).sin() * 0.17
                        + (time * freq * 1.5 * std::f64::consts::TAU + c as f64 * 0.15).sin()
                            * 0.08
                        + (time * freq * 2.0 * std::f64::consts::TAU).sin() * 0.025)
                        * env
                        * (0.6 + 0.4 * (time * 0.4).sin().abs());
                    writer.write_sample(v as f32).map_err(|e| e.to_string())?;
                }
            }
            writer.finalize().map_err(|e| e.to_string())?;
            let mut t = audio::import(&path)?;
            t.gap = 1.0;
            p.sides[i / 2].push(t.id.clone());
            p.tracks.push(t);
        }
        Ok(p)
    })
    .await
    .map_err(|e| e.to_string())?
}
fn safe_name(s: &str) -> String {
    s.chars()
        .filter(|c| !['/', '\\', ':', '*', '?', '"', '<', '>', '|'].contains(c))
        .take(100)
        .collect()
}
fn write_project(path: &Path, p: &Project) -> Result<(), String> {
    cassette_core::storage::write_project(path, p)
}
#[tauri::command]
async fn save_project(project: Project) -> Result<Option<String>, String> {
    project.validate()?;
    let path = rfd::AsyncFileDialog::new()
        .set_title(cassette_core::locale::text("Salva progetto"))
        .set_file_name(format!("{}.cassette.json", safe_name(&project.title)))
        .add_filter(
            cassette_core::locale::text("Progetto MixtapeForge"),
            &["json"],
        )
        .save_file()
        .await;
    if let Some(path) = path {
        write_project(path.path(), &project)?;
        Ok(Some(path.path().to_string_lossy().into()))
    } else {
        Ok(None)
    }
}
#[tauri::command]
async fn autosave_project(app: tauri::AppHandle, project: Project) -> Result<(), String> {
    let path = cache(&app)?.join("autosave.json");
    tauri::async_runtime::spawn_blocking(move || write_project(&path, &project))
        .await
        .map_err(|e| e.to_string())?
}
#[tauri::command]
async fn recover_project(app: tauri::AppHandle) -> Result<Option<Project>, String> {
    let path = cache(&app)?.join("autosave.json");
    tauri::async_runtime::spawn_blocking(move || cassette_core::storage::recover(&path))
        .await
        .map_err(|e| e.to_string())?
}
#[tauri::command]
async fn open_project() -> Result<Option<Project>, String> {
    if let Some(file) = rfd::AsyncFileDialog::new()
        .add_filter(cassette_core::locale::text("Progetto"), &["json"])
        .pick_file()
        .await
    {
        let path = file.path().to_path_buf();
        tauri::async_runtime::spawn_blocking(move || Ok(Some(cassette_core::storage::load(&path)?)))
            .await
            .map_err(|e| e.to_string())?
    } else {
        Ok(None)
    }
}
#[tauri::command]
async fn relink_track(mut project: Project, id: String) -> Result<Option<Project>, String> {
    if let Some(file) = rfd::AsyncFileDialog::new()
        .set_title(cassette_core::locale::text("Ricollega la sorgente audio"))
        .pick_file()
        .await
    {
        let path = file.path().to_path_buf();
        tauri::async_runtime::spawn_blocking(move || {
            let replacement = audio::import(&path)?;
            let t = project.tracks.iter_mut().find(|t| t.id == id).ok_or("Traccia assente")?;
            if replacement.hash != t.hash { return Err("Il file scelto non corrisponde alla sorgente originale. Importalo come nuovo brano per preservare tagli e regolazioni.".into()); }
            t.path = replacement.path;
            project.validate()?;
            Ok(Some(project))
        })
        .await
        .map_err(|e| e.to_string())?
    } else {
        Ok(None)
    }
}
#[tauri::command]
async fn render_side(
    app: tauri::AppHandle,
    project: Project,
    side: usize,
    export: bool,
    bits: u16,
) -> Result<Option<render::RenderResult>, String> {
    project.validate()?;
    let state = app.state::<State>();
    if state.busy.swap(true, Ordering::SeqCst) {
        return Err("Una preparazione è già in corso".into());
    }
    let _guard = BusyGuard(state.busy.clone());
    state.cancel.store(false, Ordering::SeqCst);
    let path = if export {
        rfd::AsyncFileDialog::new()
            .set_title(cassette_core::locale::text("Esporta master WAV"))
            .set_file_name(format!(
                "{} - Side {}{}.wav",
                safe_name(&project.title),
                if side == 0 { "A" } else { "B" },
                if project.processing.nr == "type_b" {
                    " - NR Type B"
                } else {
                    ""
                }
            ))
            .add_filter(cassette_core::locale::text("WAV"), &["wav"])
            .save_file()
            .await
            .map(|p| p.path().to_path_buf())
    } else {
        Some(cache(&app)?.join(format!("master-{}.wav", unique())))
    };
    let Some(path) = path else {
        state.busy.store(false, Ordering::SeqCst);
        return Ok(None);
    };
    let cancel = state.cancel.clone();
    let a = app.clone();
    let result = tauri::async_runtime::spawn_blocking(move || {
        let _awake = cassette_core::power::inhibit("MixtapeForge: preparazione del master")?;
        let r = render::render(
            &project,
            side,
            &path,
            if export { bits } else { 32 },
            &cancel,
            |value, label| {
                let _ = a.emit(
                    "job-progress",
                    Progress {
                        value,
                        label: label.into(),
                    },
                );
            },
        )?;
        register(&a, &path);
        Ok(Some(r))
    })
    .await
    .map_err(|e| e.to_string());
    app.state::<State>().busy.store(false, Ordering::SeqCst);
    result?
}
#[tauri::command]
fn cancel_job(app: tauri::AppHandle) {
    app.state::<State>().cancel.store(true, Ordering::SeqCst);
}
#[tauri::command]
async fn render_passage(
    app: tauri::AppHandle,
    mut project: Project,
    id: String,
    center: f64,
    seconds: f64,
    original: bool,
) -> Result<render::RenderResult, String> {
    if !center.is_finite() || !(2.0..=15.0).contains(&seconds) {
        return Err("Passaggio non valido".into());
    }
    let mut t = project.track(&id).ok_or("Traccia assente")?.clone();
    let begin = (center - seconds / 2.0).max(t.trim_start);
    let end = (begin + seconds).min(t.duration - t.trim_end);
    if end - begin < 0.01 {
        return Err("Passaggio fuori dalla selezione utile".into());
    }
    t.trim_start = begin;
    t.trim_end = t.duration - end;
    t.fade_in = 0.01;
    t.fade_out = 0.01;
    t.gap = 0.0;
    if original {
        project.recording_profile = None;
        let sample_rate = project.processing.sample_rate;
        project.processing = Default::default();
        project.processing.sample_rate = sample_rate;
        project.processing.ceiling = 0.0;
        project.processing.normalize = "off".into();
        t.gain = 0.0;
    }
    project.sides = [vec![id], vec![]];
    project.tracks = vec![t];
    project.leader = 0.0;
    project.trailer = 0.0;
    project.processing.crossfade = 0.0;
    let path = cache(&app)?.join(format!("passage-{}.wav", unique()));
    let a = app.clone();
    tauri::async_runtime::spawn_blocking(move || {
        let result = render::render(&project, 0, &path, 32, &AtomicBool::new(false), |_, _| {})?;
        register(&a, &path);
        Ok(result)
    })
    .await
    .map_err(|e| e.to_string())?
}
#[tauri::command]
async fn audio_devices(input: bool) -> Result<Vec<device::DeviceInfo>, String> {
    tauri::async_runtime::spawn_blocking(move || device::list(input))
        .await
        .map_err(|e| e.to_string())?
}
#[tauri::command]
fn play_audio(
    app: tauri::AppHandle,
    path: String,
    index: usize,
    expected_name: String,
    offset: f64,
    limit: Option<f64>,
) -> Result<(), String> {
    if !device::list(false)?
        .iter()
        .any(|d| d.index == index && d.name == expected_name)
    {
        return Err("La configurazione delle uscite è cambiata. Aggiorna i dispositivi e seleziona di nuovo il DAC.".into());
    }
    let p = PathBuf::from(path);
    if !app.state::<State>().allowed.lock().unwrap().contains(&p) {
        return Err("Prepara il master prima di riprodurlo".into());
    }
    if !offset.is_finite() || offset < 0.0 || limit.is_some_and(|n| !n.is_finite() || n <= 0.0) {
        return Err("Posizione non valida".into());
    }
    app.state::<State>().output.lock().unwrap().take();
    let a = app.clone();
    let b = app.clone();
    let running = device::play(
        p,
        index,
        offset,
        limit,
        move |t| {
            let _ = a.emit("audio-telemetry", t);
        },
        move |result| {
            let _ = b.emit("audio-ended", result.err());
        },
    );
    *app.state::<State>().output.lock().unwrap() = Some(running);
    Ok(())
}
#[tauri::command]
fn set_audio_paused(app: tauri::AppHandle, paused: bool) -> Result<(), String> {
    let state = app.state::<State>();
    let output = state.output.lock().unwrap();
    let running = output.as_ref().ok_or("Nessuna uscita audio attiva")?;
    if running.cancel.load(Ordering::Relaxed) {
        return Err("Uscita audio terminata".into());
    }
    running.paused.store(paused, Ordering::Relaxed);
    Ok(())
}
#[tauri::command]
async fn stop_audio(app: tauri::AppHandle) {
    app.state::<State>().output.lock().unwrap().take();
}
#[tauri::command]
fn start_monitor(app: tauri::AppHandle, index: usize) {
    app.state::<State>().input.lock().unwrap().take();
    let a = app.clone();
    let b = app.clone();
    let running = device::monitor(
        index,
        None,
        false,
        move |t| {
            let _ = a.emit("input-telemetry", t);
        },
        move |r| {
            let _ = b.emit("input-ended", r.err());
        },
    );
    *app.state::<State>().input.lock().unwrap() = Some(running);
}
#[tauri::command]
fn stop_monitor(app: tauri::AppHandle) {
    app.state::<State>().input.lock().unwrap().take();
}
#[tauri::command]
async fn generate_tone(
    app: tauri::AppHandle,
    frequency: f64,
    level: f64,
    seconds: f64,
    kind: String,
    export: bool,
    sample_rate: u32,
) -> Result<Option<String>, String> {
    let path = if export {
        rfd::AsyncFileDialog::new()
            .set_file_name("reference-tone.wav")
            .save_file()
            .await
            .map(|f| f.path().to_path_buf())
    } else {
        Some(cache(&app)?.join(format!("tone-{}.wav", unique())))
    };
    if let Some(path) = path {
        if ![44100, 48000, 88200, 96000].contains(&sample_rate) {
            return Err("Frequenza non supportata".into());
        }
        render::tone(&path, sample_rate, frequency, level, seconds, &kind)?;
        register(&app, &path);
        Ok(Some(path.to_string_lossy().into()))
    } else {
        Ok(None)
    }
}
#[tauri::command]
fn print_artwork(window: tauri::WebviewWindow) -> Result<(), String> {
    #[cfg(target_os = "macos")]
    window
        .print()
        .map_err(|e| format!("Impossibile aprire la stampa: {e}"))?;
    #[cfg(not(target_os = "macos"))]
    window
        .eval("window.print()")
        .map_err(|e| format!("Impossibile aprire la stampa: {e}"))?;
    Ok(())
}
#[tauri::command]
async fn export_document(project: Project, kind: String) -> Result<Option<String>, String> {
    project.validate()?;
    if ["svg", "pdf"].contains(&kind.as_str()) && project.tracks.len() > 15 {
        return Err("Il template compatto accetta 15 brani. Esporta la tracklist completa; i pannelli aggiuntivi non sono ancora disponibili.".into());
    }
    let extension = match kind.as_str() {
        "svg" => "svg",
        "pdf" => "pdf",
        "m3u8" => "m3u8",
        "report" => "json",
        _ => "txt",
    };
    let data = match kind.as_str() {
        "svg" => artwork::svg(&project).into_bytes(),
        "pdf" => {
            if project.tracks.len() > 15 {
                return Err(
                    "Troppi brani per il template compatto: usa SVG e modifica l'impaginazione"
                        .into(),
                );
            }
            artwork::pdf(&project)
        }
        "m3u8" => {
            let mut s = String::from("#EXTM3U\n");
            for id in project.sides.iter().flatten() {
                let t = project.track(id).unwrap();
                s.push_str(&format!(
                    "#EXTINF:{},{} - {}\n{}\n",
                    t.duration as u64, t.artist, t.title, t.path
                ));
            }
            s.into_bytes()
        }
        "report" => serde_json::to_vec_pretty(&project).map_err(|e| e.to_string())?,
        _ => artwork::tracklist(&project).into_bytes(),
    };
    if let Some(file) = rfd::AsyncFileDialog::new()
        .set_file_name(format!("{}.{}", safe_name(&project.title), extension))
        .save_file()
        .await
    {
        std::fs::write(file.path(), data).map_err(|e| e.to_string())?;
        Ok(Some(file.path().to_string_lossy().into()))
    } else {
        Ok(None)
    }
}
#[tauri::command]
async fn import_folder(app: tauri::AppHandle) -> Result<ImportResult, String> {
    let Some(folder) = rfd::AsyncFileDialog::new()
        .set_title(cassette_core::locale::text(
            "Importa una cartella di musica",
        ))
        .pick_folder()
        .await
    else {
        return Ok(ImportResult {
            tracks: vec![],
            errors: vec![],
        });
    };
    let path = folder.path().to_path_buf();
    tauri::async_runtime::spawn_blocking(move || {
        fn scan(path: &Path, depth: usize, files: &mut Vec<PathBuf>) -> Result<(), String> {
            if depth > 8 {
                return Ok(());
            }
            for entry in std::fs::read_dir(path).map_err(|e| e.to_string())? {
                let entry = entry.map_err(|e| e.to_string())?;
                let kind = entry.file_type().map_err(|e| e.to_string())?;
                if entry.file_name().to_string_lossy().starts_with('.') || kind.is_symlink() {
                    continue;
                }
                let p = entry.path();
                if kind.is_dir() {
                    scan(&p, depth + 1, files)?
                } else if p.extension().and_then(|v| v.to_str()).is_some_and(|v| {
                    [
                        "wav", "flac", "mp3", "m4a", "aac", "aiff", "aif", "ogg", "caf",
                    ]
                    .contains(&v.to_lowercase().as_str())
                }) {
                    files.push(p)
                }
                if files.len() > 1000 {
                    return Err(
                        "La cartella supera 1000 file; importa sottocartelle più piccole".into(),
                    );
                }
            }
            Ok(())
        }
        let mut files = vec![];
        scan(&path, 0, &mut files)?;
        files.sort();
        let mut result = ImportResult {
            tracks: vec![],
            errors: vec![],
        };
        let n = files.len();
        for (i, file) in files.iter().enumerate() {
            let _ = app.emit(
                "job-progress",
                Progress {
                    value: i as f64 / n as f64,
                    label: format!(
                        "Analisi {}",
                        file.file_name().unwrap_or_default().to_string_lossy()
                    ),
                },
            );
            match audio::import(file) {
                Ok(t) => result.tracks.push(t),
                Err(e) => result.errors.push(format!("{}: {e}", file.display())),
            }
        }
        Ok(result)
    })
    .await
    .map_err(|e| e.to_string())?
}
#[tauri::command]
async fn collect_project(project: Project) -> Result<Option<String>, String> {
    project.validate()?;
    let Some(folder) = rfd::AsyncFileDialog::new()
        .set_title(cassette_core::locale::text(
            "Destinazione del progetto con tutti gli audio",
        ))
        .pick_folder()
        .await
    else {
        return Ok(None);
    };
    let destination = folder
        .path()
        .join(format!("{}-{}", safe_name(&project.title), unique()));
    tauri::async_runtime::spawn_blocking(move || {
        cassette_core::storage::collect(&project, &destination)?;
        Ok(Some(destination.to_string_lossy().into()))
    })
    .await
    .map_err(|e| e.to_string())?
}
#[tauri::command]
fn clear_render_cache(app: tauri::AppHandle) -> Result<u64, String> {
    if app.state::<State>().busy.load(Ordering::SeqCst) {
        return Err("Attendi il termine della preparazione".into());
    }
    app.state::<State>().output.lock().unwrap().take();
    let mut total = 0;
    for entry in std::fs::read_dir(cache(&app)?).map_err(|e| e.to_string())? {
        let entry = entry.map_err(|e| e.to_string())?;
        let name = entry.file_name().to_string_lossy().into_owned();
        if ["master-", "passage-", "tone-", "calibration-"]
            .iter()
            .any(|p| name.starts_with(p))
            && entry.file_type().map_err(|e| e.to_string())?.is_file()
        {
            total += entry.metadata().map_err(|e| e.to_string())?.len();
            std::fs::remove_file(entry.path()).map_err(|e| e.to_string())?;
            app.state::<State>()
                .allowed
                .lock()
                .unwrap()
                .remove(&entry.path());
        }
    }
    Ok(total)
}
#[tauri::command]
fn start_capture(
    app: tauri::AppHandle,
    index: usize,
    calibration_auto_stop: Option<bool>,
) -> Result<String, String> {
    app.state::<State>().input.lock().unwrap().take();
    let path = cache(&app)?.join(format!("capture-{}.wav", unique()));
    register(&app, &path);
    let a = app.clone();
    let b = app.clone();
    let running = device::monitor(
        index,
        Some(path.clone()),
        calibration_auto_stop.unwrap_or(false),
        move |t| {
            let _ = a.emit("input-telemetry", t);
        },
        move |r| {
            let _ = b.emit("input-ended", r.err());
        },
    );
    *app.state::<State>().input.lock().unwrap() = Some(running);
    Ok(path.to_string_lossy().into())
}
#[tauri::command]
fn create_recording_profile(
    report: cassette_core::calibration::Report,
    conditions: cassette_core::recording_profile::Conditions,
) -> Result<cassette_core::recording_profile::RecordingProfile, String> {
    cassette_core::recording_profile::RecordingProfile::create(
        format!("profile-{}", unique()),
        report,
        conditions,
    )
}
#[tauri::command]
async fn calibration_signal(
    app: tauri::AppHandle,
    export: bool,
    sample_rate: u32,
) -> Result<Option<String>, String> {
    if ![44100, 48000, 88200, 96000].contains(&sample_rate) {
        return Err("Frequenza di calibrazione non supportata".into());
    }
    let path = if export {
        rfd::AsyncFileDialog::new()
            .set_file_name("cassette-calibration-v2.wav")
            .add_filter(cassette_core::locale::text("WAV"), &["wav"])
            .save_file()
            .await
            .map(|f| f.path().to_path_buf())
    } else {
        Some(cache(&app)?.join(format!("calibration-{}.wav", unique())))
    };
    let Some(path) = path else { return Ok(None) };
    let target = path.clone();
    tauri::async_runtime::spawn_blocking(move || {
        if export {
            cassette_core::calibration::write_signal(&target, sample_rate)
        } else {
            cassette_core::calibration::write_playback_signal(&target, sample_rate)
        }
    })
    .await
    .map_err(|e| e.to_string())??;
    register(&app, &path);
    Ok(Some(path.to_string_lossy().into()))
}
#[tauri::command]
async fn analyze_calibration(
    app: tauri::AppHandle,
    path: Option<String>,
) -> Result<Option<cassette_core::calibration::Report>, String> {
    let source = if let Some(path) = path {
        let p = PathBuf::from(path);
        if !app.state::<State>().allowed.lock().unwrap().contains(&p) {
            return Err("Importa una prova o usa un’acquisizione dell’app".into());
        }
        p
    } else {
        let Some(file) = rfd::AsyncFileDialog::new()
            .add_filter(cassette_core::locale::text("WAV stereo"), &["wav"])
            .pick_file()
            .await
        else {
            return Ok(None);
        };
        file.path().to_path_buf()
    };
    tauri::async_runtime::spawn_blocking(move || {
        cassette_core::calibration::analyze_file(&source).map(Some)
    })
    .await
    .map_err(|e| e.to_string())?
}
#[tauri::command]
async fn compare_return(
    app: tauri::AppHandle,
    reference: String,
    recorded: String,
) -> Result<cassette_core::compare::Comparison, String> {
    for path in [&reference, &recorded] {
        if !app
            .state::<State>()
            .allowed
            .lock()
            .unwrap()
            .contains(&PathBuf::from(path))
        {
            return Err("Prepara un master e acquisisci il ritorno prima del confronto".into());
        }
    }
    app.state::<State>().input.lock().unwrap().take();
    tauri::async_runtime::spawn_blocking(move || {
        cassette_core::compare::files(Path::new(&reference), Path::new(&recorded))
    })
    .await
    .map_err(|e| e.to_string())?
}
#[tauri::command]
async fn save_capture(app: tauri::AppHandle, path: String) -> Result<Option<String>, String> {
    let source = PathBuf::from(path);
    if !app
        .state::<State>()
        .allowed
        .lock()
        .unwrap()
        .contains(&source)
    {
        return Err("Acquisizione non disponibile".into());
    }
    if let Some(file) = rfd::AsyncFileDialog::new()
        .set_file_name("off-tape-return.wav")
        .save_file()
        .await
    {
        std::fs::copy(source, file.path()).map_err(|e| e.to_string())?;
        Ok(Some(file.path().to_string_lossy().into()))
    } else {
        Ok(None)
    }
}
#[tauri::command]
fn list_vst_plugins() -> Vec<String> {
    cassette_core::vst::list()
}
#[tauri::command]
async fn inspect_vst_plugin(path: String) -> Result<serde_json::Value, String> {
    tauri::async_runtime::spawn_blocking(move || cassette_core::vst::inspect(&path))
        .await
        .map_err(|e| e.to_string())?
}
#[tauri::command]
fn set_language(locale: String) -> Result<(), String> {
    cassette_core::locale::set(&locale)
}
fn main() {
    tauri::Builder::default()
        .manage(State::default())
        .invoke_handler(tauri::generate_handler![
            set_language,
            list_vst_plugins,
            inspect_vst_plugin,
            default_project,
            project_info,
            fit_project,
            import_audio,
            import_folder,
            collect_project,
            clear_render_cache,
            demo_project,
            save_project,
            autosave_project,
            recover_project,
            open_project,
            relink_track,
            render_side,
            cancel_job,
            render_passage,
            audio_devices,
            play_audio,
            stop_audio,
            set_audio_paused,
            start_monitor,
            start_capture,
            compare_return,
            calibration_signal,
            analyze_calibration,
            create_recording_profile,
            save_capture,
            stop_monitor,
            generate_tone,
            print_artwork,
            export_document
        ])
        .run(tauri::generate_context!())
        .expect("Errore avvio MixtapeForge");
}
