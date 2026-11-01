---
id: "distorted-recordings"
lang: "it"
title: "La registrazione distorce: trova lo stadio sovraccarico"
description: "Controlla master, scheda, ingresso e nastro separatamente invece di abbassare tutto senza criterio."
primaryKeyword: "La registrazione distorce"
secondaryKeywords: ["saturazione degli alti","guida dedicata","misura della distorsione","Misurare la distorsione della cassetta senza confonderla con il fruscio"]
searchIntent: "diagnosis"
answer: "Voci ruvide, bassi impastati o piatti sgranati non indicano automaticamente una cassetta difettosa. La distorsione può nascere nel file, nell'elaborazione, nell'uscita della scheda, nell'ingresso della piastra, sul nastro o nell'acquisizione. Trova il primo punto sbagliato prima di cambiare profilo."
category: "troubleshooting"
image: "portable"
updated: "2026-11-01"
sources: [{"title": "Sony · 00027549", "url": "https://www.sony.com/electronics/support/audio-video/tcm-230dv/articles/00027549"}, {"title": "Audacity · Registrazione di prova", "url": "https://manual.audacityteam.org/man/tutorial_making_a_test_recording.html"}]

guideType: "troubleshooting"
prerequisites: []
next: ["recording-levels", "high-frequency-saturation"]
related: ["distortion-test", "normalization-compression-eq", "loopback-round-trip"]
---

## Confronta uno stadio alla volta

Servono vergine sacrificabile, sorgente pulita e cuffie. Per acquisire usa ingressi linea, non sensibilità microfonica, mantenendo margine dal clipping digitale: il limite oltre cui il convertitore taglia i picchi.

1. Ascolta direttamente la sorgente a volume moderato. Escludi EQ, compressione e plugin aggiunti. Se distorce già, correggi o sostituisci prima la sorgente.
2. Ascolta l'uscita della scheda destinata alla piastra e controlla gli avvisi di picco. Abbassare l'uscita non elimina clipping già presente nel file.
3. Registra un passaggio con tipo di nastro corretto e un solo encoder NR. Annota REC LEVEL e impostazioni d'uscita.
4. Ripeti con REC LEVEL chiaramente inferiore, lasciando invariati uscita, nastro ed effetti. Confronta le riproduzioni a volume d'ascolto simile.
5. Se entrambe distorcono, riduci l'uscita della scheda e ripeti. L'ingresso della piastra può saturare prima del controllo REC LEVEL. Non rialzare subito tutti gli stadi successivi.
6. Se l'ascolto diretto dalla piastra è pulito ma l'acquisizione no, abbassa il guadagno d'ingresso della scheda e acquisisci di nuovo.

## Interpreta il cambiamento

Un miglioramento abbassando REC LEVEL suggerisce eccessivo pilotaggio, non necessariamente un guasto. Se migliorano soprattutto gli alti forti, approfondisci la [saturazione degli alti](../high-frequency-saturation/). Distorsione invariata a livelli inferiori e con nastri sani diversi può richiedere assistenza.

Definisci il livello con la [guida dedicata](../recording-levels/). Una [misura della distorsione](../distortion-test/) richiede tono e metodo adatti: la forma d'onda musicale non fornisce una percentuale THD attendibile. Conserva impostazioni e confronto migliore, poi riattiva un effetto alla volta.
