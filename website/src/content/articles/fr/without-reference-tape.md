---
id: "without-reference-tape"
lang: "fr"
title: "Mesurer un enregistrement sans cassette d’étalonnage"
description: "Effectuer un aller-retour reproductible et comprendre quelles conclusions exigent une référence indépendante."
primaryKeyword: "Mesurer un enregistrement sans cassette d’étalonnage"
secondaryKeywords: ["la réponse en fréquence","références indépendantes","profil d'enregistrement","Vérifier l’interface avant d’accuser la cassette"]
searchIntent: "task"
answer: "Vous pouvez comparer des bandes, repérer un déséquilibre et examiner un son terne sans acheter de cassette d'étalonnage. La mesure comprend alors toute la chaîne : enregistrement, bande, lecture et interface audio."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity : générateur de tonalités", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity : analyse du spectre", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "NAK T-100 : liste de contrôle des mesures", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "Audacity : configuration du périphérique et des canaux", "url": "https://manual.audacityteam.org/man/audio_setup_toolbar.html"}, {"title": "Audacity : préférences d’enregistrement et superposition", "url": "https://manual.audacityteam.org/man/recording_preferences.html"}, {"title": "Audacity : enregistrement et export WAV", "url": "https://manual.audacityteam.org/man/record.html"}]
related: ["loopback-round-trip", "calibration-tapes", "eq-limits"]
guideType: "procedure"
prerequisites: ["calibration-basics"]
next: ["recording-profile", "frequency-response"]
---

## Matériel

Il faut une cassette sacrifiable, des liaisons ligne stéréo et Audacity. **Générer > Tonalité** crée une sinusoïde, signal d'une seule fréquence, plus simple à examiner que la musique. Un carnet suffit à conserver les résultats.

## Configurer Audacity

Dans **Configuration audio** (Audio Setup), choisissez l'interface en lecture, ses entrées physiques ligne en enregistrement et **2 canaux stéréo**. Ne sélectionnez pas un périphérique « loopback » capturant l'audio informatique. Dans les paramètres audio, fixez une fréquence de projet prise en charge par l'interface.

Dans **Préférences > Enregistrement**, désactivez l'écoute de l'entrée, appelée Audible input monitoring ou Software Playthrough selon la version. Désactivez aussi l'enregistrement déclenché par le son, qui pourrait omettre silences et repères. Coupez tout retour entrée→sortie dans le mélangeur de l'interface.

Pour créer deux canaux identiques, choisissez **Pistes > Ajouter nouvelle > Piste stéréo**, sélectionnez-la et générez la tonalité. Si vous partez d'un fichier mono, dupliquez-le, mettez les gains à 0 dB et utilisez **Créer une piste stéréo** dans le menu de la piste supérieure : elle devient gauche, l'autre droite. Gardez panoramique et traitements neutres.

Pour inscrire le signal, lancez REC sur la platine, attendez que la bande magnétique défile et lancez Lecture dans Audacity. Arrêtez les deux après la tonalité. Pour acquérir le retour, ouvrez un **nouveau projet vide**, conservez les paramètres d'entrée, lancez Enregistrer puis PLAY sur la platine. Arrêtez après le signal et utilisez **Fichier > Exporter l'audio** en WAV stéréo sans normalisation. Des projets distincts évitent de mélanger l'original au retour.

## Réaliser l'essai

1. Reliez sortie de l'interface → LINE IN, puis LINE OUT → entrées ligne. Utilisez la même fréquence supportée, sans NR, EQ, compression ni gain automatique.
2. Générez dix secondes : **sinusoïde, 1 kHz, amplitude 0,1**. Cela correspond à −20 dBFS crête dans le fichier, pas nécessairement à −20 sur le vu-mètre de la platine.
3. Partez d'une sortie faible et choisissez un niveau d'enregistrement modéré. Notez indication du deck et positions des commandes, avec marge à l'entrée numérique.
4. Enregistrez après l'amorce, rembobinez et capturez le retour en WAV stéréo brut. Avec deux têtes, cette lecture séparée est indispensable.
5. Répétez ailleurs sur la bande. Dans Audacity, **Séparer la piste stéréo**, sélectionnez le milieu stable d'un seul canal et ouvrez **Analyse > Tracer le spectre** (Plot Spectrum). Utilisez Spectrum, Hann et la même taille FFT. Comparez le pic à 1 kHz canal par canal.
6. Conservez original, deux captures et réglages. Passez à [la réponse en fréquence](../frequency-response/) lorsque les niveaux se répètent correctement.

## Interpréter

Exemple hypothétique : gauche à −18 dBFS et droite à −19 dBFS dans les deux prises. Cela indique un écart répétable de 1 dB quelque part dans la boucle, peut-être à l'entrée de l'interface plutôt qu'à l'enregistrement.

Une vitesse apparemment parfaite sur une tonalité auto-enregistrée ne prouve rien non plus : des erreurs identiques d'inscription et de lecture peuvent s'annuler. Les [références indépendantes](../calibration-tapes/) lèvent cette ambiguïté.

## Si les lectures varient

Si le pic saute, essayez une autre section et cherchez des coupures dans le WAV. Si les canaux écrêtent, baissez le gain d'acquisition et recommencez les deux essais. Sans retour, vérifiez LINE IN physique.

Contrôle final : mêmes commandes, lecture complète, pas d'écrêtage, canaux séparés et répétition. Le [profil d'enregistrement](../recording-profile/) automatise une séquence plus large, tout en gardant la limite de la chaîne complète.
