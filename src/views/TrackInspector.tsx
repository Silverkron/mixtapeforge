import { t as translate } from "../i18n";
import {
  Copy,
  FolderOpen,
  SlidersHorizontal,
  CassetteTape as Tape,
} from "lucide-react";
import { call } from "../backend";
import { NumberField, Scope, Section, Select } from "../components";
import { decibel, length, type Project } from "../types";

import { useStudio } from "../studio-context";
export function TrackInspector() {
  const {
    project,
    panel,
    run,
    commit,
    edit,
    patchTrack,
    track,
    locked,
    duplicate,
    setPanel,
  } = useStudio();
  return panel === "track" && track ? (
    <Section title={track.title || translate("Brano senza titolo")}>
      <fieldset disabled={locked} className="panel-content">
        <label className="field">
          <span>{translate("Titolo")}</span>
          <input
            value={track.title}
            onChange={(e) => patchTrack(track.id, { title: e.target.value })}
          />
        </label>
        <label className="field">
          <span>{translate("Artista")}</span>
          <input
            value={track.artist}
            onChange={(e) => patchTrack(track.id, { artist: e.target.value })}
          />
        </label>
        <Scope
          values={track.analysis.waveform}
          label={translate("Forma d’onda del brano importato")}
        />
        <div className="stat-grid">
          <div>
            <span>PEAK</span>
            <b>
              {decibel(track.analysis.peak)}
              <small> {translate(" dBFS")}</small>
            </b>
          </div>
          <div>
            <span>LOUDNESS</span>
            <b>
              {decibel(track.analysis.lufs)}
              <small> {translate(" LUFS")}</small>
            </b>
          </div>
        </div>
        <div className="fields-two">
          <NumberField
            label={translate("Taglio inizio")}
            value={track.trim_start}
            min={0}
            max={Math.max(0, track.duration - track.trim_end - 0.05)}
            step={0.1}
            unit="s"
            onChange={(v) => patchTrack(track.id, { trim_start: v })}
          />
          <NumberField
            label={translate("Taglio fine")}
            value={track.trim_end}
            max={Math.max(0, track.duration - track.trim_start - 0.05)}
            step={0.1}
            unit="s"
            onChange={(v) => patchTrack(track.id, { trim_end: v })}
          />
          <NumberField
            label={translate("Fade in")}
            value={track.fade_in}
            max={length(track)}
            step={0.1}
            unit="s"
            onChange={(v) => patchTrack(track.id, { fade_in: v })}
          />
          <NumberField
            label={translate("Fade out")}
            value={track.fade_out}
            max={length(track)}
            step={0.1}
            unit="s"
            onChange={(v) => patchTrack(track.id, { fade_out: v })}
          />
          <NumberField
            label={translate("Pausa dopo")}
            value={track.gap}
            max={120}
            step={0.1}
            unit="s"
            onChange={(v) => patchTrack(track.id, { gap: v })}
          />
        </div>
        <button
          className="button subtle full"
          onClick={() =>
            patchTrack(track.id, {
              trim_start: Math.min(
                track.analysis.silence_start,
                track.duration / 3,
              ),
              trim_end: Math.min(
                track.analysis.silence_end,
                track.duration / 3,
              ),
            })
          }
        >
          {translate("Rimuovi silenzi rilevati (−55 dBFS)")}
        </button>
        <button className="button full" onClick={() => setPanel("master")}>
          <SlidersHorizontal size={15} />
          {translate("Controlli audio")}
        </button>
        <div className="button-row">
          <button className="button" onClick={() => duplicate(track.id)}>
            <Copy size={14} />
            {translate("Duplica")}
          </button>
          <button
            className="button"
            onClick={() =>
              void run(async () => {
                const p = await call<Project | null>("relink_track", {
                  project,
                  panel,
                  id: track.id,
                });
                if (p) commit(p);
              })
            }
          >
            <FolderOpen size={14} />
            {translate("Ricollega")}
          </button>
        </div>
        <p className="caption file-path" title={track.path}>
          {track.path}
        </p>
      </fieldset>
    </Section>
  ) : (
    <Section
      title={translate("Durate e pause")}
      eyebrow={translate("NASTRO E SPAZI")}
    >
      <fieldset disabled={locked} className="panel-content">
        <Select
          label={translate("Formato cassetta")}
          value={project.tape}
          onChange={(v) =>
            edit((p) => {
              p.tape = v;
              if (v !== "Custom")
                p.capacity = [Number(v.slice(1)) * 30, Number(v.slice(1)) * 30];
            })
          }
        >
          {["C46", "C60", "C90", "C120", translate("Custom")].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </Select>
        <div className="fields-two">
          <NumberField
            label={translate("Durata lato A")}
            value={project.capacity[0] / 60}
            max={240}
            min={1}
            step={0.1}
            unit="min"
            onChange={(v) =>
              edit((p) => {
                p.capacity[0] = v * 60;
                p.tape = translate("Custom");
              })
            }
          />
          <NumberField
            label={translate("Durata lato B")}
            value={project.capacity[1] / 60}
            max={240}
            min={1}
            step={0.1}
            unit="min"
            onChange={(v) =>
              edit((p) => {
                p.capacity[1] = v * 60;
                p.tape = translate("Custom");
              })
            }
          />
          <NumberField
            label={translate("Margine per lato")}
            value={project.margin}
            max={120}
            unit="s"
            onChange={(v) => edit((p) => (p.margin = v))}
          />
          <NumberField
            label={translate("Silenzio iniziale")}
            value={project.leader}
            max={120}
            step={0.5}
            unit="s"
            onChange={(v) => edit((p) => (p.leader = v))}
          />
          <NumberField
            label={translate("Silenzio finale")}
            value={project.trailer}
            max={120}
            step={0.5}
            unit="s"
            onChange={(v) => edit((p) => (p.trailer = v))}
          />
        </div>
        <div className="hint">
          <Tape size={16} />
          <p>
            {translate(
              "La durata reale può variare. Il margine lascia spazio prima della fine fisica del nastro.",
            )}
          </p>
        </div>
        <button className="button full" onClick={() => setPanel("master")}>
          <SlidersHorizontal size={15} />
          {translate("Controlli audio")}
        </button>
      </fieldset>
    </Section>
  );
}
