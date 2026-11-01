---
id: "recording-computer"
lang: "fr"
title: "Comment enregistrer une cassette depuis un ordinateur"
description: "Ce guide permet de passer d’une sélection sur ordinateur à une cassette que vous pouvez rembobiner et écouter."
primaryKeyword: "Comment enregistrer une cassette depuis un ordinateur"
secondaryKeywords: ["les combinaisons d’enregistrement et de lecture","vérifiez le niveau sur bande","contrôlez les débuts et fins","le monitoring à deux ou trois têtes"]
searchIntent: "task"
answer: "Ce guide permet de passer d’une sélection sur ordinateur à une cassette que vous pouvez rembobiner et écouter. La platine enregistre un signal analogique : MixtapeForge fournit ce signal, sans commander le mécanisme de la platine."
category: "recording"
image: "recording"
updated: "2026-11-01"
sources: [{"title": "TEAC W-1200 — fonctions et types de bande", "url": "https://teac.jp/jp/support/news/5488"}, {"title": "Audacity — glossaire audio numérique", "url": "https://manual.audacityteam.org/man/glossary.html"}]
guideType: "procedure"
related: ["recording-levels", "two-head-three-head", "dolby-b-c-s-playback", "before-sending-mixtape"]
prerequisites: []
next: ["recording-levels"]
---

## Matériel et branchements

Prévoyez une platine capable d’enregistrer, une cassette vierge compatible, un casque ou un amplificateur, et un ordinateur avec sortie stéréo. Une interface audio convient si l’ordinateur ne possède pas de sortie adaptée. Reliez les sorties gauche et droite à **LINE IN / REC IN** de la platine avec les câbles appropriés. Une sortie casque stéréo de 3,5 mm nécessite un câble stéréo vers deux RCA ; son volume influence l’enregistrement. N’utilisez jamais une sortie pour enceintes. Écoutez le résultat au casque sur la platine ou via sa sortie LINE OUT reliée à un amplificateur.

## Commencez par un essai court

1. Importez un morceau connu dans Mixtape. Dans les réglages, sélectionnez la sortie vers la platine et une fréquence d’échantillonnage acceptée par l’interface.
2. Insérez la cassette et choisissez son type si la détection n’est pas automatique. Décidez de la réduction de bruit avant les niveaux. Pour commencer, désactivez le NR logiciel ; utilisez le Dolby B matériel seulement si le lecteur final le décode. Consultez [les combinaisons d’enregistrement et de lecture](../dolby-b-c-s-playback/).
3. Placez la platine en pause d’enregistrement selon son manuel. Lisez un passage fort dans l’application, vérifiez les deux indicateurs de la platine et réglez REC LEVEL selon ses indications. Les compteurs n’ont pas les mêmes références : [vérifiez le niveau sur bande](../recording-levels/).
4. Lancez l’enregistrement sur la platine, puis **REC** dans MixtapeForge. Le son démarre après trois secondes. L’amorce transparente ne s’enregistre pas ; si elle dure davantage, laissez-la passer avant de lancer l’application. Enregistrez un passage fort et un passage calme.
5. Arrêtez les deux appareils, rembobinez puis écoutez avec le NR correspondant. Vérifiez les deux canaux, la première note et les voix ou cymbales les plus fortes.

## Enregistrez ensuite la face entière

Gardez fixes le volume de sortie, les câbles et REC LEVEL. Sélectionnez A, vérifiez la durée puis recommencez. Arrêtez la platine à la fin : Stop dans l’application coupe seulement le son de l’ordinateur. Répétez pour B et [contrôlez les débuts et fins](../before-sending-mixtape/).

Des indicateurs immobiles sur la platine invitent à vérifier la sortie et les câbles. S’ils bougent mais que la bande reste muette, vérifiez la commande d’enregistrement et la cassette : le compteur logiciel ne prouve pas qu’elle a été enregistrée.

**Avant la prise complète :** deux canaux entendus sur bande, amorce passée, niveaux fixes, face et NR corrects.

Si vous ignorez si le casque reçoit la source ou la bande, vérifiez [le monitoring à deux ou trois têtes](../two-head-three-head/).
