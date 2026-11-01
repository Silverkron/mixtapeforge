---
id: "eq-limits"
lang: "it"
title: "Usare l’EQ per migliorare una cassetta senza peggiorarne i limiti"
description: "Scegli piccole correzioni da misure ripetibili e verificale con una nuova registrazione."
primaryKeyword: "Usare l’EQ per migliorare una cassetta senza peggiorarne i limiti"
secondaryKeywords: ["prove di risposta a basso livello","saturazione","perché le piastre differiscono","profilo nominato"]
searchIntent: "task"
answer: "Un equalizzatore, EQ, modifica il livello di alcune zone di frequenza. Può aiutare uno squilibrio timbrico stabile, ma non recupera informazioni perse, non allinea le testine e non ferma oscillazioni d'intonazione. Un grande aumento può sollecitare il nastro proprio dove è già in difficoltà."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "John G. McKnight: polarizzazione nella registrazione magnetica", "url": "https://cdn.shopify.com/s/files/1/0720/0627/1232/files/mcknight_biasing.pdf?v=1763068428"}, {"title": "NAK T-100: lista di controllo delle misure", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["high-frequency-saturation", "different-decks", "normalization-compression-eq"]
guideType: "procedure"
prerequisites: ["frequency-response"]
next: ["recording-profile"]
---

## Verifica se la differenza è correggibile

Esegui due [prove di risposta a basso livello](../frequency-response/) senza cambiare impostazioni. La stessa differenza ampia dovrebbe comparire in entrambi i canali e ripetersi. Se aumenta registrando più forte, sospetta la [saturazione](../high-frequency-saturation/), per cui aumentare ancora è spesso controproducente.

Conserva sorgente e ritorno non corretti. Servono una cassetta sacrificabile, lo stesso percorso e un estratto musicale con transienti brillanti e note sostenute.

## Prova una correzione piccola

1. Individua una differenza ampia e ripetibile, non una piccola ondulazione o una banda sommersa nel rumore. Controlla prima tipo di nastro, NR e meccanica.
2. Duplica le impostazioni di elaborazione. Se un profilo applica già una correzione, controllala prima di aggiungerne un'altra manualmente.
3. Fai un tentativo modesto: per esempio **1 dB** su una zona ampia è un esperimento reversibile, non un valore obbligatorio per un tipo di nastro.
4. Verifica il margine digitale e riduci il guadagno complessivo se l'EQ aumenta i picchi. Mantieni REC LEVEL e controlli della scheda nelle posizioni misurate.
5. Registra estratti corretti e non corretti nelle stesse condizioni. Riavvolgi e acquisiscili. Confronta a volume percepito simile su copie, mantenendo i file originali intatti.
6. Conserva la modifica soltanto se la nuova registrazione è più equilibrata senza alte ruvide, maggior distorsione o stereo instabile. Se puoi, ascoltala su un'altra piastra prima di produrre molte copie.

## Quando la correzione fallisce

Esempio ipotetico: la misura bassa mostra −4 dB a 8 kHz. Un aumento di +4 dB rende i piatti più aspri senza recuperarne la chiarezza. Potrebbero mancare margine o allineamento: ridurre correzione o livello è più utile che inseguire un grafico piatto.

Anche una compensazione ricavata dalla lettura di una sola macchina può essere eccessiva altrove. Leggi [perché le piastre differiscono](../different-decks/) prima di considerarla universale.

## Il ruolo di MixtapeForge

Nel prototipo 0.1 il profilo guidato propone EQ limitata e attenuazione dei canali secondo misure e controlli di affidabilità. Le bande incerte possono restare invariate. Una correzione assente non autorizza a forzarle manualmente.

Controllo finale: differenza ripetibile, un solo stadio correttivo, margine, nuova prova sul nastro e impostazioni originali conservate. Salva un [profilo nominato](../recording-profile/) dopo la conferma d'ascolto.
