//! Checks real macOS power assertions without audio or changing energy settings.
#[cfg(target_os = "macos")]
fn main() -> Result<(), String> {
    fn assertions() -> Result<String, String> {
        let result = std::process::Command::new("/usr/bin/pmset")
            .args(["-g", "assertions"])
            .output()
            .map_err(|e| e.to_string())?;
        if !result.status.success() {
            return Err(String::from_utf8_lossy(&result.stderr).into_owned());
        }
        Ok(String::from_utf8_lossy(&result.stdout).into_owned())
    }
    let reason = format!("MixtapeForge power verification {}", std::process::id());
    assert!(!assertions()?.contains(&reason));
    let guard = cassette_core::power::inhibit(&reason)?;
    let active = assertions()?;
    let lines: Vec<_> = active
        .lines()
        .filter(|line| line.contains(&reason))
        .collect();
    assert!(
        lines
            .iter()
            .any(|line| line.contains("PreventUserIdleDisplaySleep")),
        "display assertion missing: {active}"
    );
    assert!(
        lines
            .iter()
            .any(|line| line.contains("PreventUserIdleSystemSleep")),
        "system assertion missing: {active}"
    );
    drop(guard);
    assert!(
        !assertions()?.contains(&reason),
        "power assertions leaked after drop"
    );
    let failed = (|| -> Result<(), String> {
        let _guard = cassette_core::power::inhibit(&reason)?;
        Err("simulated audio failure".into())
    })();
    assert!(failed.is_err());
    assert!(
        !assertions()?.contains(&reason),
        "power assertions leaked after error"
    );
    println!("PASS: display and system idle sleep blocked while guard is alive; released on drop and error.");
    Ok(())
}

#[cfg(not(target_os = "macos"))]
fn main() {
    eprintln!("This assertion-inspection check is macOS-specific.");
}
