export const scenes = [
  "gift",
  "workstation",
  "portable",
  "covers",
  "recording",
  "calibration",
  "noise-reduction",
] as const;
export type Scene = (typeof scenes)[number];
