---
id: "channel-balance"
lang: "it"
title: "Misurare la differenza tra canale sinistro e destro prima di compensarla"
description: "Usa segnali identici per distinguere uno sbilanciamento stabile dalle scelte intenzionali di un mix stereo."
primaryKeyword: "Misurare la differenza tra canale sinistro e destro prima di compensarla"
secondaryKeywords: ["prova completa","loopback diretto della scheda","diagnostica","Un canale della cassetta è più basso"]
searchIntent: "evaluation"
answer: "Una voce centrale spostata verso un lato può indicare livelli diversi tra i canali. La musica ordinaria è un riferimento poco adatto, perché gli strumenti possono essere intenzionalmente più forti da una parte. Parti da segnali identici."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: generatore di toni", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: separare le tracce stereo", "url": "https://manual.audacityteam.org/man/splitting_and_joining_stereo_tracks.html"}, {"title": "Audacity: analisi dello spettro", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}]
related: ["quiet-channel", "loopback-round-trip", "flux-stereo-tool", "crosstalk-test"]
guideType: "measurement"
prerequisites: ["without-reference-tape"]
next: ["phase-polarity", "recording-profile"]
---

## Prepara la prova

Usa Audacity, una scheda stereo, una cassetta registrabile e i collegamenti della [prova completa](../without-reference-tape/). Genera dieci secondi di sinusoide a 1 kHz, ampiezza 0,1, identica sui due canali.

Disattiva NR ed elaborazioni. Imposta guadagni d'ingresso uguali dove possibile, ricordando che due manopole nella stessa posizione non garantiscono lo stesso guadagno reale. Registra a livello moderato, evitando clipping digitale.

## Confronta correttamente

1. Acquisisci il riascolto in WAV stereo senza normalizzare i canali.
2. Nel menu della traccia scegli **Dividi traccia stereo** e seleziona la parte centrale stabile del tono sinistro.
3. Apri **Analizza > Mostra spettro**, usa Spettro, Hann e una dimensione FFT sufficiente a distinguere il tono. Leggi il picco a 1 kHz.
4. Seleziona lo stesso intervallo a destra e ripeti senza cambiare impostazioni. Non selezionare i due canali insieme: Mostra spettro li combina.
5. Sottrai le letture in dB. Ripeti in un'altra sezione registrata e, se possibile, su una seconda cassetta.
6. Confronta il [loopback diretto della scheda](../loopback-round-trip/) se puoi cambiare temporaneamente i cavi. Senza quel riferimento, attribuisci la differenza all'intero percorso.

## Valuta una compensazione

Esempio ipotetico: −18,0 dBFS a sinistra e −19,2 dBFS a destra indicano 1,2 dB di differenza. Se il collegamento diretto mostra lo stesso scarto, compensare la registrazione correggerebbe l'acquisizione, non il nastro.

Se la differenza stabile resta dopo le verifiche, attenuare il canale più forte conserva più margine che amplificare quello debole. Fai una piccola prova e confronta musica con elementi centrali a volume di lettura simile. La correzione misurata su una macchina potrebbe non funzionare su un'altra.

## Quando non correggere

Se lo scarto cambia con la frequenza, un guadagno unico non basta: indaga risposta o allineamento. Se varia tra passaggi, controlla contatto del nastro e collegamenti intermittenti. Un canale completamente assente richiede [diagnostica](../quiet-channel/), non un grande aumento di volume.

Controllo finale: ingresso identico, analisi separata, nessuna normalizzazione, risultato ripetuto e incertezza della scheda annotata. Il profilo MixtapeForge può proporre un'attenuazione limitata quando la sua prova la sostiene; evita di incidere su ogni cassetta un errore del percorso non verificato.
