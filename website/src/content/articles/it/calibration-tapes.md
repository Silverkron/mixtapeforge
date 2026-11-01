---
id: "calibration-tapes"
lang: "it"
title: "Scegliere la cassetta di taratura giusta per ogni misura"
description: "Abbina riferimenti di velocità, azimut e livello al manuale della piastra, evitando toni di prova senza specifiche."
primaryKeyword: "Scegliere la cassetta di taratura giusta per ogni misura"
secondaryKeywords: ["cosa puoi misurare senza riferimenti","velocità","livello di lettura","Controllare l’azimut senza perdere l’allineamento originale"]
searchIntent: "informational"
answer: "Una cassetta di taratura è utile perché una proprietà del segnale registrato è nota in modo indipendente. Un tono fatto in casa può confrontare due registrazioni, ma non dimostra che la macchina che lo ha inciso fosse corretta."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "MRL: scelta e ambito dei nastri di riferimento", "url": "https://mrltapes.com/pages/product-guide"}, {"title": "NAK T-100: specifiche ufficiali", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "Jay McKnight: azimut nei registratori a nastro magnetico", "url": "https://www.mrltapes.com/mcknight_azimuth-in-mtr.pdf"}]
related: ["azimuth-test", "without-reference-tape", "wow-flutter"]
guideType: "explainer"
prerequisites: ["calibration-basics"]
next: ["speed-test", "playback-level"]
---

## Acquista per una misura precisa

| Misura | Informazioni necessarie sul riferimento |
| --- | --- |
| Velocità di lettura | Frequenza nominale, normalmente 3000 o 3150 Hz, e accuratezza di registrazione |
| Wow e flutter | Tono adatto e instabilità residua sufficientemente bassa e documentata |
| Azimut | Allineamento di riferimento, tono ad alta frequenza e formato delle tracce |
| Livello di lettura | Frequenza, flussività magnetica, equalizzazione e tolleranza |
| Risposta in lettura | Frequenze, livelli relativi registrati, equalizzazione e correzioni |

La **flussività**, espressa in nanoweber per metro (nWb/m), descrive il riferimento magnetico inciso sul nastro. Non è un volume del computer né una tensione. L'**equalizzazione** definisce la caratteristica in frequenza di registrazione/lettura del riferimento. Entrambe devono corrispondere alla procedura di servizio.

## Prima dell'acquisto

1. Trova il manuale di servizio del modello esatto e la specifica del nastro per la misura desiderata.
2. Chiedi al fornitore frequenza, livello, equalizzazione, formato delle tracce, tolleranza e metodo di riferimento. “Registrato professionalmente” non risponde a queste domande.
3. Verifica che sia una compact cassette alla velocità corretta. I documenti MRL sono utili per capire la registrazione magnetica, ma MRL dichiara di non produrre cassette di taratura in questo formato.
4. Conserva la documentazione insieme al nastro. Tienilo lontano da magneti e non registrarci sopra.
5. Prima di usare un riferimento costoso, controlla che la piastra trascini una cassetta ordinaria senza mangiarla, piegarla o sporcarla.

## Cosa provoca un riferimento sbagliato

Esempio ipotetico: un tono da 3150 Hz interpretato come 3000 Hz sembra indicare una velocità maggiore del 5%, anche con lettura corretta. È un errore di impostazione, non un motivo per regolare il motore.

Una cassetta usata dalla storia incerta può ancora servire come confronto, ma l'etichetta non dimostra che livello e allineamento originali siano intatti. Letture instabili richiedono un altro riferimento o una verifica professionale prima di modificare la piastra.

Non occorre acquistare tutto subito. Parti da [cosa puoi misurare senza riferimenti](../without-reference-tape/), poi procurati quello necessario per la [velocità](../speed-test/) o il [livello di lettura](../playback-level/). Un bel grafico ottenuto registrando e riproducendo sulla stessa macchina non certifica l'accuratezza di un nastro sconosciuto.
