import { t as translate } from "../i18n";
import fontMetrics from "./font-metrics.json";
import catalogData from "./catalog.json";
import type { ArtworkSettings, Project } from "../types";

export type Palette = Pick<
  ArtworkSettings,
  "paper" | "ink" | "accent" | "secondary"
>;
export type Node =
  | {
      kind: "rect";
      x: number;
      y: number;
      w: number;
      h: number;
      fill: string;
      stroke?: string | null;
      width?: number;
    }
  | {
      kind: "line";
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      stroke: string;
      width: number;
      dash?: boolean;
    }
  | {
      kind: "circle";
      cx: number;
      cy: number;
      r: number;
      fill: string;
      stroke?: string | null;
      width?: number;
    }
  | { kind: "polygon"; points: number[][]; fill: string }
  | {
      kind: "text";
      x: number;
      y: number;
      size: number;
      font: string;
      fill: string;
      text: string;
      rotate: number;
    };
export interface ArtworkStyle {
  id: string;
  name: string;
  family: string;
  description: string;
  font: string;
  header: string;
  monochrome: boolean;
  palettes: (Palette & { name: string })[];
  decor: Node[];
}
export const catalog = catalogData as unknown as {
  geometry: { width: number; height: number; front: number; spine: number };
  styles: ArtworkStyle[];
};
export const artworkStyle = (id: string) =>
  catalog.styles.find((s) => s.id === id) ?? catalog.styles[0];
export const settingsForStyle = (id: string, index = 0): ArtworkSettings => {
  const s = artworkStyle(id);
  const { name: _, ...colors } = s.palettes[index] ?? s.palettes[0];
  return { style: s.id, ...colors, monochrome: s.monochrome };
};
export function artworkSettings(p: Project): ArtworkSettings {
  return p.artwork ?? { ...settingsForStyle("classic"), accent: p.color };
}
const rgb = (hex: string) =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
export function contrastRatio(a: string, b: string) {
  const lum = (hex: string) =>
    rgb(hex)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
      .reduce((n, v, i) => n + v * [0.2126, 0.7152, 0.0722][i], 0);
  const [x, y] = [lum(a), lum(b)].sort((a, b) => b - a);
  return (x + 0.05) / (y + 0.05);
}
export function printPalette(a: ArtworkSettings): Record<string, string> {
  const colors: Record<string, string> = {
    paper: a.paper,
    ink: a.ink,
    accent: a.accent,
    secondary: a.secondary,
  };
  if (a.monochrome)
    for (const key of Object.keys(colors)) {
      const v = rgb(colors[key]);
      const g = Math.floor(
        (v[0] * 0.2126 + v[1] * 0.7152 + v[2] * 0.0722) * 255 + 0.5,
      )
        .toString(16)
        .padStart(2, "0");
      colors[key] = "#" + g.repeat(3);
    }
  colors.on_accent =
    contrastRatio(colors.accent, "#000000") >=
    contrastRatio(colors.accent, "#ffffff")
      ? "#000000"
      : "#ffffff";
  return colors;
}
function textWidth(text: string, size: number, font: string) {
  const fonts = fontMetrics as Record<
    string,
    { units: number; advances: Record<string, number> }
  >;
  const metrics = fonts[font] ?? fonts.sans;
  return (
    (Array.from(text).reduce(
      (sum, c) => sum + (metrics.advances[c] ?? metrics.advances["?"]),
      0,
    ) *
      size) /
    metrics.units
  );
}
export function fitLine(
  text: string,
  width: number,
  size: number,
  font: string,
) {
  if (textWidth(text, size, font) <= width) return text;
  let out = "";
  for (const c of text) {
    if (textWidth(out + c + "...", size, font) > width) break;
    out += c;
  }
  return out.trimEnd() + "...";
}
function titleLines(text: string, font: string) {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (let i = 0; i < words.length; i++) {
    const next = line ? line + " " + words[i] : words[i];
    if (textWidth(next, 4.2, font) > 59 && line) {
      lines.push(line);
      line = words[i];
      if (lines.length === 1) {
        lines.push(fitLine(words.slice(i).join(" "), 59, 4.2, font));
        return lines;
      }
    } else line = next;
  }
  if (line) lines.push(fitLine(line, 59, 4.2, font));
  return lines;
}
export function artworkScene(p: Project): Node[] {
  const a = artworkSettings(p),
    s = artworkStyle(a.style),
    colors = printPalette(a),
    g = catalog.geometry;
  const color = (v: string) => colors[v] ?? v;
  const nodes: Node[] = [];
  const rect = (
    x: number,
    y: number,
    w: number,
    h: number,
    fill: string,
    stroke: string | null = null,
    width = 0.15,
  ) =>
    nodes.push({
      kind: "rect",
      x,
      y,
      w,
      h,
      fill: color(fill),
      stroke: stroke ? color(stroke) : null,
      width,
    });
  const text = (
    x: number,
    y: number,
    size: number,
    font: string,
    fill: string,
    value: string,
    rotate = 0,
  ) =>
    nodes.push({
      kind: "text",
      x,
      y,
      size,
      font,
      fill: color(fill),
      text: value,
      rotate,
    });
  rect(0, 0, g.width, g.height, "paper");
  for (const node of s.decor) {
    const n = { ...node } as Node;
    if ("fill" in n) n.fill = color(n.fill);
    if ("stroke" in n && n.stroke) n.stroke = color(n.stroke);
    nodes.push(n);
  }
  rect(g.front, 0, g.spine, g.height, "accent");
  rect(77.8, 74, 27, 27.6, "paper");
  const titleFont = a.font || s.font;
  const headerInk = s.header === "accent" ? "on_accent" : "ink";
  text(3, 4.5, 1.8, "mono", headerInk, "MIXTAPEFORGE / STEREO");
  titleLines(p.title.trim() || "La mia mixtape", titleFont).forEach((line, i) =>
    text(3, 11 + i * 5.2, 4.2, titleFont, headerInk, line),
  );
  text(3, 23, 3, "sans", headerInk, fitLine(p.subtitle, 59, 3, "sans"));
  let y = 31;
  for (const side of [0, 1]) {
    text(3, y, 3, "bold", "ink", translate("LATO {0}", [side ? "B" : "A"]));
    y += 4.2;
    const ids = p.sides[side];
    if (!ids.length) {
      text(3, y, 2.9, "sans", "ink", translate("Nessun brano"));
      y += 3.7;
    }
    for (let i = 0; i < ids.length; i++) {
      const t = p.tracks.find((t) => t.id === ids[i]);
      if (t) {
        text(
          3,
          y,
          2.9,
          "sans",
          "ink",
          fitLine(
            `${String(i + 1).padStart(2, "0")}. ${t.title}`,
            59,
            2.9,
            "sans",
          ),
        );
        y += 3.7;
      }
    }
    y += 2;
  }
  text(72.7, 4, 3, "bold", "on_accent", fitLine(p.title, 92, 3, "bold"), 90);
  text(81, 8, 4, "bold", "ink", fitLine(p.tape, 20, 4, "bold"));
  text(81, 13, 1.8, "mono", "ink", "STEREO");
  text(
    81,
    80,
    2,
    "mono",
    "ink",
    translate("LATO A / {0} BRANI", [p.sides[0].length]),
  );
  text(
    81,
    85,
    2,
    "mono",
    "ink",
    translate("LATO B / {0} BRANI", [p.sides[1].length]),
  );
  if (p.processing.nr === "type_b") {
    text(81, 94, 1.8, "bold", "ink", "NR TYPE B");
    text(81, 98, 1.5, "sans", "ink", "PLAYBACK: DOLBY B");
  }
  rect(0, 0, g.width, g.height, "none", "ink", 0.15);
  for (const x of [g.front, g.front + g.spine])
    nodes.push({
      kind: "line",
      x1: x,
      y1: 0,
      x2: x,
      y2: g.height,
      stroke: color("ink"),
      width: 0.15,
      dash: true,
    });
  return nodes;
}
