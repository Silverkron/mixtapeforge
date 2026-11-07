import { t as translate } from "./i18n";
import {
  SlidersHorizontal,
  AlertTriangle,
  Check,
  Download,
  FolderOpen,
  HelpCircle,
  History,
  Moon,
  Palette,
  Plus,
  Redo2,
  Save,
  Settings2,
  Sun,
  CassetteTape as Tape,
  Undo2,
  WandSparkles,
  X,
} from "lucide-react";
import { call, native } from "./backend";
import { useEffect } from "react";
import { IconButton } from "./components";
import { time } from "./types";
import { StudioContext } from "./studio-context";
import { useStudioController } from "./useStudioController";
import { CalibrationView } from "./views/CalibrationView";
import { ArtworkView } from "./views/ArtworkView";
import { ComposeView } from "./views/ComposeView";
import { MasteringView } from "./views/MasteringView";
import { SessionsView } from "./views/SessionsView";
import { SettingsView } from "./views/SettingsView";
import { StudioDialog } from "./views/StudioDialog";
import { JobProgress } from "./views/JobProgress";
import { StudioView } from "./views/StudioView";
import { DesktopWorkbench } from "./views/DesktopWorkbench";
import { WorkspaceViewport } from "./views/WorkspaceViewport";
import { RecoveryNotice } from "./views/RecoveryNotice";
import { TrackInspector } from "./views/TrackInspector";

import { useLocale } from "./i18n";
export function App() {
  const locale = useLocale();
  useEffect(() => {
    if (native) void call("set_language", { locale }).catch(() => {});
  }, [locale]);
  const controller = useStudioController();
  const {
    project,
    page,
    setPage,
    panel,
    setPanel,
    dialog,
    side,
    busy,
    toast,
    setToast,
    setDialog,
    setFitPreview,
    theme,
    setTheme,
    saved,
    edit,
    locked,
    importTracks,
    save,
    open,
    undo,
    redo,
    history,
  } = controller;
  const panelTitle =
    panel === "master"
      ? translate("Controlli audio")
      : panel === "settings"
        ? translate("Impostazioni")
        : panel === "sessions"
          ? translate("Registro operazioni")
          : panel === "track"
            ? translate("Modifica brano")
            : translate("Durate e pause");
  const docked = panel === "master" || panel === "track" || panel === "tape";
  const modalPanel = panel === "settings" || panel === "sessions";
  const panelHeading = (
    <header className="inspector-heading">
      <div>
        <h2 id="panel-title" tabIndex={docked ? -1 : undefined}>
          {panelTitle}
        </h2>
        {!docked && (
          <p>
            {panel === "sessions"
              ? translate(
                  "Preparazioni, esportazioni e avvii audio su questo computer.",
                )
              : translate("Preferenze e gestione dei file.")}
          </p>
        )}
      </div>
      <IconButton
        label={translate("Chiudi pannello")}
        disabled={busy}
        onClick={() => setPanel(null)}
      >
        <X size={20} />
      </IconButton>
    </header>
  );
  const output = controller.outputs.find(
    (item) => item.index === controller.device,
  );
  const navigate = (next: typeof page) => {
    if (docked && window.innerWidth <= 1080 && !busy) setPanel(null);
    setPage(next);
  };
  const navigation = (
    <nav
      className="primary-tabs studio-sidebar"
      aria-label={translate("Viste del progetto")}
    >
      <button
        className={page === "compose" ? "active" : ""}
        aria-current={page === "compose" ? "page" : undefined}
        onClick={() => navigate("compose")}
      >
        <Tape size={16} />
        {translate("Mixtape")}
      </button>
      <button
        className={page === "calibration" ? "active" : ""}
        aria-current={page === "calibration" ? "page" : undefined}
        onClick={() => navigate("calibration")}
      >
        <SlidersHorizontal size={16} />
        {translate("Calibrazione")}
      </button>
      <button
        className={page === "artwork" ? "active" : ""}
        aria-current={page === "artwork" ? "page" : undefined}
        onClick={() => navigate("artwork")}
      >
        <Palette size={16} />
        {translate("Copertina")}
      </button>
    </nav>
  );
  return (
    <StudioContext.Provider value={controller}>
      <div className="app-shell compact-app classic-app">
        <div className="main-surface" inert={modalPanel || !!dialog}>
          <a className="skip-link" href="#main-content">
            {translate("Vai al contenuto")}
          </a>
          <header className="app-bar">
            <a
              href="#"
              className="compact-brand"
              aria-label={translate("MixtapeForge — Mixtape")}
              onClick={(e) => {
                e.preventDefault();
                navigate("compose");
              }}
            >
              <Tape size={23} />
              <span>{translate("MixtapeForge")}</span>
            </a>

            <div className="app-tools">
              <IconButton
                label={translate("Apri progetto")}
                disabled={locked}
                onClick={open}
              >
                <FolderOpen size={17} />
              </IconButton>
              <button className="button small" disabled={locked} onClick={save}>
                <Save size={15} />
                {translate("Salva")}
              </button>
              <button
                type="button"
                className="button small rack-launch"
                aria-pressed={panel === "master"}
                onClick={() =>
                  setPanel(panel === "master" && !busy ? null : "master")
                }
              >
                <SlidersHorizontal size={16} />
                {translate("Controlli audio")}
              </button>
              <IconButton
                label={translate("Registro operazioni")}
                onClick={() => setPanel("sessions")}
              >
                <History size={17} />
              </IconButton>
              <IconButton
                label={translate("Impostazioni")}
                onClick={() => setPanel("settings")}
              >
                <Settings2 size={17} />
              </IconButton>
              <IconButton
                label={
                  theme === "dark"
                    ? translate("Tema chiaro")
                    : translate("Tema scuro")
                }
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
              </IconButton>
              <IconButton
                label={translate("Guida rapida")}
                onClick={() => setDialog("help")}
              >
                <HelpCircle size={17} />
              </IconButton>
            </div>
          </header>
          {!native && (
            <div className="preview-banner">
              {translate(
                "Anteprima grafica · Audio, importazione ed esportazione sono disponibili nell’app desktop.",
              )}
            </div>
          )}
          {controller.capturing && (
            <div className="capture-notice" role="status">
              <span>{translate("Acquisizione del ritorno in corso")}</span>
              <button
                className="button small"
                disabled={busy}
                onClick={() => controller.captureReturn()}
              >
                {translate("Ferma acquisizione")}
              </button>
            </div>
          )}
          <RecoveryNotice />
          <DesktopWorkbench
            navigation={navigation}
            inspector={
              docked && (
                <aside
                  id="studio-inspector"
                  className="workbench-inspector"
                  aria-labelledby="panel-title"
                >
                  {panelHeading}
                  <div className="inspector-body" key={panel}>
                    {panel === "master" ? (
                      <MasteringView />
                    ) : (
                      <TrackInspector />
                    )}
                  </div>
                </aside>
              )
            }
          >
            <WorkspaceViewport page={page}>
              <div className="project-bar">
                <div className="project-heading">
                  <label className="sr-only" htmlFor="project-title">
                    {translate("Titolo progetto")}
                  </label>
                  <input
                    id="project-title"
                    value={project.title}
                    disabled={locked}
                    onChange={(e) =>
                      edit((p) => {
                        p.title = e.target.value;
                      })
                    }
                  />
                  <span>
                    {project.tracks.length} {translate(" brani ·")}{" "}
                    {time(
                      controller.info.durations[0] +
                        controller.info.durations[1],
                    )}{" "}
                    {translate("totali")}
                    <span className="save-note">· {translate(saved)}</span>
                  </span>
                </div>
                <div className="project-history">
                  <IconButton
                    label={translate("Annulla modifica")}
                    disabled={locked || !undo.length}
                    onClick={() => history()}
                  >
                    <Undo2 size={16} />
                  </IconButton>
                  <IconButton
                    label={translate("Ripeti modifica")}
                    disabled={locked || !redo.length}
                    onClick={() => history(true)}
                  >
                    <Redo2 size={16} />
                  </IconButton>
                </div>
              </div>
              <header className="workspace-header" hidden={page === "compose"}>
                <div>
                  <h1>
                    {translate(
                      page === "compose"
                        ? "Mixtape"
                        : page === "calibration"
                          ? "Calibrazione"
                          : "Copertina",
                    )}
                  </h1>
                </div>
                <div className="workspace-header-actions">
                  {page !== "compose" && controller.playing && (
                    <>
                      <button
                        className="button small"
                        onClick={controller.togglePause}
                      >
                        {translate(controller.paused ? "Ascolta" : "Pausa")}
                      </button>
                      <button
                        className="button small"
                        onClick={() => controller.stop()}
                      >
                        {translate("Stop")}
                      </button>
                    </>
                  )}
                </div>
              </header>
              <section
                className="player-unit"
                hidden={page !== "compose"}
                aria-label={translate("Player della cassetta")}
              >
                <StudioView />
              </section>
              <div hidden={page !== "compose"}>
                <div
                  className="mix-toolbar"
                  aria-label={translate("Strumenti della mixtape")}
                >
                  <label className="tape-select">
                    <span>{translate("Cassetta")}</span>
                    <select
                      aria-label={translate("Formato cassetta")}
                      value={project.tape}
                      disabled={locked}
                      onChange={(e) =>
                        edit((p) => {
                          p.tape = e.target.value;
                          if (p.tape !== "Custom")
                            p.capacity = [
                              Number(p.tape.slice(1)) * 30,
                              Number(p.tape.slice(1)) * 30,
                            ];
                        })
                      }
                    >
                      {["C46", "C60", "C90", "C120", translate("Custom")].map(
                        (t) => (
                          <option key={t} value={t}>
                            {t === "Custom" ? translate("Personalizzata") : t}
                          </option>
                        ),
                      )}
                    </select>
                  </label>
                  <button
                    className="button small"
                    onClick={() => setPanel("tape")}
                  >
                    {translate("Durate e pause")}
                  </button>

                  <button
                    className="button small"
                    disabled={locked || !project.tracks.length}
                    onClick={() => {
                      setFitPreview(null);
                      setDialog("fit");
                    }}
                  >
                    <WandSparkles size={15} />
                    {translate("Distribuisci")}
                  </button>
                  <button
                    className="button small"
                    disabled={locked || !project.sides[side].length || !native}
                    onClick={() => setDialog("export")}
                  >
                    <Download size={14} />
                    {translate("Esporta WAV")}
                  </button>
                  <span className="toolbar-spacer" />
                  <button
                    className="button small"
                    disabled={locked}
                    onClick={() => importTracks(true)}
                    title={translate("Importa cartella e sottocartelle")}
                  >
                    <FolderOpen size={15} />
                    {translate("Cartella")}
                  </button>
                  <button
                    className="button primary small"
                    disabled={locked}
                    onClick={() => importTracks()}
                  >
                    <Plus size={16} />
                    {translate("Aggiungi brani")}
                  </button>
                </div>
                <div className="mix-workspace">
                  <div className="track-workspace">
                    <ComposeView />
                  </div>
                </div>
              </div>
              <div hidden={page !== "artwork"}>
                <ArtworkView />
              </div>
              <div hidden={page !== "calibration"}>
                <CalibrationView />
              </div>
            </WorkspaceViewport>
          </DesktopWorkbench>
          <footer
            className="studio-status"
            aria-label={translate("Stato dello studio")}
          >
            <span
              className="studio-status-state"
              data-live={controller.playing || controller.capturing}
              role="status"
            >
              {busy
                ? controller.job.label
                : controller.capturing
                  ? translate("Acquisizione in corso")
                  : controller.recording
                    ? "REC"
                    : controller.playing
                      ? translate(controller.paused ? "PAUSA" : "IN USCITA")
                      : translate("FERMO")}
            </span>
            <span title={output?.name}>
              {output?.name ?? translate("Nessuna uscita disponibile")}
            </span>
            <span>
              {project.processing.sample_rate / 1000} {translate("kHz")}
            </span>
            <span className="studio-status-saved">{translate(saved)}</span>
          </footer>
        </div>
        {modalPanel && (
          <div
            className="drawer-backdrop"
            inert={!!dialog}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget && !busy) setPanel(null);
            }}
          >
            <section
              className="modal utility-drawer"
              role="dialog"
              aria-modal="true"
              aria-labelledby="panel-title"
            >
              {panelHeading}
              <div className="drawer-content">
                {busy && <JobProgress overlay />}
                <SettingsView />
                <SessionsView />
              </div>
            </section>
          </div>
        )}
        {toast && (
          <div
            className={`toast ${toast.error ? "error" : ""}`}
            role={toast.error ? "alert" : "status"}
          >
            {toast.error ? <AlertTriangle size={18} /> : <Check size={18} />}
            <p>{toast.message}</p>
            <IconButton
              label={translate("Chiudi messaggio")}
              onClick={() => setToast(null)}
            >
              <X size={16} />
            </IconButton>
          </div>
        )}
        <StudioDialog />
      </div>
    </StudioContext.Provider>
  );
}
