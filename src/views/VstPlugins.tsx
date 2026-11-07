import { t as translate } from "../i18n";
import { useState } from "react";
import { call, native } from "../backend";
import { Select } from "../components";
import { HardwareParameter, HardwareSwitch } from "./HardwareControls";
import { useStudio } from "../studio-context";
interface Parameter {
  name: string;
  value: number;
  text: string;
}
interface Description {
  name: string;
  uid: string;
  parameters: Parameter[];
}
export function VstPlugins() {
  const { project, updateProcessing, locked } = useStudio();
  const effect = project.processing.vst;
  const [paths, setPaths] = useState<string[]>([]);
  const [selected, setSelected] = useState(effect?.path ?? "");
  const [description, setDescription] = useState<Description | null>(null);
  const [working, setWorking] = useState(false);
  const [message, setMessage] = useState("");
  async function scan() {
    setWorking(true);
    setMessage("");
    try {
      const found = await call<string[]>("list_vst_plugins");
      setPaths(found);
      if (!selected && found.length) setSelected(found[0]);
      if (!found.length)
        setMessage(
          translate(
            "Nessun VST3 trovato. Installa un effetto nella cartella VST3 standard, poi cerca di nuovo.",
          ),
        );
    } catch (e) {
      setMessage(String(e));
    } finally {
      setWorking(false);
    }
  }
  async function load() {
    setWorking(true);
    setMessage("");
    setDescription(null);
    try {
      const d = await call<Description>("inspect_vst_plugin", {
        path: selected,
      });
      const same =
        effect?.path === selected &&
        effect.uid === d.uid &&
        effect.parameters.length === d.parameters.length;
      setDescription(d);
      updateProcessing({
        vst: {
          enabled: true,
          path: selected,
          name: d.name,
          uid: d.uid,
          parameters: same
            ? effect.parameters
            : d.parameters.map((p) => p.value),
          tail_seconds: same ? effect.tail_seconds : 2,
        },
      });
      setMessage(
        translate(
          "Plugin caricato. Prepara il lato per ascoltare il risultato.",
        ),
      );
    } catch (e) {
      setMessage(String(e));
    } finally {
      setWorking(false);
    }
  }
  return (
    <section className="processing-module">
      <p className="caption">
        {translate(
          "Aggiungi un effetto stereo al master. Viene applicato dopo EQ e compressione, prima della codifica NR. Per ora sono supportati i VST3, con controlli generici.",
        )}
      </p>
      <fieldset disabled={locked || working || !native}>
        <button type="button" className="button" onClick={scan}>
          {working ? "Attendi…" : translate("Cerca plugin installati")}
        </button>
        <Select
          label={translate("Plugin installato")}
          value={selected}
          onChange={setSelected}
        >
          <option value="">{translate("Seleziona un VST3")}</option>
          {selected && !paths.includes(selected) && (
            <option value={selected}>{selected.split(/[\\/]/).pop()}</option>
          )}
          {paths.map((path) => (
            <option key={path} value={path}>
              {path.split(/[\\/]/).pop()}
            </option>
          ))}
        </Select>
        <button
          type="button"
          className="button"
          disabled={!selected}
          onClick={load}
        >
          {translate("Carica plugin")}
        </button>
        {effect && (
          <>
            <HardwareSwitch
              label={`${translate("Attiva")} ${effect.name}`}
              checked={effect.enabled}
              onChange={(enabled) =>
                updateProcessing({ vst: { ...effect, enabled } })
              }
            />
            <HardwareParameter
              defaultValue={2}
              label={translate("Spazio per la coda dell’effetto")}
              value={effect.tail_seconds}
              min={0}
              max={30}
              step={0.5}
              unit="s"
              onChange={(tail_seconds, history) =>
                updateProcessing({ vst: { ...effect, tail_seconds } }, history)
              }
            />
            <p className="caption">
              {translate(
                "La coda aggiunge tempo alla fine del lato. Aumentala se le ripetizioni del delay vengono tagliate.",
              )}
            </p>
            {description && description.uid === effect.uid && (
              <div className="hardware-knob-bank">
                {description.parameters.map((p, i) => (
                  <HardwareParameter
                    key={i}
                    label={p.name}
                    min={0}
                    max={100}
                    step={0.1}
                    unit="%"
                    defaultValue={p.value * 100}
                    value={effect.parameters[i] * 100}
                    onChange={(percent, history) => {
                      const parameters = [...effect.parameters];
                      parameters[i] = percent / 100;
                      updateProcessing(
                        { vst: { ...effect, parameters } },
                        history,
                      );
                    }}
                  />
                ))}
              </div>
            )}
            {!description && (
              <p className="caption">
                {translate(
                  "Premi Carica plugin per verificarlo e mostrare i controlli. Le impostazioni salvate vengono conservate se il plugin corrisponde.",
                )}
              </p>
            )}
            <button
              type="button"
              className="text-button"
              onClick={() => {
                updateProcessing({ vst: null });
                setDescription(null);
              }}
            >
              {translate("Rimuovi effetto")}
            </button>
          </>
        )}
      </fieldset>
      {message && (
        <p className="caption" role="status">
          {message}
        </p>
      )}
      {!native && (
        <p className="caption">
          {translate("I plugin sono disponibili nell’app desktop.")}
        </p>
      )}
      <p className="caption">
        {translate(
          "Usa questo slot per gli effetti audio. La codifica NR si imposta in Nastro e NR. I plugin sono programmi esterni: carica solo quelli che conosci.",
        )}
      </p>
    </section>
  );
}
