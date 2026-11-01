---
id: "dolby-b"
lang: "de"
title: "Dolby B erklärt: So wird Bandrauschen leiser"
description: "Dolby B verstehen, den richtigen Aufnahmeweg wählen und doppelte Codierung vermeiden."
primaryKeyword: "Dolby B erklärt"
secondaryKeywords: ["Aufnahmepegel","Dolby-Fehlersuche","NR-Software","Dolby und dbx in Software"]
searchIntent: "informational"
answer: "Dolby B verringert das gleichmäßige „Schhh“, das hinter leisen Kassettenpassagen auffällt. Dazu gehören zwei Schritte: Codieren verändert das Signal vor der Aufnahme; Decodieren macht diese Veränderung bei der Wiedergabe rückgängig und senkt dabei das vom Band hinzugefügte Rauschen. Bereits in der Quelle vorhandenes Rauschen wird dadurch nicht entfernt."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Dolby Laboratories · CP45 · Appendix D", "url": "https://www.film-tech.com/warehouse/manuals/DOLBYCP45USERS.pdf"}, {"title": "IASA · TC-04 · 5.4.11", "url": "https://www.iasa-web.org/book/export/html/435"}, {"title": "libdolbyb", "url": "https://codeberg.org/martinwguy/libdolbyb"}]





guideType: "explainer"
prerequisites: []
next: ["dolby-b-c-s-playback", "dull-dolby"]
related: ["software-noise-reduction", "bias-eq-nr", "recording-levels"]
---

## Was passiert mit der Musik?

Ein leise ausklingendes Becken erhält beim Codieren mehr Höhenanhebung als ein lauter Beckenschlag. Der Decoder senkt die Höhen entsprechend ab. Der Eingriff folgt der Musik: Ein fest eingestellter Höhenregler kann ihn nicht nachbilden. Ein codiertes Band klingt ohne NR häufig heller und rauschiger. Mit B soll die natürliche Klangbalance zurückkehren, nicht die gesamte Musik dumpf werden.

## Erste Aufnahme mit dem Deck

Du brauchst ein Deck mit Dolby B für Aufnahme und Wiedergabe, eine geeignete Leerkassette, Kopfhörer und einen bekannten Ausschnitt mit Stimme, Schlagzeug und leisem Ausklang. Für diesen Hörvergleich ist keine Messsoftware nötig.

1. Verbinde den Stereo-Line-Ausgang des Computers oder Interfaces mit LINE IN L/R am Deck. Beginne leise und stelle anhand der lautesten Stelle den [Aufnahmepegel](../recording-levels/) ein.
2. Wähle den richtigen Bandtyp, schalte Software-NR aus und Dolby B am Deck ein. Nur das Deck codiert.
3. Nimm etwa eine Minute einschließlich des Ausklangs auf. Stoppe, spule zurück und spiele mit Dolby B ab.
4. Vergleiche bei ähnlicher Hörlautstärke mit dem Original. Verändere dafür Kopfhörer- oder Verstärkerlautstärke, nicht REC LEVEL.
5. Schalte NR bei der Wiedergabe kurz aus und dann wieder auf B. Achte auf das Rauschen in der Pause und den Beckenausklang.

Stimme und Ausklang sollten natürlich bleiben, während das Rauschen sinkt. Werden sie mit B auffällig dumpf, prüfe zuerst die [Dolby-Fehlersuche](../dull-dolby/), bevor du Höhen hinzufügst.

## Wenn die Software codiert

MixtapeForge 0.1 bietet optional **Type B · libdolbyb** in den Audioeinstellungen. Nimm dabei mit Deck-NR **OFF** auf und spiele anschließend mit Hardware-Dolby-B **ON** ab. Die codierte Vorschau der App entspricht nicht dem decodierten Ergebnis. Ein kurzer Bandtest und ein abgeglichener Referenzpegel sind nötig, um dein Deck zu beurteilen. Referenzwert 0 schaltet die Codierung nicht aus und bedeutet nicht „am Deck bis 0 dB aussteuern“.

Die Übersicht zu [NR-Software](../software-noise-reduction/) erklärt die Werkzeuge. Prüfe vor einer ganzen Seite: ein Encoder, ein passender Decoder, unveränderte Pegel und verständlicher leiser Ausklang.
