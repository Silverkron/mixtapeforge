import { t as translate, localeTag } from "../i18n";
import { useState } from "react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Check,
  Download,
  Play,
  RefreshCw,
  Square,
} from "lucide-react";
import { call, native } from "../backend";
import { Meters, NumberField, Select } from "../components";
import { useStudio } from "../studio-context";
import type { CalibrationReport } from "../types";
import { calibrationLevelAdvice } from "../calibration-advice";
import { CalibrationCapture } from "./CalibrationCapture";
import { CalibrationProgress, type ProbeStatus } from "./CalibrationProgress";
import { JobProgress } from "./JobProgress";
import { CalibrationExams } from "./CalibrationExams";
import {
  RecordingProfileBuilder,
  RecordingProfileSelector,
} from "./RecordingProfiles";

const pair = (v: number[], unit = "dBFS") =>
  `L ${v[0].toFixed(1)} · R ${v[1].toFixed(1)} ${unit}`;
const signed = (v: number) => `${v > 0 ? "+" : ""}${v.toFixed(1)}`;
export function CalibrationView() {
  const {
    project,
    edit,
    locked,
    busy,
    playing,
    paused,
    telemetry,
    outputResult,
    startRecording,
    countdown,
    stop,
    run,
    notify,
    outputs,
    device,
    setOutput,
    refresh,
    capturing,
    capturePath,
    updateProcessing,
    panel,
    dialog,
  } = useStudio();
  const [step, setStep] = useState(0);
  const [probePath, setProbePath] = useState<string | null>(null);
  const [probeGainDb, setProbeGainDb] = useState(0);
  const [probePreparing, setProbePreparing] = useState(false);
  const [probeError, setProbeError] = useState<string | null>(null);
  const result =
    probePath && outputResult?.path === probePath ? outputResult : null;
  const probeStatus: ProbeStatus =
    countdown != null
      ? "countdown"
      : probePreparing
        ? "preparing"
        : probeError
          ? "error"
          : result
            ? result.error
              ? "error"
              : result.completed
                ? "finished"
                : "stopped"
            : probePath
              ? playing
                ? paused
                  ? "paused"
                  : "playing"
                : "starting"
              : "ready";
  const probeElapsed =
    result?.elapsed ?? (probePath && playing ? (telemetry?.elapsed ?? 0) : 0);

  const report = project.calibration_report;
  const levelAdvice = report
    ? calibrationLevelAdvice(report, probeGainDb)
    : null;
  const currentStep = step;
  const [analysisView, setAnalysisView] = useState<
    "saved" | "running" | "empty" | "error"
  >("saved");
  const [analysisError, setAnalysisError] = useState("");
  const output = outputs.find((d) => d.index === device);
  async function signal(exportFile = false) {
    if (!exportFile) {
      setProbePreparing(true);
      setProbeError(null);
      setProbePath(null);
    }
    const path = await run(
      () =>
        call<string | null>("calibration_signal", {
          export: exportFile,
          sampleRate: project.processing.sample_rate,
          gainDb: probeGainDb,
        }),
      translate("Preparo la sequenza di calibrazione…"),
    );
    if (!exportFile) {
      if (path) {
        setProbePath(path);
        setProbePreparing(false);
        const ok = await run(
          () => startRecording(path),
          translate("Avvio prova di calibrazione…"),
        );
        if (ok === undefined)
          setProbeError(
            translate(
              "Avvio non riuscito. Controlla il messaggio di errore e l’uscita selezionata.",
            ),
          );
      } else
        setProbeError(
          translate(
            "Preparazione non riuscita. Controlla il messaggio di errore e riprova.",
          ),
        );
      setProbePreparing(false);
    } else if (path) notify(translate("Sequenza di calibrazione esportata"));
  }
  async function analyze(path: string | null) {
    setStep(2);
    setAnalysisView("running");
    setAnalysisError("");
    const r = await run(
      () => call<CalibrationReport | null>("analyze_calibration", { path }),
      translate("Analizzo livelli, frequenze e rumore…"),
    );
    if (r) {
      edit((p) => {
        p.calibration_report = r;
      });
      setAnalysisView("saved");
    } else if (r === null) setAnalysisView("empty");
    else {
      setAnalysisView("error");
      setAnalysisError(
        translate(
          "Non riesco ad analizzare questa prova. Controlla il messaggio di errore e ripeti l’acquisizione o importa un altro WAV.",
        ),
      );
    }
  }
  return (
    <div className="calibration-page">
      <RecordingProfileSelector />
      <nav
        className="calibration-steps"
        aria-label={translate("Fasi della calibrazione")}
      >
        {[
          translate("Registra la prova"),
          translate("Acquisisci il riascolto"),
          translate("Analisi e risultati"),
        ].map((title, i) => (
          <button
            key={i}
            aria-label={`${i + 1} ${title}`}
            className={currentStep === i ? "active" : ""}
            aria-current={currentStep === i ? "step" : undefined}
            disabled={
              busy ||
              playing ||
              capturing ||
              (i === 2 && !report && !capturePath)
            }
            onClick={() => setStep(i)}
          >
            <span>{i === 2 && report ? <Check size={16} /> : i + 1}</span>
            {title}
          </button>
        ))}
      </nav>
      {busy && countdown == null && currentStep !== 2 && !panel && !dialog && (
        <JobProgress overlay />
      )}
      {currentStep === 0 && (
        <section className="calibration-card">
          <div className="calibration-card-heading">
            <span className="step-number">01</span>
            <div>
              <h2>{translate("Registra la prova sul nastro")}</h2>
              <p>
                {translate(
                  "Una sola prova di circa 108 secondi per misurare livelli, risposta in frequenza, rumore e separazione dei canali.",
                )}
              </p>
            </div>
          </div>
          <p>
            {translate(
              "Collega l’uscita della scheda a LINE IN della piastra. Usa il nastro da provare, disattiva Dolby/NR e porta il nastro oltre il tratto iniziale non registrabile.",
            )}
          </p>
          <p className="caption">
            {translate(
              "Premi REC sulla piastra, poi Avvia prova: l’audio parte dopo 3…2…1. Lascia fissi volume d’uscita e REC LEVEL fino alla fine. La sequenza sale fino a −3 dBFS peak: parti con un volume moderato.",
            )}
          </p>
          <div className="calibration-record-layout">
            <fieldset
              className="calibration-output-settings"
              disabled={locked || capturing}
            >
              <div className="subsection-title">
                <h3>{translate("Uscita verso il deck")}</h3>
                <button
                  className="button small"
                  onClick={refresh}
                  aria-label={translate("Aggiorna uscite")}
                >
                  <RefreshCw size={14} />
                </button>
              </div>
              <Select
                label={translate("Uscita verso la piastra")}
                value={device}
                onChange={(v) => setOutput(Number(v))}
              >
                <option value={-1} disabled>
                  {translate("Seleziona uscita")}
                </option>
                {outputs.map((d) => (
                  <option key={d.index} value={d.index}>
                    {d.name}
                  </option>
                ))}
              </Select>
              <Select
                label={translate("Frequenza del progetto e della prova")}
                value={project.processing.sample_rate}
                onChange={(v) => updateProcessing({ sample_rate: Number(v) })}
              >
                {[44100, 48000, 88200, 96000].map((rate) => (
                  <option key={rate} value={rate}>
                    {(rate / 1000).toLocaleString(localeTag())}{" "}
                    {translate("kHz")}
                  </option>
                ))}
              </Select>
              <NumberField
                label={translate("Attenuazione della prova")}
                value={probeGainDb}
                min={-24}
                max={0}
                step={0.5}
                unit="dB"
                onChange={setProbeGainDb}
              />
              {output && (
                <div className="calibration-device-rate">
                  <p className="caption">
                    {translate("Uscita configurata sul computer:")}{" "}
                    {(output.rate / 1000).toLocaleString(localeTag())}{" "}
                    {translate("kHz. La prova usa la frequenza del progetto.")}
                  </p>
                  <button
                    className="button small"
                    disabled={
                      ![44100, 48000, 88200, 96000].includes(output.rate) ||
                      project.processing.sample_rate === output.rate
                    }
                    onClick={() =>
                      updateProcessing({
                        sample_rate: output!.rate,
                      })
                    }
                  >
                    {translate("Usa frequenza del dispositivo")}
                  </button>
                </div>
              )}

              <p className="caption">
                {translate(
                  "La sequenza di prova non usa EQ, compressione o NR della mixtape.",
                )}
              </p>
            </fieldset>
            <div className="calibration-record-console">
              <div className="button-row">
                <button
                  className="button primary"
                  disabled={
                    !native ||
                    locked ||
                    capturing ||
                    device < 0 ||
                    !outputs.length
                  }
                  onClick={() => signal()}
                >
                  <Play size={16} />
                  {translate("Avvia prova")}
                </button>
                <button
                  className="button"
                  disabled={!playing && countdown == null}
                  onClick={stop}
                >
                  <Square size={15} />
                  {translate("Stop")}
                </button>
                <button
                  className="button"
                  disabled={!native || locked || capturing}
                  onClick={() => signal(true)}
                >
                  <Download size={15} />
                  {translate("WAV")}
                </button>
              </div>

              <CalibrationProgress
                elapsed={probeElapsed}
                status={probeStatus}
                countdown={countdown}
                error={probeError || result?.error}
              />
              <div className="probe-output">
                <Meters
                  telemetry={probePath && playing && !result ? telemetry : null}
                />
              </div>
              <p className="caption">
                {translate(
                  "Non fermare prima del marcatore finale. Usa WAV per registrare con un altro player. Il segnale serve a misurare, non segue le regolazioni della mixtape.",
                )}
              </p>
            </div>
          </div>
          <div className="calibration-step-footer">
            <button
              className="button"
              disabled={locked}
              onClick={() => setStep(1)}
            >
              {translate("Passa all’acquisizione")}
              <ArrowRight size={16} />
            </button>
            <span>
              {translate("Al termine ferma REC e riavvolgi il nastro.")}
            </span>
          </div>
        </section>
      )}
      <div hidden={currentStep !== 1}>
        <CalibrationCapture
          onAnalyze={(path) => void analyze(path)}
          onImport={() => void analyze(null)}
          onStart={() => {
            setAnalysisView("empty");
            setAnalysisError("");
          }}
        />
      </div>
      {currentStep === 2 && (analysisView !== "saved" || !report) && (
        <section
          className="calibration-card calibration-analysis"
          aria-busy={analysisView === "running"}
        >
          <div className="calibration-card-heading">
            <span className="step-number">03</span>
            <div>
              <h2>
                {analysisView === "running"
                  ? translate("Analisi della registrazione")
                  : analysisView === "error"
                    ? translate("Analisi non completata")
                    : translate("Pronta per l’analisi")}
              </h2>
              <p>
                {analysisView === "running"
                  ? translate(
                      "Allineo i marcatori e misuro frequenze, livelli, rumore e canali.",
                    )
                  : translate(
                      "Usa l’acquisizione appena salvata o importa un WAV della prova.",
                    )}
              </p>
            </div>
          </div>
          {analysisView === "running" ? (
            <JobProgress />
          ) : (
            <>
              <p role={analysisView === "error" ? "alert" : undefined}>
                {analysisError}
              </p>
              <div className="calibration-actions">
                <button className="button" onClick={() => setStep(1)}>
                  {translate("Torna all’acquisizione")}
                </button>
                <button
                  className="button primary"
                  disabled={!capturePath || locked}
                  onClick={() => void analyze(capturePath)}
                >
                  {translate("Analizza acquisizione")}
                </button>
                <button
                  className="button"
                  disabled={locked}
                  onClick={() => void analyze(null)}
                >
                  {translate("Importa WAV della prova")}
                </button>
              </div>
            </>
          )}
        </section>
      )}
      {currentStep === 2 && analysisView === "saved" && report && (
        <>
          <CalibrationExams report={report} />
          <section className="calibration-card">
            <div className="calibration-card-heading">
              <span className="step-number">
                <Check size={20} />
              </span>
              <div>
                <h2>{translate("La tua registrazione, misurata")}</h2>
                <p>
                  {report.source} ·{" "}
                  {(report.sample_rate / 1000).toLocaleString(localeTag())}{" "}
                  {translate("kHz · risultati salvati nel progetto")}
                </p>
              </div>
            </div>
            {report.warnings.map((w) => (
              <p className="inline-warning" key={translate(w)}>
                {translate(w)}
              </p>
            ))}
            {levelAdvice && (
              <aside
                className={`calibration-advice ${levelAdvice.kind}`}
                aria-label={translate("Azione consigliata")}
              >
                {levelAdvice.kind === "record" ? (
                  <ArrowDown size={21} />
                ) : (
                  <AlertTriangle size={21} />
                )}
                <div>
                  <strong>{translate("Azione consigliata")}</strong>
                  <p>
                    {levelAdvice.kind === "record"
                      ? translate(
                          "Riduci il livello di registrazione di circa {0} dB. Abbassa REC LEVEL sulla piastra oppure il livello digitale inviato alla sorgente, poi ripeti la prova. Picco massimo suggerito: {1} dBFS.",
                          [
                            levelAdvice.reductionDb.toFixed(1),
                            levelAdvice.targetPeakDbfs.toFixed(1),
                          ],
                        )
                      : translate(
                          "Il clipping è nella cattura LINE OUT → scheda: riduci quel livello di almeno {0} dB. REC LEVEL non corregge questa fase; usa l’uscita della piastra o un attenuatore se la scheda ha guadagno fisso.",
                          [levelAdvice.reductionDb.toFixed(1)],
                        )}
                  </p>
                </div>
                {levelAdvice.kind === "record" && (
                  <button
                    className="button small"
                    onClick={() => {
                      setProbeGainDb((gain) =>
                        Math.max(-24, gain - levelAdvice.reductionDb),
                      );
                      setStep(0);
                    }}
                  >
                    {translate("Applica alla prossima prova")}
                  </button>
                )}
              </aside>
            )}
            <div className="calibration-stats">
              <div>
                <span>{translate("Rumore di fondo")}</span>
                <strong>
                  {report.noise_dbfs.some((v) => v <= -120)
                    ? translate("Sotto il limite numerico")
                    : pair(report.noise_dbfs)}
                </strong>
                <small>{translate("Nel silenzio registrato")}</small>
              </div>
              <div>
                <span>{translate("Segnale / rumore")}</span>
                <strong>
                  {report.noise_dbfs.some((v) => v <= -120)
                    ? translate("Non stimabile")
                    : pair(report.snr_db, "dB")}
                </strong>
                <small>
                  {translate("Riferito al tono 315 Hz a −18 dBFS peak")}
                </small>
              </div>
              <div>
                <span>{translate("Bilanciamento R − L")}</span>
                <strong>
                  {signed(report.imbalance_db)} {translate(" dB")}
                </strong>
                <small>{translate("Sullo stesso tono di riferimento")}</small>
              </div>
              <div>
                <span>{translate("Scostamento di velocità")}</span>
                <strong>
                  {((1 / report.time_scale - 1) * 100).toFixed(2)} %
                </strong>
                <small>
                  {translate("Media tra i marcatori, non wow/flutter")}
                </small>
              </div>
            </div>
            <h3>{translate("Risposta in frequenza")}</h3>
            <p className="caption">
              {translate(
                "Riferimento 1 kHz = 0 dB. Sotto la linea, il segnale è attenuato. Le misure includono scheda audio, piastra e nastro.",
              )}
            </p>
            <svg
              className="calibration-response"
              viewBox="0 0 760 220"
              role="img"
              aria-label={translate(
                "Risposta misurata dei canali sinistro e destro",
              )}
            >
              <title>
                {translate("Risposta in frequenza relativa a 1 kHz")}
              </title>
              {[-12, -6, 0, 6].map((db) => (
                <g key={db}>
                  <line x1="45" x2="735" y1={100 - db * 7} y2={100 - db * 7} />
                  <text x="4" y={104 - db * 7}>
                    {signed(db)}
                  </text>
                </g>
              ))}
              {[0, 1].map((ch) => (
                <polyline
                  key={ch}
                  className={ch === 0 ? "channel-left" : "channel-right"}
                  points={report.bands
                    .map(
                      (b, i) =>
                        `${55 + i * 74},${100 - Math.max(-12, Math.min(6, b.response_db[ch])) * 7}`,
                    )
                    .join(" ")}
                />
              ))}
              {report.bands.map((b, i) => (
                <text
                  key={b.frequency}
                  x={55 + i * 74}
                  y="210"
                  textAnchor="middle"
                >
                  {b.frequency >= 1000 ? `${b.frequency / 1000}k` : b.frequency}
                </text>
              ))}
            </svg>
            <div className="calibration-legend">
              <span>{translate("● Sinistro")}</span>
              <span>{translate("● Destro")}</span>
            </div>
            <details className="disclosure">
              <summary>{translate("Valori delle dieci bande")}</summary>
              <div className="measurement-table">
                <table>
                  <thead>
                    <tr>
                      <th>{translate("Frequenza")}</th>
                      <th>{translate("Sinistro")}</th>
                      <th>{translate("Destro")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.bands.map((b) => (
                      <tr key={b.frequency}>
                        <td>
                          {b.frequency} {translate(" Hz")}
                        </td>
                        <td>
                          {signed(b.response_db[0])} {translate(" dB")}
                        </td>
                        <td>
                          {signed(b.response_db[1])} {translate(" dB")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </section>
          <div className="calibration-columns">
            <section className="calibration-card">
              <h2>{translate("Livelli e saturazione")}</h2>
              <p className="caption">
                {translate(
                  "La compressione indica quanto il livello sale meno del previsto. HD3 misura la terza armonica del tono; valori indicativi, non MOL certificato.",
                )}
              </p>
              <div className="measurement-table">
                <table>
                  <thead>
                    <tr>
                      <th>{translate("Ingresso")}</th>
                      <th>{translate("Compressione L / R")}</th>
                      <th>{translate("HD3 L / R")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.levels.map((l) => (
                      <tr key={l.input_dbfs}>
                        <td>
                          {l.input_dbfs} {translate(" dBFS")}
                        </td>
                        <td>
                          {l.compression_db.map((v) => signed(v)).join(" / ")}{" "}
                          {translate("dB")}
                        </td>
                        <td>
                          {l.hd3_percent.map((v) => v.toFixed(2)).join(" / ")} %
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <details className="disclosure">
                <summary>
                  {translate("Canali e qualità dell’acquisizione")}
                </summary>
                <p>
                  {translate("Picchi: ")}
                  {pair(report.peak_dbfs)}.
                </p>
                <p>
                  {translate("Campioni prossimi al fondo scala: L")}{" "}
                  {report.clipped_samples[0]} · R {report.clipped_samples[1]}.
                </p>
                <p>
                  {translate("Clipping cumulativo: L")}{" "}
                  {(
                    (report.clipped_samples[0] / report.sample_rate) *
                    1000
                  ).toFixed(2)}{" "}
                  {translate("ms · R")}{" "}
                  {(
                    (report.clipped_samples[1] / report.sample_rate) *
                    1000
                  ).toFixed(2)}{" "}
                  {translate(
                    "ms. Il clipping blocca l’EQ solo oltre 1 ms per canale.",
                  )}
                </p>
                <p>
                  {translate("Diafonia:")}
                  {pair(report.crosstalk_db, "dB")}{" "}
                  {translate(
                    "rispetto al canale pilotato. Più negativo indica meno passaggio.",
                  )}
                </p>
                <p>
                  {translate("Rumore 4–12 kHz: ")}
                  {pair(report.hiss_dbfs)}.
                </p>
                <p>
                  {translate("Confidenza marcatori:")}{" "}
                  {(report.sync_confidence * 100).toFixed(0)}%.
                </p>
              </details>
            </section>
            <RecordingProfileBuilder key={report.source} report={report} />
          </div>
          <p className="calibration-limits">
            {translate(
              "Questa prova non calibra il Dolby e non misura bias, flusso magnetico, MOL assoluto o wow/flutter secondo standard. Per confermare una correzione, registra e confronta un passaggio musicale. Se cambi nastro, REC LEVEL o collegamenti, ripeti la prova.",
            )}
          </p>
          <button
            className="button"
            disabled={locked || capturing}
            onClick={() => {
              setStep(0);
            }}
          >
            {translate("Rifai la prova")}
          </button>
          <button
            className="text-button"
            disabled={locked || capturing}
            onClick={() => {
              edit((p) => {
                p.calibration_report = null;
              });
              setStep(0);
            }}
          >
            {translate("Rimuovi misurazione")}
          </button>
        </>
      )}
    </div>
  );
}
