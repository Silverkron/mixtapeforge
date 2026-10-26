# Pausa, ripresa e arresto

## Comportamento

Pausa sospende l’uscita digitale e blocca la posizione: il callback emette silenzio senza consumare i frame del master in coda. Il pulsante diventa Riprendi e continua dallo stesso campione. I meter vengono azzerati e il contatore resta fermo. Le modifiche alla scaletta restano bloccate fino a Stop. Spazio alterna pausa e ripresa; Esc ferma anche il conto alla rovescia.

La pausa software non controlla il trasporto della piastra: il player ricorda di mettere in pausa anche il deck.

Stop imposta il segnale di cancellazione e il callback successivo emette silenzio, senza attendere lo svuotamento del buffer sorgente. Poi vengono chiusi stream e thread. Gli eventi di telemetria ricevuti dopo Stop vengono ignorati e non possono riattivare lo stato di riproduzione. Il successivo Ascolta riparte dall’inizio.

## Diagnosi e limiti

Il callback precedente non verificava il segnale di cancellazione: continuava a prelevare campioni mentre il thread di controllo preparava la chiusura. La correzione rende il silenziamento indipendente dalla conclusione del thread e dalla quantità di audio già precaricato nel ring buffer.

Il silenzio parte dal callback successivo; i campioni già consegnati al driver o a un dispositivo esterno seguono la latenza di quell’uscita. Il test non misura la latenza acustica degli altoparlanti o di dispositivi Bluetooth.

## Contratto e verifica

`set_audio_paused({paused:boolean})`: richiede un’uscita attiva; mantiene posizione, stream e coda. `stop_audio()` mantiene firma e semantica di arresto, ora con cancellazione verificata nel callback. Dettagli nel documento 13.

- Due test Rust verificano continuità esatta dei campioni dopo pausa e silenzio al callback successivo a Stop senza consumare la sorgente.
- Suite core: 18 test superati; frontend: 12 test superati.
- `verify_transport` usa un WAV silenzioso di 8 secondi sull’uscita reale, verifica posizione ferma durante pausa, avanzamento dopo ripresa e chiusura entro 500 ms. Sul MacBook Pro: posizione ferma a 0,313 s, ripresa verificata, Stop/chiusura in 59,8 ms.
- Fixture UI: fermo, elaborazione, riproduzione e pausa mantengono altezza di 300 px e nessun overflow orizzontale alla larghezza verificata; Pausa/Riprendi e Stop disponibili negli stati corretti.
- Collaudo nella build macOS aggiornata con il progetto recuperato (12 tracce): Ascolta prepara e avvia il lato; Pausa a 9,392479 s mantiene posizione e azzera meter/spettro; Riprendi prosegue a 9,682729 s; Stop riporta subito la UI a Pronto, tempo 00:00 e comandi sbloccati. App lasciata ferma con il master pronto.
