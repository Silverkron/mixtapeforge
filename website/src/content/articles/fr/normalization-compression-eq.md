---
id: "normalization-compression-eq"
lang: "fr"
title: "Normalisation, compression et EQ : trois rôles différents"
description: "Utilisez la normalisation entre morceaux, la compression pour les écarts excessifs au sein d’un morceau, et l’égalisation pour le timbre."
primaryKeyword: "Normalisation, compression et EQ"
secondaryKeywords: ["un essai enregistré","les causes avant de renforcer les aigus","un profil d’enregistrement","Niveaux d’enregistrement cassette"]
searchIntent: "task"
answer: "Utilisez la normalisation entre morceaux, la compression pour les écarts excessifs au sein d’un morceau, et l’égalisation pour le timbre. Commencez sans traitement : chaque réglage doit répondre à un problème audible précis."
category: "recording"
image: "recording"
updated: "2026-11-01"
sources: [{"title": "Audacity — normalisation du volume perçu", "url": "https://manual.audacityteam.org/man/loudness_normalization.html"}, {"title": "Audacity — réglages du compresseur", "url": "https://manual.audacityteam.org/man/compressor.html"}, {"title": "Audacity — glossaire audio numérique", "url": "https://manual.audacityteam.org/man/glossary.html"}]
guideType: "procedure"
related: ["recording-levels", "recording-profile", "muffled-cassettes"]
prerequisites: []
next: ["recording-levels"]
---

## Comprendre les contrôles

La normalisation applique du gain. Peak égalise les crêtes, pas le volume perçu. LUFS estime ce dernier ; Album applique un gain commun en conservant les rapports. La compression réduit la dynamique : seuil, ratio, attaque et relâchement déterminent quand, combien et à quelle vitesse elle agit. L’EQ modifie des bandes de fréquences, graves ou aigus par exemple.

## Dans MixtapeForge

1. Ouvrez **EQ / Audio**, choisissez un passage connu et écoutez l’original.
2. Essayez LUFS pour une compilation inégale, Album pour un album continu. Gardez le plafond true peak sous 0 dBTP ; −1 dBTP constitue un exemple de départ, pas une référence d’étalonnage de bande. Le plafond prime sur la cible de volume.
3. Laissez la compression coupée sans problème de crêtes identifié. Le préréglage **Lumière** (compression légère) démarre à 1,5:1, seuil −18 dB, attaque 30 ms, relâchement 250 ms. L’effet dépend du niveau source. Si les percussions perdent leur attaque ou si le volume pompe, réduisez ou désactivez le traitement.
4. Partez d’une EQ plate. Modifiez légèrement une bande ou choisissez un préréglage en observant les changements. Un genre musical indique un choix esthétique, pas une correction automatique du type de bande.
5. Comparez original/master à volume proche puis faites [un essai enregistré](../recording-levels/). Gardez la version qui améliore la bande.

Si le son reste terne, vérifiez [les causes avant de renforcer les aigus](../muffled-cassettes/). Le logiciel ne répare pas le chemin de bande. Avec codage NR, effectuez ces traitements avant le codage, sans ajouter ensuite EQ ou normalisation.

**Terminé :** problème amélioré, crêtes maîtrisées, attaques préservées, écoute sur bande faite. Pour une compensation mesurée, utilisez [un profil d’enregistrement](../recording-profile/), distinct de l’EQ musicale.
