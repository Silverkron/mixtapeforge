> Layout superato dalla [revisione player classico](23-player-classico.md).

# Un solo trasporto, display stabile

Revisione del 24 ottobre 2026. L’avvio non deve aggiungere nuovi gruppi di comandi alla pagina.

## Struttura

- Trasporto fisso in basso, disponibile anche dalla Copertina: Prepara (diventa Ascolta quando il master è pronto), Al deck, Stop.
- Ascolta avvia subito dall’inizio. Al deck mantiene il conto alla rovescia di tre secondi, dopo che l’utente ha premuto REC sulla piastra. Stop resta nello stesso posto, attivo durante uscita e countdown; Esc interrompe, Spazio durante countdown annulla.
- Nessuna Pausa dichiarata: il motore attuale offre avvio e arresto, e un nuovo ascolto ricomincia dall’inizio.
- Il pannello Deck mostra lato, tempo, durata, meter e spettro. Il countdown occupa lo stesso display del tempo.
- Uscita audio, prova livelli, ricalcolo, misure e confronto del ritorno sono in «Configurazione e dettagli», chiusa inizialmente e aperta su richiesta. I controlli di acquisizione restano disponibili anche durante il playback.
- Esporta WAV è accanto alla compilazione, fuori dal trasporto.
- Restano visibili gli avvisi che richiedono un’azione: lato troppo lungo, clipping, Type B e interruzioni audio.

## Verifiche

Build frontend e macOS; 12 test frontend passati. Schermata principale controllata visivamente a 900 px. Fixture `test-results/player-states.html`: quattro stati simulati (fermo, pronto, countdown, in uscita), identica altezza del pannello 538,5 px e nessun nuovo pulsante visibile. I valori simulati servono soltanto alla verifica UI, non certificano l’audio nativo.

La palette blu notte, lavanda e ciano e il riordino stabile delle playlist restano i riferimenti correnti.
