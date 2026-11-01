---
id: "dolby-b"
lang: "it"
title: "Dolby B: come riduce il fruscio del nastro"
description: "Capisci Dolby B, scegli dove codificare ed evita di elaborare due volte lo stesso segnale."
primaryKeyword: "Dolby B"
secondaryKeywords: ["guida ai livelli","controlli per Dolby opaco","software NR","Dolby e dbx via software"]
searchIntent: "informational"
answer: "Il Dolby B riduce il “sssh” continuo che si sente dietro la musica nei passaggi tranquilli. Funziona in due momenti: la codifica modifica il segnale prima della registrazione; la decodifica annulla quella modifica durante l'ascolto e attenua il fruscio aggiunto dal nastro. Non elimina il rumore già presente nella sorgente."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Dolby Laboratories · CP45 · Appendix D", "url": "https://www.film-tech.com/warehouse/manuals/DOLBYCP45USERS.pdf"}, {"title": "IASA · TC-04 · 5.4.11", "url": "https://www.iasa-web.org/book/export/html/435"}, {"title": "libdolbyb", "url": "https://codeberg.org/martinwguy/libdolbyb"}]





guideType: "explainer"
prerequisites: []
next: ["dolby-b-c-s-playback", "dull-dolby"]
related: ["software-noise-reduction", "bias-eq-nr", "recording-levels"]
---

## Che cosa succede alla musica?

Durante la codifica, la coda debole di un piatto riceve più enfasi sulle alte frequenze rispetto a un colpo forte. Il decoder applica l'attenuazione corrispondente. L'intervento segue la musica: una regolazione fissa degli alti non può riprodurlo. Un nastro codificato ascoltato con NR disattivato può risultare più brillante e rumoroso; attivare B dovrebbe restituire un equilibrio naturale, non rendere tutto opaco.

## Prima prova con la piastra

Servono una piastra con Dolby B in registrazione e riproduzione, una cassetta vergine adatta, cuffie e un passaggio conosciuto con voce, percussioni e un finale tranquillo. Per questa verifica d'ascolto non serve un analizzatore.

1. Collega l'uscita linea stereo del computer o della scheda a LINE IN L/R della piastra. Parti con volume basso e usa la [guida ai livelli](../recording-levels/) sul passaggio più forte.
2. Seleziona il tipo di nastro corretto, lascia disattivata la codifica software e attiva Dolby B sulla piastra: sarà l'unico encoder.
3. Registra circa un minuto, finale compreso. Ferma, riavvolgi e riproduci con Dolby B attivo.
4. Confronta con l'originale a volume d'ascolto simile. Regola il volume delle cuffie o dell'amplificatore, non REC LEVEL.
5. Disattiva brevemente NR in riproduzione, poi rimetti B. Ascolta il fruscio nella pausa e il decadimento del piatto.

Il risultato atteso mantiene voce e code musicali naturali, riducendo il fondo. Se B chiude troppo voce o piatti, segui i [controlli per Dolby opaco](../dull-dolby/) prima di aggiungere EQ.

## Se codifica il software

MixtapeForge 0.1 offre **Type B · libdolbyb**, opzionale, nelle regolazioni audio. In questo caso registra con NR della piastra **OFF**, poi ascolta la cassetta con Dolby B hardware **ON**. L'anteprima codificata dell'app non rappresenta il risultato decodificato. La compatibilità con la tua piastra richiede una prova registrata e l'allineamento del riferimento: impostarlo a 0 non disattiva la codifica e non significa «registra a 0 dB sul deck».

La guida ai [software NR](../software-noise-reduction/) distingue strumenti e requisiti. Prima di un lato intero verifica: un encoder, un decoder corrispondente, livelli stabili e un finale musicale leggibile.
