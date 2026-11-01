---
id: "dnl-dnr"
lang: "en"
title: "DNL and DNR: Noise Reduction Without a Recording Encoder"
description: "Understand playback-only noise reduction and the difference between quieter sound and faithful decoding."
primaryKeyword: "DNL and DNR"
secondaryKeywords: ["Dolby decoder","NR software and decoding","hum or buzz","Dolby B Explained"]
searchIntent: "informational"
answer: "DNL and DNR are playback noise-reduction approaches that do not require the cassette to have been specially encoded. They reduce audible high-frequency noise by changing the playback response according to the signal. They must not be confused with a matching Dolby decoder."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Philips · N2510 · 1973", "url": "https://www.worldradiohistory.com/Archive-All-BC/Archive-All-Audio/Archive-Studio-Sound/70s/Studio-Sound-1973-12.pdf"}, {"title": "Texas Instruments · LM1894", "url": "https://www.ti.com/product/LM1894"}]



guideType: "explainer"
prerequisites: []
next: ["dolby-b-c-s-playback"]
related: ["dolby-b", "software-noise-reduction", "tape-hiss-snr"]
---

DNL and DNR are playback noise-reduction approaches that do not require the cassette to have been specially encoded. They reduce audible high-frequency noise by changing the playback response according to the signal. They must not be confused with a matching [Dolby decoder](../dolby-b/).

## Hear the trade-off

Imagine a quiet cymbal fading into hiss. Restricting the high-frequency range can make the hiss less noticeable, but it may also shorten the apparent cymbal decay. The aim is a useful listening compromise, not recovery of information already lost.

Texas Instruments documents DNR in the [LM1894 data sheet](https://www.ti.com/product/LM1894) as a non-complementary system: no preceding encoder is needed. DNL is a separate implementation; do not assume identical controls or performance from the similar names.

## Try it without losing the original

You need a player with the documented DNL/DNR function and a familiar cassette. For software restoration, keep an untouched capture and work on a copy.

1. Select the cassette's correct playback EQ and, if applicable, its proper Dolby decoder first.
2. Play a quiet voice or acoustic passage with DNL/DNR off. Notice the consonants and reverberation tails, not just pauses.
3. Enable the documented noise-limiting function and repeat the same passage at similar volume.
4. If adjustable, choose the least processing that helps. If only an on/off switch exists, keep it off when detail loss outweighs the benefit.

A quieter pause accompanied by missing musical detail is a trade-off, not better fidelity. If noise rises and falls distractingly, reduce processing or bypass it.

MixtapeForge has no DNL/DNR mode. Modern denoisers can serve a related listening purpose but are not automatically emulations of these circuits; [NR software and decoding](../software-noise-reduction/) explains the difference. Keep decoder mode, optional denoising and listening preference in separate notes.

A low electrical [hum or buzz](../hum-buzz/) needs a connection check rather than a treble-limiting experiment.
