---
id: "eq-limits"
lang: "fr"
title: "Améliorer une cassette avec l’EQ sans aggraver ses limites"
description: "Choisir une correction modeste à partir de mesures répétables, puis la vérifier par un nouvel enregistrement."
primaryKeyword: "Améliorer une cassette avec l’EQ sans aggraver ses limites"
secondaryKeywords: ["tests de réponse à faible niveau","saturation","les différences entre platines","profil nommé"]
searchIntent: "task"
answer: "Un égaliseur, ou EQ, modifie le niveau de certaines plages de fréquences. Il peut aider à corriger un déséquilibre tonal stable, mais ne restaure pas les pertes momentanées de signal, l’alignement des têtes ou la stabilité de vitesse. Une forte amplification peut solliciter davantage la bande précisément là où elle atteint déjà ses limites."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "John G. McKnight : polarisation en enregistrement magnétique", "url": "https://cdn.shopify.com/s/files/1/0720/0627/1232/files/mcknight_biasing.pdf?v=1763068428"}, {"title": "NAK T-100 : liste de contrôle des mesures", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["high-frequency-saturation", "different-decks", "normalization-compression-eq"]
guideType: "procedure"
prerequisites: ["frequency-response"]
next: ["recording-profile"]
---

## Déterminer si l’écart se corrige

Commencez par deux [tests de réponse à faible niveau](../frequency-response/) sans changer les commandes. Le même écart général doit apparaître dans les deux canaux et se reproduire. S’il augmente avec le niveau d’enregistrement, suspectez la [saturation](../high-frequency-saturation/) : amplifier davantage serait souvent contre-productif.

Conservez la source et la capture sans correction. Préparez une cassette sacrifiable, la même chaîne et un extrait musical comportant transitoires brillants et notes tenues.

## Essayer une petite correction

1. Identifiez un écart large et répétable, plutôt qu’une ondulation étroite ou une bande noyée dans le bruit. Vérifiez d’abord type de bande, NR et état du transport.
2. Copiez les réglages de traitement. Si un profil applique déjà une EQ corrective, examinez-la avant d’ajouter une deuxième correction manuelle.
3. Faites un essai modeste : un ajustement large de **1 dB**, par exemple, constitue une expérience réversible, pas une prescription pour un type de cassette.
4. Vérifiez la marge avant écrêtage numérique et réduisez le gain global si l’EQ augmente les crêtes. Gardez REC LEVEL et les commandes de l’interface aux positions mesurées.
5. Enregistrez les extraits corrigé et original dans les mêmes conditions. Rembobinez et capturez chacun. Comparez à volume d’écoute équivalent sur des copies, sans modifier les fichiers bruts.
6. Gardez la modification seulement si le résultat répété paraît plus équilibré, sans aigus plus rugueux, distorsion accrue ni image instable. Écoutez si possible sur une autre platine avant de multiplier les copies.

## Interpréter une correction qui échoue

Exemple hypothétique : le test à faible niveau montre −4 dB à 8 kHz. Une amplification de +4 dB rend les cymbales agressives sans retrouver leur clarté. La chaîne peut manquer de marge ou présenter une perte d’alignement. Réduire la correction ou le niveau d’enregistrement aide davantage que chercher obstinément une courbe plate.

Une correction issue de la lecture d’une seule platine peut aussi surcompenser sur une autre. Comprenez [les différences entre platines](../different-decks/) avant de considérer un profil aller-retour comme universel.

## Rôle de MixtapeForge

Le prototype 0.1 propose une EQ limitée et une atténuation des canaux selon les mesures et les contrôles de fiabilité. Les bandes peu fiables peuvent rester inchangées ; cela ne justifie pas de les forcer manuellement.

À vérifier : écart répétable, une seule correction, marge numérique, nouvel essai sur bande et réglages originaux conservés. Enregistrez un [profil nommé](../recording-profile/) seulement après confirmation à l’écoute.
