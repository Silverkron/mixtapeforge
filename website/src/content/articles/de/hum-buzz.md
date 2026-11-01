---
id: "hum-buzz"
lang: "de"
title: "Brummen bei Kassettenaufnahmen: Den Signalweg prüfen"
description: "Quelle, Kabel, Interface und Deck untersuchen, bevor Störgeräusche gefiltert werden."
primaryKeyword: "Brummen bei Kassettenaufnahmen"
secondaryKeywords: ["Bandrauschen","Loopback-Test","Bandrauschen im Verhältnis zum aufgenommenen Signal messen","Eine Kassette vom Computer aufnehmen"]
searchIntent: "diagnosis"
answer: "Brummen ist ein gleichmäßiger tiefer Ton; Summen kann schärfere Obertöne enthalten. Anders als breitbandiges Bandrauschen kann es durch elektrische Einstreuung oder Geräteverbindungen entstehen. Vor der Aufnahme beseitigen ist besser als die fertige Kassette zu filtern."
category: "troubleshooting"
image: "portable"
updated: "2026-11-01"
sources: [{"title": "Focusrite · Brummen und Rauschen", "url": "https://support.focusrite.com/hc/en-gb/articles/211615185-Why-is-there-unwanted-hum-noise-in-my-monitors"}, {"title": "Sony · ICD-PX470", "url": "https://helpguide.sony.net/icd/p47/v1/en2/contents/TP0001155787.html"}]

guideType: "troubleshooting"
prerequisites: []
next: ["loopback-round-trip"]
related: ["tape-hiss-snr", "recording-computer", "quiet-channel"]
---

Brummen ist ein gleichmäßiger tiefer Ton; Summen kann schärfere Obertöne enthalten. Anders als breitbandiges [Bandrauschen](../tape-hiss-snr/) kann es durch elektrische Einstreuung oder Geräteverbindungen entstehen. Vor der Aufnahme beseitigen ist besser als die fertige Kassette zu filtern.

## Den Eintrittspunkt finden

Du brauchst Kopfhörer und ein kurzes gutes Audiokabel. Senke die Lautstärke und stoppe vor dem Umstecken. Entferne niemals den Schutzleiter und verändere keine Netzstecker.

1. Höre die Quelle über das Interface bei abgezogenen Audiokabeln des Decks. Bleibt das Geräusch, untersuche zuerst Computer und Interface.
2. Verbinde nur den Aufnahmeweg: Interface-Line-Ausgänge zu Deck-LINE-IN. Die LINE-OUT-Rückleitung bleibt für den Test getrennt.
3. Tritt Brummen auf, verlege Audiokabel weg von Netzteilen und teste das gute Ersatzkabel. Der Gain bleibt unverändert.
4. Teste einen Laptop kurz im Akkubetrieb mit normal abgezogenem Ladegerät. Eine Verbesserung weist auf einen Versorgungs-/Verbindungsanteil hin, beweist aber keinen bestimmten Defekt.
5. Verbinde die Rückleitung nur bei Bedarf. Erzeugt sie Brummen, kann eine **Masseschleife** entstehen: ein unerwünschter elektrischer Pfad zwischen Geräten. Prüfe die Verkabelung und nötigenfalls eine geeignete Line-Pegel-Isolierung.

## Das Ergebnis richtig einordnen

Ein symmetrischer Interface-Ausgang an unsymmetrischem Cinch wird durch ein anderes Kabel nicht vollständig symmetrisch. Nutze die Herstellerbeschaltung. Der [Focusrite-Leitfaden](https://support.focusrite.com/hc/en-gb/articles/211615185-Why-is-there-unwanted-hum-noise-in-my-monitors) erklärt die Zusammenhänge.

Brummt das Deck im eigenen Kopfhörer ohne externe Audiokabel oder steckt das Brummen bereits in der Aufnahme, sind das andere Fälle. Dolby ersetzt keine elektrische Fehlersuche. Wiederhole nach einer Änderung denselben kurzen Mitschnitt und vergleiche Pausen bei gleichem Gain. Ein [Loopback-Test](../loopback-round-trip/) zeigt die Ausgangsbasis des Interfaces.
