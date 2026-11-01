---
id: "azimuth-test"
lang: "fr"
title: "Vérifier l’azimut sans perdre l’alignement initial"
description: "Observer niveau des aigus et phase avec une vraie référence avant d’envisager une intervention."
primaryKeyword: "Vérifier l’azimut sans perdre l’alignement initial"
secondaryKeywords: ["niveau et polarité","La réponse en fréquence","Vérifier polarité et retard stéréo avec un signal mono connu","Mesurer les changements de graves, médiums et aigus sur cassette"]
searchIntent: "evaluation"
answer: "L'azimut est l'angle de l'entrefer de la tête par rapport à la piste enregistrée. Un écart peut affaiblir les aigus et dégrader la somme mono. Cette méthode cherche des indices, sans proposer de réglage universel des vis."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Jay McKnight : azimut dans un magnétophone", "url": "https://www.mrltapes.com/mcknight_azimuth-in-mtr.pdf"}, {"title": "NAK T-100 : liste de contrôle des mesures", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "NAK T-100 : caractéristiques officielles", "url": "https://anaxwaves.com/NAKT100/"}]
related: ["phase-polarity", "frequency-response", "playback-level"]
guideType: "measurement"
prerequisites: ["calibration-tapes"]
next: ["different-decks"]
---

## Matériel requis

Utilisez la cassette d'azimut prescrite par le manuel de service, une entrée ligne stéréo et l'oscilloscope deux canaux de NAK T-100. Fréquence, format des pistes et alignement du témoin doivent être documentés. La musique ou une tonalité auto-enregistrée ne constituent pas une référence indépendante.

Vérifiez d'abord le transport avec une cassette ordinaire. N'introduisez pas un témoin coûteux dans une machine qui abîme les bandes. Nettoyez uniquement selon le fabricant.

## Observer avant de toucher

1. Reliez LINE OUT L/R aux entrées ligne L/R, choisissez stéréo, coupez effets et gain automatique et fixez les gains.
2. Insérez le témoin avec le type de lecture requis et NR coupé. Lancez son segment d'azimut.
3. Choisissez **Level** et notez les deux niveaux stabilisés. Réduisez l'entrée si elle écrête.
4. Passez à **Scope > O'scope**. Les sinusoïdes montent-elles ensemble ? **Lissajous** représente un canal en fonction de l'autre : deux signaux égaux en phase tendent vers une diagonale ; un déphasage ouvre une ellipse.
5. Répétez la section et notez amplitude et phase. Examinez plusieurs fréquences documentées si le témoin les fournit.
6. Conservez résultats et informations du témoin. Si l'écart se répète, consultez la procédure du modèle ou un technicien avant de bouger la tête.

## Limites du dessin

À haute fréquence, un retard peut correspondre à un cycle entier. Une phase apparemment alignée à une fréquence ne prouve donc pas un azimut correct. Guidage, contact, électronique des canaux et témoin influencent également le résultat.

Exemple hypothétique : l'ellipse est étroite à une fréquence, large à une autre, et le niveau varie entre passages. Vérifiez répétabilité et contact plutôt que de tourner une vis jusqu'à redresser une seule figure.

## Difficultés usuelles

Une seule sinusoïde : contrôler le routage. Une diagonale inclinée à cause d'un canal faible : examiner [niveau et polarité](../phase-polarity/) avant d'accuser l'azimut. Une figure instable : autre référence saine et vérification du transport.

Contrôle final : témoin documenté, deux canaux, pas d'écrêtage, répétitions et alignement initial préservé. [La réponse en fréquence](../frequency-response/) montre une conséquence sonore sans identifier indépendamment sa cause.
