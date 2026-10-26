# Confronto con registrazione senza Dolby — 25 ottobre 2026

## Assunzioni e campioni

Nuovo file: `/Users/lucasciacca/Downloads/piatra no dolby.wav`, PCM 16 bit,
44.100 Hz stereo, 61,657 s. Interpretato come registrato e riprodotto senza NR;
il solo nome del file non conferma le impostazioni fisiche della piastra.
Originale, software e hardware attenuato di 2,1 dB sono quelli del documento 42.
Riferimento software confermato dall'utente a 0 dBFS. Guadagni analogici e
uniformità del tratto di nastro tra le prove non confermati.

Script esteso: `test-results/nr/recording-comparison/compare_original.py`.
Ora analizza tutte e tre le acquisizioni. Risultati e SHA-256 in
`original-comparison-with-no-nr.json`, spettri in
`original-spectra-with-no-nr.npz`; i risultati precedenti sono conservati.
Nessuna modifica all'app o ai WAV.

## Metodo

Stesso metodo del documento 42: allineamento locale e modello temporale per
selezionare intervalli musicali corrispondenti, campioni originali contigui senza
ricampionamento. Potenze FFT Hann 16.384, overlap 50%, media su canali e tempo.
Spettri del passaggio equivalente a 2–58 s dell'originale, compensati ciascuno
sulla potenza 250–1.000 Hz dell'originale. Analisi separate dei tre passaggi.
Sono differenze di spettro musicale, non risposte strumentali dell'encoder.

## Timbro rispetto all'originale

Valori negativi = meno energia dopo compensazione di livello.

| Banda | Senza NR | Dolby hardware | Dolby software |
| --- | ---: | ---: | ---: |
| 1–2 kHz | −0,33 dB | −0,44 dB | −0,19 dB |
| 2–4 kHz | −0,82 dB | −1,12 dB | −0,27 dB |
| 4–8 kHz | −1,68 dB | −2,35 dB | −0,72 dB |
| 8–12 kHz | −3,32 dB | −4,75 dB | −2,05 dB |
| 12–16 kHz | −4,43 dB | −6,45 dB | −3,39 dB |
| 16–20 kHz | −11,76 dB | −14,38 dB | −11,81 dB |

L'attenuazione è presente anche senza NR: il solo Dolby non spiega tutta la
perdita. Sull'estratto medio il software ha lo spettro più vicino all'originale
tra 2 e 16 kHz. Rumore e distorsione possono contribuire all'energia misurata:
questo non dimostra fedeltà complessiva superiore né taratura certificata.
Il confronto senza NR non isola nastro e piastra da eventuali differenze di
guadagno, carico del nastro, convertitori e acquisizione tra prove.

## Passaggio iniziale

Tra 2 e 20 s, compensando la banda di riferimento di ogni sezione:

| Banda | Senza NR | Dolby hardware | Dolby software |
| --- | ---: | ---: | ---: |
| 2–4 kHz | −0,74 dB | −1,90 dB | −2,79 dB |
| 4–8 kHz | −1,52 dB | −3,28 dB | −3,91 dB |
| 8–12 kHz | −1,93 dB | −4,27 dB | −4,64 dB |

Il passaggio iniziale è più debole e ha contenuto diverso dai successivi.
Qui il software è più attenuato dell'hardware: non è corretto concludere che
sia sempre più aperto. La differenza dipendente dal passaggio resta un motivo
per verificare il tracking della catena NR con livelli e segnali controllati.

## Rumore iniziale: stima esplorativa

Riesaminando l'inizio dei file si individua un breve tratto apparentemente
senza musica, equivalente a 0,8–1,4 s dell'originale. Il file originale è a
−84,13 dBFS RMS in quel tratto, mentre le acquisizioni hanno un fondo maggiore.
Le primissime frazioni di secondo dei file hanno un fondo molto più basso:
sono escluse per evitare l'avvio della riproduzione/acquisizione.

Si compensa lo stesso guadagno 250–1.000 Hz stimato sul passaggio musicale
completo: +6,89 dB no NR, +4,79 hardware, +4,55 software rispetto alla sorgente.
La stima non utilizza guadagni di normalizzazione indipendenti sul rumore.

| Misura | Senza NR | Dolby hardware | Dolby software |
| --- | ---: | ---: | ---: |
| Fondo RMS compensato | −61,47 dBFS | −65,98 dBFS | −63,91 dBFS |
| Riduzione RMS rispetto a senza NR | riferimento | 4,51 dB | 2,44 dB |
| Riduzione potenza rumore 4–12 kHz rispetto a senza NR | riferimento | 10,81 dB | 8,42 dB |

Nel tratto analizzato il percorso software ha circa 2,39 dB più rumore 4–12 kHz
dell'hardware. È una misura relativa della potenza integrata in banda, non un
valore di riduzione a una singola frequenza, non un SNR certificato e non una
misura della sola libreria NR. La finestra di 0,6 s è breve e il contenuto può
includere rumore elettronico, nastro e transitori. Serve conferma che il nastro
stesse effettivamente scorrendo e NR fosse impostato come dichiarato in tutti
i campioni. Per una misura stabile servono diversi secondi di silenzio di nastro
con le stesse condizioni, e prova ripetuta.

## Clipping e conclusione

Il nuovo file senza NR ha picco 0 dBFS e 4.338 campioni al limite PCM,
contando L/R. Anche il software aveva clipping; l'hardware è stato attenuato
dopo la prima acquisizione. Non sono campioni idonei a certificare distorsione
o dinamica delle tre catene. Il confronto spettrale resta descrittivo.

Questi campioni indicano riduzione del fruscio in entrambi i percorsi NR.
L'hardware lo riduce maggiormente nel tratto iniziale analizzato; il software
conserva meglio lo spettro medio del brano, ma attenua maggiormente le
medio-alte nel passaggio iniziale. Il riferimento a 0 non basta a concludere
che il tracking sia allineato alla Pioneer. Non applicare una EQ fissa sulla
base di questo solo confronto.
