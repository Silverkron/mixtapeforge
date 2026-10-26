fn main() {
    let dir = "vendor/libdolbyb-1.1";
    assert_eq!(std::env::var("CARGO_CFG_TARGET_ENDIAN").unwrap(), "little");
    let out = std::path::PathBuf::from(std::env::var("OUT_DIR").unwrap());
    let windows = std::env::var("CARGO_CFG_TARGET_OS").unwrap() == "windows";
    let target = std::env::var("TARGET").unwrap();
    let name = if windows {
        "cassette-nr.exe"
    } else {
        "cassette-nr"
    };
    let executable = out.join(name);
    let mut build = cc::Build::new();
    build
        .include(dir)
        .file("nr_bridge.c")
        .warnings(false)
        .cargo_metadata(false);
    for n in [
        "Calibrate",
        "DCfilter",
        "DiodeClip",
        "FindOutSmp",
        "HPF1",
        "HPF2",
        "HPF2SetVals",
        "HPFAdj",
        "LPFAdj",
        "Param",
        "SetGate",
        "SidePath",
        "libdolbyb",
    ] {
        build.file(format!("{dir}/{n}.c"));
    }
    build.compile("cassette_dolbyb");
    let compiler = build.get_compiler();
    let mut command = compiler.to_command();
    command.arg("nr_cli.c");
    if compiler.is_like_msvc() {
        command
            .arg(out.join("cassette_dolbyb.lib"))
            .arg(format!("/Fe:{}", executable.display()))
            .arg(format!("/Fo:{}", out.join("nr_cli.obj").display()));
    } else {
        command
            .arg(out.join("libcassette_dolbyb.a"))
            .arg("-lm")
            .arg("-o")
            .arg(&executable);
    }
    assert!(
        command.status().expect("C compiler unavailable").success(),
        "NR CLI build failed"
    );
    std::fs::create_dir_all("binaries").unwrap();
    std::fs::copy(
        &executable,
        format!(
            "binaries/cassette-nr-{target}{}",
            if windows { ".exe" } else { "" }
        ),
    )
    .unwrap();
    println!("cargo:rustc-env=CM_NR_TOOL={}", executable.display());
    for path in [dir, "nr_bridge.c", "nr_cli.c"] {
        println!("cargo:rerun-if-changed={path}");
    }
    let manifest = std::path::PathBuf::from(std::env::var("CARGO_MANIFEST_DIR").unwrap());
    let vst_build = manifest.join("target/vst-host");
    let cmake = std::env::var("CMAKE").unwrap_or_else(|_| "cmake".into());
    let mut configure = std::process::Command::new(&cmake);
    configure
        .arg("-S")
        .arg(manifest.join("vst-host"))
        .arg("-B")
        .arg(&vst_build)
        .arg("-DCMAKE_BUILD_TYPE=Release");
    if target.ends_with("apple-darwin") {
        // CMake caches the host OS version otherwise, making the bundled helper
        // require a newer macOS than the application declares.
        let minimum = std::env::var("MACOSX_DEPLOYMENT_TARGET").unwrap_or_else(|_| "13.0".into());
        configure.arg(format!("-DCMAKE_OSX_DEPLOYMENT_TARGET={minimum}"));
    }
    assert!(configure
        .status()
        .expect("Install CMake to build the VST3 host")
        .success());
    assert!(std::process::Command::new(&cmake)
        .arg("--build")
        .arg(&vst_build)
        .args(["--config", "Release", "-j", "4"])
        .status()
        .unwrap()
        .success());
    let vst_name = if windows {
        "cassette-vst.exe"
    } else {
        "cassette-vst"
    };
    let vst = vst_build
        .join("cassette-vst_artefacts/Release")
        .join(vst_name);
    std::fs::copy(
        &vst,
        format!(
            "binaries/cassette-vst-{target}{}",
            if windows { ".exe" } else { "" }
        ),
    )
    .unwrap();
    println!("cargo:rustc-env=CM_VST_TOOL={}", vst.display());
    println!("cargo:rerun-if-changed=vst-host");
    tauri_build::build()
}
