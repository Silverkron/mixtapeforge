---
id: "phase-polarity"
lang: "en"
title: "Check Stereo Polarity and Timing with a Known Mono Signal"
description: "Learn why a polarity switch can fix one wiring fault but cannot repair every phase or alignment problem."
primaryKeyword: "Check Stereo Polarity and Timing with a Known Mono Signal"
secondaryKeywords: ["azimuth","quiet-channel troubleshooting","Stereo Tool guide","Check Cassette Playback Azimuth Without Losing the Original Alignment"]
searchIntent: "evaluation"
answer: "Polarity inversion changes a waveform's sign: positive becomes negative. A time delay shifts it horizontally. A delay creates different phase angles at different frequencies, so flipping polarity cannot generally undo it."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "FLUX:: Stereo Tool manual", "url": "https://doc.flux.audio/stereotool/"}, {"title": "FLUX:: Stereo Tool product and compatibility", "url": "https://www.flux.audio/project/stereo-tool-freeware/"}, {"title": "Audacity: splitting stereo tracks", "url": "https://manual.audacityteam.org/man/splitting_and_joining_stereo_tracks.html"}]
related: ["azimuth-test", "quiet-channel", "different-decks"]
guideType: "measurement"
prerequisites: ["channel-balance"]
next: ["flux-stereo-tool"]
---

A polarity mismatch between identical left and right signals can make a centered voice disappear when summed to mono. Music with intentional stereo effects can also show negative correlation, so begin with a known reference.

## Equipment and reference

Use a compatible audio host with FLUX:: Stereo Tool's editor, or a stereo scope plus mono monitoring. Create a short mono voice recording and route the exact same samples to L/R at equal gain. Turn off all effects. For tape testing, capture deck LINE OUT into stereo line inputs with fixed gains and NR settings appropriate to the recorded material.

## Learn the correct pattern first

1. Play the unchanged mono reference through Stereo Tool with channel gains at 0 dB, polarity switches off and neutral routing/width.
2. Observe the centered mono pattern. Identical channels should correlate near +1. If they do not, inspect the host's routing before involving the deck.
3. Temporarily invert only one channel using the plugin's polarity control. The pattern should show opposing channels; mono summing in the host should greatly reduce the reference. Keep listening volume low.
4. Restore the switch. This deliberately introduced error teaches you what a true relative inversion looks like.
5. Record and capture the reference through the deck, then compare the raw return using the same neutral plugin settings. Keep the original digital reference available for comparison.
6. If the return consistently resembles the deliberate inversion, check cables and routing. Try a corrective inversion on a copy only after confirming the fault; keep the unprocessed capture.

## Interpret intermediate results

Hypothetical example: the original reference centers cleanly, but the tape return forms an ellipse and changes with frequency. That is not enough evidence for a polarity flip. Timing, [azimuth](../azimuth-test/) and channel response can all affect the pattern.

Correlation near +1 is expected for identical mono, not every stereo song. Brief negative music readings are a reason to listen in mono, not automatically a wiring diagnosis.

## If the test is confusing

One absent channel calls for [quiet-channel troubleshooting](../quiet-channel/). Unequal channel gain tilts the image; measure that separately. If bypassing the host's other plugins restores mono, investigate those plugins before adjusting the deck.

Checklist: known identical channels, neutral settings, deliberate inversion restored, raw capture preserved and frequency-dependent effects not confused with polarity. The [Stereo Tool guide](../flux-stereo-tool/) expands the host workflow; MixtapeForge's generic plugin parameters do not provide that native metering display.
