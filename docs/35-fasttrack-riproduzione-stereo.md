# FastTrack Pro: segnale presente ma cuffie mute

## Diagnosi

L’utente sentiva altri programmi dalle cuffie della FastTrack Pro, ma non Cassette Maker, anche con A/B su A e Mix verso PB. Nella prova del player il master avanzava e i meter indicavano circa −10/−12 dBFS: il silenzio non proveniva dal file né dalla pausa.

La scheda espone una configurazione disponibile di quattro canali, ma il formato predefinito di uscita è stereo a 44,1 kHz. La selezione precedente considerava soltanto le configurazioni disponibili e apriva quattro canali. L’apertura e l’avanzamento con silenzio avevano superato i test, ma non dimostravano l’arrivo della musica alle cuffie.

## Correzione

Il player preferisce il formato predefinito quando è stereo, float32 e alla frequenza esatta del master. In alternativa mantiene la scelta della configurazione supportata con meno canali compatibili. Non cambia frequenza, volume o campioni. Le uscite multicanale restano supportate con L/R su 1–2 e zero sugli altri canali quando non è disponibile il formato stereo predefinito.

## Evidenza

- Due nuovi test verificano la preferenza stereo rispetto al totale fisico dei canali e il rifiuto del default a frequenza diversa. Suite core: 21 test superati.
- Prova di trasporto silenziosa sulla FastTrack: pausa stabile, ripresa e Stop in 60,6 ms.
- `check_output <master.wav> <nome dispositivo>` riproduce cinque secondi di un master esistente, senza generare toni o modificare livelli. Provato con il master musicale della sessione a 44,1 kHz; telemetria non nulla e zero underrun.
- L’utente ha confermato di sentire la musica nelle cuffie durante questa prova con formato stereo.
- Clippy con warning negati e build macOS completati. Al termine l’app era nuovamente in riproduzione per iniziativa dell’utente: non è stata riavviata per evitare di interromperla. La build corretta viene caricata alla prossima apertura.

Per la FastTrack il manuale distingue cuffie A (canali 1–2) e B (3–4); la manopola Mix seleziona ingresso/Playback. Fonte: manuale originale M-Audio conservato da McGill, https://www.mcgill.ca/library/files/library/m-audio-fast-track-pro-manual.pdf. Questi controlli non erano sufficienti a risolvere il difetto software osservato.
