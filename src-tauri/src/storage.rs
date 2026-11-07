use crate::{audio, model::Project};
use std::path::Path;
fn read_project(path: &Path) -> Result<Project, String> {
    let size = std::fs::metadata(path).map_err(|e| e.to_string())?.len();
    if size > 16 * 1024 * 1024 {
        return Err("Manifest troppo grande (massimo 16 MiB)".into());
    }
    let mut p: Project = serde_json::from_slice(&std::fs::read(path).map_err(|e| e.to_string())?)
        .map_err(|e| e.to_string())?;
    for t in &mut p.tracks {
        if Path::new(&t.path).is_relative() {
            t.path = path
                .parent()
                .unwrap_or(Path::new("."))
                .join(&t.path)
                .to_string_lossy()
                .into()
        }
    }
    p.validate()?;
    let old_gain = p.processing.legacy_output_gain_db.replace(0.);
    if let Some(gain) = old_gain.filter(|&gain| gain < 0.) {
        p.processing.ceiling = p
            .processing
            .ceiling
            .min(crate::calibration::NOMINAL_PEAK_DBFS + gain);
    }
    if old_gain.is_none() {
        if let Some(profile) = p.recording_profile.as_ref().filter(|v| v.enabled) {
            // Keep an existing manual curve. Move the measured curve into the EQ
            // controls when there is no enabled curve to preserve.
            if !p.processing.eq_enabled {
                p.processing.eq_bands = profile.eq_bands;
                p.processing.eq_enabled = profile.eq_bands.iter().any(|&gain| gain != 0.);
            }
            p.processing.channel_gain_db = profile.channel_gain_db;
            p.processing.use_drive_limits = !profile.drive_limits.is_empty();
        }
    }
    if let Some(report) = &mut p.calibration_report {
        report.refresh_correction_eligibility();
    }
    Ok(p)
}
fn versions() -> &'static std::sync::Mutex<std::collections::HashMap<std::path::PathBuf, String>> {
    static VERSIONS: std::sync::OnceLock<
        std::sync::Mutex<std::collections::HashMap<std::path::PathBuf, String>>,
    > = std::sync::OnceLock::new();
    VERSIONS.get_or_init(Default::default)
}
fn identity(path: &Path) -> std::path::PathBuf {
    path.canonicalize().unwrap_or_else(|_| path.to_path_buf())
}
pub fn load(path: &Path) -> Result<Project, String> {
    let fingerprint = audio::hash_file(path)?;
    let p = read_project(path)?;
    if fingerprint != audio::hash_file(path)? {
        return Err("Il progetto è stato modificato da un’altra istanza. Riaprilo oppure salva con un altro nome.".into());
    }
    versions()
        .lock()
        .map_err(|e| e.to_string())?
        .insert(identity(path), fingerprint);
    Ok(p)
}
fn collect_into(project: &Project, folder: &Path) -> Result<(), String> {
    project.validate()?;
    std::fs::create_dir(folder).map_err(|e| e.to_string())?;
    let media = folder.join("media");
    std::fs::create_dir(&media).map_err(|e| e.to_string())?;
    let mut p = project.clone();
    for (i, t) in p.tracks.iter_mut().enumerate() {
        let source = Path::new(&t.path);
        if audio::hash_file(source)? != t.hash {
            return Err(format!("Sorgente modificata: {}", t.title));
        }
        let extension = source
            .extension()
            .and_then(|v| v.to_str())
            .filter(|v| v.chars().all(|c| c.is_ascii_alphanumeric()))
            .unwrap_or("audio");
        let name = format!("{i:04}.{extension}");
        std::fs::copy(source, media.join(&name)).map_err(|e| e.to_string())?;
        t.path = format!("media/{name}");
    }
    write_project(&folder.join("project.cassette.json"), &p)
}

#[cfg(not(windows))]
fn replace(source: &Path, target: &Path) -> std::io::Result<()> {
    std::fs::rename(source, target)
}
#[cfg(windows)]
fn replace(source: &Path, target: &Path) -> std::io::Result<()> {
    use std::os::windows::ffi::OsStrExt;
    #[link(name = "kernel32")]
    unsafe extern "system" {
        fn MoveFileExW(source: *const u16, target: *const u16, flags: u32) -> i32;
    }
    let s: Vec<_> = source.as_os_str().encode_wide().chain(Some(0)).collect();
    let t: Vec<_> = target.as_os_str().encode_wide().chain(Some(0)).collect();
    if unsafe { MoveFileExW(s.as_ptr(), t.as_ptr(), 1 | 8) } == 0 {
        Err(std::io::Error::last_os_error())
    } else {
        Ok(())
    }
}
struct Pending(std::path::PathBuf);
impl Drop for Pending {
    fn drop(&mut self) {
        let _ = std::fs::remove_file(&self.0);
    }
}
fn temporary(path: &Path) -> std::path::PathBuf {
    static NEXT: std::sync::atomic::AtomicU64 = std::sync::atomic::AtomicU64::new(0);
    path.with_extension(format!(
        "pending-{}-{}",
        std::process::id(),
        NEXT.fetch_add(1, std::sync::atomic::Ordering::Relaxed)
    ))
}
/// An OS lock serializes writers and is released automatically after a crash.
pub fn write_project(path: &Path, project: &Project) -> Result<(), String> {
    use std::{fs::OpenOptions, io::Write};
    project.validate()?;
    let lock = OpenOptions::new()
        .read(true)
        .write(true)
        .create(true)
        .truncate(false)
        .open(path.with_extension("lock"))
        .map_err(|e| e.to_string())?;
    lock.try_lock().map_err(|_| {
        "Progetto in uso da un altro salvataggio. Riprova tra un momento.".to_string()
    })?;
    if path.exists() {
        if let Some(expected) = versions()
            .lock()
            .map_err(|e| e.to_string())?
            .get(&identity(path))
        {
            if *expected != audio::hash_file(path)? {
                return Err("Il progetto è stato modificato da un’altra istanza. Riaprilo oppure salva con un altro nome.".into());
            }
        }
    }
    let pending = Pending(temporary(path));
    let mut file = OpenOptions::new()
        .write(true)
        .create_new(true)
        .open(&pending.0)
        .map_err(|e| e.to_string())?;
    file.write_all(&serde_json::to_vec_pretty(project).map_err(|e| e.to_string())?)
        .and_then(|_| file.sync_all())
        .map_err(|e| e.to_string())?;
    drop(file);
    if path.exists() {
        // Never replace the last good backup with an unreadable previous file.
        if read_project(path).is_ok() {
            let backup = path.with_extension("backup.json");
            let staged = Pending(temporary(&backup));
            std::fs::copy(path, &staged.0).map_err(|e| e.to_string())?;
            OpenOptions::new()
                .read(true)
                .write(true)
                .open(&staged.0)
                .and_then(|f| f.sync_all())
                .map_err(|e| e.to_string())?;
            replace(&staged.0, &backup).map_err(|e| e.to_string())?;
        }
    }
    replace(&pending.0, path).map_err(|e| e.to_string())?;
    #[cfg(unix)]
    std::fs::File::open(path.parent().unwrap_or(Path::new(".")))
        .and_then(|f| f.sync_all())
        .map_err(|e| e.to_string())?;
    versions()
        .lock()
        .map_err(|e| e.to_string())?
        .insert(identity(path), audio::hash_file(path)?);
    Ok(())
}
pub fn recover(path: &Path) -> Result<Option<Project>, String> {
    if !path.exists() {
        return Ok(None);
    }
    match load(path) {
        Ok(p) => Ok(Some(p)),
        Err(primary) => load(&path.with_extension("backup.json"))
            .and_then(|p| {
                versions()
                    .lock()
                    .map_err(|e| e.to_string())?
                    .insert(identity(path), audio::hash_file(path)?);
                Ok(p)
            })
            .map(Some)
            .map_err(|backup| {
                format!("Impossibile recuperare la sessione: {primary}. Backup: {backup}")
            }),
    }
}
pub fn collect(project: &Project, folder: &Path) -> Result<(), String> {
    if folder.exists() {
        return Err("La cartella di destinazione esiste già".into());
    }
    let staging = temporary(folder);
    let result = collect_into(project, &staging)
        .and_then(|_| std::fs::rename(&staging, folder).map_err(|e| e.to_string()));
    if result.is_err() {
        let _ = std::fs::remove_dir_all(staging);
    }
    result
}
#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn atomic_save_backup_recovery_and_lock() {
        let root = std::env::temp_dir().join(format!("cassette-storage-{}", std::process::id()));
        std::fs::create_dir_all(&root).unwrap();
        let path = root.join("project.json");
        let p = Project::default();
        write_project(&path, &p).unwrap();
        let mut next = p.clone();
        next.title = "Seconda versione".into();
        write_project(&path, &next).unwrap();
        assert_eq!(load(&path).unwrap().title, next.title);
        assert_eq!(
            load(&path.with_extension("backup.json")).unwrap().title,
            p.title
        );
        let lock = std::fs::OpenOptions::new()
            .read(true)
            .write(true)
            .open(path.with_extension("lock"))
            .unwrap();
        lock.lock().unwrap();
        assert!(write_project(&path, &p).is_err());
        drop(lock);
        std::fs::write(&path, b"interrupted").unwrap();
        assert!(write_project(&path, &next).is_err());
        assert_eq!(recover(&path).unwrap().unwrap().title, p.title);
        write_project(&path, &next).unwrap();
        assert_eq!(load(&path).unwrap().title, next.title);
        assert!(std::fs::read_dir(&root).unwrap().all(|e| !e
            .unwrap()
            .file_name()
            .to_string_lossy()
            .contains("pending")));
        let _ = std::fs::remove_dir_all(root);
    }
}
