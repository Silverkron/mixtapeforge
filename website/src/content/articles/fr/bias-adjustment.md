---
id: "bias-adjustment"
lang: "fr"
title: "Comprendre le bias et utiliser les réglages externes"
description: "Savoir ce que change la prémagnétisation, pourquoi plus d’aigus n’est pas toujours mieux et quand le manuel est indispensable."
primaryKeyword: "Comprendre le bias et utiliser les réglages externes"
secondaryKeywords: ["le test de réponse à faible niveau","distorsion basse fréquence","la saturation","Bias, égalisation et réduction de bruit"]
searchIntent: "informational"
answer: "Le bias, ou prémagnétisation, est un signal électrique haute fréquence produit dans la platine pendant l'enregistrement. Il aide la bande à répondre plus régulièrement à l'audio. Ce n'est pas un filtre informatique : augmenter les aigus ne le modifie pas."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "John G. McKnight : polarisation en enregistrement magnétique", "url": "https://cdn.shopify.com/s/files/1/0720/0627/1232/files/mcknight_biasing.pdf?v=1763068428"}, {"title": "NAK T-100 : liste de contrôle des mesures", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["bias-eq-nr", "high-frequency-saturation", "recording-profile"]
guideType: "explainer"
prerequisites: ["frequency-response"]
next: ["distortion-test", "recording-sensitivity"]
---

Le bias influence réponse à faible niveau, sensibilité et distorsion. Le tourner jusqu'au son le plus brillant peut donc dégrader le résultat global.

## Identifier les commandes

Certaines platines s'étalonnent automatiquement, d'autres disposent d'un réglage externe ou de tonalités internes. Beaucoup n'offrent rien à l'utilisateur. Consultez le manuel exact avant de commencer ; n'ouvrez pas l'appareil et ne déplacez pas de réglages internes à partir d'une méthode générique.

Si l'étalonnage automatique existe, utilisez la cassette prévue avec la préparation prescrite. En cas d'échec répété sur un exemplaire, essayez une autre bande saine avant de soupçonner la platine.

## Comparer un réglage externe

Avec une commande utilisateur de bias, prenez une cassette sacrifiable, les connexions habituelles, NR coupé et [le test de réponse à faible niveau](../frequency-response/).

1. Photographiez ou marquez la position initiale. Faites une prise de référence et gardez sa capture.
2. Respectez tonalités, niveau et ordre d'ajustement du manuel. Fixez sortie du PC et gain d'acquisition.
3. Faites un petit changement réversible dans la plage de la commande. Identifiez la nouvelle section par cette position dans vos notes.
4. Relisez et comparez aigus et [distorsion basse fréquence](../distortion-test/), pas seulement la courbe la plus brillante.
5. Revenez au point initial si le résultat est instable ou sans bénéfice clair. Vérifiez avec de la musique au niveau prévu avant de créer un profil.

## Comprendre l'overbias

Une procédure d'overbias recherche d'abord un maximum de sortie pour un signal, puis augmente encore le bias jusqu'à une baisse prescrite pour la méthode et la combinaison concernées. Fréquence et baisse ne sont pas universelles.

Exemple hypothétique : « augmenter le bias jusqu'à une baisse de 1,5 dB depuis le maximum » décrit la sortie mesurée, pas une baisse du volume informatique. Ce chiffre est illustratif, pas un réglage recommandé pour toutes les cassettes.

## Éviter les faux progrès

Des aigus plus présents avec davantage de distorsion constituent un compromis. Si seuls les aigus forts souffrent, vérifiez [la saturation](../high-frequency-saturation/) avant le bias. Une réponse variable entre lectures invite à examiner bande et transport.

Conservez identité de bande, position de commande et conditions de réponse/distorsion. MixtapeForge mémorise des conditions et propose une correction numérique limitée ; il ne règle pas l'oscillateur de bias à distance.
