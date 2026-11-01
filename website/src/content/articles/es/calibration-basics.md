---
id: "calibration-basics"
lang: "es"
title: "Calibración de casetes: elige la prueba adecuada antes de ajustar nada"
description: "Aprende qué mide cada prueba, prepara conexiones fiables y decide cuál es la siguiente comprobación."
primaryKeyword: "Calibración de casetes"
secondaryKeywords: ["qué cinta de calibración sirve para cada prueba","las comprobaciones que no necesitan una cinta de referencia","el procedimiento del perfil de grabación","Comprueba la interfaz antes de culpar al casete"]
searchIntent: "informational"
answer: "Una grabación puede sonar apagada por la cinta, la electrónica de grabación, la alineación de reproducción o incluso los ajustes de captura. Calibrar consiste en comparar un resultado con una referencia conocida y ajustar la parte correspondiente. Grabar un tono y reproducirlo es útil, pero no permite separar todas esas partes."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100: especificaciones oficiales", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "REW: configuración de la interfaz de audio", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}, {"title": "MRL: selección y alcance de las cintas de referencia", "url": "https://mrltapes.com/pages/product-guide"}]
related: ["loopback-round-trip", "calibration-tapes", "recording-profile"]
guideType: "explainer"
prerequisites: []
next: ["needs-calibration", "without-reference-tape"]
---

## Decide qué quieres averiguar

| Tu pregunta | Prueba útil | Qué incluye el resultado |
| --- | --- | --- |
| ¿La interfaz modifica la señal? | Bucle directo o loopback | Salida, cable y entrada |
| ¿Esta cinta graba bien en esta pletina? | Grabar, rebobinar y reproducir | Interfaz, grabación, cinta y reproducción |
| ¿La velocidad de reproducción es correcta? | Casete de referencia de velocidad certificado | Transporte de reproducción e incertidumbre de la referencia |
| ¿Puedo mejorar mi próxima mixtape? | Perfil de grabación repetible | Compensación de la combinación medida |

Una **cinta de referencia** contiene una señal cuyas propiedades grabadas se conocen. Una cinta grabada por ti no es una referencia independiente. Consulta [qué cinta de calibración sirve para cada prueba](../calibration-tapes/).

## Prepara un punto de partida fiable

Necesitas una pletina que funcione, una cinta virgen prescindible, un ordenador y una interfaz con entradas y salidas de línea estéreo. Las entradas de micrófono con ganancia automática no sirven: cambian el nivel que intentas comparar.

1. Conecta las salidas L/R de la interfaz a LINE IN L/R de la pletina y LINE OUT L/R de la pletina a las entradas de línea de la interfaz. Desactiva la monitorización de entrada por software para evitar que la señal de retorno vuelva a su propia salida.
2. Selecciona los puertos físicos que estás usando. Ajusta la frecuencia de muestreo del programa a la de la interfaz; 44,1 o 48 kHz bastan para las primeras comprobaciones en la banda audible si los dispositivos las admiten.
3. Desactiva Dolby/NR, ecualización, compresión y controles automáticos de nivel. Selecciona el tipo de cinta correcto.
4. Empieza con la salida baja. Graba una prueba corta después del tramo transparente inicial, rebobina y reproduce. Reduce la ganancia de entrada si el medidor digital indica saturación.
5. Repite sin mover los controles. Si los resultados difieren apreciablemente, busca la causa de esa inestabilidad antes de aplicar una corrección.

Una pletina de tres cabezales permite escuchar la cinta mientras graba. Una de dos cabezales necesita el ciclo grabar–rebobinar–reproducir: escuchar la fuente no demuestra qué quedó en la cinta.

## Convierte una observación en una decisión

Ejemplo hipotético: las dos repeticiones devuelven 2 dB menos de agudos. Eso justifica investigar el recorrido completo, no subir inmediatamente 2 dB. Si la pérdida cambia entre pasadas, una ecualización fija resulta especialmente inadecuada.

Empieza por [las comprobaciones que no necesitan una cinta de referencia](../without-reference-tape/). Para guardar un ajuste reutilizable en la aplicación, sigue [el procedimiento del perfil de grabación](../recording-profile/). MixtapeForge 0.1 ofrece una prueba guiada del recorrido completo; no certifica la alineación mecánica ni calibra por separado la velocidad de reproducción.
