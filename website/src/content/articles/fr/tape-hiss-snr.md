---
id: "tape-hiss-snr"
lang: "fr"
title: "Mesurer le souffle par rapport à un signal enregistré"
description: "Lire une tonalité puis un silence enregistré à gain fixe pour comparer le rapport signal/bruit."
primaryKeyword: "Mesurer le souffle par rapport à un signal enregistré"
secondaryKeywords: ["le guide NAK","Dolby B","Mesurer la distorsion sans la confondre avec le souffle","Choisir un logiciel selon le test cassette à réaliser"]
searchIntent: "evaluation"
answer: "Un niveau de bruit seul ne dit pas si une cassette est silencieuse. Le rapport signal/bruit, SNR, compare un signal défini au fond. Baisser la lecture réduit les deux et n'améliore pas le rapport."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "REW : spectre, niveaux RMS et distorsion", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/spectrum.html"}, {"title": "NAK T-100 : caractéristiques officielles", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "NAK T-100 : liste de contrôle des mesures", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["distortion-test", "dolby-b", "calibration-software"]
guideType: "measurement"
prerequisites: ["without-reference-tape"]
next: ["recording-levels"]
---

## Préparer deux sections identiques en réglages

Il faut une cassette, une interface ligne stéréo et le RTA en temps réel de REW. Cette procédure lit directement la platine ; une capture WAV séparée reste une documentation facultative. Reliez sortie → LINE IN et LINE OUT → entrée. Coupez gain automatique, NR et traitements, puis fixez toutes les commandes.

Générez une courte **sinusoïde de 1 kHz** à un niveau de deck modéré et noté, suivie d'au moins dix secondes de silence numérique en laissant REC actif. Vous mesurez ainsi le bruit du processus d'effacement/bias/enregistrement. Une bande jamais enregistrée ou la platine à l'arrêt est une autre condition.

## Mesurer les deux niveaux

1. Enregistrez tonalité et silence, arrêtez et rembobinez avant le signal. Laissez le deck arrêté pendant la préparation de REW.
2. Sélectionnez un canal d'entrée et ouvrez **RTA**, échelle dBFS. Lancez l'analyse avec sa commande d'enregistrement. **Input RMS** représente l'énergie moyenne, pas les crêtes instantanées.
3. Lancez PLAY sur le deck et lisez le milieu stable du signal. Notez RMS non pondéré, bande et filtres d'analyse.
4. Lisez le milieu du silence enregistré avec les mêmes canal, gain, bande et convention RMS. Excluez la transition entre tonalité et silence.
5. Soustrayez bruit du signal. Répétez pour l'autre canal et un autre intervalle silencieux.
6. Si vous utilisez la pondération A, gardez les valeurs pondérées du signal et du bruit comme résultat séparé. Elle modifie le poids des fréquences ; ne mélangez pas les conventions.

## Exemple

Valeurs hypothétiques : signal **−18 dBFS RMS**, bruit **−70 dBFS RMS**, soit **52 dB** de séparation. Cela ne se compare pas automatiquement à une spécification référencée au niveau maximal ou à une autre pondération.

Le mode Noise-A de NAK T-100 utilise des décalages d'échelle. Consultez [le guide NAK](../nak-t100-practical-guide/) sans traiter son indication comme un SNR positif déjà calculé.

## Si la mesure surprend

Un bruit changeant avec l'écran ou le chargeur suggère de chercher des interférences. De la musique dans le silence appelle une vérification de l'effacement. Si le gain a changé entre sections, refaites les deux lectures. Un WAV éventuel doit conserver les deux sections sans traitement ni normalisation.

Contrôle final : silence enregistré, référence déclarée, gain identique, RMS/pondération/bande cohérents et deux canaux. Testez [Dolby B](../dolby-b/) séparément avec codage/décodage assortis ; activer uniquement le NR en lecture pose une autre question.
