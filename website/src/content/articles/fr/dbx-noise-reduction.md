---
id: "dbx-noise-reduction"
lang: "fr"
title: "Réduction de bruit dbx : Type I, Type II et lecture adaptée"
description: "Pourquoi les cassettes dbx demandent le bon décodeur plutôt qu’un simple compresseur."
primaryKeyword: "Réduction de bruit dbx"
secondaryKeywords: ["niveaux","dropouts","guide NR logiciel","Dolby B"]
searchIntent: "informational"
answer: "Le dbx pour cassette comprime l'écart entre sons faibles et forts avant l'enregistrement, puis le rétablit par expansion à la lecture. Un compandeur associe compresseur et expanseur. Avec une compression idéale 2:1, une variation de 20 dB devient 10 dB sur bande ; le décodeur rétablit la variation initiale. C'est un exemple de principe, pas une mesure de platine."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Anaxwaves · DxI Codec", "url": "https://anaxwaves.com/DxICodec/"}, {"title": "Anaxwaves · DxII Codec", "url": "https://www.anaxwaves.com/DxIICodec/"}, {"title": "u-he · Satin 1.3.3", "url": "https://u-he.com/downloads/manuals/plugins/satin/Satin-user-guide.pdf"}]





guideType: "explainer"
prerequisites: []
next: ["software-noise-reduction", "playback-compatibility"]
related: ["dolby-b", "recording-levels", "tape-dropouts"]
---

## Identifier le format

Type I et Type II sont des formats dbx différents : ce chiffre ne désigne pas la formulation magnétique de la cassette. Une cassette Type II peut contenir du Dolby, du dbx ou aucun NR. Consulte le manuel du magnétophone et utilise le décodeur correspondant. Sans décodage, le son peut sembler comprimé et déséquilibré.

## Un court essai matériel

Prévois une platine fonctionnelle avec le dbx requis, une cassette vierge adaptée et un casque. Relie la sortie ligne stéréo de la source à LINE IN L/R.

1. Désactive le NR logiciel et sélectionne le mode dbx d'enregistrement décrit dans le manuel.
2. Règle les [niveaux](../recording-levels/) sur le passage le plus fort. Le compandeur ne répare pas un signal écrêté.
3. Enregistre voix, basse soutenue et fins de cymbales. Arrête, rembobine et lis avec le dbx correspondant.
4. Compare à la source à volume proche. Recherche une dynamique naturelle et un fond qui ne gonfle pas après les notes de basse.

Si de brèves pertes deviennent évidentes, vérifie les [dropouts](../tape-dropouts/). L'expansion peut accentuer les erreurs sans en identifier la cause. Essaie une autre cassette propre avant de modifier le traitement.

## Logiciels à évaluer

Anaxwaves propose [DxII Codec](https://www.anaxwaves.com/DxIICodec/) pour Type II/Disc et [DxI Codec](https://anaxwaves.com/DxICodec/) pour Type I/Disc. [Satin](https://u-he.com/products/satin/) comprend des modèles uhx I/II. Ce sont des outils séparés, pas des étages dbx intégrés à MixtapeForge. Consulte les manuels et teste le mode exact avec ton matériel, sans effets de simulation de bande étrangers à l'essai. Lis le [guide NR logiciel](../software-noise-reduction/) avant de transférer toute une cassette.
