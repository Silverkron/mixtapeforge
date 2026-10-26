# Stabilità del layout durante le operazioni

## Problema e cause

Avvia prova inseriva JobProgress tra navigazione e scheda per poi rimuoverlo al conto alla rovescia. Altri comandi inserivano la stessa barra nei pannelli e nelle modali. L’avvio acquisizione aggiungeva un banner alla struttura della finestra. A questi spostamenti si sommavano testi di stato di lunghezza diversa, il pulsante CLIP aggiunto sotto i misuratori e il margine per scrollbar macOS applicato solo al comparire dello scroll.

## Regole implementate

- Le barre generiche delle operazioni usano JobProgress in overlay tramite portal nella radice dell’app, fuori da contenitori ridimensionabili, scroll e pannelli inerti. Il player, il tono manuale e l’analisi mantengono i propri indicatori integrati negli spazi dedicati.
- L’avviso globale dell’acquisizione è un overlay e non riduce più l’altezza del workspace.
- Riga del timer con dimensioni costanti; i messaggi della sequenza condividono una griglia dimensionata sul più lungo dei testi normali, adattandosi alla larghezza senza tagliarli. Le riserve sono escluse dall’albero accessibile. I dettagli degli errori restano leggibili.
- Stato e guida dell’acquisizione mantengono gli spazi dei messaggi finali anche durante l’attesa. Larghezza minima costante per il comando Avvia/Ferma/Ripeti.
- CLIP occupa un posto riservato nella testata del misuratore. Quando non attivo è invisibile, disabilitato e escluso dall’albero accessibile; non inserisce una nuova riga.
- Il margine per scrollbar sovrapposte macOS resta costante anche prima dell’overflow. Le scrollbar che riservano già spazio non ricevono un secondo margine.

## Verifiche

58 test frontend e TypeScript passati. Test di regressione sulla transizione da contenuto corto a contenuto con scrollbar e sulla distinzione tra scrollbar sovrapposta e classica.

Anteprima isolata con i componenti reali, senza riprodurre o acquisire audio: a 640, 900 e 1200 px le coordinate e le dimensioni dei comandi, dei misuratori e del contenuto successivo sono identiche tra ready, preparing, countdown, playing, paused, finished, stopped ed error. Nessun overflow orizzontale. A 640 px, acquisizione simulata con picchi a 0 dBFS e completamento automatico: strumenti sempre alla stessa coordinata (782,39 px) e con la stessa altezza (513 px).

Queste verifiche riguardano le transizioni operative; il cambio volontario di pagina o l’apertura di dettagli produce naturalmente contenuti diversi. Non è una garanzia universale su qualsiasi futura modifica: ogni nuova operazione deve rispettare queste regole e ripetere la verifica geometrica.

Build desktop completata e app riaperta; verificata visivamente la resa nativa della schermata di registrazione con stato «Prova interrotta». Nessuna nuova acquisizione hardware eseguita per questo intervento.
