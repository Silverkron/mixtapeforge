# Verifica della codifica Type B — 25 ottobre 2026

Questo rapporto descrive il binario verificato prima della correzione del volume. Per il nuovo default 0 e la rimozione del margine fisso, vedere [40 — Livello Type B](40-livello-type-b.md). Le misure storiche restano conservate come evidenza; la compatibilità hardware richiede comunque una prova indipendente.

## Esito

Il percorso digitale è stabile nelle prove eseguite. La compatibilità assoluta con il Dolby B hardware della Pioneer CT-W205R **non è ancora dimostrata**. Il roundtrip con lo stesso encoder/decoder non basta: il riferimento dell’interfaccia richiede una verifica indipendente e un allineamento sul deck.

Questa sessione è un audit: non modifica encoder, livelli dei progetti, impostazioni della scheda audio o controlli della piastra. Nessun tono è stato riprodotto e nessuna registrazione fisica è stata avviata.

## Percorso controllato

Il master assemblato passa attraverso EQ/dinamica/VST e controllo true peak. Con NR attivo, `render.rs` abbassa preventivamente i picchi a `ceiling − 12 dB`, se necessario. Il programma separato `cassette-nr` converte float32 in PCM24, usa una sola istanza di libdolbyb 1.1 per tutto il lato e riconverte in float32. Il risultato viene misurato senza guadagno aggiuntivo dopo l’encoding. `nr_cli.c` traduce il riferimento in `ThGndB = −nr_reference`.

La direzione del controllo di soglia è coerente nelle prove relative. Il manuale upstream descrive `ThGndB` come regolazione della soglia, ma **non stabilisce una formula certificata tra il valore dBFS dell’interfaccia e il Dolby Level del deck**. La precedente formulazione «secondo la convenzione del manuale» era troppo forte: questa è una convenzione adottata dall’app, ancora da validare sul riferimento hardware.

## Prove sul binario del pacchetto macOS

Binario: `Cassette Maker.app/Contents/MacOS/cassette-nr`.
SHA-256: `a0992abd30931f8f3208207f5cd67f2186b5bdba3fc0a0710788345c7ebf53da`.

- 192 combinazioni: 8 frequenze (100, 400, 1000, 1300, 3000, 5000, 10000, 15000 Hz), 6 livelli (−6, −18, −28, −38, −48, −60 dBFS peak), 4 frequenze di campionamento (44,1/48/88,2/96 kHz). Segmenti da 300 ms; misure sugli ultimi 100 ms. Queste misure includono la storia del controllo dinamico: non vanno confuse con una curva statica completamente assestata.
- Campioni finiti e nessuna saturazione segnalata dall’utility; canale destro silenzioso esattamente a zero.
- Errore RMS relativo massimo del roundtrip nei segmenti misurati: 0,0001681, ossia circa **0,0168%**. È una verifica interna dello stesso algoritmo, non di compatibilità hardware.
- Confronto PCM16/PCM24 a 48 kHz, stessa libreria e soglia: differenza massima di guadagno **0,0464 dB** per i livelli da −6 a −48 dBFS. La maggiore quantizzazione PCM16 ai livelli inferiori non viene usata per fissare questo limite.
- Build temporanea con UndefinedBehaviorSanitizer: nessuna segnalazione sulla griglia a 48 kHz. Non costituisce una prova universale di assenza di problemi nel codec.
- Blocchi da 4096 e 257 frame: uscita identica bit per bit. Scambio L/R su segnali diversi: uscita identica dopo lo scambio inverso. Non emerge una perdita di stato ai confini dei blocchi o una contaminazione tra canali.
- Dimezzando insieme segnale e riferimento (−6,0206 dB), l’uscita riscalata differisce di circa 0,0000012 in RMS relativo: il controllo di soglia scala in modo coerente.
- Rilanciati i due test Rust `nr::tests`: superati su tutte e quattro le frequenze di campionamento.

Dati: `test-results/nr/audit-dolby-b.json`, `audit-state.json`, `audit-datasheet-comparison.json`. Script principale: `test-results/nr/audit-dolby-b.py`; richiede NumPy e le sonde PCM16/UBSan temporanee in `/tmp/cassette-nr-audit`. Le sonde sono derivate dai sorgenti locali e non sostituiscono il programma distribuito. Gli audio di prova sono sintetici e restano in `/tmp`; nessun brano dell’utente viene copiato o trasmesso.

## Riscontro indipendente: punto ancora aperto

È stato consultato il datasheet originale National Semiconductor **LM1112A/B/C**, aprile 1987, pagina 2, tabella “Encode Characteristics”, tramite [questa copia del documento del produttore](https://datasheet4u.com/pdf/505454/LM1112.pdf). È un controllo indipendente con un circuito concreto, non una specifica normativa completa del sistema Dolby B.

Assunzione del confronto: il `nr_reference` mostrato dall’app rappresenta il medesimo Dolby Level al quale sono riferiti i punti del datasheet, compensando idealmente il guadagno lineare della catena analogica. È proprio l’assunzione da qualificare. Tono sinusoide da 3 secondi per punto a 48 kHz, riferimento dell’app −18 dBFS peak, RMS misurato sugli ultimi 500 ms:

| Frequenza | Livello rispetto al riferimento | Incremento tipico nel datasheet | Incremento misurato |
| --- | --- | --- | --- |
| 10 kHz | 0 dB | 0,5 dB | 0,885 dB |
| 1,3 kHz | −20 dB | 4,3 dB | 0,993 dB |
| 5 kHz | −20 dB | 3,2 dB | 2,206 dB |
| 3 kHz | −30 dB | 8,8 dB | 3,990 dB |
| 5 kHz | −30 dB | 8,2 dB | 4,718 dB |
| 10 kHz | −30 dB | 6,5 dB | 5,940 dB |
| 10 kHz | −40 dB | 10,4 dB | 9,164 dB |

Gli scostamenti arrivano a circa **4,81 dB** nelle condizioni considerate. Un buon roundtrip interno non li esclude. Queste misure non isolano ancora quanto dipenda dall’interpretazione del riferimento, dal modello analogico emulato o dalle differenze tra condizioni di prova. Non giustificano l’applicazione automatica di un offset: serve un encoder/decoder indipendente o la misura sul deck correttamente allineato.

## Altri punti da qualificare

1. **PCM24.** Il manuale `libdolbyb.3` avverte che 8 bit e 24 bit non funzionano ancora perfettamente. Le prove attuali non hanno riprodotto un difetto grave sul percorso PCM24; non è corretto né ignorare l’avvertenza né dichiarare PCM24 guasto soltanto per essa.
2. **Margine fisso di 12 dB.** È una protezione conservativa che può lasciare inutilizzata una parte rilevante del livello disponibile. Con ceiling −3 dBFS, il segnale prima del codec viene limitato a −15 dBTP. Può spiegare master NR sensibilmente più bassi. Non compensare alzando il master dopo l’encoding: il bilanciamento dei livelli deve essere progettato e verificato prima del codec.
3. **Calibrazione generale e Dolby Level.** Il profilo 0 VU dell’app non è una calibrazione indipendente del sistema Dolby. Il livello del tono, `nr_reference`, la sensibilità del nastro e la catena di uscita devono essere verificati insieme; non basta che entrambi i campi abbiano per caso il default −18.

## Pioneer CT-W205R dell’utente

Il [manuale d’uso Pioneer, pagina 12](https://www.manualslib.com/manual/350617/Pioneer-Ct-W205r.html?page=12), indica registrazione su Deck II e regolazione del REC LEVEL intorno a −3 dB per buona parte del programma, con 0 dB occasionale sui picchi; il livello ottimale dipende da sorgente e nastro. Questa è un’indicazione per il programma musicale, **non** una dichiarazione che un tono di riferimento Dolby debba essere impostato a −3 o a 0 dB.

È disponibile anche il [service manual Pioneer](https://audiocircuit.dk/downloads/pioneer/Pioneer-CTW205R-tape-sm.pdf). Non sono state ricavate da esso istruzioni di regolazione dei trimmer interni e non vengono proposti interventi interni alla piastra.

Per registrazioni d’uso normale, il percorso già disponibile è app con **Nessuna codifica NR**, CT-W205R su **Dolby B durante la registrazione e la riproduzione**. Il percorso sperimentale software richiede invece NR del deck OFF in registrazione e B in riproduzione, dopo allineamento verificato.

La prossima verifica utile è confrontare una breve registrazione codificata dall’hardware con una codificata dal software, usando segnali non codificati equivalenti prima dei due encoder. I due master devono avere lo stesso livello prima dell’encoding: confrontare semplicemente i picchi dei file finiti sarebbe scorretto, anche per via dell’attenuazione aggiuntiva di 12 dB nell’app. Registrare, riavvolgere e acquisire il ritorno con Dolby B attivo, mantenendo fissi i guadagni della catena. Solo questo confronto potrà qualificare la compatibilità concreta con la CT-W205R.

## Priorità

Prima di presentare la funzione come verificata per registrazioni software/hardware: definire e provare il riferimento assoluto; eseguire il confronto indipendente sul deck; rivedere il margine fisso sulla base delle misure; aggiungere curve statiche e transienti di riferimento che non usino lo stesso decoder come unica conferma. Nessun cambiamento automatico al livello NR è stato introdotto in questo audit.
