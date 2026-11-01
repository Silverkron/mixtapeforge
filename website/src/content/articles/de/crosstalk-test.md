---
id: "crosstalk-test"
lang: "de"
title: "Übersprechen zwischen den Stereokanälen einer Kassette messen"
description: "Jeweils nur einen Kanal aufzeichnen und unerwünschtes Übersprechen von Rauschen oder falschem Routing unterscheiden."
primaryKeyword: "Übersprechen zwischen den Stereokanälen einer Kassette messen"
secondaryKeywords: ["direkten Interface-Loopback","Rauschmessung","Das Audiointerface prüfen, bevor du die Kassette verantwortlich machst","Bandrauschen im Verhältnis zum aufgenommenen Signal messen"]
searchIntent: "evaluation"
answer: "Übersprechen bedeutet, dass ein Signal in einem Kanal auftaucht, der still sein sollte. Dieser Test prüft links nach rechts und rechts nach links auf einer Kassettenseite. Er misst nicht das Übersprechen von den Spuren der Rückseite; dafür wäre eine andere Aufnahmeanordnung nötig."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: Tongenerator", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: Stereospuren aufteilen", "url": "https://manual.audacityteam.org/man/splitting_and_joining_stereo_tracks.html"}, {"title": "Audacity: Spektrumanalyse", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "REW: Audiointerface konfigurieren", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}]
related: ["loopback-round-trip", "tape-hiss-snr", "different-decks"]
guideType: "measurement"
prerequisites: ["channel-balance"]
next: ["phase-polarity"]
---

## Eine bekannte Stereodatei vorbereiten

Du benötigst Audacity, ein Stereo-Line-Interface und eine leere Kassette. Erzeuge auf einer Monospur zehn Sekunden **1-kHz-Sinus mit Amplitude 0,1**, stelle das Panorama ganz nach links und exportiere einen Stereo-WAV mit stillem rechten Kanal. Erzeuge einen zweiten Abschnitt mit dem Ton ganz rechts und links Stille. Importiere den exportierten WAV erneut und kontrolliere, dass die Stille tatsächlich in der Datei enthalten ist.

Verbinde Interface-Ausgang L/R → LINE IN des Decks und LINE OUT → Line-Eingang des Interfaces. NR bleibt aus, der Bandtyp muss stimmen. Keine Effekte, Stereoverbreiterung, Monosumme oder Eingangsüberwachung verwenden. Halte die Eingangsverstärkung fest und vermeide Übersteuerung. Die unten genannten Audacity-Befehle sind englische Menübezeichnungen.

## Beide Richtungen messen

1. Nimm beide Abschnitte mit mäßigem Pegel auf. Spule zurück und erfasse die vollständige Wiedergabe als Stereo-WAV.
2. Teile die Aufnahme in Audacity in einzelne Kanäle auf. Wähle im linken Kanal die stabile Mitte des links angesteuerten Abschnitts.
3. Verwende in **Plot Spectrum** bei allen Ablesungen dieselben Einstellungen für Spectrum, Hann und FFT-Größe. Notiere den 1-kHz-Spitzenwert im angesteuerten Kanal.
4. Wähle genau dasselbe Zeitintervall im nominell stillen rechten Kanal. Lies dessen 1-kHz-Spitze ab, sofern sie sich klar vom umgebenden Rauschen abhebt.
5. Ziehe den Übersprechpegel vom Nutzpegel ab. Wiederhole die Messung für den rechts angesteuerten Abschnitt und anschließend die Aufnahme.
6. Vergleiche nach Möglichkeit einen [direkten Interface-Loopback](../loopback-round-trip/). Ohne ihn beschreibst du die Kanaltrennung der gesamten Kette, nicht allein des Decks.

## Ergebnis deuten

Hypothetisches Beispiel: Der angesteuerte Kanal liegt bei −20 dBFS, der Ton im anderen Kanal bei −60 dBFS. Das ergibt **40 dB Kanaltrennung bei 1 kHz**. Eine größere positive Trennung bedeutet weniger Übersprechen. Alternativ lässt sich −40 dB Übersprechen angeben; nenne immer die verwendete Konvention.

Ist bei einem Rauschboden von −60 dBFS kein Ton erkennbar, kannst du eine durch diesen Boden begrenzte Aussage machen, aber keinen exakten Wert von 40 dB. Verwende nicht den gesamten Rauschpegel als vermeintlichen Pegel des übergesprochenen Tons.

## Häufige Einrichtungsfehler finden

Fast gleiche Pegel in beiden Kanälen sprechen zunächst für eine Prüfung von Mono-Routing oder Monitoring. Übersprechen bereits in der exportierten Testdatei macht die Prüfung unbrauchbar. Ein stark frequenzabhängiges Ergebnis verlangt mehr als diesen Einfrequenzvergleich.

Zum Abschluss prüfen: Gegenkanal wirklich still, Verstärkung fest, Ton vom Rauschen unterscheidbar, beide Richtungen und Ergebnis wiederholt. Die [Rauschmessung](../tape-hiss-snr/) erklärt die Messgrenze. Eine Polaritätsbearbeitung entfernt gewöhnliches Übersprechen nicht.
