# Azioni dirette per ogni brano

Sostituisce il menu con i tre puntini. Ogni riga mostra sempre sei pulsanti SVG: modifica, blocco/sblocco, sposta sopra, sposta sotto, trasferisci sull'altro lato e rimuovi dalla mixtape.

Le azioni conservano gli handler esistenti. Il blocco ha stato `aria-pressed`; i comandi impossibili sono disabilitati (prima/ultima posizione, brano bloccato, uscita attiva). Il trasferimento usa una freccia verso il lato di destinazione. Ogni pulsante ha nome accessibile con titolo del brano e tooltip descrittivo. L'ordine delle sei azioni è fisso e le istanze dei pulsanti sono mantenute durante il cambio dell'etichetta Blocca/Sblocca, preservando il focus.

Le icone occupano sempre lo stesso spazio: nessuna espansione al passaggio del mouse e nessun menu sovrapposto. Le righe desktop restano alte 31 px. Sotto 900 px i lati si impilano per preservare spazio a titoli e azioni; sotto 760 px artista sotto il titolo e riga di 35 px.

## Verifiche

Build frontend e 12 test superati. Verifica visiva della demo nel browser a 1200 e 680 px: tutte le icone visibili, nessun overflow orizzontale e nessun aumento dell'altezza desktop. Verificati i nomi accessibili e la disabilitazione sopra/sotto ai limiti della lista.

La prova automatica del clic Blocca nella demo browser è stata respinta dal controllo di approvazione perché interpretata come modifica della scaletta. Nessun aggiramento eseguito; la verifica copre rendering e stati disponibili, non un clic effettivamente eseguito sul blocco.

Build macOS aggiornata e aperta: progetto da 12 tracce recuperato dal salvataggio automatico. Screenshot e albero accessibile confermano tutte le sei icone per riga, titoli e durate leggibili, pulsanti limite disabilitati e assenza dei tre puntini. La scaletta reale non è stata modificata durante il controllo.
