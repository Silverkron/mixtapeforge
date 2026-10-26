// @vitest-environment jsdom
import { afterEach, beforeEach, it, expect, vi } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { StudioView } from "./StudioView";
import { StudioContext } from "../studio-context";
import { blank } from "../backend";
vi.mock("../backend", async (load) => ({
  ...(await load<typeof import("../backend")>()),
  native: true,
}));
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
it("allows Play to resume a paused master and protects navigation during REC", () => {
  const project = blank();
  project.sides = [["a"], []];
  project.tracks = [
    {
      id: "a",
      title: "Track",
      artist: "Artist",
      duration: 10,
      trim_start: 0,
      trim_end: 0,
    },
  ] as never;
  const resume = vi.fn();
  const context = {
    project,
    side: 0,
    master: {
      path: "master.wav",
      duration: 10,
      peak: -3,
      true_peak: -3,
      attenuation: 0,
      clipped: 0,
    },
    outputs: [{ index: 0, name: "Output" }],
    inputs: [],
    used: 10,
    remaining: 10,
    playing: true,
    paused: true,
    locked: true,
    busy: false,
    countdown: null,
    togglePause: resume,
    recording: false,
  };
  const view = render(
    <StudioContext.Provider value={context as never}>
      <StudioView />
    </StudioContext.Provider>,
  );
  const play = screen.getByRole("button", {
    name: "Ascolta",
  }) as HTMLButtonElement;
  expect(play.disabled).toBe(false);
  fireEvent.click(play);
  expect(resume).toHaveBeenCalledOnce();
  view.rerender(
    <StudioContext.Provider value={{ ...context, recording: true } as never}>
      <StudioView />
    </StudioContext.Provider>,
  );
  expect(
    (
      screen.getByRole("slider", {
        name: "Avanzamento del lato",
      }) as HTMLInputElement
    ).disabled,
  ).toBe(true);
  expect(
    (
      screen.getByRole("button", {
        name: "Brano successivo",
      }) as HTMLButtonElement
    ).disabled,
  ).toBe(true);
});
