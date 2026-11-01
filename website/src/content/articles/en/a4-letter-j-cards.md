---
id: "a4-letter-j-cards"
lang: "en"
title: "Printing J-Cards on A4 and US Letter: Scale, Margins and Placement"
description: "A4 and US Letter are paper sizes, not cassette sizes."
primaryKeyword: "Printing J-Cards on A4 and US Letter"
secondaryKeywords: ["the general print checklist","diagnose a uniform size error","How to Make and Print a Cassette J-Card at the Correct Size","Why Does My J-Card Print at the Wrong Size?"]
searchIntent: "task"
answer: "A4 and US Letter are paper sizes, not cassette sizes. Changing the sheet must not scale the J-card itself. A4 is 210 × 297 mm; Letter is 215.9 × 279.4 mm."
category: "covers"
image: "covers"
updated: "2026-11-01"
sources: [{"title": "Adobe Acrobat — page size and Actual size", "url": "https://helpx.adobe.com/acrobat/desktop/print-documents/set-up-and-print-pdfs/page-size.html"}]
guideType: "procedure"
related: ["print-j-card", "j-card-wrong-size", "j-card-dimensions"]
prerequisites: []
next: ["print-j-card"]
---

## Print the same card on another sheet

You need the PDF, a viewer with actual-size printing and a ruler. MixtapeForge currently exports an **A4 PDF** and its direct-print stylesheet requests A4; it does not offer a dedicated Letter layout.

1. Open the exported PDF in a viewer. Select the paper actually loaded in the printer, including Letter when appropriate.
2. Choose Actual size/100%, not Fit. Inspect the preview for clipping: an A4 page is taller than Letter, even though the small J-card itself may fit comfortably.
3. Print one test. Measure the card’s known 104.8 × 101.6 mm overall dimensions. Do not infer correct scale from a centred preview.
4. If the artwork is clipped, place the exported SVG at its original physical size on a new Letter page in a vector editor and export PDF. Change page size or placement, not the card’s aspect ratio.

## Before sending the file to someone else

State the intended paper and actual-size setting. Ask them to measure one known dimension before printing several copies. Printer margins and driver behaviour can vary even with the same PDF.

Use [the general print checklist](../print-j-card/) to finish, or [diagnose a uniform size error](../j-card-wrong-size/) if the card is too small.

**Confirmed:** sheet matches printer settings, no clipped artwork, card dimensions unchanged, case fit checked.
