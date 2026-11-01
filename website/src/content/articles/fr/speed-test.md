---
id: "speed-test"
lang: "fr"
title: "Mesurer la vitesse avec une cassette de 3 kHz ou 3,15 kHz"
description: "Calculer l’erreur constante de hauteur avec un signal indépendant, sans la confondre avec le pleurage."
primaryKeyword: "Mesurer la vitesse avec une cassette de 3 kHz ou 3,15 kHz"
secondaryKeywords: ["pleurage et scintillement","les problèmes de transport","Cassette trop rapide ou trop lente","NAK T-100"]
searchIntent: "evaluation"
answer: "Si toutes les notes sont un peu trop aiguës ou graves, la platine peut tourner constamment trop vite ou trop lentement : c'est l'erreur de vitesse. Une hauteur qui oscille relève plutôt du pleurage et scintillement."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100 : caractéristiques officielles", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "NAK T-100 : liste de contrôle des mesures", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "Audacity : analyse du spectre", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}]
related: ["playback-speed-problems", "nak-t100-practical-guide", "without-reference-tape"]
guideType: "measurement"
prerequisites: ["calibration-tapes"]
next: ["wow-flutter"]
---

Si toutes les notes sont un peu trop aiguës ou graves, la platine peut tourner constamment trop vite ou trop lentement : c'est l'**erreur de vitesse**. Une hauteur qui oscille relève plutôt du [pleurage et scintillement](../wow-flutter/).

## Matériel

Il faut une cassette fiable marquée **3000 ou 3150 Hz**, une interface avec entrée ligne stéréo et NAK T-100. Seule la liaison de lecture est nécessaire : LINE OUT → LINE IN de l'interface → ordinateur. Une tonalité enregistrée par la platine testée ne constitue pas une référence indépendante.

## Prendre la mesure

1. Sélectionnez l'entrée physique ligne et une fréquence d'échantillonnage acceptée, identique à celle du système. Coupez gain automatique, traitements et retour d'entrée.
2. Insérez le témoin. Placez le réglage de pitch éventuel à sa position normale documentée et coupez le NR.
3. Dans NAK T-100, choisissez **Speed Wow/Flutter** avec Function. Réglez **Speed Cal.** sur la fréquence inscrite sur la cassette, pas sur celle observée.
4. Lancez la lecture et vérifiez un signal propre sans écrêtage sur les deux canaux. Choisissez Tape si la platine dispose d'un sélecteur Source/Tape.
5. Laissez le transport se stabiliser, puis observez environ trente secondes au milieu du signal. Notez valeur et stabilité. Cette fenêtre est pratique pour comparer, sans prétendre satisfaire une norme.
6. Arrêtez, rembobinez et répétez. Comparez aussi une section ultérieure si le témoin en contient une adaptée. Notez cassette, canal, réglage pitch et intervalle.

## Comprendre le résultat

L'erreur vaut `(fréquence mesurée / fréquence de référence − 1) × 100`.

Exemple hypothétique : 3015 Hz pour 3000 Hz donnent **+0,5%**, donc une lecture plus rapide. 2985 Hz donnent **−0,5%**. Comparez à la tolérance du modèle dans des conditions compatibles ; ces exemples ne sont pas des seuils d'acceptation.

Le spectre Audacity permet un contrôle approximatif de la fréquence capturée. Sa résolution finie et sa moyenne temporelle ne remplacent pas un analyseur dédié à la vitesse et à ses fluctuations.

## Erreurs fréquentes

- Environ +5% ou −4,76% : vérifier une confusion 3000/3150 Hz avant le moteur.
- Valeur mobile : répéter avec un bon témoin et examiner [les problèmes de transport](../playback-speed-problems/).
- Résultat parfait avec une tonalité auto-enregistrée : les erreurs d'inscription et de lecture peuvent s'annuler.

Contrôle final : référence indépendante, bonne fréquence, entrée propre, lecture répétée et conditions notées. Le réglage du moteur exige la procédure du modèle, pas une vis interne trouvée au hasard.
