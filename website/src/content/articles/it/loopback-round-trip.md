---
id: "loopback-round-trip"
lang: "it"
title: "Controlla la scheda prima di attribuire un difetto al nastro"
description: "Confronta il collegamento diretto della scheda con il percorso attraverso la cassetta e distingui ciò che misurano."
primaryKeyword: "Controlla la scheda prima di attribuire un difetto al nastro"
secondaryKeywords: ["procedura di acquisizione di base","prova a più frequenze","bilanciamento","profili"]
searchIntent: "evaluation"
answer: "Un loopback collega direttamente l'uscita di una scheda audio al suo ingresso. Nel percorso completo di registrazione e riascolto si inseriscono invece piastra e cassetta. Il confronto può rivelare un problema già presente prima del nastro."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "REW: configurazione dell’interfaccia audio", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}, {"title": "Audacity: generatore di toni", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: analisi dello spettro", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "Audacity: configurazione dispositivo e canali", "url": "https://manual.audacityteam.org/man/audio_setup_toolbar.html"}, {"title": "Audacity: preferenze di registrazione e sovraincisione", "url": "https://manual.audacityteam.org/man/recording_preferences.html"}, {"title": "Audacity: registrazione ed esportazione WAV", "url": "https://manual.audacityteam.org/man/record.html"}]
related: ["without-reference-tape", "channel-balance", "recording-profile"]
guideType: "measurement"
prerequisites: ["calibration-basics"]
next: ["frequency-response"]
---

## Attrezzatura e impostazioni fisse

Servono ingressi di linea, cavi compatibili, Audacity e una cassetta sacrificabile. Verifica il manuale dell'interfaccia: un ingresso solo microfonico potrebbe saturare. Disabilita ogni monitoraggio che rimanda l'ingresso alla stessa uscita.

Questa prova richiede di spostare temporaneamente i cavi. Se preferisci mantenerli sulla piastra, salta il loopback e indica il risultato come “intera catena”, senza dichiararlo corretto rispetto alla scheda.

## Riproduzione e acquisizione simultanee in Audacity

In **Configurazione audio** scegli la scheda per la riproduzione, i suoi **ingressi fisici di linea** per la registrazione e **2 canali stereo**. Un ingresso Windows “loopback” acquisisce digitalmente il computer e non misura i cavi. Allinea frequenza di progetto e interfaccia.

In **Preferenze > Registrazione**, attiva la riproduzione delle altre tracce durante la registrazione (**overdub**) e **Registra su una nuova traccia**. Disattiva monitoraggio udibile dell'ingresso/Software Playthrough e registrazione attivata dal suono. Disabilita anche il ritorno nel mixer della scheda.

Crea **Tracce > Aggiungi nuova > Traccia stereo**, selezionala e apri **Genera > Tono**: sinusoide, 1000 Hz, ampiezza 0,1, dieci secondi. Posiziona il cursore all'inizio senza selezionare un intervallo. Premi Registra: con queste preferenze l'originale suona mentre il ritorno fisico viene registrato su una nuova traccia stereo. Ferma dopo il tono, silenzia l'originale ed esporta soltanto il ritorno in WAV, verificando selezione e anteprima dell'esportazione. Nomina chiaramente le tracce e silenzia i vecchi ritorni prima di ripetere, altrimenti verranno rimandati all'ingresso.

Per la prova su nastro riproduci l'originale mentre la piastra è in REC, poi ferma e riavvolgi. Acquisisci il riascolto in un **nuovo progetto vuoto**: Registra in Audacity, poi PLAY sul deck, infine Stop dopo il tono. La [procedura di acquisizione di base](../without-reference-tape/) spiega questi passaggi anche per la prima registrazione stereo.

## Registra entrambi i percorsi

1. Prepara la sinusoide a 1 kHz identica sui due canali e la stessa frequenza supportata.
2. Collega uscite L/R direttamente a ingressi L/R. Parti basso, aumenta fino a un segnale leggibile senza saturazione e salva l'acquisizione come riferimento della scheda.
3. Annota volume d'uscita, guadagni d'ingresso, frequenza e porte. Ferma la riproduzione prima di ricollegare uscita → LINE IN e LINE OUT → ingresso.
4. Non spostare i controlli della scheda. Con NR spento registra a un livello moderato, riavvolgi e acquisisci la lettura.
5. Confronta il livello del tono per ogni canale, mantenendo uguali impostazioni d'analisi e lunghezza della selezione.
6. Ripeti. Per confrontare anche il timbro esegui la [prova a più frequenze](../frequency-response/) prima nel collegamento diretto, poi sul nastro.

### Leggi i canali separatamente

Nel menu della traccia acquisita scegli **Dividi traccia stereo**. Seleziona il centro del tono sinistro, evitando inizio e fine. In **Analizza > Mostra spettro** usa Spettro, Hann e una dimensione FFT come 16384. Porta il cursore vicino al picco a 1 kHz e leggi le informazioni sotto il grafico. Ripeti a destra e nelle altre acquisizioni. Non selezionare insieme i due canali.

## Interpreta il confronto

Esempio ipotetico: il percorso diretto è 1 dB più basso a destra e quello su nastro mostra la stessa differenza. Compensarla in registrazione rischia di incidere sulle cassette una correzione destinata in realtà all'ingresso della scheda.

Non sottrarre semplicemente percentuali di distorsione o livelli di rumore in dB: non si combinano come guadagni con segno. Anche una curva di compensazione della scheda vale solo per le condizioni misurate.

Silenzio: verifica ingresso, canali e modalità linea. Fischio crescente: ferma e disattiva il ritorno. Clipping nel riferimento: abbassa il livello necessario e ripeti entrambe le misure.

Conserva WAV e impostazioni. Un riferimento ripetibile rende più affidabili [bilanciamento](../channel-balance/) e [profili](../recording-profile/), ma non tara la testina di lettura.
