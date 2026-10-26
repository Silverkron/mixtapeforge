# Playlist stabili e trascinamento

Revisione del 24 ottobre 2026, successiva al ripristino della palette originale.

## Problemi osservati

La barra delle azioni passava da altezza zero a 30 px su hover, focus o selezione: ogni comparsa spostava i brani successivi. Il trascinamento HTML era applicato a una riga composta quasi interamente da pulsanti; mancavano maniglia, soglia e feedback sulla destinazione. Il drop su riga inseriva soltanto prima del bersaglio, mentre quello sul pannello cambiava lato senza gestire il riordino in fondo allo stesso lato.

Il problema di trascinamento segnalato su desktop non è stato riprodotto nella vecchia build nativa: non attribuiamo una causa unica verificata. Tauri documenta inoltre una specifica interferenza dei gestori nativi con HTML5 DnD su Windows. La soluzione adottata usa Pointer Events e pointer capture per il riordino interno, indipendenti da quei gestori, senza cambiare l’importazione tramite selettore file.

## Riferimenti verificati

- [MixtapeNerd — Preview and Test](https://www.anaxwaves.com/MixtapeNerd/Docs/PreviewAndTest.html): clic per evidenziare un brano, controlli distinti per i due lati, playlist bloccate durante l’anteprima. Il dettaglio dei gesti di trascinamento non è stato verificato; alcune pagine del sito non erano raggiungibili.
- [Modern Playlist per foobar2000](https://github.com/jame25/foo_modernplaylist): soglia prima del drag, linea di inserimento, protezione degli elementi bloccati. È un componente, non la UI standard di ogni installazione foobar2000.
- [Tauri — dragDropEnabled](https://v2.tauri.app/reference/config/#dragdropenabled): interferenza documentata con HTML5 DnD su Windows.

## Interazione implementata

- Riga di altezza stabile, maniglia a sinistra e pulsante «…» sempre disponibile a destra.
- Clic per selezionare, doppio clic o «Regola brano…» per aprire le regolazioni.
- Trascinamento dalla maniglia o dal titolo dopo 6 px; posizione indicata da una linea, prima/dopo un brano o in fondo alla lista.
- Trasferimento verso lato vuoto, riordino sullo stesso lato, nessuna duplicazione.
- Nessuna modifica durante il movimento: un solo commit al rilascio, annullabile dalla cronologia esistente.
- Escape, perdita della finestra attiva, pointer cancel o rilascio fuori dai lati annullano il gesto.
- Brani bloccati e sessione occupata impediscono il trascinamento.
- Menu sovrapposto con comandi testuali: regola, blocca/sblocca, sopra, sotto, cambia lato, rimuovi. Accessibile con Tab/Enter; Escape chiude e restituisce il focus. Chiusura anche al clic esterno e allo scorrimento della finestra.
- Focus del menu senza scroll automatico. Palette precedente conservata.

## Verifiche

12 test frontend superati, inclusi 3 nuovi test per trasferimenti, riordini e casi limite. Build frontend e bundle macOS verificati. Nel browser: drag con eventi reali A→B, B→A vuoto e riordino interno; menu e Escape; confronto geometrico prima/dopo apertura menu identico; nessun overflow orizzontale a 900 px. Controllo visivo a 900 e 1440 px.

La verifica browser non sostituisce il collaudo del gesto nelle WebView native macOS, Windows e Linux. Il riordino è singolo: selezione multipla e trascinamento di gruppi restano fuori da questa modifica.
