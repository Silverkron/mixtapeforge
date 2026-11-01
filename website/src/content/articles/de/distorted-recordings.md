---
id: "distorted-recordings"
lang: "de"
title: "Kassettenaufnahme verzerrt: Die überlastete Stufe finden"
description: "Master, Interface, Eingang und Band getrennt prüfen statt alle Pegel blind zu senken."
primaryKeyword: "Kassettenaufnahme verzerrt"
secondaryKeywords: ["Höhensättigung","Pegel-Anleitung","Verzerrungsmessung","Kassettenverzerrung messen, ohne sie mit Rauschen zu verwechseln"]
searchIntent: "diagnosis"
answer: "Raue Stimmen, unsauberer Bass oder spritzige Becken bedeuten nicht automatisch eine schlechte Kassette. Verzerrung kann in Datei, Bearbeitung, Interface-Ausgang, Deck-Eingang, Band oder Aufnahme-Eingang entstehen. Finde die erste fehlerhafte Stufe, bevor du ein Profil änderst."
category: "troubleshooting"
image: "portable"
updated: "2026-11-01"
sources: [{"title": "Sony · 00027549", "url": "https://www.sony.com/electronics/support/audio-video/tcm-230dv/articles/00027549"}, {"title": "Audacity · Testaufnahme", "url": "https://manual.audacityteam.org/man/tutorial_making_a_test_recording.html"}]

guideType: "troubleshooting"
prerequisites: []
next: ["recording-levels", "high-frequency-saturation"]
related: ["distortion-test", "normalization-compression-eq", "loopback-round-trip"]
---

## Stufen einzeln vergleichen

Du brauchst eine entbehrliche Leerkassette, eine saubere Quelle und Kopfhörer. Verwende zum Erfassen Line-Eingänge statt Mikrofonempfindlichkeit und lasse Abstand zum digitalen Clipping, bei dem der Wandler Spitzen abschneidet.

1. Höre die Quelle direkt bei mäßiger Lautstärke. Umgehe zusätzlichen EQ, Kompressor und Plugins. Verzerrt sie bereits, korrigiere oder ersetze zuerst die Quelle.
2. Höre den Interface-Ausgang zum Deck und prüfe digitale Spitzenwarnungen. Weniger Ausgangspegel repariert kein bereits gespeichertes Clipping.
3. Nimm einen Ausschnitt mit richtigem Bandtyp und genau einem NR-Encoder auf. Notiere REC LEVEL und Ausgangseinstellungen.
4. Wiederhole mit deutlich niedrigerem REC LEVEL; Ausgang, Band und Effekte bleiben gleich. Vergleiche bei angeglichener Hörlautstärke.
5. Verzerren beide, senke den Interface-Ausgang und teste erneut. Der Deck-Eingang kann schon vor REC LEVEL übersteuern. Hebe nicht sofort alle folgenden Stufen wieder an.
6. Ist direkte Deck-Wiedergabe sauber, die Computeraufnahme aber rau, senke deren Interface-Eingangsgain und erfasse erneut.

## Die Änderung deuten

Hilft weniger REC LEVEL, spricht das für übermäßige Aussteuerung, nicht zwingend einen Defekt. Verbessern sich besonders laute Höhen, prüfe [Höhensättigung](../high-frequency-saturation/). Unveränderte Verzerrung bei niedrigeren Pegeln und verschiedenen guten Bändern kann Service erfordern.

Bestimme mit der [Pegel-Anleitung](../recording-levels/) eine brauchbare Einstellung. Eine [Verzerrungsmessung](../distortion-test/) braucht geeigneten Ton und Methode; eine Musikwellenform liefert keinen verlässlichen THD-Prozentwert. Bewahre Einstellungen und besten Vergleich und schalte Effekte einzeln wieder zu.
