---
id: "recording-levels"
lang: "it"
title: "Livelli di registrazione: evitare distorsione e volume troppo basso"
description: "Regola il livello con una registrazione breve che resti pulita nei passaggi più forti."
primaryKeyword: "Livelli di registrazione"
secondaryKeywords: ["collegamenti dal computer","normalizzazione e compressione","diagnostica","Come registrare una cassetta dal computer"]
searchIntent: "task"
answer: "Regola il livello con una registrazione breve che resti pulita nei passaggi più forti. Un indicatore più alto non significa automaticamente una cassetta migliore: troppo livello può rendere ruvida la voce e confusi o spenti i piatti."
category: "recording"
image: "recording"
updated: "2026-11-01"
sources: [{"title": "TEAC W-1200 — funzioni e tipi di nastro", "url": "https://teac.jp/jp/support/news/5488"}, {"title": "Audacity — glossario audio digitale", "url": "https://manual.audacityteam.org/man/glossary.html"}]
guideType: "procedure"
related: ["recording-computer", "normalization-compression-eq", "distorted-recordings"]
prerequisites: ["recording-computer"]
next: ["recording-computer"]
---

## Distingui le due scale

Il meter digitale dell’app usa dBFS: 0 è il limite digitale. La piastra ha una propria scala, spesso centrata su 0 dB, che non equivale a 0 dBFS. Senza conoscere uscita reale e posizione di REC LEVEL non puoi prevedere il suo valore.

## Regola il livello registrando

Prepara i [collegamenti dal computer](../recording-computer/), il nastro definitivo, un passaggio forte e uno tranquillo. Imposta prima tipo e NR. Mantieni fisso il volume del computer e della scheda.

1. Metti la piastra in pausa di registrazione. Riproduci il passaggio forte e porta REC LEVEL nella zona iniziale consigliata dal manuale. Non applicare una regola universale di +3 dB.
2. Registra circa 30 secondi, ferma, riavvolgi e ascolta dal nastro. Controlla canali, consonanti, attacchi del basso e piatti.
3. Se il risultato è più ruvido della sorgente, abbassa REC LEVEL e ripeti lo stesso punto. Cambia un solo comando. Se distorce anche basso, verifica che sorgente e scheda non fossero già sovraccariche.
4. Ascolta il passaggio tranquillo. Se il fruscio lo copre, prova un livello leggermente maggiore solo finché la parte forte resta pulita. Scegli il compromesso più chiaro, non quello più forte.
5. Annota dispositivo e volume d’uscita, REC LEVEL, nastro e NR; mantienili per tutto il lato.

In **EQ / Audio** trovi [normalizzazione e compressione](../normalization-compression-eq/), che non tarano il meter fisico. Con Type B software segui l’allineamento dei livelli e non cambiare liberamente il guadagno dopo la codifica.

**Controllo finale:** niente clipping digitale; parte forte pulita; parte quieta utilizzabile; impostazioni annotate. Se distorce ancora, passa alla [diagnostica](../distorted-recordings/).
