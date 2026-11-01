---
id: "frequency-response"
lang: "de"
title: "Messen, wie deine Kassette Bässe, Mitten und Höhen verändert"
description: "Nimm gleich laute Testtöne auf und vergleiche ihre Wiedergabe, um Frequenzgang und Sättigung auseinanderzuhalten."
primaryKeyword: "Messen, wie deine Kassette Bässe, Mitten und Höhen verändert"
secondaryKeywords: ["grundlegenden Aufnahme-Wiedergabe-Test","direkte Interface-Referenz","Höhensättigung","begrenzte EQ-Korrektur"]
searchIntent: "evaluation"
answer: "Der Frequenzgang beschreibt, ob verschiedene Tonhöhen mit demselben relativen Pegel zurückkommen. Eine Kassette, die 1 kHz unverändert wiedergibt, aber 8 kHz abschwächt, kann weniger brillant klingen. Dieser Test misst den gesamten Aufnahme- und Wiedergabeweg, nicht den Wiedergabekopf allein."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: Tongenerator", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: Spektrumanalyse", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "NAK T-100: Mess-Checkliste", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["loopback-round-trip", "bias-adjustment", "recording-profile"]
guideType: "measurement"
prerequisites: ["without-reference-tape"]
next: ["high-frequency-saturation", "eq-limits"]
---

## Eine einfache Testdatei erstellen

Verwende Audacity, ein Stereo-Interface mit Line-Anschlüssen und eine Kassette, die du überschreiben kannst. Erzeuge mit **Generate > Tone** nacheinander jeweils fünf Sekunden Sinuston bei **100, 400, 1000, 4000, 8000 und 10000 Hz**, jeweils mit **Amplitude 0,1**. Die Befehle sind hier auf Englisch angegeben. Lasse kurze Pausen zwischen den Tönen, damit du sie wiedererkennst. Dupliziere die Monofolge auf links und rechts, ohne den Pegel zu ändern. Das sind praktische Vergleichspunkte, kein standardisierter Prüfsweep.

Verbinde die Line-Anschlüsse und deaktiviere NR und Signalbearbeitung wie beim [grundlegenden Aufnahme-Wiedergabe-Test](../without-reference-tape/). Höre nur leise mit; Testtöne sind kein normales Hörprogramm.

## Mit dokumentiertem niedrigem Pegel aufnehmen

1. Lege mit dem 1-kHz-Ton einen mäßigen Referenzpegel auf der Deckanzeige fest. Das Interface darf nicht übersteuern.
2. Senke das erzeugte Signal für die Frequenzgangaufnahme um weitere 20 dB ab. Interface-Verstärkung und REC LEVEL bleiben unverändert. In Audacity liegt eine neue Amplitude von **0,01** genau 20 dB unter 0,1. Notiere den Bezug ausdrücklich: „20 dB unter meinem 1-kHz-Einstellpegel“. Das ist keine absolute Bandflusskalibrierung.
3. Nimm die vollständige Folge hinter dem Vorspannband auf. Stoppe, spule zurück und erfasse die Stereowiedergabe ohne Effekte oder Normalisierung.
4. Teile links und rechts auf. Markiere bei jedem Ton den stabilen Mittelteil und öffne **Analyze > Plot Spectrum** mit Spectrum, Hann und derselben FFT-Größe. Lies die Spitze des jeweiligen Tons ab, nicht das benachbarte Rauschen.
5. Subtrahiere für jeden Kanal dessen 1-kHz-Spitzenwert von den übrigen Spitzenwerten. So erhältst du den Frequenzgang relativ zum mittleren Bezugston. Halte links und rechts getrennt.
6. Wiederhole den Durchlauf. Liegt ein Ton nahe am Rauschboden oder schwankt er stark, kennzeichne das Ergebnis als unsicher, statt daraus eine große Korrektur abzuleiten.

## Den Verlauf verstehen

Hypothetisches Beispiel: 1 kHz kommt mit −35 dBFS zurück, 8 kHz mit −39 dBFS. Der relative Wert bei 8 kHz beträgt **−4 dB**. Dieser Unterschied kann Interface, Aufnahme, Band, Ausrichtung und Wiedergabe enthalten. Eine [direkte Interface-Referenz](../loopback-round-trip/) hilft, einige dieser Einflüsse abzugrenzen.

Gehen bei höherem Aufnahmepegel mehr Höhen verloren, untersuche die [Höhensättigung](../high-frequency-saturation/). Eine Höhenanhebung kann sie verstärken. Ist der Verlust bei wiederholten Messungen mit niedrigem Pegel stabil, prüfe Bandsorteneinstellung und Vormagnetisierung, bevor du eine [begrenzte EQ-Korrektur](../eq-limits/) versuchst.

Kurzcheck: gleiche Ausgangspegel, dokumentierte Absenkung, feste Reglerstellungen, getrennte Kanäle, relativer Bezug auf 1 kHz und mehrere Durchläufe. Schreibe nicht „linear bis 10 kHz“, ohne Toleranz und Aufnahmepegel anzugeben.
