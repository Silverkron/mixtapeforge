---
id: "high-frequency-saturation"
lang: "es"
title: "Por qué desaparecen los agudos fuertes en cinta: compruébalo antes de ecualizar"
description: "Compara tonos agudos a dos niveles para detectar una pérdida dependiente del nivel sin confundirla con un problema fijo de EQ."
primaryKeyword: "Por qué desaparecen los agudos fuertes en cinta"
secondaryKeywords: ["la prueba de respuesta en frecuencia","La salida máxima a baja frecuencia","Estima el margen de la cinta con un límite de distorsión definido","Mide la distorsión del casete sin confundirla con el siseo"]
searchIntent: "evaluation"
answer: "La cinta puede dejar de registrar fielmente los aumentos de agudos antes de que un medidor digital sature. Es la saturación de altas frecuencias: más entrada deja de producir una salida grabada proporcional. Los platos pueden perder claridad aunque la grabación parezca tener suficiente volumen."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: generador de tonos", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: análisis de espectro", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "Anaxwaves: determinación del margen de la cinta", "url": "https://www.anaxwaves.com/MixtapeNerd/Docs/DetermineHeadroom.html"}]
related: ["maximum-output-level", "distortion-test", "bias-adjustment"]
guideType: "measurement"
prerequisites: ["frequency-response"]
next: ["recording-levels", "eq-limits"]
---

## Prepara una comparación corta

Usa las mismas conexiones de línea, NR desactivado y el método de medida en Audacity de [la prueba de respuesta en frecuencia](../frequency-response/). Necesitas una cinta prescindible y dos pares de tonos cortos: 1 kHz seguido de 8 kHz, cinco segundos cada uno. Envía señales idénticas a ambos canales.

Deja altavoces y auriculares a volumen bajo o silenciados. Es una prueba de grabación, no de tu audición ni de los tweeters. Utiliza niveles moderados; no hace falta llevar la pletina al máximo.

## Compara dos niveles de grabación

1. Genera el primer par con amplitud **0.01** y el segundo con **0.02**, exactamente el doble de amplitud, aproximadamente 6 dB más.
2. Establece un nivel prudente en la pletina y comprueba el margen de captura. Mantén sin cambios REC LEVEL, volumen de salida de la interfaz y ganancia de entrada durante ambos pares.
3. Graba el par bajo y después el más alto en la misma zona de la cinta. Rebobina y captura toda la reproducción sin normalizar ni procesar.
4. En Audacity, separa los canales estéreo y mide la parte central estable de cada tono con Plot Spectrum, manteniendo los ajustes.
5. Calcula cuánto aumentó el retorno de 1 kHz y después cuánto aumentó el de 8 kHz. Repite la prueba una vez antes de sacar conclusiones.

## Qué significa que la subida se comprima

Ejemplo hipotético: duplicar la entrada aumenta 5,8 dB el retorno de 1 kHz, pero solo 3 dB el de 8 kHz. Los agudos han dejado de seguir proporcionalmente a la entrada. Eso sugiere una limitación dependiente del nivel en algún punto del recorrido; confirma que no estuvieran sobrecargándose la fuente, la interfaz o la entrada de la pletina.

Si ambas frecuencias suben unos 6 dB, pero los agudos siguen 3 dB por debajo de 1 kHz en las dos pruebas, parece más una diferencia estable de respuesta que saturación a esos niveles.

## Qué cambiar después

Prueba el mismo fragmento musical a menor nivel de grabación. Si recuperas los platos, conserva ese margen en vez de realzar agudos. Compara otra cinta y, si existen, los controles externos de calibración documentados por el fabricante.

Una lectura baja y ruidosa puede ocultar el tono: no interpretes el nivel de ruido como una meseta de saturación. Si el resultado cambia en cada reproducción, comprueba primero el contacto con la cinta.

Comprobación final: cambio de entrada conocido de 6 dB, controles fijos, captura limpia, dos frecuencias y resultado repetido. [La salida máxima a baja frecuencia](../maximum-output-level/) es una propiedad distinta y no predice todo el comportamiento de los agudos.
