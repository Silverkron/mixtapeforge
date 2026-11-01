---
id: "j-card-wrong-size"
lang: "de"
title: "Warum wird meine J-Card in falscher Größe gedruckt?"
description: "Ändere die Grafikgröße erst, wenn klar ist, ob Datei, Druckskalierung oder Faltung falsch sind."
primaryKeyword: "Warum wird meine J-Card in falscher Größe gedruckt?"
secondaryKeywords: ["die Vorlagenmaße","beide Formate","bestandener Passform- und Leseprobe","Eine J-Card in richtiger Größe erstellen und drucken"]
searchIntent: "diagnosis"
answer: "Ändere die Grafikgröße erst, wenn klar ist, ob Datei, Druckskalierung oder Faltung falsch sind. Ein Lineal und ein Fehldruck reichen meist zur Eingrenzung."
category: "covers"
image: "covers"
updated: "2026-11-01"
sources: [{"title": "Adobe Acrobat — Druck in tatsächlicher Größe", "url": "https://helpx.adobe.com/acrobat/desktop/print-documents/set-up-and-print-pdfs/page-size.html"}]
guideType: "troubleshooting"
related: ["print-j-card", "j-card-dimensions", "a4-letter-j-cards"]
prerequisites: ["print-j-card"]
next: ["print-j-card"]
---

## Zuerst messen

1. Öffne das exportierte PDF statt eines Screenshots. Prüfe [die Vorlagenmaße](../j-card-dimensions/): MixtapeForge verwendet flach 104,8 × 101,6 mm.
2. Miss beide Seiten vor dem Schneiden. Beim direkten App-Druck auch die 50-mm-Referenz prüfen.
3. Teile Druckmaß durch Sollmaß. **Rechenbeispiel:** 48 statt 50 mm entsprechen 96 %. Eine ähnliche Verkleinerung beider Richtungen deutet auf Anpassen/Verkleinern hin.
4. Drucke erneut mit Tatsächliche Größe/100 %, richtigem Papier und Orientierung. Deaktiviere auch die Skalierung im Druckertreiber.

## Nach Symptom vorgehen

- **Alles kleiner:** zuerst Skalierung korrigieren, SVG nicht auseinanderziehen.
- **Maße stimmen, Rand fehlt:** druckbare Ränder, Position und Papierformat prüfen. A4 und Letter unterscheiden sich; siehe [beide Formate](../a4-letter-j-cards/).
- **Flach richtig, Hülle schließt nicht:** Falze und Papierdicke prüfen; Normalpapiermuster in derselben Hülle vergleichen.
- **Nur Text fehlt:** lange Namen oder Schriftprobleme im Export prüfen.

Behalte Datei und Einstellungen nach [bestandener Passform- und Leseprobe](../print-j-card/).

**Behoben:** beide Maße geprüft, keine abgeschnittenen Ränder, richtige Falze, Hülle schließt druckfrei.
