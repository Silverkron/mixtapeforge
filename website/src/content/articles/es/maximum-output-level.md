---
id: "maximum-output-level"
lang: "es"
title: "Estima el margen de la cinta con un límite de distorsión definido"
description: "Encuentra el nivel reproducido cerca de un umbral del tercer armónico y aprende a aplicar ese resultado a la música con prudencia."
primaryKeyword: "Estima el margen de la cinta con un límite de distorsión definido"
secondaryKeywords: ["la comprobación de distorsión","la saturación de altas frecuencias","Compara la sensibilidad de grabación de las cintas con controles fijos","Mide el siseo de la cinta respecto a una señal grabada"]
searchIntent: "evaluation"
answer: "El nivel máximo de salida, o MOL, solo tiene sentido si se indican frecuencia, criterio de distorsión y referencia. Describe la salida recuperada de la cinta, no cuánto puedes girar REC LEVEL. Una comparación habitual usa un límite del tercer armónico, pero no debes tratar como idénticos los distintos métodos publicados."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Anaxwaves: determinación del margen de la cinta", "url": "https://www.anaxwaves.com/MixtapeNerd/Docs/DetermineHeadroom.html"}, {"title": "NAK T-100: especificaciones oficiales", "url": "https://anaxwaves.com/NAKT100/"}]
related: ["recording-sensitivity", "tape-hiss-snr", "eq-limits"]
guideType: "measurement"
prerequisites: ["distortion-test"]
next: ["high-frequency-saturation", "recording-levels"]
---

## Antes de empezar

Completa [la comprobación de distorsión](../distortion-test/). Necesitas NAK T-100, una cinta prescindible y conexiones de línea estéreo. Desactiva NR y selecciona el tipo de cinta correcto. Mantén muy bajo el volumen de escucha. Es una comparación avanzada: si el analizador no muestra claramente la magnitud de distorsión elegida, no denomines el resultado MOL según ese criterio.

## Estima el margen con una referencia local

1. Elige **400 Hz** y **HD3** para esta prueba. Establece una referencia grabada moderada y anota el nivel recuperado de L/R. Defínelo como tu 0 dBr local; dBr significa decibelios respecto a esa referencia.
2. Mantén fijas la salida de reproducción y las ganancias de captura. Comprueba que tanto la referencia como los retornos posteriores, más fuertes, queden por debajo de la saturación de entrada.
3. Aumenta la señal de grabación en pasos pequeños y documentados, grabando un tramo corto en cada paso. En una pletina de dos cabezales, rebobina y reproduce cada tramo; con tres cabezales, utiliza monitorización Tape.
4. Lee el nivel de la fundamental recuperada y HD3 de cada canal. Deja de aumentar al alcanzar el límite elegido o al sobrecargar el recorrido. Si usas el criterio ilustrativo de **3 % HD3**, no lo sustituyas por 3 % THD+N.
5. Repite los dos pasos entre los que se encuentra el umbral. Informa de un intervalo si el tamaño de paso no permite localizarlo con precisión. Conserva separados los límites izquierdo y derecho.
6. Expresa el nivel recuperado en el umbral respecto a la referencia grabada y guarda junto a él frecuencia, cinta y método.

## Qué te dice el número

Ejemplo hipotético: un canal llega al 3 % HD3 a +4 dBr y el otro a +3 dBr. Eso permite estimar un límite de unos 3 dB para el canal más débil según este método local. No establece un MOL equivalente al del fabricante salvo que también coincidan flujo de referencia, bias y condiciones de medida.

Si la interfaz satura primero, has medido el límite de la interfaz. Reduce la ganancia de captura y repite la referencia y todos los niveles comparados. Si las lecturas de bajo nivel ya están dominadas por el ruido, mejora el recorrido de medida antes de buscar el umbral.

## Lleva la conclusión a la música

Un tono constante de baja frecuencia no predice cómo se grabarán los platos. Comprueba por separado [la saturación de altas frecuencias](../high-frequency-saturation/) y deja margen para los picos musicales. Reducir picos puede mejorar la claridad, pero una compresión excesiva cambia la música.

Comprobación final: frecuencia indicada, HD3 diferenciado de THD+N, referencia local guardada, margen de captura comprobado y límite del canal más débil conservado. Las estimaciones de MixtapeForge no deben anunciarse como una medida certificada de MOL.
