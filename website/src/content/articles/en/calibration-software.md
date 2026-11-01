---
id: "calibration-software"
lang: "en"
title: "Choose Software for the Cassette Test You Actually Need"
description: "Compare Audacity, REW, NAK T-100, Stereo Tool and MixtapeForge by task, setup and measurement limits."
primaryKeyword: "Choose Software for the Cassette Test You Actually Need"
secondaryKeywords: ["the Audacity round-trip exercise","The NAK T-100 guide","The Stereo Tool exercise","guided profile sequence"]
searchIntent: "informational"
answer: "Start with a question, not a list of instruments. Capturing a tape, checking pitch stability and saving a correction profile require different functions. A colorful spectrum is not automatically a calibrated measurement."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: Plot Spectrum", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "REW: audio interface configuration", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}, {"title": "REW: spectrum, RMS levels and distortion", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/spectrum.html"}, {"title": "NAK T-100: official specifications", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "FLUX:: Stereo Tool product and compatibility", "url": "https://www.flux.audio/project/stereo-tool-freeware/"}]
related: ["flux-stereo-tool", "recording-profile", "wow-flutter"]
guideType: "explainer"
prerequisites: ["calibration-basics"]
next: ["without-reference-tape", "nak-t100-practical-guide"]
---

## Pick a tool by task

| Task | Suitable starting point | What you still need |
| --- | --- | --- |
| Record a return and compare test tones | Audacity | Stereo line input and a repeatable test file |
| Inspect level, spectrum and distortion | REW | Correct input configuration and stated measurement settings |
| Check cassette speed and wow/flutter | NAK T-100 | Independent reference cassette and matched detector |
| Inspect stereo balance and polarity | FLUX:: Stereo Tool in a compatible host | Known mono reference and the plugin's native editor |
| Save a correction for later mixtapes | MixtapeForge's Calibration workflow | Its own complete test recorded and captured through tape |

Audacity and REW provide desktop options for Windows, macOS and Linux. NAK T-100 is offered through Windows and macOS stores. Check FLUX's current operating-system and plugin-format requirements against the host you intend to use; do not assume every VST host can load every plugin format.

## Make the first session useful

1. Choose one task, such as checking whether left and right return at the same level.
2. Select the interface's actual physical line input and output. Match supported sample rates and disable automatic gain, EQ and feedback-producing input monitoring.
3. Use a modest known tone rather than music for the first check. Confirm both channels and leave capture headroom.
4. Save the original signal, raw return, software version and settings. Repeat before interpreting a small difference.
5. Add another tool only when it answers a question the first cannot answer.

For example, [the Audacity round-trip exercise](../without-reference-tape/) teaches a reproducible capture. [The NAK T-100 guide](../nak-t100-practical-guide/) adds dedicated cassette measurements. [The Stereo Tool exercise](../flux-stereo-tool/) explains a stereo display using a known reference instead of guessing from music.

## Know the boundary between analysis and correction

Hypothetical case: an analyzer finds a 2 dB treble loss. It has not established that a 2 dB recording boost is safe, nor whether the loss belongs to recording or playback. A fresh recorded comparison is still needed.

MixtapeForge 0.1 does not automatically import REW calibration curves or NAK measurements into its profiles. Use its [guided profile sequence](../recording-profile/) for that workflow. Its generic VST3 parameters also do not reproduce a third-party plugin's native scope display.

Choose the smallest setup that gives a repeatable answer. For absolute speed, playback level or head alignment, software cannot replace the required physical reference tape.
