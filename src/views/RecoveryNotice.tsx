import { t as translate } from "../i18n";
import { History, X } from "lucide-react";
import { IconButton } from "../components";
import { useStudio } from "../studio-context";

export function RecoveryNotice() {
  const { recover, restoreRecovery, dismissRecovery, locked } = useStudio();
  if (!recover) return null;
  const title = recover.title.trim() || translate("Mixtape senza titolo");
  return (
    <section
      className="recovery"
      aria-label={translate("Riprendi l’ultima sessione")}
    >
      <History size={16} aria-hidden="true" />
      <div className="recovery-copy">
        <span>{translate("Ultima sessione:")}</span>
        <strong title={title}>{title}</strong>
        <span className="recovery-count">
          {recover.tracks.length} {translate(" brani")}
        </span>
      </div>
      <button
        className="button small"
        disabled={locked}
        onClick={restoreRecovery}
      >
        {translate("Riprendi sessione")}
      </button>
      <IconButton
        label={translate("Chiudi avviso di ripristino")}
        disabled={locked}
        onClick={dismissRecovery}
      >
        <X size={14} />
      </IconButton>
    </section>
  );
}
