---
id: "dnl-dnr"
lang: "it"
title: "DNL e DNR: ridurre il rumore senza codificare la registrazione"
description: "Comprendi i trattamenti di sola lettura e la differenza tra meno rumore e decodifica fedele."
primaryKeyword: "DNL e DNR"
secondaryKeywords: ["decoder Dolby","software NR","ronzio elettrico","Dolby B"]
searchIntent: "informational"
answer: "DNL e DNR riducono il rumore in riproduzione senza richiedere una cassetta codificata in precedenza. Rendono meno evidente il rumore alle alte frequenze modificando la risposta in base al segnale. Non vanno confusi con un decoder Dolby corrispondente alla registrazione."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Philips · N2510 · 1973", "url": "https://www.worldradiohistory.com/Archive-All-BC/Archive-All-Audio/Archive-Studio-Sound/70s/Studio-Sound-1973-12.pdf"}, {"title": "Texas Instruments · LM1894", "url": "https://www.ti.com/product/LM1894"}]



guideType: "explainer"
prerequisites: []
next: ["dolby-b-c-s-playback"]
related: ["dolby-b", "software-noise-reduction", "tape-hiss-snr"]
---

DNL e DNR riducono il rumore in riproduzione senza richiedere una cassetta codificata in precedenza. Rendono meno evidente il rumore alle alte frequenze modificando la risposta in base al segnale. Non vanno confusi con un [decoder Dolby](../dolby-b/) corrispondente alla registrazione.

## Ascolta il compromesso

Immagina un piatto che sfuma nel fruscio. Limitare le alte può rendere il fondo meno evidente, ma anche accorciare la coda percepita del piatto. Si cerca un compromesso utile all'ascolto, non il recupero di informazioni perdute.

Texas Instruments descrive DNR nella [documentazione LM1894](https://www.ti.com/product/LM1894) come sistema non complementare: non richiede un encoder. DNL è un'implementazione diversa; nomi simili non significano controlli o prestazioni identici.

## Provalo conservando l'originale

Servono un lettore con DNL/DNR documentato e una cassetta conosciuta. Nel restauro software conserva un'acquisizione intatta e lavora su una copia.

1. Imposta prima EQ di riproduzione corretta e, se previsto, decoder Dolby corrispondente.
2. Ascolta voce debole o strumenti acustici con DNL/DNR off. Nota consonanti e riverberi, non soltanto le pause.
3. Attiva la funzione prevista dal manuale e ripeti lo stesso passaggio a volume simile.
4. Se regolabile, usa il minimo intervento utile. Con il solo interruttore, lascia off quando perdi più dettagli di quanto guadagni in silenzio.

Una pausa più silenziosa con dettagli musicali scomparsi è un compromesso, non maggiore fedeltà. Se il fondo sale e scende in modo fastidioso, riduci il trattamento o disattivalo.

MixtapeForge non integra DNL/DNR. I moderni denoiser possono avere uno scopo d'ascolto affine, ma non sono automaticamente emulazioni di quei circuiti: la guida ai [software NR](../software-noise-reduction/) distingue le funzioni. Annota separatamente decoder, riduzione aggiuntiva e preferenza d'ascolto.

Un [ronzio elettrico](../hum-buzz/) richiede un controllo dei collegamenti, non una prova di attenuazione degli alti.
