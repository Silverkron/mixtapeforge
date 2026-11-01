---
id: "bias-eq-nr"
lang: "de"
title: "Bias, EQ und Rauschunterdrückung: Drei verschiedene Aufgaben"
description: "Aufnahmeverhalten, Klangbalance und Rauschunterdrückung auseinanderhalten."
primaryKeyword: "Bias, EQ und Rauschunterdrückung"
secondaryKeywords: ["Bandtyp","Messanleitung","Wiedergabe-EQ","Kassetten-Bias verstehen und externe Kalibrierregler nutzen"]
searchIntent: "informational"
answer: "BIAS, EQ und NR stehen oft nebeneinander auf dem Gerät, haben aber verschiedene Aufgaben. Alle nach Gehör auf möglichst hellen Klang einzustellen kann eine falsche Grundkonfiguration verdecken."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Harman Kardon · CD301 · HX Pro", "url": "https://support.harmanaudio.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw37931a4e/pdfs/CD%20301%5EHK%5Eom%5E%5E%5E%5E.pdf"}, {"title": "Pioneer · CT-1270WR", "url": "https://c.searspartsdirect.com/doc/L0801128"}, {"title": "Marantz · PMD222", "url": "https://manuals.plus/m/911034fdc965e3cc6270e2dc390788588820521c42e333e7c5607af3154d18de"}]



guideType: "explainer"
prerequisites: []
next: ["playback-equalization", "dolby-b"]
related: ["bias-adjustment", "hx-pro", "cassette-types"]
---

## Drei Regler, drei Aufgaben

- **Bias** ist ein Ultraschallsignal, das bei der Aufnahme die Magnetisierung gleichmäßiger macht. Es ist keine hörbare Höhenanhebung und verändert bei Wiedergabe kein bereits bespieltes Band.
- **Wiedergabe-EQ** ist die standardisierte Entzerrung zum korrekten Auslesen der Aufnahme. Üblich sind 120 µs und 70 µs; die Zahl beschreibt eine Zeitkonstante, keine hörbare Verzögerung.
- **NR** bedeutet Rauschunterdrückung. Dolby B/C/S benötigt die zur Aufnahme passende Wiedergabebetriebsart. Uncodierte Bänder werden ohne NR abgespielt.

Der Bandsortenschalter kann Bias und EQ automatisch gemeinsam wählen. Bei getrennten Reglern eines anderen Decks lassen sich die Einstellungen nicht über die bloße Knopfposition übertragen.

## Eine neue Aufnahme vorbereiten

Du brauchst die Leerkassettenverpackung und das Gerätehandbuch, keinen Analyzer für die vorgesehenen Grundeinstellungen.

1. Ermittle den [Bandtyp](../cassette-types/) und wähle die passende Stellung. Prüfe bei fehlendem Schalter die automatische Erkennung.
2. Lasse den Bias-Feinregler zunächst auf der dokumentierten Ausgangsstellung. Verwende vor Änderungen eine [Messanleitung](../bias-adjustment/).
3. Wähle NR nach dem Zielgerät: Bei Hardware-Dolby-B bleibt Software-NR aus; das Deck verwendet B für Aufnahme und Wiedergabe.
4. Nimm einen bekannten Ausschnitt auf und spiele ihn mit passendem EQ ab. Beurteile Klarheit und Verzerrung.

Bei vorhandenen Aufnahmen spielt Bias keine Rolle: Beginne mit [Wiedergabe-EQ](../playback-equalization/) und dokumentiertem NR. Auch HX Pro arbeitet aufnahmeseitig und braucht keinen Decoder. MixtapeForges Audio-EQ verändert die Quelle; er ersetzt weder Deck-Bias noch normierte Wiedergabeentzerrung.
