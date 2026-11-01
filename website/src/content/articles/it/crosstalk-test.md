---
id: "crosstalk-test"
lang: "it"
title: "Misurare la diafonia tra i canali stereo della cassetta"
description: "Registra un canale alla volta e distingui la dispersione del segnale dal fondo o da un instradamento errato."
primaryKeyword: "Misurare la diafonia tra i canali stereo della cassetta"
secondaryKeywords: ["loopback diretto","misura del rumore","Controlla la scheda prima di attribuire un difetto al nastro","Misurare il fruscio rispetto a un segnale registrato"]
searchIntent: "evaluation"
answer: "La diafonia è il segnale che compare in un canale che dovrebbe essere silenzioso. Questa prova misura il passaggio sinistra–destra e destra–sinistra sullo stesso lato. Non misura la dispersione dalle tracce del lato opposto, che richiede un'altra configurazione."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: generatore di toni", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: separare le tracce stereo", "url": "https://manual.audacityteam.org/man/splitting_and_joining_stereo_tracks.html"}, {"title": "Audacity: analisi dello spettro", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "REW: configurazione dell’interfaccia audio", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}]
related: ["loopback-round-trip", "tape-hiss-snr", "different-decks"]
guideType: "measurement"
prerequisites: ["channel-balance"]
next: ["phase-polarity"]
---

## Prepara un file stereo noto

Usa Audacity, una scheda stereo di linea e una cassetta registrabile. Crea dieci secondi di **sinusoide a 1 kHz, ampiezza 0,1**, su una traccia mono, porta il pan tutto a sinistra ed esporta un WAV stereo con destra silenziosa. Prepara una seconda sezione invertita. Reimporta il WAV e controlla che il canale non alimentato sia davvero silenzioso nel file.

Collega uscite L/R a LINE IN e LINE OUT agli ingressi della scheda. Usa NR spento, tipo corretto, nessun effetto, allargamento stereo, somma mono o monitoraggio d'ingresso. Mantieni fissi i guadagni e lascia margine al clipping.

## Misura entrambe le direzioni

1. Registra le due sezioni a livello moderato, riavvolgi e acquisisci tutto in stereo.
2. Dividi i canali in Audacity. Seleziona il centro stabile della sezione alimentata a sinistra sul canale sinistro.
3. In **Mostra spettro** mantieni uguali Spettro, Hann e FFT. Annota il picco a 1 kHz del canale alimentato.
4. Seleziona lo stesso intervallo sul destro teoricamente silenzioso. Leggi il picco a 1 kHz se emerge chiaramente dal rumore vicino.
5. Sottrai il livello disperso da quello del canale alimentato. Ripeti a destra e poi rifai la registrazione.
6. Se disponibile, confronta il [loopback diretto](../loopback-round-trip/). Altrimenti riporta la separazione dell'intera catena, non soltanto della piastra.

## Interpreta

Esempio ipotetico: canale alimentato a −20 dBFS e tono sull'altro a −60 dBFS danno **40 dB di separazione a 1 kHz**. Un numero positivo più alto significa meno dispersione. Puoi anche scrivere diafonia −40 dB, dichiarando la convenzione.

Se a −60 dBFS non distingui il tono dal fondo, puoi indicare un limite basato sul rumore, non una misura precisa di 40 dB. Il rumore complessivo non equivale al tono disperso.

## Escludi errori comuni

Livelli quasi identici sui due canali suggeriscono di verificare prima instradamento mono e monitoraggio. Una dispersione già presente nel file esportato invalida la prova. Se il risultato cambia molto con la frequenza, questo controllo singolo non basta.

Controllo finale: altro canale davvero silenzioso, guadagni fissi, tono distinguibile dal fruscio, due direzioni e ripetizione. La [misura del rumore](../tape-hiss-snr/) chiarisce il limite; invertire la polarità non elimina la normale diafonia.
