---
id: "dnl-dnr"
lang: "fr"
title: "DNL et DNR : réduire le bruit sans encodeur à l’enregistrement"
description: "Comprendre les traitements de lecture et distinguer confort d’écoute et décodage fidèle."
primaryKeyword: "DNL et DNR"
secondaryKeywords: ["décodeur Dolby","logiciels NR","ronflement électrique","Dolby B"]
searchIntent: "informational"
answer: "DNL et DNR réduisent le bruit à la lecture sans exiger une cassette préalablement encodée. Ils atténuent le bruit aigu en adaptant la réponse de lecture au signal. Ils ne remplacent pas le décodeur Dolby correspondant à l'enregistrement."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Philips · N2510 · 1973", "url": "https://www.worldradiohistory.com/Archive-All-BC/Archive-All-Audio/Archive-Studio-Sound/70s/Studio-Sound-1973-12.pdf"}, {"title": "Texas Instruments · LM1894", "url": "https://www.ti.com/product/LM1894"}]



guideType: "explainer"
prerequisites: []
next: ["dolby-b-c-s-playback"]
related: ["dolby-b", "software-noise-reduction", "tape-hiss-snr"]
---

DNL et DNR réduisent le bruit à la lecture sans exiger une cassette préalablement encodée. Ils atténuent le bruit aigu en adaptant la réponse de lecture au signal. Ils ne remplacent pas le [décodeur Dolby](../dolby-b/) correspondant à l'enregistrement.

## Écouter le compromis

Imagine une cymbale qui s'éteint dans le souffle. Réduire les aigus rend le bruit moins gênant, mais peut raccourcir la résonance perçue. Il s'agit d'un compromis d'écoute, pas de retrouver des informations perdues.

Texas Instruments présente le DNR dans la [documentation LM1894](https://www.ti.com/product/LM1894) comme un système non complémentaire : aucun encodeur préalable n'est nécessaire. DNL est une réalisation distincte ; des noms proches n'impliquent pas les mêmes réglages ou performances.

## Essayer en préservant l'original

Il faut un lecteur avec une fonction DNL/DNR documentée et une cassette connue. En restauration logicielle, conserve une acquisition intacte et travaille sur une copie.

1. Règle d'abord l'égalisation de lecture et, si nécessaire, le décodeur Dolby correspondant.
2. Écoute une voix faible ou des instruments acoustiques avec DNL/DNR désactivé. Observe consonnes et réverbérations, pas seulement les pauses.
3. Active la fonction prévue par le manuel et répète le passage à volume proche.
4. Si elle est réglable, garde le traitement minimum utile. Avec un simple interrupteur, laisse-la coupée si la perte de détails dépasse le gain de silence.

Une pause plus silencieuse accompagnée de détails disparus est un compromis, pas une fidélité accrue. Si le fond monte et descend de façon gênante, réduis ou désactive le traitement.

MixtapeForge n'intègre pas DNL/DNR. Les débruiteurs modernes peuvent avoir un objectif voisin, sans émuler ces circuits : le guide des [logiciels NR](../software-noise-reduction/) distingue ces fonctions. Note séparément le décodeur, le débruitage supplémentaire et ta préférence d'écoute.

Un [ronflement électrique](../hum-buzz/) demande une vérification des connexions plutôt qu’un essai de limitation des aigus.
