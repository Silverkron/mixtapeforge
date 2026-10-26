# Calibrazione guidata e regolazioni audio

## Contratto e percorso

Nuova vista principale tra Mixtape e Copertina. Una singola sequenza WAV stereo
non elaborata include marcatori iniziale/finale, riferimento 315 Hz, dieci toni
a basso livello, silenzio, scala di livelli 315 Hz e identificazione L/R.
La piastra registra l'intera sequenza una volta, quindi la riproduce una volta.
Acquisizione tramite ingresso esistente oppure importazione del WAV stereo.
Nessun suono all'apertura: riproduzione solo con gesto esplicito dell'utente.
NR OFF in registrazione e riproduzione. Guadagni analogici fissi durante la prova.

Comandi Tauri aggiuntivi, senza HTTP:

- `calibration_signal {export:boolean}` → percorso WAV opzionale, annullamento → null.
  Segnale protocollo v1, 48 kHz PCM24 stereo, bypass completo delle elaborazioni.
- `analyze_calibration {path:string|null}` → rapporto opzionale. Null apre selettore
  WAV; un percorso deve appartenere alla allowlist desktop (acquisizione interna).
  Analisi in worker, massimo 180 secondi, stereo PCM/float WAV, finite samples.
  Rifiuta registrazioni senza entrambi i marcatori o incomplete.

Rapporto salvato nel progetto come `calibration_report` opzionale, default null
per progetti precedenti. Contiene versione protocollo, nome sorgente, frequenza,
allineamento, deriva temporale, livelli e picchi L/R, clipping, risposta L/R
relativa a 1 kHz, rumore e SNR indicativo riferito al tono 315 Hz, armoniche
2/3 e compressione della scala di livelli, diafonia e avvisi. Nessun valore di
MOL assoluto, flutter IEC o calibrazione Dolby viene dichiarato.

Le misure restano descrittive di scheda+piastra+nastro. Se saturazione digitale,
marcatori deboli, canali mancanti o fondo troppo alto invalidano la prova, l'UI
lo esplicita. La correzione EQ è una proposta limitata, applicata solo su richiesta
all'EQ esistente (annullabile), non un profilo automatico certificato. Nessuna
compensazione del bias fisico o modifica delle impostazioni NR.

## Regolazioni audio

Pannello più largo con navigazione persistente: Livello, Equalizzatore,
Dinamica, Plugin, Nastro e NR, Ascolto. Una sola area impostazioni alla volta,
stati attivi visibili, spiegazione breve e opzioni specialistiche secondarie.
Mantenere tutte le opzioni esistenti e i valori salvati. Nessun cambio di audio
o di preset implicito entrando nelle schede. Ridurre testo ripetuto, mantenere
le istruzioni contro doppia codifica e il significato del riferimento 0.

## Verifica prevista

Test sintetici: percorso ideale scalato/ritardato, deriva, risposta alterata,
armoniche, rumore, canale assente, clipping, marcatori mancanti/incompletezza;
compatibilità JSON vecchi progetti. UI: navigazione, mantenimento valori e
applicazione esplicita EQ. QA desktop/browser a larghezza normale e ridotta,
nessun overflow orizzontale, nessun doppio scroll del workspace.
La prova hardware richiede una registrazione fisica dell'utente e non viene
simulata come verifica reale.

## Prove eseguite

- Protocollo v1: 49 secondi, PCM24/48 kHz; verifica completa genera il WAV e lo
  rilegge, poi prova anche PCM16/44,1 kHz. Nessun dispositivo audio utilizzato.
- Core: ritardo e guadagno noti, risposta di una banda a −6 dB, HD3 al 3%,
  deriva sintetica dello 0,1% con rumore, clipping, canale assente, file troncato
  e marcatori mancanti. Suite libreria: 39 test passati.
- Frontend: 44 test, incluse schede audio, mantenimento riferimento NR,
  proposta EQ limitata/applicazione esplicita, blocco su misure inaffidabili,
  e regressione undo/redo. TypeScript/build e Prettier superati.
- Clippy su tutti i target con warning come errori superato.
- Browser: preparazione, risultati sintetici, Livello/EQ/Dinamica; nessun
  overflow orizzontale a 1.200 e 900 px. Controllo aggiuntivo del layout stretto.
- macOS: build aperta, FastTrack Pro visibile, importazione del WAV sintetico
  tramite selettore reale e rapporto prodotto dal comando Tauri; EQ della nuova
  interfaccia verificato anche nella webview nativa. Non è una prova su nastro.

Design del pannello: [45](45-design-regolazioni-audio.md).

## Sequenza v1 e misure

| Tempo | Segnale |
| --- | --- |
| 0–4 s | Silenzio iniziale e marcatore di 0,6 s a t=2 s |
| 4–6 s | 315 Hz, −18 dBFS peak |
| 6–24 s | 31,5 / 63 / 125 / 250 / 500 / 1k / 2k / 4k / 8k / 16k Hz; 1,8 s ciascuno, −24 dBFS peak |
| 24–28 s | Silenzio per rumore RMS e banda 4–12 kHz |
| 28–42 s | 315 Hz; gradini −30 / −24 / −18 / −12 / −9 / −6 / −3 dBFS peak, 2 s ciascuno |
| 42–46 s | 1 kHz a −18 dBFS peak, prima solo L, poi solo R |
| 46–49 s | Pausa, marcatore finale a t=47 s, coda |

Analisi su finestre interne che escludono 300 ms iniziali e 250 ms finali di
ogni segmento. RMS senza DC. Risposta riferita al tono 1 kHz dello stesso canale.
Compressione relativa al primo gradino 315 Hz; armoniche seconda/terza integrate
in bande intorno ai multipli della fondamentale rilevata. SNR riferito al tono
315 Hz a −18 dBFS peak, non al massimo livello del nastro. Rumore inferiore al
limite numerico visualizzato come non stimabile, senza promettere SNR irrealistici.
Ricerca del primo marcatore entro 30 s dall'inizio del file, secondo entro ±3 s
rispetto al tempo previsto; scala ammessa 0,97–1,03. Per importazioni manuali
avviare il nastro entro circa 25 s dall'inizio dell'acquisizione.

Verifica finale: layout EQ anche a 640×720 senza overflow orizzontale, schede
in griglia; build macOS finale completata (36,92 MiB). Rapporto sintetico rimosso
tramite UI e autosave controllato: 12 brani, lati 6/6, NR disattivato, EQ in bypass.
Nessun tono o acquisizione avviato durante QA. La rimozione di una misurazione
è esplicita e annullabile; senza rapporto la vista ritorna alla preparazione.


## Correzione frequenza della prova

Il generatore usa ora la frequenza del progetto, anziché imporre 48 kHz. La preparazione espone il selettore condiviso e il valore corrente dell’uscita, con un comando per adottarlo. 44,1 kHz corrisponde a 44100 Hz. I nuovi progetti e la selezione iniziale dei dispositivi usano i default del sistema; i progetti recuperati conservano le impostazioni salvate. La scansione dei dispositivi aggiorna i valori letti senza cambiare automaticamente un progetto durante l’ascolto.

Verifica macOS della correzione: nuovo progetto inizializzato a 44,1 kHz dall’uscita di sistema; FastTrack Pro rilevata a 44,1 kHz nella preparazione. Esportazione dal comando WAV della calibrazione e controllo con ffprobe: 44100 Hz, stereo, PCM24, 49,000 s. Nessuna riproduzione o acquisizione avviata durante questa verifica. Test: 46 frontend, 40 Rust; Clippy su tutti i target senza warning.

## Correzione avvio della sequenza: formato del player

La verifica precedente copriva esportazione e analisi, ma non l’avvio reale: il generatore restituiva PCM24 anche al player, che legge esclusivamente WAV stereo IEEE float32. Il comando `calibration_signal` ora genera float32 per `export:false` e PCM24 per `export:true`, conservando frequenza del progetto e campioni equivalenti. Nessun indebolimento del vincolo del player e nessuna elaborazione della sequenza.

Test di regressione: per 44,1/48/88,2/96 kHz genera entrambi i file, controlla intestazione, stereo, durata e identità del segnale entro l’errore di quantizzazione a 24 bit. I sette test della calibrazione e Clippy su tutti i target passano. La verifica dell’avvio del pulsante desktop viene eseguita separatamente dall’esportazione.

Verifica effettiva della build desktop corretta: uscita FastTrack Pro, progetto 44,1 kHz, pulsante «Avvia prova». Il player è rimasto IN USCITA fino a 00:11, con meter stereo L/R a −24,0 dBFS durante i toni della sequenza; Stop/Esc ha riportato lo stato a FERMO. Nessun errore di formato. Questa verifica dimostra avvio dello stream e passaggio del segnale al player, non una registrazione fisica sul nastro né un ascolto umano delle cuffie. La prova è stata fermata prima della scala dei livelli più forti.

## Avanzamento leggibile della prova

La fase «Registra la sequenza» mostra tempo trascorso/rimanente sui 49 s, barra di avanzamento, fase attiva e dettaglio del tono/guadagno/canale. Le otto fasi seguono gli intervalli effettivi del protocollo Rust: sync iniziale 0–4 s, riferimento 4–6, dieci frequenze 6–24, rumore 24–28, sette livelli 28–42, sinistro 42–44, destro 44–46 e sync finale 46–49. Nei silenzi previsti il display lo dichiara, per non farli scambiare per un guasto.

Il contatore usa la telemetria del player. Il controller conserva l’esito dell’uscita con percorso, tempo finale, errore ed esito completato/interrotto, senza cambiare IPC o rendering. Solo l’evento reale di fine uscita senza errore segna «Prova terminata»; Stop, anche vicino alla fine, resta «Prova interrotta». Un errore prima dei primi campioni viene mostrato come prova non completata. A fine sequenza vengono richiesti Stop REC sul deck e riavvolgimento prima dell’acquisizione. Il riquadro dei meter è presente anche da fermo per non spostare i pulsanti all’avvio.

Verifica: 50 test frontend, inclusi confini delle fasi, avanzamento, errore, interruzione e fine reale; test del controller con eventi del player, compreso evento di fine tardivo dopo Stop. Layout browser a 1200 e 640 px senza overflow orizzontale.

## Flusso definitivo in tre operazioni

1. **Registra la prova**: guida breve, selezione uscita, frequenza condivisa, pulsanti Avvia/Stop/WAV direttamente accanto al display di avanzamento e ai meter. Nessun passaggio preliminare separato. Al termine si passa all’acquisizione.
2. **Acquisisci il riascolto**: selezione ingresso soltanto qui; avvio/arresto acquisizione, tempo effettivo, livelli, spettro istantaneo e forma d’onda dell’ultima finestra. Dopo Stop restano i livelli dell’ultima finestra e lo spettro medio delle finestre osservate durante l’acquisizione. Il grafico è un’indicazione del segnale acquisito, non una misura normalizzata della risposta del nastro; questa rimane nei risultati. Salvataggio WAV e importazione alternativa disponibili. L’ingresso non viene reinviato all’uscita.
3. **Analisi e risultati**: il comando Analizza prova apre questo passaggio prima di avviare il worker. Mostra un progresso indeterminato reale, senza percentuali inventate; al completamento mostra misure, avvisi e correzione da provare. Fallimento e annullamento del selettore file restano distinti; nessun vecchio rapporto viene presentato come esito della nuova analisi fallita.

Navigazione bloccata durante elaborazione, uscita o acquisizione per mantenere visibili i comandi dell’operazione attiva. Il modulo d’ingresso rimane montato tra i passaggi per conservare i grafici della sessione. Il contatore d’ingresso ora riceve i frame effettivamente scritti; una nuova acquisizione azzera telemetria e percorso precedenti. Arresto automatico dopo 180 secondi, coerente con il limite del file analizzabile. I progetti e le misurazioni salvati rimangono compatibili.

Verifica: 52 test frontend, inclusi separazione output/input, analisi in corso prima del risultato, ritorno all’acquisizione dopo errore; Clippy tutti i target; layout a 1200 e 640 px senza overflow orizzontale.

Verifica nativa del nuovo flusso: avviata acquisizione FastTrack Pro a 44,1 kHz senza avviare uscita/deck; timer incrementato a 00:02 e 00:06, livelli e dati spettro/forma d’onda presenti. Dopo Stop sono rimasti spettro medio e ultima finestra, con stato «Acquisizione pronta da analizzare». «Analizza prova» ha aperto il terzo passaggio e rifiutato correttamente i sei secondi senza marcatori, mostrando «Analisi non completata» e ritorno all’acquisizione. Nessun rapporto sintetico salvato nel progetto; app riavviata dopo la verifica per ripulire lo stato temporaneo della prova.

## Conto alla rovescia obbligatorio

REC e Avvia prova usano lo stesso avvio registrazione: tre secondi di attesa visibile (3, 2, 1) prima di aprire il flusso d’uscita. La durata della sequenza resta 49 s e il suo contatore rimane a zero durante l’attesa. Il deck va messo in REC prima di avviare il conto alla rovescia. Stop/Esc annulla l’attesa e invalida il suo token: nessun timer residuo può riavviare l’uscita. Il file WAV esportato conserva il protocollo originale; il conto alla rovescia appartiene all’avvio nell’app.

Verifica: 55 test frontend, inclusi tutti i valori 3/2/1, assenza di chiamate play_audio prima del terzo secondo, Stop durante l’attesa senza ripartenza e contatore della sequenza fermo a zero.

## Fondo elevato: avviso senza blocco EQ

Un margine tono/rumore inferiore a 30 dB conserva l’avviso «Fondo elevato», ma non impedisce più di provare la correzione EQ. Restano i vincoli su clipping digitale, tono di riferimento troppo debole/canale assente, separazione L/R e affidabilità dei marcatori. La correzione resta una scelta esplicita dell’utente.

L’abilitazione è una proprietà derivata dalle misure: viene ricalcolata sia per nuove analisi sia caricando progetti o recuperando l’autosalvataggio. Una misurazione già salvata con correction_allowed=false per il solo rumore diventa quindi utilizzabile senza ripetere la prova; misure numeriche e avvisi sono conservati. Test con sequenza rumorosa sotto 30 dB e progetto serializzato secondo la vecchia politica, più controlli esistenti di clipping/canale assente.

## Autostop dal marcatore finale

L’acquisizione guidata abilita automaticamente il riconoscimento dei marcatori. Due copie coerenti del chirp, distanti circa 45 secondi, sono necessarie per pianificare la chiusura: non basta il silenzio né un solo marcatore. Correlazione minima 0,8 e tolleranza sull’intervallo ±3%; conserva il marcatore completo e la coda originale con ulteriori 250 ms di margine. La chiusura viene comunicata alla UI solo dopo la finalizzazione riuscita del WAV. Il display mostra «Marcatore finale riconosciuto · acquisizione terminata» e rende disponibile l’analisi. PLAY del deck va fermato manualmente.

L’opzione è specifica dell’acquisizione di calibrazione; ascolto d’ingresso e altre acquisizioni non cambiano. Stop manuale resta disponibile, così come il limite massimo di tre minuti se i marcatori mancano o non vengono riconosciuti. Rilevatore nel worker con downsampling di servizio a 2 kHz per la correlazione; i campioni scritti nel WAV conservano formato e frequenza dell’ingresso.

Verifica: generazione/streaming a 44,1/48/88,2/96 kHz, ritardo, rumore, polarità invertita, variazione di velocità 0,1%; analisi del file troncato al punto di autostop con marcatori integri. Nessun autostop su silenzio, tono continuo, solo marcatore iniziale/finale o marcatori troppo ravvicinati. 57 test frontend; test Rust mirati e Clippy tutti i target passano.

Verifica sul file reale capture-1792925918502831000.wav: durata originale 52,918 s, stop previsto 53,520 s, confidenza dell’analisi 0,910. Per completare la coda assente nel file fermato manualmente, il solo input di verifica in memoria è stato esteso con silenzio; originale intatto, nessun audio riprodotto. Comando: `verify_calibration --autostop <WAV>`. La verifica hardware live dell’autostop richiede una nuova riproduzione completa del deck.

## Tolleranza al clipping nella calibrazione

La soglia di conteggio resta |campione| ≥ 0,9999. Fino a 1 ms cumulativo per canale nella finestra analizzata, il clipping produce un avviso ma non blocca la correzione EQ. Il limite è `floor(sample_rate / 1000)` campioni per ciascun canale: 44 a 44,1 kHz, 48 a 48 kHz, 88 a 88,2 kHz e 96 a 96 kHz. Non cresce con la durata della registrazione. Superarlo anche su un solo canale blocca ancora l’EQ; restano tutti gli altri controlli di qualità. Nessuna modifica all’audio né recupero dei campioni saturati.

La politica e il relativo avviso vengono ricalcolati anche al caricamento/recupero dei rapporti già salvati. I dettagli mostrano durata cumulativa per canale e soglia. Test su impulsi realmente saturati nella sequenza, saturazione prolungata, confine incluso/escluso su entrambe le uscite alle quattro frequenze e ricaricamento di un vecchio rapporto. La prova utente con 14.970/13.787 campioni prossimi al fondo scala a 44,1 kHz supera il limite (circa 339,5/312,6 ms) e resta bloccata.

Verifica: 46 test Rust e 57 test frontend passati, TypeScript e Clippy tutti i target senza errori.
