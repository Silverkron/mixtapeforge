import { t as translate } from "../i18n";
import { FilePlus2, LockKeyhole, Play, RefreshCw, Volume2 } from "lucide-react";
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
    outputs,
    inputs,
    device,
    inputDevice,
    setInputDevice,
    theme,
    setTheme,
    commit,
    locked,
    refresh,
    demoLoad,
    portable,
    clearCache,
    setOutput,
    updateProcessing,
  } = useStudio();
  return (
    <>
      {panel === "settings" && (
        <div className="master-grid">
          <Section
            title={translate("Dispositivi audio")}
            eyebrow={translate("USCITA E INGRESSO")}
            action={
              <button
                className="button small"
                disabled={locked}
                onClick={refresh}
              >
                <RefreshCw size={14} />
                {translate("Aggiorna")}
              </button>
            }
          >
            <fieldset disabled={locked} className="panel-content">
              <Select
                label={translate("Uscita verso il deck")}
                value={device}
                onChange={(v) => setOutput(Number(v))}
              >
                {!outputs.length && (
                  <option>{translate("Nessuna uscita disponibile")}</option>
                )}
                {!!outputs.length && device < 0 && (
                  <option value={-1} disabled>
                    {translate("Seleziona un’uscita audio")}
                  </option>
                )}
                {outputs.map((d) => (
                  <option key={d.index} value={d.index}>
                    {d.name} · {d.rate / 1000} {translate("kHz")}
                  </option>
                ))}
              </Select>
              <Select
                label={translate("Ingresso dal deck")}
                value={inputDevice}
                onChange={(v) => setInputDevice(Number(v))}
              >
                {!inputs.length && (
                  <option>{translate("Nessun ingresso disponibile")}</option>
                )}
                {!!inputs.length && inputDevice < 0 && (
                  <option value={-1} disabled>
                    {translate("Seleziona un ingresso audio")}
                  </option>
                )}
                {inputs.map((d) => (
                  <option key={d.index} value={d.index}>
                    {d.name} · {d.channels} {translate("ch")}
                  </option>
                ))}
              </Select>
              <div className="hint">
                <Volume2 size={17} />
                <p>
                  {translate(
                    "L’app usa CoreAudio su macOS, WASAPI su Windows e ALSA su Linux. Seleziona uscita e ingresso della tua scheda audio.",
                  )}
                </p>
              </div>
              <Select
                label={translate("Frequenza progetto")}
                value={project.processing.sample_rate}
                onChange={(v) => updateProcessing({ sample_rate: Number(v) })}
              >
                {[44100, 48000, 88200, 96000].map((r) => (
                  <option key={r} value={r}>
                    {r / 1000} {translate("kHz")}
                  </option>
                ))}
              </Select>
              <p className="caption">
                {translate(
                  "L’uscita selezionata deve supportare l’audio stereo alla frequenza scelta. Se non è compatibile, l’app segnala il problema prima di avviare la riproduzione.",
                )}
              </p>
            </fieldset>
          </Section>
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
