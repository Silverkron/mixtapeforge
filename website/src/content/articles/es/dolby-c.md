---
id: "dolby-c"
lang: "es"
title: "Dolby C explicado: diferencias con Dolby B"
description: "Por qué Dolby C necesita reproducción compatible y qué revisar en los decodificadores software."
primaryKeyword: "Dolby C explicado"
secondaryKeywords: ["Dolby B","guía de niveles","decodificación y reproducción","Dolby S"]
searchIntent: "informational"
answer: "Dolby C reduce el ruido durante grabación y reproducción con una acción mayor que Dolby B. Eleva los detalles suaves por encima del siseo y después invierte ese tratamiento al reproducir. Por eso una cinta grabada en C necesita decodificación C: B no es una alternativa más suave."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Dolby Laboratories · CP45 · Appendix D", "url": "https://www.film-tech.com/warehouse/manuals/DOLBYCP45USERS.pdf"}, {"title": "Anaxwaves · DDi Codec", "url": "https://www.anaxwaves.com/DDiCodec/"}]





guideType: "explainer"
prerequisites: ["dolby-b"]
next: ["dolby-b-c-s-playback", "software-noise-reduction"]
related: ["dull-dolby", "playback-compatibility", "recording-levels"]
---

Dolby C reduce el ruido durante grabación y reproducción con una acción mayor que [Dolby B](../dolby-b/). Eleva los detalles suaves por encima del siseo y después invierte ese tratamiento al reproducir. Por eso una cinta grabada en C necesita decodificación C: B no es una alternativa más suave.

## Por qué deben coincidir los modos

Escucha la respiración tenue de una voz seguida de un golpe fuerte de batería. La decodificación correcta conserva su relación. Un modo incorrecto puede exagerar o hacer desaparecer la respiración, mientras el fondo sube y baja siguiendo la música. Este efecto se llama **bombeo**. No es un desequilibrio tonal constante que se resuelva simplemente con EQ.

## Una comparación grabada útil

Necesitas una pletina con C, una cinta virgen compatible, la fuente original y auriculares. Conecta la salida de línea estéreo de la fuente a LINE IN L/R; escucha desde la pletina o el amplificador.

1. Desactiva NR por software, selecciona C en la pletina y ajusta correctamente el tipo de cinta.
2. Reproduce el fragmento más fuerte y ajusta REC LEVEL según el manual. La [guía de niveles](../recording-levels/) explica los indicadores.
3. Graba un minuto con pasajes suaves y fuertes. Detén y rebobina.
4. Reproduce con C activado y compara con la fuente a volumen parecido, incluido el final tranquilo.
5. Si utilizarás otra pletina, comprueba allí la reproducción antes de grabar toda la cara.

Si la segunda pletina no tiene C, elige otro formato para esa persona. Si ambas tienen C pero solo una suena apagada, comprueba [decodificación y reproducción](../dull-dolby/) antes de dar brillo permanente al máster.

## Software disponible

[DDi Codec](https://www.anaxwaves.com/DDiCodec/) codifica y decodifica B/C como aplicación comercial independiente. Sus ajustes siguen necesitando una referencia fiable o una decisión reconocidamente subjetiva. MixtapeForge 0.1 no incorpora un codificador C: su opción Type B no prepara cintas C.

Antes de conservar la prueba, comprueba C en ambos extremos, pasajes fuertes limpios y colas suaves naturales.

Como alternativa para música tranquila, compara [Dolby S](../dolby-s/) antes de elegir el formato.
