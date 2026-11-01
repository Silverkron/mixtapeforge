---
id: "playback-speed-problems"
lang: "de"
title: "Kassetten laufen zu schnell oder langsam: Was prüfen?"
description: "Konstanten Geschwindigkeitsfehler, Bandschwergang und instabilen Lauf unterscheiden."
primaryKeyword: "Kassetten laufen zu schnell oder langsam"
secondaryKeywords: ["schwankende Tonhöhe","Geschwindigkeitsmessung","Wow und Flutter","Gleichlaufschwankungen eines Kassettendecks messen"]
searchIntent: "diagnosis"
answer: "Läuft eine Kassette dauerhaft zu schnell, steigt die Tonhöhe und die Musik wird kürzer. Zu langsamer Lauf senkt die Tonhöhe und verlängert sie. Das ist etwas anderes als schwankende Tonhöhe. Kläre den Unterschied vor einer Motorsuche."
category: "troubleshooting"
image: "portable"
updated: "2026-11-01"
sources: [{"title": "Sony · 00027611", "url": "https://www.sony.com/electronics/support/audio-video-audio-components/tc-w530/articles/00027611"}, {"title": "Anaxwaves · NAK T-100", "url": "https://www.anaxwaves.com/NAKT100/"}]

guideType: "troubleshooting"
prerequisites: []
next: ["speed-test"]
related: ["wobbly-playback", "wow-flutter", "calibration-tapes"]
---

Läuft eine Kassette dauerhaft zu schnell, steigt die Tonhöhe und die Musik wird kürzer. Zu langsamer Lauf senkt die Tonhöhe und verlängert sie. Das ist etwas anderes als [schwankende Tonhöhe](../wobbly-playback/). Kläre den Unterschied vor einer Motorsuche.

## Ohne Öffnen prüfen

Du brauchst eine bekannte Aufnahme, das Handbuch und bei tragbaren Geräten frische Batterien oder das vorgeschriebene Netzteil. Stoppuhr und Originalquelle helfen, ersetzen aber kein Geschwindigkeits-Referenzband.

1. Prüfe normale Wiedergabegeschwindigkeit und die Mittelstellung eines vorhandenen Pitch-Reglers. Vergleiche nicht unterschiedliche Schnitte, Remaster oder Aufführungen als identische Aufnahme.
2. Spiele dieselbe bekannte und eine zweite gute Kassette. Notiere, ob beide gleichbleibend zu hoch/tief klingen oder währenddessen schwanken.
3. Wiederhole beim Batteriegerät mit frischen Batterien. Prüfe normalen Bandlauf und stoppe bei Schwergängigkeit oder Bandsalat.
4. Vergleiche wenn möglich auf einem zweiten guten Deck. Eine dort ebenfalls falsche Einzelkassette kann falsch aufgenommen sein; alle Bänder nur auf einem Player falsch richten den Verdacht auf diesen.
5. Nutze für eine Messung ein Referenzband mit dokumentiertem 3.000- oder 3.150-Hz-Ton und die [Geschwindigkeitsmessung](../speed-test/).

## Den Wert verstehen

Wird eine zertifizierte 3.000-Hz-Referenz mit 3.030 Hz wiedergegeben, ergibt sich +1 %: `(3030 / 3000 − 1) × 100`. Das ist ein Rechenbeispiel, keine hier ausgeführte Messung. Nutze die auf dem Band angegebene Frequenz; 3.000 mit 3.150 zu verwechseln erzeugt einen großen Scheinfehler.

Einen eigenen Ton auf demselben Deck aufzunehmen und abzuspielen bestimmt keine absolute Geschwindigkeit: ähnliche Fehler können sich aufheben. Verstelle interne Motortrimmer nicht nach Gehör. Prüfe nach fachgerechter Einstellung separat [Wow und Flutter](../wow-flutter/); richtiger Mittelwert garantiert keinen stabilen Lauf.
