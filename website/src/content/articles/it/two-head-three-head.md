---
id: "two-head-three-head"
lang: "it"
title: "Piastre a due e tre testine: registrazione, ascolto e calibrazione"
description: "La differenza utile è quando puoi ascoltare ciò che hai appena inciso."
primaryKeyword: "Piastre a due e tre testine"
secondaryKeywords: ["collegamenti dal computer","test dei livelli","flusso di calibrazione","Come registrare una cassetta dal computer"]
searchIntent: "informational"
answer: "La differenza utile è quando puoi ascoltare ciò che hai appena inciso. Una piastra a tre testine con monitor dal nastro lo permette durante la registrazione; con una normale due testine devi fermare e riavvolgere."
category: "recording"
image: "recording"
updated: "2026-11-01"
sources: [{"title": "TASCAM 122MKIII / 112MKII — manuale, monitor e registrazione", "url": "https://www.tascam.eu/en/docs/112mkII_122mkIII_manual.pdf"}]
guideType: "explainer"
related: ["recording-computer", "recording-levels", "calibration-basics"]
prerequisites: []
next: ["recording-computer"]
---

## Cosa fanno le testine

La testina di cancellazione elimina il segnale precedente. In una due testine, una testina combinata registra oppure legge; in una tre testine le due funzioni sono separate. Quella di lettura può così leggere il nastro appena inciso. Non significa che ogni tre testine sia migliore: contano condizioni e allineamento.

## Verifica cosa stai ascoltando

Servono cuffie collegate alla piastra, un nastro vergine e i [collegamenti dal computer](../recording-computer/).

1. Cerca nel manuale la sezione monitor. SOURCE/INPUT indica normalmente il segnale in ingresso, prima della registrazione. TAPE o una modalità AUTO documentata può selezionare il nastro sulle piastre adatte.
2. Registra un passaggio noto. Su una tre testine alterna sorgente e nastro come indicato dal manuale. Considera il piccolo ritardo: confronta timbro e distorsione, non solo il volume.
3. Su una due testine ferma, riavvolgi e riproduci lo stesso passaggio. Durante la registrazione potresti sentire solo l’ingresso. Il manuale TASCAM distingue esplicitamente il monitor dal nastro della 122MKIII da quello d’ingresso della 112MKII.
4. Se il nastro suona peggio, ripeti il [test dei livelli](../recording-levels/) prima di toccare regolazioni interne.

**Controlla:** sorgente del monitor identificata, nastro realmente ascoltato, NR coerente, volume d’ascolto simile. MixtapeForge non aggiunge una testina fisica: il [flusso di calibrazione](../calibration-basics/) può analizzare la prova dopo il riavvolgimento.
