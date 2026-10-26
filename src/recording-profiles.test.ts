import { expect, it } from "vitest";
import {
  assertProfileOutput,
  proposeRecordingCorrection,
} from "./recording-profiles";
import type { CalibrationReport, RecordingProfile } from "./types";
it("does not boost noisy bands or 16 kHz and attenuates only the louder channel", () => {
  const report = {
    reference_dbfs: [-20, -20.5],
    noise_dbfs: [-55, -55],
    bands: Array.from({ length: 10 }, (_, i) => ({
      frequency: i,
      rms_dbfs: i === 7 ? [-52, -52] : [-30, -30],
      response_db: [-8, -8],
    })),
  } as CalibrationReport;
  const p = proposeRecordingCorrection(report);
  expect(p.eq).toEqual([3, 3, 3, 3, 3, 3, 3, 0, 3, 0]);
  expect(p.balance).toEqual([-0.5, 0]);
});
it("checks output for profiled masters on both desktop path formats while leaving probes dry", () => {
  const p = {
    enabled: true,
    conditions: { name: "Tape", output: "Interface" },
  } as RecordingProfile;
  for (const path of [
    "/cache/master-123.wav",
    "C:\\cache\\master-123.wav",
    "/cache/passage-123.wav",
  ]) {
    expect(() => assertProfileOutput(p, "Speakers", path)).toThrow("Interface");
    expect(() => assertProfileOutput(p, "Interface", path)).not.toThrow();
  }
  expect(() =>
    assertProfileOutput(p, "Speakers", "/cache/calibration-123.wav"),
  ).not.toThrow();
  expect(() =>
    assertProfileOutput(p, "Speakers", "/cache/passage-123.wav", false),
  ).not.toThrow();
  expect(() =>
    assertProfileOutput(
      { ...p, enabled: false },
      "Speakers",
      "/cache/master-123.wav",
    ),
  ).not.toThrow();
});

it("uses conservative v2 correction and refuses uncertain stereo trim", () => {
  const report = {
    reference_dbfs: [-18, -19],
    noise_dbfs: [-60, -60],
    bands: Array.from({ length: 10 }, () => ({
      frequency: 1000,
      rms_dbfs: [-24, -24],
      response_db: [-2, -2],
    })),
    extended: {
      quality: Array.from({ length: 10 }, () => ({ reliable: true })),
      level_change_db: Array.from({ length: 10 }, () => [0, 0]),
      balance_spread_db: 0.2,
      reference_repeat_delta_db: [0, 0],
    },
  } as unknown as CalibrationReport;
  const ext = report.extended!;
  ext.quality[7].reliable = false;
  ext.level_change_db[8] = [1.2, 0];
  expect(proposeRecordingCorrection(report)).toEqual({
    eq: [0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    balance: [-1, 0],
  });
  ext.balance_spread_db = 1;
  expect(proposeRecordingCorrection(report).balance.every((v) => v === 0)).toBe(
    true,
  );
  ext.balance_spread_db = 0;
  ext.quality.forEach((q, i) => (q.reliable = i < 5));
  expect(proposeRecordingCorrection(report).balance.every((v) => v === 0)).toBe(
    true,
  );
});

it("allows any output when the optional output association is empty", () => {
  const p = {
    enabled: true,
    conditions: { name: "Tape", output: "" },
  } as RecordingProfile;
  expect(() =>
    assertProfileOutput(p, "Speakers", "/cache/master-123.wav"),
  ).not.toThrow();
});
