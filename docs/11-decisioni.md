# Decisioni iniziali e rischi

Data: 24 ottobre 2026. Tutte le ADR sono **proposte**, salvo i requisiti direttamente richiesti dall'utente. Si confermano con evidenza, non per il solo fatto di essere scritte.

## ADR-001 — Desktop ibrido con UI web e audio nativo

**Contesto:** tre OS, riferimento visivo CSS, trasferimento audio continuo. **Decisione proposta:** Tauri 2 + React/TypeScript e Rust. **Conseguenza:** manutenzione frontend e nativo; test su WebView diverse. **Conferma:** R0. **Riapertura:** blocco documentato di accessibilità, packaging o capacità audio; valutare separatamente shell e motore.

## ADR-002 — Core Rust e backend audio sostituibile

**Contesto:** evitare logica temporale duplicata e dipendenza dai timer UI. **Decisione:** Rust possiede progetto e piano; CPAL è adapter candidato. **Conseguenza:** DTO generati e bridge sottile; driver-specific code isolato. **Alternativa:** JUCE/C++ se il backend non copre requisiti; non introdurre due motori contemporaneamente senza necessità.

## ADR-003 — Locale e offline come comportamento predefinito

**Contesto:** file personali e uso vicino al deck anche senza connessione. **Decisione:** nessun account/cloud necessario; elaborazione e progetti locali. **Conseguenza:** portabilità esplicita e backup sotto controllo utente. **Riapertura:** richiesta concreta di collaborazione/sync con disegno separato.

## ADR-004 — Timeline non distruttiva e precisione a campioni

**Contesto:** piccoli errori di durata si accumulano e i file sorgenti devono restare integri. **Decisione:** clip referenziate, trim/fade/gain persistiti, piano compilato a campioni. **Conseguenza:** decodifica e resampling precedono il calcolo finale. **Conferma:** fixture con frequenze miste, transizioni e fit.

## ADR-005 — Pre-render per il trasferimento continuo

**Contesto:** decoder e UI possono avere picchi di carico. **Decisione:** preparare il master lato su disco; durante la sessione eseguire soltanto lettura bufferizzata e trattamento strettamente necessario. **Conseguenza:** spazio e tempo di preparazione visibili; invalidazione dopo modifiche. **Eccezione:** preview interattiva, purché non diverga dal renderer di riferimento.

## ADR-006 — Profili legati alla catena, non al nome del nastro

**Contesto:** DAC, gain e deck modificano il rapporto digitale/analogico. **Decisione:** profili con metodo, percorso e stato di verifica. **Conseguenza:** cambio catena invalida/riapre verifica. Nessun profilo universale “Type I = livello X”. **Conferma:** simulazione cambi device e prova hardware.

## ADR-007 — Separare versione iniziale, parità e ricerca

**Contesto:** l'utente richiede tutte le funzioni MixtapeNerd e oltre, alcune sperimentali. **Decisione:** copertura MN tracciata; rilascio iniziale limitato dichiarato; NR e predistorsione con gate specifici. **Conseguenza:** nessun claim di parità anticipato; ricerca inconcludente rimane visibile. **Riapertura:** solo se cambia esplicitamente il perimetro di prodotto.

## ADR-008 — Design TapeBytes con strumenti musicali verificabili

**Contesto:** desiderata continuità estetica; il riferimento tratta anche dati via audio. **Decisione:** riprendere palette, gerarchie e carattere rétro, progettare meter musicali dedicati. **Conseguenza:** niente copia del monolite UI/codec, niente FFT etichettata VU. **Conferma:** prototipo Componi/Studio e test di leggibilità.

## Registro rischi

| Rischio | Impatto / probabilità iniziale | Mitigazione e gate |
| --- | --- | --- |
| Esclusività o backend Linux non coperti nella release scelta | Alto / media | R0 su tre OS, adapter isolato, alternative prima del prodotto completo |
| NR interoperabile richiede più ricerca del previsto | Alto / alta | Corpus e decoder hardware; filone indipendente, nessuna scorciatoia nel claim |
| D-ALC/DxL non riproducibili dalle sole descrizioni | Alto / alta | Definire comportamento osservabile, chiarire equivalenza vs copertura del caso d'uso |
| Predistorsione migliora toni ma peggiora musica | Alto / media | Misure e ascolto controllato, bypass, profilo specifico e stato sperimentale |
| Deriva ADC/DAC rende falso il confronto off-tape | Alto / media | Stima ritardo/deriva e indicatore affidabilità, fixture e prova lunga |
| Profilo apparentemente valido dopo cambio gain fisico | Alto / alta | Conferma della catena e limiti osservabili dichiarati |
| Interruzione durante il trasferimento | Alto / media | Pre-render, buffer, inibizione sleep, errori/log e nessuna ripresa silenziosa |
| Overbuilding di cloud/plugin/AI prima della registrazione affidabile | Alto / alta | Roadmap con gate e futuro separato; valore primario testato a R3 |
| Il look rétro rende difficili testi, focus e unità | Medio / media | Font UI, strumenti separati, DS e test tastiera/contrasto |
| Codec o dipendenze distribuite con condizioni non censite | Alto / media | Versioni/feature fissate, inventario e verifica della build prima del rilascio |
| Mancanza di macchine/device per provare tre OS | Alto / non stimata | Pianificare risorse prima di promettere supporto; non equiparare CI a prova analogica |

Probabilità qualitative basate sul progetto, non statistiche empiriche.

## Decisioni aperte prima di implementare

| Tema | Default per procedere | Quando chiudere |
| --- | --- | --- |
| Nome pubblico | MixtapeForge | Applicato il 26 ottobre 2026; identificativi di archiviazione conservati |
| Hardware di riferimento | DAC USB stereo, interfaccia full duplex, deck 2/3 testine | R0 e prima delle misure avanzate |
| Sistemi minimi e architetture | Windows 11 x64, macOS Apple Silicon, Linux x64 | R0 dopo verifica dipendenze |
| Licenza del prodotto e distribuzione | Da scegliere; nessuna compatibilità di licenze presunta | Prima di selezionare componenti vincolanti |
| Formati prioritari oltre WAV/FLAC/MP3 | AAC/M4A/APE per copertura baseline | Spike decoder R0, completamento R4 |
| Specifica VU/PPM e quasi-peak | Da fissare e testare | Prima di implementare/dichiarare conformità |
| Equivalenza dei processori proprietari | Non promessa dal nome | Ricerca R5 con criteri espliciti |
| Supporto autoreverse/controllo REC | Manuale nelle prime versioni | Solo con hardware/protocollo verificato |

Nessuna di queste decisioni blocca la progettazione iniziale. Le scelte che dipendono da hardware o licenza devono però essere chiuse prima dell'implementazione o distribuzione pertinente.

## ADR-009 — Organizzazione del prototipo implementato

Il prototipo usa una sola crate con moduli di dominio, audio, DSP, render, device, confronto, storage e artwork, anziché creare immediatamente tutte le crate previste nella mappa iniziale. Le schermate React sono separate in `src/views`; il controller gestisce lifecycle e bridge. Il core Rust valida le operazioni che producono file e calcola durate/gain; la preview browser è esplicitamente grafica e non simula operazioni native riuscite. Questo limita il numero di pacchetti senza nascondere i confini. Il supporto ai tre OS e le prove lunghe restano gate aperti.

## ADR-010 — Controllo del true peak sul master completo

I processori possono cambiare i picchi dopo la normalizzazione. Il renderer scrive un intermedio float32, misura il true peak in streaming e attenua uniformemente soltanto se necessario per rispettare il ceiling, prima della quantizzazione/dither. L'attenuazione è riportata alla UI. Non viene introdotto un limiter dinamico implicito. Questa decisione riguarda la catena attuale, senza NR: l'aggiunta futura dell'encoding richiederà di rivalutare il punto del controllo per non alterare l'interoperabilità.
