// @vitest-environment jsdom
import { useState } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { App } from "../App";
import { blank } from "../backend";
import { StudioContext } from "../studio-context";
import { MasteringView } from "./MasteringView";
import type { Project } from "../types";

beforeEach(() => {
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});
function Editor({
  reference = blank().processing.nr_reference,
  setOutput = vi.fn(),
  setInputDevice = vi.fn(),
}: {
  reference?: number;
  setOutput?: (device: number) => void;
  setInputDevice?: (device: number) => void;
}) {
  const [project, setProject] = useState(() => {
    const p = blank();
    p.processing.nr = "type_b";
    p.processing.nr_reference = reference;
    return p;
  });
  return (
    <StudioContext.Provider
      value={
        {
          project,
          panel: "master",
          locked: false,
          busy: false,
          outputs: [{ index: 2, name: "Deck OUT", rate: 48000 }],
          inputs: [{ index: 3, name: "Deck IN", channels: 2 }],
          device: -1,
          inputDevice: -1,
          setOutput,
          setInputDevice,
          profile: { name: "Deck", reference: -18 },
          track: null,
          gain: 0,
          updateProcessing: (changes: Partial<Project["processing"]>) =>
            setProject((p) => ({
              ...p,
              processing: { ...p.processing, ...changes },
            })),
        } as never
      }
    >
      <MasteringView />
    </StudioContext.Provider>
  );
}
describe("NR reference controls", () => {
  it("owns both devices, recording gain and manual deck reference in the same panel", () => {
    const setOutput = vi.fn();
    const setInputDevice = vi.fn();
    render(<Editor setOutput={setOutput} setInputDevice={setInputDevice} />);
    fireEvent.click(screen.getByRole("button", { name: "Dispositivi audio" }));
    fireEvent.change(screen.getByLabelText("Uscita verso il deck"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByLabelText("Ingresso dal deck"), {
      target: { value: "3" },
    });
    expect(setOutput).toHaveBeenCalledWith(2);
    expect(setInputDevice).toHaveBeenCalledWith(3);
    fireEvent.click(screen.getByRole("button", { name: "Mixer" }));
    const gain = screen.getByRole("slider", {
      name: "Livello verso la piastra",
    });
    fireEvent.change(gain, { target: { value: "-13" } });
    fireEvent.blur(gain);
    fireEvent.click(screen.getByRole("button", { name: "Strumenti audio" }));
    expect(screen.getByText("-13 dBFS")).toBeTruthy();
    expect(screen.getByLabelText(/0 VU corrisponde a/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Brani" }));
    expect(screen.getByRole("slider", { name: "Crossfade" })).toBeTruthy();
    expect(screen.queryByLabelText(/Limite true peak/)).toBeNull();
  });
  it("keeps primary controls together and preserves NR settings when editing EQ", () => {
    render(<Editor reference={-12} />);
    fireEvent.click(screen.getByRole("button", { name: "Brani" }));
    expect(screen.getByLabelText("Normalizzazione")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Equalizzatore" }));
    expect(screen.getAllByRole("slider")).toHaveLength(10);
    fireEvent.change(screen.getByRole("slider", { name: "EQ 1000 Hz" }), {
      target: { value: "2" },
    });
    expect(
      (
        screen.getByLabelText(
          "Livello digitale di riferimento NR",
        ) as HTMLInputElement
      ).value,
    ).toBe("-12");
    expect(screen.getAllByRole("slider")).toHaveLength(10);
    expect(
      (
        screen.getByLabelText(
          "Livello digitale di riferimento NR",
        ) as HTMLInputElement
      ).value,
    ).toBe("-12");
  });

  it("uses zero for a new project and exposes an input that accepts it", () => {
    render(<Editor />);
    const input = screen.getByLabelText(
      "Livello digitale di riferimento NR",
    ) as HTMLInputElement;
    expect(input.value).toBe("0");
    expect(input.max).toBe("0");
  });
  it("preserves a saved reference until the user restores zero", () => {
    const { container } = render(<Editor reference={-18} />);
    const input = screen.getByLabelText(
      "Livello digitale di riferimento NR",
    ) as HTMLInputElement;
    expect(input.value).toBe("-18");
    fireEvent.click(screen.getByRole("button", { name: "Processori" }));
    fireEvent.click(screen.getByRole("button", { name: "Ripristina 0 dBFS" }));
    expect(input.value).toBe("0");
    expect(container.textContent).toContain("Nessuna attenuazione NR fissa");
  });
});

it("opens the same audio controls from Mixtape and Calibration", async () => {
  render(<App />);
  await act(async () => {});
  expect(
    screen.queryByRole("heading", { name: "Vuoi provare prima di importare?" }),
  ).toBeNull();
  for (const page of ["Mixtape", "Calibrazione"]) {
    fireEvent.click(screen.getByRole("button", { name: page }));
    fireEvent.click(screen.getByRole("button", { name: "Controlli audio" }));
    const panel = screen.getByRole("complementary", {
      name: "Controlli audio",
    });
    expect(within(panel).getByLabelText("Uscita verso il deck")).toBeTruthy();
    expect(within(panel).getByLabelText("Ingresso dal deck")).toBeTruthy();
    expect(
      within(panel).getByRole("slider", { name: "Livello verso la piastra" }),
    ).toBeTruthy();
    fireEvent.click(
      within(panel).getByRole("button", { name: "Chiudi pannello" }),
    );
  }
  fireEvent.click(screen.getByRole("button", { name: "Impostazioni" }));
  const settings = screen.getByRole("dialog", { name: "Impostazioni" });
  expect(within(settings).queryByLabelText("Uscita verso il deck")).toBeNull();
});
