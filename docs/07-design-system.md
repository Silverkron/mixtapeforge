> Copertine: [sette stili, palette personalizzabili e stampa B/N](38-stili-copertine.md).

> Scorrimento corrente: [player e scaletta nella stessa pagina](31-scroll-unico.md).

> Avviso di ripristino: [comportamento e layout correnti](30-ripristino-sessione.md).

> Scroll e cornici: [correzione macOS](29-cornici-e-scroll-macos.md).

> Layout corrente a [tutta larghezza](28-workspace-a-tutta-larghezza.md), con la skin del player modulare.

> Skin corrente: [Player modulare](27-skin-player-modulare.md).

> Layout corrente: [Player classico](23-player-classico.md). Palette originale conservata.

# Design system — Cassette Maker

> Palette blu/lavanda/ciano ripristinata su richiesta dell’utente dopo la prova [20 — Cassette futurism](20-cassette-futurism.md). Restano la geometria squadrata e i display incassati di quella revisione. I token effettivi sono definiti in `src/style.css`.

> Revisione implementata: [16 — Interfaccia compatta](16-interfaccia-compatta.md) sostituisce la navigazione iniziale a sei schermate con Mixtape e Copertina, più pannelli contestuali. Le specifiche sotto restano riferimento storico dove divergono.

Stato: riferimento di progettazione; il prototipo eseguibile e le sue verifiche sono descritti nel documento 14. Il riferimento è TapeBytes; la personalità proposta è quella di uno studio audio compatto: scuro, leggibile, con strumenti luminosi e pochi accenti.

## Cosa riprendere da TapeBytes

Riferimenti esaminati: `src/assets/style.css`, funzioni di disegno in `src/assets/app.js` e screenshot `docs/assets/studio.jpg` del repository `/Users/lucasciacca/Development/Personal/tape-vault`.

- Fondo blu notte, pannelli blu/viola e accento lavanda.
- Ciano per il segnale, rosa per il clipping, display su fondo scuro.
- Silkscreen per marca e richiami alla cassetta; caratteri normali per leggere e modificare.
- Pannelli ordinati, bordi sottili, controlli da strumento e waveform visibili.

Nel riferimento `drawSpectrum` disegna barre FFT; il canvas con ID `vu` non dimostra un misuratore VU con risposta normalizzata. Il nuovo prodotto conserva il linguaggio grafico ma separa chiaramente VU, peak e spettro. Il codec dati FSK di TapeBytes non viene trasferito nel mastering musicale.

## Token colore

Colori ereditati dalla palette locale salvo warning, focus e alcuni ruoli nuovi. I nomi indicano significato, non posizione sullo schermo.

| Token | Dark | Light | Uso |
| --- | --- | --- | --- |
| `surface.app` | `#101322` | `#F4F2F8` | Fondo finestra |
| `surface.panel` | `#1A1F33` | `#FFFFFF` | Pannelli |
| `surface.raised` | `#252C45` | `#EAE7F2` | Controlli, hover secondario |
| `surface.field` | `#14192B` | `#F8F6FC` | Input e liste |
| `surface.instrument` | `#0C1020` | `#0C1020` | Strumenti sempre scuri |
| `border.default` | `#414A69` | `#C7C3D6` | Separazioni decorative |
| `text.primary` | `#F3F2FA` | `#20243A` | Testo normale |
| `text.secondary` | `#B8BED3` | `#596078` | Aiuto e metadati |
| `accent.primary` | `#C4ADFF` | `#6741B2` | Azione principale e selezione |
| `accent.onPrimary` | `#171329` | `#FFFFFF` | Testo sul pulsante principale |
| `signal.primary` | `#67DDE6` | `#087580` | Segnale/misura riuscita su pannelli |
| `signal.instrument` | `#67DDE6` | `#67DDE6` | Waveform e meter sul display |
| `state.warning` | `#F4C46A` | `#875600` | Margine basso, verifica richiesta |
| `state.error` | `#FF8296` | `#B62D49` | Errore e clip |
| `focus.ring` | `#C4ADFF` | `#6741B2` | Focus su superfici normali |
| `instrument.text` | `#F3F2FA` | `#F3F2FA` | Numeri/assi sugli strumenti |

L'accensione del rosso indica un evento reale, non la semplice riproduzione. La registrazione fisica è dichiarata dall'utente salvo hardware che la confermi. Un LED “audio in uscita” non deve chiamarsi “REC nastro” senza tale conferma.

I bordi decorativi possono avere contrasto ridotto; i contorni necessari a riconoscere controlli usano un token dedicato con rapporto almeno 3:1 o altro indicatore equivalente. Per il focus sui display usare un anello chiaro, non il viola scuro light.

## Tipografia e geometria

| Elemento | Specifica |
| --- | --- |
| Marca e titolo principale | Silkscreen 22–28 px, font locale con licenza da includere |
| Titoli sezione | System UI 18 px, peso 600, line-height 1,4 |
| Corpo e input | System UI 14–15 px, line-height 1,5–1,6 |
| Metadati secondari | 13 px; evitare testi funzionali sotto 12 px |
| Timer, dB, durate e frequenze | Monospace/tabular numbers, 14–24 px |
| Spaziatura | Scala 4, 8, 12, 16, 24, 32, 48 px |
| Raggi | Campo/pulsante 8 px; pannello 12 px; display 4–6 px |
| Controlli | 40–44 px di altezza; modalità compatta 32–36 con target adeguato |
| Separazioni | Bordo 1 px; shadow molto tenue; niente glow sotto testo denso |

Silkscreen non si usa per righe di brani, messaggi lunghi o tutte le etichette. Il look rétro non deve costare leggibilità.

## Componenti fondamentali

| Componente | Contenuto e stati obbligatori |
| --- | --- |
| AppShell | Titolo progetto, salvataggio, navigazione, device; finestra standard con controlli OS |
| SidePanel | Nome lato, usato/disponibile, margine, lista clip; normale/vuoto/overflow |
| TrackRow | Ordine, titolo/artista, durata effettiva, gain, warning, menu; selezione e focus distinti |
| CapacityBar | Segmenti brani/gap, testo residuo/eccedenza; non solo colore |
| Transport | Play/Pausa/Stop, lato, timer; countdown/preparazione/riproduzione/errore |
| MeterPair | L/R, scala/unità, peak hold e reset clip; stato non calibrato |
| Spectrum | Asse log Hz, livello dB, L/R o somma esplicita; nessun segnale/stale |
| Waveform | Envelope con zoom, selezione e posizione; loading/file mancante |
| ProcessorCard | Enable, parametri, bypass, variazione di livello; incompatibilità |
| DeviceBadge | Device, canali, frequenza reale, modalità ottenuta; assente/occupato/non verificato |
| CalibrationBadge | Metodo/data/catena; stimata/misurata/da riconfermare/incompatibile |
| JobProgress | Fase, progresso, annulla, risultato ed errori per file |
| PreflightIssue | Gravità, causa, conseguenza e azione concreta |
| ConfirmDialog | Solo azioni con perdita concreta; focus iniziale e ritorno al chiamante |

Per tutti: default, hover, focus-visible, pressed, disabled, loading ed errore. Un controllo disabilitato spiega il requisito mancante, soprattutto per funzioni che richiedono ritorno analogico.

## Specifica degli strumenti

- **Meter:** L/R affiancati, unità sempre visibile; scala digitale proposta da −60 a 0 dBFS, clip latch separato. Scala VU relativa soltanto con riferimento dichiarato. Attacco/rilascio provengono dal DSP; l'interpolazione grafica non altera le misure.
- **Spettro:** vista di default 20 Hz–20 kHz entro Nyquist; smoothing e finestra dichiarati nei dettagli. In Studio mostra post-processing; nel laboratorio permette source/return.
- **Waveform:** min/max multirisoluzione per non nascondere picchi; il playhead segue il clock nativo. Se la telemetria si ferma, mostra “dati non aggiornati”.
- **Animazione cassetta:** piccola e secondaria; accompagna il trasporto senza simulare una conferma del movimento fisico. Non occupa lo spazio dei livelli o dei brani.

Ridurre rendering a 20–30 fps e sospenderlo fuori vista. L'opzione riduci movimento conserva numeri e stati, limita l'animazione decorativa e il refresh grafico, senza fermare l'audio.

## Accessibilità e testo

Obiettivo: contrasto almeno 4,5:1 per testo normale e 3:1 per testo grande/indicatori essenziali; verificarlo sulle combinazioni effettive, incluse selezione e disabled. Ogni canvas ha nome, descrizione e valori testuali equivalenti. Non annunciare 30 volte al secondo al lettore schermo: annunciare cambiamenti rilevanti e offrire letture su richiesta.

Riordino brani anche tramite azioni “Sposta sopra/sotto” e “Sposta sul lato B”. Focus persistente dopo riordino e undo. Tooltip non indispensabili per comprendere un'azione. Dialoghi con focus confinato e chiusura prevedibile.

Lessico italiano iniziale: “Prepara lato”, “Avvia uscita”, “Premi REC sul deck”, “Lato da girare”, “Calibrazione da riconfermare”. Distinguere “Esporta master” da “Registra su nastro”. IT/EN tramite chiavi semantiche; unità e numeri localizzati senza cambiare i valori persistiti.

## Layout adattivo

Target principale 1440×900; utilizzabile a 1280×800. Navigazione laterale 176–208 px; inspector 280–320 px richiudibile; area strumenti/transport persistente. A 1024 px inspector in drawer; sotto 900 px lati a schede con confronto capacità sempre accessibile. Supportare zoom UI 200% e scroll senza tagliare Stop o messaggi critici. Il supporto mobile non è un requisito iniziale.

Prima dello sviluppo completo: un prototipo dei componenti in entrambe le palette con brani lunghi, errori, no device, input silenzioso, overflow e localizzazione inglese. Le misure di contrasto dei token non sostituiscono la verifica di questi stati.

## Linguaggio dell’interfaccia

La voce del prodotto segue [15 — Linguaggio e contenuti](15-linguaggio-e-contenuti.md): titoli operativi, istruzioni concrete, lessico degli appassionati senza slogan nostalgici. Il documento raccoglie fonti, limiti della ricerca e regole per i nuovi testi.
