# Stato del prototipo 0.1

> Registro iniziale, con alcune voci superate dagli sviluppi successivi. Per il quadro aggiornato dei completamenti mancanti vedere [32 — Completamento release](32-completamento-release.md): Type B, VST3, pausa nativa e recupero aggiornato sono già presenti.

> Implementata anche la [protezione da spegnimento automatico di schermo e sistema](37-blocco-sospensione.md), verificata su macOS; la voce storica F-28/F-29 sotto va letta con questo aggiornamento.

24 ottobre 2026. Questo documento descrive il codice effettivamente presente; gli altri documenti mantengono anche obiettivi e prove future. **Non tutte le fasi R0–R6 sono concluse e non è stata raggiunta la parità completa con MixtapeNerd.**

## Cosa si può fare

- Importare file o cartelle ricorsive, leggere i tag supportati, analizzare peak/RMS/LUFS/true peak e waveform.
- Comporre i lati A/B, impostare durata e margine, spostare/duplicare/bloccare brani, usare undo/redo e confrontare una proposta di fit prima di applicarla.
- Regolare trim, fade, gap e crossfade non distruttivi; rimuovere silenzi rilevati con soglia dichiarata.
- Applicare peak/album/LUFS/RMS e modi indicativi VU/quasi-peak; usare compressore soft-knee, espansore e due modi dinamici sperimentali originali.
- Tradurre digitalmente le costanti 120/70 µs con un filtro del primo ordine; il bias fisico non cambia.
- Preparare su disco e riprodurre un master; usare countdown, Stop e scorciatoie; mostrare peak, RMS, media tipo VU, PPM indicativo e spettro da campioni reali.
- Cercare passaggi peak/RMS e ripeterli, confrontando originale e processato.
- Generare toni 400 Hz/1 kHz/10 kHz o rumore bianco, salvare un profilo manuale e osservare il ritorno in ingresso con FFT e HD3 indicativa.
- Acquisire fino a 60 secondi del ritorno, salvare il WAV e confrontare i primi 30 secondi con un master tramite correlazione e allineamento entro ±10 s. È un confronto **differito**, non monitor allineato in tempo reale.
- Esportare WAV 16/24 bit con dither TPDF o float32, toni separati, tracklist e M3U8; salvare/riaprire/recuperare il progetto e raccogliere i media in una cartella portabile.
- Creare una J-card compatta PDF/SVG con quote fisiche, colori e barra di scala; usare temi chiaro/scuro e un diario locale.

## Copertura del backlog

“Implementata” indica presenza del percorso nel prototipo, non certificazione su tutti gli OS o adempimento di ogni criterio futuro del backlog.

| Funzioni | Stato concreto |
| --- | --- |
| F-01 | Import file/cartelle, tag e analisi implementati; corpus sintetico provato |
| F-02 | AAC/M4A, AIFF e OGG presenti; APE non implementato |
| F-03–F-06 | Composizione, fit, undo, trim e transizioni presenti; niente gruppi di brani persistenti, fit euristico con vincoli può rifiutare casi risolvibili da un solver più completo |
| F-07 | JSON schema 1, backup, autosave e relink presenti; lock fra più istanze e migrazioni future non implementati |
| F-08 | Raccolta cartella progetto/audio presente; archivio singolo `.cassettepack` non implementato |
| F-09 | Peak/RMS/LUFS/true peak e waveform presenti; mancano un corpus normativo completo e confronto con strumento indipendente |
| F-10 | Modi indicati presenti; VU/quasi sono definiti dal prototipo, non equivalenza certificata al concorrente |
| F-11 | Soft-knee ed espansore presenti |
| F-12 | ALC e fit dinamico originali sperimentali presenti; equivalenza D-ALC/DxL non implementata né dichiarata |
| F-13 | 120/70 µs presenti; curva Nakamichi/altri non implementata |
| F-14 | **NR B/C e dbx I/II compatibili non implementati** |
| F-15/F-16 | WAV, toni, TXT e M3U8 presenti; FLAC di uscita non implementato |
| F-17 | Peak/RMS/spettro e risposte indicative VU/PPM presenti; nessuna certificazione metrologica |
| F-18 | Scorciatoie con focus della finestra presenti; media key globali OS non implementate |
| F-19 | Peak/RMS con loop 2–15 s presenti; niente ranking dei cinque passaggi o ricerca LUFS breve |
| F-20 | Master su disco, streaming, countdown e flip manuale presenti; pausa nativa e prova continua di due ore non eseguite |
| F-21 | Toni, profilo e conferma manuale presenti; wizard specialistico completo e riferimento NR non implementati |
| F-22 | MOL/SNR sono dati dichiarati nel profilo; misurazione automatizzata non implementata |
| F-23 | FFT/frequenza/HD3 indicative presenti; calibrazione strumentale completa del bias non implementata |
| F-24 | Backend standard CPAL presenti; esclusività non implementata; solo macOS provato localmente |
| F-25 | ASIO non implementato |
| F-26/F-30 | Ingresso, acquisizione breve e confronto differito presenti; confronto allineato continuo e compensazione deriva non implementati |
| F-27 | **Predistorsione PDRS non implementata** |
| F-28/F-29 | Capacità, sorgente modificata, device, spazio tramite errori I/O e log presenti; preflight completo, sleep inhibition e rapporto persistente di tutti gli underrun ancora da completare |
| F-31 | Template compatto presente, PDF fino a 15 brani; pannelli aggiuntivi/template multipli e stampa fisica ancora da sviluppare/provare |
| F-32 | Progetto singolo e recupero presenti; archivio ricercabile non implementato |
| F-33 | IT, temi, etichette, focus e tastiera presenti; traduzione EN e audit con lettori schermo non completati |
| F-34 | Coda batch/duplicazioni non implementata |
| F-35 | Profilo incluso nel progetto; import dedicato e firma completa della catena non implementati |
| F-36–F-40 | Controllo hardware, plugin, suggerimenti musicali, metadati streaming e cloud non implementati |

## Limiti tecnici espliciti

- Ogni sorgente viene decodificata in RAM con limite di 512 MiB PCM. Il lato viene invece renderizzato e letto da disco; non viene caricato tutto in un AudioBuffer del browser.
- RIFF/WAV intermedio float32 limitato a 4 GiB: il programma rifiuta combinazioni durata/frequenza che superano questo limite. Non sono implementati RF64 e render distribuiti in segmenti.
- Resampling offline sinc a finestra finita di 33 tap: funzionante, non confrontato con un resampler di riferimento su un corpus esteso.
- Il ceiling finale si ottiene con attenuazione costante dopo tutti i processori attuali, prima del dither. Non è un limiter nascosto. Quando NR sarà implementato, il suo punto nella catena dovrà essere rispettato.
- MP3/AAC/OGG possono conservare padding del codec: il programma conta i campioni effettivamente decodificati; il corpus ha mostrato durate leggermente diverse dai WAV originali.
- Streaming e ingresso attualmente richiedono configurazioni float32 compatibili; output stereo. Non ogni scheda/driver professionale è supportato.
- La calibrazione confermata è manuale. Il software non osserva la posizione del potenziometro fisico né garantisce che la catena sia rimasta identica.
- Frequenza e HD3 da FFT sono indicatori, non misure certificate. Il confronto differito non stima THD dalla musica; il residuo include EQ, rumore e deriva.
- I file catturati restano nella cache dell'app finché non vengono esportati. Il pulsante di pulizia dei master non elimina le acquisizioni, i progetti o la demo.
- Il PDF compatto semplifica i caratteri fuori ASCII; SVG conserva Unicode. La stampa al 100% va ancora verificata su carta.

## Prove eseguite

| Area | Evidenza |
| --- | --- |
| Build | TypeScript strict con controllo unused; bundle Vite; compilazione Rust; pacchetto macOS debug e release |
| Test unitari | 4 test TypeScript, 9 Rust: misure su sinusoide/silenzio, validazione, resampling e confronto ritardato/scalato |
| Integrazione core | WAV 16/24/32, crossfade, durata entro due campioni rispetto al budget convertito, cancellazione e parziali, fit, roundtrip, portabilità, tutte le normalizzazioni e dinamiche, EQ e ceiling finale, rifiuto sorgente modificata |
| Codec | WAV, FLAC, MP3, AAC/M4A, AIFF e OGG generati da un segnale sintetico e decodificati tramite il core |
| Output nativo | App macOS: demo → prepara master → playback → fine; CLI CoreAudio: riferimento 1 s a −30 dBFS, 15 aggiornamenti di telemetria, zero underrun nella prova breve |
| UI | Sei schermate a 900 e 1440 px: nessun overflow orizzontale rilevato, zero campi senza nome nei controlli verificati; layout a 1024 px e dialogo calibrazione esaminati visivamente |
| Accessibilità iniziale | Focus dentro il dialogo, ciclo Tab e chiusura Esc provati; contrasto di testo e contorni migliorato, controlli numerici con limiti |
| Stampa | PDF A4 validato e rasterizzato con Poppler; quote e impaginazione esaminate. Nessuna prova fisica di stampante |
| Dipendenze JS | Le segnalazioni iniziali di Vitest sono state corrette; audit dopo aggiornamento: zero vulnerabilità segnalate |

Nessuna prova ha usato un vero deck, nastro, ritorno ADC o driver Windows/Linux. I workflow CI sono file configurati, **non esecuzioni completate**. La prova di un secondo senza underrun non dimostra affidabilità su un lato da 45 minuti.

La build release finale è un eseguibile macOS arm64 con bundle e `Info.plist` verificati. Clippy su tutti i target locali, formattazione, unit test e integrazione sono passati. Il controllo visivo dell'ultima build nativa non è stato ripetuto perché il Mac si è bloccato durante il lavoro; i controlli browser e il precedente percorso nell'app nativa sono stati completati. Per provare la release aggiornata, chiudere l'eventuale build debug ancora aperta e aprire il pacchetto in `src-tauri/target/release/bundle/macos`.

## Prossimi gate, senza dichiarazioni anticipate

1. Eseguire build e smoke test su Windows/Linux; provare DAC/ADC, permessi e disconnessione. Ampliare i formati stream supportati.
2. Validare sessioni lunghe e acquisizioni analogiche reali; completare preflight, telemetria persistente e gestione sleep.
3. Specificare e provare VU/PPM, calibrazione avanzata, MOL/SNR e curve EQ con strumenti indipendenti.
4. Ricerca e implementazione interoperabile NR, compressori specialistici e predistorsione, con i gate R5. Queste funzioni richiedono lavoro aggiuntivo reale, non soltanto l'abilitazione di controlli nella UI.
