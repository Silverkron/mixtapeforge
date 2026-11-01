---
id: "wobbly-playback"
lang: "fr"
title: "Lecture instable : avant de mesurer pleurage et scintillement"
description: "Déterminer si la hauteur instable vient de la bande, de l’alimentation ou du transport."
primaryKeyword: "Lecture instable"
secondaryKeywords: ["problème de vitesse","nettoyage du modèle","procédure wow/flutter","Cassette trop rapide ou trop lente"]
searchIntent: "diagnosis"
answer: "Une note de piano qui se courbe ou un accord tenu qui ondule peut révéler une vitesse variable. Les fluctuations lentes sont appelées pleurage (wow), les rapides scintillement (flutter). Une hauteur constamment trop aiguë relève d'un autre problème de vitesse."
category: "troubleshooting"
image: "portable"
updated: "2026-11-01"
sources: [{"title": "Sony · 00027611", "url": "https://www.sony.com/electronics/support/audio-video-audio-components/tc-w530/articles/00027611"}, {"title": "Anaxwaves · NAK T-100", "url": "https://www.anaxwaves.com/NAKT100/"}]

guideType: "troubleshooting"
prerequisites: []
next: ["wow-flutter"]
related: ["playback-speed-problems", "clean-cassette-deck", "tape-eating"]
---

Une note de piano qui se courbe ou un accord tenu qui ondule peut révéler une vitesse variable. Les fluctuations lentes sont appelées **pleurage** (*wow*), les rapides **scintillement** (*flutter*). Une hauteur constamment trop aiguë relève d'un autre [problème de vitesse](../playback-speed-problems/).

## Séparer bande, lecteur et enregistrement

Prévois une cassette connue avec notes tenues, une seconde saine et un casque ; des piles neuves aident pour un portable. Vibrato et chorus musicaux peuvent ressembler au défaut : compare l'original si possible.

1. Écoute deux fois le même passage. Note si l'oscillation revient exactement au même moment musical ou change.
2. Essaie la seconde cassette. Si les deux fluctuent, vérifie alimentation/piles et réglage pitch éventuel.
3. Examine le trajet accessible, appareil débranché. Suis le [nettoyage du modèle](../clean-cassette-deck/), laisse sécher et réessaie une cassette sans valeur.
4. Arrête si le mouvement paraît irrégulier. Ne poursuis pas avec un transport défaillant et ne tire pas sur une bande en mouvement.
5. Essaie si possible la bande suspecte sur une autre platine. Un défaut répétable là aussi peut être déjà enregistré ; un seul lecteur instable oriente vers sa mécanique.

## Mesurer ou réparer ?

Si le transport n'est pas sûr, la réparation vient d'abord. Si la bande circule normalement mais la hauteur reste instable, une bande étalon documentée de 3 000/3 150 Hz et un analyseur dédié quantifient le symptôme : suis la [procédure wow/flutter](../wow-flutter/).

Un pourcentage sans pondération ni détecteur est incomplet. Ces paramètres déterminent quelles fluctuations comptent et comment les crêtes sont résumées ; les méthodes peuvent produire des chiffres différents. Un spectre musical ou un simple fréquencemètre n'est pas cette mesure.

Le profil EQ de MixtapeForge ne stabilise pas un moteur et ne retire pas une hauteur variable. Ne sauvegarde pas cette instabilité comme correction de réponse ; vérifie d'abord une lecture stable.
