---
id: "recording-sensitivity"
lang: "it"
title: "Confrontare la sensibilità di registrazione a controlli fissi"
description: "Misura quanto restituiscono nastri diversi dallo stesso segnale, distinguendo livello e timbro."
primaryKeyword: "Confrontare la sensibilità di registrazione a controlli fissi"
secondaryKeywords: ["riferimento corretto","bilanciamento","profilo di registrazione","Verificare il livello di lettura con un riferimento magnetico noto"]
searchIntent: "evaluation"
answer: "La sensibilità di registrazione descrive quanto segnale restituisce un nastro a un ingresso di registrazione specificato. Due cassette possono suonare a volume diverso anche senza cambiare sorgente o REC LEVEL. È importante per confrontare livelli e usare riduzioni del rumore dipendenti dal livello."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: generatore di toni", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: analisi dello spettro", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "NAK T-100: lista di controllo delle misure", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["playback-level", "channel-balance", "tape-hiss-snr"]
guideType: "measurement"
prerequisites: ["without-reference-tape"]
next: ["bias-adjustment", "recording-profile"]
---

## Scegli il confronto

Per confrontare due nastri sulla stessa piastra mantieni controlli e prova uguali. Per una regolazione assoluta di servizio occorre prima verificare la lettura con il [riferimento corretto](../playback-level/). Una prova completa su macchina non tarata permette un confronto relativo, non certifica lo stadio di registrazione.

Servono scheda stereo, Audacity e due nastri utilizzabili. Collega uscita → LINE IN e LINE OUT → ingresso. Spegni NR ed elaborazioni. Seleziona il tipo corretto per ciascuna cassetta e annotalo.

## Confronta in condizioni controllate

1. Genera dieci secondi di **sinusoide a 400 Hz**, ampiezza **0,1**, identica su L/R. Scegli un livello moderato documentato, senza clipping digitale.
2. Registra il nastro A oltre il tratto iniziale. Riavvolgi e acquisisci senza modificare guadagni o uscita del deck.
3. Registra B con la stessa sorgente e REC LEVEL. Se la piastra esegue autocalibrazione, decidi se confrontare nastri calibrati o una configurazione fissa e mantieni coerente quella scelta.
4. Dividi le acquisizioni in L/R e misura il picco stabile a 400 Hz con le stesse impostazioni di Mostra spettro, un canale alla volta.
5. Sottrai il livello restituito da A a quello di B, per ciascun canale. Ripeti una sezione su entrambi per verificarne la stabilità.
6. Conserva le letture prima di uniformare il volume. Fallo soltanto su copie destinate al confronto timbrico d'ascolto.

## Leggi un risultato

Esempio ipotetico: A restituisce −20 dBFS e B −18,5 dBFS sullo stesso canale. B è **1,5 dB più sensibile in questa prova**. Non significa che tolleri 1,5 dB in più, abbia meno rumore o suoni più brillante: sono proprietà separate.

Se i canali non concordano, esamina il [bilanciamento](../channel-balance/) prima di compensare tutto insieme. Se lo scarto cambia ogni volta, prova un'altra sezione e controlla guadagno d'ingresso e contatto del nastro.

Controllo finale: sorgente identica, tipo/autocalibrazione documentati, guadagni fissi, canali separati e nessuna normalizzazione prima della misura. Usa il risultato per capire la combinazione, poi salva le condizioni nel [profilo di registrazione](../recording-profile/).
