---
id: "nak-t100-practical-guide"
lang: "es"
title: "NAK T-100: guía práctica para medir tu pletina de casete"
description: "Configura NAK T-100, establece una referencia repetible y elige las pruebas adecuadas para tu pletina, cinta y casetes de referencia."
primaryKeyword: "NAK T-100"
secondaryKeywords: ["la cinta de referencia adecuada","el procedimiento de nivel de reproducción","la prueba de respuesta con tonos discretos","flujo de perfiles de grabación de MixtapeForge"]
searchIntent: "task"
answer: "NAK T-100 es un analizador de audio independiente, no un reproductor de casetes ni un sistema de ajuste automático de pletinas. Usa esta primera sesión para responder una pregunta limitada: ¿la misma configuración produce un nivel y un equilibrio tonal estables al repetir la grabación?"
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100: presentación y especificaciones oficiales", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "NAK T-100: lista de comprobación de medidas", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "NAK T-100: preguntas frecuentes oficiales", "url": "https://www.anaxwaves.com/NAKT100/T100FAQ/index.html"}, {"title": "NAK T-100: descripción e historial de versiones del desarrollador", "url": "https://apps.apple.com/us/app/nak-t-100-audio-analyzer/id1533153639?mt=12"}]
related: ["calibration-basics", "speed-test", "wow-flutter", "recording-profile"]
guideType: "procedure"
prerequisites: ["without-reference-tape"]
next: ["frequency-response", "wow-flutter"]
---

## Decide qué quieres averiguar

El procedimiento es una propuesta original basada en la documentación del desarrollador, no un informe de hardware probado para este artículo. Lee también la ayuda incluida con tu versión y el manual de la pletina. La lista de comprobación enlazada es un recordatorio para usuarios con experiencia, no sustituye ninguno de esos manuales.

## Qué debes preparar

Necesitas NAK T-100, una interfaz con entradas y salidas de línea estéreo, cables compatibles y una cinta prescindible para las pruebas de grabación. Para comprobar velocidad o alineación de forma independiente, añade [la cinta de referencia adecuada](../calibration-tapes/). Una pletina de tres cabezales permite devolver en directo la señal recién grabada; una de dos cabezales debe grabar, rebobinar y reproducir.

Una **referencia relativa** es una lectura que conservas como punto de comparación. Resulta útil cuando puedes repetirla con los mismos controles. No es automáticamente una referencia magnética o de tensión calibrada.

## Instálalo y establece un recorrido de audio conocido

Sigue los enlaces oficiales a la tienda de tu sistema operativo. Las preguntas frecuentes describen licencias de pago perpetuas para Windows y macOS, adquiridas por separado; comprueba la disponibilidad actual en cada tienda. No se ofrece una versión nativa para Linux.

Para las pruebas de grabación, conecta **salida de interfaz → LINE IN de pletina** y **LINE OUT de pletina → entrada de línea de interfaz**. Selecciona el par estéreo adecuado en ambos extremos. Si hace falta, utiliza la asignación de canales de tu versión instalada o el programa de rutas de la interfaz. No uses un recorrido exclusivamente de micrófono con ganancia automática.

Elige una frecuencia de muestreo común y compatible para entrada y salida. Usa 48 o 96 kHz, si están disponibles, al examinar la parte alta de la banda audible; subir este ajuste no compensa un recorrido analógico deficiente. Desactiva mejoras, EQ, control automático de nivel y monitorización de entrada a salida no deseada. Escucha los tonos a volumen bajo en altavoces o auriculares.

## Establece los niveles antes de buscar fallos

Empieza con reducción de ruido desactivada y el tipo de cinta correcto. Fotografía los controles y anota las ganancias de la interfaz. Usa el monitor de fuente de la pletina si existe: permite comprobar el recorrido eléctrico antes de añadir la cinta. No demuestra que el recorrido de cinta esté calibrado.

En modo **Basic**, localiza **Function**, **OSC** y el indicador de nivel. Empieza con **Level**, una referencia constante de **400 Hz** y salida baja. Súbela gradualmente hasta una lectura razonable especificada para tu pletina, comprobando que la entrada de la interfaz no sature. No copies las posiciones de los mandos de otra máquina ni supongas que el cero significa lo mismo en todos los medidores.

La referencia de tensión calibrada de NAK T-100, la marca 0 VU de la pletina y 0 dBFS son referencias distintas. Su escala de tensión requiere calibración externa antes de tratarla como un voltímetro absoluto. Para esta primera sesión basta una referencia relativa documentada; utiliza [el procedimiento de nivel de reproducción](../playback-level/) cuando necesites una referencia absoluta.

## Comprueba la interfaz por separado si hace falta

Si puedes conectar temporalmente la salida de la interfaz directamente a su entrada de línea, mide primero ese **loopback** o bucle directo. Empieza con salida reducida y una entrada de línea capaz de aceptarla. Así identificas limitaciones de la pareja de salida y entrada antes de incluir la pletina. Si mantienes el cableado habitual, anota que no se midió una referencia independiente de la interfaz.

El procedimiento opcional **Sound Card FR Compensation** está documentado como compensación de la visualización. No envía una EQ correctora a la pletina, no establece una calibración absoluta de tensión y no se convierte en un perfil de grabación de casetes. Repítelo después de cambiar los puertos, la frecuencia de muestreo o las ganancias a los que se refiere.

## Una primera sesión, en orden

1. Selecciona el par físico de entrada y salida estéreo y haz coincidir su frecuencia de muestreo en el sistema operativo o el panel de la interfaz. Empieza con salida baja.
2. Selecciona el tipo de cinta correcto y NR desactivado. En Basic, elige Function **Level** y OSC **400 Hz**.
3. Mientras observas el medidor de fuente o entrada de la pletina, sube gradualmente la salida hasta una referencia moderada. Anota esa lectura y evita saturar la captura. No supongas que el cero del analizador equivale al de la pletina.
4. Avanza más allá del tramo transparente, pulsa REC en la pletina y graba unos diez segundos. Mantén todas las ganancias fijas.
5. Con dos cabezales, detén, rebobina y pulsa PLAY. Con tres, elige monitorización Tape. Lee la parte central estable de L/R y anota los valores.
6. Repite una vez sin ajustar nada. Si las lecturas cambian apreciablemente, investiga cinta, conexiones y captura antes de pasar a respuesta en frecuencia.

Compara la parte central estable, no el arranque ni la parada. Anota las lecturas de ambos canales, repite con los mismos controles y escucha la grabación. Un resultado fluctuante necesita investigación antes de corregirlo. El retorno combina errores de interfaz, grabación y reproducción; por sí solo no identifica la etapa responsable.

## Explora la respuesta en frecuencia a un nivel controlado

Abre **Scope** e identifica los controles de respuesta en frecuencia. Para una comparación inicial, utiliza **FR White** o **FR Sweep** con nivel de grabación reducido deliberadamente y comprueba el nivel real en la pletina. La indicación **−20 dB** solo tiene sentido si documentas respecto a qué referencia. Un selector de rango de medida no reduce necesariamente la señal generada.

Graba una pasada completa y repite en las mismas condiciones. **FR Sweep está documentado como asíncrono**: con dos cabezales, graba la prueba, detén, rebobina y reproduce hacia el analizador con la medida FR correspondiente seleccionada. Consulta la ayuda de tu versión instalada para los controles de adquisición; no presupongas que hace falta un control externo de sincronización. Si necesitas una alternativa con generación, captura y lectura descritas paso a paso, sigue [la prueba de respuesta con tonos discretos](../frequency-response/).

Valora primero diferencias estables entre canales y tendencias amplias, no pequeñas ondulaciones. Una segunda prueba a mayor nivel puede revelar saturación de agudos, pero responde otra pregunta. Conserva su traza separada en lugar de mezclar resultados en una sola curva. Sin una cinta de referencia de reproducción, el resultado describe toda la cadena de grabación y reproducción.

## Añade velocidad y wow/flutter solo con la referencia adecuada

Para comprobar independientemente la velocidad de reproducción, usa una **cinta fiable de 3000 o 3150 Hz**, selecciona **Speed Wow/Flutter** y haz coincidir **Speed Cal.** con la cinta. Un tono grabado en la misma máquina no establece su velocidad absoluta de reproducción.

Como ejemplo de cálculo, leer 3015 Hz a partir de una referencia de 3000 Hz equivale aproximadamente a **+0,5 %**: `(3015 / 3000 − 1) × 100`. Son cifras ilustrativas, no resultados medidos de una pletina.

Anota detector y ponderación junto a cada valor de wow/flutter. **Q-PK** y **WRMS** responden a convenciones distintas y no son intercambiables. Las pruebas grabadas por ti permiten comprobar repetibilidad, pero incluyen las contribuciones de transporte al grabar y reproducir. Un pico aislado también puede implicar una pérdida de señal o un problema de captura del ordenador: repite el pasaje antes de diagnosticar el mecanismo.

## Mantén comparables las lecturas de distorsión y ruido

Para distorsión, examina la función documentada **T.H.Dist.** con fundamental conocida y nivel de grabación fijo. Identifica por separado **THD+N** y **HD3**: no son equivalentes. Si la lectura sube, comprueba que no se estén sobrecargando la interfaz ni la entrada de la pletina antes de culpar a la cinta.

Para ruido, selecciona **Noise-A (−40 dB)** y mide un tramo de silencio grabado sin tono de prueba llegando a la cinta. Usa monitorización Tape durante la grabación con tres cabezales, o graba silencio y reprodúcelo con dos. Conserva el mismo recorrido de ganancia. Según la convención de escala de la lista de comprobación enlazada, resta **40 dB** a la lectura indicada en dB y otros **20 dB** si Meter Range está en **−20 dB/0.1%**. Confirma estos desplazamientos en la ayuda de tu versión antes de informar de un valor. Documenta nivel de referencia y ponderación: el nivel de ruido corregido todavía no es una SNR positiva. Como ejemplo relativo hipotético, una referencia a 0 dBr y ruido corregido a −55 dBr dan 55 dB de separación con las mismas convenciones, no una especificación universal de la pletina.

## Guarda pruebas que puedas reutilizar

Si capturas el retorno por separado con un grabador de audio, conserva el archivo estéreo sin procesar. Guarda juntos capturas de pantalla, versión de software, identidad de cinta y posiciones de controles. Describe cada valor con su nivel y método: «0,08 %» sin detector o «plana hasta 18 kHz» sin nivel de grabación son datos incompletos.

No gires tornillos del cabezal, bias o ajustes de servicio solo para enderezar una gráfica. La alineación interna sigue el procedimiento del modelo y necesita referencias apropiadas. NAK T-100 mide; no ajusta físicamente la pletina.

El [flujo de perfiles de grabación de MixtapeForge](../recording-profile/) es independiente. No hay una importación automática documentada de medidas de NAK T-100 a sus perfiles. Usa su prueba guiada para obtener un perfil reutilizable en la aplicación y las observaciones del analizador para entender la cadena, sin prometer una corrección automática válida para todos los reproductores.

## Si la primera prueba falla

| Síntoma | Comprobación | Siguiente acción |
| --- | --- | --- |
| No se mueven los medidores de entrada | LINE IN física seleccionada y par estéreo correspondiente al cable | Corrige las rutas antes de subir ganancia |
| Tono claro pero onda recortada | Modo de línea y rango de entrada de la interfaz | Baja la ganancia de captura y repite la referencia |
| La curva de agudos cambia en cada pasada | Contacto con la cinta, tramo e interrupciones de entrada | Repite con otra cinta en buen estado antes de ecualizar |
| Lectura de velocidad fuera de lo esperado | Referencia de 3000 o 3150 Hz y Speed Cal. coincidente | Corrige la selección de referencia, no el motor |
| Ruido aparentemente imposible | Modo Noise-A, Meter Range y desplazamientos de escala | Recalcula con los desplazamientos documentados y la misma referencia |

Comprobación final: conexiones físicas de línea; ganancias fijas; distinción Source/Tape; reproducción completa; magnitud y referencia indicadas; pruebas originales conservadas. Los procedimientos se han contrastado con documentación, no validado en tu hardware.
