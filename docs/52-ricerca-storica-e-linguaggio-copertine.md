# Copertine: ricerca storica e applicazione

Data: 25 ottobre 2026. Questo documento aggiorna la direzione di docs/51: una cassetta disegnata meglio non basta a rendere riconoscibile una famiglia grafica.

## Metodo e fonti

Sono stati confrontati documenti dei produttori, archivi di oggetti, raccolte museali di grafica musicale e lavori pubblicati dagli autori. La ricerca per immagini è servita a confrontare composizioni; le decisioni qui sotto sono collegate a fonti identificabili. Nessuna immagine, scansione, marchio o illustrazione altrui viene distribuita nell’app. Le forme vettoriali del catalogo sono composizioni originali.

1. [TDK D60, scansione di una J-card](https://commons.wikimedia.org/wiki/File:TDK_D60_J-card.jpg). Esemplare materiale per la struttura da etichetta e indice. La data della fotografia non è una datazione del design; la foto è CC BY-SA 4.0, ma non è inclusa nel prodotto.
2. [Denkyosha / Maxell, presentazione UD-60A, 2025](https://www.denkyosha.co.jp/pdf/NR_20250519_01.pdf). Fonte del licenziatario: descrive esplicitamente le righe verticali ispirate ai pattern magnetici e il richiamo alla serie UD degli anni Settanta/Ottanta. La riedizione non è identica agli originali. Adottiamo il principio delle fasce e della gerarchia tecnica, non l’identità Maxell.
3. [Maxell, cronologia aziendale](https://www2.maxell.co.jp/corporate/history.html). Contesto storico: cassette nel 1966, serie UD nel 1970. Non usata per attribuire a un anno preciso singole grafiche.
4. [Memphis Milano, catalogo 1984](https://memphis.it/wp-content/uploads/2023/04/Catalogue_Memphis-Furniture-Milano_1984.pdf) e [Salone del Mobile, mostra sul movimento](https://www.salonemilano.it/en/articles/memphis-40-years-kitsch-and-elegance). Geometrie contrastanti, colori decisi e pattern. È un riferimento al design dell’epoca: non significa che tutte le copertine pop usassero Memphis.
5. [Smithsonian, DIY Show Posters in D.C.](https://folklife.si.edu/magazine/underground-diy-show-posters-dc). Collage in bianco e nero e fotocopie nella circolazione dei flyer punk/hardcore. Il testo indicizzato è disponibile, l’apertura diretta ha restituito errore; confrontato con le fonti seguenti.
6. [JSTOR / Cornell, oltre 2.000 flyer punk](https://about.jstor.org/blog/2000-punk-rock-flyers/). Collage dissonanti, scrittura manuale, disegno e palette ridotta. La fotocopia è un riferimento, non una tecnica universale per ogni flyer storico.
7. [University of Maryland, Persistent Vision — 1982](https://exhibitions.lib.umd.edu/dc-punk/year/1982). Esempi di impaginazione ad alto contrasto, lettering e materiali della scena D.C.
8. [Museum of Arts and Design, Punk Graphics 1976–1986](https://press.madmuseum.org/exhibition/too-fast-live-too-young-die). Documenta il ruolo di zine, flyer, remix di immagini e testo; supporta una direzione collage anziché semplici diagonali decorative.
9. [Alessandro Strickner, The 80s Dream Vol. 2](https://www.behance.net/gallery/9646071/The-80s-Dream-Vol-2-Album-Artwork). Opera pubblicata dall’autore per NewRetroWave: un riferimento contemporaneo alla synthwave, non una confezione originale anni Ottanta.
10. [NewRetroWave, archivio 2024](https://newretrowave.com/2024/), con selezione delle copertine del 2023. Dimostra la varietà della scena. Strada, orizzonte e reticolo sono una scelta per il template Night drive, non una definizione esaustiva del genere.
11. [NFSA, radio-cassette JVC del 1987](https://www.nfsa.gov.au/collection/item/jvc-portable-radio-and-cassette-recorderplayer) e [Hi-Fi Year Book 1981, p. 217](https://www.worldradiohistory.com/UK/Hi-Fi-Year-Book/Hi-Fi-Year-Book-1981.pdf). Contesto materiale di registrazione dalla radio, ricevitori e altoparlanti. Il template Radio poster reinterpreta scala di sintonia, puntatore e griglia senza riprodurre un modello commerciale.

## Scelte applicate

| Template | Elementi applicati | Motivo |
| --- | --- | --- |
| Studio classico | Fasce verticali, campo A/B, righe, doppio filetto | Gerarchia funzionale delle cassette vergini |
| Garage | Griglia, coni dell’amplificatore, fulmine, bordo irregolare | Iconografia di palco; il fulmine è una scelta illustrativa originale |
| Backstage | Foro, pass/biglietto, perforazione, talloncino | Oggetto riconoscibile legato al concerto; eliminato il finto codice a barre |
| Color club | Cerchio e triangolo con ombra netta, retino puntinato, zig-zag | Interpretazione pop del linguaggio Memphis |
| Night drive | Strada, punto di fuga, monti, tramonto segmentato, stelle | Un piccolo paesaggio con soggetto, non solo un simbolo neon |
| Archivio B/N | Grandi A/B, indici 01/02, righe fini, bianco prevalente | Etichetta di catalogazione; consumo contenuto d’inchiostro |
| Fanzine B/N | Ritagli, bordi strappati, lettere differenti e inclinate, adesivo, retino | Collage DIY; la scaletta resta pulita e leggibile |
| Radio poster | Scala FM, puntatore, altoparlante e manopole | Radio analogica riconoscibile; scala puramente illustrativa |
| Home recorded | Rigatura, margine, A/B dattiloscritti, adesivo | Indice domestico compilabile dopo la stampa |

Queste sono interpretazioni progettuali delle fonti, non repliche storiche certificate. Gli indici A/B e 01/02 indicano i lati e non numeri di catalogo inventati. Nessun falso valore di qualità, misura, certificazione o dato di calibrazione è stampato come ornamento.

## Composizione e stampa

- Catalogo unico per React, SVG e PDF; colori sempre definiti dai quattro ruoli personalizzabili.
- Le miniature mostrano il motivo reale del template, non una simulazione CSS scollegata.
- Conservata l’area di lettura della scaletta: fino a 15 brani, testo da 2,9 mm, decorazioni fuori dal testo.
- Motivo posteriore fra x=80 e 102,8 mm; fascia libera per tipo nastro e dati dei lati.
- Bordi e fasce del frontale differenziati, senza usare texture raster o sfondi sotto i titoli dei brani.
- Nessun cambiamento ai dati dei progetti o alla selezione corrente di font/palette.
- Descrizioni aggiornate in italiano, inglese, spagnolo e francese.

## Verifiche

Esportazione nativa di nove SVG/PDF e 54 combinazioni di font; rasterizzazione e confronto visivo dei nove stili. Fixture native aggiornate e confronto React/Rust; controlli per 15 brani, titoli lunghi, font selezionato e cataloghi lingua. La tavola di confronto è `test-results/artwork-heritage/overview.png`. La prova fisica su stampante resta distinta dalla verifica del PDF.

## Correzione Home recorded e Garage

Dopo il riscontro sui due dettagli ingranditi:
- Home recorded: sostituita la lunga tabella con due etichette A/B uguali, righe libere, ombra sottile e adesivo corto; nessuna colonna stretta inutilizzabile o adesivo sopra le righe di scrittura.
- Garage: testata con cinque manopole, due coni con geometria identica e piccoli fissaggi; fulmine ridotto a distintivo nello spazio fra i coni, senza sovrapposizioni. Eliminato il retino poco visibile.

Catalogo condiviso e fixture aggiornati, 19 test copertine e controllo TypeScript superati. Esportazione nativa verificata; confronto dei due dettagli in `test-results/artwork-two-fixes/details.png`.
