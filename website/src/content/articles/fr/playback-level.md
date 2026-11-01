---
id: "playback-level"
lang: "fr"
title: "Vérifier le niveau de lecture avec une référence magnétique connue"
description: "Distinguer fluxivité, tension et indications des appareils avant de régler le gain de lecture."
primaryKeyword: "Vérifier le niveau de lecture avec une référence magnétique connue"
secondaryKeywords: ["sensibilité d'enregistrement","comparer des platines","Vérifier l’azimut sans perdre l’alignement initial","Étalonnage cassette"]
searchIntent: "evaluation"
answer: "L'étalonnage du niveau de lecture associe un signal magnétique connu à une tension ou indication spécifiée. Il sert de base aux comparaisons d'enregistrement. Monter l'entrée de l'interface jusqu'à zéro n'étalonne pas la platine."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "MRL : choix et domaine des bandes de référence", "url": "https://mrltapes.com/pages/product-guide"}, {"title": "NAK T-100 : caractéristiques officielles", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "REW : spectre, niveaux RMS et distorsion", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/spectrum.html"}]
related: ["azimuth-test", "calibration-basics", "different-decks"]
guideType: "measurement"
prerequisites: ["calibration-tapes"]
next: ["recording-sensitivity"]
---

## Réunir la bonne référence

Il faut la procédure de service, la cassette prescrite et le voltmètre alternatif demandé ou un analyseur correctement calibré. Notez **fluxivité** en nWb/m, fréquence, égalisation et tolérance. Respectez tension cible, charge et positions des commandes du manuel : elles varient selon les modèles.

Un compteur **dBFS** se réfère au maximum numérique. Le 0 VU de la platine et l'échelle en volts de l'analyseur sont d'autres références. NAK T-100 exige un étalonnage externe de tension avant une utilisation absolue.

## Comparer sans réglage interne

1. Vérifiez la correspondance du témoin avec le manuel. Si elle n'est pas établie, limitez-vous à une comparaison relative sans inventer de cible.
2. Reliez LINE OUT à l'entrée de mesure prévue. Avec une interface, choisissez ligne, gain fixe, sans effets ni automatisme.
3. Réglez sortie, lecture et NR exactement selon la procédure. Gardez une marge à l'entrée.
4. Lisez le segment et attendez la stabilité. Mesurez L/R séparément sur le même passage.
5. Notez valeur observée, attendue, référence et réglages. Répétez avant de conclure.
6. Si une intervention s'impose, suivez le manuel avec les compétences adaptées. REC LEVEL agit ailleurs et ne règle pas la lecture.

## Interpréter l'écart

Exemple hypothétique : 0,50 V RMS sont demandés, vous lisez 0,45 V dans les mêmes conditions. `20 × log10(0,45 / 0,50)` donne environ **−0,92 dB**. La tolérance de service et l'incertitude décident si cela est acceptable.

Un témoin moins fortement enregistré produit le même écart apparent, tout comme une sortie variable, une mauvaise charge ou une entrée non calibrée. Vérifiez ces points avant la platine.

Contrôle final : cassette correcte, charge et commandes prescrites, tension calibrée si nécessaire, lectures L/R stables et tolérance documentée. La [sensibilité d'enregistrement](../recording-sensitivity/) devient alors interprétable ; sinon [comparer des platines](../different-decks/) mélange plusieurs inconnues.
