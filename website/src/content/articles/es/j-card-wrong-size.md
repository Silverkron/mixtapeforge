---
id: "j-card-wrong-size"
lang: "es"
title: "¿Por qué mi J-card se imprime al tamaño equivocado?"
description: "No cambies el tamaño del diseño hasta distinguir entre error del archivo, escala de impresión y pliegues."
primaryKeyword: "¿Por qué mi J-card se imprime al tamaño equivocado?"
secondaryKeywords: ["las medidas de la plantilla","ambos formatos","comprobar encaje y lectura","Cómo crear e imprimir una J-card al tamaño correcto"]
searchIntent: "diagnosis"
answer: "No cambies el tamaño del diseño hasta distinguir entre error del archivo, escala de impresión y pliegues. Una regla y una copia fallida suelen bastar."
category: "covers"
image: "covers"
updated: "2026-11-01"
sources: [{"title": "Adobe Acrobat — impresión a tamaño real", "url": "https://helpx.adobe.com/acrobat/desktop/print-documents/set-up-and-print-pdfs/page-size.html"}]
guideType: "troubleshooting"
related: ["print-j-card", "j-card-dimensions", "a4-letter-j-cards"]
prerequisites: ["print-j-card"]
next: ["print-j-card"]
---

## Mide primero

1. Abre el PDF exportado, no una captura. Consulta [las medidas de la plantilla](../j-card-dimensions/): MixtapeForge utiliza 104,8 × 101,6 mm desplegada.
2. Mide ambos lados antes de cortar. En impresión directa comprueba también la referencia de 50 mm.
3. Divide medida impresa entre prevista. **Ejemplo hipotético:** 48 en lugar de 50 mm significa escala del 96 %. Una reducción similar en ambas direcciones apunta a Ajustar/Reducir, no a pliegues incorrectos.
4. Reimprime a Tamaño real/100 %, con papel y orientación correctos. Desactiva también la escala del controlador de impresora.

## Sigue el síntoma

- **Todo pequeño:** corrige la escala antes de estirar el SVG.
- **Medidas correctas, borde cortado:** revisa márgenes imprimibles, posición y formato. A4 y Letter son distintos: consulta [ambos formatos](../a4-letter-j-cards/).
- **Tamaño correcto desplegado, caja no cierra:** revisa pliegues y grosor; compara una prueba de papel normal en la misma caja.
- **Solo falta texto:** busca nombres truncados o problemas de fuente en el archivo exportado.

Guarda archivo y ajustes tras [comprobar encaje y lectura](../print-j-card/).

**Resuelto:** ambas medidas verificadas, bordes completos, pliegues correctos y cierre sin presión.
