---
id: "bias-eq-nr"
lang: "fr"
title: "Bias, égalisation et réduction de bruit : trois fonctions distinctes"
description: "Distinguer l’enregistrement physique, l’équilibre tonal et le codage de réduction de bruit."
primaryKeyword: "Bias, égalisation et réduction de bruit"
secondaryKeywords: ["type de bande","procédure mesurée","l'EQ de lecture","Comprendre le bias et utiliser les réglages externes"]
searchIntent: "informational"
answer: "BIAS, EQ et NR peuvent être voisins sur la façade, mais ils remplissent des fonctions différentes. Les régler tous à l'oreille jusqu'à obtenir un son brillant peut masquer une mauvaise configuration."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Harman Kardon · CD301 · HX Pro", "url": "https://support.harmanaudio.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw37931a4e/pdfs/CD%20301%5EHK%5Eom%5E%5E%5E%5E.pdf"}, {"title": "Pioneer · CT-1270WR", "url": "https://c.searspartsdirect.com/doc/L0801128"}, {"title": "Marantz · PMD222", "url": "https://manuals.plus/m/911034fdc965e3cc6270e2dc390788588820521c42e333e7c5607af3154d18de"}]



guideType: "explainer"
prerequisites: []
next: ["playback-equalization", "dolby-b"]
related: ["bias-adjustment", "hx-pro", "cassette-types"]
---

## Trois commandes, trois rôles

- **Bias** : signal ultrasonique ajouté à l'enregistrement pour rendre l'aimantation plus régulière. Ce n'est pas une accentuation audible des aigus ; il n'agit pas sur une cassette déjà enregistrée pendant sa lecture.
- **EQ de lecture** : réponse normalisée permettant de lire correctement l'enregistrement. Les réglages courants sont 120 µs et 70 µs ; il s'agit d'une constante de temps, pas d'un retard audible.
- **NR** : réduction du bruit. Dolby B/C/S exige le mode correspondant à l'enregistrement. Une cassette non encodée se lit avec NR désactivé.

Le sélecteur de bande peut combiner automatiquement bias et EQ. Sur une autre platine à commandes séparées, copier la position physique des boutons ne suffit pas.

## Préparer un nouvel enregistrement

Prévois l'emballage de la cassette vierge et le manuel. Aucun analyseur n'est nécessaire pour identifier les réglages prévus.

1. Identifie le [type de bande](../cassette-types/) et sélectionne sa position. Vérifie la détection automatique si le sélecteur manuel est absent.
2. Laisse le bias fin à sa position initiale documentée. Utilise une [procédure mesurée](../bias-adjustment/) avant de le modifier.
3. Choisis NR selon le lecteur de destination : avec Dolby B matériel, NR logiciel reste désactivé et la platine utilise B à l'enregistrement et à la lecture.
4. Enregistre puis relis un passage connu avec l'EQ prévue ; évalue clarté et distorsion.

Pour une cassette existante, le bias n'intervient pas : commence par [l'EQ de lecture](../playback-equalization/) et le NR documenté. HX Pro agit aussi uniquement à l'enregistrement, sans décodeur. L'EQ audio de MixtapeForge modifie la source et ne remplace ni bias ni égalisation normalisée de la platine.
