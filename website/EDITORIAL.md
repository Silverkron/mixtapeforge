# Guide editing standard

These rules apply to every language edition (English, Italian, French, German and Spanish). The editorial review requested on 26 October 2026 covers all 76 topics, not only the most visited guides.

## Write for someone doing the task

- Start with a visible answer of 40–900 characters. It must make sense without relying on the next paragraph, without Markdown links and without unsupported certainty.
- State what the reader can achieve and what the test cannot establish.
- Explain an unfamiliar term at first use. Prefer a concrete example to an unexplained abbreviation.
- For procedures, list essential equipment separately from optional conveniences. Name the software and explain the relevant setting or operation.
- Give connections, channel selection, starting settings, ordered actions and an observable result. Explain why a non-obvious action matters.
- For measurements, distinguish the signal source, recorder, playback chain and analysis software. Identify reference-tape requirements and the uncertainty of a self-recorded test.
- Explain how to interpret a result and what to do next. Label invented numerical examples as hypothetical; never imply they are measured app performance.
- For diagnosis, connect each symptom to a possible cause, a simple check and a next action. Avoid presenting a symptom as proof of a particular failed component.
- Adapt the structure to the topic. An explanation of HX Pro does not need the same sections as a printing procedure.
- Remove filler, repeated warnings, generic product pitches and decorative illustrations that do not help the reader.

Each article also declares a `primaryKeyword`, 2–5 genuinely supported `secondaryKeywords` and one `searchIntent`: `informational`, `task`, `evaluation` or `diagnosis`. Keywords describe the page; they are never inserted as hidden text or repeated to satisfy a density target. The current architecture, research basis and per-topic decisions are in [ARTICLE_STRATEGY.md](ARTICLE_STRATEGY.md).

## Verify claims

Use the manufacturer's manual, official software documentation and relevant standards first. Read the source that supports the claim. For MixtapeForge behavior, inspect current application code and distinguish implemented behavior from plans. Record limitations explicitly.

The topic review files in this directory record the sources and editorial checks by subject. These are documentation checks, not a claim that every procedure has been performed on physical hardware. Do not claim independent technical review or bench validation without evidence.

## Internal links

Each article declares a `guideType`, `prerequisites`, `next` and curated `related` article IDs. Keep this navigation identical across translations. The article template resolves IDs to localized titles and preserves the intended order.

- Prerequisites are genuinely needed knowledge, not just related subjects. Avoid circular dependencies.
- Next steps advance the reader's task; related links offer a useful alternative or deeper explanation.
- Add contextual links where the reader needs the linked explanation. Use `../article-id/` in Markdown so language and repository base paths remain intact.
- Link text describes the destination. Do not use “click here”.
- The library provides short learning paths and a searchable complete catalog. Neither guide navigation nor article reading requires JavaScript.

Automated checks validate localized counterparts, article IDs, contextual links, cross-language navigation, prerequisite cycles and incoming links. Static-build checks also validate actual generated URLs and anchors. These checks supplement editorial review; they cannot establish technical accuracy.

## Visuals

Article headers do not show generic category artwork. Use a visual only if it explains a connection, a relevant result or a procedure more clearly than prose alone. HTML connection diagrams contain accessible localized labels and an explanatory caption; they are conceptual signal paths, not drawings of a specific model's physical panel.

### Connection diagram provenance

Checked 26 October 2026:

- TEAC/TASCAM, **202MKVII Owner's Manual**, D01332620B, revision B, page 14 “Connections”: https://cf.tascam.com/wp-content/uploads/downloads/products/tascam/202mkvii/202mk7_om_efs_vb.pdf#page=14 . Verified stereo LINE IN/LINE OUT direction and L/R identification. Manufacturer copyrighted document; no manual artwork reproduced.
- Audacity Team, **How to connect your equipment**: https://manual.audacityteam.org/man/how_to_connect_your_equipment.html . Verified cassette LINE OUT to stereo line input, an external interface as an input option, and the distinction between line and microphone inputs. The documentation includes a real cassette rear-panel connection photograph. No photograph or text excerpt reproduced.

`src/components/ConnectionGuide.astro` is an original, text-based diagram derived from those connection facts. It appears only on the computer-recording and selected playback-measurement guides. The caption links to the supporting documentation. It does not promise compatibility with a particular interface or replace its manual.

For a future plot or hardware image, record its source, author, date checked, reuse license and the specific technical facts verified. Omit an image if it cannot be verified. Never invent controls, connector placement, frequency curves or measurement readings merely to make a page look complete.

## Completed review and validation — 26 October 2026

All 76 topics have been revised in English, Italian, French, German and Spanish (380 articles). Three parallel subject reviews covered recording/covers, noise reduction/diagnostics and calibration; the coordinator checked shared navigation, presentation, localization consistency and the complete build.

Validation completed:

- Eight automated tests passed, including all localized counterparts, contextual link destinations, navigation parity, incoming article links and absence of prerequisite cycles.
- Astro check: 29 files, no errors, warnings or hints. Formatting check passed.
- Static build verification passed for 437 HTML pages and 380 localized articles, both at the local root and with a simulated GitHub Pages repository prefix (`/mixtapeforge/`). Links, anchors, assets, metadata and language alternates were checked. The final output was rebuilt with local settings; nothing was published.
- Browser checks covered desktop and mobile layouts, long and short guides, library search, keyboard operation of the contents panel and navigation to the next localized guide. No horizontal overflow was observed on the sampled pages.

Documentation research and software-source checks do not constitute physical bench tests. The translations have not received independent native-speaker review. Numerical examples are explanatory, not measurements made during this review.
