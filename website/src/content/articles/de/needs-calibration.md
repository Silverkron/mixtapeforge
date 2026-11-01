---
id: "needs-calibration"
lang: "de"
title: "Muss dein Kassettendeck abgeglichen werden? Ein erster Praxistest"
description: "Unterscheide schlechte Kassetten, falsche Einstellungen und wiederholbare Geräteprobleme vor einem Abgleich."
primaryKeyword: "Muss dein Kassettendeck abgeglichen werden? Ein erster Praxistest"
secondaryKeywords: ["den wiederholbaren Messaufbau","der Kanalbalance-Test","eine Geschwindigkeits-Referenzkassette","Warum eine Kassette auf einem anderen Deck anders klingt"]
searchIntent: "diagnosis"
answer: "Eine enttäuschende Kassette genügt nicht, um ein falsch justiertes Deck festzustellen. Diese Prüfung hilft dir zu entscheiden, ob eine Einstellung geändert, ein Band ersetzt oder belastbare Hinweise für eine Wartung gesammelt werden sollten."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100: Mess-Checkliste", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "REW: Audiointerface konfigurieren", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}]
related: ["different-decks", "channel-balance", "speed-test"]
guideType: "troubleshooting"
prerequisites: ["calibration-basics"]
next: ["without-reference-tape"]
---

## Einen fairen Vergleich vorbereiten

Verwende eine vertraute, bespielte Kaufkassette in gutem Zustand, zwei brauchbare Leerkassetten und eine kurze Musikdatei mit Gesang und Becken. Die Kaufkassette ist eine Hörreferenz aus dem Alltag, kein zertifiziertes Kalibrierband. Halte die Lautstärke mäßig und fotografiere die Regler vor Änderungen.

## Diese Prüfungen der Reihe nach durchführen

1. Spiele die vertraute Kassette ab. Wähle das bei ihrer Aufnahme verwendete NR und den richtigen Wiedergabe-Bandtyp. Achte auf schwankende Tonhöhe, zeitweise fehlende Höhen oder einen dauerhaft leiseren Kanal.
2. Spiele die Musikdatei direkt über deinen normalen Ausgang ab. Ist derselbe Fehler hörbar, untersuche zuerst Quelle oder Signalführung.
3. Nimm auf dem ersten Leerband dreißig Sekunden mit ausgeschaltetem NR und zurückhaltendem Pegel auf. Spule zurück und spiele ebenfalls ohne NR ab. Vergleiche bei ähnlicher Lautstärke; leiser wirkt häufig weniger klar.
4. Wiederhole auf dem zweiten Band mit unveränderten Reglern. Ein auf eine Kassette beschränkter Fehler legt zunächst Band oder Gehäuse nahe.
5. Sind beide betroffen, nutze [den wiederholbaren Messaufbau](../without-reference-tape/). Behalte unveränderte Aufnahmen und Einstellungen, statt interne Schrauben zu verstellen.

## Das Muster verstehen

| Beobachtung | Einfache Prüfung | Sinnvoller nächster Schritt |
| --- | --- | --- |
| Nur laute Becken werden dumpf | Dieselbe Stelle 3 dB leiser aufnehmen | Hochfrequenzsättigung untersuchen |
| Ein Kanal bleibt leiser | Identisches Monosignal auf beiden Kanälen vergleichen | Kanalbalance prüfen |
| Tonhöhe schwankt bei mehreren Bändern | Weitere einwandfreie Kassette vergleichen | Transport prüfen, danach Gleichlauf messen |
| Dolby-Wiedergabe klingt verhangen | NR bei Aufnahme und Wiedergabe vergleichen | Pegel und Justage vor Höhenanhebung prüfen |

Das sind mögliche Ursachen, keine Diagnosen. Hypothetisches Beispiel: Zwei neue Aufnahmen klingen dumpf, vertraute Kaufkassetten dagegen klar. Das macht die Aufnahmebedingungen zur naheliegenderen Spur als den Wiedergabeweg, identifiziert aber kein defektes Bauteil.

Bei beständigem Links-rechts-Unterschied hilft [der Kanalbalance-Test](../channel-balance/). Für einen konstanten Tonhöhenfehler ist [eine Geschwindigkeits-Referenzkassette](../speed-test/) aussagekräftiger als Musik allein.

## Vor einer Wartungsentscheidung

- Bestätige das Symptom mit mehr als einer Kassette.
- Notiere die Einstellungen, mit denen es auftritt.
- Behalte einen kurzen Originalausschnitt und dessen Rückaufnahme.
- Suche modellbezogenen Service, wenn ein mechanisches oder Justageproblem bleibt. Ein EQ-Profil repariert es nicht.
