# Interfaccia compatta — revisione del 24 ottobre 2026

## Problema osservato

Sei destinazioni principali separavano composizione, mastering e registrazione. Testate grandi, una cassetta illustrata dominante, schede ripetute e controlli avanzati sempre aperti aumentavano lo spazio da scorrere e i passaggi necessari. L’utente chiedeva una revisione completa della chiarezza e della densità dell’interfaccia.

## Struttura implementata

Due sole destinazioni principali: **Mixtape** e **Copertina**. Nella Mixtape, i due lati e il pannello di registrazione sono visibili insieme. Il titolo del progetto si modifica direttamente in alto; apri, salva, annulla e ripeti rimangono a portata di mano. Rimossi sidebar, grandi titoli introduttivi e illustrazione della cassetta nella registrazione.

```text
Cassette Maker    Mixtape | Copertina                 Apri · Salva · Strumenti
Titolo progetto                                      Annulla · Ripeti
C90 · Durate e pause · Audio · Distribuisci             Cartella · Aggiungi
┌ Lato A ─────────────────┐ ┌ Lato B ─────────────────┐ ┌ Registra sul deck ┐
│ Durata / tempo rimasto │ │ Durata / tempo rimasto │ │ A / B · Uscita    │
│ Brani                  │ │ Brani                  │ │ Prepara / Avvia  │
│ …                      │ │ …                      │ │ Meter L/R        │
│ Aggiungi al lato       │ │ Aggiungi al lato       │ │ Strumenti extra  │
└────────────────────────┘ └────────────────────────┘ └───────────────────┘
Ascolta · Ferma       Lato / stato / tempo                         Esporta WAV
```

Il pannello di registrazione mostra l’azione utile allo stato corrente: prima **Prepara lato A/B**, quindi **Avvia lato A/B** con indicazione del conto alla rovescia. Il pulsante principale è sopra i meter, visibile anche nella finestra minima. Il trasporto inferiore mantiene ascolto, arresto ed esportazione.

## Dove sono le funzioni

| Funzione | Accesso attuale |
| --- | --- |
| Importazione file/cartella | Barra della Mixtape e pulsante di ciascun lato |
| Ordine, spostamento A/B, blocco, rimozione | Righe dei brani; azioni sulla riga selezionata, al passaggio o al focus |
| Titolo, artista, tagli, fade, guadagno, pausa, silenzi, duplicazione, ricollegamento | Selezione del brano → pannello laterale |
| Formato C46–C120/personalizzato | Selettore nella barra |
| Capienza precisa, margine, leader/coda, crossfade | Durate e pause → pannello laterale |
| Distribuzione automatica | Distribuisci → anteprima e applicazione |
| Normalizzazione e limite true peak | Audio → pannello laterale |
| Compressione, espansione, modi sperimentali ed EQ | Audio → Dinamica ed equalizzazione avanzate |
| Misure del brano, passaggio più forte, loop, originale/elaborato | Audio → Ascolta e confronta un brano |
| Scelta uscita, preparazione e avvio lato | Pannello di registrazione accanto ai brani |
| Peak/VU/PPM | Meter nel pannello di registrazione |
| Spettro in tempo reale | Spettro delle frequenze, espandibile |
| Tono, ritorno ingresso, profilo deck/nastro | Prova livelli e tono |
| Campioni fuori scala, picco, true peak, attenuazione finale | Misure del master, dopo la preparazione |
| Acquisizione e confronto differito, salvataggio ritorno WAV | Confronta il ritorno dal deck, espandibile |
| Master WAV, M3U8, tracklist | Esporta WAV → finestra esportazione |
| Titolo, dedica, colore, J-card PDF/SVG | Copertina |
| Dispositivi, preferenze, progetto nuovo/demo/portabile, cache | Impostazioni → pannello laterale |
| Storico ed esportazione log | Registro operazioni → pannello laterale |

I processori e i comandi desktop esistenti vengono riutilizzati. La revisione cambia organizzazione, presentazione e stato di navigazione, senza introdurre nuovi contratti IPC o modificare il motore DSP.

## Regole di impaginazione

- La navigazione principale rappresenta gli oggetti di lavoro: mixtape e copertina. Le regolazioni sono strumenti contestuali.
- Altezza barra superiore 60 px, trasporto 56 px; nessuna testata promozionale.
- Spaziature principali 14–24 px, comandi 32–34 px, righe dei brani compatte. Campi e pulsanti mantengono nomi accessibili e focus visibile.
- Pannello di registrazione 310 px, 280 px nelle finestre più strette. Sotto 760 px passa dopo i lati.
- Pannelli laterali fino a 660 px con scorrimento interno e chiusura sempre raggiungibile. Il progetto resta visibile sullo sfondo.
- Le opzioni avanzate usano `details`/`summary`, con ordine visivo e DOM coerente.
- Testo e unità rimangono espliciti; una riduzione dello spazio non deve nascondere errori, eccedenze, stato di preparazione o clipping.
- L’app conserva la palette lavanda/ciano e gli strumenti su fondo scuro. L’illustrazione viene mantenuta nel componente riutilizzabile, ma non occupa spazio nel flusso di registrazione.

## Interazione e accessibilità

Un pannello aperto rende inerte il contenuto sottostante. Tab e Shift+Tab restano nel pannello; Escape chiude lo strato attivo e mantiene il comando di arresto audio. Una finestra di calibrazione aperta da un pannello rende inerte anche quel pannello. La chiusura restituisce il focus e riattiva lo strato precedente. La barra spaziatrice non avvia audio mentre si utilizzano pannelli, finestre o elementi `summary`.

Il cambio lato aggiorna sia la selezione nei brani sia il pannello di registrazione e invalida il master preparato. Le modifiche ai brani conservano annulla/ripeti e aggiornamento dei tempi.

## Verifiche

- TypeScript e build frontend superati; 4 test esistenti superati.
- Browser a 900 px: nessun overflow orizzontale nelle due viste o nei quattro pannelli principali; nessun campo senza etichetta nei pannelli controllati.
- Modifica pausa del primo brano demo da 1 a 4 s: durata lato A da 24 a 27 s; Annulla ripristina 24 s.
- Spostamento del primo brano da A a B: durate 11/40 s; annullamento e cambio lato aggiornano il pannello di registrazione.
- Focus confinato con Shift+Tab, chiusura con Escape e ritorno al brano selezionato verificati.
- Apertura calibrazione dal pannello Durate e pause: sfondo e pannello inferiore inerti; primo Escape torna al pannello, secondo chiude il pannello.
- Nessun errore o warning nella console del browser durante questi controlli.

La verifica browser riguarda interfaccia e stato del progetto. Il percorso audio reale resta oggetto delle verifiche native; il browser non simula riproduzione o esportazione.

### Verifica nativa macOS

- Build desktop completata e nuova app avviata dal pacchetto release.
- Progetto salvato prima del riavvio; presenza e hash dei quattro file sorgente verificati. Recupero del progetto riuscito.
- Preparazione del lato A completata: 24 s, true peak −3,0 dBTP, comando di avvio abilitato.
- Passaggio al lato B: durata 27 s, master precedente invalidato e comando di preparazione aggiornato correttamente.
- Controllo visivo della schermata Mixtape e del pannello Audio nell’app nativa: comandi principali visibili, regolazioni avanzate raccolte e nessuna sovrapposizione rilevata.

In questa revisione non è stata avviata una nuova riproduzione verso il deck. Windows e Linux non sono stati verificati localmente.
