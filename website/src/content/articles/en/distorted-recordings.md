---
id: "distorted-recordings"
lang: "en"
title: "Cassette Recording Sounds Distorted: Find the Overloaded Stage"
description: "Check the digital master, interface, deck input and tape separately instead of lowering everything blindly."
primaryKeyword: "Cassette Recording Sounds Distorted"
secondaryKeywords: ["high-frequency saturation","recording-level selection","distortion measurement","Measure Cassette Distortion Without Confusing It with Hiss"]
searchIntent: "diagnosis"
answer: "Rough voices, fuzzy bass or splashy cymbals do not automatically mean a bad cassette. Distortion can enter at the source file, software processing, interface output, deck input, tape or capture input. Find the first stage that sounds wrong before changing the tape profile."
category: "troubleshooting"
image: "portable"
updated: "2026-11-01"
sources: [{"title": "Sony · 00027549", "url": "https://www.sony.com/electronics/support/audio-video/tcm-230dv/articles/00027549"}, {"title": "Audacity · Test recording", "url": "https://manual.audacityteam.org/man/tutorial_making_a_test_recording.html"}]

guideType: "troubleshooting"
prerequisites: []
next: ["recording-levels", "high-frequency-saturation"]
related: ["distortion-test", "normalization-compression-eq", "loopback-round-trip"]
---

## Compare one stage at a time

You need a disposable blank, a clean source passage and headphones. If you capture playback, use line inputs, not microphone sensitivity, and leave room below digital clipping—the point where peaks hit the converter's limit.

1. Listen to the source directly at moderate volume. Bypass added EQ, compression and plugins. If it is already distorted, replace or correct the source first.
2. Listen through the interface output that feeds the deck. Check software peak warnings. A quieter output cannot undo clipping already printed into a file.
3. Record a short passage with correct tape type and one NR encoder only. Note REC LEVEL and output settings.
4. Repeat the same passage with a clearly lower deck REC LEVEL. Keep output, tape and processing unchanged. Compare playback at matched listening volume.
5. If both recordings distort, lower the interface output and repeat. A deck's input circuitry can overload before the recording-level control. Do not compensate by immediately raising every later stage.
6. If direct deck playback is clean but its computer capture is rough, lower the interface input gain and recapture.

## Interpret the change

A lower REC LEVEL helping points toward excessive recording drive, not necessarily a broken deck. Loud treble improving more than bass suggests [high-frequency saturation](../high-frequency-saturation/) deserves a separate check. Distortion unchanged across lower levels and different clean tapes may require service.

Use [recording-level selection](../recording-levels/) to establish a working setting. A formal [distortion measurement](../distortion-test/) needs a suitable test tone and method; a music waveform alone does not tell you a trustworthy THD percentage. Keep the settings and the cleanest comparison, then re-enable processing one effect at a time.
