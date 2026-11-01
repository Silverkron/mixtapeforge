---
id: "dolby-b"
lang: "fr"
title: "Dolby B : comment il réduit le souffle"
description: "Comprendre Dolby B et choisir où encoder pour éviter un double traitement."
primaryKeyword: "Dolby B"
secondaryKeywords: ["guide des niveaux","vérifications Dolby","logiciels NR","Dolby et dbx en logiciel"]
searchIntent: "informational"
answer: "Le Dolby B réduit le souffle continu, le « chhh » derrière les passages calmes d'une cassette. Il intervient en deux temps : l'encodage modifie le signal avant l'enregistrement ; le décodage annule cette modification à la lecture et atténue le souffle ajouté par la bande. Il ne supprime pas le bruit déjà présent dans la source."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Dolby Laboratories · CP45 · Appendix D", "url": "https://www.film-tech.com/warehouse/manuals/DOLBYCP45USERS.pdf"}, {"title": "IASA · TC-04 · 5.4.11", "url": "https://www.iasa-web.org/book/export/html/435"}, {"title": "libdolbyb", "url": "https://codeberg.org/martinwguy/libdolbyb"}]





guideType: "explainer"
prerequisites: []
next: ["dolby-b-c-s-playback", "dull-dolby"]
related: ["software-noise-reduction", "bias-eq-nr", "recording-levels"]
---

## Que devient la musique ?

À l'encodage, la fin discrète d'une cymbale reçoit davantage d'accentuation des aigus qu'un coup puissant. Le décodeur applique la réduction correspondante. Cette action suit la musique : un réglage fixe des aigus ne peut pas la reproduire. Une cassette encodée, lue avec NR désactivé, paraît souvent plus brillante et plus bruyante. Le mode B doit rétablir un équilibre naturel, sans tout assourdir.

## Premier essai avec la platine

Il faut une platine permettant l'enregistrement et la lecture Dolby B, une cassette vierge adaptée, un casque et un passage familier contenant voix, percussions et une fin calme. Aucun analyseur n'est nécessaire pour cet essai d'écoute.

1. Relie la sortie ligne stéréo de l'ordinateur ou de l'interface à LINE IN L/R de la platine. Commence à faible niveau et règle le passage le plus fort avec le [guide des niveaux](../recording-levels/).
2. Sélectionne le bon type de bande, désactive l'encodage logiciel et active Dolby B sur la platine. Elle sera le seul encodeur.
3. Enregistre environ une minute, fin comprise. Arrête, rembobine et lis avec Dolby B activé.
4. Compare avec l'original à volume d'écoute proche. Ajuste le casque ou l'amplificateur, pas REC LEVEL.
5. Désactive brièvement NR à la lecture, puis rétablis B. Écoute le souffle dans la pause et la décroissance de la cymbale.

Le résultat doit conserver une voix et des résonances naturelles avec moins de souffle. Si B étouffe les voix ou les cymbales, suis les [vérifications Dolby](../dull-dolby/) avant d'ajouter une égalisation.

## Avec un encodeur logiciel

MixtapeForge 0.1 propose **Type B · libdolbyb**, en option dans les réglages audio. Enregistre alors avec NR **OFF** sur la platine, puis lis la cassette avec Dolby B matériel **ON**. L'aperçu encodé de l'application n'est pas le résultat décodé. La compatibilité avec ta platine demande un court essai enregistré et un alignement du niveau de référence : une valeur de 0 ne désactive pas l'encodage et ne signifie pas « enregistrer à 0 dB sur la platine ».

Le guide des [logiciels NR](../software-noise-reduction/) détaille les outils. Avant une face entière, vérifie : un encodeur, un décodeur correspondant, des niveaux stables et une fin musicale bien conservée.
