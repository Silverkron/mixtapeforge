---
id: "needs-calibration"
lang: "it"
title: "La piastra ha bisogno di taratura? I primi controlli pratici"
description: "Distingui una cassetta difettosa, un’impostazione errata e un problema ripetibile prima di chiedere una taratura."
primaryKeyword: "La piastra ha bisogno di taratura? I primi controlli pratici"
secondaryKeywords: ["prova ripetibile","bilanciamento dei canali","cassetta di riferimento per la velocità","Perché la stessa cassetta suona diversamente su un’altra piastra"]
searchIntent: "diagnosis"
answer: "Una sola cassetta deludente non basta per diagnosticare una piastra fuori taratura. Questi controlli aiutano a decidere se cambiare un'impostazione, provare un altro nastro o raccogliere elementi utili per l'assistenza."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100: lista di controllo delle misure", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "REW: configurazione dell’interfaccia audio", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}]
related: ["different-decks", "channel-balance", "speed-test"]
guideType: "troubleshooting"
prerequisites: ["calibration-basics"]
next: ["without-reference-tape"]
---

## Prepara un confronto corretto

Procurati una cassetta preregistrata che conosci e che sia in buono stato, due cassette registrabili utilizzabili e un breve file musicale con voce e piatti. La preregistrata è un riferimento d'ascolto quotidiano, non un nastro di taratura certificato. Mantieni il volume moderato e fotografa i controlli prima di cambiarli.

## Procedi in quest'ordine

1. Riproduci la cassetta conosciuta con la riduzione del rumore usata in registrazione e il tipo di nastro corretto. Ascolta eventuali oscillazioni d'intonazione, alte intermittenti o un canale sempre più basso.
2. Riproduci direttamente il file musicale dalla tua uscita abituale. Se il difetto c'è già, controlla sorgente e instradamento prima della piastra.
3. Registra trenta secondi sulla prima cassetta, con NR spento e livello prudente. Riavvolgi e riproduci ancora con NR spento. Confronta a volume percepito simile: la versione più bassa può sembrare meno chiara.
4. Ripeti sulla seconda cassetta senza spostare i controlli. Un difetto limitato a un solo esemplare suggerisce di controllare prima il nastro o il guscio.
5. Se entrambe presentano il problema, passa alla [prova ripetibile](../without-reference-tape/). Conserva acquisizioni originali e impostazioni, senza toccare viti interne.

## Interpreta il comportamento

| Cosa osservi | Verifica semplice | Passo successivo |
| --- | --- | --- |
| Si chiudono solo i piatti più forti | Registra lo stesso estratto 3 dB più basso | Indaga la saturazione delle alte |
| Un canale resta più basso | Usa lo stesso segnale mono sui due canali | Misura il bilanciamento |
| L'intonazione oscilla su più nastri | Prova una seconda cassetta affidabile | Controlla il trascinamento, poi la stabilità di velocità |
| Il Dolby in lettura suona chiuso | Verifica la corrispondenza dell'NR | Controlla livelli e allineamento prima dell'EQ |

Sono possibili cause, non diagnosi. Esempio ipotetico: due nuove registrazioni sono opache, mentre le preregistrate note sono chiare. Le condizioni di registrazione diventano un indizio più forte della lettura, ma non identificano un componente guasto.

Per una differenza stabile tra sinistra e destra segui il [bilanciamento dei canali](../channel-balance/). Per un'intonazione costantemente errata serve una [cassetta di riferimento per la velocità](../speed-test/).

## Prima di richiedere assistenza

- Conferma il sintomo su più cassette.
- Annota le impostazioni che lo riproducono.
- Conserva un breve originale e il relativo ritorno.
- Se resta un problema meccanico o di allineamento, richiedi una verifica specifica del modello: un profilo EQ non lo ripara.
