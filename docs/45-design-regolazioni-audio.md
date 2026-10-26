# Regolazioni audio — navigazione e gerarchia

## Struttura

Pannello desktop fino a 1.000 px, unica area di scorrimento. Navigazione laterale
174 px con stato di ogni modulo; a larghezze inferiori a 720 px diventa griglia
su due righe. Sidebar sticky, controlli visibili uno alla volta, campi con
etichette e unità, titoli 22 px, testo di supporto 13 px. Palette esistente
blu scuro/lilla/ciano, con variabili di tema anche per la vista chiara.

- **Livello**: normalizzazione con etichette descrittive, limite true peak e target
  solo quando pertinenti. Frequenza del master dentro opzioni secondarie.
- **Equalizzatore**: bypass che conserva le bande, preset musicali esistenti,
  curva e dieci cursori direttamente accessibili. Cinque per riga su finestre strette.
- **Dinamica**: bypass o scelta del processore, soglia/rapporto principali;
  attacco/rilascio/knee/makeup in opzioni avanzate. Scorciatoie esplicite
  «Conserva originale», «Compressione leggera», «Compressione media».
- **Plugin**: ricerca/caricamento VST3, parametri, bypass e coda già esistenti.
- **Nastro e NR**: codifica, riferimento, istruzioni registrazione/riproduzione;
  conversione 70/120 µs secondaria. Nessuna codifica implicitamente attivata.
- **Ascolto**: selezione brano, analisi, passaggio peak/RMS, loop, originale/master.

Le scorciatoie compressore sono punti di partenza UI, non nuove modalità DSP:
leggera = soglia −18 dBFS, rapporto 1,5:1, attacco 30 ms, rilascio 250 ms,
knee 6 dB, makeup 0; media = −18 dBFS, 2,5:1, 20 ms, 200 ms, 6 dB, 0.
La scelta aggiorna il progetto solo su clic; ingresso in una scheda non cambia
parametri. Sono conservate tutte le opzioni e i valori dei progetti precedenti.

## Accessibilità e conservazione dei dati

Navigazione con tablist/tabpanel, stato selezionato e focus visibile; frecce,
Home/End, tab stop sul solo elemento selezionato. Finestra modale con focus trap
esistente. Nessun suono automatico. Controlli DSP bloccati durante playback,
preparazione e acquisizione; navigazione consultabile.

Le modifiche usano il percorso di commit/undo/autosave esistente. Durante QA
nativo è emerso che l'updater differito di undo leggeva il ref al progetto dopo
l'assegnazione del nuovo stato. Il commit ora acquisisce il precedente stato
prima di accodare l'updater; test su edit/undo/redo con rapporto di calibrazione.
La proposta EQ viene applicata esplicitamente, sostituisce le bande e resta
annullabile. Nessun preset utente sovrascritto solo per visualizzarlo.

## Revisione: rack unico al posto delle sei schede

Il feedback d’uso ha evidenziato che le sei schede rendevano più difficile lavorare sul suono. Questa revisione sostituisce la navigazione laterale con un pannello unico:

- Equalizzatore sempre visibile in apertura, con attivazione, preset, curva e dieci bande sulla stessa riga.
- Livello dei brani e compressione affiancati su desktop, impilati nelle finestre strette.
- Nastro e NR, plugin VST3 e confronto d’ascolto in sezioni espandibili; NR aperto inizialmente quando attivo.
- Spiegazioni EQ e opzioni meno frequenti raccolte nelle sezioni di approfondimento.
- Un solo contenitore di scorrimento; nessun cambio pagina per i controlli principali.

Restano invariati valori, preset DSP, limiti, blocco durante elaborazione e modalità di preparazione del master. Il test del pannello verifica ora la presenza simultanea dei controlli principali e la conservazione del riferimento NR durante le modifiche EQ. Verifica browser a 1200 e 640 px, senza overflow orizzontale e con dieci bande allineate.

### Controlli macOS: select e pulsanti

Rimosso l’aspetto nativo del controllo chiuso delle select (`appearance: none`, incluso prefisso WebKit), mantenendo menu di opzioni, semantica e tastiera nativi. La freccia è un singolo SVG con spazio riservato a destra e colore distinto per tema chiaro/scuro. Tutte le select dell’app condividono questa regola; il selettore del meter mantiene la propria dimensione compatta.

Nel rack, select e campi numerici hanno altezza 36 px. I pulsanti hanno bordi, padding e tipografia uniformi, senza ombre sovrapposte. I preset della compressione sono tre pulsanti della stessa larghezza; `aria-pressed` riflette l’intero preset, non solo il rapporto. La modifica manuale dei parametri rimuove quindi l’evidenziazione del preset quando non corrisponde più.
