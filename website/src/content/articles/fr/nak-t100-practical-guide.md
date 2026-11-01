---
id: "nak-t100-practical-guide"
lang: "fr"
title: "NAK T-100 : guide pratique pour mesurer votre platine cassette"
description: "Configurer le trajet, réaliser une première mesure répétable et choisir les tests adaptés aux références disponibles."
primaryKeyword: "NAK T-100"
secondaryKeywords: ["cassette de référence adaptée","le contrôle du niveau de lecture","le test de réponse par tonalités séparées","parcours des profils d’enregistrement"]
searchIntent: "task"
answer: "NAK T-100 est un analyseur audio autonome, pas un lecteur de cassettes ni un système de réglage automatique de platine. Consacrez cette première séance à une question précise : la même configuration produit-elle un niveau et un équilibre tonal stables sur plusieurs enregistrements ?"
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100 : présentation et caractéristiques officielles", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "NAK T-100 : liste de contrôle des mesures", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "NAK T-100 : questions fréquentes officielles", "url": "https://www.anaxwaves.com/NAKT100/T100FAQ/index.html"}, {"title": "NAK T-100 : description du développeur et versions", "url": "https://apps.apple.com/us/app/nak-t-100-audio-analyzer/id1533153639?mt=12"}]
related: ["calibration-basics", "speed-test", "wow-flutter", "recording-profile"]
guideType: "procedure"
prerequisites: ["without-reference-tape"]
next: ["frequency-response", "wow-flutter"]
---

## Définissez ce que vous voulez apprendre

La procédure ci-dessous est une méthode de mesure originale fondée sur la documentation du développeur, et non le compte rendu d’essais matériels réalisés pour cet article. Lisez l’aide fournie avec votre version ainsi que le manuel de la platine. La liste de contrôle en lien sert de rappel aux utilisateurs expérimentés et ne remplace aucun de ces manuels.

## Matériel à préparer

Prévoyez NAK T-100, une interface à entrées et sorties ligne stéréo, les câbles adaptés et une cassette sacrifiable pour les essais d’enregistrement. Pour contrôler indépendamment vitesse ou alignement, ajoutez la [cassette de référence adaptée](../calibration-tapes/). Une trois-têtes peut restituer le signal venant d’être enregistré ; une deux-têtes doit enregistrer, rembobiner puis lire.

Une **référence relative** est simplement une lecture conservée comme point de comparaison. Elle devient utile si elle se reproduit avec les mêmes commandes ; ce n’est pas automatiquement une référence magnétique ou électrique étalonnée.

## Installez le logiciel et définissez le trajet audio

Suivez les liens officiels vers les boutiques de votre système d’exploitation. La FAQ décrit des licences perpétuelles payantes pour Windows et macOS, achetées séparément ; vérifiez la disponibilité actuelle dans la boutique concernée. Aucune version Linux native n’est proposée.

Pour les essais d’enregistrement, reliez **sortie de l’interface → LINE IN de la platine** et **LINE OUT de la platine → entrée ligne de l’interface**. Sélectionnez la paire stéréo voulue aux deux extrémités. Au besoin, utilisez les fonctions d’affectation des canaux de votre version ou le logiciel de routage de l’interface. N’utilisez pas un trajet exclusivement micro avec gain automatique.

Choisissez une fréquence d’échantillonnage commune prise en charge en entrée et en sortie. Si possible, utilisez 48 ou 96 kHz pour examiner le haut de la bande audio ; une valeur supérieure ne compense pas un mauvais trajet analogique. Désactivez les améliorations, l’EQ, le contrôle automatique du niveau et tout retour involontaire de l’entrée vers la sortie. Gardez les signaux de test à faible volume dans les enceintes ou le casque.

## Établissez les niveaux avant de chercher des défauts

Commencez avec la réduction de bruit désactivée et le bon réglage de type de bande. Photographiez les commandes et notez les gains de l’interface. Utilisez le contrôle de la source de la platine s’il est disponible : il permet de vérifier le trajet électrique avant d’ajouter la bande. Il ne prouve pas que le trajet sur bande est étalonné.

En mode **Basic**, repérez **Function**, **OSC** et l’affichage du niveau. Commencez avec **Level** et une référence stable à **400 Hz**, à faible niveau de sortie. Augmentez progressivement jusqu’à une indication raisonnable préconisée pour votre platine, en vérifiant que l’entrée de l’interface n’écrête pas. Ne copiez pas la position des boutons d’un autre appareil et ne supposez pas que tous les zéros des instruments représentent la même chose.

En particulier, la référence de tension étalonnée de NAK T-100, le repère 0 VU de la platine et le 0 dBFS sont des références différentes. Son échelle de tension exige un étalonnage externe en tension avant de pouvoir servir de voltmètre absolu. Pour cette première séance, une référence relative bien documentée suffit ; consultez [le contrôle du niveau de lecture](../playback-level/) pour une référence absolue.

## Vérifiez séparément l’interface si nécessaire

Si vous pouvez relier temporairement la sortie de l’interface directement à son entrée ligne, mesurez d’abord cette **boucle de retour (loopback)**. Commencez avec une sortie réduite et une entrée ligne capable de l’accepter. Vous identifiez ainsi les limites de cette paire d’entrée et de sortie avant d’inclure la platine. Si vous conservez le câblage existant, notez qu’aucune référence indépendante de l’interface n’a été mesurée.

La procédure facultative **Sound Card FR Compensation** est documentée comme une compensation de l’affichage. Elle n’envoie aucune EQ corrective à la platine, n’établit pas d’étalonnage absolu en tension et ne devient pas un profil d’enregistrement sur cassette. Vérifiez-la à nouveau après avoir changé les ports, la fréquence d’échantillonnage ou la configuration des gains auxquels elle se rapporte.

## Première séance, dans l’ordre

1. Sélectionnez les entrées et sorties stéréo physiques et la même fréquence dans le système ou le panneau de l’interface. Commencez avec une sortie faible.
2. Choisissez le bon type de bande et désactivez le NR. Dans Basic, sélectionnez Function **Level** et OSC **400 Hz**.
3. En surveillant le niveau source/entrée de la platine, augmentez progressivement jusqu’à une référence modérée. Notez cette indication et gardez l’acquisition sous l’écrêtage. Le zéro de l’analyseur n’est pas nécessairement celui de la platine.
4. Dépassez l’amorce, appuyez sur REC et enregistrez environ dix secondes. Gardez tous les gains fixes.
5. Sur une platine à deux têtes, arrêtez, rembobinez et appuyez sur PLAY. Sur une trois-têtes, choisissez le contrôle Tape. Lisez le milieu stable et notez L/R.
6. Répétez sans modifier les commandes. Si les lectures dérivent sensiblement, examinez bande, connexions et acquisition avant de passer à la réponse en fréquence.

Comparez le milieu stable du passage, pas le début ou la fin. Notez les indications gauche et droite, répétez une fois sans changer les commandes et réécoutez. Un résultat fluctuant demande une recherche avant toute correction. La mesure du retour combine les erreurs de l’interface, de l’enregistrement et de la lecture ; à elle seule, elle n’identifie pas l’étage responsable de l’écart.

## Explorez la réponse en fréquence à niveau contrôlé

Ouvrez **Scope** et repérez les commandes de réponse en fréquence. Pour une première comparaison, utilisez **FR White** ou **FR Sweep** avec un niveau d’enregistrement volontairement réduit, en vérifiant le niveau réel sur la platine. L’indication **−20 dB** n’a de sens que si sa référence est documentée. Un sélecteur de gamme de mesure ne réduit pas nécessairement le signal généré.

Enregistrez un passage complet, puis répétez dans les mêmes conditions. **FR Sweep est documenté comme asynchrone** : sur une platine à deux têtes, enregistrez le test, arrêtez, rembobinez et lisez-le à travers l’analyseur avec la mesure FR correspondante sélectionnée. Consultez l’aide intégrée pour les détails d’acquisition ; ne supposez pas l’existence d’une commande externe de synchronisation du balayage.

Évaluez les écarts stables entre canaux et les tendances générales avant les petites ondulations. Un deuxième essai à niveau plus élevé peut révéler la saturation des aigus, mais répond à une autre question. Gardez sa trace séparée au lieu de fusionner les résultats dans une seule courbe de réponse. Sans cassette de référence pour la lecture, le résultat décrit toute la chaîne d’enregistrement et de lecture.

Pour une alternative reproductible avec construction des tonalités et analyse détaillées, suivez [le test de réponse par tonalités séparées](../frequency-response/). Les commandes d’acquisition FR Sweep dépendent de l’aide de votre version ; cette section explique leur rôle sans remplacer ce parcours complet.

## Ajoutez vitesse et pleurage/scintillement avec la bonne référence

Pour vérifier indépendamment la vitesse de lecture, utilisez une **cassette de référence fiable à 3000 Hz ou 3150 Hz**, sélectionnez **Speed Wow/Flutter** et réglez **Speed Cal.** selon cette cassette. Un signal enregistré sur la même machine ne permet pas d’établir sa vitesse absolue de lecture.

À titre d’exemple de calcul, une référence de 3000 Hz mesurée à 3015 Hz correspond à environ **+0,5 %** : `(3015 / 3000 − 1) × 100`. Ces chiffres sont illustratifs et ne proviennent pas de la mesure d’une platine.

Notez le détecteur et la pondération du pleurage/scintillement avec chaque valeur. **Q-PK** et **WRMS** correspondent à des conventions de mesure différentes et ne sont pas des chiffres interchangeables. Les essais enregistrés sur la platine elle-même peuvent vérifier la répétabilité, mais incluent les contributions du transport à l’enregistrement et à la lecture. Un pic isolé peut aussi provenir d’un dropout ou d’un problème de capture informatique ; répétez le passage avant de diagnostiquer la mécanique.

## Rendez comparables les mesures de distorsion et de bruit

Pour la distorsion, examinez la fonction documentée **T.H.Dist.** avec une fondamentale connue et un niveau d’enregistrement fixe. Identifiez séparément **THD+N** et **HD3** : ces mesures ne sont pas équivalentes. Si l’indication augmente, vérifiez que l’interface et l’entrée de la platine ne sont pas en surcharge avant de mettre la bande en cause.

Pour le bruit, sélectionnez **Noise-A (−40 dB)** et mesurez un silence enregistré en vérifiant qu’aucun ton de test ne parvient à la bande. Utilisez le contrôle Tape pendant l’enregistrement sur une platine à trois têtes ; sur une deux-têtes, enregistrez le silence puis relisez-le. Conservez les mêmes gains. Selon la convention de la checklist liée, soustrayez **40 dB** à la lecture de l’échelle dB, puis **20 dB** supplémentaires si Meter Range est réglé sur **−20 dB/0.1%**. Confirmez ces corrections dans l’aide de votre version avant de publier une valeur. Notez référence et pondération : le niveau de bruit corrigé ne constitue pas encore un rapport S/N positif. Exemple relatif hypothétique : une référence à 0 dBr et un bruit corrigé à −55 dBr donnent 55 dB d’écart selon les mêmes conventions, pas une spécification universelle de la platine.

## Conservez des éléments utiles pour la prochaine séance

Si vous enregistrez séparément le retour avec un logiciel audio, conservez ce fichier stéréo sans traitement. Gardez ensemble captures d’écran, version du logiciel, identité de la bande et réglages. Accompagnez chaque valeur de son niveau et de sa méthode : « 0,08 % » sans détecteur ou « plate jusqu’à 18 kHz » sans niveau d’enregistrement sont des indications incomplètes.

Ne tournez pas les vis des têtes, les réglages de polarisation ou les ajustables internes simplement pour redresser un graphique. L’alignement interne suit la procédure de maintenance du modèle et nécessite du matériel de référence adapté. NAK T-100 mesure ; il ne règle pas physiquement la platine.

Le [parcours des profils d’enregistrement](../recording-profile/) de MixtapeForge est distinct. Aucune importation automatique des mesures de NAK T-100 dans ses profils n’est documentée. Utilisez le test guidé de MixtapeForge pour créer un profil réutilisable dans l’application, et les observations de l’analyseur pour comprendre la chaîne, sans promettre une correction automatique pour tous les lecteurs.

## Si le premier essai échoue

| Symptôme | Vérification | Action suivante |
| --- | --- | --- |
| Aucun indicateur d’entrée | Véritable LINE IN et paire stéréo correspondant aux câbles | Corriger le routage avant d’augmenter le gain |
| Tonalité nette mais onde écrêtée | Mode ligne et plage d’entrée de l’interface | Réduire le gain d’acquisition et refaire la référence |
| Aigus variables entre passages | Contact de bande, section et interruptions d’acquisition | Répéter sur une autre cassette saine avant d’égaliser |
| Valeur de vitesse invraisemblable | Fréquence de la cassette et Speed Cal. | Assortir les références 3000/3150 Hz ; voir [le contrôle de vitesse](../speed-test/) |

Avant de conserver les résultats : noter les ports, gains, fréquence, type de bande, réglage NR et convention de chaque mesure ; répéter le passage ; conserver les captures originales. Aucun essai matériel n’a été réalisé pour cet article.
