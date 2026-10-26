# Skin player modulare

## Direzione

La revisione 25 aveva ridotto lo spazio, ma anche la presenza visiva del player. Questa revisione riprende l'organizzazione a moduli del Winamp classico e conserva la palette blu scuro, lilla e ciano già scelta. Non aggiunge pulsanti audio senza una funzione reale.

## Player

Il modulo centrale ha larghezza massima di 1000 px, cornice con bordi in rilievo, intestazione rigata e un display scuro incassato. Titolo della mixtape e formato audio occupano una striscia unica; sotto si trovano contatore a sette segmenti SVG, meter stereo e spettro. La frequenza mostrata viene dal progetto.

I tasti Ascolta, Pausa/Riprendi, Stop e Al deck sono alti 36 px, con gradiente e bordi distinti. Le icone e le etichette restano entrambe visibili. Lato A/B ed EQ sono separati dal trasporto. La riga di preparazione e stato continua a occupare uno spazio costante.

Il contatore usa SVG locali, senza font da scaricare. Il valore rimane accessibile anche alle tecnologie assistive. I visualizzatori ridisegnano il canvas al ridimensionamento, per evitare testo e spettro deformati quando cambia la larghezza della finestra.

## Playlist

I lati sono moduli separati con intestazioni in rilievo e fondo della lista più scuro. Le righe passano da 31 a circa 39 px: titoli a 12 px, durate a 11 px e le sei azioni sempre visibili. Sotto 900 px i lati si impilano; sotto 760 px artista sotto il titolo, controlli su più righe e player non fisso.

## Riferimento

[Winamp desktop](https://support.winamp.com/winamp-desktop-player-for-windows): player principale, playlist ed equalizzatore come moduli distinti. I colori e i comandi specifici per la registrazione su cassetta restano propri dell'app.

## Verifica

Controllati nel browser gli stati fermo, preparazione, conto alla rovescia, riproduzione e pausa: altezza costante di 278,5 px nella fixture desktop, nessun overflow orizzontale. Il contatore mostra correttamente anche il conto alla rovescia negativo. Verifica del canvas al ridimensionamento inclusa nella revisione.

Verificati anche 800 e 680 px: nessun overflow e canvas ridisegnato alla larghezza effettiva (buffer di 588 px per 588 px CSS a DPR 1 nel controllo a 680 px). Build frontend, 12 test e controllo di formattazione superati.

Build macOS completata e app riavviata a player fermo. Mixtape da 12 tracce recuperata senza modificare ordine o lati. Verificati screenshot nativo e albero accessibile: contatore SVG leggibile, titolo e formato nel display, controlli in rilievo, righe e icone visibili. Conservate tutte le avvertenze di durata.
