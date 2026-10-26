# Type B: riferimento iniziale e livello del master

Aggiornamento del 25 ottobre 2026, dopo la segnalazione di volume troppo basso e alte attenuate nella cassetta riprodotta con Dolby B sulla Pioneer CT-W205R.

## Comportamento

- Nuovi progetti: riferimento del codec **0 dBFS peak**, come richiesto. Intervallo ammesso −36…0 in UI, modello Rust e programma standalone.
- Progetti salvati: il valore esplicito, incluso −18, viene conservato. In Audio → NR encoding, **Ripristina 0 dBFS** permette di applicare il nuovo valore al progetto aperto tramite il normale percorso undo/autosave.
- Eliminata la riserva preventiva fissa di 12 dB. Si prova senza attenuazione NR aggiuntiva, rispettando il limite true peak del premaster e un minimo margine di ingresso PCM.
- Se il codec satura o il master codificato supera il ceiling, si abbassa il premaster originale e si ricodifica l’intero lato con uno stato nuovo. Massimo otto tentativi; gli altri errori non vengono ritentati. La cancellazione rimane disponibile durante ogni lettura e processo esterno.
- Nessuna correzione di guadagno dopo l’encoding. Nelle misure viene mostrata l’attenuazione effettiva **prima dell’encoder NR**.

Il nuovo riferimento 0 è un’impostazione iniziale del codec, non un livello da raggiungere sul meter del deck e non una calibrazione hardware certificata. Il livello del tono di calibrazione è separato. I limiti e le conclusioni dell’[audit precedente](39-audit-dolby-b.md) sulla compatibilità hardware restano validi.

## Implementazione

Il render conserva il premaster originale e usa due file distinti per ingresso scalato e uscita NR. Ogni tentativo riparte dall’originale: non codifica due volte l’uscita del tentativo precedente. Il codec PCM24 e l’algoritmo libdolbyb non sono stati cambiati.

Il CLI restituisce exit status 3 per uscita saturata, con rimozione del file parziale. Il bridge distingue questo esito con `TransformOutcome::Clipped`; `transform_file` mantiene il comportamento di errore per i chiamanti che non effettuano retry. Specifiche nel [contratto desktop](13-contratto-desktop.md).

## Prove

- 0 accettato e impostato inizialmente; progetto esplicito a −18 riletto senza modifiche; valore positivo rifiutato.
- Su un tono da 400 Hz a −9 dBFS, attenuazione NR aggiuntiva esattamente **0 dB**, sia con riferimento 0 sia con −18. Uscita identica campione per campione alla codifica diretta: nessun guadagno dopo il codec.
- Su un segnale forte a 10 kHz, retry effettivo e rispetto del true peak finale. L’uscita coincide con una codifica diretta del segnale attenuato prima dell’encoder.
- Cancellazione durante un retry: nessun master incompleto o file temporaneo residuo. Uscita satura riconosciuta separatamente dagli errori generici.
- Con riferimento 0, enfasi delle alte a basso livello e roundtrip verificati a 44,1/48/88,2/96 kHz. La prova digitale non sostituisce il decoder della piastra.
- Confronto isolato a 48 kHz su un tono a 5 kHz e −40 dBFS peak: enfasi **+2,566 dB** con riferimento −18, **+8,724 dB** con riferimento 0. Dati in `test-results/nr/new-reference-comparison.json`. Questa prova isola il parametro del codec e non include il nastro.
- Interfaccia: nuovo progetto a 0, vecchio valore conservato fino al clic su Ripristina; verifica browser a 900 × 640, senza overflow orizzontale e pulsante correttamente disabilitato quando il valore è già 0.
- Verifica integrata offline: PCM16/24/float32, vero picco e durata riletti dai file, raccolta portabile, cancellazione, normalizzazione/EQ/dinamica. Sulla fixture sintetica con i default aggiornati, i tre master NR arrivano a **−3,063 dBTP**, con attenuazione prima del codec di **−3,940 dB**. La prova precedente, con riferimento −18 e margine fisso, produceva circa −14,956 dBTP: il confronto comprende sia il cambiamento del margine sia quello del default. I test isolati sopra verificano il margine separatamente.

La prova PDF/SVG della verifica integrata è stata controllata visivamente; la modifica al test delle etichette verifica ora la scena sorgente, perché il PDF usa tracciati vettoriali per i font. Nessun suono è stato riprodotto automaticamente e nessuna registrazione fisica è stata avviata durante queste prove.

39 test frontend e 34 Rust superati (suite e prove mirate), Clippy senza warning e formattazione verificata. Build macOS completata e app riaperta a player fermo; sessione recuperata sul lato B. Il progetto recuperato ha NR disattivato: questa scelta non è stata cambiata per la verifica. Il pulsante di ripristino è stato esercitato nella fixture browser, senza alterare la configurazione audio dell’utente.

## Prova sul deck

Occorre ricalcolare il master e incidere una nuova prova: la modifica non corregge cassette già registrate. Con codifica software, NR OFF durante la registrazione e Dolby B ON al riascolto. Il livello sarà diverso rispetto ai master precedenti; controllare REC LEVEL sulla nuova prova. Non compensare un eventuale suono chiuso applicando EQ o normalizzazione dopo l’encoding. Se persiste, il riferimento e la risposta della catena devono essere misurati sul deck: non è corretto dichiararli risolti dal solo cambio a 0.
