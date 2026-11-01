---
id: "maximum-output-level"
lang: "de"
title: "Bandreserve bei einer festgelegten Verzerrungsgrenze abschätzen"
description: "Ermittle den Band-Ausgangspegel nahe einer definierten Grenze der dritten Harmonischen und übertrage ihn vorsichtig auf Musik."
primaryKeyword: "Bandreserve bei einer festgelegten Verzerrungsgrenze abschätzen"
secondaryKeywords: ["Verzerrungsmessung","Hochtonsättigung","Aufnahmeempfindlichkeit verschiedener Bänder bei festen Einstellungen vergleichen","Bandrauschen im Verhältnis zum aufgenommenen Signal messen"]
searchIntent: "evaluation"
answer: "Der maximale Ausgangspegel, kurz MOL, ist nur zusammen mit Frequenz, Verzerrungskriterium und Referenz aussagekräftig. Er bezeichnet den vom Band zurückgelesenen Pegel, nicht die mögliche Stellung von REC LEVEL. Häufig wird für Bandvergleiche eine Grenze der dritten Harmonischen verwendet; unterschiedliche veröffentlichte Verfahren sind trotzdem nicht automatisch vergleichbar."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Anaxwaves: Aussteuerungsreserve des Bands ermitteln", "url": "https://www.anaxwaves.com/MixtapeNerd/Docs/DetermineHeadroom.html"}, {"title": "NAK T-100: offizielle Spezifikationen", "url": "https://anaxwaves.com/NAKT100/"}]
related: ["recording-sensitivity", "tape-hiss-snr", "eq-limits"]
guideType: "measurement"
prerequisites: ["distortion-test"]
next: ["high-frequency-saturation", "recording-levels"]
---

## Vor dem Start

Führe zuerst die [Verzerrungsmessung](../distortion-test/) durch. Du brauchst NAK T-100, eine überschreibbare Kassette und Stereo-Line-Verbindungen. NR bleibt aus, die Bandsorte muss richtig gewählt sein. Höre sehr leise ab. Dieser Vergleich setzt Messkenntnisse voraus: Wird die gewählte Verzerrungsgröße nicht eindeutig angezeigt, bezeichne das Ergebnis nicht als MOL nach diesem Kriterium.

## Eine lokale Reserve ermitteln

1. Wähle **400 Hz** und **HD3**. Zeichne eine moderate Referenz auf und notiere deren zurückgelesenen Pegel für L/R. Definiere sie als lokale 0 dBr: Dezibel relativ zu dieser Referenz.
2. Halte Wiedergabeausgang und Interface-Eingangsverstärkung konstant. Prüfe, dass sowohl Referenz als auch spätere lautere Rückläufe unter der Clippinggrenze bleiben.
3. Erhöhe die Aufnahmeaussteuerung in kleinen dokumentierten Schritten und zeichne jeweils einen kurzen Abschnitt auf. Bei zwei Köpfen zurückspulen und wiedergeben; bei drei Köpfen Tape-Monitoring verwenden.
4. Lies Grundtonpegel und HD3 je Kanal ab. Erhöhe nicht weiter, sobald die gewählte Grenze erreicht ist oder die Signalkette übersteuert. Beim beispielhaften Kriterium **3 % HD3** dürfen 3 % THD+N nicht ersatzweise verwendet werden.
5. Wiederhole die beiden Stufen beiderseits der Grenze. Gib einen Bereich an, wenn die Schrittweite keine genaue Bestimmung erlaubt. Bewahre beide Kanalwerte getrennt auf.
6. Berechne den zurückgelesenen Pegel am Grenzkriterium relativ zur aufgezeichneten Referenz. Speichere Frequenz, Kassette und Methode dazu.

## Was die Zahl aussagt

Hypothetisches Beispiel: Ein Kanal erreicht 3 % HD3 bei +4 dBr, der andere bei +3 dBr. Nach dieser lokalen Methode liegt die ungefähre Grenze des schwächeren Kanals bei 3 dB. Das entspricht erst dann einer Hersteller-MOL-Angabe, wenn auch Referenzbandfluss, Bias und Messbedingungen übereinstimmen.

Clippt das Interface zuerst, hast du dessen Grenze gemessen. Senke den Eingangspegel und wiederhole Referenz und Vergleichsstufen. Sind bereits niedrige Pegel vom Rauschen dominiert, verbessere zuerst den Messweg.

## Auf Musik übertragen

Ein gleichmäßiger tieferer Ton sagt nicht voraus, wie Becken aufgenommen werden. Prüfe [Hochtonsättigung](../high-frequency-saturation/) getrennt und lasse Reserve für Musikspitzen. Kleinere Spitzen können klarer klingen; starke Kompression verändert jedoch die Musik.

Prüfliste: dokumentierte Frequenz, HD3 von THD+N getrennt, lokale Referenz gespeichert, Eingangsreserve geprüft und schwächerer Kanal berücksichtigt. Schätzwerte aus MixtapeForge sind keine zertifizierte MOL-Messung.
