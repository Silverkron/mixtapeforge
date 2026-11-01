---
id: "maximum-output-level"
lang: "fr"
title: "Estimer la marge de bande à un seuil de distorsion déclaré"
description: "Trouver le niveau récupéré près d’un seuil de troisième harmonique et interpréter cette limite pour la musique."
primaryKeyword: "Estimer la marge de bande à un seuil de distorsion déclaré"
secondaryKeywords: ["la vérification de distorsion","la saturation des aigus","Comparer la sensibilité d’enregistrement à réglages fixes","Mesurer le souffle par rapport à un signal enregistré"]
searchIntent: "evaluation"
answer: "Le niveau de sortie maximal, MOL, exige une fréquence, un critère de distorsion et une référence. Il décrit le signal récupéré, pas simplement la position maximale de REC LEVEL. La troisième harmonique sert souvent au comparatif, mais des méthodes différentes ne sont pas équivalentes."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Anaxwaves : déterminer la marge de la bande", "url": "https://www.anaxwaves.com/MixtapeNerd/Docs/DetermineHeadroom.html"}, {"title": "NAK T-100 : caractéristiques officielles", "url": "https://anaxwaves.com/NAKT100/"}]
related: ["recording-sensitivity", "tape-hiss-snr", "eq-limits"]
guideType: "measurement"
prerequisites: ["distortion-test"]
next: ["high-frequency-saturation", "recording-levels"]
---

## Avant de commencer

Effectuez [la vérification de distorsion](../distortion-test/). Il faut NAK T-100, une cassette sacrifiable et des liaisons ligne stéréo, NR coupé et type de bande correct. Gardez l'écoute très basse. Si vous ne pouvez identifier la métrique affichée, ne présentez pas le résultat comme un MOL selon ce critère.

## Établir une limite locale

1. Choisissez **400 Hz** et **HD3**. Enregistrez un repère modéré et notez la sortie récupérée L/R. Définissez-le comme 0 dBr local, décibels relatifs à cette référence.
2. Fixez sortie de lecture et gains d'acquisition. Vérifiez que les retours plus forts gardent de la marge avant écrêtage.
3. Augmentez le signal d'enregistrement par petits pas notés, avec de courtes sections. Sur deux têtes, rembobinez puis relisez ; sur trois, utilisez Tape.
4. Lisez niveau de fondamentale et HD3 de chaque canal. Arrêtez à la limite choisie ou à la surcharge du parcours. Pour l'exemple **3% HD3**, ne remplacez pas la mesure par 3% THD+N.
5. Répétez les deux niveaux qui encadrent le seuil. Rapportez un intervalle si les pas empêchent davantage de précision, et gardez les limites L/R séparées.
6. Exprimez le retour au seuil par rapport au repère enregistré, en conservant fréquence, bande et méthode.

## Lire le résultat

Exemple hypothétique : un canal atteint 3% HD3 à +4 dBr, l'autre à +3 dBr. Cela indique environ 3 dB pour le plus faible selon cette méthode locale. Ce n'est pas un MOL fabricant si fluxivité, bias et conditions ne correspondent pas.

Si l'interface écrête d'abord, vous avez trouvé sa limite. Baissez le gain d'entrée et recommencez référence et niveaux comparés. Si le bruit domine déjà les faibles niveaux, améliorez la mesure avant de chercher un seuil.

## Application à la musique

Une tonalité grave constante ne prédit pas les cymbales. Vérifiez [la saturation des aigus](../high-frequency-saturation/) et gardez une marge pour les crêtes musicales. Réduire celles-ci peut améliorer la netteté, mais trop compresser transforme le programme.

Contrôle final : fréquence déclarée, HD3 distincte de THD+N, référence sauvegardée, entrée non saturée et canal faible conservé. Les estimations MixtapeForge ne doivent pas être annoncées comme un MOL certifié.
