---
id: "nak-t100-practical-guide"
lang: "it"
title: "NAK T-100: guida pratica alle misure sulla piastra a cassette"
description: "Configura NAK T-100, stabilisci un riferimento ripetibile e scegli le prove adatte alla tua piastra, al nastro e alle cassette di riferimento."
primaryKeyword: "NAK T-100"
secondaryKeywords: ["cassetta di riferimento adatta","verifica del livello di lettura","prova di risposta a toni separati","percorso dei profili di registrazione"]
searchIntent: "task"
answer: "NAK T-100 è un analizzatore audio autonomo, non un lettore di cassette né un sistema che regola automaticamente la piastra. Usa questa prima sessione per rispondere a una domanda circoscritta: la stessa configurazione produce livelli ed equilibrio timbrico stabili in registrazioni ripetute?"
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100 — presentazione e specifiche ufficiali", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "NAK T-100 — promemoria delle misure", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "NAK T-100 — domande frequenti ufficiali", "url": "https://www.anaxwaves.com/NAKT100/T100FAQ/index.html"}, {"title": "NAK T-100 — descrizione dello sviluppatore e cronologia delle versioni", "url": "https://apps.apple.com/us/app/nak-t-100-audio-analyzer/id1533153639?mt=12"}]
related: ["calibration-basics", "speed-test", "wow-flutter", "recording-profile"]
guideType: "procedure"
prerequisites: ["without-reference-tape"]
next: ["frequency-response", "wow-flutter"]
---

## Decidi che cosa vuoi scoprire

La procedura seguente è un percorso di misura originale basato sulla documentazione dello sviluppatore, non il resoconto di prove su apparecchi effettuate per questo articolo. Leggi sia la guida inclusa nella tua versione sia il manuale della piastra. Il promemoria collegato serve agli utenti esperti e non sostituisce nessuno dei due manuali.

## Cosa preparare

Servono NAK T-100, un'interfaccia stereo con ingressi e uscite di linea, cavi compatibili e una cassetta sacrificabile per le registrazioni. Per velocità o allineamento indipendenti aggiungi la [cassetta di riferimento adatta](../calibration-tapes/). Con tre testine puoi misurare il ritorno appena inciso; con due devi registrare, riavvolgere e riprodurre.

Un **riferimento relativo** è una lettura conservata come punto di confronto. Diventa utile quando puoi ripeterla con gli stessi controlli; non è automaticamente un riferimento magnetico o di tensione calibrato.

## Installa il programma e definisci il percorso audio

Segui i collegamenti agli store ufficiali per il tuo sistema operativo. Le FAQ descrivono licenze perpetue a pagamento per Windows e macOS, da acquistare separatamente; controlla lo store pertinente per la disponibilità attuale. Non è prevista una versione nativa per Linux.

Per le prove di registrazione, collega **uscita dell’interfaccia → LINE IN della piastra** e **LINE OUT della piastra → ingresso linea dell’interfaccia**. Seleziona la coppia stereo desiderata a entrambe le estremità. Se necessario, usa le funzioni di assegnazione dei canali della versione installata o il software di instradamento dell’interfaccia. Non usare un percorso soltanto microfonico con guadagno automatico.

Scegli una frequenza di campionamento comune supportata da ingresso e uscita. Se disponibili, usa 48 o 96 kHz per esaminare la parte alta della banda audio; un’impostazione superiore non compensa un percorso analogico scadente. Disattiva miglioramenti, EQ, controllo automatico del livello e qualsiasi monitoraggio involontario dall’ingresso all’uscita. Tieni basso il volume dei toni di prova in diffusori o cuffie.

## Stabilisci i livelli prima di cercare guasti

Inizia con la riduzione del rumore disattivata e l’impostazione corretta per il tipo di nastro. Salva una foto dei controlli e annota i guadagni dell’interfaccia. Se disponibile, usa il monitoraggio della sorgente della piastra: permette di controllare il percorso elettrico prima di aggiungere il nastro. Non dimostra che il percorso su nastro sia calibrato.

In modalità **Basic**, individua **Function**, **OSC** e la visualizzazione del livello. Inizia con **Level** e un riferimento stabile a **400 Hz**, mantenendo bassa l’uscita. Aumentala gradualmente fino a una lettura ragionevole indicata per la tua piastra, controllando che l’ingresso dell’interfaccia non vada in clipping. Non copiare le posizioni delle manopole di un altro apparecchio e non presumere che lo zero di ogni strumento significhi la stessa cosa.

In particolare, il riferimento di tensione calibrato di NAK T-100, lo 0 VU della piastra e lo 0 dBFS sono riferimenti diversi. La scala di tensione richiede una calibrazione esterna in tensione prima di poterla usare come voltmetro assoluto. Per questa prima sessione basta un riferimento relativo ben documentato; per quello assoluto segui la [verifica del livello di lettura](../playback-level/).

## Controlla separatamente l’interfaccia quando serve

Se puoi collegare temporaneamente l’uscita dell’interfaccia direttamente al suo ingresso linea, misura prima questo **loopback**. Parti con un’uscita ridotta e un ingresso linea capace di accettarla. Così individui i limiti della coppia di ingresso e uscita prima di inserire la piastra. Se mantieni il cablaggio esistente, annota che non hai misurato un riferimento indipendente dell’interfaccia.

La procedura facoltativa **Sound Card FR Compensation** è documentata come compensazione della visualizzazione. Non invia un’EQ correttiva alla piastra, non stabilisce una calibrazione assoluta in tensione e non diventa un profilo di registrazione su cassetta. Ricontrollala dopo aver cambiato le porte, la frequenza di campionamento o la configurazione dei guadagni a cui si riferisce.

## La prima sessione, in ordine

1. Seleziona la coppia fisica stereo d'ingresso/uscita e allinea la frequenza nel sistema operativo o nel pannello della scheda. Parti con uscita bassa.
2. Seleziona tipo di nastro corretto e NR spento. In Basic scegli Function **Level** e OSC **400 Hz**.
3. Osservando il misuratore della sorgente/ingresso sul deck, alza gradualmente fino a un riferimento moderato. Annota la lettura e mantieni l'acquisizione sotto il clipping. Lo zero dell'analizzatore non equivale necessariamente allo zero del deck.
4. Supera il tratto trasparente, premi REC e registra circa dieci secondi, senza cambiare i guadagni.
5. Con due testine ferma, riavvolgi e premi PLAY; con tre seleziona Tape. Leggi il centro stabile su L/R e annota i numeri.
6. Ripeti senza regolazioni. Se i livelli cambiano sensibilmente, indaga nastro, collegamenti e acquisizione prima della risposta in frequenza.

Confronta la parte centrale stabile del passaggio, non l’inizio o la fine. Annota le letture sinistra e destra, ripeti una volta senza cambiare i controlli e riascolta. Un risultato variabile va indagato prima di correggerlo. La lettura di ritorno combina gli errori dell’interfaccia, della registrazione e della riproduzione; da sola non identifica lo stadio responsabile della differenza.

## Esplora la risposta in frequenza a livello controllato

Apri **Scope** e individua i controlli della risposta in frequenza. Per un primo confronto, usa **FR White** o **FR Sweep** con un livello di registrazione deliberatamente ridotto, verificando il livello effettivo sulla piastra. L’indicazione **−20 dB** ha senso solo documentandone il riferimento. Un selettore della portata dello strumento non riduce necessariamente il segnale generato.

Registra un passaggio completo e ripetilo nelle stesse condizioni. **FR Sweep è documentato come asincrono**: su una piastra a due testine registra la prova, ferma, riavvolgi e riproduci attraverso l’analizzatore con la misura FR corrispondente selezionata. Segui la guida integrata per i dettagli di acquisizione; non serve presumere un controllo esterno di sincronizzazione dello sweep.

Valuta le differenze stabili tra canali e l’andamento generale prima delle piccole ondulazioni. Una seconda prova a livello più alto può evidenziare la saturazione degli acuti, ma risponde a una domanda diversa. Tieni separata la sua traccia, senza fondere i risultati in un’unica curva di risposta. Senza un nastro di riferimento per la riproduzione, il risultato descrive l’intera catena di registrazione e riproduzione.

Per un'alternativa riproducibile con creazione dei toni e passaggi di analisi espliciti, segui la [prova di risposta a toni separati](../frequency-response/). Per i controlli di acquisizione di FR Sweep usa la guida della versione installata: questa sezione ne spiega la funzione, senza sostituire l'intera procedura.

## Aggiungi velocità e wow/flutter solo con il riferimento adatto

Per un controllo indipendente della velocità di riproduzione, usa una **cassetta di riferimento affidabile a 3000 Hz o 3150 Hz**, seleziona **Speed Wow/Flutter** e imposta **Speed Cal.** in accordo con quella cassetta. Un tono registrato sulla stessa macchina non può determinarne la velocità assoluta di riproduzione.

Come esempio di calcolo, un riferimento a 3000 Hz letto a 3015 Hz corrisponde a circa **+0,5%**: `(3015 / 3000 − 1) × 100`. Sono numeri illustrativi, non risultati ottenuti misurando una piastra.

Annota il rivelatore e la ponderazione del wow/flutter insieme a ogni valore. **Q-PK** e **WRMS** seguono convenzioni di misura diverse e non vanno confrontati come numeri intercambiabili. Le prove autoregistrate possono verificare la ripetibilità, ma includono i contributi del trascinamento in registrazione e in riproduzione. Un picco isolato può anche dipendere da un dropout o da un problema di acquisizione del computer; ripeti il passaggio prima di diagnosticare il meccanismo.

## Rendi confrontabili le letture di distorsione e rumore

Per la distorsione, esamina la funzione documentata **T.H.Dist.** con una fondamentale nota e un livello di registrazione fisso. Indica separatamente **THD+N** e **HD3**: non sono equivalenti. Se la lettura aumenta, verifica che l’interfaccia e l’ingresso della piastra non siano in sovraccarico prima di attribuirlo al nastro.

Per il rumore seleziona **Noise-A (−40 dB)** e misura un tratto di silenzio registrato, verificando che al nastro non arrivi alcun tono di prova. Usa il monitor Tape durante la registrazione su un deck a tre testine; su uno a due testine registra il silenzio e poi riascoltalo. Mantieni invariati i guadagni. Nella convenzione della checklist collegata, sottrai **40 dB** alla lettura della scala dB e altri **20 dB** se Meter Range è su **−20 dB/0.1%**. Conferma queste correzioni nella guida della tua versione prima di riportare il valore. Annota riferimento e ponderazione: il livello di rumore corretto non è ancora un numero S/N positivo. Come esempio relativo ipotetico, un riferimento a 0 dBr e un rumore corretto a −55 dBr danno 55 dB di separazione con le stesse convenzioni, non una specifica universale della piastra.

## Conserva prove utili per la prossima sessione

Se registri separatamente il ritorno con un registratore audio, conserva il file stereo senza elaborazioni. Riunisci schermate, versione del software, identità del nastro e posizioni dei controlli. Descrivi ogni valore con il livello e il metodo usati: “0,08%” senza un rivelatore o “piatta fino a 18 kHz” senza un livello di registrazione sono indicazioni incomplete.

Non girare viti delle testine, bias o trimmer di servizio solo per raddrizzare un grafico. La taratura interna segue la procedura di assistenza del modello e richiede strumenti di riferimento adatti. NAK T-100 misura; non regola fisicamente la piastra.

Il [percorso dei profili di registrazione](../recording-profile/) di MixtapeForge è separato. Non è documentata un’importazione automatica delle misure di NAK T-100 nei suoi profili. Usa il test guidato di MixtapeForge per ottenere un profilo riutilizzabile nell’app e le osservazioni dell’analizzatore per capire la catena, senza promettere una correzione automatica per ogni lettore.

## Se la prima prova non riesce

| Sintomo | Cosa verificare | Azione successiva |
| --- | --- | --- |
| Misuratori immobili | LINE IN fisico e coppia corrispondente ai cavi | Correggi l'instradamento prima di aumentare |
| Tono leggibile ma onda tagliata | Modalità linea e portata d'ingresso | Riduci il guadagno e ripeti il riferimento |
| Alte diverse a ogni passaggio | Contatto del nastro, sezione e interruzioni digitali | Prova un altro nastro sano prima dell'EQ |
| Velocità fuori dal campo previsto | Riferimento 3000/3150 Hz e Speed Cal. corrispondente | Correggi la selezione, non il motore |
| Rumore implausibile | Noise-A, Meter Range e scarti della scala | Ricalcola mantenendo lo stesso riferimento |

Controllo finale: linee fisiche, guadagni fissi, distinzione Source/Tape, lettura completa, metrica e riferimento dichiarati, prove originali conservate. Le procedure sono state verificate sulla documentazione, non collaudate sul tuo hardware.
