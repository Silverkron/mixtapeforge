---
id: "phase-polarity"
lang: "es"
title: "Comprueba la polaridad y el desfase estéreo con una señal mono conocida"
description: "Entiende por qué invertir la polaridad puede corregir un fallo de conexión, pero no todos los problemas de fase o alineación."
primaryKeyword: "Comprueba la polaridad y el desfase estéreo con una señal mono conocida"
secondaryKeywords: ["el azimut","el diagnóstico del canal débil o mudo","La guía de Stereo Tool","Comprueba el azimut de reproducción sin perder la alineación original"]
searchIntent: "evaluation"
answer: "Una inversión de polaridad cambia el signo de la onda: lo positivo pasa a negativo. Un retardo temporal la desplaza horizontalmente. Un retardo produce ángulos de fase diferentes según la frecuencia, por lo que invertir la polaridad no suele deshacerlo."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "FLUX:: Stereo Tool: manual", "url": "https://doc.flux.audio/stereotool/"}, {"title": "FLUX:: Stereo Tool: producto y compatibilidad", "url": "https://www.flux.audio/project/stereo-tool-freeware/"}, {"title": "Audacity: separación de pistas estéreo", "url": "https://manual.audacityteam.org/man/splitting_and_joining_stereo_tracks.html"}]
related: ["azimuth-test", "quiet-channel", "different-decks"]
guideType: "measurement"
prerequisites: ["channel-balance"]
next: ["flux-stereo-tool"]
---

Una polaridad opuesta entre señales izquierda y derecha idénticas puede hacer desaparecer una voz central al sumar a mono. La música con efectos estéreo intencionales también puede mostrar correlación negativa: empieza con una referencia conocida.

## Equipo y referencia

Utiliza un programa anfitrión compatible que muestre el editor de FLUX:: Stereo Tool, o un osciloscopio estéreo con escucha mono. Crea una grabación corta de voz mono y envía exactamente las mismas muestras a L/R con igual ganancia. Desactiva todos los efectos. Para probar cinta, captura LINE OUT de la pletina mediante entradas de línea estéreo, con ganancias fijas y NR apropiado para lo grabado.

## Aprende primero el patrón correcto

1. Reproduce la referencia mono sin modificar a través de Stereo Tool, con ganancias de canal a 0 dB, inversión de polaridad desactivada y rutas y anchura neutras.
2. Observa el patrón mono centrado. Los canales idénticos deberían dar correlación cercana a +1. Si no ocurre, revisa las rutas del programa antes de introducir la pletina.
3. Invierte temporalmente un solo canal con el control de polaridad del plugin. El patrón debería mostrar canales opuestos y la suma mono del programa debería reducir mucho la referencia. Mantén bajo el volumen.
4. Restaura el control. Este error introducido a propósito te enseña cómo se ve una inversión relativa real.
5. Graba y captura la referencia a través de la pletina y compara el retorno sin procesar con los mismos ajustes neutros del plugin. Conserva disponible la referencia digital original.
6. Si el retorno se parece de forma constante a la inversión deliberada, comprueba cables y rutas. Prueba una inversión correctora solo sobre una copia y después de confirmar el fallo; guarda la captura sin procesar.

## Interpreta los resultados intermedios

Ejemplo hipotético: la referencia original queda bien centrada, pero el retorno de cinta dibuja una elipse y cambia con la frecuencia. No basta para justificar una inversión de polaridad. El retardo, [el azimut](../azimuth-test/) y la respuesta de los canales pueden modificar el patrón.

Una correlación próxima a +1 es esperable con mono idéntico, no con cualquier canción estéreo. Una lectura musical brevemente negativa invita a escuchar en mono; no demuestra automáticamente un fallo de cableado.

## Si la prueba resulta confusa

Si falta un canal, sigue [el diagnóstico del canal débil o mudo](../quiet-channel/). Una diferencia de ganancia inclina la imagen: mídela por separado. Si desactivar otros plugins del programa restaura el mono, investígalos antes de ajustar la pletina.

Comprobación final: canales idénticos conocidos, ajustes neutros, inversión deliberada restaurada, captura original conservada y efectos dependientes de frecuencia diferenciados de la polaridad. [La guía de Stereo Tool](../flux-stereo-tool/) amplía el procedimiento en un programa anfitrión; los parámetros genéricos de plugins de MixtapeForge no ofrecen esa pantalla nativa de medida.
