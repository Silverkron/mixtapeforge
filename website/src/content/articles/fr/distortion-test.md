---
id: "distortion-test"
lang: "fr"
title: "Mesurer la distorsion sans la confondre avec le souffle"
description: "Comparer une sinusoïde et sa lecture, en distinguant THD, THD+N et troisième harmonique."
primaryKeyword: "Mesurer la distorsion sans la confondre avec le souffle"
secondaryKeywords: ["Une boucle directe","un niveau d'enregistrement inférieur","Pourquoi les aigus forts disparaissent","Niveaux d’enregistrement cassette"]
searchIntent: "evaluation"
answer: "La distorsion ajoute des fréquences absentes de l'entrée. Une sinusoïde pure de 400 Hz peut revenir avec 800, 1200 Hz et d'autres composantes : ses harmoniques. Elles expliquent le durcissement du son lorsque le niveau augmente."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100 : caractéristiques officielles", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "NAK T-100 : liste de contrôle des mesures", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "REW : spectre, niveaux RMS et distorsion", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/spectrum.html"}]
related: ["high-frequency-saturation", "recording-levels", "nak-t100-practical-guide"]
guideType: "measurement"
prerequisites: ["without-reference-tape"]
next: ["maximum-output-level"]
---

**THD** regroupe les harmoniques, **THD+N** ajoute le bruit et **HD3** mesure seulement la troisième harmonique, à trois fois la fréquence du signal. Ne substituez pas ces valeurs entre elles.

## Matériel

Utilisez NAK T-100, une interface ligne stéréo et une cassette sacrifiable. Reliez sortie → LINE IN et LINE OUT → entrée ligne. Coupez NR, EQ, compression et gain automatique. [Une boucle directe](../loopback-round-trip/) est utile car la distorsion peut apparaître avant la bande.

## Comparer des niveaux modérés

1. Sélectionnez **T.H.Dist.**, fondamentale **400 Hz**, et identifiez le mode THD+N ou HD3. Gardez le même pendant toute la comparaison.
2. Partez bas et enregistrez à un niveau modéré sans écrêtage d'entrée. Notez indication du deck, générateur et gains.
3. Avec trois têtes, utilisez Tape. Avec deux, enregistrez, arrêtez, rembobinez et lisez dans l'analyseur.
4. Lisez le milieu stable séparément pour L/R. Changez Meter Range si le résultat dépasse la gamme ; une indication bloquée au maximum n'est pas valide.
5. Enregistrez une seconde section légèrement plus forte, avec une hausse notée et le même gain d'acquisition. Si l'interface écrête, baissez ce gain puis refaites les deux sections.
6. Répétez et conservez mode, fréquence, niveau et canal avec chaque valeur.

## Interpréter le pourcentage

Exemple hypothétique : HD3 passe de 0,5% à 1,5% en augmentant le niveau. La troisième harmonique contribue davantage dans ces conditions ; ce n'est pas un seuil universel d'audibilité. Une valeur THD+N ne remplace pas cette lecture.

Si THD+N augmente en baissant le niveau, le bruit peut prendre une part relative plus importante. Ce phénomène diffère de la non-linéarité à fort niveau. Examinez le spectre brut ou HD3 pour les distinguer.

## Résultat étonnamment mauvais

Vérifiez écrêtage, fondamentale choisie, mode ligne et traitements de source. Si la boucle directe présente déjà une forte distorsion, commencez par l'interface. Si seul le retour plus fort se dégrade, essayez [un niveau d'enregistrement inférieur](../recording-levels/).

Contrôle final : sinusoïde connue, métrique déclarée, acquisition fixe, canaux séparés et répétition. L'analyse de profil MixtapeForge n'est pas un distorsiomètre certifié et ne remplace pas cette comparaison spécifique.
