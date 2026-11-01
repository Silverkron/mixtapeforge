---
id: "normalization-compression-eq"
lang: "de"
title: "Normalisierung, Kompression und EQ: drei verschiedene Aufgaben"
description: "Normalisierung hilft bei Lautheitsunterschieden zwischen Songs, Kompression bei zu großen Schwankungen innerhalb eines Songs und EQ bei der Klangfarbe."
primaryKeyword: "Normalisierung, Kompression und EQ"
secondaryKeywords: ["eine Probeaufnahme","Ursachen prüfen","ein Aufnahmeprofil","Kassetten-Aufnahmepegel"]
searchIntent: "task"
answer: "Normalisierung hilft bei Lautheitsunterschieden zwischen Songs, Kompression bei zu großen Schwankungen innerhalb eines Songs und EQ bei der Klangfarbe. Beginne ohne Bearbeitung: Jede Änderung sollte ein benennbares Hörproblem lösen."
category: "recording"
image: "recording"
updated: "2026-11-01"
sources: [{"title": "Audacity — Lautheitsnormalisierung", "url": "https://manual.audacityteam.org/man/loudness_normalization.html"}, {"title": "Audacity — Kompressorregler", "url": "https://manual.audacityteam.org/man/compressor.html"}, {"title": "Audacity — Glossar für digitales Audio", "url": "https://manual.audacityteam.org/man/glossary.html"}]
guideType: "procedure"
related: ["recording-levels", "recording-profile", "muffled-cassettes"]
prerequisites: []
next: ["recording-levels"]
---

Die genannten App-Beschriftungen beziehen sich auf die englische Oberfläche.

## Die Regler verstehen

Normalisierung verändert den Pegel. Peak gleicht Spitzen an, nicht Lautheit. LUFS schätzt wahrgenommene Lautheit; Album erhält die Verhältnisse durch gemeinsame Verstärkung. Kompression verringert Dynamik: Schwelle, Verhältnis, Attack und Release bestimmen Einsatz, Stärke und Reaktionszeit. EQ verändert Frequenzbänder wie Bass oder Höhen.

## In MixtapeForge ausprobieren

1. Öffne **EQ / Audio**, wähle eine bekannte Passage und höre das Original.
2. Probiere LUFS bei ungleich lauten Zusammenstellungen, Album bei zusammenhängenden Alben. Halte die True-Peak-Grenze unter 0 dBTP; −1 dBTP ist ein Startbeispiel, kein Bandkalibrierungswert. Die Peakgrenze hat Vorrang vor der Lautheitsvorgabe.
3. Lass Kompression ohne konkretes Spitzenproblem aus. Das Preset **Light** für leichte Kompression beginnt mit 1,5:1, Schwelle −18 dB, Attack 30 ms und Release 250 ms. Die Wirkung hängt vom Quellpegel ab. Verlieren Schlagzeuganschläge Kraft oder pumpt die Lautstärke, reduziere oder deaktiviere sie.
4. Beginne mit neutralem EQ. Verändere ein Band leicht oder prüfe die Bandstellungen eines Presets. Ein Genre-Preset ist Geschmack, keine automatische Bandsortenkorrektur.
5. Vergleiche Original/Master bei ähnlicher Lautstärke und mache [eine Probeaufnahme](../recording-levels/). Behalte die auf Band bessere Version.

Bei dumpfem Klang zuerst [Ursachen prüfen](../muffled-cassettes/), statt Höhen aufzudrehen. Software repariert keinen verschlissenen Bandlauf. Bei NR-Codierung erfolgen musikalische Änderungen vorher; danach kein zusätzlicher EQ und keine Normalisierung.

**Fertig:** Problem verbessert, Peaks kontrolliert, Anschläge erhalten, Band gehört. Für gemessene Kompensation nutze [ein Aufnahmeprofil](../recording-profile/), getrennt vom musikalischen EQ.
