import { t as translate } from "./i18n";
import { invoke, isTauri } from "@tauri-apps/api/core";
import type { Project, Info } from "./types";
export const native = isTauri();
export const blank = (): Project => ({
  schema: 1,
  title: translate("La mia mixtape"),
  subtitle: "",
  tape: "C90",
  capacity: [2700, 2700],
  margin: 15,
  leader: 3,
  trailer: 3,
  tracks: [],
  sides: [[], []],
  processing: {
    vst: null,
    normalize: "peak",
    target_lufs: -18,
    ceiling: -3,
    dynamics: "off",
    threshold: -12,
    ratio: 2,
    nr: "off",
    nr_reference: 0,
    eq: "off",
    eq_enabled: false,
    eq_bands: Array(10).fill(0),
    attack_ms: 5,
    release_ms: 150,
    knee_db: 6,
    makeup_db: 0,
    crossfade: 0,
    sample_rate: 48000,
  },
  calibration: null,
  color: "#c4adff",
  artwork: null,
});
export function previewInfo(p: Project): Info {
  return {
    durations: p.sides.map((side) => {
      if (!side.length) return 0;
      const tracks = side.map((id) => p.tracks.find((t) => t.id === id)!);
      return (
        p.leader +
        p.trailer +
        (p.processing.vst?.enabled ? p.processing.vst.tail_seconds : 0) +
        tracks.reduce((sum, t, i) => {
          const len = t.duration - t.trim_start - t.trim_end;
          const next = tracks[i + 1];
          return (
            sum +
            len +
            (next
              ? p.processing.crossfade
                ? -Math.min(
                    p.processing.crossfade,
                    len / 2,
                    (next.duration - next.trim_start - next.trim_end) / 2,
                  )
                : t.gap
              : 0)
          );
        }, 0)
      );
    }) as [number, number],
    gains: p.tracks.map((t) => {
      const q = p.processing,
        a = t.analysis;
      const requested =
        {
          peak: q.ceiling - a.peak,
          quasi: q.ceiling - a.quasi_peak,
          vu: (p.calibration?.reference ?? -18) - 3.0103 - a.vu_peak,
          rms: q.target_lufs - a.rms,
          lufs: a.lufs === null ? 0 : q.target_lufs - a.lufs,
          album:
            q.ceiling - Math.max(...p.tracks.map((t) => t.analysis.true_peak)),
        }[q.normalize] ?? 0;
      return [
        t.id,
        q.normalize === "off"
          ? t.gain
          : Math.min(requested + t.gain, q.ceiling - a.true_peak),
      ];
    }),
  };
}
export function demo(): Project {
  const p = blank();
  p.title = translate("After hours");
  p.subtitle = translate("Demo · Anteprima grafica");
  p.leader = p.trailer = 0.5;
  p.tracks = [
    translate("Neon avenue"),
    translate("Violet hour"),
    translate("Soft signals"),
    translate("Last train home"),
  ].map((title, i) => ({
    id: `demo-${i}`,
    title,
    artist: translate("MixtapeForge"),
    path: "Anteprima — nessun file audio",
    duration: [12, 10, 14, 11][i],
    sample_rate: 48000,
    hash: "preview",
    analysis: {
      peak: -12 + i,
      rms: -19 + i,
      lufs: -18 + i,
      true_peak: -11.8 + i,
      peak_time: 4,
      rms_time: 5,
      vu_peak: -18,
      quasi_peak: -13,
      waveform: Array.from(
        { length: 240 },
        (_, x) =>
          Math.abs(Math.sin(x * 0.17 + i) * Math.cos(x * 0.031)) * 0.45 + 0.03,
      ),
      silence_start: 0,
      silence_end: 0,
    },
    trim_start: 0,
    trim_end: 0,
    gain: 0,
    fade_in: 0,
    fade_out: 0,
    gap: 1,
    locked: false,
  }));
  p.sides = [
    p.tracks.slice(0, 2).map((t) => t.id),
    p.tracks.slice(2).map((t) => t.id),
  ];
  return p;
}
export async function call<T>(
  command: string,
  args: Record<string, unknown> = {},
): Promise<T> {
  if (native) return invoke<T>(command, args);
  // Browser mode is a visual preview only. Audio/file operations are never simulated as success.
  if (command === "default_project") return blank() as T;
  if (command === "demo_project") return demo() as T;
  if (command === "project_info")
    return previewInfo(args.project as Project) as T;
  if (command === "audio_devices") return [] as T;
  if (command === "recover_project") return null as T;
  if (
    command === "autosave_project" ||
    command === "stop_audio" ||
    command === "stop_monitor" ||
    command === "cancel_job"
  )
    return undefined as T;
  throw new Error(
    translate(
      "Apri l’app desktop per usare questa funzione. Nel browser puoi esplorare l’interfaccia con dati dimostrativi.",
    ),
  );
}
