---
id: "distortion-test"
lang: "it"
title: "Misurare la distorsione della cassetta senza confonderla con il fruscio"
description: "Confronta una sinusoide pulita e il ritorno registrato, distinguendo THD, THD+N e terza armonica."
primaryKeyword: "Misurare la distorsione della cassetta senza confonderla con il fruscio"
secondaryKeywords: ["riferimento diretto della scheda","livello di registrazione inferiore","Perché le alte forti spariscono sul nastro","Livelli di registrazione"]
searchIntent: "evaluation"
answer: "La distorsione aggiunge frequenze assenti nell'ingresso. Una sinusoide pura a 400 Hz può tornare con componenti a 800, 1200 Hz e oltre: sono le armoniche. Spiegano perché aumentando il livello un tono o uno strumento può diventare più ruvido."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100: specifiche ufficiali", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "NAK T-100: lista di controllo delle misure", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "REW: spettro, livelli RMS e distorsione", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/spectrum.html"}]
related: ["high-frequency-saturation", "recording-levels", "nak-t100-practical-guide"]
guideType: "measurement"
prerequisites: ["without-reference-tape"]
next: ["maximum-output-level"]
---

**THD** combina la distorsione armonica, **THD+N** comprende anche il rumore e **HD3** misura soltanto la terza armonica, a tre volte la frequenza di prova. Non scambiare queste sigle nel confronto.

## Occorrente

Usa NAK T-100, una scheda stereo di linea e una cassetta sacrificabile. Collega uscita → LINE IN e LINE OUT → ingresso di linea. Disattiva NR, EQ, compressione e guadagno automatico. Un [riferimento diretto della scheda](../loopback-round-trip/) è utile perché la distorsione può nascere prima del nastro.

## Confronta livelli moderati

1. Seleziona **T.H.Dist.** in NAK T-100 e la frequenza di base documentata di **400 Hz**. Identifica se il risultato è THD+N o HD3 e mantieni quella modalità.
2. Parti con uscita bassa e registra a un livello moderato, senza clipping d'ingresso. Annota lettura del deck, generatore e guadagni.
3. Su una piastra a tre testine usa Tape. Con due testine registra un tratto, ferma, riavvolgi e riproduci nell'analizzatore.
4. Leggi il centro stabile separatamente per L/R. Se il risultato supera la portata, cambia Meter Range: un valore fermo al limite non è una misura valida.
5. Registra una seconda sezione con un piccolo aumento documentato, mantenendo fisso il guadagno d'acquisizione. Se la scheda satura, riducilo e ripeti entrambe le sezioni.
6. Ripeti e salva modalità, frequenza, livello e canale con ogni numero.

## Non inseguire una sola percentuale

Esempio ipotetico: HD3 sale da 0,5% a 1,5% aumentando il livello. Significa che cresce la terza armonica in quelle condizioni, non che hai trovato una soglia universale di udibilità. Un numero THD+N non può sostituire queste letture.

Se THD+N sale abbassando la registrazione, il rumore può essere diventato una porzione maggiore del segnale. È diverso dalla non linearità del nastro ad alto livello. Esamina spettro originale o HD3 per distinguere.

## Se il risultato è molto peggiore del previsto

Controlla clipping, fondamentale selezionata, modalità linea ed elaborazioni della sorgente. Se la distorsione elevata esiste già nel loopback, parti dalla scheda. Se peggiora soltanto il ritorno su nastro più forte, valuta un [livello di registrazione inferiore](../recording-levels/).

Controllo finale: sinusoide nota, metrica indicata, acquisizione invariata, canali separati e letture ripetute. L'analisi del profilo MixtapeForge non è un analizzatore di distorsione certificato e non sostituisce questa verifica specifica.
