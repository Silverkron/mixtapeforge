import type { Scene } from "../lib/image-scenes";
import type { Locale } from "../lib/site";
import { localizedPages } from "./localized-pages";
export const pageKeys = [
  "features/recording",
  "features/calibration",
  "features/j-card-maker",
  "download",
  "getting-started",
  "compatibility",
  "about",
  "changelog",
  "privacy",
] as const;
export type PageKey = (typeof pageKeys)[number];
export type Page = {
  title: string;
  lead: string;
  image?: Scene;
  sections: { title: string; text: string; items?: string[] }[];
};
type Pages = Record<PageKey, Page>;
export const pages: Record<Locale, Pages> = {
  ...localizedPages,
  en: {
    "features/recording": {
      title: "Make a mixtape. Record a real cassette.",
      lead: "Prepare both sides in one project, then send the music to your cassette deck. You choose the songs. Your deck does the recording.",
      image: "recording",
      sections: [
        {
          title: "Start with side A. Make room for side B.",
          text: "Import your audio files, drag tracks between sides and check the time left. Set gaps, trim a track or add a fade without rebuilding the whole playlist.",
        },
        {
          title: "Check the sound before REC.",
          text: "Use level normalization, a ten-band EQ and compression when you need them. Genre presets are starting points; you can adjust the bands yourself. Meters and the spectrum help you see what is leaving the app.",
        },
        {
          title: "Your computer plays. Your deck records.",
          text: "Select the output connected to LINE IN, make a short level check and press REC on the deck. Start the prepared side in the app after allowing for the non-recordable leader. Pause and stop remain close to the transport.",
        },
        {
          title: "Optional tools, clear limits.",
          text: "The desktop app includes optional Type B software encoding and one stereo VST3 effect slot. External plugins are installed separately. Type B needs correct level matching and hardware playback checks; it is not a certified replacement for every Dolby B encoder. Dolby C, S and dbx encoding are not integrated.",
        },
      ],
    },
    "features/calibration": {
      title: "Get to know your deck and tape.",
      lead: "One guided recording and capture helps you understand the complete signal path and save a useful recording profile.",
      image: "calibration",
      sections: [
        {
          title: "Record the test.",
          text: "Choose the output and supported sample rate. With noise reduction off, record the roughly 108-second sequence onto the tape you want to use. The countdown helps you coordinate the start; the tape must be beyond its leader.",
        },
        {
          title: "Capture the playback.",
          text: "Choose the input connected to the deck’s LINE OUT, check the incoming levels and capture the recorded sequence, or import a suitable stereo WAV. Progress, input meters and spectrum keep the process visible.",
        },
        {
          title: "Read the results and save a profile.",
          text: "Inspect channel response, noise, balance, crosstalk, level compression and clipping indicators. Save the profile with a prefilled name; deck and tape notes are optional. Conservative corrections are available for suitable results and remain a choice.",
        },
        {
          title: "A profile has a context.",
          text: "Keep the deck, tape, connections and controls consistent when reusing a profile. A round-trip measurement includes recording and playback errors. It cannot independently align playback, repair azimuth or transport faults, or certify wow and flutter, MOL or Dolby compatibility.",
        },
      ],
    },
    "features/j-card-maker": {
      title: "A cover worth keeping.",
      lead: "Finish the tape with a readable tracklist, your own colours and a J-card you can actually print.",
      image: "covers",
      sections: [
        {
          title: "Nine styles. Your colours.",
          text: "Choose from classic studio layouts, rock, pop, synthwave, poster, home-recorded and monochrome designs. Suggested palettes help you begin; four custom colours let you make it yours.",
        },
        {
          title: "Give the songs room.",
          text: "The tracklist follows your two sides. Add a title and recording notes, then choose among six bundled fonts. The current templates accept up to 15 tracks in total across both sides; printing and export are disabled above that limit. Check long titles in the preview because they may be shortened.",
        },
        {
          title: "Print it. Cut it. Fold it.",
          text: "Use the system print dialog or export PDF and SVG. Choose A4, print at 100%, turn off fit-to-page and measure the 50 mm reference on a direct app print. For exported files, check the card’s 104.8 × 101.6 mm dimensions before cutting. Printer margins and the case itself still deserve a test print.",
        },
        {
          title: "Made for home printers, too.",
          text: "Monochrome designs and grayscale output help when a colour printer is not available. The preview and exports share the artwork; SVG keeps editable text with embedded fonts.",
        },
      ],
    },
    download: {
      title: "Bring the workbench to your desktop.",
      lead: "MixtapeForge is an open-source desktop prototype. Audio processing and your project files stay on your computer.",
      sections: [
        {
          title: "Current availability",
          text: "The macOS prototype has been built and tested locally. Windows and Linux have desktop build configuration and CI coverage, but hardware playback and installers still require platform-specific qualification. There is no verified public installer release linked here yet.",
        },
        {
          title: "Build from source",
          text: "Install Node.js 22, stable Rust, CMake and the Tauri prerequisites for your operating system. Linux also needs ALSA development headers. From the repository root, run the commands below. The browser preview does not provide desktop audio or file operations.",
          items: ["npm ci", "npm run desktop", "npm run desktop:build"],
        },
        {
          title: "Before the first recording",
          text: "Connect a suitable audio output to LINE IN on the deck. Keep the starting volume low, make a short test and check the record level on the deck. The application cannot press the physical REC button for you.",
        },
      ],
    },
    "getting-started": {
      title: "Your first tape, from beginning to end.",
      lead: "A practical first session: prepare one side, check the sound, record and make the cover.",
      sections: [
        {
          title: "1. Connect the deck",
          text: "Connect the computer or audio interface output to LINE IN on the cassette deck. For measurement capture, connect LINE OUT to a suitable line input. Start at a moderate listening level and select the intended output in the app.",
        },
        {
          title: "2. Build the two sides",
          text: "Import local audio, choose the cassette length and arrange side A and side B. Leave space for pauses and the non-recordable leader. Listen to the transitions before recording.",
        },
        {
          title: "3. Make a short check",
          text: "Use a loud passage to set the deck’s REC LEVEL without audible overload. Start with processing off; apply normalization or EQ for a reason. If the deck handles Dolby B encoding, do not also encode the same recording in software.",
        },
        {
          title: "4. Record and listen back",
          text: "Move beyond the leader, press REC on the deck and start the side in the app. Keep output and record controls fixed. Record side B, then listen back on the intended player with the appropriate noise-reduction setting.",
        },
        {
          title: "5. Print the J-card",
          text: "Open the cover workspace, add a title and notes, choose a style and check the tracklist. Print at 100% and confirm the reference size before cutting and folding.",
        },
      ],
    },
    compatibility: {
      title: "Know what your setup needs.",
      lead: "A clear distinction between implemented tools, external components and work still being verified.",
      sections: [
        {
          title: "Desktop and browser",
          text: "Native audio, importing, recording preparation and export require the desktop app. The browser view is a visual preview. Supported desktop targets are macOS, Windows and Linux; macOS is the platform tested locally so far.",
        },
        {
          title: "Audio files",
          text: "The engine reads common WAV, FLAC, MP3, Ogg Vorbis and AIFF sources through its decoder. Codec variants and damaged files can still fail: keep the originals and test unusual files before a long recording. Prepared playback uses an internal float32 master.",
        },
        {
          title: "Effects and noise reduction",
          text: "Level processing, compression and a ten-band EQ are integrated. One external stereo VST3 effect can be hosted at a time. The optional Type B helper is included in desktop packaging; Dolby C, Dolby S, dbx and automatic noise-reduction detection are not implemented.",
        },
        {
          title: "Hardware and measurements",
          text: "Use an audio device with a supported stereo output format and sample rate. Profiles describe the measured record/play chain, not independent factory alignment. Physical cassette transport, recording levels and playback settings remain the responsibility of the deck and user.",
        },
        {
          title: "Languages",
          text: "The website is available in English, Italian, French, German and Spanish. The desktop interface currently has Italian, English, French and Spanish translations; German website content does not imply a German app interface.",
        },
      ],
    },
    about: {
      title: "Built for people who make tapes.",
      lead: "A focused, local workbench for turning a collection of songs into a cassette you want to listen to.",
      sections: [
        {
          title: "Why this project exists",
          text: "Preparing a tape often means juggling a player, an audio editor and a separate cover tool. MixtapeForge brings side planning, recording preparation, measurement profiles and J-cards into one desktop project.",
        },
        {
          title: "Open source, local by design",
          text: "The original application code is GPL-3.0-only. Audio processing runs on the computer. Plugins are optional external components. Third-party libraries, fonts and the separate Type B utility retain their own licenses.",
        },
        {
          title: "How we write the guides",
          text: "Articles combine practical workflows, manufacturer documentation and questions from cassette communities. Illustrations are illustrative, not measurement evidence. Technical claims must be read with the deck’s manual and the stated limits; no universal level or correction fits every machine.",
        },
        {
          title: "Editorial status",
          text: "The guide collection is an initial multilingual edition, assisted by generative tools. It has not undergone an independent laboratory or native-language review. No listening test or hardware result is claimed unless an article explicitly documents it. Corrections and reproducible reports are welcome through the repository.",
        },
      ],
    },
    changelog: {
      title: "What is on the workbench.",
      lead: "An honest snapshot of the prototype, separate from signed public releases.",
      sections: [
        {
          title: "Prototype 0.1",
          text: "Two-side planning, local audio preparation, native output, project recovery, level processing, ten-band EQ, compression, an optional Type B encoder, one VST3 effect slot, guided calibration profiles and printable J-cards.",
        },
        {
          title: "Cover and workflow refinements",
          text: "Nine artwork styles, six bundled fonts, custom palettes, grayscale output and system printing. The workspace layout aligns Mixtape, Calibration and Covers.",
        },
        {
          title: "Still being qualified",
          text: "Public installer distribution, signing and notarization, Windows/Linux hardware verification and independent Type B compatibility tests remain separate release work. This page does not announce a finished release.",
        },
      ],
    },
    privacy: {
      title: "Your music stays with you.",
      lead: "No account is needed to read this website. The desktop workbench processes audio locally.",
      sections: [
        {
          title: "This website",
          text: "The public site includes Google Tag Manager container GTM-WLRVCWSR. Tags enabled in that container may collect usage data under Google’s policies. Search and topic filtering run in your browser; there is no account system or third-party font request. Hosting providers may process ordinary request logs, while external links follow the policies of their destination.",
        },
        {
          title: "The desktop app",
          text: "Audio files, rendered masters and saved projects are processed locally. If you choose to install external plugins, their own behavior and terms also apply. Reports you send through GitHub are governed by GitHub’s service policies.",
        },
        {
          title: "Licenses and credits",
          text: "Original application code: GPL-3.0-only. The separately executed Type B utility uses libdolbyb under GPL-2.0-only. Bundled fonts use the SIL Open Font License. See LICENSE and THIRD_PARTY_NOTICES.md in the source for the full terms. Editorial illustrations were generated for this project and are illustrative; equipment artwork does not claim manufacturer approval.",
        },
        {
          title: "Product names",
          text: "Dolby, dbx, VST and other names identify technologies or third-party products. Their use does not imply affiliation, certification or permission to redistribute third-party commercial software.",
        },
      ],
    },
  },
  it: {
    "features/recording": {
      title: "Prepara una mixtape. Registra una cassetta vera.",
      lead: "Organizza i due lati in un progetto e invia la musica alla piastra. Tu scegli i brani, il deck registra sul nastro.",
      image: "recording",
      sections: [
        {
          title: "Un lato alla volta, tutto sotto controllo.",
          text: "Importa i file, trascina i brani tra i lati e controlla il tempo disponibile. Imposta pause, tagli e dissolvenze senza ricostruire la scaletta.",
        },
        {
          title: "Controlla il suono prima di REC.",
          text: "Normalizzazione, EQ a dieci bande e compressione sono disponibili quando servono. I preset di genere sono punti di partenza modificabili. Meter e spettro mostrano il segnale in uscita.",
        },
        {
          title: "Il computer riproduce. La piastra registra.",
          text: "Seleziona l’uscita collegata a LINE IN, fai una breve prova di livello e premi REC sul deck. Porta il nastro oltre il tratto iniziale non registrabile prima di avviare il lato. Pausa e Stop restano vicino ai comandi di trasporto.",
        },
        {
          title: "Strumenti opzionali, limiti chiari.",
          text: "L’app include la codifica software Type B e uno slot per un effetto stereo VST3 esterno. I plugin si installano separatamente. Type B richiede allineamento dei livelli e verifiche sul deck; non è una sostituzione certificata di ogni encoder Dolby B. Dolby C, S e dbx non sono integrati.",
        },
      ],
    },
    "features/calibration": {
      title: "Conosci la tua piastra e il tuo nastro.",
      lead: "Una registrazione guidata e il suo riascolto aiutano a misurare la catena completa e salvare un profilo utile.",
      image: "calibration",
      sections: [
        {
          title: "Registra la prova.",
          text: "Scegli uscita e frequenza supportata. Con NR disattivato, registra la sequenza di circa 108 secondi sul nastro che userai. Il conto alla rovescia aiuta a coordinare la partenza; il nastro deve essere oltre il tratto iniziale non registrabile.",
        },
        {
          title: "Acquisisci il riascolto.",
          text: "Scegli l’ingresso collegato a LINE OUT, controlla i livelli e acquisisci la sequenza, oppure importa un WAV stereo adatto. Avanzamento, meter e spettro rendono visibile la prova.",
        },
        {
          title: "Leggi i risultati e salva.",
          text: "Esamina risposta dei canali, fondo, bilanciamento, diafonia, compressione dei livelli e indicatori di clipping. Salva il profilo con un nome già proposto; le note su piastra e nastro sono facoltative. Le correzioni prudenti restano una scelta.",
        },
        {
          title: "Ogni profilo ha un contesto.",
          text: "Mantieni costanti piastra, nastro, collegamenti e regolazioni. La misura include registrazione e riproduzione: non allinea indipendentemente la lettura, non ripara azimuth o trasporto e non certifica wow/flutter, MOL o compatibilità Dolby.",
        },
      ],
    },
    "features/j-card-maker": {
      title: "Una copertina da conservare.",
      lead: "Completa la cassetta con una scaletta leggibile, i tuoi colori e una J-card pronta da stampare.",
      image: "covers",
      sections: [
        {
          title: "Nove stili. I tuoi colori.",
          text: "Scegli tra studio classico, rock, pop, synthwave, poster, home recorded e bianco e nero. Le palette suggerite aiutano a iniziare; quattro colori personalizzabili rendono il progetto tuo.",
        },
        {
          title: "Fai spazio ai brani.",
          text: "La scaletta segue i due lati. Aggiungi titolo e note, poi scegli fra sei font inclusi. I template attuali accettano fino a 15 brani totali tra i due lati; oltre questo limite stampa ed esportazione sono disabilitate. Controlla i titoli lunghi nell’anteprima perché possono essere abbreviati.",
        },
        {
          title: "Stampa, taglia, piega.",
          text: "Apri la stampa di sistema oppure esporta PDF e SVG. Scegli A4, usa scala 100%, disattiva adatta alla pagina e misura il riferimento di 50 mm nella stampa diretta dall’app. Per i file esportati verifica le dimensioni della copertina: 104,8 × 101,6 mm. Margini della stampante e custodia richiedono comunque una prova.",
        },
        {
          title: "Anche con una stampante B/N.",
          text: "Gli stili monocromatici e l’uscita in grigi aiutano quando manca una stampante a colori. Anteprima ed esportazioni condividono la grafica; SVG mantiene testo modificabile e font incorporati.",
        },
      ],
    },
    download: {
      title: "Porta il banco di lavoro sul desktop.",
      lead: "MixtapeForge è un prototipo desktop open source. Audio e progetti restano sul tuo computer.",
      sections: [
        {
          title: "Disponibilità attuale",
          text: "Il prototipo macOS è stato compilato e provato localmente. Windows e Linux hanno configurazione desktop e CI, ma audio su hardware e installer richiedono ancora verifiche specifiche. Qui non è ancora collegato un installer pubblico verificato.",
        },
        {
          title: "Compila dai sorgenti",
          text: "Installa Node.js 22, Rust stabile, CMake e i prerequisiti Tauri del tuo sistema. Su Linux servono gli header ALSA. Esegui questi comandi dalla radice del repository. L’anteprima browser non offre audio e operazioni desktop.",
          items: ["npm ci", "npm run desktop", "npm run desktop:build"],
        },
        {
          title: "Prima registrazione",
          text: "Collega un’uscita audio a LINE IN, parti con volume moderato e fai una prova breve del livello REC. L’applicazione non può premere il pulsante fisico della piastra.",
        },
      ],
    },
    "getting-started": {
      title: "La prima cassetta, dall’inizio alla fine.",
      lead: "Una sessione pratica: prepara il lato, controlla il suono, registra e crea la copertina.",
      sections: [
        {
          title: "1. Collega la piastra",
          text: "Collega l’uscita del computer o della scheda a LINE IN. Per acquisire una prova collega LINE OUT a un ingresso linea adatto. Parti con livello moderato e seleziona l’uscita corretta nell’app.",
        },
        {
          title: "2. Prepara i lati",
          text: "Importa i file locali, scegli la durata della cassetta e organizza A e B. Lascia spazio per pause e tratto iniziale non registrabile. Ascolta le transizioni prima di incidere.",
        },
        {
          title: "3. Fai una prova breve",
          text: "Usa un passaggio forte per regolare REC LEVEL senza distorsione. Parti senza elaborazioni e aggiungile con un motivo. Se il deck codifica Dolby B, non applicare anche la codifica software.",
        },
        {
          title: "4. Registra e riascolta",
          text: "Supera il leader, premi REC sul deck e avvia il lato nell’app. Mantieni fissi volume e regolazioni. Registra il lato B e riascolta con il lettore previsto e l’impostazione NR corretta.",
        },
        {
          title: "5. Stampa la J-card",
          text: "Apri Copertina, aggiungi titolo e note e controlla la scaletta. Stampa al 100% e misura il riferimento prima di tagliare e piegare.",
        },
      ],
    },
    compatibility: {
      title: "Cosa serve alla tua configurazione.",
      lead: "Funzioni implementate, componenti esterni e verifiche ancora da completare.",
      sections: [
        {
          title: "Desktop e browser",
          text: "Audio nativo, importazione e output richiedono l’app desktop. Il browser mostra un’anteprima grafica. Le destinazioni sono macOS, Windows e Linux; finora è stato provato localmente macOS.",
        },
        {
          title: "File audio",
          text: "Il motore legge comuni sorgenti WAV, FLAC, MP3, Ogg Vorbis e AIFF. Varianti di codec e file danneggiati possono fallire: conserva gli originali e prova i file insoliti prima di registrare. Il master interno di ascolto è float32.",
        },
        {
          title: "Effetti e NR",
          text: "Livelli, compressione ed EQ a dieci bande sono integrati. È disponibile un effetto stereo VST3 esterno alla volta. Il pacchetto desktop include l’utility Type B; Dolby C, S, dbx e riconoscimento automatico NR non sono implementati.",
        },
        {
          title: "Hardware e misure",
          text: "La scheda deve supportare formato stereo e frequenza scelti. I profili descrivono la catena registrazione/lettura, non un allineamento indipendente di fabbrica. Trasporto, livelli REC e impostazioni di ascolto rimangono sul deck.",
        },
        {
          title: "Lingue",
          text: "Il sito è in inglese, italiano, francese, tedesco e spagnolo. L’interfaccia desktop è tradotta in italiano, inglese, francese e spagnolo; il sito tedesco non implica un’app in tedesco.",
        },
      ],
    },
    about: {
      title: "Per chi le cassette le registra davvero.",
      lead: "Uno strumento locale per trasformare una raccolta di brani in una cassetta da ascoltare.",
      sections: [
        {
          title: "Perché esiste",
          text: "Preparare una cassetta spesso richiede un player, un editor e uno strumento per copertine. MixtapeForge riunisce lati, preparazione audio, profili di misura e J-card in un progetto desktop.",
        },
        {
          title: "Open source e locale",
          text: "Il codice originale è GPL-3.0-only. L’elaborazione avviene sul computer; i plugin esterni sono facoltativi. Librerie, font e utility Type B separata mantengono le proprie licenze.",
        },
        {
          title: "Come scriviamo le guide",
          text: "Gli articoli partono da procedure pratiche, documenti dei produttori e domande delle community. Le illustrazioni non sono prove di misura. Manuale del deck e limiti dichiarati restano essenziali: non esiste un livello valido per tutte le piastre.",
        },
        {
          title: "Stato editoriale",
          text: "Questa è una prima edizione multilingua assistita da strumenti generativi, senza revisione indipendente di laboratorio o madrelingua. Non dichiariamo prove hardware o ascolti se non documentati nell’articolo. Correzioni e segnalazioni ripetibili sono benvenute nel repository.",
        },
      ],
    },
    changelog: {
      title: "Cosa c’è sul banco di lavoro.",
      lead: "Lo stato del prototipo, distinto da release pubbliche firmate.",
      sections: [
        {
          title: "Prototipo 0.1",
          text: "Pianificazione A/B, audio locale, uscita nativa, recupero progetti, normalizzazione, EQ a dieci bande, compressione, Type B facoltativo, uno slot VST3, profili guidati e J-card stampabili.",
        },
        {
          title: "Copertine e flussi",
          text: "Nove stili, sei font inclusi, palette personalizzate, grigi e stampa di sistema. Mixtape, Calibrazione e Copertina condividono l’impostazione del workspace.",
        },
        {
          title: "Verifiche da completare",
          text: "Installer pubblici, firma e notarizzazione, prove hardware Windows/Linux e test indipendenti Type B restano attività di distribuzione distinte. Questa pagina non annuncia una release definitiva.",
        },
      ],
    },
    privacy: {
      title: "La tua musica resta tua.",
      lead: "Non serve un account per leggere il sito. L’app elabora l’audio localmente.",
      sections: [
        {
          title: "Il sito",
          text: "Il sito pubblico include Google Tag Manager, container GTM-WLRVCWSR. I tag attivati in quel contenitore possono raccogliere dati d’uso secondo le politiche di Google. Ricerca e filtri girano nel browser; non ci sono account né richieste a servizi font esterni. Il provider di hosting può conservare normali log, mentre i link esterni seguono le politiche della destinazione.",
        },
        {
          title: "L’app desktop",
          text: "Audio, master e progetti vengono elaborati sul computer. I plugin esterni scelti dall’utente hanno condizioni e comportamenti propri. Le segnalazioni inviate su GitHub seguono le politiche del servizio.",
        },
        {
          title: "Licenze e crediti",
          text: "Codice originale GPL-3.0-only; utility Type B separata con libdolbyb GPL-2.0-only; font SIL Open Font License. LICENSE e THIRD_PARTY_NOTICES.md contengono i termini completi. Le illustrazioni editoriali sono state generate per il progetto e non implicano approvazione dei produttori.",
        },
        {
          title: "Nomi di prodotto",
          text: "Dolby, dbx, VST e altri nomi identificano tecnologie o prodotti di terzi. Non implicano affiliazione, certificazione o diritto di ridistribuire software commerciale.",
        },
      ],
    },
  },
} as Record<Locale, Pages>;
