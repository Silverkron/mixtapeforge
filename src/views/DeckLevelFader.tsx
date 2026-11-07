import {
  MIN_RECORDING_LEVEL_DB,
  NOMINAL_PROBE_PEAK_DBFS,
} from "../calibration-advice";
import { t as translate } from "../i18n";
import { useStudio } from "../studio-context";
import { HardwareParameter } from "./HardwareControls";

export function DeckLevelFader({ unit = "dB" }: { unit?: string }) {
  const { project, updateProcessing, locked } = useStudio();
  return (
    <HardwareParameter
      kind="fader"
      defaultValue={NOMINAL_PROBE_PEAK_DBFS}
      shortLabel="MASTER"
      label={translate("Livello verso la piastra")}
      value={project.processing.ceiling}
      min={MIN_RECORDING_LEVEL_DB}
      max={0}
      step={0.5}
      unit={unit}
      disabled={locked}
      onChange={(ceiling, history) => updateProcessing({ ceiling }, history)}
    />
  );
}
