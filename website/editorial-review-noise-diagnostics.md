# Noise reduction and diagnostics editorial review

Date: 2026-10-26. Coverage: 25 topics × 5 languages (English, Italian, French, German, Spanish), 125 rewritten guides.

All guides were rewritten around the supplied readability report: first-use definitions, practical listening examples, equipment and hookups where applicable, numbered actions, observable results and next steps. Graph metadata and contextual links are aligned across languages. No hardware experiments or compatibility certifications were performed. Source consultation supports editorial explanations; it is not a measurement report.

## App scope checked

Read MasteringView and calibration/profile implementation, plus vendored libdolbyb README. Optional Type B processing only; software NR and deck NR must not encode twice. No built-in Dolby C/S/dbx claim. Codec reference 0 dBFS is not a deck-meter calibration. An external stereo VST3 is not a dedicated verified NR stage.

## Source handling

Manufacturer manuals mirrored by archives remain primary documents; their original text was consulted, not automatically generated website answers. Some official Anaxwaves pages time out on direct opening; indexed official product text and FAQ were inspected. NAK supports 3000/3150 Hz speed and several wow/flutter conventions. The oversized Mercedes PDF was excluded from final references; Marantz PMD222 supplies the standard 120/70 µs settings. Philips N2510 original manual OCR was read, but its ambiguous ellipsis-ending indexed URL was replaced by a stable archive URL to the original Philips advertisement. That archive PDF returned 403 on direct opening; indexed original advertisement text was available. Codeberg was unavailable through the web tool; the locally vendored README and implementation supplied library scope. No source scans or diagrams were copied.

## Per-topic review

### dolby-b

Complementary level-dependent treble processing; distinguish codec reference from deck meter and double encoding. App preview is encoded, not a simulated decoded cassette.

Sources consulted:
- [Dolby Laboratories · CP45 · Appendix D](https://www.film-tech.com/warehouse/manuals/DOLBYCP45USERS.pdf)
- [IASA · TC-04 · 5.4.11](https://www.iasa-web.org/book/export/html/435)
- [libdolbyb](https://codeberg.org/martinwguy/libdolbyb)

### dolby-c

Requires matching C playback. DDi Codec is external, not an app integration.

Sources consulted:
- [Dolby Laboratories · CP45 · Appendix D](https://www.film-tech.com/warehouse/manuals/DOLBYCP45USERS.pdf)
- [Anaxwaves · DDi Codec](https://www.anaxwaves.com/DDiCodec/)

### dolby-s

Separate format; avoid claiming C compatibility or a verified integrated software encoder.

Sources consulted:
- [Dolby Laboratories · CP45 · Appendix D](https://www.film-tech.com/warehouse/manuals/DOLBYCP45USERS.pdf)

### dolby-b-c-s-playback

Select recorded format; listening alone cannot certify unknown NR. Software capture must not be decoded twice.

Sources consulted:
- [Dolby Laboratories · CP45 · Appendix D](https://www.film-tech.com/warehouse/manuals/DOLBYCP45USERS.pdf)
- [IASA · TC-04 · 5.4.11](https://www.iasa-web.org/book/export/html/435)

### dbx-noise-reduction

Type I and II differ. Do not equate any 2:1 compressor with dbx. External software scope checked with publisher.

Sources consulted:
- [Anaxwaves · DxI Codec](https://anaxwaves.com/DxICodec/)
- [Anaxwaves · DxII Codec](https://www.anaxwaves.com/DxIICodec/)
- [u-he · Satin 1.3.3](https://u-he.com/downloads/manuals/plugins/satin/Satin-user-guide.pdf)

### software-noise-reduction

Separate actual codec tools, emulation and app Type B-only support; no Dolby C/S/dbx app promise.

Sources consulted:
- [Anaxwaves · DDi Codec](https://www.anaxwaves.com/DDiCodec/)
- [Anaxwaves · DxI Codec](https://anaxwaves.com/DxICodec/)
- [Anaxwaves · DxII Codec](https://www.anaxwaves.com/DxIICodec/)
- [u-he · Satin 1.3.3](https://u-he.com/downloads/manuals/plugins/satin/Satin-user-guide.pdf)
- [libdolbyb](https://codeberg.org/martinwguy/libdolbyb)

### anrs-super-anrs

Corrected important pitfall: Super ANRS has complementary record compression/play expansion; it is not recording-only HX Pro. Ordinary ANRS/B playback is not exact Super ANRS decoding.

Sources consulted:
- [JVC · KD-A77 · 3, 14–15](https://www.manualslib.com/manual/1296270/Jvc-Kd-A77-A.html?page=3)
- [JVC · Super ANRS · 1978](https://www.worldradiohistory.com/Archive-All-Audio/Archive-Modern-Recording/70s/Modern-Recording-1978-07.pdf)

### high-com

Complementary broadband system; no generic Dolby substitute or unverified plugin recommendation.

Sources consulted:
- [Telefunken · RC100 · High Com](https://acwsoft.de/pdf/telefunken_rc100_manual_de.pdf)

### dnl-dnr

Playback-only adaptive filtering versus complementary encoding. Consulted original multilingual Philips manual OCR, not website AI answers; public citation uses Philips period advertisement and TI datasheet.

Sources consulted:
- [Philips · N2510 · 1973](https://www.worldradiohistory.com/Archive-All-BC/Archive-All-Audio/Archive-Studio-Sound/70s/Studio-Sound-1973-12.pdf)
- [Texas Instruments · LM1894](https://www.ti.com/product/LM1894)

### hx-pro

Dynamic recording bias, no playback decoder; benefit remains on compatible playback deck without HX Pro.

Sources consulted:
- [Harman Kardon · CD301 · HX Pro](https://support.harmanaudio.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw37931a4e/pdfs/CD%20301%5EHK%5Eom%5E%5E%5E%5E.pdf)

### bias-eq-nr

Three different settings; no software genre EQ can substitute for recording bias.

Sources consulted:
- [Harman Kardon · CD301 · HX Pro](https://support.harmanaudio.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw37931a4e/pdfs/CD%20301%5EHK%5Eom%5E%5E%5E%5E.pdf)
- [Pioneer · CT-1270WR](https://c.searspartsdirect.com/doc/L0801128)
- [Marantz · PMD222](https://manuals.plus/m/911034fdc965e3cc6270e2dc390788588820521c42e333e7c5607af3154d18de)

### playback-equalization

120/70 microsecond playback settings separate from NR. Follow cassette label for prerecorded exceptions rather than material alone.

Sources consulted:
- [Marantz · PMD222](https://manuals.plus/m/911034fdc965e3cc6270e2dc390788588820521c42e333e7c5607af3154d18de)
- [Pioneer · CT-1270WR](https://c.searspartsdirect.com/doc/L0801128)

### dull-dolby

Check format, clean playback and level matching before adding treble; no diagnosis from sound alone.

Sources consulted:
- [Dolby Laboratories · CP45 · Appendix D](https://www.film-tech.com/warehouse/manuals/DOLBYCP45USERS.pdf)
- [IASA · TC-04 · 5.4.11](https://www.iasa-web.org/book/export/html/435)
- [Anaxwaves · DDi Codec](https://www.anaxwaves.com/DDiCodec/)

### muffled-cassettes

Compare known tape, clean safely, distinguish repeatable tape issue from all-tape deck issue.

Sources consulted:
- [Sony · 00027549](https://www.sony.com/electronics/support/audio-video/tcm-230dv/articles/00027549)
- [Pioneer · CT-1270WR](https://c.searspartsdirect.com/doc/L0801128)

### clean-cassette-deck

Model manual determines chemicals and access; no universal solvent on rubber or live mechanism cleaning.

Sources consulted:
- [Pioneer · CT-1270WR](https://c.searspartsdirect.com/doc/L0801128)
- [Sony · 00028567](https://www.sony.com/electronics/support/audio-video-boomboxes/cfd-44/articles/00028567)

### tape-eating

Stop immediately, no force, no valuable cassette until transport is serviced.

Sources consulted:
- [Sony · 00026237](https://www.sony.com/electronics/support/portable-music-players-other-portable-music-players/wm-fx163/articles/00026237)
- [Sony · 00027611](https://www.sony.com/electronics/support/audio-video-audio-components/tc-w530/articles/00027611)

### tape-dropouts

Repeated-position comparison; do not promise EQ reconstruction of missing signal.

Sources consulted:
- [Sony · 00027549](https://www.sony.com/electronics/support/audio-video/tcm-230dv/articles/00027549)
- [Audacity · Tape transfer](https://manual.audacityteam.org/man/tutorial_copying_tapes_lps_or_minidiscs_to_cd.html)

### quiet-channel

Line-level left/right swap with monitoring muted isolates signal path, not an internal component diagnosis.

Sources consulted:
- [Pioneer · CT-1270WR](https://c.searspartsdirect.com/doc/L0801128)
- [Audacity · Tape transfer](https://manual.audacityteam.org/man/tutorial_copying_tapes_lps_or_minidiscs_to_cd.html)

### distorted-recordings

Separate source, interface clipping, deck input and tape saturation by controlled quieter repeat.

Sources consulted:
- [Sony · 00027549](https://www.sony.com/electronics/support/audio-video/tcm-230dv/articles/00027549)
- [Audacity · Test recording](https://manual.audacityteam.org/man/tutorial_making_a_test_recording.html)

### hum-buzz

Cable/power proximity and battery comparison; never remove protective earth.

Sources consulted:
- [Focusrite · Ground hum](https://support.focusrite.com/hc/en-gb/articles/211615185-Why-is-there-unwanted-hum-noise-in-my-monitors)
- [Sony · ICD-PX470](https://helpguide.sony.net/icd/p47/v1/en2/contents/TP0001155787.html)

### playback-speed-problems

Known 3000/3150 Hz reference needed for absolute speed. Self-record/play can conceal same-machine error.

Sources consulted:
- [Sony · 00027611](https://www.sony.com/electronics/support/audio-video-audio-components/tc-w530/articles/00027611)
- [Anaxwaves · NAK T-100](https://www.anaxwaves.com/NAKT100/)

### wobbly-playback

Wow/flutter differs from steady pitch error; NAK modes and units must match for comparison.

Sources consulted:
- [Sony · 00027611](https://www.sony.com/electronics/support/audio-video-audio-components/tc-w530/articles/00027611)
- [Anaxwaves · NAK T-100](https://www.anaxwaves.com/NAKT100/)

### playback-compatibility

Tape type, NR, transport and head alignment affect interchange; same-deck loop is not universal proof.

Sources consulted:
- [Pioneer · CT-1270WR](https://c.searspartsdirect.com/doc/L0801128)
- [Marantz · PMD222](https://manuals.plus/m/911034fdc965e3cc6270e2dc390788588820521c42e333e7c5607af3154d18de)
- [Dolby Laboratories · CP45 · Appendix D](https://www.film-tech.com/warehouse/manuals/DOLBYCP45USERS.pdf)

### before-sending-mixtape

Whole-side playback, correct NR label and recording protection; no unverified transport reliability guarantee.

Sources consulted:
- [Pioneer · CT-1270WR](https://c.searspartsdirect.com/doc/L0801128)
- [Sony · 00027611](https://www.sony.com/electronics/support/audio-video-audio-components/tc-w530/articles/00027611)

### buying-used-deck

Safe seller demonstration, sacrificial tape, test each well/direction; a short audition cannot certify calibration.

Sources consulted:
- [Sony · 00028567](https://www.sony.com/electronics/support/audio-video-boomboxes/cfd-44/articles/00028567)
- [Sony · 00027549](https://www.sony.com/electronics/support/audio-video/tcm-230dv/articles/00027549)
- [Pioneer · CT-1270WR](https://c.searspartsdirect.com/doc/L0801128)

## Validation

Parsed all 125 YAML headers and checked required metadata, catalog destinations, 2–5 contextual links per article and localized graph alignment. Full Astro build and shared navigation tests are owned by the coordinating agent. Hardware behavior, real tape noise reduction, alignment and service adjustments remain untested.

## Additional German calibration translations

Completed full German translations from the revised, stable English source for: high-frequency-saturation, distortion-test, maximum-output-level, tape-hiss-snr, bias-adjustment, recording-profile, calibration-software. Preserved all source references, guide classifications and reading-graph edges. Recording-profile explicitly explains that interface labels remain English because the app has no German UI. No new instrument measurements or hardware claims were introduced. The other six German calibration translations were reassigned to the calibration agent.

Final targeted validation: 125 NR/diagnostic YAML headers parsed; graph fields equal across five languages; all contextual article targets exist and each body has 2–5 links. Seven German calibration headers and graph fields match their English versions. No full build run by this agent during parallel editing.
