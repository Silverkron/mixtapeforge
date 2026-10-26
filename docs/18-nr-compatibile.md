# NR compatibile con il deck

## Stato attuale

**Audit del 25 ottobre 2026:** consultare [Verifica della codifica Type B](39-audit-dolby-b.md). Il percorso digitale supera le prove ampliate, ma il riferimento assoluto e la compatibilità con il deck restano da qualificare; un confronto indipendente ha evidenziato scostamenti da approfondire. Non considerare il solo roundtrip una validazione hardware.

Requisito confermato: Dolby B/C e dbx per i decoder dei deck. **Type B è implementato tramite libdolbyb 1.1**, in Audio → NR encoding. È possibile preparare, ascoltare ed esportare master codificati. Dolby C e dbx I/II restano non disponibili: nessun encoder verificato è stato integrato per questi sistemi.

Le prove software non equivalgono a una verifica con decoder hardware. Il master ascoltato direttamente nell’app contiene il segnale codificato, non una simulazione di riproduzione decodificata.

## Licenze e separazione dei programmi

L’utente ha autorizzato una distribuzione open source compatibile. Il controllo delle dipendenze ha rilevato CPAL, hound e Tao Apache-2.0; libdolbyb è GPL-2-only. Per evitare il collegamento diretto tra componenti incompatibili:

- App e motore Rust: **GPL-3.0-only**, testo in LICENSE.
- Programma standalone `cassette-nr`, adapter C e libdolbyb: **GPL-2.0-only**, testo originale nel vendor.
- Comunicazione soltanto tramite invocazione CLI e normali file WAV; nessun FFI, linking, strutture condivise o protocollo privato.
- Utility inclusa nel pacchetto, utilizzabile autonomamente e compilata dagli stessi sorgenti pubblicabili. Nessuna installazione aggiuntiva richiesta all’utente.

Fonti: [compatibilità Apache/GPL](https://www.apache.org/licenses/GPL-compatibility), [FAQ GNU sui programmi separati](https://www.gnu.org/licenses/gpl-faq.en.html#GPLPlugins). Non è stata effettuata alcuna pubblicazione. Per distribuire i binari occorre accompagnarli con sorgenti completi e avvisi delle dipendenze.

## Dipendenza riproducibile

[Release ufficiale libdolbyb 1.1](https://codeberg.org/sox_ng/libdolbyb/releases/tag/libdolbyb-1.1).
SHA-256 archivio: `353e50e73cfa30714e0898223b5e9f655563392c76c1c98b37ddbd1f1f30ca6e`.

Sorgenti e avvisi conservati in `src-tauri/vendor/libdolbyb-1.1`; modifiche elencate in INTEGRATION.md. Cache di calibrazione soltanto in memoria, coefficienti aggiornati dopo un cache hit, tolleranza del decoder di test adeguata a PCM24. L’utility è a thread singolo e non usa cache nella home.

## Flusso audio e riferimento

Il lato completo — brani, fade, EQ, pause e crossfade — passa nell’encoder in una sola sessione. Non viene più riservato un margine fisso di 12 dB. Si prova senza attenuazione NR aggiuntiva, salvo il rispetto dei limiti di ingresso. Dopo la codifica si misura il true peak senza modificare il livello: se necessario, si rilegge il premaster originale a un livello inferiore e si ricodifica l’intero lato. Dopo otto tentativi senza esito il render fallisce. La riduzione effettiva viene mostrata nelle misure del master.

Il riferimento selezionato viene tradotto in `ThGndB = -nr_reference`: è la convenzione adottata dall’app, non una corrispondenza certificata con il Dolby Level definita dal manuale upstream. Il nuovo default 0 dBFS è un punto di partenza (i valori espliciti dei progetti salvati restano invariati) da allineare e verificare sul deck, non una calibrazione certificata. Il riferimento è salvato nel progetto e restituito con il risultato del render.

Interfaccia, nome WAV proposto, tracklist e J-card riportano Type B. Registrazione con NR del deck OFF per evitare doppia codifica; riproduzione con Dolby B. Non viene cambiato il controllo fisico del deck.

## Verifiche

- Test software a 44,1/48/88,2/96 kHz: incremento delle alte a basso livello, isolamento stereo, encode/decode con errore RMS relativo inferiore al 5% sul tono di prova, ripetibilità.
- CLI: WAV float32 anche WAVE_FORMAT_EXTENSIBLE, conversione PCM24, rifiuto campioni non finiti/fuori scala e uscite saturate.
- Integrazione: export PCM16/PCM24/float32, durata e true peak verificati rileggendo i file, progetto NR serializzabile, etichette esportate e pulizia dopo annullamento.
- Interfaccia controllata visivamente nel browser a 900 px.

Restano da eseguire prove indipendenti con decoder hardware, sweep e transienti a più livelli, oltre alle verifiche native Windows/Linux. Il roundtrip con lo stesso algoritmo non dimostra da solo compatibilità Dolby.

### Risultato della verifica integrata precedente al 25 ottobre

15 test Rust e 7 frontend superati. I tre master NR di prova (PCM16, PCM24 e float32) hanno true peak circa −14,956 dBTP, con attenuazione pre-encoder −15,790 dB; la rilettura conferma durata, assenza di clipping e rispetto del ceiling. Sono verificati anche etichette, roundtrip del progetto e cancellazione prima dell’encoding. UI a 900 px senza overflow orizzontale.

Build macOS completata con `cassette-nr` e testi delle licenze inclusi. L’eseguibile estratto dal pacchetto finale è stato eseguito su un WAV reale: audio trasformato, lunghezza conservata e campioni finiti senza clipping; un WAV malformato è stato rifiutato senza lasciare output. Non è stata verificata in questa sessione la finestra nativa dell’app aggiornata.

## Aggiornamento volume e riferimento

Il nuovo default è 0 dBFS, consentito da UI, modello e CLI. Rimossi i 12 dB fissi; misure, retry e limiti sono descritti in [40 — Livello Type B](40-livello-type-b.md). Il risultato storico riportato sopra non descrive il nuovo comportamento.
