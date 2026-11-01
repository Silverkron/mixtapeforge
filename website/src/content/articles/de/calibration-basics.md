---
id: "calibration-basics"
lang: "de"
title: "Kassettendeck kalibrieren: Zuerst den passenden Test wählen"
description: "Verstehe, was ein Bandtest misst, bereite verlässliche Anschlüsse vor und wähle den nächsten Prüfschritt."
primaryKeyword: "Kassettendeck kalibrieren"
secondaryKeywords: ["welches Kalibrierband für welchen Zweck geeignet ist","Prüfungen ohne Referenzkassette","dem Aufnahmeprofil-Ablauf","Das Audiointerface prüfen, bevor du die Kassette verantwortlich machst"]
searchIntent: "informational"
answer: "Eine Aufnahme kann wegen der Kassette, der Aufnahmeelektronik, der Wiedergabejustage oder sogar der Aufnahmeeinstellungen am Computer dumpf klingen. Kalibrieren bedeutet, ein Ergebnis mit einer bekannten Referenz zu vergleichen und dann den betreffenden Teil abzugleichen. Einen Ton aufzunehmen und abzuspielen ist hilfreich, trennt diese Einflüsse aber nicht vollständig."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100: offizielle Funktionsbeschreibung", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "REW: Audiointerface konfigurieren", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}, {"title": "MRL: Auswahl und Geltungsbereich von Referenzbändern", "url": "https://mrltapes.com/pages/product-guide"}]
related: ["loopback-round-trip", "calibration-tapes", "recording-profile"]
guideType: "explainer"
prerequisites: []
next: ["needs-calibration", "without-reference-tape"]
---

## Welche Frage möchtest du beantworten?

| Deine Frage | Geeigneter Test | Was im Ergebnis steckt |
| --- | --- | --- |
| Verändert mein Interface das Signal? | Direkte Schleifenmessung, Loopback | Ausgang, Kabel und Eingang |
| Nimmt dieses Band auf diesem Deck sauber auf? | Aufnehmen, zurückspulen, abspielen | Interface, Aufnahme, Band und Wiedergabe |
| Stimmt die Wiedergabegeschwindigkeit? | Zertifizierte Geschwindigkeits-Referenzkassette | Wiedergabelaufwerk und Unsicherheit der Referenz |
| Kann ich mein nächstes Mixtape verbessern? | Wiederholbares Aufnahmeprofil | Kompensation für die gemessene Kombination |

Eine **Referenzkassette** enthält ein Signal mit bekannten Aufzeichnungseigenschaften. Eine selbst bespielte Kassette ist keine unabhängige Referenz. Siehe [welches Kalibrierband für welchen Zweck geeignet ist](../calibration-tapes/).

## Einen verlässlichen Ausgangspunkt herstellen

Du brauchst ein funktionierendes Deck, eine überschreibbare Leerkassette, Computer und Interface mit Stereo-Line-Ein- und -Ausgängen. Mikrofoneingänge mit automatischer Verstärkung eignen sich nicht: Sie verändern gerade den Pegel, den du vergleichen möchtest.

1. Verbinde Interface-Ausgänge L/R mit LINE IN L/R des Decks sowie dessen LINE OUT L/R mit den Line-Eingängen. Schalte Software-Eingangsmonitoring aus, damit die Rückführung sich nicht selbst speist.
2. Wähle die tatsächlich angeschlossenen Ports in der Software. Stimme Abtastrate von Software und Interface ab; für erste Prüfungen im Hörbereich reichen 44,1 oder 48 kHz, wenn beide Geräte sie unterstützen.
3. Deaktiviere Dolby/NR, EQ, Kompression und automatische Pegelregelungen. Wähle den passenden Bandtyp.
4. Beginne mit niedrigem Ausgangspegel. Nimm hinter dem transparenten Vorspann eine kurze Probe auf, spule zurück und spiele ab. Reduziere die Eingangsverstärkung bei digitaler Übersteuerung.
5. Wiederhole ohne Regleränderungen. Weichen Ergebnisse deutlich ab, kläre diese Instabilität vor einer Korrektur.

Ein Dreikopfdeck kann während der Aufnahme das Band abhören. Ein Zweikopfdeck benötigt Aufnahme–Rückspulen–Wiedergabe; sein Eingangsmonitor beweist nicht, was auf dem Band ankam.

## Aus einer Beobachtung eine Entscheidung machen

Hypothetisches Beispiel: Beide Durchläufe liefern 2 dB weniger Höhen. Das rechtfertigt eine Untersuchung des gesamten Weges, nicht sofort eine Höhenanhebung um 2 dB. Schwankt der Verlust zwischen Durchläufen, ist fester EQ besonders ungeeignet.

Beginne mit [Prüfungen ohne Referenzkassette](../without-reference-tape/). Für eine wiederverwendbare App-Einstellung folge [dem Aufnahmeprofil-Ablauf](../recording-profile/). MixtapeForge 0.1 bietet einen geführten Aufnahme-Wiedergabe-Test, bestätigt aber weder mechanische Justage noch unabhängig die Wiedergabegeschwindigkeit.
