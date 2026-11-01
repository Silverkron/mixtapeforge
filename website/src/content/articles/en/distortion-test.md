---
id: "distortion-test"
lang: "en"
title: "Measure Cassette Distortion Without Confusing It with Hiss"
description: "Compare a clean sine and its recorded return, distinguish THD, THD+N and third-harmonic distortion."
primaryKeyword: "Measure Cassette Distortion Without Confusing It with Hiss"
secondaryKeywords: ["interface baseline","recording level","Why Loud Treble Disappears on Tape","Cassette Recording Levels"]
searchIntent: "evaluation"
answer: "Distortion adds frequencies that were absent from the input. A pure 400 Hz sine may return with components at 800, 1200 Hz and above; these are its harmonics. They explain why raising recording level can make a tone or instrument sound rougher."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100: official specifications", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "NAK T-100: measurement checklist", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "REW: spectrum, RMS levels and distortion", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/spectrum.html"}]
related: ["high-frequency-saturation", "recording-levels", "nak-t100-practical-guide"]
guideType: "measurement"
prerequisites: ["without-reference-tape"]
next: ["maximum-output-level"]
---

**THD** combines harmonic distortion. **THD+N** also includes noise. **HD3** measures only the third harmonic, at three times the test frequency. Keep those labels separate when comparing results.

## What you need

Use NAK T-100, a stereo line interface and a disposable cassette. Connect output → deck LINE IN and deck LINE OUT → line input. Disable NR, EQ, compression and automatic gain. A direct [interface baseline](../loopback-round-trip/) is useful because distortion can arise before the tape.

## Compare modest recording levels

1. Select **T.H.Dist.** in NAK T-100. Choose the documented **400 Hz** base frequency and identify whether the displayed result is THD+N or HD3. Keep that mode for the whole comparison.
2. Start output low and record at a modest deck level. Ensure the capture input remains unclipped. Record the deck reading, generator setting and input gains.
3. On a three-head deck monitor Tape. On a two-head deck record a short section, stop, rewind and play it back into the analyzer.
4. Read the stable middle for left and right separately. Change Meter Range if the reading is outside the displayed range; do not report a value pinned to the limit.
5. Record a second section with a small, documented level increase, while keeping capture gain unchanged. If the interface clips, reduce its gain and repeat both sections.
6. Repeat the measurements and save the mode, frequency, level and channel with each result.

## Interpret rather than chase one percentage

Hypothetical example: HD3 rises from 0.5% to 1.5% as recording level increases. That shows increasing third-harmonic contribution under those conditions, not a universal audibility threshold. A THD+N result cannot be substituted for either value.

If THD+N increases when you lower the recording level, noise may now form a larger proportion of the signal. That is different from increasing tape nonlinearity at higher levels. Use the raw spectrum or HD3 reading to investigate.

## If the result is unexpectedly bad

Check digital clipping, the selected fundamental, line-input mode and source processing. If the same high distortion appears in direct loopback, investigate the interface first. If only a higher-level tape return worsens, consider lowering your [recording level](../recording-levels/).

Checklist: known sine, specified metric, unchanged capture path, separate channels, repeated readings. MixtapeForge's profile analysis is not a certified distortion analyzer or a substitute for this instrument-specific comparison.
