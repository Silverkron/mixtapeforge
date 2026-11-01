---
id: "playback-level"
lang: "it"
title: "Verificare il livello di lettura con un riferimento magnetico noto"
description: "Distingui flussività, tensione d’uscita e letture dei misuratori prima di regolare il livello di riproduzione."
primaryKeyword: "Verificare il livello di lettura con un riferimento magnetico noto"
secondaryKeywords: ["sensibilità di registrazione","confronto tra piastre","Controllare l’azimut senza perdere l’allineamento originale","Taratura delle cassette"]
searchIntent: "evaluation"
answer: "La taratura del livello di lettura collega un segnale magnetico noto sul nastro a una tensione d'uscita o indicazione specificata. È il riferimento su cui si basano i confronti di livello in registrazione. Alzare l'ingresso della scheda fino a vedere zero non tara la piastra."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "MRL: scelta e ambito dei nastri di riferimento", "url": "https://mrltapes.com/pages/product-guide"}, {"title": "NAK T-100: specifiche ufficiali", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "REW: spettro, livelli RMS e distorsione", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/spectrum.html"}]
related: ["azimuth-test", "calibration-basics", "different-decks"]
guideType: "measurement"
prerequisites: ["calibration-tapes"]
next: ["recording-sensitivity"]
---

## Recupera il riferimento esatto

Servono la procedura di servizio, la cassetta prescritta e il voltmetro AC richiesto oppure un analizzatore audio adeguatamente calibrato. Annota **flussività** in nWb/m, frequenza, equalizzazione e tolleranza. Usa tensione attesa, carico e posizioni dei controlli indicati dal manuale: cambiano tra modelli.

Il misuratore digitale in **dBFS** indica la distanza dal fondo scala digitale. Lo 0 VU del deck e la scala in volt dell'analizzatore sono altri riferimenti. NAK T-100 richiede una calibrazione esterna della tensione prima di fornire una lettura assoluta attendibile.

## Confronta senza intervenire internamente

1. Verifica che la cassetta corrisponda alla specifica di servizio. Se non puoi dimostrarlo, limita la prova a un confronto relativo, senza inventare un obiettivo.
2. Collega LINE OUT all'ingresso di misura previsto. Con una scheda usa modalità linea e guadagno fisso, senza effetti né controllo automatico.
3. Imposta uscita, riproduzione e NR come richiesto dal manuale. Lascia margine all'ingresso.
4. Riproduci il tratto di riferimento e attendi una lettura stabile. Misura separatamente sinistra e destra nello stesso intervallo.
5. Annota valore osservato, valore atteso, riferimento e controlli. Ripeti prima di considerare reale una differenza.
6. Se serve regolare, segui il manuale specifico con competenze e strumenti adatti. REC LEVEL agisce su un'altra parte del sistema e non è la correzione appropriata.

## Interpreta una differenza

Esempio ipotetico: il manuale richiede 0,50 V RMS e misuri 0,45 V nelle stesse condizioni. `20 × log10(0,45 / 0,50)` dà circa **−0,92 dB**. Per decidere se è fuori tolleranza servono specifica di servizio e incertezza della misura.

Un riferimento registrato a livello inferiore produce lo stesso apparente errore. Lo possono produrre anche un'uscita variabile, un carico errato o una scala d'ingresso non calibrata. Verifica questi elementi prima di cambiare la piastra.

Controllo finale: nastro corretto, carico e controlli prescritti, tensione calibrata se necessaria, livelli L/R stabili e tolleranza documentata. Dopo aver verificato la lettura, la [sensibilità di registrazione](../recording-sensitivity/) acquista significato; altrimenti il [confronto tra piastre](../different-decks/) mescola incognite diverse.
