---
id: "source-formats"
lang: "es"
title: "WAV, FLAC o MP3 para grabar cassette: ¿importa la fuente?"
description: "Usa la fuente real más limpia que tengas."
primaryKeyword: "WAV, FLAC o MP3 para grabar cassette"
secondaryKeywords: ["la normalización","la prueba del ordenador a la pletina","Cómo grabar una cassette desde el ordenador","Normalización, compresión y EQ"]
searchIntent: "informational"
answer: "Usa la fuente real más limpia que tengas. WAV y FLAC pueden conservar el audio sin pérdida; convertir un MP3 a WAV no recupera la información eliminada al crear ese MP3."
category: "recording"
image: "recording"
updated: "2026-11-01"
sources: [{"title": "Audacity — glosario de audio digital", "url": "https://manual.audacityteam.org/man/glossary.html"}, {"title": "Symphonia — códecs y contenedores compatibles", "url": "https://github.com/pdeljanov/Symphonia"}]
guideType: "explainer"
related: ["recording-computer", "normalization-compression-eq", "cassette-mixtape"]
prerequisites: []
next: ["recording-computer"]
---

## Formatos de MixtapeForge

El selector actual de escritorio incluye **WAV, FLAC, MP3, M4A, AAC, AIFF/AIF, OGG y CAF**. Un contenedor como M4A puede llevar distintos códecs: aceptar la extensión no garantiza todas sus variantes. El programa utiliza Symphonia. Los archivos protegidos descargados por servicios de streaming no son archivos musicales normales importables.

1. Guarda los originales en una carpeta estable. Importa un ejemplo de cada formato que utilizarás.
2. Comprueba título y duración; escucha principio, mitad y final. Investiga duraciones incorrectas o silencios repentinos antes de preparar la cara.
3. Si falla, abre una copia en un editor compatible y exporta WAV PCM estéreo. Conserva el original: cambiar la extensión no convierte el contenido.
4. En **EQ / Audio**, abre el formato del máster y selecciona una frecuencia compatible con la salida: 44,1, 48, 88,2 o 96 kHz. Un número mayor no demuestra mejor sonido en cinta.

## Compara sonido, no tamaño

Un MP3 comprado y limpio puede sonar mejor que una grabación dañada en WAV. Iguala el volumen de escucha y compara voces, platos y finales suaves. Consulta [la normalización](../normalization-compression-eq/) antes de preferir simplemente el más fuerte.

Un archivo de trabajo sin pérdida evita otra conversión destructiva, pero no repara distorsión previa. Continúa con [la prueba del ordenador a la pletina](../recording-computer/).

**Listo:** archivos decodificados completos, metadatos revisados, originales guardados y frecuencia compatible.
