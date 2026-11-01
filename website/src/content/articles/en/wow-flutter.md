---
id: "wow-flutter"
lang: "en"
title: "How to Measure Wow and Flutter on a Cassette Deck"
description: "Capture a reference tone, select the correct detector and report tape-speed instability in a comparable way."
primaryKeyword: "How to Measure Wow and Flutter on a Cassette Deck"
secondaryKeywords: ["average speed first","playback-speed problems","Choose a Calibration Cassette for the Test You Need","NAK T-100"]
searchIntent: "evaluation"
answer: "Wow is slow pitch wandering; flutter is faster pitch variation that can make sustained notes sound rough. Both come from changes in playback speed. A constant speed offset can make music sharp while producing little wow/flutter, so measure the two separately."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100: official specifications", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "NAK T-100: measurement checklist", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["calibration-tapes", "nak-t100-practical-guide", "different-decks"]
guideType: "measurement"
prerequisites: ["speed-test"]
next: ["playback-speed-problems"]
---

## Equipment and preparation

Use NAK T-100, a line-input interface and a documented **3000 or 3150 Hz speed/wow/flutter cassette**. Its own residual instability must be sufficiently low for the deck you want to assess. Connect deck LINE OUT L/R to interface LINE IN L/R, select the physical inputs and disable processing and automatic gain.

Check [average speed first](../speed-test/). Keep the monitoring volume low: this is a continuous high-pitched test tone.

## Follow one measurement convention

1. In NAK T-100 choose **Speed Wow/Flutter**, then match **Speed Cal.** to the reference cassette.
2. Play a stable section and adjust capture gain so the signal is clear and unclipped. On a deck with monitor selection, choose Tape.
3. Choose the detector that matches the specification you are comparing. The developer lists **Q-PK** with DIN 45507, **WRMS** with JIS, and unweighted peak/RMS modes. A weighted measurement emphasizes selected rates of fluctuation; a detector determines how fluctuating values are summarized.
4. Observe approximately thirty seconds after startup. Write down the detector, weighting, displayed range and observation time along with the percentage. If the display reaches its limit, change Meter Range before reporting the reading.
5. Repeat the same passage and another suitable section. Keep an isolated spike separate from the usual reading rather than concealing it in a single “best” number.
6. Save the raw tone capture if your recorder supports it. For a service comparison, supply the graph or repeated observations as well as the scalar value.

## Read the result fairly

Hypothetical example: **0.08% WRMS** and **0.15% Q-PK** may both describe one transport under different methods. The larger number is not evidence that the second measurement found a worse deck. Compare like detector, weighting, test tape and duration.

A self-recorded tone can reveal repeatability problems, but includes both recording and replay instability. It cannot isolate playback performance as a reference tape can.

## If the graph jumps

A spike may come from a damaged section, poor tape contact, a transport disturbance or a capture dropout. Replay the same section: a repeat at the same tape location suggests a tape-related lead; random digital gaps suggest checking capture buffers and workload. Neither observation alone identifies a component.

Checklist: known tone, no clipping, matched method, repeated sections, reference identity saved. EQ and noise reduction cannot repair speed instability; investigate [playback-speed problems](../playback-speed-problems/) before building a recording profile.
