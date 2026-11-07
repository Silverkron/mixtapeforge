// @vitest-environment jsdom
import { afterEach, expect, it, vi } from "vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { WorkspaceViewport } from "./WorkspaceViewport";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("reserves an inset only for an overflowing workspace with an overlay scrollbar", () => {
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
    scrollHeight: { configurable: true, value: 220 },
  });
  act(resize);
  expect(viewport.style.getPropertyValue("--overlay-scrollbar-inset")).toBe(
    "0px",
  );

  Object.defineProperty(viewport, "scrollHeight", { value: 700 });
  act(resize);
  expect(viewport.style.getPropertyValue("--overlay-scrollbar-inset")).toBe(
    "16px",
  );
  expect(screen.queryByRole("navigation")).toBeNull();

  Object.defineProperty(viewport, "clientWidth", { value: 785 });
  act(resize);
  expect(viewport.style.getPropertyValue("--overlay-scrollbar-inset")).toBe(
    "0px",
  );
});

it("restores the native scroll position independently for each workspace", () => {
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
  const { rerender } = render(
    <WorkspaceViewport page="compose">Brani</WorkspaceViewport>,
  );
  const viewport = screen.getByRole("main");
  fireEvent.scroll(viewport, { target: { scrollTop: 125 } });
  rerender(
    <WorkspaceViewport page="calibration">Calibrazione</WorkspaceViewport>,
  );
  expect(viewport.scrollTop).toBe(0);
  fireEvent.scroll(viewport, { target: { scrollTop: 40 } });
  rerender(<WorkspaceViewport page="compose">Brani</WorkspaceViewport>);
  expect(viewport.scrollTop).toBe(125);
});
