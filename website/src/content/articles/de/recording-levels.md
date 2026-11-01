---
id: "recording-levels"
lang: "de"
title: "Kassetten-Aufnahmepegel: Verzerrung und zu leise Aufnahmen vermeiden"
description: "Stelle den Aufnahmepegel mit einer kurzen Bandaufnahme ein, die auch an lauten Stellen sauber klingt."
primaryKeyword: "Kassetten-Aufnahmepegel"
secondaryKeywords: ["Verkabelung vom Computer","Normalisierung und Kompression","diese Prüfschritte","Eine Kassette vom Computer aufnehmen"]
searchIntent: "task"
answer: "Stelle den Aufnahmepegel mit einer kurzen Bandaufnahme ein, die auch an lauten Stellen sauber klingt. Ein höherer Ausschlag bedeutet nicht automatisch bessere Qualität: Übersteuerung kann Stimmen rau und Becken dumpf oder verwaschen machen."
category: "recording"
image: "recording"
updated: "2026-11-01"
sources: [{"title": "TEAC W-1200 — Funktionen und Bandtypen", "url": "https://teac.jp/jp/support/news/5488"}, {"title": "Audacity — Glossar für digitales Audio", "url": "https://manual.audacityteam.org/man/glossary.html"}]
guideType: "procedure"
related: ["recording-computer", "normalization-compression-eq", "distorted-recordings"]
prerequisites: ["recording-computer"]
next: ["recording-computer"]
---

## Zwei unterschiedliche Skalen

Der digitale Spitzenpegel der App wird in dBFS angezeigt; 0 ist die digitale Obergrenze. Die Deckskala, oft um 0 dB, hat einen anderen Bezug. Ihr Ausschlag hängt vom tatsächlichen Ausgangspegel und REC LEVEL ab.

## Pegel mit einer Aufnahme einstellen

Verwende die [Verkabelung vom Computer](../recording-computer/), die geplante Bandsorte sowie eine laute und leise Passage. Stelle Bandtyp und NR zuerst ein. Halte Computer- und Interface-Lautstärke konstant.

1. Schalte das Deck auf Aufnahme-Pause. Spiele die laute Passage ab und stelle REC LEVEL auf den im Handbuch empfohlenen Ausgangsbereich. +3 dB ist keine allgemeine Regel.
2. Nimm etwa 30 Sekunden auf, stoppe, spule zurück und höre vom Band: beide Kanäle, Konsonanten, Bassanschläge und Becken.
3. Klingt das Band rauer als die Quelle, reduziere REC LEVEL und wiederhole dieselbe Stelle. Ändere nur einen Regler. Verzerrt auch eine leise Aufnahme, prüfe Quelle und Interface auf vorherige Übersteuerung.
4. Höre die leise Passage. Überdeckt Rauschen die Musik, probiere etwas mehr Pegel, solange die laute Stelle sauber bleibt. Wähle den klarsten Kompromiss.
5. Notiere Ausgang/Lautstärke, REC LEVEL, Band und NR; behalte sie für die Seite bei.

**EQ / Audio** bietet [Normalisierung und Kompression](../normalization-compression-eq/), kalibriert aber keine physische Pegelanzeige. Bei Software-Type-B beachte den Pegelabgleich und ändere nach der Codierung nicht beliebig die Verstärkung.

**Abschlussprüfung:** kein digitales Clipping, laute Stelle sauber, leise Stelle brauchbar, Einstellungen notiert. Bei anhaltender Verzerrung helfen [diese Prüfschritte](../distorted-recordings/).
