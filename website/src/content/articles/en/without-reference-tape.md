---
id: "without-reference-tape"
lang: "en"
title: "Measure Your Cassette Recording Without a Reference Tape"
description: "Run a repeatable record-and-replay test and understand which conclusions need an independent reference."
primaryKeyword: "Measure Your Cassette Recording Without a Reference Tape"
secondaryKeywords: ["frequency-response testing","Independent reference tapes","recording profile","Check the Interface Before Blaming the Cassette"]
searchIntent: "task"
answer: "You can compare tapes, spot unequal channels and investigate a dull recording without buying a calibration cassette. What you measure is the whole round trip: recording electronics, tape, playback electronics and audio interface together."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: Tone generator", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: Plot Spectrum", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "NAK T-100: measurement checklist", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "Audacity: audio device and channel setup", "url": "https://manual.audacityteam.org/man/audio_setup_toolbar.html"}, {"title": "Audacity: recording preferences and overdub", "url": "https://manual.audacityteam.org/man/recording_preferences.html"}, {"title": "Audacity: recording and WAV export", "url": "https://manual.audacityteam.org/man/record.html"}]
related: ["loopback-round-trip", "calibration-tapes", "eq-limits"]
guideType: "procedure"
prerequisites: ["calibration-basics"]
next: ["recording-profile", "frequency-response"]
---

## What you need

Use a disposable blank, stereo line connections and Audacity for a simple first test. In Audacity, **Generate > Tone** creates a sine wave; a sine contains one frequency, making changes easier to identify than music. A notebook or spreadsheet is enough to keep results.

## Set up Audacity once

Open **Audio Setup**. Choose the interface under **Playback Device** and its physical line input under **Recording Device**, then **Recording Channels > 2 (Stereo)**. Do not select a “loopback” device that captures computer playback. Under **Audio Settings**, choose the project sample rate supported by the interface.

In **Preferences > Recording** (under the Audacity menu on macOS), turn **Audible input monitoring** off; older versions call it Software Playthrough. Turn sound-activated recording off too, so silence and markers are not omitted. Disable any direct input-to-output loop in the interface mixer.

For identical channels, choose **Tracks > Add New > Stereo Track**, select it and use Generate > Tone. If working from an existing mono file instead, duplicate it, set both track gains to 0 dB and use **Make Stereo Track** from the upper track's dropdown. The upper track becomes left, the lower right. Keep pan and processing neutral.

To put the test on tape, press REC on the deck, wait until the writable tape is moving and press Play in Audacity. Stop both after the tone. To capture playback, create a **new empty Audacity project**, retain the input settings, press Record there first and then PLAY on the deck. Stop Audacity after the tone. Export through **File > Export Audio** as a stereo WAV, without normalization. Separate playback and capture projects prevent accidental mixing of the original into the captured return.

## Make a repeatable test

1. Connect interface output to deck LINE IN and deck LINE OUT to interface line input. Select those ports, stereo capture and the same supported sample rate throughout. Disable input monitoring, EQ, compression, automatic gain and NR.
2. Generate ten seconds of **1 kHz, Sine, amplitude 0.1**. This is −20 dBFS peak in the file; it is not automatically −20 on the deck's meter. Route identical audio to L/R.
3. With output initially low, set a modest recording level and note the deck reading. Leave headroom at the interface input. Mark the positions; keep them unchanged.
4. Record beyond the cassette's clear leader. Stop, rewind and capture playback as an unprocessed stereo WAV. On a two-head deck this separate replay is essential.
5. Repeat in another section. In Audacity split the stereo track into L/R, select the stable middle of one channel and open **Analyze > Plot Spectrum**. Use Spectrum, Hann and the same FFT size for both captures. Compare the 1 kHz peak, channel by channel.
6. Keep the original file, both captures and your settings together. Continue with [frequency-response testing](../frequency-response/) only when these levels repeat reliably.

## What the numbers mean

Hypothetical result: the left channel reads −18 dBFS and the right −19 dBFS on both captures. That suggests a repeatable 1 dB difference somewhere in the loop. It does not prove the recording channel needs a 1 dB boost: the capture input could be responsible.

A zero speed error on a self-recorded tone is also inconclusive: the same wrong recording and playback speed can cancel. [Independent reference tapes](../calibration-tapes/) address that limitation.

## When the result does not settle

If the peak jumps, try another tape section and inspect the raw capture for dropouts. If both channels clip, lower capture gain and repeat both runs. If you see no return, confirm that the selected input is physical LINE IN rather than a software loopback.

Checklist: same controls, complete playback, no clipping, separate channel measurements, repeated result. MixtapeForge's [recording profile](../recording-profile/) automates a broader test sequence but retains the same round-trip limitation.
