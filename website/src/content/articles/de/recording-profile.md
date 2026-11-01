---
id: "recording-profile"
lang: "de"
title: "Ein Aufnahmeprofil in MixtapeForge erstellen und prüfen"
description: "Nimm die geführte Testfolge auf, erfasse ihre Wiedergabe und prüfe die Korrektur, bevor du die Deck-Band-Kombination speicherst."
primaryKeyword: "Ein Aufnahmeprofil in MixtapeForge erstellen und prüfen"
secondaryKeywords: ["EQ-Grenzen","Wiedergabe auf anderen Decks","Eine Kassette mit EQ verbessern, ohne ihre Grenzen zu verschärfen","Pegelunterschiede zwischen links und rechts vor einer Korrektur messen"]
searchIntent: "task"
answer: "Ein Aufnahmeprofil merkt sich eine gemessene Kombination aus Deck und Band und wendet eine begrenzte digitale Korrektur auf spätere Master an. Das ist hilfreich, wenn dieselbe Anlage den Klang wiederholt auf dieselbe Weise verändert. Aufnahme- und Wiedergabefehler kann es nicht trennen; auch klingen dadurch nicht alle Kassettenplayer gleich."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100: Mess-Checkliste", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "REW: Audio-Interface konfigurieren", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}]
related: ["eq-limits", "channel-balance", "frequency-response"]
guideType: "procedure"
prerequisites: ["without-reference-tape"]
next: ["different-decks", "consistent-copies"]
---

Diese Anleitung beschreibt **MixtapeForge Prototyp 0.1**. Für native Wiedergabe und Erfassung brauchst du die Desktop-App, eine überschreibbare Kassette, ein funktionierendes Deck und ein Stereo-Line-Interface. Da die App noch keine deutsche Oberfläche bietet, stehen die englischen Schaltflächenbezeichnungen unten unverändert.

## 1. Die Testfolge der App aufnehmen

1. Verbinde Interface-Ausgänge L/R mit Deck LINE IN sowie Deck LINE OUT L/R mit den Line-Eingängen des Interfaces. Die direkte Weiterleitung vom Eingang zum Ausgang bleibt ausgeschaltet.
2. Öffne **Calibration** und **Record the test**. Wähle den Ausgang zum Deck und eine vom Interface unterstützte Projekt-Abtastrate. Über **Use device frequency** lässt sich bei Bedarf die Gerätefrequenz übernehmen.
3. Wähle am Deck die passende Bandsorte, schalte Dolby/NR aus und spule über das durchsichtige Vorlaufband hinaus. Beginne mit moderatem Ausgangspegel und REC LEVEL. Digital erreicht der Test **−3 dBFS Spitzenpegel**; daraus folgt kein bestimmter analoger Aufnahmepegel.
4. Starte REC am Deck, danach **Start test**. Die App zählt **3…2…1** und gibt dann ungefähr **108 Sekunden** Testaudio aus. Ausgangslautstärke und REC LEVEL bleiben fest. Warte bis einschließlich der Endmarkierung. Der Test umgeht EQ, Kompression und NR der Mixtape.
5. Stoppe das Deck und spule vor den Testbeginn zurück. Öffne **Capture playback**.

## 2. Die tatsächliche Bandwiedergabe erfassen

Wähle den Eingang vom Deck; NR bleibt aus. Drücke zuerst **Start acquisition** in MixtapeForge und dann PLAY am Deck. Beobachte beide Eingangspegel. Bei Clipping senke den Eingangs-Gain und erfasse den vollständigen Test erneut. Verändere den Gain nicht mitten in der Erfassung.

Erkennt die App die Endmarkierung, versucht sie, die Erfassung automatisch zu stoppen. Manuelles Stoppen bleibt möglich. Speichere die Erfassung, wenn du die rohe WAV-Datei behalten möchtest, und wähle **Analyze test**. Du kannst auch eine WAV-Datei mit der vollständigen App-Testfolge importieren. Beliebige Musik oder ein NAK-T-100-Bericht ersetzen diese Folge nicht.

## 3. Prüfen und speichern

Lies die Warnungen vor der vorgeschlagenen EQ- und Kanalkorrektur. Verrauschte oder instabile Frequenzbänder können unverändert bleiben. Die Analyse beschreibt den vollständigen Aufnahme-Wiedergabe-Weg; sie ist keine zertifizierte Wow-/Flutter- oder MOL-Messung.

Nur der Profilname ist verpflichtend und bereits vorausgefüllt. Wähle beispielsweise **„Pioneer + TDK Typ I · Oktobertest“**. Optionale Felder halten Deck, Band, Verbindungen und Reglerstellungen fest. Wähle **Save and use profile** und kontrolliere **Applies to recordings and listening to the master**. Ist ein Ausgang im Profil gespeichert, kann ein anderer Ausgang blockiert werden, bis du den gemessenen wählst oder das Profil deaktivierst.

## Mit Musik nachprüfen

Nimm denselben kurzen Ausschnitt einmal ohne und einmal mit Profil auf, bei unveränderten Hardware-Reglern. Vergleiche die Wiedergabe bei ähnlicher Lautstärke. Eine kleine Höhenkorrektur könnte beispielsweise eine Aufnahme aufhellen, aber laute Becken rauer machen. Behalte sie erst nach diesem zweiten Test.

Erkennt die App die Folge nicht, prüfe, ob beide Markierungen vollständig sind, der richtige Stereoeingang erfasst wurde und weder Normalisierung noch Bearbeitung die Datei verändert hat. Schwanken Ergebnisse zwischen Durchläufen stark, behebe zuerst die Instabilität.

Prüfliste: vollständige Markierungen, NR aus, feste Regler, saubere Erfassung, Warnungen gelesen und erneuter Musikvergleich. Prüfe das Profil nach Änderungen an Bandformulierung, Anschlüssen oder Gain neu. Lies vor mehreren Kopien die [EQ-Grenzen](../eq-limits/) und die Hinweise zur [Wiedergabe auf anderen Decks](../different-decks/).
