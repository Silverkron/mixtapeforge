---
id: "channel-balance"
lang: "es"
title: "Mide la diferencia entre izquierda y derecha antes de corregir el balance"
description: "Utiliza señales de prueba idénticas para distinguir un desequilibrio estable de canales del contenido estéreo intencional."
primaryKeyword: "Mide la diferencia entre izquierda y derecha antes de corregir el balance"
secondaryKeywords: ["la prueba de ida y vuelta","el bucle directo de la interfaz","localizar el fallo","Un canal de la cassette suena más bajo"]
searchIntent: "evaluation"
answer: "Una voz central desplazada hacia un lado puede indicar niveles distintos entre canales. La música corriente es una mala referencia de medida: algunos instrumentos pueden sonar deliberadamente más fuertes en un lado. Empieza con señales idénticas."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: generador de tonos", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: separación de pistas estéreo", "url": "https://manual.audacityteam.org/man/splitting_and_joining_stereo_tracks.html"}, {"title": "Audacity: análisis de espectro", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}]
related: ["quiet-channel", "loopback-round-trip", "flux-stereo-tool", "crosstalk-test"]
guideType: "measurement"
prerequisites: ["without-reference-tape"]
next: ["phase-polarity", "recording-profile"]
---

## Prepara la prueba

Utiliza Audacity, una interfaz estéreo, una cinta virgen y las conexiones de línea de [la prueba de ida y vuelta](../without-reference-tape/). Genera diez segundos de una sinusoide de 1 kHz con amplitud 0.1 y envía la misma señal a ambos canales de salida. Es un nivel de archivo, no una marca de calibración de la pletina.

Desactiva NR y procesamiento. Mantén iguales las ganancias de entrada cuando el hardware lo permita, pero recuerda que dos mandos en la misma posición no garantizan idéntica ganancia. Graba a un nivel moderado en la pletina, sin saturación digital.

## Compara los canales correctamente

1. Captura la reproducción de la cinta como WAV estéreo; no normalices ninguno de los canales.
2. En Audacity utiliza **Split Stereo Track** en el menú desplegable de la pista. Selecciona solo la parte central estable del tono izquierdo.
3. Abre **Analyze > Plot Spectrum**, elige Spectrum, Hann y un tamaño FFT que permita distinguir el tono. Lee el pico de 1 kHz. Estos son los nombres de los comandos en inglés.
4. Selecciona el mismo intervalo en el canal derecho y repite con los mismos ajustes. No selecciones ambos a la vez: Plot Spectrum combina los canales seleccionados.
5. Resta las dos lecturas en dB. Repite en otro tramo grabado y, si es posible, en una segunda cinta.
6. Compara con [el bucle directo de la interfaz](../loopback-round-trip/) si puedes cambiar temporalmente los cables. Sin esa referencia, atribuye la diferencia al recorrido completo.

## Decide si se justifica corregir

Unas lecturas hipotéticas de −18,0 dBFS a la izquierda y −19,2 dBFS a la derecha dan un desequilibrio de 1,2 dB. Si la captura directa de la interfaz muestra la misma diferencia, corregir la grabación compensaría el recorrido de medida en lugar de la cinta.

Si persiste una diferencia estable después de comprobar el recorrido, atenuar el canal más fuerte conserva más margen que aumentar el más débil. Haz una prueba pequeña y compara música conocida con elementos centrados en mono a una sonoridad parecida. Una corrección medida en un reproductor puede no ser válida en otro.

## Cuándo no corregir

Si la diferencia cambia con la frecuencia, una sola corrección de ganancia no la resuelve: investiga respuesta o alineación. Si cambia entre pasadas, comprueba el contacto con la cinta y las conexiones intermitentes. Un canal totalmente mudo requiere [localizar el fallo](../quiet-channel/), no aplicar un gran aumento.

Comprobación final: entrada idéntica, análisis separado por canal, ausencia de normalización, resultado repetido e incertidumbre de la interfaz anotada. El perfil de MixtapeForge puede proponer una atenuación limitada de canal cuando su propia prueba la respalda; no incorpores a todas las grabaciones un error del recorrido que aún no hayas verificado.
