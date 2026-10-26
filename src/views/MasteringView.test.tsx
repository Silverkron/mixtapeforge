// @vitest-environment jsdom
import { useState } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { blank } from "../backend";
import { StudioContext } from "../studio-context";
import { MasteringView } from "./MasteringView";
import type { Project } from "../types";

afterEach(cleanup);
function Editor({
  reference = blank().processing.nr_reference,
}: {
  reference?: number;
}) {
  const [project, setProject] = useState(() => {
    const p = blank();
    p.processing.nr = "type_b";
    p.processing.nr_reference = reference;
    return p;
  });
  return (
    <StudioContext.Provider
      value={
        {
          project,
          panel: "master",
          locked: false,
          busy: false,
          track: null,
          gain: 0,
          updateProcessing: (changes: Partial<Project["processing"]>) =>
            setProject((p) => ({
              ...p,
              processing: { ...p.processing, ...changes },
            })),
        } as never
      }
    >
      <MasteringView />
    </StudioContext.Provider>
  );
}
describe("NR reference controls", () => {
  it("keeps primary controls together and preserves NR settings when editing EQ", () => {
    render(<Editor reference={-12} />);
    expect(screen.getByLabelText("Normalizzazione")).toBeTruthy();
    expect(screen.getByLabelText("Dinamica")).toBeTruthy();
    expect(screen.getAllByRole("slider")).toHaveLength(10);
    fireEvent.change(screen.getByLabelText("EQ 1000 Hz"), {
      target: { value: "2" },
    });
    expect(
      (
        screen.getByLabelText(
          /Livello digitale di riferimento NR/,
        ) as HTMLInputElement
      ).value,
    ).toBe("-12");
    expect(screen.getAllByRole("slider")).toHaveLength(10);
    expect(
      (
        screen.getByLabelText(
          /Livello digitale di riferimento NR/,
        ) as HTMLInputElement
      ).value,
    ).toBe("-12");
  });

  it("uses zero for a new project and exposes an input that accepts it", () => {
    render(<Editor />);
    const input = screen.getByLabelText(
      /Livello digitale di riferimento NR/,
    ) as HTMLInputElement;
    expect(input.value).toBe("0");
    expect(input.max).toBe("0");
  });
  it("preserves a saved reference until the user restores zero", () => {
    const { container } = render(<Editor reference={-18} />);
    const input = screen.getByLabelText(
      /Livello digitale di riferimento NR/,
    ) as HTMLInputElement;
    expect(input.value).toBe("-18");
    fireEvent.click(screen.getByRole("button", { name: "Ripristina 0 dBFS" }));
    expect(input.value).toBe("0");
    expect(container.textContent).toContain("Nessuna attenuazione NR fissa");
  });
});
