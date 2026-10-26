import { t as translate, localeTag } from "../i18n";
import { AlertTriangle, Check, Download, History } from "lucide-react";
import { Section } from "../components";

import { useStudio } from "../studio-context";
export function SessionsView() {
  const { panel, sessions } = useStudio();
  return (
    <>
      {panel === "sessions" && (
        <Section
          title={translate("Registro locale")}
          eyebrow={translate("{0} EVENTI", [sessions.length])}
          action={
            <button
              className="button small"
              onClick={() => {
                const blob = new Blob([JSON.stringify(sessions, null, 2)], {
                  type: "application/json",
                });
                const a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                a.download = "cassette-session-log.json";
                a.click();
                setTimeout(() => URL.revokeObjectURL(a.href), 1000);
              }}
            >
              <Download size={14} />
              {translate("Esporta log")}
            </button>
          }
        >
          <div className="panel-content">
            {!sessions.length ? (
              <div className="empty-block">
                <History size={36} />
                <h3>{translate("Nessuna operazione registrata.")}</h3>
                <p>
                  {translate(
                    "Qui trovi la preparazione dei master, gli avvii audio e le eventuali interruzioni. Il registro non conferma che il deck abbia registrato il nastro.",
                  )}
                </p>
              </div>
            ) : (
              <div className="session-list">
                {sessions.map((event, i) => (
                  <div
                    key={`${event.time}-${i}`}
                    className={event.error ? "session-error" : ""}
                  >
                    {event.error ? (
                      <AlertTriangle size={16} />
                    ) : (
                      <Check size={16} />
                    )}
                    <time>
                      {new Date(event.time).toLocaleString(localeTag())}
                    </time>
                    <p>{event.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Section>
      )}
    </>
  );
}
