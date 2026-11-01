---
id: "speed-test"
lang: "it"
title: "Misurare la velocità di lettura con un nastro da 3 kHz o 3,15 kHz"
description: "Usa un tono indipendente per calcolare l’errore costante d’intonazione senza confonderlo con wow e flutter."
primaryKeyword: "Misurare la velocità di lettura con un nastro da 3 kHz o 3,15 kHz"
secondaryKeywords: ["wow e flutter","diagnostica del trascinamento","Cassette troppo veloci o lente","NAK T-100"]
searchIntent: "evaluation"
answer: "Se tutte le note sono leggermente più acute o più basse, la piastra potrebbe girare costantemente troppo veloce o troppo lenta. Questo è l'errore di velocità. Un'intonazione che sale e scende riguarda invece wow e flutter."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100: specifiche ufficiali", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "NAK T-100: lista di controllo delle misure", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "Audacity: analisi dello spettro", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}]
related: ["playback-speed-problems", "nak-t100-practical-guide", "without-reference-tape"]
guideType: "measurement"
prerequisites: ["calibration-tapes"]
next: ["wow-flutter"]
---

Se tutte le note sono leggermente più acute o più basse, la piastra potrebbe girare costantemente troppo veloce o troppo lenta. Questo è l'**errore di velocità**. Un'intonazione che sale e scende riguarda invece [wow e flutter](../wow-flutter/).

## Occorrente

Servono una cassetta di riferimento affidabile da **3000 o 3150 Hz**, un'interfaccia con ingresso stereo di linea e NAK T-100. Basta il percorso di lettura: LINE OUT della piastra → LINE IN della scheda → computer. Un tono registrato dalla macchina da controllare non è un riferimento indipendente.

## Esegui la lettura

1. Seleziona gli ingressi fisici di linea e una frequenza supportata, uguale a quella configurata sul computer. Disattiva guadagno automatico, elaborazioni e monitoraggio dell'ingresso.
2. Inserisci il riferimento. Se esiste un controllo di velocità/pitch, mettilo nella posizione normale indicata dal manuale. Disattiva NR.
3. In NAK T-100 seleziona **Speed Wow/Flutter** con Function. Imposta **Speed Cal.** sulla frequenza scritta sulla cassetta, non su quella che osservi durante la prova.
4. Avvia PLAY. Controlla che entrambi i canali ricevano un segnale pulito senza clipping. Se c'è un selettore Source/Tape, usa Tape.
5. Lascia stabilizzare il trascinamento, poi osserva circa trenta secondi nella parte centrale del tono. Annota velocità e stabilità. È una finestra pratica di confronto, non una dichiarazione di conformità a una norma.
6. Ferma, riavvolgi e ripeti. Se il riferimento contiene materiale adatto più avanti, confronta anche quel tratto. Annota identità del nastro, canale, posizione del pitch e intervallo osservato.

## Capisci il risultato

L'errore percentuale è `(frequenza misurata / frequenza di riferimento − 1) × 100`.

Esempio ipotetico: 3015 Hz da un riferimento di 3000 Hz corrispondono a **+0,5%**, quindi lettura più veloce. A 2985 Hz il risultato è **−0,5%**. Il confronto va fatto con la tolleranza della piastra in condizioni compatibili: questi esempi non sono limiti di accettazione.

Mostra spettro di Audacity può fornire un controllo indicativo della frequenza acquisita. Risoluzione finita e media temporale non sostituiscono però un analizzatore dedicato di velocità e instabilità.

## Errori da escludere

- Un valore vicino a +5% o −4,76% suggerisce uno scambio tra riferimenti 3000/3150 Hz. Controlla l'etichetta prima di toccare il motore.
- Un valore che si muove suggerisce instabilità o interruzioni. Ripeti con un riferimento sano e segui la [diagnostica del trascinamento](../playback-speed-problems/).
- Un risultato perfetto su un tono auto-registrato non prova la velocità corretta: gli errori di incisione e lettura possono annullarsi.

Controllo finale: riferimento indipendente, frequenza corrispondente, ingresso pulito, misura ripetuta e condizioni annotate. La regolazione del motore richiede la procedura specifica del modello, non la ricerca di una vite interna non documentata.
