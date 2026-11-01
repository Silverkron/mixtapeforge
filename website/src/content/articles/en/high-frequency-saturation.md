---
id: "high-frequency-saturation"
lang: "en"
title: "Why Loud Treble Disappears on Tape: Test Before Boosting EQ"
description: "Compare low and higher-level treble tones to find level-dependent loss without mistaking it for a fixed EQ problem."
primaryKeyword: "Why Loud Treble Disappears on Tape"
secondaryKeywords: ["the frequency-response test","Low-frequency maximum output","Estimate Tape Headroom at a Stated Distortion Limit","Measure Cassette Distortion Without Confusing It with Hiss"]
searchIntent: "evaluation"
answer: "Cassette tape can stop recording increases in treble faithfully before a digital meter clips. This is high-frequency saturation: more input no longer produces a proportional recorded output. Cymbals can lose clarity even when the recording sounds loud enough."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: Tone generator", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: Plot Spectrum", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "Anaxwaves: determining tape headroom", "url": "https://www.anaxwaves.com/MixtapeNerd/Docs/DetermineHeadroom.html"}]
related: ["maximum-output-level", "distortion-test", "bias-adjustment"]
guideType: "measurement"
prerequisites: ["frequency-response"]
next: ["recording-levels", "eq-limits"]
---

## Prepare a short comparison

Use the same line connections, NR-off setup and Audacity measurement method as [the frequency-response test](../frequency-response/). You need a disposable cassette and two short tone pairs: 1 kHz followed by 8 kHz, five seconds each. Route identical signals to both channels.

Keep speakers and headphones low or muted. This is a recording test, not a test of your hearing or tweeters. Use moderate levels; there is no need to drive the deck to its maximum.

## Compare two recording levels

1. Generate the first pair at amplitude **0.01**. Generate the second at **0.02**, exactly twice the amplitude, approximately 6 dB higher.
2. Establish a conservative deck level and check capture headroom. Keep REC LEVEL, interface output volume and input gain unchanged throughout both pairs.
3. Record the low pair, then the higher pair on the same tape section. Rewind and capture the complete playback without normalization or processing.
4. In Audacity, split stereo channels and measure each tone's stable middle using Plot Spectrum with unchanged settings.
5. Calculate how much the 1 kHz return increased, then how much the 8 kHz return increased. Repeat the test once before drawing a conclusion.

## What compression of the rise means

Hypothetical example: doubling input raises the 1 kHz return by 5.8 dB but the 8 kHz return by only 3 dB. The treble is no longer following the input proportionally. This suggests a level-dependent limitation somewhere in the path; confirm that source, interface and deck input were not overloading.

If both frequencies rise by about 6 dB but the treble remains 3 dB lower relative to 1 kHz in both tests, that looks more like a stable response difference than saturation at those levels.

## What to change next

Try the same musical passage at a lower recording level. If cymbals recover, preserve that margin instead of adding a treble boost. Compare another tape and, where available, the deck's documented external calibration controls.

A noisy low-level reading can hide the tone; do not interpret the noise floor as a saturation plateau. A result that changes on every replay calls for checking tape contact first.

Checklist: known 6 dB input change, fixed controls, clean capture, two frequencies, repeated result. [Low-frequency maximum output](../maximum-output-level/) is a separate property and cannot predict all treble behavior.
