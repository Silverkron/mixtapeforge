---
id: "software-noise-reduction"
lang: "es"
title: "Dolby y dbx por software: herramientas, formatos y límites"
description: "Elige codificadores y decodificadores documentados, no una etiqueta genérica de reducción de ruido."
primaryKeyword: "Dolby y dbx por software"
secondaryKeywords: ["guía de nivel de reproducción","comprobaciones de ajuste","DNL y DNR","Reducción de ruido dbx"]
searchIntent: "task"
answer: "Un códec por software codifica o decodifica un formato NR concreto. Un reductor de ruido estima ruido no deseado y elimina parte de él. Son tareas distintas: un filtro genérico de «siseo de cinta» no decodifica Dolby ni dbx."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Anaxwaves · DDi Codec", "url": "https://www.anaxwaves.com/DDiCodec/"}, {"title": "Anaxwaves · DxI Codec", "url": "https://anaxwaves.com/DxICodec/"}, {"title": "Anaxwaves · DxII Codec", "url": "https://www.anaxwaves.com/DxIICodec/"}, {"title": "u-he · Satin 1.3.3", "url": "https://u-he.com/downloads/manuals/plugins/satin/Satin-user-guide.pdf"}, {"title": "libdolbyb", "url": "https://codeberg.org/martinwguy/libdolbyb"}]



guideType: "procedure"
prerequisites: ["dolby-b-c-s-playback"]
next: ["dull-dolby", "recording-computer"]
related: ["dbx-noise-reduction", "playback-level", "dolby-c"]
---

## Elige según el formato real

| Herramienta | Función documentada | Qué comprobar |
| --- | --- | --- |
| [DDi Codec](https://www.anaxwaves.com/DDiCodec/) | Codificación/decodificación B/C, aplicación independiente | Modo, referencia, sistema operativo |
| [DxII Codec](https://www.anaxwaves.com/DxIICodec/) / [DxI Codec](https://anaxwaves.com/DxICodec/) | dbx II / I respectivamente, más modos Disc | I y II no son intercambiables |
| [Satin](https://u-he.com/downloads/manuals/plugins/satin/Satin-user-guide.pdf) | Modelos compansores B-Type y uhx I/II entre sus efectos | Evitar coloraciones adicionales al probar el decodificador |
| [libdolbyb](https://codeberg.org/martinwguy/libdolbyb) | Biblioteca Type B del codificador opcional de MixtapeForge | Disponibilidad en la compilación y comparación con hardware |

No están todos incluidos en MixtapeForge. La versión 0.1 ofrece **Type B · libdolbyb** opcional, no C, S ni dbx. Su ranura estéreo VST3 externa no garantiza el funcionamiento de cualquier plugin o formato NR.

## Decodificar una cinta una sola vez

Necesitas el decodificador correcto, una interfaz con entradas de línea estéreo, software de captura y auriculares.

1. Conecta LINE OUT L/R de la pletina a LINE IN 1/2 de la interfaz. Selecciona nivel de línea, desactiva ganancia automática y evita saturación. La [guía de nivel de reproducción](../playback-level/) distingue pico digital y referencia Dolby.
2. Para decodificar por software, desactiva NR en la pletina y selecciona su EQ correcta. Captura estéreo sin procesar, con frecuencia compatible y 24 bits cuando sea posible. Conserva el original.
3. Abre una copia en el decodificador, elige el formato real y dirección **decode**. Utiliza un tono de referencia documentado si existe; sin él, el ajuste de oído sigue siendo una estimación.
4. Compara pasajes suaves y fuertes. Cambia el volumen de escucha después del decodificador; no normalices ni ecualices arbitrariamente el archivo codificado antes.
5. Guarda un archivo decodificado separado y anota modo y referencia. Nunca decodifiques de nuevo una captura ya decodificada por la pletina.

Para codificar: fuente normal → codificador → pletina con NR de grabación desactivado → decodificador correspondiente al reproducir. Prueba un minuto antes de la cara completa. Si desaparecen agudos suaves, sigue las [comprobaciones de ajuste](../dull-dolby/); aumentar el volumen final no corrige la referencia del decodificador.

Para reducir el siseo sin una cinta codificada, consulta [DNL y DNR](../dnl-dnr/): estos filtros de reproducción hacen un trabajo distinto al de un decodificador Dolby.
