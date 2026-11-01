---
id: "dolby-b"
lang: "en"
title: "Dolby B Explained: How It Reduces Tape Hiss"
description: "Understand Dolby B, choose the right recording path and avoid encoding the same signal twice."
primaryKeyword: "Dolby B Explained"
secondaryKeywords: ["the recording-level guide","the dull-Dolby checks","software NR options","Software Dolby and dbx"]
searchIntent: "informational"
answer: "Dolby B reduces the steady “shhh” heard behind quiet cassette music. It is a two-part process: encoding changes the signal before recording; decoding reverses that change during playback and reduces the hiss added by the tape. It cannot remove noise already present in the source."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Dolby Laboratories · CP45 · Appendix D", "url": "https://www.film-tech.com/warehouse/manuals/DOLBYCP45USERS.pdf"}, {"title": "IASA · TC-04 · 5.4.11", "url": "https://www.iasa-web.org/book/export/html/435"}, {"title": "libdolbyb", "url": "https://codeberg.org/martinwguy/libdolbyb"}]





guideType: "explainer"
prerequisites: []
next: ["dolby-b-c-s-playback", "dull-dolby"]
related: ["software-noise-reduction", "bias-eq-nr", "recording-levels"]
---

## What happens to the music?

A quiet cymbal decay receives more high-frequency emphasis during encoding than a loud cymbal strike. The decoder applies the corresponding reduction. This action changes with the music: a fixed treble control cannot reproduce it. An encoded tape played with NR off often sounds brighter and noisier; switching B on should restore a natural balance, not simply make everything dull.

## Make a first recording with the deck

You need a deck with Dolby B recording and playback, a suitable blank cassette, headphones and a familiar passage containing voice, percussion and a quiet ending. No measurement software is required for this listening check.

1. Connect the computer/interface's stereo line output to the deck's LINE IN L/R. Start with a low output level; use [the recording-level guide](../recording-levels/) to set the loudest passage.
2. Choose the correct tape type, leave software NR off, and select Dolby B on the deck. The deck is your only encoder.
3. Record about a minute, including the quiet ending. Stop, rewind and play with Dolby B selected.
4. Compare with the original at a similar listening volume. Change the headphone/amplifier volume for this comparison, not REC LEVEL.
5. Briefly switch playback NR off, then restore B. Listen to the hiss in the pause and to how the cymbal fades.

A successful comparison preserves the voice and musical decay while reducing background hiss. If B makes the voice or cymbals unnaturally closed, follow [the dull-Dolby checks](../dull-dolby/) before adding EQ.

## If the encoder is software

MixtapeForge 0.1 offers optional **Type B · libdolbyb** in its audio settings. In this path, record with the deck's NR **OFF**, then play the cassette with hardware B **ON**. The app's encoded preview is not the final decoded sound. Compatibility with your deck needs a short recorded test and reference-level alignment; setting the codec reference to 0 does not bypass encoding or mean “record at 0 dB on the deck”.

See [software NR options](../software-noise-reduction/) for the different tools and calibration requirements. Before recording a whole side, confirm one encoder, one matching decoder, stable levels and an intelligible quiet passage.
