---
id: "dbx-noise-reduction"
lang: "en"
title: "dbx Noise Reduction: Type I, Type II and Matching Playback"
description: "Understand why dbx tapes need the right decoder and why ordinary compression cannot replace it."
primaryKeyword: "dbx Noise Reduction"
secondaryKeywords: ["recording levels","tape dropouts","software NR workflows","Dolby B Explained"]
searchIntent: "informational"
answer: "Cassette dbx noise reduction compresses the range between quiet and loud sounds before recording, then expands it during playback. Compander combines those two words. With ideal 2:1 compression, a 20 dB change becomes 10 dB on tape; the decoder restores the larger change. This is a principle example, not a measured result from a deck."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Anaxwaves · DxI Codec", "url": "https://anaxwaves.com/DxICodec/"}, {"title": "Anaxwaves · DxII Codec", "url": "https://www.anaxwaves.com/DxIICodec/"}, {"title": "u-he · Satin 1.3.3", "url": "https://u-he.com/downloads/manuals/plugins/satin/Satin-user-guide.pdf"}]





guideType: "explainer"
prerequisites: []
next: ["software-noise-reduction", "playback-compatibility"]
related: ["dolby-b", "recording-levels", "tape-dropouts"]
---

## Identify the format first

Type I and Type II are different dbx formats; the Roman numeral is not the cassette's magnetic tape type. A Type II cassette can contain no NR, Dolby or dbx. Check the recorder's manual. The decoder must match the encoded format. Playback without decoding can sound compressed and tonally wrong.

## A short hardware test

Use a working deck with the appropriate dbx mode, a supported blank and headphones. Connect your source's stereo line output to LINE IN L/R.

1. Disable software NR and select the deck's documented dbx recording mode.
2. Set [recording levels](../recording-levels/) with the loudest passage. Avoid overload; companding cannot restore a clipped signal.
3. Record voice, sustained bass and quiet cymbal tails. Stop, rewind and replay with the matching dbx mode.
4. Compare to the source at similar volume. Listen for natural dynamics and a background that does not audibly swell after bass notes.

If short losses become conspicuous, investigate [tape dropouts](../tape-dropouts/). Expansion can make signal errors more noticeable; it does not identify their cause. Try another clean blank before changing processing.

## Software you can investigate

Anaxwaves offers [DxII Codec](https://www.anaxwaves.com/DxIICodec/) for Type II/Disc and [DxI Codec](https://anaxwaves.com/DxICodec/) for Type I/Disc. [Satin](https://u-he.com/products/satin/) includes uhx I/II models. These are separate tools, not built-in MixtapeForge dbx stages. Check their manuals and test the exact mode with your hardware; avoid unrelated tape-emulation effects when evaluating decoding. See [software NR workflows](../software-noise-reduction/) before capturing a whole tape.
