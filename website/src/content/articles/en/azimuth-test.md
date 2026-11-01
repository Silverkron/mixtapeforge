---
id: "azimuth-test"
lang: "en"
title: "Check Cassette Playback Azimuth Without Losing the Original Alignment"
description: "Use a proper alignment reference to inspect high-frequency level and phase before considering service adjustment."
primaryKeyword: "Check Cassette Playback Azimuth Without Losing the Original Alignment"
secondaryKeywords: ["channel level and polarity","frequency-response test","Check Stereo Polarity and Timing with a Known Mono Signal","Measure How Your Cassette Changes Bass, Midrange and Treble"]
searchIntent: "evaluation"
answer: "Azimuth is the angle of the head gap relative to the recorded track. A mismatch can weaken treble and make the two channels combine poorly in mono. This guide checks for evidence of a mismatch; it does not prescribe a universal screw adjustment."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Jay McKnight: Azimuth in a Magnetic Tape Recorder", "url": "https://www.mrltapes.com/mcknight_azimuth-in-mtr.pdf"}, {"title": "NAK T-100: measurement checklist", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "NAK T-100: official specifications", "url": "https://anaxwaves.com/NAKT100/"}]
related: ["phase-polarity", "frequency-response", "playback-level"]
guideType: "measurement"
prerequisites: ["calibration-tapes"]
next: ["different-decks"]
---

## What you need

Use an azimuth-reference cassette specified for your deck's service procedure, a stereo line-input interface and NAK T-100's two-channel scope. The reference's tone frequency, track format and alignment must be documented. Ordinary music or a tone recorded on the same deck cannot establish independent alignment.

First confirm that the deck transports an ordinary cassette reliably. Do not put a valuable reference into a mechanism that damages tape. Clean only as the manufacturer's maintenance instructions allow.

## Observe before touching anything

1. Connect deck LINE OUT L/R to interface LINE IN L/R. Select stereo inputs, disable effects and automatic gain, and keep channel gains fixed.
2. Insert the reference cassette, select its required playback tape type and turn NR off. Start the documented azimuth segment.
3. In NAK T-100 choose **Level** and note the two channel levels after playback settles. Lower input gain if either clips.
4. Switch to **Scope > O'scope**. Observe whether the two sine waves rise and fall together. The **Lissajous** view plots one channel against the other: an in-phase equal-level tone tends toward a diagonal line; a phase difference opens an ellipse.
5. Repeat the same section. Note both amplitude and phase behavior. Inspect more than one documented reference frequency if the cassette provides them.
6. Save the observations and reference details. If a mismatch repeats, consult the model's alignment procedure or a technician before moving the head.

## What the pattern cannot prove

At high frequencies, a delay can wrap through a complete waveform cycle. An apparently aligned phase trace at one frequency is not sufficient proof of correct azimuth. Tape guiding, head contact, channel electronics and the reference itself can also affect the result.

Hypothetical example: a narrow ellipse at one frequency becomes broad at another, while the treble level changes between passes. That calls for checking repeatability and tape contact, not simply turning a screw until one graph looks straight.

## Common obstacles

If only one waveform appears, check channel routing. If a diagonal line tilts because one channel is quieter, investigate [channel level and polarity](../phase-polarity/) rather than assuming azimuth. If the display wanders, try a sound reference and inspect transport condition.

Checklist: documented reference, both channels, unclipped levels, repeated observations and original alignment preserved. A [frequency-response test](../frequency-response/) can show the audible consequence, but cannot identify azimuth independently.
