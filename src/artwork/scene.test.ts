import { describe, expect, it } from "vitest";
import { blank } from "../backend";
import type { Project } from "../types";
import projectData from "./fixture-project.json";
import references from "./scene-reference.json";
import {
  artworkScene,
  artworkSettings,
  catalog,
  contrastRatio,
  printPalette,
  settingsForStyle,
} from "./scene";
const project = (): Project => ({
  ...blank(),
  ...projectData,
  capacity: [projectData.capacity[0], projectData.capacity[1]],
  sides: [projectData.sides[0], projectData.sides[1]],
  processing: { ...blank().processing, ...projectData.processing },
});
describe("artwork preview/export agreement", () => {
  it("uses larger type for the description and song titles", () => {
    const p = project();
    const scene = artworkScene(p);
    const description = scene.find(
      (n) => n.kind === "text" && n.text === p.subtitle,
    );
    expect(description).toMatchObject({ size: 3 });
    const songs = scene.filter(
      (n) => n.kind === "text" && /^\d{2}\. /.test(n.text),
    );
    expect(songs).toHaveLength(12);
    for (const song of songs) expect(song).toMatchObject({ size: 2.9 });
  });
  it("keeps 15 songs above the bottom decoration even when one side is empty", () => {
    for (const side of [0, 1]) {
      const p = project();
      p.tracks = Array.from({ length: 15 }, (_, i) => ({
        ...p.tracks[0],
        id: `song-${i}`,
      }));
      p.sides = [[], []];
      p.sides[side] = p.tracks.map((t) => t.id);
      for (const style of catalog.styles) {
        p.artwork = settingsForStyle(style.id);
        const body = artworkScene(p).filter(
          (n) => n.kind === "text" && n.x === 3 && n.y >= 28,
        );
        expect(body).toHaveLength(18);
        for (const node of body) {
          if (node.kind === "text")
            expect(node.y + node.size * 0.25).toBeLessThan(98);
        }
      }
    }
  });
  for (const reference of references)
    it(`${reference.style}: preview matches native export geometry and colors`, () => {
      const p = project();
      p.artwork = settingsForStyle(reference.style);
      expect(artworkScene(p)).toEqual(reference.scene);
    });
  it("preserves the label color in older projects", () => {
    const p = project();
    p.color = "#123456";
    expect(artworkSettings(p).accent).toBe("#123456");
  });
  it("applies grayscale to every palette role after custom colors", () => {
    const palette = printPalette({
      ...settingsForStyle("pop"),
      monochrome: true,
      accent: "#fa2178",
    });
    for (const color of Object.values(palette))
      expect(color.slice(1, 3)).toBe(color.slice(3, 5));
  });
  it("offers readable body text in every suggested palette", () => {
    for (const style of catalog.styles)
      for (const palette of style.palettes)
        expect(
          contrastRatio(palette.paper, palette.ink),
        ).toBeGreaterThanOrEqual(4.5);
  });
  it("keeps wide long titles within the front panel", () => {
    const p = project();
    p.title = "W".repeat(150);
    const title = artworkScene(p).filter(
      (n) => n.kind === "text" && n.x === 3 && n.size === 4.2,
    );
    expect(title.length).toBeLessThanOrEqual(2);
    expect(JSON.stringify(title)).toContain("...");
  });
});
