---
id: "high-frequency-saturation"
lang: "it"
title: "Perché le alte forti spariscono sul nastro: verifica prima di usare l’EQ"
description: "Confronta toni acuti a due livelli e individua una perdita dipendente dal volume, diversa da uno squilibrio fisso."
primaryKeyword: "Perché le alte forti spariscono sul nastro"
secondaryKeywords: ["risposta in frequenza","massimo livello alle basse frequenze","Stimare il margine del nastro a un limite di distorsione dichiarato","Misurare la distorsione della cassetta senza confonderla con il fruscio"]
searchIntent: "evaluation"
answer: "Il nastro può smettere di registrare fedelmente gli aumenti delle alte prima che un misuratore digitale saturi. È la saturazione alle alte frequenze: più ingresso non produce un aumento proporzionale della registrazione. I piatti possono perdere chiarezza anche se il volume sembra sufficiente."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: generatore di toni", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: analisi dello spettro", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "Anaxwaves: determinare il margine del nastro", "url": "https://www.anaxwaves.com/MixtapeNerd/Docs/DetermineHeadroom.html"}]
related: ["maximum-output-level", "distortion-test", "bias-adjustment"]
guideType: "measurement"
prerequisites: ["frequency-response"]
next: ["recording-levels", "eq-limits"]
---

## Prepara un confronto breve

Usa collegamenti di linea, NR spento e metodo di analisi della [risposta in frequenza](../frequency-response/). Servono una cassetta sacrificabile e due coppie di toni: 1 kHz seguito da 8 kHz, cinque secondi ciascuno, identiche sui due canali.

Tieni diffusori e cuffie bassi o silenziati. Stai provando la registrazione, non udito o tweeter. Usa livelli moderati: non occorre spingere la piastra al massimo.

## Confronta due livelli

1. Genera la prima coppia con ampiezza **0,01** e la seconda con **0,02**: il doppio, circa 6 dB in più.
2. Stabilisci un livello prudente sul deck e verifica il margine d'acquisizione. Non cambiare REC LEVEL, volume della scheda o guadagno d'ingresso durante le due coppie.
3. Registra prima la coppia bassa, poi quella maggiore nella stessa sezione. Riavvolgi e acquisisci tutto senza normalizzare o elaborare.
4. In Audacity dividi i canali e misura il centro stabile di ogni tono con Mostra spettro, mantenendo uguali le impostazioni.
5. Calcola l'aumento restituito a 1 kHz e quello a 8 kHz. Ripeti prima di interpretare.

## Quando l'aumento si comprime

Esempio ipotetico: raddoppiare l'ingresso fa salire il ritorno a 1 kHz di 5,8 dB, ma quello a 8 kHz soltanto di 3 dB. Le alte non seguono più proporzionalmente l'ingresso. È un indizio di limitazione dipendente dal livello nel percorso; verifica prima che sorgente, scheda e ingresso del deck non saturino.

Se entrambe le frequenze salgono di circa 6 dB, ma le alte restano 3 dB sotto il riferimento in entrambe le prove, il comportamento assomiglia piuttosto a una differenza stabile di risposta.

## Cosa cambiare

Registra lo stesso brano a livello inferiore. Se i piatti recuperano chiarezza, conserva quel margine invece di aumentare le alte. Confronta un altro nastro e, se presenti, i controlli esterni di taratura documentati dal deck.

Una lettura bassa e rumorosa può nascondere il tono: non interpretare il fondo come un limite di saturazione. Se il risultato cambia a ogni lettura, controlla prima il contatto del nastro.

Controllo finale: aumento noto di 6 dB, comandi fissi, acquisizione pulita, due frequenze e ripetizione. Il [massimo livello alle basse frequenze](../maximum-output-level/) è una proprietà separata e non predice tutta la gestione delle alte.
