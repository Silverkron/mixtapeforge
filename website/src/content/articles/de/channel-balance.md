---
id: "channel-balance"
lang: "de"
title: "Pegelunterschiede zwischen links und rechts vor einer Korrektur messen"
description: "Trenne mit identischen Testsignalen einen stabilen Kanalunterschied von absichtlich unterschiedlicher Stereoverteilung."
primaryKeyword: "Pegelunterschiede zwischen links und rechts vor einer Korrektur messen"
secondaryKeywords: ["Aufnahme-Wiedergabe-Test","direkten Interface-Messung","Fehlersuche","Ein Kassettenkanal ist leiser"]
searchIntent: "evaluation"
answer: "Eine eigentlich mittig stehende Stimme, die zu einer Seite wandert, kann auf unterschiedliche Kanalpegel hinweisen. Musik eignet sich schlecht als Messreferenz: Instrumente können absichtlich auf einer Seite lauter sein. Beginne deshalb mit identischen Signalen."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: Tongenerator", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: Stereospuren aufteilen", "url": "https://manual.audacityteam.org/man/splitting_and_joining_stereo_tracks.html"}, {"title": "Audacity: Spektrumanalyse", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}]
related: ["quiet-channel", "loopback-round-trip", "flux-stereo-tool", "crosstalk-test"]
guideType: "measurement"
prerequisites: ["without-reference-tape"]
next: ["phase-polarity", "recording-profile"]
---

## Den Test vorbereiten

Du brauchst Audacity, ein Stereo-Interface, eine Leerkassette und die üblichen Line-Verbindungen aus dem [Aufnahme-Wiedergabe-Test](../without-reference-tape/). Erzeuge zehn Sekunden Sinuston mit 1 kHz und Amplitude 0,1. Gib dasselbe Signal auf beiden Ausgangskanälen aus. Das ist ein Dateipegel, keine Kalibriermarke des Decks.

Schalte NR und Signalbearbeitung aus. Stelle die Eingangsverstärkung beider Interface-Kanäle gleich ein, soweit die Hardware dies zulässt. Gleiche Reglerpositionen garantieren allerdings noch keine gleiche Verstärkung. Nimm mit mäßigem Pegel am Deck und ohne digitale Übersteuerung auf.

## Die Kanäle richtig vergleichen

1. Erfasse die Bandwiedergabe als Stereo-WAV. Normalisiere keinen der Kanäle.
2. Verwende in Audacity im Spurmenü **Split Stereo Track**; die Anleitung nennt die englischen Befehle. Markiere nur den stabilen Mittelteil des linken Tons.
3. Öffne **Analyze > Plot Spectrum**. Wähle Spectrum, Hann und eine FFT-Größe, die den Ton deutlich auflöst. Lies den Spitzenwert bei 1 kHz ab.
4. Markiere rechts denselben Zeitraum und wiederhole die Messung mit unveränderten Einstellungen. Markiere nicht beide Kanäle zugleich: Plot Spectrum fasst ausgewählte Kanäle zusammen.
5. Subtrahiere beide dB-Werte. Wiederhole die Messung an einem weiteren aufgenommenen Abschnitt und möglichst mit einer zweiten Kassette.
6. Vergleiche mit einer [direkten Interface-Messung](../loopback-round-trip/), wenn du die Kabel vorübergehend umstecken kannst. Ohne diese Referenz beschreibst du den Unterschied als Eigenschaft der gesamten Signalkette.

## Wann eine Pegelkorrektur sinnvoll ist

Hypothetische Werte von −18,0 dBFS links und −19,2 dBFS rechts ergeben einen Unterschied von 1,2 dB. Zeigt die direkte Interface-Aufnahme denselben Unterschied, würde eine Aufnahmekorrektur den Messweg ausgleichen, nicht das Band.

Bleibt nach Prüfung der Signalkette ein stabiler Unterschied bestehen, erhält das Absenken des lauteren Kanals mehr Übersteuerungsreserve als das Anheben des leiseren. Mache eine kleine Probe und vergleiche vertraute Musik mit mittiger Monostimme bei ähnlicher Wiedergabelautstärke. Eine an einem Wiedergabegerät ermittelte Korrektur muss auf einem anderen nicht passen.

## Wann du nicht korrigieren solltest

Ändert sich der Unterschied mit der Frequenz, löst eine einzige Pegelkorrektur das Problem nicht. Prüfe Frequenzgang oder Ausrichtung. Schwankt er zwischen Durchläufen, kontrolliere Bandkontakt und mögliche Wackelkontakte. Ein vollständig stummer Kanal verlangt [Fehlersuche](../quiet-channel/), keine starke Anhebung.

Kurzcheck: identisches Eingangssignal, getrennte Kanalanalyse, keine Normalisierung, wiederholbares Ergebnis und dokumentierte Unsicherheit des Interfaces. Das MixtapeForge-Profil kann eine begrenzte Kanalabsenkung vorschlagen, wenn die eigene Messung sie stützt. Übertrage keinen ungeprüften Fehler der Messkette auf jede Aufnahme.
