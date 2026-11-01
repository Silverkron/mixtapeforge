---
id: "normalization-compression-eq"
lang: "en"
title: "Normalization, Compression and EQ for Cassette: Three Different Jobs"
description: "Use normalization for differences between songs, compression for excessive changes within a song, and EQ for tonal balance."
primaryKeyword: "Normalization, Compression and EQ for Cassette"
secondaryKeywords: ["record a short tape test","the causes before boosting treble","a recording profile","Cassette Recording Levels"]
searchIntent: "task"
answer: "Use normalization for differences between songs, compression for excessive changes within a song, and EQ for tonal balance. Start with everything off: processing should solve an audible problem you can name."
category: "recording"
image: "recording"
updated: "2026-11-01"
sources: [{"title": "Audacity — loudness normalization", "url": "https://manual.audacityteam.org/man/loudness_normalization.html"}, {"title": "Audacity — compressor controls", "url": "https://manual.audacityteam.org/man/compressor.html"}, {"title": "Audacity — digital audio glossary", "url": "https://manual.audacityteam.org/man/glossary.html"}]
guideType: "procedure"
related: ["recording-levels", "recording-profile", "muffled-cassettes"]
prerequisites: []
next: ["recording-levels"]
---

## Understand the three controls

Normalization applies gain. Peak matches maximum peaks, not perceived loudness. LUFS estimates perceived loudness; Album applies a common gain to preserve relationships. Compression reduces dynamic range: its threshold selects when reduction begins, ratio controls its strength, attack/release set how quickly it responds. EQ raises or lowers frequency bands, such as bass or treble.

## Try one change at a time in MixtapeForge

1. Open **EQ / Audio** and choose a familiar passage. Listen to the original before changing anything.
2. For a compilation with uneven volume, try LUFS under Normalization. For a continuous album, try Album. Keep the true-peak ceiling below 0 dBTP; a starting example is −1 dBTP, not a tape calibration target. The ceiling takes priority over the loudness target.
3. Leave compression off unless loud peaks are a specific problem. The Light preset is a starting point: ratio 1.5:1, threshold −18 dB, attack 30 ms, release 250 ms. Its effect depends on the source level. Compare the same phrase; if drums lose their attack or the level pumps, reduce the effect or turn it off.
4. Start EQ flat. Move one band slightly and listen again, or select a preset and inspect its band changes. A genre preset is a taste choice, not a correction for your tape type.
5. Compare original/master at similar listening volume, then [record a short tape test](../recording-levels/). Save the version that improves that tape, not just its on-screen curve.

For persistent dullness, check [the causes before boosting treble](../muffled-cassettes/). Software cannot restore a worn tape path. If using NR encoding, do these musical adjustments before encoding; avoid further EQ or normalization afterwards.

**Done:** a specific problem improved, peaks controlled, transients intact, result checked on tape. For measured deck compensation use [a recording profile](../recording-profile/), which is separate from musical EQ.
