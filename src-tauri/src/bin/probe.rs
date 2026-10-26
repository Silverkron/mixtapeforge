//! Decode a corpus without opening the app or emitting audio.
fn main() {
    let mut failed = false;
    for path in std::env::args().skip(1) {
        match cassette_core::audio::import(std::path::Path::new(&path)) {
            Ok(t) => println!(
                "PASS {}: {:.3}s, {} Hz, LUFS {:?}",
                path, t.duration, t.sample_rate, t.analysis.lufs
            ),
            Err(e) => {
                eprintln!("FAIL {path}: {e}");
                failed = true
            }
        }
    }
    if failed {
        std::process::exit(1)
    }
}
