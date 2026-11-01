---
id: "channel-balance"
lang: "en"
title: "Measure Left and Right Level Differences Before Applying a Trim"
description: "Use identical test signals to separate stable channel imbalance from intentional stereo content."
primaryKeyword: "Measure Left and Right Level Differences Before Applying a Trim"
secondaryKeywords: ["the round-trip setup","interface loopback","fault tracing","One Cassette Channel Is Quieter"]
searchIntent: "evaluation"
answer: "A central voice leaning to one side may indicate unequal channel levels. Ordinary music is a poor measurement reference because instruments may intentionally be louder on one side. Use identical signals first."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: Tone generator", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: splitting stereo tracks", "url": "https://manual.audacityteam.org/man/splitting_and_joining_stereo_tracks.html"}, {"title": "Audacity: Plot Spectrum", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}]
related: ["quiet-channel", "loopback-round-trip", "flux-stereo-tool", "crosstalk-test"]
guideType: "measurement"
prerequisites: ["without-reference-tape"]
next: ["phase-polarity", "recording-profile"]
---

## Prepare the test

Use Audacity, a stereo interface, a blank cassette and the normal line connections in [the round-trip setup](../without-reference-tape/). Generate a ten-second 1 kHz sine at amplitude 0.1 and route the same signal to both output channels. This is a file level, not a deck calibration mark.

Turn NR and processing off. Keep interface input gains equal where the hardware permits, but remember equal knob positions do not guarantee equal gain. Record at a modest deck level with no digital clipping.

## Compare channels properly

1. Capture the tape's playback as stereo WAV; do not normalize either channel.
2. In Audacity use the track dropdown's **Split Stereo Track**. Select the stable middle of the left tone only.
3. Open **Analyze > Plot Spectrum**, select Spectrum, Hann and an FFT size that resolves the tone. Read the 1 kHz peak.
4. Select the same time interval on the right and repeat with unchanged settings. Do not select both channels together: Plot Spectrum combines selected channels.
5. Subtract the two readings in dB. Repeat on another recorded section and, if possible, a second cassette.
6. Compare the [interface loopback](../loopback-round-trip/) if you can temporarily change cables. Without that baseline, label the difference as belonging to the complete loop.

## Decide whether a trim is justified

Hypothetical readings of −18.0 dBFS left and −19.2 dBFS right give a 1.2 dB imbalance. If a direct interface capture shows the same difference, a recording trim would compensate the measurement path rather than the tape.

If a stable difference persists after checking the path, attenuating the louder channel preserves more headroom than boosting the quieter one. Make a small trial and compare familiar mono-centered music at similar playback loudness. A correction measured on one playback machine may not transfer to another.

## When not to correct

If the difference changes with frequency, a single gain trim cannot solve it; investigate response or alignment. If it varies from pass to pass, check tape contact and intermittent connections. A completely silent channel needs [fault tracing](../quiet-channel/), not a large boost.

Checklist: identical input, separate channel analysis, no normalization, repeated result and interface uncertainty recorded. MixtapeForge's profile may propose a limited channel attenuation when its own test supports it; do not copy an unverified loop error into every recording.
