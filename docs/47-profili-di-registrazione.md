# Profilo di registrazione ricavato dalla prova

## Obiettivo

Precisazione successiva: l’obiettivo finale è una cassetta riproducibile al meglio su altre piastre. Il profilo v1 descritto qui compensa l’anello completo e resta provvisorio per tale obiettivo. Vedere [48-obiettivo-cassette-per-altre-piastre.md](48-obiettivo-cassette-per-altre-piastre.md) per la separazione tra registrazione e riproduzione e le misure aggiuntive necessarie.

La calibrazione serve a salvare e riutilizzare una compensazione specifica della catena scheda–piastra–nastro, mantenendo identici collegamenti, volume d'uscita e REC LEVEL. Le misure sostengono la correzione; il miglioramento sul nastro va confermato con un passaggio musicale. Non equivale alla taratura interna della piastra.

## Flusso

1. Registra e acquisisci la sequenza guidata, sempre senza elaborazioni.
2. Nel risultato, dai un nome al profilo e indica piastra, nastro, dispositivi e posizione dei controlli. I dispositivi delle vecchie prove non sono ricostruibili: i campi restano vuoti e offrono suggerimenti dai dispositivi disponibili. Un profilo già salvato ripropone invece le proprie condizioni. Conferma anche la frequenza di uscita: la frequenza del WAV acquisito può differire.
3. «Salva e usa profilo» lo aggiunge alla libreria locale e ne conserva una copia completa nel progetto, insieme al rapporto. La frequenza del progetto viene impostata a quella d’uscita confermata nelle condizioni della prova.
4. Il selettore in Calibrazione permette di riutilizzarlo in altri progetti, disattivarlo oppure rimuoverlo dal progetto scegliendo «Nessun profilo». I progetti importati con un profilo incorporato possono aggiungerlo alla libreria.
5. Nel player compare «PROFILO ATTIVO»; Regolazioni audio mostra il nome e chiarisce che è separato dall'EQ musicale. Cambiare profilo invalida il master e resta annullabile.

Non viene creato o attivato un profilo nel progetto reale senza il gesto esplicito di salvataggio/selezione. Non viene inventata la formulazione del nastro.

## Compensazione v1

- EQ comune ai canali, ricavata dall'inverso della risposta media e arrotondata a 0,5 dB, entro ±3 dB.
- Banda 16 kHz invariata; con margine tono/fondo sotto 6 dB non viene corretta una banda. Tra 6 e 12 dB il boost massimo cresce progressivamente fino a 3 dB. Il margine è indicativo rispetto al rumore complessivo misurato, non una misura certificata del rumore per banda.
- Bilanciamento derivato dal riferimento 315 Hz: attenua il canale più forte, massimo 3 dB, passi di 0,1 dB.
- Nessuna modifica automatica di bias, azimuth, Dolby, compressore creativo o REC LEVEL. La scala di livelli a 315 Hz non determina da sola il limite sulle alte o il livello ottimale per qualsiasi musica.
- La risposta risultante dei filtri sovrapposti è una compensazione approssimata. Non viene presentata come inversione esatta o come profilo già verificato sul nastro.

Se l'EQ musicale corrisponde esattamente alla vecchia proposta della prova, una casella visibile e selezionata propone di disattivarla durante il salvataggio. Una diversa EQ musicale viene conservata. I valori precedenti restano nel progetto per Annulla; nessuna riscrittura silenziosa dei preset.

## Pipeline

Tracce e regolazioni musicali → assemblaggio del lato → VST → profilo di registrazione continuo sull'intero master → misura true peak e gestione del margine → eventuale codifica NR con la sua verifica → uscita/export.

Profilo e VST non modificano durata o numero di frame del master, salvo la coda esplicita già prevista dal VST. Il profilo non cambia i file sorgente. Il confronto «Originale» del passaggio esclude anche il profilo. Toni e sequenza di calibrazione restano indipendenti.

Un master profilato non viene avviato su un'uscita dal nome diverso da quella salvata. L'utente può selezionare l'uscita corretta o disattivare esplicitamente il profilo. Una frequenza di progetto diversa dall’uscita della prova blocca la preparazione: riselezionare il profilo ripristina quella della misura. Le manopole fisiche e il volume del sistema restano responsabilità del ripristino manuale documentato nelle note.

## Persistenza e compatibilità

`Project.recording_profile` è opzionale con default null. I vecchi progetti mantengono il comportamento precedente. La libreria usa localStorage della WebView, analogamente alle preferenze esistenti; ogni progetto salvato contiene una copia autonoma del profilo, quindi non dipende dalla presenza della libreria sul computer di destinazione. Un errore di scrittura della libreria impedisce di dichiarare il profilo salvato e non attiva modifiche parziali al progetto.

Il core ricalcola l'idoneità del rapporto e le correzioni; controlla versione, valori finiti, limiti e coerenza con la misura, senza fidarsi dei flag del frontend.

## Verifica

48 test Rust, 61 frontend, TypeScript e Clippy tutti i target passati. Inclusi: compatibilità del progetto senza il nuovo campo, serializzazione del profilo, rapporto con falso flag di idoneità, bande dominate dal rumore, applicazione una sola volta, trim L/R e invariabilità dei frame, true peak dopo il boost, bypass, frequenza diversa, ordine rispetto al Dolby B confrontato campione per campione con una sorgente corretta separatamente. Frontend: creazione esplicita con condizioni, blocco di qualità, libreria persistente tra sessioni, EQ musicale conservata e Annulla, controllo dell'uscita su percorsi Windows/macOS, bypass dei segnali di prova.

Controlli geometrici del modulo a 640 e 1200 px: campi visibili e nessun overflow orizzontale. La resa desktop e l'integrazione IPC vengono controllate nella build finale. Nessuna nuova registrazione fisica sul nastro è stata eseguita da questi test.

La frequenza dell’uscita è separata da quella del file acquisito: un ritorno a 44,1 kHz può provenire da una sequenza registrata con uscita a 48 kHz. Il profilo conserva entrambe senza imporre la frequenza dell’ingresso al master.

Verifica desktop effettiva: creato tramite il comando IPC e il modulo nativo il profilo «Pioneer CT-W205R · TDK Type I», dalla prova capture-1792928328280918000.wav, con nastro indicato dall'utente come TDK IEC I / Type I. Correzioni [2,5; −0,5; −0,5; −0,5; 0; 0; +0,5; +1; +3; 0] dB e trim [−0,5; 0] dB. Confermata la copia completa nell'autosalvataggio e la disattivazione della sola vecchia curva musicale corrispondente. Non inventato un modello commerciale TDK più preciso, né valori delle manopole non comunicati.

Dopo il riavvio della build finale: profilo ancora presente nella libreria e nel progetto, stato «PROFILO ATTIVO», condizioni riproposte nel modulo e pulsante «Profilo salvato». Selezionata FastTrack Pro nell'app a 44,1 kHz, eliminato l'avviso di uscita diversa. Nessun audio riprodotto e nessuna nuova registrazione fisica eseguita durante questi controlli.

## Modulo semplificato · 25 ottobre 2026

Il solo campo obbligatorio è il nome, precompilato con «Calibrazione · data». Piastra, nastro, dispositivi e note sono facoltativi e raccolti nella sezione richiudibile «Dettagli della prova · facoltativi». La frequenza e i dispositivi disponibili sono precompilati; la UI chiarisce che sono le impostazioni disponibili, non una ricostruzione certa di acquisizioni precedenti. Un profilo già salvato ripropone i dati originali. Si può cancellare l’associazione dell’uscita: senza quel dato non viene applicato il vincolo sul nome del dispositivo. Qualità della misura, limiti e correzioni restano invariati.
