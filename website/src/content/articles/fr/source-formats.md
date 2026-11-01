---
id: "source-formats"
lang: "fr"
title: "WAV, FLAC ou MP3 pour enregistrer une cassette : la source compte-t-elle ?"
description: "Utilisez la meilleure source réelle dont vous disposez."
primaryKeyword: "WAV, FLAC ou MP3 pour enregistrer une cassette"
secondaryKeywords: ["la normalisation","l’essai ordinateur-platine","Comment enregistrer une cassette depuis un ordinateur","Normalisation, compression et EQ"]
searchIntent: "informational"
answer: "Utilisez la meilleure source réelle dont vous disposez. WAV et FLAC peuvent préserver l’audio sans perte ; convertir un MP3 en WAV ne restitue pas les informations supprimées lors de sa création."
category: "recording"
image: "recording"
updated: "2026-11-01"
sources: [{"title": "Audacity — glossaire audio numérique", "url": "https://manual.audacityteam.org/man/glossary.html"}, {"title": "Symphonia — codecs et conteneurs pris en charge", "url": "https://github.com/pdeljanov/Symphonia"}]
guideType: "explainer"
related: ["recording-computer", "normalization-compression-eq", "cassette-mixtape"]
prerequisites: []
next: ["recording-computer"]
---

## Formats acceptés par MixtapeForge

Le sélecteur actuel de l’application desktop propose **WAV, FLAC, MP3, M4A, AAC, AIFF/AIF, OGG et CAF**. Un conteneur tel que M4A peut contenir différents codecs : l’extension seule ne garantit pas le décodage. L’application utilise Symphonia. Les téléchargements protégés des services de streaming ne sont pas des fichiers audio ordinaires importables.

1. Conservez les originaux dans un dossier stable. Importez un exemple de chaque format prévu.
2. Vérifiez titre et durée, puis écoutez début, milieu et fin. Résolvez les durées erronées ou silences soudains avant de préparer une face.
3. En cas d’échec, ouvrez une copie dans un éditeur compatible et exportez en WAV PCM stéréo. Gardez l’original ; changer l’extension ne convertit rien.
4. Dans **EQ / Audio**, ouvrez les réglages du format du master et choisissez une fréquence acceptée par la sortie : 44,1, 48, 88,2 ou 96 kHz. Une valeur supérieure ne garantit pas une meilleure cassette.

## Comparez le son

Un MP3 acheté et propre peut surpasser une prise endommagée en WAV. Égalisez le volume d’écoute puis comparez voix, cymbales et fins calmes. Consultez [la normalisation](../normalization-compression-eq/) avant de préférer simplement le plus fort.

Un fichier de travail sans perte évite un nouvel encodage destructif sans réparer une distorsion existante. Poursuivez avec [l’essai ordinateur-platine](../recording-computer/).

**Prêt :** décodage complet, métadonnées vérifiées, originaux conservés, fréquence acceptée.
