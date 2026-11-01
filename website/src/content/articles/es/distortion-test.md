---
id: "distortion-test"
lang: "es"
title: "Mide la distorsión del casete sin confundirla con el siseo"
description: "Compara una sinusoide limpia con su reproducción grabada y distingue THD, THD+N y distorsión del tercer armónico."
primaryKeyword: "Mide la distorsión del casete sin confundirla con el siseo"
secondaryKeywords: ["referencia directa de la interfaz","el nivel de grabación","Por qué desaparecen los agudos fuertes en cinta","Niveles de grabación"]
searchIntent: "evaluation"
answer: "La distorsión añade frecuencias ausentes en la entrada. Una sinusoide pura de 400 Hz puede regresar con componentes a 800, 1200 Hz y superiores: son sus armónicos. Explican por qué aumentar el nivel de grabación puede dar aspereza a un tono o instrumento."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100: especificaciones oficiales", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "NAK T-100: lista de comprobación de medidas", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "REW: espectro, niveles RMS y distorsión", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/spectrum.html"}]
related: ["high-frequency-saturation", "recording-levels", "nak-t100-practical-guide"]
guideType: "measurement"
prerequisites: ["without-reference-tape"]
next: ["maximum-output-level"]
---

**THD** combina la distorsión armónica. **THD+N** incluye también ruido. **HD3** mide solo el tercer armónico, situado al triple de la frecuencia de prueba. Mantén estas denominaciones separadas al comparar resultados.

## Qué necesitas

Utiliza NAK T-100, una interfaz de línea estéreo y una cinta prescindible. Conecta salida → LINE IN de la pletina y LINE OUT de la pletina → entrada de línea. Desactiva NR, EQ, compresión y ganancia automática. Una [referencia directa de la interfaz](../loopback-round-trip/) resulta útil porque la distorsión puede aparecer antes de llegar a la cinta.

## Compara niveles de grabación moderados

1. Selecciona **T.H.Dist.** en NAK T-100. Elige la frecuencia base documentada de **400 Hz** e identifica si el resultado mostrado es THD+N o HD3. Mantén ese modo durante toda la comparación.
2. Empieza con la salida baja y graba a un nivel moderado en la pletina. Comprueba que la entrada de captura no sature. Anota lectura de la pletina, ajuste del generador y ganancias de entrada.
3. En una pletina de tres cabezales, monitoriza Tape. Con dos cabezales, graba un tramo corto, detén, rebobina y reproduce hacia el analizador.
4. Lee la parte central estable de izquierda y derecha por separado. Cambia Meter Range si la lectura queda fuera del rango mostrado; no informes de un valor clavado en el límite.
5. Graba un segundo tramo con un aumento pequeño y documentado del nivel, sin cambiar la ganancia de captura. Si la interfaz satura, reduce su ganancia y repite ambos tramos.
6. Repite las medidas y guarda modo, frecuencia, nivel y canal junto a cada resultado.

## Interpreta el resultado, no persigas un solo porcentaje

Ejemplo hipotético: HD3 pasa de 0,5 % a 1,5 % al aumentar el nivel de grabación. Eso muestra una contribución creciente del tercer armónico en esas condiciones, no un umbral universal de audibilidad. No puedes sustituir ninguno de esos valores por un resultado THD+N.

Si THD+N aumenta al bajar el nivel de grabación, el ruido puede representar ahora una proporción mayor de la señal. No es lo mismo que el aumento de no linealidad de la cinta a niveles altos. Examina el espectro sin procesar o la lectura HD3 para investigarlo.

## Si el resultado es inesperadamente malo

Comprueba saturación digital, frecuencia fundamental seleccionada, modo de entrada de línea y procesamiento de la fuente. Si la misma distorsión elevada aparece en el bucle directo, investiga primero la interfaz. Si solo empeora el retorno de cinta grabado más alto, plantéate reducir [el nivel de grabación](../recording-levels/).

Comprobación final: sinusoide conocida, magnitud especificada, recorrido de captura sin cambios, canales separados y lecturas repetidas. El análisis del perfil de MixtapeForge no es un analizador de distorsión certificado ni sustituye esta comparación con un instrumento específico.
