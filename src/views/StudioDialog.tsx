import { t as translate, localeTag } from "../i18n";
import {
  AlertTriangle,
  ChevronRight,
  Download,
  Mic,
  Play,
  Save,
  Square,
  WandSparkles,
  X,
} from "lucide-react";
import { call, native } from "../backend";
import { IconButton, Meters, NumberField, Scope, Select } from "../components";
import { type Project, time } from "../types";

import { JobProgress } from "./JobProgress";
import { useStudio } from "../studio-context";
export function StudioDialog() {
  const {
    project,
    info,
    side,
    setSide,
    busy,
    playing,
    dialog,
    setDialog,
    outputs,
    inputs,
    device,
    setOutput,
    inputDevice,
    setInputDevice,
    setMaster,
    telemetry,
    inputTelemetry,
    monitoring,
    fitPreview,
    setFitPreview,
    preserve,
    setPreserve,
    bits,
    setBits,
    profile,
    setProfile,
    toneFrequency,
    setToneFrequency,
    toneLevel,
    setToneLevel,
    toneKind,
    setToneKind,
    notify,
    run,
    commit,
    edit,
    stop,
    doExport,
    documentExport,
    tone,
    toggleMonitor,
  } = useStudio();
  return (
    <>
      {" "}
      {dialog && (
        <div
          className="modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !busy) setDialog(null);
          }}
        >
          <div
            className={`modal ${dialog === "calibrate" ? "wide" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
          >
            <header>
              <div>
                <span className="eyebrow">{translate("MIXTAPEFORGE")}</span>
                <h2 id="dialog-title">
                  {dialog === "fit"
                    ? translate("Distribuisci i brani sui lati")
                    : dialog === "export"
                      ? translate("Esporta il master del lato")
                      : dialog === "calibrate"
                        ? translate("Tono e livelli del deck")
                        : translate("Come registrare una mixtape")}
                </h2>
              </div>
              <IconButton
                label={translate("Chiudi finestra")}
                disabled={busy}
                onClick={() => setDialog(null)}
              >
                <X size={20} />
              </IconButton>
            </header>
            {busy && dialog !== "calibrate" && <JobProgress overlay />}
            {dialog === "fit" && (
              <div className="modal-content">
                <p>
                  {translate(
                    "Vedi la proposta prima di applicarla. Il programma non elimina né tronca brani per farli entrare.",
                  )}
                </p>
                <Select
                  label={translate("Strategia")}
                  value={preserve ? "preserve" : "balance"}
                  onChange={(v) => {
                    setPreserve(v === "preserve");
                    setFitPreview(null);
                  }}
                >
                  <option value="preserve">
                    {translate("Mantieni l’ordine · scegli il cambio lato")}
                  </option>
                  <option value="balance">
                    {translate("Bilancia i lati · rispetta i blocchi")}
                  </option>
                </Select>
                <button
                  className="button full"
                  disabled={busy || !native}
                  onClick={() =>
                    run(
                      async () =>
                        setFitPreview(
                          await call<Project>("fit_project", {
                            project,
                            preserve,
                          }),
                        ),
                      "Cerco una disposizione…",
                    )
                  }
                >
                  <WandSparkles size={15} />
                  {translate("Calcola proposta")}
                </button>
                {fitPreview && (
                  <div className="fit-result">
                    {[0, 1].map((s) => (
                      <div key={s}>
                        <h3>
                          {translate("Lato ")}
                          {s ? "B" : "A"}
                        </h3>
                        {fitPreview.sides[s].map((id, i) => (
                          <p key={id}>
                            {i + 1}.{" "}
                            {project.tracks.find((t) => t.id === id)?.title}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
                <div className="button-row end">
                  <button className="button" onClick={() => setDialog(null)}>
                    {translate("Annulla")}
                  </button>
                  <button
                    className="button primary"
                    disabled={!fitPreview || busy}
                    onClick={() => {
                      commit(fitPreview!);
                      setDialog(null);
                      notify(
                        translate("Disposizione applicata. Puoi annullarla."),
                      );
                    }}
                  >
                    {translate("Applica disposizione")}
                  </button>
                </div>
              </div>
            )}
            {dialog === "export" && (
              <div className="modal-content">
                <div className="hint">
                  <Download size={18} />
                  <p>
                    {translate(
                      "Il WAV include trim, gap, transizioni e processori del progetto. Il tono di riferimento si esporta separatamente.",
                    )}
                  </p>
                </div>
                <Select
                  label={translate("Lato da esportare")}
                  value={side}
                  onChange={(v) => {
                    setSide(Number(v));
                    setMaster(null);
                  }}
                >
                  <option value="0">
                    {translate("Lato A · ")}
                    {time(info.durations[0])}
                  </option>
                  <option value="1">
                    {translate("Lato B · ")}
                    {time(info.durations[1])}
                  </option>
                </Select>
                <Select
                  label={translate("Formato WAV")}
                  value={bits}
                  onChange={(v) => setBits(Number(v))}
                >
                  <option value="16">
                    {translate("PCM 16 bit · dither TPDF")}
                  </option>
                  <option value="24">
                    {translate("PCM 24 bit · dither TPDF")}
                  </option>
                  <option value="32">
                    {translate("Floating point 32 bit")}
                  </option>
                </Select>
                <p className="caption">
                  {project.processing.sample_rate / 1000}{" "}
                  {translate(
                    "kHz · Stereo. Le playlist M3U8 rimandano ai file originali, non includono il mastering.",
                  )}
                </p>
                <div className="button-row">
                  <button
                    className="button"
                    disabled={busy || !native}
                    onClick={() => documentExport("m3u8")}
                  >
                    {translate("Playlist M3U8")}
                  </button>
                  <button
                    className="button"
                    disabled={busy || !native}
                    onClick={() => documentExport("txt")}
                  >
                    {translate("Tracklist")}
                  </button>
                </div>
                <button
                  className="button primary full"
                  disabled={busy || !project.sides[side].length || !native}
                  onClick={doExport}
                >
                  <Download size={16} />
                  {translate("Esporta master WAV")}
                </button>
              </div>
            )}
            {dialog === "calibrate" && (
              <div className="modal-content manual-calibration">
                <div className="manual-calibration-intro">
                  <div>
                    <span className="eyebrow">
                      {translate("Calibrazione manuale")}
                    </span>
                    <h3>
                      {translate("Controlla la catena prima di registrare")}
                    </h3>
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
                    <strong>
                      {translate("Scheda audio a guadagno fisso")}
                    </strong>
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
                            "Scegli frequenza, livello e uscita verso il registratore.",
                          )}
                        </p>
                      </div>
                    </div>
                    <Select
                      label={translate("Uscita")}
                      value={device}
                      onChange={(v) => setOutput(Number(v))}
                    >
                      {!outputs.length && (
                        <option value={-1}>
                          {translate("Nessun dispositivo")}
                        </option>
                      )}
                      {outputs.map((d) => (
                        <option key={d.index} value={d.index}>
                          {d.name}
                        </option>
                      ))}
                    </Select>
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
                        <option value="noise">
                          {translate("Rumore bianco")}
                        </option>
                      </Select>
                      <NumberField
                        label={translate("Livello tono")}
                        value={toneLevel}
                        min={-60}
                        max={-3}
                        unit="dBFS peak"
                        onChange={setToneLevel}
                      />
                    </div>
                    <div className="manual-actions">
                      <button
                        className="button primary"
                        disabled={busy || !native || device < 0}
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
                          {playing
                            ? translate("Audio in uscita")
                            : translate("Uscita")}
                          :{" "}
                          {outputs.find((d) => d.index === device)?.name ??
                            translate("Seleziona un dispositivo")}
                          {" · "}
                          {(
                            project.processing.sample_rate / 1000
                          ).toLocaleString(localeTag())}{" "}
                          {translate("kHz")}
                        </p>
                      )}
                    </div>
                    <Meters telemetry={telemetry} />
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
                    <Select
                      label={translate("Ingresso")}
                      value={inputDevice}
                      onChange={(v) => setInputDevice(Number(v))}
                    >
                      {!inputs.length && (
                        <option>{translate("Nessun ingresso")}</option>
                      )}
                      {inputs.map((d) => (
                        <option key={d.index} value={d.index}>
                          {d.name}
                        </option>
                      ))}
                    </Select>
                    <button
                      className="button full"
                      disabled={!inputs.length || !native || busy}
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
                            ? translate("{0} Hz", [
                                inputTelemetry.frequency.toFixed(0),
                              ])
                            : "—"}
                        </b>
                      </div>
                      <div>
                        <span>{translate("HD3 INDICATIVA")}</span>
                        <b>
                          {inputTelemetry
                            ? `${inputTelemetry.hd3.toFixed(2)} %`
                            : "—"}
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
                  <fieldset disabled={busy} className="profile-fields">
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
                          placeholder={translate(
                            "Modello del tuo registratore",
                          )}
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
                          onChange={(v) =>
                            setProfile({ ...profile, reference: v })
                          }
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
                          {translate(
                            "Confermo manualmente collegamenti e livelli",
                          )}
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
                                  outputs.find((d) => d.index === device)
                                    ?.name ?? "",
                                verified: profile.verified,
                              }),
                          );
                          setDialog(null);
                          notify(translate("Profilo salvato nel progetto"));
                        }}
                      >
                        <Save size={14} />
                        {translate("Salva profilo")}
                      </button>
                    </div>
                  </fieldset>
                </section>
              </div>
            )}
            {dialog === "help" && (
              <div className="modal-content">
                <ol className="help-steps">
                  <li>
                    <b>{translate("1. Aggiungi i brani")}</b>
                    <p>
                      {translate(
                        "Importa WAV, FLAC, MP3, AAC/M4A, AIFF o OGG. Ordina i brani sui lati A e B e controlla il tempo rimasto. Seleziona un brano per regolare tagli, dissolvenze e pausa finale.",
                      )}
                    </p>
                  </li>
                  <li>
                    <b>{translate("2. Controlla l’audio, se serve")}</b>
                    <p>
                      {translate(
                        "Apri Audio dalla barra della Mixtape per ascoltare i passaggi più forti. La normalizzazione LUFS rispetta il margine dei picchi; la dinamica è opzionale.",
                      )}
                    </p>
                  </li>
                  <li>
                    <b>{translate("3. Registra dal player")}</b>
                    <p>
                      {translate(
                        "Prepara il master, allinea il deck e premi REC fisicamente. Avvia l’uscita, poi gira il nastro al termine del lato.",
                      )}
                    </p>
                  </li>
                  <li>
                    <b>{translate("4. Stampa la copertina")}</b>
                    <p>
                      {translate(
                        "Esporta PDF o SVG con tracklist sincronizzata. Stampa al 100% e verifica la barra da 50 mm.",
                      )}
                    </p>
                  </li>
                </ol>
                <div className="hint">
                  <AlertTriangle size={18} />
                  <p>
                    {translate(
                      "Prima di registrare un lato completo, controlla uscita, livelli e impostazione NR con una prova breve. Durante REC la ricerca e il salto tra brani sono bloccati.",
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
