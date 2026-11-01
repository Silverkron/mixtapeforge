import type { CalibrationReport } from "./types";

export type CalibrationLevelAdvice =
  | {
      kind: "record";
      reductionDb: number;
      targetPeakDbfs: number;
    }
  | {
      kind: "capture";
      reductionDb: number;
    };

const halfDb = (value: number) => Math.ceil(value * 2) / 2;

export function calibrationLevelAdvice(
  report: CalibrationReport,
  sourceTrimDb = 0,
): CalibrationLevelAdvice | null {
  const extended = report.extended;
  if (extended) {
    const overloaded = extended.level_tests.some(
      (point) =>
        point.input_dbfs >= -12 &&
        (point.compression_db.some((value) => value > 1) ||
          point.distortion_percent?.some((value) => value > 3)),
    );
    const limits = extended.drive_limits.map(
      (limit) => limit.max_input_peak_dbfs,
    );
    if (overloaded && limits.length) {
      const targetPeakDbfs = Math.min(...limits);
      const currentPeakDbfs = -3 + sourceTrimDb;
      const reductionDb = halfDb(Math.max(0, currentPeakDbfs - targetPeakDbfs));
      if (reductionDb > 0)
        return { kind: "record", reductionDb, targetPeakDbfs };
    }
  } else {
    let lastSafe: number | null = null;
    for (const level of report.levels) {
      const overloaded =
        level.input_dbfs >= -12 &&
        (level.compression_db.some((value) => value > 1) ||
          level.hd3_percent.some((value) => value > 3));
      if (overloaded && lastSafe != null) {
        const reductionDb = halfDb(
          Math.min(24, level.input_dbfs - lastSafe + 1.5),
        );
        return {
          kind: "record",
          reductionDb,
          targetPeakDbfs: -3 - reductionDb,
        };
      }
      if (!overloaded) lastSafe = level.input_dbfs;
    }
  }

  const tolerance = report.sample_rate / 1000;
  if (report.clipped_samples.some((samples) => samples > tolerance))
    return { kind: "capture", reductionDb: 3 };

  return null;
}
