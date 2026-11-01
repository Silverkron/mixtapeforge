import type { Page, PageKey } from "./pages";
type LocalizedPages = Record<PageKey, Page>;
export const localizedPages: Record<"fr" | "de" | "es", LocalizedPages> = {
  fr: {
    "features/recording": {
      title: "Préparez une mixtape. Enregistrez une vraie cassette.",
      lead: "Organisez les deux faces dans un projet, puis envoyez la musique à votre platine.",
      image: "recording",
      sections: [
        {
          title: "Deux faces, une sélection.",
          text: "Importez vos fichiers, déplacez les titres entre les faces et surveillez le temps restant. Réglez les pauses, les coupes et les fondus sans reconstruire la liste.",
        },
        {
          title: "Vérifiez le son avant REC.",
          text: "Normalisation, égaliseur à dix bandes et compression sont disponibles si nécessaire. Les préréglages musicaux restent modifiables. Les indicateurs de niveau et le spectre montrent le signal de sortie.",
        },
        {
          title: "L’ordinateur joue, la platine enregistre.",
          text: "Sélectionnez la sortie reliée à LINE IN, faites un essai de niveau et appuyez sur REC sur la platine. Dépassez l’amorce non enregistrable avant de démarrer la face dans l’application.",
        },
        {
          title: "Effets et réduction du bruit.",
          text: "Un effet stéréo VST3 externe peut être chargé; les plugins s’installent séparément. Le codage Type B facultatif exige un réglage des niveaux et une vérification sur la platine. Il ne constitue pas un remplacement certifié de tous les encodeurs Dolby B. Dolby C, S et dbx ne sont pas intégrés.",
        },
      ],
    },
    "features/calibration": {
      title: "Apprenez à connaître votre platine et votre bande.",
      lead: "Un enregistrement guidé et sa capture permettent de mesurer la chaîne complète et de conserver un profil.",
      image: "calibration",
      sections: [
        {
          title: "Enregistrez le test.",
          text: "Choisissez la sortie et une fréquence d’échantillonnage compatible. Désactivez la réduction de bruit et enregistrez la séquence d’environ 108 secondes. Le compte à rebours aide à synchroniser le départ; dépassez d’abord l’amorce.",
        },
        {
          title: "Capturez la lecture.",
          text: "Sélectionnez l’entrée reliée à LINE OUT et contrôlez les niveaux. Capturez la séquence ou importez un WAV stéréo adapté. Progression, indicateurs et spectre rendent le déroulement visible.",
        },
        {
          title: "Conservez un profil utile.",
          text: "Examinez réponse, bruit, équilibre, diaphonie et indices de compression et d’écrêtage. Seul le nom, déjà proposé, est obligatoire. Les notes sont facultatives et les corrections prudentes restent un choix.",
        },
        {
          title: "Ce que la mesure ne sépare pas.",
          text: "Conservez platine, bande, connexions et réglages lors de la réutilisation. Le trajet complet inclut les erreurs d’enregistrement et de lecture. Il ne règle pas indépendamment la lecture, ne répare pas l’azimut ou la mécanique et ne certifie ni pleurage, ni MOL, ni compatibilité Dolby.",
        },
      ],
    },
    "features/j-card-maker": {
      title: "Une jaquette à conserver.",
      lead: "Une liste de titres lisible, vos couleurs et une J-card prête à imprimer.",
      image: "covers",
      sections: [
        {
          title: "Neuf styles, vos couleurs.",
          text: "Choisissez des compositions studio, rock, pop, synthwave, affiche, home recorded ou monochromes. Des palettes suggérées et quatre couleurs personnalisables facilitent la création.",
        },
        {
          title: "De la place pour les morceaux.",
          text: "La liste suit les deux faces du projet. Ajoutez titre et notes, choisissez parmi six polices incluses et vérifiez les titres longs dans l’aperçu. Les modèles acceptent 15 morceaux au total pour les deux faces ; au-delà, impression et export sont désactivés. Les titres longs peuvent être abrégés.",
        },
        {
          title: "Imprimez, découpez, pliez.",
          text: "Utilisez l’impression système ou exportez en PDF et SVG. Choisissez A4 et imprimez à 100 %, sans ajustement à la page, puis mesurez le repère de 50 mm sur une impression directe depuis l’application. Pour un fichier exporté, vérifiez les dimensions de la carte : 104,8 × 101,6 mm. Faites un essai avec votre imprimante et votre boîtier.",
        },
        {
          title: "Aussi en noir et blanc.",
          text: "Les styles monochromes et la conversion en gris conviennent aux imprimantes domestiques. Le SVG conserve le texte modifiable et les polices incorporées.",
        },
      ],
    },
    download: {
      title: "Installez l’atelier sur votre ordinateur.",
      lead: "MixtapeForge est un prototype de bureau open source. Audio et projets restent en local.",
      sections: [
        {
          title: "Disponibilité actuelle",
          text: "Le prototype macOS a été compilé et testé localement. Windows et Linux disposent de configurations de compilation et de CI, mais leurs sorties audio et installateurs nécessitent encore une validation spécifique. Aucun installateur public vérifié n’est lié ici.",
        },
        {
          title: "Compiler les sources",
          text: "Installez Node.js 22, Rust stable, CMake et les prérequis Tauri du système. Linux nécessite aussi les en-têtes ALSA. Lancez ces commandes à la racine du dépôt. L’aperçu navigateur ne fournit pas les fonctions audio et fichiers du bureau.",
          items: ["npm ci", "npm run desktop", "npm run desktop:build"],
        },
        {
          title: "Avant de lancer REC",
          text: "Reliez une sortie audio à LINE IN. Commencez avec un volume modéré et faites un essai du niveau d’enregistrement. L’application ne commande pas le bouton REC physique.",
        },
      ],
    },
    "getting-started": {
      title: "Votre première cassette, de bout en bout.",
      lead: "Préparez une face, vérifiez le son, enregistrez et créez la jaquette.",
      sections: [
        {
          title: "1. Branchez la platine",
          text: "Reliez la sortie de l’ordinateur ou de l’interface à LINE IN. Pour capturer une mesure, reliez LINE OUT à une entrée ligne adaptée. Sélectionnez la bonne sortie dans l’application.",
        },
        {
          title: "2. Préparez les faces",
          text: "Importez les fichiers locaux, choisissez la durée et organisez A et B. Gardez de la place pour les pauses et l’amorce. Écoutez les transitions avant d’enregistrer.",
        },
        {
          title: "3. Faites un essai",
          text: "Réglez REC LEVEL sur un passage fort sans distorsion audible. Commencez sans traitement. Si la platine encode déjà en Dolby B, n’ajoutez pas aussi le codage logiciel.",
        },
        {
          title: "4. Enregistrez et réécoutez",
          text: "Dépassez l’amorce, appuyez sur REC sur la platine et démarrez la face dans l’application. Gardez les réglages fixes. Réécoutez sur le lecteur prévu avec le réglage NR approprié.",
        },
        {
          title: "5. Imprimez la jaquette",
          text: "Choisissez un style, ajoutez titre et notes, puis vérifiez la liste. Imprimez à 100 % et mesurez le repère avant la découpe.",
        },
      ],
    },
    compatibility: {
      title: "Ce qu’il faut à votre installation.",
      lead: "Fonctions intégrées, composants externes et validations encore nécessaires.",
      sections: [
        {
          title: "Bureau et navigateur",
          text: "L’audio natif et les opérations sur fichiers nécessitent l’application de bureau. Le navigateur propose un aperçu visuel. macOS est testé localement; Windows et Linux sont des cibles à qualifier sur matériel.",
        },
        {
          title: "Fichiers et effets",
          text: "Le moteur lit les sources courantes WAV, FLAC, MP3, Ogg Vorbis et AIFF; certaines variantes ou fichiers endommagés peuvent échouer. La lecture préparée utilise un master float32. Normalisation, compression et égaliseur dix bandes sont intégrés; un effet stéréo VST3 externe peut être chargé.",
        },
        {
          title: "NR et mesures",
          text: "Type B facultatif est inclus comme utilitaire séparé. Dolby C, S, dbx et détection NR automatique ne sont pas implémentés. Les profils mesurent l’ensemble enregistrement/lecture et ne remplacent pas un alignement indépendant avec bande de référence.",
        },
        {
          title: "Langues",
          text: "Le site existe en anglais, italien, français, allemand et espagnol. L’interface de bureau est disponible en italien, anglais, français et espagnol, sans traduction allemande à ce stade.",
        },
      ],
    },
    about: {
      title: "Pour ceux qui enregistrent vraiment des cassettes.",
      lead: "Un atelier local pour transformer vos morceaux en une cassette à écouter.",
      sections: [
        {
          title: "Le projet",
          text: "MixtapeForge réunit préparation des faces, traitement audio, profils de mesure et jaquettes dans un même projet de bureau.",
        },
        {
          title: "Ouvert et local",
          text: "Le code original est sous GPL-3.0-only. Les traitements restent sur l’ordinateur. Les bibliothèques, polices, plugins et l’utilitaire Type B séparé conservent leurs licences.",
        },
        {
          title: "Notre méthode éditoriale",
          text: "Les guides associent procédures pratiques, documentation constructeur et questions des communautés. Les illustrations ne sont pas des preuves de mesure. Consultez le manuel propre à votre appareil.",
        },
        {
          title: "Première édition",
          text: "Cette édition multilingue est assistée par des outils génératifs, sans revue indépendante de laboratoire ni révision native complète. Aucun essai matériel n’est revendiqué sans documentation explicite. Les corrections reproductibles sont bienvenues via le dépôt.",
        },
      ],
    },
    changelog: {
      title: "Sur l’établi aujourd’hui.",
      lead: "L’état du prototype, distinct des versions publiques signées.",
      sections: [
        {
          title: "Prototype 0.1",
          text: "Préparation A/B, sortie audio native, récupération de projets, normalisation, compression, EQ dix bandes, Type B facultatif, un effet VST3, profils de calibration et J-cards imprimables.",
        },
        {
          title: "Jaquettes et interface",
          text: "Neuf styles, six polices locales, palettes personnalisées, niveaux de gris et impression système. Mixtape, Calibration et Jaquette partagent leur organisation.",
        },
        {
          title: "À qualifier",
          text: "Installateurs publics, signature, notarisation, essais matériels Windows/Linux et validation indépendante Type B restent des travaux de distribution. Cette page n’annonce pas une version finale.",
        },
      ],
    },
    privacy: {
      title: "Votre musique reste chez vous.",
      lead: "Aucun compte pour lire le site. L’application traite l’audio localement.",
      sections: [
        {
          title: "Le site",
          text: "Le site public intègre Google Tag Manager, conteneur GTM-WLRVCWSR. Les balises activées dans ce conteneur peuvent collecter des données d’usage selon les règles de Google. La recherche et les filtres restent dans le navigateur ; aucun compte ni police distante n’est utilisé. L’hébergeur peut traiter les journaux ordinaires des requêtes, et les liens externes suivent les règles de leur destination.",
        },
        {
          title: "L’application",
          text: "Audio, masters et projets sont traités sur l’ordinateur. Les plugins externes ont leurs propres conditions. Les signalements GitHub suivent les politiques du service.",
        },
        {
          title: "Licences et crédits",
          text: "Code original GPL-3.0-only; utilitaire séparé libdolbyb GPL-2.0-only; polices SIL Open Font License. Les conditions complètes figurent dans LICENSE et THIRD_PARTY_NOTICES.md. Illustrations générées pour le projet, sans approbation des fabricants.",
        },
        {
          title: "Noms de produits",
          text: "Dolby, dbx et VST désignent des technologies ou produits tiers et ne constituent pas une certification ou une affiliation.",
        },
      ],
    },
  },
  de: {
    "features/recording": {
      title: "Ein Mixtape planen. Eine echte Kassette aufnehmen.",
      lead: "Stelle beide Seiten in einem Projekt zusammen und spiele die Musik zum Kassettendeck aus.",
      image: "recording",
      sections: [
        {
          title: "Zwei Seiten, eine Auswahl.",
          text: "Importiere Dateien, ziehe Titel zwischen den Seiten und prüfe die verbleibende Zeit. Pausen, Schnitte und Überblendungen lassen sich direkt vorbereiten.",
        },
        {
          title: "Den Klang vor REC prüfen.",
          text: "Normalisierung, Zehnband-EQ und Kompression stehen bei Bedarf bereit. Genre-Vorgaben lassen sich anpassen. Pegelanzeigen und Spektrum zeigen das Ausgangssignal.",
        },
        {
          title: "Der Rechner spielt. Das Deck nimmt auf.",
          text: "Wähle den mit LINE IN verbundenen Ausgang, prüfe kurz den Pegel und drücke REC am Deck. Fahre vor dem Start über das nicht bespielbare Vorspannband hinaus.",
        },
        {
          title: "Optionale Werkzeuge mit Grenzen.",
          text: "Ein extern installierter Stereo-VST3-Effekt kann geladen werden. Die optionale Type-B-Codierung braucht Pegelabgleich und eine Prüfung am Deck; sie ist kein zertifizierter Ersatz für jeden Dolby-B-Encoder. Dolby C, S und dbx sind nicht integriert.",
        },
      ],
    },
    "features/calibration": {
      title: "Deck und Band besser kennenlernen.",
      lead: "Eine geführte Aufnahme mit anschließender Erfassung misst die gesamte Kette und liefert ein speicherbares Profil.",
      image: "calibration",
      sections: [
        {
          title: "Den Test aufnehmen.",
          text: "Wähle Ausgang und unterstützte Abtastrate. Nimm bei ausgeschalteter Rauschunterdrückung die etwa 108 Sekunden lange Folge auf. Der Countdown erleichtert den Start; das Vorspannband muss bereits passiert sein.",
        },
        {
          title: "Die Wiedergabe erfassen.",
          text: "Wähle den mit LINE OUT verbundenen Eingang und kontrolliere den Pegel. Erfasse die Folge oder importiere eine geeignete Stereo-WAV-Datei. Fortschritt, Pegel und Spektrum bleiben sichtbar.",
        },
        {
          title: "Ergebnisse und Profil.",
          text: "Prüfe Frequenzgang, Rauschen, Balance, Übersprechen sowie Hinweise auf Pegelkompression und Clipping. Nur der vorausgefüllte Name ist Pflicht; Notizen sind optional. Vorsichtige Korrekturen werden bewusst ausgewählt.",
        },
        {
          title: "Ein Profil gilt für seine Messkette.",
          text: "Behalte Deck, Band, Verbindungen und Einstellungen bei. Die Messung enthält Aufnahme- und Wiedergabefehler gemeinsam. Sie ersetzt keinen unabhängigen Wiedergabeabgleich, repariert weder Azimut noch Mechanik und zertifiziert weder Gleichlauf, MOL noch Dolby-Kompatibilität.",
        },
      ],
    },
    "features/j-card-maker": {
      title: "Ein Inlay zum Aufbewahren.",
      lead: "Gut lesbare Titel, eigene Farben und ein J-Card-Inlay, das sich wirklich drucken lässt.",
      image: "covers",
      sections: [
        {
          title: "Neun Stile, deine Farben.",
          text: "Studio, Rock, Pop, Synthwave, Poster, Home Recorded und Schwarzweiß: Wähle ein Layout und eine vorgeschlagene Palette oder passe vier Farben selbst an.",
        },
        {
          title: "Platz für die Musik.",
          text: "Die Titelliste folgt den beiden Projektseiten. Ergänze Titel und Notizen, wähle aus sechs enthaltenen Schriften und prüfe lange Namen in der Vorschau. Die Vorlagen unterstützen insgesamt 15 Titel auf beiden Seiten; darüber sind Druck und Export deaktiviert. Lange Titel können gekürzt werden.",
        },
        {
          title: "Drucken, schneiden, falten.",
          text: "Nutze den Systemdruck oder exportiere PDF und SVG. Wähle A4 und drucke mit 100 %, ohne Seitenanpassung, und miss beim direkten App-Druck die 50-mm-Referenz. Bei exportierten Dateien prüfst du die Kartenmaße von 104,8 × 101,6 mm. Mache einen Probedruck für Drucker und Hülle.",
        },
        {
          title: "Auch in Schwarzweiß.",
          text: "Monochrome Stile und Graustufen eignen sich für Heimdrucker. SVG erhält bearbeitbaren Text und eingebettete Schriften.",
        },
      ],
    },
    download: {
      title: "Die Werkbank für deinen Desktop.",
      lead: "MixtapeForge ist ein Open-Source-Desktop-Prototyp. Audio und Projekte bleiben auf deinem Computer.",
      sections: [
        {
          title: "Aktuelle Verfügbarkeit",
          text: "Der macOS-Prototyp wurde lokal gebaut und getestet. Windows und Linux haben Build-Konfiguration und CI; Audiohardware und Installationspakete brauchen noch eigene Freigabetests. Ein geprüftes öffentliches Installationspaket ist hier noch nicht verlinkt.",
        },
        {
          title: "Aus den Quellen bauen",
          text: "Installiere Node.js 22, stabiles Rust, CMake und die Tauri-Voraussetzungen deines Systems. Linux benötigt ALSA-Entwicklungsheader. Führe diese Befehle im Repository-Hauptverzeichnis aus. Die Browser-Vorschau bietet keine nativen Audio- oder Dateifunktionen.",
          items: ["npm ci", "npm run desktop", "npm run desktop:build"],
        },
        {
          title: "Vor der Aufnahme",
          text: "Verbinde den Audioausgang mit LINE IN. Beginne mit moderatem Pegel und einer kurzen Probe. Die Anwendung betätigt nicht die physische REC-Taste des Decks.",
        },
      ],
    },
    "getting-started": {
      title: "Deine erste Kassette von Anfang bis Ende.",
      lead: "Eine Seite planen, den Klang prüfen, aufnehmen und das Inlay gestalten.",
      sections: [
        {
          title: "1. Das Deck anschließen",
          text: "Verbinde Rechner- oder Interface-Ausgang mit LINE IN. Für Messaufnahmen verbindest du LINE OUT mit einem geeigneten Line-Eingang. Wähle den richtigen Ausgang in der App.",
        },
        {
          title: "2. Beide Seiten planen",
          text: "Importiere lokale Dateien, wähle die Bandlänge und ordne A und B. Plane Pausen und Vorspann ein und höre Übergänge vor der Aufnahme an.",
        },
        {
          title: "3. Eine kurze Probe",
          text: "Stelle REC LEVEL mit einer lauten Passage ohne hörbare Übersteuerung ein. Beginne ohne Klangbearbeitung. Codiert das Deck bereits Dolby B, darf die Software nicht zusätzlich codieren.",
        },
        {
          title: "4. Aufnehmen und prüfen",
          text: "Fahre über den Vorspann, drücke REC am Deck und starte die Seite in der App. Lass Pegelregler unverändert. Höre beide Seiten im vorgesehenen Gerät mit passender NR-Einstellung ab.",
        },
        {
          title: "5. Inlay drucken",
          text: "Wähle Stil, Titel und Notizen und kontrolliere die Liste. Drucke mit 100 % und miss die Referenz vor dem Ausschneiden.",
        },
      ],
    },
    compatibility: {
      title: "Was dein Aufbau braucht.",
      lead: "Integrierte Funktionen, externe Komponenten und noch ausstehende Prüfungen.",
      sections: [
        {
          title: "Desktop und Browser",
          text: "Native Audio- und Dateifunktionen erfordern die Desktop-App. Der Browser zeigt eine grafische Vorschau. macOS wurde lokal getestet; Windows und Linux müssen noch an Hardware qualifiziert werden.",
        },
        {
          title: "Dateien und Effekte",
          text: "Übliche WAV-, FLAC-, MP3-, Ogg-Vorbis- und AIFF-Quellen werden decodiert; Sondervarianten oder beschädigte Dateien können scheitern. Vorbereitete Wiedergabe nutzt float32. Normalisierung, Kompression und Zehnband-EQ sind enthalten; ein externer Stereo-VST3-Effekt kann geladen werden.",
        },
        {
          title: "NR und Messungen",
          text: "Type B ist als getrenntes optionales Hilfsprogramm enthalten. Dolby C, S, dbx und automatische NR-Erkennung sind nicht implementiert. Profile beschreiben Aufnahme und Wiedergabe gemeinsam und ersetzen keinen Abgleich mit Referenzband.",
        },
        {
          title: "Sprachen",
          text: "Die Website gibt es auf Englisch, Italienisch, Französisch, Deutsch und Spanisch. Die Desktop-Oberfläche ist derzeit Italienisch, Englisch, Französisch und Spanisch verfügbar; Deutsch ist dort noch nicht enthalten.",
        },
      ],
    },
    about: {
      title: "Für Menschen, die Kassetten aufnehmen.",
      lead: "Eine lokale Werkbank, die aus deiner Musikauswahl eine hörbare Kassette macht.",
      sections: [
        {
          title: "Das Projekt",
          text: "MixtapeForge verbindet Seitenplanung, Audiovorbereitung, Messprofile und J-Cards in einem Desktop-Projekt.",
        },
        {
          title: "Offen und lokal",
          text: "Originalcode steht unter GPL-3.0-only. Audio wird lokal verarbeitet. Bibliotheken, Schriften, Plugins und das getrennte Type-B-Programm behalten ihre eigenen Lizenzen.",
        },
        {
          title: "Unsere Anleitungen",
          text: "Praxisabläufe, Herstellerunterlagen und Community-Fragen bilden die Grundlage. Illustrationen sind keine Messnachweise. Gerätespezifische Handbücher und dokumentierte Grenzen bleiben maßgeblich.",
        },
        {
          title: "Erste Ausgabe",
          text: "Diese mehrsprachige Ausgabe entstand mit Unterstützung generativer Werkzeuge und wurde noch nicht unabhängig im Labor oder vollständig muttersprachlich geprüft. Hardwareversuche werden nur mit ausdrücklicher Dokumentation behauptet. Nachvollziehbare Korrekturen sind im Repository willkommen.",
        },
      ],
    },
    changelog: {
      title: "Aktuell auf der Werkbank.",
      lead: "Der Stand des Prototyps, getrennt von signierten öffentlichen Veröffentlichungen.",
      sections: [
        {
          title: "Prototyp 0.1",
          text: "A/B-Planung, native Audioausgabe, Projektwiederherstellung, Normalisierung, Kompression, Zehnband-EQ, optionales Type B, ein VST3-Effekt, geführte Messprofile und druckbare J-Cards.",
        },
        {
          title: "Inlays und Arbeitsabläufe",
          text: "Neun Stile, sechs lokale Schriften, eigene Paletten, Graustufen und Systemdruck. Mixtape, Einmessen und Inlays teilen dieselbe Arbeitsbereichsstruktur.",
        },
        {
          title: "Weitere Qualifikation",
          text: "Öffentliche Pakete, Signatur, Notarisierung, Windows/Linux-Hardwaretests und unabhängige Type-B-Tests stehen noch aus. Dies ist keine Ankündigung einer fertigen Veröffentlichung.",
        },
      ],
    },
    privacy: {
      title: "Deine Musik bleibt bei dir.",
      lead: "Die Website braucht kein Konto. Die Desktop-App verarbeitet Audio lokal.",
      sections: [
        {
          title: "Website",
          text: "Die öffentliche Website bindet Google Tag Manager mit dem Container GTM-WLRVCWSR ein. Im Container aktivierte Tags können Nutzungsdaten nach den Regeln von Google erfassen. Suche und Filter laufen im Browser; es gibt keine Konten und keine entfernten Schriften. Der Hoster kann normale Anfrageprotokolle verarbeiten, externe Links haben eigene Datenschutzregeln.",
        },
        {
          title: "Anwendung",
          text: "Audio, Master und Projekte werden lokal verarbeitet. Externe Plugins haben eigene Bedingungen. GitHub-Meldungen unterliegen den Richtlinien des Dienstes.",
        },
        {
          title: "Lizenzen und Herkunft",
          text: "Originalcode GPL-3.0-only; getrenntes libdolbyb-Hilfsprogramm GPL-2.0-only; Schriften unter SIL Open Font License. LICENSE und THIRD_PARTY_NOTICES.md enthalten die Details. Illustrationen wurden für das Projekt generiert, ohne Freigabe durch Gerätehersteller.",
        },
        {
          title: "Produktnamen",
          text: "Dolby, dbx und VST bezeichnen fremde Technologien oder Produkte und bedeuten keine Zertifizierung oder Verbindung mit den Rechteinhabern.",
        },
      ],
    },
  },
  es: {
    "features/recording": {
      title: "Prepara una mixtape. Graba un cassette real.",
      lead: "Organiza ambas caras en un proyecto y envía la música a tu pletina.",
      image: "recording",
      sections: [
        {
          title: "Dos caras, una selección.",
          text: "Importa archivos, mueve canciones entre caras y comprueba el tiempo restante. Ajusta pausas, cortes y fundidos sin reconstruir la lista.",
        },
        {
          title: "Comprueba el sonido antes de REC.",
          text: "Normalización, EQ de diez bandas y compresión están disponibles cuando hagan falta. Los presets de género se pueden modificar. Los medidores y el espectro muestran la señal de salida.",
        },
        {
          title: "El ordenador reproduce. La pletina graba.",
          text: "Elige la salida conectada a LINE IN, haz una prueba de nivel y pulsa REC en la pletina. Avanza más allá de la guía no grabable antes de iniciar la cara en la aplicación.",
        },
        {
          title: "Herramientas opcionales y límites claros.",
          text: "Puedes cargar un efecto estéreo VST3 instalado aparte. Type B por software requiere ajustar niveles y comprobar la reproducción; no sustituye de forma certificada a todos los codificadores Dolby B. Dolby C, S y dbx no están integrados.",
        },
      ],
    },
    "features/calibration": {
      title: "Conoce tu pletina y tu cinta.",
      lead: "Una grabación guiada y su captura permiten medir la cadena completa y guardar un perfil útil.",
      image: "calibration",
      sections: [
        {
          title: "Graba la prueba.",
          text: "Elige salida y frecuencia de muestreo compatible. Con NR desactivado, graba la secuencia de unos 108 segundos. La cuenta atrás ayuda a coordinar el inicio; la cinta debe haber superado la guía.",
        },
        {
          title: "Captura la reproducción.",
          text: "Selecciona la entrada conectada a LINE OUT y comprueba niveles. Captura la secuencia o importa un WAV estéreo adecuado. Progreso, medidores y espectro muestran el desarrollo.",
        },
        {
          title: "Revisa y guarda.",
          text: "Examina respuesta, ruido, balance, diafonía e indicadores de compresión y clipping. Solo es obligatorio el nombre predefinido; las notas son opcionales. Las correcciones conservadoras se aplican por elección.",
        },
        {
          title: "Cada perfil tiene su contexto.",
          text: "Mantén pletina, cinta, conexiones y ajustes al reutilizarlo. La medida combina grabación y reproducción. No alinea la reproducción por separado, no repara azimut ni transporte y no certifica wow/flutter, MOL o compatibilidad Dolby.",
        },
      ],
    },
    "features/j-card-maker": {
      title: "Una carátula para conservar.",
      lead: "Canciones legibles, tus colores y una J-card que puedas imprimir.",
      image: "covers",
      sections: [
        {
          title: "Nueve estilos, tus colores.",
          text: "Elige diseños de estudio, rock, pop, synthwave, cartel, home recorded o monocromáticos. Usa paletas sugeridas o personaliza cuatro colores.",
        },
        {
          title: "Espacio para las canciones.",
          text: "La lista sigue ambas caras del proyecto. Añade título y notas, elige entre seis fuentes incluidas y revisa los títulos largos en la vista previa. Las plantillas admiten 15 canciones en total entre ambas caras; por encima se desactivan impresión y exportación. Los títulos largos pueden abreviarse.",
        },
        {
          title: "Imprime, recorta y pliega.",
          text: "Usa la impresión del sistema o exporta PDF y SVG. Elige A4 e imprime al 100 %, sin ajustar a página, y mide la referencia de 50 mm en la impresión directa desde la aplicación. En archivos exportados, comprueba las medidas de la tarjeta: 104,8 × 101,6 mm. Haz una prueba con tu impresora y caja.",
        },
        {
          title: "También en blanco y negro.",
          text: "Los estilos monocromáticos y la escala de grises funcionan con impresoras domésticas. SVG conserva texto editable y fuentes incorporadas.",
        },
      ],
    },
    download: {
      title: "Lleva el taller a tu escritorio.",
      lead: "MixtapeForge es un prototipo de código abierto. Audio y proyectos permanecen en tu ordenador.",
      sections: [
        {
          title: "Disponibilidad actual",
          text: "El prototipo macOS se ha compilado y probado localmente. Windows y Linux tienen configuración y CI, pero hardware de audio e instaladores requieren validación propia. Todavía no enlazamos un instalador público verificado.",
        },
        {
          title: "Compilar desde el código",
          text: "Instala Node.js 22, Rust estable, CMake y los requisitos Tauri del sistema. Linux también necesita cabeceras ALSA. Ejecuta estos comandos desde la raíz del repositorio. La vista de navegador no ofrece audio ni archivos nativos.",
          items: ["npm ci", "npm run desktop", "npm run desktop:build"],
        },
        {
          title: "Antes de grabar",
          text: "Conecta la salida de audio a LINE IN, empieza a volumen moderado y comprueba REC LEVEL con una prueba corta. La aplicación no pulsa REC físicamente.",
        },
      ],
    },
    "getting-started": {
      title: "Tu primer cassette, de principio a fin.",
      lead: "Prepara una cara, comprueba el sonido, graba y crea la carátula.",
      sections: [
        {
          title: "1. Conecta la pletina",
          text: "Lleva la salida del ordenador o interfaz a LINE IN. Para capturar mediciones, conecta LINE OUT a una entrada de línea adecuada. Selecciona la salida correcta en la aplicación.",
        },
        {
          title: "2. Prepara ambas caras",
          text: "Importa archivos locales, elige duración y organiza A y B. Deja espacio para pausas y guía inicial. Escucha las transiciones antes de grabar.",
        },
        {
          title: "3. Haz una prueba",
          text: "Ajusta REC LEVEL con un pasaje fuerte sin distorsión audible. Empieza sin procesado. Si la pletina codifica Dolby B, no añadas también la codificación del software.",
        },
        {
          title: "4. Graba y escucha",
          text: "Supera la guía, pulsa REC en la pletina e inicia la cara en la aplicación. Mantén los ajustes fijos. Reproduce ambas caras en el aparato previsto con el NR correspondiente.",
        },
        {
          title: "5. Imprime la carátula",
          text: "Escoge estilo, título y notas y comprueba la lista. Imprime al 100 % y mide la referencia antes de recortar.",
        },
      ],
    },
    compatibility: {
      title: "Qué necesita tu equipo.",
      lead: "Funciones integradas, componentes externos y comprobaciones pendientes.",
      sections: [
        {
          title: "Escritorio y navegador",
          text: "El audio y los archivos nativos requieren la aplicación de escritorio. El navegador muestra una vista gráfica. macOS se ha probado localmente; Windows y Linux aún necesitan pruebas de hardware.",
        },
        {
          title: "Archivos y efectos",
          text: "El motor decodifica WAV, FLAC, MP3, Ogg Vorbis y AIFF habituales; variantes o archivos dañados pueden fallar. La reproducción preparada usa float32. Incluye normalización, compresión y EQ de diez bandas; permite un efecto estéreo VST3 externo.",
        },
        {
          title: "NR y medidas",
          text: "Type B es una utilidad opcional separada. Dolby C, S, dbx y detección automática de NR no están implementados. Los perfiles miden grabación y reproducción juntas y no sustituyen una alineación independiente con cinta de referencia.",
        },
        {
          title: "Idiomas",
          text: "El sitio está en inglés, italiano, francés, alemán y español. La interfaz de escritorio está en italiano, inglés, francés y español; todavía no está traducida al alemán.",
        },
      ],
    },
    about: {
      title: "Para quienes graban cassettes de verdad.",
      lead: "Un taller local para convertir tus canciones en una cinta que quieras escuchar.",
      sections: [
        {
          title: "El proyecto",
          text: "MixtapeForge reúne planificación de caras, preparación de audio, perfiles de medición y J-cards en un proyecto de escritorio.",
        },
        {
          title: "Abierto y local",
          text: "El código original es GPL-3.0-only. El audio se procesa en el ordenador. Bibliotecas, fuentes, plugins y la utilidad Type B separada mantienen sus licencias.",
        },
        {
          title: "Cómo escribimos",
          text: "Las guías combinan procedimientos prácticos, documentación de fabricantes y preguntas de las comunidades. Las ilustraciones no son pruebas de medida. Consulta el manual concreto de tu equipo.",
        },
        {
          title: "Primera edición",
          text: "La edición multilingüe se ha elaborado con ayuda de herramientas generativas, sin revisión independiente de laboratorio ni revisión nativa completa. No atribuimos pruebas de hardware sin documentación expresa. Se agradecen correcciones reproducibles en el repositorio.",
        },
      ],
    },
    changelog: {
      title: "Qué hay en el banco de trabajo.",
      lead: "El estado del prototipo, separado de versiones públicas firmadas.",
      sections: [
        {
          title: "Prototipo 0.1",
          text: "Planificación A/B, salida nativa, recuperación de proyectos, normalización, compresión, EQ de diez bandas, Type B opcional, un efecto VST3, perfiles guiados y J-cards imprimibles.",
        },
        {
          title: "Carátulas y flujo",
          text: "Nueve estilos, seis fuentes locales, paletas personalizadas, grises e impresión del sistema. Mixtape, Calibración y Carátula comparten organización.",
        },
        {
          title: "Validaciones pendientes",
          text: "Instaladores públicos, firma, notarización, hardware Windows/Linux y pruebas independientes Type B siguen siendo trabajo de distribución. Esta página no anuncia una versión definitiva.",
        },
      ],
    },
    privacy: {
      title: "Tu música se queda contigo.",
      lead: "No necesitas cuenta para leer el sitio. La aplicación procesa audio localmente.",
      sections: [
        {
          title: "El sitio",
          text: "El sitio público incluye Google Tag Manager, contenedor GTM-WLRVCWSR. Las etiquetas activadas en ese contenedor pueden recopilar datos de uso según las políticas de Google. La búsqueda y los filtros se ejecutan en el navegador; no hay cuentas ni fuentes remotas. El alojamiento puede tratar registros habituales de peticiones y los enlaces externos tienen sus propias políticas.",
        },
        {
          title: "La aplicación",
          text: "Audio, masters y proyectos se procesan en el ordenador. Los plugins externos tienen sus propias condiciones. Los informes en GitHub siguen las políticas del servicio.",
        },
        {
          title: "Licencias y créditos",
          text: "Código original GPL-3.0-only; utilidad separada libdolbyb GPL-2.0-only; fuentes SIL Open Font License. Consulta LICENSE y THIRD_PARTY_NOTICES.md. Las ilustraciones se generaron para el proyecto sin aprobación de fabricantes.",
        },
        {
          title: "Nombres de productos",
          text: "Dolby, dbx y VST identifican tecnologías o productos de terceros, sin implicar certificación ni afiliación.",
        },
      ],
    },
  },
};
