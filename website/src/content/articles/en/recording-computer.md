---
id: "recording-computer"
lang: "en"
title: "How to Record a Cassette Tape from a Computer"
description: "This guide takes you from a computer playlist to a cassette you can rewind and play."
primaryKeyword: "How to Record a Cassette Tape from a Computer"
secondaryKeywords: ["the recording and playback combinations","set recording level by testing the tape","check both ends before giving the tape away","two-head and three-head monitoring"]
searchIntent: "task"
answer: "This guide takes you from a computer playlist to a cassette you can rewind and play. The deck records an analogue signal; MixtapeForge supplies that signal and does not operate the deck’s transport."
category: "recording"
image: "recording"
updated: "2026-11-01"
sources: [{"title": "TEAC W-1200 — recording, tape types and connections", "url": "https://teac.jp/jp/support/news/5488"}, {"title": "Audacity — digital audio glossary", "url": "https://manual.audacityteam.org/man/glossary.html"}]
guideType: "procedure"
related: ["recording-levels", "two-head-three-head", "dolby-b-c-s-playback", "before-sending-mixtape"]
prerequisites: []
next: ["recording-levels"]
---

## What you need and where the cables go

Use a recording deck, a compatible blank cassette, headphones or an amplifier, and a computer with a stereo line output. An audio interface is useful when the computer lacks one. Connect its left/right outputs to the deck’s **LINE IN / REC IN**, using cables that match both devices. A 3.5 mm stereo headphone output needs a stereo-to-two-RCA cable; its volume affects recording level. Never use speaker outputs. For checking the result, listen to the deck’s headphone output or connect its LINE OUT to an amplifier.

## Make a short test first

1. Import one familiar song in MixtapeForge’s Mixtape screen. In Settings, choose the device under the output-to-deck selector. Select a sample rate supported by that device.
2. Insert the tape and select its type if the deck does not detect it. Choose the noise-reduction method before setting levels. For the simplest first test, leave software NR off; use hardware Dolby B only if the intended player can decode it. See [the recording and playback combinations](../dolby-b-c-s-playback/).
3. Put the deck into record-pause using its manual. Play a loud passage in the app, confirm that both deck meters move, and adjust REC LEVEL following the deck’s markings. The app’s meter and the deck’s meter have different references: [set recording level by testing the tape](../recording-levels/).
4. Start recording on the deck, then press **REC** in MixtapeForge. Audio starts after a three-second countdown. Transparent leader cannot record; if it lasts longer, let it pass before starting the app. Record a short loud passage and a quiet passage.
5. Stop both devices, rewind and play the tape with the matching NR setting. Check both channels, the first note and the loudest vocal or cymbal hit.

## Then record the full side

Keep output volume, cables and REC LEVEL fixed. Select side A, confirm it fits, and repeat the start sequence. Stop the deck when the side finishes; software Stop only stops the computer audio. Repeat for B and [check both ends before giving the tape away](../before-sending-mixtape/).

No deck-meter movement means the signal has not reached its input: check the selected output and cables. Meters moving but silent playback suggests a recording/transport/tape problem; a software meter alone cannot prove recording succeeded.

**Before the full take:** both channels heard from tape; leader passed; levels unchanged; correct side and NR selected.

If you are unsure whether your headphones carry the source or the recording, check [two-head and three-head monitoring](../two-head-three-head/).
