---
id: "playback-level"
lang: "de"
title: "Wiedergabepegel mit einer bekannten magnetischen Referenz prüfen"
description: "Verstehe Bandfluss, Ausgangsspannung und Pegelanzeigen, bevor du den Wiedergabepegel eines Decks justierst."
primaryKeyword: "Wiedergabepegel mit einer bekannten magnetischen Referenz prüfen"
secondaryKeywords: ["Aufnahmeempfindlichkeit","Vergleiche zwischen verschiedenen Decks","Wiedergabeazimut prüfen, ohne die ursprüngliche Einstellung zu verlieren","Kassettendeck kalibrieren"]
searchIntent: "evaluation"
answer: "Beim Abgleich des Wiedergabepegels wird ein bekanntes magnetisches Signal auf dem Band einer vorgeschriebenen Ausgangsspannung oder Anzeige zugeordnet. Darauf bauen Vergleiche des Aufnahmepegels auf. Die Interface-Verstärkung so weit aufzudrehen, bis eine Anzeige null erreicht, kalibriert das Deck nicht."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "MRL: Auswahl und Geltungsbereich von Referenzbändern", "url": "https://mrltapes.com/pages/product-guide"}, {"title": "NAK T-100: offizielle Funktionsbeschreibung", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "REW: Spektrum, RMS-Pegel und Verzerrung", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/spectrum.html"}]
related: ["azimuth-test", "calibration-basics", "different-decks"]
guideType: "measurement"
prerequisites: ["calibration-tapes"]
next: ["recording-sensitivity"]
---

## Die passende Referenz zusammenstellen

Du brauchst die Serviceanleitung des Decks, die dort vorgeschriebene Pegelmesskassette und entweder das angegebene Wechselspannungsmessgerät oder einen passend kalibrierten Audioanalysator. Notiere den **Bandfluss** in nWb/m, Tonfrequenz, Entzerrung und Toleranz der Kassette. Verwende die im Handbuch angegebene Ausgangsspannung, Last und Reglerstellung; diese Vorgaben unterscheiden sich je nach Modell.

Eine Computeranzeige in **dBFS** beschreibt den Abstand zur digitalen Vollaussteuerung. Die Marke 0 VU am Deck und eine kalibrierte Spannungsanzeige am Analysator haben andere Bezugspunkte. NAK T-100 benötigt eine externe Spannungskalibrierung, bevor seine Spannungsanzeige als absoluter Messwert gelten kann.

## Vergleichen, ohne intern nachzustellen

1. Prüfe, ob die Referenzkassette tatsächlich den Servicevorgaben entspricht. Ist das nicht nachweisbar, beschränke dich auf relative Vergleiche, statt einen Sollwert zu erfinden.
2. Verbinde LINE OUT des Decks mit dem vorgeschriebenen Messeingang. Beim Interface verwendest du Line-Modus und feste Verstärkung. Deaktiviere Softwareeffekte und automatische Pegelregelung.
3. Stelle Wiedergabe- beziehungsweise Ausgangsregler und NR genau nach Serviceanleitung ein. Sorge am Eingang zunächst für ausreichend Übersteuerungsreserve.
4. Spiele den Referenzabschnitt ab und warte auf einen stabilen Wert. Miss links und rechts getrennt über denselben Abschnitt.
5. Notiere Messwert, Sollwert, Referenzkassette und Reglereinstellungen. Wiederhole die Messung, bevor du eine Abweichung als gesichert ansiehst.
6. Ist ein Abgleich erforderlich, sind die modellspezifische Serviceanleitung und entsprechende Fachkenntnisse nötig. Gleiche nicht mit REC LEVEL aus: Dieser Regler wirkt auf einen anderen Teil der Signalkette.

## Eine Abweichung einordnen

Hypothetisches Beispiel: Das Handbuch fordert 0,50 V RMS, du misst unter denselben Bedingungen 0,45 V. Die Differenz beträgt `20 × log10(0,45 / 0,50)`, also etwa **−0,92 dB**. Ob dies außerhalb der Toleranz liegt, hängt von den Servicevorgaben und der Messunsicherheit ab.

Eine Referenzkassette mit niedrigerem Bandfluss kann denselben scheinbaren Fehler verursachen. Ebenso ein verstellbarer Ausgangsregler, eine falsche Last oder eine unkalibrierte Eingangsskala. Prüfe diese Punkte, bevor du das Deck veränderst.

Kurzcheck: richtige Kassette, vorgeschriebene Reglerstellungen und Last, nötigenfalls kalibrierte Spannungsmessung, stabile L/R-Werte und dokumentierte Toleranz. Mit einer verlässlichen Wiedergabereferenz wird die [Aufnahmeempfindlichkeit](../recording-sensitivity/) aussagekräftig. [Vergleiche zwischen verschiedenen Decks](../different-decks/) vermischen sonst mehrere Unbekannte.
