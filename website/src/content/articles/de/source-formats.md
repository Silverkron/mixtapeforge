---
id: "source-formats"
lang: "de"
title: "WAV, FLAC oder MP3 für Kassettenaufnahmen: Wie wichtig ist die Quelle?"
description: "Verwende die sauberste echte Quelle, die du besitzt."
primaryKeyword: "WAV, FLAC oder MP3 für Kassettenaufnahmen"
secondaryKeywords: ["die Normalisierung","die Probeaufnahme vom Computer","Eine Kassette vom Computer aufnehmen","Normalisierung, Kompression und EQ"]
searchIntent: "informational"
answer: "Verwende die sauberste echte Quelle, die du besitzt. WAV und FLAC können Audio ohne verlustbehaftete Codierung erhalten. Eine MP3 in WAV umzuwandeln stellt bereits entfernte Informationen nicht wieder her."
category: "recording"
image: "recording"
updated: "2026-11-01"
sources: [{"title": "Audacity — Glossar für digitales Audio", "url": "https://manual.audacityteam.org/man/glossary.html"}, {"title": "Symphonia — unterstützte Codecs und Container", "url": "https://github.com/pdeljanov/Symphonia"}]
guideType: "explainer"
related: ["recording-computer", "normalization-compression-eq", "cassette-mixtape"]
prerequisites: []
next: ["recording-computer"]
---

## Import in MixtapeForge

Der aktuelle Desktop-Dateidialog listet **WAV, FLAC, MP3, M4A, AAC, AIFF/AIF, OGG und CAF**. Container wie M4A können unterschiedliche Codecs enthalten; die Dateiendung garantiert daher keine vollständige Unterstützung. Der Decoder basiert auf Symphonia. Geschützte Streaming-Downloads sind keine gewöhnlichen importierbaren Musikdateien.

1. Bewahre Originale in einem festen Ordner auf. Importiere je eine Datei jedes geplanten Formats.
2. Prüfe Titel und Dauer, höre dann Anfang, Mitte und Ende. Falsche Dauer oder plötzliche Stille zuerst klären.
3. Bei Importfehlern öffne eine Kopie in einem geeigneten Audioeditor und exportiere Stereo-PCM-WAV. Original behalten; Umbenennen ist keine Formatkonvertierung.
4. Öffne unter **EQ / Audio** das Masterformat und wähle eine vom Ausgang unterstützte Rate: 44,1, 48, 88,2 oder 96 kHz. Eine höhere Zahl beweist keinen besseren Kassettenklang.

## Klang statt Dateigröße vergleichen

Eine saubere gekaufte MP3 kann besser klingen als eine beschädigte WAV-Aufnahme. Gleiche die Hörlautstärke an und vergleiche Stimmen, Becken und leise Ausklänge. Beachte [die Normalisierung](../normalization-compression-eq/), bevor du lauter mit besser verwechselst.

Ein verlustfreies Arbeitsformat vermeidet weitere Verluste, repariert aber keine vorhandene Verzerrung. Danach folgt [die Probeaufnahme vom Computer](../recording-computer/).

**Bereit:** vollständig decodiert, Metadaten geprüft, Originale erhalten, unterstützte Abtastrate.
