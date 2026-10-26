import { length, type Project } from "./types";
export function sideTimeline(project: Project, side: number) {
  let at = project.leader;
  return project.sides[side].flatMap((id, i, ids) => {
    const track = project.tracks.find((t) => t.id === id);
    if (!track) return [];
    const start = at,
      end = start + length(track);
    const next = project.tracks.find((t) => t.id === ids[i + 1]);
    at =
      end +
      (next
        ? project.processing.crossfade > 0
          ? -Math.min(
              project.processing.crossfade,
              length(track) / 2,
              length(next) / 2,
            )
          : track.gap
        : 0);
    return [{ track, start, end }];
  });
}
export function trackAt(project: Project, side: number, position: number) {
  return sideTimeline(project, side)
    .reverse()
    .find((t) => t.start <= position);
}
