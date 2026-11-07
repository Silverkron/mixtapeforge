import { t as translate } from "../i18n";
import { FilePlus2, LockKeyhole, Play } from "lucide-react";
import { blank, native } from "../backend";
import { Section, Select } from "../components";

import { useStudio } from "../studio-context";
import { languages, setLocale, useLocale, type Locale } from "../i18n";
export function SettingsView() {
  const language = useLocale();
  const {
    project,
    panel,
    setSelected,
    theme,
    setTheme,
    commit,
    locked,
    demoLoad,
    portable,
    clearCache,
  } = useStudio();
  return (
    <>
      {panel === "settings" && (
        <div className="master-grid">
          <Section
            title={translate("Preferenze e progetti")}
            eyebrow="PREFERENZE"
          >
            <div className="panel-content">
              <Select
                label={translate("Lingua")}
                value={language}
                onChange={(v) => setLocale(v as Locale)}
              >
                {Object.entries(languages).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
              <Select
                label={translate("Aspetto")}
                value={theme}
                onChange={setTheme}
              >
                <option value="dark">{translate("Scuro")}</option>
                <option value="light">{translate("Chiaro")}</option>
              </Select>
              <div className="shortcut-list">
                <span>
                  {translate("Brano precedente / successivo")}
                  <kbd>Alt ← / →</kbd>
                </span>
                <span>
                  {translate("Posizione nel lato")}
                  <kbd>← → · Home · End</kbd>
                </span>
                <span>
                  {translate("Ascolta")} / {translate("Pausa")}
                  <kbd>{translate("Spazio")}</kbd>
                </span>
                <span>
                  {translate("Stop uscita")}
                  <kbd>{translate("Esc")}</kbd>
                </span>
                <span>
                  {translate("Salva progetto")}
                  <kbd>{translate("⌘ / Ctrl S")}</kbd>
                </span>
                <span>
                  {translate("Annulla modifica")}
                  <kbd>{translate("⌘ / Ctrl Z")}</kbd>
                </span>
                <span>
                  {translate("Ripeti modifica")}
                  <kbd>{translate("⇧ ⌘ / Ctrl Z")}</kbd>
                </span>
              </div>
              <div className="hint">
                <LockKeyhole size={16} />
                <p>
                  {translate(
                    "Audio e progetti restano sul computer. I progetti salvano riferimenti ai file: conserva le sorgenti o ricollegale dopo averle spostate.",
                  )}
                </p>
              </div>
              <button
                className="button full"
                disabled={locked}
                onClick={demoLoad}
              >
                <Play size={15} />
                {translate("Carica demo sintetica")}
              </button>
              <button
                className="button full"
                disabled={locked || !native || !project.tracks.length}
                onClick={portable}
              >
                {translate("Raccogli progetto e file audio")}
              </button>
              <button
                className="button full"
                disabled={locked || !native}
                onClick={clearCache}
              >
                {translate("Libera master temporanei")}
              </button>
              <button
                className="button full"
                disabled={locked}
                onClick={() => {
                  if (
                    project.tracks.length &&
                    !window.confirm(
                      translate(
                        "Creare un nuovo progetto? Puoi recuperare le modifiche con Annulla.",
                      ),
                    )
                  )
                    return;
                  commit(blank());
                  setSelected(null);
                }}
              >
                <FilePlus2 size={15} />
                {translate("Nuovo progetto")}
              </button>
            </div>
          </Section>
        </div>
      )}
    </>
  );
}
