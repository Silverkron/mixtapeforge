# Qualità, verifiche e distribuzione

Questa è la strategia per il prodotto completo. Le prove effettivamente eseguite sul prototipo sono elencate in [14 — Stato del prototipo](14-stato-prototipo.md); i gate multipiattaforma e analogici rimangono da eseguire.

## Criteri di qualità

1. Il progetto ricaricato descrive la stessa musica e le stesse decisioni.
2. Il renderer rispetta durate e processori dichiarati.
3. La sessione non nasconde interruzioni, fallback o cambi di catena.
4. I valori degli strumenti hanno significato, unità e provenienza.
5. Un utente può completare il flusso base con tastiera e messaggi comprensibili.

## Test per livello

| Livello | Prove ad alto valore | Evitare |
| --- | --- | --- |
| Dominio | Capienza, trim, transizioni, vincoli fit, undo, revisioni e invarianti | Test che copiano il calcolo senza casi indipendenti |
| DSP | Sinusoidi, impulsi, silenzio, rumore deterministico, burst, sweep e vettori di riferimento | Un solo brano ascoltato come prova di precisione |
| Media | Codec, VBR, delay/padding, tag, multicanale, file troncati e durate | Fidarsi dell'estensione come identificazione |
| Persistenza | Crash durante write, migrazione, media mancanti/modificati, disco pieno e seconda istanza | Sovrascrivere le fixture originali |
| UI | Riordino tastiera, focus, errori, localizzazione e contrasto | Snapshot enormi che bloccano ogni modifica grafica |
| Integrazione | Import → piano → render → export → riapertura/report | Mock del DSP come unica prova del master |
| Pacchetto desktop | Permessi reali, device, finestre, sleep e media key | Confondere test in browser con test del binario |

Property test sulla timeline: `durata >= 0`, trasformazioni reversibili, nessun fit dichiarato valido oltre capacità, lock preservati. Fixture golden del renderer con tolleranze motivate, soprattutto quando cambiano resampler o algoritmi.

## Matrice piattaforme proposta

| OS/architettura | Base obbligatoria | Hardware e casi |
| --- | --- | --- |
| Windows 11 x64 | Pacchetto installabile, WASAPI shared | DAC USB, built-in, exclusive supportato/non supportato, unplug e media key |
| macOS Apple Silicon | App firmabile, CoreAudio e ingresso autorizzato | DAC USB, permessi negati, device occupato e sleep |
| Linux x64, Ubuntu LTS supportata | Pacchetto installabile e percorso audio selezionato | Ambiente PipeWire/ALSA secondo adapter, device occupato e dipendenze WebKitGTK |

macOS Intel, Windows ARM e altre distribuzioni sono candidati separati: non inclusi finché non provati. La versione minima effettiva di ciascun OS deriva dalle release scelte delle dipendenze e va fissata in R0. “Windows/Linux/macOS” non significa ogni versione e architettura esistente.

Minimo hardware per la certificazione iniziale: una scheda integrata, un DAC USB e un'interfaccia stereo full duplex; un deck a due testine e uno a tre testine per le funzioni pertinenti. Queste risorse non sono state rilevate nella sessione: vanno predisposte per le prove.

## Budget prestazionali da validare

- Sessione continua: almeno due ore senza underrun rilevati per combinazione dichiarata supportata; prova con UI attiva e minimizzata.
- Callback: tempo al percentile alto con margine rispetto al periodo del buffer, target iniziale p99 <25% del periodo e nessuna scadenza mancata nella prova.
- UI: risposta ordinaria ai comandi entro 100 ms dove possibile; Stop ricevuto dal motore entro il budget fissato per buffer/driver, senza confonderlo con arresto fisico del nastro.
- Memoria: coda e cache RAM limitate; dopo warm-up nessuna crescita continua nel test di durata.
- Progetti con almeno 500 clip per misurare liste e analisi, senza imporre 500 brani come scenario tipico di una cassetta.

Sono target ingegneristici iniziali. Misurare su macchina e buffer documentati; non trasformare valori arbitrari in claim promozionali.

## Prove analogiche

Salvare per ogni run: versione app/algoritmi, OS, backend/driver, DAC/ADC, sample rate/buffer, cablaggio, deck, tipo e stato del nastro, livelli fisici dichiarati, NR hardware, data e procedura.

Prima misurare il loop dell'interfaccia per capire il limite dello strumento. Per MOL/HD3 riportare frequenza, livello e soglia; per SNR banda, pesatura e riferimento. Distinguere HD3, THD e THD+N. Validare off-tape con ritardo variabile e clock separati; in caso di incertezza il confronto non deve produrre un giudizio definitivo.

NR: provare encoding software → decoder hardware e condizioni diverse di livello/EQ; il solo encoding/decoding con lo stesso codice può nascondere errori simmetrici. Predistorsione: confrontare on/off a livello controllato, misure e ascolto su musica; non basta migliorare una sinusoide.

## CI e gestione del codice

Su ogni cambiamento rilevante: formatter/linter TypeScript e Rust, controlli tipi, test di dominio/DSP toccati e build dei target interessati. Prima del rilascio: suite completa, packaging sui tre OS e smoke test su installazione pulita. Hardware come gate di rilascio o nightly dedicata quando disponibile, distinto dai runner virtuali.

Revisioni piccole con scopo e prova; nessuna dependency globale aggiunta per una funzione locale. Fixture audio solo sintetiche o distribuibili con provenienza. Tenere distinta la raccolta musicale personale dal corpus del repository.

## Distribuzione

Pacchetti candidati: installer Windows; bundle/DMG macOS; AppImage e/o deb Linux secondo risultato degli spike. Verificare inclusione sidecar, font, licenze e dipendenze WebView su macchina pulita. Firma/notarizzazione e disponibilità dei certificati sono attività di release, non già configurate.

Aggiornamenti espliciti e verificati; nessun riavvio o installazione durante una sessione. Migrazioni con backup e note di compatibilità. Inventario dipendenze/SBOM e avvisi terze parti prima di distribuire; FFmpeg e JUCE richiedono valutazione della configurazione effettivamente distribuita.

## Diagnostica e privacy

Log locali, rotazione e dimensione limitata; percorsi/titoli rimossi dall'export diagnostico salvo scelta dell'utente. Nessun upload automatico di audio o telemetria. Report con contatori e configurazione effettiva, non messaggi “successo” basati solo sulla fine del timer.

## Definizione di completamento

Una funzione è pronta quando: accettazione F soddisfatta, errori e annullamento gestiti, dati migrabili se cambia il formato, UI accessibile, prove appropriate eseguite e limiti documentati. Per funzioni audio/hardware servono risultati sull'hardware richiesto. Una schermata funzionante con dati demo non è una funzione audio completata.

## Verifica eseguita sulla progettazione — 24 ottobre 2026

- 13 file Markdown presenti; collegamenti locali risolti, inclusi i riferimenti al repository TapeBytes.
- Identificatori F-01…F-40 e MN-01…MN-18 presenti e univoci nei rispettivi inventari; copertura esplicita nel backlog.
- Contrasto calcolato con luminanza relativa sRGB per 12 coppie principali testo/sfondo del design system: tutte almeno 4,5:1. Testo secondario su pannello: dark 8,81:1 e light 6,23:1; pulsante principale: dark 9,27:1 e light 7,06:1; segnale sul display: 11,76:1.
- Non ancora verificati: layout renderizzato, combinazioni di tutti gli stati, lettori schermo, compilazione dell'app, algoritmi DSP, device o registrazioni analogiche. Queste prove appartengono alle milestone indicate.
