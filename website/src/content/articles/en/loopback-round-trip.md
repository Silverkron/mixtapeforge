---
id: "loopback-round-trip"
lang: "en"
title: "Check the Interface Before Blaming the Cassette"
description: "Compare a direct interface loopback with a tape round trip and recognize what each can isolate."
primaryKeyword: "Check the Interface Before Blaming the Cassette"
secondaryKeywords: ["the basic capture workflow","multi-frequency procedure","channel-balance checks","recording profiles"]
searchIntent: "evaluation"
answer: "A loopback connects an audio interface's output straight to its input. A tape round trip inserts the deck and cassette between them. Comparing the two helps reveal a fault already present before the tape is involved."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "REW: audio interface configuration", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}, {"title": "Audacity: Tone generator", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: Plot Spectrum", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "Audacity: audio device and channel setup", "url": "https://manual.audacityteam.org/man/audio_setup_toolbar.html"}, {"title": "Audacity: recording preferences and overdub", "url": "https://manual.audacityteam.org/man/recording_preferences.html"}, {"title": "Audacity: recording and WAV export", "url": "https://manual.audacityteam.org/man/record.html"}]
related: ["without-reference-tape", "channel-balance", "recording-profile"]
guideType: "measurement"
prerequisites: ["calibration-basics"]
next: ["frequency-response"]
---

## Equipment and fixed settings

Use an interface with line inputs, compatible line cables, Audacity and a disposable cassette. Check the interface manual before connecting an output to an input: a microphone-only input may overload. Disconnect or disable monitoring that sends the input back to the same output.

This test deliberately changes cables. If you prefer to keep the deck connected, skip the loopback and label your result “complete chain”; do not describe it as interface-corrected.

## Set up simultaneous playback and capture in Audacity

In **Audio Setup**, select your interface for Playback Device, its **physical line inputs** for Recording Device, and **2 (Stereo)** recording channels. A Windows “loopback” recording device captures the computer's digital output and would bypass the cables you want to test. Set a common project/interface rate in Audio Settings.

In **Preferences > Recording**, enable **Play other tracks while recording (overdub)** and **Record on a new track**. Disable **Audible input monitoring** (Software Playthrough in older versions) and sound-activated recording. Also disable any interface mixer route from input back to these outputs.

Create **Tracks > Add New > Stereo Track**, select it and use **Generate > Tone**, Sine, 1000 Hz, amplitude 0.1, duration ten seconds. Put the cursor at the start with no time range selected. Press Record: with the preferences above, Audacity plays the source while recording the physical return onto a new stereo track. Stop after the tone, mute the source and export only the return as WAV; check the export preview/selection so the source is not mixed in. Label the two tracks clearly. On the next baseline pass, mute old return tracks so they do not play into the input again.

For the tape phase, play the original tone into the deck's REC, stop and rewind. Capture the replay in a **new empty project**: press Audacity Record before deck PLAY, then stop after the tone. This keeps original and return separate. See [the basic capture workflow](../without-reference-tape/) if this is your first stereo tape capture.

## Record both paths

1. Generate ten seconds of a 1 kHz sine in Audacity at amplitude 0.1. Select a common supported sample rate and route identical audio to both outputs.
2. Connect outputs L/R directly to line inputs L/R. Start output low, then raise it enough for a clear signal without clipping. Save a stereo capture called “interface baseline”.
3. Note output volume, input gains, sample rate and ports. Stop playback before reconnecting through the deck: output → LINE IN; LINE OUT → interface input.
4. Keep the interface controls unchanged. With NR off, record the tone on the correct tape type at a moderate deck level. Rewind and capture playback.
5. Split each capture into individual channels in Audacity. Select the middle of the tone and compare its peak in Plot Spectrum, using the same settings for every selection.
6. Repeat once. For tonal differences, use the [multi-frequency procedure](../frequency-response/), first through the direct connection and then through tape.

### Read each channel in Plot Spectrum

Open the captured track's dropdown and choose **Split Stereo Track**. Drag across the middle of the left tone, avoiding its start and end. Open **Analyze > Plot Spectrum**; choose **Spectrum**, **Hann**, and an FFT size large enough to separate the tone, such as 16384. Place the cursor by the 1 kHz peak and read the peak information shown below the graph. Repeat on the right channel and each capture using the same interval length and settings. Never select both channels together for this comparison.

## Interpret the comparison

Hypothetical example: the direct path is 1 dB quieter on the right; the tape path is also 1 dB quieter there. Correcting the cassette recording to compensate would risk baking an interface-input error into every tape. Investigate the interface routing and gains first.

Do not simply subtract distortion percentages or noise levels in dB: those contributions do not combine as ordinary signed gains. A loopback response curve is also valid only for the settings and connections used to create it.

## If something looks wrong

Silence usually means the wrong input, wrong channel mapping or an inactive line mode. A howl means an input-monitoring loop: stop playback and disable monitoring. Clipping in the baseline invalidates the comparison; lower the relevant level and repeat both paths.

Keep the raw WAVs and settings. A repeatable baseline makes [channel-balance checks](../channel-balance/) and [recording profiles](../recording-profile/) easier to trust, but does not calibrate the deck's playback head.
