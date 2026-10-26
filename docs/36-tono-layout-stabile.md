# Tono: layout stabile e verifica della build aperta

## Problemi osservati

Premendo «Tono · 5 s», `busy` inseriva `JobProgress` fra intestazione e contenuto della modale, cambiando per un istante altezza e posizione dei controlli. La generazione e l’avvio usano due fasi `busy`, rendendo il salto evidente anche se molto breve.

La segnalazione di silenzio successiva alla correzione stereo è stata confrontata con l’avvio del processo: l’app in uso era partita alle 18:59:30, prima del binario aggiornato delle 19:00. Il processo aperto conservava quindi il vecchio percorso audio. Il test musicale sul motore corretto era stato confermato udibile dall’utente (documento 35).

## Correzione UI

Solo nella calibrazione, l’avanzamento appare in una zona stabile di 38 px sotto i pulsanti, invece di essere inserito sopra tutto il contenuto. A riposo e durante l’uscita, la stessa zona indica dispositivo selezionato e frequenza del progetto. Nessuna modifica al livello del tono, alla sua durata o al percorso di generazione.

## Verifica

Fixture `test-results/calibration-preview.html` con componente reale `StudioDialog` e stati controllati. A 1200×800: modale sempre y=40, altezza=720; pulsanti sempre y=319; divisore sempre y=419. A 900×640: modale sempre y=32, altezza=576; pulsanti sempre y=311. Identici valori a riposo, durante preparazione, durante riproduzione e ritorno a riposo. Nessun overflow orizzontale. Controllato screenshot del layout.

Per verificare l’audio occorre caricare la build aggiornata riavviando il processo dell’app; sostituire il bundle su disco non aggiorna il processo già aperto.

Build macOS e 21 test frontend completati; formattazione verificata. Chiuso il processo precedente a player fermo e progetto salvato, poi aperto il bundle aggiornato. L’ultima sessione disponibile è «Appetite for Destruction», 12 brani a 44,1 kHz. Dopo l’apertura l’utente ha avviato una preparazione del lato: non è stata interrotta per provare il tono.
