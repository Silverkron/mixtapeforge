import { t as translate } from "./i18n";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Telemetry } from "./types";
import { decibel, contrastInk } from "./types";

export function IconButton({
  label,
  children,
  onClick,
  disabled = false,
}: {
  label: string;
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      className="icon-button"
      title={label}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
export function NumberField({
  label,
  value,
  onChange,
  min = 0,
  max = 9999,
  step = 1,
  unit = "",
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}) {
  const [draft, setDraft] = useState(String(value));
  useEffect(() => setDraft(String(value)), [value]);
  return (
    <label className="field">
      <span>
        {label}
        {unit && <small>{unit}</small>}
      </span>
      <input
        type="number"
        value={draft}
        min={min}
        max={max}
        step={step}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => {
          const n = Number(draft);
          if (draft.trim() && Number.isFinite(n) && n >= min && n <= max)
            onChange(n);
          else setDraft(String(value));
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
        }}
      />
    </label>
  );
}
export function Select({
  label,
  value,
  onChange,
  children,
  disabled = false,
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <select
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {children}
      </select>
    </label>
  );
}
export function Section({
  eyebrow,
  title,
  action,
  children,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel ${className}`}>
      <header className="panel-heading">
        <div>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2>{title}</h2>
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}
export function Cassette({
  title = translate("LA TUA MIXTAPE"),
  side = "A",
  color = "#c4adff",
  playing = false,
}: {
  title?: string;
  side?: string;
  color?: string;
  playing?: boolean;
}) {
  const ink = contrastInk(color);
  return (
    <svg
      className={`cassette ${playing ? "spinning" : ""}`}
      viewBox="0 0 420 270"
      role="img"
      aria-label={translate("Cassetta {0}, lato {1}", [title, side])}
    >
      <defs>
        <linearGradient id="shell" x2="0" y2="1">
          <stop stopColor="#34354a" />
          <stop offset="1" stopColor="#171a2c" />
        </linearGradient>
      </defs>
      <rect
        x="16"
        y="24"
        width="388"
        height="228"
        rx="20"
        fill="url(#shell)"
        stroke="#626378"
        strokeWidth="2"
      />
      <rect x="34" y="40" width="352" height="150" rx="10" fill={color} />
      <path d="M34 94h352v63H34z" fill="#1c2035" />
      <text
        x="53"
        y="63"
        fill={ink}
        fontSize="10"
        fontFamily="monospace"
        letterSpacing="3"
      >
        {translate("MIXTAPEFORGE")}
      </text>
      <text x="53" y="84" fill={ink} fontSize="15" fontFamily="monospace">
        {title.slice(0, 29)}
      </text>
      <rect
        x="130"
        y="106"
        width="160"
        height="39"
        rx="18"
        fill="#080c16"
        stroke="#6b6c7c"
      />
      <rect x="179" y="115" width="62" height="22" rx="2" fill="#4c3f4b" />
      <g fill="#a7a6b1" stroke="#3d3b4d" strokeWidth="4">
        {[115, 305].map((x) => (
          <g
            className="reel"
            key={x}
            style={{ transformOrigin: `${x}px 126px` }}
          >
            <circle cx={x} cy="126" r="29" />
            <circle cx={x} cy="126" r="13" fill="#101322" />
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <path
                key={a}
                d={`M${x - 4} 100h8v13h-8z`}
                transform={`rotate(${a} ${x} 126)`}
              />
            ))}
          </g>
        ))}
      </g>
      <text x="53" y="177" fill={ink} fontSize="12" fontFamily="monospace">
        {translate("STEREO • MIXTAPE")}
      </text>
      <text x="349" y="178" fill={ink} fontSize="21" fontFamily="monospace">
        {side}
      </text>
      <path d="M125 211h170l22 39H103z" fill="#24283b" stroke="#606273" />
      {[48, 372].map((x) => (
        <g key={x} fill="#888795">
          <circle cx={x} cy="220" r="5" />
          <path d={`M${x - 3} 220h6`} stroke="#24283b" />
        </g>
      ))}
      <circle cx="151" cy="233" r="7" fill="#0a0d1a" />
      <circle cx="269" cy="233" r="7" fill="#0a0d1a" />
    </svg>
  );
}
export function Scope({
  values = [],
  spectrum = false,
  progress = 0,
  label,
}: {
  values?: number[];
  spectrum?: boolean;
  progress?: number;
  label: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setCanvasSize((previous) =>
        previous.width === width && previous.height === height
          ? previous
          : { width, height },
      );
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;
    c.width = Math.max(10, rect.width * scale);
    c.height = Math.max(10, rect.height * scale);
    const x = c.getContext("2d");
    if (!x) return;
    x.scale(scale, scale);
    const w = rect.width,
      h = rect.height;
    x.clearRect(0, 0, w, h);
    const display = getComputedStyle(c);
    const ink = (name: string) => display.getPropertyValue(name).trim();
    x.strokeStyle = ink("--display-grid");
    x.lineWidth = 1;
    for (let i = 1; i < 4; i++) {
      x.beginPath();
      x.moveTo(0, (h * i) / 4);
      x.lineTo(w, (h * i) / 4);
      x.stroke();
    }
    if (!values.length) {
      x.fillStyle = ink("--display-muted");
      x.font = "11px monospace";
      x.fillText(translate("NESSUN SEGNALE"), 15, h / 2 + 4);
      return;
    }
    if (spectrum) {
      const bw = w / values.length;
      values.forEach((v, i) => {
        const size = Math.max(0, Math.min(1, (v + 80) / 80)) * h;
        x.fillStyle =
          i > 39 ? ink("--display-accent") : ink("--display-signal");
        x.fillRect(i * bw + 1, h - size, Math.max(1, bw - 3), size);
      });
    } else {
      const bw = w / values.length;
      values.forEach((v, i) => {
        const size = Math.min(1, Math.abs(v)) * h * 0.9;
        x.fillStyle =
          i / values.length < progress
            ? ink("--display-accent")
            : ink("--display-signal");
        x.fillRect(
          i * bw,
          h / 2 - size / 2,
          Math.max(1, bw - 1),
          Math.max(1, size),
        );
      });
      if (progress > 0) {
        x.fillStyle = ink("--display-text");
        x.fillRect(w * progress, 0, 1, h);
      }
    }
  }, [values, spectrum, progress, canvasSize]);
  return (
    <div className="scope">
      <canvas ref={ref} role="img" aria-label={label} />
      <span className="sr-only">
        {values.length
          ? translate("Dati presenti")
          : translate("Nessun segnale")}
      </span>
    </div>
  );
}
export function Meters({
  telemetry,
  reference = -18,
  input = false,
}: {
  telemetry: Telemetry | null;
  reference?: number;
  input?: boolean;
}) {
  const [mode, setMode] = useState<"peak" | "vu" | "ppm">("peak");
  const [clipped, setClipped] = useState(false);
  useEffect(() => {
    if (telemetry?.peak.some((v) => v >= 0)) setClipped(true);
  }, [telemetry]);
  return (
    <div
      className="meters"
      aria-label={
        input
          ? translate("Livelli audio in ingresso")
          : translate("Livelli audio in uscita")
      }
    >
      <div className="meter-heading">
        <span>
          {input || telemetry?.input
            ? translate("INGRESSO")
            : translate("USCITA")}
        </span>
        <button
          className="meter-clip-reset"
          style={{ visibility: clipped ? "visible" : "hidden" }}
          disabled={!clipped}
          aria-hidden={!clipped}
          aria-label={translate("CLIP rilevato · azzera memoria")}
          title={translate("CLIP rilevato · azzera memoria")}
          onClick={() => setClipped(false)}
        >
          {translate("CLIP")}
        </button>
        <select
          aria-label={translate("Tipo di misuratore")}
          value={mode}
          onChange={(e) => setMode(e.target.value as "peak" | "vu" | "ppm")}
        >
          <option value="peak">{translate("PEAK · dBFS")}</option>
          <option value="vu">{translate("VU REL. · 300 ms")}</option>
          <option value="ppm">{translate("PPM indicativo · dBFS")}</option>
        </select>
      </div>
      {["L", "R"].map((c, i) => {
        const level =
          mode === "vu"
            ? (telemetry?.vu?.[i] ?? -180) - reference + 3.0103
            : mode === "ppm"
              ? (telemetry?.ppm?.[i] ?? -180)
              : (telemetry?.peak[i] ?? -180);
        const floor = mode === "vu" ? -30 : -60,
          ceiling = mode === "vu" ? 6 : 0;
        return (
          <div className="meter-row" key={c}>
            <span>{c}</span>
            <div className="meter-track led-bank" aria-hidden="true">
              {Array.from({ length: 30 }, (_, segment) => {
                const threshold =
                  floor + ((ceiling - floor) * (segment + 1)) / 30;
                const zone =
                  threshold >= ceiling - 2
                    ? "peak"
                    : threshold >= ceiling - 10
                      ? "high"
                      : "normal";
                return (
                  <span
                    key={segment}
                    data-zone={zone}
                    data-lit={level >= threshold}
                  />
                );
              })}
            </div>
            <b>{decibel(level)}</b>
          </div>
        );
      })}
      <div className="meter-scale">
        {(mode === "vu"
          ? ["−30", "−18", "−6", "0", "+6"]
          : ["−60", "−36", "−18", "−6", "0"]
        ).map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>
      <div className="meter-readouts">
        <span>
          {translate("RMS L")}
          <b>{decibel(telemetry?.rms[0] ?? null)}</b>
        </span>
        <span>
          {translate("RMS R")}
          <b>{decibel(telemetry?.rms[1] ?? null)}</b>
        </span>
        <span>
          {translate("Ref.")}
          <b>
            {reference} {translate(" dBFS")}
          </b>
        </span>
      </div>
    </div>
  );
}
