import { t as translate } from "../i18n";
import type { ReactNode } from "react";

export function TrackActions({
  title,
  actions,
}: {
  title: string;
  actions: {
    label: string;
    icon: ReactNode;
    disabled?: boolean;
    pressed?: boolean;
    destructive?: boolean;
    run: () => void;
  }[];
}) {
  return (
    <div
      className="track-action-strip"
      role="group"
      aria-label={translate("Azioni per {0}", [title])}
    >
      {actions.map((action, index) => (
        <button
          type="button"
          className={`icon-button${action.destructive ? " track-remove" : ""}`}
          key={index}
          title={action.label}
          aria-label={`${action.label}: ${title}`}
          aria-pressed={action.pressed}
          disabled={action.disabled}
          onClick={action.run}
        >
          {action.icon}
        </button>
      ))}
    </div>
  );
}
