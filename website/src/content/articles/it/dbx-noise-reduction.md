---
id: "dbx-noise-reduction"
lang: "it"
title: "Riduzione del rumore dbx: Type I, Type II e lettura corretta"
description: "Perché i nastri dbx richiedono il decoder adatto e un compressore generico non basta."
primaryKeyword: "Riduzione del rumore dbx"
secondaryKeywords: ["livelli","dropout","flusso NR software","Dolby B"]
searchIntent: "informational"
answer: "Il dbx per cassette comprime la differenza tra suoni deboli e forti prima della registrazione e la espande in riproduzione. Compander unisce compressore ed espansore. Con una compressione ideale 2:1, una variazione di 20 dB diventa 10 dB sul nastro; il decoder ripristina la variazione maggiore. È un esempio del principio, non una misura di una piastra."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Anaxwaves · DxI Codec", "url": "https://anaxwaves.com/DxICodec/"}, {"title": "Anaxwaves · DxII Codec", "url": "https://www.anaxwaves.com/DxIICodec/"}, {"title": "u-he · Satin 1.3.3", "url": "https://u-he.com/downloads/manuals/plugins/satin/Satin-user-guide.pdf"}]





guideType: "explainer"
prerequisites: []
next: ["software-noise-reduction", "playback-compatibility"]
related: ["dolby-b", "recording-levels", "tape-dropouts"]
---

## Identifica prima il formato

Type I e Type II sono formati dbx differenti: il numero romano non identifica il tipo magnetico della cassetta. Una cassetta Type II può contenere registrazioni senza NR, Dolby o dbx. Controlla il manuale del registratore e abbina il decoder al formato. Senza decodifica il suono può risultare compresso e timbricamente alterato.

## Una breve prova hardware

Usa una piastra funzionante con il dbx corretto, una vergine supportata e cuffie. Collega l'uscita linea stereo della sorgente a LINE IN L/R.

1. Disattiva NR software e seleziona la modalità dbx di registrazione prevista dal manuale.
2. Regola i [livelli](../recording-levels/) sul passaggio più forte. Il compander non ripara un segnale già saturato.
3. Registra voce, basso sostenuto e code deboli dei piatti. Ferma, riavvolgi e ascolta con il dbx corrispondente.
4. Confronta a volume simile con la sorgente. Cerca dinamica naturale e un fondo che non si gonfi dopo le note di basso.

Se emergono brevi perdite di segnale, controlla i [dropout](../tape-dropouts/). L'espansione può rendere più evidenti gli errori, ma non ne identifica la causa. Prova un'altra vergine pulita prima di cambiare elaborazione.

## Software da valutare

Anaxwaves offre [DxII Codec](https://www.anaxwaves.com/DxIICodec/) per Type II/Disc e [DxI Codec](https://anaxwaves.com/DxICodec/) per Type I/Disc. [Satin](https://u-he.com/products/satin/) include modelli uhx I/II. Sono strumenti separati, non stadi dbx integrati in MixtapeForge. Leggi i manuali e verifica la modalità esatta con il tuo hardware, evitando effetti di simulazione nastro estranei al test. Consulta il [flusso NR software](../software-noise-reduction/) prima di acquisire un'intera cassetta.
