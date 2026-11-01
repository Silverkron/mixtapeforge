---
id: "distorted-recordings"
lang: "fr"
title: "Une cassette enregistrée distord : trouver l’étage surchargé"
description: "Contrôler master, interface, entrée et bande séparément plutôt que tout baisser au hasard."
primaryKeyword: "Une cassette enregistrée distord"
secondaryKeywords: ["saturation des aigus","guide dédié","mesure de distorsion","Mesurer la distorsion sans la confondre avec le souffle"]
searchIntent: "diagnosis"
answer: "Voix rugueuses, basse brouillonne ou cymbales agressives ne signifient pas automatiquement une mauvaise cassette. La distorsion peut venir du fichier, des effets, de l'interface, de l'entrée de la platine, de la bande ou de l'acquisition. Trouve le premier étage défectueux avant de changer le profil."
category: "troubleshooting"
image: "portable"
updated: "2026-11-01"
sources: [{"title": "Sony · 00027549", "url": "https://www.sony.com/electronics/support/audio-video/tcm-230dv/articles/00027549"}, {"title": "Audacity · Enregistrement de test", "url": "https://manual.audacityteam.org/man/tutorial_making_a_test_recording.html"}]

guideType: "troubleshooting"
prerequisites: []
next: ["recording-levels", "high-frequency-saturation"]
related: ["distortion-test", "normalization-compression-eq", "loopback-round-trip"]
---

## Comparer étage par étage

Prévois une cassette vierge sans valeur, une source propre et un casque. En acquisition, utilise des entrées ligne, pas la sensibilité microphone, et garde une marge avant l'écrêtage numérique : la limite qui coupe les crêtes.

1. Écoute directement la source à volume modéré, sans EQ, compression ni plugins ajoutés. Si elle est déjà déformée, corrige-la ou remplace-la d'abord.
2. Écoute la sortie de l'interface qui alimente la platine et vérifie les alertes de crête. Baisser cette sortie ne répare pas un écrêtage déjà dans le fichier.
3. Enregistre un court passage avec bon type de bande et un seul encodeur NR. Note REC LEVEL et réglages de sortie.
4. Recommence avec REC LEVEL nettement plus bas, sans changer sortie, bande ni effets. Compare à volume d'écoute proche.
5. Si les deux essais sont déformés, baisse la sortie de l'interface et recommence. L'entrée de la platine peut saturer avant le réglage REC LEVEL. Ne relève pas immédiatement tous les étages suivants.
6. Si l'écoute directe de la platine est propre mais pas sa capture, baisse le gain d'entrée de l'interface et recapture.

## Interpréter le changement

Une amélioration avec REC LEVEL réduit suggère un niveau d'enregistrement excessif, pas forcément une panne. Si surtout les aigus forts s'améliorent, examine la [saturation des aigus](../high-frequency-saturation/). Une distorsion inchangée à faible niveau et avec différentes bandes saines peut nécessiter une réparation.

Choisis ensuite le niveau avec le [guide dédié](../recording-levels/). Une [mesure de distorsion](../distortion-test/) exige signal et méthode adaptés ; une forme d'onde musicale ne fournit pas un pourcentage THD fiable. Conserve le meilleur essai, puis réactive les effets un à un.
