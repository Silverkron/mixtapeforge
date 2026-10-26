import { t as translate, localeTag } from "../i18n";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Download,
  FileAudio,
  Mic,
  RefreshCw,
  Square,
} from "lucide-react";
import { Meters, Scope, Select } from "../components";
import { native } from "../backend";
import { time, type Telemetry } from "../types";
import { useStudio } from "../studio-context";

export function CalibrationCapture({
  onAnalyze,
  onImport,
  onStart,
}: {
  onAnalyze: (path: string) => void;
  onImport: () => void;
  onStart: () => void;
}) {
  const {
    inputs,
    inputDevice,
    setInputDevice,
    refresh,
    locked,
    busy,
    playing,
    capturing,
    capturePath,
    captureReturn,
    inputTelemetry,
    inputError,
    saveCapture,
  } = useStudio();
  const [snapshot, setSnapshot] = useState<Telemetry | null>(null);
  const [spectrum, setSpectrum] = useState<number[]>([]);
  const aggregate = useRef({ count: 0, power: [] as number[] });
  useEffect(() => {
    aggregate.current = { count: 0, power: [] };
    setSnapshot(null);
    setSpectrum([]);
  }, [capturePath]);
  useEffect(() => {
    if (!capturing || !inputTelemetry) return;
    setSnapshot(inputTelemetry);
    const a = aggregate.current;
    a.count++;
    a.power = inputTelemetry.spectrum.map(
      (v, i) => (a.power[i] ?? 0) + 10 ** (v / 10),
    );
    setSpectrum(
      a.power.map((v) => 10 * Math.log10(Math.max(1e-16, v / a.count))),
    );
  }, [capturing, inputTelemetry]);
  const elapsed = inputTelemetry?.calibration_complete
    ? inputTelemetry.elapsed
    : (snapshot?.elapsed ?? 0);
  const ready = !!capturePath && !capturing && !inputError;
  return (
    <section className="calibration-card calibration-capture">
      <div className="calibration-card-heading">
        <span className="step-number">02</span>
        <div>
          <h2>{translate("Acquisisci il riascolto")}</h2>
          <p>
            {translate(
              "Collega LINE OUT della piastra all’ingresso stereo della scheda.",
            )}
          </p>
        </div>
      </div>
      <p>
        {translate(
          "Ferma REC, lascia Dolby/NR disattivato e riavvolgi prima dell’inizio della prova. Avvia l’acquisizione qui, poi premi PLAY sulla piastra. L’acquisizione si ferma da sola dopo il marcatore finale. Puoi fermarla anche manualmente.",
        )}
      </p>
      <div className="calibration-device-controls">
        <fieldset disabled={locked || capturing}>
          <Select
            label={translate("Ingresso dalla piastra")}
            value={inputDevice}
            onChange={(v) => setInputDevice(Number(v))}
          >
            <option value={-1} disabled>
              {translate("Seleziona ingresso")}
            </option>
            {inputs.map((d) => (
              <option key={d.index} value={d.index}>
                {d.name} · {(d.rate / 1000).toLocaleString(localeTag())}{" "}
                {translate("kHz")}
              </option>
            ))}
          </Select>
        </fieldset>
        <button
          className="button"
          disabled={locked || capturing}
          onClick={refresh}
          aria-label={translate("Aggiorna ingressi")}
        >
          <RefreshCw size={16} />
        </button>
      </div>
      <div className="calibration-actions">
        <button
          className={`button ${capturing ? "stop" : "primary"}`}
          disabled={
            !native ||
            busy ||
            playing ||
            (!capturing && (inputDevice < 0 || !inputs.length))
          }
          onClick={() => {
            if (!capturing) onStart();
            void captureReturn(false, true);
          }}
        >
          {capturing ? <Square size={16} /> : <Mic size={16} />}
          {capturing
            ? translate("Ferma acquisizione")
            : ready
              ? translate("Ripeti acquisizione")
              : translate("Avvia acquisizione")}
        </button>
        <button
          className="button primary"
          disabled={!native || !ready || locked}
          onClick={() => {
            if (capturePath) onAnalyze(capturePath);
          }}
        >
          {translate("Analizza prova")}
          <ArrowRight size={16} />
        </button>
        <button
          className="button"
          disabled={!native || !ready || locked}
          onClick={saveCapture}
        >
          <Download size={16} />
          {translate("Salva acquisizione")}
        </button>
      </div>
      <div className="capture-status">
        <strong role="status">
          <span
            className="capture-status-reserve"
            aria-hidden="true"
            data-reserve="Marcatore finale riconosciuto · acquisizione terminata"
          />
          <span>
            {capturing
              ? translate("Acquisizione in corso")
              : inputError
                ? translate("Acquisizione interrotta")
                : ready
                  ? inputTelemetry?.calibration_complete
                    ? translate(
                        "Marcatore finale riconosciuto · acquisizione terminata",
                      )
                    : translate("Acquisizione pronta da analizzare")
                  : translate("In attesa del riascolto")}
          </span>
        </strong>
        <span>
          {time(elapsed)} <small>/ 03:00 max</small>
        </span>
      </div>
      <p
        className={`caption capture-feedback ${inputError ? "inline-warning" : ""}`}
        role={inputError ? "alert" : undefined}
      >
        <span
          className="capture-status-reserve"
          aria-hidden="true"
          data-reserve="Ora puoi fermare PLAY sulla piastra e analizzare la prova."
        />
        <span>
          {inputError
            ? translate("{0} Ripeti l’acquisizione prima di analizzare.", [
                inputError,
              ])
            : !capturing && ready && inputTelemetry?.calibration_complete
              ? translate(
                  "Ora puoi fermare PLAY sulla piastra e analizzare la prova.",
                )
              : translate(
                  "L’acquisizione conserva l’audio originale dell’ingresso.",
                )}
        </span>
      </p>
      <div className="capture-instruments">
        <div>
          <h3>{translate("Livelli in ingresso")}</h3>
          <Meters telemetry={capturing ? inputTelemetry : snapshot} input />
          <p className="caption">
            {translate(
              "Lascia margine ai picchi. Il segnale d’ingresso non viene reinviato all’uscita.",
            )}
          </p>
        </div>
        <div>
          <h3>
            {capturing
              ? translate("Spettro in ingresso")
              : translate("Spettro acquisito")}
          </h3>
          <Scope
            values={capturing ? (inputTelemetry?.spectrum ?? []) : spectrum}
            spectrum
            label={
              capturing
                ? translate("Spettro del segnale in ingresso")
                : translate("Spettro medio durante l’acquisizione")
            }
          />
          <div className="capture-frequency-scale">
            <span>{translate("20 Hz")}</span>
            <span>200</span>
            <span>2k</span>
            <span>{translate("20k Hz")}</span>
          </div>
          <p className="caption">
            {capturing
              ? translate("Spettro istantaneo del segnale che stai acquisendo.")
              : spectrum.length
                ? translate(
                    "Media degli spettri rilevati durante l’acquisizione.",
                  )
                : translate("Lo spettro apparirà quando avvii l’acquisizione.")}
          </p>
        </div>
      </div>
      <div className="capture-waveform">
        <h3>
          {capturing
            ? translate("Segnale registrato")
            : translate("Ultima finestra acquisita")}
        </h3>
        <Scope
          values={snapshot?.waveform ?? []}
          label={translate("Forma d’onda dell’ultima finestra acquisita")}
        />
      </div>
      <div className="capture-import">
        <button
          className="button"
          disabled={!native || locked}
          onClick={onImport}
        >
          <FileAudio size={16} />
          {translate("Importa WAV della prova")}
        </button>
        <p className="caption">
          {translate(
            "Hai acquisito con un altro programma? Usa un WAV stereo con entrambi i marcatori, massimo 3 minuti.",
          )}
        </p>
      </div>
    </section>
  );
}
