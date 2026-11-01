---
id: "wow-flutter"
lang: "fr"
title: "Comment mesurer le pleurage et le scintillement d’une platine cassette"
description: "Choisir le bon détecteur et rapporter les fluctuations de vitesse selon une méthode comparable."
primaryKeyword: "Comment mesurer le pleurage et le scintillement d’une platine cassette"
secondaryKeywords: ["la vitesse moyenne","le transport","Choisir la cassette d’étalonnage adaptée à votre mesure","NAK T-100"]
searchIntent: "evaluation"
answer: "Le pleurage est une lente variation de hauteur ; le scintillement est plus rapide et peut rendre les notes tenues rugueuses. Tous deux viennent des variations de vitesse. Une erreur constante peut rendre la musique aiguë avec peu de fluctuations : mesurez ces phénomènes séparément."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100 : caractéristiques officielles", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "NAK T-100 : liste de contrôle des mesures", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["calibration-tapes", "nak-t100-practical-guide", "different-decks"]
guideType: "measurement"
prerequisites: ["speed-test"]
next: ["playback-speed-problems"]
---

## Préparer le matériel

Utilisez NAK T-100, une entrée ligne stéréo et une **cassette documentée de 3000 ou 3150 Hz pour vitesse/pleurage**. Sa propre instabilité doit être suffisamment faible pour le modèle évalué. Reliez LINE OUT L/R à LINE IN L/R et coupez traitements et gain automatique.

Vérifiez d'abord [la vitesse moyenne](../speed-test/). Gardez l'écoute basse, car le signal est aigu et continu.

## Garder la même convention

1. Choisissez **Speed Wow/Flutter**, puis faites correspondre **Speed Cal.** au témoin.
2. Lisez un passage stable avec un niveau clair sans écrêtage ; choisissez Tape sur le sélecteur de contrôle éventuel.
3. Sélectionnez le détecteur correspondant à la spécification comparée. Le développeur indique **Q-PK** avec DIN 45507, **WRMS** avec JIS, et des modes crête/RMS non pondérés. La pondération favorise certaines vitesses de fluctuation ; le détecteur définit leur résumé numérique.
4. Observez environ trente secondes après le démarrage. Notez détecteur, pondération, gamme et durée avec la valeur en pourcentage. Si elle atteint la limite d'affichage, changez Meter Range.
5. Répétez le même passage puis une autre section. Distinguez un pic isolé de la valeur habituelle, sans conserver seulement le meilleur chiffre.
6. Gardez la capture brute si possible. Pour un réparateur, ajoutez graphique ou observations répétées au nombre.

## Comparer justement

Exemple hypothétique : **0,08% WRMS** et **0,15% Q-PK** peuvent décrire le même mécanisme selon deux méthodes. Le nombre supérieur ne signifie pas une dégradation. Il faut les mêmes détecteur, pondération, cassette et durée.

Un signal auto-enregistré révèle des problèmes de répétabilité, mais inclut le transport à l'enregistrement et à la lecture. Il n'isole pas la lecture comme le ferait un témoin indépendant.

## Si la courbe saute

Un pic peut provenir de la bande, du contact, d'une perturbation mécanique ou d'une coupure d'acquisition. Relisez : un saut au même endroit oriente vers cette section ; des trous numériques aléatoires invitent à vérifier buffers et charge du PC. Aucun indice ne désigne seul un composant.

Contrôle final : tonalité connue, absence d'écrêtage, méthode cohérente, sections répétées et référence conservée. EQ et NR ne réparent pas la vitesse ; examinez [le transport](../playback-speed-problems/) avant de créer un profil.
