# Calibration guide editorial review

Reviewed 2026-10-26 against the supplied readability report. Scope: 25 calibration topics, preserving all existing IDs. English is the reviewed source; all published locales must retain the same procedure, examples and limitations. No hardware procedure was physically executed during this editorial work. No device-specific service adjustment is claimed to have been validated. Numerical worked examples are explicitly hypothetical.

## Evidence and source handling

Primary sources inspected: official Anaxwaves NAK T-100 specifications and measurement checklist (direct page opens timed out, indexed official page text was available); Audacity Tone, Plot Spectrum, Audio Setup, Recording Preferences, Record and stereo splitting documentation; REW Soundcard Preferences, Signal Generator and RTA Window documentation; FLUX Stereo Tool manual and official product page; MRL reference-tape product scope, azimuth paper and McKnight's original bias paper. Access date above. Current source URLs appear in each article's frontmatter.

The MRL papers explain magnetic recording principles, not a compact-cassette product recommendation: MRL explicitly does not manufacture compact-cassette calibration tapes. Bias operating values from open-reel examples have not been copied as cassette settings. NAK checklist's generic control positions are not presented as safe universal calibration values. Every comparison labels its reference and the complete path included.

## Actual MixtapeForge implementation inspected

`src/views/CalibrationView.tsx`, `src/views/CalibrationCapture.tsx`, `src/views/RecordingProfiles.tsx`, `src/recording-profiles.ts`, and `src/locales/en.json` establish the prototype 0.1 workflow: project/device rate choice; approximately 108-second test; three-second countdown; test bypass of mixtape EQ/compression/NR; separate playback capture; end-marker stop attempt; WAV acquisition/import; analysis warnings; required prefilled name and optional details; save/use profile; output-identity check; limited proposed EQ and channel attenuation subject to reliability checks. The test can reach −3 dBFS peak digitally. That is not equated with an analog deck reference. No automatic NAK/REW import, certified MOL or certified wow/flutter claim is made.

## Per-topic review

| ID | Evidence / verified operations | Main interpretation protected |
| --- | --- | --- |
| calibration-basics | NAK scope, REW interface setup, reference-tape definitions | Independent playback reference versus complete record/replay measurement |
| needs-calibration | NAK preparation checklist; original conservative diagnostic sequence | Symptom patterns remain hypotheses; two tapes and direct source checked first |
| without-reference-tape | Audacity Audio Setup, Recording Preferences, Tone, Record, Split Stereo, Plot Spectrum | Physical input versus software loopback; separate empty replay capture project; no normalization |
| loopback-round-trip | Audacity overdub/new-track preferences, disabled audible monitoring, export and spectral analysis; REW interface baseline | Old return tracks muted; source not mixed with captured return; noise/distortion not subtracted arithmetically |
| calibration-tapes | MRL scope/product guide; NAK reference requirements; azimuth paper | Frequency/fluxivity/EQ/tolerance identified; MRL is not a compact-cassette supplier |
| speed-test | NAK Function/Speed Cal. labels and nominal frequencies | Self-recorded speed errors can cancel; 3000/3150 mismatch is not motor error |
| wow-flutter | NAK Q-PK DIN45507, WRMS JIS and unweighted modes | Detector, weighting, reference and observation window must accompany percentage |
| azimuth-test | NAK Level/O'scope/Lissajous; McKnight azimuth discussion | Phase wrap, tape contact and relative channel gain; check-only guide does not prescribe screws |
| playback-level | MRL fluxivity/reference explanation; NAK external voltage calibration; REW input scaling | Digital zero, deck meter and voltage reference are different; manual defines exact target/load |
| channel-balance | Audacity separate-channel spectrum and sum behavior | Identical source, no normalization; complete path may include interface gain error |
| frequency-response | Audacity tone amplitude and spectrum; NAK low-level FR principle | Original discrete-tone comparison; −20 dB reduction explicitly relative to local setup; uncertain bands not corrected |
| high-frequency-saturation | Audacity amplitude generation; tape headroom principles | Original two-level experiment distinguishes proportional rise from level-dependent loss; interface clipping excluded |
| distortion-test | NAK documented T.H.Dist./400Hz/HD3/THD+N; REW distortion documentation | Noise contribution at low levels and metric distinction |
| maximum-output-level | Anaxwaves headroom procedure and NAK metrics | Local headroom estimate only; chosen 3% HD3 is explicit, not substituted with THD+N; per-channel limits retained |
| tape-hiss-snr | REW live Input RMS, weighting and bandwidth; NAK noise offsets | Concrete live deck→REW workflow; recorded silence, same path/reference; optional raw WAV kept separate |
| bias-adjustment | McKnight Biasing in Magnetic Tape Recording; NAK preparation | Bias is hardware, not software treble; overbias concept has no universal cassette value |
| recording-sensitivity | Audacity test generation/analysis; NAK consistent level setup | Relative tape comparison distinguishes fixed settings from automatic calibration |
| crosstalk-test | Audacity stereo construction/splitting/spectral peak measurements | Opposite channel verified silent; tone leakage separated from integrated noise; opposite-side leakage outside scope |
| phase-polarity | FLUX gain/polarity/native metering and goniometer manual | Deliberate mono polarity exercise restored; frequency-dependent phase is not a polarity fault |
| different-decks | Reference/alignment principles; original comparison workflow | Loudness matched only on listening copies; a local profile is not universal playback compensation |
| eq-limits | Magnetic recording response/headroom tradeoffs; app correction source | Repeatability, headroom, one correction stage and fresh music test required |
| recording-profile | Actual app files and labels listed above | Whole-chain profile with only name required; markers, warnings and hardware controls retained |
| calibration-software | Official Audacity/REW/NAK/FLUX capabilities; app source | Tool chosen by task; no certified results or automatic cross-tool profile import |
| nak-t100-practical-guide | Official specification/checklist and existing verified detailed article | Existing detailed content preserved; numbered first session, equipment and troubleshooting added |
| flux-stereo-tool | Official manual and product requirements; actual app host limitation | Freeware not redistribution permission; native host editor required; no claim of direct MixtapeForge compatibility test |

## Localization and completion tracking

- English: all 25 rewritten or substantively expanded, 2–5 contextual body links each, explicit prerequisites/next/related arrays.
- Italian: all 25 revised at equivalent practical depth, including expanded Audacity workflow and corrected live REW noise procedure.
- Spanish: all 25 completed and validated by the parent agent, including live REW capture, concrete REAPER workflow and localized source labels.
- French: all 25 complete at equivalent practical depth; source labels localized. EN/IT/FR graph parity and contextual links checked together.
- German: this calibration agent completed six full translations: flux-stereo-tool, nak-t100-practical-guide, phase-polarity, crosstalk-test, different-decks and eq-limits. The other 19 are split between the recording and noise-reduction agents. These six preserve all EN procedures, examples, caveats and source URLs; source labels and descriptions are German. Their graph metadata, contextual targets and source URL parity were checked. Software controls retain explicitly identified English labels; no German app locale is claimed.

## Illustrations

No decorative or invented diagrams added to these articles. Parent owns simple schematic playback connections for speed, wow/flutter, azimuth and playback level, based on official line-connection documentation. Diagrams are generic and do not imply model-specific connector placement. All other operations remain textual where a verified diagram would add little or where a model-specific reference is missing.

## Remaining validation limits

Editorial/source review is not a bench test. Exact internal adjustment targets remain in the particular deck's service manual. Windows/macOS/Linux and third-party plugin installations were not performed for these articles. Final graph validation, rendered-page checks and locale equivalence checks run in the parent workflow after all contributors finish.

## Concrete plugin-host example

REAPER 7 official user guide (`https://dlx.reaper.fm/userguide/html/`) consulted for Audio Device preferences, track creation, Media Explorer insertion, FX Browser, master Mono/Stereo and File > Render. A documented workflow was added to FLUX articles; installation and hardware compatibility were not tested. The large manual could not be opened as one web response; relevant official indexed passages were inspected.

## Independent Spanish spot-check

Compared Spanish `without-reference-tape`, `recording-profile`, `nak-t100-practical-guide` and `flux-stereo-tool` against their complete current English articles. Checked physical routing, disabled monitoring, Audacity separate capture project, tone amplitude, channel-by-channel spectrum comparison, fixed gain, sequence length and markers, app limitations, NAK Source/Tape distinction and scale offsets, reference frequencies and detector distinctions, FR acquisition caveat, REAPER insertion/mono/render steps, and restoration of demonstration polarity switches. No substantive technical omissions found. Clarified one Spanish phrase in recording-profile: select the output used in the measurement, rather than the ambiguous “select the measured one”. Source URL sets, graph metadata and contextual targets match. This was a document comparison, not an installation, listening or hardware test.
