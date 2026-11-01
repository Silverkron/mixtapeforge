---
id: "frequency-response"
lang: "fr"
title: "Mesurer les changements de graves, médiums et aigus sur cassette"
description: "Comparer une série de tonalités de même niveau et distinguer réponse fréquentielle et saturation."
primaryKeyword: "Mesurer les changements de graves, médiums et aigus sur cassette"
secondaryKeywords: ["le test de base","La référence directe d'interface","la saturation","une EQ limitée"]
searchIntent: "evaluation"
answer: "La réponse en fréquence indique si des hauteurs différentes reviennent au même niveau relatif. Préserver 1 kHz tout en affaiblissant 8 kHz peut ternir le son. Cet essai mesure enregistrement et lecture ensemble, pas uniquement la tête de lecture."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity : générateur de tonalités", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity : analyse du spectre", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "NAK T-100 : liste de contrôle des mesures", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["loopback-round-trip", "bias-adjustment", "recording-profile"]
guideType: "measurement"
prerequisites: ["without-reference-tape"]
next: ["high-frequency-saturation", "eq-limits"]
---

## Construire le fichier

Avec Audacity, une interface ligne stéréo et une cassette sacrifiable, générez des sinusoïdes successives de cinq secondes à **100, 400, 1000, 4000, 8000 et 10000 Hz**, toutes d'**amplitude 0,1**. Insérez un bref silence entre elles pour les reconnaître et dupliquez la séquence sur L/R sans modifier le gain. Ce sont des points comparatifs, pas un balayage de certification.

Préparez connexions et désactivation NR/traitements selon [le test de base](../without-reference-tape/). Gardez l'écoute basse.

## Enregistrer à un faible niveau défini

1. Utilisez le 1 kHz pour établir une référence modérée sur le compteur du deck, sans écrêter l'interface.
2. Réduisez le signal généré de 20 dB supplémentaires pour mesurer la réponse, en gardant gains physiques et REC LEVEL fixes. Dans Audacity, **0,01** est 20 dB sous 0,1. Notez « 20 dB sous mon réglage de référence à 1 kHz » : ce n'est pas une fluxivité absolue.
3. Enregistrez toute la séquence après l'amorce, rembobinez et capturez la lecture stéréo sans traitement ni normalisation.
4. Séparez L/R. Sélectionnez le milieu stable de chaque tonalité et utilisez Plot Spectrum avec Spectrum, Hann et la même FFT. Lisez le pic du signal, pas le bruit voisin.
5. Pour chaque canal, soustrayez le niveau à 1 kHz des autres niveaux. Conservez les réponses gauche et droite séparées.
6. Répétez. Marquez incertain un signal proche du bruit ou instable, au lieu de lui appliquer une forte correction.

## Lire la courbe

Exemple hypothétique : 1 kHz revient à −35 dBFS et 8 kHz à −39 dBFS, soit **−4 dB à 8 kHz relativement au repère**. Interface, enregistrement, bande, alignement et lecture peuvent tous contribuer. [La référence directe d'interface](../loopback-round-trip/) aide à séparer certains éléments.

Si un essai plus fort perd davantage d'aigus, examinez [la saturation](../high-frequency-saturation/) : les amplifier peut aggraver le résultat. Si la perte reste stable à bas niveau, vérifiez sélection de bande et bias avant [une EQ limitée](../eq-limits/).

Contrôle final : sources de même niveau, réduction documentée, commandes fixes, canaux séparés, référence 1 kHz et répétition. « Plat jusqu'à 10 kHz » est incomplet sans tolérance et niveau d'enregistrement.
