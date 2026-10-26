# Funzionalità, fattibilità e priorità

Questa è la fonte unica del backlog iniziale. `MN-*` rimanda alla [baseline](01-mixtapenerd.md). **Base** = preparazione/registrazione affidabile; **Parità** = copertura specialistica MixtapeNerd; **Oltre** = miglioramento proposto. Le priorità non cancellano l'obiettivo finale di parità.

## Come leggere le stime

Impegno indicativo per una persona esperta, comprensivo di implementazione e verifica mirata, esclusi apprendimento, revisione esterna e attese hardware: **S** 2–5 giorni, **M** 1–3 settimane, **L** 3–6 settimane, **XL** 6–12+ settimane/ricerca. Sono ordini di grandezza, non preventivi; le righe condividono infrastrutture e non vanno sommate meccanicamente. Confidenza iniziale media per S/M, bassa per L/XL.

Fattibilità: **alta** con tecniche note; **condizionata** da driver, codec o calibrazione; **ricerca** quando qualità e prestazioni non sono dimostrate. Ogni riga comprende il rischio principale e la prova che consente di chiuderla.

## Preparazione e progetto

| ID | Funzione / origine | Traguardo | Fattibilità · impegno | Dipendenze, rischio e accettazione |
| --- | --- | --- | --- | --- |
| F-01 | Import cartelle, tag, WAV/FLAC/MP3 — MN-02 | Base | Alta · M | Decoder; corpus file validi/corrotti, errori per singolo file, Unicode e percorsi lunghi |
| F-02 | AAC/M4A/APE e AIFF/OGG aggiuntivi — MN-02 | Parità/Oltre | Condizionata · M | Feature delle release decoder e possibile FFmpeg; stessi campioni/durate sui tre OS, licenze censite |
| F-03 | Lati A/B, durata nominale/effettiva, leader, trailer e gap — MN-03/04 | Base | Alta · M | Timeline a campioni; capienza corretta anche con transizioni e frequenze diverse |
| F-04 | Riordino manuale, duplicazione, undo/redo, blocchi e brani fissati | Base/Oltre | Alta · M | Modello persistente; drag/drop e tastiera equivalenti, nessuna modifica dei file sorgenti |
| F-05 | Fit automatico con ordine libero/preservato e vincoli — MN-03 | Base | Alta · M | F-03/04; nessuno sforamento, risultato esplicito se impossibile, anteprima reversibile |
| F-06 | Trim silenzi, padding, fade e crossfade — MN-04 | Base | Alta · M | F-03; niente tagli automatici irreversibili, brani gapless e code musicali protetti |
| F-07 | Progetti, autosave, recupero e relink media — MN-01 | Base/Oltre | Alta · M | Schema versionato; crash durante salvataggio e spostamento cartelle senza perdere gli originali |
| F-08 | Pacchetto portabile con audio opzionale | Oltre | Alta · M | F-07; manifest e hash, controllo spazio, apertura su altro OS e nessuna traversata di percorso |

## Mastering e misurazione digitale

| ID | Funzione / origine | Traguardo | Fattibilità · impegno | Dipendenze, rischio e accettazione |
| --- | --- | --- | --- | --- |
| F-09 | Analisi peak/RMS, LUFS, true peak e waveform | Base/Oltre | Alta · M | Meter di riferimento; tolleranze definite in Fase R0, cache invalidata con modifica audio |
| F-10 | Peak, Quasi-Peak, VU, LUFS — MN-05 | Base → Parità | Alta/condizionata · L | Peak/LUFS prima; ballistic Q/VU specificate e misurate; gain limitato dal margine, album gain opzionale |
| F-11 | Compressione soft-knee ed espansore — MN-06 | Parità | Alta · L | F-09/10; controlli A/B a loudness pareggiato, nessun click, parametri e latenza documentati |
| F-12 | Modi funzionali D-ALC/DxL — MN-06 | Parità | Ricerca · XL | Mancano specifiche sufficienti; definire comportamenti obiettivo e corpus; niente promessa di equivalenza dal solo nome |
| F-13 | Traduzioni EQ 120/70 µs e Nakamichi/altri — MN-07 | Parità | Condizionata · L | Curve e contesto validati; misure di risposta, headroom e prevenzione della doppia compensazione |
| F-14 | NR compatibile B/C e dbx I/II — MN-08 | Parità | Ricerca · XL | Calibrazione e test con decoder hardware; implementazione originale o componente autorizzato, niente claim prima delle misure |
| F-15 | Master WAV per lato, FLAC opzionale — MN-15 | Base/Oltre | Alta · M | Renderer unico; durata esatta, dither solo all'uscita intera, report del trattamento applicato |
| F-16 | Toni di riferimento e tracklist/M3U8 — MN-15 | Base | Alta · S | F-15; tono con livello/frequenza/durata e profilo espliciti, playlist distinta dal master processato |
| F-17 | Meter dBFS/PPM/VU, spettro e waveform — MN-09 | Base → Parità | Alta · M | DSP nativo; valori leggibili, canali separati, nessun indicatore animato senza segnale misurato |
| F-18 | Scorciatoie e media key — bisogno utenti | Base/Oltre | Condizionata · M | Focus e integrazione OS; Space/Esc affidabili, tasti globali opzionali e nessun doppio comando |
| F-19 | Peak/RMS/LUFS passage finder con loop — MN-11 + richiesta | Oltre | Alta · M | F-09; finestra e metrica esplicite, loop 2–15 s, ranking riproducibile e contesto regolabile |

## Trasferimento e catena analogica

| ID | Funzione / origine | Traguardo | Fattibilità · impegno | Dipendenze, rischio e accettazione |
| --- | --- | --- | --- | --- |
| F-20 | Riproduzione continua con countdown e cambio lato manuale — MN-14/15 | Base | Alta · L | Streaming nativo e pre-render; due ore senza underrun rilevati su configurazioni certificate |
| F-21 | Wizard minimo/basic/avanzato, riferimento NR e preset — MN-10/18 | Base → Parità | Condizionata · L | Toni, profili; principianti distinguono dBFS da 0 VU, stima marcata come stima |
| F-22 | MOL/SNR e calibrazione assistita — MN-12 | Parità | Condizionata · L | Loop analogico; specificare frequenza, banda, soglia distorsione e pesatura; confronto con strumento di riferimento |
| F-23 | Bias/level: sensibilità, HD3, curva frequenza — MN-13 | Parità | Condizionata · L | ADC e deck tre testine con controlli; compensare il loop della scheda, sweep/rumore a livello dichiarato |
| F-24 | Backend nativi e modalità esclusiva quando disponibile — MN-16 | Base → Parità | Condizionata · L | Spike per OS/driver; UI distingue richiesto/ottenuto, sample rate effettivo e invalidazione profilo |
| F-25 | ASIO opzionale e routing avanzato — richiesta utenti | Oltre | Condizionata · L | Driver/SDK e build; fallback dichiarato, nessuna dipendenza ASIO per uso standard |
| F-26 | Off-tape monitor allineato nel tempo — MN-14 | Parità | Condizionata · L | F-24 e input fisico; ritardo e deriva stimati, nessun feedback, confronto affidabile con segnale correlabile |
| F-27 | Predistorsione specifica deck/nastro — MN-17 | Parità sperimentale | Ricerca · XL | F-22/23/26; riduzione HD3 senza regressione su musica, bypass immediato e profilo obbligatorio |
| F-28 | Preflight: device, profilo, overflow, spazio, sample rate | Base/Oltre | Alta · M | Stato hardware; blocchi motivati solo su errori certi, warning utili e rimedi diretti |
| F-29 | Log sessione, dropout e calibrazione da riconfermare | Oltre | Alta · M | Telemetria nativa; zero errori nascosti, report locale e nessun riavvio automatico sul deck |
| F-30 | Acquisizione del ritorno, riascolto e confronto dopo registrazione | Oltre | Condizionata · L | F-26; file temporanei recuperabili, nessuna pretesa di monitor live per deck due testine |

## Confezione, usabilità ed estensioni

| ID | Funzione / origine | Traguardo | Fattibilità · impegno | Dipendenze, rischio e accettazione |
| --- | --- | --- | --- | --- |
| F-31 | J-card PDF/SVG, tracklist sincronizzata e scala stampa | Oltre | Alta · M | F-03; quote in mm, font inclusi, A4/Letter e barra di riscontro fisica |
| F-32 | Archivio progetti, copertina, duplicati e ricerca | Oltre | Alta · M | F-07; indice rigenerabile, nessun database necessario per aprire il progetto |
| F-33 | IT/EN, temi, accessibilità e guida contestuale — MN-18 | Base/Oltre | Alta · M | Componenti semantici; tastiera, lettore schermo, contrasto e formati numerici locali |
| F-34 | Batch master e coda duplicazioni | Oltre | Alta · M | F-15/20; risultati per elemento, annullamento e richiesta di intervento fisico fra i lati |
| F-35 | Profili deck/nastro esportabili con provenienza | Oltre | Alta · M | F-21; profilo importato sempre non verificato sulla nuova catena |
| F-36 | Controllo deck tramite IR/USB/MIDI | Oltre futuro | Ricerca · XL | Richiede hardware esterno e adattatore per modello; protocollo e stato osservabile prima di automatizzare REC |
| F-37 | Plugin VST/AU/LV2 | Oltre futuro | Condizionata · XL | Hosting, licenze e isolamento crash; rinviato perché amplia molto la superficie di guasto |
| F-38 | Suggerimenti musicali e ordinamento per energia/BPM | Oltre futuro | Alta/condizionata · L | Analisi locale; proposta sempre reversibile, non altera ordine scelto di nascosto |
| F-39 | Import playlist streaming come metadati | Oltre futuro | Condizionata · L | Integrazioni da verificare separatamente; corrispondenza con file posseduti, niente disponibilità audio garantita |
| F-40 | Sincronizzazione cloud/collaborazione | Oltre futuro | Condizionata · XL | Identità, privacy, conflitti e costi; non necessaria al prodotto locale |

## Copertura della baseline

| Baseline | Backlog |
| --- | --- |
| MN-01/02 | F-01, F-02, F-07 |
| MN-03/04 | F-03, F-04, F-05, F-06 |
| MN-05/06 | F-09, F-10, F-11, F-12 |
| MN-07/08 | F-13, F-14 |
| MN-09/10/11 | F-17, F-21, F-19 |
| MN-12/13 | F-22, F-23 |
| MN-14/15/16 | F-15, F-16, F-20, F-24, F-26 |
| MN-17/18 | F-27, F-21, F-33 |

## Ordine raccomandato

Prima affidabilità del progetto, tempi e trasferimento; poi strumenti di livello e hardware avanzato; infine compatibilità NR e ricerca DSP. J-card e loop picchi sono miglioramenti relativamente accessibili, adatti a dare valore prima delle funzioni sperimentali. NR/PDRS non devono bloccare il primo prodotto, ma restano visibili come debito rispetto alla parità.

Nessuna formulazione di nastro assicura da sola un MOL o un livello “corretto”. Nessun software può riavvolgere o avviare un deck privo di controllo esterno. Lo streaming protetto non è una scorciatoia per ottenere file audio locali.
