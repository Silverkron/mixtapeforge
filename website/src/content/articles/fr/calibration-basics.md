---
id: "calibration-basics"
lang: "fr"
title: "Étalonnage cassette : choisir le test avant de toucher aux réglages"
description: "Comprendre ce que mesure chaque essai, préparer une liaison fiable et choisir la prochaine vérification."
primaryKeyword: "Étalonnage cassette"
secondaryKeywords: ["quel témoin choisir pour chaque mesure","les essais sans bande de référence","profil d'enregistrement","Vérifier l’interface avant d’accuser la cassette"]
searchIntent: "informational"
answer: "Un enregistrement peut sembler sourd à cause de la cassette, de l'électronique d'enregistrement, de l'alignement en lecture ou des réglages d'acquisition. Étalonner consiste à comparer un résultat à une référence connue, puis à régler la partie concernée. Enregistrer une tonalité et la relire est utile, mais ne sépare pas tous ces éléments."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100 : caractéristiques officielles", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "REW : configuration de l’interface audio", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}, {"title": "MRL : choix et domaine des bandes de référence", "url": "https://mrltapes.com/pages/product-guide"}]
related: ["loopback-round-trip", "calibration-tapes", "recording-profile"]
guideType: "explainer"
prerequisites: []
next: ["needs-calibration", "without-reference-tape"]
---

## Commencer par la question

| Question | Test utile | Éléments inclus |
| --- | --- | --- |
| L'interface modifie-t-elle le signal ? | Boucle directe sortie–entrée | Sortie, câble et entrée |
| Cette bande enregistre-t-elle correctement ici ? | Enregistrement, rembobinage, lecture | Interface, enregistrement, bande et lecture |
| La vitesse de lecture est-elle correcte ? | Cassette de vitesse de référence | Mécanique de lecture et incertitude du témoin |
| Comment améliorer la prochaine mixtape ? | Profil reproductible | Compensation de la combinaison mesurée |

Une **cassette de référence** porte un signal dont les caractéristiques enregistrées sont connues. Une bande enregistrée par la machine testée n'est pas une référence indépendante. Voir [quel témoin choisir pour chaque mesure](../calibration-tapes/).

## Préparer un point de départ fiable

Il faut une platine fonctionnelle, une cassette sacrifiable, un ordinateur et une interface avec entrées/sorties ligne stéréo. Une entrée micro avec gain automatique ne convient pas : elle modifie le niveau à comparer.

1. Reliez les sorties L/R de l'interface à LINE IN L/R, puis LINE OUT L/R aux entrées ligne. Coupez le retour logiciel de l'entrée vers la sortie pour éviter une boucle.
2. Choisissez les ports physiques dans le logiciel et une fréquence d'échantillonnage commune. 44,1 ou 48 kHz suffisent aux premières vérifications de bande audible si les appareils les acceptent.
3. Désactivez Dolby/NR, égalisation, compression et niveau automatique. Sélectionnez le bon type de bande.
4. Partez d'un faible niveau. Enregistrez un essai après l'amorce transparente, rembobinez et relisez. Réduisez le gain d'entrée si le niveau numérique écrête.
5. Répétez sans déplacer les commandes. Si les résultats diffèrent nettement, cherchez l'instabilité avant de la compenser.

Une platine trois têtes permet d'écouter la bande pendant l'enregistrement. Avec deux têtes, il faut enregistrer, rembobiner puis lire ; le mode Source ne prouve pas ce qui a été inscrit.

## Passer de l'observation à la décision

Exemple hypothétique : deux essais montrent 2 dB d'aigus en moins. Cela justifie d'examiner toute la chaîne, pas d'ajouter immédiatement 2 dB. Une perte variable entre passages se prête encore moins à une égalisation fixe.

Commencez par [les essais sans bande de référence](../without-reference-tape/). Pour mémoriser un réglage, suivez le [profil d'enregistrement](../recording-profile/). MixtapeForge 0.1 propose un test guidé de la chaîne complète ; il ne certifie ni l'alignement mécanique ni une vitesse de lecture indépendante.
