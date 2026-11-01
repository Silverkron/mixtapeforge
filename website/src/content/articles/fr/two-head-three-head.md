---
id: "two-head-three-head"
lang: "fr"
title: "Platines à deux ou trois têtes : enregistrement, contrôle et calibration"
description: "La différence pratique est le moment où vous pouvez entendre la bande enregistrée."
primaryKeyword: "Platines à deux ou trois têtes"
secondaryKeywords: ["branchements depuis l’ordinateur","test de niveau","parcours de calibration","Comment enregistrer une cassette depuis un ordinateur"]
searchIntent: "informational"
answer: "La différence pratique est le moment où vous pouvez entendre la bande enregistrée. Une platine à trois têtes avec contrôle après enregistrement le permet pendant la prise ; une deux-têtes classique demande d’arrêter puis de rembobiner."
category: "recording"
image: "recording"
updated: "2026-11-01"
sources: [{"title": "TASCAM 122MKIII / 112MKII — manuel, monitoring et enregistrement", "url": "https://www.tascam.eu/en/docs/112mkII_122mkIII_manual.pdf"}]
guideType: "explainer"
related: ["recording-computer", "recording-levels", "calibration-basics"]
prerequisites: []
next: ["recording-computer"]
---

## Rôle des têtes

La tête d’effacement supprime l’ancien signal. Sur une deux-têtes, une tête combinée enregistre ou lit ; sur une trois-têtes ces fonctions sont séparées. La tête de lecture peut donc lire la bande juste après son enregistrement. L’état et l’alignement restent déterminants : trois têtes ne garantissent pas seules une meilleure qualité.

## Identifier ce que vous écoutez

Prévoyez un casque sur la platine, une cassette vierge et les [branchements depuis l’ordinateur](../recording-computer/).

1. Consultez la section monitor du manuel. SOURCE/INPUT désigne généralement l’entrée avant enregistrement. TAPE ou un mode AUTO documenté peut sélectionner la bande sur un appareil compatible.
2. Enregistrez un passage connu. Sur une trois-têtes, alternez source et bande selon le manuel. Acceptez le petit retard ; comparez timbre et distorsion à volume proche.
3. Sur une deux-têtes, arrêtez, rembobinez et relisez. Pendant l’enregistrement, vous entendez parfois seulement l’entrée. Le manuel TASCAM distingue ainsi le contrôle sur bande de la 122MKIII du contrôle d’entrée de la 112MKII.
4. Si la bande sonne moins bien, reprenez le [test de niveau](../recording-levels/) avant toute intervention interne.

**À vérifier :** source du monitor identifiée, bande réellement écoutée, NR cohérent, volume comparable. MixtapeForge n’ajoute aucune tête physique ; son [parcours de calibration](../calibration-basics/) analyse une prise après rembobinage.
