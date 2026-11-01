---
id: "dbx-noise-reduction"
lang: "de"
title: "dbx-Rauschunterdrückung: Type I, Type II und passende Wiedergabe"
description: "Warum dbx-Aufnahmen einen passenden Decoder brauchen und gewöhnliche Kompression nicht genügt."
primaryKeyword: "dbx-Rauschunterdrückung"
secondaryKeywords: ["Aufnahmepegel","Dropouts","Software-NR-Anleitung","Dolby B erklärt"]
searchIntent: "informational"
answer: "Kassetten-dbx verkleinert vor der Aufnahme den Unterschied zwischen leisen und lauten Tönen und erweitert ihn beim Abspielen wieder. Kompander verbindet Kompressor und Expander. Bei idealer 2:1-Kompression wird aus einer Änderung um 20 dB eine Änderung um 10 dB auf Band; der Decoder stellt den ursprünglichen Unterschied wieder her. Das ist ein Rechenbeispiel, kein Messergebnis eines Decks."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Anaxwaves · DxI Codec", "url": "https://anaxwaves.com/DxICodec/"}, {"title": "Anaxwaves · DxII Codec", "url": "https://www.anaxwaves.com/DxIICodec/"}, {"title": "u-he · Satin 1.3.3", "url": "https://u-he.com/downloads/manuals/plugins/satin/Satin-user-guide.pdf"}]





guideType: "explainer"
prerequisites: []
next: ["software-noise-reduction", "playback-compatibility"]
related: ["dolby-b", "recording-levels", "tape-dropouts"]
---

## Zuerst das Format bestimmen

Type I und Type II bezeichnen unterschiedliche dbx-Formate, nicht den magnetischen Bandtyp. Eine Type-II-Kassette kann ohne NR, mit Dolby oder mit dbx bespielt sein. Prüfe das Recorder-Handbuch und verwende den passenden Decoder. Ohne Decodierung kann die Aufnahme stark verdichtet und tonal falsch klingen.

## Kurzer Hardwaretest

Du brauchst ein funktionierendes Deck mit passendem dbx, eine geeignete Leerkassette und Kopfhörer. Verbinde den Stereo-Line-Ausgang der Quelle mit LINE IN L/R.

1. Deaktiviere Software-NR und wähle den im Handbuch beschriebenen dbx-Aufnahmemodus.
2. Stelle den [Aufnahmepegel](../recording-levels/) mit der lautesten Stelle ein. Ein Kompander repariert keine Übersteuerung.
3. Nimm Stimme, anhaltenden Bass und leisen Beckenausklang auf. Stoppe, spule zurück und spiele mit passendem dbx ab.
4. Vergleiche bei ähnlicher Lautstärke mit der Quelle. Achte auf natürliche Dynamik und einen Hintergrund, der nach Bassnoten nicht anschwillt.

Werden kurze Aussetzer auffällig, prüfe [Dropouts](../tape-dropouts/). Expansion kann Fehler verstärken, erklärt aber nicht deren Ursache. Teste zuerst eine andere saubere Kassette.

## Software prüfen

Anaxwaves bietet [DxII Codec](https://www.anaxwaves.com/DxIICodec/) für Type II/Disc und [DxI Codec](https://anaxwaves.com/DxICodec/) für Type I/Disc. [Satin](https://u-he.com/products/satin/) enthält uhx-I/II-Modelle. Das sind separate Werkzeuge, keine integrierten dbx-Stufen in MixtapeForge. Lies die Handbücher und teste den genauen Modus mit deiner Hardware, ohne zusätzliche Bandsimulationseffekte. Die [Software-NR-Anleitung](../software-noise-reduction/) hilft vor einem vollständigen Transfer.
