---
id: "software-noise-reduction"
lang: "en"
title: "Software Dolby and dbx: Tools, Formats and Limitations"
description: "Choose software by its documented encoder and decoder rather than by a generic noise-reduction label."
primaryKeyword: "Software Dolby and dbx"
secondaryKeywords: ["playback-level guide","tracking checks","DNL and DNR","dbx Noise Reduction"]
searchIntent: "task"
answer: "A software codec encodes or decodes a particular noise-reduction format. A denoiser estimates unwanted noise and removes some of it. They are different jobs: a generic “tape hiss” filter does not decode Dolby or dbx."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Anaxwaves · DDi Codec", "url": "https://www.anaxwaves.com/DDiCodec/"}, {"title": "Anaxwaves · DxI Codec", "url": "https://anaxwaves.com/DxICodec/"}, {"title": "Anaxwaves · DxII Codec", "url": "https://www.anaxwaves.com/DxIICodec/"}, {"title": "u-he · Satin 1.3.3", "url": "https://u-he.com/downloads/manuals/plugins/satin/Satin-user-guide.pdf"}, {"title": "libdolbyb", "url": "https://codeberg.org/martinwguy/libdolbyb"}]



guideType: "procedure"
prerequisites: ["dolby-b-c-s-playback"]
next: ["dull-dolby", "recording-computer"]
related: ["dbx-noise-reduction", "playback-level", "dolby-c"]
---

## Choose a tool for the actual format

| Tool | Documented task | What to check |
| --- | --- | --- |
| [DDi Codec](https://www.anaxwaves.com/DDiCodec/) | B/C encode and decode; standalone application | Mode, reference alignment, current OS support |
| [DxII Codec](https://www.anaxwaves.com/DxIICodec/) / [DxI Codec](https://anaxwaves.com/DxICodec/) | Respective dbx II / I processing, plus Disc modes | I and II are not interchangeable |
| [Satin](https://u-he.com/downloads/manuals/plugins/satin/Satin-user-guide.pdf) | B-Type and uhx I/II compander models among its effects | Avoid additional tape coloration when testing a decoder |
| [libdolbyb](https://codeberg.org/martinwguy/libdolbyb) | Type B library used by MixtapeForge's optional encoder | Library/build availability and hardware comparison |

These are not all included in MixtapeForge. Version 0.1 exposes optional **Type B · libdolbyb**, not C, S or dbx. Its external stereo VST3 slot is not a promise that every NR plugin or format will work correctly.

## Decode an existing tape without double processing

You need the matching decoder, an audio interface with stereo line inputs, capture software and headphones.

1. Connect deck LINE OUT L/R to interface LINE IN 1/2. Select line sensitivity, disable automatic gain and avoid input clipping. The [playback-level guide](../playback-level/) explains why a digital peak reading is not the Dolby reference.
2. For software decoding, turn the deck's NR off and select its correct playback EQ. Record an untouched stereo capture at a supported sample rate and 24-bit depth where available. Keep it.
3. Open a copy in the decoder, choose the actual format and **decode** direction. Use a documented reference tone if present. Without one, reference adjustment by ear remains an estimate.
4. Compare quiet and loud passages. Adjust monitoring volume after decoding; do not normalize or EQ the encoded file casually before the decoder.
5. Save a separate decoded file with mode and reference settings in its notes. Never decode a capture already decoded by the deck again.

For software encoding, the direction reverses: ordinary source → encoder → deck with recording NR off → matching playback decoder. Test a minute before committing a side. If quiet music loses treble, follow [tracking checks](../dull-dolby/); increasing final volume does not correct a decoder-reference error.

For hiss reduction without an encoded tape, read about [DNL and DNR](../dnl-dnr/): these playback filters do a different job from a Dolby decoder.
