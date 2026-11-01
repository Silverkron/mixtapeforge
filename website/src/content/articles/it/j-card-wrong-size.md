---
id: "j-card-wrong-size"
lang: "it"
title: "Perché la J-card viene stampata alla misura sbagliata?"
description: "Non ridimensionare la grafica prima di capire se l’errore è nel file, nella stampa o nelle pieghe."
primaryKeyword: "Perché la J-card viene stampata alla misura sbagliata?"
secondaryKeywords: ["guida al modello","come usarli","la prova di inserimento e leggibilità","Come creare e stampare una J-card alla dimensione corretta"]
searchIntent: "diagnosis"
answer: "Non ridimensionare la grafica prima di capire se l’errore è nel file, nella stampa o nelle pieghe. Bastano un righello e una copia sbagliata per orientarsi."
category: "covers"
image: "covers"
updated: "2026-11-01"
sources: [{"title": "Adobe Acrobat — stampa nelle dimensioni effettive", "url": "https://helpx.adobe.com/acrobat/desktop/print-documents/set-up-and-print-pdfs/page-size.html"}]
guideType: "troubleshooting"
related: ["print-j-card", "j-card-dimensions", "a4-letter-j-cards"]
prerequisites: ["print-j-card"]
next: ["print-j-card"]
---

## Misura prima di modificare

1. Apri il PDF esportato, non uno screenshot. Verifica le misure nella [guida al modello](../j-card-dimensions/): la J-card distesa di MixtapeForge è 104,8 × 101,6 mm.
2. Misura entrambi i lati prima di tagliare. Nella stampa diretta controlla anche il riferimento da 50 mm.
3. Dividi misura stampata per misura prevista. **Esempio ipotetico:** 48 mm invece di 50 significano scala 96%. Una riduzione simile in entrambe le direzioni suggerisce Adatta/Riduci, non pieghe errate.
4. Ristampa un foglio con Dimensioni effettive/100%, formato e orientamento corretti. Disattiva il ridimensionamento anche nel driver della stampante.

## Segui il sintomo

- **Tutto più piccolo:** correggi la scala prima di deformare lo SVG.
- **Misura corretta ma bordo tagliato:** verifica margini stampabili, posizione e formato. A4 e Letter sono diversi: vedi [come usarli](../a4-letter-j-cards/).
- **Misura distesa corretta ma custodia bloccata:** controlla pieghe e spessore. Confronta una prova su carta comune nella stessa custodia.
- **Testo mancante ma dimensioni corrette:** cerca nomi abbreviati o problemi di font nel file esportato.

Conserva file e impostazioni dopo [la prova di inserimento e leggibilità](../print-j-card/).

**Risolto:** due dimensioni verificate, nessun bordo troncato, pieghe corrette, custodia chiusa senza pressione.
