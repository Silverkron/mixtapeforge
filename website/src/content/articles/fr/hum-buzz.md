---
id: "hum-buzz"
lang: "fr"
title: "Ronflement en enregistrant : suivre le trajet audio"
description: "Repérer source, câbles, interface ou platine avant de filtrer le bruit."
primaryKeyword: "Ronflement en enregistrant"
secondaryKeywords: ["souffle de bande","loopback","Mesurer le souffle par rapport à un signal enregistré","Comment enregistrer une cassette depuis un ordinateur"]
searchIntent: "diagnosis"
answer: "Le ronflement est un son grave constant ; un bourdonnement peut être plus agressif. Contrairement au « chhh » du souffle de bande, il peut venir d'interférences électriques ou des connexions. Mieux vaut l'éliminer avant l'enregistrement que filtrer la cassette terminée."
category: "troubleshooting"
image: "portable"
updated: "2026-11-01"
sources: [{"title": "Focusrite · Ronflement et bruit", "url": "https://support.focusrite.com/hc/en-gb/articles/211615185-Why-is-there-unwanted-hum-noise-in-my-monitors"}, {"title": "Sony · ICD-PX470", "url": "https://helpguide.sony.net/icd/p47/v1/en2/contents/TP0001155787.html"}]

guideType: "troubleshooting"
prerequisites: []
next: ["loopback-round-trip"]
related: ["tape-hiss-snr", "recording-computer", "quiet-channel"]
---

Le ronflement est un son grave constant ; un bourdonnement peut être plus agressif. Contrairement au « chhh » du [souffle de bande](../tape-hiss-snr/), il peut venir d'interférences électriques ou des connexions. Mieux vaut l'éliminer avant l'enregistrement que filtrer la cassette terminée.

## Trouver son entrée

Prévois casque et câble audio court fiable. Baisse le volume et arrête le transport avant de débrancher. Ne supprime jamais la terre de protection et ne modifie pas les prises secteur.

1. Écoute la source par l'interface avec les câbles audio de la platine déconnectés. Si le bruit reste, commence par ordinateur/interface.
2. Branche seulement la liaison d'enregistrement : sorties ligne de l'interface vers LINE IN. Laisse le retour LINE OUT débranché pour cet essai.
3. Si le bruit apparaît, éloigne les câbles des alimentations et essaie le câble fiable. Réécoute sans changer le gain.
4. Avec un portable, essaie brièvement sur batterie en débranchant normalement le chargeur. Une amélioration suggère un rôle de l'alimentation ou des connexions, sans identifier sûrement un composant défectueux.
5. Rebranche le retour seulement si nécessaire. S'il introduit le bruit, il peut créer une **boucle de masse**, un trajet électrique indésirable entre appareils. Vérifie le câblage et envisage si nécessaire une isolation adaptée au niveau ligne.

## Interpréter prudemment

Une sortie symétrique reliée à une entrée RCA asymétrique ne devient pas une liaison entièrement symétrique grâce au seul câble. Suis le câblage des fabricants. Le [guide Focusrite](https://support.focusrite.com/hc/en-gb/articles/211615185-Why-is-there-unwanted-hum-noise-in-my-monitors) explique ces effets.

Une platine qui ronfle dans son casque sans liaison externe et un bruit déjà enregistré sont des cas distincts. Dolby ne remplace pas le diagnostic électrique. Après modification, refais un court enregistrement et compare les pauses à gain égal ; le [loopback](../loopback-round-trip/) établit le bruit propre de l'interface.
