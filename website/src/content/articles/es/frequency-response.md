---
id: "frequency-response"
lang: "es"
title: "Mide cómo cambia el casete los graves, medios y agudos"
description: "Graba tonos al mismo nivel, compara su reproducción y distingue un cambio de respuesta tonal de la saturación."
primaryKeyword: "Mide cómo cambia el casete los graves, medios y agudos"
secondaryKeywords: ["la prueba básica de ida y vuelta","referencia directa de la interfaz","la saturación de altas frecuencias","una EQ limitada"]
searchIntent: "evaluation"
answer: "La respuesta en frecuencia indica si las distintas alturas de sonido regresan con el mismo nivel relativo. Una cinta que conserva 1 kHz pero pierde 8 kHz puede sonar menos brillante. Esta prueba mide el recorrido completo de grabación y reproducción, no el cabezal de reproducción por separado."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: generador de tonos", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: análisis de espectro", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "NAK T-100: lista de comprobación de medidas", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["loopback-round-trip", "bias-adjustment", "recording-profile"]
guideType: "measurement"
prerequisites: ["without-reference-tape"]
next: ["high-frequency-saturation", "eq-limits"]
---

## Prepara un archivo de prueba sencillo

Utiliza Audacity, una interfaz de línea estéreo y una cinta prescindible. En **Generate > Tone**, crea tonos sinusoidales sucesivos de cinco segundos a **100, 400, 1000, 4000, 8000 y 10000 Hz**, todos con **amplitud 0.1**. Deja un silencio corto entre tonos para identificarlos. Duplica la secuencia mono a L/R sin cambiar la ganancia. Son puntos prácticos de comparación, no un barrido de certificación normalizado.

Prepara las conexiones y desactiva NR y procesamiento como en [la prueba básica de ida y vuelta](../without-reference-tape/). Escucha a volumen bajo: los tonos son señales de medida, no material para escuchar fuerte.

## Graba a un nivel bajo y documentado

1. Utiliza el tono de 1 kHz para establecer una referencia moderada en el medidor de la pletina, sin saturar la interfaz.
2. Reduce la señal generada otros 20 dB para grabar la respuesta, manteniendo fijas la ganancia de la interfaz y REC LEVEL. En Audacity, una amplitud nueva de **0.01** está 20 dB por debajo de 0.1. Anota la referencia expresamente: «20 dB por debajo de mi nivel inicial de 1 kHz». No es una calibración absoluta de flujo magnético.
3. Graba toda la secuencia después del tramo transparente. Detén, rebobina y captura la reproducción estéreo sin efectos ni normalización.
4. Separa L/R. Para cada tono, selecciona la parte central estable y usa **Analyze > Plot Spectrum**, con Spectrum, Hann y el mismo tamaño FFT. Lee el pico del tono, no el ruido cercano. Los nombres indicados son los de la interfaz en inglés.
5. En cada canal, resta el pico de 1 kHz de los demás picos. Así expresas la respuesta tonal respecto a la referencia central. Mantén separados izquierda y derecha.
6. Repite. Si un tono está cerca del nivel de ruido o fluctúa mucho, marca el resultado como incierto en lugar de aplicar una gran corrección.

## Interpreta la forma de la respuesta

Ejemplo hipotético: 1 kHz vuelve a −35 dBFS y 8 kHz a −39 dBFS. La respuesta relativa a 8 kHz es **−4 dB**. Esa diferencia puede incluir interfaz, grabación, cinta, alineación y reproducción. Una [referencia directa de la interfaz](../loopback-round-trip/) ayuda a separar algunas influencias.

Si una prueba a mayor nivel pierde más agudos, investiga [la saturación de altas frecuencias](../high-frequency-saturation/): aumentar agudos puede empeorarla. Si la pérdida permanece estable entre repeticiones a bajo nivel, revisa el tipo de cinta y el bias antes de intentar [una EQ limitada](../eq-limits/).

Comprobación final: mismos niveles de origen, reducción documentada, controles fijos, canales separados, resultados referidos a 1 kHz y varias pasadas. No afirmes «plana hasta 10 kHz» sin indicar tolerancia y nivel de grabación.
