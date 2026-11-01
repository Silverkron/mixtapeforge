---
id: "tape-hiss-snr"
lang: "de"
title: "Bandrauschen im Verhältnis zum aufgenommenen Signal messen"
description: "Miss Referenzton und aufgezeichnete Stille bei gleichem Gain, um einen sinnvollen Signal-Rausch-Vergleich zu erhalten."
primaryKeyword: "Bandrauschen im Verhältnis zum aufgenommenen Signal messen"
secondaryKeywords: ["NAK-Anleitung","Dolby B","Kassettenverzerrung messen, ohne sie mit Rauschen zu verwechseln","Dolby B erklärt"]
searchIntent: "evaluation"
answer: "Eine Rauschanzeige allein sagt nicht, ob eine Kassette leise ist. Der Signal-Rausch-Abstand, kurz SNR, vergleicht ein definiertes Nutzsignal mit dem darunterliegenden Rauschen. Eine geringere Wiedergabelautstärke senkt beides und verbessert den SNR nicht."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "REW: Spektrum, RMS-Pegel und Verzerrung", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/spectrum.html"}, {"title": "NAK T-100: offizielle Spezifikationen", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "NAK T-100: Mess-Checkliste", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["distortion-test", "dolby-b", "calibration-software"]
guideType: "measurement"
prerequisites: ["without-reference-tape"]
next: ["recording-levels"]
---

## Zwei Abschnitte bei gleichen Einstellungen vorbereiten

Du brauchst eine leere Kassette, ein Stereo-Line-Interface und die Live-RTA von REW für die Pegelwerte. Dieses Verfahren misst direkt am Deck; eine zusätzliche WAV-Aufnahme ist als Beleg möglich. Verbinde Interface-Ausgang → Deck LINE IN und LINE OUT → Interface-Line-Eingang. Deaktiviere automatische Pegelregelung, NR und Bearbeitung. Quelle, Deck und Erfassungsregler bleiben unverändert.

Erzeuge einen kurzen **1-kHz-Sinus** bei einem moderaten, dokumentierten Deck-Pegel. Danach folgen mindestens zehn Sekunden digitale Stille, während das Deck weiter aufnimmt. So erfasst du das tatsächliche Rauschen des Lösch-, Bias- und Aufnahmevorgangs. Unbespieltes Band oder ein gestopptes Deck sind andere Messbedingungen.

## Signal und Rauschen messen

1. Nimm Ton und Stille auf, stoppe und spule vor den Ton zurück. Das Deck bleibt beim Vorbereiten von REW gestoppt.
2. Wähle in REW einen Eingangskanal und öffne **RTA**. Verwende eine dBFS-Anzeige. Starte den Analysator über seine Aufnahmesteuerung und beobachte **Input RMS**: die mittlere Signalenergie, nicht kurzzeitige Spitzen.
3. Starte PLAY am Deck. Lies die stabile Mitte des Referenztons ab. Notiere den unbewerteten RMS-Wert sowie Analysebandbreite und Filtereinstellungen.
4. Miss die Mitte der aufgezeichneten Stille mit demselben Kanal, Gain, Frequenzbereich und unbewerteten RMS-Verfahren. Meide den Übergang zwischen Ton und Stille.
5. Ziehe den Rauschpegel vom Signalpegel ab. Wiederhole das für den anderen Kanal und einen weiteren stillen Abschnitt.
6. Nutzt du zusätzlich A-Bewertung, notiere den entsprechend bewerteten Referenz- und Rauschwert als eigenes Ergebnis. Die Bewertung gewichtet Frequenzen unterschiedlich; vermische bewertete und unbewertete Zahlen nicht.

## Ein Rechenbeispiel

Hypothetische Werte: Ton **−18 dBFS RMS**, Rauschen **−70 dBFS RMS**. Der Abstand beträgt unter diesen Einstellungen **52 dB**. Er ist nicht automatisch mit einer auf maximalen Ausgangspegel bezogenen oder anders bewerteten Spezifikation vergleichbar.

NAK T-100 bietet Noise-A, dessen Skalenversätze berücksichtigt werden müssen. Nutze die [NAK-Anleitung](../nak-t100-practical-guide/), statt die Rauschanzeige unmittelbar als positiven SNR zu lesen.

## Überraschende Werte untersuchen

Ändert sich das Rauschen mit Bildschirm oder Ladegerät, prüfe elektrische Störungen. Enthält die „Stille“ Musik, kontrolliere, ob der Abschnitt vollständig überspielt wurde. Wurde der Eingangs-Gain verändert, wiederhole beide Messungen. Eine zusätzliche WAV-Datei sollte beide Abschnitte unbearbeitet und ohne Normalisierung enthalten.

Prüfliste: aufgezeichnete Stille, definierte Signalreferenz, gleicher Gain, passende RMS-/Bewertungs-/Bandbreiteneinstellungen und beide Kanäle. Prüfe [Dolby B](../dolby-b/) getrennt mit passender Codierung und Decodierung; nur Wiedergabe-NR umzuschalten untersucht etwas anderes.
