import { t as translate } from "../i18n";
import type { Project } from "../types";
import {
  artworkScene,
  artworkStyle,
  artworkSettings,
  catalog,
  type Node,
} from "./scene";
import { artworkFontFamily } from "./fonts";
import "./fonts.css";
export function ArtworkPreview({
  project,
  motif = false,
}: {
  project: Project;
  motif?: boolean;
}) {
  const render = (n: Node, i: number) => {
    switch (n.kind) {
      case "rect":
        return (
          <rect
            key={i}
            x={n.x}
            y={n.y}
            width={n.w}
            height={n.h}
            fill={n.fill}
            stroke={n.stroke ?? undefined}
            strokeWidth={n.width}
          />
        );
      case "line":
        return (
          <line
            key={i}
            x1={n.x1}
            y1={n.y1}
            x2={n.x2}
            y2={n.y2}
            stroke={n.stroke}
            strokeWidth={n.width}
            strokeDasharray={n.dash ? "1 1" : undefined}
          />
        );
      case "circle":
        return (
          <circle
            key={i}
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            fill={n.fill}
            stroke={n.stroke ?? undefined}
            strokeWidth={n.width}
          />
        );
      case "polygon":
        return (
          <polygon
            key={i}
            points={n.points.map((p) => p.join(",")).join(" ")}
            fill={n.fill}
          />
        );
      case "text":
        return (
          <text
            key={i}
            x={n.x}
            y={n.y}
            fontSize={n.size}
            fontFamily={artworkFontFamily(n.font)}
            fontWeight={400}
            fill={n.fill}
            transform={
              n.rotate ? `rotate(${n.rotate} ${n.x} ${n.y})` : undefined
            }
          >
            {n.text}
          </text>
        );
    }
  };
  return (
    <svg
      className="artwork-preview"
      viewBox={
        motif
          ? "78 18 26.8 56"
          : `0 0 ${catalog.geometry.width} ${catalog.geometry.height}`
      }
      role={motif ? undefined : "img"}
      aria-hidden={motif || undefined}
      aria-label={translate("Copertina di {0}: anteprima di stampa", [
        project.title,
      ])}
    >
      {(motif
        ? artworkScene(project).slice(
            0,
            1 + artworkStyle(artworkSettings(project).style).decor.length,
          )
        : artworkScene(project)
      ).map(render)}
    </svg>
  );
}
