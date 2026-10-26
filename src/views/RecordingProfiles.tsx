import { t as translate, localeTag } from "../i18n";
import { useState } from "react";
import { call, native } from "../backend";
import { Select } from "../components";
import { useStudio } from "../studio-context";
import { proposeRecordingCorrection } from "../recording-profiles";
import type { CalibrationReport, RecordingProfile } from "../types";

export function RecordingProfileSelector() {
  const {
    project,
    recordingProfiles = [],
    edit,
    locked,
    capturing,
    playing,
    outputs,
    device,
    saveRecordingProfile,
    notify,
  } = useStudio();
  const selected = project.recording_profile;
  const profiles =
    selected && !recordingProfiles.some((p) => p.id === selected.id)
      ? [...recordingProfiles, selected]
      : recordingProfiles;
  const mismatch =
    selected?.enabled &&
    !!selected.conditions.output &&
    outputs.find((d) => d.index === device)?.name !==
      selected.conditions.output;
  return (
    <section
      className="recording-profile-selector"
      aria-label={translate("Profilo di registrazione")}
    >
      <fieldset disabled={locked || capturing || playing}>
        <Select
          label={translate("Profilo di registrazione")}
          value={selected?.id ?? ""}
          onChange={(id) =>
            edit((p) => {
              const profile = profiles.find((v) => v.id === id);
              p.recording_profile = profile
                ? { ...structuredClone(profile), enabled: true }
                : null;
              if (profile)
                p.processing.sample_rate = profile.conditions.sample_rate;
            })
          }
        >
          <option value="">{translate("Nessun profilo")}</option>
          {profiles.map((p) => (
            <option key={p.id} value={p.id}>
              {p.conditions.name}
            </option>
          ))}
        </Select>
        {selected && (
          <label className="profile-toggle">
            <input
              type="checkbox"
              checked={selected.enabled}
              onChange={(e) =>
                edit((p) => {
                  if (p.recording_profile)
                    p.recording_profile.enabled = e.target.checked;
                })
              }
            />{" "}
            {translate("Applica alle registrazioni e all’ascolto del master")}
          </label>
        )}
      </fieldset>
      {selected ? (
        <>
          <p className="caption">
            {selected.version === 2
              ? translate(
                  "Profilo prudente della prova estesa · {0}/5 limiti per frequenza disponibili",
                  [selected.drive_limits?.length ?? 0],
                )
              : translate(
                  "Profilo precedente · la nuova prova estesa aggiunge prudenza, stabilità e limiti per frequenza",
                )}
            {translate(
              ". La compatibilità su altre piastre resta da verificare.",
            )}
          </p>
          <p className="caption">
            {[
              selected.conditions.deck,
              selected.conditions.tape,
              translate("{0} kHz", [selected.conditions.sample_rate / 1000]),
              selected.conditions.output,
            ]
              .filter(Boolean)
              .join(" · ")}
            {translate(". Mantieni volume d’uscita e REC LEVEL della prova.")}
          </p>
          {mismatch && (
            <p className="inline-warning">
              {translate("Per usare questo profilo seleziona l’uscita")}{" "}
              {selected.conditions.output}
              {translate("; l’avvio del master su un’altra uscita è bloccato.")}
            </p>
          )}
          {!recordingProfiles.some((p) => p.id === selected.id) && (
            <button
              className="button small"
              disabled={locked}
              onClick={() => {
                try {
                  saveRecordingProfile(selected, false);
                  notify(translate("Profilo aggiunto alla libreria locale"));
                } catch {
                  notify(
                    translate(
                      "Impossibile salvare il profilo nella libreria locale",
                    ),
                    true,
                  );
                }
              }}
            >
              {translate("Aggiungi alla libreria")}
            </button>
          )}
        </>
      ) : (
        <p className="caption">
          {translate(
            "Crea un profilo dalla prova e riutilizzalo con lo stesso deck, nastro e regolazioni. La selezione ripristina la frequenza della prova.",
          )}
        </p>
      )}
    </section>
  );
}

export function RecordingProfileBuilder({
  report,
}: {
  report: CalibrationReport;
}) {
  const {
    project,
    outputs,
    inputs,
    device,
    inputDevice,
    locked,
    capturing,
    run,
    saveRecordingProfile,
    notify,
  } = useStudio();
  const previous =
    project.recording_profile?.report.source === report.source
      ? project.recording_profile.conditions
      : null;
  const [name, setName] = useState(
    previous?.name ??
      translate("Calibrazione · {0}", [
        new Date().toLocaleDateString(localeTag()),
      ]),
  );
  const [sampleRate, setSampleRate] = useState(
    previous?.sample_rate ?? project.processing.sample_rate,
  );
  const [deck, setDeck] = useState(previous?.deck ?? "");
  const [tape, setTape] = useState(previous?.tape ?? "");
  const [output, setOutput] = useState(
    previous?.output ?? outputs.find((d) => d.index === device)?.name ?? "",
  );
  const [input, setInput] = useState(
    previous?.input ?? inputs.find((d) => d.index === inputDevice)?.name ?? "",
  );
  const [notes, setNotes] = useState(previous?.notes ?? "");
  const [moveEq, setMoveEq] = useState(true);
  const { eq, balance } = proposeRecordingCorrection(report);
  // Recognize the exact legacy proposal. Never disable a different creative EQ.
  const legacy = report.bands.map((b) =>
    b.frequency >= 16000
      ? 0
      : Math.round(
          Math.max(
            -3,
            Math.min(3, -(b.response_db[0] + b.response_db[1]) / 2),
          ) * 2,
        ) / 2,
  );
  const copiedEq =
    project.processing.eq_enabled &&
    legacy.every((v, i) => v === project.processing.eq_bands[i]);
  const saved = project.recording_profile;
  const alreadySaved =
    saved?.report.source === report.source &&
    saved.conditions.sample_rate === sampleRate &&
    saved.conditions.name === name.trim() &&
    saved.conditions.deck === deck.trim() &&
    saved.conditions.tape === tape.trim() &&
    saved.conditions.output === output.trim() &&
    saved.conditions.input === input.trim() &&
    saved.conditions.notes === notes.trim();
  const fields = [
    [translate("Piastra"), deck, setDeck, translate("Marca e modello")],
    [
      translate("Nastro"),
      tape,
      setTape,
      translate("Tipo, marca e formulazione"),
    ],
    [
      translate("Uscita usata nella prova"),
      output,
      setOutput,
      translate("Scheda audio e canali"),
    ],
    [
      translate("Ingresso usato nella prova"),
      input,
      setInput,
      translate("Scheda audio e canali"),
    ],
  ] as const;
  return (
    <section className="calibration-card recording-profile-builder">
      <h2>{translate("Salva il profilo di registrazione")}</h2>
      <p>
        {report.extended
          ? translate(
              "Profilo prudente: metà correzione, massimo ±1,5 dB. Niente boost dei bassi profondi o recupero a 16 kHz; le bande incerte restano invariate.",
            )
          : translate(
              "Profilo della prova precedente: massimo ±3 dB. Avvia la nuova prova estesa per ottenere il profilo prudente e i limiti per frequenza.",
            )}
      </p>
      <div className="calibration-proposal">
        {eq.map((v, i) => (
          <span key={i}>
            {report.bands[i].frequency >= 1000
              ? `${report.bands[i].frequency / 1000}k`
              : report.bands[i].frequency}
            <b>
              {v > 0 ? "+" : ""}
              {v.toFixed(report.extended ? 2 : 1)} {translate("dB")}
            </b>
          </span>
        ))}
      </div>
      <p className="caption">
        {translate("Bilanciamento: L")}
        {balance[0].toFixed(1)} {translate(" dB · R ")}
        {balance[1].toFixed(1)}{" "}
        {translate(
          "dB. Il controllo true peak tiene conto del profilo prima dell’uscita e della codifica NR.",
        )}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void run(async () => {
            const profile = await call<RecordingProfile>(
              "create_recording_profile",
              {
                report,
                conditions: {
                  sample_rate: sampleRate,
                  name: name.trim(),
                  deck: deck.trim(),
                  tape: tape.trim(),
                  output: output.trim(),
                  input: input.trim(),
                  notes: notes.trim(),
                },
              },
            );
            saveRecordingProfile(profile, copiedEq && moveEq);
            notify(
              translate(
                "Profilo salvato e attivo. Confermalo con una registrazione musicale; puoi annullare l’attivazione.",
              ),
            );
          }, translate("Creo il profilo di registrazione…"));
        }}
      >
        <fieldset disabled={locked || capturing || !report.correction_allowed}>
          <label className="field">
            <span>{translate("Nome profilo · obbligatorio")}</span>
            <input
              aria-label={translate("Nome profilo")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={200}
            />
          </label>
          <details className="disclosure">
            <summary>{translate("Dettagli della prova · facoltativi")}</summary>
            <p className="caption">
              {translate(
                "Puoi salvare subito con il solo nome. Dispositivi e frequenza sono precompilati con le impostazioni disponibili: puoi correggerli se la prova è stata fatta con altre impostazioni.",
              )}
            </p>
            <div className="profile-fields">
              {fields.map(([label, value, set, placeholder]) => (
                <label className="field" key={label}>
                  <span>
                    {label} {translate(" · facoltativo")}
                  </span>
                  <input
                    aria-label={label}
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    placeholder={placeholder}
                    maxLength={200}
                    list={
                      label === "Uscita usata nella prova"
                        ? "profile-output-devices"
                        : label === "Ingresso usato nella prova"
                          ? "profile-input-devices"
                          : undefined
                    }
                  />
                </label>
              ))}
            </div>
            <datalist id="profile-output-devices">
              {outputs.map((d) => (
                <option key={d.index} value={d.name} />
              ))}
            </datalist>
            <datalist id="profile-input-devices">
              {inputs.map((d) => (
                <option key={d.index} value={d.name} />
              ))}
            </datalist>
            <Select
              label={translate("Frequenza usata per registrare la prova")}
              value={sampleRate}
              onChange={(v) => setSampleRate(Number(v))}
            >
              {[44100, 48000, 88200, 96000].map((rate) => (
                <option key={rate} value={rate}>
                  {(rate / 1000).toLocaleString(localeTag())} {translate("kHz")}
                </option>
              ))}
            </Select>
            <label className="field">
              <span>
                {translate("Posizione dei controlli e note · facoltative")}
              </span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                maxLength={1000}
                placeholder={translate(
                  "Volume del computer, REC LEVEL, selettore del nastro…",
                )}
              />
            </label>
            <p className="caption">
              {translate(
                "Indica i dispositivi e i controlli realmente usati durante la prova. Le impostazioni attuali del computer possono essere diverse. Il profilo non imposta le manopole fisiche e non calibra il Dolby.",
              )}
            </p>
          </details>
          {copiedEq && (
            <label className="profile-toggle">
              <input
                type="checkbox"
                checked={moveEq}
                onChange={(e) => setMoveEq(e.target.checked)}
              />{" "}
              {translate(
                "Rimuovi dall’EQ musicale la curva della vecchia prova, per evitare una doppia correzione",
              )}
            </label>
          )}
          <button
            className="button primary"
            type="submit"
            disabled={
              alreadySaved ||
              !native ||
              !name.trim() ||
              !report.correction_allowed
            }
          >
            {alreadySaved
              ? translate("Profilo salvato")
              : translate("Salva e usa profilo")}
          </button>
        </fieldset>
      </form>
      {!report.correction_allowed && (
        <p className="inline-warning">
          {translate(
            "Creazione bloccata: risolvi gli avvisi sulla qualità della prova e ripeti l’acquisizione.",
          )}
        </p>
      )}
      <p className="caption">
        {translate(
          "Il profilo viene salvato nella libreria locale e nel progetto. Per confermare il miglioramento registra e riascolta un passaggio musicale. Cambiando nastro o regolazioni, crea un nuovo profilo.",
        )}
      </p>
    </section>
  );
}
