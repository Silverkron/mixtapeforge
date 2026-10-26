# Player e scaletta: uno scroll unico

## Comportamento

Player, comandi della mixtape e brani appartengono allo stesso flusso verticale. Il player non resta sovrapposto alla scaletta mentre si scorre. La barra applicazione resta ferma.

I dettagli «Uscita, calibrazione e dettagli» si espandono nella pagina senza altezza massima e senza una scrollbar propria. Si usa sempre lo scorrimento del workspace, anche quando questi dettagli sono aperti. I pannelli e le finestre di dialogo mantengono il proprio scorrimento quando aperti.

La corsia di protezione per la scrollbar macOS, la palette e le dimensioni del player rimangono in uso. Il trascinamento dei brani continua a scorrere il workspace ai bordi.

## Implementazione e verifica

Modifica limitata a `src/classic-player.css`: player in posizione relativa; dettagli senza `max-height`, overflow interno o gutter aggiuntivo.

Verificato nel browser a 1200×640: scorrendo il workspace di 140 px, il player si sposta esattamente di 140 px. Con i dettagli aperti l'unico elemento con overflow verticale scorrevole è `workspace-viewport`; il documento resta alto 640 px e non presenta overflow orizzontale. A 900×640 rimane un solo scroller e la corsia macOS misura 16 px. Controllato anche lo screenshot dei dettagli espansi. Formattazione e build desktop completate.

Aperta la build aggiornata su macOS: espansi i dettagli, scorsa la pagina e verificato tramite screenshot che il display del player esca dalla vista mentre dettagli e scaletta avanzano insieme, senza sovrapporsi. Barra applicazione e avviso di ripristino restano fermi. Poi ripristinata la vista iniziale con dettagli chiusi, senza modificare il progetto o avviare audio.
