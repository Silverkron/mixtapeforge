import { describe, expect, it } from "vitest";
import { calibrationLevelAdvice } from "./calibration-advice";
import type { CalibrationReport } from "./types";

const base = {
  sample_rate: 48000,
  clipped_samples: [0, 0],
  levels: [],
} as unknown as CalibrationReport;

describe("calibration level advice", () => {
  it("recommends enough recording headroom for an overloaded high-frequency tone", () => {
    const report = {
      ...base,
      extended: {
        level_tests: [
          {
            input_dbfs: -6,
            compression_db: [2, 1.2],
            distortion_percent: null,
          },
        ],
        drive_limits: [
          { frequency: 315, max_input_peak_dbfs: -4.5 },
          { frequency: 8000, max_input_peak_dbfs: -7.5 },
        ],
      },
    } as unknown as CalibrationReport;
    expect(calibrationLevelAdvice(report)).toEqual({
      kind: "record",
      reductionDb: 4.5,
      targetPeakDbfs: -7.5,
    });
  });

  it("accounts for attenuation already applied to the source", () => {
    const report = {
      ...base,
      extended: {
        level_tests: [
          {
            input_dbfs: -3,
            compression_db: [0, 1.5],
            distortion_percent: null,
          },
        ],
        drive_limits: [{ frequency: 8000, max_input_peak_dbfs: -7.5 }],
      },
    } as unknown as CalibrationReport;
    expect(calibrationLevelAdvice(report, -6)).toBeNull();
  });

  it("distinguishes capture clipping from tape overload", () => {
    expect(
      calibrationLevelAdvice({ ...base, clipped_samples: [100, 80] }),
    ).toEqual({ kind: "capture", reductionDb: 3 });
  });

  it("derives a reduction from the legacy level sweep", () => {
    const report = {
      ...base,
      levels: [
        {
          input_dbfs: -6,
          compression_db: [0, 0],
          hd3_percent: [0.2, 0.2],
        },
        {
          input_dbfs: -3,
          compression_db: [1.5, 0.5],
          hd3_percent: [1, 1],
        },
      ],
    } as unknown as CalibrationReport;
    expect(calibrationLevelAdvice(report)).toEqual({
      kind: "record",
      reductionDb: 4.5,
      targetPeakDbfs: -7.5,
    });
  });
});
