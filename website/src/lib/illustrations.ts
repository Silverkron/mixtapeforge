import type { Locale } from "./site";
import type { Scene } from "./image-scenes";
import workstation from "../assets/illustrations/mixtape-workstation.png";
import gift from "../assets/illustrations/gift.png";
import portable from "../assets/illustrations/portable.png";
import covers from "../assets/illustrations/covers.png";
import recording from "../assets/illustrations/recording.png";
import calibration from "../assets/illustrations/calibration.png";
import noiseReduction from "../assets/illustrations/noise-reduction.png";

export const illustrationSources = {
  workstation,
  gift,
  portable,
  covers,
  recording,
  calibration,
  "noise-reduction": noiseReduction,
};
export const illustrationAlts: Record<Locale, Record<Scene, string>> = {
  en: {
    workstation:
      "Mixtape recording workstation with a laptop, audio interface and cassette deck, beside a cassette and a case with its printed cover.",
    gift: "Lavender cassette beside an open transparent case and a cyan gift ribbon.",
    portable:
      "Portable cassette player with cyan-cushioned headphones and a lavender cassette.",
    covers:
      "Folded and unfolded cassette covers with abstract lavender and cyan artwork, beside a cassette and its case.",
    recording:
      "Laptop displaying an audio waveform connected to a cassette deck holding a lavender tape.",
    calibration:
      "Cassette deck connected to an audio interface with knobs and level bars, beside a lavender cassette.",
    "noise-reduction":
      "Lavender cassette surrounded by a cyan wave that transitions between scattered particles and a smooth ribbon.",
  },
  it: {
    workstation:
      "Postazione per registrare mixtape con computer, interfaccia audio e piastra, accanto a una cassetta e alla custodia con copertina stampata.",
    gift: "Cassetta lavanda accanto a una custodia trasparente aperta e a un nastro regalo ciano.",
    portable:
      "Lettore portatile con cuffie dai cuscinetti ciano e una cassetta lavanda.",
    covers:
      "Copertine per cassette piegate e distese, con forme astratte lavanda e ciano, accanto a una cassetta e alla sua custodia.",
    recording:
      "Computer portatile con una forma d’onda sullo schermo, collegato a una piastra con una cassetta lavanda.",
    calibration:
      "Piastra collegata a un’interfaccia audio con manopole e barre di livello, accanto a una cassetta lavanda.",
    "noise-reduction":
      "Cassetta lavanda circondata da un’onda ciano che passa da particelle sparse a un nastro uniforme.",
  },
  fr: {
    workstation:
      "Poste de création de mixtapes avec ordinateur, interface audio et platine cassette, près d’une cassette et de son boîtier avec jaquette imprimée.",
    gift: "Cassette lavande près d’un boîtier transparent ouvert et d’un ruban cadeau cyan.",
    portable:
      "Lecteur cassette portable avec un casque aux coussinets cyan et une cassette lavande.",
    covers:
      "Jaquettes pliées et dépliées aux motifs abstraits lavande et cyan, près d’une cassette et de son boîtier.",
    recording:
      "Ordinateur portable affichant une forme d’onde, relié à une platine contenant une cassette lavande.",
    calibration:
      "Platine reliée à une interface audio avec boutons et barres de niveau, près d’une cassette lavande.",
    "noise-reduction":
      "Cassette lavande entourée d’une onde cyan passant de particules dispersées à un ruban lisse.",
  },
  de: {
    workstation:
      "Mixtape-Aufnahmeplatz mit Laptop, Audiointerface und Kassettendeck, daneben eine Kassette und eine Hülle mit bedrucktem Einleger.",
    gift: "Lavendelfarbene Kassette neben einer geöffneten transparenten Hülle und einem cyanfarbenen Geschenkband.",
    portable:
      "Tragbarer Kassettenspieler mit cyanfarben gepolsterten Kopfhörern und einer lavendelfarbenen Kassette.",
    covers:
      "Gefaltete und aufgefaltete Kassetteninlays mit abstrakten lavendel- und cyanfarbenen Formen neben Kassette und Hülle.",
    recording:
      "Laptop mit einer Audiowellenform auf dem Bildschirm, verbunden mit einem Deck mit lavendelfarbener Kassette.",
    calibration:
      "Kassettendeck mit angeschlossenem Audiointerface, Reglern und Pegelbalken neben einer lavendelfarbenen Kassette.",
    "noise-reduction":
      "Lavendelfarbene Kassette in einer cyanfarbenen Welle, die zwischen verstreuten Partikeln und einem glatten Band übergeht.",
  },
  es: {
    workstation:
      "Puesto de grabación de mixtapes con portátil, interfaz de audio y pletina, junto a un cassette y una caja con carátula impresa.",
    gift: "Cassette lavanda junto a una caja transparente abierta y una cinta de regalo cian.",
    portable:
      "Reproductor portátil con auriculares de almohadillas cian y un cassette lavanda.",
    covers:
      "Carátulas plegadas y desplegadas con formas abstractas lavanda y cian, junto a un cassette y su caja.",
    recording:
      "Portátil con una forma de onda en pantalla conectado a una pletina con un cassette lavanda.",
    calibration:
      "Pletina conectada a una interfaz de audio con mandos y barras de nivel, junto a un cassette lavanda.",
    "noise-reduction":
      "Cassette lavanda rodeado por una onda cian que pasa de partículas dispersas a una cinta uniforme.",
  },
};
