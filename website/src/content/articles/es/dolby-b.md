---
id: "dolby-b"
lang: "es"
title: "Dolby B explicado: cómo reduce el siseo"
description: "Entiende Dolby B, elige dónde codificar y evita procesar dos veces la misma señal."
primaryKeyword: "Dolby B explicado"
secondaryKeywords: ["guía de niveles","comprobaciones de Dolby","software NR","Dolby y dbx por software"]
searchIntent: "informational"
answer: "Dolby B reduce el «shhh» continuo que se oye detrás de los pasajes tranquilos de una cinta. Trabaja en dos etapas: la codificación modifica la señal antes de grabarla; la decodificación deshace ese cambio durante la reproducción y atenúa el siseo añadido por la cinta. No elimina el ruido que ya contiene la fuente."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Dolby Laboratories · CP45 · Appendix D", "url": "https://www.film-tech.com/warehouse/manuals/DOLBYCP45USERS.pdf"}, {"title": "IASA · TC-04 · 5.4.11", "url": "https://www.iasa-web.org/book/export/html/435"}, {"title": "libdolbyb", "url": "https://codeberg.org/martinwguy/libdolbyb"}]





guideType: "explainer"
prerequisites: []
next: ["dolby-b-c-s-playback", "dull-dolby"]
related: ["software-noise-reduction", "bias-eq-nr", "recording-levels"]
---

## ¿Qué ocurre con la música?

Durante la codificación, la cola suave de un platillo recibe más énfasis en los agudos que un golpe fuerte. El decodificador aplica la reducción correspondiente. La acción sigue a la música: un ajuste fijo de agudos no puede reproducirla. Una cinta codificada, escuchada con NR desactivado, suele sonar más brillante y ruidosa. Al activar B debería recuperar el equilibrio natural, sin apagar toda la música.

## Primera prueba con la pletina

Necesitas una pletina que grabe y reproduzca Dolby B, una cinta virgen adecuada, auriculares y un fragmento conocido con voz, percusión y un final tranquilo. Esta comprobación de escucha no requiere un analizador.

1. Conecta la salida de línea estéreo del ordenador o interfaz a LINE IN L/R de la pletina. Empieza con volumen bajo y ajusta el pasaje más fuerte siguiendo la [guía de niveles](../recording-levels/).
2. Selecciona el tipo de cinta correcto, desactiva la codificación por software y activa Dolby B en la pletina. Será el único codificador.
3. Graba aproximadamente un minuto, incluido el final. Detén, rebobina y reproduce con Dolby B activado.
4. Compara con el original a un volumen de escucha parecido. Ajusta los auriculares o el amplificador, no REC LEVEL.
5. Desactiva brevemente NR durante la reproducción y vuelve a B. Escucha el siseo en la pausa y cómo se extingue el platillo.

El resultado debe mantener una voz y unas colas naturales con menos ruido. Si B apaga demasiado voces o platillos, sigue las [comprobaciones de Dolby](../dull-dolby/) antes de añadir EQ.

## Si codifica el software

MixtapeForge 0.1 ofrece **Type B · libdolbyb**, opcional, en los ajustes de audio. En ese caso graba con NR de la pletina **OFF** y escucha después con Dolby B del hardware **ON**. La preescucha codificada de la app no es el resultado decodificado. La compatibilidad con tu pletina requiere una prueba grabada y ajustar el nivel de referencia: un valor de 0 no desactiva la codificación ni significa «grabar a 0 dB en la pletina».

La guía de [software NR](../software-noise-reduction/) explica las alternativas. Antes de una cara completa, comprueba: un codificador, un decodificador correspondiente, niveles estables y un final musical inteligible.
