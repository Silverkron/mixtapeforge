---
id: "tape-hiss-snr"
lang: "en"
title: "Measure Tape Hiss Relative to a Recorded Signal"
description: "Capture a reference tone and recorded silence at fixed gain to obtain a meaningful signal-to-noise comparison."
primaryKeyword: "Measure Tape Hiss Relative to a Recorded Signal"
secondaryKeywords: ["the NAK guide","Dolby B","Measure Cassette Distortion Without Confusing It with Hiss","Dolby B Explained"]
searchIntent: "evaluation"
answer: "A noise meter alone cannot tell you whether a cassette is quiet. Signal-to-noise ratio, or SNR, compares a stated signal with the noise beneath it. Lowering playback volume lowers both; it does not improve SNR."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "REW: spectrum, RMS levels and distortion", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/spectrum.html"}, {"title": "NAK T-100: official specifications", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "NAK T-100: measurement checklist", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["distortion-test", "dolby-b", "calibration-software"]
guideType: "measurement"
prerequisites: ["without-reference-tape"]
next: ["recording-levels"]
---

## Prepare two sections at the same settings

Use a blank cassette, a stereo line interface and REW's live RTA for level readings. This procedure reads the deck directly; a separate WAV capture is optional evidence. Connect interface output → deck LINE IN and LINE OUT → interface line input. Disable automatic gain, NR and processing. Keep source, deck and capture controls fixed.

Generate a short **1 kHz sine** at a moderate documented deck level. Follow it with at least ten seconds of digital silence while the deck remains in REC. This records the actual erase/bias/recording noise. An untouched blank or the deck in Stop is a different condition.

## Measure signal and noise

1. Record the tone and silence on the cassette, then stop and rewind before the tone. Leave the deck stopped while preparing REW.
2. Select one input channel in REW and open **RTA**. Use a dBFS display. Start the analyzer with its record control; observe the **Input RMS** reading, which represents average signal energy rather than instantaneous peaks.
3. Press PLAY on the deck. Read the stable middle of the reference tone. Record the unweighted RMS value and the analysis bandwidth/filter settings.
4. Read the middle of the recorded silence with the same channel, gain, bandwidth and unweighted RMS convention. Avoid the switching transient between tone and silence.
5. Subtract noise level from signal level. Repeat for the other channel and another silence interval.
6. If you also use A-weighting, record the corresponding A-weighted reference and noise values as a separate result. Weighting changes which frequencies count; do not mix weighted and unweighted numbers.

## Work through an example

Hypothetical readings: tone **−18 dBFS RMS**, noise **−70 dBFS RMS**. The separation is **52 dB** under those settings. It is not automatically comparable with a specification referenced to maximum output level or using a different weighting.

NAK T-100 offers Noise-A, but its scale offsets require attention. Use [the NAK guide](../nak-t100-practical-guide/) rather than treating its displayed noise scale as a ready-made positive SNR.

## If the number seems surprising

If noise changes when the computer display or a charger switches, investigate electrical interference. If the “silence” contains music, confirm it was recorded over completely. If input gain changed between sections, repeat both readings. If you also save a WAV, preserve both sections in one unprocessed file without normalization.

Checklist: recorded silence, stated signal reference, identical gain, matching RMS/weighting/bandwidth and both channels. Test [Dolby B](../dolby-b/) as a separate matched encode/decode condition; switching only playback NR changes the question.
