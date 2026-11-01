---
id: "tape-hiss-snr"
lang: "es"
title: "Mide el siseo de la cinta respecto a una señal grabada"
description: "Compara un tono de referencia y un silencio grabado con ganancia fija para obtener una relación señal/ruido significativa."
primaryKeyword: "Mide el siseo de la cinta respecto a una señal grabada"
secondaryKeywords: ["la guía de NAK","Dolby B","Mide la distorsión del casete sin confundirla con el siseo","Dolby B explicado"]
searchIntent: "evaluation"
answer: "Un medidor de ruido por sí solo no indica si una cinta es silenciosa. La relación señal/ruido, o SNR, compara una señal definida con el ruido que queda por debajo. Bajar el volumen de reproducción reduce ambos: no mejora la SNR."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "REW: espectro, niveles RMS y distorsión", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/spectrum.html"}, {"title": "NAK T-100: especificaciones oficiales", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "NAK T-100: lista de comprobación de medidas", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["distortion-test", "dolby-b", "calibration-software"]
guideType: "measurement"
prerequisites: ["without-reference-tape"]
next: ["recording-levels"]
---

## Prepara dos tramos con los mismos ajustes

Utiliza una cinta virgen, una interfaz de línea estéreo y el RTA en directo de REW para leer niveles. Este procedimiento mide directamente la pletina; una captura WAV separada es documentación opcional. Conecta salida de interfaz → LINE IN de pletina y LINE OUT → entrada de línea de interfaz. Desactiva ganancia automática, NR y procesamiento. Mantén fijos los controles de fuente, pletina y captura.

Genera una **sinusoide corta de 1 kHz** a un nivel moderado y documentado en la pletina. Añade al menos diez segundos de silencio digital mientras la pletina sigue en REC. Así grabas el ruido real de borrado, bias y grabación. Una cinta virgen sin tocar o la pletina en Stop representan condiciones distintas.

## Mide señal y ruido

1. Graba el tono y el silencio en la cinta; detén y rebobina hasta antes del tono. Deja detenida la pletina mientras preparas REW.
2. Selecciona un canal de entrada en REW y abre **RTA**. Usa la escala dBFS. Inicia el analizador con su control de grabación y observa **Input RMS**, que representa la energía media de la señal en lugar de los picos instantáneos.
3. Pulsa PLAY en la pletina. Lee el centro estable del tono de referencia. Anota el valor RMS sin ponderar y los ajustes de ancho de banda y filtros de análisis.
4. Lee el centro del silencio grabado con el mismo canal, ganancia, ancho de banda y criterio RMS sin ponderar. Evita el transitorio del cambio entre tono y silencio.
5. Resta el nivel de ruido al nivel de señal. Repite para el otro canal y otro intervalo de silencio.
6. Si utilizas también ponderación A, anota los valores correspondientes de referencia y ruido como un resultado separado. La ponderación cambia la importancia de las frecuencias: no mezcles cifras ponderadas y sin ponderar.

## Recorre un ejemplo

Lecturas hipotéticas: tono a **−18 dBFS RMS** y ruido a **−70 dBFS RMS**. La separación es **52 dB** con esos ajustes. No es automáticamente comparable con una especificación referida al nivel máximo de salida o medida con otra ponderación.

NAK T-100 ofrece Noise-A, pero debes tener en cuenta sus desplazamientos de escala. Consulta [la guía de NAK](../nak-t100-practical-guide/) en lugar de interpretar la indicación de ruido como una SNR positiva ya calculada.

## Si el número te sorprende

Si el ruido cambia al encender una pantalla o un cargador, investiga interferencias eléctricas. Si el «silencio» contiene música, comprueba que se haya grabado encima por completo. Si cambiaste la ganancia de entrada entre tramos, repite ambas lecturas. Si guardas además un WAV, conserva los dos tramos en un único archivo sin procesar ni normalizar.

Comprobación final: silencio grabado, referencia de señal indicada, ganancia idéntica, mismo criterio RMS, ponderación y ancho de banda, y ambos canales. Prueba [Dolby B](../dolby-b/) como otra condición con codificación y decodificación correspondientes; cambiar solo el NR de reproducción plantea una pregunta distinta.
