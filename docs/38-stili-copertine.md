# Copertine: stili, palette e stampa

## Percorso

In Copertina si sceglie uno stile, poi una palette suggerita o colori personali. L’anteprima resta a sinistra; i controlli, raccolti in un solo pannello a destra, non aprono nuove schermate. Rimane lo scroll unico del workspace. Titolo, dedica e scaletta appartengono al progetto; cambiare stile non li sostituisce.

| Stile | Famiglia | Carattere | Palette consigliate |
| --- | --- | --- | --- |
| Studio classico | Classico | Fascia colore e scaletta pulita | Lavanda e ciano, Blu archivio, Verde salvia |
| Garage | Rock | Blocchi e tagli diagonali | Rosso palco, Giallo amplificatore, Ruggine |
| Backstage | Rock | Fondo da concerto e dettagli da pass | Nero e arancio, Nero e rosso, Nero e ghiaccio |
| Color club | Pop | Campiture luminose e forme circolari | Bubblegum, Disco lime, Arancio e cielo |
| Night drive | Synthwave | Sole a righe, griglia, fondo notte | Neon rosa e ciano, Tramonto arcade, Violet voltage |
| Archivio B/N | Bianco e nero | Fondo bianco, testo e filetti sottili | Laser essenziale, Grigio chiaro |
| Fanzine B/N | Bianco e nero | Titolo a contrasto e tratteggi | Fotocopia, Grafite |

## Colori e leggibilità

Quattro ruoli personalizzabili per ogni stile: Fondo, Testo, Accento 1, Accento 2. La selezione della palette si aggiorna a «Colori personalizzati» quando una tinta viene modificata. Il testo sulle fasce d’accento sceglie automaticamente nero o bianco secondo il contrasto. Un avviso segnala testo/fondo sotto un rapporto 4,5:1, senza sostituire la scelta dell’utente.

«Stampa in scala di grigi» converte tutti i ruoli della copertina, anche i colori custom, in grigi reali nei file SVG e PDF. È attiva inizialmente nei due stili B/N ma può essere cambiata su ogni stile. Archivio B/N è la scelta a minor copertura d’inchiostro; Fanzine usa una fascia nera. Gli stili scuri richiedono una copertura maggiore.

## Modello e rendering

`Project.artwork` è opzionale/null nei vecchi progetti: `{style,paper,ink,accent,secondary,monochrome}`. Lo schema resta 1; i documenti precedenti usano Studio classico e conservano `color` come accento. Le nuove modifiche mantengono anche `color` allineato all’accento. I campi artwork vengono salvati, recuperati e inclusi nella raccolta portabile; le modifiche usano undo/redo esistenti.

Il catalogo condiviso `src/artwork/catalog.json` contiene stili, decorazioni vettoriali e palette. L’anteprima React produce le stesse primitive della scena nativa Rust; SVG e PDF vengono generati dalla medesima scena nativa. Test di parità confrontano la scena dell’anteprima con le sette scene native di riferimento. Nessun asset raster o servizio esterno; nessuna nuova dipendenza.

## Esportazione e limiti

«Stampa J-card» apre direttamente le opzioni di stampa del sistema tramite il bridge Tauri (`WebviewWindow::print` su macOS, `window.print()` sugli altri sistemi e nella preview browser). Il foglio usa la scena SVG corrente, conserva Unicode e colori personalizzati e si aggiorna insieme all’anteprima. La superficie di stampa è separata dal workspace tramite portal: le regole `@media print` nascondono il resto dell’app, eliminano scroll e vincoli di altezza e fissano la J-card a 104,8 × 101,6 mm. A4 verticale, margini CSS di 20 mm e righello da 50 mm; nella finestra di stampa scegliere A4 e scala 100%, senza intestazioni e piè di pagina. Le impostazioni del driver possono prevalere su formato e margini CSS. Nessun lavoro viene inviato automaticamente alla stampante. Il pulsante rispetta il blocco durante le operazioni audio e il limite di 15 brani. Restano disponibili le esportazioni PDF, SVG e tracklist.

Dimensioni della J-card invariate: 104,8 × 101,6 mm, con dorso da 12,7 mm, guide di piega e riferimento di 50 mm. PDF su A4; SVG modificabile con dimensioni fisiche. Font della copertina inclusi nell’app: Barlow, Barlow Condensed e IBM Plex Mono. Gli SVG includono i font e conservano il testo modificabile. Nel PDF il testo della copertina è convertito in tracciati vettoriali: aspetto e accenti supportati sono preservati, ma il testo non è selezionabile. I caratteri assenti dal font sono sostituiti da un punto interrogativo nel PDF; per alfabeti non coperti va controllata la prova di stampa. Le superfici di stampa utilizzano colori RGB; non è un flusso tipografico CMYK.

Il limite già esistente di 15 brani resta esplicito. I titoli lunghi vengono adattati a due righe; la scaletta e gli altri testi sono abbreviati secondo una stima conservativa della larghezza. Non si aggiungono pannelli automaticamente e non si promette una prova fisica di stampante.

## Accettazione e prove

- Selezione dei sette stili, 19 palette, colori custom e grigi esercitati nei test del componente reale.
- Parità fra scene frontend e native verificata per tutti gli stili.
- Compatibilità dei progetti precedenti, roundtrip delle palette, valori colore non validi, grigi reali e 15 brani con titoli molto lunghi verificati nel core.
- Sette PDF A4 generati, rasterizzati con Poppler e controllati in una tavola di confronto; nessun testo tagliato o elemento sovrapposto rilevato nelle fixture.
- UI controllata a 1440×940 e 900×640: anteprima delle stesse dimensioni al cambio stile, un solo stile selezionato, nessun overflow orizzontale. I file in `test-results/artwork` usano metadati sintetici, senza copiare sorgenti o percorsi musicali dell’utente.

Build macOS aggiornata e riaperta, 34 test frontend e 26 Rust superati; Clippy senza warning e formattazione verificata. Nella finestra nativa del progetto «Appetite for Destruction» sono presenti i sette selettori, le palette, i quattro colori e la scala di grigi. Durante il controllo l’utente ha selezionato Fanzine B/N con palette Grafite: la scelta è stata lasciata intatta. Il controllo nativo è stato effettuato tramite albero di accessibilità; l’ultima cattura dello screenshot nativo è andata in timeout. La verifica visiva dei layout e delle stampe descritta sopra è stata completata nel browser e sui PDF rasterizzati.

Rigenerare le fixture native dopo modifiche intenzionali al catalogo o al layout con `cargo run --manifest-path src-tauri/Cargo.toml --bin verify_artwork`. Il confronto dei test usa `src/artwork/scene-reference.json`; aggiornare questo riferimento solo dopo aver esaminato SVG/PDF e le differenze attese.

### Verifica stampa diretta

35 test frontend superati e build desktop macOS completata. In modalità stampa il browser mostra unicamente il portal della copertina; SVG misurato a 396,09 × 384 pixel CSS, equivalenti a 104,8 × 101,6 mm. UI controllata a 900 × 640 senza overflow orizzontale. Nell’app macOS aggiornata, clic su Stampa J-card: pannello nativo aperto, stampante selezionabile, anteprima di una sola pagina con J-card e righello, nessuna parte del player o dei controlli. Prova annullata con Cancel, ritorno corretto alla copertina e progetto preservato. Nessun foglio fisico stampato; Windows e Linux non esercitati localmente. Il solo `window.print()` non apriva il dialogo nella WKWebView nativa: su macOS è necessario il comando Tauri dedicato.

### Leggibilità dei testi

Titoli dei brani da 2,1 a 2,9 mm (circa 8,2 pt, +38%); descrizione da 2,1 a 3 mm (circa 8,5 pt, +43%). Etichette dei lati da 2,6 a 3 mm. Interlinea della scaletta da 3,2 a 3,7 mm, inizio anticipato a 31 mm e separazione fra lati da 3,5 a 2 mm: resta spazio per 15 brani anche con un lato vuoto. Le dimensioni fisiche della J-card non cambiano. Testi lunghi abbreviati alla nuova dimensione, senza ridurre il carattere. Aggiornati sia la scena React (anteprima e stampa diretta) sia il renderer Rust (PDF e SVG). Le sette prove PDF sono state rigenerate, rasterizzate e controllate visivamente; test di parità delle scene aggiornati dopo il controllo.

37 test frontend e 26 Rust superati; build e formattazione verificate. App macOS aggiornata e riaperta, progetto recuperato. Screenshot nativo della copertina Backstage dell’utente controllato: descrizione e dodici titoli leggibili, senza sovrapposizioni. Lo stile selezionato dall’utente durante la verifica è stato mantenuto.

### Famiglie tipografiche

- **Barlow Medium** per brani e descrizione: forme aperte e peso sufficiente per caratteri piccoli.
- **Barlow Bold** per titoli classico/pop/fanzine, etichette A/B e dorso.
- **Barlow Condensed Bold** per i titoli rock e synthwave: carattere più deciso, con più spazio per i titoli lunghi.
- **IBM Plex Mono Medium** per diciture tecniche e titolo Archivio B/N.

File TrueType originali distribuiti con licenza SIL OFL 1.1, caricati localmente senza installazione nel sistema. Provenienza e SHA-256 in `src/artwork/font-sources.json`; testi di licenza nelle cartelle dei font, nelle risorse del pacchetto e nei metadati degli SVG che incorporano i font. Nessun font remoto durante l’uso.

`artwork_fonts.rs` legge le metriche e i contorni con ttf-parser. Il frontend usa gli stessi avanzamenti dei glifi in `font-metrics.json`, generati con `cargo run --manifest-path src-tauri/Cargo.toml --bin verify_artwork -- --font-metrics` dalla radice del repository (impostare CMAKE solo dove necessario). Un test confronta le metriche con i font inclusi. Kerning e legature disattivati nel layout SVG per rispettare gli avanzamenti e mantenere parità con i contorni PDF. Il pulsante Stampa attende il caricamento dei font prima di aprire il pannello nativo.

Con i nuovi font: sette PDF rigenerati e rasterizzati, tutti controllati nella tavola di confronto; SVG Garage aperto separatamente con quattro font incorporati caricati, senza ricorrere ai font installati; controllo browser delle famiglie effettive e delle larghezze del testo. Parità delle sette scene, limite di 15 brani, titoli lunghi, accenti italiani e allineamento delle metriche coperti da 37 test frontend e 28 Rust superati.

Build macOS aggiornata e riaperta a player fermo. Progetto recuperato e copertina nativa Studio classico controllata tramite screenshot: i nuovi font sono caricati, dodici brani e descrizione restano leggibili senza sovrapposizioni. Scelte dell’utente mantenute. Clippy su tutti i target senza warning, formattazione frontend/Rust verificata.
