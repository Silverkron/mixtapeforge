---
id: "high-frequency-saturation"
lang: "fr"
title: "Pourquoi les aigus forts disparaissent : vérifier avant d’égaliser"
description: "Comparer deux niveaux pour reconnaître une perte dépendant du signal plutôt qu’un défaut tonal fixe."
primaryKeyword: "Pourquoi les aigus forts disparaissent"
secondaryKeywords: ["réponse en fréquence","Le niveau maximal aux basses fréquences","Estimer la marge de bande à un seuil de distorsion déclaré","Mesurer la distorsion sans la confondre avec le souffle"]
searchIntent: "evaluation"
answer: "La bande peut cesser de suivre les augmentations d'aigus avant l'écrêtage numérique. C'est la saturation haute fréquence : plus d'entrée ne produit plus une hausse proportionnelle du retour. Les cymbales perdent alors leur clarté malgré un volume suffisant."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity : générateur de tonalités", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity : analyse du spectre", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "Anaxwaves : déterminer la marge de la bande", "url": "https://www.anaxwaves.com/MixtapeNerd/Docs/DetermineHeadroom.html"}]
related: ["maximum-output-level", "distortion-test", "bias-adjustment"]
guideType: "measurement"
prerequisites: ["frequency-response"]
next: ["recording-levels", "eq-limits"]
---

## Préparer la comparaison

Utilisez connexions ligne, NR coupé et méthode de [réponse en fréquence](../frequency-response/). Il faut une cassette sacrifiable et deux paires de tonalités : 1 kHz puis 8 kHz, cinq secondes chacune, identiques sur L/R.

Gardez enceintes et casque faibles ou coupés. Vous testez l'enregistrement, pas l'audition ou les tweeters. Des niveaux modérés suffisent.

## Comparer deux niveaux

1. Générez la première paire à **0,01 d'amplitude**, la seconde à **0,02**, soit le double et environ 6 dB de plus.
2. Choisissez un niveau prudent et vérifiez la marge d'acquisition. Gardez REC LEVEL, sortie d'interface et gain d'entrée fixes.
3. Enregistrez successivement les deux paires sur la même section. Rembobinez et capturez l'ensemble sans normalisation ni traitement.
4. Séparez les canaux dans Audacity et mesurez le milieu de chaque signal avec les mêmes paramètres de spectre.
5. Calculez l'augmentation du retour à 1 kHz, puis à 8 kHz. Répétez l'essai avant de conclure.

## Comprendre la hausse réduite

Exemple hypothétique : doubler l'entrée fait gagner 5,8 dB à 1 kHz mais seulement 3 dB à 8 kHz. Les aigus ne suivent plus proportionnellement. Cela suggère une limite liée au niveau quelque part dans la chaîne ; vérifiez d'abord source, interface et entrée de platine.

Si les deux montent d'environ 6 dB, mais que le 8 kHz reste 3 dB sous le repère dans les deux essais, il s'agit plutôt d'un écart de réponse stable à ces niveaux.

## Choisir la suite

Réenregistrez le même extrait musical plus bas. Si les cymbales retrouvent leur netteté, préservez cette marge plutôt que d'ajouter des aigus. Comparez une autre cassette et les réglages externes documentés, s'ils existent.

Un signal bas noyé dans le bruit peut simuler un plateau : ne prenez pas le fond pour une limite de saturation. Si le résultat varie à chaque lecture, vérifiez d'abord le contact de bande.

Contrôle final : hausse connue de 6 dB, commandes fixes, capture propre, deux fréquences et répétition. [Le niveau maximal aux basses fréquences](../maximum-output-level/) est une autre propriété qui ne prédit pas toutes les limites dans l'aigu.
