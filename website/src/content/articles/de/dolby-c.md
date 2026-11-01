---
id: "dolby-c"
lang: "de"
title: "Dolby C erklärt: Der Unterschied zu Dolby B"
description: "Warum Dolby C passende Wiedergabe braucht und worauf du bei Softwaredecodern achten solltest."
primaryKeyword: "Dolby C erklärt"
secondaryKeywords: ["Dolby B","Pegel-Anleitung","Decodierung und Wiedergabe","Dolby S"]
searchIntent: "informational"
answer: "Dolby C arbeitet bei Aufnahme und Wiedergabe stärker gegen Rauschen als Dolby B. Leise Details werden für die Aufnahme über das Bandrauschen angehoben; bei der Wiedergabe wird diese Bearbeitung umgekehrt. Eine C-Aufnahme braucht deshalb einen C-Decoder. B ist kein milderer Ersatz."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Dolby Laboratories · CP45 · Appendix D", "url": "https://www.film-tech.com/warehouse/manuals/DOLBYCP45USERS.pdf"}, {"title": "Anaxwaves · DDi Codec", "url": "https://www.anaxwaves.com/DDiCodec/"}]





guideType: "explainer"
prerequisites: ["dolby-b"]
next: ["dolby-b-c-s-playback", "software-noise-reduction"]
related: ["dull-dolby", "playback-compatibility", "recording-levels"]
---

Dolby C arbeitet bei Aufnahme und Wiedergabe stärker gegen Rauschen als [Dolby B](../dolby-b/). Leise Details werden für die Aufnahme über das Bandrauschen angehoben; bei der Wiedergabe wird diese Bearbeitung umgekehrt. Eine C-Aufnahme braucht deshalb einen C-Decoder. B ist kein milderer Ersatz.

## Warum die Betriebsart stimmen muss

Höre auf einen leisen Atemzug vor einem kräftigen Schlagzeugschlag. Die richtige Decodierung erhält ihr Verhältnis. Mit der falschen Einstellung kann der Atemzug überbetont werden oder verschwinden; das Rauschen schwillt möglicherweise mit der Musik an. Dieses Verhalten heißt **Pumpen** beziehungsweise *Breathing*. Es ist keine gleichbleibende Klangverfärbung, die ein EQ einfach beseitigt.

## Einen brauchbaren Vergleich aufnehmen

Du brauchst ein Deck mit C, eine geeignete Leerkassette, die Originalquelle und Kopfhörer. Verbinde den Stereo-Line-Ausgang der Quelle mit LINE IN L/R. Höre am Deck oder am Verstärker ab.

1. Schalte Software-NR aus und am Deck C ein. Wähle den richtigen Bandtyp.
2. Spiele die lauteste Stelle und stelle REC LEVEL nach Handbuch ein. Die [Pegel-Anleitung](../recording-levels/) hilft bei den Anzeigen.
3. Nimm eine Minute mit leisen und lauten Passagen auf. Stoppe und spule zurück.
4. Spiele mit C ab und vergleiche bei ähnlicher Hörlautstärke mit dem Original, auch den leisen Schluss.
5. Soll ein anderes Deck das Band abspielen, teste es dort vor der vollständigen Aufnahme.

Hat das zweite Deck kein C, wähle für diesen Empfänger ein anderes Aufnahmeformat. Klingt nur eines von zwei C-Decks dumpf, prüfe [Decodierung und Wiedergabe](../dull-dolby/), bevor du den Master dauerhaft aufhellst.

## Software

[DDi Codec](https://www.anaxwaves.com/DDiCodec/) bietet B/C-Codierung und -Decodierung als separate kommerzielle Anwendung. Seine Regler brauchen weiterhin eine verlässliche Referenz oder eine ausdrücklich subjektive Einstellung. MixtapeForge 0.1 hat keinen eingebauten C-Encoder; Type B erzeugt keine C-Aufnahme.

Prüfe abschließend: C auf beiden Seiten der Kette, saubere laute Stellen und natürlich ausklingende leise Töne.

Vergleiche als weiteren Ansatz für leise Musik [Dolby S](../dolby-s/), bevor du das Format festlegst.
