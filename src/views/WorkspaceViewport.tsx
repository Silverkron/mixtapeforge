import { useLayoutEffect, useRef, type ReactNode } from "react";

export function WorkspaceViewport({
  children,
  page = "compose",
}: {
  children: ReactNode;
  page?: string;
}) {
  const viewport = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const positions = useRef<Record<string, number>>({});
  useLayoutEffect(() => {
    if (viewport.current)
      viewport.current.scrollTop = positions.current[page] ?? 0;
  }, [page]);
  useLayoutEffect(() => {
    const view = viewport.current;
    const body = content.current;
    if (!view || !body) return;
    const update = () => {
      // An overlay scrollbar needs an inset only when the workspace overflows.
      const overlay = view.offsetWidth - view.clientWidth <= 1;
      view.style.setProperty(
        "--overlay-scrollbar-inset",
        overlay && view.scrollHeight > view.clientHeight + 1 ? "16px" : "0px",
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
      onScroll={(event) => {
        positions.current[page] = event.currentTarget.scrollTop;
      }}
    >
      <div className="workspace-content" ref={content}>
        {children}
      </div>
    </main>
  );
}
