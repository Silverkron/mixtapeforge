# Fonti e metodo

Ricerca svolta il **24 ottobre 2026**, fuso Europe/Rome. Le fonti descrivono ciò che era reperibile in questa sessione, non una certificazione del comportamento dei binari.

## Metodo e limiti

Consultati sito, manuale indicizzato, store, documentazione ufficiale delle tecnologie e una discussione pubblica fra utilizzatori. Non acquistato né eseguito MixtapeNerd; non testati gli altri programmi. Le pagine anaxwaves hanno restituito timeout/502; il browser ha segnalato `ERR_CERT_AUTHORITY_INVALID`. Per queste pagine si è usato il contenuto recuperato dal motore di ricerca. Nessun avviso del browser è stato aggirato.

Anche il sito live TapeBytes non era leggibile dal servizio web: il riferimento è il codice locale e l'immagine `docs/assets/studio.jpg`. La ricerca dei bisogni è qualitativa e limitata: singole testimonianze non dimostrano diffusione o consenso. “Non documentato” non significa “assente”. “Richiesto” non significa “mai implementato”: servono verifiche sulle versioni successive.

## MixtapeNerd e feedback

| ID | Fonte | Uso |
| --- | --- | --- |
| S01 | [Sito ufficiale](https://anaxwaves.com/MixtapeNerd/) e [About](https://www.anaxwaves.com/MixtapeNerd/Docs/About.html) | Inventario e limiti dichiarati |
| S02 | [Indice manuale](https://www.anaxwaves.com/MixtapeNerd/Docs/) | Copertura dei flussi e gestione progetto |
| S03 | [Normalization](https://www.anaxwaves.com/MixtapeNerd/Docs/Normalization.html) | Quattro normalizzazioni e compromessi |
| S04 | [Minimum Calibration](https://www.anaxwaves.com/MixtapeNerd/Docs/LevelCalibration_min.html) | Peak Index; assenza di loop automatico nella procedura descritta |
| S05 | [Basic Calibration](https://www.anaxwaves.com/MixtapeNerd/Docs/LevelCalibration_basic.html) | Allineamento dei meter |
| S06 | [Advanced Calibration](https://www.anaxwaves.com/MixtapeNerd/Docs/LevelCalibration_adv.html) | Riferimento, MOL, SNR e wizard |
| S07 | [Determine Headroom](https://www.anaxwaves.com/MixtapeNerd/Docs/DetermineHeadroom.html) | Stima e misura del margine analogico |
| S08 | [Audio Device Settings](https://www.anaxwaves.com/MixtapeNerd/Docs/AudioDevice.html) | Backend, esclusività e invalidazione calibrazione |
| S09 | [CalAssistant](https://www.anaxwaves.com/MixtapeNerd/Docs/CalAssistant.html) | Bias, sensibilità, risposta e HD3 |
| S10 | [PDRS](https://www.anaxwaves.com/MixtapeNerd/Docs/PDRS.html) | Predistorsione sperimentale, ordine rispetto a NR, esclusione dall'export |
| S11 | [App Store UK](https://apps.apple.com/gb/app/mixtapenerd/id6467670459?mt=12) | Recensioni e cronologia; espansore nelle note recenti |
| S12 | [Discussione r/cassetteculture](https://www.reddit.com/r/cassetteculture/comments/1kx6c3q/) | Testimonianza Windows: tasti, ASIO, difficoltà WASAPI esclusivo |

Lo store mostrava la versione 4.1.2 e note del 16 settembre senza anno esplicito nel frammento letto. Non si assume che il binario Windows abbia la stessa versione. I commenti del 2025 vanno letti come testimonianze storiche.

## Alternative

| ID | Fonte primaria | Uso |
| --- | --- | --- |
| S13 | [Deck](https://denispopkov.github.io/Deck/) | App dedicata, tre OS dichiarati, workflow e preparazione master |
| S14 | [Audacity — Normalize](https://manual.audacityteam.org/man/normalize.html) e [registrazione/edit/export](https://manual.audacityteam.org/man/basic_recording_editing_and_exporting.html) | Montaggio e gestione livelli generalisti |
| S15 | [REAPER](https://www.reaper.fm/) | Routing, editing non distruttivo, rendering e personalizzazione |
| S16 | [J-Card Template](https://unixispower.gitlab.io/jcard-template/) | Template stampabile e personalizzazione |
| S17 | [Mixtape Cover Maker](https://farisfarooq.com/mixtape) | Lati, capacità e stampa a dimensione fisica |
| S18 | [Daigo Mixtape — manuale](https://www.daigosoft.com/mixtape-manual.html) | Cassette virtuali; fonte indicizzata, apertura diretta non riuscita |
| S19 | [Type Four — Google Play](https://play.google.com/store/apps/details?id=com.tinharbour.typefour) | Cassette virtuali, libreria locale, personalizzazione e riproduzione |

## Tecnologie

| ID | Fonte primaria | Uso |
| --- | --- | --- |
| T01 | [Tauri — process model](https://v2.tauri.app/concept/process-model/) | Shell desktop e WebView |
| T02 | [Tauri — capabilities](https://v2.tauri.app/security/capabilities/) | Permessi del bridge |
| T03 | [Tauri — external binaries](https://v2.tauri.app/develop/sidecar/) | Eventuali convertitori esterni |
| T04 | [CPAL](https://github.com/RustAudio/cpal) | I/O nativo Rust e backend per OS |
| T05 | [JUCE AudioIODeviceType](https://docs.juce.com/master/classjuce_1_1AudioIODeviceType.html) e [AudioDeviceManager](https://docs.juce.com/master/classjuce_1_1AudioDeviceManager.html) | Alternativa per device e streaming |
| T06 | [Symphonia](https://github.com/pdeljanov/Symphonia) | Decoder e demuxer Rust |
| T07 | [FFmpeg — license](https://ffmpeg.org/legal.html) | Condizioni dipendenti dalla build scelta |
| T08 | [ITU-R BS.1770-5](https://www.itu.int/rec/R-REC-BS.1770-5-202311-I/) | Riferimento per loudness e true peak |

Le pagine GitHub possono descrivere rami di sviluppo. Nessuna dipendenza è già selezionata a livello di versione: prima del bootstrap servono release fissate, licenze e feature effettivamente disponibili in quelle release.

## Riferimenti locali TapeBytes

- [style.css](../../tape-vault/src/assets/style.css): palette light/dark all'inizio; scala tipografica e spaziature nel blocco “Shared visual system”; override Studio successivi.
- [app.js](../../tape-vault/src/assets/app.js): `ensureAudio`, `drawSpectrum`, `drawWave`, `loopVisuals`, `drawInputChannel`.
- [studio.jpg](../../tape-vault/docs/assets/studio.jpg): riferimento visivo esaminato.
- [architecture.md](../../tape-vault/docs/architecture.md): il prodotto originale archivia dati via audio; questo progetto tratta musica.

I collegamenti sono relativi a questo documento e puntano al repository fratello `/Users/lucasciacca/Development/Personal/tape-vault`. Nella fase di analisi non sono stati modificati o copiati asset. Durante l’implementazione sono stati copiati il font Silkscreen e il relativo file OFL; illustrazione della cassetta e icona dell’app sono SVG originali del prototipo.
