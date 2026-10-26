# Confronto delle registrazioni Dolby B — 25 ottobre 2026

## Provenienza e interpretazione

File forniti dall'utente in Downloads: `hardware dolby b.wav` e `software dolby b.wav`.
Interpretazione della descrizione: codifica rispettivamente sulla piastra e nell'app;
decodifica Dolby B della piastra per entrambe. Il messaggio ripete «decodifica»
anche nella prima frase: l'interpretazione resta da confermare se intendeva altro.
Piastra dichiarata: Pioneer CT-W205R. L'utente ha confermato riferimento
dell'encoder a 0 dBFS. Versione dell'app, livelli di registrazione e guadagno di
acquisizione delle prove non documentati; la risposta non conferma che tutti i
guadagni fossero identici tra le due prove.
Nessuna modifica al software o agli originali in questa analisi.

## Metodo

Entrambi PCM signed 16 bit, 44.100 Hz, stereo. Durata hardware 60,433 s,
software 60,149 s. Stesso contenuto musicale riconoscibile tramite correlazione;
offset variabile nel tempo. Correlazioni locali di finestre da 3 s, decimate
tramite media di 7 campioni, per cercare l'allineamento. Una stima locale a 30 s
è un evidente falso aggancio; regressione robusta sulle altre stime indica una
deriva approssimativa di 55 ms/min. Non è una misura certificata della velocità
del trasporto. Nessun null test o misura THD tra questi file è giustificato.

Le misure spettrali usano campioni originali contigui, senza ricampionamento,
inserimenti o interpolazione: finestra Hann 16.384 campioni, sovrapposizione 50%,
media delle potenze FFT sui due canali. Confronto del passaggio comune circa
2–58,15 s, con offset costante centrale stimato; differenze residue di poche
decine di ms ai margini non consentono confronto campione per campione.
Compensazione di livello ricavata dalla potenza integrata 250–1.000 Hz.
Non si tratta della risposta in frequenza dell'encoder isolato: sono spettri di
registrazioni musicali attraverso catene analogiche complete, rumore incluso.

## Livelli

| Misura | Hardware | Software |
| --- | ---: | ---: |
| RMS passaggio comune | −12,93 dBFS | −15,05 dBFS |
| Loudness integrata, file completo (FFmpeg EBU R128) | −9,0 LUFS | −10,8 LUFS |
| LRA, file completo | 13,8 LU | 15,7 LU |
| Picco campionato | 0 dBFS | 0 dBFS |
| True peak FFmpeg, file completo | +0,5 dBTP | +0,4 dBTP |
| Campioni al rail esatto, file completo, somma L/R | 3.969 | 612 |
| Massima sequenza consecutiva al rail per canale | 11 campioni | 5 campioni |

Software circa 2,12 dB sotto come RMS; circa 1,8 LU sotto come loudness.
I campioni ai limiti PCM (+32767/−32768) e le sequenze consecutive indicano
clipping dei WAV. Non identificano il punto della catena che lo ha introdotto
(acquisizione, elaborazione o altro), né permettono di quantificare la
distorsione del solo nastro. LRA e crest factor non provano da soli compressione
dell'encoder: il clipping e i livelli diversi alterano il confronto.

## Spettro medio

Differenza software meno hardware. Seconda colonna: livelli originali.
Terza: compensato lo scarto di −2,31 dB nella banda 250–1.000 Hz.

| Banda | Differenza originale | Differenza compensata |
| --- | ---: | ---: |
| 30–80 Hz | −2,27 dB | +0,05 dB |
| 80–250 Hz | −2,32 dB | −0,01 dB |
| 250–500 Hz | −2,32 dB | 0,00 dB |
| 500–1.000 Hz | −2,31 dB | 0,00 dB |
| 1–2 kHz | −2,09 dB | +0,23 dB |
| 2–4 kHz | −1,50 dB | +0,82 dB |
| 4–8 kHz | −0,75 dB | +1,56 dB |
| 8–12 kHz | +0,36 dB | +2,67 dB |
| 12–16 kHz | +0,75 dB | +3,06 dB |
| 16–20 kHz | +0,30 dB | +2,61 dB |

Sull'intero estratto non emerge una perdita generalizzata di alte del software:
a livello compensato c'è maggiore energia sulle alte. Questa energia può
comprendere fruscio e distorsione; non dimostra maggiore fedeltà o dettaglio.
Non sono presenti silenzi di nastro comparabili sufficienti per una misura
separata affidabile del rapporto segnale/rumore.

## Differenze nel tempo

Ogni sezione compensata sulla propria banda 250–1.000 Hz.

| Sezione | Scarto originale banda di riferimento | 1–2 kHz | 2–4 kHz | 4–8 kHz | 8–12 kHz |
| --- | ---: | ---: | ---: | ---: | ---: |
| 2–20 s | −2,86 dB | −0,95 dB | −0,91 dB | −0,65 dB | −0,39 dB |
| 20–40 s | −2,40 dB | +0,11 dB | +0,79 dB | +1,67 dB | +2,73 dB |
| 40–58 s | −2,18 dB | +0,30 dB | +0,79 dB | +1,48 dB | +2,57 dB |

Il risultato iniziale è compatibile con una lieve chiusura delle medio-alte
percepita dall'utente, ma non persiste nello stesso modo nelle sezioni successive.
La differenza varia con il passaggio musicale: un guadagno costante o una EQ
statica non descrivono tutto il fenomeno. È possibile un diverso tracking della
catena NR; questi due file non distinguono livello di riferimento, encoder,
livello sul nastro, rumore, risposta del nastro o clipping di acquisizione.

## Prova successiva utile

Il riferimento Type B è confermato a 0; restano da documentare le altre impostazioni. Per ripetere la
prova: stesso file sorgente e stessa elaborazione precedente alla codifica,
stessi livelli analogici documentati, nastro e tratto comparabili, decoder B
della piastra in entrambi i riascolti. Ridurre il guadagno di acquisizione della
scheda audio lasciando circa 6 dB di margine sui picchi; non compensare il
volume del flusso codificato arbitrariamente per pareggiare i picchi tra prove.
Una copia della sorgente non codificata e dei master inviati al deck aiuterebbe
a distinguere il contributo del software da quello del percorso analogico.

## Riproducibilità

Script e dati: `test-results/nr/recording-comparison/analyze.py`, `analysis.json`,
`spectra.npz`, `hardware-loudness.txt`, `software-loudness.txt`.
Lo script richiede Python con NumPy e i due WAV originali nei percorsi indicati.
Le loudness sono calcolate separatamente con:

```sh
ffmpeg -hide_banner -nostats -i INPUT.wav -af ebur128=peak=true:framelog=verbose -f null -
```

## Nuovo file hardware attenuato di 2,1 dB

L'utente ha sostituito il WAV hardware con una versione attenuata. La prima
analisi è conservata in `analysis-first-comparison.json`; `analysis.json` ora
descrive il nuovo confronto. Software invariato.

Il nuovo hardware dura 60,335 s (circa 98 ms in meno del precedente), picco
−2,098 dBFS. RMS del passaggio comune: hardware −15,017 dBFS, software
−15,033 dBFS, differenza di soli 0,016 dB. Il pareggiamento RMS è riuscito.
La banda di riferimento 250–1.000 Hz rimane circa 0,22 dB più bassa nel software.

Differenze spettrali originali del nuovo confronto, software meno hardware:
1–2 kHz +0,05 dB; 2–4 kHz +0,60 dB; 4–8 kHz +1,36 dB;
8–12 kHz +2,45 dB; 12–16 kHz +2,84 dB. Rimane la dipendenza dal passaggio:
nei primi 2–20 s, compensando separatamente la banda di riferimento della
sezione, medio-alte software ancora circa 0,6–0,9 dB inferiori.

L'attenuazione non ricostruisce i picchi già troncati nella prima acquisizione.
L'assenza di campioni a 0 dBFS nel nuovo file non prova assenza di clipping
precedente: le forme troncate possono semplicemente essere state abbassate.
