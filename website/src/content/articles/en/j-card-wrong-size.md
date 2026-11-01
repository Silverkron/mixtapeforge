---
id: "j-card-wrong-size"
lang: "en"
title: "Why Does My J-Card Print at the Wrong Size?"
description: "Do not resize the design until you know whether the error is in the file, print scaling or folding."
primaryKeyword: "Why Does My J-Card Print at the Wrong Size?"
secondaryKeywords: ["the template guide","printing on either format","the proof fits and reads clearly","How to Make and Print a Cassette J-Card at the Correct Size"]
searchIntent: "diagnosis"
answer: "Do not resize the design until you know whether the error is in the file, print scaling or folding. A ruler and one failed print usually narrow it down."
category: "covers"
image: "covers"
updated: "2026-11-01"
sources: [{"title": "Adobe Acrobat — page size and Actual size", "url": "https://helpx.adobe.com/acrobat/desktop/print-documents/set-up-and-print-pdfs/page-size.html"}]
guideType: "troubleshooting"
related: ["print-j-card", "j-card-dimensions", "a4-letter-j-cards"]
prerequisites: ["print-j-card"]
next: ["print-j-card"]
---

## Measure before changing anything

1. Open the exported PDF, not a screenshot. Check the intended card dimensions in [the template guide](../j-card-dimensions/). MixtapeForge’s flat card is 104.8 × 101.6 mm.
2. Measure both printed dimensions before cutting. If using direct app printing, measure the 50 mm reference too.
3. Compare the two ratios: printed length divided by intended length. **Hypothetical example:** a 50 mm reference printed as 48 mm means 96% scale. Similar reduction in both directions points to Fit/Shrink, not incorrect folds.
4. Reprint one sheet at Actual size/100%, with the correct paper and orientation. Disable additional scaling in the printer driver as well as the PDF viewer.

## Follow the symptom

- **All dimensions too small:** correct scale first. Do not compensate by stretching the SVG.
- **Right size but one edge missing:** inspect printable margins, placement and paper size. A4 and Letter are different sheets; see [printing on either format](../a4-letter-j-cards/).
- **Flat size correct but case will not close:** check fold positions and paper thickness. Compare a plain-paper dummy in the same case.
- **Text missing but card size correct:** look for clipped long names or a font problem in the exported file, not a scaling error.

Keep the successful file and printer settings once [the proof fits and reads clearly](../print-j-card/).

**Resolved:** both dimensions verified, no clipped edges, folds checked, case closes without pressure.
