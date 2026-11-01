---
id: "without-reference-tape"
lang: "es"
title: "Mide tu grabación en casete sin una cinta de referencia"
description: "Realiza una prueba repetible de grabación y reproducción y aprende qué conclusiones requieren una referencia independiente."
primaryKeyword: "Mide tu grabación en casete sin una cinta de referencia"
secondaryKeywords: ["la prueba de respuesta en frecuencia","Las cintas de referencia independientes","perfil de grabación de MixtapeForge","Comprueba la interfaz antes de culpar al casete"]
searchIntent: "task"
answer: "Puedes comparar cintas, detectar diferencias entre canales e investigar una grabación apagada sin comprar una cinta de calibración. Lo que mides es el recorrido completo: electrónica de grabación, cinta, electrónica de reproducción e interfaz de audio juntas."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: generador de tonos", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: análisis de espectro", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "NAK T-100: lista de comprobación de medidas", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "Audacity: configuración de dispositivos y canales", "url": "https://manual.audacityteam.org/man/audio_setup_toolbar.html"}, {"title": "Audacity: preferencias de grabación y sobregrabación", "url": "https://manual.audacityteam.org/man/recording_preferences.html"}, {"title": "Audacity: grabación y exportación WAV", "url": "https://manual.audacityteam.org/man/record.html"}]
related: ["loopback-round-trip", "calibration-tapes", "eq-limits"]
guideType: "procedure"
prerequisites: ["calibration-basics"]
next: ["recording-profile", "frequency-response"]
---

## Qué necesitas

Utiliza una cinta virgen prescindible, conexiones de línea estéreo y Audacity para una primera prueba sencilla. En Audacity, **Generate > Tone** genera una onda sinusoidal: contiene una sola frecuencia y permite identificar cambios con más facilidad que la música. Basta un cuaderno o una hoja de cálculo para guardar los resultados. Los nombres de los comandos siguientes corresponden a la interfaz en inglés.

## Configura Audacity una vez

Abre **Audio Setup**. Elige la interfaz en **Playback Device**, su entrada física de línea en **Recording Device** y **Recording Channels > 2 (Stereo)**. No selecciones un dispositivo «loopback» que capture la reproducción interna del ordenador. En **Audio Settings**, escoge una frecuencia de muestreo del proyecto admitida por la interfaz.

En **Preferences > Recording** —dentro del menú Audacity en macOS— desactiva **Audible input monitoring**; las versiones anteriores lo llaman Software Playthrough. Desactiva también la grabación activada por sonido para no omitir silencios ni marcadores. Deshabilita cualquier retorno directo de entrada a salida en el mezclador de la interfaz.

Para obtener canales idénticos, elige **Tracks > Add New > Stereo Track**, selecciona la pista y usa Generate > Tone. Si partes de un archivo mono, duplícalo, deja las ganancias de ambas pistas en 0 dB y utiliza **Make Stereo Track** en el menú desplegable de la pista superior. La pista superior pasa a ser el canal izquierdo y la inferior, el derecho. Mantén neutros el panorama y el procesamiento.

Para grabar la prueba en cinta, pulsa REC en la pletina, espera a que avance el tramo grabable y pulsa Play en Audacity. Detén ambos al terminar el tono. Para capturar la reproducción, crea **un proyecto nuevo y vacío de Audacity**, conserva los ajustes de entrada, pulsa primero Record y después PLAY en la pletina. Detén Audacity tras el tono. Exporta con **File > Export Audio** como WAV estéreo, sin normalizar. Separar los proyectos de reproducción y captura evita mezclar por accidente el original con el retorno.

## Haz una prueba repetible

1. Conecta la salida de la interfaz a LINE IN de la pletina y LINE OUT de la pletina a la entrada de línea de la interfaz. Selecciona esos puertos, captura estéreo y la misma frecuencia de muestreo compatible durante toda la prueba. Desactiva monitorización de entrada, EQ, compresión, ganancia automática y NR.
2. Genera diez segundos de **1 kHz, Sine, amplitude 0.1**. Son −20 dBFS de pico en el archivo; no equivalen automáticamente a −20 en el medidor de la pletina. Envía audio idéntico a L/R.
3. Con la salida inicialmente baja, ajusta un nivel de grabación moderado y anota la lectura de la pletina. Deja margen antes de la saturación en la entrada de la interfaz. Marca las posiciones de los controles y no las cambies.
4. Graba después del tramo transparente inicial. Detén, rebobina y captura la reproducción como WAV estéreo sin procesar. En una pletina de dos cabezales esta reproducción posterior es imprescindible.
5. Repite en otro tramo. En Audacity separa la pista estéreo en L/R, selecciona la parte central estable de un canal y abre **Analyze > Plot Spectrum**. Usa Spectrum, Hann y el mismo tamaño FFT en ambas capturas. Compara el pico de 1 kHz canal por canal.
6. Guarda juntos el archivo original, ambas capturas y los ajustes. Continúa con [la prueba de respuesta en frecuencia](../frequency-response/) solo cuando estos niveles se repitan de forma fiable.

## Qué significan los valores

Resultado hipotético: el canal izquierdo mide −18 dBFS y el derecho −19 dBFS en ambas capturas. Eso sugiere una diferencia repetible de 1 dB en algún punto del recorrido. No demuestra que debas subir 1 dB el canal de grabación: la entrada de captura podría ser la responsable.

Un error de velocidad nulo en un tono grabado por ti tampoco es concluyente: una misma velocidad incorrecta al grabar y reproducir puede compensarse. [Las cintas de referencia independientes](../calibration-tapes/) resuelven esa limitación.

## Si el resultado no se estabiliza

Si el pico salta, prueba otro tramo e inspecciona la captura sin procesar en busca de pérdidas de señal. Si ambos canales saturan, reduce la ganancia de captura y repite las dos tomas. Si no recibes señal, confirma que la entrada seleccionada sea LINE IN física, no un loopback por software.

Comprobación final: mismos controles, reproducción completa, ausencia de saturación, canales medidos por separado y resultado repetido. El [perfil de grabación de MixtapeForge](../recording-profile/) automatiza una secuencia más amplia, pero conserva la misma limitación de medir el recorrido completo.
