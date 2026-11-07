import { t as translate } from "../i18n";
import {
  EQ_FREQUENCIES,
  EQ_PRESETS,
  eqResponse,
  presetFor,
} from "../equalizer";
import { HardwareParameter, HardwareSwitch } from "./HardwareControls";
import { Select } from "../components";
import { useStudio } from "../studio-context";
export function Equalizer() {
  const { project, updateProcessing } = useStudio();
  const q = project.processing;
  const preset = presetFor(q.eq_bands);
  const points = Array.from({ length: 200 }, (_, i) => {
    const f = 20 * 1000 ** (i / 199);
    const db = q.eq_enabled ? eqResponse(f, q.eq_bands, q.sample_rate) : 0;
    return `${10 + (i / 199) * 580},${80 - Math.max(-24, Math.min(24, db)) * 2.8}`;
  }).join(" ");
  return (
    <section className="processing-module">
      <div className="eq-controls">
        <HardwareSwitch
          label={translate("Attiva EQ a 10 bande")}
          checked={q.eq_enabled}
          onChange={(eq_enabled) => updateProcessing({ eq_enabled })}
        />
        <Select
          label={translate("Profilo EQ")}
          value={preset?.id ?? "custom"}
          onChange={(id) => {
            const p = EQ_PRESETS.find((p) => p.id === id);
            if (p)
              updateProcessing({ eq_bands: [...p.gains], eq_enabled: true });
          }}
        >
          {EQ_PRESETS.filter((p) => p.category === "neutral").map((p) => (
            <option value={p.id} key={p.id}>
              {translate(p.name)}
            </option>
          ))}
          <optgroup label={translate("Generi musicali")}>
            {EQ_PRESETS.filter((p) => p.category === "genre").map((p) => (
              <option value={p.id} key={p.id}>
                {translate(p.name)}
              </option>
            ))}
          </optgroup>
          <optgroup label={translate("Correzioni del suono")}>
            {EQ_PRESETS.filter((p) => p.category === "correction").map((p) => (
              <option value={p.id} key={p.id}>
                {translate(p.name)}
              </option>
            ))}
          </optgroup>
          <option value="custom" disabled>
            {translate("Personalizzato")}
          </option>
        </Select>
      </div>
      <div className="eq-bands">
        {EQ_FREQUENCIES.map((f, i) => (
          <HardwareParameter
            key={f}
            kind="fader"
            shortLabel={f >= 1000 ? `${f / 1000}k` : String(f)}
            label={translate("EQ {0} Hz", [f])}
            min={-12}
            max={12}
            step={0.25}
            defaultValue={0}
            unit="dB"
            value={q.eq_bands[i]}
            onChange={(gain, history) => {
              const bands = [...q.eq_bands];
              bands[i] = gain;
              updateProcessing({ eq_bands: bands, eq_enabled: true }, history);
            }}
          />
        ))}
      </div>
      <div className="eq-plot">
        <div className="eq-scale" aria-hidden="true">
          <span>{translate("+12 dB")}</span>
          <span>{translate("0 dB")}</span>
          <span>{translate("−12 dB")}</span>
        </div>
        <svg
          className="eq-response"
          viewBox="0 0 600 160"
          preserveAspectRatio="none"
          role="img"
          aria-label={translate(
            "Risposta in frequenza complessiva dell’equalizzatore, da 20 Hz a 20 kHz, scala da meno 24 a più 24 dB",
          )}
        >
          {[-12, 0, 12].map((db) => (
            <g key={db}>
              <line x1="10" y1={80 - db * 2.8} x2="590" y2={80 - db * 2.8} />
            </g>
          ))}
          <polyline points={points} />
        </svg>
      </div>
      <details className="disclosure">
        <summary>{translate("Come usare l’EQ")}</summary>
        <p className="caption">
          {translate(
            "I valori indicano il guadagno di ciascun filtro; la curva mostra il risultato combinato delle bande. L’EQ si applica a tutto il master. Disattivala per confrontare senza perdere le regolazioni. I rialzi possono richiedere un’attenuazione del master per rispettare il limite true peak.",
          )}
        </p>
      </details>
    </section>
  );
}
