import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { t as translate } from "../i18n";

const minWidth = 420;
const maxWidth = 840;
const defaultWidth = 560;
const widthKey = "cassette-inspector-width";

export function DesktopWorkbench({
  navigation,
  inspector,
  children,
}: {
  navigation: ReactNode;
  inspector: ReactNode;
  children: ReactNode;
}) {
  const [width, setWidth] = useState(() => {
    try {
      const saved = Number(localStorage.getItem(widthKey));
      if (saved >= minWidth && saved <= maxWidth) return saved;
    } catch {
      // The splitter works for the session when storage is unavailable.
    }
    return defaultWidth;
  });
  const grid = useRef<HTMLDivElement>(null);
  const [availableWidth, setAvailableWidth] = useState(maxWidth);
  const hasInspector = Boolean(inspector);
  const visibleWidth = Math.min(width, availableWidth);
  const clamp = (value: number) =>
    Math.max(minWidth, Math.min(availableWidth, value));
  const split = useRef<{ x: number; width: number } | null>(null);
  useEffect(() => {
    const element = grid.current;
    if (!element) return;
    const update = () => {
      if (element.clientWidth)
        setAvailableWidth(
          Math.max(
            minWidth,
            Math.min(maxWidth, Math.floor(element.clientWidth * 0.53)),
          ),
        );
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!hasInspector) return;
    const opener = document.activeElement as HTMLElement | null;
    grid.current
      ?.querySelector<HTMLElement>("#panel-title")
      ?.focus({ preventScroll: true });
    return () => {
      if (opener?.isConnected && document.activeElement === document.body)
        opener.focus({ preventScroll: true });
    };
  }, [hasInspector]);
  const save = (next: number) => {
    try {
      localStorage.setItem(widthKey, String(next));
    } catch {
      // The in-memory width remains available.
    }
  };
  return (
    <div
      ref={grid}
      className={`desktop-workbench${inspector ? " with-inspector" : ""}`}
      style={{ "--inspector-width": `${visibleWidth}px` } as CSSProperties}
    >
      {navigation}
      {children}
      {inspector && (
        <>
          <div
            className="inspector-splitter"
            role="separator"
            aria-label={translate("Larghezza inspector")}
            aria-orientation="vertical"
            aria-controls="studio-inspector"
            aria-valuemin={minWidth}
            aria-valuemax={availableWidth}
            aria-valuenow={visibleWidth}
            tabIndex={0}
            onPointerDown={(event) => {
              if (event.button !== 0) return;
              const pane = grid.current?.querySelector("#studio-inspector");
              split.current = {
                x: event.clientX,
                width: pane?.getBoundingClientRect().width ?? width,
              };
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              if (split.current)
                setWidth(
                  clamp(split.current.width + split.current.x - event.clientX),
                );
            }}
            onLostPointerCapture={() => {
              if (split.current) save(width);
              split.current = null;
            }}
            onKeyDown={(event) => {
              const next = {
                ArrowLeft: visibleWidth + 24,
                ArrowRight: visibleWidth - 24,
                Home: minWidth,
                End: availableWidth,
              }[event.key];
              if (next === undefined) return;
              event.preventDefault();
              setWidth(clamp(next));
              save(clamp(next));
            }}
          />
          {inspector}
        </>
      )}
    </div>
  );
}
