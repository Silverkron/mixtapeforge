---
id: "bias-adjustment"
lang: "de"
title: "Kassetten-Bias verstehen und externe Kalibrierregler nutzen"
description: "Erfahre, was Bias verändert, warum mehr Höhen nicht automatisch besser sind und wann das Modellhandbuch nötig ist."
primaryKeyword: "Kassetten-Bias verstehen und externe Kalibrierregler nutzen"
secondaryKeywords: ["Frequenzgangtest bei kleinem Pegel","Verzerrungsmessung bei tieferer Frequenz","Sättigung","Bias, EQ und Rauschunterdrückung"]
searchIntent: "informational"
answer: "Bias, auch Vormagnetisierung genannt, ist ein hochfrequentes elektrisches Signal, das das Deck während der Aufnahme erzeugt. Es hilft dem Band, gleichmäßiger auf das Audiosignal zu reagieren. Bias ist kein Computer-EQ; eine Höhenanhebung in Software verändert ihn nicht."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "John G. McKnight: Biasing in Magnetic Tape Recording", "url": "https://cdn.shopify.com/s/files/1/0720/0627/1232/files/mcknight_biasing.pdf?v=1763068428"}, {"title": "NAK T-100: Mess-Checkliste", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["bias-eq-nr", "high-frequency-saturation", "recording-profile"]
guideType: "explainer"
prerequisites: ["frequency-response"]
next: ["distortion-test", "recording-sensitivity"]
---

Bias beeinflusst gleichzeitig den Frequenzgang bei kleinem Pegel, die Aufnahmeempfindlichkeit und die Verzerrung. Nur nach maximaler Helligkeit einzustellen kann deshalb die Aufnahme insgesamt verschlechtern.

## Welche Regler vorhanden sind

Manche Decks kalibrieren automatisch, andere haben einen externen Bias-Regler oder ein Testtonsystem für Benutzer. Viele bieten gar keine Benutzereinstellung. Lies zuerst die Anleitung deines Modells. Öffne das Deck nicht und verstelle keine internen Trimmer nach einer allgemeinen Anleitung.

Bei automatischer Kalibrierung verwende die Kassette, die du aufnehmen möchtest, und folge der vorgeschriebenen Vorbereitung. Scheitert der Vorgang wiederholt bei einem Band, probiere zunächst eine andere intakte Kassette.

## Eine externe Bias-Einstellung sicher vergleichen

Bei einem Benutzer-Biasregler brauchst du eine überschreibbare Kassette, die üblichen Line-Verbindungen, NR aus und den [Frequenzgangtest bei kleinem Pegel](../frequency-response/).

1. Fotografiere oder markiere die ursprüngliche Reglerstellung. Erstelle eine Ausgangsaufnahme und bewahre deren Rücklauf auf.
2. Halte dich an Testtöne, Aufnahmepegel und Reihenfolge des Deck-Handbuchs. Computer-Ausgang und Eingangsverstärkung bleiben fest.
3. Ändere nur einen kleinen, rückgängig machbaren Schritt innerhalb des Benutzer-Regelbereichs. Notiere die Stellung zum nächsten Testabschnitt.
4. Vergleiche nach der Wiedergabe sowohl Höhenwiedergabe als auch eine [Verzerrungsmessung bei tieferer Frequenz](../distortion-test/). Entscheide nicht allein nach der hellsten Kurve.
5. Kehre bei instabilen Ergebnissen oder fehlendem Vorteil zur Ausgangsstellung zurück. Prüfe Musik bei vorgesehenem Aufnahmepegel, bevor du ein Profil speicherst.

## Was „Overbias“ bedeutet

Bei einem Overbias-Verfahren sucht ein Techniker das Maximum des zurückgelesenen Testtons. Anschließend erhöht er Bias darüber hinaus, bis der Pegel um den für Deck, Band und Methode vorgeschriebenen Betrag abfällt. Frequenz und Abfall sind nicht universell.

Ein hypothetisches Beispiel: „Bias erhöhen, bis der Testton 1,5 dB unter seinem Maximum liegt“ bezeichnet eine Änderung des zurückgelesenen Pegels, nicht eine Änderung der Computerlautstärke um 1,5 dB. Das ist eine Erklärung, keine empfohlene Kassetteneinstellung.

## Scheinbare Verbesserungen erkennen

Mehr Höhen mit mehr Verzerrung sind ein Kompromiss, nicht automatisch bessere Kalibrierung. Leiden nur laute Höhen, prüfe zuerst [Sättigung](../high-frequency-saturation/). Ändert sich der Frequenzgang bei Wiederholungen, untersuche Band und Laufwerk.

Notiere Bandbezeichnung, Reglerstellung und Bedingungen der Frequenzgang- und Verzerrungsmessung. MixtapeForge kann Aufnahmebedingungen speichern und begrenzte digitale Korrekturen vorschlagen; den Bias-Oszillator des Decks kann es nicht fernsteuern.
