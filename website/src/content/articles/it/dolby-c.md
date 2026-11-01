---
id: "dolby-c"
lang: "it"
title: "Dolby C: cosa cambia rispetto al Dolby B"
description: "Perché Dolby C richiede una lettura corrispondente e cosa controllare nei decoder software."
primaryKeyword: "Dolby C"
secondaryKeywords: ["Dolby B","guida ai livelli","decodifica e riproduzione","Dolby S"]
searchIntent: "informational"
answer: "Il Dolby C è un sistema di riduzione del rumore in registrazione e riproduzione che interviene più del Dolby B. In registrazione porta i dettagli deboli sopra il fruscio; in riproduzione annulla quel trattamento. Una cassetta registrata in C richiede quindi un decoder C: B non è un'alternativa più delicata."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Dolby Laboratories · CP45 · Appendix D", "url": "https://www.film-tech.com/warehouse/manuals/DOLBYCP45USERS.pdf"}, {"title": "Anaxwaves · DDi Codec", "url": "https://www.anaxwaves.com/DDiCodec/"}]





guideType: "explainer"
prerequisites: ["dolby-b"]
next: ["dolby-b-c-s-playback", "software-noise-reduction"]
related: ["dull-dolby", "playback-compatibility", "recording-levels"]
---

Il Dolby C è un sistema di riduzione del rumore in registrazione e riproduzione che interviene più del [Dolby B](../dolby-b/). In registrazione porta i dettagli deboli sopra il fruscio; in riproduzione annulla quel trattamento. Una cassetta registrata in C richiede quindi un decoder C: B non è un'alternativa più delicata.

## Perché conta la corrispondenza

Ascolta il respiro lieve di un cantante seguito da un colpo forte di batteria. La decodifica corretta conserva il rapporto tra i due. Con la modalità sbagliata il respiro può diventare eccessivo o sparire e il fondo può gonfiarsi seguendo la musica. Questo effetto si chiama spesso **pompaggio** o *breathing*. Non è un semplice squilibrio timbrico costante da compensare con l'EQ.

## Una prova registrata utile

Servono piastra con C, una vergine supportata, sorgente originale e cuffie. Collega l'uscita linea stereo della sorgente a LINE IN L/R; ascolta dalla piastra o dall'amplificatore.

1. Disattiva NR software e seleziona C sulla piastra. Imposta il tipo di nastro corretto.
2. Riproduci il passaggio più forte e regola REC LEVEL secondo il manuale. La [guida ai livelli](../recording-levels/) spiega come usare gli indicatori.
3. Registra un minuto con musica debole e forte. Ferma e riavvolgi.
4. Ascolta con C attivo e confronta con la sorgente a volume simile, includendo il finale tranquillo.
5. Se userai un'altra piastra, ripeti lì l'ascolto prima di registrare tutto il lato.

Se la seconda piastra non ha C, scegli un altro formato per quella persona. Se entrambe hanno C ma solo una suona chiusa, verifica [decodifica e riproduzione](../dull-dolby/) prima di schiarire definitivamente il master.

## Software disponibili

[DDi Codec](https://www.anaxwaves.com/DDiCodec/) codifica e decodifica B/C come applicazione commerciale separata. I suoi controlli richiedono comunque un riferimento attendibile o una regolazione dichiaratamente soggettiva. MixtapeForge 0.1 non integra un encoder C: l'opzione Type B non serve a preparare cassette C.

Prima di conservare la prova, verifica C a entrambe le estremità, passaggi forti puliti e code deboli naturali.

Per un altro sistema dedicato ai passaggi tranquilli, confronta [Dolby S](../dolby-s/) prima di scegliere il formato.
