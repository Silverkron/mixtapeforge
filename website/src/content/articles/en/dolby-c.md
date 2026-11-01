---
id: "dolby-c"
lang: "en"
title: "Dolby C Explained: How It Differs from Dolby B"
description: "Why Dolby C needs matching playback and what to check before trying a software decoder."
primaryKeyword: "Dolby C Explained"
secondaryKeywords: ["Dolby B","these level checks","Dolby tracking and playback","Dolby S"]
searchIntent: "informational"
answer: "Dolby C is a recording/playback noise-reduction system that acts more strongly than Dolby B. It brings quiet detail above tape hiss during recording, then reverses that processing during playback. A cassette recorded with C therefore needs C decoding; B is not a gentler substitute."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Dolby Laboratories · CP45 · Appendix D", "url": "https://www.film-tech.com/warehouse/manuals/DOLBYCP45USERS.pdf"}, {"title": "Anaxwaves · DDi Codec", "url": "https://www.anaxwaves.com/DDiCodec/"}]





guideType: "explainer"
prerequisites: ["dolby-b"]
next: ["dolby-b-c-s-playback", "software-noise-reduction"]
related: ["dull-dolby", "playback-compatibility", "recording-levels"]
---

Dolby C is a recording/playback noise-reduction system that acts more strongly than [Dolby B](../dolby-b/). It brings quiet detail above tape hiss during recording, then reverses that processing during playback. A cassette recorded with C therefore needs C decoding; B is not a gentler substitute.

## Why matching matters

Listen to a singer's quiet breath followed by a strong drum hit. Correct decoding should preserve their relationship. With the wrong mode, the breath may become exaggerated or disappear, and the background may seem to swell with the music. This changing background is often called **breathing**. It is different from a constant tonal imbalance that an EQ can simply adjust.

## Record a useful comparison

You need a C-capable deck, a blank of the supported type, the source recording and headphones. Connect the source's stereo line output to LINE IN L/R; listen from the deck or its amplifier.

1. Disable software NR and select C on the recording deck. Set the tape selector correctly.
2. Play the loudest part and set REC LEVEL using the deck manual. Use [these level checks](../recording-levels/) if the meters are unfamiliar.
3. Record a minute containing both quiet and loud music. Stop and rewind.
4. Replay with C on. Compare against the source at matched listening volume, including the quiet ending.
5. If another deck will play the tape, repeat the listening test there before recording a full side.

If the second deck lacks C, choose a different recording format for that listener. If both have C but only one sounds closed, investigate [Dolby tracking and playback](../dull-dolby/) rather than permanently brightening the master.

## Software availability

[DDi Codec](https://www.anaxwaves.com/DDiCodec/) provides B/C encoding and decoding as a separate commercial application. Its calibration controls still need a trustworthy reference or an explicitly subjective adjustment. MixtapeForge 0.1 has no built-in C encoder. Its Type B option must not be used to prepare a C cassette.

Before keeping the recording, confirm C at both ends, a clean loud passage and a natural quiet decay.

For another approach to quiet-music recording, compare [Dolby S](../dolby-s/) before choosing a format.
