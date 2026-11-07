// @vitest-environment jsdom
import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
const events = vi.hoisted(
  () => new Map<string, (e: { payload: unknown }) => void>(),
);
vi.mock("@tauri-apps/api/event", () => ({
  listen: vi.fn(
    async (name: string, callback: (e: { payload: unknown }) => void) => {
      events.set(name, callback);
      return () => events.delete(name);
    },
  ),
}));
vi.mock("./backend", async (load) => {
  const real = await load<typeof import("./backend")>();
  return {
    ...real,
    native: true,
    call: vi.fn(async (name: string) => {
      if (name === "default_project") return real.blank();
      if (name === "recover_project") return null;
      if (name === "generate_tone") return "manual-tone.wav";
      if (name === "audio_devices")
        return [
          {
            index: 0,
            name: "Test output",
            rate: 44100,
            channels: 2,
            is_default: true,
          },
        ];
      if (name === "project_info") return { durations: [0, 0], gains: [] };
      return null;
    }),
  };
});

it("uses the shared recording peak for the manual tone and stops only that tone when closing audio controls", async () => {
  const { result } = renderHook(() => useStudioController());
  await act(async () => {});
  act(() => {
    result.current.setPanel("master");
    result.current.updateProcessing({ ceiling: -13 });
  });
  await act(async () => result.current.tone());
  expect(call).toHaveBeenCalledWith(
    "generate_tone",
    expect.objectContaining({ level: -13 }),
  );
  vi.mocked(call).mockClear();
  act(() => result.current.setPanel(null));
  expect(call).toHaveBeenCalledWith("stop_audio");

  act(() => result.current.setPanel("master"));
  await act(async () => result.current.start("master.wav"));
  vi.mocked(call).mockClear();
  act(() => result.current.setPanel(null));
  expect(call).not.toHaveBeenCalledWith("stop_audio");
});
import { call } from "./backend";
import { useStudioController } from "./useStudioController";
afterEach(() => {
  cleanup();
  events.clear();
  vi.useRealTimers();
});
it("distinguishes a completed output from Stop and from device failure", async () => {
  const { result } = renderHook(() => useStudioController());
  await act(async () => {});
  await act(async () => {
    await result.current.start("probe.wav");
  });
  act(() => events.get("audio-telemetry")!({ payload: { elapsed: 48.9 } }));
  act(() => events.get("audio-ended")!({ payload: null }));
  expect(result.current.outputResult).toEqual({
    path: "probe.wav",
    elapsed: 48.9,
    completed: true,
    error: null,
  });
  await act(async () => {
    await result.current.start("stopped.wav");
  });
  act(() => events.get("audio-telemetry")!({ payload: { elapsed: 11 } }));
  await act(async () => {
    await result.current.stop();
  });
  expect(result.current.outputResult).toEqual({
    path: "stopped.wav",
    elapsed: 11,
    completed: false,
    error: null,
  });
  // The later worker event after Stop must not turn an interrupted run into a completed run.
  act(() => events.get("audio-ended")!({ payload: null }));
  expect(result.current.outputResult?.completed).toBe(false);
  await act(async () => {
    await result.current.start("error.wav");
  });
  act(() => events.get("audio-ended")!({ payload: "Device unavailable" }));
  expect(result.current.outputResult).toEqual({
    path: "error.wav",
    elapsed: 0,
    completed: false,
    error: "Device unavailable",
  });
});

it("waits for 3, 2, 1 before opening the recording output", async () => {
  const { result } = renderHook(() => useStudioController());
  await act(async () => {});
  vi.useFakeTimers();
  vi.mocked(call).mockClear();
  let pending!: Promise<boolean>;
  await act(async () => {
    pending = result.current.startRecording("calibration.wav");
  });
  expect(result.current.countdown).toBe(3);
  expect(
    vi.mocked(call).mock.calls.some(([name]) => name === "play_audio"),
  ).toBe(false);
  await act(async () => {
    await vi.advanceTimersByTimeAsync(1000);
  });
  expect(result.current.countdown).toBe(2);
  await act(async () => {
    await vi.advanceTimersByTimeAsync(1000);
  });
  expect(result.current.countdown).toBe(1);
  expect(
    vi.mocked(call).mock.calls.some(([name]) => name === "play_audio"),
  ).toBe(false);
  await act(async () => {
    await vi.advanceTimersByTimeAsync(1000);
    await pending;
  });
  expect(result.current.countdown).toBeNull();
  expect(
    vi.mocked(call).mock.calls.filter(([name]) => name === "play_audio"),
  ).toHaveLength(1);
});
it("Stop during the countdown prevents any later playback", async () => {
  const { result } = renderHook(() => useStudioController());
  await act(async () => {});
  vi.useFakeTimers();
  vi.mocked(call).mockClear();
  let pending!: Promise<boolean>;
  await act(async () => {
    pending = result.current.startRecording("cancelled.wav");
  });
  await act(async () => {
    await vi.advanceTimersByTimeAsync(1000);
    await result.current.stop();
  });
  expect(result.current.countdown).toBeNull();
  await act(async () => {
    await vi.advanceTimersByTimeAsync(5000);
  });
  expect(await pending).toBe(false);
  expect(
    vi.mocked(call).mock.calls.some(([name]) => name === "play_audio"),
  ).toBe(false);
  expect(result.current.outputResult).toEqual({
    path: "cancelled.wav",
    elapsed: 0,
    completed: false,
    error: null,
  });
});

it("requests autostop only for guided calibration and preserves its completion flag", async () => {
  const { result } = renderHook(() => useStudioController());
  await act(async () => {});
  vi.mocked(call).mockClear();
  await act(async () => {
    await result.current.captureReturn(false, true);
  });
  expect(vi.mocked(call)).toHaveBeenCalledWith("start_capture", {
    index: 0,
    calibrationAutoStop: true,
  });
  act(() =>
    events.get("input-telemetry")!({
      payload: { elapsed: 52.3, input: true, calibration_complete: true },
    }),
  );
  act(() => events.get("input-ended")!({ payload: null }));
  expect(result.current.capturing).toBe(false);
  expect(result.current.inputTelemetry?.calibration_complete).toBe(true);
  expect(result.current.inputError).toBeNull();
  vi.mocked(call).mockClear();
  await act(async () => {
    await result.current.captureReturn();
  });
  expect(vi.mocked(call)).toHaveBeenCalledWith("start_capture", {
    index: 0,
    calibrationAutoStop: false,
  });
  expect(result.current.inputTelemetry).toBeNull();
});
it("seeks in the master using absolute time and blocks seeking during REC", async () => {
  vi.useFakeTimers();
  const { result } = renderHook(() => useStudioController());
  await act(async () => {});
  act(() =>
    result.current.setMaster({
      path: "master-test.wav",
      duration: 80,
    } as never),
  );
  await act(async () => {
    await result.current.seek(25);
  });
  expect(call).toHaveBeenCalledWith(
    "play_audio",
    expect.objectContaining({ offset: 25, path: "master-test.wav" }),
  );
  const recording = act(async () => {
    const promise = result.current.startRecording("master-test.wav");
    await vi.advanceTimersByTimeAsync(3100);
    await promise;
  });
  await recording;
  expect(result.current.recording).toBe(true);
  vi.mocked(call).mockClear();
  await act(async () => {
    await result.current.seek(50);
    await result.current.skipTrack(1);
  });
  expect(call).not.toHaveBeenCalled();
  await act(async () => result.current.stop());
});
