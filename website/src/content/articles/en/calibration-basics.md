---
id: "calibration-basics"
lang: "en"
title: "Cassette Calibration: Choose the Right Test Before Adjusting Anything"
description: "Understand what a tape test measures, prepare a reliable connection and choose the next check."
primaryKeyword: "Cassette Calibration"
secondaryKeywords: ["which calibration tapes serve which purpose","checks that do not require a reference tape","the recording-profile workflow","Check the Interface Before Blaming the Cassette"]
searchIntent: "informational"
answer: "A recording can sound dull because of the cassette, the recording electronics, the playback alignment or even the capture settings. Calibration means comparing a result with a known reference, then adjusting the relevant part. Recording a tone and playing it back is useful, but does not isolate all those parts."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100: official specifications", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "REW: audio interface configuration", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}, {"title": "MRL: reference-tape selection and scope", "url": "https://mrltapes.com/pages/product-guide"}]
related: ["loopback-round-trip", "calibration-tapes", "recording-profile"]
guideType: "explainer"
prerequisites: []
next: ["needs-calibration", "without-reference-tape"]
---

## Decide which question you are asking

| Your question | Useful test | What the result includes |
| --- | --- | --- |
| Is my interface altering the signal? | Direct loopback | Output, cable and input |
| Will this tape record cleanly on this deck? | Record, rewind and replay | Interface, recording, tape and playback |
| Does playback run at the correct speed? | Certified speed reference cassette | Playback transport plus reference uncertainty |
| Can I improve my next mixtape? | Repeatable recording profile | Compensation for the measured combination |

A **reference cassette** contains a signal whose recorded properties are known. A self-recorded cassette is not an independent reference. See [which calibration tapes serve which purpose](../calibration-tapes/).

## Prepare one trustworthy starting point

You need a working deck, a disposable blank cassette, a computer and an interface with stereo line inputs and outputs. Microphone inputs with automatic gain are unsuitable: they change the level you are trying to compare.

1. Connect interface outputs L/R to deck LINE IN L/R, and deck LINE OUT L/R to interface line inputs. Keep software input monitoring off so the return cannot feed itself.
2. Select the actual ports in the software. Match the software sample rate to the interface; 44.1 or 48 kHz is sufficient for initial audible-band checks when both devices support it.
3. Turn off Dolby/NR, EQ, compression and automatic level controls. Select the cassette's correct tape type.
4. Start with a low output. Record a short test beyond the clear leader, rewind and replay. Reduce input gain if the digital meter clips.
5. Repeat with unchanged controls. If the two results differ appreciably, find that instability before applying a correction.

A three-head deck can monitor the tape during recording. A two-head deck needs the record–rewind–play cycle; its source monitor does not prove what reached the tape.

## Turn an observation into a decision

Hypothetical example: both repetitions return 2 dB less treble. That supports further investigation of the complete path, not an immediate 2 dB boost. If the loss varies between passes, fixed EQ is especially inappropriate.

Start with [checks that do not require a reference tape](../without-reference-tape/). If you need a reusable app setting, follow [the recording-profile workflow](../recording-profile/). MixtapeForge 0.1 offers a guided round-trip test; it does not certify mechanical alignment or independently calibrate playback speed.
