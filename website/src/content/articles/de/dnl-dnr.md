---
id: "dnl-dnr"
lang: "de"
title: "DNL und DNR: Rauschminderung ohne Aufnahmeencoder"
description: "Wiedergabebearbeitung verstehen und weniger Rauschen von korrekter Decodierung unterscheiden."
primaryKeyword: "DNL und DNR"
secondaryKeywords: ["Dolby-Decoder","NR-Softwareübersicht","Brummen oder Summen","Dolby B erklärt"]
searchIntent: "informational"
answer: "DNL und DNR vermindern Wiedergaberauschen, ohne dass die Kassette zuvor speziell codiert werden muss. Sie verändern abhängig vom Signal den Wiedergabefrequenzgang und machen Höhenrauschen weniger auffällig. Sie ersetzen keinen zur Aufnahme passenden Dolby-Decoder."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Philips · N2510 · 1973", "url": "https://www.worldradiohistory.com/Archive-All-BC/Archive-All-Audio/Archive-Studio-Sound/70s/Studio-Sound-1973-12.pdf"}, {"title": "Texas Instruments · LM1894", "url": "https://www.ti.com/product/LM1894"}]



guideType: "explainer"
prerequisites: []
next: ["dolby-b-c-s-playback"]
related: ["dolby-b", "software-noise-reduction", "tape-hiss-snr"]
---

DNL und DNR vermindern Wiedergaberauschen, ohne dass die Kassette zuvor speziell codiert werden muss. Sie verändern abhängig vom Signal den Wiedergabefrequenzgang und machen Höhenrauschen weniger auffällig. Sie ersetzen keinen zur Aufnahme passenden [Dolby-Decoder](../dolby-b/).

## Den Kompromiss hören

Ein Becken klingt leise ins Rauschen aus. Eine Begrenzung der Höhen kann das Rauschen verdecken, aber auch den hörbaren Beckenausklang verkürzen. Gesucht wird ein sinnvoller Hörkompromiss, keine Wiederherstellung verlorener Information.

Texas Instruments beschreibt DNR beim [LM1894](https://www.ti.com/product/LM1894) als nichtkomplementäres Verfahren: Ein Encoder ist nicht nötig. DNL ist eine andere Umsetzung; ähnliche Namen bedeuten nicht gleiche Regler oder Ergebnisse.

## Ohne Verlust des Originals testen

Du brauchst einen Player mit dokumentiertem DNL/DNR und eine bekannte Kassette. Bewahre bei Software-Restaurierung den unveränderten Transfer und arbeite an einer Kopie.

1. Stelle zuerst die richtige Wiedergabeentzerrung und gegebenenfalls den passenden Dolby-Decoder ein.
2. Höre leise Stimmen oder akustische Instrumente mit DNL/DNR aus. Achte auf Konsonanten und Nachhall, nicht nur auf Pausen.
3. Schalte die dokumentierte Funktion ein und wiederhole dieselbe Passage bei ähnlicher Lautstärke.
4. Wähle bei einstellbarer Stärke den kleinsten hilfreichen Eingriff. Bei einem Ein/Aus-Schalter lasse ihn aus, wenn der Detailverlust schwerer wiegt als das geringere Rauschen.

Eine ruhigere Pause mit verschwundenen Musikdetails ist ein Kompromiss, keine höhere Wiedergabetreue. Pulsiert der Hintergrund störend, reduziere oder umgehe die Bearbeitung.

MixtapeForge enthält kein DNL/DNR. Moderne Entrauscher können einen ähnlichen Zweck erfüllen, sind aber nicht automatisch Nachbildungen dieser Schaltungen. Die [NR-Softwareübersicht](../software-noise-reduction/) erklärt die Unterschiede. Notiere Decoder, zusätzliche Entrauschung und Hörpräferenz getrennt.

Elektrisches [Brummen oder Summen](../hum-buzz/) erfordert eine Verbindungsprüfung statt eines Höhenbegrenzungsversuchs.
