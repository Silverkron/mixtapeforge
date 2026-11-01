---
id: "recording-levels"
lang: "fr"
title: "Niveaux d’enregistrement cassette : éviter saturation et niveau trop faible"
description: "Réglez le niveau avec un essai sur bande qui reste clair dans les passages les plus forts."
primaryKeyword: "Niveaux d’enregistrement cassette"
secondaryKeywords: ["branchements depuis l’ordinateur","normalisation et compression","le diagnostic de distorsion","Comment enregistrer une cassette depuis un ordinateur"]
searchIntent: "task"
answer: "Réglez le niveau avec un essai sur bande qui reste clair dans les passages les plus forts. Une indication plus élevée ne garantit pas une meilleure cassette : un excès peut rendre les voix rugueuses et les cymbales ternes ou confuses."
category: "recording"
image: "recording"
updated: "2026-11-01"
sources: [{"title": "TEAC W-1200 — fonctions et types de bande", "url": "https://teac.jp/jp/support/news/5488"}, {"title": "Audacity — glossaire audio numérique", "url": "https://manual.audacityteam.org/man/glossary.html"}]
guideType: "procedure"
related: ["recording-computer", "normalization-compression-eq", "distorted-recordings"]
prerequisites: ["recording-computer"]
next: ["recording-computer"]
---

## Deux échelles différentes

Le compteur numérique de l’application utilise les dBFS : 0 représente la limite numérique. La platine possède sa propre échelle, souvent autour de 0 dB, qui n’équivaut pas à 0 dBFS. Son indication dépend du niveau de sortie réel et de REC LEVEL.

## Régler avec une vraie prise

Préparez les [branchements depuis l’ordinateur](../recording-computer/), la cassette prévue, un passage fort et un passage calme. Réglez d’abord type et NR. Gardez fixe le volume de l’ordinateur/interface.

1. Placez la platine en pause d’enregistrement. Lisez le passage fort et réglez REC LEVEL dans la zone conseillée par son manuel. Il n’existe pas de règle universelle à +3 dB.
2. Enregistrez environ 30 secondes, arrêtez, rembobinez puis écoutez la bande : canaux, consonnes, attaques de basse et cymbales.
3. Si elle devient plus rugueuse que la source, baissez REC LEVEL et répétez le même passage. Changez un seul réglage. Si une prise faible distord aussi, vérifiez la source et l’interface en amont.
4. Écoutez le passage calme. Si le souffle le masque, essayez légèrement plus fort tant que le passage fort reste propre. Choisissez le compromis le plus clair.
5. Notez sortie/volume, REC LEVEL, bande et NR ; conservez-les pour toute la face.

**EQ / Audio** propose [normalisation et compression](../normalization-compression-eq/), sans étalonner le compteur physique. Avec le Type B logiciel, suivez l’alignement des niveaux et évitez les changements de gain après codage.

**Contrôle final :** aucun écrêtage numérique, passage fort propre, passage calme exploitable, réglages notés. En cas de défaut persistant, consultez [le diagnostic de distorsion](../distorted-recordings/).
