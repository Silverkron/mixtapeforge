# Roadmap e criteri di uscita

La roadmap non assume un team né una data di consegna. Ogni fase termina con una dimostrazione ripetibile. Stime per funzione in [03](03-funzionalita-e-fattibilita.md); prima di fissare un calendario occorre completare R0 e conoscere hardware e capacità del team.

## R0 — Ridurre i rischi prima del bootstrap completo

**Output:** piccoli esperimenti separati, rapporto con risultati per OS e ADR aggiornati.

1. Fissare release candidate di Tauri, CPAL, decoder e DSP; verificare feature, licenze, requisiti minimi e architetture supportate.
2. Uscita stereo nativa, enumerate/select device e configurazione realmente ottenuta su Windows, macOS e Linux. Testare USB DAC e interfaccia con ingresso/uscita.
3. Provare shared/exclusive dove previste; rilevare device occupato e scollegamento senza fallback silenzioso.
4. Lettura PCM da disco per due ore, telemetria UI attiva e UI sotto carico; contare underrun e misurare uso memoria/callback.
5. Render offline e riproduzione dallo stesso piano; fixture WAV/FLAC/MP3, frequenze miste, file corrotti e tag Unicode.
6. Prototipo visivo di Componi e Studio con strumenti simulati **etichettati come demo**, palette entrambe e tastiera.
7. Definire strumenti e vettori di riferimento per LUFS, true peak, VU e PPM; scegliere le rispettive specifiche.

**Gate:** backend standard valido sui tre OS, guasti osservabili, memoria senza crescita continua, nessun underrun nelle configurazioni concordate e percorso di packaging dimostrato. Per esclusività/ASIO una limitazione deve diventare requisito rinviato esplicito o adapter dedicato, non sparire dal piano.

**Decisione:** confermare Tauri/Rust; se il problema è I/O valutare JUCE/adapter nativo; se è la WebView valutare Electron. Non cambiare tutto lo stack per un limite isolato senza identificare il responsabile.

## R1 — Progetto e composizione

**Funzioni:** F-01, F-03, F-04, F-05, F-06, F-07; base UI di F-33.

**Dimostrazione:** import cartella → compila A/B → fit con brani bloccati → undo → chiudi/riapri → relink di un file spostato.

**Gate:** capienza calcolata dal piano; nessun taglio implicito; overflow leggibile; autosave recuperato dopo chiusura forzata; file originali invariati. Componenti DS condivisi e IT/EN fin dall'inizio.

## R2 — Analisi, mastering semplice ed export

**Funzioni:** F-09, parte Peak/LUFS di F-10, F-15, F-16, peak/spettro/waveform di F-17 e F-19.

**Dimostrazione:** import frequenze miste → analisi → loop passaggio RMS → gain compatibile col ceiling → WAV A/B e tono separato → report.

**Gate:** durata campione-esatta, tolleranze di misura concordate, export annullabile, clip e target non raggiungibili segnalati. Rendering indipendente dalla UI e cache invalidata correttamente.

## R3 — Prima versione utilizzabile su nastro

**Funzioni:** F-18, F-20, percorso guidato/base di F-21, backend standard di F-24, F-28, F-29, completamento F-33.

**Dimostrazione:** collega DAC → conferma percorso → tono/prova manuale → avvia lato A → stop/fine → gira nastro → lato B → report.

**Gate:** prova continua di due ore nelle configurazioni supportate, errore device gestito, Stop affidabile, UI minimizzata senza impatto audio, recupero sessione/log e pacchetti installabili provati sui tre OS. Accessibilità del flusso base verificata.

**Dicitura di rilascio:** versione iniziale; non dichiarare ancora parità con MixtapeNerd. Tutte le funzioni specialistiche mancanti restano nel registro di copertura.

## R4 — Strumenti e parità non sperimentale

**Funzioni:** F-02, resto F-10/F-17, F-11, F-13, calibrazione avanzata/riferimento NR di F-21, F-22, F-23, esclusività di F-24, F-26.

**Dimostrazione:** profilo misurato su catena reale → fit livelli → processori → ritorno allineato → confronto e report riproducibile. Test su deck a due testine per il percorso differito e a tre testine per quello simultaneo.

**Gate:** specifiche dei meter definite; misure coerenti con riferimenti; profilo invalidato se cambia catena; risposta EQ misurata; allineamento off-tape con incertezza dichiarata; corpus codec completato. Non trattare EQ digitale come regolazione fisica del bias.

## R5 — Parità DSP specialistica e ricerca

**Funzioni:** F-12, F-14, F-27.

Tre filoni indipendenti: comportamenti dei compressori specialistici; encoding NR interoperabile; predistorsione della catena. Ognuno produce specifica, fixture, misure e prova d'ascolto prima dell'integrazione nel flusso normale.

**Gate:** criteri numerici e ascolto concordati prima dell'implementazione finale; compatibilità NR con hardware; comportamento verificato su livelli/frequenze diversi; nessuna regressione mascherata da variazione di loudness. Un roundtrip software con sé stesso non dimostra interoperabilità.

La parità completa si valuta qui verificando tutte le righe MN. Un filone inconcludente resta “ricerca/non disponibile”: non si chiude la milestone per scadenza o perché esiste un pannello.

## R6 — Miglioramenti di prodotto

**Funzioni:** F-08, F-25, F-30, F-31, F-32, F-34, F-35. J-card può anticipare R4 se la base è stabile e la ricerca utenti ne conferma il valore.

**Gate:** pacchetto portabile aperto su altro OS, stampa fisica verificata, profilo importato marcato non verificato, acquisizioni conservate, batch annullabile. ASIO resta opzionale e non rompe i backend standard.

## Futuro subordinato a evidenza

F-36 controllo hardware, F-37 plugin, F-38 suggerimenti musicali, F-39 metadati streaming e F-40 cloud non fanno parte delle prime milestone. Richiedono motivazione, costi e progettazione dedicata; non hanno una data promessa.

## Sequenza e parallelismo consentito

La catena critica è `R0 → R1 → R2 → R3`; il rendering e il clock nativi vanno provati prima di costruire tutto lo Studio. Ricerca DSP e validazione visiva possono proseguire parallelamente, ma dipendono dai contratti di segnale e dai risultati hardware. Un prototipo frontend non certifica il motore.

## Aggiornamento del piano

Per ogni milestone mantenere: funzioni previste/completate, prove e configurazioni, decisioni cambiate, limiti residui e prossima demo. Spostare una funzione richiede aggiornare anche copertura MN e testo del rilascio. Prima di iniziare una fase, trasformare le sue prove in issue piccole con un esito osservabile.

## Consolidamento del 25 ottobre 2026

Player: aggiunte ricerca nel lato e navigazione tra brani nell’ascolto, con protezione durante REC. Progetti: salvataggi atomici, controllo dei conflitti esterni, coda autosave e backup recuperabile. Copertine: nove stili, sei font incorporati e prove automatiche delle combinazioni; lingue IT/EN/ES/FR e navigazione da tastiera consolidate. Dettagli e prove in [50](50-consolidamento-player-progetti-copertine.md). Questi avanzamenti non chiudono i gate hardware/multipiattaforma di R0/R3 né la ricerca DSP di R5.
