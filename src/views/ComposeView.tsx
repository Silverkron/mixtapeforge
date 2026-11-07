import { useState } from "react";
import { t as translate } from "../i18n";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Pencil,
  Trash2,
  UnlockKeyhole,
  Check,
  GripVertical,
  LockKeyhole,
  Music2,
  Plus,
} from "lucide-react";
import { relocateTrack } from "../track-order";
import { useTrackDrag } from "./useTrackDrag";
import { TrackActions, type TrackMenuPosition } from "./TrackActions";
import { length, time } from "../types";

import { useStudio } from "../studio-context";
export function ComposeView() {
  const {
    project,
    info,
    page,
    setPanel,
    side,
    selected,
    setSelected,
    commit,
    patchTrack,
    locked,
    importTracks,
    move,
    switchSide,
    remove,
    chooseSide,
  } = useStudio();
  const [context, setContext] = useState<
    (TrackMenuPosition & { id: string }) | null
  >(null);
  const drag = useTrackDrag(locked, (id, target) => {
    const next = relocateTrack(project, id, target.side, target.slot);
    if (next !== project) {
      commit(next);
      setSelected(id);
      chooseSide(target.side);
    }
  });
  return (
    <>
      {page === "compose" && (
        <>
          <div className="compose-grid">
            <div className="sides-grid">
              {[0, 1].map((s) => {
                const duration = info.durations[s],
                  available = project.capacity[s] - project.margin;
                const ids = project.sides[s];
                return (
                  <section
                    key={s}
                    className={`side-panel ${side === s ? "selected-side" : ""}`}
                    data-track-side={s}
                  >
                    <header className="side-heading">
                      <button
                        className="side-letter"
                        disabled={locked}
                        onClick={() => chooseSide(s)}
                        aria-label={translate("Seleziona lato {0}", [
                          s ? "B" : "A",
                        ])}
                        aria-pressed={side === s}
                      >
                        {s ? "B" : "A"}
                      </button>
                      <div>
                        <h2>
                          {translate("Lato ")}
                          {s ? "B" : "A"}
                        </h2>
                        <span>
                          {project.sides[s].length} {translate(" brani · ")}
                          {time(duration)}
                        </span>
                      </div>
                      <span
                        className={`side-status ${duration > available ? "danger" : ""}`}
                      >
                        {duration > available ? (
                          <AlertTriangle size={14} />
                        ) : (
                          <Check size={14} />
                        )}
                      </span>
                    </header>
                    <div
                      className="capacity-track"
                      aria-label={translate("{0} usati su {1}", [
                        time(duration),
                        time(available),
                      ])}
                    >
                      <div
                        className={duration > available ? "over" : ""}
                        style={{
                          width: `${Math.min(100, (duration / available) * 100)}%`,
                        }}
                      />
                    </div>
                    <div className="capacity-caption">
                      <span>
                        {duration > available
                          ? "ECCEDENZA"
                          : translate("SPAZIO DISPONIBILE")}
                      </span>
                      <b className={duration > available ? "error-text" : ""}>
                        {time(Math.abs(available - duration))}
                      </b>
                    </div>
                    <div
                      className={`track-list ${drag.target?.side === s && drag.target.slot === ids.length ? "drop-at-end" : ""}`}
                    >
                      {ids.map((id, i) => {
                        const t = project.tracks.find((t) => t.id === id)!;
                        return (
                          <div
                            className={`track-row ${selected === id ? "selected" : ""} ${drag.dragging === id ? "dragging" : ""} ${drag.target?.side === s && drag.target.slot === i ? "drop-before" : ""}`}
                            data-track-id={id}
                            key={id}
                            onContextMenu={(event) => {
                              const opener =
                                event.currentTarget.querySelector<HTMLButtonElement>(
                                  ".track-main",
                                );
                              if (!opener) return;
                              event.preventDefault();
                              const rect = opener.getBoundingClientRect();
                              setContext({
                                id,
                                opener,
                                x: event.clientX || rect.left,
                                y: event.clientY || rect.bottom,
                              });
                            }}
                          >
                            <button
                              className="track-grip"
                              aria-label={translate(
                                "Trascina {0}; per spostarlo da tastiera usa i pulsanti accanto al brano",
                                [t.title],
                              )}
                              disabled={locked || t.locked}
                              onPointerDown={(e) => drag.start(e, id, t.locked)}
                              onPointerMove={drag.move}
                              onPointerUp={drag.end}
                              onPointerCancel={drag.cancel}
                              onLostPointerCapture={drag.cancel}
                            >
                              {t.locked ? (
                                <LockKeyhole size={14} />
                              ) : (
                                <GripVertical size={16} />
                              )}
                            </button>
                            <button
                              className="track-main"
                              aria-pressed={selected === id}
                              onKeyDown={(event) => {
                                if (
                                  event.key !== "ContextMenu" &&
                                  !(event.shiftKey && event.key === "F10")
                                )
                                  return;
                                event.preventDefault();
                                const rect =
                                  event.currentTarget.getBoundingClientRect();
                                setContext({
                                  id,
                                  opener: event.currentTarget,
                                  x: rect.left,
                                  y: rect.bottom,
                                });
                              }}
                              onPointerDown={(e) => drag.start(e, id, t.locked)}
                              onPointerMove={drag.move}
                              onPointerUp={drag.end}
                              onPointerCancel={drag.cancel}
                              onLostPointerCapture={drag.cancel}
                              onClick={() => {
                                if (drag.suppressClick.current) return;
                                setSelected(id);
                                chooseSide(s);
                              }}
                              onDoubleClick={() => {
                                if (!drag.suppressClick.current) {
                                  setSelected(id);
                                  chooseSide(s);
                                  setPanel("track");
                                }
                              }}
                            >
                              <span className="track-number">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <div className="track-art">
                                <Music2 size={16} />
                              </div>
                              <span className="track-title">
                                <b>{t.title}</b>
                                <small>
                                  {t.artist || translate("Artista sconosciuto")}
                                </small>
                              </span>
                              <span className="track-duration">
                                {time(length(t))}
                              </span>
                            </button>
                            <TrackActions
                              title={t.title}
                              context={context?.id === id ? context : undefined}
                              closeContext={() => setContext(null)}
                              openContext={(position) =>
                                setContext({ id, ...position })
                              }
                              actions={[
                                {
                                  label: translate("Modifica brano"),
                                  icon: <Pencil size={14} />,
                                  run: () => {
                                    setSelected(id);
                                    chooseSide(s);
                                    setPanel("track");
                                  },
                                },
                                {
                                  label: t.locked
                                    ? translate("Sblocca posizione")
                                    : translate("Blocca posizione"),
                                  icon: t.locked ? (
                                    <LockKeyhole size={14} />
                                  ) : (
                                    <UnlockKeyhole size={14} />
                                  ),
                                  pressed: t.locked,
                                  disabled: locked,
                                  run: () =>
                                    patchTrack(id, { locked: !t.locked }),
                                },
                                {
                                  label: translate("Sposta sopra"),
                                  icon: <ChevronUp size={14} />,
                                  disabled: locked || t.locked || i === 0,
                                  run: () => move(id, -1),
                                },
                                {
                                  label: translate("Sposta sotto"),
                                  icon: <ChevronDown size={14} />,
                                  disabled:
                                    locked ||
                                    t.locked ||
                                    i === project.sides[s].length - 1,
                                  run: () => move(id, 1),
                                },
                                {
                                  label: translate("Sposta sul lato {0}", [
                                    s ? "A" : "B",
                                  ]),
                                  icon: s ? (
                                    <ArrowLeft size={14} />
                                  ) : (
                                    <ArrowRight size={14} />
                                  ),
                                  disabled: locked || t.locked,
                                  run: () => switchSide(id),
                                },
                                {
                                  label: translate("Rimuovi dalla mixtape"),
                                  icon: <Trash2 size={14} />,
                                  destructive: true,
                                  disabled: locked || t.locked,
                                  run: () => remove(id),
                                },
                              ]}
                            />
                          </div>
                        );
                      })}
                    </div>
                    {!ids.length && (
                      <div className="empty-side">
                        <h3>
                          {translate("Nessun brano sul lato ")}
                          {s ? "B" : "A"}.
                        </h3>
                      </div>
                    )}
                    <div className="side-footer">
                      <button
                        className="button small"
                        disabled={locked}
                        onClick={() => {
                          chooseSide(s);
                          void importTracks(false, s);
                        }}
                      >
                        <Plus size={14} />
                        {translate("Aggiungi al lato")} {s ? "B" : "A"}
                      </button>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
