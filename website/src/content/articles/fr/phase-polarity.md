---
id: "phase-polarity"
lang: "fr"
title: "Vérifier polarité et retard stéréo avec un signal mono connu"
description: "Comprendre ce qu’une inversion peut corriger et pourquoi elle ne résout pas tout défaut de phase."
primaryKeyword: "Vérifier polarité et retard stéréo avec un signal mono connu"
secondaryKeywords: ["azimut","les vérifications du canal faible","Le guide Stereo Tool","Vérifier l’azimut sans perdre l’alignement initial"]
searchIntent: "evaluation"
answer: "Une inversion de polarité change le signe de l'onde. Un retard la décale dans le temps, créant des angles de phase différents selon la fréquence. Inverser un canal ne supprime donc pas généralement un retard."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "FLUX Stereo Tool : manuel", "url": "https://doc.flux.audio/stereotool/"}, {"title": "FLUX Stereo Tool : présentation et compatibilité", "url": "https://www.flux.audio/project/stereo-tool-freeware/"}, {"title": "Audacity : séparer les pistes stéréo", "url": "https://manual.audacityteam.org/man/splitting_and_joining_stereo_tracks.html"}]
related: ["azimuth-test", "quiet-channel", "different-decks"]
guideType: "measurement"
prerequisites: ["channel-balance"]
next: ["flux-stereo-tool"]
---

Deux signaux identiques de polarités opposées peuvent faire disparaître une voix lors de la somme mono. Les effets stéréo intentionnels peuvent eux aussi produire une corrélation négative : commencez avec une référence connue.

## Outils et référence

Utilisez un hôte compatible avec l'éditeur FLUX:: Stereo Tool, ou un oscilloscope stéréo et une écoute mono. Enregistrez une courte voix mono et envoyez exactement les mêmes échantillons à L/R, gains égaux et sans effets. Pour la bande, capturez LINE OUT dans les entrées ligne stéréo avec gains fixes et NR adapté à l'enregistrement.

## Apprendre le motif correct

1. Lisez la référence inchangée dans Stereo Tool : gains 0 dB, inversions coupées, routage et largeur neutres.
2. Observez le mono centré, corrélation proche de +1. Sinon, vérifiez l'hôte avant la platine.
3. Inversez temporairement un seul canal. La figure doit montrer l'opposition et la somme mono de l'hôte doit fortement réduire la voix. Écoutez doucement.
4. Rétablissez le réglage. Cette erreur volontaire montre une véritable inversion relative.
5. Enregistrez puis capturez la référence à travers la platine. Comparez le retour brut avec les mêmes réglages neutres et gardez l'original numérique.
6. Si le retour ressemble constamment à l'inversion volontaire, examinez câbles et routage. Essayez une correction sur une copie après confirmation, sans altérer le brut.

## Résultats intermédiaires

Exemple hypothétique : l'original est centré, mais le retour forme une ellipse variant selon la fréquence. Cela ne suffit pas à justifier l'inversion. Retard, [azimut](../azimuth-test/) et réponse des canaux peuvent agir ensemble.

+1 est attendu pour du mono identique, pas pour toute musique stéréo. Des valeurs brièvement négatives invitent à écouter en mono, pas à diagnostiquer automatiquement le câblage.

## Si l'essai reste confus

Un canal absent nécessite [les vérifications du canal faible](../quiet-channel/). Une différence de gain incline l'image et se mesure séparément. Si bypasser les autres effets rétablit le mono, examinez-les avant le deck.

Contrôle final : signal identique, réglages neutres, inversion démonstrative rétablie, brut conservé et phase distinguée de la polarité. [Le guide Stereo Tool](../flux-stereo-tool/) précise le travail dans l'hôte ; les paramètres génériques de MixtapeForge ne fournissent pas ce affichage natif.
