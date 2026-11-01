---
id: "crosstalk-test"
lang: "en"
title: "Measure Leakage Between Cassette Stereo Channels"
description: "Record one channel at a time and distinguish unwanted leakage from the noise floor or incorrect routing."
primaryKeyword: "Measure Leakage Between Cassette Stereo Channels"
secondaryKeywords: ["direct interface loopback","Noise measurement","Check the Interface Before Blaming the Cassette","Measure Tape Hiss Relative to a Recorded Signal"]
searchIntent: "evaluation"
answer: "Crosstalk is signal leaking into a channel that should be silent. This test checks left-to-right and right-to-left leakage on one cassette side. It does not measure leakage from the reverse side's tracks, which needs a different recording arrangement."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: Tone generator", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: splitting stereo tracks", "url": "https://manual.audacityteam.org/man/splitting_and_joining_stereo_tracks.html"}, {"title": "Audacity: Plot Spectrum", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "REW: audio interface configuration", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}]
related: ["loopback-round-trip", "tape-hiss-snr", "different-decks"]
guideType: "measurement"
prerequisites: ["channel-balance"]
next: ["phase-polarity"]
---

## Prepare a known stereo file

Use Audacity, a stereo line interface and a blank cassette. Create ten seconds of **1 kHz sine at amplitude 0.1** on a mono track, pan it fully left, then export a stereo WAV with a silent right channel. Make a second section with the tone fully right and the left silent. Reimport and inspect the WAV to confirm the silence is genuinely in the file.

Connect interface output L/R → deck LINE IN and LINE OUT → interface line input. Use NR off, the correct tape type and no effects, stereo widening, mono summing or input monitoring. Keep capture gains fixed and unclipped.

## Measure each direction

1. Record both sections at a moderate level, then rewind and capture the complete playback as stereo WAV.
2. Split the capture into separate channels in Audacity. Select the stable middle of the left-driven section on the left channel.
3. In **Plot Spectrum**, use the same Spectrum/Hann/FFT settings for all readings. Note the 1 kHz peak in the driven channel.
4. Select the identical interval on the nominally silent right channel. Read its 1 kHz peak if it rises clearly above surrounding noise.
5. Subtract the leakage level from the driven level. Repeat for the right-driven section and then repeat the recording.
6. Compare a [direct interface loopback](../loopback-round-trip/) if available. Otherwise report separation of the complete chain, not solely the deck.

## Interpret the result

Hypothetical example: the driven channel is −20 dBFS and the opposite tone is −60 dBFS, giving **40 dB separation at 1 kHz**. Larger positive separation means less leakage. An alternative signed report is −40 dB crosstalk; always state your convention.

If no tone is distinguishable from noise at −60 dBFS, you can report a limit based on that floor, not a precise 40 dB result. Do not use the total noise level as if it were the leaked tone.

## Find common setup mistakes

Nearly identical levels on both channels usually justify checking mono routing or monitoring first. Leakage already present in the exported test file invalidates the test. A result that changes strongly with frequency needs more than this single-frequency comparison.

Checklist: genuinely silent opposite channel, fixed gain, tone distinguished from hiss, both directions and repeated result. [Noise measurement](../tape-hiss-snr/) helps explain the limit; polarity processing cannot remove ordinary crosstalk.
