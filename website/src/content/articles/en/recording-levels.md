---
id: "recording-levels"
lang: "en"
title: "Cassette Recording Levels: Avoid Distortion Without Recording Too Quietly"
description: "Set recording level by making a short tape that stays clear during its loudest moments."
primaryKeyword: "Cassette Recording Levels"
secondaryKeywords: ["recording from a computer","track normalization and compression","the diagnostic checks","How to Record a Cassette Tape from a Computer"]
searchIntent: "task"
answer: "Set recording level by making a short tape that stays clear during its loudest moments. A louder meter reading is not automatically a better recording: excessive level can make vocals rough and cymbals dull or splashy."
category: "recording"
image: "recording"
updated: "2026-11-01"
sources: [{"title": "TEAC W-1200 — recording, tape types and connections", "url": "https://teac.jp/jp/support/news/5488"}, {"title": "Audacity — digital audio glossary", "url": "https://manual.audacityteam.org/man/glossary.html"}]
guideType: "procedure"
related: ["recording-computer", "normalization-compression-eq", "distorted-recordings"]
prerequisites: ["recording-computer"]
next: ["recording-computer"]
---

## Keep the two scales separate

The app’s digital peak meter uses dBFS: 0 is the digital ceiling. The deck uses its own recording scale, often marked around 0 dB; that is not 0 dBFS. A computer setting cannot predict the deck reading without the actual output level and REC LEVEL position.

## Set the level on a real recording

Use the connected setup from [recording from a computer](../recording-computer/), the intended tape and two passages: one loud, one quiet. Set tape type and NR first. Keep the computer/interface volume fixed during the test.

1. Put the deck in record-pause. Play the loud passage and set REC LEVEL to the starting range recommended in its manual. Do not assume a universal +3 dB rule.
2. Record roughly 30 seconds, then stop, rewind and listen from the tape. Check both channels, vocal consonants, bass attacks and cymbals.
3. If the tape sounds rougher than the source, reduce REC LEVEL and repeat the same passage. Change one control at a time. If even a low take distorts, check whether the source/interface was already overloaded.
4. Play the quiet passage. If hiss overwhelms it, compare a slightly higher take only while the loud passage remains clean. Choose the clearest compromise, not the loudest result.
5. Write down output device/volume, REC LEVEL, tape and NR. Use the same settings for the side.

MixtapeForge’s **EQ / Audio** controls [track normalization and compression](../normalization-compression-eq/); these do not calibrate the physical meter. If software Type B is used, follow its level-alignment procedure and do not casually change gain after encoding.

**Final check:** no digital clipping; loud tape passage clean; quiet passage usable; settings recorded. For persistent distortion follow [the diagnostic checks](../distorted-recordings/).
