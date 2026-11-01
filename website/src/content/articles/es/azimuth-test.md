---
id: "azimuth-test"
lang: "es"
title: "Comprueba el azimut de reproducción sin perder la alineación original"
description: "Utiliza una referencia adecuada para observar nivel de agudos y fase antes de plantearte un ajuste de servicio."
primaryKeyword: "Comprueba el azimut de reproducción sin perder la alineación original"
secondaryKeywords: ["nivel y polaridad de los canales","prueba de respuesta en frecuencia","Comprueba la polaridad y el desfase estéreo con una señal mono conocida","Mide cómo cambia el casete los graves, medios y agudos"]
searchIntent: "evaluation"
answer: "El azimut es el ángulo del entrehierro del cabezal respecto a la pista grabada. Una discrepancia puede debilitar los agudos y hacer que los dos canales se combinen mal en mono. Esta guía busca indicios de una discrepancia; no propone un ajuste universal de tornillos."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "Jay McKnight: azimut en un magnetófono", "url": "https://www.mrltapes.com/mcknight_azimuth-in-mtr.pdf"}, {"title": "NAK T-100: lista de comprobación de medidas", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "NAK T-100: especificaciones oficiales", "url": "https://anaxwaves.com/NAKT100/"}]
related: ["phase-polarity", "frequency-response", "playback-level"]
guideType: "measurement"
prerequisites: ["calibration-tapes"]
next: ["different-decks"]
---

## Qué necesitas

Utiliza una cinta de referencia de azimut especificada para el procedimiento de servicio de tu pletina, una interfaz con entrada de línea estéreo y el osciloscopio de dos canales de NAK T-100. Deben estar documentados la frecuencia del tono, el formato de pistas y la alineación de la referencia. La música corriente o un tono grabado en la misma pletina no permiten establecer una alineación independiente.

Confirma primero que la pletina transporte una cinta corriente de forma fiable. No introduzcas una referencia valiosa en un mecanismo que daña la cinta. Limpia únicamente según las instrucciones de mantenimiento del fabricante.

## Observa antes de tocar nada

1. Conecta LINE OUT L/R de la pletina a LINE IN L/R de la interfaz. Selecciona entradas estéreo, desactiva efectos y ganancia automática y mantén fijas las ganancias de los canales.
2. Introduce la referencia, selecciona el tipo de reproducción que requiere y desactiva NR. Reproduce el segmento de azimut documentado.
3. En NAK T-100 selecciona **Level** y anota los niveles de ambos canales cuando la reproducción se estabilice. Baja la ganancia de entrada si alguno satura.
4. Cambia a **Scope > O'scope**. Observa si las dos ondas sinusoidales suben y bajan juntas. La vista **Lissajous** representa un canal frente al otro: un tono en fase y con igual nivel tiende a dibujar una línea diagonal; una diferencia de fase abre una elipse.
5. Repite el mismo tramo. Anota tanto amplitud como comportamiento de fase. Si la cinta contiene varias frecuencias de referencia documentadas, examina más de una.
6. Conserva las observaciones y los datos de la referencia. Si la discrepancia se repite, consulta el procedimiento de alineación del modelo o a un técnico antes de mover el cabezal.

## Lo que el dibujo no puede demostrar

A frecuencias altas, un retardo puede equivaler a un ciclo completo de la onda. Una traza de fase aparentemente alineada en una sola frecuencia no basta para demostrar un azimut correcto. El guiado de la cinta, el contacto con el cabezal, la electrónica de los canales y la propia referencia también influyen.

Ejemplo hipotético: una elipse estrecha a una frecuencia se ensancha a otra y el nivel de agudos cambia entre pasadas. Eso pide comprobar repetibilidad y contacto con la cinta, no girar un tornillo hasta que una gráfica parezca recta.

## Obstáculos habituales

Si solo aparece una onda, comprueba las rutas de los canales. Si la diagonal se inclina porque un canal suena más bajo, investiga [nivel y polaridad de los canales](../phase-polarity/) en lugar de atribuirlo al azimut. Si la indicación fluctúa, prueba una referencia en buen estado y revisa el transporte.

Comprobación final: referencia documentada, ambos canales, niveles sin saturación, observaciones repetidas y alineación original conservada. Una [prueba de respuesta en frecuencia](../frequency-response/) puede mostrar la consecuencia audible, pero no identifica el azimut de forma independiente.
