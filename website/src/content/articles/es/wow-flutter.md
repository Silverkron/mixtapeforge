---
id: "wow-flutter"
lang: "es"
title: "Cómo medir el wow y flutter de una pletina de casete"
description: "Reproduce un tono de referencia, selecciona el detector adecuado y documenta la inestabilidad de velocidad con resultados comparables."
primaryKeyword: "Cómo medir el wow y flutter de una pletina de casete"
secondaryKeywords: ["la velocidad media","los problemas de velocidad de reproducción","Elige una cinta de calibración para la prueba que necesitas","NAK T-100"]
searchIntent: "evaluation"
answer: "El wow es una variación lenta del tono; el flutter es una fluctuación más rápida que puede dar aspereza a las notas sostenidas. Ambos proceden de cambios de velocidad de reproducción. Una desviación constante puede hacer que la música suene más aguda y, aun así, producir poco wow y flutter: mídelo por separado."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100: especificaciones oficiales", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "NAK T-100: lista de comprobación de medidas", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["calibration-tapes", "nak-t100-practical-guide", "different-decks"]
guideType: "measurement"
prerequisites: ["speed-test"]
next: ["playback-speed-problems"]
---

## Equipo y preparación

Utiliza NAK T-100, una interfaz con entrada de línea y una **cinta de velocidad y wow/flutter de 3000 o 3150 Hz** documentada. Su propia inestabilidad residual debe ser suficientemente baja para evaluar la pletina. Conecta LINE OUT L/R de la pletina a LINE IN L/R de la interfaz, selecciona las entradas físicas y desactiva procesamiento y ganancia automática.

Comprueba primero [la velocidad media](../speed-test/). Mantén bajo el volumen de escucha: se trata de un tono agudo continuo.

## Sigue un mismo método de medida

1. En NAK T-100 elige **Speed Wow/Flutter** y haz coincidir **Speed Cal.** con la cinta de referencia.
2. Reproduce un tramo estable y ajusta la ganancia de captura para obtener señal clara sin saturación. Si la pletina tiene selector de monitor, selecciona Tape.
3. Escoge el detector correspondiente a la especificación que quieres comparar. El desarrollador relaciona **Q-PK** con DIN 45507, **WRMS** con JIS y ofrece modos de pico/RMS sin ponderar. Una medida ponderada da más importancia a ciertas velocidades de fluctuación; el detector determina cómo se resume el valor variable.
4. Observa aproximadamente treinta segundos después del arranque. Anota detector, ponderación, rango mostrado y duración de observación junto al porcentaje. Si la indicación llega al límite, cambia Meter Range antes de dar por válida la lectura.
5. Repite el mismo pasaje y otro tramo adecuado. Anota por separado un pico aislado y la lectura habitual, en lugar de ocultarlo eligiendo solo el «mejor» número.
6. Conserva la captura del tono sin procesar si tu grabador lo permite. Para una comparación de servicio, aporta la gráfica o las observaciones repetidas además del valor numérico único.

## Interpreta el resultado con criterio

Ejemplo hipotético: **0,08 % WRMS** y **0,15 % Q-PK** pueden describir el mismo transporte con métodos distintos. Que el segundo número sea mayor no demuestra que la segunda medida haya encontrado una pletina peor. Compara el mismo detector, ponderación, cinta de prueba y duración.

Un tono grabado por ti puede revelar problemas de repetibilidad, pero incluye la inestabilidad de grabación y de reproducción. No aísla el comportamiento de reproducción como lo hace una cinta de referencia.

## Si la gráfica presenta saltos

Un pico puede proceder de un tramo dañado, mal contacto con la cinta, una perturbación del transporte o una interrupción de captura. Reproduce de nuevo el mismo tramo: si el salto se repite en el mismo lugar de la cinta, esa es una pista; si aparecen huecos digitales aleatorios, comprueba los búferes de captura y la carga del ordenador. Ninguna observación identifica por sí sola un componente.

Comprobación final: tono conocido, ausencia de saturación, método coincidente, varios tramos repetidos e identidad de la referencia guardada. La ecualización y la reducción de ruido no reparan la inestabilidad de velocidad: investiga [los problemas de velocidad de reproducción](../playback-speed-problems/) antes de crear un perfil de grabación.
