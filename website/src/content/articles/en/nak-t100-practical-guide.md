---
id: "nak-t100-practical-guide"
lang: "en"
title: "NAK T-100: A Practical Guide to Measuring Your Cassette Deck"
description: "Set up NAK T-100, establish a repeatable baseline and choose the right tests for your deck, tape and reference cassettes."
primaryKeyword: "NAK T-100"
secondaryKeywords: ["reference cassette","the separate playback-level procedure","the discrete-tone response test","recording-profile workflow"]
searchIntent: "task"
answer: "NAK T-100 is a standalone audio analyzer, not a cassette player or an automatic deck-adjustment system. Use this first session to answer a limited question: does the same setup produce a stable level and tonal balance on repeated recordings?"
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100 — official overview and specifications", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "NAK T-100 — measurement checklist", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "NAK T-100 — official FAQ", "url": "https://www.anaxwaves.com/NAKT100/T100FAQ/index.html"}, {"title": "NAK T-100 — developer description and release history", "url": "https://apps.apple.com/us/app/nak-t-100-audio-analyzer/id1533153639?mt=12"}]
related: ["calibration-basics", "speed-test", "wow-flutter", "recording-profile"]
guideType: "procedure"
prerequisites: ["without-reference-tape"]
next: ["frequency-response", "wow-flutter"]
---

## Decide what you want to learn

The procedure below is an original measurement workflow informed by the developer’s documentation, not a report of hardware tested for this article. Read the help bundled with your version as well as the deck manual. The linked checklist is a reminder for experienced users, not a replacement for either manual.

## What to prepare

You need NAK T-100, an interface with stereo line inputs and outputs, compatible cables and a disposable cassette for recording tests. For independent speed or alignment checks, add the appropriate [reference cassette](../calibration-tapes/). A three-head deck can return the newly recorded signal live; a two-head deck must record, rewind and play.

A **relative baseline** is simply a reading you keep as your comparison point. It becomes useful when you can repeat it with the same controls. It is not automatically a calibrated magnetic or voltage reference.

## Install it and establish a known audio path

Follow the official store links for your operating system. The FAQ describes paid, perpetual Windows and macOS licenses purchased separately; check the relevant store for current availability. It does not offer a native Linux release.

For the recording tests, connect **interface output → deck LINE IN** and **deck LINE OUT → interface line input**. Select the intended stereo pair at both ends. If necessary, use the channel-mapping facilities in your installed version or the interface’s routing software. Do not use a microphone-only path with automatic gain.

Choose a supported common sample rate for input and output. Use 48 or 96 kHz if available when examining the top of the audio band; a higher setting cannot compensate for a poor analog path. Disable enhancements, EQ, automatic level control and unintended input-to-output monitoring. Keep test tones quiet in speakers or headphones.

## Establish levels before looking for faults

Start with noise reduction off and the correct tape-type setting. Save a photo of the controls and write down the interface gains. Use the deck’s source-monitor path if available; this lets you check the electrical path before adding the tape. It does not prove the tape path is calibrated.

In **Basic** mode, identify **Function**, **OSC** and the level display. Start with **Level** and a steady **400 Hz** reference, using a low output. Raise it gradually to a sensible reading specified for your deck, while checking that the interface input remains unclipped. Do not copy another machine’s knob positions or assume that every meter’s zero means the same thing.

In particular, NAK T-100’s calibrated voltage reference, the deck’s 0 VU mark and 0 dBFS are different references. Its voltage scale requires external voltage calibration before you treat it as an absolute voltmeter. For this first session, a documented relative baseline is enough; use [the separate playback-level procedure](../playback-level/) when you need an absolute reference.

## Check the interface separately when needed

If you can temporarily connect interface output directly to line input, measure that **loopback** first. Start with a reduced output and a line input capable of accepting it. This identifies limitations of the interface pair before the deck is included. If you keep the existing wiring, record that no independent interface baseline was measured.

The optional **Sound Card FR Compensation** procedure is documented for the display. It does not send a corrective EQ to the deck, establish absolute voltage calibration or become a cassette recording profile. Recheck it after changing the ports, sample rate or gain configuration it describes.

## A first session, in order

1. Select the physical stereo input/output pair and match its sample rate in the operating system or interface control panel. Start output low.
2. Set the deck's correct tape type and NR off. In Basic mode choose Function **Level** and OSC **400 Hz**.
3. While checking the deck's source/input meter, raise output gradually to a moderate reference. Write down that meter indication; keep capture below clipping. Do not assume the analyzer's zero equals the deck's zero.
4. Press REC on the deck after advancing beyond the leader and record about ten seconds. Keep all gain controls fixed.
5. On a two-head deck, stop, rewind, then PLAY. On a three-head deck choose Tape monitoring. Read the stable middle on L/R and note the values.
6. Repeat once without adjusting anything. If the readings drift materially, investigate the tape, connections and capture before moving on to frequency response.

Compare the stable middle of the passage, not the start or stop. Note the left and right readings, repeat once with unchanged controls and listen back. A fluctuating result needs investigation before correction. A return reading combines interface, recording and playback errors; it cannot identify which stage caused the difference by itself.

## Explore frequency response at a controlled level

Open **Scope** and identify the frequency-response controls. For an initial comparison, use **FR White** or **FR Sweep** with a deliberately reduced recording level, confirming the actual level at the deck. The label **−20 dB** is meaningful only with its reference documented. A meter-range switch does not necessarily reduce the generated signal.

Record one complete test pass, then repeat under the same conditions. **FR Sweep is documented as asynchronous**: on a two-head deck, record the test, stop, rewind and play it through the analyzer with the corresponding FR measurement selected. Follow the bundled help for acquisition details; no assumed external sweep-synchronization control is needed.

Judge stable channel differences and broad trends before small ripples. A second test at higher level can expose treble saturation, but it answers a different question. Keep its trace separate rather than merging the results into one response curve. Without a reference playback tape, the result describes the complete recording/playback chain.

For a reproducible alternative with explicit tone construction and analysis steps, follow [the discrete-tone response test](../frequency-response/). NAK's FR Sweep acquisition controls should be followed in the help for your installed version; this section describes its role, not a complete substitute for that workflow.

## Add speed and wow/flutter only with the right reference

For an independent playback-speed check, use a trustworthy **3000 Hz or 3150 Hz reference cassette**, select **Speed Wow/Flutter** and match **Speed Cal.** to that cassette. A tone recorded on the same machine cannot establish its absolute playback speed.

As a calculation example, a 3000 Hz reference read as 3015 Hz corresponds to approximately **+0.5%**: `(3015 / 3000 − 1) × 100`. These are illustrative numbers, not results from a measured deck.

Record the wow/flutter detector and weighting with every value. **Q-PK** and **WRMS** answer different measurement conventions and should not be compared as interchangeable numbers. Self-recorded tests can provide a repeatability check, but include recording and playback transport contributions. An isolated spike can also involve a dropout or computer capture problem; repeat the passage before diagnosing the mechanism.

## Keep distortion and noise readings comparable

For distortion, inspect the documented **T.H.Dist.** function with a known fundamental and fixed recording level. Label **THD+N** and **HD3** separately; they are not equivalent. If the reading rises, verify that the interface and deck input are not overloading before blaming the tape.

For noise, select **Noise-A (−40 dB)** and measure a recorded silent section with no test tone reaching the tape. Use Tape monitoring while recording on a three-head deck, or record silence and replay it on a two-head deck. Keep the same gain path. In the linked checklist’s scale convention, subtract **40 dB** from the indicated dB reading, then another **20 dB** if Meter Range is **−20 dB/0.1%**. Confirm these scale offsets against your version’s help before reporting a value. Document the reference level and weighting: the corrected noise level is not yet a positive S/N number. As a hypothetical relative example, a reference at 0 dBr and corrected noise at −55 dBr give 55 dB separation under the same conventions, not a universal deck specification.

## Save evidence you can use next time

If you record the return separately with an audio recorder, keep that unprocessed stereo file. Save screenshots, software version, tape identity and control positions together. Describe each value with its level and method; “0.08%” without a detector or “flat to 18 kHz” without a recording level is incomplete.

Do not turn head screws, bias or service trimmers merely to straighten a graph. Internal alignment follows the model’s service procedure and suitable reference equipment. NAK T-100 measures; it does not physically adjust the deck.

MixtapeForge’s [recording-profile workflow](../recording-profile/) is separate. There is no documented automatic import of NAK T-100 measurements into its profiles. Use its own guided test for a reusable app profile, and use the analyzer’s observations to understand the chain rather than promising an automatic correction for every player.

## When the first test fails

| Symptom | Check | Next action |
| --- | --- | --- |
| No input meters | Physical LINE IN selected; stereo pair matches the cable | Correct routing before raising gain |
| Clear tone but clipped waveform | Interface line mode and input range | Lower capture gain, then repeat the reference |
| Treble trace changes every pass | Tape contact, section and input dropouts | Repeat on another sound cassette before EQ |
| Speed reading outside the expected range | Reference is 3000 or 3150 Hz; Speed Cal. matches | Correct the reference selection, not the motor |
| Noise reading seems implausible | Noise-A mode, Meter Range and scale offsets | Recalculate with the documented offsets and same reference |

Checklist: physical line connections; fixed gains; Source/Tape distinction; complete replay; stated metric and reference; raw evidence retained. This article's procedures were checked against documentation, not validated on your hardware.
