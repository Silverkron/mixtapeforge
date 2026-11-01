---
id: "dull-dolby"
lang: "fr"
title: "Pourquoi Dolby B rend-il la cassette terne ?"
description: "Vérifier codage, niveaux et réponse de lecture avant de relever les aigus."
primaryKeyword: "Pourquoi Dolby B rend-il la cassette terne ?"
secondaryKeywords: ["guide d'identification","EQ de lecture","niveau de lecture","Dolby et dbx en logiciel"]
searchIntent: "diagnosis"
answer: "Si Dolby rend la cassette anormalement sourde, n'ajoute pas immédiatement des aigus. Le décodeur réagit au contenu fréquentiel et au niveau. Le tracking désigne la correspondance entre son action variable et celle de l'encodeur ; une erreur de niveau ou de réponse peut la perturber."
category: "troubleshooting"
image: "portable"
updated: "2026-11-01"
sources: [{"title": "Dolby Laboratories · CP45 · Appendix D", "url": "https://www.film-tech.com/warehouse/manuals/DOLBYCP45USERS.pdf"}, {"title": "IASA · TC-04 · 5.4.11", "url": "https://www.iasa-web.org/book/export/html/435"}, {"title": "Anaxwaves · DDi Codec", "url": "https://www.anaxwaves.com/DDiCodec/"}]


guideType: "troubleshooting"
prerequisites: ["dolby-b"]
next: ["playback-level", "muffled-cassettes"]
related: ["software-noise-reduction", "playback-equalization", "recording-sensitivity"]
---

## Isoler la cause sur un court passage

Prévois les notes d'enregistrement, un casque, l'original si disponible et une cassette connue en bon état. Garde un volume stable et note chaque modification.

1. Confirme le format. Une bande sans NR ne doit pas passer par B ou C. En cas de doute, utilise le [guide d'identification](../dolby-b-c-s-playback/).
2. Vérifie l'[EQ de lecture](../playback-equalization/), puis écoute la cassette connue. Si les deux sont sourdes, vérifie et nettoie le trajet accessible selon le manuel avant de modifier le traitement.
3. Pour ta propre copie, reconstitue le trajet. Avec B matériel, NR logiciel doit être coupé. Avec Type B logiciel, coupe NR sur la platine à l'enregistrement puis active B à la lecture. Changer le volume ne corrige pas un double encodage.
4. Compare voix faible, fins de cymbales et passages forts à volume **d'écoute** proche de l'original. Ne change pas la calibration d'enregistrement pour amplifier la comparaison.
5. Avec décodage logiciel, conserve la capture originale et vérifie la référence. Un signal documenté permet l'alignement ; sans lui, l'ajustement à l'oreille reste estimatif.

## Ce que suggère le résultat

- **Toutes les cassettes sont sourdes :** vérifie lecture et contact des têtes.
- **Une seule nouvelle copie :** vérifie bande, niveau et trajet avec un seul encodeur.
- **Surtout les détails faibles disparaissent :** vérifie mode NR et alignement niveau/réponse ; cela ne prouve pas un circuit Dolby défectueux.
- **Un seul canal change :** examine canal et contact avant une EQ globale.

Ajouter 2 dB après décodage peut égaliser le volume, pas annuler les décisions fréquentielles déjà prises. La référence Type B à 0 dans MixtapeForge ne désactive pas l'encodage et n'est pas une cible pour le vumètre de la platine. Le profil général ne certifie pas l'alignement Dolby. Vérifie ensuite le [niveau de lecture](../playback-level/) et refais un court essai musical.
