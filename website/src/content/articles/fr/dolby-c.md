---
id: "dolby-c"
lang: "fr"
title: "Dolby C : les différences avec Dolby B"
description: "Pourquoi Dolby C demande une lecture correspondante et comment vérifier les décodeurs logiciels."
primaryKeyword: "Dolby C"
secondaryKeywords: ["Dolby B","guide des niveaux","le décodage et la lecture","Dolby S"]
searchIntent: "informational"
answer: "Le Dolby C réduit le bruit à l'enregistrement et à la lecture avec une action plus importante que le Dolby B. Il relève les détails faibles au-dessus du souffle, puis annule ce traitement à la lecture. Une cassette enregistrée en C exige donc un décodeur C : B n'est pas une variante plus douce."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Dolby Laboratories · CP45 · Appendix D", "url": "https://www.film-tech.com/warehouse/manuals/DOLBYCP45USERS.pdf"}, {"title": "Anaxwaves · DDi Codec", "url": "https://www.anaxwaves.com/DDiCodec/"}]





guideType: "explainer"
prerequisites: ["dolby-b"]
next: ["dolby-b-c-s-playback", "software-noise-reduction"]
related: ["dull-dolby", "playback-compatibility", "recording-levels"]
---

Le Dolby C réduit le bruit à l'enregistrement et à la lecture avec une action plus importante que le [Dolby B](../dolby-b/). Il relève les détails faibles au-dessus du souffle, puis annule ce traitement à la lecture. Une cassette enregistrée en C exige donc un décodeur C : B n'est pas une variante plus douce.

## Pourquoi les modes doivent correspondre

Écoute le souffle discret d'une voix suivi d'un coup de batterie puissant. Le décodage correct doit conserver leur rapport. Un mauvais mode peut exagérer ou faire disparaître le souffle de la voix, tandis que le bruit de fond monte et descend avec la musique. Cet effet est appelé **pompage**. Ce n'est pas un simple déséquilibre tonal constant à corriger avec une égalisation.

## Un essai enregistré utile

Prévois une platine avec C, une cassette vierge adaptée, la source originale et un casque. Relie la sortie ligne stéréo de la source à LINE IN L/R ; écoute depuis la platine ou l'amplificateur.

1. Désactive le NR logiciel, sélectionne C sur la platine et règle correctement le type de bande.
2. Lis le passage le plus fort et règle REC LEVEL selon le manuel. Le [guide des niveaux](../recording-levels/) explique les indicateurs.
3. Enregistre une minute avec des passages faibles et forts. Arrête et rembobine.
4. Lis avec C activé et compare à la source à volume proche, y compris la fin calme.
5. Si la cassette est destinée à une autre platine, vérifie aussi sa lecture avant d'enregistrer toute la face.

Si cette seconde platine n'a pas C, choisis un autre format. Si les deux possèdent C mais qu'une seule paraît étouffée, vérifie [le décodage et la lecture](../dull-dolby/) avant d'éclaircir définitivement le master.

## Logiciels disponibles

[DDi Codec](https://www.anaxwaves.com/DDiCodec/) encode et décode B/C dans une application commerciale séparée. Ses réglages demandent toujours une référence fiable ou un ajustement reconnu comme subjectif. MixtapeForge 0.1 n'intègre pas d'encodeur C : son option Type B ne prépare pas une cassette C.

Avant de conserver l'essai, vérifie C aux deux extrémités, des passages forts propres et des fins de notes naturelles.

Pour une autre approche des passages calmes, compare le [Dolby S](../dolby-s/) avant de choisir ton format.
