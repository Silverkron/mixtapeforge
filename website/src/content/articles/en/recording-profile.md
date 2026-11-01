---
id: "recording-profile"
lang: "en"
title: "Create and Verify a Recording Profile in MixtapeForge"
description: "Record the guided test, capture playback, review the proposed correction and save the exact deck/tape setup."
primaryKeyword: "Create and Verify a Recording Profile in MixtapeForge"
secondaryKeywords: ["EQ limits","other-deck compatibility","Use EQ to Improve a Cassette Without Making Its Limits Worse","Measure Left and Right Level Differences Before Applying a Trim"]
searchIntent: "task"
answer: "A recording profile remembers a measured deck/tape combination and applies a limited digital correction to later masters. It is useful when the same setup repeatedly changes the sound. It cannot separate recording faults from playback faults or make every cassette player behave identically."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100: measurement checklist", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "REW: audio interface configuration", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}]
related: ["eq-limits", "channel-balance", "frequency-response"]
guideType: "procedure"
prerequisites: ["without-reference-tape"]
next: ["different-decks", "consistent-copies"]
---

This workflow describes **MixtapeForge prototype 0.1**. The desktop app is required for native playback and capture. You need a disposable cassette, a working deck and a stereo line-input/output interface.

## 1. Record the app's test

1. Connect interface output L/R to deck LINE IN. Also connect deck LINE OUT L/R to interface line inputs, keeping input-to-output monitoring disabled.
2. Open **Calibration** and **Record the test**. Select the output toward the deck and a project sample rate supported by the interface. Use **Use device frequency** when appropriate.
3. Choose the correct tape type on the deck, switch Dolby/NR off and advance beyond the clear leader. Start with a moderate output and REC LEVEL. The test reaches **−3 dBFS peak** digitally; that does not predict the analog recording level.
4. Press REC on the deck, then **Start test**. The app counts **3…2…1** before sending approximately **108 seconds** of test audio. Keep output volume and REC LEVEL fixed and wait through the end marker. The test bypasses the mixtape's EQ, compression and NR.
5. Stop the deck and rewind before the beginning of the test. Open **Capture playback**.

## 2. Capture the actual tape playback

Select the input from the deck. Leave NR off. Press **Start acquisition** in MixtapeForge first, then press PLAY on the deck. Watch both input meters: if the capture clips, reduce input gain and acquire the whole test again. Do not change gain midway through a capture.

The app attempts to stop capture when it recognizes the end marker; manual stop remains available. Save the acquisition if you want to retain the raw WAV, then choose **Analyze test**. You can also import a WAV of the app's complete test sequence. An arbitrary music file or NAK T-100 report is not that sequence.

## 3. Review and save

Read the warnings before the proposed EQ and channel correction. Noisy or unstable bands may be left unchanged. The analysis describes the complete round trip; it is not a certified wow/flutter or MOL measurement.

The profile name is the only required field and is prefilled. Use a recognizable name such as **“Pioneer + TDK Type I · October test”**. Optional fields can record deck, tape, connections and control positions. Choose **Save and use profile**, then check **Applies to recordings and listening to the master**. When an output identity is stored, using another output can be blocked until you select the measured one or disable the profile.

## Verify with music

Record the same short excerpt with the profile off and on, keeping physical controls fixed. Compare playback at similar loudness. Hypothetically, a small treble adjustment may improve one tape while making loud cymbals rougher; retain it only after this second test.

If the app cannot recognize the sequence, check that neither marker was cut, the correct stereo input was captured and no normalization or processing altered the file. If results change greatly between passes, resolve the instability before saving a correction.

Checklist: complete markers, NR off, fixed controls, clean capture, reviewed warnings and a fresh music comparison. Recheck the profile after changing tape formulation, ports or gains. Read [EQ limits](../eq-limits/) and [other-deck compatibility](../different-decks/) before distributing many copies.
