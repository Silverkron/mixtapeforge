---
id: "flux-stereo-tool"
lang: "it"
title: "FLUX Stereo Tool: controllare i canali prima di registrare una cassetta"
description: "Una prova pratica con FLUX Stereo Tool per verificare polarità, bilanciamento e larghezza stereo prima di preparare il nastro."
primaryKeyword: "FLUX Stereo Tool"
secondaryKeywords: ["fase e polarità","misura del bilanciamento","controlli del canale debole","Controllare polarità e ritardo stereo con un segnale mono noto"]
searchIntent: "task"
answer: "FLUX Stereo Tool offre guadagno, panorama, polarità e larghezza stereo, con vectorscopio, misuratori di picco e correlazione. Per una cassetta serve soprattutto a rendere visibili alcune differenze prima della registrazione."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "FLUX Stereo Tool: pagina ufficiale", "url": "https://www.flux.audio/project/stereo-tool-freeware/"}, {"title": "Manuale di FLUX Stereo Tool", "url": "https://doc.flux.audio/stereotool/"}, {"title": "Download ufficiali FLUX", "url": "https://www.flux.audio/download/"}, {"title": "Specifiche dei plugin FLUX", "url": "https://www.flux.audio/plugin-specifications/"}, {"title": "REAPER 7: dispositivi, tracce, effetti, ascolto mono ed esportazione", "url": "https://dlx.reaper.fm/userguide/html/"}]
related: ["phase-polarity", "channel-balance", "quiet-channel"]
guideType: "procedure"
prerequisites: ["channel-balance"]
next: ["phase-polarity", "recording-profile"]
---

## Procurarsi il plugin e scegliere l’host

Parti dalla pagina ufficiale e segui il download tramite FLUX Center per Windows o macOS. Per questo freeware FLUX dichiara che non servono dongle né attivazione della licenza. Verifica sistema operativo e formato disponibile prima dell’installazione: non presumere che esista una versione VST3 o Linux. Scegli una DAW o un host compatibile che permetta di aprire l’editor nativo.

## Un host concreto: REAPER

Qui sono riportati i nomi inglesi del manuale REAPER 7. È un percorso documentato, non la dichiarazione di un'installazione o prova del plugin eseguita qui.

1. In **Options > Preferences > Audio > Device** scegli la scheda e l'uscita stereo prevista. Crea una traccia con **Track > Insert new track**. Dal Media Explorer importa il WAV di riferimento con **Insert into project**, senza adattamento temporale o normalizzazione.
2. Apri **View > FX Browser**, cerca FLUX Stereo Tool e trascinalo sul pannello della traccia. Apri la finestra FX della traccia e seleziona il plugin per mostrarne l'editor. Mantieni il pan centrale e disattiva altri effetti.
3. Mostra **View > Master Track**. Usa il comando **Mono/Stereo** per verificare la somma nell'esercizio seguente e poi ripristina stereo. Mentre impari i controlli lascia il deck fuori da REC.
4. Per salvare una correzione intenzionale metti la traccia in solo e scegli **File > Render**. Esporta WAV stereo alla frequenza del progetto, senza normalizzazione e con nome nuovo. Controlla canali e picchi del file prima di importarlo in MixtapeForge. Salva anche il progetto REAPER per recuperare le impostazioni del plugin.

## Preparare una partenza neutra

Inserisci il plugin su un percorso stereo di prova e ripristina i valori iniziali. Controlla guadagni a 0 dB, polarità normali, larghezza predefinita e panorama nella posizione iniziale: il canale sinistro deve restare a sinistra e il destro a destra. Disattiva altri effetti.

Abbassa il volume d’ascolto e lascia la piastra fuori dalla registrazione. Per questa verifica del percorso software non attivare REC né la riduzione del rumore. Annota il punto in cui ascolti e misuri: un percorso diverso può cambiare il risultato.

## Verificare con una voce identica sui due lati

Il **goniometro** disegna il rapporto tra i canali. La **correlazione** ne riassume la somiglianza: +1 per canali identici, −1 per opposti esatti. Sono aspettative per il riferimento di prova, non obiettivi per qualsiasi mix. Approfondisci [fase e polarità](../phase-polarity/).

Registra circa venti secondi della tua voce, poi duplica la stessa registrazione nei canali sinistro e destro, perfettamente allineati e allo stesso livello. Non usare due esecuzioni diverse. Riproduci il tratto parlato a volume basso e confronta plugin attivo e bypass.

La voce dovrebbe restare al centro; la correlazione dovrebbe avvicinarsi a +1 durante il segnale utile. Ignora le pause silenziose. Un risultato diverso invita a controllare instradamento, livelli e ritardi prima di accusare la piastra o correggere il programma musicale.

## Riconoscere un’inversione di polarità

Solo sulla copia di prova, inverti temporaneamente la polarità di un canale. Con i due segnali identici, la correlazione si sposta verso −1 e la somma mono può quasi annullarsi. Ripristina immediatamente la polarità normale, poi verifica che la voce torni centrale.

Questa dimostrazione insegna a riconoscere un sintomo. L’inversione cambia il segno dell’onda; uno sfasamento dipendente dalla frequenza può avere altre cause. Non invertire un canale musicale solo perché il grafico sembra più ordinato: potresti compromettere un’immagine stereo corretta.

## Compensare soltanto uno squilibrio dimostrato

Segui la [misura del bilanciamento](../channel-balance/) per quantificare lo scarto. Per valutare una catena reale usa un riferimento stabile, identico nei due canali all’origine, e confronta lo stesso intervallo acquisito. Se il canale più forte resta tale nelle ripetizioni, puoi attenuarlo leggermente. Un intervento di −0,5 dB è soltanto un esempio, non un valore consigliato per ogni impianto.

Riascolta e ricontrolla i picchi dopo ogni modifica. Se la differenza varia nel tempo o con la frequenza, cerca la causa. Non pareggiare automaticamente i livelli della musica: strumenti e riverberi possono essere volutamente asimmetrici.

## Usare la larghezza con prudenza

Passa ora a un brano conosciuto. Parti dalla larghezza neutra e prova variazioni contenute, alternando stereo, somma mono e bypass a volume percepito comparabile. Ascolta soprattutto voce, basso e riverberi: una maggiore apertura non vale la perdita di elementi in mono.

Per la normale musica stereo +1 non è un obiettivo. Conta che il risultato mantenga equilibrio e compatibilità, senza inseguire una lettura fissa del misuratore.

## Salvare il risultato e preparare il nastro

Una cattura comprende gli errori di registrazione, riproduzione e interfaccia: un bilanciamento che migliora questo percorso non garantisce un risultato migliore su un’altra piastra. Il plugin non corregge azimut, wow o difetti meccanici. Se elabori una cattura, conserva l’originale e prepara un WAV pulito con le sole correzioni deliberate.

Puoi importare quel WAV in MixtapeForge evitando effetti duplicati. L’app ospita VST3 con parametri generici, senza editor nativo: questa procedura non dimostra la compatibilità diretta di Stereo Tool. Salva il preset nell’host e annota riferimento usato, guadagni e punto della catena, così potrai ripetere il confronto.

## Problemi frequenti e controllo finale

Se il plugin non compare nell'host, verifica formato installato, architettura del processore e risultato della scansione rispetto ai requisiti FLUX. Se si muove un solo misuratore, controlla traccia e canali prima di usare il guadagno. Se il mono annulla il riferimento invertito volontariamente, la dimostrazione funziona: ripristina il comando prima della musica.

Un canale sempre basso può avere cause diverse: usa i [controlli del canale debole](../quiet-channel/) invece di una compensazione estrema. Prima dell'esportazione verifica larghezza neutra o intenzionale, inversioni dimostrative ripristinate, uscita senza clipping e nome riconoscibile. La compatibilità nell'host MixtapeForge richiede una prova reale del plugin, che questo articolo non dichiara di aver eseguito.
