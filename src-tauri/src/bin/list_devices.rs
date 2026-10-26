use cpal::traits::{DeviceTrait, HostTrait};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let host = cpal::default_host();
    for (index, device) in host.devices()?.enumerate() {
        println!("Device {index}: {:?}", device.name());
        println!("  Default: {:?}", device.default_output_config());
        println!(
            "  Supported: {:?}",
            device
                .supported_output_configs()
                .map(|c| c.collect::<Vec<_>>())
        );
    }
    println!(
        "App output list: {}",
        serde_json::to_string(&cassette_core::device::list(false)?)?
    );
    println!(
        "App input list: {}",
        serde_json::to_string(&cassette_core::device::list(true)?)?
    );
    Ok(())
}
