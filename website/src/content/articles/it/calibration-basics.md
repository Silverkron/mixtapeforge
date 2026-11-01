---
id: "calibration-basics"
lang: "it"
title: "Taratura delle cassette: scegli la prova prima di regolare la piastra"
description: "Capisci cosa misura ogni prova, prepara collegamenti affidabili e scegli il controllo successivo."
primaryKeyword: "Taratura delle cassette"
secondaryKeywords: ["quale nastro di taratura serve per ogni prova","prove senza nastro di riferimento","profilo di registrazione","Controlla la scheda prima di attribuire un difetto al nastro"]
searchIntent: "informational"
answer: "Una registrazione può suonare chiusa per colpa della cassetta, dell'elettronica di registrazione, dell'allineamento in lettura o delle impostazioni di acquisizione. Tarare significa confrontare un risultato con un riferimento noto e regolare la parte interessata. Registrare un tono e riascoltarlo è utile, ma non permette di separare tutti questi elementi."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100: specifiche ufficiali", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "REW: configurazione dell’interfaccia audio", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}, {"title": "MRL: scelta e ambito dei nastri di riferimento", "url": "https://mrltapes.com/pages/product-guide"}]
related: ["loopback-round-trip", "calibration-tapes", "recording-profile"]
guideType: "explainer"
prerequisites: []
next: ["needs-calibration", "without-reference-tape"]
---

## Parti dalla domanda

| Cosa vuoi sapere | Prova utile | Cosa comprende il risultato |
| --- | --- | --- |
| La scheda altera il segnale? | Collegamento diretto uscita–ingresso | Uscita, cavo e ingresso |
| Questo nastro registra bene su questa piastra? | Registra, riavvolgi e riproduci | Scheda, registrazione, nastro e lettura |
| La velocità di lettura è corretta? | Cassetta di riferimento per la velocità | Meccanica di lettura e incertezza del riferimento |
| Posso migliorare la prossima mixtape? | Profilo ripetibile di registrazione | Compensazione della combinazione misurata |

Una **cassetta di riferimento** contiene un segnale con caratteristiche registrate note. Una cassetta incisa dalla stessa piastra non è un riferimento indipendente. Leggi [quale nastro di taratura serve per ogni prova](../calibration-tapes/).

## Prepara un punto di partenza affidabile

Servono una piastra funzionante, una cassetta sacrificabile, un computer e un'interfaccia con ingressi e uscite stereo di linea. Gli ingressi microfonici con guadagno automatico non sono adatti: modificano proprio il livello che vuoi confrontare.

1. Collega le uscite L/R della scheda a LINE IN L/R della piastra e LINE OUT L/R agli ingressi di linea della scheda. Disattiva il monitoraggio software dell'ingresso, evitando che il ritorno venga rimandato alla stessa uscita.
2. Seleziona le porte effettive nel programma e allinea la frequenza di campionamento alla scheda. Per i primi controlli in banda udibile bastano 44,1 o 48 kHz, se supportati da entrambi.
3. Disattiva Dolby/NR, EQ, compressione e controllo automatico del livello. Seleziona il tipo corretto di nastro.
4. Parti con un'uscita bassa. Registra una breve prova oltre il tratto trasparente, riavvolgi e riproduci. Riduci il guadagno d'ingresso se il misuratore digitale satura.
5. Ripeti senza spostare i controlli. Se i risultati differiscono sensibilmente, cerca l'instabilità prima di compensarla.

Una piastra a tre testine può far ascoltare il nastro durante la registrazione. Con due testine occorre registrare, riavvolgere e riprodurre: il monitor Source non dimostra cosa sia finito sul nastro.

## Dall'osservazione alla scelta

Esempio ipotetico: entrambe le prove restituiscono 2 dB di alte in meno. È un motivo per esaminare l'intero percorso, non per applicare subito un aumento di 2 dB. Se la perdita cambia a ogni passaggio, un'EQ fissa è ancora meno indicata.

Inizia dalle [prove senza nastro di riferimento](../without-reference-tape/). Per un'impostazione riutilizzabile segui il [profilo di registrazione](../recording-profile/). MixtapeForge 0.1 propone una prova guidata dell'intero percorso; non certifica l'allineamento meccanico né tara in modo indipendente la velocità di lettura.
