// @vitest-environment jsdom
import { useState } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { blank } from "../backend";
import * as backend from "../backend";
import { StudioContext } from "../studio-context";
import type { CalibrationReport, Processing, Telemetry } from "../types";
import { CalibrationView } from "./CalibrationView";
vi.mock("../backend", async (load) => ({
  ...(await load<typeof import("../backend")>()),
  native: true,
}));
const frequencies = [31.5, 63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
const fixture: CalibrationReport = {
  protocol: 1,
  source: "prova.wav",
  sample_rate: 48000,
  duration: 49,
  delay_seconds: 0,
  time_scale: 1,
  sync_confidence: 1,
  reference_dbfs: [-24, -24],
  imbalance_db: 0,
  noise_dbfs: [-65, -65],
  snr_db: [41, 41],
  hiss_dbfs: [-70, -70],
  peak_dbfs: [-9, -9],
  clipped_samples: [0, 0],
  crosstalk_db: [-45, -45],
  warnings: [],
  correction_allowed: true,
  bands: frequencies.map((f) => ({
    frequency: f,
    response_db: [-6, -6],
    rms_dbfs: [-30, -30],
  })),
  levels: [],
};
beforeEach(() => {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
    scale: vi.fn(),
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    fillText: vi.fn(),
    fillRect: vi.fn(),
  } as never);
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
function Editor({
  report = null,
  update = vi.fn(),
  capturePath = null,
  inputTelemetry = null,
  outputs = [],
  device = -1,
  startRecording = vi.fn(),
  recordingLevelDb = -3,
  setPanel = vi.fn(),
}: {
  report?: CalibrationReport | null;
  update?: (v: unknown) => void;
  capturePath?: string | null;
  inputTelemetry?: Telemetry | null;
  outputs?: { index: number; name: string; rate: number }[];
  device?: number;
  startRecording?: (path: string) => Promise<unknown>;
  recordingLevelDb?: number;
  setPanel?: (panel: string) => void;
}) {
  const [project, setProject] = useState(() => {
    const p = blank();
    p.processing.ceiling = recordingLevelDb;
    return { ...p, calibration_report: report };
  });
  return (
    <StudioContext.Provider
      value={
        {
          project,
          outputs,
          inputs: [],
          locked: false,
          busy: false,
          playing: false,
          capturing: false,
          inputTelemetry,
          capturePath,
          job: { value: 0, label: "Analizzo livelli, frequenze e rumore…" },
          run: async (work: () => Promise<unknown>) => {
            try {
              return await work();
            } catch {
              return undefined;
            }
          },
          edit: (fn: (p: typeof project) => void) =>
            setProject((p) => {
              const next = structuredClone(p);
              fn(next);
              return next;
            }),
          device,
          inputDevice: -1,
          telemetry: null,
          outputResult: null,
          countdown: null,
          stop: vi.fn(),
          startRecording,
          updateProcessing: (changes: Partial<Processing>) =>
            setProject((p) => ({
              ...p,
              processing: { ...p.processing, ...changes },
            })),
          recordingProfiles: [],
          saveRecordingProfile: update,
          notify: vi.fn(),
          setPanel,
        } as never
      }
    >
      <CalibrationView />
    </StudioContext.Provider>
  );
}
describe("guided calibration", () => {
  it("shows automatic capture completion and makes analysis available", () => {
    render(
      <Editor
        capturePath="complete.wav"
        inputTelemetry={
          { elapsed: 53.52, calibration_complete: true } as Telemetry
        }
      />,
    );
    fireEvent.click(
      screen.getByRole("button", { name: /Passa all’acquisizione/ }),
    );
    expect(
      screen.getByText(
        "Marcatore finale riconosciuto · acquisizione terminata",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Ora puoi fermare PLAY sulla piastra e analizzare la prova.",
      ),
    ).toBeTruthy();
    expect(
      (
        screen.getByRole("button", {
          name: /Analizza prova/,
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(false);
  });

  it("moves analysis to step three and shows processing before the report", async () => {
    let finish!: (value: CalibrationReport) => void;
    vi.spyOn(backend, "call").mockImplementation(
      () =>
        new Promise<CalibrationReport>((resolve) => {
          finish = resolve;
        }) as never,
    );
    render(<Editor capturePath="captured.wav" />);
    fireEvent.click(
      screen.getByRole("button", { name: /Passa all’acquisizione/ }),
    );
    fireEvent.click(screen.getByRole("button", { name: /Analizza prova/ }));
    expect(
      screen.getByRole("heading", { name: "Analisi della registrazione" }),
    ).toBeTruthy();
    expect(
      screen.queryByRole("heading", { name: "La tua registrazione, misurata" }),
    ).toBeNull();
    await act(async () => finish(fixture));
    expect(
      screen.getByRole("heading", { name: "La tua registrazione, misurata" }),
    ).toBeTruthy();
  });
  it("keeps failed analysis in step three with a route back to capture", async () => {
    vi.spyOn(backend, "call").mockRejectedValue(new Error("Marcatori assenti"));
    render(<Editor capturePath="invalid.wav" />);
    fireEvent.click(
      screen.getByRole("button", { name: /Passa all’acquisizione/ }),
    );
    await act(async () =>
      fireEvent.click(screen.getByRole("button", { name: /Analizza prova/ })),
    );
    expect(
      screen.getByRole("heading", { name: "Analisi non completata" }),
    ).toBeTruthy();
    fireEvent.click(
      screen.getByRole("button", { name: "Torna all’acquisizione" }),
    );
    expect(
      screen.getByRole("heading", { name: "Acquisisci il riascolto" }),
    ).toBeTruthy();
  });

  it("uses the shared recording peak for the probe", async () => {
    const startRecording = vi.fn().mockResolvedValue(true);
    const generate = vi.spyOn(backend, "call").mockResolvedValue("probe.wav");
    render(
      <Editor
        outputs={[{ index: 0, name: "UCA222", rate: 48000 }]}
        device={0}
        startRecording={startRecording}
        recordingLevelDb={-13}
      />,
    );
    expect(screen.queryByRole("spinbutton")).toBeNull();
    await act(async () =>
      fireEvent.click(screen.getByRole("button", { name: "Avvia prova" })),
    );
    expect(generate).toHaveBeenCalledWith("calibration_signal", {
      export: false,
      sampleRate: 48000,
      gainDb: -10,
    });
  });
  it("shows the selected devices as readouts while keeping the guided recording and capture", () => {
    render(<Editor />);
    expect(
      screen
        .getByRole("button", { name: /Analisi e risultati/ })
        .hasAttribute("disabled"),
    ).toBe(true);
    expect(
      screen.getByRole("heading", { name: "Registra la prova sul nastro" }),
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: "Avvia prova" })).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: "Uscita verso il deck" }),
    ).toBeTruthy();
    expect(
      screen.queryByRole("combobox", { name: /Uscita|Ingresso/ }),
    ).toBeNull();
    fireEvent.click(
      screen.getByRole("button", { name: /Passa all’acquisizione/ }),
    );
    expect(
      screen.getByRole("heading", { name: "Acquisisci il riascolto" }),
    ).toBeTruthy();
    expect(screen.getByText(/Ingresso dal deck/)).toBeTruthy();
    expect(
      screen.queryByRole("combobox", { name: /Uscita|Ingresso/ }),
    ).toBeNull();
    expect(screen.queryByRole("button", { name: "Avvia prova" })).toBeNull();
    expect(
      screen.getByRole("img", { name: "Spettro medio durante l’acquisizione" }),
    ).toBeTruthy();
  });
  it("uses the guided fader to set the shared level for the tone and the probe", async () => {
    const startRecording = vi.fn().mockResolvedValue(true);
    const generate = vi
      .spyOn(backend, "call")
      .mockResolvedValue("reference-tone.wav");
    render(
      <Editor
        outputs={[{ index: 0, name: "UCA222", rate: 48000 }]}
        device={0}
        startRecording={startRecording}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Apri regolazione" }));
    expect(
      screen.getByRole("dialog", { name: "Trova il livello di registrazione" }),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Sulla maggior parte delle piastre il VU indica l’inizio della saturazione. Segui il manuale se usa una scala diversa.",
      ),
    ).toBeTruthy();
    const fader = screen.getByRole("slider", {
      name: "Livello verso la piastra",
    });
    expect(fader.getAttribute("aria-valuetext")).toBe("-3 dBFS");
    fireEvent.change(fader, { target: { value: "-13" } });
    expect(fader.getAttribute("aria-valuetext")).toBe("-13 dBFS");
    await act(async () =>
      fireEvent.click(screen.getByRole("button", { name: "Avvia tono" })),
    );
    expect(generate).toHaveBeenCalledWith(
      "generate_tone",
      expect.objectContaining({
        frequency: 1000,
        level: -13,
        seconds: 20,
        kind: "sine",
        export: false,
      }),
    );
    expect(startRecording).toHaveBeenCalledWith("reference-tone.wav");
    fireEvent.click(screen.getByRole("button", { name: "Livello impostato" }));
    await act(async () =>
      fireEvent.click(screen.getByRole("button", { name: "Avvia prova" })),
    );
    expect(generate).toHaveBeenCalledWith(
      "calibration_signal",
      expect.objectContaining({ gainDb: -10 }),
    );
  });
  it("creates a reusable profile only after naming the recording conditions", async () => {
    const save = vi.fn();
    const setPanel = vi.fn();
    const profile = {
      version: 1,
      id: "profile-test",
      enabled: true,
      conditions: {
        sample_rate: 48000,
        name: "Deck · nastro",
        deck: "Pioneer",
        tape: "Type I",
        output: "FastTrack",
        input: "",
        notes: "",
      },
      eq_bands: [3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
      channel_gain_db: [0, 0],
      report: fixture,
    };
    const create = vi.spyOn(backend, "call").mockResolvedValue(profile);
    render(
      <Editor
        report={fixture}
        update={save}
        setPanel={setPanel}
        recordingLevelDb={-13}
      />,
    );
    expect(save).not.toHaveBeenCalled();
    fireEvent.click(
      screen.getByRole("button", { name: /Analisi e risultati/ }),
    );
    fireEvent.change(screen.getByLabelText("Nome profilo"), {
      target: { value: "Deck · nastro" },
    });
    fireEvent.change(screen.getByLabelText("Piastra"), {
      target: { value: "Pioneer" },
    });
    fireEvent.change(screen.getByLabelText("Nastro"), {
      target: { value: "Type I" },
    });
    fireEvent.change(screen.getByLabelText("Uscita usata nella prova"), {
      target: { value: "FastTrack" },
    });
    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", { name: "Salva e usa profilo" }),
      );
    });
    expect(create).toHaveBeenCalledWith(
      "create_recording_profile",
      expect.objectContaining({
        report: fixture,
        recordingLevelDb: -13,
        conditions: expect.objectContaining({
          name: "Deck · nastro",
          deck: "Pioneer",
          tape: "Type I",
          output: "FastTrack",
          sample_rate: 48000,
        }),
      }),
    );
    expect(save).toHaveBeenCalledWith(profile);
    expect(setPanel).toHaveBeenCalledWith("master");
  });
  it("saves with only a prefilled name and hides optional details", async () => {
    const create = vi
      .spyOn(backend, "call")
      .mockResolvedValue({ id: "name-only" });
    render(<Editor report={fixture} />);
    fireEvent.click(
      screen.getByRole("button", { name: /Analisi e risultati/ }),
    );
    const name = screen.getByLabelText("Nome profilo") as HTMLInputElement;
    expect(name.value.trim()).not.toBe("");
    expect(name.required).toBe(true);
    for (const label of [
      "Piastra",
      "Nastro",
      "Uscita usata nella prova",
      "Ingresso usato nella prova",
    ]) {
      const field = screen.getByLabelText(label) as HTMLInputElement;
      expect(field.required).toBe(false);
      expect(field.closest("details")?.open).toBe(false);
    }
    const save = screen.getByRole("button", {
      name: "Salva e usa profilo",
    }) as HTMLButtonElement;
    expect(save.disabled).toBe(false);
    fireEvent.change(name, { target: { value: "  " } });
    expect(save.disabled).toBe(true);
    fireEvent.change(name, { target: { value: "La mia TDK" } });
    await act(async () => fireEvent.click(save));
    expect(create).toHaveBeenCalledWith(
      "create_recording_profile",
      expect.objectContaining({
        conditions: expect.objectContaining({
          name: "La mia TDK",
          deck: "",
          tape: "",
          output: "",
          input: "",
        }),
      }),
    );
  });
  it("blocks correction on an unreliable recording", () => {
    render(
      <Editor
        report={{
          ...fixture,
          correction_allowed: false,
          warnings: ["Clipping digitale"],
        }}
      />,
    );
    fireEvent.click(
      screen.getByRole("button", { name: /Analisi e risultati/ }),
    );
    expect(
      screen
        .getByRole("button", { name: "Salva e usa profilo" })
        .hasAttribute("disabled"),
    ).toBe(true);
  });
});
