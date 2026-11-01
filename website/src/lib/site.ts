export const locales = ["en", "it", "fr", "de", "es"] as const;
export type Locale = (typeof locales)[number];
export const languageNames: Record<Locale, string> = {
  en: "English",
  it: "Italiano",
  fr: "Français",
  de: "Deutsch",
  es: "Español",
};
export const brand = "MixtapeForge";
export const homeMetadata: Record<
  Locale,
  { title: string; description: string }
> = {
  en: {
    title: `${brand} — Cassette Recording, Calibration & J-Cards`,
    description:
      "Make cassette mixtapes from local music files, check your deck and tape setup, and print J-card covers. Free, open-source desktop software with local audio processing.",
  },
  it: {
    title: `${brand} — Registra cassette, calibra e crea copertine`,
    description:
      "Crea mixtape su cassetta dai tuoi file audio, verifica la catena di registrazione e stampa copertine J-card. Software desktop gratuito e open source, con audio locale.",
  },
  fr: {
    title: `${brand} — Enregistrement cassette, calibrage et jaquettes`,
    description:
      "Créez des mixtapes sur cassette, vérifiez votre chaîne d’enregistrement et imprimez des jaquettes. Logiciel de bureau gratuit et open source avec traitement audio local.",
  },
  de: {
    title: `${brand} — Kassetten aufnehmen, einmessen und Inlays drucken`,
    description:
      "Erstelle Kassetten-Mixtapes aus deinen Audiodateien, prüfe deine Aufnahmekette und drucke J-Cards. Kostenlose Open-Source-Desktopsoftware mit lokaler Audioverarbeitung.",
  },
  es: {
    title: `${brand} — Graba cassettes, calibra y crea carátulas`,
    description:
      "Crea mixtapes en cassette con tus archivos de audio, comprueba la cadena de grabación e imprime carátulas. Software de escritorio gratuito y de código abierto con audio local.",
  },
};
export const repository = __REPOSITORY_URL__;
export const paypalUrl = "https://www.paypal.com/paypalme/lucasciacca93";
export const asset = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
export const route = (lang: Locale, path = "") =>
  asset(`${lang}/${path}${path && !path.endsWith("/") ? "/" : ""}`);
export const absolute = (path: string, site?: URL) =>
  site ? new URL(path, site).href : undefined;
export const categories = [
  "recording",
  "calibration",
  "noise-reduction",
  "troubleshooting",
  "covers",
  "culture",
] as const;
export type Category = (typeof categories)[number];
export const categoryFeature = (category: string) =>
  category === "covers" || category === "culture"
    ? "features/j-card-maker"
    : category === "calibration" || category === "troubleshooting"
      ? "features/calibration"
      : "features/recording";
export const priorityArticles = [
  "recording-computer",
  "cassette-mixtape",
  "recording-levels",
  "cassette-types",
  "dolby-b",
  "hx-pro",
  "calibration-basics",
  "calibration-tapes",
  "wow-flutter",
  "muffled-cassettes",
  "j-card-dimensions",
  "print-j-card",
  "j-card-wrong-size",
  "playback-compatibility",
];
export const ui = {
  en: {
    nav: ["Recording", "Calibration", "J-cards", "Articles"],
    download: "Get the app",
    home: "Home",
    menu: "Menu",
    language: "Language",
    skip: "Skip to content",
    eyebrow: "YOUR MUSIC. TWO SIDES. ONE CASSETTE.",
    hero: "Good music.\nMade physical.",
    intro:
      "Make room for your favourite songs. Arrange both sides, prepare your recording and make a cover worth keeping.",
    primary: "Meet MixtapeForge",
    secondary: "Make your first mixtape",
    status: "Open source · Local audio · Desktop prototype",
    journey: "From a folder of songs to a tape you can hold.",
    journeyText:
      "Three workspaces. One project. Your music stays on your computer.",
    featureTitles: [
      "Build your mixtape",
      "Get to know your deck",
      "Give it a cover",
    ],
    featureTexts: [
      "Plan side A and side B, set the gaps and check your levels before you press REC.",
      "Record a test, capture the playback and save a profile for your deck and tape.",
      "Choose a style, add the tracklist and print your J-card at the right size.",
    ],
    explore: "Explore the workspace",
    read: "At the workbench",
    readText: "Practical guides for the next tape you make.",
    allArticles: "All articles",
    articleIntro:
      "Useful answers for people who actually make tapes. Start with your setup, your next recording or a problem you can hear.",
    search: "Search guides",
    searchPlaceholder: "Dolby, levels, printing…",
    all: "All topics",
    noResults: "No matching guides. Try another word or topic.",
    results: "guides",
    updated: "Updated",
    minutes: "min read",
    contents: "In this guide",
    sources: "Sources & further reading",
    related: "Keep exploring",
    ctaTitle: "Put it into practice.",
    ctaText:
      "Explore the workspace and see which steps MixtapeForge can help with.",
    cta: "See the feature",
    footer: "For the songs you want to keep.",
    footerText: "A local, open-source workbench for recording real cassettes.",
    supportTitle: "Support MixtapeForge",
    supportText:
      "If MixtapeForge is useful to you, buy me a coffee via PayPal. Your support helps cover the time I put into the project and gives me a concrete signal of community interest.",
    supportCta: "Buy me a coffee via PayPal",
    privacy: "Privacy & licenses",
    about: "About the project",
    compatibility: "Compatibility",
    changelog: "Changelog",
    gettingStarted: "Getting started",
    repository: "Source on GitHub",
    repositoryPending:
      "Repository link will appear when this project is connected to GitHub.",
    back: "Back to articles",
    notFound: "This side is blank.",
    notFoundText:
      "The page you are looking for is not here. Try the home page or browse the guides.",
    footerNote:
      "Dolby and other product names belong to their respective owners. No affiliation or certification is implied.",
    editorial: "MixtapeForge editorial team",
    category: {
      recording: "Recording",
      calibration: "Calibration",
      "noise-reduction": "Noise reduction",
      troubleshooting: "Troubleshooting",
      covers: "J-cards & printing",
      culture: "Mixtape culture",
    },
  },
  it: {
    nav: ["Registrazione", "Calibrazione", "Copertine", "Articoli"],
    download: "Ottieni l’app",
    home: "Home",
    menu: "Menu",
    language: "Lingua",
    skip: "Vai al contenuto",
    eyebrow: "LA TUA MUSICA. DUE LATI. UNA CASSETTA.",
    hero: "La musica che ami.\nDa tenere in mano.",
    intro:
      "Fai spazio ai tuoi brani preferiti. Prepara i due lati, controlla la registrazione e crea una copertina da conservare.",
    primary: "Scopri MixtapeForge",
    secondary: "La tua prima mixtape",
    status: "Open source · Audio locale · Prototipo desktop",
    journey: "Da una cartella di brani a una cassetta tutta tua.",
    journeyText:
      "Tre spazi di lavoro. Un progetto. La musica resta sul tuo computer.",
    featureTitles: [
      "Prepara la mixtape",
      "Conosci la tua piastra",
      "Crea la copertina",
    ],
    featureTexts: [
      "Organizza lato A e lato B, scegli le pause e controlla i livelli prima di premere REC.",
      "Registra una prova, acquisisci il riascolto e salva un profilo per piastra e nastro.",
      "Scegli uno stile, aggiungi la scaletta e stampa la J-card nelle dimensioni corrette.",
    ],
    explore: "Esplora la funzione",
    read: "Sul banco di lavoro",
    readText: "Guide pratiche per la prossima cassetta.",
    allArticles: "Tutti gli articoli",
    articleIntro:
      "Risposte utili per chi le cassette le registra davvero. Parti dai collegamenti, dalla prossima registrazione o da un difetto che senti.",
    search: "Cerca nelle guide",
    searchPlaceholder: "Dolby, livelli, stampa…",
    all: "Tutti gli argomenti",
    noResults:
      "Nessuna guida trovata. Prova un’altra parola o un altro argomento.",
    results: "guide",
    updated: "Aggiornato",
    minutes: "min di lettura",
    contents: "In questa guida",
    sources: "Fonti e approfondimenti",
    related: "Continua a esplorare",
    ctaTitle: "Passa alla pratica.",
    ctaText:
      "Esplora la funzione e scopri in quali passaggi può aiutarti MixtapeForge.",
    cta: "Scopri la funzione",
    footer: "Per la musica che vuoi conservare.",
    footerText:
      "Uno strumento locale e open source per registrare cassette vere.",
    supportTitle: "Sostieni MixtapeForge",
    supportText:
      "Se MixtapeForge ti è utile, offrimi un caffè su PayPal. Il tuo contributo aiuta a sostenere il tempo dedicato al progetto e mi dà un segnale concreto dell’interesse della community.",
    supportCta: "Offrimi un caffè",
    privacy: "Privacy e licenze",
    about: "Il progetto",
    compatibility: "Compatibilità",
    changelog: "Novità",
    gettingStarted: "Per iniziare",
    repository: "Codice su GitHub",
    repositoryPending:
      "Il link al repository apparirà quando il progetto sarà collegato a GitHub.",
    back: "Torna agli articoli",
    notFound: "Questo lato è vuoto.",
    notFoundText:
      "La pagina cercata non è qui. Torna alla home o sfoglia le guide.",
    footerNote:
      "Dolby e gli altri nomi di prodotto appartengono ai rispettivi titolari. Nessuna affiliazione o certificazione è implicita.",
    editorial: "Redazione MixtapeForge",
    category: {
      recording: "Registrazione",
      calibration: "Calibrazione",
      "noise-reduction": "Riduzione del rumore",
      troubleshooting: "Problemi e soluzioni",
      covers: "Copertine e stampa",
      culture: "Cultura mixtape",
    },
  },
  fr: {
    nav: ["Enregistrement", "Calibration", "Jaquettes", "Articles"],
    download: "Obtenir l’application",
    home: "Accueil",
    menu: "Menu",
    language: "Langue",
    skip: "Aller au contenu",
    eyebrow: "VOTRE MUSIQUE. DEUX FACES. UNE CASSETTE.",
    hero: "La musique qu’on aime.\nEntre les mains.",
    intro:
      "Faites une place à vos morceaux préférés. Préparez les deux faces, vérifiez l’enregistrement et créez une jaquette à conserver.",
    primary: "Découvrir MixtapeForge",
    secondary: "Votre première mixtape",
    status: "Open source · Audio local · Prototype de bureau",
    journey: "D’un dossier de morceaux à une cassette bien à vous.",
    journeyText:
      "Trois espaces de travail. Un projet. Votre musique reste sur votre ordinateur.",
    featureTitles: [
      "Préparez votre mixtape",
      "Apprenez à connaître votre platine",
      "Créez sa jaquette",
    ],
    featureTexts: [
      "Organisez les faces A et B, réglez les pauses et vérifiez les niveaux avant REC.",
      "Enregistrez un test, capturez la lecture et conservez un profil pour la platine et la bande.",
      "Choisissez un style, ajoutez la liste des titres et imprimez à la bonne taille.",
    ],
    explore: "Explorer la fonction",
    read: "Sur l’établi",
    readText: "Des guides pratiques pour votre prochaine cassette.",
    allArticles: "Tous les articles",
    articleIntro:
      "Des réponses utiles pour ceux qui enregistrent vraiment des cassettes. Commencez par les branchements, votre prochain enregistrement ou un défaut audible.",
    search: "Rechercher un guide",
    searchPlaceholder: "Dolby, niveaux, impression…",
    all: "Tous les sujets",
    noResults: "Aucun guide trouvé. Essayez un autre mot ou sujet.",
    results: "guides",
    updated: "Mis à jour",
    minutes: "min de lecture",
    contents: "Dans ce guide",
    sources: "Sources et lectures complémentaires",
    related: "Pour aller plus loin",
    ctaTitle: "Passez à la pratique.",
    ctaText:
      "Découvrez les étapes que MixtapeForge peut vous aider à préparer.",
    cta: "Découvrir la fonction",
    footer: "Pour la musique que vous voulez garder.",
    footerText:
      "Un atelier local et open source pour enregistrer de vraies cassettes.",
    supportTitle: "Soutenir MixtapeForge",
    supportText:
      "Si MixtapeForge vous est utile, offrez-moi un café via PayPal. Votre soutien contribue au temps consacré au projet et me donne un signal concret de l’intérêt de la communauté.",
    supportCta: "Offrez-moi un café",
    privacy: "Confidentialité et licences",
    about: "Le projet",
    compatibility: "Compatibilité",
    changelog: "Nouveautés",
    gettingStarted: "Bien démarrer",
    repository: "Code sur GitHub",
    repositoryPending:
      "Le lien du dépôt apparaîtra une fois le projet connecté à GitHub.",
    back: "Retour aux articles",
    notFound: "Cette face est vierge.",
    notFoundText:
      "Cette page est introuvable. Consultez l’accueil ou les guides.",
    footerNote:
      "Dolby et les autres noms de produits appartiennent à leurs propriétaires respectifs. Aucune affiliation ni certification n’est implicite.",
    editorial: "Équipe éditoriale MixtapeForge",
    category: {
      recording: "Enregistrement",
      calibration: "Calibration",
      "noise-reduction": "Réduction du bruit",
      troubleshooting: "Dépannage",
      covers: "Jaquettes et impression",
      culture: "Culture mixtape",
    },
  },
  de: {
    nav: ["Aufnehmen", "Einmessen", "Inlays", "Artikel"],
    download: "Zur Anwendung",
    home: "Startseite",
    menu: "Menü",
    language: "Sprache",
    skip: "Zum Inhalt",
    eyebrow: "DEINE MUSIK. ZWEI SEITEN. EINE KASSETTE.",
    hero: "Lieblingsmusik.\nZum Anfassen.",
    intro:
      "Gib deinen Lieblingssongs einen Platz. Plane beide Seiten, bereite die Aufnahme vor und gestalte ein Inlay zum Aufbewahren.",
    primary: "MixtapeForge entdecken",
    secondary: "Dein erstes Mixtape",
    status: "Open Source · Lokales Audio · Desktop-Prototyp",
    journey: "Vom Musikordner zur eigenen Kassette.",
    journeyText:
      "Drei Arbeitsbereiche. Ein Projekt. Deine Musik bleibt auf deinem Computer.",
    featureTitles: [
      "Dein Mixtape zusammenstellen",
      "Dein Deck kennenlernen",
      "Ein Inlay gestalten",
    ],
    featureTexts: [
      "Plane Seite A und B, lege Pausen fest und prüfe die Pegel vor REC.",
      "Nimm einen Test auf, erfasse die Wiedergabe und speichere ein Profil für Deck und Band.",
      "Wähle einen Stil, ergänze die Titelliste und drucke das Inlay in Originalgröße.",
    ],
    explore: "Funktion entdecken",
    read: "An der Werkbank",
    readText: "Praktische Anleitungen für deine nächste Kassette.",
    allArticles: "Alle Artikel",
    articleIntro:
      "Hilfreiche Antworten für alle, die selbst Kassetten aufnehmen. Beginne bei den Anschlüssen, der nächsten Aufnahme oder einem hörbaren Problem.",
    search: "Anleitungen suchen",
    searchPlaceholder: "Dolby, Pegel, Drucken…",
    all: "Alle Themen",
    noResults:
      "Keine passende Anleitung. Versuche ein anderes Wort oder Thema.",
    results: "Anleitungen",
    updated: "Aktualisiert",
    minutes: "Min. Lesezeit",
    contents: "In dieser Anleitung",
    sources: "Quellen und weiterführende Informationen",
    related: "Weiterlesen",
    ctaTitle: "Jetzt praktisch werden.",
    ctaText: "Entdecke, bei welchen Schritten MixtapeForge dir helfen kann.",
    cta: "Zur Funktion",
    footer: "Für Musik, die du behalten möchtest.",
    footerText:
      "Eine lokale Open-Source-Werkbank für echte Kassettenaufnahmen.",
    supportTitle: "MixtapeForge unterstützen",
    supportText:
      "Wenn dir MixtapeForge hilft, spendier mir einen Kaffee über PayPal. Deine Unterstützung hilft, die Zeit für das Projekt zu finanzieren, und zeigt mir konkretes Interesse aus der Community.",
    supportCta: "Einen Kaffee spendieren",
    privacy: "Datenschutz und Lizenzen",
    about: "Das Projekt",
    compatibility: "Kompatibilität",
    changelog: "Änderungen",
    gettingStarted: "Erste Schritte",
    repository: "Quellcode auf GitHub",
    repositoryPending:
      "Der Repository-Link erscheint, sobald das Projekt mit GitHub verbunden ist.",
    back: "Zurück zu den Artikeln",
    notFound: "Diese Seite ist leer.",
    notFoundText:
      "Die gesuchte Seite ist hier nicht zu finden. Besuche die Startseite oder die Anleitungen.",
    footerNote:
      "Dolby und andere Produktnamen gehören ihren jeweiligen Eigentümern. Es besteht keine behauptete Verbindung oder Zertifizierung.",
    editorial: "MixtapeForge-Redaktion",
    category: {
      recording: "Aufnehmen",
      calibration: "Einmessen",
      "noise-reduction": "Rauschunterdrückung",
      troubleshooting: "Fehlersuche",
      covers: "Inlays und Druck",
      culture: "Mixtape-Kultur",
    },
  },
  es: {
    nav: ["Grabación", "Calibración", "Carátulas", "Artículos"],
    download: "Obtener la aplicación",
    home: "Inicio",
    menu: "Menú",
    language: "Idioma",
    skip: "Saltar al contenido",
    eyebrow: "TU MÚSICA. DOS CARAS. UN CASSETTE.",
    hero: "La música que quieres.\nEn tus manos.",
    intro:
      "Haz sitio a tus canciones favoritas. Prepara ambas caras, comprueba la grabación y crea una carátula para conservar.",
    primary: "Descubre MixtapeForge",
    secondary: "Tu primera mixtape",
    status: "Código abierto · Audio local · Prototipo de escritorio",
    journey: "De una carpeta de canciones a tu propio cassette.",
    journeyText:
      "Tres espacios de trabajo. Un proyecto. Tu música se queda en tu ordenador.",
    featureTitles: [
      "Prepara tu mixtape",
      "Conoce tu pletina",
      "Dale una carátula",
    ],
    featureTexts: [
      "Organiza las caras A y B, ajusta las pausas y comprueba los niveles antes de REC.",
      "Graba una prueba, captura la reproducción y guarda un perfil para tu pletina y cinta.",
      "Elige un estilo, añade las canciones e imprime la carátula al tamaño correcto.",
    ],
    explore: "Explorar la función",
    read: "En el banco de trabajo",
    readText: "Guías prácticas para tu próximo cassette.",
    allArticles: "Todos los artículos",
    articleIntro:
      "Respuestas útiles para quienes graban cassettes de verdad. Empieza por las conexiones, tu próxima grabación o un problema que puedas oír.",
    search: "Buscar guías",
    searchPlaceholder: "Dolby, niveles, impresión…",
    all: "Todos los temas",
    noResults: "No hay guías coincidentes. Prueba otra palabra o tema.",
    results: "guías",
    updated: "Actualizado",
    minutes: "min de lectura",
    contents: "En esta guía",
    sources: "Fuentes y lecturas",
    related: "Sigue explorando",
    ctaTitle: "Llévalo a la práctica.",
    ctaText: "Descubre en qué pasos puede ayudarte MixtapeForge.",
    cta: "Ver la función",
    footer: "Para la música que quieres conservar.",
    footerText:
      "Un taller local y de código abierto para grabar cassettes reales.",
    supportTitle: "Apoya MixtapeForge",
    supportText:
      "Si MixtapeForge te resulta útil, invítame a un café por PayPal. Tu apoyo ayuda a sostener el tiempo dedicado al proyecto y me da una señal concreta del interés de la comunidad.",
    supportCta: "Invítame a un café",
    privacy: "Privacidad y licencias",
    about: "El proyecto",
    compatibility: "Compatibilidad",
    changelog: "Novedades",
    gettingStarted: "Primeros pasos",
    repository: "Código en GitHub",
    repositoryPending:
      "El enlace al repositorio aparecerá cuando el proyecto se conecte a GitHub.",
    back: "Volver a los artículos",
    notFound: "Esta cara está en blanco.",
    notFoundText: "No encontramos esta página. Visita el inicio o las guías.",
    footerNote:
      "Dolby y los demás nombres de productos pertenecen a sus respectivos propietarios. No se implica afiliación ni certificación.",
    editorial: "Equipo editorial de MixtapeForge",
    category: {
      recording: "Grabación",
      calibration: "Calibración",
      "noise-reduction": "Reducción de ruido",
      troubleshooting: "Problemas y soluciones",
      covers: "Carátulas e impresión",
      culture: "Cultura mixtape",
    },
  },
};
