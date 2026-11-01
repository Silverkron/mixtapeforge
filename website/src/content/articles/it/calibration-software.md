---
id: "calibration-software"
lang: "it"
title: "Scegliere il software per la prova che serve davvero"
description: "Confronta Audacity, REW, NAK T-100, Stereo Tool e MixtapeForge secondo attività, preparazione e limiti."
primaryKeyword: "Scegliere il software per la prova che serve davvero"
secondaryKeywords: ["prova con Audacity","guida NAK T-100","esercizio Stereo Tool","sequenza guidata"]
searchIntent: "informational"
answer: "Parti da una domanda, non da un elenco di strumenti. Acquisire il nastro, controllare la stabilità d'intonazione e salvare un profilo correttivo richiedono funzioni diverse. Uno spettro colorato non è automaticamente una misura calibrata."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: analisi dello spettro", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "REW: configurazione dell’interfaccia audio", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}, {"title": "REW: spettro, livelli RMS e distorsione", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/spectrum.html"}, {"title": "NAK T-100: specifiche ufficiali", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "FLUX Stereo Tool: prodotto e compatibilità", "url": "https://www.flux.audio/project/stereo-tool-freeware/"}]
related: ["flux-stereo-tool", "recording-profile", "wow-flutter"]
guideType: "explainer"
prerequisites: ["calibration-basics"]
next: ["without-reference-tape", "nak-t100-practical-guide"]
---

## Scegli secondo l'attività

| Attività | Punto di partenza | Cosa serve ancora |
| --- | --- | --- |
| Acquisire e confrontare toni | Audacity | Ingresso stereo di linea e file ripetibile |
| Esaminare livello, spettro e distorsione | REW | Ingresso corretto e parametri dichiarati |
| Velocità e wow/flutter | NAK T-100 | Cassetta indipendente e rivelatore coerente |
| Bilanciamento e polarità | FLUX:: Stereo Tool in un host compatibile | Riferimento mono e interfaccia nativa del plugin |
| Compensazione per future mixtape | Calibrazione di MixtapeForge | La sua sequenza completa registrata e riacquisita |

Audacity e REW offrono versioni desktop per Windows, macOS e Linux. NAK T-100 è distribuito attraverso gli store Windows e macOS. Verifica requisiti attuali di FLUX e formato del plugin rispetto all'host: la parola VST non garantisce che ogni combinazione funzioni.

## Rendi utile la prima sessione

1. Scegli una sola domanda, per esempio se sinistra e destra ritornano allo stesso livello.
2. Seleziona ingressi e uscite fisici di linea. Allinea frequenze supportate e disattiva guadagno automatico, EQ e monitoraggio che genera ritorno.
3. Parti da un tono moderato noto, non dalla musica. Verifica i due canali e il margine d'ingresso.
4. Conserva originale, ritorno, versione del software e impostazioni. Ripeti prima di interpretare piccole differenze.
5. Aggiungi un altro programma soltanto se risponde a una domanda che il primo non risolve.

La [prova con Audacity](../without-reference-tape/) insegna un'acquisizione riproducibile. La [guida NAK T-100](../nak-t100-practical-guide/) introduce misure dedicate. L'[esercizio Stereo Tool](../flux-stereo-tool/) spiega un grafico stereo con un riferimento conosciuto, evitando di indovinare dalla musica.

## Distingui analisi e compensazione

Esempio ipotetico: un analizzatore trova 2 dB di alte in meno. Non ha ancora dimostrato che aumentarle di 2 dB sia sicuro, né se la perdita appartenga all'incisione o alla lettura. Serve una nuova prova registrata.

MixtapeForge 0.1 non importa automaticamente curve REW o misure NAK nei profili. Usa la sua [sequenza guidata](../recording-profile/). I parametri VST3 generici non riproducono inoltre l'oscilloscopio nativo di un plugin esterno.

Scegli la configurazione minima che offre una risposta ripetibile. Per velocità assoluta, livello di lettura o allineamento, nessun software sostituisce la cassetta fisica di riferimento richiesta.
