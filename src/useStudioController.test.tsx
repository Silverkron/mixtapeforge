// @vitest-environment jsdom
import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { useStudioController } from "./useStudioController";
afterEach(cleanup);
it("undo restores the project before the edit, including a calibration report", async () => {
  const { result } = renderHook(() => useStudioController());
  await act(async () => {});
  const title = result.current.project.title;
  act(() =>
    result.current.edit((p) => {
      p.title = "Misura di prova";
      p.calibration_report = { source: "test.wav" } as never;
    }),
  );
  expect(result.current.project.calibration_report?.source).toBe("test.wav");
  act(() => result.current.history());
  expect(result.current.project.title).toBe(title);
  expect(result.current.project.calibration_report).toBeUndefined();
  act(() => result.current.history(true));
  expect(result.current.project.calibration_report?.source).toBe("test.wav");
});
it("persists a profile independently of undo and restores it in a new session", async () => {
  localStorage.removeItem("cassette-recording-profiles");
  const profile = {
    version: 1,
    id: "saved-profile",
    enabled: true,
    conditions: {
      sample_rate: 44100,
      name: "Deck + Type I",
      deck: "Deck",
      tape: "Type I",
      output: "Output",
      input: "Input",
      notes: "REC LEVEL 4",
    },
    eq_bands: Array(10).fill(0),
    channel_gain_db: [-0.5, 0],
    report: { sample_rate: 44100 },
  } as import("./types").RecordingProfile;
  const { result, unmount } = renderHook(() => useStudioController());
  await act(async () => {});
  act(() =>
    result.current.edit((p) => {
      p.processing.eq_enabled = true;
      p.processing.eq_bands[7] = 2;
    }),
  );
  act(() => result.current.saveRecordingProfile(profile, false));
  expect(result.current.project.recording_profile?.id).toBe(profile.id);
  expect(result.current.project.processing.eq_enabled).toBe(true);
  expect(result.current.project.processing.eq_bands[7]).toBe(2);
  expect(result.current.project.processing.sample_rate).toBe(44100);
  act(() => result.current.history());
  expect(result.current.project.recording_profile).toBeUndefined();
  expect(result.current.recordingProfiles[0].id).toBe(profile.id);
  act(() => result.current.saveRecordingProfile(profile, true));
  expect(result.current.project.processing.eq_enabled).toBe(false);
  act(() => result.current.history());
  expect(result.current.project.processing.eq_enabled).toBe(true);
  expect(result.current.project.recording_profile).toBeUndefined();
  unmount();
  const next = renderHook(() => useStudioController());
  await act(async () => {});
  expect(next.result.current.recordingProfiles[0].conditions.notes).toBe(
    "REC LEVEL 4",
  );
  expect(next.result.current.project.recording_profile).toBeUndefined();
  next.unmount();
  localStorage.removeItem("cassette-recording-profiles");
});
