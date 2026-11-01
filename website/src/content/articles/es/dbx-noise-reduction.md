---
id: "dbx-noise-reduction"
lang: "es"
title: "Reducción de ruido dbx: Type I, Type II y reproducción compatible"
description: "Por qué una cinta dbx necesita el decodificador adecuado y no basta un compresor normal."
primaryKeyword: "Reducción de ruido dbx"
secondaryKeywords: ["niveles","dropouts","flujo NR por software","Dolby B explicado"]
searchIntent: "informational"
answer: "El dbx para casetes comprime la diferencia entre sonidos suaves y fuertes antes de grabar y la expande al reproducir. Compansor combina compresor y expansor. Con una compresión ideal 2:1, un cambio de 20 dB se convierte en 10 dB sobre la cinta; el decodificador recupera la diferencia inicial. Es un ejemplo del principio, no una medición de una pletina."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Anaxwaves · DxI Codec", "url": "https://anaxwaves.com/DxICodec/"}, {"title": "Anaxwaves · DxII Codec", "url": "https://www.anaxwaves.com/DxIICodec/"}, {"title": "u-he · Satin 1.3.3", "url": "https://u-he.com/downloads/manuals/plugins/satin/Satin-user-guide.pdf"}]





guideType: "explainer"
prerequisites: []
next: ["software-noise-reduction", "playback-compatibility"]
related: ["dolby-b", "recording-levels", "tape-dropouts"]
---

## Identifica el formato

Type I y Type II son formatos dbx distintos; el número romano no identifica la formulación magnética de la cinta. Una cinta Type II puede contener Dolby, dbx o ninguna reducción NR. Consulta el manual del grabador y utiliza el decodificador correspondiente. Sin decodificación, el sonido puede resultar comprimido y desequilibrado.

## Prueba breve con hardware

Necesitas una pletina funcional con el dbx adecuado, una cinta virgen compatible y auriculares. Conecta la salida de línea estéreo de la fuente a LINE IN L/R.

1. Desactiva NR por software y selecciona el modo dbx de grabación descrito en el manual.
2. Ajusta los [niveles](../recording-levels/) con el pasaje más fuerte. El compansor no repara una señal saturada.
3. Graba voz, bajo sostenido y colas suaves de platillos. Detén, rebobina y reproduce con el dbx correspondiente.
4. Compara con la fuente a volumen parecido. Busca dinámica natural y un fondo que no aumente después de las notas de bajo.

Si aparecen pérdidas breves, comprueba los [dropouts](../tape-dropouts/). La expansión puede destacar los errores, pero no identifica su causa. Prueba otra cinta limpia antes de cambiar el procesamiento.

## Software para evaluar

Anaxwaves ofrece [DxII Codec](https://www.anaxwaves.com/DxIICodec/) para Type II/Disc y [DxI Codec](https://anaxwaves.com/DxICodec/) para Type I/Disc. [Satin](https://u-he.com/products/satin/) incluye modelos uhx I/II. Son herramientas separadas, no etapas dbx integradas en MixtapeForge. Consulta sus manuales y prueba el modo exacto con tu hardware, sin efectos de simulación de cinta ajenos al ensayo. Lee el [flujo NR por software](../software-noise-reduction/) antes de transferir una cinta entera.
