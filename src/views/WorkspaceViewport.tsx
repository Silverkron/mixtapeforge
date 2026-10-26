import { useLayoutEffect, useRef, type ReactNode } from "react";

// Native scrollbars either reserve width or overlay the content (macOS Auto).
// Protect the last controls only when the browser has not reserved that space.
export function WorkspaceViewport({ children }: { children: ReactNode }) {
  const viewport = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const view = viewport.current;
    const body = content.current;
    if (!view || !body) return;
    const update = () => {
      const gutter = view.offsetWidth - view.clientWidth;
      view.style.setProperty(
        "--overlay-scrollbar-inset",
        gutter <= 1 ? "16px" : "0px",
      );
    };
    const observer = new ResizeObserver(update);
    observer.observe(view);
    observer.observe(body);
    update();
    return () => observer.disconnect();
  }, []);
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="compact-main workspace-viewport"
      ref={viewport}
    >
      <div className="workspace-content" ref={content}>
        {children}
      </div>
    </main>
  );
}
