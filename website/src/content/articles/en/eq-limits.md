---
id: "eq-limits"
lang: "en"
title: "Use EQ to Improve a Cassette Without Making Its Limits Worse"
description: "Choose small corrections from repeatable measurements and verify them with a fresh recording."
primaryKeyword: "Use EQ to Improve a Cassette Without Making Its Limits Worse"
secondaryKeywords: ["low-level response tests","saturation","why decks differ","named recording profile"]
searchIntent: "task"
answer: "An equalizer, or EQ, changes the level of selected frequency ranges. It can help a stable tonal imbalance, but cannot restore information lost through dropouts, repair head alignment or stop pitch wandering. A large boost can push the tape harder precisely where it already struggles."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "John G. McKnight: Biasing in Magnetic Tape Recording", "url": "https://cdn.shopify.com/s/files/1/0720/0627/1232/files/mcknight_biasing.pdf?v=1763068428"}, {"title": "NAK T-100: measurement checklist", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["high-frequency-saturation", "different-decks", "normalization-compression-eq"]
guideType: "procedure"
prerequisites: ["frequency-response"]
next: ["recording-profile"]
---

## Decide whether the difference is correctable

Start with two unchanged [low-level response tests](../frequency-response/). The same broad difference should appear in both channels and repeat. Note whether the difference increases at higher recording level; that points toward [saturation](../high-frequency-saturation/), for which more boost is often the wrong response.

Keep the original source and uncorrected capture. You need a disposable tape, the same recording chain and a music excerpt with both bright transients and sustained notes.

## Try a small correction

1. Identify a broad, repeatable difference rather than a narrow ripple or a band buried in noise. Check correct tape type, NR settings and transport condition first.
2. Create a copy of the processing settings. If a profile already applies corrective EQ, inspect it before adding a second correction manually.
3. Make a modest trial. For example, a **1 dB** broad adjustment is a reversible experiment, not a required response to any particular tape type.
4. Check digital output headroom and reduce overall gain if the EQ raises peaks. Keep the deck's REC LEVEL and interface controls at the measured positions.
5. Record corrected and uncorrected excerpts under the same conditions. Rewind and capture each. Compare at matched listening loudness on copies, preserving the raw files.
6. Retain the change only if the repeated recording sounds more balanced without rougher treble, greater distortion or an unstable stereo image. If possible, listen on another deck before making many copies.

## Interpret a failed correction

Hypothetical example: a low-level test shows −4 dB at 8 kHz. A +4 dB boost makes cymbals harsher and still does not restore their clarity. The path may lack headroom or contain an alignment loss. Reducing the boost or recording level is more useful than insisting on a flat graph.

A correction derived from one deck's playback can also overcompensate on another. Read [why decks differ](../different-decks/) before treating a round-trip profile as universal.

## MixtapeForge's role

In prototype 0.1, the guided profile proposes limited EQ and channel attenuation based on its measurements and confidence checks. Unreliable bands may remain unchanged. A blank correction is not permission to force those bands manually.

Checklist: repeatable difference, one correction stage, output headroom, fresh tape comparison and original settings preserved. Save a [named recording profile](../recording-profile/) only after the listening result supports it.
