import { t as translate } from "../i18n";
import type { CalibrationReport } from "../types";
const frequency = (f: number) =>
  f >= 1000 ? translate("{0} kHz", [f / 1000]) : translate("{0} Hz", [f]);
export function CalibrationExams({ report }: { report: CalibrationReport }) {
  const ext = report.extended;
  if (!ext)
    return (
      <p className="caption">
        {translate(
          "Prova precedente da 49 secondi: avvia la nuova sequenza per misurare anche i limiti sulle alte e la stabilità.",
        )}
      </p>
    );
  const unreliable = ext.quality.filter((q) => !q.reliable).length;
  const drops = ext.quality.filter((q) =>
    q.dropout_db.some((v) => v > 3),
  ).length;
  const exams = [
    [
      translate("Risposta a due livelli"),
      translate("{0}/10 bande affidabili", [10 - unreliable]),
    ],
    [
      translate("Limiti per frequenza"),
      translate("{0}/5 limiti stimati", [ext.drive_limits.length]),
    ],
    [
      translate("Bilanciamento stereo"),
      ext.balance_spread_db <= 0.75
        ? translate("Coerente tra le bande")
        : translate("Variabile: trim limitato"),
    ],
    [
      translate("Rumore di fondo"),
      ext.noise_change_db.every((v) => Math.abs(v) <= 3)
        ? translate("Fondo stabile")
        : translate("Fondo variabile"),
    ],
    [
      translate("Stabilità e cali"),
      drops
        ? translate("{0} bande con cali da verificare", [drops])
        : translate("Nessun calo oltre 3 dB nelle finestre misurate"),
    ],
    [
      translate("Clipping digitale"),
      report.clipped_samples.every((n) => n <= report.sample_rate / 1000)
        ? translate("Entro la tolleranza")
        : translate("Oltre la tolleranza: ripeti la prova"),
    ],
  ];
  return (
    <section
      className="calibration-card calibration-exams"
      aria-label={translate("Esami automatici")}
    >
      <h2>{translate("Esito della prova automatica")}</h2>
      <div className="exam-summary">
        {exams.map(([name, result]) => (
          <div key={name}>
            <span>{name}</span>
            <strong>{result}</strong>
          </div>
        ))}
      </div>
      <p className="caption">
        {translate(
          "Le misure descrivono registrazione e riproduzione insieme. Il profilo limita le correzioni incerte; non è una taratura indipendente della piastra.",
        )}
      </p>
      <details className="disclosure">
        <summary>
          {translate("Limiti stimati e affidabilità delle bande")}
        </summary>
        <p className="caption">
          {translate(
            "Limiti di pilotaggio digitale per questa catena, con 1,5 dB di margine rispetto all’ultimo tono affidabile. Il master li controlla per frequenza dopo l’EQ e, se attivo, dopo il Dolby. Non sono valori di flusso magnetico o MOL certificati.",
          )}
        </p>
        <div className="measurement-table">
          <table>
            <thead>
              <tr>
                <th>{translate("Frequenza")}</th>
                <th>{translate("Limite stimato")}</th>
              </tr>
            </thead>
            <tbody>
              {ext.drive_limits.map((l) => (
                <tr key={l.frequency}>
                  <td>{frequency(l.frequency)}</td>
                  <td>
                    {l.max_input_peak_dbfs.toFixed(1)} {translate(" dBFS peak")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="measurement-table">
          <table>
            <thead>
              <tr>
                <th>{translate("Banda")}</th>
                <th>{translate("Risposta a livello medio L/R")}</th>
                <th>{translate("Variazione col livello L/R")}</th>
                <th>{translate("Correzione")}</th>
              </tr>
            </thead>
            <tbody>
              {report.bands.map((b, i) => (
                <tr key={b.frequency}>
                  <td>{frequency(b.frequency)}</td>
                  <td>
                    {ext.medium_response_db[i]
                      .map((v) => v.toFixed(1))
                      .join(" / ")}{" "}
                    {translate("dB")}
                  </td>
                  <td>
                    {ext.level_change_db[i]
                      .map((v) => v.toFixed(1))
                      .join(" / ")}{" "}
                    {translate("dB")}
                  </td>
                  <td>
                    {ext.quality[i].reliable &&
                    ext.level_change_db[i].every((v) => Math.abs(v) <= 1)
                      ? i === 9
                        ? translate("Invariata")
                        : i === 0
                          ? translate("Solo attenuazione")
                          : translate("Prudente")
                      : translate("Esclusa")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
      <details className="disclosure">
        <summary>
          {translate("Distorsione e compressione ai diversi livelli")}
        </summary>
        <p className="caption">
          {translate(
            "Si misurano solo le armoniche sotto Nyquist. Una casella «Non misurabile» non indica assenza di distorsione. Le differenze di livello sono riferite al primo tono sufficientemente sopra il fondo.",
          )}
        </p>
        <div className="measurement-table">
          <table>
            <thead>
              <tr>
                <th>{translate("Tono")}</th>
                <th>{translate("Ingresso")}</th>
                <th>{translate("Compressione L/R")}</th>
                <th>{translate("Armoniche misurate L/R")}</th>
              </tr>
            </thead>
            <tbody>
              {ext.level_tests.map((p, i) => (
                <tr key={i}>
                  <td>{frequency(p.frequency)}</td>
                  <td>
                    {p.input_dbfs} {translate(" dBFS")}
                  </td>
                  <td>
                    {p.compression_db.map((v) => v.toFixed(1)).join(" / ")}{" "}
                    {translate("dB")}
                  </td>
                  <td>
                    {p.distortion_percent
                      ? translate("{0}% ({1} armoniche)", [
                          p.distortion_percent
                            .map((v) => v.toFixed(2))
                            .join(" / "),
                          p.harmonics_measured,
                        ])
                      : translate("Non misurabile")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}
