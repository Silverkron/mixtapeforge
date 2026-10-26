# Prova automatica estesa e profilo prudente v2

Implementata il 25 ottobre 2026. Sostituisce il protocollo di generazione da 49 secondi; acquisizioni, report e profili precedenti restano compatibili. Il profilo già attivo non viene modificato automaticamente.

## Flusso

Una registrazione di 108,2 secondi, preceduta da 3…2…1. Collegamenti, volume del computer, REC LEVEL e guadagno di acquisizione restano fissi. Dolby/NR del deck disattivato per la misura. Al termine si ferma REC e si riavvolge; poi si avvia l’acquisizione nell’app e PLAY sulla piastra. L’autostop chiude l’acquisizione software dopo il marcatore finale e la coda; non comanda il trasporto fisico.

Il file condiviso `src/calibration-protocol.json` definisce segmenti e fasi per generatore Rust e avanzamento React.

| Intervallo | Misura |
| --- | --- |
| 0–4 s | Sincronismo iniziale |
| 4–6 s | Riferimento 315 Hz, −18 dBFS peak |
| 6–24 s | Dieci bande 31,5 Hz–16 kHz a −24 dBFS peak |
| 24–28 s | Fondo iniziale |
| 28–42 s | Sette livelli a 315 Hz, da −30 a −3 dBFS peak |
| 42–46 s | Toni separati L/R per diafonia |
| 46–64 s | Dieci bande a −12 dBFS peak |
| 64–94 s | 1 / 4 / 8 / 12,5 kHz, sei livelli ciascuno, da −30 a −3 dBFS peak |
| 94–101,2 s | Ripetizioni 315 Hz / 1 / 4 / 8 kHz |
| 101,2–105,2 s | Fondo finale |
| 105,2–108,2 s | Sincronismo finale e coda |

## Misure e decisioni

- Risposta relativa a 1 kHz ai due livelli, variazione con il livello, rapporto segnale/fondo, dispersione in finestre da 150 ms, cali rispetto alla mediana e confronto delle ripetizioni disponibili.
- Banda affidabile: almeno 12 dB sopra il fondo su entrambi i canali, dispersione entro 1,5 dB, ripetizioni disponibili entro 1,5 dB e riferimento ripetuto entro 1,5 dB. Il fondo usa il peggiore tra silenzio iniziale e finale.
- EQ: metà dell’inverso della risposta media stereo, massimo ±1,5 dB, passi di 0,25 dB. Escluse bande incerte o con variazione oltre 1 dB tra i livelli. Nessun boost a 31,5 Hz, nessuna correzione a 16 kHz. Boost graduale tra SNR 12 e 18 dB.
- Bilanciamento: attenuazione del canale più forte fino a 1,5 dB, solo con almeno sei bande affidabili, dispersione dello sbilanciamento entro 0,75 dB e riferimento ripetuto entro 0,5 dB. Differenze inferiori a 0,5 dB restano invariate.
- Limiti di pilotaggio a 315 Hz, 1 / 4 / 8 / 12,5 kHz: ultimo livello affidabile prima di instabilità, compressione oltre ±1 dB o distorsione armonica misurabile oltre 3%, meno 1,5 dB di margine. Se manca una misura affidabile non viene inventato un limite.
- La distorsione include solo seconda e terza armonica sotto Nyquist. A 12,5 kHz con 44,1/48 kHz non è misurabile: il limite usa compressione e stabilità, senza dichiarare distorsione nulla.
- Fondo alto: avviso, non blocco generale dell’EQ. Clipping: tolleranza cumulativa di 1 ms per canale, come nel protocollo precedente.

Le soglie sono scelte prudenziali dell’app, non standard di calibrazione del nastro.

## Applicazione al master

EQ e trim del profilo sono applicati una volta dopo i VST. Cinque filtri passa-banda a guadagno unitario al centro, Q = √2, misurano i true peak nelle zone dei limiti disponibili. Il master riceve solo l’attenuazione globale necessaria a rispettare questi limiti e il tetto true peak digitale. Non è un compressore multibanda e il controllo non certifica l’assenza di saturazione su qualunque programma musicale.

Con NR attivo viene controllato anche il segnale codificato. Se supera un limite si riduce il livello prima dell’encoder e si ricodifica, fino a otto tentativi. Nessuna correzione di guadagno dopo la codifica Dolby B. Il profilo non calibra il riferimento o il tracking Dolby.

## Compatibilità e limiti

Report/profili v1 mantengono il calcolo precedente. Report/profili v2 contengono anche qualità, prove per frequenza e limiti. Il backend valida coerenza e valori; il progetto conserva una copia completa del profilo. Per ottenere v2 occorre una nuova prova fisica e un salvataggio esplicito.

Il ritorno misura scheda, registrazione, nastro e riproduzione insieme. Senza riferimento indipendente non si separa l’errore di registrazione da quello di riproduzione. Il profilo cerca un miglioramento prudente; non certifica la resa su altre piastre, non corregge meccanica, azimuth, bias fisico o wow/flutter.

## Verifiche

- 52 test Rust e 63 test frontend passati; controllo TypeScript e Clippy con warning vietati passati.
- Sequenza ideale completa alle quattro frequenze progetto: 44,1 / 48 / 88,2 / 96 kHz.
- Compressione simulata sulle alte, banda con dropout, rumore, polarità invertita, ritardo e deriva di velocità: rilevamento verificato. Acquisizione troncata respinta.
- Autostop v1/v2, formato float32 interno e PCM24 esportato, conservazione del segnale e profili precedenti verificati.
- Master con limite a 8 kHz, contenuto a 315 Hz e Dolby B: rispetto dei limiti verificato, compresi i picchi tra campioni.
- Anteprima dei risultati v2 controllata anche a 640 px, senza overflow orizzontale della pagina. Posizione del contenuto invariata nei passaggi pronto/preparazione/countdown/riproduzione/pausa/fine/stop/errore, verificata a 640 e 1200 px.
- Build desktop completata e riaperta: recupero del progetto e della misurazione v1 confermato; profilo Pioneer/TDK ancora attivo, FastTrack Pro selezionata a 44,1 kHz e nuova durata 01:48 visibile.
- Nessuna nuova registrazione fisica su nastro eseguita automaticamente: resta la verifica pratica con la Pioneer e il nastro dell’utente.
