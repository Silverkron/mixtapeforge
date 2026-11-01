---
id: "needs-calibration"
lang: "fr"
title: "Votre platine a-t-elle besoin d’un étalonnage ? Les premiers contrôles"
description: "Distinguer une mauvaise cassette, un réglage incorrect et un défaut reproductible avant de demander un alignement."
primaryKeyword: "Votre platine a-t-elle besoin d’un étalonnage ? Les premiers contrôles"
secondaryKeywords: ["un test reproductible","l'équilibre des canaux","une référence de vitesse","Pourquoi une cassette sonne différemment sur une autre platine"]
searchIntent: "diagnosis"
answer: "Une cassette décevante ne suffit pas à diagnostiquer une platine déréglée. Ces contrôles aident à décider s'il faut modifier une option, essayer une autre bande ou réunir des éléments pour un réparateur."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100 : liste de contrôle des mesures", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "REW : configuration de l’interface audio", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}]
related: ["different-decks", "channel-balance", "speed-test"]
guideType: "troubleshooting"
prerequisites: ["calibration-basics"]
next: ["without-reference-tape"]
---

## Préparer une comparaison équitable

Prenez une cassette préenregistrée familière en bon état, deux cassettes enregistrables utilisables et un court fichier musical avec voix et cymbales. La préenregistrée sert de repère d'écoute, pas de référence d'étalonnage certifiée. Gardez un volume modéré et photographiez les commandes avant de les modifier.

## Suivre cet ordre

1. Lisez la cassette connue avec le NR employé à l'enregistrement et le bon type de bande en lecture. Cherchez hauteur instable, aigus intermittents ou canal constamment faible.
2. Écoutez directement le fichier musical sur la sortie habituelle. Si le défaut existe déjà, examinez source et routage avant la platine.
3. Enregistrez trente secondes sur la première cassette, NR coupé et niveau prudent. Relisez avec NR toujours coupé. Comparez à volume perçu voisin : une version plus faible paraît souvent moins claire.
4. Répétez sur la seconde sans déplacer les commandes. Un défaut limité à un exemplaire oriente d'abord vers la bande ou le boîtier.
5. Si les deux sont touchées, effectuez [un test reproductible](../without-reference-tape/). Conservez captures brutes et réglages au lieu de tourner des vis internes.

## Lire les indices

| Observation | Vérification simple | Suite raisonnable |
| --- | --- | --- |
| Seules les cymbales fortes deviennent ternes | Réenregistrer 3 dB plus bas | Examiner la saturation des aigus |
| Un canal reste faible | Signal mono identique sur L/R | Mesurer l'équilibre |
| La hauteur varie sur plusieurs bandes | Autre cassette fiable | Vérifier le transport puis sa stabilité |
| La lecture Dolby paraît étouffée | Correspondance du NR | Vérifier niveaux et alignement avant l'EQ |

Ce sont des pistes, pas des diagnostics. Exemple hypothétique : deux nouvelles prises sont sourdes tandis que les préenregistrées connues restent claires. Les conditions d'enregistrement deviennent une piste plus forte que la lecture, sans identifier un composant précis.

Pour un écart stable L/R, mesurez [l'équilibre des canaux](../channel-balance/). Pour une hauteur constamment incorrecte, utilisez [une référence de vitesse](../speed-test/).

## Avant le dépannage

- Confirmez sur plusieurs cassettes.
- Notez les réglages qui reproduisent le symptôme.
- Gardez un court original et son retour.
- Si un problème mécanique ou d'alignement persiste, demandez une intervention propre au modèle : un profil EQ ne le répare pas.
