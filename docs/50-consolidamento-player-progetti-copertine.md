# Consolidamento del prodotto · 25 ottobre 2026

Ambito richiesto: player, salvataggi e recupero, copertine e font, tastiera, rimozione di funzioni assenti dall’interfaccia, lingue IT/EN/ES/FR.

## Accettazione

- Ascolto: ricerca temporale con slider nativo, brano corrente, precedente/successivo. Navigazione bloccata durante REC/countdown/acquisizione. La timeline include leader, gap, trim e crossfade.
- Progetti: scrittura temporanea unica, sincronizzazione su disco, sostituzione atomica e backup valido; esclusione tra scritture concorrenti e recupero dal backup. Relink conserva le regolazioni e richiede la stessa sorgente tramite hash.
- Copertine: nuovi font incorporati con licenza e metriche, scelta persistente e rendering coerente frontend/PDF/SVG. Stili ispirati a confezioni reali, senza copiare grafiche di terzi. Fixture di stampa e verifica visiva.
- Tastiera: elementi HTML nativi, focus visibile, Tab/Shift+Tab, Escape che chiude prima il dialogo, Space senza interferire con campi e pulsanti; slider con frecce/Home/End; Alt+freccia per brani.
- Nessuna opzione Dolby C/dbx non implementata esposta come funzione selezionabile.
- Lingue: preferenza locale IT/EN/ES/FR, cataloghi condivisi e cambio lingua senza modifica dei contenuti musicali dell’utente.

## Riferimenti

- WAI-ARIA slider: https://www.w3.org/WAI/ARIA/apg/patterns/slider/
- WAI-ARIA keyboard interface: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/
- National Audio Company, J-card: https://www.nationalaudiocompany.com/cassette-duplication/prepare-your-audio-and-your-album-art/cassette-art-templates/
- Morphius, template cassette: https://www.morphius.com/cassette-templates/
- Ultra Ferric, generatore J-card: https://ultraferric.com/pages/j-card-template

Le misure di stampa dei produttori non sono universali: l’app mantiene quote esplicite e un righello da verificare sulla propria stampante. Nessun lavoro fisico viene inviato alla stampante automaticamente.

## Implementazione

- La ricerca conferma la nuova posizione al rilascio del puntatore o del tasto: non riavvia lo stream per ogni movimento del cursore. La ricerca non disabilita il cursore durante il caricamento, preservando il focus da tastiera. La pausa viene mantenuta se si cerca mentre il player è in pausa.
- Precedente torna all’inizio del brano dopo tre secondi; altrimenti passa al precedente. Successivo va all’inizio del brano seguente. Leader, gap e sovrapposizioni sono inclusi nella timeline.
- Salvataggi concorrenti esclusi tramite lock OS; impronta della versione letta per evitare sovrascritture di modifiche esterne. Coda autosave seriale, recupero dal backup e cartella portabile costruita in staging.
- Sei font incorporati: Barlow, Barlow Bold, Barlow Condensed, IBM Plex Mono, Bebas Neue e Courier Prime. Due stili aggiunti, Radio poster e Home recorded; i sette precedenti restano disponibili. I caratteri sono misurati nel frontend e nel renderer nativo usando gli stessi file.
- Preferenza lingua in Impostazioni, conservata localmente, e cataloghi offline condivisi con i dialoghi nativi. La traduzione non modifica titoli, artisti o note dell’utente. Preparazione iniziale assistita da traduzione automatica dei soli testi statici, con revisione del lessico audio e dei controlli principali; nessuna chiamata di traduzione durante l’uso dell’app.

## Verifiche eseguite

- 71 test frontend e 54 test del motore superati; TypeScript e Clippy tutti i target senza warning.
- Cataloghi EN/ES/FR completi rispetto alle 961 chiavi statiche censite, interpolazioni conservate; italiano come testo sorgente. Revisione manuale dei termini audio e delle etichette principali.
- Cambio lingua IT/EN/ES/FR esercitato nell’app browser completa: titolo dell’utente conservato. Focus ciclico nei dialoghi, Escape, ritorno al comando di apertura e salto al contenuto verificati realmente.
- Slider nativo: Home/End/frecce, mantenimento del focus dopo la ricerca e blocco in REC verificati su fixture senza audio; invio dell’offset e protezione durante REC coperti anche dai test del controller.
- Nove stili esportati in PDF/SVG; 54 combinazioni stile/font generate e controllate geometricamente. I due nuovi stili sono stati rasterizzati e controllati visivamente. Accenti italiani, francesi e spagnoli verificati per tutti i font. Anteprima e superficie di stampa condividono il font scelto.
- Test del salvataggio: backup, conflitto esterno, lock, recupero da file primario corrotto e assenza di file pending residui.

Limiti della verifica: nessun foglio inviato a una stampante e nessuna attestazione della scala fisica; resta il controllo del righello al 100%. Nessuna nuova prova hardware di due ore o verifica nativa Windows/Linux in questo intervento. Il limite di 15 brani per questa J-card resta esplicito.

Ultima verifica responsive: copertine e controlli dell’app completa a 900 px senza overflow orizzontale; slider con hit area effettiva da 24 px. Build frontend suddivisa in applicazione e cataloghi delle lingue, senza avviso per chunk oltre 500 kB.

Controllo desktop macOS: avvio della build aggiornata, recupero del progetto e del profilo attivo confermati; selezione English dal menu nativo verificata e preferenza ripristinata su Italiano. Nessun file audio dell’utente modificato e nessuna registrazione fisica avviata.

Build finale riaperta: nove stili visibili nella finestra macOS; Radio poster e Bebas Neue verificati visivamente nella preview nativa. Modifica di prova annullata, palette e stile originali ripristinati; sessione e profilo mantenuti.
