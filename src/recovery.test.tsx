// @vitest-environment jsdom
import {
  act,
  cleanup,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { blank, call, demo, previewInfo } from "./backend";
import type { Project, Track } from "./types";
import { useStudioController } from "./useStudioController";
import { StudioContext } from "./studio-context";
import { RecoveryNotice } from "./views/RecoveryNotice";

vi.mock("./backend", async (original) => ({
  ...(await original<typeof import("./backend")>()),
  native: false,
  call: vi.fn(),
}));
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}
let previous: Project;
let defaultLoad: Promise<Project>;
let recoveryLoad: Promise<Project | null>;
let importLoad: Promise<{ tracks: Track[]; errors: string[] }>;
beforeEach(() => {
  localStorage.clear();
  previous = { ...demo(), title: "Sessione precedente" };
  defaultLoad = Promise.resolve(blank());
  recoveryLoad = Promise.resolve(previous);
  importLoad = Promise.resolve({ tracks: demo().tracks, errors: [] });
  vi.mocked(call).mockReset();
  vi.mocked(call).mockImplementation(async (command, args) => {
    switch (command) {
      case "default_project":
        return (await defaultLoad) as never;
      case "recover_project":
        return (await recoveryLoad) as never;
      case "import_audio":
        return (await importLoad) as never;
      case "audio_devices":
        return [] as never;
      case "project_info":
        return previewInfo(args!.project as Project) as never;
      default:
        return undefined as never;
    }
  });
});
afterEach(cleanup);

describe("session recovery lifecycle", () => {
  it("restores through the visible button and dismisses the notice", async () => {
    function Studio() {
      const studio = useStudioController();
      return (
        <StudioContext.Provider value={studio}>
          <RecoveryNotice />
          <output aria-label="Titolo attivo">{studio.project.title}</output>
        </StudioContext.Provider>
      );
    }
    render(<Studio />);
    const button = await screen.findByRole("button", {
      name: "Riprendi sessione",
    });
    expect(screen.getByText("4 brani")).toBeTruthy();
    fireEvent.click(button);
    expect(screen.getByLabelText("Titolo attivo").textContent).toBe(
      previous.title,
    );
    expect(
      screen.queryByRole("region", { name: "Riprendi l’ultima sessione" }),
    ).toBeNull();
  });
  it("clears a stale notice after actual import and cannot restore over the new work", async () => {
    const { result } = renderHook(useStudioController);
    await waitFor(() => expect(result.current.recover).toEqual(previous));
    await act(async () => {
      await result.current.importTracks();
    });
    expect(result.current.recover).toBeNull();
    expect(result.current.project.tracks).toHaveLength(4);
    act(() => result.current.restoreRecovery());
    expect(result.current.project.title).toBe(blank().title);
  });
  it("ignores a recovery response that arrives after import", async () => {
    const pending = deferred<Project | null>();
    recoveryLoad = pending.promise;
    const { result } = renderHook(useStudioController);
    await act(async () => {
      await result.current.importTracks();
    });
    await act(async () => {
      pending.resolve(previous);
    });
    expect(result.current.recover).toBeNull();
    expect(result.current.project.tracks).toHaveLength(4);
  });
  it("does not reset a recovered session when the default project arrives late", async () => {
    const pending = deferred<Project>();
    defaultLoad = pending.promise;
    const { result } = renderHook(useStudioController);
    await waitFor(() => expect(result.current.recover).toEqual(previous));
    act(() => result.current.restoreRecovery());
    await act(async () => {
      pending.resolve(blank());
    });
    expect(result.current.project).toEqual(previous);
    expect(result.current.undo).toEqual([]);
  });
  it("does not restore while an import is running", async () => {
    const pending = deferred<{ tracks: Track[]; errors: string[] }>();
    importLoad = pending.promise;
    const { result } = renderHook(useStudioController);
    await waitFor(() => expect(result.current.recover).toEqual(previous));
    let importing!: Promise<void>;
    act(() => {
      importing = result.current.importTracks();
    });
    expect(result.current.locked).toBe(true);
    act(() => result.current.restoreRecovery());
    expect(result.current.project.tracks).toHaveLength(0);
    expect(result.current.recover).toEqual(previous);
    await act(async () => {
      pending.resolve({ tracks: [], errors: [] });
      await importing;
    });
  });
  it("closing the notice leaves the project and saved session untouched", async () => {
    const { result } = renderHook(useStudioController);
    await waitFor(() => expect(result.current.recover).toEqual(previous));
    act(() => result.current.dismissRecovery());
    expect(result.current.recover).toBeNull();
    expect(result.current.project).toEqual(blank());
    expect(
      vi
        .mocked(call)
        .mock.calls.some(([command]) => command === "autosave_project"),
    ).toBe(false);
  });
});
