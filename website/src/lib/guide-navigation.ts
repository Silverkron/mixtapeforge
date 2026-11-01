import type { Locale } from "./site";

export const guideLabels: Record<
  Locale,
  {
    before: string;
    next: string;
    answer: string;
    paths: string;
    pathIntro: string;
    pathsTitles: string[];
  }
> = {
  en: {
    before: "Before you start",
    next: "What to do next",
    answer: "Quick answer",
    paths: "Choose a starting point",
    pathIntro: "Follow a short sequence, or search all guides below.",
    pathsTitles: [
      "Record your first cassette",
      "Understand noise reduction",
      "Measure your recording chain",
      "Make a cover that fits",
    ],
  },
  it: {
    before: "Prima di iniziare",
    next: "Il passo successivo",
    answer: "Risposta in breve",
    paths: "Da dove vuoi iniziare?",
    pathIntro:
      "Segui un percorso breve, oppure cerca tra tutte le guide qui sotto.",
    pathsTitles: [
      "Registra la prima cassetta",
      "Capisci la riduzione del rumore",
      "Misura la catena di registrazione",
      "Crea una copertina delle dimensioni giuste",
    ],
  },
  fr: {
    before: "Avant de commencer",
    next: "La prochaine étape",
    answer: "Réponse rapide",
    paths: "Choisissez un point de départ",
    pathIntro: "Suivez un parcours court ou recherchez un guide ci-dessous.",
    pathsTitles: [
      "Enregistrer votre première cassette",
      "Comprendre la réduction de bruit",
      "Mesurer la chaîne d’enregistrement",
      "Créer une jaquette aux bonnes dimensions",
    ],
  },
  de: {
    before: "Bevor du beginnst",
    next: "Der nächste Schritt",
    answer: "Kurz gesagt",
    paths: "Wähle einen Einstieg",
    pathIntro:
      "Folge einem kurzen Lernpfad oder durchsuche unten alle Anleitungen.",
    pathsTitles: [
      "Deine erste Kassette aufnehmen",
      "Rauschunterdrückung verstehen",
      "Deine Aufnahmekette messen",
      "Ein passendes Cover erstellen",
    ],
  },
  es: {
    before: "Antes de empezar",
    next: "El siguiente paso",
    answer: "Respuesta breve",
    paths: "Elige por dónde empezar",
    pathIntro:
      "Sigue un recorrido breve o busca entre todas las guías de abajo.",
    pathsTitles: [
      "Graba tu primera cinta",
      "Entiende la reducción de ruido",
      "Mide tu cadena de grabación",
      "Crea una carátula con las medidas correctas",
    ],
  },
};

export const learningPaths = [
  [
    "cassette-types",
    "recording-computer",
    "recording-levels",
    "cassette-mixtape",
  ],
  ["bias-eq-nr", "dolby-b", "dolby-b-c-s-playback", "dull-dolby"],
  [
    "calibration-basics",
    "loopback-round-trip",
    "without-reference-tape",
    "recording-profile",
  ],
  ["j-card-dimensions", "j-card-makers", "cover-typography", "print-j-card"],
];
