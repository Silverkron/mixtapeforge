---
id: "frequency-response"
lang: "en"
title: "Measure How Your Cassette Changes Bass, Midrange and Treble"
description: "Record a short series of equal-level tones, compare their return and distinguish tonal balance from saturation."
primaryKeyword: "Measure How Your Cassette Changes Bass, Midrange and Treble"
secondaryKeywords: ["the basic round-trip test","interface baseline","high-frequency saturation","limited EQ"]
searchIntent: "evaluation"
answer: "Frequency response tells you whether different pitches return at the same relative level. A cassette that preserves 1 kHz but loses 8 kHz may sound less bright. The test below measures the complete recording/playback path, not the playback head in isolation."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: Tone generator", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: Plot Spectrum", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "NAK T-100: measurement checklist", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["loopback-round-trip", "bias-adjustment", "recording-profile"]
guideType: "measurement"
prerequisites: ["without-reference-tape"]
next: ["high-frequency-saturation", "eq-limits"]
---

## Build a simple test file

Use Audacity, a stereo line interface and a disposable cassette. In **Generate > Tone**, create successive five-second sine tones at **100, 400, 1000, 4000, 8000 and 10000 Hz**, all at **amplitude 0.1**. Leave a short silence between tones so you can identify them. Duplicate the mono sequence to L/R without changing gain. These are practical comparison points, not a standardized certification sweep.

Set the line connections and disable NR/processing as in [the basic round-trip test](../without-reference-tape/). Keep monitoring quiet; test tones are not listening material.

## Record at a documented low level

1. Use the 1 kHz tone to establish a reference on the deck meter at a moderate level, without clipping the interface.
2. Reduce the generated signal by a further 20 dB for the response recording, keeping interface gain and REC LEVEL fixed. In Audacity, a new amplitude of **0.01** is 20 dB below 0.1. Note the reference explicitly: “20 dB below my 1 kHz setup level”. This is not an absolute flux calibration.
3. Record the complete sequence beyond the leader. Stop, rewind and capture stereo playback without effects or normalization.
4. Split L/R. For each tone, select the stable middle and use **Analyze > Plot Spectrum**, with Spectrum, Hann and the same FFT size. Read the peak belonging to that tone, not nearby noise.
5. For each channel, subtract its 1 kHz peak from the other peaks. This expresses tonal response relative to the middle reference. Keep left and right separate.
6. Repeat. If a tone is near the noise floor or fluctuates heavily, mark it uncertain rather than applying a large correction.

## Read the shape

Hypothetical example: 1 kHz returns at −35 dBFS and 8 kHz at −39 dBFS. The relative 8 kHz response is **−4 dB**. That difference may include the interface, recording, tape, alignment and playback response. A direct [interface baseline](../loopback-round-trip/) helps separate some of those influences.

If a higher-level test loses more treble, investigate [high-frequency saturation](../high-frequency-saturation/); raising treble may make it worse. If the loss is stable across low-level repetitions, check tape selection and bias before trying [limited EQ](../eq-limits/).

Checklist: equal source levels, documented reduction, fixed controls, separate channels, 1 kHz normalization and repeated passes. Do not report “flat to 10 kHz” without stating tolerance and recording level.
