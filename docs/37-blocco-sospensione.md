# Schermo e sospensione durante la registrazione

## Comportamento

L’app richiede al sistema di mantenere acceso lo schermo e impedire la sospensione automatica per inattività durante l’uscita audio: Ascolta, REC, toni e passaggi di prova condividono la protezione. La richiesta resta attiva in pausa, fino a Stop o fine del flusso. Anche la preparazione/esportazione del master è protetta durante l’elaborazione nativa.

La protezione è temporanea e non cambia preferenze, timer di macOS o piano energetico. Viene rilasciata quando termina lo scope nativo: completamento, Stop, errore o chiusura del processo. L’app non chiede di impedire la sospensione manuale; chiudere il coperchio, richiedere Stop dal sistema o condizioni critiche come batteria scarica restano sotto il controllo del sistema operativo. Non equivale a impedire ogni tipo di blocco schermo imposto da criteri del sistema.

## Implementazione

`power::inhibit` usa keepawake 0.6.1 (MIT) con `display=true`, `idle=true`, `sleep=false`. Dipendenza fissata nel manifest e nel lockfile; testo MIT incluso negli avvisi distribuiti. Nessun programma aggiuntivo da installare.

Il guard vive nel thread di output e non nel callback audio: nessuna chiamata energetica, allocazione o lock aggiunto al callback. Il suo rilascio precede la notifica di fine flusso. In `render_side` è posseduto dal worker, non dalla UI. Un errore di acquisizione viene mostrato e impedisce l’avvio dell’operazione richiesta.

Backend della libreria: IOPM assertions su macOS, SetThreadExecutionState su Windows, D-Bus ScreenSaver/systemd su Linux. Su Linux la disponibilità dipende dalla sessione desktop e dai relativi servizi. Windows/Linux non provati localmente.

## Evidenze

`verify_power` su macOS controlla `pmset -g assertions`: esistono richieste PreventUserIdleDisplaySleep e PreventUserIdleSystemSleep durante la vita del guard; entrambe scompaiono dopo drop e ritorno con errore. Nessuna modifica ai timer del sistema o generazione audio.

`verify_transport` sulla FastTrack usa solo campioni silenziosi e controlla le richieste appartenenti al proprio PID: presenti durante output e pausa, assenti dopo Stop e fine naturale. I test non richiedono di mettere realmente in standby il Mac o interrompere registrazioni dell’utente.

Esito locale: `verify_power` superato, 21 test Rust superati, Clippy senza warning. Nel trasporto FastTrack la pausa resta stabile a 0,360 s e Stop chiude in 65,3 ms; verificate entrambe le richieste del sistema e il loro rilascio anche a fine riproduzione.

Build macOS completata e riaperta a trasporto fermo. Recuperati «Appetite for Destruction» (12 brani), selezione lato B e vista Copertina presenti prima dell’aggiornamento. Nessuna registrazione o riproduzione dell’utente interrotta e nessun tono emesso nelle prove.

Fonti: [keepawake](https://github.com/segevfiner/keepawake-rs), [Apple: PreventUserIdleDisplaySleep](https://developer.apple.com/documentation/iokit/kiopmassertiontypepreventuseridledisplaysleep), [Apple: PreventUserIdleSystemSleep](https://developer.apple.com/documentation/iokit/kiopmassertiontypepreventuseridlesystemsleep).
