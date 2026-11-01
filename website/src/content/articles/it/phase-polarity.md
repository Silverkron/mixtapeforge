---
id: "phase-polarity"
lang: "it"
title: "Controllare polarità e ritardo stereo con un segnale mono noto"
description: "Capisci perché un’inversione può correggere un errore di collegamento ma non ogni problema di fase o allineamento."
primaryKeyword: "Controllare polarità e ritardo stereo con un segnale mono noto"
secondaryKeywords: ["azimut","diagnostica dedicata","guida Stereo Tool","Controllare l’azimut senza perdere l’allineamento originale"]
searchIntent: "evaluation"
answer: "L'inversione di polarità cambia il segno della forma d'onda: positivo diventa negativo. Un ritardo la sposta nel tempo e produce angoli di fase diversi alle varie frequenze. Invertire la polarità non annulla quindi un ritardo in generale."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "FLUX Stereo Tool: manuale", "url": "https://doc.flux.audio/stereotool/"}, {"title": "FLUX Stereo Tool: prodotto e compatibilità", "url": "https://www.flux.audio/project/stereo-tool-freeware/"}, {"title": "Audacity: separare le tracce stereo", "url": "https://manual.audacityteam.org/man/splitting_and_joining_stereo_tracks.html"}]
related: ["azimuth-test", "quiet-channel", "different-decks"]
guideType: "measurement"
prerequisites: ["channel-balance"]
next: ["flux-stereo-tool"]
---

Due canali identici ma di polarità opposta possono far scomparire una voce quando vengono sommati in mono. Anche effetti stereo intenzionali mostrano correlazione negativa: inizia da un riferimento conosciuto.

## Strumenti e riferimento

Usa un host compatibile con l'editor di FLUX:: Stereo Tool, oppure un oscilloscopio stereo e ascolto mono. Registra una breve voce mono e invia gli stessi campioni a L/R con guadagno uguale, senza effetti. Per il nastro acquisisci LINE OUT negli ingressi stereo di linea, con guadagni fissi e NR coerente con la registrazione.

## Impara prima il comportamento corretto

1. Riproduci il riferimento in Stereo Tool con guadagni a 0 dB, inversioni spente, instradamento e larghezza neutri.
2. Osserva il mono centrale: canali identici dovrebbero correlare vicino a +1. Altrimenti controlla l'host prima della piastra.
3. Inverti temporaneamente un solo canale con il controllo di polarità del plugin. Il grafico deve indicare opposizione e la somma mono nell'host deve ridurre fortemente la voce. Ascolta piano.
4. Ripristina subito il comando. L'errore introdotto volontariamente mostra come appare una vera inversione relativa.
5. Registra e acquisisci il riferimento attraverso la piastra, poi confronta il ritorno originale con le stesse impostazioni neutre. Conserva il riferimento digitale.
6. Se il ritorno assomiglia stabilmente alla dimostrazione d'inversione, verifica cavi e instradamento. Prova una correzione su una copia soltanto dopo aver confermato il problema; conserva l'acquisizione intatta.

## Risultati intermedi

Esempio ipotetico: il riferimento originale è centrale, ma il ritorno forma un'ellisse che varia con la frequenza. Non basta per giustificare un'inversione. Ritardo, [azimut](../azimuth-test/) e risposta dei canali influenzano tutti il disegno.

+1 è atteso per mono identico, non per qualsiasi brano stereo. Letture musicali brevemente negative invitano a verificare l'ascolto mono, non provano un cablaggio errato.

## Se la prova confonde

Un canale assente richiede la [diagnostica dedicata](../quiet-channel/). Un guadagno diverso inclina l'immagine e va misurato separatamente. Se bypassando altri plugin il mono torna corretto, indaga quelli prima del deck.

Controllo finale: riferimento identico, neutralità, inversione dimostrativa ripristinata, originale conservato e fase dipendente dalla frequenza distinta dalla polarità. La [guida Stereo Tool](../flux-stereo-tool/) approfondisce il flusso nell'host; i parametri generici di MixtapeForge non forniscono il display nativo del plugin.
