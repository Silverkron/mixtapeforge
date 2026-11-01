---
id: "hum-buzz"
lang: "en"
title: "Hum and Buzz When Recording Cassettes: Trace the Signal Path"
description: "Find whether unwanted noise enters through the source, cables, interface or deck before filtering it."
primaryKeyword: "Hum and Buzz When Recording Cassettes"
secondaryKeywords: ["tape hiss","loopback check","Measure Tape Hiss Relative to a Recorded Signal","How to Record a Cassette Tape from a Computer"]
searchIntent: "diagnosis"
answer: "Hum is a low, steady tone; buzz often adds a sharper edge. Unlike the broad “shhh” of tape hiss, it can come from electrical interference or the connections between devices. Removing it before recording is better than trying to filter it out of the finished cassette."
category: "troubleshooting"
image: "portable"
updated: "2026-11-01"
sources: [{"title": "Focusrite · Ground hum", "url": "https://support.focusrite.com/hc/en-gb/articles/211615185-Why-is-there-unwanted-hum-noise-in-my-monitors"}, {"title": "Sony · ICD-PX470", "url": "https://helpguide.sony.net/icd/p47/v1/en2/contents/TP0001155787.html"}]

guideType: "troubleshooting"
prerequisites: []
next: ["loopback-round-trip"]
related: ["tape-hiss-snr", "recording-computer", "quiet-channel"]
---

Hum is a low, steady tone; buzz often adds a sharper edge. Unlike the broad “shhh” of [tape hiss](../tape-hiss-snr/), it can come from electrical interference or the connections between devices. Removing it before recording is better than trying to filter it out of the finished cassette.

## Find where it enters

You need headphones and a known-good short audio cable. Lower monitoring volume and stop transport before changing connections. Never remove protective mains earth or modify power plugs.

1. Listen to the source through the interface with the deck disconnected from its audio cables. If noise remains, investigate the computer/interface path first.
2. Reconnect only the output needed for recording: interface line outputs to deck LINE IN. Leave the return from deck LINE OUT disconnected for this test.
3. If hum appears, move audio cables away from power adapters and replace the cable with the known-good one. Listen again without changing gain.
4. If using a laptop, briefly run it from its battery with the charger disconnected normally. A reduction suggests a supply/connection contribution; it does not prove a particular component is defective.
5. Reconnect the playback return only if needed. If adding it creates hum, the extra connection may form a **ground loop**, an unwanted electrical path between connected devices. Check routing and seek an appropriate line-level isolation solution if necessary.

## Read the result carefully

A balanced interface output connected to an unbalanced RCA input does not become an end-to-end balanced connection merely by changing the cable. Use the wiring recommended by the equipment makers. [Focusrite's grounding guide](https://support.focusrite.com/hc/en-gb/articles/211615185-Why-is-there-unwanted-hum-noise-in-my-monitors) explains these connection effects.

If the deck hums in its own headphones with external audio disconnected, or hum is already printed on the cassette, treat those separately. Do not replace electrical diagnosis with a Dolby setting. After a change, repeat the same short recording and compare the pauses at equal gain; a [loopback check](../loopback-round-trip/) helps establish the interface's baseline.
