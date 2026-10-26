# Rilevamento delle uscite audio

> Per la riproduzione FastTrack verificata anche in cuffia vedere [35 — Riproduzione stereo](35-fasttrack-riproduzione-stereo.md). Il formato stereo predefinito ha precedenza sul totale dei canali fisici.

## Causa riprodotta

macOS mostrava FastTrack Pro (uscita e ingresso separati) e gli altoparlanti interni. CPAL 0.15.3 elencava soltanto gli altoparlanti. La diagnosi senza playback tramite `list_devices` mostrava `Invalid property value` per le configurazioni dell’uscita FastTrack.

In CoreAudio, CPAL interrogava le configurazioni creando un AudioUnit con ingresso sempre abilitato, anche per una query di uscita. L’endpoint solo uscita falliva e `output_devices()` lo filtrava. La patch locale elimina l’attivazione dell’AudioUnit nei due punti di interrogazione e restituisce dimensione buffer non specificata. La creazione dello stream mantiene i controlli originali sulle dimensioni richieste. Il comando IPC esegue il rilevamento su un worker, senza bloccare il thread UI. Sorgenti e licenza Apache-2.0 conservati in `src-tauri/vendor/cpal-0.15.3`; non è stata modificata la cache Cargo globale.

## Comportamento corretto

- Il backend ora restituisce entrambe le uscite, indipendentemente dall’uscita predefinita di sistema.
- L’elenco si aggiorna quando si aprono i dettagli del player, le Impostazioni o si torna nell’app quando il controller non è bloccato.
- L’uscita selezionata viene ritrovata per nome se cambiano gli indici. Se scompare, occorre selezionare un’altra uscita: nessun passaggio implicito a un altro DAC. L’identità per nome mantiene il limite già presente con dispositivi omonimi.
- FastTrack dichiara una configurazione float32 a quattro canali, 44,1 kHz. Il player accetta configurazioni con almeno due canali, preferisce quella con meno canali e scrive L/R su 1–2; gli altri restano a zero. Non aggiunge una seconda uscita monitor, ricampionamento o elaborazione.
- La frequenza del progetto deve essere supportata dal dispositivo: per la configurazione FastTrack osservata usare 44,1 kHz. Frequenze incompatibili continuano a produrre un errore esplicito.

## Prove

Prima/dopo sul dispositivo reale: una sola uscita prima; FastTrack Pro e Altoparlanti MacBook Pro dopo. `list_devices` legge soltanto capacità e nomi, senza avviare audio.

19 test Rust e 21 frontend superati; Clippy con warning negati e formattazione frontend superati. Test di regressione: nessuna alterazione dei campioni stereo, canali aggiuntivi silenziosi, pausa/Stop invariati; scelta preservata quando un inserimento USB cambia gli indici e nessun fallback silenzioso dopo disconnessione.

`verify_transport` eseguito sulla FastTrack con soli campioni silenziosi: stream aperto, pausa stabile a 0,325 s, ripresa con avanzamento e Stop in 57,4 ms nell’ultima prova. La prova attesta apertura e trasporto, non la qualità analogica o una registrazione su nastro. Windows/Linux non verificati localmente; la patch CPAL riguarda soltanto CoreAudio.

La verifica di avvio ha rilevato anche un blocco del vecchio rilevamento sul thread principale durante l’attivazione dell’ingresso CoreAudio (stack acquisito con `sample`). La patch definitiva evita l’attivazione nella query e `audio_devices` lavora su `spawn_blocking`. Il comando diagnostico definitivo termina regolarmente e restituisce due uscite e tre ingressi. Build macOS completata e avviata, progetto da 12 brani ripristinato.
