---
id: "channel-balance"
lang: "fr"
title: "Mesurer l’écart gauche/droite avant de le compenser"
description: "Distinguer un déséquilibre constant des choix d’un mix stéréo grâce à des signaux identiques."
primaryKeyword: "Mesurer l’écart gauche/droite avant de le compenser"
secondaryKeywords: ["l'aller-retour de base","la boucle directe de l'interface","un diagnostic","Un canal de cassette est plus faible"]
searchIntent: "evaluation"
answer: "Une voix centrale décalée peut révéler des niveaux différents. La musique seule est un mauvais témoin : ses instruments peuvent être volontairement asymétriques. Commencez par deux signaux identiques."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity : générateur de tonalités", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity : séparer les pistes stéréo", "url": "https://manual.audacityteam.org/man/splitting_and_joining_stereo_tracks.html"}, {"title": "Audacity : analyse du spectre", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}]
related: ["quiet-channel", "loopback-round-trip", "flux-stereo-tool", "crosstalk-test"]
guideType: "measurement"
prerequisites: ["without-reference-tape"]
next: ["phase-polarity", "recording-profile"]
---

## Préparer le test

Utilisez Audacity, une interface stéréo, une cassette et les connexions de [l'aller-retour de base](../without-reference-tape/). Générez dix secondes de sinusoïde 1 kHz à amplitude 0,1 sur les deux canaux.

Coupez NR et traitements. Réglez les gains d'entrée de façon identique si possible, sans confondre positions égales et gains réellement égaux. Enregistrez modérément, sans écrêtage numérique.

## Comparer correctement

1. Acquérez la lecture en WAV stéréo sans normaliser.
2. Dans le menu de piste, choisissez **Séparer la piste stéréo** et sélectionnez le milieu stable du canal gauche.
3. Ouvrez **Analyse > Tracer le spectre**, avec Spectrum, Hann et une FFT permettant de distinguer le 1 kHz. Lisez son pic.
4. Sélectionnez le même intervalle à droite avec les mêmes paramètres. Ne sélectionnez pas les deux canaux ensemble : le spectre les combine.
5. Soustrayez les lectures en dB. Répétez sur une autre section et, si possible, une autre cassette.
6. Comparez à [la boucle directe de l'interface](../loopback-round-trip/) si vous pouvez déplacer les câbles. Sans ce témoin, attribuez l'écart à toute la chaîne.

## Décider d'une compensation

Exemple hypothétique : −18,0 dBFS à gauche et −19,2 à droite donnent 1,2 dB d'écart. Si la liaison directe montre le même, un réglage d'enregistrement compenserait l'acquisition plutôt que la bande.

Si l'écart stable reste après vérification, atténuer le canal fort préserve davantage de marge qu'amplifier le faible. Essayez une petite correction, puis comparez une musique avec éléments centrés à volume voisin. Elle peut ne pas se transférer à une autre platine.

## Quand s'abstenir

Un écart variant selon la fréquence exige de vérifier réponse ou alignement, pas un gain unique. Un écart changeant entre passages suggère contact ou connexion intermittente. Un canal absent nécessite [un diagnostic](../quiet-channel/), pas un fort gain.

Contrôle final : source identique, canaux analysés séparément, sans normalisation, résultat répété et incertitude de l'interface notée. Le profil MixtapeForge peut proposer une atténuation limitée si son test la justifie ; ne gravez pas un défaut d'acquisition non vérifié sur toutes les copies.
