# Pacchetti desktop 0.1.0

## Formati

- macOS Apple Silicon: applicazione `.app` distribuita in ZIP e DMG. Minimo dichiarato macOS 13; eseguibile e host VST devono avere lo stesso requisito effettivo. Firma ad hoc locale; nessuna notarizzazione Apple.
- macOS Intel: job nativo `macos-15-intel` predisposto nel workflow; nessuna build Intel locale dichiarata.
- Windows x64: installer NSIS `.exe`, con WebView2 offline e runtime Visual C++ inclusi quando necessari. Richiede compilazione nativa Windows e verifica dell’installer. Nessuna firma Authenticode configurata.

Il pacchetto include il programma principale, l’utility Type B e l’host VST3. I plugin degli utenti restano installazioni separate. Licenze e avvisi sono inclusi nelle risorse.

## Build riproducibile

Installare Node.js 24, Rust stable e CMake; su Windows anche gli strumenti C++ MSVC, su macOS Xcode Command Line Tools. Usare `npm ci`, quindi:

```sh
npm test
cargo test --locked --manifest-path src-tauri/Cargo.toml --lib
cargo run --locked --manifest-path src-tauri/Cargo.toml --features tools --bin verify -- test-results/audio
npm run desktop:build
```

Le utility di verifica sono ora abilitate dalla feature Cargo `tools`: restano disponibili per lo sviluppo e vengono escluse dal pacchetto utente. Per gli altri comandi diagnostici usare lo stesso `--features tools`.

## GitHub Actions

Il workflow **Desktop packages**, avviabile manualmente dalla scheda Actions, compila nativamente macOS Apple Silicon, macOS Intel e Windows x64. Esegue i test e la verifica audio offline, poi allega i pacchetti e SHA-256 come artifact del run, conservati per 30 giorni. Non pubblica una release e non modifica il sito web.

Il repository deve contenere `src-tauri/Cargo.lock`, i sorgenti JUCE e libdolbyb, i font, il frontend e i file di configurazione. I binari NR/VST vengono ricostruiti sul runner. Non caricare `target/`, `node_modules/`, `test-results/`, dati personali o documentazione privata.

## Verifiche del pacchetto macOS

Controllare:

1. Presenza dei soli tre eseguibili `cassette-maker`, `cassette-nr`, `cassette-vst` nel bundle.
2. Architettura corretta, requisito minimo macOS coerente e sole dipendenze di sistema.
3. Firma ad hoc valida (`codesign --verify --deep --strict`).
4. Elaborazione offline con l’encoder NR e avvio dell’host VST del bundle.
5. Estrazione ZIP e integrità DMG, se disponibile.

Queste verifiche non attestano installazione e audio su macOS 13 o su Windows: occorrono prove su tali sistemi. La registrazione sulla piastra resta un test hardware distinto.

Fonti: [Tauri Windows installer](https://v2.tauri.app/distribute/windows-installer/), [firma macOS](https://v2.tauri.app/distribute/sign/macos/), [configurazione bundle](https://v2.tauri.app/reference/config/), [runner GitHub](https://docs.github.com/en/actions/how-tos/write-workflows/choose-where-workflows-run/choose-the-runner-for-a-job).
