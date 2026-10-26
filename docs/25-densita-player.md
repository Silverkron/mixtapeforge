# Densità da player audio

## Obiettivo

Ridurre spazio verticale e padding nella vista principale mantenendo palette, funzionalità e leggibilità. Questa revisione aggiorna il layout dei documenti 23–24.

## Scelte

- Barra applicazione di 38 px; titolo progetto e riepilogo sulla stessa riga.
- Display compatto, timer di 26 px, spettro di 44 px e meter con scala e selettore più piccoli.
- Trasporto con pulsanti di 28 px e spazio di stato sempre riservato, anche durante preparazione e pausa.
- Playlist a righe singole di circa 31 px: numero, titolo, artista e durata affiancati; titoli lunghi troncati visivamente senza allargare la lista.
- Intestazioni lati, capacità, aggiunta brani e footer con spazi ridotti.
- Alle larghezze inferiori a 760 px i controlli vanno a capo e l'artista torna sotto il titolo, con righe più alte per mantenerlo leggibile.

La compattazione riguarda i fogli di stile; motore audio, pausa, stop, trascinamento e menu mantengono il comportamento precedente.

## Verifica

Build frontend, formattazione e controllo visivo del player e della playlist con progetto demo nel browser. Player alto 191 px nei quattro stati verificati (fermo, preparazione, ascolto e pausa), rispetto ai precedenti 300 px; righe playlist misurate a 31 px. Nessun overflow orizzontale alle larghezze di 1200 e 800 px controllate. Build macOS e verifica finale nella WebView dell'app.

Collaudo macOS completato: importazione dell'utente attesa fino al salvataggio automatico, poi app riavviata con la build aggiornata e 12 brani recuperati (53:59, C90). Verificati screenshot nativo, righe singole, meter, pulsanti e apertura/chiusura del menu traccia. Tutte le dodici righe del lato A sono visibili nella finestra controllata. Preservata l'eccedenza del lato, senza distribuire o modificare la scaletta dell'utente.

Le azioni per brano sono state successivamente portate direttamente sulla riga: [Azioni dirette](26-azioni-dirette-brani.md).
