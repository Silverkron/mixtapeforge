import { t as translate, localeTag } from "../i18n";
import { time } from "../types";

import protocol from "../calibration-protocol.json";
export const CALIBRATION_PHASES = protocol.phases;
export const CALIBRATION_DURATION = protocol.duration;
export function calibrationPhase(seconds: number) {
  const t = Math.max(0, Math.min(protocol.duration - 0.001, seconds));
  const index = CALIBRATION_PHASES.findIndex((p) => t < p.end);
  const segment = protocol.segments.find(
    (s) => t >= s.start && t < s.start + s.duration,
  );
  let detail = translate("Attesa iniziale · il marcatore parte a 00:02");
  if (
    (t >= 2 && t < 2.6) ||
    (t >= protocol.final_marker && t < protocol.final_marker + 0.6)
  )
    detail =
      translate("Marcatore ") +
      (t < 4 ? translate("iniziale") : translate("finale")) +
      translate(" · entrambi i canali");
  else if (segment)
    detail =
      segment.frequency === 0
        ? translate("Nessun tono · misura del rumore di fondo")
        : translate("{0} Hz · {1} dBFS peak · {2}", [
            segment.frequency.toLocaleString(localeTag()),
            segment.level,
            segment.channel === 0
              ? translate("solo sinistro")
              : segment.channel === 1
                ? translate("solo destro")
                : "L + R",
          ]);
  else if (t >= protocol.final_marker + 0.6)
    detail = translate("Coda finale · attendi la fine");
  else if (t >= 105.2)
    detail =
      translate("Attesa del marcatore finale a ") + time(protocol.final_marker);
  else if (t >= 2.6) detail = translate("Pausa dopo il marcatore");
  return {
    index,
    detail,
    ...CALIBRATION_PHASES[index],
    name: translate(CALIBRATION_PHASES[index].name),
  };
}
export type ProbeStatus =
  | "countdown"
  | "ready"
  | "preparing"
  | "starting"
  | "playing"
  | "paused"
  | "finished"
  | "stopped"
  | "error";
export function CalibrationProgress({
  elapsed,
  status,
  error,
  countdown,
}: {
  elapsed: number;
  status: ProbeStatus;
  error?: string | null;
  countdown?: number | null;
}) {
  const seconds =
    status === "finished"
      ? CALIBRATION_DURATION
      : Math.min(CALIBRATION_DURATION, Math.max(0, elapsed));
  const phase = calibrationPhase(seconds);
  const active = status === "playing" || status === "paused";
  const label = {
    countdown: translate("Partenza tra…"),
    ready: translate("Pronta per registrare"),
    preparing: translate("Preparo la sequenza…"),
    starting: translate("Avvio dell’uscita…"),
    playing: phase.name,
    paused: translate("In pausa · {0}", [phase.name]),
    finished: translate("Prova terminata"),
    stopped: translate("Prova interrotta"),
    error: translate("Prova non completata"),
  }[status];
  const instruction =
    status === "countdown"
      ? translate(
          "Il nastro sta avanzando. L’audio parte dopo il conto alla rovescia; Stop annulla la partenza.",
        )
      : status === "finished"
        ? translate(
            "Ferma REC sulla piastra. Riavvolgi prima del marcatore iniziale, poi acquisisci il riascolto.",
          )
        : status === "stopped"
          ? translate(
              "La sequenza è incompleta. Riporta il nastro all’inizio della prova e registra di nuovo tutta la sequenza.",
            )
          : status === "error"
            ? error || translate("Controlla l’uscita audio e riprova.")
            : active
              ? phase.detail
              : translate(
                  "Premi REC sulla piastra, poi Avvia prova. Dopo 3…2…1 parte la sequenza automatica.",
                );
  return (
    <section
      className={`probe-progress probe-${status}`}
      aria-label={translate("Avanzamento della prova")}
    >
      <div className="probe-heading">
        <strong role="status" title={label}>
          {label}
        </strong>
        <span
          className="probe-clock"
          role={status === "countdown" ? "status" : undefined}
        >
          {status === "countdown"
            ? `${countdown ?? 3}…`
            : `${time(Math.floor(seconds))} / ${time(CALIBRATION_DURATION)}`}
        </span>
      </div>
      <p className="probe-detail">
        <span
          className="probe-detail-reserve"
          aria-hidden="true"
          data-reserve={translate(
            "La sequenza è incompleta. Riporta il nastro all’inizio della prova e registra di nuovo tutta la sequenza.",
          )}
        />
        <span
          className="probe-detail-reserve"
          aria-hidden="true"
          data-reserve={translate(
            "Il nastro sta avanzando. L’audio parte dopo il conto alla rovescia; Stop annulla la partenza.",
          )}
        />
        <span
          className="probe-detail-reserve"
          aria-hidden="true"
          data-reserve={translate(
            "Premi REC sulla piastra, poi Avvia prova. Dopo 3…2…1 parte la sequenza automatica.",
          )}
        />
        <span>{instruction}</span>
      </p>
      <progress
        aria-label={translate("Sequenza di calibrazione")}
        max={CALIBRATION_DURATION}
        value={seconds}
      />
      <div className="probe-remaining">
        {status === "finished"
          ? translate("Sequenza completa")
          : translate("{0} rimanenti", [time(CALIBRATION_DURATION - seconds)])}
      </div>
      <ol
        className="probe-phases"
        aria-label={translate("Fasi della sequenza")}
      >
        {CALIBRATION_PHASES.map((p, i) => (
          <li
            key={p.start}
            aria-current={active && phase.index === i ? "step" : undefined}
            className={
              seconds >= p.end
                ? "done"
                : active && phase.index === i
                  ? "current"
                  : ""
            }
          >
            <span>{translate(p.name)}</span>
            <small>
              {time(p.start)}–{time(p.end)}
            </small>
          </li>
        ))}
      </ol>
    </section>
  );
}
