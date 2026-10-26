import type { Project } from "./types";

// `slot` is the gap in the destination list before removal of the source.
export function relocateTrack(
  project: Project,
  id: string,
  side: number,
  slot: number,
): Project {
  const from = project.sides.findIndex((list) => list.includes(id));
  if (
    from < 0 ||
    (side !== 0 && side !== 1) ||
    !Number.isInteger(slot) ||
    slot < 0 ||
    slot > project.sides[side].length ||
    !project.tracks.some((t) => t.id === id && !t.locked)
  )
    return project;
  const index = project.sides[from].indexOf(id);
  const destination = slot - (from === side && index < slot ? 1 : 0);
  if (from === side && destination === index) return project;
  const sides: Project["sides"] = [
    [...project.sides[0]],
    [...project.sides[1]],
  ];
  sides[from].splice(index, 1);
  sides[side].splice(destination, 0, id);
  return { ...project, sides };
}
