---
id: "software-noise-reduction"
lang: "fr"
title: "Dolby et dbx en logiciel : outils, formats et limites"
description: "Choisir un encodeur ou décodeur documenté plutôt qu’une simple mention de réduction de bruit."
primaryKeyword: "Dolby et dbx en logiciel"
secondaryKeywords: ["guide du niveau de lecture","contrôles d'alignement","DNL et DNR","Réduction de bruit dbx"]
searchIntent: "task"
answer: "Un codec logiciel encode ou décode un format NR précis. Un débruiteur estime le bruit indésirable et en retire une partie. Ce sont deux tâches différentes : un filtre générique « souffle de bande » ne décode ni Dolby ni dbx."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Anaxwaves · DDi Codec", "url": "https://www.anaxwaves.com/DDiCodec/"}, {"title": "Anaxwaves · DxI Codec", "url": "https://anaxwaves.com/DxICodec/"}, {"title": "Anaxwaves · DxII Codec", "url": "https://www.anaxwaves.com/DxIICodec/"}, {"title": "u-he · Satin 1.3.3", "url": "https://u-he.com/downloads/manuals/plugins/satin/Satin-user-guide.pdf"}, {"title": "libdolbyb", "url": "https://codeberg.org/martinwguy/libdolbyb"}]



guideType: "procedure"
prerequisites: ["dolby-b-c-s-playback"]
next: ["dull-dolby", "recording-computer"]
related: ["dbx-noise-reduction", "playback-level", "dolby-c"]
---

## Choisir selon le format réel

| Outil | Fonction documentée | À vérifier |
| --- | --- | --- |
| [DDi Codec](https://www.anaxwaves.com/DDiCodec/) | Encodage/décodage B/C, application autonome | Mode, alignement de référence, système compatible |
| [DxII Codec](https://www.anaxwaves.com/DxIICodec/) / [DxI Codec](https://anaxwaves.com/DxICodec/) | Respectivement dbx II / I, plus modes Disc | I et II ne sont pas interchangeables |
| [Satin](https://u-he.com/downloads/manuals/plugins/satin/Satin-user-guide.pdf) | Modèles de compandeur B-Type et uhx I/II parmi ses effets | Éviter les colorations de bande supplémentaires pendant l'essai |
| [libdolbyb](https://codeberg.org/martinwguy/libdolbyb) | Bibliothèque Type B de l'encodeur optionnel MixtapeForge | Présence dans la compilation et comparaison matérielle |

Ils ne sont pas tous inclus dans MixtapeForge. La version 0.1 propose **Type B · libdolbyb** en option, pas C, S ou dbx. Son emplacement VST3 stéréo externe ne garantit pas la compatibilité de tout plugin ou format NR.

## Décoder une cassette une seule fois

Il faut le bon décodeur, une interface à entrées ligne stéréo, un logiciel d'acquisition et un casque.

1. Relie LINE OUT L/R de la platine à LINE IN 1/2 de l'interface. Choisis le niveau ligne, désactive le gain automatique et évite l'écrêtage. Le [guide du niveau de lecture](../playback-level/) distingue crête numérique et référence Dolby.
2. Pour décoder en logiciel, coupe NR sur la platine et choisis l'EQ correcte. Capture en stéréo sans traitement à une fréquence compatible, en 24 bits si possible. Garde cet original.
3. Ouvre une copie dans le décodeur, choisis le format réel et la direction **decode**. Utilise le signal de référence documenté s'il existe ; sans lui, l'ajustement à l'oreille reste une estimation.
4. Compare des passages faibles et forts. Ajuste le volume d'écoute après décodage ; ne normalise ni n'égalise arbitrairement le fichier encodé en amont.
5. Sauvegarde un fichier décodé séparé avec mode et référence dans les notes. Ne redécode jamais une capture déjà décodée par la platine.

Pour encoder : source ordinaire → encodeur → platine avec NR d'enregistrement coupé → décodeur correspondant à la lecture. Teste une minute avant toute la face. Si les passages faibles perdent leurs aigus, suis les [contrôles d'alignement](../dull-dolby/) : augmenter le volume final ne corrige pas la référence du décodeur.

Pour atténuer le souffle sans bande encodée, découvre [DNL et DNR](../dnl-dnr/) : ces filtres de lecture ont un autre rôle qu’un décodeur Dolby.
