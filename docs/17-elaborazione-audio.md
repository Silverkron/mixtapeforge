# Elaborazione audio: normalizzazione, compressione, EQ e NR

## Percorso disponibile

Mixtape → Audio. Tutte le modifiche sono non distruttive, annullabili e invalidano il master precedente. Per sentire una modifica, prepara di nuovo il lato o usa Ascolta e confronta un brano. Non sono effetti live regolabili durante la registrazione.

### Normalizzazione

Disponibili bypass, peak, peak di album, LUFS integrati, RMS, media VU su 300 ms e quasi-peak su 10 ms. L’album usa un guadagno comune; gli altri modi calcolano il guadagno per brano. La normalizzazione usa le misure del file sorgente completo: il taglio non ricalcola queste misure. Target mostrato soltanto per LUFS/RMS. Il limite true peak prevale sul target, anche dopo gli altri processori; un target non raggiunto è quindi possibile. VU usa il riferimento del profilo di calibrazione, oppure −18 dBFS.

### Compressore

Rivelatore di picco collegato stereo. Soglia −60…0 dBFS, rapporto 1:1…12:1, attacco 0,1…200 ms, rilascio 10…2000 ms, knee 0…24 dB e guadagno di uscita −12…24 dB. Knee zero seleziona la curva dura. In bypass il guadagno del compressore non viene applicato. Espansore, ALC e Fit preesistenti sono conservati; ALC/Fit restano sperimentali.

### EQ grafico

Dieci filtri peaking in cascata, Q = √2, frequenze 31,5 / 63 / 125 / 250 / 500 Hz e 1 / 2 / 4 / 8 / 16 kHz. Guadagno ±12 dB, passo UI 0,5 dB. Coefficienti secondo il [W3C Audio EQ Cookbook](https://www.w3.org/TR/audio-eq-cookbook/).

Preset: Piatto, Più corpo, Voce in primo piano, Alte più morbide, Meno rimbombo. Sono punti di partenza timbrici, non correzioni misurate di un deck o di un nastro. Selezionandoli si aggiornano tutte le bande; cambiando un cursore compare Personalizzato. Il bypass conserva le regolazioni. Il grafico calcola la risposta complessiva degli stessi filtri e considera la frequenza di campionamento del progetto.

La conversione EQ 120/70 µs resta separata dall’EQ grafico e non modifica il bias fisico.

## Ordine effettivo

Tagli → ricampionamento → guadagno di normalizzazione/manuale → dinamica e makeup → fade → EQ grafico → conversione EQ nastro → assemblaggio lato/crossfade → misura true peak e attenuazione uniforme se necessaria → quantizzazione/dither.

## NR encoding

Type B è ora disponibile tramite libdolbyb 1.1 in un’utility GPLv2 separata e inclusa nel pacchetto GPLv3. Dolby C e dbx restano non implementati. Dettagli, convenzione di riferimento, attenuazione prima dell’encoder e limiti delle prove in [NR compatibile](18-nr-compatibile.md).

## Prove eseguite

- 13 test Rust: guadagno centrale EQ a tutte le frequenze di campionamento supportate, indipendenza dei canali, bypass, compressione e makeup, knee zero, normalizzazione e migrazione dei progetti precedenti.
- 7 test frontend: risposta EQ piatta, guadagno centrale e inversione boost/cut, preset custom e guadagni della preview.
- Verifica offline con import e rendering reali: WAV float32/PCM16/PCM24, crossfade, modi di normalizzazione, dinamica più EQ a +6 dB su tutte le bande e makeup +6 dB. Limite true peak rispettato nei file generati.
- Browser a 1440 e 900 px: preset aggiornano bande e curva; freccia Su su 1 kHz cambia 2 → 2,5 dB e attiva Personalizzato; nessun overflow orizzontale nelle bande.

I test offline non attestano la resa di un deck fisico né la compatibilità con Dolby/dbx. L’ultima build va verificata anche su Windows e Linux.

Build macOS release completata. La nuova istanza risulta avviata, ma il controllo della finestra nativa ha restituito timeout: la verifica visiva di questa revisione è stata completata nel browser, non confermata nel WebView nativo. Per l’integrazione NR attuale: [Piano di integrazione e validazione](18-nr-compatibile.md).

## Revisione dei profili EQ — 24 ottobre 2026
Profili orientati al risultato, applicati all’intero master; non sono calibrazioni per tipo di nastro né codifiche NR. Nuovi profili: Neutro, Più corpo, Meno rimbombo, Voce più presente, Meno asprezza, Alte più morbide, Più brillantezza. Rialzi massimi per banda +1,5 dB e tagli fino a −2 dB: interventi moderati, da affinare con ascolto e slider. Le descrizioni precisano frequenze e guadagni; la curva visualizza la cascata dei filtri, non semplicemente i valori degli slider. Test sulle quattro frequenze di campionamento supportate verifica risposta finita e contenuta entro ±4 dB su una griglia logaritmica 20 Hz–20 kHz per i preset di fabbrica. Questo limite riguarda i profili, non le regolazioni manuali ±12 dB.

Compatibilità: i progetti salvano i guadagni effettivi, non l’ID del preset. Le vecchie curve non vengono riscritte: appaiono come Personalizzato se non coincidono con un nuovo profilo. Scegliere un profilo sostituisce tutte le bande e attiva l’EQ; bypass conserva le regolazioni. Nessuna modifica al DSP Rust.

## Preset per genere musicale
Aggiunti Rock, Pop, Jazz, Classica, Elettronica, Hip-hop e Acustica. Nel selettore sono raccolti in “Generi musicali”, separati da “Correzioni del suono”; Neutro e Personalizzato restano disponibili. Sono curve di gusto progettate per l’app, non standard tecnici dei generi o compensazioni del nastro. Tutti mantengono i rialzi entro +1,5 dB per banda e sono coperti dal controllo della risposta complessiva entro ±4 dB. Classica non modifica la compressione: nessun preset EQ cambia altri processori. Come gli altri profili, impostano le dieci bande, aggiornano la curva e sono modificabili a mano; i progetti conservano sempre i guadagni effettivi.
