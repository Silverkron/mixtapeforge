# Cornici e scroll macOS

> Aggiornamento: [31 — Scroll unico](31-scroll-unico.md) rimuove il player sticky e lo scroll interno dei dettagli. La protezione della scrollbar macOS descritta qui resta in uso.

## Problema

Il documento scorreva interamente, trascinando anche la barra applicazione. I controlli all'estrema destra non avevano protezione per le scrollbar sovrapposte di macOS. Le cornici di display e trasporto usavano colori differenti sui bordi superiore/sinistro e destro/inferiore; la barra applicazione conservava anche un'ombra interna insieme al bordo, creando una doppia linea.

## Correzione

La shell occupa l'altezza della WebView. La barra applicazione resta fuori dallo scroll; soltanto il workspace centrale scorre. Le dimensioni seguono la WebView e non includono la title bar nativa del sistema.

`WorkspaceViewport` osserva viewport e contenuto con ResizeObserver. Confronta larghezza esterna/interna e altezza del contenuto: se la scrollbar ha già un gutter, lo usa senza aggiungere spazio; se è sovrapposta e serve lo scroll, riserva 16 px sul lato destro. Se non serve scorrere, l'inset scompare. `scrollbar-gutter: stable` stabilizza le barre classiche nei motori che lo supportano. Nessuna preferenza di macOS viene modificata e la scrollbar rimane quella del sistema.

Il trascinamento automatico ai bordi usa ora lo scroller del workspace anziché `window.scrollBy`. Drawer e dettagli espandibili riservano a loro volta un gutter per le barre classiche; il loro padding interno protegge quelle sovrapposte.

Display e tasti usano un bordo uniforme, mantenendo il rilievo con l'ombra interna. Rimossa la seconda linea ereditata dalla barra applicazione. Nessuna modifica alla palette o alla scaletta.

## Prove

Build frontend, 12 test e formattazione. Nel browser sono verificati scroll del workspace con barra superiore ferma, documento senza overflow verticale, bordi del display dello stesso colore sui quattro lati, scrollbar sovrapposta e classica da 16 px. La modalità classica viene riprodotta tramite una regola CSS temporanea nel solo browser di prova e poi rimossa, senza cambiare impostazioni del sistema.

Verifica finale: alla risoluzione 900×640 il documento resta alto quanto la viewport e il workspace usa un inset di 16 px con scrollbar sovrapposta; senza overflow a 1200×1100 l'inset torna a zero. Con scrollbar classica simulata da 16 px non viene aggiunto altro padding.

Build macOS completata e aperta. Controllati screenshot nativo e scorrimento in basso/alto: barra applicazione e banner restano fermi, il workspace scorre, il player mantiene la sua posizione sticky e i controlli sul lato destro restano arretrati rispetto alla corsia della scrollbar. Non sono state modificate le preferenze di macOS né avviata la riproduzione.
