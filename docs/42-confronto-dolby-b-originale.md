# Confronto con il file originale — 25 ottobre 2026

## Campioni

L'utente ha fornito `original.wav` dopo le due acquisizioni già analizzate in
`41-confronto-registrazioni-dolby-b.md`. Si usa il nuovo hardware attenuato di
2,1 dB e il software invariato, con riferimento Type B confermato a 0 dBFS.
Codifica hardware/software, decodifica sulla piastra per entrambi secondo
l'interpretazione della descrizione. Guadagni analogici tra le prove non
confermati. Nessuna modifica al prodotto né ai WAV.

Tutti i file: PCM 16 bit, 44.100 Hz, stereo. Originale 60,051 s,
RMS −19,436 dBFS, picco −3,725 dBFS; nessun campione al limite digitale.
I livelli acquisiti non possono essere confrontati direttamente col livello
digitale della sorgente senza rimuovere il guadagno della catena analogica.

## Metodo e limiti

Script riproducibile `test-results/nr/recording-comparison/compare_original.py`:
SHA-256 dei file in `original-comparison.json`, spettri in `original-spectra.npz`.
Richiede NumPy. Ricerca di corrispondenze locali su finestre di 400 ms, medie
di 7 campioni per la sola correlazione. Regressione robusta sulle corrispondenze
con correlazione >0,6 e scarto temporale <15 ms dal modello iniziale.
Si rilevano offset e deriva, non una sincronia campione per campione.

Per gli spettri si selezionano intervalli musicali corrispondenti usando il
modello temporale, mantenendo campioni originali contigui. Nessun ricampionamento
o interpolazione. FFT 16.384, Hann, sovrapposizione 50%, potenze mediate su
finestre e canali. Il confronto principale copre circa 2–58 s dell'originale;
analisi separate di 2–20, 20–40 e 40–58 s.

Ogni registrazione viene compensata analiticamente sulla potenza 250–1.000 Hz
dell'originale nello stesso intervallo. Non si normalizzano i picchi né si
altera alcun file. Il risultato è una differenza di spettro musicale medio,
non una funzione di trasferimento o una curva di taratura Dolby certificata.
Sono incluse risposta del nastro/deck, livello di registrazione, rumore,
conversione e possibili distorsioni. Nessuna prova senza NR né silenzio di
nastro comparabile sufficiente: non si misura l'effettivo vantaggio di SNR.

## Spettro medio rispetto all'originale

Valori dopo compensazione 250–1.000 Hz; negativi = meno energia della sorgente.

| Banda | Hardware | Software |
| --- | ---: | ---: |
| 30–80 Hz | −0,98 dB | −0,91 dB |
| 80–250 Hz | +0,19 dB | +0,28 dB |
| 250–500 Hz | +0,09 dB | +0,09 dB |
| 500–1.000 Hz | −0,10 dB | −0,10 dB |
| 1–2 kHz | −0,44 dB | −0,19 dB |
| 2–4 kHz | −1,12 dB | −0,27 dB |
| 4–8 kHz | −2,35 dB | −0,72 dB |
| 8–12 kHz | −4,75 dB | −2,05 dB |
| 12–16 kHz | −6,45 dB | −3,39 dB |
| 16–20 kHz | −14,38 dB | −11,81 dB |

Sull'estratto completo, lo spettro software è più vicino all'originale nelle
bande 2–16 kHz. La maggiore energia rispetto all'hardware non è quindi soltanto
un aumento oltre lo spettro della sorgente: entrambe le acquisizioni rimangono
attenuate in quelle bande. Questo non separa contributo musicale e rumore e non
prova maggiore fedeltà complessiva o conformità dell'encoder.

## Variazione nei passaggi

Ogni sezione compensata sul proprio riferimento 250–1.000 Hz.

| Passaggio | Banda | Hardware | Software |
| --- | --- | ---: | ---: |
| 2–20 s | 1–2 kHz | −0,76 dB | −1,69 dB |
| 2–20 s | 2–4 kHz | −1,90 dB | −2,79 dB |
| 2–20 s | 4–8 kHz | −3,28 dB | −3,91 dB |
| 2–20 s | 8–12 kHz | −4,27 dB | −4,64 dB |
| 20–40 s | 2–4 kHz | −1,13 dB | −0,31 dB |
| 20–40 s | 4–8 kHz | −2,41 dB | −0,74 dB |
| 20–40 s | 8–12 kHz | −4,73 dB | −2,00 dB |
| 40–58 s | 2–4 kHz | −1,09 dB | −0,33 dB |
| 40–58 s | 4–8 kHz | −2,30 dB | −0,84 dB |
| 40–58 s | 8–12 kHz | −4,76 dB | −2,21 dB |

La prima sezione è mediamente più debole nell'originale (−26,30 dBFS RMS)
rispetto alle successive (−19,19 e −17,11). Proprio qui il software è più
attenuato nelle medio-alte dell'hardware, di circa 0,6–0,9 dB nelle bande
1–8 kHz. È coerente con la percezione riferita, ma contenuto e livello cambiano
insieme: non dimostra da solo un difetto dipendente esclusivamente dal livello.
Possibile diverso tracking della catena NR da indagare con toni e livelli
controllati, evitando correzioni EQ statiche basate solo su questo brano.

## Conclusione utilizzabile

Il percorso software conserva meglio lo spettro medio 2–16 kHz di questo
estratto; il percorso hardware è più vicino nelle medio-alte iniziali.
Entrambi perdono energia alle alte rispetto alla sorgente. Non si può ancora
attribuire la perdita al solo Dolby: manca una registrazione senza NR con
stessa catena e livelli controllati. Il clipping preesistente delle acquisizioni
limita confronti di dinamica e distorsione; attenuare a posteriori non lo ripara.
Il prossimo campione utile è una registrazione senza NR, stesso originale,
livelli analogici documentati e acquisizione senza clipping, più un tratto di
silenzio di nastro per confrontare il fruscio.
