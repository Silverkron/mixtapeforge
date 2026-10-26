import type { Device } from "./types";

export function keepDeviceSelection(
  before: Device[],
  after: Device[],
  selected: number,
): number {
  const previous = before.find((d) => d.index === selected);
  if (previous) return after.find((d) => d.name === previous.name)?.index ?? -1;
  return selected < 0
    ? -1
    : (after.find((d) => d.is_default)?.index ?? after[0]?.index ?? -1);
}
