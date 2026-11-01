---
id: "calibration-software"
lang: "de"
title: "Die passende Software für deinen Kassettentest wählen"
description: "Vergleiche Audacity, REW, NAK T-100, Stereo Tool und MixtapeForge nach Aufgabe, Aufbau und Messgrenzen."
primaryKeyword: "Die passende Software für deinen Kassettentest wählen"
secondaryKeywords: ["Audacity-Übung ohne Referenzband","NAK-T-100-Anleitung","Stereo-Tool-Übung","geführte Profil-Testfolge"]
searchIntent: "informational"
answer: "Beginne mit einer Frage statt mit einer Instrumentenliste. Eine Kassette erfassen, Tonhöhenschwankungen prüfen und ein Korrekturprofil speichern erfordern verschiedene Funktionen. Ein buntes Spektrum ist noch keine kalibrierte Messung."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: Spektrumanalyse", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "REW: Audio-Interface konfigurieren", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}, {"title": "REW: Spektrum, RMS-Pegel und Verzerrung", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/spectrum.html"}, {"title": "NAK T-100: offizielle Spezifikationen", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "FLUX:: Stereo Tool: Produkt und Kompatibilität", "url": "https://www.flux.audio/project/stereo-tool-freeware/"}]
related: ["flux-stereo-tool", "recording-profile", "wow-flutter"]
guideType: "explainer"
prerequisites: ["calibration-basics"]
next: ["without-reference-tape", "nak-t100-practical-guide"]
---

## Ein Werkzeug nach Aufgabe auswählen

| Aufgabe | Geeigneter Einstieg | Was zusätzlich nötig ist |
| --- | --- | --- |
| Bandrücklauf aufzeichnen und Testtöne vergleichen | Audacity | Stereo-Line-Eingang und wiederholbare Testdatei |
| Pegel, Spektrum und Verzerrung untersuchen | REW | Richtige Eingangskonfiguration und dokumentierte Messeinstellungen |
| Kassettengeschwindigkeit und Wow/Flutter prüfen | NAK T-100 | Unabhängige Referenzkassette und passende Auswertung |
| Stereobalance und Polarität untersuchen | FLUX:: Stereo Tool in einem kompatiblen Host | Bekannte Monoreferenz und Originaloberfläche des Plugins |
| Korrektur für spätere Mixtapes speichern | Kalibrierablauf von MixtapeForge | Vollständige eigene Testfolge, auf Band aufgenommen und wieder erfasst |

Audacity und REW gibt es als Desktop-Programme für Windows, macOS und Linux. NAK T-100 wird über die Windows- und macOS-Stores angeboten. Vergleiche die aktuellen Betriebssystem- und Pluginformat-Anforderungen von FLUX mit deinem Host. Nicht jeder VST-Host lädt jedes Pluginformat.

## Die erste Sitzung sinnvoll nutzen

1. Wähle eine einzige Aufgabe, etwa den Vergleich der zurückgelesenen Pegel von links und rechts.
2. Wähle die tatsächlichen physischen Line-Ein- und -Ausgänge des Interfaces. Verwende passende unterstützte Abtastraten und schalte automatischen Gain, EQ und rückkopplungsgefährdetes Eingangsmonitoring aus.
3. Beginne mit einem bekannten, moderaten Testton statt Musik. Prüfe beide Kanäle und lasse Reserve am Erfassungseingang.
4. Speichere Originalsignal, unbearbeiteten Rücklauf, Softwareversion und Einstellungen. Wiederhole die Messung, bevor du kleine Unterschiede deutest.
5. Ergänze ein weiteres Werkzeug erst, wenn es eine Frage beantwortet, die das erste offenlässt.

Die [Audacity-Übung ohne Referenzband](../without-reference-tape/) zeigt beispielsweise eine wiederholbare Erfassung. Die [NAK-T-100-Anleitung](../nak-t100-practical-guide/) ergänzt spezielle Kassettenmessungen. Die [Stereo-Tool-Übung](../flux-stereo-tool/) erklärt eine Stereoanzeige anhand einer bekannten Referenz statt anhand unbekannter Musik.

## Analyse und Korrektur unterscheiden

Hypothetischer Fall: Der Analysator zeigt 2 dB Höhenverlust. Damit ist weder nachgewiesen, dass eine Aufnahme-Anhebung um 2 dB sicher ist, noch ob der Verlust bei Aufnahme oder Wiedergabe entsteht. Ein neuer Aufnahmevergleich bleibt erforderlich.

MixtapeForge 0.1 importiert REW-Kalibrierkurven oder NAK-Messungen nicht automatisch in seine Profile. Nutze dafür die [geführte Profil-Testfolge](../recording-profile/). Die allgemeinen VST3-Parameter zeigen auch nicht die Original-Messoberfläche eines Drittanbieter-Plugins an.

Wähle den einfachsten Aufbau, der eine wiederholbare Antwort liefert. Für absolute Geschwindigkeit, Wiedergabepegel oder Kopfjustage ersetzt Software die notwendige physische Referenzkassette nicht.
