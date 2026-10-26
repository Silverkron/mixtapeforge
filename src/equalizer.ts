export const EQ_FREQUENCIES = [
  31.5, 63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000,
];
// Gentle starting points, not tape-type calibration or noise-reduction curves.
export interface EqPreset {
  id: string;
  name: string;
  category: "neutral" | "genre" | "correction";
  description: string;
  gains: number[];
}
export const EQ_PRESETS: EqPreset[] = [
  {
    id: "flat",
    category: "neutral",
    name: "Neutro",
    description:
      "Tutte le bande a 0 dB. Parti da qui se il bilanciamento del brano ti piace già.",
    gains: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    id: "rock",
    name: "Rock",
    category: "genre",
    description:
      "Basso e cassa più presenti, medi leggermente scavati e un poco di attacco sulle chitarre.",
    gains: [0, 1.5, 1, -0.5, -1, 0, 1, 1.5, 0.5, 0],
  },
  {
    id: "pop",
    name: "Pop",
    category: "genre",
    description:
      "Un po’ di corpo, voce in evidenza e alte leggermente più brillanti.",
    gains: [0, 1, 0.5, 0, -0.5, 0.5, 1, 1, 1, 0.5],
  },
  {
    id: "jazz",
    name: "Jazz",
    category: "genre",
    description:
      "Un lieve sostegno al contrabbasso e più apertura sulle alte, con medio-alti morbidi.",
    gains: [0, 0.5, 1, 0.5, 0, 0, 0, -0.5, 1, 0.5],
  },
  {
    id: "classical",
    name: "Classica",
    category: "genre",
    description:
      "Una curva vicina al neutro, con un lieve sostegno agli estremi. Non modifica la compressione.",
    gains: [0.5, 0.5, 0, 0, 0, 0, 0, 0, 0.5, 1],
  },
  {
    id: "electronic",
    name: "Elettronica",
    category: "genre",
    description:
      "Bassi profondi e alte in evidenza, con un leggero taglio dei medio-bassi.",
    gains: [1, 1.5, 1, -0.5, -1, -0.5, 0, 0.5, 1.5, 1],
  },
  {
    id: "hiphop",
    name: "Hip-hop",
    category: "genre",
    description:
      "Più peso a basso e cassa, meno medio-bassi e un lieve rialzo per la voce.",
    gains: [1, 1.5, 1.5, 0, -0.5, 0, 1, 0.5, 0, 0],
  },
  {
    id: "acoustic",
    name: "Acustica",
    category: "genre",
    description:
      "Meno accumulo nei medio-bassi e una lieve presenza per corde e voce.",
    gains: [-0.5, 0, 0.5, -1, -0.5, 0.5, 1, 1, 0.5, 0],
  },
  {
    id: "warm",
    category: "correction",
    name: "Più corpo",
    description:
      "Per un suono magro: +1,5 dB a 63 e 125 Hz. Lascia invariati medi e alte.",
    gains: [0, 1.5, 1.5, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    id: "clear",
    category: "correction",
    name: "Meno rimbombo",
    description:
      "Per bassi troppo invadenti: −1 dB a 63 Hz, −2 dB a 125 e 250 Hz, −1 dB a 500 Hz.",
    gains: [0, -1, -2, -2, -1, 0, 0, 0, 0, 0],
  },
  {
    id: "voice",
    category: "correction",
    name: "Voce più presente",
    description:
      "Per dare risalto alla voce nel mix: +1 dB a 1 e 4 kHz, +1,5 dB a 2 kHz. Coinvolge anche gli strumenti in queste bande.",
    gains: [0, 0, 0, 0, 0, 1, 1.5, 1, 0, 0],
  },
  {
    id: "presence_cut",
    category: "correction",
    name: "Meno asprezza",
    description:
      "Per un suono aggressivo nei medio-alti: −1 dB a 2 kHz e −2 dB a 4 kHz.",
    gains: [0, 0, 0, 0, 0, 0, -1, -2, 0, 0],
  },
  {
    id: "soft",
    category: "correction",
    name: "Alte più morbide",
    description:
      "Per piatti e alte troppo brillanti: −1 dB a 4 kHz e −2 dB a 8 e 16 kHz. Non è una riduzione del fruscio del nastro.",
    gains: [0, 0, 0, 0, 0, 0, 0, -1, -2, -2],
  },
  {
    id: "air",
    category: "correction",
    name: "Più brillantezza",
    description:
      "Per una sorgente poco brillante: +1,5 dB a 8 kHz e +1 dB a 16 kHz. Non corregge automaticamente la risposta della cassetta.",
    gains: [0, 0, 0, 0, 0, 0, 0, 0, 1.5, 1],
  },
];
export function presetFor(gains: number[]) {
  return EQ_PRESETS.find(
    (p) =>
      gains.length === p.gains.length &&
      p.gains.every((v, i) => v === gains[i]),
  );
}
// Same normalized peaking coefficients as the native DSP. Magnitude of their cascade.
export function eqResponse(
  frequency: number,
  gains: number[],
  rate: number,
): number {
  const w = (2 * Math.PI * frequency) / rate;
  const magnitude = (c: number[]) =>
    Math.hypot(
      c[0] + c[1] * Math.cos(w) + c[2] * Math.cos(2 * w),
      -c[1] * Math.sin(w) - c[2] * Math.sin(2 * w),
    );
  return gains.reduce((sum, gain, i) => {
    const a = 10 ** (gain / 40),
      w0 = (2 * Math.PI * EQ_FREQUENCIES[i]) / rate;
    const alpha = Math.sin(w0) / (2 * Math.SQRT2);
    return (
      sum +
      20 *
        Math.log10(
          magnitude([1 + alpha * a, -2 * Math.cos(w0), 1 - alpha * a]) /
            magnitude([1 + alpha / a, -2 * Math.cos(w0), 1 - alpha / a]),
        )
    );
  }, 0);
}
