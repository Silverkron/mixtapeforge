// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, expect, it, vi } from "vitest";
import { HardwareParameter } from "./HardwareControls";

afterEach(cleanup);

it("edits a fader precisely, makes fine keyboard changes and resets the setting", () => {
  const commit = vi.fn();
  function Fader() {
    const [value, setValue] = useState(-3);
    return (
      <HardwareParameter
        label="Master"
        kind="fader"
        min={-27}
        max={0}
        step={0.5}
        unit="dB"
        defaultValue={-3}
        value={value}
        onChange={(next, history) => {
          commit(next, history);
          setValue(next);
        }}
      />
    );
  }
  render(<Fader />);
  const slider = screen.getByRole("slider", { name: "Master" });
  fireEvent.keyDown(slider, { key: "ArrowDown", shiftKey: true });
  expect(slider.getAttribute("aria-valuetext")).toBe("-3.5 dB");
  fireEvent.keyDown(slider, { key: "Enter" });
  const precise = screen.getByRole("spinbutton");
  fireEvent.change(precise, { target: { value: "-13.25" } });
  fireEvent.keyDown(precise, { key: "Enter" });
  expect(slider.getAttribute("aria-valuetext")).toBe("-13.25 dB");
  fireEvent.doubleClick(slider);
  expect(slider.getAttribute("aria-valuetext")).toBe("-3 dB");
  expect(commit.mock.calls).toEqual([
    [-3.5, true],
    [-13.25, true],
    [-3, true],
  ]);
});
