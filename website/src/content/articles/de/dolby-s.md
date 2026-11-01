---
id: "dolby-s"
lang: "de"
title: "Dolby S erklärt: Was daran anders war"
description: "Dolby S verstehen und von Dolby C, HX Pro und digitalen Dolby-Formaten unterscheiden."
primaryKeyword: "Dolby S erklärt"
secondaryKeywords: ["Kompatibilität","Aufnahmepegel","Softwareübersicht","Dolby C erklärt"]
searchIntent: "informational"
answer: "Dolby S wirkt gegen Höhenrauschen und auch gegen einen Teil der tieffrequenten Störungen. Wie B und C braucht es Codierung bei der Aufnahme und passende Decodierung beim Abspielen. Leise Musik profitiert davon; eine verschlissene Mechanik oder beschädigtes Band repariert S nicht."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Dolby Laboratories · CP45 · Appendix D", "url": "https://www.film-tech.com/warehouse/manuals/DOLBYCP45USERS.pdf"}]





guideType: "explainer"
prerequisites: ["dolby-b"]
next: ["playback-compatibility"]
related: ["dolby-c", "dolby-b-c-s-playback", "software-noise-reduction"]
---

## Wann ist S sinnvoll?

Verwende S, wenn Aufnahme- und Wiedergabedeck S unterstützen. Prüfe bei einem Geschenk zuerst das Gerät des Empfängers: [Kompatibilität](../playback-compatibility/) ist wichtiger als das aufwendigste NR-System. Manche Handbücher beschreiben eine akzeptable Wiedergabe von S-Aufnahmen mit B. Das ist ein Kompromiss und keine identische S-Decodierung; teste ihn vorher.

## Ein erster praktischer Versuch

Du brauchst ein S-Deck, eine geeignete Leerkassette, Kopfhörer und ein bekanntes Musikstück mit leisem Anfang und lauterem Verlauf. Verbinde den Stereo-Line-Ausgang der Quelle mit LINE IN L/R.

1. Wähle den richtigen Bandtyp, schalte Software-NR aus und am Aufnahmedeck S ein.
2. Stelle REC LEVEL mit der lautesten Passage nach Handbuch ein. S erlaubt keine beliebig hohen Aufnahmepegel.
3. Nimm beide Passagen auf, stoppe und spule zurück.
4. Spiele mit S ab. Vergleiche Stimme, Beckenausklang und Pausen bei ähnlicher Hörlautstärke mit der Quelle.
5. Wiederhole die Wiedergabe auf dem Zielgerät und beschrifte die Kassette mit „Dolby S“.

Sinkt das Rauschen, verschwinden aber auch musikalische Ausklänge, prüfe zuerst Betriebsart sowie Band- und Deckzustand. Werden nur laute Stellen rau, kontrolliere den [Aufnahmepegel](../recording-levels/): Das ist ein anderes Problem.

## Softwaregrenzen

MixtapeForge 0.1 implementiert S nicht. Die dokumentierten B/C-Modi von DDi Codec und B/uhx-Modi von Satin decodieren kein S; siehe [Softwareübersicht](../software-noise-reduction/). Hier wird kein verifizierter Softwareersatz für S empfohlen. Nutze ein funktionierendes S-Deck für originalgetreue Wiedergabe. Fehlt es, bewahre einen undecodierten Digitaltransfer für spätere fachkundige Bearbeitung auf.
