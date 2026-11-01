---
id: "without-reference-tape"
lang: "de"
title: "Kassettenaufnahmen ohne Referenzband untersuchen"
description: "Führe einen wiederholbaren Aufnahme-Wiedergabe-Test durch und erkenne, welche Aussagen eine unabhängige Referenz erfordern."
primaryKeyword: "Kassettenaufnahmen ohne Referenzband untersuchen"
secondaryKeywords: ["der Frequenzgangmessung","Unabhängige Referenzbänder","Aufnahmeprofil","Das Audiointerface prüfen, bevor du die Kassette verantwortlich machst"]
searchIntent: "task"
answer: "Du kannst Bänder vergleichen, Kanalunterschiede erkennen und dumpfe Aufnahmen untersuchen, ohne eine Kalibrierkassette zu kaufen. Gemessen wird dabei der gesamte Weg: Aufnahmeelektronik, Band, Wiedergabeelektronik und Audiointerface zusammen."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: Tongenerator", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: Spektrumanalyse", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "NAK T-100: Mess-Checkliste", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "Audacity: Audiogeräte und Kanäle einstellen", "url": "https://manual.audacityteam.org/man/audio_setup_toolbar.html"}, {"title": "Audacity: Aufnahmeeinstellungen und Overdub", "url": "https://manual.audacityteam.org/man/recording_preferences.html"}, {"title": "Audacity: Aufnahme und WAV-Export", "url": "https://manual.audacityteam.org/man/record.html"}]
related: ["loopback-round-trip", "calibration-tapes", "eq-limits"]
guideType: "procedure"
prerequisites: ["calibration-basics"]
next: ["recording-profile", "frequency-response"]
---

## Was du brauchst

Verwende eine überschreibbare Leerkassette, Stereo-Line-Verbindungen und Audacity für einen ersten einfachen Test. **Generate > Tone** erzeugt einen Sinuston. Ein Sinus enthält nur eine Frequenz; Änderungen lassen sich damit leichter erkennen als mit Musik. Ein Notizbuch oder eine Tabelle reicht zum Festhalten der Ergebnisse. Die genannten Audacity-Menüs beziehen sich auf die englische Oberfläche.

## Audacity einmal richtig einrichten

Öffne **Audio Setup**. Wähle das Interface unter **Playback Device**, dessen physischen Line-Eingang unter **Recording Device** und **Recording Channels > 2 (Stereo)**. Wähle kein „Loopback“-Gerät, das Computerausgabe digital mitschneidet. Unter **Audio Settings** stellst du eine vom Interface unterstützte Projekt-Abtastrate ein.

Schalte unter **Preferences > Recording** auf macOS im Audacity-Menü **Audible input monitoring** aus; ältere Versionen nennen es Software Playthrough. Deaktiviere auch klanggesteuerte Aufnahme, damit Stille und Markierungen nicht ausgelassen werden. Unterbinde im Interface-Mixer jede direkte Rückführung des Eingangs auf diese Ausgänge.

Für identische Kanäle wähle **Tracks > Add New > Stereo Track**, markiere die Spur und nutze Generate > Tone. Bei einer vorhandenen Monodatei duplizierst du stattdessen die Spur, setzt beide Spurverstärkungen auf 0 dB und wählst im Menü der oberen Spur **Make Stereo Track**. Die obere Spur wird links, die untere rechts. Pan und Effekte bleiben neutral.

Um das Signal auf Band zu bringen, drücke REC am Deck, warte auf laufendes beschreibbares Band und starte Play in Audacity. Stoppe beide nach dem Ton. Erstelle für die Rückaufnahme ein **neues leeres Audacity-Projekt** mit denselben Eingangseinstellungen. Starte dort zuerst Record, dann PLAY am Deck. Stoppe Audacity nach dem Ton und exportiere unter **File > Export Audio** eine Stereo-WAV ohne Normalisierung. Getrennte Wiedergabe- und Aufnahmeprojekte verhindern, dass das Original versehentlich in die Rückaufnahme gemischt wird.

## Einen wiederholbaren Test durchführen

1. Verbinde Interface-Ausgang mit LINE IN und LINE OUT mit dem Interface-Line-Eingang. Wähle diese Ports, Stereoaufnahme und durchgängig dieselbe unterstützte Abtastrate. Monitoring, EQ, Kompression, automatische Verstärkung und NR bleiben aus.
2. Erzeuge zehn Sekunden **1 kHz, Sine, amplitude 0.1**. Das entspricht −20 dBFS Spitzenpegel in der Datei, nicht automatisch −20 auf dem Deckmeter. L/R erhalten identisches Audio.
3. Beginne mit geringer Ausgangslautstärke, stelle einen mäßigen Aufnahmepegel ein und notiere die Deckanzeige. Lass am Interface-Eingang Reserve. Markiere die Reglerstellungen und verändere sie nicht.
4. Nimm hinter dem transparenten Vorspann auf. Stoppe, spule zurück und erfasse die Wiedergabe als unbearbeitete Stereo-WAV. Beim Zweikopfdeck ist diese getrennte Wiedergabe unverzichtbar.
5. Wiederhole an einer anderen Bandstelle. Teile die Stereospur in Audacity in L/R, markiere die stabile Mitte eines Kanals und öffne **Analyze > Plot Spectrum**. Verwende Spectrum, Hann und dieselbe FFT-Größe für beide Aufnahmen. Vergleiche den 1-kHz-Peak für jeden Kanal getrennt.
6. Bewahre Original, beide Rückaufnahmen und Einstellungen zusammen auf. Fahre erst mit [der Frequenzgangmessung](../frequency-response/) fort, wenn sich die Pegel zuverlässig wiederholen.

## Was die Zahlen aussagen

Hypothetisches Ergebnis: Links werden in beiden Aufnahmen −18 dBFS, rechts −19 dBFS angezeigt. Das deutet auf einen wiederholbaren Unterschied von 1 dB irgendwo im Signalweg. Es beweist nicht, dass der rechte Aufnahmekanal um 1 dB angehoben werden muss; der Messeingang könnte verantwortlich sein.

Auch null Geschwindigkeitsabweichung beim selbst aufgenommenen Ton ist kein Beweis. Dieselbe falsche Aufnahme- und Wiedergabegeschwindigkeit kann sich aufheben. [Unabhängige Referenzbänder](../calibration-tapes/) lösen dieses Problem.

## Wenn das Ergebnis nicht stabil wird

Springt der Peak, probiere eine andere Bandstelle und prüfe die Rohaufnahme auf Aussetzer. Übersteuern beide Kanäle, reduziere die Eingangsverstärkung und wiederhole beide Durchläufe. Fehlt das Rücksignal, kontrolliere physischen LINE IN statt Software-Loopback.

Checkliste: gleiche Regler, vollständige Wiedergabe, keine Übersteuerung, getrennte Kanäle, wiederholbares Ergebnis. MixtapeForges [Aufnahmeprofil](../recording-profile/) automatisiert eine umfangreichere Testfolge, behält aber dieselbe Einschränkung des gesamten Aufnahme-Wiedergabe-Wegs.
