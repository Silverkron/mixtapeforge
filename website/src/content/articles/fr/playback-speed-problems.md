---
id: "playback-speed-problems"
lang: "fr"
title: "Cassette trop rapide ou trop lente : que vérifier ?"
description: "Distinguer erreur constante, bande freinée, vitesse d’origine et transport instable."
primaryKeyword: "Cassette trop rapide ou trop lente"
secondaryKeywords: ["hauteur qui oscille","test de vitesse","pleurage et scintillement","Lecture instable"]
searchIntent: "diagnosis"
answer: "Une cassette constamment trop rapide monte en hauteur et raccourcit la musique ; trop lente, elle descend et l'allonge. C'est différent d'une hauteur qui oscille. Identifie le symptôme avant de chercher un réglage moteur."
category: "troubleshooting"
image: "portable"
updated: "2026-11-01"
sources: [{"title": "Sony · 00027611", "url": "https://www.sony.com/electronics/support/audio-video-audio-components/tc-w530/articles/00027611"}, {"title": "Anaxwaves · NAK T-100", "url": "https://www.anaxwaves.com/NAKT100/"}]

guideType: "troubleshooting"
prerequisites: []
next: ["speed-test"]
related: ["wobbly-playback", "wow-flutter", "calibration-tapes"]
---

Une cassette constamment trop rapide monte en hauteur et raccourcit la musique ; trop lente, elle descend et l'allonge. C'est différent d'une [hauteur qui oscille](../wobbly-playback/). Identifie le symptôme avant de chercher un réglage moteur.

## Vérifications sans ouvrir le lecteur

Prévois un enregistrement connu, le manuel et, pour un portable, des piles neuves ou l'alimentation prescrite. Chronomètre et source originale aident, mais ne remplacent pas une bande étalon.

1. Vérifie la vitesse normale et centre le réglage pitch éventuel. Ne compare pas éditions, remasters ou interprétations différentes comme si elles étaient identiques.
2. Essaie la cassette connue puis une seconde saine. Note si les deux sont constamment trop aiguës/graves ou changent de hauteur en cours de lecture.
3. Sur un portable, recommence avec des piles neuves. Observe le mouvement ; arrête si la bande force ou s'emmêle.
4. Si possible, compare sur une seconde platine. Une seule cassette fausse sur les deux peut avoir été enregistrée à mauvaise vitesse ; toutes fausses sur un lecteur orientent vers lui.
5. Pour mesurer réellement, procure-toi une bande étalon avec un signal documenté de 3 000 ou 3 150 Hz et suis le [test de vitesse](../speed-test/).

## Comprendre le résultat

Un signal étalon de 3 000 Hz lu à 3 030 Hz indique +1 % : `(3030 / 3000 − 1) × 100`. C'est un exemple de calcul, pas une mesure effectuée ici. Utilise la fréquence nominale inscrite : confondre 3 000 et 3 150 produit une forte erreur apparente.

Enregistrer puis relire son propre signal sur la même platine ne détermine pas la vitesse absolue : des erreurs semblables peuvent s'annuler. Ne tourne pas de réglages internes à l'oreille. Après intervention selon le manuel de service, vérifie séparément le [pleurage et scintillement](../wow-flutter/) : une moyenne correcte ne garantit pas la stabilité.
