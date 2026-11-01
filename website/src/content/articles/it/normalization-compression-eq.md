---
id: "normalization-compression-eq"
lang: "it"
title: "Normalizzazione, compressione ed EQ: tre lavori diversi"
description: "Usa la normalizzazione per differenze tra brani, la compressione per variazioni eccessive dentro un brano e l’EQ per il timbro."
primaryKeyword: "Normalizzazione, compressione ed EQ"
secondaryKeywords: ["prova registrata","le cause prima di alzare gli alti","il profilo di registrazione","Livelli di registrazione"]
searchIntent: "task"
answer: "Usa la normalizzazione per differenze tra brani, la compressione per variazioni eccessive dentro un brano e l’EQ per il timbro. Parti con tutto disattivato: ogni intervento dovrebbe risolvere un problema udibile preciso."
category: "recording"
image: "recording"
updated: "2026-11-01"
sources: [{"title": "Audacity — normalizzazione del volume percepito", "url": "https://manual.audacityteam.org/man/loudness_normalization.html"}, {"title": "Audacity — controlli del compressore", "url": "https://manual.audacityteam.org/man/compressor.html"}, {"title": "Audacity — glossario audio digitale", "url": "https://manual.audacityteam.org/man/glossary.html"}]
guideType: "procedure"
related: ["recording-levels", "recording-profile", "muffled-cassettes"]
prerequisites: []
next: ["recording-levels"]
---

## I tre controlli

La normalizzazione applica guadagno. Peak uniforma i picchi massimi, non il volume percepito. LUFS stima quest’ultimo; Album applica un guadagno comune conservando i rapporti. La compressione riduce la dinamica: la soglia decide quando interviene, il rapporto quanto, attacco e rilascio con quale rapidità. L’EQ alza o abbassa bande di frequenza, come bassi e alti.

## Una modifica alla volta in MixtapeForge

1. Apri **EQ / Audio** e scegli un passaggio noto. Ascolta l’originale.
2. Per una compilation disomogenea prova LUFS in Normalizzazione; per un album continuo prova Album. Lascia il limite true peak sotto 0 dBTP: −1 dBTP è un esempio iniziale, non un riferimento di taratura del nastro. Il limite ha precedenza sul target di volume.
3. Lascia spenta la compressione se non hai picchi problematici. **Leggera** è un punto di partenza: rapporto 1,5:1, soglia −18 dB, attacco 30 ms, rilascio 250 ms. L’effetto dipende dal livello sorgente. Se i colpi perdono attacco o il volume ondeggia, riduci l’intervento o disattivalo.
4. Parti con EQ piatta. Muovi poco una banda e riascolta, oppure scegli un preset osservando le variazioni. Un genere musicale indica un gusto, non corregge automaticamente il tipo di nastro.
5. Confronta originale/master a volume simile e fai una [prova registrata](../recording-levels/). Conserva la versione che migliora il nastro, non solo il grafico.

Se resta cupa, verifica [le cause prima di alzare gli alti](../muffled-cassettes/). Il software non ripara il percorso del nastro. Con NR software esegui gli interventi musicali prima della codifica, evitando EQ o normalizzazione successive.

**Finito:** problema identificato e migliorato, picchi controllati, attacchi preservati, riascolto sul nastro. Per compensazioni misurate usa [il profilo di registrazione](../recording-profile/), separato dall’EQ musicale.
