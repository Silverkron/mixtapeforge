---
id: "normalization-compression-eq"
lang: "es"
title: "Normalización, compresión y EQ: tres funciones diferentes"
description: "Usa normalización para diferencias entre canciones, compresión para cambios excesivos dentro de una canción y EQ para el timbre."
primaryKeyword: "Normalización, compresión y EQ"
secondaryKeywords: ["una prueba grabada","las causas antes de subir agudos","un perfil de grabación","Niveles de grabación"]
searchIntent: "task"
answer: "Usa normalización para diferencias entre canciones, compresión para cambios excesivos dentro de una canción y EQ para el timbre. Empieza con todo desactivado: cada tratamiento debe resolver un problema audible concreto."
category: "recording"
image: "recording"
updated: "2026-11-01"
sources: [{"title": "Audacity — normalización del volumen percibido", "url": "https://manual.audacityteam.org/man/loudness_normalization.html"}, {"title": "Audacity — controles del compresor", "url": "https://manual.audacityteam.org/man/compressor.html"}, {"title": "Audacity — glosario de audio digital", "url": "https://manual.audacityteam.org/man/glossary.html"}]
guideType: "procedure"
related: ["recording-levels", "recording-profile", "muffled-cassettes"]
prerequisites: []
next: ["recording-levels"]
---

## Entiende los controles

La normalización aplica ganancia. Peak iguala picos, no volumen percibido. LUFS estima este último; Album aplica ganancia común conservando las relaciones. La compresión reduce la dinámica: umbral, relación, ataque y liberación definen cuándo, cuánto y con qué rapidez actúa. El EQ modifica bandas de frecuencia, como graves y agudos.

## Prueba en MixtapeForge

1. Abre **EQ / Audio**, selecciona un pasaje conocido y escucha el original.
2. Prueba LUFS para una recopilación desigual, Album para un álbum continuo. Mantén el límite true peak por debajo de 0 dBTP; −1 dBTP es un ejemplo inicial, no una referencia de calibración. El límite de pico tiene prioridad sobre el objetivo de volumen.
3. Deja la compresión apagada salvo que los picos sean un problema. El preset **Luz** (compresión ligera) parte de 1,5:1, umbral −18 dB, ataque 30 ms y liberación 250 ms. Depende del nivel de origen. Si la batería pierde ataque o el volumen bombea, reduce o desactiva el efecto.
4. Empieza con EQ plana. Modifica ligeramente una banda o inspecciona los cambios de un preset. Un género es una preferencia musical, no una corrección automática de la cinta.
5. Compara original/máster a volumen parecido y haz [una prueba grabada](../recording-levels/). Conserva la versión que mejore la cinta.

Si sigue apagada, comprueba [las causas antes de subir agudos](../muffled-cassettes/). El programa no repara el recorrido de cinta. Con codificación NR aplica estos cambios antes de codificar; evita EQ y normalización posteriores.

**Terminado:** problema mejorado, picos controlados, ataques conservados y cinta escuchada. Para compensación medida utiliza [un perfil de grabación](../recording-profile/), separado del EQ musical.
