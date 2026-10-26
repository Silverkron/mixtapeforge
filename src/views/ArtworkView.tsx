import { t as translate } from "../i18n";
import { Download, HelpCircle, Music2, Printer } from "lucide-react";
import { call, native } from "../backend";
import { Section, Select } from "../components";
import { useStudio } from "../studio-context";
import { ArtworkPreview } from "../artwork/ArtworkPreview";
import { ArtworkPrint } from "../artwork/ArtworkPrint";
import {
  artworkSettings,
  artworkStyle,
  catalog,
  contrastRatio,
  printPalette,
  settingsForStyle,
  type Palette,
} from "../artwork/scene";
import type { ArtworkSettings } from "../types";

export function ArtworkView() {
  const { project, page, edit, locked, documentExport, notify } = useStudio();
  if (page !== "artwork") return null;
  const settings = artworkSettings(project),
    style = artworkStyle(settings.style),
    printed = printPalette(settings);
  const paletteIndex = style.palettes.findIndex((p) =>
    ["paper", "ink", "accent", "secondary"].every(
      (k) => p[k as keyof Palette] === settings[k as keyof Palette],
    ),
  );
  const update = (changes: Partial<ArtworkSettings>) =>
    edit((p) => {
      p.artwork = { ...artworkSettings(p), ...changes };
      p.color = p.artwork.accent;
    });
  const lowContrast = contrastRatio(printed.paper, printed.ink) < 4.5;
  return (
    <div className="artwork-grid">
      <ArtworkPrint project={project} />
      <Section
        title={translate("Anteprima J-card")}
        eyebrow={translate("STAMPA · 104,8 × 101,6 MM")}
      >
        <div className="jcard-stage">
          <ArtworkPreview project={project} />
          <div className="print-ruler">
            {translate("← 50 mm · verifica la scala dopo la stampa →")}
          </div>
        </div>
        <div className="artwork-preview-caption">
          <strong>{translate(style.name)}</strong>
          <span>{translate(style.description)}</span>
          {settings.monochrome && (
            <span className="tag">
              <Printer size={12} /> {translate("Scala di grigi")}
            </span>
          )}
        </div>
      </Section>
      <Section
        title={translate("Stile e colori")}
        eyebrow={translate("COPERTINA E STAMPA")}
      >
        <fieldset className="panel-content artwork-controls" disabled={locked}>
          <div className="field">
            <span>{translate("Stile della copertina")}</span>
            <div
              className="artwork-style-grid"
              role="group"
              aria-label={translate("Stili copertina")}
            >
              {catalog.styles.map((s) => {
                return (
                  <button
                    key={s.id}
                    type="button"
                    className="artwork-style-choice"
                    aria-pressed={settings.style === s.id}
                    title={translate(s.description)}
                    onClick={() => update(settingsForStyle(s.id))}
                  >
                    <span className="artwork-style-motif" aria-hidden="true">
                      <ArtworkPreview
                        project={{
                          ...project,
                          artwork: settingsForStyle(s.id),
                        }}
                        motif
                      />
                    </span>
                    <span>
                      <b>{translate(s.name)}</b>
                      <small>{translate(s.family)}</small>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <Select
            label={translate("Font del titolo")}
            value={settings.font ?? ""}
            onChange={(font) => update({ font })}
          >
            <option value="">{translate("Consigliato per lo stile")}</option>
            <option value="sans">{translate("Barlow · Studio")}</option>
            <option value="bold">{translate("Barlow Bold · Pop")}</option>
            <option value="display">
              {translate("Barlow Condensed · Rock")}
            </option>
            <option value="mono">{translate("IBM Plex Mono · Tecnico")}</option>
            <option value="poster">{translate("Bebas Neue · Poster")}</option>
            <option value="typewriter">
              {translate("Courier Prime · Dattiloscritto")}
            </option>
          </Select>
          <Select
            label={translate("Palette consigliata")}
            value={paletteIndex < 0 ? "custom" : paletteIndex}
            onChange={(v) => {
              const { name: _, ...colors } = style.palettes[Number(v)];
              update(colors);
            }}
          >
            {paletteIndex < 0 && (
              <option value="custom" disabled>
                {translate("Colori personalizzati")}
              </option>
            )}
            {style.palettes.map((p, i) => (
              <option value={i} key={translate(p.name)}>
                {translate(p.name)}
              </option>
            ))}
          </Select>
          <div className="artwork-color-grid">
            {(
              [
                ["paper", translate("Fondo")],
                ["ink", translate("Testo")],
                ["accent", translate("Accento 1")],
                ["secondary", translate("Accento 2")],
              ] as const
            ).map(([key, label]) => (
              <label className="artwork-color-field" key={key}>
                <input
                  type="color"
                  aria-label={translate(label)}
                  value={settings[key]}
                  onChange={(e) => update({ [key]: e.target.value })}
                />
                <span>
                  {translate(label)}
                  <small>{settings[key].toUpperCase()}</small>
                </span>
              </label>
            ))}
          </div>
          <label className="check">
            <input
              type="checkbox"
              checked={settings.monochrome}
              onChange={(e) => update({ monochrome: e.target.checked })}
            />
            {translate("Stampa in scala di grigi")}
          </label>
          <p
            className={`artwork-palette-help ${lowContrast ? "warning-text" : ""}`}
            role="status"
          >
            {lowContrast
              ? translate(
                  "Poco contrasto tra testo e fondo: scegli un testo più chiaro o più scuro.",
                )
              : settings.monochrome
                ? translate(
                    "I grigi sono applicati anche al PDF e allo SVG. Per risparmiare inchiostro scegli Archivio B/N.",
                  )
                : translate(
                    "Il testo sulle fasce colorate usa automaticamente nero o bianco per restare leggibile.",
                  )}
          </p>
          <hr />
          <label className="field">
            <span>{translate("Titolo")}</span>
            <input
              value={project.title}
              onChange={(e) => edit((p) => (p.title = e.target.value))}
            />
          </label>
          <label className="field">
            <span>{translate("Dedica o sottotitolo")}</span>
            <textarea
              value={project.subtitle}
              rows={2}
              onChange={(e) => edit((p) => (p.subtitle = e.target.value))}
            />
          </label>
          <p className="caption">
            {translate(
              "La scaletta segue i lati A/B. Questi template contengono fino a 15 brani; i testi troppo lunghi vengono abbreviati.",
            )}
          </p>
          <button
            className="button primary full"
            disabled={project.tracks.length > 15}
            onClick={async () => {
              await document.fonts?.ready;
              if (native)
                void call("print_artwork").catch((e) => notify(String(e)));
              else window.print();
            }}
          >
            <Printer size={15} />
            {translate("Stampa J-card")}
          </button>
          <button
            className="button full"
            disabled={!native || project.tracks.length > 15}
            onClick={() => documentExport("pdf")}
          >
            <Download size={15} />
            {translate("Esporta J-card PDF · A4")}
          </button>
          <button
            className="button full"
            disabled={!native || project.tracks.length > 15}
            onClick={() => documentExport("svg")}
          >
            <Download size={15} />
            {translate("Esporta SVG modificabile")}
          </button>
          <button
            className="button full"
            disabled={!native}
            onClick={() => documentExport("txt")}
          >
            <Music2 size={15} />
            {translate("Esporta tracklist")}
          </button>
          <div className="hint">
            <HelpCircle size={17} />
            <p>
              {translate(
                "Scegli A4, scala 100% e disattiva intestazioni e piè di pagina. Verifica il riferimento da 50 mm sulla prima copia. Il PDF mantiene i font come tracciati vettoriali; lo SVG include i font e conserva il testo modificabile.",
              )}
            </p>
          </div>
        </fieldset>
      </Section>
    </div>
  );
}
