# Editorial and technical review: recording, covers and cassette projects

Reviewed 26 October 2026. Scope: 26 article IDs, each revised in English, Italian, French, German and Spanish (130 files). Based on the supplied guide-improvement report. This is an editorial/source-code review, not a hardware validation, printer certification or independent native-speaker review.

## Method and implementation references

Each article was rewritten around its specific reader outcome. Procedures identify supplies, actionable steps and observable acceptance checks. Introductory/cultural articles use explanatory or creative structures rather than a forced laboratory checklist. Examples with numbers or invented names are explicitly illustrative. All 130 articles now have curated related/prerequisite/next metadata and 2–5 contextual internal links; identical graph across languages. No decorative or unverified illustration was added.

Software reviewed is local MixtapeForge 0.1.0 source as present on this date:

- `../src/views/ArtworkView.tsx`: nine styles, six selectable title fonts; colour controls; monochrome; title/subtitle; 15 tracks **total**; print/PDF/SVG disabled above this count; text tracklist still enabled.
- `../src/artwork/catalog.json`: flat card 104.8 × 101.6 mm, front 65.1 mm, spine 12.7 mm, residual flap 27.0 mm. These are application template dimensions, not universal case dimensions.
- `../src/artwork/print.css`: A4 portrait, actual millimetre card geometry; direct-print reference ruler. PDF export does not automatically carry that ruler: exported files require a known card dimension check.
- `../src-tauri/src/artwork.rs`: PDF/SVG export; document conventions and fonts. No automatic O-card, fold-out or imposed duplex feature claimed.
- `../src/views/ComposeView.tsx`, `TrackInspector.tsx`: A/B duration, capacity minus margin, rearrangement and track inspection.
- `../src/views/StudioView.tsx`, `../src/useStudioController.tsx`: REC output countdown is three seconds; does not start/stop physical deck transport; three seconds does not guarantee every leader has passed.
- `../src/views/SettingsView.tsx`, `MasteringView.tsx`: device choice, master rates, normalization modes and Light compression preset (1.5:1, −18 dB threshold, 30 ms attack, 250 ms release, linked stereo). Musical processing is not physical meter calibration.
- `../src-tauri/src/main.rs`, `audio.rs`, `../src-tauri/Cargo.toml`: import extension selector and Symphonia decoder; extension/container is not a guarantee for every codec variant. Original files remain the recommended source archive.
- `../src/locales/en.json`, `fr.json`, `es.json`, `../src/i18n.ts`: actual command/style labels checked. German UI is not implemented; German guides use English labels where named and identify this near relevant procedures. Some existing FR/ES style translations are awkward; guides match actual labels rather than inventing controls.

## Primary source register

Consulted 26 October 2026. Sources verify technical facts, not artistic compositions. No source image was copied or adapted; therefore no image licence was relied upon. The pages/manuals remain the property of their authors.

- **TASCAM**, [122MKIII / 112MKII owner's manual](https://www.tascam.eu/en/docs/112mkII_122mkIII_manual.pdf): recording sequence, INPUT/AUTO monitoring, distinction between off-tape monitoring and two-head input monitoring, counter not a clock. Search-indexed manual passages were inspected; direct PDF retrieval returned access restriction. The manufacturer's manual is also archived by the [Library of Congress](https://tile.loc.gov/storage-services/master/mbrs/recording_preservation/manuals/Tascam%20TEAC%20122MKIII-112RMKII-112MKII%20Stereo%20Cassette%20Deck.pdf). Model-specific instructions are not generalized into universal button sequences.
- **TEAC**, [W-1200 feature announcement](https://teac.jp/jp/support/news/5488): explicit Type I/II record/play and Type IV playback support; analogue input/output and USB output distinction. English product route was intermittently under maintenance, so the directly inspected Japanese manufacturer page is cited.
- **Audacity**, [Glossary](https://manual.audacityteam.org/man/glossary.html), [Loudness Normalization](https://manual.audacityteam.org/man/loudness_normalization.html), [Compressor](https://manual.audacityteam.org/man/compressor.html): digital terms, lossy/lossless distinction, loudness vs peak, threshold/ratio/time controls. Audacity defaults are not presented as cassette targets.
- **Symphonia authors**, [decoder documentation](https://github.com/pdeljanov/Symphonia): container/codec support and feature flags, checked against the application's dependency and selector; no support promise inferred solely from latest upstream main.
- **Adobe**, [Adjust page size for printing](https://helpx.adobe.com/acrobat/desktop/print-documents/set-up-and-print-pdfs/page-size.html) and [Print PDFs](https://helpx.adobe.com/reader/desktop/print-pdfs.html): Actual size versus Fit, duplex controlled by printer driver, grayscale and page orientation. Actual size can clip out-of-paper content; it does not guarantee fit.
- **Duplication.com / Analogue Media Technologies**, [cassette templates](https://www.duplication.com/printspecs/cassette-cover-templates.php): J/U/O-card distinctions, supplier-specific bleed/safe area, separate paper-label and direct-print templates, U-card hub-post clearance. No claim that home PDF is PDF/X/CMYK print-ready for this supplier.
- **National Audio Company**, [audio/artwork requirements](https://www.nationalaudiocompany.com/cassette-duplication/prepare-your-audio-and-your-album-art/cassette-duplication-guidelines/) and [packaging descriptions](https://www.nationalaudiocompany.com/cassette-duplication/cassette-packaging-descriptions-2/): side masters, matching ordered lists and gaps, 44.1 kHz/16-bit delivery requirement identified as supplier-specific, extra panels and paper layouts. [Tracklist form](https://www.nationalaudiocompany.com/cassette-duplication/forms/track-list-form/) corroborates side-by-side metadata; its limits are not confused with MixtapeForge's 15-total cover limit. [Duplication-master explanation](https://www.nationalaudiocompany.com/faq/if-i-provide-my-mastered-audio-to-nac-why-do-i-have-to-pay-for-a-duplication-master/) verifies distinction from home real-time copies.
- **Avery**, [laser/inkjet product compatibility](https://www.avery.com/help/article/difference-between-laser-and-inkjet-products?page=0): material/heat/ink compatibility. **Epson**, [paper specifications](https://files.support.epson.com/pdf/al1400/al1400u1.pdf) and [media-type example](https://files.support.epson.com/docid/cpd6/cpd63622/source/printers/source/paper_loading/reference/amc400_550/paper_type_settings_us_canada_amc400_550.html): paper sizes and model-specific weight/tray restrictions; no universal paper-weight recommendation extrapolated.
- **Inkscape documentation contributors**, [Text](https://inkscape-manuals.readthedocs.io/en/latest/text.html) and [PDF export](https://inkscape-manuals.readthedocs.io/en/latest/export-pdf.html): editable SVG retention, text-to-path versus font embedding, page/export dimensions. External editor handling of embedded fonts must be checked.
- **Damn Simple J-Card Creator author**, [project README](https://github.com/m4ddok87/Damn-Simple-J-Card-Creator): Windows/local scope, movable objects, defaults, project preservation and PDF export; not installed or runtime tested in this review.
- **Creative Commons**, [FAQ / attribution](https://wiki.creativecommons.org/index.php/Frequently_Asked_Questions), [licence overview](https://creativecommons.org/cc-licenses/): distinct licence conditions, attribution, changes and non-endorsement. No blanket permission for a downloaded image or jurisdiction-specific legal conclusion offered.

## Per-article acceptance notes

All rows: substantive rewrite complete in EN/IT/FR/DE/ES; references checked as described above; contextual links and navigation validated. Practical outcomes still require the user's actual hardware/print proof.

| Article ID | Specific source checks and implemented outcome | Limitation kept visible |
| --- | --- | --- |
| recording-computer | TEAC/TASCAM connections and record-pause; app output selector/REC code. Cable direction, short test, stop/rewind/play, channel checks. | App controls computer output only; leader can exceed countdown; hardware levels model-dependent. |
| recording-levels | TASCAM recording sequence; Audacity dBFS/clipping; app mastering. Compare loud/quiet test, change one gain. | No universal +3 dB rule or digital-to-analogue 0 equivalence. |
| cassette-types | TEAC explicit recording vs playback types. Choose supported tape and test formulation. | Type is not a quality ranking; same type can differ. |
| cassette-duration | TASCAM counter caveat; NAC separate-side programme. Per-side calculation includes gaps/reserve. | Numerical example hypothetical; no guarantee of nominal tape capacity. |
| source-formats | Symphonia plus selector/dependency source; Audacity codec/lossless definitions. Import/check/convert-copy workflow. | Container extension does not guarantee every codec; resampling does not restore information. |
| two-head-three-head | TASCAM monitor description and 122/112 distinction. Determine which signal is heard. | Source monitoring is not tape; no physical head can be added by software. |
| cassette-mixtape | NAC side sequencing/gaps; actual composer and inspector. Concrete song-order-to-tape workflow. | Artistic suggestions are suggestions; cover capacity distinct from playlist capacity. |
| normalization-compression-eq | Audacity controls plus actual MasteringView preset values. One-change comparison and tape test. | True-peak example is not Dolby/tape calibration; no EQ after NR. |
| print-j-card | Adobe Actual size; actual app printing/export. Full proof, measurement, cutting and case test. | 50 mm reference is direct-print-specific; PDF uses known card dimensions. |
| j-card-dimensions | App geometry and Duplication.com panels/bleed. Distinguish flat size, front and folds. | Case-specific fit; home export not automatically supplier-ready. |
| j-card-wrong-size | Adobe scaling; app geometry. Measure both axes and separate clipping/fold/font causes. | 48/50 mm is an illustrative 96% calculation, not an observed defect. |
| j-card-paper | Avery and Epson media requirements. Compare stock with same design and case. | g/m² not thickness; no universal heavy-stock or duplex claim. |
| cover-typography | Actual six choices, Inkscape text/export. Long names, accents, spine and physical proof. | Title-font selector is not unrestricted track typography; font handling varies in editors. |
| monochrome-covers | Adobe grayscale; actual app palette/grayscale. Printed luminance contrast and ink coverage. | Screen contrast warning not a printer guarantee. |
| j-card-design-ideas | Actual nine-style catalogue; supplier proof practice. Distinct rock/pop/synthwave routes. | Styling suggestions, no fabricated genre history; arbitrary image placement not implemented. |
| a4-letter-j-cards | Adobe Actual size and Epson physical paper sizes. Correct sheet without scaling card. | Current app export/direct stylesheet A4 only; external placement may be needed for Letter. |
| double-sided-j-cards | Adobe driver duplex; NAC front/back panels; Inkscape. Dummy, orientation and registration checks. | App not a duplex/imposition editor; driver flip setting depends on orientation. |
| labels-vs-j-cards | Duplication.com distinct label/imprint formats; Avery compatibility. Identify shell vs case information. | App does not generate adhesive sheets; holes and moving openings stay clear. |
| long-tracklists | Actual 15-total export guard; NAC extra panels. Text export and separate layout path. | No 15-per-side claim; omissions/abbreviations explicitly checked. |
| j-card-makers | Creator README, Inkscape documentation, actual app controls. Same real-project acceptance test. | No comparative runtime tests claimed; tools not equivalent in dimensions/features. |
| artwork-credits | CC attribution/conditions. Rights record, actual-use decision, readable credit. | Hypothetical credit grants no permission; licence-specific terms still apply. |
| mixtape-gift | NAC readable ordered list and playback-metadata practice. Recipient/player first, intentional sides, final listening. | Creative advice not sourced historical fact; unknown NR player handled explicitly. |
| mixtape-notes | NAC tracklist/metadata; actual project and TXT export. Separate listener notes from hardware log. | Knob position is not calibration; project cannot know physical controls. |
| consistent-copies | NAC master/process documentation; actual side export. Freeze approved reference, identify/check every copy. | Same settings cannot guarantee identical blanks; sampling weaker than full listening. |
| small-cassette-release | NAC delivery requirements/templates/proof workflow. Complete package before batch. | Supplier rate is a delivery spec; licensing/approval not assumed. |
| release-packaging | Duplication.com and NAC format descriptions. Physical dummy and fit before artwork. | Panel naming differs; no automatic O-card/U-card generation promised. |

## Remaining validation boundary

The source-code and document review does not establish that every supported OS, driver, tape, printer or translation reads perfectly in use. No actual recording or print run was performed for this editorial task. An independent first-time reader following the guides and a native-language editorial pass remain useful release checks. Parent agent owns full-site build, UI review, graph-wide tests and any verified instructional diagram components.

## Additional German calibration translations

Translated the following twelve revised English guides completely into German: `calibration-basics`, `needs-calibration`, `without-reference-tape`, `loopback-round-trip`, `calibration-tapes`, `speed-test`, `wow-flutter`, `azimuth-test`, `playback-level`, `channel-balance`, `frequency-response`, `recording-sensitivity`. Procedures, numerical examples, uncertainty limits and contextual destinations are retained. Source verification for this calibration batch belongs to the calibration review; source URLs are preserved and descriptive labels translated. Navigation fields were refreshed from the latest English versions, including the crosstalk link from channel balance. Local comparison confirms matching contextual link destinations and existing targets. No hardware measurements or native-speaker human review are claimed.
