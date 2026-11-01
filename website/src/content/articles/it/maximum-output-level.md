---
id: "maximum-output-level"
lang: "it"
title: "Stimare il margine del nastro a un limite di distorsione dichiarato"
description: "Trova il livello restituito vicino a una soglia di terza armonica e applica il risultato alla musica con prudenza."
primaryKeyword: "Stimare il margine del nastro a un limite di distorsione dichiarato"
secondaryKeywords: ["controllo della distorsione","saturazione delle alte","Confrontare la sensibilità di registrazione a controlli fissi","Misurare il fruscio rispetto a un segnale registrato"]
searchIntent: "evaluation"
answer: "Il massimo livello d'uscita, o MOL, ha significato soltanto indicando frequenza, criterio di distorsione e riferimento. Descrive quanto recuperi dal nastro, non fino a dove puoi girare REC LEVEL. Un confronto comune usa la terza armonica, ma metodi pubblicati diversi non sono automaticamente equivalenti."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Anaxwaves: determinare il margine del nastro", "url": "https://www.anaxwaves.com/MixtapeNerd/Docs/DetermineHeadroom.html"}, {"title": "NAK T-100: specifiche ufficiali", "url": "https://anaxwaves.com/NAKT100/"}]
related: ["recording-sensitivity", "tape-hiss-snr", "eq-limits"]
guideType: "measurement"
prerequisites: ["distortion-test"]
next: ["high-frequency-saturation", "recording-levels"]
---

## Prima della prova

Completa il [controllo della distorsione](../distortion-test/). Servono NAK T-100, una cassetta sacrificabile e collegamenti stereo di linea, con NR spento e tipo di nastro corretto. Mantieni bassissimo l'ascolto. È un confronto avanzato: se non identifichi chiaramente la metrica dell'analizzatore, non chiamare il risultato MOL secondo quella metrica.

## Stima un margine locale

1. Scegli **400 Hz** e **HD3**. Registra un riferimento moderato e annota il ritorno L/R. Definiscilo come 0 dBr locale: dBr significa decibel relativi a quel riferimento.
2. Mantieni fissi uscita di lettura e guadagni d'ingresso della scheda. Verifica che anche i ritorni successivi più forti non arrivino al clipping.
3. Aumenta il livello inviato alla registrazione a piccoli passi documentati, incidendo brevi sezioni. Con due testine riavvolgi e riproduci; con tre usa Tape.
4. Leggi fondamentale recuperata e HD3 per ciascun canale. Smetti di aumentare alla soglia scelta o se il percorso satura. Per un criterio illustrativo di **3% HD3**, non sostituire 3% THD+N.
5. Ripeti i due passi ai lati della soglia. Se la dimensione dei passi non permette precisione maggiore, riporta un intervallo. Conserva separati i limiti L/R.
6. Esprimi il livello restituito alla soglia rispetto al riferimento registrato, indicando frequenza, nastro e metodo.

## Cosa dice il numero

Esempio ipotetico: un canale raggiunge 3% HD3 a +4 dBr e l'altro a +3 dBr. Il canale più debole suggerisce circa 3 dB di margine secondo questo metodo locale. Non equivale al MOL del produttore se flussività, bias e condizioni non coincidono.

Se satura prima la scheda, hai misurato il suo limite. Abbassa il guadagno di acquisizione e ripeti riferimento e livelli confrontati. Se già le letture basse sono dominate dal rumore, migliora il percorso prima di cercare una soglia.

## Dalla misura alla musica

Un tono costante a bassa frequenza non predice il comportamento dei piatti. Controlla separatamente la [saturazione delle alte](../high-frequency-saturation/) e conserva spazio per i picchi musicali. Ridurli può migliorare la chiarezza, ma comprimere troppo cambia la musica.

Controllo finale: frequenza dichiarata, HD3 distinta da THD+N, riferimento salvato, margine d'ingresso verificato e limite del canale più debole conservato. Le stime di MixtapeForge non vanno presentate come MOL certificato.
