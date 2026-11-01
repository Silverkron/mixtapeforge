---
id: "recording-sensitivity"
lang: "es"
title: "Compara la sensibilidad de grabación de las cintas con controles fijos"
description: "Mide cuánto nivel devuelven distintas cintas con la misma señal de grabación sin confundir volumen y respuesta tonal."
primaryKeyword: "Compara la sensibilidad de grabación de las cintas con controles fijos"
secondaryKeywords: ["la referencia de nivel adecuada","el balance entre canales","un perfil de grabación","Comprueba el nivel de reproducción con una referencia magnética conocida"]
searchIntent: "evaluation"
answer: "La sensibilidad de grabación describe cuánta señal devuelve una cinta para una entrada de grabación determinada. Dos cintas pueden sonar a distinto volumen aunque no cambien la fuente ni REC LEVEL. Esa diferencia importa al igualar niveles y al usar una reducción de ruido que depende del nivel."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: generador de tonos", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: análisis de espectro", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "NAK T-100: lista de comprobación de medidas", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["playback-level", "channel-balance", "tape-hiss-snr"]
guideType: "measurement"
prerequisites: ["without-reference-tape"]
next: ["bias-adjustment", "recording-profile"]
---

## Elige qué comparación necesitas

Para comparar dos cintas en una pletina, usa controles fijos y la misma prueba. Para un ajuste absoluto de servicio, primero debe comprobarse la reproducción con [la referencia de nivel adecuada](../playback-level/). Una ida y vuelta por una pletina sin calibrar permite una comparación relativa, pero no demuestra la precisión de la etapa de grabación.

Necesitas una interfaz estéreo, Audacity y dos cintas utilizables. Conecta salida → LINE IN y LINE OUT → entrada de línea. Desactiva NR y procesamiento. Selecciona el tipo adecuado para cada cinta y anota cuál usaste.

## Haz una comparación controlada

1. Genera diez segundos de una **sinusoide de 400 Hz** en Audacity con amplitud **0.1**. Envía la misma señal a L/R. Usa un nivel moderado y documentado en la pletina, sin saturación digital.
2. Graba la cinta A después del tramo transparente. Rebobina y captura su reproducción sin cambiar ganancias de interfaz ni controles de salida de la pletina.
3. Graba la cinta B con la misma fuente y REC LEVEL. Si la pletina realiza calibración automática, decide si comparas cintas calibradas o una configuración fija común y conserva ese criterio.
4. Separa cada captura estéreo en L/R. Mide el pico estable de 400 Hz con los mismos ajustes de Plot Spectrum y seleccionando un solo canal cada vez.
5. Resta el nivel recuperado de A al de B para cada canal. Repite un tramo de cada cinta para comprobar la estabilidad.
6. Guarda estas lecturas antes de igualar la sonoridad. Iguala el volumen de escucha únicamente en las copias destinadas a comparar el carácter tonal.

## Analiza un resultado

Ejemplo hipotético: la cinta A devuelve −20 dBFS y la B −18,5 dBFS en el mismo canal. La cinta B es **1,5 dB más sensible en esta prueba**. Eso no significa necesariamente que admita 1,5 dB más de señal de grabación, tenga menos ruido o suene más brillante. Son medidas diferentes.

Si los canales no coinciden, examina [el balance entre canales](../channel-balance/) antes de aplicar una corrección global. Si la diferencia cambia en cada pasada, prueba otro tramo y revisa la ganancia de captura o el contacto con la cinta.

Comprobación final: misma fuente, tipo de cinta y calibración documentados, ganancias fijas, canales separados y ausencia de normalización antes de medir. Usa el resultado para entender esa combinación de pletina y cinta y guarda las condiciones completas en [un perfil de grabación](../recording-profile/).
