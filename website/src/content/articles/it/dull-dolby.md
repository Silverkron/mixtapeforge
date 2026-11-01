---
id: "dull-dolby"
lang: "it"
title: "Perché con Dolby B la cassetta suona chiusa?"
description: "Verifica codifica, livelli e risposta di lettura prima di aumentare gli alti."
primaryKeyword: "Perché con Dolby B la cassetta suona chiusa?"
secondaryKeywords: ["guida alla scelta","EQ di lettura","livello di riproduzione","Dolby e dbx via software"]
searchIntent: "diagnosis"
answer: "Se il Dolby rende la cassetta innaturalmente opaca, non aumentare subito gli alti. Il decoder reagisce sia alle frequenze sia al livello del segnale. Tracking significa che il suo intervento variabile annulla correttamente quello dell'encoder; differenze di livello o risposta possono rompere questa corrispondenza."
category: "troubleshooting"
image: "portable"
updated: "2026-11-01"
sources: [{"title": "Dolby Laboratories · CP45 · Appendix D", "url": "https://www.film-tech.com/warehouse/manuals/DOLBYCP45USERS.pdf"}, {"title": "IASA · TC-04 · 5.4.11", "url": "https://www.iasa-web.org/book/export/html/435"}, {"title": "Anaxwaves · DDi Codec", "url": "https://www.anaxwaves.com/DDiCodec/"}]


guideType: "troubleshooting"
prerequisites: ["dolby-b"]
next: ["playback-level", "muffled-cassettes"]
related: ["software-noise-reduction", "playback-equalization", "recording-sensitivity"]
---

## Isola la causa con un breve passaggio

Servono note della registrazione, cuffie, sorgente originale se disponibile e un'altra cassetta sicuramente funzionante. Mantieni stabile il volume e annota ogni modifica.

1. Conferma il formato. Un nastro senza NR non va decodificato con B o C. Se il formato è incerto usa la [guida alla scelta](../dolby-b-c-s-playback/).
2. Verifica l'[EQ di lettura](../playback-equalization/) e ascolta la cassetta conosciuta. Se entrambe sono opache, controlla e pulisci il percorso accessibile secondo il manuale prima di modificare l'audio.
3. Per una tua registrazione ricostruisci il percorso. Con B hardware, NR software deve essere off. Con Type B software, NR della piastra deve essere off in registrazione e B in ascolto. Cambiare volume d'ascolto non corregge una doppia codifica.
4. Confronta voce debole, code dei piatti e passaggi forti con l'originale a volume **d'ascolto** simile. Non cambiare la taratura di registrazione per alzare il confronto.
5. Con decoder software conserva l'acquisizione originale e verifica il riferimento. Un tono documentato consente l'allineamento; senza tono, la regolazione a orecchio resta una stima.

## Che cosa suggerisce il risultato

- **Tutte le cassette opache:** controlla riproduzione e contatto testina.
- **Solo una nuova registrazione:** verifica tipo di nastro, livello e percorso con un solo encoder.
- **Scompaiono soprattutto dettagli deboli:** verifica NR e allineamento di livello/risposta; non è una diagnosi certa del circuito Dolby.
- **Cambia solo un canale:** controlla canale e contatto prima dell'EQ globale.

Aggiungere 2 dB dopo la decodifica pareggia il volume, ma non annulla le decisioni già prese dal decoder sulle frequenze. Il riferimento Type B a 0 in MixtapeForge non disattiva la codifica e non è un obiettivo per il meter della piastra. Il profilo generale non certifica l'allineamento Dolby. Procedi con il [livello di riproduzione](../playback-level/) e ripeti una breve prova musicale.
