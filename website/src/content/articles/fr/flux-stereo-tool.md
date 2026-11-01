---
id: "flux-stereo-tool"
lang: "fr"
title: "FLUX Stereo Tool : vérifier la stéréo avant une cassette"
description: "Utiliser une référence mono, un extrait musical et une capture de bande pour examiner les canaux sans traiter à l’aveugle."
primaryKeyword: "FLUX Stereo Tool"
secondaryKeywords: ["la différence entre phase et polarité","la mesure d’équilibre des canaux","les contrôles du canal faible","Vérifier polarité et retard stéréo avec un signal mono connu"]
searchIntent: "task"
answer: "Ce guide concerne FLUX Stereo Tool, distinct des processeurs de diffusion portant un nom semblable. Freeware indique son prix, pas une autorisation de le redistribuer dans une autre application."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "FLUX Stereo Tool : page officielle du freeware", "url": "https://www.flux.audio/project/stereo-tool-freeware/"}, {"title": "Stereo Tool : manuel officiel", "url": "https://doc.flux.audio/stereotool/"}, {"title": "FLUX Center : téléchargements officiels", "url": "https://www.flux.audio/download/"}, {"title": "FLUX : exigences système des plugins", "url": "https://www.flux.audio/plugin-specifications/"}, {"title": "REAPER 7 : périphériques, pistes, effets, écoute mono et export", "url": "https://dlx.reaper.fm/userguide/html/"}]
related: ["phase-polarity", "channel-balance", "quiet-channel"]
guideType: "procedure"
prerequisites: ["channel-balance"]
next: ["phase-polarity", "recording-profile"]
---

## Obtenir le plugin et choisir son hôte

FLUX Stereo Tool réunit gain, panoramique, polarité et largeur stéréo, avec vecteurscope, crêtes et corrélation. Pour préparer une cassette, ces indications aident à examiner le signal avant l’enregistrement.

Partez du site officiel et suivez le téléchargement via FLUX Center pour Windows ou macOS. FLUX indique que ce freeware ne demande ni dongle ni activation de licence. Vérifiez système et format proposés avant l’installation : ne supposez pas qu’une version VST3 ou Linux existe. Choisissez une station audio ou un hôte compatible capable d’afficher l’éditeur natif.

## Exemple concret d’hôte : REAPER

Voici les noms des menus anglais du guide REAPER 7. Ce parcours est fondé sur la documentation ; aucune installation ni vérification matérielle de ce plugin n’est revendiquée ici.

1. Dans **Options > Preferences > Audio > Device**, choisissez l’interface et la sortie stéréo souhaitée. Créez une piste avec **Track > Insert new track**. Depuis Media Explorer, importez le WAV de référence avec **Insert into project**, sans étirement ni normalisation.
2. Ouvrez **View > FX Browser**, cherchez FLUX Stereo Tool et faites-le glisser sur le panneau de piste. Ouvrez la fenêtre FX de la piste et sélectionnez le plugin pour afficher son éditeur. Gardez le panoramique centré et les autres effets désactivés.
3. Affichez **View > Master Track**. Son bouton **Mono/Stereo** permet d’écouter la somme pendant l’exercice ci-dessous ; rétablissez ensuite la stéréo. Laissez la platine hors REC pendant l’apprentissage.
4. Pour conserver une correction volontaire, mettez cette piste en solo et choisissez **File > Render**. Exportez un WAV stéréo à la fréquence du projet, sans normalisation et sous un nouveau nom. Vérifiez canaux et crêtes avant l’import dans MixtapeForge. Sauvegardez aussi le projet REAPER pour retrouver les réglages.

## Retrouver un réglage neutre

Placez le plugin sur un trajet stéréo de contrôle, puis réinitialisez ses réglages. Vérifiez les gains à 0 dB, les polarités normales, la largeur par défaut et les panoramiques initiaux : gauche doit rester à gauche et droite à droite. Désactivez les autres traitements.

Baissez le volume d’écoute et laissez la platine hors enregistrement. Ce contrôle logiciel ne nécessite ni REC ni réduction de bruit. Notez le point d’écoute et de mesure pour comparer ensuite le même trajet.

## Construire une référence vocale mono

Enregistrez votre voix pendant une vingtaine de secondes. Copiez exactement cet enregistrement dans les deux canaux, au même niveau et sans décalage. Deux prises distinctes ne conviennent pas. Écoutez doucement le passage parlé et alternez traitement actif et bypass.

La voix doit paraître centrale et la corrélation approcher +1 pendant les paroles. Écartez les silences de l’interprétation. Sinon, vérifiez d’abord routage, niveaux et retards. Cette référence permet de séparer un problème du trajet d’une différence volontaire dans un morceau.

## Reconnaître une inversion de polarité

Le **goniomètre**, ou vecteurscope, dessine la relation entre les canaux gauche et droit. La **corrélation** résume leur ressemblance : +1 pour deux signaux identiques, −1 pour leurs opposés exacts. Ce sont des repères pour la référence de test, pas des objectifs pour toute musique stéréo.

Sur cette copie de contrôle uniquement, inversez temporairement la polarité d’un canal. Avec deux signaux identiques, la corrélation tend vers −1 et leur somme mono peut presque disparaître. Rétablissez immédiatement la polarité normale, puis vérifiez le retour de la voix au centre.

Consultez [la différence entre phase et polarité](../phase-polarity/) pour interpréter le phénomène. Cette manipulation sert à apprendre un symptôme. Inverser la polarité retourne le signe de l’onde ; un déphasage dépendant de la fréquence relève d’un autre phénomène. Ne retournez pas un canal musical pour embellir le graphique : une relation stéréo intentionnelle peut donner une lecture moins simple.

## Corriger un écart de niveau établi

Suivez [la mesure d’équilibre des canaux](../channel-balance/) pour quantifier l’écart. Pour examiner une chaîne réelle, utilisez un signal stable et identique à l’origine dans les deux canaux. Comparez le même passage capturé et répétez la mesure. Si un côté reste plus fort, atténuez légèrement ce canal. Une réduction de −0,5 dB illustre un petit ajustement ; ce n’est pas une prescription.

Réécoutez et vérifiez les crêtes après chaque changement. Un écart fluctuant ou variable selon la fréquence demande une recherche de cause. N’égalisez pas automatiquement les canaux d’un morceau : leur contenu peut être volontairement différent.

## Évaluer la largeur sur la musique

Passez ensuite à un morceau familier. Commencez par la largeur neutre, puis essayez des changements modestes. Alternez stéréo, somme mono et bypass à volume perçu comparable. Écoutez voix, basse et réverbérations : une scène plus ample perd son intérêt si des éléments disparaissent en mono.

Une corrélation de +1 n’est pas la cible d’un enregistrement stéréo normal. Jugez la cohérence sonore et la tenue en mono, sans chercher à immobiliser l’indicateur.

## Conserver les réglages et préparer la cassette

Une capture cumule les erreurs d’enregistrement, de lecture et d’interface : un équilibrage utile sur ce trajet ne garantit pas une amélioration sur une autre platine. Le plugin ne répare ni azimut, ni pleurage, ni défaut mécanique. Pour traiter une capture de bande, gardez l’original et exportez un WAV propre avec les seules corrections choisies.

Importez éventuellement ce WAV dans MixtapeForge en évitant de répéter les effets. L’application accueille des VST3 avec paramètres génériques, sans éditeur natif : cette méthode ne confirme donc pas une intégration directe de Stereo Tool. Sauvegardez le preset dans l’hôte et notez gains, référence et position dans la chaîne pour reproduire votre contrôle.

## Problèmes courants et vérification finale

Si le plugin n’apparaît pas, vérifiez format installé, architecture du processeur et résultat de l’analyse des plugins selon les exigences actuelles de FLUX. Si un seul indicateur bouge, examinez piste et routage avant d’amplifier. Si la somme mono annule la référence volontairement inversée, la démonstration a fonctionné : rétablissez la polarité avant la musique.

Un canal constamment faible peut avoir plusieurs causes : suivez [les contrôles du canal faible](../quiet-channel/) plutôt qu’une correction extrême. Avant export, vérifiez largeur neutre ou volontaire, commutateurs de démonstration rétablis, sortie sans écrêtage et nom explicite du fichier. L’intégration dans l’hôte MixtapeForge nécessite encore un véritable essai du plugin.
