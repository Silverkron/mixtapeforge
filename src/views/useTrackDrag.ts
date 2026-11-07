import { useEffect, useRef, useState, type PointerEvent } from "react";

type Target = { side: number; slot: number };
// Pointer capture avoids WebView/native HTML drag interception and text dragging.
export function useTrackDrag(
  disabled: boolean,
  drop: (id: string, target: Target) => void,
) {
  const [dragging, setDragging] = useState<string | null>(null);
  const [target, setTarget] = useState<Target | null>(null);
  const session = useRef<{
    id: string;
    x: number;
    y: number;
    active: boolean;
  } | null>(null);
  const targetRef = useRef<Target | null>(null);
  const suppressClick = useRef(false);
  const reset = () => {
    session.current = null;
    targetRef.current = null;
    setDragging(null);
    setTarget(null);
  };
  useEffect(() => {
    const cancel = (e: KeyboardEvent) => {
      if (e.key === "Escape") reset();
    };
    window.addEventListener("keydown", cancel);
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("keydown", cancel);
      window.removeEventListener("blur", reset);
    };
  }, []);
  useEffect(() => {
    if (disabled) reset();
  }, [disabled]);
  return {
    dragging,
    target,
    suppressClick,
    start(e: PointerEvent<HTMLElement>, id: string, pinned: boolean) {
      suppressClick.current = false;
      if (disabled || pinned || e.button !== 0) return;
      session.current = { id, x: e.clientX, y: e.clientY, active: false };
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    move(e: PointerEvent<HTMLElement>) {
      const s = session.current;
      if (!s || disabled) return;
      if (!s.active && Math.hypot(e.clientX - s.x, e.clientY - s.y) < 6) return;
      s.active = true;
      suppressClick.current = true;
      setDragging(s.id);
      const viewport = e.currentTarget.closest<HTMLElement>(
        ".workspace-viewport",
      );
      if (viewport && viewport.scrollHeight > viewport.clientHeight) {
        const bounds = viewport.getBoundingClientRect();
        if (
          e.clientX >= bounds.left &&
          e.clientX < bounds.right &&
          e.clientY >= bounds.top &&
          e.clientY < bounds.bottom
        ) {
          const delta =
            e.clientY < bounds.top + 60
              ? -18
              : e.clientY > bounds.bottom - 60
                ? 18
                : 0;
          if (delta) viewport.scrollBy(0, delta);
        }
      }
      const hit = document.elementFromPoint(e.clientX, e.clientY);
      const panel = hit?.closest<HTMLElement>("[data-track-side]");
      let next: Target | null = null;
      if (panel) {
        const rows = [
          ...panel.querySelectorAll<HTMLElement>("[data-track-id]"),
        ];
        const before = rows.findIndex((row) => {
          const r = row.getBoundingClientRect();
          return e.clientY < r.top + r.height / 2;
        });
        next = {
          side: Number(panel.dataset.trackSide),
          slot: before < 0 ? rows.length : before,
        };
      }
      targetRef.current = next;
      setTarget(next);
    },
    end(e: PointerEvent<HTMLElement>) {
      const s = session.current,
        destination = targetRef.current;
      if (s?.active && destination && !disabled) drop(s.id, destination);
      reset();
      if (e.currentTarget.hasPointerCapture(e.pointerId))
        e.currentTarget.releasePointerCapture(e.pointerId);
    },
    cancel: reset,
  };
}
