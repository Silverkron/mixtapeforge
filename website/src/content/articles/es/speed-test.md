---
id: "speed-test"
lang: "es"
title: "Mide la velocidad de reproducción de una pletina con una cinta de 3 o 3,15 kHz"
description: "Calcula el error de tono constante con una referencia independiente sin confundirlo con las oscilaciones de velocidad."
primaryKeyword: "Mide la velocidad de reproducción de una pletina con una cinta de 3 o 3,15 kHz"
secondaryKeywords: ["wow y flutter","el diagnóstico del transporte","La cassette va demasiado rápida o lenta","NAK T-100"]
searchIntent: "evaluation"
answer: "Si todas las notas suenan algo más agudas o graves, la pletina puede funcionar de forma constante demasiado rápida o lenta. Eso es el error de velocidad. Un tono que sube y baja es un problema distinto: wow y flutter."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100: especificaciones oficiales", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "NAK T-100: lista de comprobación de medidas", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "Audacity: análisis de espectro", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}]
related: ["playback-speed-problems", "nak-t100-practical-guide", "without-reference-tape"]
guideType: "measurement"
prerequisites: ["calibration-tapes"]
next: ["wow-flutter"]
---

Si todas las notas suenan algo más agudas o graves, la pletina puede funcionar de forma constante demasiado rápida o lenta. Eso es el **error de velocidad**. Un tono que sube y baja es un problema distinto: [wow y flutter](../wow-flutter/).

## Qué necesitas

Utiliza una cinta de referencia de velocidad fiable, marcada **3000 Hz o 3150 Hz**, una interfaz con entrada de línea estéreo y NAK T-100. Solo necesitas el recorrido de reproducción: LINE OUT de la pletina → LINE IN de la interfaz → ordenador. Un tono grabado por la propia pletina que quieres comprobar no es una referencia independiente de velocidad.

## Toma la lectura

1. Selecciona la entrada física de línea de la interfaz y una frecuencia de muestreo compatible que coincida con la configuración del ordenador. Desactiva la ganancia automática y otros procesos. Mantén desactivada la monitorización de entrada.
2. Introduce la cinta de referencia. Si existe un control de velocidad variable, déjalo en la posición normal documentada. Desactiva NR para la prueba.
3. En NAK T-100, selecciona **Speed Wow/Flutter** con el control Function. Ajusta **Speed Cal.** a la frecuencia indicada en la cinta, no a la frecuencia que observas en pantalla.
4. Inicia la reproducción. Comprueba que ambos canales de entrada reciben una señal limpia sin saturación. Si la pletina tiene selector de monitor Source/Tape, elige Tape.
5. Espera a que el transporte se estabilice y observa un tramo central estable durante unos treinta segundos. Anota la indicación de velocidad y si permanece fija. Esta duración es una ventana práctica de comparación, no una afirmación de conformidad con una norma.
6. Detén, rebobina y repite. Si la cinta contiene material adecuado más adelante, compara también ese tramo. Anota la identidad de la referencia, el canal, la posición del control de velocidad y el intervalo analizado.

## Entiende el resultado

El error de velocidad se calcula como `(frecuencia medida / frecuencia de referencia − 1) × 100`.

Ejemplo hipotético: medir 3015 Hz con una referencia de 3000 Hz da **+0,5 %**, es decir, una reproducción más rápida que la referencia. Una lectura de 2985 Hz da **−0,5 %**. Compara con la tolerancia especificada para tu pletina y con condiciones compatibles; estos ejemplos no son límites de aprobación o rechazo.

Plot Spectrum de Audacity puede ofrecer una comprobación aproximada de frecuencia sobre un tono capturado. Su resolución finita y su promediado no sustituyen una medida específica de velocidad, wow y flutter.

## Problemas que debes descartar

- Un resultado cercano a +5 % o −4,76 % sugiere que has confundido las referencias de 3000 y 3150 Hz. Revisa la etiqueta antes de ajustar nada.
- Un valor que se mueve sugiere inestabilidad o pérdidas de señal. Repite con una referencia en buen estado y sigue [el diagnóstico del transporte](../playback-speed-problems/).
- Un resultado aparentemente perfecto con un tono grabado por ti no demuestra una velocidad correcta: los errores de grabación y reproducción pueden cancelarse.

Comprobación final: referencia independiente, frecuencia coincidente, entrada limpia, lectura repetida y condiciones documentadas. Ajustar el motor requiere el procedimiento de servicio del modelo; no busques un tornillo interno sin documentar.
