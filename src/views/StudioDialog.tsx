import { t as translate } from "../i18n";
import { AlertTriangle, Download, WandSparkles, X } from "lucide-react";
import { call, native } from "../backend";
import { IconButton, Select } from "../components";
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
    dialog,
    setDialog,
    setMaster,
    fitPreview,
    setFitPreview,
    preserve,
    setPreserve,
    bits,
    setBits,
    notify,
    run,
    commit,
    doExport,
    documentExport,
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
            className="modal"
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
            {busy && <JobProgress overlay />}
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
                        "Apri Controlli audio dalla barra della Mixtape per ascoltare i passaggi più forti. La normalizzazione LUFS rispetta il margine dei picchi. La dinamica è opzionale.",
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
