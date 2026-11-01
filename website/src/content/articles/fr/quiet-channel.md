---
id: "quiet-channel"
lang: "fr"
title: "Un canal de cassette est plus faible : trouver la cause"
description: "Suivre le déséquilibre depuis la source jusqu’aux étapes d’enregistrement et de lecture."
primaryKeyword: "Un canal de cassette est plus faible"
secondaryKeywords: ["nettoyage prévu","mesure d'équilibre","Nettoyer têtes, cabestans et galets d’une platine cassette","Vérifier polarité et retard stéréo avec un signal mono connu"]
searchIntent: "diagnosis"
answer: "Si un canal est plus faible, trouve d'abord où apparaît l'écart. Un morceau stéréo n'est pas un signal étalonné : une guitare peut être volontairement latérale. Utilise le même signal mono sur les deux canaux, ou une voix dont tu sais qu'elle est centrée, pour la première vérification."
category: "troubleshooting"
image: "portable"
updated: "2026-11-01"
sources: [{"title": "Pioneer · CT-1270WR", "url": "https://c.searspartsdirect.com/doc/L0801128"}, {"title": "Audacity · Transférer une cassette", "url": "https://manual.audacityteam.org/man/tutorial_copying_tapes_lps_or_minidiscs_to_cd.html"}]


guideType: "troubleshooting"
prerequisites: []
next: ["channel-balance"]
related: ["clean-cassette-deck", "phase-polarity", "muffled-cassettes"]
---

## Suivre le canal faible

Prévois casque, câble stéréo fiable et enregistrement connu. En acquisition, sélectionne une paire stéréo avec gains ligne égaux. Une prise mono n'est pas automatiquement une entrée stéréo.

1. Centre les balances du logiciel et de l'amplificateur, coupe les effets propres à un canal. Écoute aussi la sortie casque de la platine si disponible.
2. Lis la cassette connue. Note le canal physique faible et compare les indicateurs s'ils montrent le niveau de lecture.
3. Arrête et baisse le volume. Inverse L/R **uniquement à l'extrémité des entrées ligne réceptrices**, sans changer le côté platine, puis relis.
4. Si le côté faible se déplace, le problème est en amont : platine, enregistrement ou câble. S'il reste sur la même entrée, examine gain, sélection et chaîne d'écoute en aval.
5. Rétablis les connexions, essaie un câble fiable puis une seconde cassette pour distinguer câble et bande.

## Choisir la suite

Si plusieurs cassettes restent faibles sur le même canal de platine, suis le [nettoyage prévu](../clean-cassette-deck/) avant réparation. Si seules les nouvelles copies sont concernées, vérifie source et niveaux d'enregistrement. Si le casque direct est équilibré mais pas la capture, examine routage et gains de l'interface.

Ne compense pas une perte intermittente par un gain permanent. Une fois l'écart stable, utilise la [mesure d'équilibre](../channel-balance/). Les dB n'ont de sens qu'avec signaux égaux et acquisition vérifiée. Note les connexions pour ne pas corriger par erreur un câble inversé plutôt que la chaîne.
