---
id: "azimuth-test"
lang: "it"
title: "Controllare l’azimut senza perdere l’allineamento originale"
description: "Usa un vero riferimento per osservare livello delle alte e fase prima di valutare una regolazione."
primaryKeyword: "Controllare l’azimut senza perdere l’allineamento originale"
secondaryKeywords: ["livello e polarità","risposta in frequenza","Controllare polarità e ritardo stereo con un segnale mono noto","Misurare come la cassetta cambia bassi, medi e alte"]
searchIntent: "evaluation"
answer: "L'azimut è l'angolo del traferro della testina rispetto alla traccia registrata. Una differenza può attenuare le alte e peggiorare la somma mono dei canali. Questa guida raccoglie indizi di disallineamento; non prescrive una regolazione universale delle viti."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Jay McKnight: azimut nei registratori a nastro magnetico", "url": "https://www.mrltapes.com/mcknight_azimuth-in-mtr.pdf"}, {"title": "NAK T-100: lista di controllo delle misure", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "NAK T-100: specifiche ufficiali", "url": "https://anaxwaves.com/NAKT100/"}]
related: ["phase-polarity", "frequency-response", "playback-level"]
guideType: "measurement"
prerequisites: ["calibration-tapes"]
next: ["different-decks"]
---

## Occorrente

Servono la cassetta di azimut prevista dalla procedura di servizio, un ingresso stereo di linea e l'oscilloscopio a due canali di NAK T-100. Frequenza, formato delle tracce e allineamento del riferimento devono essere documentati. Musica ordinaria e toni auto-registrati non stabiliscono un allineamento indipendente.

Verifica prima il trascinamento con una cassetta normale. Non introdurre un riferimento prezioso in una macchina che danneggia il nastro. Esegui la pulizia soltanto secondo le istruzioni del produttore.

## Osserva prima di regolare

1. Collega LINE OUT L/R agli ingressi di linea L/R. Seleziona stereo, disattiva effetti e guadagno automatico e mantieni fissi i guadagni dei canali.
2. Inserisci il riferimento, scegli il tipo di nastro di lettura richiesto e spegni NR. Avvia la sezione documentata per l'azimut.
3. In NAK T-100 seleziona **Level** e annota i due livelli dopo la stabilizzazione. Riduci il guadagno d'ingresso se uno satura.
4. Passa a **Scope > O'scope**. Osserva se le sinusoidi salgono e scendono insieme. In **Lissajous** un canale è rappresentato rispetto all'altro: segnali uguali e in fase tendono a una diagonale; una differenza di fase apre un'ellisse.
5. Ripeti il tratto e annota ampiezza e fase. Se il riferimento offre più frequenze documentate, osservane più di una.
6. Conserva risultati e dati della cassetta. Se la differenza si ripete, consulta il metodo di servizio o un tecnico prima di muovere la testina.

## Cosa non dimostra il disegno

Alle alte frequenze un ritardo può corrispondere a un intero ciclo della sinusoide. Una traccia apparentemente allineata a una sola frequenza non prova quindi l'azimut corretto. Guidanastro, contatto con la testina, elettronica dei canali e riferimento influenzano il risultato.

Esempio ipotetico: un'ellisse stretta a una frequenza diventa ampia a un'altra, mentre il livello delle alte cambia tra passaggi. Occorre controllare ripetibilità e contatto, non girare una vite finché un solo grafico diventa diritto.

## Difficoltà comuni

Se compare una sola sinusoide, verifica i canali. Una diagonale inclinata per un canale più basso richiede di controllare [livello e polarità](../phase-polarity/), senza attribuire tutto all'azimut. Se il grafico vaga, prova un riferimento sano e verifica la meccanica.

Controllo finale: riferimento documentato, due canali, niente clipping, osservazioni ripetute e posizione originale preservata. La [risposta in frequenza](../frequency-response/) può mostrare le conseguenze sonore, ma non identifica autonomamente l'azimut.
