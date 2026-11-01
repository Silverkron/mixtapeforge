---
id: "loopback-round-trip"
lang: "fr"
title: "Vérifier l’interface avant d’accuser la cassette"
description: "Comparer une boucle directe avec l’aller-retour sur bande et savoir ce que chaque liaison permet d’isoler."
primaryKeyword: "Vérifier l’interface avant d’accuser la cassette"
secondaryKeywords: ["guide de capture de base","l'essai multifréquence","l'équilibre","les profils"]
searchIntent: "evaluation"
answer: "Une boucle directe, ou loopback, relie la sortie d'une interface à son entrée. L'aller-retour sur bande ajoute la platine et la cassette. Leur comparaison peut révéler un défaut présent avant même la bande."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "REW : configuration de l’interface audio", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}, {"title": "Audacity : générateur de tonalités", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity : analyse du spectre", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "Audacity : configuration du périphérique et des canaux", "url": "https://manual.audacityteam.org/man/audio_setup_toolbar.html"}, {"title": "Audacity : préférences d’enregistrement et superposition", "url": "https://manual.audacityteam.org/man/recording_preferences.html"}, {"title": "Audacity : enregistrement et export WAV", "url": "https://manual.audacityteam.org/man/record.html"}]
related: ["without-reference-tape", "channel-balance", "recording-profile"]
guideType: "measurement"
prerequisites: ["calibration-basics"]
next: ["frequency-response"]
---

## Matériel et paramètres fixes

Utilisez des entrées ligne, des câbles compatibles, Audacity et une cassette sacrifiable. Vérifiez le manuel de l'interface : une entrée uniquement micro peut surcharger. Désactivez le retour de l'entrée vers la même sortie.

Cet essai impose de déplacer temporairement les câbles. Si vous gardez la platine branchée, sautez la boucle directe et indiquez « chaîne complète », sans prétendre avoir compensé l'interface.

## Lire et enregistrer simultanément dans Audacity

Dans **Configuration audio**, choisissez l'interface de lecture, ses **entrées physiques ligne** et **2 canaux stéréo**. Un périphérique Windows « loopback » capte numériquement le son du PC et contourne les câbles testés. Alignez fréquence de projet et interface.

Dans **Préférences > Enregistrement**, activez **Lire les autres pistes pendant l'enregistrement (overdub)** et **Enregistrer sur une nouvelle piste**. Coupez Audible input monitoring/Software Playthrough et le déclenchement par le son. Coupez aussi le retour dans le mélangeur de l'interface.

Créez **Pistes > Ajouter nouvelle > Piste stéréo**, puis **Générer > Tonalité** : sinusoïde, 1000 Hz, amplitude 0,1, dix secondes. Placez le curseur au début, sans plage temporelle sélectionnée. Enregistrer lance alors l'original tout en capturant le retour physique sur une nouvelle piste stéréo. Arrêtez après le signal, rendez l'original muet et exportez uniquement le retour en WAV en vérifiant sélection et aperçu. Nommez les pistes et rendez les anciennes captures muettes avant de recommencer, sinon elles seraient également rejouées.

Pour la bande, lisez l'original pendant REC sur le deck, arrêtez puis rembobinez. Capturez ensuite dans un **nouveau projet vide** : Enregistrer dans Audacity, PLAY sur le deck, puis Stop après le signal. Le [guide de capture de base](../without-reference-tape/) détaille aussi ces opérations.

## Enregistrer les deux parcours

1. Préparez le 1 kHz identique sur L/R à la même fréquence d'échantillonnage supportée.
2. Reliez directement sorties et entrées L/R. Partez bas, montez jusqu'à un signal lisible sans écrêtage et sauvegardez la référence de l'interface.
3. Notez volumes, gains, fréquence et ports. Arrêtez avant de rebrancher sortie → LINE IN et LINE OUT → entrée.
4. Gardez les commandes de l'interface fixes. NR coupé, enregistrez à niveau modéré, rembobinez et acquérez la lecture.
5. Comparez le niveau de chaque canal avec les mêmes paramètres d'analyse et durées de sélection.
6. Répétez. Pour le timbre, effectuez [l'essai multifréquence](../frequency-response/) en direct puis sur bande.

### Lire séparément les canaux

Dans le menu de la piste capturée, choisissez **Séparer la piste stéréo**. Sélectionnez le milieu du signal gauche en excluant les transitions. Ouvrez **Analyse > Tracer le spectre**, avec Spectrum, Hann et une taille FFT comme 16384. Placez le curseur près du pic à 1 kHz et lisez les indications sous le graphique. Répétez à droite et sur les autres captures. Ne sélectionnez jamais les deux canaux ensemble.

## Interpréter

Exemple hypothétique : le parcours direct est 1 dB plus faible à droite et la bande montre le même écart. Le compenser à l'enregistrement risque d'inscrire sur toutes les cassettes une correction destinée à l'entrée de mesure.

Ne soustrayez pas simplement pourcentages de distorsion ou niveaux de bruit en dB : ils ne se combinent pas comme des gains signés. Une courbe d'interface reste valable uniquement pour les réglages mesurés.

Silence : vérifier entrée, canaux et mode ligne. Sifflement croissant : arrêter et couper le retour. Écrêtage de la référence : baisser le niveau concerné et refaire les deux mesures.

Gardez WAV et réglages. Une référence répétable aide [l'équilibre](../channel-balance/) et [les profils](../recording-profile/), mais n'étalonne pas la tête de lecture.
