---
id: "wow-flutter"
lang: "it"
title: "Come misurare wow e flutter su una piastra a cassette"
description: "Acquisisci un tono di riferimento, scegli il rivelatore corretto e descrivi l’instabilità in modo confrontabile."
primaryKeyword: "Come misurare wow e flutter su una piastra a cassette"
secondaryKeywords: ["velocità media","problemi di velocità","Scegliere la cassetta di taratura giusta per ogni misura","NAK T-100"]
searchIntent: "evaluation"
answer: "Il wow è un'oscillazione lenta dell'intonazione; il flutter è una variazione più rapida che può rendere ruvido un suono prolungato. Entrambi dipendono da variazioni di velocità. Un errore costante può rendere la musica più acuta senza produrre molto wow/flutter: misurali separatamente."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100: specifiche ufficiali", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "NAK T-100: lista di controllo delle misure", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["calibration-tapes", "nak-t100-practical-guide", "different-decks"]
guideType: "measurement"
prerequisites: ["speed-test"]
next: ["playback-speed-problems"]
---

## Strumenti e preparazione

Usa NAK T-100, una scheda con ingressi di linea e una **cassetta documentata da 3000 o 3150 Hz per velocità e wow/flutter**. La sua instabilità residua deve essere sufficientemente bassa per la macchina da valutare. Collega LINE OUT L/R a LINE IN L/R, seleziona gli ingressi fisici e disattiva elaborazioni e guadagno automatico.

Controlla prima la [velocità media](../speed-test/). Tieni basso l'ascolto: il tono è continuo e acuto.

## Usa un metodo coerente

1. In NAK T-100 scegli **Speed Wow/Flutter** e abbina **Speed Cal.** al riferimento.
2. Riproduci un tratto stabile e regola il guadagno d'ingresso per un segnale leggibile senza clipping. Sul selettore di monitoraggio del deck scegli Tape.
3. Seleziona il rivelatore corrispondente alla specifica da confrontare. Il produttore indica **Q-PK** con DIN 45507, **WRMS** con JIS e modalità peak/RMS non ponderate. La ponderazione dà peso diverso alle velocità di oscillazione; il rivelatore stabilisce come riassumerle in un valore.
4. Osserva circa trenta secondi dopo l'avvio. Annota rivelatore, ponderazione, portata e durata insieme alla percentuale. Se la lettura raggiunge il fondo scala, cambia Meter Range prima di riportarla.
5. Ripeti lo stesso passaggio e un'altra sezione adatta. Distingui un picco isolato dal comportamento abituale, senza scegliere soltanto il numero migliore.
6. Conserva l'acquisizione originale del tono se il registratore lo permette. Per l'assistenza, affianca al numero grafico o osservazioni ripetute.

## Confronta risultati compatibili

Esempio ipotetico: **0,08% WRMS** e **0,15% Q-PK** possono descrivere la stessa meccanica con metodi differenti. Il valore maggiore non dimostra che la seconda misura abbia trovato un difetto peggiore. Confronta rivelatore, ponderazione, nastro e durata equivalenti.

Un tono auto-registrato rivela problemi di ripetibilità, ma somma i contributi del trascinamento durante registrazione e lettura. Non isola la lettura come un riferimento indipendente.

## Se compaiono salti

Un picco può derivare da una sezione danneggiata, contatto instabile, disturbo meccanico o perdita di dati nell'acquisizione. Ripeti il tratto: se il salto torna nello stesso punto del nastro, indaga prima quel tratto; se compaiono vuoti digitali casuali, controlla buffer e carico del computer. Nessuno dei due indizi identifica da solo un componente.

Controllo finale: tono noto, assenza di clipping, metodo corrispondente, più sezioni e identità del riferimento salvata. EQ e NR non riparano l'instabilità: affronta i [problemi di velocità](../playback-speed-problems/) prima di creare un profilo.
