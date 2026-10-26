# Workspace desktop uniforme

## Obiettivo
Mixtape, Calibrazione e Copertina devono appartenere alla stessa applicazione locale: contenuto a tutta larghezza, nessun contenitore centrato o margine esterno da sito web, un solo scorrimento verticale.

## Regole comuni
- Intestazione unica in App: titolo da 15 px, descrizione da 12 px e azioni contestuali sulla destra.
- Moduli aderenti ai bordi e separati da un filetto; niente card flottanti, ombre o cornici arrotondate esterne.
- Padding di 12 px dentro strumenti e controlli; nessun padding sul contenitore delle viste.
- Stessa fascia di intestazione per lati della mixtape, pannelli della copertina e fasi della calibrazione.
- Player completo in Mixtape. Nelle altre viste, se la riproduzione è in corso, Pausa/Ascolta e Stop restano nell’intestazione. Nascondere il player non interrompe la riproduzione.
- Il contenitore della calibrazione non ha più limite a 1360 px o padding proporzionale alla finestra. I tre step e il selettore dei profili occupano tutta la larghezza.
- Copertina è divisa da un separatore verticale tra canvas e strumenti. L’anteprima fisica mantiene proporzioni e dimensione leggibile dentro il canvas; il canvas usa tutta l’area disponibile.
- Manteniamo una sola scrollbar e riserviamo spazio per i controlli sul lato destro con scrollbar macOS sovrapposta.
- Sotto 700 px i pannelli della copertina si dispongono verticalmente. La dimensione normale desktop resta a due colonne.

## Implementazione
`src/desktop-workspace.css` è lo strato condiviso, caricato dopo gli stili dei singoli strumenti. L’intestazione unica è in `src/App.tsx`; rimossa l’intestazione autonoma di CalibrationView. Stato, calibrazioni, progetti e geometria di stampa non cambiano.

## Verifica
Confronto visivo delle tre viste a 1280 px e di Copertina/acquisizione a 900 px. A 900 px documento e workspace misurano entrambi 900 px, senza overflow orizzontale. Screenshot in `test-results/unified-workspace/`. Test per calibrazione, copertine e viewport; controllo TypeScript e build desktop.

Esito: tutti i 73 test frontend superati; build macOS completata. Il 26 ottobre è stata riaperta la build e completato il controllo visivo nativo delle tre viste, dopo lo sblocco del Mac. Recuperati progetto, palette Radio poster e profilo salvato Pioneer CT-W205R · TDK Type I. Screenshot nativi in `test-results/unified-workspace/native-calibration.png` e `native-artwork.png`. Verifiche dell’anteprima locale eseguite anche con le dimensioni sopra riportate.
