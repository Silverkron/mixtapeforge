import { it, expect } from "vitest";
import { blank } from "./backend";
import { sideTimeline, trackAt } from "./player-timeline";
import type { Track } from "./types";
it("uses trimmed lengths, leader, gaps and bounded crossfades for track navigation", () => {
  const p = blank();
  p.leader = 3;
  p.tracks = [
    { id: "a", duration: 20, trim_start: 2, trim_end: 3, gap: 2 },
    { id: "b", duration: 10, trim_start: 0, trim_end: 0, gap: 0 },
  ] as Track[];
  p.sides = [["a", "b"], []];
  expect(sideTimeline(p, 0).map((t) => [t.start, t.end])).toEqual([
    [3, 18],
    [20, 30],
  ]);
  expect(trackAt(p, 0, 19)?.track.id).toBe("a");
  expect(trackAt(p, 0, 22)?.track.id).toBe("b");
  p.processing.crossfade = 20;
  expect(sideTimeline(p, 0).map((t) => t.start)).toEqual([3, 13]);
  expect(sideTimeline(p, 1)).toEqual([]);
});
