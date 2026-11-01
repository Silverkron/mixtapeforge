---
id: "recording-sensitivity"
lang: "en"
title: "Compare Tape Recording Sensitivity at Fixed Controls"
description: "Measure how much output different tapes return from the same recording signal without confusing level and tonal balance."
primaryKeyword: "Compare Tape Recording Sensitivity at Fixed Controls"
secondaryKeywords: ["playback-level reference","channel balance","recording profile","Check Playback Level Against a Known Magnetic Reference"]
searchIntent: "evaluation"
answer: "Recording sensitivity describes how much signal a tape returns for a specified recording input. Two tapes can sound different in loudness even when the source and REC LEVEL have not moved. That difference matters when matching levels and using level-dependent noise reduction."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: Tone generator", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: Plot Spectrum", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "NAK T-100: measurement checklist", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["playback-level", "channel-balance", "tape-hiss-snr"]
guideType: "measurement"
prerequisites: ["without-reference-tape"]
next: ["bias-adjustment", "recording-profile"]
---

## Choose the kind of comparison

For comparing two tapes on one deck, use fixed controls and the same test. For an absolute service adjustment, playback must first be checked with the correct [playback-level reference](../playback-level/). A round trip through an uncalibrated deck supports a relative comparison, not proof of recording-stage accuracy.

You need a stereo interface, Audacity and two usable tapes. Connect output → LINE IN and LINE OUT → line input. Turn NR and processing off. Keep the tape-type selection appropriate for each cassette and record which setting you used.

## Make a controlled comparison

1. Generate ten seconds of a **400 Hz sine** in Audacity at amplitude **0.1**. Route the same signal to L/R. Use a modest, documented deck recording level without digital clipping.
2. Record tape A beyond the leader. Rewind and capture its playback without changing interface gains or deck output controls.
3. Record tape B with the same source and REC LEVEL. If the deck performs automatic tape calibration, decide whether you are comparing calibrated tapes or the same fixed setup, and use that condition consistently.
4. Split each stereo capture into L/R. Measure the stable 400 Hz peak with identical Plot Spectrum settings, selecting one channel at a time.
5. Subtract tape A's recovered level from tape B's for each channel. Repeat one section on each tape to check stability.
6. Keep these level readings before any loudness matching. Match listening loudness only on copies used to compare tonal quality.

## Work through a result

Hypothetical example: tape A returns −20 dBFS and tape B −18.5 dBFS on the same channel. Tape B is **1.5 dB more sensitive in this test**. It does not necessarily tolerate 1.5 dB more recording drive, have less noise or sound brighter. Those are separate measurements.

If the two channels disagree, inspect [channel balance](../channel-balance/) before applying a global correction. If the difference changes every run, try another tape section and check capture gain or tape contact.

Checklist: same source, documented tape-type/calibration condition, fixed gains, separate channels and no normalization before measurement. Use the result to understand your deck/tape combination, then save the complete conditions in a [recording profile](../recording-profile/).
