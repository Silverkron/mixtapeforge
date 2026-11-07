import { useEffect, useRef, type ReactNode } from "react";
import { Ellipsis } from "lucide-react";
import { createPortal } from "react-dom";
import { t as translate } from "../i18n";

export type TrackMenuPosition = { x: number; y: number; opener: HTMLElement };

type TrackAction = {
  label: string;
  icon: ReactNode;
  disabled?: boolean;
  pressed?: boolean;
  destructive?: boolean;
  run: () => void;
};

export function TrackActions({
  title,
  actions,
  context,
  closeContext,
  openContext,
}: {
  title: string;
  actions: TrackAction[];
  context?: TrackMenuPosition;
  closeContext: () => void;
  openContext: (position: TrackMenuPosition) => void;
}) {
  const menu = useRef<HTMLDivElement>(null);
  const closeRef = useRef(closeContext);
  closeRef.current = closeContext;
  useEffect(() => {
    if (!context) return;
    menu.current?.querySelector<HTMLElement>("button:not(:disabled)")?.focus();
    const dismiss = (event: PointerEvent) => {
      if (!menu.current?.contains(event.target as Node)) closeRef.current();
    };
    window.addEventListener("pointerdown", dismiss, true);
    return () => window.removeEventListener("pointerdown", dismiss, true);
  }, [context]);
  const name = translate("Azioni per {0}", [title]);
  const renderActions = (menuMode = false) =>
    actions.map((action) => (
      <button
        type="button"
        className={`icon-button${action.destructive ? " track-remove" : ""}`}
        key={action.label}
        title={action.label}
        aria-label={`${action.label}: ${title}`}
        aria-pressed={action.pressed}
        disabled={action.disabled}
        onClick={() => {
          if (menuMode) {
            closeContext();
            context?.opener.focus();
          }
          action.run();
        }}
      >
        {action.icon}
        {menuMode && action.label}
      </button>
    ));
  return (
    <>
      <div className="track-action-strip" role="group" aria-label={name}>
        {renderActions()}
      </div>
      <button
        type="button"
        className="icon-button track-more"
        aria-label={name}
        aria-expanded={Boolean(context)}
        onClick={(event) => {
          const opener = event.currentTarget;
          const rect = opener.getBoundingClientRect();
          openContext({ x: rect.right, y: rect.bottom, opener });
        }}
      >
        <Ellipsis size={15} />
      </button>
      {context &&
        createPortal(
          <div
            className="track-context"
            role="group"
            aria-label={name}
            ref={menu}
            style={{
              left: Math.max(4, Math.min(context.x, window.innerWidth - 232)),
              top: Math.max(4, Math.min(context.y, window.innerHeight - 206)),
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.stopPropagation();
                closeContext();
                context.opener.focus();
              }
              if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key))
                return;
              const buttons = Array.from(
                event.currentTarget.querySelectorAll<HTMLButtonElement>(
                  "button:not(:disabled)",
                ),
              );
              const current = buttons.indexOf(
                document.activeElement as HTMLButtonElement,
              );
              const next =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? buttons.length - 1
                    : (current +
                        (event.key === "ArrowDown" ? 1 : -1) +
                        buttons.length) %
                      buttons.length;
              event.preventDefault();
              buttons[next]?.focus();
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget))
                closeContext();
            }}
          >
            {renderActions(true)}
          </div>,
          document.body,
        )}
    </>
  );
}
