---
id: "hum-buzz"
lang: "it"
title: "Ronzii registrando cassette: segui il percorso del segnale"
description: "Individua sorgente, cavi, scheda o piastra prima di filtrare il rumore."
primaryKeyword: "Ronzii registrando cassette"
secondaryKeywords: ["fruscio del nastro","loopback","Misurare il fruscio rispetto a un segnale registrato","Come registrare una cassetta dal computer"]
searchIntent: "diagnosis"
answer: "Il ronzio è un suono basso continuo; un disturbo più aspro può aggiungere armoniche. È diverso dal «sssh» del fruscio del nastro: può provenire da interferenze elettriche o collegamenti. Meglio eliminarlo prima di registrare che filtrarlo sulla cassetta finita."
category: "troubleshooting"
image: "portable"
updated: "2026-11-01"
sources: [{"title": "Focusrite · Ronzio e rumore", "url": "https://support.focusrite.com/hc/en-gb/articles/211615185-Why-is-there-unwanted-hum-noise-in-my-monitors"}, {"title": "Sony · ICD-PX470", "url": "https://helpguide.sony.net/icd/p47/v1/en2/contents/TP0001155787.html"}]

guideType: "troubleshooting"
prerequisites: []
next: ["loopback-round-trip"]
related: ["tape-hiss-snr", "recording-computer", "quiet-channel"]
---

Il ronzio è un suono basso continuo; un disturbo più aspro può aggiungere armoniche. È diverso dal «sssh» del [fruscio del nastro](../tape-hiss-snr/): può provenire da interferenze elettriche o collegamenti. Meglio eliminarlo prima di registrare che filtrarlo sulla cassetta finita.

## Trova il punto d'ingresso

Servono cuffie e un cavo audio corto sicuramente sano. Abbassa l'ascolto e ferma prima di cambiare collegamenti. Non eliminare la terra di protezione né modificare spine elettriche.

1. Ascolta la sorgente dalla scheda con i cavi audio della piastra scollegati. Se il rumore resta, controlla prima computer e interfaccia.
2. Collega solo l'uscita necessaria a registrare: uscite linea della scheda a LINE IN della piastra. Lascia scollegato il ritorno LINE OUT per questa prova.
3. Se compare ronzio, allontana i cavi dagli alimentatori e prova il cavo sano. Riascolta senza cambiare guadagno.
4. Con un portatile, prova brevemente a batteria scollegando normalmente il caricatore. Un miglioramento suggerisce un contributo di alimentazione/collegamenti, non dimostra quale componente sia difettoso.
5. Ricollega il ritorno solo se necessario. Se aggiungerlo crea ronzio, può formarsi un **anello di massa**, un percorso elettrico indesiderato tra dispositivi. Verifica il cablaggio e valuta un isolatore adatto a segnali linea se necessario.

## Interpreta con attenzione

Un'uscita bilanciata collegata a RCA sbilanciati non crea una connessione interamente bilanciata semplicemente cambiando cavo. Usa il cablaggio previsto dai produttori. La [guida Focusrite](https://support.focusrite.com/hc/en-gb/articles/211615185-Why-is-there-unwanted-hum-noise-in-my-monitors) spiega questi effetti.

Se la piastra ronza nelle proprie cuffie senza audio esterno, oppure il disturbo è già inciso, sono problemi distinti. Dolby non sostituisce la diagnosi elettrica. Dopo una modifica ripeti la breve registrazione e confronta le pause a guadagno uguale; il [loopback](../loopback-round-trip/) aiuta a definire il fondo della scheda.
