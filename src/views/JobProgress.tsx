import { t as translate } from "../i18n";
import { call } from "../backend";
import { useStudio } from "../studio-context";
import { createPortal } from "react-dom";

export function JobProgress({ overlay = false }: { overlay?: boolean }) {
  const { job, cancelable } = useStudio();
  const value =
    Number.isFinite(job.value) && job.value > 0
      ? Math.min(1, job.value)
      : undefined;
  const label = job.label || "Elaborazione…";
  const progress = (
    <div className="player-job" aria-busy="true">
      <progress
        className="player-progress"
        aria-label={label}
        max={1}
        value={value}
      />
      <div className="player-job-label">
        <span role="status">{label}</span>
        {value !== undefined && <span>{Math.round(value * 100)}%</span>}
        {cancelable && (
          <button type="button" onClick={() => void call("cancel_job")}>
            {translate("Annulla")}
          </button>
        )}
      </div>
    </div>
  );
  return overlay
    ? createPortal(
        <div className="job-overlay">{progress}</div>,
        document.querySelector(".app-shell") ?? document.body,
      )
    : progress;
}
