import { describe, it, expect } from "vitest";
import { blank } from "./backend";
import type { Track } from "./types";
import { relocateTrack } from "./track-order";

function fixture() {
  return {
    ...blank(),
    tracks: ["a", "b", "c", "d"].map((id) => ({ id, locked: false }) as Track),
    sides: [["a", "b", "c"], ["d"]] as [string[], string[]],
  };
}
describe("playlist relocation", () => {
  it("moves between sides at the exact slot without duplicating or mutating", () => {
    const p = fixture();
    const next = relocateTrack(p, "b", 1, 0);
    expect(next.sides).toEqual([
      ["a", "c"],
      ["b", "d"],
    ]);
    expect(p.sides).toEqual([["a", "b", "c"], ["d"]]);
    expect(new Set(next.sides.flat()).size).toBe(4);
  });
  it("handles upward, downward, end and unchanged positions", () => {
    const p = fixture();
    expect(relocateTrack(p, "a", 0, 3).sides[0]).toEqual(["b", "c", "a"]);
    expect(relocateTrack(p, "c", 0, 0).sides[0]).toEqual(["c", "a", "b"]);
    expect(relocateTrack(p, "b", 0, 1)).toBe(p);
    expect(relocateTrack(p, "b", 0, 2)).toBe(p);
  });
  it("accepts an empty side and rejects pinned/unknown tracks or invalid destinations", () => {
    const p = fixture();
    p.sides = [["a", "b", "c", "d"], []];
    expect(relocateTrack(p, "b", 1, 0).sides[1]).toEqual(["b"]);
    p.tracks[1].locked = true;
    expect(relocateTrack(p, "b", 1, 0)).toBe(p);
    expect(relocateTrack(p, "missing", 1, 0)).toBe(p);
    expect(relocateTrack(p, "a", 2, 0)).toBe(p);
    expect(relocateTrack(p, "a", 1, 1)).toBe(p);
  });
});
