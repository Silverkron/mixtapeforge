---
id: "flux-stereo-tool"
lang: "de"
title: "FLUX Stereo Tool: Stereo vor der Kassettenaufnahme prüfen"
description: "Mit Monoreferenz, Musik und Bandrücklauf Kanalprobleme untersuchen, statt blind zu bearbeiten."
primaryKeyword: "FLUX Stereo Tool"
secondaryKeywords: ["Phase und Polarität unterscheiden","Messung der Kanalbalance","Prüfungen für einen leisen Kanal","Stereopolarität und Zeitversatz mit einem bekannten Monosignal prüfen"]
searchIntent: "task"
answer: "Diese Anleitung behandelt FLUX Stereo Tool, nicht ähnlich benannte Rundfunkprozessoren. Es bietet Kanaleinstellungen und Stereoanzeigen. Lade es über die offiziellen FLUX-Seiten herunter. Freeware beschreibt den Preis, nicht die Erlaubnis, das Plugin in einer anderen Anwendung mitzuliefern."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "FLUX Stereo Tool: offizielle Freeware-Seite", "url": "https://www.flux.audio/project/stereo-tool-freeware/"}, {"title": "Stereo Tool: offizielles Handbuch", "url": "https://doc.flux.audio/stereotool/"}, {"title": "FLUX Center: offizielle Downloads", "url": "https://www.flux.audio/download/"}, {"title": "FLUX: Systemanforderungen der Plugins", "url": "https://www.flux.audio/plugin-specifications/"}, {"title": "REAPER 7: Geräte, Spuren, Effekte, Mono-Abhören und Export", "url": "https://dlx.reaper.fm/userguide/html/"}]
related: ["phase-polarity", "channel-balance", "quiet-channel"]
guideType: "procedure"
prerequisites: ["channel-balance"]
next: ["phase-polarity", "recording-profile"]
---

## Das richtige Stereo Tool installieren

Die veröffentlichten Anforderungen nennen Windows und macOS; Linux ist nicht aufgeführt. Die Produktseite nimmt diese Freeware ausdrücklich von Aktivierung und Dongle-Pflicht aus. Vergleiche das angebotene Plugin-Format vor der Installation mit deinem Host. Die Bezeichnung VST allein belegt keine VST3-Unterstützung.

Verwende für diese Übung einen Host, der den eigenen Plugin-Editor öffnen kann. Der Ablauf wurde aus der Dokumentation abgeleitet; er ist kein Bericht über eine hier geprüfte Installation oder einen Hardwaretest.

## Konkretes Host-Beispiel: REAPER

Die folgenden Menünamen stammen aus dem englischen REAPER-7-Handbuch. Der dokumentierte Ablauf bedeutet nicht, dass dieses Plugin hier installiert und getestet wurde.

1. Wähle unter **Options > Preferences > Audio > Device** dein Interface und den gewünschten Stereoausgang. Erzeuge mit **Track > Insert new track** eine Spur. Importiere den Referenz-WAV aus dem Media Explorer über **Insert into project**, ohne Zeitdehnung oder Normalisierung.
2. Öffne **View > FX Browser**, suche FLUX Stereo Tool und ziehe es auf das Spurfeld. Öffne das FX-Fenster der Spur und wähle das Plugin, um seinen Editor anzuzeigen. Panorama bleibt mittig, andere Effekte ausgeschaltet.
3. Blende **View > Master Track** ein. Mit dessen **Mono/Stereo**-Schalter prüfst du während der folgenden Übung die Summe. Stelle anschließend wieder Stereo ein. Das Deck bleibt während des Kennenlernens außerhalb von REC.
4. Um eine beabsichtigte Korrektur zu speichern, schalte diese Spur solo und wähle **File > Render**. Exportiere Stereo-WAV mit der Projekt-Abtastrate, ohne Normalisierung und unter neuem Namen. Prüfe Kanäle und Spitzen vor dem Import in MixtapeForge. Speichere auch das REAPER-Projekt, damit die Plugin-Einstellungen erhalten bleiben.

## Mit neutralen Einstellungen beginnen

Lade Stereo Tool auf eine Stereospur. Setze es zurück, stelle beide Eingangsverstärkungen auf **0 dB**, schalte Polaritätsumkehr aus und behalte Standardrouting sowie neutrale Breite. Deaktiviere für die Übung andere Bearbeitung. Höre leise und lasse das Kassettendeck außerhalb von REC.

Erstelle etwa zwanzig Sekunden deiner eigenen Stimme als Monodatei und leite identischen Inhalt nach links und rechts. Bewahre diese Referenz unverändert auf. Anders als eine kommerzielle Mischung mit unbekannter Stereobearbeitung liefert sie einen bekannten Ausgangspunkt.

## Einen Polaritätsfehler erkennen lernen

Das **Goniometer** zeichnet die Beziehung zwischen linkem und rechtem Audiosignal. Die **Korrelation** fasst ihre Ähnlichkeit zusammen: +1 für identische Kanäle, −1 für exakte Gegensignale. Das sind Erwartungen für die Testreferenz, keine Ziele für jede Stereomischung. Siehe [Phase und Polarität unterscheiden](../phase-polarity/).

Spiele die Referenz. Gleiche, identische Kanäle sollten ein mittiges Monobild und eine Korrelation nahe **+1** ergeben. Falls nicht, kontrolliere zuerst das Routing und umgehe andere Effekte.

Kehre vorübergehend **einen** Kanal um. Bei dieser absichtlich identischen Referenz sollte die Beziehung negativ werden und sich **−1** nähern. Höre die Monosumme im Host leise ab: Die Stimme sollte sich weitgehend auslöschen. Stelle den Schalter unmittelbar danach zurück.

Das ist eine Demonstration, keine Korrektur für jede Aufnahme. Polaritätsumkehr ändert das Vorzeichen eines Kanals. Sie beseitigt weder einen frequenzabhängigen Phasenfehler noch einen Zeitversatz.

## Einen leiseren Kanal untersuchen

Verfolge das Ungleichgewicht mit der unveränderten Monoreferenz. Vergleiche die Digitalquelle mit einer Stereoaufnahme des Deck-Rücklaufs. Die [Messung der Kanalbalance](../channel-balance/) hilft, den Unterschied zu beziffern. Taucht er nur im erfassten Rücklauf auf, untersuche den gesamten Weg einschließlich Eingangsverstärkungen. Dieser Rücklauf vereint Aufnahme-, Wiedergabe- und Interfacefehler. Eine Anpassung, die dort hilft, muss auf einem anderen Deck nicht besser klingen.

Zeigen wiederholte Aufnahmen einen stabilen Pegelunterschied, versuche eine kleine Absenkung des lauteren Kanals. **−0,5 dB** ist beispielsweise ein kleiner Versuchswert, kein empfohlener Kalibrierwert. Vergleiche erneut, bevor du etwas speicherst. Erzwinge bei normaler Musik keine gleichen Anzeigen: Instrumente können absichtlich auf einer Seite liegen.

## Musik prüfen, ohne der Anzeige nachzujagen

Wechsle zu einem vertrauten Abschnitt mit Stimme und gehaltenen Instrumententönen. Vergleiche unbearbeitete und bearbeitete Wiedergabe bei ähnlicher Lautstärke. Falls du mit Breite experimentierst, ändere sie nur mäßig und höre anschließend sowohl Stereo als auch die Monosumme des Hosts.

Eine vollständige Mischung benötigt keine dauerhafte Korrelation von +1. Kurze negative Anzeigen sind Anlass zum Hinhören, kein Fehlerbeweis. Behalte die Fassung, die musikalische Balance und Verständlichkeit in Mono wahrt. Kehre zu neutralen Einstellungen zurück, wenn keine klare Verbesserung entsteht.

## Das Ergebnis in den Kassettenablauf übernehmen

Bewahre beim Bandvergleich die rohe Stereoaufnahme auf und untersuche eine Kopie. Ein beständiger Unterschied zwischen Quelle und Rücklauf sagt mehr aus als eine bewegte Grafik allein. Stereoeinstellungen reparieren weder instabilen Bandlauf noch durch schlechte Kopfausrichtung verlorene Höhen oder beschädigtes Band.

MixtapeForge zeigt derzeit generische VST3-Parameter, nicht den nativen Messeditor des Plugins. Die Kompatibilität mit genau diesem Plugin ist nicht geprüft. Alternativ kannst du einen bearbeiteten WAV im kompatiblen Host rendern, in die Mixtape importieren und dieselbe Bearbeitung dort nicht erneut anwenden. Speichere Original, Preset und Testbedingungen, damit du zur unveränderten Version zurückkehren kannst. MixtapeForge besitzt derzeit keine deutsche Oberfläche; Bedienbezeichnungen der Anwendung sind in ihren verfügbaren Sprachen zu verwenden.

## Häufige Probleme und Abschlussprüfung

Fehlt das Plugin im Host, prüfe installiertes Format, Prozessorarchitektur und Scan-Ergebnis anhand der aktuellen FLUX-Anforderungen. Bewegt sich nur eine Pegelanzeige, kontrolliere Spur- und Kanalrouting vor einer Verstärkung. Löscht die Monoüberwachung die absichtlich invertierte Referenz aus, hat die Demonstration funktioniert: Stelle die Polarität vor dem Musiktest zurück.

Ein dauerhaft leiser Kanal kann verschiedene Ursachen haben. Folge den [Prüfungen für einen leisen Kanal](../quiet-channel/), statt extrem nachzuregeln. Vor dem Export prüfen: neutrale oder beabsichtigte Breite, Testschalter zurückgestellt, unverzerrter Ausgang und eindeutiger Dateiname. Die Kompatibilität mit MixtapeForges Host verlangt weiterhin einen echten Plugin-Test; diese Anleitung behauptet keinen solchen Test.
