//! Out-of-process VST3 effects. Projects never authorize loading executable code.
use serde::{Deserialize, Serialize};
use std::{
    collections::HashSet,
    path::{Path, PathBuf},
    process::{Command, Stdio},
    sync::{
        atomic::{AtomicBool, AtomicU64, Ordering},
        Mutex, OnceLock,
    },
    time::{Duration, Instant},
};
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct VstEffect {
    pub enabled: bool,
    pub path: String,
    pub uid: String,
    pub name: String,
    pub parameters: Vec<f32>,
    pub tail_seconds: f64,
}
static APPROVED: OnceLock<Mutex<HashSet<PathBuf>>> = OnceLock::new();
fn approved() -> &'static Mutex<HashSet<PathBuf>> {
    APPROVED.get_or_init(Default::default)
}
fn canonical(path: &str) -> Result<PathBuf, String> {
    let p = Path::new(path)
        .canonicalize()
        .map_err(|_| "Plugin non disponibile: installalo o selezionalo di nuovo")?;
    if p.extension().and_then(|s| s.to_str()) != Some("vst3") {
        return Err("Seleziona un plugin VST3".into());
    }
    Ok(p)
}
pub fn list() -> Vec<String> {
    let mut roots = Vec::new();
    if cfg!(target_os = "macos") {
        roots.push(PathBuf::from("/Library/Audio/Plug-Ins/VST3"));
        if let Some(home) = std::env::var_os("HOME") {
            roots.push(PathBuf::from(home).join("Library/Audio/Plug-Ins/VST3"));
        }
    } else if cfg!(windows) {
        if let Some(root) = std::env::var_os("CommonProgramFiles") {
            roots.push(PathBuf::from(root).join("VST3"));
        }
        if let Some(root) = std::env::var_os("LOCALAPPDATA") {
            roots.push(PathBuf::from(root).join("Programs/Common/VST3"));
        }
    } else {
        roots.extend([
            PathBuf::from("/usr/lib/vst3"),
            PathBuf::from("/usr/local/lib/vst3"),
        ]);
        if let Some(home) = std::env::var_os("HOME") {
            roots.push(PathBuf::from(home).join(".vst3"));
        }
    }
    fn visit(dir: &Path, depth: usize, paths: &mut Vec<String>) {
        if depth > 5 || paths.len() > 2000 {
            return;
        }
        if let Ok(entries) = std::fs::read_dir(dir) {
            for e in entries.flatten() {
                let p = e.path();
                if p.extension().and_then(|v| v.to_str()) == Some("vst3") {
                    paths.push(p.to_string_lossy().into());
                } else if e.file_type().map(|t| t.is_dir()).unwrap_or(false) {
                    visit(&p, depth + 1, paths);
                }
            }
        }
    }
    let mut paths = vec![];
    for root in roots {
        visit(&root, 0, &mut paths);
    }
    paths.sort();
    paths.dedup();
    paths
}
struct Temp(PathBuf);
impl Drop for Temp {
    fn drop(&mut self) {
        let _ = std::fs::remove_dir_all(&self.0);
    }
}
fn run(
    request: serde_json::Value,
    cancel: &AtomicBool,
    seconds: u64,
) -> Result<serde_json::Value, String> {
    static NEXT: AtomicU64 = AtomicU64::new(0);
    let dir = std::env::temp_dir().join(format!(
        "cassette-vst-{}-{}",
        std::process::id(),
        NEXT.fetch_add(1, Ordering::Relaxed)
    ));
    std::fs::create_dir(&dir).map_err(|e| e.to_string())?;
    let _cleanup = Temp(dir.clone());
    let input = dir.join("request.json");
    let output = dir.join("response.json");
    std::fs::write(
        &input,
        serde_json::to_vec(&request).map_err(|e| e.to_string())?,
    )
    .map_err(|e| e.to_string())?;
    let name = if cfg!(windows) {
        "cassette-vst.exe"
    } else {
        "cassette-vst"
    };
    let current = std::env::current_exe().map_err(|e| e.to_string())?;
    let bundled = current.parent().ok_or("Directory app assente")?.join(name);
    let tool = if bundled.is_file() {
        bundled
    } else {
        PathBuf::from(env!("CM_VST_TOOL"))
    };
    let mut command = Command::new(tool);
    command
        .arg(input)
        .arg(&output)
        .stdin(Stdio::null())
        .stdout(Stdio::null())
        .stderr(Stdio::null());
    #[cfg(windows)]
    {
        use std::os::windows::process::CommandExt;
        command.creation_flags(0x08000000);
    }
    if cancel.load(Ordering::Relaxed) {
        return Err("Operazione annullata".into());
    }
    let mut child = command
        .spawn()
        .map_err(|e| format!("Host VST3 non disponibile: {e}"))?;
    let start = Instant::now();
    loop {
        if cancel.load(Ordering::Relaxed) || start.elapsed() > Duration::from_secs(seconds) {
            let _ = child.kill();
            let _ = child.wait();
            return Err(if cancel.load(Ordering::Relaxed) {
                "Operazione annullata"
            } else {
                "Il plugin non risponde: tempo limite superato"
            }
            .into());
        }
        match child.try_wait() {
            Ok(Some(status)) => {
                if !status.success() {
                    return Err("Il plugin non è stato elaborato: verifica formato, architettura e autorizzazione del produttore".into());
                }
                break;
            }
            Ok(None) => std::thread::sleep(Duration::from_millis(25)),
            Err(e) => {
                let _ = child.kill();
                let _ = child.wait();
                return Err(e.to_string());
            }
        }
    }
    let bytes = std::fs::read(output).map_err(|e| e.to_string())?;
    if bytes.len() > 2_000_000 {
        return Err("Risposta plugin troppo grande".into());
    }
    serde_json::from_slice(&bytes).map_err(|e| e.to_string())
}
pub fn inspect(path: &str) -> Result<serde_json::Value, String> {
    let p = canonical(path)?;
    // The UI offers installed plugins only; no project-triggered automatic loading.
    if !list()
        .iter()
        .filter_map(|v| canonical(v).ok())
        .any(|v| v == p)
    {
        return Err(
            "Installa il plugin nella cartella VST3 standard del sistema o dell’utente".into(),
        );
    }
    let result = run(
        serde_json::json!({"mode":"inspect","path":p}),
        &AtomicBool::new(false),
        30,
    )?;
    approved().lock().map_err(|e| e.to_string())?.insert(p);
    Ok(result)
}
pub fn transform(
    effect: &VstEffect,
    input: &Path,
    output: &Path,
    rate: u32,
    cancel: &AtomicBool,
) -> Result<(), String> {
    let p = canonical(&effect.path)?;
    if !approved().lock().map_err(|e| e.to_string())?.contains(&p) {
        return Err(
            "Apri Audio → Plugin VST3 e premi Carica per autorizzare il plugin in questa sessione"
                .into(),
        );
    }
    let input = input.canonicalize().map_err(|e| e.to_string())?;
    let output = if output.is_absolute() {
        output.to_path_buf()
    } else {
        std::env::current_dir()
            .map_err(|e| e.to_string())?
            .join(output)
    };
    let result = run(
        serde_json::json!({"mode":"render","path":p,"uid":effect.uid,"parameters":effect.parameters,"tail_seconds":effect.tail_seconds,"input":input,"output":output,"rate":rate}),
        cancel,
        1800,
    );
    if let Err(e) = result {
        let _ = std::fs::remove_file(&output);
        return Err(e);
    }
    let expected = hound::WavReader::open(&input).map_err(|e| e.to_string())?;
    let mut actual = hound::WavReader::open(&output).map_err(|e| e.to_string())?;
    let frames = expected.duration() as u64 + (effect.tail_seconds * rate as f64).round() as u64;
    if actual.spec() != expected.spec() || actual.duration() as u64 != frames {
        return Err("Formato o durata del master VST3 inattesi".into());
    }
    for (i, v) in actual.samples::<f32>().enumerate() {
        if i % 8192 == 0 && cancel.load(Ordering::Relaxed) {
            return Err("Operazione annullata".into());
        }
        if !v.map_err(|e| e.to_string())?.is_finite() {
            return Err("Campioni VST3 non finiti".into());
        }
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn old_projects_have_no_plugin_and_bad_controls_are_rejected() {
        let mut p = crate::model::Project::default();
        let mut json = serde_json::to_value(&p).unwrap();
        json["processing"].as_object_mut().unwrap().remove("vst");
        let old: crate::model::Project = serde_json::from_value(json).unwrap();
        assert!(old.processing.vst.is_none());
        p.processing.vst = Some(VstEffect {
            enabled: true,
            path: "test.vst3".into(),
            uid: "test".into(),
            name: "test".into(),
            parameters: vec![0.5],
            tail_seconds: 2.0,
        });
        assert!(p.validate().is_ok());
        p.processing.vst.as_mut().unwrap().parameters[0] = f32::NAN;
        assert!(p.validate().is_err());
        p.processing.vst.as_mut().unwrap().parameters[0] = 0.5;
        p.processing.vst.as_mut().unwrap().tail_seconds = 31.0;
        assert!(p.validate().is_err());
    }
}
