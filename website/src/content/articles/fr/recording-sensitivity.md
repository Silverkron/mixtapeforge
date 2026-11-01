---
id: "recording-sensitivity"
lang: "fr"
title: "Comparer la sensibilité d’enregistrement à réglages fixes"
description: "Mesurer ce que deux bandes restituent du même signal sans confondre niveau et équilibre tonal."
primaryKeyword: "Comparer la sensibilité d’enregistrement à réglages fixes"
secondaryKeywords: ["le niveau de lecture","leur équilibre","un profil","Vérifier le niveau de lecture avec une référence magnétique connue"]
searchIntent: "evaluation"
answer: "La sensibilité d'enregistrement décrit le niveau récupéré pour une entrée donnée. Deux cassettes peuvent différer en volume sans changement de source ni REC LEVEL. Cela compte pour les comparaisons et les systèmes NR dépendant du niveau."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity : générateur de tonalités", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity : analyse du spectre", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "NAK T-100 : liste de contrôle des mesures", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["playback-level", "channel-balance", "tape-hiss-snr"]
guideType: "measurement"
prerequisites: ["without-reference-tape"]
next: ["bias-adjustment", "recording-profile"]
---

## Choisir le type de comparaison

Pour deux bandes sur une platine, gardez le même essai et des commandes fixes. Pour un réglage absolu de service, vérifiez d'abord [le niveau de lecture](../playback-level/). Une boucle sur une platine non étalonnée donne un résultat relatif, pas une preuve d'exactitude de l'enregistrement.

Prenez une interface stéréo, Audacity et deux bandes utilisables. Reliez sortie → LINE IN et LINE OUT → entrée, sans NR ni traitements. Sélectionnez et notez le type adapté à chaque cassette.

## Effectuer le comparatif

1. Générez dix secondes de **sinusoïde 400 Hz à amplitude 0,1**, identiques sur L/R. Choisissez un niveau modéré noté, sans écrêtage numérique.
2. Enregistrez A après l'amorce. Rembobinez et capturez sans modifier gains d'interface ou sortie de deck.
3. Enregistrez B avec la même source et REC LEVEL. Si la platine s'auto-étalonne, décidez si vous comparez les bandes étalonnées ou un réglage fixe, puis restez cohérent.
4. Séparez L/R et mesurez le pic stable à 400 Hz avec les mêmes paramètres Plot Spectrum, un canal à la fois.
5. Soustrayez le niveau A du niveau B par canal. Répétez une section sur chaque cassette pour vérifier la stabilité.
6. Gardez ces lectures avant tout ajustement de volume. Ne rapprochez les volumes que sur des copies destinées à comparer le timbre.

## Exemple de résultat

Hypothétiquement, A revient à −20 dBFS et B à −18,5 dBFS sur le même canal : B est **1,5 dB plus sensible dans cet essai**. Cela ne signifie ni 1,5 dB de capacité supplémentaire, ni moins de bruit, ni plus d'aigus. Ce sont d'autres mesures.

Si les canaux ne s'accordent pas, examinez [leur équilibre](../channel-balance/) avant une correction globale. Si l'écart change à chaque prise, essayez une autre section et vérifiez gain d'entrée et contact.

Contrôle final : même source, type et auto-étalonnage documentés, gains fixes, canaux séparés et aucune normalisation avant mesure. Sauvegardez les conditions complètes dans [un profil](../recording-profile/).
