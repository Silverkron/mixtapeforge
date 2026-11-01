---
id: "frequency-response"
lang: "it"
title: "Misurare come la cassetta cambia bassi, medi e alte"
description: "Registra toni allo stesso livello, confronta il ritorno e distingui equilibrio timbrico e saturazione."
primaryKeyword: "Misurare come la cassetta cambia bassi, medi e alte"
secondaryKeywords: ["prova di base","riferimento diretto della scheda","saturazione","EQ limitata"]
searchIntent: "evaluation"
answer: "La risposta in frequenza indica se suoni di altezze diverse ritornano con lo stesso livello relativo. Una cassetta che conserva 1 kHz ma perde 8 kHz può sembrare meno brillante. Qui misuri l'intero percorso di registrazione e lettura, non la testina di riproduzione isolata."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: generatore di toni", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: analisi dello spettro", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "NAK T-100: lista di controllo delle misure", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["loopback-round-trip", "bias-adjustment", "recording-profile"]
guideType: "measurement"
prerequisites: ["without-reference-tape"]
next: ["high-frequency-saturation", "eq-limits"]
---

## Prepara il file di prova

Servono Audacity, una scheda stereo di linea e una cassetta sacrificabile. Con **Genera > Tono** crea sinusoidi successive di cinque secondi a **100, 400, 1000, 4000, 8000 e 10000 Hz**, tutte con **ampiezza 0,1**. Separa i toni con brevi silenzi per riconoscerli e duplica la sequenza su L/R senza cambiare guadagno. Sono punti pratici di confronto, non una scansione certificata.

Configura collegamenti, NR spento ed elaborazioni disattivate come nella [prova di base](../without-reference-tape/). Tieni basso il monitoraggio: questi toni non sono materiale d'ascolto.

## Registra a un livello basso documentato

1. Con il tono a 1 kHz stabilisci un riferimento moderato sul misuratore della piastra, senza saturare la scheda.
2. Per misurare la risposta riduci il segnale generato di altri 20 dB, senza spostare guadagni fisici né REC LEVEL. In Audacity l'ampiezza **0,01** è 20 dB sotto 0,1. Annota “20 dB sotto il mio riferimento a 1 kHz”: non è una calibrazione assoluta della flussività.
3. Registra tutta la sequenza oltre il tratto iniziale trasparente, riavvolgi e acquisisci la lettura stereo senza effetti o normalizzazione.
4. Dividi L/R. Per ogni tono seleziona il centro stabile e usa **Mostra spettro** con Spettro, Hann e la stessa FFT. Leggi il picco del tono, non il rumore vicino.
5. Per ciascun canale sottrai la lettura a 1 kHz dalle altre. Ottieni la risposta relativa al riferimento centrale, mantenendo separati sinistra e destra.
6. Ripeti. Se un tono è vicino al fondo o fluttua molto, segnalo come incerto invece di applicare una grande correzione.

## Leggi l'andamento

Esempio ipotetico: 1 kHz ritorna a −35 dBFS e 8 kHz a −39 dBFS. La risposta relativa a 8 kHz è **−4 dB**. Lo scarto può comprendere scheda, registrazione, nastro, allineamento e lettura. Un [riferimento diretto della scheda](../loopback-round-trip/) aiuta a separare alcuni contributi.

Se una prova a livello maggiore perde più alte, indaga la [saturazione](../high-frequency-saturation/): aumentarle può peggiorarla. Se invece la perdita è stabile a basso livello, verifica selezione del nastro e bias prima di tentare un'[EQ limitata](../eq-limits/).

Controllo finale: livelli sorgente uguali, attenuazione documentata, controlli fissi, canali separati, riferimento a 1 kHz e ripetizione. “Piatta fino a 10 kHz” non basta senza tolleranza e livello di registrazione.
