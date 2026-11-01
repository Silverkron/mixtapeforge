---
id: "playback-level"
lang: "en"
title: "Check Playback Level Against a Known Magnetic Reference"
description: "Understand fluxivity, output voltage and meter readings before attempting a playback-level adjustment."
primaryKeyword: "Check Playback Level Against a Known Magnetic Reference"
secondaryKeywords: ["recording sensitivity","different-deck comparisons","Check Cassette Playback Azimuth Without Losing the Original Alignment","Cassette Calibration"]
searchIntent: "evaluation"
answer: "Playback-level calibration connects a known magnetic signal on tape to a specified electrical output or meter indication. It is the reference that recording-level comparisons depend on. Turning up the interface input until a meter reads zero does not calibrate the deck."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "MRL: reference-tape selection and scope", "url": "https://mrltapes.com/pages/product-guide"}, {"title": "NAK T-100: official specifications", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "REW: spectrum, RMS levels and distortion", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/spectrum.html"}]
related: ["azimuth-test", "calibration-basics", "different-decks"]
guideType: "measurement"
prerequisites: ["calibration-tapes"]
next: ["recording-sensitivity"]
---

## Gather the exact reference

You need the deck's service procedure, its specified playback-level cassette and either the specified AC voltmeter or a suitably calibrated audio analyzer. Write down the tape's **fluxivity** in nWb/m, tone frequency, equalization and tolerance. Use the manual's expected output voltage, load and control positions; these differ between models.

A computer meter in **dBFS** measures distance from digital full scale. A deck's 0 VU mark and an analyzer's calibrated voltage scale are different references. NAK T-100 requires external voltage calibration before its voltage display can be treated as absolute.

## Make a comparison without internal adjustment

1. Confirm that the reference cassette matches the service requirement. If you cannot establish that match, stop at a relative comparison rather than inventing a target.
2. Connect deck LINE OUT to the specified measuring input. For an interface, use line mode and a fixed gain; disable software effects and automatic level controls.
3. Set the deck's playback/output controls and NR state exactly as the service procedure specifies. Start with safe input headroom.
4. Play the reference segment and wait for a stable reading. Measure left and right separately over the same section.
5. Record the observed value, expected value, reference identity and controls. Repeat before deciding that a difference is real.
6. If adjustment is required, use the model-specific service procedure and appropriate expertise. Do not compensate with REC LEVEL: that affects a different part of the system.

## Interpret a difference

Hypothetical example: the manual calls for 0.50 V RMS and you measure 0.45 V under the same conditions. The difference is `20 × log10(0.45 / 0.50)`, about **−0.92 dB**. Whether that is out of tolerance depends on the service specification and measurement uncertainty.

A lower-level reference tape can produce the same apparent error. So can a variable output knob, incorrect loading or uncalibrated input scaling. Check those before changing the deck.

Checklist: correct tape, specified controls/load, calibrated voltage if needed, stable L/R readings, documented tolerance. Once playback is trustworthy, [recording sensitivity](../recording-sensitivity/) becomes meaningful; [different-deck comparisons](../different-decks/) otherwise mix several unknowns.
