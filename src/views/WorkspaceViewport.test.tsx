// @vitest-environment jsdom
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { WorkspaceViewport } from "./WorkspaceViewport";
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
it("keeps the same overlay-scrollbar inset when content starts overflowing", () => {
  let resize!: () => void;
  vi.stubGlobal(
    "ResizeObserver",
    class {
      constructor(callback: () => void) {
        resize = callback;
      }
      observe() {}
      disconnect() {}
    },
  );
  render(
    <WorkspaceViewport>
      <p>Contenuto</p>
    </WorkspaceViewport>,
  );
  const viewport = screen.getByRole("main");
  Object.defineProperties(viewport, {
    offsetWidth: { configurable: true, value: 800 },
    clientWidth: { configurable: true, value: 800 },
    clientHeight: { configurable: true, value: 400 },
    scrollHeight: { configurable: true, value: 200 },
  });
  resize();
  expect(viewport.style.getPropertyValue("--overlay-scrollbar-inset")).toBe(
    "16px",
  );
  Object.defineProperty(viewport, "scrollHeight", { value: 700 });
  resize();
  expect(viewport.style.getPropertyValue("--overlay-scrollbar-inset")).toBe(
    "16px",
  );
  // A classic scrollbar already reserves its width: don't add a second gutter.
  Object.defineProperty(viewport, "clientWidth", { value: 785 });
  resize();
  expect(viewport.style.getPropertyValue("--overlay-scrollbar-inset")).toBe(
    "0px",
  );
});
