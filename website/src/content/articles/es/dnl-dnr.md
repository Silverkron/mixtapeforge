---
id: "dnl-dnr"
lang: "es"
title: "DNL y DNR: reducir ruido sin codificador al grabar"
description: "Entiende los tratamientos de reproducción y distingue menos ruido de decodificación fiel."
primaryKeyword: "DNL y DNR"
secondaryKeywords: ["decodificador Dolby","software NR","zumbido eléctrico","Dolby B explicado"]
searchIntent: "informational"
answer: "DNL y DNR reducen ruido durante la reproducción sin necesitar una cinta codificada previamente. Atenúan el ruido agudo adaptando la respuesta de reproducción a la señal. No sustituyen al decodificador Dolby correspondiente a la grabación."
category: "noise-reduction"
image: "noise-reduction"
updated: "2026-11-01"
sources: [{"title": "Philips · N2510 · 1973", "url": "https://www.worldradiohistory.com/Archive-All-BC/Archive-All-Audio/Archive-Studio-Sound/70s/Studio-Sound-1973-12.pdf"}, {"title": "Texas Instruments · LM1894", "url": "https://www.ti.com/product/LM1894"}]



guideType: "explainer"
prerequisites: []
next: ["dolby-b-c-s-playback"]
related: ["dolby-b", "software-noise-reduction", "tape-hiss-snr"]
---

DNL y DNR reducen ruido durante la reproducción sin necesitar una cinta codificada previamente. Atenúan el ruido agudo adaptando la respuesta de reproducción a la señal. No sustituyen al [decodificador Dolby](../dolby-b/) correspondiente a la grabación.

## Escucha el compromiso

Imagina un platillo que se desvanece en el siseo. Limitar los agudos puede hacer menos evidente el ruido, pero también acortar la cola percibida. Se busca un compromiso de escucha, no recuperar información perdida.

Texas Instruments describe DNR en la [documentación LM1894](https://www.ti.com/product/LM1894) como sistema no complementario: no necesita un codificador previo. DNL es una implementación distinta; nombres parecidos no significan controles ni resultados idénticos.

## Pruébalo conservando el original

Necesitas un reproductor con DNL/DNR documentado y una cinta conocida. Para restauración por software, conserva una captura intacta y trabaja sobre una copia.

1. Ajusta primero la EQ de reproducción y, cuando corresponda, el decodificador Dolby adecuado.
2. Escucha una voz suave o instrumentos acústicos con DNL/DNR desactivado. Atiende a consonantes y reverberaciones, no solo a las pausas.
3. Activa la función descrita en el manual y repite el fragmento a volumen parecido.
4. Si se puede regular, elige la mínima intervención útil. Con un simple interruptor, déjalo apagado cuando la pérdida de detalle supere el beneficio.

Una pausa más silenciosa con detalles musicales desaparecidos es un compromiso, no mayor fidelidad. Si el fondo sube y baja de forma molesta, reduce o desactiva el tratamiento.

MixtapeForge no incorpora DNL/DNR. Los reductores de ruido modernos pueden tener una finalidad similar sin emular esos circuitos; la guía de [software NR](../software-noise-reduction/) distingue sus funciones. Anota por separado decodificador, reducción adicional y preferencia de escucha.

Un [zumbido eléctrico](../hum-buzz/) necesita revisar conexiones, no experimentar limitando agudos.
