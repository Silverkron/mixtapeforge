// @vitest-environment jsdom
import { useState } from "react";
import { afterEach, describe, it, expect, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { blank } from "../backend";
import { StudioContext } from "../studio-context";
import { ArtworkView } from "../views/ArtworkView";
import type { Project } from "../types";
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
function Editor() {
  const [project, setProject] = useState(blank());
  const edit = (fn: (p: Project) => void) =>
    setProject((p) => {
      const next = structuredClone(p);
      fn(next);
      return next;
    });
  return (
    <StudioContext.Provider
      value={
        {
          project,
          page: "artwork",
          edit,
          locked: false,
          documentExport() {},
        } as never
      }
    >
      <ArtworkView />
    </StudioContext.Provider>
  );
}
describe("cover editing", () => {
  it("opens print options and keeps a separate print surface in sync with edits", async () => {
    const print = vi.spyOn(window, "print").mockImplementation(() => {});
    render(<Editor />);
    fireEvent.change(screen.getByLabelText("Titolo"), {
      target: { value: "La mia stampa" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Stampa J-card" }));
    await waitFor(() => expect(print).toHaveBeenCalledOnce());
    const sheet = document.body.querySelector(".artwork-print-sheet")!;
    expect(sheet.parentElement).toBe(document.body);
    expect(sheet.textContent).toContain("La mia stampa");
    expect(sheet.textContent).toContain("50 mm");
    expect(
      sheet.querySelector(".artwork-preview")?.getAttribute("viewBox"),
    ).toBe("0 0 104.8 101.6");
  });
  it("switches style, applies suggested palette and preserves custom colors in the preview", () => {
    render(<Editor />);
    fireEvent.click(screen.getByRole("button", { name: /Night drive/ }));
    expect(
      screen
        .getByRole("button", { name: /Night drive/ })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    expect((screen.getByLabelText("Fondo") as HTMLInputElement).value).toBe(
      "#160e2c",
    );
    fireEvent.change(screen.getByLabelText("Palette consigliata"), {
      target: { value: "1" },
    });
    expect((screen.getByLabelText("Fondo") as HTMLInputElement).value).toBe(
      "#20142d",
    );
    fireEvent.change(screen.getByLabelText("Fondo"), {
      target: { value: "#123456" },
    });
    expect(
      screen.getByRole("img").querySelector("rect")?.getAttribute("fill"),
    ).toBe("#123456");
    expect(
      screen.getByRole("option", { name: "Colori personalizzati" }),
    ).toBeTruthy();
  });
  it("offers low ink B/W styles and converts custom colors to printed gray", () => {
    render(<Editor />);
    fireEvent.click(screen.getByRole("button", { name: /Archivio B\/N/ }));
    expect(
      (screen.getByLabelText("Stampa in scala di grigi") as HTMLInputElement)
        .checked,
    ).toBe(true);
    fireEvent.change(screen.getByLabelText("Fondo"), {
      target: { value: "#ff0000" },
    });
    expect(
      screen.getByRole("img").querySelector("rect")?.getAttribute("fill"),
    ).toBe("#363636");
  });
});
it("selects a bundled title font and keeps the print surface in sync", () => {
  render(<Editor />);
  fireEvent.change(screen.getByLabelText("Font del titolo"), {
    target: { value: "poster" },
  });
  const title = screen.getByLabelText("Titolo") as HTMLInputElement;
  const rendered = Array.from(
    document.querySelectorAll(".artwork-preview text"),
  ).filter(
    (e) =>
      e.textContent === title.value &&
      !e.getAttribute("transform")?.includes("rotate(90"),
  );
  expect(rendered.length).toBeGreaterThanOrEqual(2);
  expect(
    rendered.every(
      (e) => e.getAttribute("font-family") === "Cassette Bebas Neue",
    ),
  ).toBe(true);
});
