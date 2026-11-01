---
id: "dolby-s"
lang: "fr"
title: "Dolby S : ce qui le rendait différent"
description: "Comprendre Dolby S sans le confondre avec Dolby C, HX Pro ou le Dolby numérique."
primaryKeyword: "Dolby S"
secondaryKeywords: ["compatibilité","niveau d'enregistrement","comparatif logiciel","Dolby C"]
searchIntent: "informational"
answer: "Le Dolby S agit sur le souffle dans les aigus et sur une partie du bruit dans les graves. Comme B et C, il nécessite un encodage à l'enregistrement et un décodage correspondant à la lecture. Il aide les passages calmes, mais ne répare ni un mécanisme usé ni une bande abîmée."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Dolby Laboratories · CP45 · Appendix D", "url": "https://www.film-tech.com/warehouse/manuals/DOLBYCP45USERS.pdf"}]





guideType: "explainer"
prerequisites: ["dolby-b"]
next: ["playback-compatibility"]
related: ["dolby-c", "dolby-b-c-s-playback", "software-noise-reduction"]
---

## Quand l'utiliser ?

Choisis S lorsque la platine d'enregistrement et celle d'écoute disposent toutes deux de S. Pour un cadeau, vérifie d'abord l'équipement du destinataire : la [compatibilité](../playback-compatibility/) compte plus que le système le plus élaboré. Certains manuels décrivent une lecture acceptable des cassettes S avec B. Ce compromis n'équivaut pas au décodage S et doit être essayé.

## Un premier essai concret

Prévois une platine avec S, une cassette vierge adaptée, un casque et un morceau connu avec une introduction calme puis une partie forte. Relie la sortie ligne stéréo de la source à LINE IN L/R.

1. Choisis le bon type de bande, désactive le NR logiciel et sélectionne S sur la platine pour enregistrer.
2. Règle REC LEVEL sur le passage le plus fort, selon le manuel. S ne permet pas d'enregistrer à n'importe quel niveau.
3. Enregistre les deux passages, arrête et rembobine.
4. Lis avec S. Compare voix, fins de cymbales et silences avec la source à volume proche.
5. Répète sur la platine de destination et inscris « Dolby S » sur la jaquette.

Si le bruit baisse mais que les résonances disparaissent, vérifie d'abord le mode et l'état de la bande et de la platine. Si seules les parties fortes deviennent rugueuses, vérifie le [niveau d'enregistrement](../recording-levels/) : c'est un autre problème.

## Limites logicielles

MixtapeForge 0.1 n'implémente pas S. Les modes B/C documentés de DDi Codec et B/uhx de Satin ne décodent pas S ; consulte le [comparatif logiciel](../software-noise-reduction/). Aucun remplacement logiciel S vérifié n'est proposé ici. Utilise une platine S fonctionnelle pour une lecture fidèle ; à défaut, conserve un transfert numérique non décodé pour un travail spécialisé ultérieur.
