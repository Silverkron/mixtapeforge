---
id: "wow-flutter"
lang: "de"
title: "Gleichlaufschwankungen eines Kassettendecks messen"
description: "Erfasse einen Referenzton, wähle das passende Messverfahren und dokumentiere Gleichlaufschwankungen nachvollziehbar."
primaryKeyword: "Gleichlaufschwankungen eines Kassettendecks messen"
secondaryKeywords: ["mittlere Geschwindigkeit","Geschwindigkeitsprobleme","Das richtige Kalibrierband für deinen Test auswählen","NAK T-100"]
searchIntent: "evaluation"
answer: "Wow bezeichnet langsame Tonhöhenschwankungen, Flutter schnellere Schwankungen, die lang gehaltene Töne rau klingen lassen können. Beide entstehen durch Änderungen der Wiedergabegeschwindigkeit. Eine gleichmäßig zu hohe Geschwindigkeit lässt Musik höher klingen, ohne zwangsläufig starke Gleichlaufschwankungen zu verursachen. Miss beides getrennt."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100: offizielle Funktionsbeschreibung", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "NAK T-100: Mess-Checkliste", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["calibration-tapes", "nak-t100-practical-guide", "different-decks"]
guideType: "measurement"
prerequisites: ["speed-test"]
next: ["playback-speed-problems"]
---

## Ausrüstung und Vorbereitung

Du brauchst NAK T-100, ein Audiointerface mit Line-Eingängen und eine dokumentierte **3000- oder 3150-Hz-Messkassette für Geschwindigkeit und Gleichlauf**. Ihre eigenen Restschwankungen müssen für das zu prüfende Deck ausreichend gering sein. Verbinde LINE OUT L/R des Decks mit LINE IN L/R des Interfaces, wähle die tatsächlichen Eingänge und deaktiviere Signalbearbeitung und automatische Pegelregelung.

Prüfe zuerst die [mittlere Geschwindigkeit](../speed-test/). Halte die Abhörlautstärke niedrig: Der Test verwendet einen anhaltenden hohen Ton.

## Ein Messverfahren konsequent verwenden

1. Wähle in NAK T-100 **Speed Wow/Flutter** und stelle **Speed Cal.** passend zur Messkassette ein.
2. Spiele einen stabilen Abschnitt ab und stelle den Eingangspegel so ein, dass das Signal deutlich und unverzerrt erfasst wird. Besitzt das Deck einen Monitorschalter, wähle Tape.
3. Wähle den Detektor passend zur Spezifikation, mit der du vergleichen möchtest. Der Entwickler nennt **Q-PK** in Verbindung mit DIN 45507, **WRMS** mit JIS sowie unbewertete Spitzenwert- und RMS-Verfahren. Eine bewertete Messung gewichtet bestimmte Schwankungsgeschwindigkeiten stärker; der Detektor bestimmt, wie wechselnde Werte zusammengefasst werden.
4. Beobachte nach dem Anlaufen etwa dreißig Sekunden lang. Notiere neben dem Prozentwert auch Detektor, Bewertung, Anzeigebereich und Beobachtungsdauer. Erreicht die Anzeige ihre Grenze, ändere zuerst Meter Range.
5. Wiederhole denselben Abschnitt und einen weiteren geeigneten Abschnitt. Dokumentiere einzelne Ausreißer getrennt vom üblichen Wert, statt nur eine besonders günstige Zahl auszuwählen.
6. Speichere die unbearbeitete Tonaufnahme, sofern dein Aufnahmeprogramm dies ermöglicht. Für einen Vergleich im Service sind ein Verlauf oder wiederholte Beobachtungen neben dem Einzelwert hilfreich.

## Ergebnisse fair vergleichen

Hypothetisches Beispiel: **0,08 % WRMS** und **0,15 % Q-PK** können dasselbe Laufwerk mit unterschiedlichen Verfahren beschreiben. Der höhere Wert beweist keine schlechtere Leistung. Vergleiche nur bei gleichem Detektor, gleicher Bewertung, Messkassette und Dauer.

Ein selbst aufgenommener Ton kann mangelnde Wiederholbarkeit zeigen. Er enthält jedoch die Schwankungen von Aufnahme und Wiedergabe zusammen. Anders als ein geeignetes Referenzband isoliert er die Wiedergabeleistung nicht.

## Wenn die Kurve springt

Ein Ausschlag kann durch eine beschädigte Bandstelle, schlechten Bandkontakt, eine Laufwerksstörung oder einen Aussetzer bei der digitalen Aufnahme entstehen. Spiele dieselbe Stelle erneut ab: Wiederholt sich der Ausschlag an derselben Bandposition, spricht das für eine bandbezogene Ursache. Zufällige digitale Lücken sprechen dafür, Puffer und Rechnerauslastung zu prüfen. Keine dieser Beobachtungen identifiziert allein ein defektes Bauteil.

Kurzcheck: bekannter Ton, keine Übersteuerung, vergleichbares Verfahren, wiederholte Abschnitte und dokumentierte Referenz. EQ und Rauschunterdrückung beheben keine Gleichlaufschwankungen. Untersuche [Geschwindigkeitsprobleme](../playback-speed-problems/), bevor du ein Aufnahmeprofil erstellst.
