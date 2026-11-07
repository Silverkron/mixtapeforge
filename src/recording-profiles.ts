import type { CalibrationReport, RecordingProfile } from "./types";
import {
  MIN_RECORDING_LEVEL_DB,
  recordingLevelFromReport,
} from "./calibration-advice";

export const recordingLevelFromProfile = (profile: RecordingProfile) =>
  profile.recording_level_db ?? recordingLevelFromReport(profile.report);
export function proposeRecordingCorrection(report: CalibrationReport) {
  const eq = report.bands.map((b, i) => {
    const margin = Math.min(
      ...b.rms_dbfs.map((v, c) => v - report.noise_dbfs[c]),
    );
    if (i === 9 || margin < 6) return 0;
    if (report.extended) {
      const ext = report.extended;
      if (
        !ext.quality[i].reliable ||
        ext.level_change_db[i].some((v) => Math.abs(v) > 1)
      )
        return 0;
      const maxBoost =
        i === 0 ? 0 : Math.max(0, Math.min(1.5, ((margin - 12) / 6) * 1.5));
      return (
        Math.round(
          Math.max(
            -1.5,
            Math.min(maxBoost, -(b.response_db[0] + b.response_db[1]) / 4),
          ) * 4,
        ) / 4
      );
    }
    const maxBoost = Math.max(0, Math.min(3, ((margin - 6) / 6) * 3));
    return (
      Math.round(
        Math.max(
          -3,
          Math.min(maxBoost, -(b.response_db[0] + b.response_db[1]) / 2),
        ) * 2,
      ) / 2
    );
  });
  const difference = report.reference_dbfs[1] - report.reference_dbfs[0];
  const ext = report.extended;
  const trim = ext
    ? ext.quality.filter((q) => q.reliable).length < 6 ||
      ext.balance_spread_db > 0.75 ||
      Math.abs(difference) < 0.5 ||
      ext.reference_repeat_delta_db.some((v) => Math.abs(v) > 0.5)
      ? 0
      : Math.round(Math.min(1.5, Math.abs(difference)) * 10) / 10
    : Math.round(Math.min(3, Math.abs(difference)) * 10) / 10;
  const balance = difference < 0 ? [-trim, 0] : [0, -trim];
  return { eq, balance };
}

export function isRecordingProfile(
  value: unknown,
): value is import("./types").RecordingProfile {
  if (!value || typeof value !== "object") return false;
  const p = value as import("./types").RecordingProfile;
  return (
    [1, 2].includes(p.version) &&
    typeof p.id === "string" &&
    typeof p.enabled === "boolean" &&
    !!p.conditions &&
    [44100, 48000, 88200, 96000].includes(p.conditions.sample_rate) &&
    ["name", "deck", "tape", "output", "input", "notes"].every(
      (k) => typeof p.conditions[k as keyof typeof p.conditions] === "string",
    ) &&
    Array.isArray(p.eq_bands) &&
    p.eq_bands.length === 10 &&
    p.eq_bands.every((v) => Number.isFinite(v) && Math.abs(v) <= 3) &&
    Array.isArray(p.channel_gain_db) &&
    p.channel_gain_db.length === 2 &&
    p.channel_gain_db.every((v) => Number.isFinite(v) && v >= -3 && v <= 0) &&
    !!p.report &&
    (p.report.source_gain_db === undefined ||
      Number.isFinite(p.report.source_gain_db)) &&
    recordingLevelFromReport(p.report) >= MIN_RECORDING_LEVEL_DB &&
    recordingLevelFromReport(p.report) <= 0 &&
    (p.recording_level_db === undefined ||
      (Number.isFinite(p.recording_level_db) &&
        p.recording_level_db >= MIN_RECORDING_LEVEL_DB &&
        p.recording_level_db <= 0)) &&
    Number.isFinite(p.report.sample_rate) &&
    p.report.sample_rate >= 32000 &&
    p.report.sample_rate <= 192000
  );
}
