---
id: "speed-test"
lang: "de"
title: "Wiedergabegeschwindigkeit mit einer 3-kHz- oder 3,15-kHz-Kassette messen"
description: "Berechne einen konstanten Tonhöhenfehler mit einer unabhängigen Referenz, getrennt von Gleichlaufschwankungen."
primaryKeyword: "Wiedergabegeschwindigkeit mit einer 3-kHz- oder 3,15-kHz-Kassette messen"
secondaryKeywords: ["Wow und Flutter","der Transportdiagnostik","Kassetten laufen zu schnell oder langsam","NAK T-100"]
searchIntent: "evaluation"
answer: "Klingt jeder Ton etwas zu hoch oder zu tief, läuft das Deck möglicherweise dauerhaft zu schnell oder zu langsam. Das ist eine Geschwindigkeitsabweichung. Auf und ab wandernde Tonhöhe gehört zu einem anderen Problem: Wow und Flutter."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100: offizielle Funktionsbeschreibung", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "NAK T-100: Mess-Checkliste", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "Audacity: Spektrumanalyse", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}]
related: ["playback-speed-problems", "nak-t100-practical-guide", "without-reference-tape"]
guideType: "measurement"
prerequisites: ["calibration-tapes"]
next: ["wow-flutter"]
---

Klingt jeder Ton etwas zu hoch oder zu tief, läuft das Deck möglicherweise dauerhaft zu schnell oder zu langsam. Das ist eine **Geschwindigkeitsabweichung**. Auf und ab wandernde Tonhöhe gehört zu einem anderen Problem: [Wow und Flutter](../wow-flutter/).

## Was du brauchst

Verwende eine verlässliche Geschwindigkeits-Referenzkassette mit **3000 Hz oder 3150 Hz**, ein Interface mit Stereo-Line-Eingängen und NAK T-100. Du benötigst nur den Wiedergabeweg: LINE OUT des Decks → LINE IN des Interfaces → Computer. Ein auf dem zu prüfenden Deck aufgenommener Ton ist keine unabhängige Geschwindigkeitsreferenz.

## Den Wert ablesen

1. Wähle den physischen Line-Eingang des Interfaces und eine unterstützte, mit dem Computer übereinstimmende Abtastrate. Deaktiviere automatische Verstärkung und andere Bearbeitung. Eingangsmonitoring bleibt aus.
2. Lege die Referenz ein. Stelle einen vorhandenen Pitch-Regler auf die dokumentierte Normalposition. Schalte NR für den Test aus.
3. Wähle in NAK T-100 mit Function **Speed Wow/Flutter**. Setze **Speed Cal.** auf die Frequenz des Kassettenetiketts, nicht auf den zufällig beobachteten Messwert.
4. Starte die Wiedergabe. Prüfe auf beiden Eingangskanälen ein sauberes, unverzerrtes Signal. Falls vorhanden, wähle am Source/Tape-Monitor Tape.
5. Lass den Transport nach dem Start stabil werden und beobachte einen ruhigen mittleren Abschnitt etwa dreißig Sekunden. Notiere Geschwindigkeit und Beständigkeit. Das ist ein praktisches Vergleichsfenster, keine Zusicherung normgerechter Messdauer.
6. Stoppe, spule zurück und wiederhole. Enthält die Kassette weiter hinten geeignetes Material, vergleiche auch dort. Notiere Referenz, Kanal, Pitch-Position und Zeitraum.

## Das Ergebnis verstehen

Geschwindigkeitsabweichung: `(gemessene Frequenz / Referenzfrequenz − 1) × 100`.

Hypothetisch ergeben 3015 Hz bei einer 3000-Hz-Referenz **+0,5 %**: Die Wiedergabe ist schneller als die Referenz. 2985 Hz ergeben **−0,5 %**. Vergleiche mit der Gerätespezifikation unter passenden Bedingungen; diese Beispiele sind keine Bestehensgrenzen.

Audacitys Plot Spectrum ermöglicht eine grobe Frequenzkontrolle des aufgenommenen Tons. Begrenzte Frequenzauflösung und Mittelung ersetzen aber keine spezielle Geschwindigkeits-/Gleichlaufmessung.

## Diese Fehler ausschließen

- Etwa +5 % oder −4,76 % sprechen für eine Verwechslung von 3000 und 3150 Hz. Prüfe das Etikett vor Änderungen.
- Ein wandernder Wert kann Instabilität oder Aussetzer bedeuten. Wiederhole mit einwandfreier Referenz und folge [der Transportdiagnostik](../playback-speed-problems/).
- Ein scheinbar perfekter selbst aufgenommener Ton beweist nichts: Aufnahme- und Wiedergabefehler können sich aufheben.

Checkliste: unabhängige Referenz, passende Frequenz, sauberes Eingangssignal, wiederholte Messung und dokumentierte Bedingungen. Motorabgleich erfordert die modellspezifische Serviceanweisung; suche keine undokumentierte interne Schraube.
