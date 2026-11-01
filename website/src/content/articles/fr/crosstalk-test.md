---
id: "crosstalk-test"
lang: "fr"
title: "Mesurer la diaphonie entre les canaux d’une cassette"
description: "Enregistrer un seul canal pour distinguer fuite de signal, bruit de fond et routage incorrect."
primaryKeyword: "Mesurer la diaphonie entre les canaux d’une cassette"
secondaryKeywords: ["la boucle directe d'interface","La mesure du bruit","Vérifier l’interface avant d’accuser la cassette","Mesurer le souffle par rapport à un signal enregistré"]
searchIntent: "evaluation"
answer: "La diaphonie est le signal qui fuit dans un canal censé être silencieux. Cet essai vérifie gauche→droite et droite→gauche d'une face. Il ne mesure pas la fuite depuis les pistes de l'autre face, qui demande un autre montage."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity : générateur de tonalités", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity : séparer les pistes stéréo", "url": "https://manual.audacityteam.org/man/splitting_and_joining_stereo_tracks.html"}, {"title": "Audacity : analyse du spectre", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "REW : configuration de l’interface audio", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}]
related: ["loopback-round-trip", "tape-hiss-snr", "different-decks"]
guideType: "measurement"
prerequisites: ["channel-balance"]
next: ["phase-polarity"]
---

## Préparer un vrai fichier de référence

Dans Audacity, créez dix secondes de **sinusoïde 1 kHz, amplitude 0,1** sur une piste mono, panoramique entièrement à gauche, puis exportez un WAV stéréo dont la droite est silencieuse. Créez une seconde section inverse. Réimportez le WAV pour vérifier que le canal non alimenté est effectivement vide.

Reliez sorties L/R → LINE IN et LINE OUT → entrées ligne. Sélectionnez le bon type de bande, coupez NR, effets, élargissement stéréo, sommation mono et retour d'entrée. Fixez les gains sans écrêtage.

## Mesurer dans les deux sens

1. Enregistrez les sections à niveau modéré, rembobinez et capturez tout en stéréo.
2. Séparez les canaux dans Audacity. Sélectionnez le milieu stable de la section alimentée à gauche, sur le canal gauche.
3. Dans Plot Spectrum, gardez Spectrum, Hann et FFT identiques. Notez le pic 1 kHz du canal alimenté.
4. Sélectionnez le même intervalle à droite. Lisez son pic 1 kHz uniquement s'il dépasse clairement le bruit voisin.
5. Soustrayez le niveau de fuite du niveau principal. Répétez pour la section alimentée à droite, puis refaites l'enregistrement.
6. Comparez [la boucle directe d'interface](../loopback-round-trip/) si disponible. Sinon, annoncez la séparation de toute la chaîne.

## Interpréter

Exemple hypothétique : −20 dBFS sur le canal actif, −60 dBFS sur l'autre donnent **40 dB de séparation à 1 kHz**. Plus ce nombre positif est grand, moins il y a de fuite. Une présentation signée serait −40 dB de diaphonie ; précisez la convention.

Si le pic n'est pas discernable du bruit à −60 dBFS, donnez une limite liée au plancher, pas une valeur précise de 40 dB. Le bruit total n'est pas le signal de fuite.

## Erreurs de montage

Des niveaux presque égaux invitent à vérifier d'abord le mono ou le retour de monitoring. Une fuite déjà présente dans le fichier source invalide l'essai. Une forte variation avec la fréquence nécessite d'autres points de mesure.

Contrôle final : canal opposé silencieux, gains fixes, pic séparé du souffle, deux directions et répétition. [La mesure du bruit](../tape-hiss-snr/) explique la limite ; inverser la polarité ne supprime pas une diaphonie ordinaire.
