# Cosa manca per una release completa

Valutazione del 24 ottobre 2026 basata sul codice e sulle evidenze locali. Non sono state eseguite nuove prove audio in questa revisione. La baseline concorrente resta quella documentata in 01, senza una nuova ricerca delle release esterne.

> Aggiornamento successivo: la [protezione da sospensione automatica](37-blocco-sospensione.md) è ora implementata e verificata su macOS durante output, pausa, Stop e fine flusso. Restano le prove lunghe e sugli altri sistemi operativi.

## Già presenti

Import e composizione A/B, editing non distruttivo, fit, salvataggio e recupero, normalizzazione, compressore, EQ con preset e bande manuali, master e WAV, ascolto/pausa/Stop/REC, meter e spettro, toni e confronto differito, J-card. Type B tramite libdolbyb e un effetto VST3 stereo sono implementati e provati via software; questo non attesta la compatibilità con un deck reale. Le evidenze successive nei documenti 18, 19, 24 e 30 sostituiscono le corrispondenti voci storiche del documento 14.

## Priorità di completamento

| Priorità | Lavoro | Criterio osservabile |
| --- | --- | --- |
| P0 | Registrazione lunga e gestione guasti | Due ore sulle configurazioni supportate; UI sotto carico, disconnessione/errore device, annullamento e Stop; report degli underrun e prevenzione sospensione durante la registrazione |
| P0 | Windows/Linux e distribuzione | Build e prove native reali, DAC/ADC e plugin nativi; installer verificati. Il workflow CI attuale non dimostra esecuzioni completate e usa `--no-bundle` |
| P0 | Percorso guidato di registrazione | Controllo sorgenti, capienza, uscita e livelli prima di REC; istruzioni chiare per NR hardware/software e passaggio manuale A/B |
| P0 | Type B e misure indipendenti | Allineamento del riferimento su catena reale; registrazione e riproduzione con decoder Dolby B; confronto a più livelli/frequenze. Verifica indipendente di LUFS, true peak, resampling e meter |
| P1 | Comportamento da player | Seek e salto fra brani per l'ascolto, posizione e brano corrente chiari. Definire separatamente il comportamento durante REC per evitare salti involontari sul nastro |
| P1 | Progetti robusti | Lock fra istanze e strategia di migrazione; prove di scrittura interrotta/disco pieno e recupero; rendere affidabili i percorsi di relink e portabilità già presenti |
| P1 | Copertine | Superare il limite di 15 brani, gestire testi lunghi e Unicode nel PDF, stampa fisica al 100% |
| P1 | Accessibilità e documentazione | Audit del flusso corrente con tastiera e lettore schermo; inglese e guida coerente con l'interfaccia attuale; riconciliare il registro storico 14 |
| P1 | Consegna pubblica | Pacchetti per target/architetture dichiarate, firma/notarizzazione macOS, verifica installazione, sorgenti e avvisi completi delle dipendenze distribuite |

## Parità specialistica ancora incompleta

- Dolby C e dbx I/II: nessun encoder integrato e verificato. Richiedono ricerca, percorso di distribuzione e prove con decoder hardware.
- Calibrazione guidata completa, misure automatiche MOL/SNR, assistenza bias/sensibilità e profili legati alla catena fisica: esistono toni, ingresso e profilo manuale, non il percorso strumentale completo.
- Curve Nakamichi/altri: le traduzioni digitali 120/70 µs sono presenti; queste compensazioni aggiuntive no.
- D-ALC/DxL: i modi originali sperimentali non dimostrano equivalenza funzionale/sonora. Serve una specifica con criteri di misura prima dell'implementazione finale.
- Predistorsione calibrata: assente, lavoro di ricerca dipendente da deck/nastro e misure reali.
- Confronto sorgente/nastro allineato continuo con compensazione della deriva: oggi il confronto è differito su acquisizioni brevi.
- APE, ranking dei cinque passaggi peak e modalità audio esclusiva: mancanti rispetto alla baseline funzionale documentata.

## Miglioramenti successivi

Catena di più VST3, editor del produttore e salvataggio dello stato completo; export FLAC; media key globali; archivio cassette ricercabile; coda batch; archivio portabile singolo e scambio profili dedicato; ASIO opzionale. Non sono tutti prerequisiti della prima release utile. Cloud, streaming e controllo remoto del deck richiedono uno scopo separato.

## Ordine consigliato

Chiudere prima i P0 con una cassetta reale, quindi consolidare player/progetti/copertine e distribuzione. Per una prima release affidabile non serve aspettare la ricerca su ogni DSP specialistico, purché le assenze siano esplicite. Per dichiarare parità completa con MixtapeNerd occorre invece soddisfare anche le voci specialistiche e i rispettivi criteri hardware.

## Aggiornamento · 25 ottobre 2026

La lista precedente è storica. Calibrazione automatica e profili sono implementati nei documenti 44–49. Ricerca nel player, salto tra brani, controlli di robustezza dei progetti, quattro lingue, tastiera e copertine ampliate sono implementati nel [consolidamento 50](50-consolidamento-player-progetti-copertine.md). Restano prove lunghe/hardware, verifica Windows/Linux e distribuzione. Il limite di 15 brani per J-card resta esplicito; nessuna verifica fisica della stampante è stata inventata.
