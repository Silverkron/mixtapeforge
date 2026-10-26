# Componenti di terze parti

Il font Silkscreen è incluso in `public/fonts` con il relativo file `OFL.txt`, copiato dal riferimento TapeBytes autorizzato per questo progetto.

Le dipendenze JavaScript e Rust sono registrate nei rispettivi manifest e lockfile. Tauri, React, Lucide, CPAL, Symphonia, ebur128, rustfft, ringbuf, hound, rfd e sha2 mantengono le licenze dei rispettivi autori. Prima di distribuire pubblicamente il prodotto occorre generare l'inventario completo della build, includere gli avvisi richiesti. La licenza del codice originale è GPL-3.0-only (vedi LICENSE).

FFmpeg è stato usato soltanto come strumento locale per generare il corpus di test; non è incluso nel pacchetto dell'app. Nessun codice o binario MixtapeNerd è stato copiato. La demo contiene segnali sintetici generati dal prototipo.

## CPAL 0.15.3

CPAL is vendored under Apache-2.0 in `src-tauri/vendor/cpal-0.15.3`, including its original LICENSE. A local CoreAudio device-enumeration patch and the removed unused import are documented in INTEGRATION.md. Cargo uses this source through `[patch.crates-io]`.

## libdolbyb 1.1

Copyright (C) 2025 Martin Guy, based on dolbybcsoftwaredecode by Richard Evans (2018). GPL version 2, not LGPL. Source and original notices: `src-tauri/vendor/libdolbyb-1.1`. Local changes are documented in `INTEGRATION.md`; the archive hash is pinned there. No Dolby certification or endorsement is claimed.

MixtapeForge's original code (excluding the standalone NR utility) is distributed under GPL-3.0-only. Third-party components retain their own notices and licenses. When distributing binaries, provide the complete corresponding source, including this vendor directory, adapter, manifests, lockfiles and build scripts, under the applicable terms. No public release or source publication is performed by this local build.

## Separazione del programma NR

`cassette-nr` (`src-tauri/nr_cli.c`, `nr_bridge.c` e vendor libdolbyb) è un programma autonomo GPL-2.0-only. Non è collegato alla libreria Rust o al binario principale GPL-3.0-only. L'app gli passa normali file WAV e argomenti CLI. CPAL, hound e Tao restano soltanto nel processo dell'app. Gli avvisi e il testo GPLv2 del codec sono inclusi nelle risorse del pacchetto.

## VST3 host

The standalone cassette-vst helper uses JUCE 7.0.12 under GPLv3. Source is vendored in src-tauri/vendor/juce with its license and dependency notices; archive SHA256 94e3b35e1990cd67f59736bb5e1eff1cfd9590b16fea82696f309a8f59452434. Local SDK compatibility patch removes unused macOS screen capture. Third-party plugins are independently installed by the user and are not redistributed with this app. Valhalla Freq Echo is used only for local integration verification.

## Artwork fonts

Barlow Medium and Bold, Barlow Condensed Bold: Copyright 2017 The Barlow Project Authors (https://github.com/jpt/barlow).
IBM Plex Mono Medium: Copyright © 2017 IBM Corp. with Reserved Font Name "Plex".
Distributed unmodified under the SIL Open Font License 1.1. Original font files and full license texts are in `public/fonts/barlow`, `public/fonts/barlowcondensed` and `public/fonts/ibmplexmono`. Sources and SHA-256 checksums are recorded in `src/artwork/font-sources.json`. The fonts are served locally, embedded in SVG exports with their license texts, and rendered as vector outlines in PDFs. No system-wide font installation is performed.

## ttf-parser 0.25.1

TrueType parsing and outlines, https://github.com/harfbuzz/ttf-parser, distributed under MIT OR Apache-2.0. Used to measure and draw bundled cover fonts. Original license files are included in the application bundle.

## keepawake 0.6.1

Native temporary display/idle-sleep inhibition, https://github.com/segevfiner/keepawake-rs. Included as a Rust dependency; no command-line tool or external installation required. Original license follows.

MIT License

Copyright (c) 2022 Segev Finer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


## Additional cover fonts

Bebas Neue (Ryoichi Tsunekawa) and Courier Prime (Quote-Unquote Apps / Alan Dague-Greene), distributed unmodified under SIL OFL 1.1. Font files and licenses are bundled in `public/fonts/bebasneue` and `public/fonts/courierprime`; sources and hashes are in `src/artwork/font-sources.json`.
