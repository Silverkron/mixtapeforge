import { describe, expect, it } from "vitest";
import { EQ_FREQUENCIES, EQ_PRESETS, eqResponse, presetFor } from "./equalizer";
describe("graphic equalizer response", () => {
  it("factory curves stay gentle across supported rates without rewriting old curves", () => {
    for (const preset of EQ_PRESETS) {
      expect(preset.gains).toHaveLength(10);
      expect(presetFor([...preset.gains])?.id).toBe(preset.id);
      for (const rate of [44100, 48000, 88200, 96000])
        for (let i = 0; i <= 400; i++) {
          const response = eqResponse(
            20 * 1000 ** (i / 400),
            preset.gains,
            rate,
          );
          expect(Number.isFinite(response)).toBe(true);
          expect(Math.abs(response)).toBeLessThan(4);
        }
    }
    const oldWarm = [0, 2, 2, 1, 0, 0, 0, -1, -1, -2];
    const saved = [...oldWarm];
    expect(presetFor(oldWarm)).toBeUndefined();
    expect(oldWarm).toEqual(saved);
    expect(presetFor([...EQ_PRESETS[0].gains, 0])).toBeUndefined();
  });
  it("flat stays flat at every supported sample rate", () => {
    for (const rate of [44100, 48000, 88200, 96000])
      for (const f of EQ_FREQUENCIES)
        expect(eqResponse(f, Array(10).fill(0), rate)).toBeCloseTo(0, 8);
  });
  it("center gain agrees with the filter and inverse gain cancels", () => {
    const boost = Array(10).fill(0);
    boost[5] = 6;
    const cut = boost.map((x) => -x);
    expect(eqResponse(1000, boost, 48000)).toBeCloseTo(6, 8);
    for (const f of EQ_FREQUENCIES)
      expect(
        eqResponse(f, boost, 48000) + eqResponse(f, cut, 48000),
      ).toBeCloseTo(0, 8);
    expect(presetFor(boost)).toBeUndefined();
  });
});
