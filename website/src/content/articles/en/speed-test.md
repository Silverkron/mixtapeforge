---
id: "speed-test"
lang: "en"
title: "Measure Cassette Playback Speed with a 3 kHz or 3.15 kHz Tape"
description: "Use an independent reference tone to calculate constant pitch error without confusing it with wow and flutter."
primaryKeyword: "Measure Cassette Playback Speed with a 3 kHz or 3.15 kHz Tape"
secondaryKeywords: ["wow and flutter","transport diagnostics","Cassette Playback Too Fast or Too Slow","NAK T-100"]
searchIntent: "evaluation"
answer: "If every note sounds slightly sharp or flat, the deck may run consistently fast or slow. This is speed error. Pitch that moves up and down is a different issue: wow and flutter."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100: official specifications", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "NAK T-100: measurement checklist", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "Audacity: Plot Spectrum", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}]
related: ["playback-speed-problems", "nak-t100-practical-guide", "without-reference-tape"]
guideType: "measurement"
prerequisites: ["calibration-tapes"]
next: ["wow-flutter"]
---

If every note sounds slightly sharp or flat, the deck may run consistently fast or slow. This is **speed error**. Pitch that moves up and down is a different issue: [wow and flutter](../wow-flutter/).

## What you need

Use a trustworthy speed-reference cassette marked **3000 Hz or 3150 Hz**, a stereo line-input interface and NAK T-100. You need only the playback connection: deck LINE OUT → interface LINE IN → computer. A tone recorded by the deck under test is not an independent speed reference.

## Take the reading

1. Select the interface's physical line input, with a supported sample rate matching the computer configuration. Disable automatic gain and other processing. Keep input monitoring off.
2. Insert the reference cassette. Leave pitch control, if present, in its documented normal position. Switch NR off for the test.
3. In NAK T-100 select **Speed Wow/Flutter** with the Function control. Set **Speed Cal.** to the frequency printed on the cassette, not the frequency you happen to observe.
4. Start playback. Check that both input channels receive a clean signal without clipping. If the deck has a Source/Tape monitor selector, select Tape.
5. Let the transport settle after starting, then observe a stable middle section for about thirty seconds. Note the speed indication and whether it remains steady. This duration is a practical comparison window, not a claim of standard compliance.
6. Stop, rewind and repeat. If the cassette provides suitable material later in the side, compare that section too. Record reference identity, channel, pitch-control position and test interval.

## Understand the result

Speed error is `(measured frequency / reference frequency − 1) × 100`.

Hypothetical example: 3015 Hz from a 3000 Hz reference gives **+0.5%**, meaning playback is faster than the reference. A 2985 Hz result gives **−0.5%**. Compare with your deck's specified tolerance using compatible conditions; these examples are not pass/fail limits.

Audacity's Plot Spectrum can provide a coarse frequency check on a captured tone. Its finite frequency resolution and averaging do not replace a dedicated speed/wow/flutter measurement.

## Problems to rule out

- A result near +5% or −4.76% suggests a 3000/3150 Hz reference mismatch. Recheck the label before adjusting anything.
- A moving value suggests instability or dropouts. Repeat with a sound reference and follow [transport diagnostics](../playback-speed-problems/).
- An apparently perfect result from a self-recorded tone does not prove correct speed: recording and replay errors can cancel.

Checklist: independent reference, matching frequency, clean input, repeated reading and documented conditions. Motor adjustment requires the model's service method; do not search for an undocumented internal screw.
