# Progetti, profili e persistenza

Stato: modello concettuale. Il formato serializzato definitivo sarà versionato e provato prima della prima release.

## Entità e responsabilità

| Entità | Campi principali | Invarianti |
| --- | --- | --- |
| Project | ID, schemaVersion, revision, titolo, date, frequenza progetto, lati, impostazioni, artwork | Due lati espliciti; riferimenti risolvibili o marcati mancanti |
| MediaAsset | ID, URI locale, hash, byte size, codec, sample rate sorgente, frame, canali, tag | Nessuna riscrittura dei file durante editing |
| Clip | ID istanza, asset ID, trim sorgente, gain, fade, gruppo/lock | Trim validi entro il file; duplicati possono avere impostazioni diverse |
| Side | ID A/B, durata effettiva, margine, leader/trailer, clip ordinate, transizioni | Nessuna durata negativa; overflow rappresentato, non nascosto |
| Transition | Coppia clip, gap oppure overlap, curva e durata | Non oltrepassa le clip adiacenti; nessun doppio gap |
| ProcessingPlan | Hash, revisione progetto, algoritmo/versioni, ordine nodi, parametri, output frame | Immutabile per render e sessione |
| AnalysisResult | Asset hash, configurazione/versione algoritmo, metriche e waveform multirisoluzione | Obsoleto se cambia un input rilevante |
| CalibrationProfile | Deck/nastro, firma percorso, metodo, misura, condizioni, data e stato | Un profilo importato non è verificato sulla nuova catena |
| RecordingSession | Piano, profilo snapshot, device effettivi, eventi, campioni inviati, esito | Log append-only della sessione; non modifica il progetto originario |
| Artwork | Testi, immagini riferite, template/versione, quote in mm | Tracklist derivata dai lati, override manuali espliciti |

I tag del file sono metadati del media; titolo/artista modificati nel progetto sono override. Un cambiamento della libreria esterna non riscrive il progetto in silenzio.

## Formato di lavoro proposto

```text
My Mixtape.cassette/
  project.json             manifest leggibile e versionato
  assets/                  copertine e altri asset incorporati
  media/                   solo se l'utente raccoglie i file audio
  sessions/                report e snapshot delle registrazioni
```

I PCM preparati, le waveform e l'indice stanno nella cache locale dell'app, rigenerabile e con quota. Le acquisizioni analogiche dell'utente non sono cache eliminabile automaticamente: diventano media espliciti o rimangono temporanei con recupero dichiarato.

Trasferimento tramite archivio `.cassettepack` opzionale con manifest, hash e media raccolti; estrazione in directory nuova con verifica dei percorsi. Non inventare compatibilità col formato progetto MixtapeNerd.

## Salvataggio e recupero

1. Validare l'intero manifest prima della scrittura.
2. Scrivere un file temporaneo nello stesso filesystem, flush e sostituzione atomica dove supportata; conservare ultima versione buona.
3. Autosave debounced dopo modifiche, con massimo intervallo proposto di 5 secondi; durante una modifica continua salvare periodicamente. Non scrivere dalla callback audio.
4. All'avvio proporre recupero se autosave è più recente; non sovrascrivere l'ultima versione buona prima di aver validato quella recuperata.
5. Lock di progetto o sola lettura per seconda istanza: niente last-write-wins silenzioso.

Frequenze e intervalli sono impostazioni iniziali da verificare, non garanzie di durabilità già ottenute.

## Media mancanti e portabilità

Memorizzare preferibilmente percorsi relativi entro il progetto; per file esterni conservare riferimento e indizi per il relink. Il relink usa hash e dati del file, non soltanto nome/durata. Su sistemi con grant/bookmark serve una nuova autorizzazione quando il riferimento non è più valido.

Al caricamento mostrare `disponibile`, `mancante`, `modificato`, `non supportato`. Nessun render completo o avvio sessione se manca una clip del lato richiesto. Se il file è cambiato, chiedere sostituzione e rianalizzare; non usare una waveform vecchia come prova del nuovo contenuto.

## Migrazioni

Ogni migrazione è una funzione `vN → vN+1` con fixture. Backup prima della trasformazione. Versione futura sconosciuta: apertura in sola lettura quando possibile, senza salvataggio distruttivo. Il downgrade non è garantito; l'export del master resta indipendente dal formato progetto.

Cache key composta da hash audio, decoder/versione, parametri analisi, frequenza di elaborazione e versione DSP. Il nome del file non basta. Nessun database di indice deve essere necessario per recuperare un progetto valido.

## Undo, job e revisioni

Undo/redo riguarda editing, ordine, transizioni e impostazioni. Import e fit sono transazioni annullabili come operazione unica. Non include cancellare un file esterno o annullare la registrazione fisica già avvenuta.

Un job contiene ID, revisione input, stato, progresso, errori per elemento e richiesta di annullamento. Il risultato è pubblicato soltanto se compatibile con lo snapshot; altrimenti resta una cache riutilizzabile o viene scartato. Un nuovo click non crea due job identici inconsapevolmente.
