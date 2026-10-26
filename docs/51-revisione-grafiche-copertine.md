# Revisione delle grafiche delle copertine

## Problema
La decorazione di Archivio B/N e Studio classico era un rettangolo verticale con due cerchi e una linea: risultava simile a un volto anziché a una cassetta. Alcuni altri motivi erano generici; Radio poster e Home recorded condividevano la stessa decorazione.

## Intervento
Il catalogo condiviso da React e dal renderer Rust definisce ora nove motivi distinti:
- Studio classico: cassetta orizzontale con bobine, mozzi, finestra, viti e zona inferiore della scocca; fasce colore.
- Archivio B/N: stessa cassetta riconoscibile, contorni sottili e righe da archivio.
- Garage: composizione inclinata a blocchi, da locandina rock.
- Backstage: pass perforato, barre audio e motivo a barre decorativo (non un codice leggibile).
- Color club: disco concentrico e geometrie pop.
- Night drive: sole segmentato, montagne e prospettiva neon.
- Fanzine B/N: ritagli inclinati e tratteggi ad alto contrasto.
- Radio poster: disco e fasce progressivamente più corte.
- Home recorded: etichetta a righe con dettaglio di controllo.

I motivi posteriori restano tra x=80 e 102,8 mm, sotto l'indicazione del nastro e sopra le informazioni dei lati. Titoli, tracklist, font, palette personalizzate e dimensioni di taglio non cambiano. Nessun nuovo dato richiesto nei progetti salvati.

## Verifica
- Generazione nativa di 9 SVG/PDF e 54 combinazioni stile/font.
- Ispezione visiva dei nove PDF rasterizzati e tavola di confronto in `test-results/artwork-redesign/overview.png`.
- Fixture native aggiornate: confronto geometrico e cromatico React/Rust esteso anche a Radio poster e Home recorded, prima assenti dalle fixture.
- 19 test copertine superati; TypeScript e build desktop verificati.
- Nessuna nuova prova fisica di stampa.
