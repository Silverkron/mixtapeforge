---
id: "playback-speed-problems"
lang: "es"
title: "La cassette va demasiado rápida o lenta: qué revisar"
description: "Distingue error constante, cinta frenada, velocidad original distinta y transporte inestable."
primaryKeyword: "La cassette va demasiado rápida o lenta"
secondaryKeywords: ["afinación que oscila","prueba de velocidad","wow y flutter","Reproducción temblorosa"]
searchIntent: "diagnosis"
answer: "Una cinta constantemente demasiado rápida sube de tono y acorta la música; demasiado lenta baja de tono y la alarga. Es distinto de una afinación que oscila. Identifica el síntoma antes de buscar un ajuste del motor."
category: "troubleshooting"
image: "portable"
updated: "2026-11-01"
sources: [{"title": "Sony · 00027611", "url": "https://www.sony.com/electronics/support/audio-video-audio-components/tc-w530/articles/00027611"}, {"title": "Anaxwaves · NAK T-100", "url": "https://www.anaxwaves.com/NAKT100/"}]

guideType: "troubleshooting"
prerequisites: []
next: ["speed-test"]
related: ["wobbly-playback", "wow-flutter", "calibration-tapes"]
---

Una cinta constantemente demasiado rápida sube de tono y acorta la música; demasiado lenta baja de tono y la alarga. Es distinto de una [afinación que oscila](../wobbly-playback/). Identifica el síntoma antes de buscar un ajuste del motor.

## Comprobaciones sin abrir el equipo

Necesitas una grabación conocida, el manual y, para un portátil, pilas nuevas o la fuente indicada. Cronómetro y original ayudan, pero no sustituyen una cinta de referencia.

1. Comprueba velocidad normal y centra el control pitch si existe. No compares ediciones, remasterizaciones o actuaciones distintas como si fueran idénticas.
2. Prueba esa cinta conocida y otra sana. Anota si ambas suenan siempre agudas/graves o cambian de tono durante la reproducción.
3. En un portátil repite con pilas nuevas. Comprueba el movimiento; detén si la cinta arrastra o se enreda.
4. Si puedes, compara en otra pletina funcional. Una cinta incorrecta en ambas pudo grabarse a velocidad errónea; todas incorrectas en un solo lector apuntan a ese lector.
5. Para medir de verdad, consigue una cinta de referencia con tono documentado de 3.000 o 3.150 Hz y sigue la [prueba de velocidad](../speed-test/).

## Entender el valor

Una referencia certificada de 3.000 Hz reproducida a 3.030 Hz indica +1 %: `(3030 / 3000 − 1) × 100`. Es un ejemplo de cálculo, no una medida realizada aquí. Usa la frecuencia nominal indicada; confundir 3.000 y 3.150 crea un error aparente grande.

Grabar y reproducir un tono propio en la misma pletina no determina velocidad absoluta: errores similares pueden cancelarse. No ajustes trimmers internos de oído. Tras corregir según el manual de servicio, verifica aparte [wow y flutter](../wow-flutter/): una media correcta no garantiza movimiento estable.
