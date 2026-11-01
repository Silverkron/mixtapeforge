---
id: "phase-polarity"
lang: "de"
title: "Stereopolarität und Zeitversatz mit einem bekannten Monosignal prüfen"
description: "Warum eine Polaritätsumkehr einen Verdrahtungsfehler beheben kann, aber nicht jedes Phasen- oder Ausrichtungsproblem."
primaryKeyword: "Stereopolarität und Zeitversatz mit einem bekannten Monosignal prüfen"
secondaryKeywords: ["Azimut","Fehlersuche bei einem leisen Kanal","Stereo-Tool-Anleitung","Wiedergabeazimut prüfen, ohne die ursprüngliche Einstellung zu verlieren"]
searchIntent: "evaluation"
answer: "Eine Polaritätsumkehr kehrt das Vorzeichen einer Wellenform um: positiv wird negativ. Eine Zeitverzögerung verschiebt sie dagegen zeitlich. Dadurch entstehen bei verschiedenen Frequenzen unterschiedliche Phasenwinkel. Eine Polaritätsumkehr kann diese Verzögerung deshalb im Allgemeinen nicht rückgängig machen."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "FLUX Stereo Tool: Handbuch", "url": "https://doc.flux.audio/stereotool/"}, {"title": "FLUX Stereo Tool: Produkt und Kompatibilität", "url": "https://www.flux.audio/project/stereo-tool-freeware/"}, {"title": "Audacity: Stereospuren aufteilen", "url": "https://manual.audacityteam.org/man/splitting_and_joining_stereo_tracks.html"}]
related: ["azimuth-test", "quiet-channel", "different-decks"]
guideType: "measurement"
prerequisites: ["channel-balance"]
next: ["flux-stereo-tool"]
---

Bei identischen linken und rechten Signalen kann eine gegensätzliche Polarität dazu führen, dass eine mittige Stimme in der Monosumme verschwindet. Auch absichtliche Stereoeffekte in Musik können negative Korrelation erzeugen. Beginne deshalb mit einer bekannten Referenz.

## Geräte und Referenz

Verwende einen kompatiblen Audiohost mit dem eigenen Editor von FLUX Stereo Tool oder eine Stereoanzeige mit Mono-Abhörmöglichkeit. Nimm eine kurze Mono-Sprachaufnahme auf und leite exakt dieselben Samples mit gleichem Pegel nach links und rechts. Schalte alle Effekte aus. Für den Bandtest verbindest du LINE OUT des Decks mit Stereo-Line-Eingängen; Aufnahmeverstärkung bleibt fest, die NR-Einstellung muss zur Aufnahme passen.

## Zuerst das richtige Muster kennenlernen

1. Spiele die unveränderte Monoreferenz durch Stereo Tool ab. Kanalverstärkungen stehen auf 0 dB, Polaritätsumkehr ist aus, Routing und Breite sind neutral.
2. Beobachte das mittige Monomuster. Identische Kanäle sollten nahe +1 korrelieren. Andernfalls prüfst du zuerst das Routing im Host, bevor du das Deck einbeziehst.
3. Kehre mit dem Polaritätsschalter des Plugins vorübergehend genau einen Kanal um. Die Anzeige sollte gegensätzliche Kanäle zeigen; die Monosumme im Host sollte die Referenz stark abschwächen. Höre leise ab.
4. Stelle den Schalter zurück. Der absichtlich erzeugte Fehler zeigt dir, wie eine tatsächliche relative Polaritätsumkehr aussieht.
5. Nimm die Referenz über das Deck auf und erfasse die Wiedergabe. Vergleiche den unbearbeiteten Rücklauf mit denselben neutralen Plugin-Einstellungen. Behalte das digitale Original zum Vergleich.
6. Wenn der Rücklauf wiederholt wie die absichtliche Umkehr aussieht, prüfe Kabel und Routing. Erprobe eine Korrektur nur an einer Kopie und erst nach Bestätigung des Fehlers. Bewahre die Rohaufnahme auf.

## Zwischenformen richtig deuten

Hypothetisches Beispiel: Die Originalreferenz liegt sauber in der Mitte, während der Bandrücklauf eine Ellipse bildet und sich mit der Frequenz verändert. Das reicht nicht als Begründung für eine Polaritätsumkehr. Zeitversatz, [Azimut](../azimuth-test/) und unterschiedliche Kanalantworten beeinflussen das Muster ebenfalls.

Eine Korrelation nahe +1 ist bei identischem Mono zu erwarten, nicht bei jedem Stereostück. Kurze negative Werte in Musik sind ein Anlass zum Mono-Abhören, nicht automatisch ein Verdrahtungsfehler.

## Wenn die Prüfung unklar bleibt

Fehlt ein Kanal, folge der [Fehlersuche bei einem leisen Kanal](../quiet-channel/). Unterschiedliche Verstärkung neigt das Bild; miss diesen Unterschied separat. Wenn Mono nach Umgehen anderer Plugins wieder stimmt, untersuche zuerst diese Plugins.

Zum Abschluss prüfen: identische bekannte Kanäle, neutrale Einstellungen, Testumkehr zurückgestellt, Rohaufnahme erhalten und frequenzabhängige Effekte nicht mit Polarität verwechselt. Die [Stereo-Tool-Anleitung](../flux-stereo-tool/) erläutert den Host-Ablauf. MixtapeForges generische Plugin-Parameter bieten diese native Messanzeige nicht.
