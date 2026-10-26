# Local CPAL 0.15.3 patch

Source: crates.io CPAL 0.15.3, Apache-2.0 (LICENSE retained).

In `src/host/coreaudio/macos/mod.rs`, `supported_configs` and `default_config` no longer instantiate an AudioUnit to query the buffer-size range. Capability discovery returns `SupportedBufferSize::Unknown`, uses only CoreAudio device properties and does not activate input/output streams. Previously it unconditionally enabled input even for output discovery, rejecting the output-only endpoint of M-Audio FastTrack Pro. Activating input during enumeration could also block the application main thread. Stream creation still validates explicit buffer sizes and is unchanged. The unused `std::rc::Rc` import was removed for strict warning checks.

Keep the patch until an upstream version with equivalent behavior has been validated.
