//! Native dialog labels use the same offline catalogs as the web interface.
use std::sync::{
    atomic::{AtomicU8, Ordering},
    OnceLock,
};
static LANGUAGE: AtomicU8 = AtomicU8::new(0);
pub fn set(language: &str) -> Result<(), String> {
    let code = match language {
        "it" => 0,
        "en" => 1,
        "es" => 2,
        "fr" => 3,
        _ => return Err("Lingua non supportata".into()),
    };
    LANGUAGE.store(code, Ordering::Relaxed);
    Ok(())
}
pub fn text(source: &str) -> String {
    static CATALOGS: OnceLock<Vec<std::collections::HashMap<String, String>>> = OnceLock::new();
    let language = LANGUAGE.load(Ordering::Relaxed);
    if language == 0 {
        return source.into();
    }
    let catalogs = CATALOGS.get_or_init(|| {
        [
            include_str!("../../src/locales/en.json"),
            include_str!("../../src/locales/es.json"),
            include_str!("../../src/locales/fr.json"),
        ]
        .iter()
        .map(|s| serde_json::from_str(s).expect("bundled language catalog"))
        .collect()
    });
    catalogs[language as usize - 1]
        .get(source)
        .cloned()
        .unwrap_or_else(|| source.into())
}
pub fn format(source: &str, values: &[&str]) -> String {
    let mut result = text(source);
    for (i, value) in values.iter().enumerate() {
        result = result.replace(&format!("{{{i}}}"), value)
    }
    result
}
