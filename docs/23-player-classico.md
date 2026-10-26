> Densità corrente aggiornata in [Densità da player audio](25-densita-player.md).

# Player classico · revisione corrente

Questa revisione sostituisce il layout laterale descritto nel documento 22. Mantiene la palette originale blu scuro, lilla e ciano.

## Struttura

Un solo player orizzontale sopra le playlist A/B: titolo, tempo trascorso, meter stereo e spettro. Sotto il display ci sono selezione lato, Ascolta, Stop, REC e EQ / Audio. Impostazioni di uscita, calibrazione e confronto dal deck restano in una sezione espandibile. Nessun secondo trasporto fisso sul fondo.

Ascolta prepara il master se necessario e lo avvia. REC prepara se necessario, poi esegue il conto alla rovescia. Il registratore fisico deve essere già in REC. Stop interrompe anche il conto alla rovescia. Le avvertenze NR e clipping restano visibili. Il player offre Pausa/Riprendi senza perdere la posizione. Spazio alterna pausa e ripresa; Esc e Stop arrestano e il successivo Ascolta riparte dall’inizio. Il seek non è ancora disponibile. Durante la pausa la scaletta resta bloccata perché il master e lo stream rimangono attivi.

## Caricamento e stabilità

La riga di stato del player occupa sempre lo stesso spazio. Durante la preparazione mostra progresso reale, descrizione e Annulla quando l'operazione lo consente. Quando il backend non ha ancora fornito un progresso positivo, l'indicatore è indeterminato. Durante l'ascolto mostra l'avanzamento temporale del lato; non è una barra interattiva di ricerca.

La vecchia job-bar fissa è stata rimossa. Se un pannello modale è aperto, lo stesso componente di progresso viene presentato anche nel pannello, per mantenere accessibile l'annullamento. Le icone sono SVG locali con dimensioni esplicite e senza compressione flex; il trasporto usa simboli pieni insieme alle etichette.

Le playlist mantengono trascinamento con Pointer Events e menu sovrapposti: aprire un menu non cambia l'altezza delle righe.

## Riferimenti

- [Winamp desktop](https://support.winamp.com/winamp-desktop-player-for-windows): separazione fra player, playlist ed equalizzatore.
- [MixtapeNerd · Preview and test](https://www.anaxwaves.com/MixtapeNerd/Docs/PreviewAndTest.html): ascolto per lato e blocco della scaletta durante l'uscita.
- [MixtapeNerd · progetti](https://www.anaxwaves.com/MixtapeNerd/Docs/SaveOpenProject.html): organizzazione in due lati.

## Verifiche

Build frontend e 12 test superati. Verifica visiva nel browser della schermata principale e del player con dati simulati: fermo, elaborazione determinata e indeterminata, pronto, conto alla rovescia e riproduzione. Stessa altezza di 300 px nei sei stati verificati, nessun overflow orizzontale. Le prove simulate verificano il rendering, non la pipeline audio nativa.

La build macOS viene generata senza riavviare l'app già in uscita audio; il collaudo della nuova interfaccia nella WebView nativa resta da eseguire a riproduzione conclusa.
