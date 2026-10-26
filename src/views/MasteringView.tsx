import { t as translate } from "../i18n";
import { AudioLines, Play, Square } from "lucide-react";
import { native } from "../backend";
import { NumberField, Scope, Section, Select } from "../components";
import { decibel, time } from "../types";

import { VstPlugins } from "./VstPlugins";
import { Equalizer } from "./Equalizer";
import { useStudio } from "../studio-context";
export function MasteringView() {
  const {
    project,
    panel,
    setPanel,
    selected,
    setSelected,
    busy,
    loop,
    setLoop,
    loopSeconds,
    setLoopSeconds,
    metric,
    setMetric,
    original,
    setOriginal,
    track,
    locked,
    stop,
    audition,
    updateProcessing,
    gain,
  } = useStudio();

  const q = project.processing;
  const compressionPreset = (ratio: number, attack: number, release: number) =>
    q.dynamics === "compress" &&
    q.threshold === -18 &&
    q.ratio === ratio &&
    q.attack_ms === attack &&
    q.release_ms === release &&
    q.knee_db === 6 &&
    q.makeup_db === 0;
  if (panel !== "master") return null;
  return (
    <div className="audio-editor audio-rack">
      {project.recording_profile && (
        <p className="caption">
          {translate("Profilo di registrazione:")}{" "}
          <strong>{project.recording_profile.conditions.name}</strong> ·{" "}
          {project.recording_profile.enabled
            ? translate("attivo, separato dall’EQ musicale")
            : "disattivato"}
          {translate(". Gestiscilo in Calibrazione.")}
        </p>
      )}
      <fieldset disabled={locked} className="audio-rack-module audio-rack-eq">
        <legend>{translate("Equalizzatore")}</legend>
        <Equalizer />
      </fieldset>
      <div className="audio-rack-pair">
        <fieldset disabled={locked} className="audio-rack-module">
          <legend>{translate("Livello dei brani")}</legend>

          <>
            <Select
              label={translate("Normalizzazione")}
              value={project.processing.normalize}
              onChange={(v) => updateProcessing({ normalize: v })}
            >
              <option value="off">
                {translate("Nessuna · solo guadagno manuale")}
              </option>
              <option value="peak">
                {translate("Picchi uniformi · Peak")}
              </option>
              <option value="album">
                {translate("Conserva i rapporti tra i brani · Album")}
              </option>
              <option value="lufs">
                {translate("Volume percepito uniforme · LUFS")}
              </option>
              <option value="rms">RMS</option>
              <option value="vu">{translate("Media tipo VU · 300 ms")}</option>
              <option value="quasi">
                {translate("Quasi-peak · energia 10 ms")}
              </option>
            </Select>
            <div className="fields-two">
              <NumberField
                label={translate("Limite true peak")}
                value={project.processing.ceiling}
                min={-24}
                max={0}
                step={0.5}
                unit="dBTP"
                onChange={(v) => updateProcessing({ ceiling: v })}
              />
              {["lufs", "rms"].includes(project.processing.normalize) && (
                <NumberField
                  label={
                    project.processing.normalize === "rms"
                      ? translate("Target RMS · dBFS")
                      : translate("Target LUFS")
                  }
                  value={project.processing.target_lufs}
                  min={-36}
                  max={-5}
                  step={0.5}
                  onChange={(v) => updateProcessing({ target_lufs: v })}
                />
              )}
            </div>
            <p className="caption">
              {
                {
                  off: translate(
                    "Conserva i livelli originali e il guadagno manuale di ogni brano.",
                  ),
                  peak: translate(
                    "Porta il picco di ogni brano al limite scelto.",
                  ),
                  album: translate(
                    "Applica un guadagno comune per conservare le differenze tra i brani.",
                  ),
                  lufs: translate(
                    "Avvicina il volume percepito dei brani al target LUFS.",
                  ),
                  rms: translate(
                    "Avvicina il livello medio dei brani al target RMS.",
                  ),
                  vu: translate(
                    "Usa la media su 300 ms e il riferimento del profilo di calibrazione.",
                  ),
                  quasi: translate(
                    "Usa l’energia su 10 ms per regolare i picchi brevi.",
                  ),
                }[q.normalize]
              }{" "}
              {translate(
                "Il limite true peak ha precedenza: dopo EQ e compressione il master può essere attenuato.",
              )}
            </p>
            <details className="disclosure">
              <summary>{translate("Formato del master")}</summary>
              <Select
                label={translate("Frequenza del master")}
                value={q.sample_rate}
                onChange={(v) => updateProcessing({ sample_rate: Number(v) })}
              >
                {[44100, 48000, 88200, 96000].map((r) => (
                  <option key={r} value={r}>
                    {r / 1000} {translate("kHz")}
                  </option>
                ))}
              </Select>
            </details>
          </>
        </fieldset>
        <fieldset disabled={locked} className="audio-rack-module">
          <legend>{translate("Compressione e dinamica")}</legend>

          <>
            <div
              className="audio-preset-row"
              aria-label={translate("Punti di partenza per la dinamica")}
            >
              <button
                className="button small"
                aria-pressed={q.dynamics === "off"}
                onClick={() => updateProcessing({ dynamics: "off" })}
              >
                {translate("Conserva originale")}
              </button>
              <button
                className="button small"
                aria-pressed={compressionPreset(1.5, 30, 250)}
                onClick={() =>
                  updateProcessing({
                    dynamics: "compress",
                    threshold: -18,
                    ratio: 1.5,
                    attack_ms: 30,
                    release_ms: 250,
                    knee_db: 6,
                    makeup_db: 0,
                  })
                }
              >
                {translate("Leggera")}
              </button>
              <button
                className="button small"
                aria-pressed={compressionPreset(2.5, 20, 200)}
                onClick={() =>
                  updateProcessing({
                    dynamics: "compress",
                    threshold: -18,
                    ratio: 2.5,
                    attack_ms: 20,
                    release_ms: 200,
                    knee_db: 6,
                    makeup_db: 0,
                  })
                }
              >
                {translate("Media")}
              </button>
            </div>
            <Select
              label={translate("Dinamica")}
              value={project.processing.dynamics}
              onChange={(v) => updateProcessing({ dynamics: v })}
            >
              <option value="off">
                {translate("Bypass · conserva la dinamica")}
              </option>
              <option value="compress">
                {translate("Compressore soft-knee")}
              </option>
              <option value="expand">
                {translate("Espansore verso il basso")}
              </option>
              <option value="alc">
                {translate("Controllo automatico (sperimentale)")}
              </option>
              <option value="fit">
                {translate("Fit dinamico (sperimentale)")}
              </option>
            </Select>
            {project.processing.dynamics !== "off" && (
              <div className="fields-two">
                <NumberField
                  label={translate("Soglia")}
                  value={project.processing.threshold}
                  min={-60}
                  max={0}
                  unit="dBFS"
                  onChange={(v) => updateProcessing({ threshold: v })}
                />
                <NumberField
                  label={translate("Rapporto")}
                  value={project.processing.ratio}
                  min={1}
                  max={12}
                  step={0.5}
                  unit=":1"
                  onChange={(v) => updateProcessing({ ratio: v })}
                />
              </div>
            )}
            {project.processing.dynamics !== "off" && (
              <details className="disclosure">
                <summary>{translate("Tempi e guadagno avanzati")}</summary>
                <div className="fields-two">
                  <NumberField
                    label={translate("Attacco")}
                    value={project.processing.attack_ms}
                    min={0.1}
                    max={200}
                    step={0.1}
                    unit="ms"
                    onChange={(v) => updateProcessing({ attack_ms: v })}
                  />
                  <NumberField
                    label={translate("Rilascio")}
                    value={project.processing.release_ms}
                    min={10}
                    max={2000}
                    step={10}
                    unit="ms"
                    onChange={(v) => updateProcessing({ release_ms: v })}
                  />
                  <NumberField
                    label={translate("Knee")}
                    value={project.processing.knee_db}
                    min={0}
                    max={24}
                    step={0.5}
                    unit="dB"
                    onChange={(v) => updateProcessing({ knee_db: v })}
                  />
                  <NumberField
                    label={translate("Guadagno di uscita")}
                    value={project.processing.makeup_db}
                    min={-12}
                    max={24}
                    step={0.5}
                    unit="dB"
                    onChange={(v) => updateProcessing({ makeup_db: v })}
                  />
                </div>
              </details>
            )}
            <p className="caption">
              {translate(
                "Soglia e rapporto controllano la riduzione dei picchi. Attacco e rilascio determinano quanto velocemente interviene; knee ammorbidisce il passaggio. I due canali sono collegati per mantenere l’immagine stereo.",
              )}
            </p>
          </>
        </fieldset>
      </div>
      <details className="audio-rack-extra" open={q.nr !== "off" || undefined}>
        <summary>
          {translate("Nastro e NR")}{" "}
          <span>
            {q.nr === "type_b"
              ? translate("Type B attivo")
              : translate("Disattivato")}
          </span>
        </summary>
        <fieldset disabled={locked} className="audio-control-fields">
          <>
            <Select
              label={translate("Codifica del master")}
              value={project.processing.nr}
              onChange={(nr) => updateProcessing({ nr })}
            >
              <option value="off">{translate("Nessuna codifica NR")}</option>
              <option value="type_b">{translate("Type B · libdolbyb")}</option>
            </Select>
            <p className="caption">
              {translate(
                "La tua piastra registra già in Dolby B? Lascia qui «Nessuna codifica NR» e attiva Dolby B sulla piastra. Se scegli Type B nell’app, la codifica viene invece applicata al master.",
              )}
            </p>
            {project.processing.nr === "type_b" && (
              <>
                <NumberField
                  label={translate("Livello digitale di riferimento NR")}
                  value={project.processing.nr_reference}
                  min={-36}
                  max={0}
                  step={0.5}
                  unit="dBFS peak"
                  onChange={(nr_reference) =>
                    updateProcessing({ nr_reference })
                  }
                />
                <p className="caption">
                  {translate(
                    "Valore iniziale: 0 dBFS. È un riferimento del codec, non un controllo di volume o una calibrazione automatica della piastra. Modificarlo cambia l’intervento della codifica.",
                  )}
                </p>
                <button
                  className="button small"
                  disabled={project.processing.nr_reference === 0}
                  onClick={() => updateProcessing({ nr_reference: 0 })}
                >
                  {translate("Ripristina 0 dBFS")}
                </button>
                <p className="caption">
                  {translate(
                    "Nessuna attenuazione NR fissa. Se la codifica supera il limite di picco, l’app riduce il livello prima del codec e ricodifica il lato. Nessuna normalizzazione dopo NR.",
                  )}
                </p>
                <p className="inline-warning">
                  {translate(
                    "Con Type B nell’app: registra con NR della piastra OFF, poi ascolta la cassetta con Dolby B ON. Attivarlo anche sulla piastra durante la registrazione applicherebbe la codifica due volte.",
                  )}
                </p>
                <details className="disclosure">
                  <summary>
                    {translate("Come preparare la registrazione")}
                  </summary>
                  <p className="caption">
                    {translate(
                      "Prima calibra la piastra per il nastro scelto, se lo permette. Per la codifica software serve un allineamento verificato con un tono non codificato, seguendo il riferimento Dolby previsto dal manuale della piastra. Il livello del tono si imposta separatamente: 0 dBFS del codec non è un’indicazione da raggiungere sul meter del deck. Frequenza del tono e indicazione del meter dipendono dal modello: lo 0 dB del meter non coincide necessariamente con il riferimento Dolby.",
                    )}
                  </p>
                  <p className="caption">
                    {translate(
                      "Dopo l’allineamento mantieni fissi volume del computer, uscita dell’interfaccia e REC LEVEL. Registra il master codificato senza aggiungere EQ, normalizzazione o compressione dopo la codifica. Se i livelli non sono allineati, la riproduzione può risultare troppo chiusa o brillante.",
                    )}
                  </p>
                  <p className="caption">
                    {translate(
                      "Fai prima una breve registrazione di prova e riascoltala con Dolby B attivo. L’anteprima nell’app è ancora codificata: non rappresenta l’ascolto decodificato della cassetta. La compatibilità con un deck reale non è ancora verificata.",
                    )}
                  </p>
                </details>
              </>
            )}
            <p className="caption">
              {translate(
                "Type B usa libdolbyb 1.1, con elaborazione interna PCM a 24 bit.",
              )}
            </p>

            <details className="disclosure">
              <summary>{translate("Conversione EQ del nastro")}</summary>
              <Select
                label={translate("Conversione EQ digitale")}
                value={project.processing.eq}
                onChange={(v) => updateProcessing({ eq: v })}
              >
                <option value="off">{translate("Bypass")}</option>
                <option value="120to70">120 → 70 µs</option>
                <option value="70to120">70 → 120 µs</option>
              </Select>
              <p className="caption">
                {translate(
                  "Questa EQ non regola il bias del deck. Il master viene controllato dopo tutte le elaborazioni e, se necessario, abbassato di volume per rispettare il limite true peak. Verifica il risultato con una registrazione di prova.",
                )}
              </p>
            </details>
          </>
        </fieldset>
      </details>
      <details className="audio-rack-extra">
        <summary>
          {translate("Plugin VST3")}{" "}
          <span>
            {q.vst?.enabled ? q.vst.name : translate("Nessuno attivo")}
          </span>
        </summary>
        <fieldset disabled={locked} className="audio-control-fields">
          <VstPlugins />
        </fieldset>
      </details>
      <details className="audio-rack-extra">
        <summary>
          {translate("Confronto d’ascolto")}
          <span>{translate("Originale / master")}</span>
        </summary>

        <>
          <Section
            title={translate("Analisi del brano")}
            eyebrow={translate("ANALISI E CONFRONTO")}
          >
            <div className="panel-content">
              <Select
                label={translate("Brano da analizzare")}
                value={selected ?? ""}
                onChange={setSelected}
              >
                <option value="">{translate("Seleziona un brano")}</option>
                {project.tracks.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.artist} — {t.title}
                  </option>
                ))}
              </Select>
              {track ? (
                <>
                  <Scope
                    values={track.analysis.waveform}
                    label={translate("Forma d’onda del file sorgente")}
                  />
                  <div className="stat-grid four">
                    <div>
                      <span>PEAK</span>
                      <b>
                        {decibel(track.analysis.peak)}
                        <small> {translate(" dBFS")}</small>
                      </b>
                    </div>
                    <div>
                      <span>{translate("TRUE PEAK")}</span>
                      <b>
                        {decibel(track.analysis.true_peak)}
                        <small> {translate(" dBTP")}</small>
                      </b>
                    </div>
                    <div>
                      <span>RMS</span>
                      <b>
                        {decibel(track.analysis.rms)}
                        <small> {translate(" dBFS")}</small>
                      </b>
                    </div>
                    <div>
                      <span>INTEGRATED</span>
                      <b>
                        {decibel(track.analysis.lufs)}
                        <small> {translate(" LUFS")}</small>
                      </b>
                    </div>
                  </div>
                  <div className="subsection-title">
                    <h3>{translate("Passaggi più forti")}</h3>
                    <span className="tag">{translate("ASCOLTO IN LOOP")}</span>
                  </div>
                  <p className="caption">
                    {translate(
                      "Un punto d’ascolto ripetibile per regolare il deck. Peak individua il picco; RMS cerca l’energia su una finestra di 5 secondi.",
                    )}
                  </p>
                  <div className="fields-two">
                    <Select
                      label={translate("Metrica")}
                      value={metric}
                      onChange={setMetric}
                    >
                      <option value="peak">{translate("Sample peak")}</option>
                      <option value="rms">
                        {translate("RMS · finestra 5 s")}
                      </option>
                    </Select>
                    <NumberField
                      label={translate("Durata loop")}
                      value={loopSeconds}
                      min={2}
                      max={15}
                      unit="s"
                      onChange={setLoopSeconds}
                    />
                  </div>
                  <div className="toggle-row">
                    <label className="check">
                      <input
                        type="checkbox"
                        checked={loop}
                        onChange={(e) => setLoop(e.target.checked)}
                      />
                      {translate("Ripeti passaggio")}
                    </label>
                    <label className="check">
                      <input
                        type="checkbox"
                        checked={original}
                        onChange={(e) => setOriginal(e.target.checked)}
                      />
                      {translate("Ascolta originale")}
                    </label>
                  </div>
                  <div className="button-row">
                    <button
                      className="button primary"
                      disabled={busy || !native}
                      onClick={() => audition(track)}
                    >
                      <Play size={15} />
                      {translate("Ascolta da")}{" "}
                      {time(
                        Math.max(
                          0,
                          (metric === "peak"
                            ? track.analysis.peak_time
                            : track.analysis.rms_time) -
                            loopSeconds / 2,
                        ),
                      )}
                    </button>
                    <button className="button" onClick={stop}>
                      <Square size={14} />
                      {translate("Stop")}
                    </button>
                  </div>
                  <p className="caption">
                    {translate("Guadagno applicabile:")}{" "}
                    <strong>
                      {gain >= 0 ? "+" : ""}
                      {gain.toFixed(1)} {translate("dB")}
                    </strong>
                    {translate(
                      ". Il limite di true peak ha precedenza sul target.",
                    )}
                  </p>
                </>
              ) : (
                <div className="empty-block">
                  <AudioLines size={36} />
                  <h3>{translate("Seleziona un brano da ascoltare.")}</h3>
                  <p>
                    {translate(
                      "Scegli un brano dal menu qui sopra. Se la lista è vuota, aggiungi i file alla Mixtape o carica la demo.",
                    )}
                  </p>
                  <button className="button" onClick={() => setPanel(null)}>
                    {translate("Torna ai brani")}
                  </button>
                </div>
              )}
            </div>
          </Section>
        </>
      </details>
      <p className="audio-editor-footnote">
        {translate(
          "Le modifiche si ascoltano preparando di nuovo il master. I file originali restano intatti.",
        )}
      </p>
    </div>
  );
}
