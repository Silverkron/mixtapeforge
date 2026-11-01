---
id: "calibration-software"
lang: "es"
title: "Elige el software adecuado para la prueba de casete que necesitas"
description: "Compara Audacity, REW, NAK T-100, Stereo Tool y MixtapeForge según tarea, configuración y límites de medida."
primaryKeyword: "Elige el software adecuado para la prueba de casete que necesitas"
secondaryKeywords: ["el ejercicio de ida y vuelta con Audacity","La guía de NAK T-100","El ejercicio de Stereo Tool","su secuencia guiada de perfil"]
searchIntent: "informational"
answer: "Empieza por una pregunta, no por una lista de instrumentos. Capturar una cinta, comprobar la estabilidad del tono y guardar un perfil de corrección necesitan funciones distintas. Un espectro vistoso no es automáticamente una medida calibrada."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: análisis de espectro", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "REW: configuración de la interfaz de audio", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}, {"title": "REW: espectro, niveles RMS y distorsión", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/spectrum.html"}, {"title": "NAK T-100: especificaciones oficiales", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "FLUX:: Stereo Tool: producto y compatibilidad", "url": "https://www.flux.audio/project/stereo-tool-freeware/"}]
related: ["flux-stereo-tool", "recording-profile", "wow-flutter"]
guideType: "explainer"
prerequisites: ["calibration-basics"]
next: ["without-reference-tape", "nak-t100-practical-guide"]
---

## Elige una herramienta según la tarea

| Tarea | Punto de partida apropiado | Qué necesitas además |
| --- | --- | --- |
| Capturar un retorno y comparar tonos | Audacity | Entrada de línea estéreo y archivo de prueba repetible |
| Examinar nivel, espectro y distorsión | REW | Entrada correctamente configurada y ajustes de medida documentados |
| Comprobar velocidad, wow y flutter | NAK T-100 | Cinta de referencia independiente y detector correspondiente |
| Examinar balance y polaridad estéreo | FLUX:: Stereo Tool en un programa compatible | Referencia mono conocida y editor nativo del plugin |
| Guardar una corrección para futuras mixtapes | Flujo Calibración de MixtapeForge | Su propia prueba completa grabada y capturada a través de cinta |

Audacity y REW ofrecen versiones de escritorio para Windows, macOS y Linux. NAK T-100 se distribuye mediante las tiendas de Windows y macOS. Comprueba los requisitos actuales de sistema operativo y formato de plugin de FLUX frente al programa que usarás; no presupongas que cualquier anfitrión VST carga todos los formatos.

## Haz útil la primera sesión

1. Escoge una tarea, por ejemplo comprobar si izquierda y derecha regresan al mismo nivel.
2. Selecciona la entrada y salida físicas de línea de la interfaz. Haz coincidir las frecuencias de muestreo compatibles y desactiva ganancia automática, EQ y monitorización que produzca realimentación.
3. Empieza con un tono conocido a nivel moderado en lugar de música. Confirma ambos canales y deja margen de captura.
4. Guarda señal original, retorno sin procesar, versión del programa y ajustes. Repite antes de interpretar una diferencia pequeña.
5. Añade otra herramienta solo cuando responda una pregunta que la primera no puede resolver.

Por ejemplo, [el ejercicio de ida y vuelta con Audacity](../without-reference-tape/) enseña una captura reproducible. [La guía de NAK T-100](../nak-t100-practical-guide/) añade medidas específicas para casetes. [El ejercicio de Stereo Tool](../flux-stereo-tool/) explica la pantalla estéreo con una referencia conocida, sin adivinar a partir de música.

## Distingue análisis y corrección

Caso hipotético: un analizador encuentra una pérdida de agudos de 2 dB. No ha establecido que sea seguro realzar 2 dB al grabar ni si la pérdida pertenece a grabación o reproducción. Sigue haciendo falta una nueva comparación grabada.

MixtapeForge 0.1 no importa automáticamente curvas de calibración de REW ni medidas de NAK a sus perfiles. Utiliza [su secuencia guiada de perfil](../recording-profile/) para ese trabajo. Sus parámetros VST3 genéricos tampoco reproducen el osciloscopio nativo de un plugin externo.

Elige la configuración más sencilla que produzca una respuesta repetible. Para velocidad absoluta, nivel de reproducción o alineación del cabezal, el software no sustituye la cinta física de referencia necesaria.
