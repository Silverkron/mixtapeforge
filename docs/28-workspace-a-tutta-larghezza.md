# Workspace a tutta larghezza

La skin del documento 27 aveva introdotto due limiti: contenuto a 1240 px e player a 1000 px. Su una finestra più larga apparivano fasce laterali vuote e una cornice esterna, poco coerenti con lo spazio di lavoro richiesto.

Il contenuto principale, il player e le playlist ora occupano il 100% della larghezza della finestra, senza max-width, margini orizzontali o padding esterno. Titolo progetto e comandi hanno soltanto il padding interno necessario. Il player non ha più bordo, ombra o angoli esterni; le playlist e la barra strumenti non hanno cornici perimetrali. Restano le separazioni fra sezioni e il bordo interno del display, per distinguere letture e controlli.

Colori, contatore a segmenti, proporzioni del trasporto, icone sui brani e funzionamento audio restano quelli della skin corrente.

## Verifica

A 1440 px di viewport, main, player e griglia delle playlist partono da x=0 e misurano tutti 1440 px. Nessun overflow orizzontale. Build frontend completata e controllo visivo nel browser.

Verifica aggiuntiva a 800 px: main e player larghi 800 px, senza overflow. Build macOS e formattazione completate. Screenshot nativo controllato nell'app aggiornata: player e playlist arrivano ai lati della finestra. Durante il controllo l'utente ha avviato un'importazione; lasciata proseguire senza altre modifiche al progetto.
