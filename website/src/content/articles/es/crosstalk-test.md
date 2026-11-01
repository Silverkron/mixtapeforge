---
id: "crosstalk-test"
lang: "es"
title: "Mide la diafonía entre los canales estéreo del casete"
description: "Graba un canal cada vez y distingue la señal que se filtra al otro del ruido de fondo o de una ruta mal configurada."
primaryKeyword: "Mide la diafonía entre los canales estéreo del casete"
secondaryKeywords: ["un bucle directo de la interfaz","La medida de ruido","Comprueba la interfaz antes de culpar al casete","Mide el siseo de la cinta respecto a una señal grabada"]
searchIntent: "evaluation"
answer: "La diafonía es señal que se filtra a un canal que debería estar en silencio. Esta prueba comprueba la filtración de izquierda a derecha y de derecha a izquierda en una cara del casete. No mide la filtración de las pistas de la cara opuesta, que necesita una disposición de grabación diferente."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Audacity: generador de tonos", "url": "https://manual.audacityteam.org/man/tone.html"}, {"title": "Audacity: separación de pistas estéreo", "url": "https://manual.audacityteam.org/man/splitting_and_joining_stereo_tracks.html"}, {"title": "Audacity: análisis de espectro", "url": "https://manual.audacityteam.org/man/plot_spectrum.html"}, {"title": "REW: configuración de la interfaz de audio", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}]
related: ["loopback-round-trip", "tape-hiss-snr", "different-decks"]
guideType: "measurement"
prerequisites: ["channel-balance"]
next: ["phase-polarity"]
---

## Prepara un archivo estéreo conocido

Utiliza Audacity, una interfaz de línea estéreo y una cinta virgen. Crea diez segundos de **sinusoide de 1 kHz con amplitud 0.1** en una pista mono, mueve su panorama completamente a la izquierda y exporta un WAV estéreo con el canal derecho en silencio. Crea un segundo tramo con el tono totalmente a la derecha y la izquierda en silencio. Vuelve a importar el WAV e inspecciónalo para confirmar que el silencio existe realmente en el archivo.

Conecta salida L/R de interfaz → LINE IN de pletina y LINE OUT → entrada de línea de interfaz. Desactiva NR, efectos, ampliación estéreo, suma mono y monitorización de entrada; selecciona el tipo de cinta correcto. Mantén las ganancias de captura fijas y sin saturación.

## Mide ambas direcciones

1. Graba ambos tramos a nivel moderado, rebobina y captura toda la reproducción como WAV estéreo.
2. Separa los canales de la captura en Audacity. Selecciona en el canal izquierdo la parte central estable del tramo enviado a la izquierda.
3. En **Plot Spectrum**, utiliza los mismos ajustes Spectrum/Hann/FFT en todas las lecturas. Anota el pico de 1 kHz del canal que recibe el tono.
4. Selecciona exactamente el mismo intervalo en el canal derecho, que debería estar en silencio. Lee su pico de 1 kHz si sobresale claramente del ruido cercano.
5. Resta el nivel filtrado al nivel del canal activo. Repite para el tramo enviado a la derecha y después repite la grabación.
6. Compara con [un bucle directo de la interfaz](../loopback-round-trip/) si puedes hacerlo. De lo contrario, informa de la separación de la cadena completa, no solo de la pletina.

## Interpreta el resultado

Ejemplo hipotético: el canal activo está a −20 dBFS y el tono del opuesto a −60 dBFS; son **40 dB de separación a 1 kHz**. Una separación positiva mayor significa menos filtración. Otra convención expresa la diafonía con signo: −40 dB. Indica siempre cuál usas.

Si no puedes distinguir el tono del ruido a −60 dBFS, puedes informar de un límite basado en ese fondo, no de una medida precisa de 40 dB. No interpretes el nivel total de ruido como si fuera el tono filtrado.

## Localiza errores de preparación habituales

Si ambos canales tienen niveles casi idénticos, comprueba primero rutas mono o monitorización. Si la filtración ya existe en el archivo exportado, la prueba no es válida. Un resultado que cambia mucho con la frecuencia necesita más que esta comparación a una sola frecuencia.

Comprobación final: canal opuesto realmente silencioso, ganancia fija, tono diferenciado del siseo, ambas direcciones y resultado repetido. [La medida de ruido](../tape-hiss-snr/) ayuda a entender el límite; procesar la polaridad no elimina la diafonía ordinaria.
