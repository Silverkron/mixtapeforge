# Analisi funzionale di MixtapeNerd

Stato: baseline documentale al 24 ottobre 2026. Fonti e limiti in [12 — Fonti](12-fonti.md). Sigla **D**: documentato; **S**: sperimentale dichiarato; **V**: verifica ulteriore necessaria.

## Il prodotto da eguagliare

Il flusso è selezionare e ordinare musica, adattarla al supporto, preparare i livelli, quindi produrre master o riprodurre verso il deck. La particolarità è collegare il mastering alle caratteristiche misurate del sistema nastro/registratore. [S01](https://www.anaxwaves.com/MixtapeNerd/Docs/About.html)

| ID | Area | Capacità documentata | Stato |
| --- | --- | --- | --- |
| MN-01 | Progetti | Creazione, apertura e salvataggio | D, S02 |
| MN-02 | Sorgenti | WAV, FLAC, MP3, AAC, M4A, APE stereo; intervallo dichiarato 44,1–192 kHz, 16/24 bit | D, S01 |
| MN-03 | Programma | Lati A/B, riordino e adattamento automatico | D, S01 |
| MN-04 | Tempi | Silenzi, tagli dei silenzi, fade-out, crossfade e avanzamento | D, S01 |
| MN-05 | Normalizzazione | Peak, Quasi-Peak, VU, LUFS | D, S03 |
| MN-06 | Dinamica | D-ALC, DxL e Soft Knee; espansore nelle note store recenti | D/V, S11 |
| MN-07 | Traduzione EQ | 120/70 µs e compensazione Nakamichi/altri | D, S01 |
| MN-08 | NR | Encoding compatibile B/C e dbx I/II dichiarato dal produttore | D, S01 |
| MN-09 | Meter | dBFS, PPM, VU | D, S01 |
| MN-10 | Livelli | Modalità minima, basic, avanzata, riferimento NR e wizard cassette | D, S04–S06 |
| MN-11 | Ricerca picchi | Peak Index con fino a cinque passaggi suggeriti | D, S04 |
| MN-12 | Misure | MOL e SNR, con requisiti hardware | D, S07 |
| MN-13 | Assistente CAL | Sensibilità, HD3 e risposta in frequenza | D, S09 |
| MN-14 | Ascolto | Anteprima e test; confronto sorgente/nastro | D/S, S01 |
| MN-15 | Output | Master per lato, M3U8, toni ausiliari, audio live e tracklist | D, S01 |
| MN-16 | Interfacce | AUHAL/macOS, WASAPI/Windows; esclusività sperimentale | D/S, S08 |
| MN-17 | Predistorsione | PDRS calibrato sulla catena fisica | S, S10 |
| MN-18 | Aiuto | Manuale, wizard e guide workflow | D, S02/S11 |

Questa tabella riassume le famiglie note. Non ricostruisce il formato proprietario dei progetti, tutti i parametri DSP o ogni voce di menu.

## Comportamenti che cambiano la progettazione

**Normalizzare non equivale a comprimere.** I quattro modi applicano un guadagno costante per traccia con criteri diversi; la normalizzazione percettiva può lasciare picchi incompatibili con il margine disponibile. Nel nostro prodotto il valore richiesto e il guadagno realmente applicabile devono essere entrambi visibili. [S03](https://www.anaxwaves.com/MixtapeNerd/Docs/Normalization.html)

**La calibrazione è legata al percorso audio.** Il manuale indica di rifarla quando cambiano dispositivo, interfaccia o modalità. Il nostro profilo deve quindi identificare anche DAC/ADC, canali, livelli e configurazione del sistema, non soltanto marca del nastro. [S08](https://www.anaxwaves.com/MixtapeNerd/Docs/AudioDevice.html)

**Il Peak Index esiste già.** Il manuale descrive l'ascolto del passaggio senza arresto al termine né ripetizione automatica. Il miglioramento preciso è un loop configurabile con metrica dichiarata e contesto prima/dopo. Non possiamo sostenere che la richiesta “peak search” sia rimasta interamente ignorata. [S04](https://www.anaxwaves.com/MixtapeNerd/Docs/LevelCalibration_min.html)

**Le misure avanzate richiedono ritorno analogico.** L'assistente bias/level richiede deck a tre testine, monitor off-tape e regolazioni fisiche disponibili. Il software aiuta a leggere i risultati; non gira automaticamente i controlli del deck. [S09](https://www.anaxwaves.com/MixtapeNerd/Docs/CalAssistant.html)

**La predistorsione è specifica della catena.** Il manuale la colloca dopo l'encoding NR ed esclude il PDRS dall'export destinato a una duplicazione futura sconosciuta. La nuova app deve mantenere la distinzione fra master portabile e trattamento specifico di una sessione. [S10](https://www.anaxwaves.com/MixtapeNerd/Docs/PDRS.html)

## Limiti e punti da verificare

- Il sito dichiara macOS e Windows: Linux è una differenza di distribuzione da realizzare e provare.
- Le sorgenti sono file locali; streaming e contenuti protetti non rientrano nel flusso dichiarato.
- Hosting plugin e funzioni DJ non fanno parte dello scopo indicato dal produttore.
- L'esclusività dipende dal sistema; la sua presenza nel menu non garantisce che il driver la conceda.

Questi limiti provengono da [S01](https://www.anaxwaves.com/MixtapeNerd/Docs/About.html) e [S08](https://www.anaxwaves.com/MixtapeNerd/Docs/AudioDevice.html). Non costituiscono una prova di assenza per ogni release.

Restano da verificare con una versione installata: comportamento di scorciatoie/media key, formati e profondità dell'export, dettagli del fit con brani bloccati, algoritmo degli espansori/compressori, persistenza dei profili, recupero crash e accessibilità. Le denominazioni D-ALC/DxL non bastano per promettere equivalenza sonora.

## Regola di parità

Ogni voce MN deve avere almeno una funzione F e una prova nella roadmap. “Parità funzionale” significa coprire i casi d'uso; “equivalenza DSP” richiede misure separate. Non si useranno i nomi proprietari come prova di una replica corretta. La parità resta incompleta finché anche NR, CAL e predistorsione non superano i rispettivi gate.
