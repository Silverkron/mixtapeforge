---
id: "recording-profile"
lang: "it"
title: "Creare e verificare un profilo di registrazione in MixtapeForge"
description: "Registra la sequenza guidata, acquisisci il riascolto, controlla la proposta e salva la combinazione piastra/nastro."
primaryKeyword: "Creare e verificare un profilo di registrazione in MixtapeForge"
secondaryKeywords: ["limiti dell'EQ","compatibilità con altre piastre","Usare l’EQ per migliorare una cassetta senza peggiorarne i limiti","Misurare la differenza tra canale sinistro e destro prima di compensarla"]
searchIntent: "task"
answer: "Un profilo ricorda una combinazione piastra/nastro misurata e applica una compensazione digitale limitata ai master successivi. È utile quando la stessa configurazione modifica il suono in modo ripetibile. Non separa difetti d'incisione e lettura e non rende identici tutti i lettori."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100: lista di controllo delle misure", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "REW: configurazione dell’interfaccia audio", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}]
related: ["eq-limits", "channel-balance", "frequency-response"]
guideType: "procedure"
prerequisites: ["without-reference-tape"]
next: ["different-decks", "consistent-copies"]
---

La procedura descrive **MixtapeForge prototipo 0.1**. Riproduzione e acquisizione native richiedono l'app desktop. Servono una cassetta sacrificabile, una piastra funzionante e un'interfaccia stereo con ingressi e uscite di linea.

## 1. Registra la prova dell'app

1. Collega uscite L/R della scheda a LINE IN e LINE OUT agli ingressi di linea, disabilitando il monitoraggio che rimanda l'ingresso all'uscita.
2. Apri **Calibrazione > Registra la prova**. Seleziona l'uscita verso il deck e una frequenza di progetto supportata dalla scheda. Usa **Usa frequenza del dispositivo** quando appropriato.
3. Seleziona il tipo di nastro corretto, spegni Dolby/NR e supera il tratto trasparente. Parti con volume e REC LEVEL moderati. La sequenza raggiunge **−3 dBFS peak** digitali, che non determinano da soli il livello analogico sul nastro.
4. Premi REC sulla piastra e **Avvia prova** nell'app. Dopo **3…2…1** partono circa **108 secondi** di audio di prova. Non modificare volume o REC LEVEL e attendi il marcatore finale. La sequenza non usa EQ, compressione e NR della mixtape.
5. Ferma il deck e riavvolgi prima dell'inizio. Apri **Acquisisci il riascolto**.

## 2. Acquisisci il nastro reale

Seleziona l'ingresso dalla piastra e lascia NR spento. Premi prima **Avvia acquisizione**, poi PLAY sul deck. Controlla entrambi i misuratori: se l'ingresso satura, abbassa il guadagno e riacquisisci l'intera prova. Non modificarlo durante l'acquisizione.

L'app tenta di fermarsi quando riconosce il marcatore finale; resta disponibile lo stop manuale. Salva l'acquisizione per conservare il WAV originale, poi scegli **Analizza prova**. Puoi anche importare un WAV della sequenza completa dell'app. Un brano qualsiasi o un rapporto NAK T-100 non sono quella sequenza.

## 3. Controlla e salva

Leggi gli avvisi prima dell'EQ e del bilanciamento proposti. Bande rumorose o instabili possono rimanere invariate. L'analisi descrive l'intero percorso e non certifica wow/flutter o MOL.

L'unico campo obbligatorio è il nome, già precompilato. Scegline uno riconoscibile, per esempio **“Pioneer + TDK Type I · prova ottobre”**. I dettagli facoltativi conservano piastra, nastro, collegamenti e posizioni dei comandi. Premi **Salva e usa profilo**, poi verifica **Applica alle registrazioni e all’ascolto del master**. Se è memorizzata l'identità dell'uscita, usarne un'altra può essere bloccato finché non selezioni quella misurata o disattivi il profilo.

## Verifica con la musica

Registra lo stesso estratto con profilo spento e acceso senza spostare comandi fisici. Confronta a volume simile. Esempio ipotetico: una lieve correzione rende più chiaro un nastro, ma può rendere ruvidi i piatti più forti; conservala soltanto dopo questa seconda prova.

Se la sequenza non viene riconosciuta, controlla marcatori completi, ingresso stereo corretto e assenza di normalizzazione/elaborazione. Se il risultato cambia molto tra passaggi, risolvi l'instabilità prima di salvare.

Controllo finale: marcatori completi, NR spento, controlli fissi, acquisizione pulita, avvisi letti e nuova prova musicale. Ricontrolla cambiando formulazione, porte o guadagni. Leggi i [limiti dell'EQ](../eq-limits/) e la [compatibilità con altre piastre](../different-decks/) prima di distribuire copie.
