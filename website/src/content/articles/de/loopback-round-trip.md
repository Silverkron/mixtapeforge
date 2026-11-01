---
id: "loopback-round-trip"
lang: "de"
title: "Das Audiointerface prüfen, bevor du die Kassette verantwortlich machst"
description: "Vergleiche direkte Interface-Rückführung und Banddurchlauf und erkenne, welche Einflüsse sich damit trennen lassen."
primaryKeyword: "Das Audiointerface prüfen, bevor du die Kassette verantwortlich machst"
secondaryKeywords: ["den grundlegenden Aufnahmeablauf","das Mehrfrequenzverfahren","Kanalbalance-Prüfungen","Aufnahmeprofile"]
searchIntent: "evaluation"
answer: "Ein Loopback verbindet den Ausgang des Audiointerfaces direkt mit dessen Eingang. Beim Aufnahme-Wiedergabe-Durchlauf liegen Deck und Kassette dazwischen. Der Vergleich kann Fehler sichtbar machen, die schon ohne Band vorhanden sind."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "REW: Audiointerface konfigurieren", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}, {"title": "Audacity: Tongenerator", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: Spektrumanalyse", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "Audacity: Audiogeräte und Kanäle einstellen", "url": "https://manual.audacityteam.org/man/audio_setup_toolbar.html"}, {"title": "Audacity: Aufnahmeeinstellungen und Overdub", "url": "https://manual.audacityteam.org/man/recording_preferences.html"}, {"title": "Audacity: Aufnahme und WAV-Export", "url": "https://manual.audacityteam.org/man/record.html"}]
related: ["without-reference-tape", "channel-balance", "recording-profile"]
guideType: "measurement"
prerequisites: ["calibration-basics"]
next: ["frequency-response"]
---

## Geräte und feste Einstellungen

Verwende ein Interface mit Line-Eingängen, passende Line-Kabel, Audacity und eine überschreibbare Kassette. Prüfe vor der Direktverbindung das Interface-Handbuch: Ein reiner Mikrofoneingang könnte übersteuern. Deaktiviere Monitoring, das den Eingang wieder zum selben Ausgang sendet.

Dieser Test erfordert bewusst ein Umstecken. Möchtest du das Deck angeschlossen lassen, überspringe Loopback und kennzeichne das Ergebnis als „gesamte Signalkette“, nicht als interfacekorrigiert.

## Gleichzeitige Wiedergabe und Aufnahme in Audacity einrichten

Die Menünamen beziehen sich auf die englische Oberfläche. Unter **Audio Setup** wählst du das Interface als Playback Device, die **physischen Line-Eingänge** als Recording Device und **2 (Stereo)** Aufnahmekanäle. Ein Windows-„Loopback“-Aufnahmegerät erfasst den digitalen Computerausgang und umgeht gerade die zu prüfenden Kabel. Stelle unter Audio Settings dieselbe Projekt-/Interface-Abtastrate ein.

Aktiviere unter **Preferences > Recording** die Optionen **Play other tracks while recording (overdub)** und **Record on a new track**. Deaktiviere **Audible input monitoring** beziehungsweise Software Playthrough in älteren Versionen sowie klanggesteuerte Aufnahme. Schalte auch jede Rückführung vom Eingang auf diese Ausgänge im Interface-Mixer aus.

Erstelle **Tracks > Add New > Stereo Track**, markiere sie und nutze **Generate > Tone**: Sine, 1000 Hz, amplitude 0.1, zehn Sekunden. Setze den Cursor an den Anfang, ohne einen Zeitbereich auszuwählen. Drücke Record: Mit diesen Einstellungen spielt Audacity die Quelle ab und nimmt gleichzeitig den physischen Rücklauf auf einer neuen Stereospur auf. Stoppe nach dem Ton, schalte die Quellspur stumm und exportiere nur die Rückaufnahme als WAV. Kontrolliere Exportvorschau/Auswahl, damit das Original nicht hineingemischt wird. Benenne beide Spuren eindeutig. Schalte bei der nächsten Referenzaufnahme alte Rückaufnahmen stumm, damit sie nicht erneut zum Eingang gelangen.

Für den Banddurchlauf spiele das Original in die Aufnahme des Decks, stoppe und spule zurück. Erfasse die Wiedergabe in einem **neuen leeren Projekt**: erst Record in Audacity, dann PLAY am Deck, nach dem Ton stoppen. So bleiben Original und Rücklauf getrennt. Falls dies deine erste Stereoaufnahme vom Band ist, siehe [den grundlegenden Aufnahmeablauf](../without-reference-tape/).

## Beide Signalwege aufnehmen

1. Erzeuge zehn Sekunden 1-kHz-Sinus mit amplitude 0.1 in Audacity. Wähle eine gemeinsam unterstützte Abtastrate und identische Signale auf beiden Ausgängen.
2. Verbinde L/R-Ausgänge direkt mit L/R-Line-Eingängen. Beginne leise und erhöhe bis zu einem klaren Signal ohne Übersteuerung. Speichere die Stereoaufnahme als „Interface-Referenz“.
3. Notiere Ausgangslautstärke, Eingangsverstärkung, Abtastrate und Ports. Stoppe die Wiedergabe vor dem Umstecken über das Deck: Ausgang → LINE IN; LINE OUT → Interface-Eingang.
4. Lass die Interface-Regler unverändert. Nimm ohne NR auf dem richtigen Bandtyp bei mäßigem Deckpegel auf. Spule zurück und erfasse die Wiedergabe.
5. Teile jede Rückaufnahme in Audacity in einzelne Kanäle. Markiere die Tonmitte und vergleiche ihren Peak in Plot Spectrum mit identischen Einstellungen.
6. Wiederhole einmal. Für Klangunterschiede nutze [das Mehrfrequenzverfahren](../frequency-response/), zuerst direkt, danach über Band.

### Jeden Kanal in Plot Spectrum lesen

Öffne das Menü der aufgenommenen Spur und wähle **Split Stereo Track**. Markiere die Mitte des linken Tons ohne Anfang und Ende. Öffne **Analyze > Plot Spectrum**; wähle **Spectrum**, **Hann** und eine zur Tontrennung ausreichende FFT-Größe, beispielsweise 16384. Setze den Cursor beim 1-kHz-Peak und lies die Peakangabe unter dem Diagramm. Wiederhole rechts und für jede Aufnahme mit gleicher Intervalllänge und Einstellung. Wähle zum Vergleich nie beide Kanäle zusammen.

## Den Vergleich interpretieren

Hypothetisches Beispiel: Im direkten Weg ist rechts 1 dB weniger Pegel, beim Bandweg ebenfalls. Eine Korrektur der Kassettenaufnahme könnte damit einen Fehler des Interface-Eingangs dauerhaft auf jedes Band schreiben. Prüfe zuerst Signalführung und Verstärkungen des Interfaces.

Verzerrungsprozente und Rauschpegel in dB darfst du nicht einfach voneinander abziehen; diese Beiträge addieren sich nicht wie gewöhnliche Verstärkungen mit Vorzeichen. Auch eine Loopback-Frequenzkurve gilt nur für die verwendeten Einstellungen und Anschlüsse.

## Wenn etwas auffällt

Stille deutet oft auf falschen Eingang, falsche Kanalzuordnung oder fehlenden Line-Modus. Ein Heulen weist auf eine Monitor-Rückkopplung hin: Wiedergabe stoppen und Monitoring deaktivieren. Übersteuerung der direkten Referenz macht den Vergleich ungültig; reduziere den betreffenden Pegel und wiederhole beide Wege.

Behalte rohe WAVs und Einstellungen. Eine wiederholbare Referenz macht [Kanalbalance-Prüfungen](../channel-balance/) und [Aufnahmeprofile](../recording-profile/) verlässlicher, kalibriert aber nicht den Wiedergabekopf.
