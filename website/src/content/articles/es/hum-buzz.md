---
id: "hum-buzz"
lang: "es"
title: "Zumbido al grabar cassettes: sigue el recorrido de audio"
description: "Localiza fuente, cables, interfaz o pletina antes de filtrar el ruido."
primaryKeyword: "Zumbido al grabar cassettes"
secondaryKeywords: ["siseo de cinta","loopback","Mide el siseo de la cinta respecto a una señal grabada","Cómo grabar una cassette desde el ordenador"]
searchIntent: "diagnosis"
answer: "El zumbido es un tono grave constante; a veces añade componentes más ásperos. A diferencia del «shhh» del siseo de cinta, puede proceder de interferencias o conexiones eléctricas. Es mejor eliminarlo antes de grabar que filtrarlo en la cinta terminada."
category: "troubleshooting"
image: "portable"
updated: "2026-11-01"
sources: [{"title": "Focusrite · Zumbido y ruido", "url": "https://support.focusrite.com/hc/en-gb/articles/211615185-Why-is-there-unwanted-hum-noise-in-my-monitors"}, {"title": "Sony · ICD-PX470", "url": "https://helpguide.sony.net/icd/p47/v1/en2/contents/TP0001155787.html"}]

guideType: "troubleshooting"
prerequisites: []
next: ["loopback-round-trip"]
related: ["tape-hiss-snr", "recording-computer", "quiet-channel"]
---

El zumbido es un tono grave constante; a veces añade componentes más ásperos. A diferencia del «shhh» del [siseo de cinta](../tape-hiss-snr/), puede proceder de interferencias o conexiones eléctricas. Es mejor eliminarlo antes de grabar que filtrarlo en la cinta terminada.

## Encuentra por dónde entra

Necesitas auriculares y un cable corto fiable. Baja el volumen y detén antes de cambiar conexiones. Nunca elimines la tierra de protección ni modifiques enchufes eléctricos.

1. Escucha la fuente por la interfaz con los cables de audio de la pletina desconectados. Si permanece, revisa primero ordenador/interfaz.
2. Conecta solo la ruta de grabación: salidas de línea de la interfaz a LINE IN. Deja desconectado el retorno LINE OUT para esta prueba.
3. Si aparece zumbido, aleja los cables de alimentadores y prueba el cable sano. Escucha sin cambiar ganancia.
4. Con un portátil, prueba brevemente con batería desconectando normalmente el cargador. Una mejora sugiere un componente de alimentación/conexión, no demuestra qué pieza falla.
5. Reconecta el retorno solo si es necesario. Si provoca zumbido, puede crear un **bucle de masa**, una ruta eléctrica no deseada entre equipos. Revisa el cableado y valora aislamiento adecuado para señales de línea si hace falta.

## Interpreta con cuidado

Una salida balanceada conectada a RCA no balanceado no crea una conexión completamente balanceada solo cambiando el cable. Usa el cableado recomendado por los fabricantes. La [guía Focusrite](https://support.focusrite.com/hc/en-gb/articles/211615185-Why-is-there-unwanted-hum-noise-in-my-monitors) explica estos efectos.

Si la pletina zumba en sus auriculares sin audio externo, o el ruido ya está grabado, son casos distintos. Dolby no reemplaza el diagnóstico eléctrico. Tras un cambio repite una grabación breve y compara pausas con la misma ganancia; el [loopback](../loopback-round-trip/) establece la referencia de ruido de la interfaz.
