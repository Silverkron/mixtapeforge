import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

const root = path.resolve("src/content/articles");
const locales = ["it", "en", "fr", "de", "es"];
const reviewDate = "2026-11-01";

const intentByType = {
  explainer: "informational",
  procedure: "task",
  measurement: "evaluation",
  troubleshooting: "diagnosis",
  maintenance: "task",
};

const genericAnchors = new Set([
  "qui",
  "questa guida",
  "questa pagina",
  "this guide",
  "this page",
  "ce guide",
  "cette page",
  "diese anleitung",
  "diese seite",
  "esta guía",
  "esta página",
]);

const plain = (value) =>
  value
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/\*\*|__|\*|_|`/g, "")
    .replace(/&nbsp;|&amp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const primaryFromTitle = (title) => {
  const separator = title.lastIndexOf(": ");
  const lead = (separator > 0 ? title.slice(0, separator) : title).trim();
  return lead.length >= 3 ? lead : title.trim();
};

const limitAnswer = (text) => {
  if (text.length <= 900) return text;
  const sentences = text.match(/[^.!?]+[.!?]+(?:\s|$)/g) || [text];
  let result = "";
  for (const sentence of sentences) {
    if ((result + sentence).trim().length > 900) break;
    result += sentence;
  }
  return result.trim() || `${text.slice(0, 897).trim()}…`;
};

const catalog = {};
for (const lang of locales) {
  catalog[lang] = {};
  for (const file of fs
    .readdirSync(path.join(root, lang))
    .filter((name) => name.endsWith(".md"))
    .sort()) {
    const source = fs.readFileSync(path.join(root, lang, file), "utf8");
    const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]+)$/);
    if (!match) throw new Error(`Missing frontmatter: ${lang}/${file}`);
    catalog[lang][file.slice(0, -3)] = {
      frontmatter: match[1],
      body: match[2],
      data: YAML.parse(match[1]),
    };
  }
}

for (const lang of locales) {
  for (const [id, entry] of Object.entries(catalog[lang])) {
    const { data } = entry;
    if (
      data.primaryKeyword &&
      data.answer &&
      data.searchIntent &&
      data.updated === reviewDate
    )
      continue;
    const primaryKeyword = primaryFromTitle(data.title);
    const paragraphs = entry.body
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
    const answerIndex = paragraphs.findIndex(
      (paragraph) =>
        !/^#{1,6}\s/.test(paragraph) &&
        !/^(?:[-*+] |\d+\. |\|)/.test(paragraph),
    );
    if (answerIndex < 0) throw new Error(`No answer paragraph: ${lang}/${id}`);

    const firstParagraph = paragraphs[answerIndex];
    const answer = limitAnswer(plain(firstParagraph));
    const withoutAnswer = paragraphs
      .filter((_, index) => index !== answerIndex)
      .join("\n\n");
    const hasLinks = /\[[^\]]+\]\([^)]+\)/.test(firstParagraph);
    const remainingLinks =
      withoutAnswer.match(/\]\(\.\.\/[a-z0-9-]+\/\)/g)?.length || 0;
    const removeAnswerParagraph =
      !hasLinks && answer === plain(firstParagraph) && remainingLinks >= 2;
    const body = `${removeAnswerParagraph ? withoutAnswer : entry.body.trim()}\n`;

    const anchorKeywords = [...body.matchAll(/\[([^\]]+)\]\(\.\.\/[^)]+\)/g)]
      .map((match) => plain(match[1]).replace(/[.:;!?]+$/, ""))
      .filter(
        (value) =>
          value.length >= 3 &&
          value.length <= 64 &&
          !genericAnchors.has(value.toLocaleLowerCase(lang)),
      );
    const relatedKeywords = data.related.flatMap((relatedId) => {
      const related = catalog[lang][relatedId];
      return related ? [primaryFromTitle(related.data.title)] : [];
    });
    const candidates = [...anchorKeywords, ...relatedKeywords]
      .filter(
        (value, index, values) =>
          values.findIndex(
            (other) =>
              other.toLocaleLowerCase(lang) === value.toLocaleLowerCase(lang),
          ) === index,
      )
      .filter(
        (value) =>
          value.toLocaleLowerCase(lang) !==
          primaryKeyword.toLocaleLowerCase(lang),
      );
    const secondaryKeywords = candidates.slice(0, 4);
    if (secondaryKeywords.length < 2)
      throw new Error(`Too few secondary keywords: ${lang}/${id}`);

    let frontmatter = entry.frontmatter
      .replace(/^primaryKeyword:.*(?:\n(?:\s{2,}|  - ).*)*\n?/gm, "")
      .replace(/^secondaryKeywords:.*(?:\n\s{2,}.*)*\n?/gm, "")
      .replace(/^searchIntent:.*\n?/gm, "")
      .replace(/^answer:.*\n?/gm, "")
      .replace(/^updated:.*$/m, `updated: "${reviewDate}"`);
    frontmatter = frontmatter.replace(
      /^description:.*$/m,
      (line) =>
        `${line}\nprimaryKeyword: ${JSON.stringify(primaryKeyword)}\nsecondaryKeywords: ${JSON.stringify(secondaryKeywords)}\nsearchIntent: ${JSON.stringify(intentByType[data.guideType])}\nanswer: ${JSON.stringify(answer)}`,
    );

    fs.writeFileSync(
      path.join(root, lang, `${id}.md`),
      `---\n${frontmatter}\n---\n\n${body.replace(/^\n+/, "")}`,
    );
  }
}

const strategyRows = [];
for (const id of Object.keys(catalog.en).sort()) {
  const localized = Object.fromEntries(
    locales.map((lang) => {
      const source = fs.readFileSync(path.join(root, lang, `${id}.md`), "utf8");
      const match = source.match(/^---\n([\s\S]*?)\n---\n/);
      return [lang, YAML.parse(match[1])];
    }),
  );
  const escape = (value) =>
    String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
  const cell = (lang) =>
    `**${escape(localized[lang].primaryKeyword)}**<br>${localized[lang].secondaryKeywords.map(escape).join("; ")}`;
  const links = [
    localized.en.prerequisites.length
      ? `pre: ${localized.en.prerequisites.join(", ")}`
      : null,
    localized.en.next.length ? `next: ${localized.en.next.join(", ")}` : null,
    `related: ${localized.en.related.join(", ")}`,
  ]
    .filter(Boolean)
    .join("<br>");
  strategyRows.push(
    `| \`${id}\` | ${localized.en.guideType}<br>${localized.en.searchIntent} | ${links} | ${cell("it")} | ${cell("en")} | ${cell("fr")} | ${cell("de")} | ${cell("es")} |`,
  );
}

const strategy = `# Strategia editoriale e SEO/GEO delle guide

Data di revisione: 1 novembre 2026. Ambito: 76 argomenti, 5 lingue, 380 file Markdown. La tabella finale è generata dagli stessi metadati pubblicati nelle pagine: ogni ID ha intento, link, keyword principale e 2–5 keyword secondarie localizzate.

## Obiettivo

Aiutare chi registra, misura, diagnostica, mantiene o confeziona una cassetta a completare un compito reale con meno tentativi. La crescita organica è una conseguenza della copertura e della chiarezza, non il criterio con cui inventare contenuti. La strategia evita pagine intercambiabili: ogni guida deve rispondere a una domanda distinta, mostrare un risultato osservabile e dichiarare ciò che il test non può dimostrare.

Pubblico: principianti che vogliono una prima mixtape affidabile; appassionati che acquistano e mantengono piastre; autori di piccole edizioni; persone che devono distinguere problemi di supporto, trasporto, allineamento, livello e riduzione del rumore.

## Evidenza e metodo

La revisione combina tre livelli:

1. **Fonti dei motori di ricerca.** Google afferma che le best practice SEO restano la base delle proprie funzioni AI, senza markup o file speciali per GEO; i contenuti devono essere indicizzabili, disponibili in testo, collegati internamente e affidabili ([Google Search Central, funzioni AI](https://developers.google.com/search/docs/appearance/ai-features)). La guida people-first richiede competenza dimostrabile, fonti verificabili, informazioni originali e una pagina che soddisfa davvero l'intento ([Google Search Central, contenuti utili](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)). La guida SEO di base raccomanda testi originali e aggiornati, titoli e descrizioni distintivi, struttura leggibile, link con testo utile e assenza di keyword stuffing; chiarisce anche che Google non usa il meta tag \`keywords\` ([Google Search Central, SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)). Bing dichiara che le stesse fondamenta di scansione, indicizzazione e ranking alimentano ricerca e Copilot, e definisce GEO come idoneità del contenuto a essere usato come fonte o citazione, senza garanzia ([Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)). La guida raccomanda struttura HTML semantica, contenuto autosufficiente, definizioni esplicite, risposte vicine alla domanda, fonti, dati strutturati accurati, link scansionabili e aggiornamenti reali.
2. **Analisi delle query e dei SERP.** Sono stati letti risultati italiani per registrazione da computer, misure J-card, Dolby B e diagnosi di suono ovattato/canale debole, più le fonti primarie già registrate per ogni argomento. Le lacune ricorrenti sono: strumenti confusi, toni di prova presentati come riferimenti assoluti, suggerimenti a regolare l'azimut “a orecchio”, misure J-card contraddittorie e assenza di risultati osservabili. La risposta editoriale è un albero decisionale esplicito, non una riscrittura enciclopedica delle fonti.
3. **Verifica del repository.** I contenuti descrivono il comportamento MixtapeForge riscontrato nel codice e nei documenti di progetto, senza trasformare una prova software in una certificazione hardware. Le fonti esterne restano nella sezione “Fonti e approfondimenti” di ogni pagina.

SEO e GEO non autorizzano keyword stuffing, prompt nascosti, pagine generate senza revisione o affermazioni inventate. Il contenuto leggibile è anche la fonte che un sistema generativo può citare: risposta diretta, entità nominate, condizioni, passaggi e limiti devono stare nel testo visibile.

### Segnali raccolti dai SERP

| Query osservata | Intento prevalente | Cosa manca nei risultati | Risposta del sito |
| --- | --- | --- | --- |
| \`come registrare una cassetta dal computer\` | compito | distinzione LINE IN/mic, livello del deck, leader e verifica del riascolto | \`recording-computer\`, \`recording-levels\`, \`before-sending-mixtape\` |
| \`dimensioni J-card cassetta stampa\` | informazione + compito | misure spesso confuse tra foglio, pannello e formato file; scarsa prova fisica | \`j-card-dimensions\`, \`print-j-card\`, \`a4-letter-j-cards\` |
| \`Dolby B registrazione riproduzione\` | informazione | encoder/decoder e doppia codifica trattati superficialmente | \`dolby-b\`, \`dolby-b-c-s-playback\`, \`dull-dolby\` |
| \`cassetta ovattata canale più basso\` | diagnosi | sintomi attribuiti subito ad azimut o componenti non verificati | \`muffled-cassettes\`, \`quiet-channel\`, \`different-decks\` |
| \`taratura piastra cassette senza strumenti\` | compito + diagnosi | tecniche “a orecchio” confuse con misure assolute | \`calibration-basics\`, \`without-reference-tape\`, \`calibration-tapes\` |

Queste query non sono volumi di ricerca certificati: sono campioni di intento e vocabolario. Prima di creare una pagina nuova, vanno verificati domanda reale, copertura esistente e disponibilità di una fonte o esperienza che giustifichi un contenuto migliore. Search Console e Webmaster Tools devono fornire in seguito le evidenze quantitative.

Ricerche browser osservate il 1 novembre 2026:

- [registrazione da computer](https://search.brave.com/search?q=come+registrare+una+cassetta+dal+computer+guida&source=web&country=it)
- [misure J-card](https://search.brave.com/search?q=dimensioni+j+card+cassetta+stampa+mm&source=web&country=it)
- [Dolby B](https://search.brave.com/search?q=Dolby+B+cassetta+come+funziona+registrazione+riproduzione&source=web&country=it)
- [diagnosi del suono ovattato](https://search.brave.com/search?q=cassetta+si+sente+ovattata+canale+piu+basso+come+capire&source=web&country=it)
- [taratura della piastra](https://search.brave.com/search?q=taratura+piastra+cassette+come+fare+senza+strumenti&source=web&country=it)

## Architettura dei contenuti

La home indirizza tre percorsi di prodotto. La libreria articoli offre quattro percorsi di apprendimento e la ricerca locale. Ogni guida appartiene a un cluster tematico e usa lo stesso ID nelle cinque lingue:

| Cluster | Domanda del lettore | Guide pilastro |
| --- | --- | --- |
| Registrazione | Come preparo e incido il nastro? | \`cassette-types\`, \`recording-computer\`, \`recording-levels\`, \`cassette-mixtape\` |
| Copertine | Come progetto, stampo e confeziono? | \`j-card-dimensions\`, \`print-j-card\`, \`cover-typography\`, \`release-packaging\` |
| Calibrazione | Come misuro senza attribuire il difetto allo stadio sbagliato? | \`calibration-basics\`, \`calibration-tapes\`, \`loopback-round-trip\`, \`nak-t100-practical-guide\` |
| Riduzione del rumore | Quale codifica è stata usata e quale decodifica serve? | \`dolby-b\`, \`dolby-b-c-s-playback\`, \`dbx-noise-reduction\`, \`software-noise-reduction\` |
| Diagnostica | Come isolo il problema con prove ripetibili? | \`needs-calibration\`, \`different-decks\`, \`muffled-cassettes\`, \`quiet-channel\` |
| Manutenzione e trasporto | Come evito danni e verifico la meccanica? | \`clean-cassette-deck\`, \`tape-eating\`, \`wobbly-playback\`, \`buying-used-deck\` |

La struttura non crea una pagina separata per ogni sinonimo. Un argomento e le sue sfumature restano nella pagina che soddisfa meglio l'intento; i sinonimi entrano nel lessico, nelle domande e nei metadati solo quando descrivono davvero il contenuto.

## Struttura comune

Ogni pagina contiene:

1. titolo con entità e compito, senza toni sensazionalistici;
2. descrizione autonoma, concreta e lunga al massimo circa 160 caratteri;
3. **risposta in breve** visibile, priva di dipendenze dal resto della pagina;
4. prerequisiti solo quando sono necessari, poi procedura o analisi differenziale;
5. sezioni H2 che seguono le decisioni del lettore, non la forma “cos'è / perché / conclusione”;
6. 2–5 link contestuali con testo di destinazione descrittivo;
7. risultato, controllo finale e limite esplicito della prova;
8. fonti primarie o documentazione del produttore;
9. passi successivi e 2–5 guide correlate;
10. metadati coerenti tra lingue per intento, relazioni e tipo di guida.

Il testo può essere breve: non esiste una lunghezza preferita dai motori di ricerca. Una procedura si estende quanto serve a evitare un errore; una definizione può chiudersi appena il concetto è chiaro. I casi numerici sono dichiarati ipotetici o collegati a una procedura documentata, mai presentati come prestazioni misurate dal progetto.

## Template per intento

| Tipo | Apertura | Corpo | Chiusura |
| --- | --- | --- | --- |
| \`explainer\` | definizione in una frase | distinzioni, esempio, conseguenza pratica, limiti | guida operativa o confronto successivo |
| \`procedure\` | risultato ottenibile | occorrente, collegamenti, impostazioni, passi numerati, controllo | prova fisica e passo successivo |
| \`measurement\` | cosa viene misurato | riferimento, catena, livello, lettura, ripetizione, interpretazione | incertezza e diagnosi successiva |
| \`troubleshooting\` | sintomo e prima azione sicura | cause probabili, test che le separa, rami decisionali | quando fermarsi e chiedere assistenza |
| \`maintenance\` | rischio da evitare | manuale, materiali, accesso, procedura, asciugatura | controllo e condizioni per non procedere |

## Keyword

La keyword principale è l'entità o il compito che identifica la pagina. Le secondarie coprono dubbi e passaggi realmente presenti nel testo. Non vengono ripetute meccanicamente: titolo, risposta, H2 e link usano variazione naturale. I campi \`primaryKeyword\` e \`secondaryKeywords\` sono usati anche dalla ricerca interna; non esiste un meta \`keywords\` o una pagina nascosta destinata ai crawler.

Per ogni nuovo contenuto:

1. formulare una domanda di ricerca e un risultato atteso;
2. verificare che nessun ID esistente soddisfi già lo stesso intento;
3. raccogliere vocabolario da fonti, manuali e domande reali;
4. scegliere una principale e 2–5 secondarie che il corpo possa sostenere;
5. decidere tipo, prerequisiti, prossimo passo e relazioni;
6. cercare il link contestuale nel punto in cui il lettore ha bisogno del concetto.

## Link interni

Il grafo usa quattro livelli:

- \`prerequisites\`: conoscenza necessaria prima della procedura;
- link contestuali nel corpo: spiegazione nel punto d'uso;
- \`next\`: il passo che porta a termine il lavoro;
- \`related\`: alternative o approfondimenti non richiesti per procedere.

I link devono essere normali elementi HTML \`<a href>\`, con testo utile anche fuori dal paragrafo. Il template produce URL relativi alla lingua corrente; i controlli verificano destinazioni, ancore, parità tra traduzioni, assenza di cicli nei prerequisiti e almeno un link entrante per ogni guida. Evitare “clicca qui”, link duplicati nello stesso paragrafo e catene profonde che non aggiungono informazione.

## GEO operativo

GEO, in questa strategia, significa rendere i contenuti facili da recuperare, capire, verificare e citare:

- definire l'entità al primo uso;
- mettere la risposta prima del contesto;
- separare fatti, procedure, esempi e limiti con parole esplicite;
- mantenere un titolo e un intento per pagina;
- indicare strumenti, formati, unità e condizioni di misura;
- usare elenchi numerati per sequenze e tabelle solo per confronti;
- collegare fonti primarie e pagine interne pertinenti;
- aggiornare la data solo quando cambia il contenuto;
- allineare dati strutturati e testo visibile;
- consentire scansione e rendering del contenuto principale.

Non sono previsti file \`llms.txt\`, prompt per modelli, keyword invisibili o dati strutturati speciali: Google dichiara di non richiederli e Bing richiede accuratezza del markup. I dati \`BlogPosting\` includono titolo, descrizione, lingua, sezione, sintesi, modifiche, fonti, entità e pagina principale.

## Misura

Le metriche primarie sono soddisfazione rispetto al compito e copertura qualificata, non solo clic. Monitorare in Search Console impression, query e CTR; in Bing Webmaster Tools citazioni e visibilità AI quando disponibili; sul sito completamento delle guide, ricerche senza risultato e ritorni alla ricerca esterna. Ogni calo va segmentato per cluster, lingua, intento e tipo di query prima di riscrivere.

Revisione minima annuale o quando cambiano software, fonti o specifiche. Le pagine con dati hardware sono più sensibili all'obsolescenza e devono riportare la data reale dell'ultima verifica editoriale.

## Strategie per argomento

Le celle localizzate riportano prima la keyword principale in grassetto, poi le secondarie. La colonna dei link è identica nelle cinque lingue.

| ID | Tipo / intento | Collegamenti | Italiano | English | Français | Deutsch | Español |
| --- | --- | --- | --- | --- | --- | --- | --- |
${strategyRows.join("\n")}
`;

fs.writeFileSync("ARTICLE_STRATEGY.md", strategy);

console.log(
  `Updated ${locales.length * Object.keys(catalog.en).length} articles and wrote ARTICLE_STRATEGY.md`,
);
