---
id: "loopback-round-trip"
lang: "es"
title: "Comprueba la interfaz antes de culpar al casete"
description: "Compara un bucle directo de la interfaz con una grabación y reproducción en cinta y aprende qué puede aislar cada prueba."
primaryKeyword: "Comprueba la interfaz antes de culpar al casete"
secondaryKeywords: ["el procedimiento básico de captura","la prueba con varias frecuencias","el balance entre canales","los perfiles de grabación"]
searchIntent: "evaluation"
answer: "Un loopback o bucle directo conecta la salida de una interfaz de audio directamente a su entrada. La prueba de ida y vuelta por cinta intercala la pletina y el casete. Compararlas ayuda a detectar un defecto que ya existía antes de intervenir la cinta."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "REW: configuración de la interfaz de audio", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}, {"title": "Audacity: generador de tonos", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: análisis de espectro", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "Audacity: configuración de dispositivos y canales", "url": "https://manual.audacityteam.org/man/audio_setup_toolbar.html"}, {"title": "Audacity: preferencias de grabación y sobregrabación", "url": "https://manual.audacityteam.org/man/recording_preferences.html"}, {"title": "Audacity: grabación y exportación WAV", "url": "https://manual.audacityteam.org/man/record.html"}]
related: ["without-reference-tape", "channel-balance", "recording-profile"]
guideType: "measurement"
prerequisites: ["calibration-basics"]
next: ["frequency-response"]
---

## Equipo y ajustes fijos

Utiliza una interfaz con entradas de línea, cables de línea compatibles, Audacity y una cinta prescindible. Consulta el manual de la interfaz antes de unir una salida a una entrada: una entrada exclusivamente de micrófono puede saturarse. Desconecta o desactiva la monitorización que devuelve la entrada a esa misma salida.

Esta prueba requiere cambiar cables. Si prefieres dejar conectada la pletina, omite el bucle directo y etiqueta el resultado como «cadena completa»; no lo describas como una medida corregida por la interfaz.

## Configura reproducción y captura simultáneas en Audacity

Los comandos siguientes corresponden a la interfaz en inglés. En **Audio Setup**, selecciona tu interfaz como Playback Device, sus **entradas físicas de línea** como Recording Device y **2 (Stereo)** canales de grabación. Un dispositivo de grabación «loopback» de Windows captura la salida digital del ordenador y omitiría los cables que quieres comprobar. Selecciona una frecuencia común para proyecto e interfaz en Audio Settings.

En **Preferences > Recording**, activa **Play other tracks while recording (overdub)** y **Record on a new track**. Desactiva **Audible input monitoring** —Software Playthrough en versiones antiguas— y la grabación activada por sonido. Desactiva también cualquier ruta del mezclador de la interfaz que devuelva la entrada a estas salidas.

Crea **Tracks > Add New > Stereo Track**, selecciona la pista y utiliza **Generate > Tone**, Sine, 1000 Hz, amplitud 0.1 y duración de diez segundos. Coloca el cursor al principio sin seleccionar un intervalo. Pulsa Record: con estas preferencias, Audacity reproduce la fuente mientras graba el retorno físico en una pista estéreo nueva. Detén la grabación después del tono, silencia la fuente y exporta solo el retorno como WAV; comprueba la selección o previsualización de exportación para no mezclar la fuente. Pon nombres claros a las dos pistas. En la siguiente pasada, silencia los retornos anteriores para no volver a enviarlos a la entrada.

Para la fase con cinta, reproduce el tono original hacia la pletina en REC, detén y rebobina. Captura la reproducción en **un proyecto nuevo y vacío**: pulsa Record en Audacity antes de PLAY en la pletina y detén después del tono. Así mantienes separados original y retorno. Consulta [el procedimiento básico de captura](../without-reference-tape/) si es tu primera captura estéreo de cinta.

## Graba ambos recorridos

1. Genera diez segundos de una sinusoide de 1 kHz en Audacity con amplitud 0.1. Selecciona una frecuencia de muestreo común y compatible y envía audio idéntico a ambas salidas.
2. Conecta directamente las salidas L/R a las entradas de línea L/R. Empieza con la salida baja y súbela hasta obtener una señal clara sin saturación. Guarda una captura estéreo llamada «referencia de la interfaz».
3. Anota volumen de salida, ganancias de entrada, frecuencia de muestreo y puertos. Detén la reproducción antes de reconectar a través de la pletina: salida → LINE IN; LINE OUT → entrada de la interfaz.
4. Conserva los ajustes de la interfaz. Con NR desactivado, graba el tono con el tipo de cinta correcto y un nivel moderado en la pletina. Rebobina y captura la reproducción.
5. Separa los canales de cada captura en Audacity. Selecciona el centro del tono y compara su pico en Plot Spectrum, con los mismos ajustes para cada selección.
6. Repite una vez. Para diferencias de respuesta tonal, utiliza [la prueba con varias frecuencias](../frequency-response/), primero con la conexión directa y después con la cinta.

### Lee cada canal en Plot Spectrum

Abre el menú desplegable de la pista capturada y elige **Split Stereo Track**. Arrastra sobre la parte central del tono izquierdo, evitando el inicio y el final. Abre **Analyze > Plot Spectrum**, elige **Spectrum**, **Hann** y un tamaño FFT que permita separar el tono, por ejemplo 16384. Coloca el cursor junto al pico de 1 kHz y lee la información del pico bajo la gráfica. Repite en el canal derecho y en cada captura con la misma duración de selección y los mismos ajustes. No selecciones ambos canales a la vez para esta comparación.

## Interpreta la comparación

Ejemplo hipotético: el recorrido directo suena 1 dB más bajo a la derecha y el recorrido por cinta presenta la misma diferencia. Corregir la grabación para compensarla podría incorporar a todas tus cintas un error de la entrada de la interfaz. Investiga primero las rutas y ganancias de la interfaz.

No restes directamente porcentajes de distorsión ni niveles de ruido en dB: esas contribuciones no se suman como ganancias ordinarias con signo. Una curva de respuesta del bucle directo también es válida únicamente para los ajustes y conexiones con los que se obtuvo.

## Si algo no encaja

El silencio suele indicar una entrada equivocada, canales mal asignados o un modo de línea desactivado. Un aullido indica un bucle de monitorización: detén la reproducción y desactiva la monitorización de entrada. Si la referencia directa satura, la comparación no es válida; baja el nivel correspondiente y repite ambos recorridos.

Conserva los WAV sin procesar y los ajustes. Una referencia repetible mejora la confianza en [el balance entre canales](../channel-balance/) y [los perfiles de grabación](../recording-profile/), pero no calibra el cabezal de reproducción.
