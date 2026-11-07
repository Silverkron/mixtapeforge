import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { t as translate } from "../i18n";

interface ParameterProps {
  label: string;
  shortLabel?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  defaultValue: number;
  kind?: "knob" | "fader";
  disabled?: boolean;
  onChange: (value: number, history: boolean) => void;
}

export function HardwareParameter({
  label,
  shortLabel = label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  defaultValue,
  kind = "knob",
  disabled,
  onChange,
}: ParameterProps) {
  const slider = useRef<HTMLInputElement>(null);
  const live = useRef(value);
  live.current = value;
  const drag = useRef<{
    id: number;
    y: number;
    raw: number;
    changed: boolean;
  } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);
  const [wheeling, setWheeling] = useState(false);
  const wheelChanged = useRef(false);
  const wheelTimer = useRef<number | undefined>(undefined);
  const span = max - min;
  const fraction = span > 0 ? (value - min) / span : 0;
  const display = `${Number(value.toFixed(3))}${unit ? ` ${unit}` : ""}`;
  const steps = min < 0 && max > 0 ? [max, 0, min] : [max, min];
  const change = (next: number, history = true) => {
    if (disabled || next === live.current) return false;
    live.current = next;
    onChange(next, history);
    return true;
  };
  const stepped = (raw: number) =>
    Math.min(
      max,
      Math.max(
        min,
        Number((min + Math.round((raw - min) / step) * step).toFixed(8)),
      ),
    );
  const wheel = useRef<(event: WheelEvent) => void>(() => {});
  wheel.current = (event) => {
    if (
      event.ctrlKey ||
      event.metaKey ||
      document.activeElement !== slider.current ||
      !event.deltaY
    )
      return;
    event.preventDefault();
    const amount = event.shiftKey ? step : step * 2;
    if (
      change(
        stepped(live.current - Math.sign(event.deltaY) * amount),
        !wheelChanged.current,
      )
    )
      wheelChanged.current = true;
    setWheeling(true);
    window.clearTimeout(wheelTimer.current);
    wheelTimer.current = window.setTimeout(() => {
      wheelTimer.current = undefined;
      wheelChanged.current = false;
      setWheeling(false);
    }, 250);
  };
  useEffect(() => {
    const input = slider.current;
    if (!input) return;
    const handleWheel = (event: WheelEvent) => wheel.current(event);
    input.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      input.removeEventListener("wheel", handleWheel);
      window.clearTimeout(wheelTimer.current);
    };
  }, []);

  const endDrag = (event: PointerEvent<HTMLInputElement>) => {
    if (drag.current?.id !== event.pointerId) return;
    drag.current = null;
    setDragging(false);
  };
  return (
    <div
      className={`hardware-parameter hardware-${kind}`}
      data-adjusting={dragging || wheeling}
    >
      <span className="hardware-label" title={label}>
        {shortLabel}
      </span>
      <div
        className="hardware-mechanism"
        style={
          {
            "--position": fraction,
            "--angle": `${-135 + fraction * 270}deg`,
          } as CSSProperties
        }
      >
        {kind === "knob" ? (
          <>
            <svg
              viewBox="0 0 56 56"
              className="hardware-dial"
              aria-hidden="true"
            >
              {Array.from({ length: 11 }, (_, i) => (
                <path
                  key={i}
                  d={i % 5 === 0 ? "M28 3v5" : "M28 4v3"}
                  transform={`rotate(${-135 + i * 27} 28 28)`}
                />
              ))}
            </svg>
            <span className="hardware-knob-cap" aria-hidden="true" />
            <span className="hardware-knob-index" aria-hidden="true" />
            <span className="hardware-knob-scale" aria-hidden="true">
              <span>{min}</span>
              <span>{max}</span>
            </span>
          </>
        ) : (
          <div className="hardware-throw" aria-hidden="true">
            <span className="hardware-slot" />
            <span className="hardware-fader-cap" />
            {steps.map((mark) => (
              <span
                key={mark}
                className="hardware-fader-mark"
                style={{ bottom: `${span ? ((mark - min) / span) * 100 : 0}%` }}
              >
                {mark}
              </span>
            ))}
          </div>
        )}
        <input
          ref={slider}
          className="hardware-slider"
          type="range"
          aria-label={label}
          aria-valuetext={display}
          aria-orientation={kind === "fader" ? "vertical" : "horizontal"}
          title={label}
          value={value}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={(event) => change(Number(event.target.value))}
          onPointerDown={(event) => {
            if (event.button !== 0 || drag.current) return;
            event.preventDefault();
            event.currentTarget.focus({ preventScroll: true });
            event.currentTarget.setPointerCapture(event.pointerId);
            drag.current = {
              id: event.pointerId,
              y: event.clientY,
              raw: live.current,
              changed: false,
            };
            setDragging(true);
          }}
          onPointerMove={(event) => {
            const active = drag.current;
            if (!active || active.id !== event.pointerId) return;
            const travel =
              kind === "fader" ? event.currentTarget.clientHeight - 18 : 140;
            active.raw = Math.max(
              min,
              Math.min(
                max,
                active.raw +
                  ((active.y - event.clientY) * span) /
                    Math.max(1, travel) /
                    (event.shiftKey ? 8 : 1),
              ),
            );
            active.y = event.clientY;
            if (change(stepped(active.raw), !active.changed))
              active.changed = true;
          }}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onLostPointerCapture={endDrag}
          onDoubleClick={() => change(defaultValue)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              setDraft(String(live.current));
              return;
            }
            if (
              !event.shiftKey ||
              !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
                event.key,
              )
            )
              return;
            event.preventDefault();
            const direction = ["ArrowUp", "ArrowRight"].includes(event.key)
              ? 1
              : -1;
            change(stepped(live.current + direction * step));
          }}
        />
      </div>
      {draft === null ? (
        <button
          className="hardware-value"
          type="button"
          aria-label={translate("Imposta {0}", [label])}
          disabled={disabled}
          onClick={() => setDraft(String(live.current))}
        >
          {display}
        </button>
      ) : (
        <input
          className="hardware-value hardware-precise"
          type="number"
          aria-label={translate("Valore esatto · {0}", [label])}
          min={min}
          max={max}
          step="any"
          value={draft}
          autoFocus
          onFocus={(event) => event.currentTarget.select()}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={(event) => {
            const raw = event.currentTarget.value;
            if (raw.trim() && Number(raw) >= min && Number(raw) <= max)
              change(Number(raw));
            setDraft(null);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              event.currentTarget.blur();
              slider.current?.focus();
            }
            if (event.key === "Escape") {
              event.stopPropagation();
              setDraft(null);
              requestAnimationFrame(() => slider.current?.focus());
            }
          }}
        />
      )}
    </div>
  );
}

export function HardwareSwitch({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="hardware-switch">
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="hardware-switch-slot" aria-hidden="true" />
      <span>{label}</span>
    </label>
  );
}
