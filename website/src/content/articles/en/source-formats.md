---
id: "source-formats"
lang: "en"
title: "WAV, FLAC or MP3 for Cassette Recording: Does the Source Matter?"
description: "Use the cleanest genuine recording you already have."
primaryKeyword: "WAV, FLAC or MP3 for Cassette Recording"
secondaryKeywords: ["normalization choices","the computer-to-deck recording test","How to Record a Cassette Tape from a Computer","Normalization, Compression and EQ for Cassette"]
searchIntent: "informational"
answer: "Use the cleanest genuine recording you already have. WAV and FLAC can preserve audio without lossy encoding; turning an MP3 into WAV does not restore the information removed when that MP3 was made."
category: "recording"
image: "recording"
updated: "2026-11-01"
sources: [{"title": "Audacity — digital audio glossary", "url": "https://manual.audacityteam.org/man/glossary.html"}, {"title": "Symphonia — decoder and container support", "url": "https://github.com/pdeljanov/Symphonia"}]
guideType: "explainer"
related: ["recording-computer", "normalization-compression-eq", "cassette-mixtape"]
prerequisites: []
next: ["recording-computer"]
---

## What MixtapeForge accepts

The current desktop import selector lists **WAV, FLAC, MP3, M4A, AAC, AIFF/AIF, OGG and CAF**. A container such as M4A can hold different codecs, so an accepted extension does not guarantee that every file will decode. The implementation uses Symphonia; protected streaming downloads are not ordinary importable music files.

1. Keep the original files in a stable folder. Import one example of each format you plan to use.
2. Check the displayed title and duration, then listen to its beginning, middle and ending. An incorrect duration or sudden silence needs investigation before arranging a full side.
3. If import fails, open a copy in a compatible audio editor and export stereo PCM WAV. Keep the original; renaming the extension is not conversion.
4. Under **EQ / Audio**, open the master-format controls and select a supported device rate. The app offers 44.1, 48, 88.2 and 96 kHz. A larger number is not proof of better cassette sound.

## Compare sound, not file size

For example, a clean purchased MP3 may sound better than a damaged recording in WAV. Match listening volume and compare vocals, cymbals and quiet endings. Check [normalization choices](../normalization-compression-eq/) before treating louder as better.

A lossless working file avoids another lossy export, but does not repair existing distortion. When your files sound right, continue with [the computer-to-deck recording test](../recording-computer/).

**Ready:** files decode fully, metadata checked, originals retained, output rate supported.
