import { t as translate } from "./i18n";
import { sideTimeline } from "./player-timeline";
import { listen } from "@tauri-apps/api/event";
import { useCallback, useEffect, useRef, useState } from "react";
import { blank, call, native } from "./backend";
import { keepDeviceSelection } from "./device-selection";
import {
  isRecordingProfile,
  recordingLevelFromProfile,
} from "./recording-profiles";
import {
  type Calibration,
  type Comparison,
  type Device,
  type Info,
  length,
  type Project,
  type Render,
  type RecordingProfile,
  type SessionEvent,
  type Telemetry,
  time,
  type Track,
} from "./types";

type Page = "compose" | "calibration" | "artwork";
type Panel = "master" | "settings" | "sessions" | "track" | "tape" | null;
const zero: Info = { durations: [0, 0], gains: [] };
const clone = <T,>(v: T): T => structuredClone(v);
const resetWorkspaceScroll = () => {
  const viewport = document.getElementById("main-content");
  if (viewport) viewport.scrollTop = 0;
};
const defaultProfile = (): Calibration => ({
  name: translate("Il mio deck"),
  deck: "",
  tape: translate("Type I"),
  reference: -18,
  mol: 5,
  snr: 55,
  device: "",
  verified: false,
  notes: "",
});

export function useStudioController() {
  const [project, setProject] = useState<Project>(blank),
    [info, setInfo] = useState<Info>(zero),
    [page, setPage] = useState<Page>("compose"),
    [panel, setPanel] = useState<Panel>(null),
    [side, setSide] = useState(0),
    [selected, setSelected] = useState<string | null>(null);
  const [busy, setBusy] = useState(false),
    [cancelable, setCancelable] = useState(false),
    [job, setJob] = useState({ value: 0, label: "" }),
    [toast, setToast] = useState<{ message: string; error: boolean } | null>(
      null,
    ),
    [dialog, setDialog] = useState<"fit" | "export" | "help" | null>(null);
  const [undo, setUndo] = useState<Project[]>([]),
    [redo, setRedo] = useState<Project[]>([]),
    [outputs, setOutputs] = useState<Device[]>([]),
    [inputs, setInputs] = useState<Device[]>([]),
    [device, setDevice] = useState(0),
    [inputDevice, setInputDevice] = useState(0);
  const [outputResult, setOutputResult] = useState<{
    path: string;
    elapsed: number;
    completed: boolean;
    error: string | null;
  } | null>(null);
  const outputSource = useRef<{ path: string; elapsed: number } | null>(null);
  const manualTonePath = useRef<string | null>(null);
  const manualMonitorActive = useRef(false);
  const [master, setMaster] = useState<Render | null>(null),
    [telemetry, setTelemetry] = useState<Telemetry | null>(null),
    [inputTelemetry, setInputTelemetry] = useState<Telemetry | null>(null),
    [playing, setPlaying] = useState(false),
    [paused, setPaused] = useState(false),
    [monitoring, setMonitoring] = useState(false),
    [countdown, setCountdown] = useState<number | null>(null);
  const autosaveQueue = useRef<Promise<unknown>>(Promise.resolve());
  const [recording, setRecording] = useState(false);
  const recordingRef = useRef(false);
  const navigationInFlight = useRef(false);
  const [loop, setLoop] = useState(true),
    [loopSeconds, setLoopSeconds] = useState(5),
    [metric, setMetric] = useState("peak"),
    [original, setOriginal] = useState(false),
    [fitPreview, setFitPreview] = useState<Project | null>(null),
    [preserve, setPreserve] = useState(true),
    [bits, setBits] = useState(24);
  const [profile, setProfile] = useState<Calibration>(defaultProfile),
    [toneFrequency, setToneFrequency] = useState(1000),
    [toneKind, setToneKind] = useState("sine");
  const [inputError, setInputError] = useState<string | null>(null);
  const [capturePath, setCapturePath] = useState<string | null>(null),
    [capturing, setCapturing] = useState(false),
    [comparison, setComparison] = useState<Comparison | null>(null);
  const [theme, setTheme] = useState(
      () => localStorage.getItem("cassette-theme") || "dark",
    ),
    [saved, setSaved] = useState(translate("Progetto locale")),
    [recover, setRecover] = useState<Project | null>(null);
  const [sessions, setSessions] = useState<SessionEvent[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("cassette-sessions") || "[]");
    } catch {
      return [];
    }
  });
  const [recordingProfiles, setRecordingProfiles] = useState<
    RecordingProfile[]
  >(() => {
    try {
      const saved: unknown = JSON.parse(
        localStorage.getItem("cassette-recording-profiles") || "[]",
      );
      return Array.isArray(saved) ? saved.filter(isRecordingProfile) : [];
    } catch {
      return [];
    }
  });
  const projectRef = useRef(project),
    playingRef = useRef(false),
    acceptOutputRef = useRef(false),
    loopRef = useRef<{ path: string; index: number; name: string } | null>(
      null,
    ),
    countRef = useRef(0),
    mounted = useRef(true),
    autosaveEnabled = useRef(false),
    recoveryDismissed = useRef(false);
  projectRef.current = project;
  const notify = useCallback(
    (message: string, error = false) =>
      setToast({ message: translate(message), error }),
    [],
  );
  const log = useCallback(
    (message: string, error = false) =>
      setSessions((s) =>
        [{ time: new Date().toISOString(), message, error }, ...s].slice(
          0,
          100,
        ),
      ),
    [],
  );
  const run = useCallback(
    async <T,>(
      work: () => Promise<T>,
      label = "Elaborazione…",
      canCancel = false,
    ): Promise<T | undefined> => {
      setBusy(true);
      setCancelable(canCancel);
      setJob({ value: 0, label });
      try {
        return await work();
      } catch (e) {
        notify(String(e instanceof Error ? e.message : e), true);
        return undefined;
      } finally {
        setBusy(false);
        setCancelable(false);
        setJob({ value: 0, label: "" });
      }
    },
    [notify],
  );
  const commit = useCallback((next: Project, history = true) => {
    if (history) {
      const previous = clone(projectRef.current);
      setUndo((s) => [...s.slice(-49), previous]);
      setRedo([]);
    }
    projectRef.current = next;
    setProject(next);
    setMaster(null);
    setSaved(translate("Modifiche locali"));
    autosaveEnabled.current = true;
    recoveryDismissed.current = true;
    setRecover(null);
  }, []);
  const edit = (fn: (p: Project) => void, history = true) => {
    const p = clone(projectRef.current);
    fn(p);
    commit(p, history);
  };
  const applyRecordingProfile = (profile: RecordingProfile) =>
    edit((p) => {
      p.recording_profile = clone(profile);
      if (
        p.processing.sample_rate !== profile.conditions.sample_rate &&
        p.calibration
      )
        p.calibration.verified = false;
      Object.assign(p.processing, {
        sample_rate: profile.conditions.sample_rate,
        ceiling: recordingLevelFromProfile(profile),
        channel_gain_db: [...profile.channel_gain_db],
        eq_bands: [...profile.eq_bands],
        eq_enabled: profile.eq_bands.some((gain) => gain !== 0),
        use_drive_limits: false,
      });
    });
  const saveRecordingProfile = (profile: RecordingProfile, apply = true) => {
    const next = [
      ...recordingProfiles.filter((p) => p.id !== profile.id),
      clone(profile),
    ];
    // Persist before editing the project, so storage failures cannot claim a saved profile.
    localStorage.setItem("cassette-recording-profiles", JSON.stringify(next));
    setRecordingProfiles(next);
    if (apply) applyRecordingProfile(profile);
  };
  const patchTrack = (id: string, changes: Partial<Track>, history = true) =>
    edit((p) => {
      const t = p.tracks.find((t) => t.id === id);
      if (t) {
        Object.assign(t, changes);
        t.fade_in = Math.min(t.fade_in, length(t));
        t.fade_out = Math.min(t.fade_out, length(t));
      }
    }, history);
  const track = project.tracks.find((t) => t.id === selected) ?? null;
  const locked = busy || playing || capturing || countdown !== null;
  const dismissRecovery = () => {
    recoveryDismissed.current = true;
    setRecover(null);
  };
  const restoreRecovery = () => {
    if (!recover || locked || autosaveEnabled.current) return;
    commit(recover, false);
    setUndo([]);
    setRedo([]);
    setSelected(null);
    setSide(0);
    setPage("compose");
    resetWorkspaceScroll();
    notify(translate("Ultima sessione ripresa"));
  };
  const deviceSelection = useRef({ outputs, inputs, device, inputDevice });
  deviceSelection.current = { outputs, inputs, device, inputDevice };
  const refreshRequest = useRef(0);
  const refresh = useCallback(async () => {
    const request = ++refreshRequest.current;
    try {
      const [o, i] = await Promise.all([
        call<Device[]>("audio_devices", { input: false }),
        call<Device[]>("audio_devices", { input: true }),
      ]);
      if (request !== refreshRequest.current) return;
      const current = deviceSelection.current;
      setDevice(keepDeviceSelection(current.outputs, o, current.device));
      setInputDevice(
        keepDeviceSelection(current.inputs, i, current.inputDevice),
      );
      setOutputs(o);
      setInputs(i);
    } catch (e) {
      notify(String(e), true);
    }
  }, [notify]);
  useEffect(() => {
    if (!native || locked) return;
    const update = () => void refresh();
    window.addEventListener("focus", update);
    if (panel === "master") update();
    return () => window.removeEventListener("focus", update);
  }, [locked, panel, refresh]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("cassette-theme", theme);
    } catch {
      /* The session theme still applies. */
    }
  }, [theme]);
  useEffect(() => {
    try {
      localStorage.setItem("cassette-sessions", JSON.stringify(sessions));
    } catch {
      notify(translate("Impossibile salvare il registro locale"), true);
    }
  }, [sessions]);
  useEffect(() => {
    let active = true;
    call<Project>("default_project").then((p) => {
      if (active && !autosaveEnabled.current) setProject(p);
    });
    call<Project | null>("recover_project")
      .then((p) => {
        if (active && !autosaveEnabled.current && !recoveryDismissed.current)
          setRecover(p);
      })
      .catch((e) => notify(String(e), true));
    void refresh();
    return () => {
      active = false;
    };
  }, [refresh, notify]);
  useEffect(() => {
    let active = true;
    call<Info>("project_info", { project })
      .then((i) => {
        if (active) setInfo(i);
      })
      .catch((e) => {
        if (active) notify(String(e), true);
      });
    return () => {
      active = false;
    };
  }, [project, notify]);
  useEffect(() => {
    if (!autosaveEnabled.current) return;
    const timeout = setTimeout(() => {
      autosaveQueue.current = autosaveQueue.current
        .catch(() => {})
        .then(() => call("autosave_project", { project }))
        .then(() =>
          setSaved(
            native
              ? translate("Salvataggio automatico")
              : translate("Anteprima grafica"),
          ),
        )
        .catch((e) => notify(translate("Autosave: {0}", [e]), true));
    }, 700);
    return () => clearTimeout(timeout);
  }, [project, notify]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), toast.error ? 12000 : 5000);
    return () => clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    if (!native) return;
    mounted.current = true;
    let disposed = false;
    const unlisteners: (() => void)[] = [];
    const bind = async <T,>(name: string, handler: (value: T) => void) => {
      const off = await listen<T>(name, (event) => {
        if (!disposed) handler(event.payload);
      });
      if (disposed) off();
      else unlisteners.push(off);
    };
    void bind<{ value: number; label: string }>("job-progress", (j) =>
      setJob({ ...j, label: translate(j.label) }),
    );
    void bind<Telemetry>("audio-telemetry", (t) => {
      if (!acceptOutputRef.current) return;
      if (outputSource.current) outputSource.current.elapsed = t.elapsed;
      setTelemetry(t);
      if (!playingRef.current) {
        playingRef.current = true;
        setPlaying(true);
      }
    });
    void bind<Telemetry>("input-telemetry", setInputTelemetry);
    void bind<string | null>("input-ended", (error) => {
      manualMonitorActive.current = false;
      setInputError(error ? translate(error) : null);
      setMonitoring(false);
      setCapturing(false);
      if (error) notify(error, true);
    });
    void bind<string | null>("audio-ended", (error) => {
      if (!acceptOutputRef.current) return;
      if (outputSource.current && (error || !loopRef.current)) {
        setOutputResult({ ...outputSource.current, completed: !error, error });
        outputSource.current = null;
      }
      if (error) {
        loopRef.current = null;
        notify(error, true);
        log(error, true);
      } else if (loopRef.current) {
        const current = loopRef.current;
        void call("play_audio", {
          path: current.path,
          expectedName: current.name,
          index: current.index,
          offset: 0,
          limit: null,
        }).catch((e) => {
          loopRef.current = null;
          notify(String(e), true);
        });
        return;
      } else if (playingRef.current) {
        log(translate("Uscita terminata. Ferma il deck e verifica il nastro."));
        notify(
          translate("Uscita terminata. Ferma il deck e verifica il nastro."),
        );
      }
      recordingRef.current = false;
      setRecording(false);
      acceptOutputRef.current = false;
      playingRef.current = false;
      setPaused(false);
      setPlaying(false);
      setTelemetry(null);
    });
    return () => {
      disposed = true;
      mounted.current = false;
      unlisteners.forEach((off) => off());
    };
  }, [notify, log]);
  const stop = useCallback(async () => {
    recordingRef.current = false;
    setRecording(false);
    if (outputSource.current) {
      setOutputResult({
        ...outputSource.current,
        completed: false,
        error: null,
      });
      outputSource.current = null;
    }
    countRef.current++;
    setCountdown(null);
    loopRef.current = null;
    acceptOutputRef.current = false;
    setPaused(false);
    playingRef.current = false;
    setPlaying(false);
    await call("stop_audio");
    setTelemetry(null);
  }, []);
  const start = useCallback(
    async (path: string, repeat = false, offset = 0) => {
      if (!native)
        throw new Error(
          translate("L’audio nativo è disponibile nell’app desktop."),
        );
      if (!outputs.length)
        throw new Error(
          translate(
            "Nessuna uscita audio. Apri Controlli audio e aggiorna i dispositivi.",
          ),
        );
      await stop();
      const name = outputs.find((d) => d.index === device)?.name;
      if (!name)
        throw new Error(
          translate("Uscita non più disponibile: aggiorna i dispositivi"),
        );
      if (repeat) loopRef.current = { path, index: device, name };
      outputSource.current = { path, elapsed: offset };
      setOutputResult(null);
      acceptOutputRef.current = true;
      try {
        await call("play_audio", {
          path,
          index: device,
          expectedName: name,
          offset,
          limit: null,
        });
      } catch (error) {
        if (outputSource.current) {
          setOutputResult({
            ...outputSource.current,
            completed: false,
            error: String(error),
          });
          outputSource.current = null;
        }
        acceptOutputRef.current = false;
        loopRef.current = null;
        throw error;
      }
      log(
        translate("Avvio uscita: {0}", [
          outputs.find((d) => d.index === device)?.name ??
            "dispositivo selezionato",
        ]),
      );
    },
    [device, outputs, stop, log],
  );
  const startRecording = async (path: string) => {
    await stop();
    const id = ++countRef.current;
    outputSource.current = { path, elapsed: 0 };
    setOutputResult(null);
    for (let n = 3; n > 0; n--) {
      setCountdown(n);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (countRef.current !== id) return false;
    }
    setCountdown(null);
    outputSource.current = null;
    await start(path);
    recordingRef.current = true;
    setRecording(true);
    return true;
  };
  const togglePause = async () => {
    if (!playing || busy) return;
    await run(
      async () => {
        await call("set_audio_paused", { paused: !paused });
        setPaused(!paused);
      },
      paused ? "Ripresa…" : "Pausa…",
    );
  };
  const prepare = async () => {
    const r = await run(
      () =>
        call<Render | null>("render_side", {
          project,
          side,
          export: false,
          bits: 32,
        }),
      translate("Preparazione del master…"),
      true,
    );
    if (r) {
      setMaster(r);
      notify(
        translate("Lato {0} pronto · {1}", [
          side === 0 ? "A" : "B",
          time(r.duration),
        ]),
      );
      log(
        translate("Preparato lato {0}: {1}, picco {2} dBFS", [
          side === 0 ? "A" : "B",
          time(r.duration),
          r.peak.toFixed(1),
        ]),
      );
    }
    return r;
  };
  const seek = async (position: number) => {
    if (
      recordingRef.current ||
      navigationInFlight.current ||
      countdown !== null ||
      capturing ||
      busy ||
      !master ||
      !Number.isFinite(position)
    )
      return;
    const offset = Math.max(0, Math.min(position, master.duration - 0.01));
    const wasPaused = paused;
    navigationInFlight.current = true;
    try {
      await start(master.path, false, offset);
      setTelemetry((t) => ({ ...t, elapsed: offset }) as Telemetry);
      if (wasPaused) {
        await call("set_audio_paused", { paused: true });
        setPaused(true);
      }
    } catch (error) {
      notify(String(error), true);
    } finally {
      navigationInFlight.current = false;
    }
  };
  const skipTrack = async (direction: number) => {
    if (
      recordingRef.current ||
      countdown !== null ||
      capturing ||
      busy ||
      !project.sides[side].length
    )
      return;
    const timeline = sideTimeline(project, side);
    const position = telemetry?.elapsed ?? 0;
    const current = timeline.reduce(
      (found, t, i) => (t.start <= position + 0.05 ? i : found),
      -1,
    );
    const index =
      direction < 0 && current >= 0 && position - timeline[current].start > 3
        ? current
        : Math.max(0, Math.min(timeline.length - 1, current + direction));
    const ready = master ?? (await prepare());
    if (ready) {
      try {
        await start(ready.path, false, timeline[index].start);
      } catch (error) {
        notify(String(error), true);
      }
    }
  };
  const audition = async (t: Track) => {
    await run(async () => {
      const center =
        metric === "peak" ? t.analysis.peak_time : t.analysis.rms_time;
      const r = await call<Render>("render_passage", {
        project,
        id: t.id,
        center,
        seconds: loopSeconds,
        original,
      });
      await start(r.path, loop);
    }, translate("Preparo il passaggio…"));
  };
  const record = async (prepared = master) => {
    if (
      !prepared ||
      prepared.clipped ||
      info.durations[side] > project.capacity[side] - project.margin
    )
      return;
    await run(() => startRecording(prepared.path), translate("Avvio uscita…"));
  };
  const importTracks = async (folder = false, targetSide = side) => {
    const r = await run(
      () =>
        call<{ tracks: Track[]; errors: string[] }>(
          folder ? "import_folder" : "import_audio",
        ),
      translate("Importazione e analisi…"),
    );
    if (r) {
      if (r.tracks.length) {
        edit((p) => {
          p.tracks.push(...r.tracks);
          p.sides[targetSide].push(...r.tracks.map((t) => t.id));
        });
        setSelected(r.tracks[0].id);
        notify(translate("{0} brani importati", [r.tracks.length]));
      }
      if (r.errors.length) notify(r.errors.join("\n"), true);
    }
  };
  const demoLoad = async () => {
    const p = await run(
      () => call<Project>("demo_project"),
      translate("Genero la demo audio…"),
    );
    if (p) {
      commit(p);
      setSelected(p.tracks[0]?.id ?? null);
    }
  };
  const move = (id: string, direction: number) =>
    edit((p) => {
      for (const list of p.sides) {
        const i = list.indexOf(id);
        if (i >= 0) {
          const j = i + direction;
          if (j >= 0 && j < list.length)
            [list[i], list[j]] = [list[j], list[i]];
        }
      }
    });
  const switchSide = (id: string) =>
    edit((p) => {
      const from = p.sides[0].includes(id) ? 0 : 1;
      p.sides[from] = p.sides[from].filter((x) => x !== id);
      p.sides[1 - from].push(id);
    });
  const remove = (id: string) => {
    edit((p) => {
      p.tracks = p.tracks.filter((t) => t.id !== id);
      p.sides = p.sides.map((s) => s.filter((x) => x !== id)) as [
        string[],
        string[],
      ];
    });
    if (selected === id) setSelected(null);
  };
  const duplicate = (id: string) =>
    edit((p) => {
      const t = p.tracks.find((t) => t.id === id);
      if (!t) return;
      const copy = { ...clone(t), id: crypto.randomUUID(), locked: false };
      p.tracks.push(copy);
      const s = p.sides[0].includes(id) ? 0 : 1;
      p.sides[s].splice(p.sides[s].indexOf(id) + 1, 0, copy.id);
    });
  const history = (reverse = false) => {
    if (locked) return;
    const source = reverse ? redo : undo;
    const p = source.at(-1);
    if (!p) return;
    if (reverse) {
      setRedo((s) => s.slice(0, -1));
      setUndo((s) => [...s, clone(project)]);
    } else {
      setUndo((s) => s.slice(0, -1));
      setRedo((s) => [...s, clone(project)]);
    }
    commit(clone(p), false);
  };
  const save = async () => {
    const path = await run(() =>
      call<string | null>("save_project", { project }),
    );
    if (path) {
      setSaved(translate("Progetto salvato"));
      notify(translate("Progetto salvato con riferimenti ai file originali"));
    }
  };
  const open = async () => {
    const p = await run(() => call<Project | null>("open_project"));
    if (p) {
      commit(p);
      setSelected(null);
    }
  };
  const doExport = async () => {
    const r = await run(
      () =>
        call<Render | null>("render_side", {
          project,
          side,
          export: true,
          bits,
        }),
      translate("Esportazione WAV…"),
      true,
    );
    if (r) {
      notify(
        translate("WAV esportato: {0} · {1} bit", [time(r.duration), bits]),
      );
      log(
        translate("Esportato master lato {0} · {1} bit", [
          side ? "B" : "A",
          bits,
        ]),
      );
      setDialog(null);
    }
  };
  const documentExport = async (kind: string) => {
    const path = await run(() =>
      call<string | null>("export_document", { project, kind }),
    );
    if (path) notify(translate("File esportato"));
  };
  const tone = async (exportFile = false) => {
    const path = await run(
      () =>
        call<string | null>("generate_tone", {
          frequency: toneFrequency,
          level: project.processing.ceiling,
          seconds: 5,
          kind: toneKind,
          sampleRate: project.processing.sample_rate,
          export: exportFile,
        }),
      translate("Preparo il riferimento…"),
    );
    if (path) {
      if (exportFile) notify(translate("Tono esportato"));
      else {
        manualTonePath.current = path;
        await run(() => start(path), translate("Avvio tono…"));
      }
    }
  };
  const toggleMonitor = async () => {
    if (monitoring) {
      await call("stop_monitor");
      manualMonitorActive.current = false;
      setMonitoring(false);
      setCapturing(false);
      setInputTelemetry(null);
    } else {
      await run(async () => {
        await call("start_monitor", { index: inputDevice });
        manualMonitorActive.current = true;
        setMonitoring(true);
      });
    }
  };
  const setOutput = (value: number) => {
    setDevice(value);
    setMaster(null);
    const output = outputs.find((d) => d.index === value);
    setProfile((p) => ({ ...p, verified: false }));
    edit((p) => {
      if (output && [44100, 48000, 88200, 96000].includes(output.rate))
        p.processing.sample_rate = output.rate;
      if (p.calibration) p.calibration.verified = false;
    });
  };
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const tag = target.tagName;
      if (e.key === "Escape") {
        if (panel === "master" && busy) return;
        if (dialog) setDialog(null);
        else if (panel === "settings" || panel === "sessions") setPanel(null);
        else if (playing || countdown !== null || recording) void stop();
        else if (panel) setPanel(null);
        else void stop();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        if (!locked) void save();
        return;
      }
      if (
        ["TEXTAREA", "SELECT"].includes(tag) ||
        (tag === "INPUT" &&
          !(target instanceof HTMLInputElement && target.type === "range")) ||
        target.isContentEditable
      )
        return;
      if (
        !dialog &&
        panel !== "settings" &&
        panel !== "sessions" &&
        e.altKey &&
        !e.ctrlKey &&
        !e.metaKey &&
        ["ArrowLeft", "ArrowRight"].includes(e.key)
      ) {
        e.preventDefault();
        void skipTrack(e.key === "ArrowLeft" ? -1 : 1);
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        history(true);
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        history(e.shiftKey);
      }
      if (e.code === "Space") {
        if (
          dialog ||
          panel === "settings" ||
          panel === "sessions" ||
          ["BUTTON", "A", "SUMMARY", "INPUT"].includes(tag)
        )
          return;
        e.preventDefault();
        if (countdown !== null) void stop();
        else if (playing) void togglePause();
        else if (master && !busy) void run(() => start(master.path));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (playingRef.current || busy || capturing) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [busy, capturing]);
  const updateProcessing = (
    changes: Partial<Project["processing"]>,
    history = true,
  ) =>
    edit((p) => {
      Object.assign(p.processing, changes);
      if (changes.sample_rate && p.calibration) p.calibration.verified = false;
    }, history);
  useEffect(() => {
    if (!dialog && panel !== "settings" && panel !== "sessions") return;
    const previous = document.activeElement as HTMLElement | null;
    const modal = document.querySelector<HTMLElement>(
      dialog ? ".modal:not(.utility-drawer)" : ".utility-drawer",
    );
    const focusable = () =>
      Array.from(
        modal?.querySelectorAll<HTMLElement>(
          'button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),summary,[tabindex="0"]',
        ) ?? [],
      ).filter((el) => el.offsetParent !== null);
    focusable()[0]?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const list = focusable();
      if (!list.length) return;
      const first = list[0],
        last = list.at(-1)!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trap);
    return () => {
      document.removeEventListener("keydown", trap);
      previous?.focus();
    };
  }, [dialog, panel]);
  useEffect(() => {
    if (panel !== "master") return;
    const savedProfile = projectRef.current.calibration;
    setProfile(savedProfile ? clone(savedProfile) : defaultProfile());
    return () => {
      if (manualMonitorActive.current) {
        manualMonitorActive.current = false;
        void call("stop_monitor");
        setMonitoring(false);
        setInputTelemetry(null);
      }
      if (outputSource.current?.path === manualTonePath.current) void stop();
      manualTonePath.current = null;
    };
  }, [panel, stop]);
  const chooseSide = (value: number) => {
    if (locked || value === side) return;
    setSide(value);
    setMaster(null);
  };
  const captureReturn = async (
    playMaster = false,
    calibrationAutoStop = false,
  ) => {
    if (capturing) {
      await call("stop_monitor");
      setCapturing(false);
      setMonitoring(false);
      return;
    }
    setInputTelemetry(null);
    setInputError(null);
    setCapturePath(null);
    await run(async () => {
      const path = await call<string>("start_capture", {
        index: inputDevice,
        calibrationAutoStop,
      });
      setCapturePath(path);
      setComparison(null);
      setCapturing(true);
      setMonitoring(true);
      if (playMaster && master) await start(master.path);
    }, translate("Avvio acquisizione del ritorno…"));
  };
  const compareCapture = async () => {
    if (!master || !capturePath) return;
    const result = await run(
      () =>
        call<Comparison>("compare_return", {
          reference: master.path,
          recorded: capturePath,
        }),
      translate("Allineo sorgente e ritorno…"),
    );
    if (result) {
      setComparison(result);
      log(
        translate("Confronto ritorno: ritardo {0} ms, correlazione {1}", [
          result.delay_ms.toFixed(1),
          result.correlation.toFixed(3),
        ]),
      );
    }
  };
  const saveCapture = async () => {
    if (!capturePath) return;
    const path = await run(() =>
      call<string | null>("save_capture", { path: capturePath }),
    );
    if (path) notify(translate("Ritorno audio salvato"));
  };
  const portable = async () => {
    const path = await run(
      () => call<string | null>("collect_project", { project }),
      translate("Raccolgo progetto e sorgenti…"),
    );
    if (path) notify(translate("Progetto e audio raccolti in {0}", [path]));
  };
  const clearCache = async () => {
    const bytes = await run(() => call<number>("clear_render_cache"));
    if (bytes !== undefined) {
      setMaster(null);
      notify(
        translate(
          "{0} MiB di master temporanei rimossi. Demo, progetti e sorgenti sono conservati.",
          [(bytes / 1048576).toFixed(1)],
        ),
      );
    }
  };
  const gain = track
    ? (info.gains.find((g) => g[0] === track.id)?.[1] ?? 0)
    : 0;
  const used = info.durations[side],
    remaining = project.capacity[side] - project.margin - used;

  return {
    project,
    recordingProfiles,
    saveRecordingProfile,
    applyRecordingProfile,
    setProject,
    info,
    setInfo,
    page,
    setPage,
    panel,
    setPanel,
    side,
    setSide,
    selected,
    setSelected,
    busy,
    cancelable,
    setBusy,
    job,
    setJob,
    toast,
    setToast,
    dialog,
    setDialog,
    undo,
    setUndo,
    redo,
    setRedo,
    outputs,
    setOutputs,
    inputs,
    setInputs,
    device,
    setDevice,
    inputDevice,
    setInputDevice,
    master,
    setMaster,
    telemetry,
    outputResult,
    setTelemetry,
    inputTelemetry,
    inputError,
    setInputTelemetry,
    playing,
    paused,
    togglePause,
    recording,
    seek,
    skipTrack,
    setPlaying,
    monitoring,
    setMonitoring,
    countdown,
    setCountdown,
    loop,
    setLoop,
    loopSeconds,
    setLoopSeconds,
    metric,
    setMetric,
    original,
    setOriginal,
    fitPreview,
    setFitPreview,
    preserve,
    setPreserve,
    bits,
    setBits,
    profile,
    setProfile,
    toneFrequency,
    setToneFrequency,
    toneKind,
    setToneKind,
    theme,
    setTheme,
    saved,
    setSaved,
    recover,
    restoreRecovery,
    dismissRecovery,
    sessions,
    setSessions,
    projectRef,
    playingRef,
    loopRef,
    countRef,
    mounted,
    autosaveEnabled,
    notify,
    log,
    run,
    commit,
    edit,
    patchTrack,
    track,
    locked,
    refresh,
    stop,
    start,
    startRecording,
    prepare,
    audition,
    record,
    importTracks,
    demoLoad,
    move,
    switchSide,
    remove,
    duplicate,
    history,
    save,
    open,
    doExport,
    documentExport,
    tone,
    toggleMonitor,
    setOutput,
    updateProcessing,
    gain,
    used,
    remaining,
    capturing,
    capturePath,
    comparison,
    captureReturn,
    compareCapture,
    saveCapture,
    portable,
    clearCache,
    chooseSide,
    clone,
  };
}
