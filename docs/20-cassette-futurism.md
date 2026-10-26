# Direzione visiva — Cassette futurism

> Revisione successiva: su richiesta dell’utente è stata ripristinata la palette blu notte/lavanda/ciano, con relativa variante chiara, descritta in 07. Si mantengono geometria compatta, controlli squadrati e display incassati. Il tema predefinito torna scuro; le preferenze salvate restano rispettate. I colori caldi e le misure di contrasto sotto documentano la prova precedente.

Implementata il 24 ottobre 2026. Sostituisce palette e geometria iniziali di 07; conserva la navigazione compatta di 16.

## Intento

Uno strumento da banco per preparare cassette: superficie grigio caldo per organizzare i brani, display incassati per leggere il segnale, comandi riconoscibili e accenti misurati. Il riferimento culturale deriva da r/cassettefuturism (strumenti dedicati, ergonomia, comandi fisici) e r/cassetteculture (cura della compilazione e delle etichette). È una nostra interpretazione, non uno standard delle community.

Fonti: [definizione dell’estetica](https://www.reddit.com/r/cassettefuturism/comments/1xds2j6/how_would_you_describe_cassette_futurism/), [colori e comandi](https://www.reddit.com/r/cassettefuturism/comments/1u9vhz0/how_to_be_more_cassette_futurism/), [ergonomia di una tastiera](https://www.reddit.com/r/cassettefuturism/comments/1nkxfep/i_designed_a_keyboard_using_this_sub_as/), [cura delle J-card](https://www.reddit.com/r/cassetteculture/comments/1v1ffbi/ever_just_make_a_custom_jcard_at_4am/).

## Token implementati

| Ruolo | Chiaro | Scuro |
| --- | --- | --- |
| Chassis | #D8D2C4 | #222724 |
| Pannelli | #EDE9DF | #2B312D |
| Campi | #F7F3E9 | #202620 |
| Testo | #252A27 | #EEEADD |
| Testo secondario | #565A52 | #C0C3B5 |
| Accento / focus | #A33F19 | #EDAA72 |
| Testo su accento | #FFF6E9 | #272319 |
| Stato positivo | #326450 | #9BC7A1 |

Display costanti: fondo #171C1B, testo #EEEADD, metadati #ADB7A8, segnale #9BC7A1, curva EQ e tempi #EDB765. Il rosso indica clip o errori. Le forme d’onda e lo spettro leggono gli stessi token CSS dei meter.

Il tema chiaro è predefinito nelle nuove installazioni. La preferenza esistente resta rispettata; il pulsante sole/luna permette il confronto. Il colore dell’etichetta resta un dato del progetto, indipendente dal tema.

## Componenti e gerarchia

- Marca sans-serif; monospaziato riservato a misure, frequenze e tempi.
- Pannelli e controlli con raggio 3 px, separazioni nette, ombre leggere da pulsante/display.
- Lati A/B identificati da placche ad alto contrasto e intestazioni separate dalle tracce.
- Trasporto sempre scuro e stabile in basso; pannello registrazione con accento superiore.
- EQ con curva ambra su display scuro e dieci cursori nativi, accessibili da tastiera.
- Regolazioni avanzate nei pannelli contestuali esistenti. Nessuna nuova schermata.
- Nessuna animazione decorativa, disturbo CRT o effetto che comprometta testo e misure.

## Verifica

Controllo visivo in Chrome di Mixtape chiara/scura, Copertina ed EQ; larghezze 1440 e 900 px. Nessun overflow orizzontale nelle viste controllate. Contrasto misurato delle coppie principali: testo/pannello 12,04:1; secondario/pannello 5,81:1; testo sul pulsante principale 5,97:1; metadati/display 8,30:1. Testi dim sul chassis scuriti dopo il controllo: 4,76:1. Tema scuro: secondario/pannello 7,41:1, testo sul pulsante principale 7,90:1. Queste misure non costituiscono un audit completo di accessibilità.

Verifica di compilazione frontend e bundle macOS; nove test frontend. La verifica grafica nel browser non prova il motore audio né il rendering nativo su Windows/Linux.
