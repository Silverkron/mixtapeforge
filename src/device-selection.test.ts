import { describe, expect, it } from "vitest";
import { keepDeviceSelection } from "./device-selection";
const speakers = { index: 0, name: "Speakers", rate: 44100, channels: 2 };
const usb = { ...speakers, name: "USB" };

describe("device refresh selection", () => {
  it("preserves the selected output when a USB device changes indices", () => {
    expect(
      keepDeviceSelection([speakers], [usb, { ...speakers, index: 1 }], 0),
    ).toBe(1);
  });
  it("requires a new choice when the selected device disconnects", () => {
    expect(
      keepDeviceSelection([usb, { ...speakers, index: 1 }], [speakers], 0),
    ).toBe(-1);
    expect(keepDeviceSelection([speakers], [speakers], -1)).toBe(-1);
  });
  it("selects the system default on initial discovery even when listed later", () => {
    expect(
      keepDeviceSelection(
        [],
        [speakers, { ...usb, index: 2, is_default: true }],
        0,
      ),
    ).toBe(2);
  });
  it("selects the first available device on initial discovery", () => {
    expect(keepDeviceSelection([], [speakers], 0)).toBe(0);
  });
});
