---
id: "distortion-test"
lang: "de"
title: "Kassettenverzerrung messen, ohne sie mit Rauschen zu verwechseln"
description: "Vergleiche einen reinen Sinuston mit seiner Bandaufnahme und unterscheide THD, THD+N und die dritte Harmonische."
primaryKeyword: "Kassettenverzerrung messen, ohne sie mit Rauschen zu verwechseln"
secondaryKeywords: ["Referenzmessung des Interfaces","Aufnahmepegel","Warum laute Höhen auf Band verschwinden","Kassetten-Aufnahmepegel"]
searchIntent: "evaluation"
answer: "Verzerrung erzeugt Frequenzen, die im Eingangssignal nicht vorhanden waren. Ein reiner 400-Hz-Sinus kann nach der Aufnahme Anteile bei 800, 1200 Hz und darüber enthalten. Diese heißen Harmonische oder Oberschwingungen. Sie erklären, warum ein höherer Aufnahmepegel Töne und Instrumente rauer klingen lassen kann."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100: offizielle Spezifikationen", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "NAK T-100: Mess-Checkliste", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "REW: Spektrum, RMS-Pegel und Verzerrung", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/spectrum.html"}]
related: ["high-frequency-saturation", "recording-levels", "nak-t100-practical-guide"]
guideType: "measurement"
prerequisites: ["without-reference-tape"]
next: ["maximum-output-level"]
---

**THD** fasst die harmonischen Verzerrungen zusammen. **THD+N** enthält zusätzlich Rauschen. **HD3** misst nur die dritte Harmonische bei der dreifachen Testfrequenz. Vergleiche diese Angaben nicht miteinander, als wären sie gleich.

## Was du brauchst

Verwende NAK T-100, ein Stereo-Line-Interface und eine überschreibbare Kassette. Verbinde Ausgang → Deck LINE IN und Deck LINE OUT → Line-Eingang. Schalte NR, EQ, Kompression und automatische Pegelregelung aus. Eine direkte [Referenzmessung des Interfaces](../loopback-round-trip/) hilft, weil Verzerrung schon vor dem Band entstehen kann.

## Moderate Aufnahmepegel vergleichen

1. Wähle in NAK T-100 **T.H.Dist.** und die dokumentierte Grundfrequenz **400 Hz**. Prüfe, ob THD+N oder HD3 angezeigt wird. Behalte diesen Messmodus bei.
2. Beginne mit niedrigem Ausgangspegel und moderater Aussteuerung am Deck. Der Interface-Eingang darf nicht clippen. Notiere Deck-Anzeige, Generatorpegel und Eingangsverstärkungen.
3. Höre bei einem Dreikopfdeck über Tape ab. Nimm bei einem Zweikopfdeck einen kurzen Abschnitt auf, stoppe, spule zurück und spiele ihn in den Analysator ein.
4. Lies die stabile Mitte für links und rechts getrennt ab. Wähle bei Bedarf einen anderen **Meter Range**. Ein am Skalenende festhängender Zeiger liefert keinen gültigen Messwert.
5. Nimm einen zweiten Abschnitt mit einer kleinen, dokumentierten Pegelerhöhung auf; die Eingangsverstärkung bleibt gleich. Clippt das Interface, senke dessen Gain und wiederhole beide Abschnitte.
6. Wiederhole die Messungen. Speichere zu jedem Wert Messmodus, Frequenz, Pegel und Kanal.

## Die Prozentzahl einordnen

Hypothetisches Beispiel: HD3 steigt bei höherem Aufnahmepegel von 0,5 % auf 1,5 %. Das zeigt einen größeren Anteil der dritten Harmonischen unter diesen Bedingungen, keine allgemeine Hörbarkeitsschwelle. Ein THD+N-Wert kann keinen dieser Werte ersetzen.

Steigt THD+N beim Absenken des Aufnahmepegels, macht möglicherweise das Rauschen einen größeren Anteil des Signals aus. Das ist etwas anderes als zunehmende Nichtlinearität bei hoher Aussteuerung. Prüfe das Spektrum oder HD3 zur Unterscheidung.

## Unerwartet schlechte Ergebnisse prüfen

Kontrolliere digitales Clipping, gewählte Grundfrequenz, Line-Eingangsmodus und Bearbeitung der Quelle. Zeigt schon die direkte Interface-Schleife hohe Verzerrung, untersuche zuerst das Interface. Verschlechtert sich nur der lautere Bandrücklauf, senke versuchsweise den [Aufnahmepegel](../recording-levels/).

Prüfliste: bekannter Sinus, eindeutig bezeichnete Messgröße, unveränderter Erfassungsweg, getrennte Kanäle, Wiederholungen. Die Profilanalyse von MixtapeForge ist kein zertifizierter Verzerrungsanalysator und ersetzt diesen instrumentenspezifischen Vergleich nicht.
