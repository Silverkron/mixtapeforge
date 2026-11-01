---
id: "tape-dropouts"
lang: "fr"
title: "Coupures sur cassette : bande abîmée, saleté ou mauvais contact ?"
description: "Distinguer un passage endommagé d’un lecteur qui perd le contact avec la bande."
primaryKeyword: "Coupures sur cassette"
secondaryKeywords: ["nettoyage","s'emmêler","profil d'enregistrement","Pourquoi ma platine mange-t-elle les bandes ?"]
searchIntent: "diagnosis"
answer: "Un dropout est une perte brève de signal : un mot baisse, une cymbale disparaît ou un canal perd momentanément ses aigus. Le but est de déterminer si la perte suit un point précis de la bande ou varie entre lectures."
category: "troubleshooting"
image: "portable"
updated: "2026-11-01"
sources: [{"title": "Sony · 00027549", "url": "https://www.sony.com/electronics/support/audio-video/tcm-230dv/articles/00027549"}, {"title": "Audacity · Transférer une cassette", "url": "https://manual.audacityteam.org/man/tutorial_copying_tapes_lps_or_minidiscs_to_cd.html"}]


guideType: "troubleshooting"
prerequisites: []
next: ["clean-cassette-deck", "recording-profile"]
related: ["tape-eating", "quiet-channel", "muffled-cassettes"]
---

## Répéter le passage

Utilise un casque et, éventuellement, un logiciel comme [Audacity](https://manual.audacityteam.org/man/tutorial_copying_tapes_lps_or_minidiscs_to_cd.html). Pour capturer, relie LINE OUT L/R aux entrées ligne de l'interface, sélectionne stéréo et évite l'écrêtage. Garde les traitements identiques.

1. Note le moment de la baisse et relis une fois ce court passage. Évite les lectures répétées d'une bande visiblement endommagée.
2. Si la baisse revient au même moment musical, compare à la source originale si disponible : elle peut être déjà enregistrée.
3. Essaie une cassette saine avec ses réglages NR/EQ. Si elle présente aussi des pertes variables, examine le trajet et suis le [nettoyage](../clean-cassette-deck/).
4. Si cela ne présente pas de risque, compare la bande suspecte sur une seconde platine fonctionnelle avec le même mode de lecture.
5. Note si la perte reste au même endroit, touche un ou deux canaux ou se déplace entre passages.

## Suivre les indices

Une perte répétable sur deux platines suggère un défaut inscrit ou un problème d'enregistrement, sans les distinguer sans original. Une perte mobile suggère un contact ou un entraînement instable. Plusieurs cassettes défaillantes sur une seule machine orientent vers celle-ci.

Arrête si la bande se plisse, laisse des dépôts ou commence à [s'emmêler](../tape-eating/). L'expansion NR peut rendre le dropout plus évident, mais la désactiver ne le répare pas.

Ne crée pas une EQ pour des baisses brèves : elle modifierait aussi toute la musique intacte. Conserve le meilleur transfert non retouché ; reconstruire un instant abîmé relève d'une restauration distincte. Crée un [profil d'enregistrement](../recording-profile/) seulement avec des résultats stables et répétables.
