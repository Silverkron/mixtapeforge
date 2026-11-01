---
id: "software-noise-reduction"
lang: "it"
title: "Dolby e dbx via software: strumenti, formati e limiti"
description: "Scegli encoder e decoder documentati, senza affidarti alla sola dicitura riduzione del rumore."
primaryKeyword: "Dolby e dbx via software"
secondaryKeywords: ["guida al livello di lettura","controlli di allineamento","DNL e DNR","Riduzione del rumore dbx"]
searchIntent: "task"
answer: "Un codec software codifica o decodifica uno specifico formato NR. Un denoiser stima il rumore indesiderato e ne rimuove una parte. Sono lavori diversi: un generico filtro «fruscio nastro» non decodifica Dolby o dbx."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Anaxwaves · DDi Codec", "url": "https://www.anaxwaves.com/DDiCodec/"}, {"title": "Anaxwaves · DxI Codec", "url": "https://anaxwaves.com/DxICodec/"}, {"title": "Anaxwaves · DxII Codec", "url": "https://www.anaxwaves.com/DxIICodec/"}, {"title": "u-he · Satin 1.3.3", "url": "https://u-he.com/downloads/manuals/plugins/satin/Satin-user-guide.pdf"}, {"title": "libdolbyb", "url": "https://codeberg.org/martinwguy/libdolbyb"}]



guideType: "procedure"
prerequisites: ["dolby-b-c-s-playback"]
next: ["dull-dolby", "recording-computer"]
related: ["dbx-noise-reduction", "playback-level", "dolby-c"]
---

## Scegli il programma per il formato reale

| Strumento | Funzione documentata | Da controllare |
| --- | --- | --- |
| [DDi Codec](https://www.anaxwaves.com/DDiCodec/) | Codifica/decodifica B/C, applicazione autonoma | Modalità, allineamento del riferimento, sistema operativo |
| [DxII Codec](https://www.anaxwaves.com/DxIICodec/) / [DxI Codec](https://anaxwaves.com/DxICodec/) | Rispettivamente dbx II / I, più modalità Disc | I e II non sono intercambiabili |
| [Satin](https://u-he.com/downloads/manuals/plugins/satin/Satin-user-guide.pdf) | Modelli compander B-Type e uhx I/II tra i suoi effetti | Evitare colorazioni nastro aggiuntive nella prova del decoder |
| [libdolbyb](https://codeberg.org/martinwguy/libdolbyb) | Libreria Type B usata dall'encoder opzionale di MixtapeForge | Disponibilità nella build e confronto con l'hardware |

Non sono tutti inclusi in MixtapeForge. La versione 0.1 espone **Type B · libdolbyb** opzionale, non C, S o dbx. Lo slot stereo VST3 esterno non garantisce compatibilità con qualunque plugin o formato NR.

## Decodificare una cassetta una sola volta

Servono decoder corrispondente, interfaccia con ingressi linea stereo, software di acquisizione e cuffie.

1. Collega LINE OUT L/R della piastra a LINE IN 1/2 della scheda. Seleziona sensibilità linea, disattiva il guadagno automatico ed evita saturazione. La [guida al livello di lettura](../playback-level/) distingue picco digitale e riferimento Dolby.
2. Per decodificare in software, disattiva NR sulla piastra e imposta l'EQ corretta. Acquisisci in stereo senza elaborazioni a frequenza supportata e, se disponibile, 24 bit. Conserva questo originale.
3. Apri una copia nel decoder, seleziona formato effettivo e direzione **decode**. Usa il tono di riferimento documentato, se presente. Senza tono, la regolazione a orecchio resta una stima.
4. Confronta passaggi deboli e forti. Cambia il volume d'ascolto dopo la decodifica; non normalizzare o equalizzare arbitrariamente il file codificato prima del decoder.
5. Salva un file decodificato separato con modalità e riferimento nelle note. Non decodificare di nuovo un'acquisizione già decodificata dalla piastra.

Per codificare: sorgente normale → encoder → piastra con NR di registrazione off → decoder corrispondente in ascolto. Prova un minuto prima del lato intero. Se la musica debole perde alti, usa i [controlli di allineamento](../dull-dolby/): alzare il volume finale non corregge il riferimento del decoder.

Per attenuare il fruscio senza una cassetta codificata, scopri [DNL e DNR](../dnl-dnr/): questi filtri di riproduzione svolgono un compito diverso da un decoder Dolby.
