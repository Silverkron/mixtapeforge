# Alternative, apprezzamenti e bisogni

Ricerca qualitativa iniziale, 24 ottobre 2026. **Non è una classifica di popolarità.** Nessun confronto strumentale fra binari è stato eseguito.

## Alternative rilevanti

| Software | Categoria e capacità riscontrate | Cosa ricavare | Limite del confronto |
| --- | --- | --- | --- |
| [Deck](https://denispopkov.github.io/Deck/) | Preparazione per cassette; dichiara macOS/Windows/Linux, selezione formulazione, durata, import, preview prima/dopo ed export WAV | Percorso breve import → setup → prepara → export; rendere spiegabili i preset | Promesse del sito; qualità del mastering e misure sul deck non verificate |
| [Audacity](https://manual.audacityteam.org/man/basic_recording_editing_and_exporting.html) | Registrazione, editing ed export generalisti | Controllo esplicito del segnale e dei livelli | Non dimostra un workflow cassette integrato |
| [REAPER](https://www.reaper.fm/) | Produzione multitraccia, routing, effetti, rendering e personalizzazione | Editing non distruttivo, scorciatoie, flessibilità del routing | Una DAW richiede di costruire il proprio flusso cassette |
| [J-Card Template](https://unixispower.gitlab.io/jcard-template/) | Editor stampabile con contenuti dei lati, colori e dimensioni dei testi | Tracklist dal progetto senza ricopiare; personalizzazione della stampa | Non prepara audio |
| [Mixtape Cover Maker](https://farisfarooq.com/mixtape) | Divisione dei lati, verifica della capacità e J-card con riferimenti fisici di stampa | Conservare l'ordine narrativo; calibrare la scala della stampante | Strumento grafico; non prova un motore di registrazione |
| [Daigo Mixtape](https://www.daigosoft.com/mixtape-manual.html) | Creazione e ascolto di cassette virtuali | Oggetto progetto riconoscibile, copertina e archivio | Il manuale descrive un tapedeck virtuale |
| [Type Four](https://play.google.com/store/apps/details?id=com.tinharbour.typefour) | App Android con file locali, lati, shell, J-card e riproduzione sequenziale | Personalizzazione e piacere d'uso senza account | Simulazione e fruizione; non sostituisce il trasferimento analogico misurato |

La nuova app deve unire preparazione, controllo della catena fisica e confezione. Le animazioni servono a chiarire lo stato; hiss e wow/flutter artificiali non sono necessari per registrare su un nastro reale.

## Evidenze degli utenti

| Segnale | Evidenza e data | Interpretazione prudente | Risposta progettuale |
| --- | --- | --- | --- |
| Apprezzati master unico e tono di riferimento | Recensione App Store del 22/04/2024 | Un utente descrive un miglioramento concreto del proprio flusso anche su bobina | F-15, F-16: master e tono con impostazioni collegate |
| Apprezzati contatori, gap e distribuzione A/B | Discussione cassetteculture, giugno 2025 | Testimonianza positiva, non dato quantitativo | F-03/F-04/F-05: capacità leggibile e fit sotto controllo |
| Richiesta ricerca peak/RMS e loop di circa 5 secondi | Recensione App Store del 02/11/2025 | Peak Index oggi documentato; loop non previsto nella procedura letta | F-19: massimo per metrica e loop regolabile |
| Difficoltà con WASAPI esclusivo su DAC Topping D10s | Discussione cassetteculture, giugno 2025 | Problema riportato su una configurazione; esclusività già presente nel prodotto | F-24: diagnosi dello stato ottenuto e prova per driver |
| Richieste scorciatoie Play e media key; ASIO non disponibile secondo il commento | Stessa discussione | Stato attuale non accertato; bisogno operativo plausibile | F-18/F-25: comandi rapidi e backend opzionale |

Fonti: [recensioni App Store](https://apps.apple.com/gb/app/mixtapenerd/id6467670459?mt=12), [discussione utenti](https://www.reddit.com/r/cassetteculture/comments/1kx6c3q/), [manuale Peak Index](https://www.anaxwaves.com/MixtapeNerd/Docs/LevelCalibration_min.html).

**Non abbiamo prove sufficienti per chiamare queste richieste “mai implementate”.** Il loop resta una lacuna descritta dal manuale consultato; scorciatoie e ASIO richiedono controllo sulle release attuali. Non sono stati trovati dati affidabili per stimare percentuali di utenti interessati.

## Opportunità proposte, ancora da validare

| Ipotesi di bisogno | Proposta | Come validarla |
| --- | --- | --- |
| Il riordino automatico può rovinare il racconto musicale | Blocchi di brani, apertura/chiusura fissate, preview del fit | 5 sessioni osservate: l'utente accetta il risultato senza ricostruire l'ordine |
| Il nastro reale ha durata diversa dal valore nominale | Durata effettiva per lato e margine configurabile | Registrazioni su almeno tre cassette; misurare anticipo/fine |
| I profili vengono riutilizzati dopo aver cambiato volume o DAC | Firma della catena e calibrazione da riconfermare | Cambio device e gain durante sessioni simulate; nessun profilo mostrato come verificato per errore |
| L'utente non vuole perdere una facciata per un dropout | Pre-render, preflight e log degli underrun | Sessioni lunghe su tutti gli OS e test di disconnessione |
| Stampare e archiviare richiede strumenti separati | J-card e scheda di registrazione generate dallo stesso progetto | Prova di stampa con righello e recupero del progetto su altro computer |
| Troppi parametri rallentano chi inizia | Percorso guidato e pannelli avanzati progressivi | Un principiante esporta/avvia un lato senza spiegazioni esterne |

## Ricerca successiva

Intervistare principianti e utenti con deck a due e tre testine; raccogliere configurazioni OS/DAC, esempi di cassette fallite e procedure attuali. Prima osservare il lavoro, poi presentare i concept. Registrare frequenza e gravità del problema senza sommare citazioni provenienti dalla stessa persona. La priorità del backlog è per ora una decisione progettuale, non il risultato di un sondaggio.
