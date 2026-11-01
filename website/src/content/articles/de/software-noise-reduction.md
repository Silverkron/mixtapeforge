---
id: "software-noise-reduction"
lang: "de"
title: "Dolby und dbx in Software: Werkzeuge, Formate und Grenzen"
description: "Nach dokumentierten Encodern und Decodern statt nach allgemeinen NR-Bezeichnungen wählen."
primaryKeyword: "Dolby und dbx in Software"
secondaryKeywords: ["Wiedergabepegel-Anleitung","Abgleichprüfungen","DNL und DNR","dbx-Rauschunterdrückung"]
searchIntent: "task"
answer: "Ein Software-Codec codiert oder decodiert ein bestimmtes NR-Format. Ein Entrauscher schätzt unerwünschtes Rauschen und entfernt einen Teil davon. Das sind unterschiedliche Aufgaben: Ein allgemeiner „Tape Hiss“-Filter decodiert weder Dolby noch dbx."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Anaxwaves · DDi Codec", "url": "https://www.anaxwaves.com/DDiCodec/"}, {"title": "Anaxwaves · DxI Codec", "url": "https://anaxwaves.com/DxICodec/"}, {"title": "Anaxwaves · DxII Codec", "url": "https://www.anaxwaves.com/DxIICodec/"}, {"title": "u-he · Satin 1.3.3", "url": "https://u-he.com/downloads/manuals/plugins/satin/Satin-user-guide.pdf"}, {"title": "libdolbyb", "url": "https://codeberg.org/martinwguy/libdolbyb"}]



guideType: "procedure"
prerequisites: ["dolby-b-c-s-playback"]
next: ["dull-dolby", "recording-computer"]
related: ["dbx-noise-reduction", "playback-level", "dolby-c"]
---

## Das Werkzeug nach Format auswählen

| Werkzeug | Dokumentierte Aufgabe | Prüfen |
| --- | --- | --- |
| [DDi Codec](https://www.anaxwaves.com/DDiCodec/) | B/C codieren und decodieren, eigenständige Anwendung | Modus, Referenzabgleich, Betriebssystem |
| [DxII Codec](https://www.anaxwaves.com/DxIICodec/) / [DxI Codec](https://anaxwaves.com/DxICodec/) | dbx II beziehungsweise I, dazu Disc-Modi | I und II sind nicht austauschbar |
| [Satin](https://u-he.com/downloads/manuals/plugins/satin/Satin-user-guide.pdf) | B-Type- und uhx-I/II-Kompandermodelle unter seinen Effekten | Zusätzliche Bandfärbung beim Decodertest vermeiden |
| [libdolbyb](https://codeberg.org/martinwguy/libdolbyb) | Type-B-Bibliothek des optionalen MixtapeForge-Encoders | Verfügbarkeit im Build und Hardwarevergleich |

Nicht alle sind in MixtapeForge enthalten. Version 0.1 bietet optional **Type B · libdolbyb**, nicht C, S oder dbx. Der externe Stereo-VST3-Slot garantiert keine Funktion jedes NR-Plugins oder Formats.

## Eine Kassette genau einmal decodieren

Du brauchst den passenden Decoder, ein Interface mit Stereo-Line-Eingängen, Aufnahmesoftware und Kopfhörer.

1. Verbinde Deck-LINE-OUT L/R mit Interface-LINE-IN 1/2. Wähle Line-Empfindlichkeit, deaktiviere automatische Verstärkung und vermeide Clipping. Die [Wiedergabepegel-Anleitung](../playback-level/) trennt Digitalspitze und Dolby-Referenz.
2. Für Softwaredecodierung bleibt Deck-NR aus; der Wiedergabe-EQ muss stimmen. Erfasse unbearbeitetes Stereo mit unterstützter Samplerate und möglichst 24 Bit. Bewahre das Original.
3. Öffne eine Kopie im Decoder, wähle das tatsächliche Format und **decode**. Nutze einen dokumentierten Referenzton, falls vorhanden. Ohne ihn bleibt der Abgleich nach Gehör eine Schätzung.
4. Vergleiche leise und laute Stellen. Ändere die Hörlautstärke nach dem Decoder; normalisiere oder entzerre die codierte Datei davor nicht beliebig.
5. Speichere eine separate decodierte Datei mit Modus und Referenznotizen. Eine bereits vom Deck decodierte Aufnahme darf nicht erneut decodiert werden.

Zum Codieren gilt: normale Quelle → Encoder → Deck mit Aufnahme-NR aus → passender Wiedergabedecoder. Teste eine Minute vor der ganzen Seite. Fehlen leise Höhen, nutze die [Abgleichprüfungen](../dull-dolby/); mehr Endlautstärke korrigiert keinen Decoder-Referenzfehler.

Für weniger Rauschen ohne codiertes Band lies über [DNL und DNR](../dnl-dnr/): Diese Wiedergabefilter erfüllen eine andere Aufgabe als ein Dolby-Decoder.
