---
id: "maximum-output-level"
lang: "en"
title: "Estimate Tape Headroom at a Stated Distortion Limit"
description: "Find the recorded output near a defined third-harmonic threshold and use the result cautiously for music."
primaryKeyword: "Estimate Tape Headroom at a Stated Distortion Limit"
secondaryKeywords: ["distortion check","high-frequency saturation","Compare Tape Recording Sensitivity at Fixed Controls","Measure Tape Hiss Relative to a Recorded Signal"]
searchIntent: "evaluation"
answer: "Maximum output level, or MOL, is meaningful only with a frequency, distortion criterion and reference. It describes the output recovered from tape, not simply how far you can turn REC LEVEL. A common tape comparison uses a third-harmonic limit, but different published methods must not be treated as identical."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Anaxwaves: determining tape headroom", "url": "https://www.anaxwaves.com/MixtapeNerd/Docs/DetermineHeadroom.html"}, {"title": "NAK T-100: official specifications", "url": "https://anaxwaves.com/NAKT100/"}]
related: ["recording-sensitivity", "tape-hiss-snr", "eq-limits"]
guideType: "measurement"
prerequisites: ["distortion-test"]
next: ["high-frequency-saturation", "recording-levels"]
---

## Before starting

Complete the [distortion check](../distortion-test/). You need NAK T-100, a disposable cassette and stereo line connections. Use NR off and the correct tape type. Keep monitor sound very low. This is an advanced comparison; if the analyzer does not expose the chosen distortion metric clearly, do not label the result as MOL at that metric.

## Make a local headroom estimate

1. Choose **400 Hz** and **HD3** for this test. Establish a moderate recorded reference and note the recovered output level for L/R. Define it as your local 0 dBr, where dBr means decibels relative to that reference.
2. Keep playback output and interface capture gains fixed. Verify that the reference and later, louder returns remain below input clipping.
3. Increase recording drive in small documented steps, recording a short section at each. For a two-head deck, rewind and replay each section; for three heads, use Tape monitoring.
4. Read the recovered fundamental level and HD3 for each channel. Stop increasing when the chosen limit is reached or the path overloads. For an illustrative **3% HD3** criterion, do not substitute 3% THD+N.
5. Repeat the two steps bracketing the threshold. Report the range if your step size cannot locate it precisely. Keep the left and right limits separately.
6. Express the recovered level at the criterion relative to the recorded reference, and retain the frequency, tape and method alongside it.

## What the number tells you

Hypothetical example: one channel reaches 3% HD3 at +4 dBr and the other at +3 dBr. That supports an approximate 3 dB limit for the weaker channel under this local method. It does not establish a manufacturer-equivalent MOL unless the reference flux, bias and measurement conditions also match.

If the interface clips first, you measured the interface limit. Reduce capture gain and repeat the reference plus all compared levels. If readings are already noise-dominated at low levels, establish a better measurement path before testing a threshold.

## Apply the lesson to music

A steady low-frequency tone does not predict cymbal handling. Check [high-frequency saturation](../high-frequency-saturation/) separately and leave room for musical peaks. Lowering peaks can improve clarity, but excessive compression changes the music.

Checklist: stated frequency, HD3 distinguished from THD+N, local reference saved, capture headroom verified and weaker channel retained. MixtapeForge's estimates should not be advertised as a certified MOL measurement.
