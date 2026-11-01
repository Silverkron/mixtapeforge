---
id: "azimuth-test"
lang: "de"
title: "Wiedergabeazimut prüfen, ohne die ursprüngliche Einstellung zu verlieren"
description: "Prüfe Höhenpegel und Phasenlage mit einer geeigneten Referenzkassette, bevor du eine Justierung erwägst."
primaryKeyword: "Wiedergabeazimut prüfen, ohne die ursprüngliche Einstellung zu verlieren"
secondaryKeywords: ["Kanalpegel und Polarität","Frequenzgangmessung","Stereopolarität und Zeitversatz mit einem bekannten Monosignal prüfen","Messen, wie deine Kassette Bässe, Mitten und Höhen verändert"]
searchIntent: "evaluation"
answer: "Azimut bezeichnet den Winkel des Kopfspalts zur aufgezeichneten Spur. Eine Abweichung kann Höhen abschwächen und dazu führen, dass sich beide Kanäle bei Monowiedergabe ungünstig überlagern. Diese Anleitung hilft, Hinweise auf eine Abweichung zu finden. Sie liefert keine allgemeingültige Schraubeneinstellung."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Jay McKnight: Azimuth in a Magnetic Tape Recorder", "url": "https://www.mrltapes.com/mcknight_azimuth-in-mtr.pdf"}, {"title": "NAK T-100: Mess-Checkliste", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "NAK T-100: offizielle Funktionsbeschreibung", "url": "https://anaxwaves.com/NAKT100/"}]
related: ["phase-polarity", "frequency-response", "playback-level"]
guideType: "measurement"
prerequisites: ["calibration-tapes"]
next: ["different-decks"]
---

## Das brauchst du

Verwende eine Azimut-Referenzkassette, die zur Serviceanleitung deines Decks passt, ein Audiointerface mit Stereo-Line-Eingängen und das Zweikanaloszilloskop von NAK T-100. Tonfrequenz, Spurformat und Ausrichtung der Referenz müssen dokumentiert sein. Musik oder ein auf demselben Deck aufgenommener Ton liefern keine unabhängige Referenz für die Kopfausrichtung.

Prüfe zunächst mit einer gewöhnlichen Kassette, ob das Laufwerk zuverlässig arbeitet. Lege kein wertvolles Messband in einen Mechanismus, der Band beschädigt. Reinige nur nach den Wartungsvorgaben des Herstellers.

## Erst beobachten, dann entscheiden

1. Verbinde LINE OUT L/R des Decks mit LINE IN L/R des Interfaces. Wähle Stereo-Eingänge, schalte Effekte und automatische Pegelregelung aus und lasse beide Eingangsverstärkungen unverändert.
2. Lege die Referenzkassette ein, wähle die dafür vorgeschriebene Bandsorteneinstellung zur Wiedergabe und schalte NR aus. Starte den dokumentierten Azimutabschnitt.
3. Wähle in NAK T-100 **Level** und notiere nach dem Einlaufen beide Kanalpegel. Senke die Eingangsverstärkung, falls einer der Kanäle übersteuert.
4. Wechsle zu **Scope > O'scope**. Beobachte, ob beide Sinuskurven gleichzeitig steigen und fallen. Die Ansicht **Lissajous** trägt einen Kanal gegen den anderen auf: Ein gleichphasiger Ton mit gleichem Pegel nähert sich einer diagonalen Linie; eine Phasenabweichung öffnet eine Ellipse.
5. Wiederhole denselben Abschnitt. Notiere Amplitude und Phasenverhalten. Prüfe mehrere dokumentierte Referenzfrequenzen, sofern die Kassette sie bietet.
6. Speichere Beobachtungen und Angaben zur Referenz. Wiederholt sich eine Abweichung, ziehe die Justieranleitung des Modells oder eine Fachkraft hinzu, bevor du den Kopf bewegst.

## Was das Bild nicht beweist

Bei hohen Frequenzen kann ein Zeitversatz einer ganzen Schwingungsperiode entsprechen. Scheinbar übereinstimmende Phasen bei einer einzigen Frequenz beweisen deshalb noch keinen korrekten Azimut. Bandführung, Kopfkontakt, Kanalelektronik und die Referenz selbst beeinflussen das Ergebnis ebenfalls.

Hypothetisches Beispiel: Eine schmale Ellipse bei einer Frequenz wird bei einer anderen breit; zugleich ändert sich der Höhenpegel zwischen Durchläufen. Dann sind zunächst Wiederholbarkeit und Bandkontakt zu prüfen. Eine Schraube zu drehen, bis eine einzelne Kurve gerade aussieht, reicht nicht aus.

## Häufige Stolperstellen

Ist nur eine Kurve sichtbar, prüfe die Kanalzuordnung. Neigt sich die diagonale Linie wegen eines leiseren Kanals, untersuche [Kanalpegel und Polarität](../phase-polarity/), statt sofort den Azimut verantwortlich zu machen. Wandert die Anzeige, verwende eine einwandfreie Referenz und prüfe den Zustand des Laufwerks.

Kurzcheck: dokumentierte Referenz, beide Kanäle, keine Übersteuerung, wiederholte Beobachtungen und ursprüngliche Einstellung erhalten. Eine [Frequenzgangmessung](../frequency-response/) kann die klanglichen Folgen zeigen, den Azimut aber nicht unabhängig bestimmen.
