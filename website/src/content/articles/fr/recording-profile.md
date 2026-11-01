---
id: "recording-profile"
lang: "fr"
title: "Créer et vérifier un profil d’enregistrement dans MixtapeForge"
description: "Enregistrer le test guidé, capturer sa lecture, examiner la correction et mémoriser la combinaison platine/bande."
primaryKeyword: "Créer et vérifier un profil d’enregistrement dans MixtapeForge"
secondaryKeywords: ["les limites de l’EQ","la compatibilité entre platines","Améliorer une cassette avec l’EQ sans aggraver ses limites","Mesurer l’écart gauche/droite avant de le compenser"]
searchIntent: "task"
answer: "Un profil d’enregistrement mémorise une combinaison platine/bande mesurée et applique une correction numérique limitée aux masters suivants. Il aide lorsque la même configuration modifie le son de façon répétable. Il ne sépare pas les défauts d’enregistrement et de lecture et ne rend pas tous les lecteurs identiques."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100 : liste de contrôle des mesures", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "REW : configuration de l’interface audio", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}]
related: ["eq-limits", "channel-balance", "frequency-response"]
guideType: "procedure"
prerequisites: ["without-reference-tape"]
next: ["different-decks", "consistent-copies"]
---

Ce parcours décrit **MixtapeForge prototype 0.1**. L’application de bureau est nécessaire à la lecture et à l’acquisition natives. Prévoyez une cassette sacrifiable, une platine fonctionnelle et une interface avec entrées et sorties ligne stéréo.

## 1. Enregistrer le test de l’application

1. Reliez les sorties L/R de l’interface aux entrées LINE IN de la platine, et LINE OUT L/R aux entrées ligne de l’interface. Désactivez le renvoi de l’entrée vers la sortie.
2. Ouvrez **Étalonnage**, puis **Enregistrer le test**. Choisissez la sortie vers la platine et une fréquence d’échantillonnage de projet acceptée par l’interface. Utilisez **Utiliser la fréquence de l’appareil** si cela convient.
3. Choisissez le bon type de bande sur la platine, désactivez Dolby/NR et dépassez l’amorce transparente. Commencez avec une sortie et un REC LEVEL modérés. Le test atteint **−3 dBFS crête** dans le domaine numérique ; cela ne prédit pas le niveau analogique enregistré.
4. Appuyez sur REC sur la platine, puis **Démarrer le test**. Après **3…2…1**, environ **108 secondes** de signaux sont envoyées. Gardez sortie et REC LEVEL fixes jusqu’au marqueur final. Le test contourne l’EQ, la compression et le NR de la mixtape.
5. Arrêtez la platine, rembobinez avant le début et ouvrez **Capturer la lecture**.

## 2. Acquérir la lecture réelle de la cassette

Sélectionnez l’entrée provenant de la platine et laissez le NR désactivé. Appuyez d’abord sur **Démarrer l’acquisition** dans MixtapeForge, puis PLAY sur la platine. Surveillez les deux indicateurs : si l’acquisition écrête, baissez le gain d’entrée et recommencez le test entier. Ne changez pas le gain au milieu de la prise.

L’application essaie d’arrêter l’acquisition lorsqu’elle reconnaît le marqueur final ; l’arrêt manuel reste disponible. Sauvegardez la prise pour conserver le WAV brut, puis choisissez **Analyser le test**. Vous pouvez aussi importer un WAV contenant toute la séquence de l’application. Un morceau quelconque ou un rapport NAK T-100 ne constitue pas cette séquence.

## 3. Examiner et enregistrer

Lisez les avertissements avant l’EQ et la correction des canaux proposées. Les bandes bruyantes ou instables peuvent rester inchangées. L’analyse représente l’aller-retour complet ; ce n’est pas une mesure certifiée du pleurage/scintillement ou du MOL.

Seul le nom est obligatoire et il est prérempli. Choisissez un nom reconnaissable : **« Pioneer + TDK Type I · essai octobre »**. Les champs facultatifs permettent de noter platine, bande, connexions et positions des commandes. Choisissez **Enregistrer et utiliser le profil**, puis vérifiez **S’applique aux enregistrements et à l’écoute du master**. Lorsqu’une identité de sortie est mémorisée, une autre sortie peut être bloquée jusqu’à sélectionner celle mesurée ou désactiver le profil.

## Vérifier avec de la musique

Enregistrez le même extrait court avec et sans profil, sans toucher aux commandes physiques. Comparez à volume similaire. Exemple hypothétique : une petite correction d’aigus améliore une bande mais rend les cymbales fortes plus rugueuses. Ne la conservez qu’après ce deuxième essai.

Si la séquence n’est pas reconnue, vérifiez que les marqueurs ne sont pas coupés, que la bonne entrée stéréo a été capturée et qu’aucune normalisation ni traitement n’a modifié le fichier. Si les résultats changent fortement entre passages, résolvez l’instabilité avant d’enregistrer une correction.

À vérifier : marqueurs complets, NR désactivé, commandes fixes, acquisition sans écrêtage, avertissements examinés et nouvel essai musical. Revérifiez après changement de formulation, ports ou gains. Lisez [les limites de l’EQ](../eq-limits/) et [la compatibilité entre platines](../different-decks/) avant de distribuer des copies.
