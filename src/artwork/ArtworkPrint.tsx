import { t as translate } from "../i18n";
import { createPortal } from "react-dom";
import type { Project } from "../types";
import { ArtworkPreview } from "./ArtworkPreview";
import "./print.css";

/** Separate print surface: independent of workspace scroll, panels and dialogs. */
export function ArtworkPrint({ project }: { project: Project }) {
  return createPortal(
    <div className="artwork-print-sheet" aria-hidden="true">
      <ArtworkPreview project={project} />
      <svg className="artwork-print-ruler" viewBox="0 0 54 10">
        <path
          d="M2 1v3 M2 2.5h50 M52 1v3"
          fill="none"
          stroke="black"
          strokeWidth="0.2"
        />
        <text
          x="27"
          y="8"
          textAnchor="middle"
          fontFamily="Cassette Barlow"
          fontSize="2.6"
          fill="black"
        >
          {translate("50 mm · stampa al 100%")}
        </text>
      </svg>
    </div>,
    document.body,
  );
}
