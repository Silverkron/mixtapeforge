---
id: "source-formats"
lang: "it"
title: "WAV, FLAC o MP3 per registrare cassette: conta la sorgente?"
description: "Usa la registrazione originale più pulita che possiedi."
primaryKeyword: "WAV, FLAC o MP3 per registrare cassette"
secondaryKeywords: ["la normalizzazione","prova dal computer alla piastra","Come registrare una cassetta dal computer","Normalizzazione, compressione ed EQ"]
searchIntent: "informational"
answer: "Usa la registrazione originale più pulita che possiedi. WAV e FLAC possono conservare l’audio senza perdita; trasformare un MP3 in WAV non ricostruisce ciò che è stato eliminato durante la compressione."
category: "recording"
image: "recording"
updated: "2026-11-01"
sources: [{"title": "Audacity — glossario audio digitale", "url": "https://manual.audacityteam.org/man/glossary.html"}, {"title": "Symphonia — codec e contenitori supportati", "url": "https://github.com/pdeljanov/Symphonia"}]
guideType: "explainer"
related: ["recording-computer", "normalization-compression-eq", "cassette-mixtape"]
prerequisites: []
next: ["recording-computer"]
---

## Cosa importa MixtapeForge

Il selettore desktop attuale elenca **WAV, FLAC, MP3, M4A, AAC, AIFF/AIF, OGG e CAF**. Un contenitore come M4A può ospitare codec diversi: un’estensione ammessa non garantisce ogni variante. Il decoder è Symphonia. I download protetti dei servizi streaming non sono normali file musicali importabili.

1. Conserva gli originali in una cartella stabile. Importa un esempio di ogni formato previsto.
2. Controlla titolo e durata, poi ascolta inizio, parte centrale e fine. Durate errate o silenzi improvvisi vanno verificati prima di preparare un lato.
3. Se l’importazione fallisce, apri una copia in un editor compatibile ed esportala in WAV PCM stereo. Conserva l’originale: rinominare l’estensione non converte il file.
4. In **EQ / Audio**, apri **Formato del master** e scegli una frequenza supportata dall’uscita. Sono disponibili 44,1, 48, 88,2 e 96 kHz. Un valore maggiore non dimostra una migliore cassetta.

## Confronta il suono, non il peso

Un MP3 acquistato e pulito può suonare meglio di una registrazione rovinata in WAV. Pareggia il volume d’ascolto e confronta voce, piatti e finali tranquilli. Valuta [la normalizzazione](../normalization-compression-eq/) prima di preferire semplicemente la versione più forte.

Un formato senza perdita evita un’altra compressione distruttiva, ma non ripara distorsioni esistenti. Quando i file funzionano, passa alla [prova dal computer alla piastra](../recording-computer/).

**Pronto:** file decodificati completamente, metadati corretti, originali conservati, frequenza supportata.
