import { t as translate, localeTag } from "../i18n";
import {
  AlertTriangle,
  ChevronRight,
  Download,
  Mic,
  Play,
  Save,
  Square,
} from "lucide-react";
import { native } from "../backend";
import { Meters, NumberField, Scope, Select } from "../components";
import { useStudio } from "../studio-context";
import { JobProgress } from "./JobProgress";

export function ManualAudioTools() {
  const {
    project,
    busy,
    locked,
    playing,
    capturing,
    outputs,
    inputs,
    device,
    inputDevice,
    telemetry,
    inputTelemetry,
    monitoring,
    profile,
    setProfile,
    toneFrequency,
    setToneFrequency,
    toneKind,
    setToneKind,
    notify,
    edit,
    stop,
    tone,
    toggleMonitor,
  } = useStudio();
  return (
    <details className="audio-rack-extra">
      <summary>{translate("Tono e livelli del deck")}</summary>
      <div className="manual-calibration">
        <div className="manual-calibration-intro">
          <div>
            <span className="eyebrow">{translate("Calibrazione manuale")}</span>
            <h3>{translate("Controlla la catena prima di registrare")}</h3>
            <p>
              {translate(
                "Abbassa il livello, premi REC sul deck e usa una prova breve. Il tono parte solo premendo il pulsante.",
              )}
            </p>
          </div>
          <div className="signal-path">
            <span>PC OUT</span>
            <ChevronRight size={15} />
            <b>DECK IN</b>
            <ChevronRight size={15} />
            <span>LINE OUT</span>
          </div>
        </div>
        <div className="manual-gain-note hint">
          <AlertTriangle size={18} />
          <div>
            <strong>{translate("Scheda audio a guadagno fisso")}</strong>
            <p>
              {translate(
                "Se la scheda audio non ha un controllo di guadagno, usa REC LEVEL per il nastro e l’uscita della piastra o un attenuatore per il ritorno.",
              )}
            </p>
          </div>
        </div>
        <div className="manual-calibration-grid">
          <section className="manual-panel manual-source-panel">
            <div className="manual-panel-heading">
              <span>01</span>
              <div>
                <h3>{translate("Tono di prova")}</h3>
                <p>
                  {translate(
                    "Scegli la frequenza o il rumore bianco. Il segnale usa il livello verso la piastra.",
                  )}
                </p>
              </div>
            </div>
            <div className="fields-two">
              <Select
                label={translate("Riferimento")}
                value={toneKind === "noise" ? "noise" : toneFrequency}
                onChange={(v) => {
                  if (v === "noise") setToneKind("noise");
                  else {
                    setToneKind("sine");
                    setToneFrequency(Number(v));
                  }
                }}
              >
                <option value="400">{translate("400 Hz")}</option>
                <option value="1000">{translate("1 kHz")}</option>
                <option value="10000">{translate("10 kHz")}</option>
                <option value="noise">{translate("Rumore bianco")}</option>
              </Select>
              <div className="field">
                <span>{translate("Livello di uscita del tono")}</span>
                <output>{project.processing.ceiling} dBFS</output>
              </div>
            </div>
            <div className="manual-actions">
              <button
                className="button primary"
                disabled={locked || !native || device < 0 || !outputs.length}
                onClick={() => tone()}
              >
                <Play size={14} />
                {translate("Tono · 5 s")}
              </button>
              <button className="button" onClick={stop}>
                <Square size={14} />
                {translate("Stop")}
              </button>
              <button
                className="button"
                disabled={busy || !native}
                onClick={() => tone(true)}
              >
                <Download size={14} />
                {translate("WAV")}
              </button>
            </div>
            <div className="calibration-feedback">
              {busy ? (
                <JobProgress />
              ) : (
                <p role="status">
                  {playing ? translate("Audio in uscita") : translate("Uscita")}
                  :{" "}
                  {outputs.find((d) => d.index === device)?.name ??
                    translate("Seleziona un dispositivo")}
                  {" · "}
                  {(project.processing.sample_rate / 1000).toLocaleString(
                    localeTag(),
                  )}{" "}
                  {translate("kHz")}
                </p>
              )}
            </div>
            <Meters
              telemetry={telemetry}
              reference={project.calibration?.reference}
            />
          </section>
          <section className="manual-panel manual-capture-panel">
            <div className="manual-panel-heading">
              <span>02</span>
              <div>
                <h3>{translate("Ritorno dal deck")}</h3>
                <p>
                  {translate(
                    "Collega LINE OUT a un ingresso stereo e controlla il riascolto senza creare un loop software.",
                  )}
                </p>
              </div>
            </div>
            <button
              className="button full"
              disabled={
                busy ||
                capturing ||
                inputDevice < 0 ||
                !inputs.length ||
                !native
              }
              onClick={toggleMonitor}
            >
              {monitoring ? <Square size={14} /> : <Mic size={14} />}{" "}
              {monitoring
                ? translate("Ferma ingresso")
                : translate("Misura ingresso")}
            </button>
            <Meters telemetry={inputTelemetry} input />
            <Scope
              values={inputTelemetry?.spectrum}
              spectrum
              label={translate("Spettro del ritorno dal deck")}
            />
            <div className="stat-grid">
              <div>
                <span>{translate("FREQUENZA DOMINANTE")}</span>
                <b>
                  {inputTelemetry
                    ? translate("{0} Hz", [inputTelemetry.frequency.toFixed(0)])
                    : "—"}
                </b>
              </div>
              <div>
                <span>{translate("HD3 INDICATIVA")}</span>
                <b>
                  {inputTelemetry ? `${inputTelemetry.hd3.toFixed(2)} %` : "—"}
                </b>
              </div>
            </div>
            <p className="caption">
              {translate(
                "FFT 2048 punti: frequenza e HD3 sono indicative su tono stabile. Per la sequenza automatica e il profilo usa Calibrazione.",
              )}
            </p>
          </section>
        </div>
        <section className="manual-panel manual-profile-panel">
          <div className="manual-panel-heading">
            <span>03</span>
            <div>
              <h3>{translate("Scheda manuale del deck")}</h3>
              <p>
                {translate(
                  "Annota le condizioni della prova. Questi dati accompagnano il progetto e non sostituiscono la misura automatica.",
                )}
              </p>
            </div>
          </div>
          <fieldset disabled={locked} className="profile-fields">
            <div className="manual-profile-fields">
              <label className="field">
                <span>{translate("Nome profilo")}</span>
                <input
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />
              </label>
              <label className="field">
                <span>{translate("Deck")}</span>
                <input
                  placeholder={translate("Modello del tuo registratore")}
                  value={profile.deck}
                  onChange={(e) =>
                    setProfile({ ...profile, deck: e.target.value })
                  }
                />
              </label>
              <label className="field manual-profile-tape">
                <span>{translate("Nastro e formulazione")}</span>
                <input
                  value={profile.tape}
                  onChange={(e) =>
                    setProfile({ ...profile, tape: e.target.value })
                  }
                />
              </label>
            </div>
            <label className="field">
              <span>{translate("Note e posizione dei controlli")}</span>
              <textarea
                rows={3}
                value={profile.notes}
                onChange={(e) =>
                  setProfile({ ...profile, notes: e.target.value })
                }
              />
            </label>
            <details className="disclosure manual-details">
              <summary>
                {translate("Dettagli della prova · facoltativi")}
              </summary>
              <div className="manual-reference-fields">
                <NumberField
                  label={translate("0 VU corrisponde a")}
                  value={profile.reference}
                  min={-60}
                  max={-3}
                  unit="dBFS"
                  onChange={(v) => setProfile({ ...profile, reference: v })}
                />
                <NumberField
                  label={translate("MOL dichiarato")}
                  value={profile.mol}
                  min={0}
                  max={20}
                  unit="dB ref."
                  onChange={(v) => setProfile({ ...profile, mol: v })}
                />
                <NumberField
                  label={translate("SNR dichiarato")}
                  value={profile.snr}
                  min={10}
                  max={100}
                  unit="dB"
                  onChange={(v) => setProfile({ ...profile, snr: v })}
                />
              </div>
            </details>
            <div className="manual-profile-actions">
              <div>
                <label className="check">
                  <input
                    type="checkbox"
                    checked={profile.verified}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        verified: e.target.checked,
                      })
                    }
                  />
                  {translate("Confermo manualmente collegamenti e livelli")}
                </label>
                <p className="caption">
                  {translate(
                    "Conferma manuale, non certificazione di misura. Il cambio dell’uscita richiede una nuova verifica.",
                  )}
                </p>
              </div>
              <button
                className="button primary"
                onClick={() => {
                  edit(
                    (p) =>
                      (p.calibration = {
                        ...profile,
                        device:
                          outputs.find((d) => d.index === device)?.name ?? "",
                        verified: profile.verified,
                      }),
                  );
                  notify(translate("Profilo salvato nel progetto"));
                }}
              >
                <Save size={14} />
                {translate("Salva scheda del deck")}
              </button>
            </div>
          </fieldset>
        </section>
      </div>
    </details>
  );
}
