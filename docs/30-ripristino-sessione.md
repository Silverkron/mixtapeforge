# Ripristino dell'ultima sessione

## Difetto

L'avviso restava visibile dopo l'importazione o la modifica di un progetto. Il suo pulsante poteva quindi ripristinare una copia precedente sopra il lavoro attivo. Le risposte asincrone di avvio potevano inoltre riaprire l'avviso o reimpostare il progetto iniziale dopo un'azione dell'utente.

## Comportamento corretto

- L'avviso appare soltanto all'avvio, finché non è iniziato un altro lavoro.
- Riporta «Ultima sessione», titolo e numero di brani. Il pulsante «Riprendi sessione» carica il progetto salvato, azzera la selezione e la cronologia vuota di avvio e chiude l'avviso.
- Importazione, apertura o modifica del progetto chiudono l'avviso. Le risposte di avvio arrivate successivamente vengono ignorate, senza reimpostare il progetto.
- Durante importazione, elaborazione, conto alla rovescia e uscita audio, il ripristino è disabilitato. Il controller verifica anche internamente che non sia già iniziato un altro progetto.
- Chiudere l'avviso lo nasconde per la sessione corrente, senza cancellare il salvataggio precedente. Non viene simulata una cancellazione definitiva.

La barra non è più un pannello rientrato: segue tutta la larghezza dell'interfaccia, ha titolo troncabile con tooltip e pulsanti di dimensioni fisse. Resta alta 47 px anche con titolo lungo o durante un'operazione.

Nessuna nuova firma IPC: sono utilizzati i comandi esistenti `recover_project`, `default_project` e `autosave_project`. Il recupero dei file e la validazione del progetto rimangono nel core Rust. Lo scroll al cambio vista e al ripristino si riferisce al viewport del workspace.

## Verifiche

Sei test React di regressione esercitano il controller reale con il bridge locale controllato: clic sul pulsante visibile, importazione reale attraverso il controller, risposta di recupero tardiva, progetto iniziale tardivo, importazione in corso e chiusura senza autosave. Suite frontend: 18 test superati; build e formattazione completate. Testing Library e jsdom sono dipendenze di sviluppo, escluse dal pacchetto runtime.

Fixture grafica nel browser a 900 px: stato normale, titolo lungo, occupato e chiuso; nessun overflow orizzontale, allineamento a sinistra x=0, pulsanti disabilitati durante l'operazione.

Pacchetto macOS completato. Nell'app aggiornata il salvataggio reale è identificato come «La mia mixtape · 12 brani» e il nuovo avviso è stato controllato tramite screenshot e albero accessibile. La prova del clic nativo è stata interrotta dal rilevamento di un intervento dell'utente sulla finestra; non è stato forzato il ripristino. Il collegamento del pulsante al controller e i casi di ripristino sono coperti dai test React sopra descritti.
