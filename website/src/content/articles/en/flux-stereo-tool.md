---
id: "flux-stereo-tool"
lang: "en"
title: "FLUX:: Stereo Tool: A Practical Stereo Check Before Recording a Cassette"
description: "Use a mono reference, a short music passage and a captured tape playback to check stereo problems without processing blindly."
primaryKeyword: "FLUX:: Stereo Tool"
secondaryKeywords: ["phase versus polarity","the channel-balance measurement","the quiet-channel checks","Check Stereo Polarity and Timing with a Known Mono Signal"]
searchIntent: "task"
answer: "This guide concerns FLUX:: Stereo Tool, rather than similarly named broadcast processors. It provides channel adjustments and stereo metering. Download it through the official FLUX:: pages; freeware describes its price, not permission to bundle it into another application."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "FLUX:: Stereo Tool — official freeware page", "url": "https://www.flux.audio/project/stereo-tool-freeware/"}, {"title": "Stereo Tool — official manual", "url": "https://doc.flux.audio/stereotool/"}, {"title": "FLUX:: Center — official downloads", "url": "https://www.flux.audio/download/"}, {"title": "FLUX:: plugin system requirements", "url": "https://www.flux.audio/plugin-specifications/"}, {"title": "REAPER 7 User Guide: device setup, tracks, FX, master mono and rendering", "url": "https://dlx.reaper.fm/userguide/html/"}]
related: ["phase-polarity", "channel-balance", "quiet-channel"]
guideType: "procedure"
prerequisites: ["channel-balance"]
next: ["phase-polarity", "recording-profile"]
---

## Install the right Stereo Tool

The published requirements list Windows and macOS; Linux is not listed. The product page explicitly exempts this freeware from activation and dongle requirements. Check the available plugin format against your host before installing. A VST label alone does not establish VST3 support.

Use a host that can open the plugin’s own editor for this exercise. This is a proposed workflow based on its documentation, not a report of a verified installation or hardware test.

## A concrete host example: REAPER

These are the English menu names in the REAPER 7 user guide; this is a documented workflow, not a claim that this plugin was installed and tested here.

1. In **Options > Preferences > Audio > Device**, choose your interface and its intended stereo output. Create a track with **Track > Insert new track**. Import the reference WAV onto it from the Media Explorer using **Insert into project**, without stretching or normalization.
2. Open **View > FX Browser**, search for FLUX Stereo Tool and drag it onto the track panel. Open the track's FX window and select the plugin to display its editor. Keep the track pan centered and other effects disabled.
3. Show **View > Master Track**. Use its **Mono/Stereo** button to check the summed signal during the exercise below; restore stereo afterwards. Keep the deck out of REC while learning the controls.
4. To save an intentional correction, solo this track and choose **File > Render**. Export stereo WAV at the project's sample rate, with normalization disabled and a new filename. Verify the render's channels and peaks before importing it into MixtapeForge. Save the REAPER project as well, so the plugin settings remain recoverable.

## Begin with a neutral setup

Load Stereo Tool on a stereo track. Reset it, set both input gains to **0 dB**, leave polarity switches off and preserve the default channel routing and neutral width. Disable other processing during the exercise. Keep the output quiet and leave the cassette deck out of REC.

Prepare about twenty seconds of your own voice as a mono file, with identical content routed to left and right. Retain that reference unchanged. It gives you a known starting point, unlike a commercial mix whose stereo arrangement is unknown.

## Learn what a polarity error looks like

The **goniometer** draws the relationship between left and right audio. **Correlation** summarizes their similarity: +1 for identical channels, −1 for exact opposites. These are straightforward expectations for the test reference, not goals for every stereo mix. See [phase versus polarity](../phase-polarity/).

Play the reference. Equal, identical channels should produce a centered mono image and correlation near **+1**. If that does not happen, inspect routing and bypass other effects first.

Temporarily invert **one** channel. The relationship should become negative, approaching **−1** for this deliberately identical reference. If your host offers mono monitoring, listen quietly: the summed voice should largely cancel. Restore the switch immediately afterward.

This is a demonstration, not a correction to apply to every recording. Polarity inversion changes a channel’s sign; it does not undo a frequency-dependent phase error or a time offset.

## Investigate a channel that sounds quieter

Use the unchanged mono reference to trace the imbalance. Compare the digital source with a stereo capture from the deck. Follow [the channel-balance measurement](../channel-balance/) to quantify the difference. A difference that appears only in the captured return needs investigation of that complete path, including input gains. A round-trip capture combines recording, playback and interface errors: a trim that helps this loop may not improve playback on another deck.

If repeated captures show a stable level difference, try attenuating the louder channel slightly. For example, **−0.5 dB** is a small trial adjustment, not a recommended calibration value. Compare again before saving anything. Do not force equal meters on ordinary music: instruments may intentionally favour one side.

## Check music without chasing the graph

Switch to a familiar passage with vocals and sustained instruments. Compare bypassed and processed playback at similar loudness. If experimenting with width, make a modest change, then listen in stereo and through the host’s mono monitoring.

A full mix does not need permanent correlation of +1. Brief negative readings are a reason to investigate the sound, not proof of a fault. Keep the version that preserves musical balance and mono intelligibility; restore neutral settings if the adjustment offers no clear benefit.

## Bring the result back to the cassette workflow

For a tape comparison, retain the raw stereo capture and inspect a copy. A persistent source/return difference is more useful than a moving graph alone. Stereo adjustments cannot repair unstable transport, lost treble from poor head alignment or damaged tape.

MixtapeForge currently exposes generic VST3 parameters, not the plugin’s native metering editor. Compatibility with this particular plugin has not been verified. You can instead render a processed WAV in a compatible host, import it into the mixtape and avoid repeating the same processing. Save the original, the preset and the test conditions so you can return to the unmodified version.

## Common problems and final checks

If the plugin is missing from the host, verify installed format, processor architecture and plugin scan results against FLUX's current requirements. If only one meter moves, inspect the track and channel routing before applying gain. If mono monitoring cancels the deliberately inverted reference, the demonstration worked: restore the polarity switch before testing music.

A persistent quiet channel can have several causes; follow [the quiet-channel checks](../quiet-channel/) rather than using an extreme trim. Before exporting, confirm neutral or intentional width, restored demonstration switches, unclipped output and a clearly named processed file. Compatibility with MixtapeForge's host still requires a real plugin test; this article does not claim one was performed.
