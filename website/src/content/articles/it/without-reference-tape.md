---
id: "without-reference-tape"
lang: "it"
title: "Misurare una registrazione senza cassetta di taratura"
description: "Esegui una prova ripetibile di registrazione e riascolto, sapendo quali conclusioni richiedono un riferimento indipendente."
primaryKeyword: "Misurare una registrazione senza cassetta di taratura"
secondaryKeywords: ["risposta in frequenza","cassette di riferimento indipendenti","profilo di registrazione","Controlla la scheda prima di attribuire un difetto al nastro"]
searchIntent: "task"
answer: "Puoi confrontare nastri, individuare canali sbilanciati e analizzare una registrazione opaca anche senza acquistare una cassetta di taratura. La misura comprende però l'intero percorso: elettronica di registrazione, nastro, lettura e scheda audio insieme."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: generatore di toni", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: analisi dello spettro", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "NAK T-100: lista di controllo delle misure", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "Audacity: configurazione dispositivo e canali", "url": "https://manual.audacityteam.org/man/audio_setup_toolbar.html"}, {"title": "Audacity: preferenze di registrazione e sovraincisione", "url": "https://manual.audacityteam.org/man/recording_preferences.html"}, {"title": "Audacity: registrazione ed esportazione WAV", "url": "https://manual.audacityteam.org/man/record.html"}]
related: ["loopback-round-trip", "calibration-tapes", "eq-limits"]
guideType: "procedure"
prerequisites: ["calibration-basics"]
next: ["recording-profile", "frequency-response"]
---

## Occorrente

Servono una cassetta sacrificabile, collegamenti stereo di linea e Audacity. **Genera > Tono** crea una sinusoide, cioè un segnale con una sola frequenza: le differenze sono più facili da individuare rispetto alla musica. Basta un quaderno o un foglio di calcolo per annotare i risultati.

## Configura Audacity

Apri **Configurazione audio** (Audio Setup). Scegli la scheda come dispositivo di riproduzione, i suoi ingressi fisici di linea come dispositivo di registrazione e **2 canali stereo**. Non scegliere un dispositivo “loopback” che acquisisce l'audio del computer. Nelle impostazioni audio seleziona una frequenza di progetto supportata dalla scheda.

In **Preferenze > Registrazione**, disattiva il monitoraggio udibile dell'ingresso, chiamato Software Playthrough nelle versioni precedenti. Disattiva anche la registrazione attivata dal suono, che potrebbe omettere silenzi e marcatori. Nel mixer della scheda disabilita eventuali ritorni dall'ingresso alla stessa uscita.

Per ottenere due canali identici scegli **Tracce > Aggiungi nuova > Traccia stereo**, selezionala e genera il tono. Se parti da un file mono, duplicalo, metti entrambi i guadagni a 0 dB e scegli **Crea traccia stereo** nel menu della traccia superiore: questa diventa sinistra, quella inferiore destra. Mantieni neutri pan ed elaborazioni.

Per incidere la prova premi REC sulla piastra, attendi che scorra il tratto registrabile e premi Riproduci in Audacity. Ferma entrambi dopo il tono. Per acquisire il riascolto apri un **nuovo progetto vuoto**, conserva le impostazioni d'ingresso, avvia Registra nel programma e poi PLAY sulla piastra. Ferma dopo il tono ed esporta un WAV stereo con **File > Esporta audio**, senza normalizzazione. Progetti separati impediscono di mescolare involontariamente l'originale al ritorno.

## Esegui una prova ripetibile

1. Collega uscita della scheda → LINE IN e LINE OUT → ingressi di linea della scheda. Mantieni la stessa frequenza supportata e disattiva NR, EQ, compressione e guadagno automatico.
2. Genera dieci secondi: **sinusoide, 1 kHz, ampiezza 0,1**. Nel file equivale a −20 dBFS peak; non significa automaticamente −20 sul misuratore della piastra.
3. Parti con l'uscita bassa e scegli un livello di registrazione moderato. Annota il valore sul deck e le posizioni dei controlli, lasciando margine all'ingresso digitale.
4. Registra oltre il tratto trasparente, riavvolgi e acquisisci la lettura in WAV stereo non elaborato. Con una piastra a due testine il riascolto separato è indispensabile.
5. Ripeti in un'altra sezione. Dal menu della traccia di Audacity scegli **Dividi traccia stereo**, seleziona la parte centrale di un solo canale e apri **Analizza > Mostra spettro** (Plot Spectrum). Usa Spettro, Hann e la stessa dimensione FFT per tutte le letture. Confronta il picco a 1 kHz canale per canale.
6. Conserva originale, entrambe le acquisizioni e impostazioni. Passa alla [risposta in frequenza](../frequency-response/) quando i livelli si ripetono con affidabilità.

## Cosa significa il risultato

Esempio ipotetico: sinistra a −18 dBFS e destra a −19 dBFS in entrambe le acquisizioni. Esiste una differenza ripetibile di 1 dB nel percorso; potrebbe però dipendere dall'ingresso della scheda, non dalla registrazione.

Anche una velocità apparentemente perfetta su un tono auto-registrato è inconclusiva: lo stesso errore in registrazione e lettura può annullarsi. Le [cassette di riferimento indipendenti](../calibration-tapes/) risolvono questa limitazione.

## Se i valori non si stabilizzano

Se il picco salta, prova un'altra sezione e controlla interruzioni nel WAV. Se entrambi i canali saturano, abbassa il guadagno d'acquisizione e ripeti le due prove. Se manca il ritorno, verifica di avere selezionato LINE IN fisico.

Controllo finale: stessi comandi, riascolto completo, nessun clipping, canali separati e risultato ripetuto. Il [profilo di registrazione](../recording-profile/) automatizza una sequenza più ampia, conservando i limiti della misura dell'intero percorso.
