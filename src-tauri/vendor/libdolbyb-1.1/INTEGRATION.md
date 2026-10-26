# libdolbyb 1.1 — MixtapeForge integration

Upstream: https://codeberg.org/sox_ng/libdolbyb/releases/tag/libdolbyb-1.1
Archive: https://codeberg.org/sox_ng/libdolbyb/releases/download/libdolbyb-1.1/libdolbyb-1.1.tar.gz
SHA-256: 353e50e73cfa30714e0898223b5e9f655563392c76c1c98b37ddbd1f1f30ca6e
License: GPL-2.0-only; see COPYING and original notices in each file.

All top-level C/header files and upstream manuals/README/Makefile.am/COPYING are retained. Only the library source list in build.rs is compiled; CLI and libsndfile are not linked. configure.h is supplied for supported little-endian targets.

Local changes dated 2026-10-24:
- Calibrate.c file cache replaced with bounded process-local cache. No HOME/TEMP file I/O. The standalone CLI is single-threaded; upstream calibration globals never cross process boundaries.
- nr_bridge.c calls SidePathInit after dolbyb_start so cache hits refresh coefficients as cold starts do.
- PCM24 decoder accuracy set to -110 dB: upstream default FindOutSmp tolerance is too coarse with the 24-bit scaling. This affects the test decoder; production exposes encoding only.

Reference convention adopted by MixtapeForge: threshold adjustment is the negative of the selected digital reference level. The upstream manual describes threshold adjustment but does not establish this mapping as a certified digital Dolby Level. The 2026-10-25 audit in docs/39-audit-dolby-b.md confirms relative scaling and digital stability; absolute reference and hardware compatibility remain unvalidated. The standalone CLI reads/writes standard float32 WAV files and converts to interleaved packed PCM24, checks finite/range, detects saturated outputs, and owns/frees all C state. One instance spans the entire assembled cassette side.

Build: npm ci; cargo test --manifest-path src-tauri/Cargo.toml --lib; npm run desktop:build. Native C compiler is required (Xcode clang, Linux cc, Windows MSVC). No runtime external codec installation is required: the separately licensed cassette-nr utility is bundled beside the app executable. It is not linked to the app. The GPLv3 app communicates only by standard WAV files and CLI arguments.
