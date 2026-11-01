---
id: "recording-sensitivity"
lang: "de"
title: "Aufnahmeempfindlichkeit verschiedener Bänder bei festen Einstellungen vergleichen"
description: "Miss, welchen Wiedergabepegel verschiedene Bänder bei gleichem Aufnahmesignal liefern, ohne Pegel und Klangfarbe zu verwechseln."
primaryKeyword: "Aufnahmeempfindlichkeit von Kassettenbändern vergleichen"
secondaryKeywords: ["Pegelreferenz","Kanalbalance","Aufnahmeprofil","Wiedergabepegel mit einer bekannten magnetischen Referenz prüfen"]
searchIntent: "evaluation"
answer: "Die Aufnahmeempfindlichkeit beschreibt, wie viel Signal ein Band bei einem vorgegebenen Aufnahmeeingang zurückliefert. Zwei Bänder können unterschiedlich laut klingen, obwohl Quelle und REC LEVEL unverändert bleiben. Das ist für Pegelvergleiche und pegelabhängige Rauschunterdrückung wichtig."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: Tongenerator", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: Spektrumanalyse", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "NAK T-100: Mess-Checkliste", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["playback-level", "channel-balance", "tape-hiss-snr"]
guideType: "measurement"
prerequisites: ["without-reference-tape"]
next: ["bias-adjustment", "recording-profile"]
---

## Die Art des Vergleichs festlegen

Willst du zwei Bänder auf einem Deck vergleichen, verwende feste Reglerstellungen und denselben Test. Für einen absoluten Serviceabgleich muss zuerst die Wiedergabe mit der richtigen [Pegelreferenz](../playback-level/) geprüft werden. Ein Durchlauf durch ein unkalibriertes Deck erlaubt einen relativen Vergleich, beweist aber keine korrekte Einstellung der Aufnahmestufe.

Du brauchst ein Stereo-Interface, Audacity und zwei brauchbare Kassetten. Verbinde den Interface-Ausgang mit LINE IN des Decks und dessen LINE OUT mit dem Line-Eingang des Interfaces. Schalte NR und Signalbearbeitung aus. Wähle für jede Kassette die passende Bandsorteneinstellung und notiere sie.

## Einen kontrollierten Vergleich durchführen

1. Erzeuge in Audacity zehn Sekunden **400-Hz-Sinus** mit **Amplitude 0,1**. Gib dasselbe Signal auf links und rechts aus. Verwende am Deck einen mäßigen, dokumentierten Aufnahmepegel ohne digitale Übersteuerung.
2. Nimm Kassette A hinter dem Vorspannband auf. Spule zurück und erfasse die Wiedergabe, ohne Interface-Verstärkung oder Ausgangsregler des Decks zu ändern.
3. Nimm Kassette B mit derselben Quelle und demselben REC LEVEL auf. Führt das Deck eine automatische Bandeinmessung durch, entscheide zuvor: Vergleichst du eingemessene Bänder oder dieselbe feste Einstellung? Halte diese Bedingung konsequent ein.
4. Teile jede Stereoaufnahme in links und rechts auf. Miss die stabile 400-Hz-Spitze mit identischen Einstellungen in Plot Spectrum und wähle jeweils nur einen Kanal aus.
5. Subtrahiere für jeden Kanal den zurückgemessenen Pegel von Kassette A vom Pegel von Kassette B. Wiederhole einen Abschnitt auf jeder Kassette, um die Stabilität zu prüfen.
6. Bewahre diese Pegelwerte vor jedem Lautheitsausgleich auf. Gleiche die Abhörlautstärke nur bei Kopien an, die du zum Vergleich der Klangfarbe verwendest.

## Ein Ergebnis einordnen

Hypothetisches Beispiel: Kassette A liefert auf demselben Kanal −20 dBFS, Kassette B −18,5 dBFS. Kassette B ist **in diesem Test 1,5 dB empfindlicher**. Daraus folgt nicht, dass sie 1,5 dB mehr Aufnahmepegel verträgt, weniger rauscht oder heller klingt. Dafür sind andere Messungen nötig.

Weichen beide Kanäle unterschiedlich ab, untersuche zunächst die [Kanalbalance](../channel-balance/), bevor du eine gemeinsame Korrektur anwendest. Ändert sich die Differenz bei jedem Durchlauf, probiere einen anderen Bandabschnitt und prüfe Eingangsverstärkung oder Bandkontakt.

Kurzcheck: gleiche Quelle, dokumentierte Bandsorten- und Einmessbedingungen, feste Verstärkung, getrennte Kanäle und keine Normalisierung vor der Messung. Nutze das Ergebnis, um die Kombination aus Deck und Band zu verstehen, und speichere die vollständigen Bedingungen anschließend in einem [Aufnahmeprofil](../recording-profile/).
