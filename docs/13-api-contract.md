
## Plugin VST3
`list_vst_plugins()` → string[]: scansione dei percorsi standard senza eseguire plugin.
`inspect_vst_plugin({path})` → `{name, uid, parameters: [{name,value,text}]}`: caricamento esplicito in helper separato, timeout 30 s; autorizza il percorso per la sessione.
`processing.vst` opzionale/null conserva `{enabled,path,uid,name,parameters:number[],tail_seconds}`. Parametri normalizzati finiti 0–1, coda 0–30 s; bypass conserva impostazioni. Vecchi progetti: nessun plugin. Master e passaggi elaborati applicano il plugin prima del controllo true peak e NR; ascolto originale lo esclude. Il conteggio del lato include la coda. Un progetto aperto con plugin non autorizzato fallisce il render con indicazione di caricarlo; nessun caricamento implicito. Helper render: timeout 30 minuti, cancellazione termina il processo; output stereo float32, frequenza invariata, durata sorgente+coda e campioni finiti verificati.
