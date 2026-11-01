---
id: "recording-levels"
lang: "es"
title: "Niveles de grabación: evitar distorsión sin grabar demasiado bajo"
description: "Ajusta el nivel con una prueba grabada que conserve claridad en los momentos más fuertes."
primaryKeyword: "Niveles de grabación"
secondaryKeywords: ["conexiones desde el ordenador","normalización y compresión","la guía de diagnóstico","Cómo grabar una cassette desde el ordenador"]
searchIntent: "task"
answer: "Ajusta el nivel con una prueba grabada que conserve claridad en los momentos más fuertes. Un indicador más alto no garantiza mejor sonido: demasiado nivel puede volver ásperas las voces y apagar o emborronar los platos."
category: "recording"
image: "recording"
updated: "2026-11-01"
sources: [{"title": "TEAC W-1200 — funciones y tipos de cinta", "url": "https://teac.jp/jp/support/news/5488"}, {"title": "Audacity — glosario de audio digital", "url": "https://manual.audacityteam.org/man/glossary.html"}]
guideType: "procedure"
related: ["recording-computer", "normalization-compression-eq", "distorted-recordings"]
prerequisites: ["recording-computer"]
next: ["recording-computer"]
---

## Dos escalas distintas

El medidor digital de picos usa dBFS: 0 es el límite digital. La pletina tiene su propia escala, a menudo alrededor de 0 dB, que no equivale a 0 dBFS. Su lectura depende de la salida real y de REC LEVEL.

## Ajusta el nivel con una grabación

Prepara las [conexiones desde el ordenador](../recording-computer/), la cinta definitiva y un pasaje fuerte y otro tranquilo. Ajusta antes tipo y NR. Mantén fijo el volumen del ordenador/interfaz.

1. Pon la pletina en pausa de grabación. Reproduce el pasaje fuerte y ajusta REC LEVEL a la zona inicial recomendada por el manual. No existe una regla universal de +3 dB.
2. Graba unos 30 segundos, detén, rebobina y escucha desde cinta: canales, consonantes, ataques del bajo y platos.
3. Si suena más áspera que la fuente, baja REC LEVEL y repite el mismo fragmento. Cambia un solo control. Si también distorsiona una toma baja, comprueba la fuente y la interfaz antes de la pletina.
4. Escucha el fragmento tranquilo. Si el siseo lo tapa, prueba algo más de nivel mientras la parte fuerte siga limpia. Elige el compromiso más claro.
5. Anota dispositivo/volumen, REC LEVEL, cinta y NR; mantenlos durante la cara.

**EQ / Audio** incluye [normalización y compresión](../normalization-compression-eq/), pero no calibra el medidor físico. Con Type B por software sigue el ajuste de referencia y evita cambiar ganancia después de codificar.

**Comprobación final:** sin clipping digital, parte fuerte limpia, parte tranquila utilizable y ajustes anotados. Si sigue distorsionando, consulta [la guía de diagnóstico](../distorted-recordings/).
