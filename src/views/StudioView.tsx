import { useState } from "react";
import { t as translate, localeTag } from "../i18n";
import {
  AlertTriangle,
  Pause,
  Play,
  SlidersHorizontal,
  Square,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { trackAt } from "../player-timeline";
import { DigitalTime } from "./DigitalTime";
import { JobProgress } from "./JobProgress";
import { native } from "../backend";
import { Meters, Scope, Section, Select } from "../components";
import { time } from "../types";
import { useStudio } from "../studio-context";

export function StudioView() {
  const {
    project,
    busy,
    side,
    outputs,
    device,
    master,
    telemetry,
    playing,
    paused,
    togglePause,
    seek,
    skipTrack,
    recording,
    countdown,
    locked,
    prepare,
    record,
    stop,
    start,
    run,
    setPanel,
    openCalibration,
    used,
    remaining,
    inputs,
    capturing,
    capturePath,
    comparison,
    captureReturn,
    compareCapture,
    saveCapture,
    chooseSide,
    setOutput,
    refresh,
  } = useStudio();
  const [seekDraft, setSeekDraft] = useState<number | null>(null);
  const commitSeek = (value: number) => {
    void seek(value).finally(() => setSeekDraft(null));
  };
  const position = seekDraft ?? telemetry?.elapsed ?? 0;
  const current = trackAt(project, side, telemetry?.elapsed ?? 0);
  const navigationLocked = busy || recording || countdown !== null || capturing;
  return (
    <div className="compact-studio">
      <div className="record-heading">
        <h2>
          {translate("MIXTAPEFORGE")} <span>{translate("STEREO PLAYER")}</span>
        </h2>
        {project.recording_profile?.enabled && (
          <span
            className="tag profile-tag"
            title={project.recording_profile.conditions.name}
          >
            {translate("PROFILO ATTIVO")}
          </span>
        )}
        <span className={`tag ${playing ? "live" : ""}`}>
          {busy
            ? translate("ELABORAZIONE")
            : countdown !== null
              ? translate("IN PARTENZA")
              : paused
                ? translate("PAUSA")
                : playing
                  ? translate("IN USCITA")
                  : master
                    ? translate("PRONTO")
                    : translate("FERMO")}
        </span>
      </div>
      <div className="deck-display">
        <div className="player-track-display">
          <span className="player-title" title={project.title}>
            {project.title || translate("La mia mixtape")}
          </span>
          <span className="player-format">
            {translate("LATO")} {side ? "B" : "A"} ·{" "}
            {(project.processing.sample_rate / 1000).toLocaleString(
              localeTag(),
            )}{" "}
            {translate("kHz · STEREO")}
          </span>
        </div>
        <div className="player-readout">
          <div className="deck-clock" aria-label={translate("Tempo trascorso")}>
            <DigitalTime
              value={
                countdown !== null
                  ? `−00:0${countdown}`
                  : time(telemetry?.elapsed ?? 0)
              }
            />
          </div>
          <div className="deck-duration">
            {translate("DURATA LATO")} {side ? "B" : "A"} ·{" "}
            {time(master?.duration ?? used)}
          </div>
        </div>
        <div className="player-meters">
          <Meters
            telemetry={paused ? null : telemetry}
            reference={project.calibration?.reference}
          />
        </div>
        <div className="player-spectrum">
          <Scope
            values={paused ? undefined : telemetry?.spectrum}
            spectrum
            label={translate("Spettro dell’uscita digitale")}
          />
          <div className="spectrum-axis">
            <span>{translate("20 Hz")}</span>
            <span>200</span>
            <span>2k</span>
            <span>{translate("20k Hz")}</span>
          </div>
        </div>
      </div>
      <div
        className="player-controls"
        aria-label={translate("Comandi del player")}
      >
        <div
          className="segmented player-sides"
          aria-label={translate("Lato da ascoltare")}
        >
          {[0, 1].map((s) => (
            <button
              key={s}
              disabled={locked}
              aria-pressed={side === s}
              className={side === s ? "active" : ""}
              onClick={() => chooseSide(s)}
            >
              {translate("Lato")} {s ? "B" : "A"}
            </button>
          ))}
        </div>
        <button
          className="button transport-key"
          aria-label={translate("Brano precedente")}
          title={translate("Brano precedente · Alt + ←")}
          disabled={navigationLocked || !native || !project.sides[side].length}
          onClick={() => skipTrack(-1)}
        >
          <SkipBack size={16} />
        </button>
        <button
          className="button primary transport-key play-key"
          disabled={
            busy ||
            capturing ||
            countdown !== null ||
            (playing && !paused) ||
            !native ||
            !project.sides[side].length ||
            remaining < 0 ||
            !outputs.length ||
            !!master?.clipped
          }
          onClick={async () => {
            if (playing && paused) {
              await togglePause();
              return;
            }
            const ready = master ?? (await prepare());
            if (ready && !ready.clipped) await run(() => start(ready.path));
          }}
          aria-keyshortcuts="Space"
          title={translate(
            "Prepara se necessario e ascolta il lato dall’inizio",
          )}
        >
          <svg
            className="transport-glyph"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M5 3L17 10L5 17Z" />
          </svg>
          {translate("Ascolta")}
        </button>
        <button
          className="button transport-key"
          disabled={!playing || busy || countdown !== null}
          onClick={togglePause}
          title={
            paused
              ? translate("Riprendi dallo stesso punto · Spazio")
              : translate("Metti in pausa · Spazio")
          }
        >
          {paused ? <Play size={16} /> : <Pause size={16} />}
          {paused ? translate("Riprendi") : translate("Pausa")}
        </button>
        <button
          className="button transport-key"
          disabled={!playing && countdown === null}
          onClick={stop}
          title={translate("Ferma uscita · Esc")}
        >
          <svg
            className="transport-glyph"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M4 4H16V16H4Z" />
          </svg>
          {translate("Stop")}
        </button>
        <button
          className="button transport-key record-to-tape"
          disabled={
            locked ||
            !native ||
            !project.sides[side].length ||
            remaining < 0 ||
            !outputs.length ||
            !!master?.clipped
          }
          onClick={async () => {
            const ready = master ?? (await prepare());
            if (ready) await record(ready);
          }}
          title={translate(
            "Premi REC sulla piastra, poi REC qui: l’audio parte dopo 3 secondi",
          )}
        >
          <svg
            className="transport-glyph"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <circle cx="10" cy="10" r="6" />
          </svg>
          {translate("REC")}
        </button>
        <button
          className="button transport-key"
          aria-label={translate("Brano successivo")}
          title={translate("Brano successivo · Alt + →")}
          disabled={navigationLocked || !native || !project.sides[side].length}
          onClick={() => skipTrack(1)}
        >
          <SkipForward size={16} />
        </button>
        <span className="toolbar-spacer" />
        <button className="button small" onClick={() => setPanel("master")}>
          {translate("EQ / Audio")}
        </button>
      </div>
      <div className="player-now-playing" aria-live="off">
        {current
          ? `${project.sides[side].indexOf(current.track.id) + 1}. ${current.track.title}${current.track.artist ? ` · ${current.track.artist}` : ""}`
          : recording
            ? "REC"
            : "STEREO"}
      </div>
      <div className="player-status">
        {busy ? (
          <JobProgress />
        ) : (
          <>
            <input
              type="range"
              step={1}
              min={0}
              disabled={navigationLocked || !master}
              onChange={(e) => setSeekDraft(Number(e.target.value))}
              onPointerUp={(e) => commitSeek(Number(e.currentTarget.value))}
              onPointerCancel={() => setSeekDraft(null)}
              onKeyUp={(e) => {
                if (
                  [
                    "ArrowLeft",
                    "ArrowRight",
                    "ArrowUp",
                    "ArrowDown",
                    "Home",
                    "End",
                    "PageUp",
                    "PageDown",
                  ].includes(e.key)
                )
                  commitSeek(Number(e.currentTarget.value));
              }}
              aria-valuetext={`${time(position)} / ${time(master?.duration ?? used)}`}
              className="player-progress"
              aria-label={translate("Avanzamento del lato")}
              max={Math.max(1, master?.duration ?? used)}
              value={Math.max(0, Math.min(position, master?.duration ?? used))}
            />
            <p className="deck-guidance" role="status">
              {countdown !== null
                ? translate("L’audio parte tra {0} secondi.", [countdown])
                : paused
                  ? translate("In pausa. Metti in pausa anche il deck.")
                  : playing
                    ? translate("Audio in uscita. A fine lato ferma il deck.")
                    : master
                      ? translate(
                          "Per registrare: premi REC sulla piastra, poi REC qui.",
                        )
                      : translate(
                          "Ascolta il lato. Per registrare, premi REC sulla piastra, poi REC qui.",
                        )}
            </p>
          </>
        )}
      </div>
      {remaining < 0 && (
        <p className="inline-warning" role="alert">
          <AlertTriangle size={15} />
          {translate("Togli")}
          {time(-remaining)} {translate("da questo lato prima di prepararlo.")}
        </p>
      )}
      {master?.nr === "type_b" && (
        <p className="inline-warning">
          {translate(
            "Type B: NR del deck OFF per registrare, Dolby B per riascoltare.",
          )}
        </p>
      )}
      {!!master?.clipped && (
        <p className="inline-warning" role="alert">
          {translate("Picchi fuori scala: riduci il guadagno e ricalcola.")}
        </p>
      )}
      {(telemetry?.underruns ?? 0) > 0 && (
        <p className="inline-warning" role="alert">
          {telemetry!.underruns}{" "}
          {translate("interruzioni audio: verifica la registrazione.")}
        </p>
      )}
      <details
        className="disclosure deck-settings"
        onToggle={(e) => {
          if (e.currentTarget.open && !locked) void refresh();
        }}
      >
        <summary>{translate("Uscita, calibrazione e dettagli")}</summary>
        <Select
          label={translate("Uscita audio")}
          value={device}
          onChange={(v) => setOutput(Number(v))}
          disabled={locked}
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
              {d.name}
            </option>
          ))}
        </Select>
        <button
          className="button small full"
          disabled={locked}
          onClick={openCalibration}
        >
          <SlidersHorizontal size={14} />
          {translate("Prova livelli e tono")}
        </button>
        <p className="record-note">
          {translate(
            "I meter mostrano l’audio digitale. Controlla anche i livelli sul deck.",
          )}
        </p>
        {master && (
          <details className="disclosure">
            <summary>{translate("Misure del master")}</summary>
            <button
              className="button small"
              disabled={locked}
              onClick={prepare}
            >
              {translate("Ricalcola master")}
            </button>
            <p className="caption">
              {translate("Picco")}
              {master.peak.toFixed(2)} {translate(" dBFS · True peak")}{" "}
              {master.true_peak.toFixed(2)} {translate(" dBTP.")}{" "}
              {master.nr === "type_b"
                ? translate("Attenuazione prima dell’encoder NR")
                : translate("Attenuazione finale")}{" "}
              {master.attenuation.toFixed(2)} {translate(" dB. ")}
              {master.clipped} {translate("campioni fuori scala.")}
              {project.recording_profile?.version === 2 &&
                translate(
                  " L’attenuazione include il margine stimato del profilo per le frequenze presenti nel master.",
                )}
            </p>
          </details>
        )}
        <details className="disclosure return-disclosure">
          <summary>{translate("Confronta il ritorno dal deck")}</summary>
          <Section
            title={translate("Confronta il ritorno")}
            eyebrow={translate("OFF-TAPE · DIFFERITO")}
          >
            <div className="panel-content">
              <p className="caption">
                {translate(
                  "Collega LINE OUT del deck all’ingresso selezionato in Impostazioni. Premi REC sul deck per una prova. Acquisizione fino a 60 secondi; confronto sui primi 30, con allineamento automatico entro ±10 secondi.",
                )}
              </p>
              <button
                className="button full"
                disabled={
                  !native || !inputs.length || busy || (!master && !capturing)
                }
                onClick={() => captureReturn(!capturing)}
              >
                {capturing ? <Square size={14} /> : <Play size={14} />}{" "}
                {capturing
                  ? translate("Ferma acquisizione")
                  : translate("Acquisisci e ascolta il master")}
              </button>
              <div className="button-row">
                <button
                  className="button"
                  disabled={!capturePath || capturing || !master || busy}
                  onClick={compareCapture}
                >
                  {translate("Confronta")}
                </button>
                <button
                  className="button"
                  disabled={!capturePath || capturing || busy}
                  onClick={saveCapture}
                >
                  {translate("Salva ritorno WAV")}
                </button>
              </div>
              {comparison && (
                <>
                  <div className="stat-grid">
                    <div>
                      <span>RITARDO</span>
                      <b>
                        {comparison.delay_ms.toFixed(1)} {translate(" ms")}
                      </b>
                    </div>
                    <div>
                      <span>CORRELAZIONE</span>
                      <b>{(comparison.correlation * 100).toFixed(1)} %</b>
                    </div>
                    <div>
                      <span>{translate("DIFFERENZA L")}</span>
                      <b>
                        {comparison.level_difference[0].toFixed(2)}{" "}
                        {translate(" dB")}
                      </b>
                    </div>
                    <div>
                      <span>{translate("DIFFERENZA R")}</span>
                      <b>
                        {comparison.level_difference[1].toFixed(2)}{" "}
                        {translate(" dB")}
                      </b>
                    </div>
                  </div>
                  <p className="caption">
                    {translate("Residuo dopo compensazione del guadagno:")}{" "}
                    {comparison.residual_percent.toFixed(2)}
                    {translate("% su")} {comparison.seconds.toFixed(1)}{" "}
                    {translate(
                      "s. Include EQ, rumore e differenze temporali: non è una misura di THD. Nessuna compensazione continua di wow/flutter.",
                    )}
                  </p>
                </>
              )}
            </div>
          </Section>
        </details>
      </details>
    </div>
  );
}
