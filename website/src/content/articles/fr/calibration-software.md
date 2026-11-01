---
id: "calibration-software"
lang: "fr"
title: "Choisir un logiciel selon le test cassette à réaliser"
description: "Comparer Audacity, REW, NAK T-100, Stereo Tool et MixtapeForge par tâche, configuration et limites."
primaryKeyword: "Choisir un logiciel selon le test cassette à réaliser"
secondaryKeywords: ["L’exercice aller-retour avec Audacity","Le guide NAK T-100","L’exercice Stereo Tool","séquence guidée"]
searchIntent: "informational"
answer: "Commencez par une question, pas une liste d’instruments. Capturer une cassette, contrôler la stabilité de hauteur et enregistrer un profil demandent des fonctions différentes. Un spectre coloré n’est pas automatiquement une mesure étalonnée."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity : analyse du spectre", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "REW : configuration de l’interface audio", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}, {"title": "REW : spectre, niveaux RMS et distorsion", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/spectrum.html"}, {"title": "NAK T-100 : caractéristiques officielles", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "FLUX Stereo Tool : présentation et compatibilité", "url": "https://www.flux.audio/project/stereo-tool-freeware/"}]
related: ["flux-stereo-tool", "recording-profile", "wow-flutter"]
guideType: "explainer"
prerequisites: ["calibration-basics"]
next: ["without-reference-tape", "nak-t100-practical-guide"]
---

## Choisir selon la tâche

| Tâche | Point de départ adapté | Ce qu’il faut aussi |
| --- | --- | --- |
| Capturer le retour et comparer des tonalités | Audacity | Entrée ligne stéréo et fichier de test reproductible |
| Examiner niveau, spectre et distorsion | REW | Entrée correctement configurée et réglages de mesure documentés |
| Contrôler vitesse et pleurage/scintillement | NAK T-100 | Cassette de référence indépendante et détecteur adapté |
| Examiner équilibre et polarité stéréo | FLUX Stereo Tool dans un hôte compatible | Référence mono connue et éditeur natif du plugin |
| Sauvegarder une correction pour les mixtapes | Parcours Étalonnage de MixtapeForge | Sa propre séquence complète enregistrée puis relue sur bande |

Audacity et REW existent pour Windows, macOS et Linux. NAK T-100 est proposé dans les boutiques Windows et macOS. Comparez les exigences actuelles de FLUX en matière de système et de format avec votre hôte : tous les hôtes VST ne chargent pas tous les formats de plugins.

## Rendre la première séance utile

1. Choisissez une seule tâche, par exemple vérifier si gauche et droite reviennent au même niveau.
2. Sélectionnez les véritables entrées et sorties ligne physiques. Utilisez des fréquences compatibles et désactivez gain automatique, EQ et retour d’entrée pouvant produire une boucle.
3. Préférez une tonalité connue à niveau modéré à la musique pour le premier contrôle. Vérifiez les deux canaux et gardez une marge d’acquisition.
4. Conservez signal original, retour brut, version du logiciel et réglages. Répétez avant d’interpréter un petit écart.
5. Ajoutez un autre outil seulement s’il répond à une question que le premier ne traite pas.

[L’exercice aller-retour avec Audacity](../without-reference-tape/) enseigne une acquisition reproductible. [Le guide NAK T-100](../nak-t100-practical-guide/) ajoute des mesures spécialisées pour la cassette. [L’exercice Stereo Tool](../flux-stereo-tool/) explique l’affichage stéréo avec une référence connue, sans deviner à partir de la musique.

## Distinguer analyse et correction

Cas hypothétique : l’analyseur trouve une perte d’aigus de 2 dB. Il n’a établi ni qu’une amplification de 2 dB à l’enregistrement serait sûre, ni si la perte vient de l’enregistrement ou de la lecture. Il faut encore comparer de nouveaux enregistrements.

MixtapeForge 0.1 n’importe pas automatiquement les courbes d’étalonnage REW ni les mesures NAK dans ses profils. Utilisez sa [séquence guidée](../recording-profile/) pour ce parcours. Ses paramètres VST3 génériques ne reproduisent pas non plus l’affichage natif d’un plugin tiers.

Choisissez la configuration la plus simple qui apporte une réponse répétable. Pour la vitesse absolue, le niveau de lecture ou l’alignement des têtes, le logiciel ne remplace pas la cassette physique de référence nécessaire.
