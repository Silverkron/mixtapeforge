---
id: "bias-adjustment"
lang: "en"
title: "Understand Cassette Bias and Use External Calibration Controls"
description: "Learn what bias changes, why more treble is not always better and when a model-specific procedure is essential."
primaryKeyword: "Understand Cassette Bias and Use External Calibration Controls"
secondaryKeywords: ["low-level response test","low-frequency distortion measurement","saturation","Bias, EQ and Noise Reduction"]
searchIntent: "informational"
answer: "Bias is a high-frequency electrical signal generated inside the deck during recording. It helps the tape respond more consistently to the audio signal. It is not an EQ filter in the computer, and boosting treble in software does not change it."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "John G. McKnight: Biasing in Magnetic Tape Recording", "url": "https://cdn.shopify.com/s/files/1/0720/0627/1232/files/mcknight_biasing.pdf?v=1763068428"}, {"title": "NAK T-100: measurement checklist", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["bias-eq-nr", "high-frequency-saturation", "recording-profile"]
guideType: "explainer"
prerequisites: ["frequency-response"]
next: ["distortion-test", "recording-sensitivity"]
---

Bias affects several things at once: low-level frequency response, recording sensitivity and distortion. That is why turning a bias control until a cassette sounds brightest can produce a poorer recording overall.

## Know which controls you have

Some decks calibrate a cassette automatically. Others expose a user bias trim or test-tone calibration system. Many provide no user adjustment at all. Find your model's operating instructions before proceeding. Do not open the deck or move internal trimmers based on a generic guide.

If your deck has automatic calibration, use it with the cassette you will record and follow its documented preparation. If it fails repeatedly on one tape, try another sound cassette before assuming the deck is faulty.

## Compare an external bias setting safely

For a user-accessible bias trim, use a disposable tape, the normal line connections, NR off and the [low-level response test](../frequency-response/).

1. Photograph or mark the original external control position. Make a baseline recording and retain its return capture.
2. Follow the deck manual's specified tones, recording level and adjustment order. Keep the computer output and capture gain fixed.
3. Make one small reversible change within the user control's range. Label the next test section with that position in your notes.
4. Replay and compare both the high-frequency response and a [low-frequency distortion measurement](../distortion-test/). Do not judge only by the brightest trace.
5. Return to the original setting if results are unstable or the change has no clear benefit. Recheck with music at the intended recording level before saving a profile.

## What “overbias” means

In an overbias procedure, the technician finds a maximum in the recovered test-tone output, then increases bias beyond that point until the output falls by the amount specified for that deck/tape method. The tone frequency and drop are not universal.

Hypothetical example: “increase bias until the test tone drops 1.5 dB from its peak” describes an output change, not a 1.5 dB computer-volume adjustment. It is only an illustration, not a recommended cassette setting.

## Avoid misleading improvements

More treble accompanied by more distortion is a tradeoff, not automatically better calibration. If only loud treble suffers, test [saturation](../high-frequency-saturation/) before changing bias. If the response changes on repeated passes, inspect the tape and transport first.

A useful record includes tape identity, control position, response and distortion conditions. MixtapeForge can store recording conditions and propose limited digital correction; it cannot remotely set the deck's bias oscillator.
