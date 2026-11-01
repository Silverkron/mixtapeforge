---
id: "tape-hiss-snr"
lang: "it"
title: "Misurare il fruscio rispetto a un segnale registrato"
description: "Acquisisci tono di riferimento e silenzio registrato con guadagno fisso per confrontare il rapporto segnale/rumore."
primaryKeyword: "Misurare il fruscio rispetto a un segnale registrato"
secondaryKeywords: ["guida NAK","Dolby B","Misurare la distorsione della cassetta senza confonderla con il fruscio","Scegliere il software per la prova che serve davvero"]
searchIntent: "evaluation"
answer: "Un misuratore di rumore da solo non dice se una cassetta sia silenziosa. Il rapporto segnale/rumore, SNR, confronta un segnale dichiarato con il fondo sottostante. Abbassare la lettura riduce entrambi e non migliora il rapporto."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "REW: spettro, livelli RMS e distorsione", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/spectrum.html"}, {"title": "NAK T-100: specifiche ufficiali", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "NAK T-100: lista di controllo delle misure", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["distortion-test", "dolby-b", "calibration-software"]
guideType: "measurement"
prerequisites: ["without-reference-tape"]
next: ["recording-levels"]
---

## Prepara due sezioni nelle stesse condizioni

Servono una cassetta registrabile, una scheda stereo di linea e l'RTA in tempo reale di REW per leggere direttamente il ritorno della piastra. Un'acquisizione WAV separata è una documentazione facoltativa. Collega uscita → LINE IN e LINE OUT → ingresso. Disattiva guadagno automatico, NR ed elaborazioni e mantieni fissi tutti i controlli.

Genera una breve **sinusoide a 1 kHz** a livello moderato e documentato sul deck. Falla seguire da almeno dieci secondi di silenzio digitale lasciando la piastra in REC. Così misuri il rumore del processo reale di cancellazione, bias e registrazione. Una cassetta mai incisa o la piastra ferma rappresentano condizioni diverse.

## Misura segnale e fondo

1. Registra tono e silenzio sulla cassetta, ferma e riavvolgi prima del tono. Lascia ferma la piastra mentre prepari REW.
2. Seleziona un canale d'ingresso in REW e apri **RTA**, con scala dBFS. Avvia l'analizzatore con il suo comando di registrazione e osserva **Input RMS**, che rappresenta l'energia media e non i picchi istantanei.
3. Premi PLAY sulla piastra e leggi il centro stabile del tono. Annota il valore RMS non ponderato e banda/filtri dell'analisi.
4. Leggi il centro del silenzio inciso con lo stesso canale, guadagno, banda e convenzione RMS. Evita il transitorio nel passaggio tra tono e silenzio.
5. Sottrai il livello del rumore da quello del segnale. Ripeti per l'altro canale e un secondo intervallo di silenzio.
6. Se usi la ponderazione A, registra separatamente i corrispondenti valori ponderati di riferimento e fondo. La ponderazione cambia il peso delle frequenze: non mescolare valori ponderati e non ponderati.

## Un esempio di calcolo

Letture ipotetiche: tono **−18 dBFS RMS**, fondo **−70 dBFS RMS**. La separazione è **52 dB** in quelle condizioni. Non è automaticamente confrontabile con una specifica riferita al massimo livello o a un'altra ponderazione.

NAK T-100 offre Noise-A, ma richiede attenzione agli scarti di scala. Segui la [guida NAK](../nak-t100-practical-guide/) senza interpretare la lettura come un SNR positivo già pronto.

## Se il risultato sorprende

Se il fondo cambia con display o alimentatore, indaga interferenze elettriche. Se nel silenzio resta musica, verifica la sovrascrittura. Se il guadagno è cambiato tra le sezioni, ripeti entrambe le letture. Se salvi anche un WAV, conserva le due sezioni nello stesso file non elaborato, senza normalizzarle.

Controllo finale: silenzio inciso, segnale di riferimento dichiarato, guadagno identico, RMS/ponderazione/banda coerenti e due canali. Prova il [Dolby B](../dolby-b/) separatamente con codifica e decodifica abbinate: attivarlo solo in lettura cambia la domanda.
