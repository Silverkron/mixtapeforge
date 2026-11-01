---
id: "high-frequency-saturation"
lang: "de"
title: "Warum laute Höhen auf Band verschwinden: vor dem EQ messen"
description: "Vergleiche leise und lautere Höhentöne, um pegelabhängige Verluste von einer festen Frequenzgangabweichung zu unterscheiden."
primaryKeyword: "Warum laute Höhen auf Band verschwinden"
secondaryKeywords: ["Frequenzgangtest","maximale Ausgangspegel bei tieferen Frequenzen","Bandreserve bei einer festgelegten Verzerrungsgrenze abschätzen","Kassettenverzerrung messen, ohne sie mit Rauschen zu verwechseln"]
searchIntent: "evaluation"
answer: "Magnetband kann steigende Höhenpegel nicht mehr proportional aufzeichnen, lange bevor eine digitale Anzeige übersteuert. Das ist Hochtonsättigung: Mehr Eingangssignal erzeugt keinen entsprechend höheren aufgezeichneten Pegel. Becken verlieren Klarheit, obwohl die Aufnahme laut genug wirkt."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: Tongenerator", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: Spektrumanalyse", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "Anaxwaves: Aussteuerungsreserve des Bands ermitteln", "url": "https://www.anaxwaves.com/MixtapeNerd/Docs/DetermineHeadroom.html"}]
related: ["maximum-output-level", "distortion-test", "bias-adjustment"]
guideType: "measurement"
prerequisites: ["frequency-response"]
next: ["recording-levels", "eq-limits"]
---

## Einen kurzen Vergleich vorbereiten

Verwende dieselben Line-Verbindungen, ausgeschaltete Rauschunterdrückung und Audacity-Messmethode wie beim [Frequenzgangtest](../frequency-response/). Du brauchst eine überschreibbare Kassette und zwei kurze Tonpaare: jeweils fünf Sekunden 1 kHz, gefolgt von fünf Sekunden 8 kHz. Beide Kanäle erhalten identische Signale.

Lautsprecher und Kopfhörer sehr leise stellen oder stummschalten. Du prüfst die Aufnahme, nicht dein Gehör oder die Hochtöner. Moderate Pegel genügen; das Deck muss nicht maximal ausgesteuert werden.

## Zwei Aufnahmepegel vergleichen

1. Erzeuge das erste Tonpaar mit Amplitude **0,01**, das zweite mit **0,02**. Die doppelte Amplitude entspricht ungefähr 6 dB mehr.
2. Stelle einen vorsichtigen Aufnahmepegel ein und prüfe die Reserve am Aufnahmeeingang des Interfaces. REC LEVEL, Interface-Ausgang und Eingangsverstärkung bleiben für beide Paare unverändert.
3. Nimm zuerst das leise, dann das lautere Paar im selben Bandabschnitt auf. Spule zurück und erfasse die gesamte Wiedergabe ohne Normalisierung oder Bearbeitung.
4. Trenne in Audacity die Stereokanäle und miss die stabile Mitte jedes Tons mit der Spektrumanalyse bei unveränderten Einstellungen.
5. Berechne den Pegelanstieg des zurückgelesenen 1-kHz-Tons und anschließend den des 8-kHz-Tons. Wiederhole den Test vor der Bewertung.

## Was ein zu geringer Anstieg bedeutet

Ein hypothetisches Beispiel: Die Verdoppelung am Eingang erhöht den 1-kHz-Rücklauf um 5,8 dB, den 8-kHz-Rücklauf aber nur um 3 dB. Die Höhen folgen dem Eingang nicht mehr proportional. Das deutet auf eine pegelabhängige Begrenzung in der Signalkette hin; schließe vorher Übersteuerung von Quelle, Interface und Deck-Eingang aus.

Steigen beide Frequenzen um ungefähr 6 dB, während 8 kHz in beiden Versuchen relativ zu 1 kHz um 3 dB niedriger bleiben, spricht das eher für eine stabile Frequenzgangabweichung als für Sättigung bei diesen Pegeln.

## Die nächste Änderung

Nimm dieselbe Musikstelle leiser auf. Werden die Becken wieder klarer, behalte diese Reserve, statt die Höhen anzuheben. Vergleiche eine andere Kassette und gegebenenfalls die dokumentierten externen Kalibrierregler des Decks.

Bei leisem Signal kann Rauschen den Ton verdecken. Verwechsle den Rauschboden nicht mit einem Sättigungsplateau. Ändert sich das Ergebnis bei jeder Wiedergabe, prüfe zuerst den Bandkontakt.

Prüfliste: bekannter Eingangssprung von 6 dB, feste Regler, unverzerrte Erfassung, zwei Frequenzen, wiederholbares Ergebnis. Der [maximale Ausgangspegel bei tieferen Frequenzen](../maximum-output-level/) beschreibt eine andere Eigenschaft und sagt nicht alles über Höhen aus.
