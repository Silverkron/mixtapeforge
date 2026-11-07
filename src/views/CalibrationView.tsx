import { t as translate, localeTag } from "../i18n";
import { useState } from "react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Check,
  Download,
  Gauge,
  Play,
  Square,
  X,
} from "lucide-react";
import { call, native } from "../backend";
import { IconButton, Meters } from "../components";
import { useStudio } from "../studio-context";
import type { CalibrationReport } from "../types";
import {
  calibrationLevelAdvice,
  MIN_RECORDING_LEVEL_DB,
  probeGainForLevel,
} from "../calibration-advice";
import { DeckLevelFader } from "./DeckLevelFader";
import { CalibrationCapture } from "./CalibrationCapture";
import { CalibrationProgress, type ProbeStatus } from "./CalibrationProgress";
import { JobProgress } from "./JobProgress";
import { CalibrationExams } from "./CalibrationExams";
import { RecordingProfileBuilder } from "./RecordingProfiles";

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
    capturing,
    capturePath,
    panel,
    setPanel,
    dialog,
  } = useStudio();
  const [step, setStep] = useState(0);
  const [probePath, setProbePath] = useState<string | null>(null);
  const recordingLevelDb = project.processing.ceiling;
  const probeGainDb = probeGainForLevel(recordingLevelDb);
  const [lastProbeGainDb, setLastProbeGainDb] = useState<number | null>(null);
  const [captureGainDb, setCaptureGainDb] = useState<number | null>(null);
  const [levelToneOpen, setLevelToneOpen] = useState(false);
  const [levelTonePath, setLevelTonePath] = useState<string | null>(null);
  const [levelToneError, setLevelToneError] = useState<string | null>(null);
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
  const levelToneResult =
    levelTonePath && outputResult?.path === levelTonePath ? outputResult : null;
  const levelToneStatus =
    countdown != null
      ? translate("Il tono parte tra {0} s.", [countdown])
      : playing
        ? translate("Tono in uscita · regola REC LEVEL")
        : levelToneResult?.completed
          ? translate("Tono terminato · controlla il VU e ripeti se serve.")
          : levelToneResult
            ? translate("Tono interrotto.")
            : translate("Tono pronto.");

  const report = project.calibration_report;
  const levelAdvice = report ? calibrationLevelAdvice(report) : null;
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
        if (ok) setLastProbeGainDb(probeGainDb);
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
    } else if (path) {
      setLastProbeGainDb(probeGainDb);
      notify(translate("Sequenza di calibrazione esportata"));
    }
  }
  async function analyze(path: string | null) {
    setStep(2);
    setAnalysisView("running");
    setAnalysisError("");
    const r = await run(
      () =>
        call<CalibrationReport | null>("analyze_calibration", {
          path,
          gainDb: path
            ? (captureGainDb ?? lastProbeGainDb ?? probeGainDb)
            : probeGainDb,
        }),
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
  async function startLevelTone() {
    setLevelToneError(null);
    setLevelTonePath(null);
    const path = await run(
      () =>
        call<string | null>("generate_tone", {
          frequency: 1000,
          level: recordingLevelDb,
          seconds: 20,
          kind: "sine",
          export: false,
          sampleRate: project.processing.sample_rate,
        }),
      translate("Preparo il tono di riferimento…"),
    );
    if (!path) {
      setLevelToneError(
        translate(
          "Non riesco ad avviare il tono. Controlla l’uscita selezionata.",
        ),
      );
      return;
    }
    setLevelTonePath(path);
    const started = await run(
      () => startRecording(path),
      translate("Avvio il tono di riferimento…"),
    );
    if (started === undefined)
      setLevelToneError(
        translate(
          "Non riesco ad avviare il tono. Controlla l’uscita selezionata.",
        ),
      );
  }
  function closeLevelTone() {
    if (busy) return;
    if (playing || countdown != null) void stop();
    setLevelToneOpen(false);
    setLevelToneError(null);
  }
  return (
    <div className="calibration-page">
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
              "Premi REC sulla piastra, poi Avvia prova. L’audio parte dopo 3…2…1. Lascia fissi volume d’uscita e REC LEVEL fino alla fine. La sequenza sale fino al livello impostato in Controlli audio.",
            )}
          </p>
          <div className="calibration-record-layout">
            <section className="calibration-output-settings">
              <h3>{translate("Uscita verso il deck")}</h3>
              <p>{output?.name ?? translate("Nessuna uscita disponibile")}</p>
              <p className="caption">
                {translate("Livello verso la piastra")} · {recordingLevelDb}{" "}
                {translate("dBFS")}
                {" · "}
                {(project.processing.sample_rate / 1000).toLocaleString(
                  localeTag(),
                )}{" "}
                {translate("kHz")}
              </p>
              {output && (
                <p className="caption">
                  {translate("Uscita configurata sul computer:")}{" "}
                  {(output.rate / 1000).toLocaleString(localeTag())}{" "}
                  {translate("kHz. La prova usa la frequenza del progetto.")}
                </p>
              )}
              <p className="caption">
                {translate(
                  "La sequenza di prova non usa EQ, compressione o NR della mixtape.",
                )}
              </p>
            </section>
            <div className="calibration-record-console">
              <section className="level-tone-entry">
                <span className="level-tone-entry-icon">
                  <Gauge size={22} />
                </span>
                <div>
                  <span className="eyebrow">
                    {translate("Prima di premere REC")}
                  </span>
                  <h3>{translate("Trova il livello di registrazione")}</h3>
                  <p>
                    {translate(
                      "Regola il VU della piastra con un tono continuo. Al termine torna alla prova completa.",
                    )}
                  </p>
                </div>
                <button
                  className="button"
                  disabled={locked || device < 0 || !outputs.length}
                  onClick={() => {
                    setLevelToneError(null);
                    setLevelToneOpen(true);
                  }}
                >
                  {translate("Apri regolazione")}
                </button>
              </section>
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
                  "Attendi il marcatore finale. Usa WAV per registrare con un altro player.",
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
            setCaptureGainDb(lastProbeGainDb ?? probeGainDb);
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
                  <div className="calibration-advice-actions">
                    <button
                      className="button small"
                      disabled={locked}
                      onClick={() => setPanel("master")}
                    >
                      {translate(
                        "Controlli audio · valore consigliato {0} dB",
                        [
                          signed(
                            Math.max(
                              MIN_RECORDING_LEVEL_DB,
                              levelAdvice.targetPeakDbfs,
                            ),
                          ),
                        ],
                      )}
                    </button>
                    <button
                      className="button small"
                      onClick={() => {
                        setStep(0);
                        setLevelToneOpen(true);
                      }}
                    >
                      {translate("Riprova con REC LEVEL")}
                    </button>
                  </div>
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
      {levelToneOpen && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeLevelTone();
          }}
        >
          <div
            className="modal level-tone-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="level-tone-title"
          >
            <header>
              <div>
                <span className="eyebrow">
                  {translate("Prima di premere REC")}
                </span>
                <h2 id="level-tone-title">
                  {translate("Trova il livello di registrazione")}
                </h2>
              </div>
              <IconButton
                label={translate("Chiudi finestra")}
                disabled={busy}
                onClick={closeLevelTone}
              >
                <X size={20} />
              </IconButton>
            </header>
            <div className="modal-content level-tone-content">
              <div className="level-tone-heading">
                <Gauge size={24} />
                <div>
                  <span className="eyebrow">
                    {translate("Tono di riferimento")}
                  </span>
                  <h3>1 kHz · 20 s</h3>
                  <p>
                    {translate(
                      "Sulla maggior parte delle piastre il VU indica l’inizio della saturazione. Segui il manuale se usa una scala diversa.",
                    )}
                  </p>
                </div>
              </div>
              <ol className="level-tone-steps">
                <li>
                  {translate("Inserisci il nastro e premi REC sulla piastra.")}
                </li>
                <li>{translate("Parti con REC LEVEL al minimo.")}</li>
                <li>
                  {translate(
                    "Avvia il tono e alza REC LEVEL finché il VU raggiunge il punto in cui inizia la saturazione.",
                  )}
                </li>
                <li>
                  {translate(
                    "Raggiunto il punto, ferma il tono. Non entrare nella zona rossa.",
                  )}
                </li>
              </ol>
              <div className="level-tone-controls">
                <DeckLevelFader unit="dBFS" />
                <div className="level-tone-monitor">
                  <div className="button-row">
                    <button
                      className="button primary"
                      disabled={
                        busy ||
                        playing ||
                        countdown != null ||
                        device < 0 ||
                        !outputs.length
                      }
                      onClick={() => void startLevelTone()}
                    >
                      <Play size={16} />
                      {levelToneResult
                        ? translate("Ripeti tono")
                        : translate("Avvia tono")}
                    </button>
                    <button
                      className="button"
                      disabled={!playing && countdown == null}
                      onClick={() => void stop()}
                    >
                      <Square size={15} />
                      {translate("Stop")}
                    </button>
                  </div>
                  {!outputs.length && (
                    <p className="inline-warning">
                      {translate("Seleziona prima un’uscita audio.")}
                    </p>
                  )}
                  {levelToneError && (
                    <p className="inline-warning" role="alert">
                      {levelToneError}
                    </p>
                  )}
                  <p className="level-tone-status" role="status">
                    {levelToneStatus}
                  </p>
                  <Meters
                    telemetry={levelTonePath && playing ? telemetry : null}
                  />
                  <p className="caption">
                    {translate(
                      "Leggi il livello sul VU della piastra. Il fader regola il picco del tono e il limite true peak del master.",
                    )}
                  </p>
                </div>
              </div>
              <div className="level-tone-footer">
                <p>
                  {translate(
                    "Il livello è pronto quando i picchi restano appena sotto l’inizio della saturazione.",
                  )}
                </p>
                <button
                  className="button"
                  disabled={busy || playing || countdown != null}
                  onClick={closeLevelTone}
                >
                  <Check size={16} />
                  {translate("Livello impostato")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
