//! A scoped OS request, released on return, error, panic, or process exit.
pub fn inhibit(reason: &str) -> Result<keepawake::KeepAwake, String> {
    keepawake::Builder::default()
        .display(true)
        .idle(true)
        .sleep(false)
        .app_name("MixtapeForge")
        .app_reverse_domain("com.lucasciacca.cassette-maker")
        .reason(reason)
        .create()
        .map_err(|e| format!("Impossibile impedire la sospensione automatica: {e}"))
}
