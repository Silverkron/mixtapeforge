---
id: "eq-limits"
lang: "de"
title: "Eine Kassette mit EQ verbessern, ohne ihre Grenzen zu verschärfen"
description: "Kleine Korrekturen aus wiederholbaren Messungen ableiten und durch eine neue Bandaufnahme überprüfen."
primaryKeyword: "Eine Kassette mit EQ verbessern, ohne ihre Grenzen zu verschärfen"
secondaryKeywords: ["Frequenzgangtests bei niedrigem Pegel","Sättigung","warum Decks unterschiedlich klingen","benanntes Aufnahmeprofil"]
searchIntent: "task"
answer: "Ein Equalizer, kurz EQ, verändert den Pegel ausgewählter Frequenzbereiche. Er kann eine stabile tonale Unausgewogenheit verbessern, aber weder Aussetzer rückgängig machen noch Kopfausrichtung oder schwankende Tonhöhe reparieren. Eine starke Anhebung belastet das Band möglicherweise genau dort stärker, wo es bereits an seine Grenzen stößt."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "John G. McKnight: Vormagnetisierung bei der Magnetbandaufzeichnung", "url": "https://cdn.shopify.com/s/files/1/0720/0627/1232/files/mcknight_biasing.pdf?v=1763068428"}, {"title": "NAK T-100: Checkliste für Messungen", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["high-frequency-saturation", "different-decks", "normalization-compression-eq"]
guideType: "procedure"
prerequisites: ["frequency-response"]
next: ["recording-profile"]
---

## Entscheiden, ob sich der Unterschied korrigieren lässt

Beginne mit zwei unveränderten [Frequenzgangtests bei niedrigem Pegel](../frequency-response/). Derselbe breite Unterschied sollte auf beiden Kanälen erscheinen und sich wiederholen. Nimmt er mit höherem Aufnahmepegel zu, deutet das auf [Sättigung](../high-frequency-saturation/) hin. Mehr Anhebung ist dann oft die falsche Antwort.

Bewahre Originalquelle und unkorrigierte Aufnahme auf. Du benötigst eine entbehrliche Kassette, dieselbe Aufnahmekette und einen Musikausschnitt mit hellen Transienten und gehaltenen Tönen.

## Eine kleine Korrektur versuchen

1. Suche einen breiten, wiederholbaren Unterschied statt einer schmalen Welligkeit oder eines im Rauschen versteckten Bereichs. Prüfe zuerst Bandtyp, NR und Laufwerkzustand.
2. Kopiere die Bearbeitungseinstellungen. Falls bereits ein Profil korrigierenden EQ anwendet, prüfe diesen vor einer zusätzlichen manuellen Korrektur.
3. Beginne vorsichtig. Eine breite Änderung um **1 dB** ist beispielsweise ein umkehrbarer Versuch, keine vorgeschriebene Korrektur für irgendeinen Bandtyp.
4. Kontrolliere die digitale Spitzenreserve und senke bei erhöhten Spitzen den Gesamtpegel. REC LEVEL des Decks und Interface-Regler bleiben an den gemessenen Positionen.
5. Nimm korrigierten und unkorrigierten Ausschnitt unter denselben Bedingungen auf. Spule zurück und erfasse beide. Vergleiche Kopien bei angeglichener Hörlautstärke und behalte die Rohdateien.
6. Behalte die Änderung nur, wenn die wiederholte Aufnahme ausgewogener klingt, ohne rauere Höhen, mehr Verzerrung oder instabile Stereobühne. Höre nach Möglichkeit auf einem anderen Deck gegen, bevor du viele Kopien erstellst.

## Eine erfolglose Korrektur verstehen

Hypothetisches Beispiel: Bei niedrigem Pegel fehlen 4 dB bei 8 kHz. Eine Anhebung um +4 dB macht Becken härter, ohne ihre Klarheit wiederherzustellen. Die Kette hat möglicherweise zu wenig Reserve oder einen Ausrichtungsverlust. Weniger Anhebung oder ein geringerer Aufnahmepegel hilft eher, als auf einer geraden Kurve zu bestehen.

Eine aus der Wiedergabe eines Decks abgeleitete Korrektur kann auf einem anderen überkompensieren. Lies [warum Decks unterschiedlich klingen](../different-decks/), bevor du ein Aufnahme-Wiedergabe-Profil als universell behandelst.

## Die Rolle von MixtapeForge

Im Prototyp 0.1 schlägt das geführte Profil begrenzte EQ-Korrekturen und Kanalabsenkungen anhand seiner Messungen und Zuverlässigkeitsprüfungen vor. Unsichere Bereiche können unverändert bleiben. Eine fehlende Korrektur ist keine Aufforderung, dort manuell stark einzugreifen.

Zum Abschluss prüfen: wiederholbarer Unterschied, nur eine Korrekturstufe, digitale Reserve, neuer Bandvergleich und Originaleinstellungen gesichert. Speichere ein [benanntes Aufnahmeprofil](../recording-profile/) erst nach bestätigender Hörprobe.
