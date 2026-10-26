# Plugin VST3

## Contratto e ambito
Un effetto stereo VST3 sul master completo, dopo montaggio/EQ/compressione e prima del controllo true peak e della codifica NR. Non usare questo slot per encoder NR: il controllo di livello successivo ne cambierebbe il riferimento. Nessun VST2/AU o strumento MIDI in questa versione. Parametri normalizzati salvati nel progetto, editor generico con nomi e valori del plugin. Coda esplicita (0–30 s) conteggiata nella durata del lato; latenza compensata.

IPC locale: `list_vst_plugins` restituisce percorsi nelle directory standard, senza caricarli; `inspect_vst_plugin(path)` carica solo il plugin scelto in un processo separato e restituisce nome, identità e parametri. Ispezionare autorizza quel percorso nella sessione; i progetti aperti non autorizzano l'esecuzione di codice. `processing.vst` è opzionale per i vecchi progetti e contiene enabled, path, uid, name, parameters (valori 0–1), tail_seconds. La preparazione di un master richiede un plugin autorizzato, presente e della stessa identità. Errori, timeout e cancellazione non producono un master valido.

## Motore
Helper locale JUCE 7.0.12 GPLv3, VST3 soltanto; scambio JSON e WAV, nessuna shell. Nessun plugin di terzi incluso nell'installer. L'host viene distribuito insieme all'app; il plugin va installato dall'utente. Windows e Linux richiedono plugin nativi delle rispettive piattaforme.

## Prova prevista
Valhalla Freq Echo 1.2.8, download ufficiale https://valhalladsp.com/shop/delay/valhalla-freq-echo/ . Confronto impulso dry/wet, eco ritardato, stereo, durata/coda, salvataggio e ricaricamento parametri, bypass, plugin mancante e cancellazione. UI: controllo visivo del pannello e assenza di overflow.

## Dipendenze di compilazione e installazione di prova
CMake >=3.22 richiesto (variabile CMAKE per un percorso personalizzato). JUCE 7.0.12 vendorizzato dall’archivio ufficiale GitHub, SHA256 `94e3b35e1990cd67f59736bb5e1eff1cfd9590b16fea82696f309a8f59452434`. Patch locale: rimossa funzione screenshot inutilizzata che usa API eliminate dal nuovo SDK macOS.
Valhalla Freq Echo: immagine ufficiale SHA256 `7e8681bd90fe7c1ef5b82a87c5d90bd1051980c256b0bd9424ea9cbfc53a9bdc`, corrispondente al manifest Homebrew. Installato solo il bundle VST3 firmato in `~/Library/Audio/Plug-Ins/VST3`; nessun AU/AAX o script installer eseguito.

## Limiti iniziali
Un solo effetto stereo, controlli generici normalizzati: nessun editor grafico del produttore, preset proprietario, automazione MIDI o tempo sincronizzato dell’host. Salvataggio dei parametri esposti, non dello stato opaco interno: non garantisce ripristino di campioni esterni o impostazioni non esposte dal plugin. Coda scelta dall’utente, massimo 30 secondi, non rilevata automaticamente. Il plugin può produrre rumore o modulazioni casuali: due render non sono necessariamente identici bit per bit. Il processo separato isola crash/blocchi, non costituisce una sandbox di sicurezza per plugin ostili. Codec NR esterni non supportati da questo slot.

## Evidenza locale, 24 ottobre 2026
Valhalla Freq Echo 1.2.8 caricato realmente via VST3 su macOS Apple Silicon. Impulso a 100% wet: ritardo del massimo circa 51,77 ms; master 144.000 frame a 48 kHz (1 s sorgente + 2 s coda), true peak circa −20,06 dBTP. Parametri identici dopo salvataggio/riapertura; differenza massima tra due render circa 0,000052, compatibile con rumore del plugin. Verificati bypass (48.000 frame e impulso originale), cancellazione, plugin mancante e assenza di master finale nei casi di errore. Prova ripetibile: `cargo run --manifest-path src-tauri/Cargo.toml --bin verify_vst -- /percorso/ValhallaFreqEcho.vst3`.

Verifica UI effettuata nella build desktop: ricerca plugin installati, selezione di ValhallaFreqEcho, caricamento e visualizzazione dei nove parametri, modifica del delay. Verifica visiva della sezione aperta e controllo overflow a larghezza 900 px nella preview browser. Il progetto precedente “After hours” è stato recuperato al termine; copia di sicurezza in `test-results/vst/before-ui-test.cassette.json`. Build macOS creata con entrambi gli helper inclusi. 16 test Rust e 8 frontend superati; regressione audio/export/NR superata. Windows/Linux non eseguiti localmente.
