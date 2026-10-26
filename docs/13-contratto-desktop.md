# Contratto del bridge desktop — prototipo 0.1

Il confine è IPC Tauri locale, non HTTP: non richiede account, server, OpenAPI o workspace Postman. Le skill `postman:api-engineer` e `postman:api-documentation` sono state consultate per stabilire contratto e prove; creare una collection HTTP per questi comandi non eserciterebbe il prodotto.

Tipi di progetto in `src/types.ts` e `src-tauri/src/model.rs`; validazione autorevole nel core Rust. Una modifica della UI deve essere accettata da `project_info` e dai comandi che producono file. Le firme Tauri sono in `src-tauri/src/main.rs`. Gli errori arrivano come reject con messaggio leggibile; la cancellazione di un file dialog restituisce `null`, senza errore.

| Comando | Input | Risultato / effetto |
| --- | --- | --- |
| `default_project` | — | Progetto schema 1 |
| `project_info` | project | Durate A/B e gain applicabile; rifiuta progetto invalido |
| `import_audio` | — | File dialog, analisi worker, tracce e lista errori per file |
| `import_folder` | — | Cartella ricorsiva, massimo 1000 file e 8 livelli; niente symlink |
| `collect_project` | project | Raccolta dei file con hash verificato in una nuova cartella e manifest con percorsi relativi |
| `clear_render_cache` | — | Rimuove solo master/passaggi/toni temporanei; preserva acquisizioni, demo e autosave |
| `demo_project` | — | Genera quattro sorgenti sintetiche e le analizza davvero |
| `fit_project` | project, preserve | Proposta completa; nessuna modifica implicita al progetto attivo |
| `save_project` / `open_project` | project / — | Dialogo e manifest JSON; backup dell'ultima versione salvata |
| `autosave_project` / `recover_project` | project / — | Copia locale recuperabile nella cache dell'app |
| `relink_track` | project, id | Dialogo, nuova analisi e progetto aggiornato; trim resettato sul nuovo file |
| `render_side` | project, side, export, bits | Master su disco, metadati e controllo overflow; un render alla volta |
| `cancel_job` | — | Richiede annullamento del render, con pulizia del parziale |
| `render_passage` | project, id, center, seconds, original | Master breve 2–15 s; un solo brano e fade antipop |
| `audio_devices` | input | Elenco backend standard e configurazioni predefinite; su macOS interroga il verso richiesto senza abilitare l’ingresso per le uscite. Firma invariata. La UI aggiorna l’elenco aprendo i dettagli/Impostazioni e tornando in primo piano quando non bloccata; conserva la scelta per nome e richiede una nuova scelta se il dispositivo scompare |
| `play_audio` | path, index, expectedName, offset, limit | Solo file preparati dal core; controlla il nome del device all'indice scelto e avvia streaming nativo. Preferisce il formato predefinito stereo float32 alla frequenza esatta del master, poi le configurazioni supportate; nessun ricampionamento implicito |
| `set_audio_paused` | paused: boolean | Sospende/riprende lo stream esistente senza consumare frame o avanzare la posizione; errore se nessuna uscita è attiva |
| `stop_audio` | — | Richiede silenzio dal callback successivo, poi chiude stream e thread; non ferma il deck fisico |
| `start_monitor` / `stop_monitor` | index / — | Ingresso separato; nessun ritorno automatico all'uscita |
| `start_capture` | index | WAV float del ritorno fino a 60 s; emette la telemetria input, non rimanda l'ingresso al DAC |
| `compare_return` | reference, recorded | Chiude l'ingresso e allinea i primi 30 s di due file registrati dal core; restituisce ritardo, correlazione, gain L/R e residuo |
| `save_capture` | path | Dialogo per conservare un'acquisizione già registrata dal core |
| `generate_tone` | frequency, level, seconds, kind, export, sampleRate | WAV float, opzionale dialogo; non avvia l'uscita da solo |
| `export_document` | project, kind | Dialogo TXT, M3U8, SVG, PDF o manifest di report |

Eventi: `job-progress {value,label}`, `audio-telemetry` e `input-telemetry` con peak/RMS, spettro, waveform e posizione; `audio-ended`/`input-ended` con errore opzionale. I meter vengono dal motore, mai da un'animazione casuale.

Il risultato del render include sample peak, true peak, attenuazione finale e numero di campioni fuori scala. Il file intermedio float32 viene controllato in streaming e l'eventuale attenuazione è uniforme; il dither è applicato soltanto nella quantizzazione intera finale. File sorgente cambiato rispetto all'hash, overflow di durata e limite RIFF causano errori espliciti.

Il browser ospita soltanto una preview grafica esplicitamente etichettata. Non simula successi di playback, import o export. I comandi reali vanno provati nel pacchetto desktop; il binario `verify` prova import/render/export a livello core senza interazione UI.

## Stili delle copertine

Le firme di salvataggio/apertura, autosave, raccolta portabile ed `export_document` restano invariate. Il progetto aggiunge `artwork` opzionale/null con `style`, quattro colori `paper/ink/accent/secondary` in formato `#RRGGBB` e `monochrome` booleano. Le impostazioni sono validate dal core: stili sconosciuti e colori non validi vengono rifiutati. I progetti precedenti conservano l’accento `color` con lo stile classico. SVG e PDF generano la stessa scena, applicando la conversione in grigi ai colori prima del rendering. Restano il limite di 15 brani e la semplificazione dei caratteri nel PDF. Catalogo e verifiche: [38 — Stili copertine](38-stili-copertine.md).

## Sospensione automatica

Firme IPC invariate: `play_audio` tiene attive richieste native contro spegnimento dello schermo e sospensione per inattività per tutta la vita dell’uscita, inclusa la pausa. Stop, fine naturale, errore e chiusura rilasciano le richieste. `render_side` applica la stessa protezione nel worker che prepara/esporta il master. Se il sistema rifiuta la richiesta, l’operazione fallisce con un errore esplicito; nessuna promessa silenziosa di protezione. Nessuna modifica permanente alle preferenze e nessun blocco del sonno richiesto manualmente. Prove e limiti in [37 — Sospensione](37-blocco-sospensione.md).

## Estensione elaborazione audio — EQ e compressore

`processing` aggiunge `eq_enabled` (false), `eq_bands` (10 guadagni, default 0 dB, intervallo ±12), `attack_ms` (5, intervallo 0,1–200), `release_ms` (150, 10–2000), `knee_db` (6, 0–24), `makeup_db` (0, −12–24). I progetti precedenti ricevono questi valori durante la deserializzazione; nessuna nuova firma IPC. I valori non finiti e le liste EQ con lunghezza diversa da 10 vengono rifiutati dal core. Il bypass EQ conserva i guadagni; i preset sono scorciatoie UI, il progetto conserva sempre le bande effettive. Ascolto elaborato, preparazione lato ed esportazione condividono il DSP; ascolto originale azzera l’elaborazione. Ogni modifica invalida il master e resta annullabile.

## Estensione NR Type B

`processing.nr`: `off` (default) oppure `type_b`; ogni altro valore è rifiutato. `processing.nr_reference`: −36…0 dBFS peak, default 0; campi assenti nei progetti precedenti ricevono i default. `RenderResult` aggiunge `nr` e `nr_reference`; con NR, `attenuation` indica il guadagno uniforme applicato **prima** dell’encoder. Il master assemblato viene codificato dal programma standalone `cassette-nr` tramite WAV float32 standard e ricontrollato, senza margine fisso di 12 dB. In caso di superamento dei limiti, viene attenuato prima del codec e ricodificato con stato nuovo. Nessun guadagno dopo encoding: superamento ceiling, clipping, file malformato o durata inattesa causano errore. Annullamento termina il processo e rimuove i temporanei. Gli argomenti non passano da una shell. Ascolto originale azzera anche NR; ascolto elaborato contiene il segnale codificato.

## Stampa diretta della copertina

`print_artwork() -> Result<(), String>`: comando IPC senza parametri, usa esclusivamente la webview chiamante. Su macOS apre il pannello di stampa tramite `WebviewWindow::print`; sugli altri sistemi richiede `window.print()` alla webview. Non invia automaticamente un lavoro alla stampante e non modifica il progetto. Il frontend prepara una superficie SVG dedicata con CSS di stampa A4 e invoca il comando solo dalla sezione Copertina, quando sbloccata e con massimo 15 brani. Errori di apertura mostrati nel messaggio di stato. Nessuna API HTTP né servizio esterno coinvolto.

## Aggiornamento Type B del 25 ottobre 2026

`processing.nr_reference`: intervallo −36…0 dBFS peak, nuovo default 0. I valori espliciti nei progetti salvati sono conservati. Firme IPC invariate. Il render prova senza margine NR fisso; riduce il livello prima del codec soltanto se necessario per i limiti di ingresso, clipping o true peak finale. Ogni tentativo rilegge il premaster originale e avvia una nuova istanza del codec sull’intero lato. Nessun guadagno dopo encoding. `RenderResult.attenuation` riporta l’attenuazione effettiva prima del codec. Massimo otto tentativi, poi errore; cancellazione e pulizia restano attive.

Il programma standalone `cassette-nr` mantiene WAV e argomenti invariati; exit status 3 distingue l’uscita saturata, 0 successo, gli altri codici non nulli errori generici. Il bridge Rust conserva `transform_file` e aggiunge un risultato tipizzato per i tentativi che richiedono un livello inferiore. Non vengono riprovati automaticamente errori di formato, I/O o cancellazione.


## Calibrazione guidata — protocollo v1

`calibration_signal {export:boolean, sampleRate:number}` restituisce un percorso WAV opzionale,
annullabile nel selettore di salvataggio. Protocollo fisso 49 s stereo: PCM24 per esportazione, IEEE float32 per riproduzione interna,
alla frequenza richiesta (44100, 48000, 88200 o 96000 Hz), senza elaborazioni del progetto. Frequenze diverse sono rifiutate prima di aprire il selettore di salvataggio. Il percorso viene autorizzato per
la riproduzione esistente. `analyze_calibration {path:string|null}` restituisce
un rapporto opzionale; null apre selettore WAV locale, un percorso esplicito
richiede allowlist (acquisizione interna). Worker separato, stereo 32–192 kHz,
massimo 180 s, campioni finiti, due marcatori obbligatori. Nessuna API HTTP.

`Project.calibration_report` è opzionale con default null nei progetti vecchi.
Protocollo, dimensioni e valori numerici sono validati al salvataggio/apertura.
Conserva misure e avvisi senza cambiare processing o il profilo manuale esistente.
La proposta di correzione passa solo da `updateProcessing` su gesto esplicito:
EQ ±3 dB, banda 16 kHz a 0, undo disponibile; NR e bias invariati.
Le acquisizioni tengono attiva la protezione contro sospensione automatica,
rilasciandola alla chiusura del worker. Dettagli in [44](44-calibrazione-guidata-e-regolazioni-audio.md).


### Frequenza del sistema e calibrazione

`audio_devices` aggiunge `is_default:boolean`, mantenendo indice, nome, rate e canali. `rate` proviene dalla configurazione corrente del dispositivo. La prima selezione usa il dispositivo predefinito del sistema; gli aggiornamenti successivi conservano il dispositivo per nome. `default_project` legge la frequenza dell’uscita predefinita, se tra le quattro frequenze supportate; in assenza di configurazione leggibile mantiene il fallback 48 kHz. Un progetto caricato o recuperato conserva la propria frequenza. Cambiare uscita esplicitamente adotta la frequenza corrente del dispositivo, se supportata. La calibrazione passa sempre la frequenza del progetto al generatore; selector condiviso e comando «Usa frequenza del dispositivo» sono disponibili nella preparazione. L’acquisizione del ritorno continua a usare la configurazione corrente dell’ingresso, che può avere una frequenza diversa: l’analisi la legge dal WAV.

### Acquisizione nel flusso Calibrazione

Nessun nuovo comando IPC. `input-telemetry.elapsed` rappresenta la durata realmente scritta nel WAV, in secondi, anche durante i silenzi. `start_capture` si arresta automaticamente entro circa 180 s invece dei precedenti 60 s, allineandosi al limite di analisi. `input-ended` conserva il contratto errore opzionale: il modulo distingue interruzione da acquisizione pronta. L’analisi resta su worker, con avanzamento indeterminato finché non restituisce un rapporto o un errore.

`calibration_report.correction_allowed` non dipende più da SNR < 30 dB: il rumore genera soltanto un avviso. Il valore derivato viene aggiornato anche in apertura e recupero dei progetti precedenti. Restano invariati gli altri vincoli e il formato del rapporto; nessun nuovo comando.

### Autostop della calibrazione

`start_capture {index:number, calibrationAutoStop?:boolean}` mantiene il comportamento precedente se il parametro è omesso/false. La calibrazione lo passa a true. Il worker d’ingresso cerca entrambi i marcatori del protocollo v1: correlazione normalizzata >= 0,8, primo marcatore entro 30 s, separazione circa 45 s con tolleranza ±3%. Conserva la coda originale più 250 ms di margine e finalizza il WAV prima di notificare il completamento.

`input-telemetry` aggiunge `calibration_complete:boolean` (false per altri stream). Un evento finale con true viene emesso solo dopo la finalizzazione riuscita del file; segue il consueto `input-ended:null`. Stop manuale, timeout e errore non impostano il flag. Nessun cambiamento al payload di input-ended. Riconoscimento nel worker, non nel callback audio; fallback a Stop manuale o limite di 180 s se i marcatori non sono riconosciuti.

## Profili di registrazione dalla calibrazione

`create_recording_profile { report, conditions: { name, deck, tape, output, input, notes, sample_rate } }` restituisce un profilo versione 1. Il core valida il rapporto e ricalcola l'idoneità; non si fida di `correction_allowed` fornito dal client. Produce una compensazione tonale comune limitata a ±3 dB (16 kHz invariato), un trim stereo che attenua il canale più forte (massimo 3 dB), e conserva rapporto e condizioni della misura. Non calibra il Dolby né imposta automaticamente REC LEVEL o un limite analogico dedotto dal solo tono 315 Hz.

`Project.recording_profile` opzionale contiene l'intero profilo selezionato, incluso `enabled`; progetti precedenti equivalgono a nessun profilo. La libreria riutilizzabile è locale alla WebView e ogni progetto conserva una copia autonoma. Il master applica il profilo dopo il VST, prima della verifica true peak e della codifica NR; i segnali di calibrazione restano in bypass. EQ musicale e profilo sono separati. Cambiare profilo invalida il master tramite il normale edit annullabile. Se il dispositivo d'uscita differisce da quello della misura, l'avvio del master deve chiedere di selezionare o disattivare esplicitamente il profilo, senza cambiare device in automatico.

Nel profilo, `conditions.sample_rate` è la frequenza di uscita usata per registrare la prova; `report.sample_rate` resta quella del WAV acquisito e può differire. La UI permette di confermare esplicitamente la frequenza della registrazione anche importando un WAV esterno.

## Prova automatica estesa v2

`calibration_signal` mantiene gli argomenti esistenti e genera la sequenza v2 (108,2 s), definita in `src/calibration-protocol.json`, condivisa tra core e UI. `analyze_calibration` riconosce v1 e v2 dai due marcatori e dalla loro distanza. I vecchi rapporti v1 restano validi. `Report.extended` opzionale contiene risposta al secondo livello, affidabilità/stabilità per banda, prove di livello per frequenza e limiti stimati. Nessun nuovo esame manuale o collegamento richiesto. L'autostop accetta entrambe le distanze attese e preserva il marcatore finale e la coda.

I profili v1 non cambiano; un rapporto v2 crea un profilo v2 con EQ parziale entro ±1,5 dB, niente boost a 31,5 Hz o correzione a 16 kHz, esclusione delle bande incerte e trim L/R solo se coerente. I limiti di pilotaggio sono stime della catena completa: vengono verificati sulle bande del master dopo EQ e, con NR, sul risultato codificato. L'eventuale attenuazione avviene prima dell'encoder, senza guadagni correttivi dopo NR. Non viene modificato il profilo attivo finché l'utente non salva/seleziona quello nuovo.

### Campi del profilo · 25 ottobre 2026

Solo `conditions.name` deve essere non vuoto. `deck`, `tape`, `output`, `input` e `notes` possono essere stringhe vuote; la forma serializzata resta compatibile. La frequenza resta un parametro tecnico validato e precompilato. Senza associazione di uscita (`output` vuoto) il profilo non blocca il master su dispositivi diversi; se presente, il vincolo precedente resta attivo. Nessun profilo salvato viene migrato o modificato automaticamente.

### Consolidamento player e progetti · 25 ottobre 2026

`play_audio` conserva firma e tempo assoluto: `offset` indica secondi nel master float32. La UI espone ricerca e navigazione tra brani nell’ascolto, bloccandole durante REC, countdown e acquisizione. Non cambia il master e non introduce ricampionamento.

`set_language { locale: "it"|"en"|"es"|"fr" }` seleziona le etichette dei dialoghi nativi usando gli stessi cataloghi offline dell’interfaccia. La lingua è una preferenza locale, indipendente dal contenuto musicale.

Salvataggio e autosave condividono ora scrittura sincronizzata e sostituzione atomica con backup valido. Un lock OS protegge le scritture concorrenti; la versione SHA-256 letta/aperta viene confrontata prima della sostituzione per rilevare modifiche esterne. L’autosave frontend serializza i job. Il recupero prova il backup se il file primario non è valido. Il relink accetta solo sorgenti con lo stesso hash, conservando editing e metadati del brano.
