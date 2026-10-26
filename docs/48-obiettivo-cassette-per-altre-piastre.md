# Obiettivo: qualità del nastro e compatibilità tra piastre

## Criterio di successo

Il profilo deve migliorare ciò che viene inciso sul nastro per un riascolto su altre piastre correttamente allineate, con equalizzazione di riproduzione e NR appropriati. Non basta rendere più piatta la risposta registrata e riascoltata sulla stessa Pioneer. Nessun profilo può garantire un buon risultato su qualunque lettore difettoso o diversamente allineato.

Questo requisito precisa e prevale sull'obiettivo iniziale del documento 47. Il profilo v1 già creato rimane una compensazione provvisoria della catena completa, non una misura isolata della registrazione e non una validazione della compatibilità su altre piastre. Non è stato disattivato né modificato implicitamente.

## Limite della prova attuale

Il ritorno acquisito contiene uscita della scheda, registrazione sul nastro, riproduzione della Pioneer e ingresso della scheda. Da una sola acquisizione di una prova autoregistrata non si possono separare univocamente questi contributi.

Esempio ipotetico: se il calo di 3 dB a 8 kHz fosse interamente nella riproduzione della Pioneer, un boost di registrazione di 3 dB farebbe apparire corretta la stessa Pioneer ma inciderebbe una cassetta troppo brillante per una piastra di riferimento. Il bilanciamento misurato può essere analogamente influenzato dalla catena di acquisizione. I dati attuali non stabiliscono quale sia la causa reale.

## Misure aggiuntive necessarie

1. Caratterizzare la riproduzione della Pioneer con una cassetta campione di risposta e livelli noti, acquisita mantenendo invariati ingresso e guadagni. Una cassetta autoregistrata con la stessa piastra non costituisce un riferimento indipendente.
2. Ripetere la prova sul nastro da usare e rapportarla alla misura di riferimento. Per la risposta relativa e a parità di catena, ciò permette di ricavare una stima della parte uscita–registrazione–nastro, escludendo il contributo comune riproduzione–ingresso. La correzione in dB vale come approssimazione nel regime lineare; non separa saturazione o altri fenomeni non lineari. Non è una calibrazione assoluta del flusso magnetico.
3. Estendere il protocollo a frequenze alte e più livelli, per scegliere margine e boost sostenibili dal nastro. L'attuale scala a 315 Hz non determina la saturazione delle alte o un livello ottimale universale per la musica.
4. Confermare con un passaggio musicale e, se disponibile, una seconda piastra nota e correttamente allineata. Una seconda piastra non caratterizzata è un controllo pratico di trasferibilità, non un riferimento certificato.

Un loop elettrico della scheda può aiutare a diagnosticare la catena audio. Non sostituisce il riferimento magnetico per la riproduzione della piastra.

## Regole del futuro profilo

- Separare nel modello i riferimenti di riproduzione e il profilo di registrazione del nastro, mantenendo provenienza e condizioni delle misure.
- Conservare esplicitamente lo stato provvisorio quando manca un riferimento indipendente; non presentare il ritorno sulla stessa piastra come prova di compatibilità generale.
- Compensare soltanto ciò che è sostenuto dalle misure; mantenere il margine dopo EQ ed evitare recuperi aggressivi delle alte che aumentino saturazione e distorsione.
- La correzione digitale non ripara azimuth, usura delle testine, trascinamento o bias fisico. Un problema di allineamento richiede una procedura sulla piastra, non una curva inversa automatica.
- Per Dolby B verificare separatamente riferimento e tracking. Una curva ottenuta con NR disattivato non certifica la compatibilità con decoder Dolby B di altri deck.

## Stato

Obiettivo e limiti chiariti; profilo v1 di anello completo implementato e salvato. Il profilo di sola registrazione e il protocollo esteso non sono ancora implementati. Per separare sperimentalmente registrazione e riproduzione manca una misura con riferimento indipendente.

## Riferimenti tecnici

- [Manuale tecnico TEAC/TASCAM 122MKIII, 112RMKII e 112MKII](https://tile.loc.gov/storage-services/master/mbrs/recording_preservation/manuals/Tascam%20TEAC%20122MKIII-112RMKII-112MKII%20Stereo%20Cassette%20Deck.pdf): procedure distinte per riproduzione, nastri campione, azimuth e registrazione.
- [Manuale utente TASCAM 112MKII/122MKIII](https://www.tascam.eu/en/docs/112mkII_122mkIII_manual.pdf): differenze di sensibilità e bias tra nastri e calibrazione dei livelli di registrazione.

## Percorso pratico senza cassetta campione

Con l'attrezzatura disponibile l'obiettivo diventa ridurre il rischio di peggioramento e stimare una compensazione prudente; resta impossibile attribuire univocamente la risposta assoluta a registrazione o riproduzione. Ripetere una misura migliora la conoscenza della sua variabilità, non elimina l'errore sistematico comune.

Percorso proposto, non ancora implementato nel profilo v1:

1. Loop elettrico uscita–ingresso della scheda, senza piastra, per individuare anomalie di acquisizione e sbilanciamenti elettronici prima di attribuirli al nastro. Non separa registrazione e riproduzione della piastra.
2. Registrare toni a più frequenze e più livelli, mantenendo fissi i guadagni di acquisizione. Confrontare le risposte normalizzate al riferimento e la distorsione per cercare il livello oltre il quale le alte peggiorano. Non scegliere il livello più basso a prescindere: si perde rapporto segnale/rumore.
3. Ripetere la sequenza in posizioni diverse del nastro e riportare dispersione e stabilità di ogni banda. Un'anomalia non ripetibile non va trasformata in una correzione permanente.
4. Proporre un profilo prudente: correzione parziale, per esempio metà dell'inverso misurato con limite ±1,5 dB, nessun recupero a 16 kHz e nessun boost automatico dei bassi profondi. Sono limiti progettuali di cautela, non valori standard né una garanzia matematica di trasferibilità.
5. Confermare con passaggi musicali rappresentativi della cassetta, valutando saturazione e rumore. Se disponibile in futuro, il confronto su un altro lettore aggiunge un controllo pratico indipendente, pur senza trasformarlo automaticamente in riferimento calibrato.

Per la prova utente, il boost attuale di +3 dB a 8 kHz non dimostra che manchino 3 dB nel contenuto inciso. Una proposta prudente lo ridurrebbe indicativamente a +1/+1,5 dB e lascerebbe invariati i 16 kHz. Lo sbilanciamento di circa 0,5 dB non giustifica una correzione incisiva senza prima verificare la catena elettronica. Il profilo attivo non è stato modificato da questa nota.

## Vincolo operativo: una sola prova, collegamenti invariati

L'utente non vuole esami manuali aggiuntivi e manterrà gli ingressi e le uscite della scheda. Il loop elettrico e qualsiasi ripatch diventano esclusi dal percorso ordinario, non prerequisiti del profilo.

Il percorso previsto è una sola sequenza automatica estesa, indicativamente 90–120 secondi, contenente frequenze e livelli diversi, silenzi e ripetizioni interne sufficienti a valutare stabilità e affidabilità. La durata precisa va stabilita con il nuovo protocollo e verificata entro il limite di acquisizione esistente. Nessuna regolazione di guadagno richiesta durante la sequenza: varia il segnale digitale generato, restano fissi volume d'uscita, REC LEVEL e guadagno d'ingresso.

Azioni manuali previste: mettere la piastra in REC e avviare la prova nell'app; al termine fermare e riavvolgere; avviare l'acquisizione nell'app e premere PLAY sulla piastra. L'app riconosce la fine, chiude l'acquisizione e calcola la proposta. I comandi del deck restano fisici; il conto alla rovescia precede l'audio. La conferma del nome/condizioni e il salvataggio del profilo restano espliciti.

Nessun collegamento diretto della scheda, nessuna registrazione separata per ciascun tono, nessun cambio di porta e nessuna seconda registrazione obbligatoria per creare il profilo. Un confronto musicale rimane una verifica facoltativa raccomandata, non un blocco nel flusso.

Con questo vincolo, la correzione rimane prudente e riferita alla catena completa: i dati non separano registrazione e riproduzione e non certificano la compatibilità con altre piastre. L'app deve dichiarare questa incertezza senza chiedere esami aggiuntivi a ogni utilizzo.

Stato: requisito progettuale aggiornato. Il protocollo esteso e il calcolo del margine sulle alte non sono ancora implementati; il protocollo attuale resta di 49 secondi.

## Aggiornamento implementativo · 25 ottobre 2026

Il protocollo esteso e il profilo prudente v2 sono ora implementati: [specifica e verifiche](49-prova-automatica-estesa.md). Le sezioni precedenti conservano la motivazione e lo stato iniziale. Restano necessari un riferimento indipendente per isolare la registrazione e una nuova prova fisica per creare il profilo v2; il profilo v1 attivo non viene sovrascritto.
