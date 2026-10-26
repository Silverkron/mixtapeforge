import { describe, it, expect } from "vitest";
import { blank, demo, previewInfo } from "./backend";
import { time } from "./types";
describe("read models in visual preview", () => {
  it("does not charge leaders to an empty side", () =>
    expect(previewInfo(blank()).durations).toEqual([0, 0]));
  it("counts clip durations and gaps exactly once", () =>
    expect(previewInfo(demo()).durations).toEqual([24, 27]));
  it("replaces the gap with overlap", () => {
    const p = demo();
    p.processing.crossfade = 2;
    expect(previewInfo(p).durations).toEqual([21, 24]);
  });
  it("previews normalization off, LUFS and album gains consistently", () => {
    const p = demo();
    p.processing.normalize = "off";
    p.tracks[0].gain = 2;
    expect(previewInfo(p).gains[0][1]).toBe(2);
    p.tracks[0].gain = 0;
    p.processing.normalize = "lufs";
    p.processing.target_lufs = -18;
    expect(previewInfo(p).gains[0][1]).toBe(0);
    p.processing.normalize = "album";
    expect(new Set(previewInfo(p).gains.map((g) => g[1])).size).toBe(1);
  });
  it("counts VST tails only on occupied sides and excludes bypass", () => {
    const p = demo();
    p.processing.vst = {
      enabled: true,
      path: "test.vst3",
      uid: "test",
      name: "Delay",
      parameters: [0.5],
      tail_seconds: 2,
    };
    expect(previewInfo(p).durations).toEqual([26, 29]);
    p.processing.vst.enabled = false;
    expect(previewInfo(p).durations).toEqual([24, 27]);
    const empty = blank();
    empty.processing.vst = { ...p.processing.vst, enabled: true };
    expect(previewInfo(empty).durations).toEqual([0, 0]);
  });
  it("formats minute carry and negative capacity", () => {
    expect(time(59.9)).toBe("01:00");
    expect(time(-77)).toBe("−01:17");
  });
});
