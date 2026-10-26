// @vitest-environment jsdom
import { afterEach, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { calibrationPhase, CalibrationProgress } from "./CalibrationProgress";
afterEach(cleanup);
it("matches tone and level changes to the actual protocol boundaries", () => {
  expect(calibrationPhase(2.2).detail).toContain("Marcatore iniziale");
  expect(calibrationPhase(4).detail).toContain("315 Hz");
  expect(calibrationPhase(6).detail).toContain("31,5 Hz");
  expect(calibrationPhase(22.3).detail).toContain("16.000 Hz");
  expect(calibrationPhase(24).name).toBe("Fondo iniziale");
  expect(calibrationPhase(28).detail).toContain("-30 dBFS");
  expect(calibrationPhase(40).detail).toContain("-3 dBFS");
  expect(calibrationPhase(42).detail).toContain("solo sinistro");
  expect(calibrationPhase(44).detail).toContain("solo destro");
  expect(calibrationPhase(106.4).detail).toContain("Marcatore finale");
});
it("shows live progress, remaining time and the active phase", () => {
  render(<CalibrationProgress elapsed={30} status="playing" />);
  const progress = screen.getByRole("progressbar", {
    name: "Sequenza di calibrazione",
  }) as HTMLProgressElement;
  expect(progress.value).toBe(30);
  expect(screen.getByText("00:30 / 01:48")).toBeTruthy();
  expect(screen.getByText("01:18 rimanenti")).toBeTruthy();
  expect(screen.getByText(/315 Hz · -24 dBFS/)).toBeTruthy();
});
it("never presents an interrupted or failed sequence as complete", () => {
  const { rerender } = render(
    <CalibrationProgress elapsed={48.9} status="stopped" />,
  );
  expect(screen.getByText("Prova interrotta")).toBeTruthy();
  expect(screen.queryByText("Sequenza completa")).toBeNull();
  rerender(
    <CalibrationProgress
      elapsed={0}
      status="error"
      error="Uscita scollegata"
    />,
  );
  expect(screen.getByText("Uscita scollegata")).toBeTruthy();
  rerender(<CalibrationProgress elapsed={108.1} status="finished" />);
  expect(screen.getByText("01:48 / 01:48")).toBeTruthy();
  expect(screen.getByText(/Ferma REC sulla piastra/)).toBeTruthy();
});

it("shows a countdown without consuming any of the 108-second sequence", () => {
  render(<CalibrationProgress elapsed={0} status="countdown" countdown={2} />);
  expect(screen.getByText("2…")).toBeTruthy();
  expect(screen.getByText("01:48 rimanenti")).toBeTruthy();
  expect((screen.getByRole("progressbar") as HTMLProgressElement).value).toBe(
    0,
  );
});

it("follows all extended phases instead of ending at the legacy marker", () => {
  expect(calibrationPhase(47.2).detail).toContain("-12 dBFS");
  expect(calibrationPhase(64).name).toBe("Limiti per frequenza");
  expect(calibrationPhase(94).name).toBe("Stabilità");
  expect(calibrationPhase(102).name).toBe("Fondo finale");
  expect(calibrationPhase(106.4).detail).toContain("Marcatore finale");
});
