---
id: "nak-t100-practical-guide"
lang: "de"
title: "NAK T-100: das Kassettendeck praktisch vermessen"
description: "Den Signalweg einrichten, eine wiederholbare Referenz bestimmen und passende Tests für Deck, Band und Referenzkassetten wählen."
primaryKeyword: "NAK T-100"
secondaryKeywords: ["Referenzkassette","separate Wiedergabepegel-Prüfung","Frequenzgangtest mit einzelnen Tönen","Aufnahmeprofil-Ablauf"]
searchIntent: "task"
answer: "NAK T-100 ist ein eigenständiger Audioanalysator, kein Kassettenplayer und kein automatisches Deck-Einstellsystem. Beantworte in der ersten Sitzung eine begrenzte Frage: Liefert derselbe Aufbau bei wiederholten Aufnahmen einen stabilen Pegel und eine stabile Klangbalance?"
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100: offizielle Übersicht und technische Daten", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "NAK T-100: Checkliste für Messungen", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "NAK T-100: offizielle häufige Fragen", "url": "https://www.anaxwaves.com/NAKT100/T100FAQ/index.html"}, {"title": "NAK T-100: Entwicklerbeschreibung und Versionsverlauf", "url": "https://apps.apple.com/us/app/nak-t-100-audio-analyzer/id1533153639?mt=12"}]
related: ["calibration-basics", "speed-test", "wow-flutter", "recording-profile"]
guideType: "procedure"
prerequisites: ["without-reference-tape"]
next: ["frequency-response", "wow-flutter"]
---

## Zuerst die Frage festlegen

Der folgende Ablauf ist eine aus der Entwicklerdokumentation abgeleitete Messmethode, kein Bericht über für diesen Artikel getestete Hardware. Lies die Hilfe deiner installierten Version und das Deck-Handbuch. Die verlinkte Checkliste erinnert erfahrene Anwender an Schritte; sie ersetzt keines der Handbücher. Die genannten Softwarebedienelemente tragen ihre englischen Bezeichnungen.

## Was du vorbereitest

Du benötigst NAK T-100, ein Interface mit Stereo-Line-Ein- und Ausgängen, passende Kabel und eine entbehrliche Kassette für Aufnahmetests. Für unabhängige Geschwindigkeits- oder Ausrichtungsprüfungen kommt die passende [Referenzkassette](../calibration-tapes/) hinzu. Ein Dreikopfdeck kann das gerade aufgenommene Signal unmittelbar zurückliefern; ein Zweikopfdeck muss aufnehmen, zurückspulen und wiedergeben.

Eine **relative Referenz** ist zunächst nur eine Anzeige, die du als Vergleichspunkt festhältst. Nützlich wird sie, wenn sie sich mit unveränderten Reglern wiederholen lässt. Sie ist nicht automatisch eine kalibrierte magnetische oder elektrische Referenz.

## Installieren und einen bekannten Signalweg schaffen

Folge den offiziellen Store-Links für dein Betriebssystem. Die FAQ beschreibt kostenpflichtige Dauerlizenzen für Windows und macOS, die getrennt gekauft werden; prüfe die aktuelle Verfügbarkeit im jeweiligen Store. Eine native Linux-Version wird nicht angeboten.

Verbinde für Aufnahmetests **Interface-Ausgang → LINE IN des Decks** und **LINE OUT des Decks → Line-Eingang des Interfaces**. Wähle an beiden Enden das gewünschte Stereopaar. Nutze gegebenenfalls die Kanalzuordnung deiner Version oder die Routingsoftware des Interfaces. Vermeide reine Mikrofonwege mit automatischer Verstärkung.

Wähle eine gemeinsame, unterstützte Abtastrate für Ein- und Ausgang. Für den oberen Audiobereich sind, sofern verfügbar, 48 oder 96 kHz sinnvoll; eine höhere Einstellung gleicht keinen schlechten Analogweg aus. Deaktiviere Klangverbesserungen, EQ, automatische Pegelregelung und unbeabsichtigte Rückführung des Eingangs zum Ausgang. Höre Testtöne über Lautsprecher oder Kopfhörer nur leise ab.

## Pegel klären, bevor du Fehler suchst

Beginne mit ausgeschalteter Rauschunterdrückung und richtigem Bandtyp. Fotografiere die Regler und notiere Interface-Verstärkungen. Verwende, falls vorhanden, den Source-Monitorweg des Decks: Er prüft den elektrischen Weg vor Einbeziehung des Bandes. Er beweist keine Kalibrierung des Bandwegs.

Suche im Modus **Basic** nach **Function**, **OSC** und der Pegelanzeige. Beginne mit **Level**, einer konstanten **400-Hz**-Referenz und niedriger Ausgabe. Erhöhe langsam bis zu einer für dein Deck sinnvoll angegebenen Anzeige und kontrolliere, dass der Interface-Eingang nicht übersteuert. Übernimm weder Reglerstellungen eines anderen Geräts noch die Annahme, jeder Nullpunkt sei gleich.

NAK T-100s kalibrierte Spannungsreferenz, die 0-VU-Markierung des Decks und 0 dBFS sind unterschiedliche Bezugspunkte. Seine Spannungsskala benötigt eine externe Spannungskalibrierung, bevor du sie als absolutes Voltmeter verwendest. Für diese erste Sitzung genügt ein dokumentierter relativer Ausgangspunkt. Für einen absoluten Bezug nutze die [separate Wiedergabepegel-Prüfung](../playback-level/).

## Das Interface bei Bedarf separat prüfen

Wenn du den Interface-Ausgang vorübergehend direkt mit seinem Line-Eingang verbinden kannst, miss zuerst diesen **Loopback**. Beginne mit abgesenkter Ausgabe und einem dafür geeigneten Line-Eingang. So erkennst du die Grenzen dieses Ausgangs-Eingangs-Paars, bevor das Deck hinzukommt. Behältst du die vorhandene Verkabelung, notiere, dass keine unabhängige Interface-Referenz gemessen wurde.

Die optionale Funktion **Sound Card FR Compensation** ist als Anzeigekompensation dokumentiert. Sie schickt keinen korrigierenden EQ zum Deck, erzeugt keine absolute Spannungskalibrierung und wird kein Kassetten-Aufnahmeprofil. Prüfe sie erneut, wenn du die betreffenden Ports, Abtastrate oder Verstärkungen änderst.

## Die erste Sitzung Schritt für Schritt

1. Wähle das physische Stereo-Ein- und Ausgangspaar. Gleiche dessen Abtastrate im Betriebssystem oder Interface-Kontrollfeld an. Beginne mit niedriger Ausgabe.
2. Stelle am Deck den richtigen Bandtyp und NR aus ein. Wähle in Basic die Function **Level** und OSC **400 Hz**.
3. Beobachte die Source-/Eingangsanzeige des Decks und erhöhe die Ausgabe langsam bis zu einer mäßigen Referenz. Notiere diese Anzeige und halte die Erfassung unter der Übersteuerungsgrenze. Der Nullpunkt des Analysators entspricht nicht zwangsläufig dem des Decks.
4. Fahre über das Vorspannband hinaus, drücke REC am Deck und zeichne ungefähr zehn Sekunden auf. Halte alle Verstärkungen fest.
5. Bei zwei Köpfen: stoppen, zurückspulen, PLAY. Bei drei Köpfen: Tape-Monitoring wählen. Lies die stabile Mitte auf L/R ab und notiere die Werte.
6. Wiederhole ohne Verstellung. Driften die Anzeigen deutlich, untersuche Band, Anschlüsse und Erfassung vor dem Frequenzgangtest.

Vergleiche die stabile Mitte, nicht Start oder Ende. Notiere beide Kanäle, wiederhole mit unveränderten Reglern und höre zurück. Ein schwankendes Ergebnis verlangt Untersuchung vor Korrektur. Der Rücklauf vereint Interface-, Aufnahme- und Wiedergabefehler; allein daraus lässt sich die verantwortliche Stufe nicht bestimmen.

## Frequenzgang bei kontrolliertem Pegel untersuchen

Öffne **Scope** und suche die Frequenzgangfunktionen. Verwende für den ersten Vergleich **FR White** oder **FR Sweep** mit bewusst abgesenktem Aufnahmepegel und kontrolliere den tatsächlichen Pegel am Deck. **−20 dB** ist nur mit dokumentierter Referenz aussagekräftig. Ein Messbereichsschalter reduziert nicht zwangsläufig das erzeugte Signal.

Nimm einen vollständigen Testdurchlauf auf und wiederhole unter denselben Bedingungen. **FR Sweep ist als asynchron dokumentiert**: Auf einem Zweikopfdeck zeichnest du auf, stoppst, spulst zurück und spielst durch den Analysator mit passender FR-Messung ab. Die Erfassungsdetails stehen in der mitgelieferten Hilfe. Ein angenommener externer Schalter zur Sweep-Synchronisation ist nicht erforderlich.

Beurteile stabile Kanalunterschiede und breite Tendenzen vor kleinen Welligkeiten. Ein zweiter Test mit höherem Pegel kann Höhensättigung zeigen, beantwortet aber eine andere Frage. Bewahre dessen Kurve separat auf, statt beide Ergebnisse zu einem Frequenzgang zusammenzuführen. Ohne Wiedergabe-Referenzband beschreibt das Ergebnis die vollständige Aufnahme-Wiedergabe-Kette.

Eine reproduzierbare Alternative mit ausdrücklich beschriebenen Tonerzeugungs- und Analyseschritten bietet der [Frequenzgangtest mit einzelnen Tönen](../frequency-response/). Für die Erfassung mit NAKs FR Sweep ist die Hilfe deiner Version maßgeblich; dieser Abschnitt beschreibt dessen Rolle und ersetzt nicht den vollständigen Bedienablauf.

## Geschwindigkeit und Gleichlauf nur mit passender Referenz ergänzen

Für eine unabhängige Prüfung der Wiedergabegeschwindigkeit brauchst du eine zuverlässige **Referenzkassette mit 3000 oder 3150 Hz**. Wähle **Speed Wow/Flutter** und passe **Speed Cal.** an diese Kassette an. Ein auf demselben Gerät aufgenommener Ton bestimmt dessen absolute Wiedergabegeschwindigkeit nicht.

Rechenbeispiel: Bei einer 3000-Hz-Referenz entsprechen gemessene 3015 Hz ungefähr **+0,5 %**: `(3015 / 3000 − 1) × 100`. Das sind illustrative Zahlen, keine Messergebnisse eines Decks.

Notiere bei Gleichlaufwerten immer Detektor und Gewichtung. **Q-PK** und **WRMS** verwenden unterschiedliche Messkonventionen und sind nicht austauschbar. Eigene Aufnahmen erlauben Wiederholbarkeitsprüfungen, enthalten aber die Laufwerksbeiträge bei Aufnahme und Wiedergabe. Eine einzelne Spitze kann auch durch einen Aussetzer oder ein Erfassungsproblem des Computers entstehen. Wiederhole den Abschnitt vor einer mechanischen Diagnose.

## Verzerrungs- und Rauschwerte vergleichbar halten

Prüfe Verzerrung mit der dokumentierten Funktion **T.H.Dist.**, bekannter Grundfrequenz und festem Aufnahmepegel. Kennzeichne **THD+N** und **HD3** getrennt; sie sind nicht gleichwertig. Steigt die Anzeige, schließe eine Übersteuerung des Interfaces oder Deck-Eingangs aus, bevor du das Band verantwortlich machst.

Wähle für Rauschen **Noise-A (−40 dB)** und miss einen aufgenommenen stillen Abschnitt, ohne dass ein Testton das Band erreicht. Bei drei Köpfen kannst du während der Aufnahme Tape überwachen; bei zwei Köpfen nimmst du Stille auf und spielst sie anschließend ab. Behalte denselben Verstärkungsweg. Nach der Skalenkonvention der verlinkten Checkliste ziehst du **40 dB** von der angezeigten dB-Zahl ab, bei Meter Range **−20 dB/0.1%** zusätzlich **20 dB**. Bestätige diese Skalenversätze anhand deiner Versionshilfe, bevor du einen Wert veröffentlichst. Dokumentiere Referenzpegel und Gewichtung: Der korrigierte Rauschpegel ist noch kein positiver Rauschabstand. Hypothetisches relatives Beispiel: 0 dBr Referenz und −55 dBr korrigiertes Rauschen ergeben 55 dB Abstand unter denselben Konventionen, keine universelle Deck-Spezifikation.

## Aussagekräftige Unterlagen aufbewahren

Erfasst du den Rücklauf zusätzlich mit einem Audiorecorder, bewahre diese unverarbeitete Stereodatei auf. Speichere Screenshots, Softwareversion, Bandbezeichnung und Reglerstellungen zusammen. Nenne bei jedem Wert Pegel und Methode: „0,08 %“ ohne Detektor oder „linear bis 18 kHz“ ohne Aufnahmepegel ist unvollständig.

Drehe nicht an Kopfschrauben, Bias- oder Service-Trimmern, nur um eine Grafik gerade zu machen. Interne Justage folgt dem Serviceverfahren des Modells und benötigt geeignete Referenzmittel. NAK T-100 misst; es stellt das Deck nicht mechanisch ein.

MixtapeForges [Aufnahmeprofil-Ablauf](../recording-profile/) ist getrennt davon. Ein automatischer Import von NAK-T-100-Messungen in diese Profile ist nicht dokumentiert. Verwende den eigenen geführten Test für ein wiederverwendbares App-Profil und die Analysatorbeobachtungen zum Verständnis der Kette. Versprich daraus keine automatische Korrektur für jeden Player. MixtapeForge hat derzeit keine deutsche Oberfläche; die verlinkte Anleitung nennt englische Bedienbezeichnungen.

## Wenn der erste Test scheitert

| Symptom | Prüfen | Nächster Schritt |
| --- | --- | --- |
| Keine Eingangsbewegung | Physischer LINE IN gewählt, Stereopaar passt zum Kabel | Routing vor höherer Verstärkung korrigieren |
| Klarer Ton, aber abgeschnittene Welle | Line-Modus und Eingangsbereich des Interfaces | Erfassungsverstärkung senken und Referenz wiederholen |
| Höhenkurve verändert sich bei jedem Durchlauf | Bandkontakt, Abschnitt und Erfassungsaussetzer | Vor EQ mit einer anderen intakten Kassette wiederholen |
| Geschwindigkeit außerhalb der Erwartung | 3000-/3150-Hz-Referenz und passende Speed Cal. | Referenzauswahl korrigieren, nicht den Motor |
| Rauschwert unplausibel | Noise-A, Meter Range und Skalenversätze | Mit dokumentierten Versätzen und gleicher Referenz neu rechnen |

Abschlussprüfung: physische Line-Verbindungen, feste Verstärkungen, Source/Tape unterschieden, vollständige Wiedergabe, Messgröße und Referenz genannt, Rohdaten erhalten. Die Verfahren wurden anhand der Dokumentation geprüft, nicht an deiner Hardware validiert.
