---
id: "distorted-recordings"
lang: "es"
title: "La grabación en cassette distorsiona: encuentra la etapa saturada"
description: "Comprueba master, interfaz, entrada y cinta por separado sin bajar todo a ciegas."
primaryKeyword: "La grabación en cassette distorsiona"
secondaryKeywords: ["saturación de agudos","guía de niveles","medición de distorsión","Mide la distorsión del casete sin confundirla con el siseo"]
searchIntent: "diagnosis"
answer: "Voces ásperas, bajos borrosos o platillos agresivos no significan automáticamente una cinta mala. La distorsión puede aparecer en archivo, efectos, salida de interfaz, entrada de pletina, cinta o captura. Encuentra el primer punto incorrecto antes de cambiar el perfil."
category: "troubleshooting"
image: "portable"
updated: "2026-11-01"
sources: [{"title": "Sony · 00027549", "url": "https://www.sony.com/electronics/support/audio-video/tcm-230dv/articles/00027549"}, {"title": "Audacity · Grabación de prueba", "url": "https://manual.audacityteam.org/man/tutorial_making_a_test_recording.html"}]

guideType: "troubleshooting"
prerequisites: []
next: ["recording-levels", "high-frequency-saturation"]
related: ["distortion-test", "normalization-compression-eq", "loopback-round-trip"]
---

## Compara etapa por etapa

Necesitas una cinta virgen prescindible, una fuente limpia y auriculares. Para capturar usa entradas de línea, no sensibilidad de micrófono, y deja margen antes del clipping digital: el límite que recorta los picos.

1. Escucha directamente la fuente a volumen moderado sin EQ, compresión ni plugins añadidos. Si ya distorsiona, corrígela o sustitúyela primero.
2. Escucha la salida de la interfaz hacia la pletina y revisa avisos de pico. Bajar la salida no elimina clipping ya guardado en el archivo.
3. Graba un fragmento con tipo de cinta correcto y un solo codificador NR. Anota REC LEVEL y ajustes de salida.
4. Repite con REC LEVEL claramente inferior, manteniendo salida, cinta y efectos. Compara a volumen de escucha parecido.
5. Si ambos ensayos distorsionan, baja la salida de la interfaz y repite. La entrada de la pletina puede saturar antes de REC LEVEL. No vuelvas a subir inmediatamente todas las etapas posteriores.
6. Si la escucha directa es limpia pero la captura no, baja la ganancia de entrada de la interfaz y captura de nuevo.

## Interpreta el cambio

Mejorar al bajar REC LEVEL sugiere exceso de nivel de grabación, no necesariamente una avería. Si mejoran sobre todo los agudos fuertes, investiga la [saturación de agudos](../high-frequency-saturation/). Distorsión igual con niveles bajos y diferentes cintas sanas puede requerir servicio.

Establece un ajuste con la [guía de niveles](../recording-levels/). Una [medición de distorsión](../distortion-test/) necesita tono y método adecuados: la forma de onda musical no da un porcentaje THD fiable. Conserva ajustes y mejor comparación, y reactiva los efectos uno a uno.
