---
id: "bias-adjustment"
lang: "es"
title: "Entiende el bias del casete y utiliza los controles externos de calibración"
description: "Aprende qué cambia el bias, por qué más agudos no siempre es mejor y cuándo necesitas el procedimiento específico del modelo."
primaryKeyword: "Entiende el bias del casete y utiliza los controles externos de calibración"
secondaryKeywords: ["la prueba de respuesta a bajo nivel","una medida de distorsión a baja frecuencia","la saturación","Bias, EQ y reducción de ruido"]
searchIntent: "informational"
answer: "El bias es una señal eléctrica de alta frecuencia generada dentro de la pletina durante la grabación. Ayuda a que la cinta responda de manera más regular a la señal de audio. No es un filtro EQ del ordenador: aumentar los agudos por software no lo modifica."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "John G. McKnight: polarización en la grabación magnética", "url": "https://cdn.shopify.com/s/files/1/0720/0627/1232/files/mcknight_biasing.pdf?v=1763068428"}, {"title": "NAK T-100: lista de comprobación de medidas", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}]
related: ["bias-eq-nr", "high-frequency-saturation", "recording-profile"]
guideType: "explainer"
prerequisites: ["frequency-response"]
next: ["distortion-test", "recording-sensitivity"]
---

El bias afecta a varias cosas a la vez: respuesta en frecuencia a bajo nivel, sensibilidad de grabación y distorsión. Por eso, girar su control hasta que una cinta suene lo más brillante posible puede empeorar la grabación en conjunto.

## Averigua qué controles tienes

Algunas pletinas calibran la cinta automáticamente. Otras ofrecen un ajuste externo de bias o un sistema de calibración con tonos. Muchas no tienen ningún ajuste para el usuario. Busca las instrucciones de tu modelo antes de empezar. No abras la pletina ni muevas ajustes internos siguiendo una guía genérica.

Si dispone de calibración automática, ejecútala con la cinta que vas a grabar y sigue la preparación documentada. Si falla repetidamente con una cinta, prueba otra en buen estado antes de concluir que la pletina está averiada.

## Compara un ajuste externo de bias

Si el fabricante ofrece un control accesible al usuario, utiliza una cinta prescindible, las conexiones de línea habituales, NR desactivado y [la prueba de respuesta a bajo nivel](../frequency-response/).

1. Fotografía o marca la posición original del control externo. Haz una grabación de referencia y conserva su captura de retorno.
2. Sigue los tonos, el nivel de grabación y el orden de ajuste indicados en el manual. Mantén fijas la salida del ordenador y la ganancia de captura.
3. Haz un cambio pequeño y reversible dentro del recorrido del control de usuario. Identifica el siguiente tramo de prueba con esa posición en tus notas.
4. Reproduce y compara tanto la respuesta de agudos como [una medida de distorsión a baja frecuencia](../distortion-test/). No juzgues solo por la curva más brillante.
5. Vuelve al ajuste original si los resultados son inestables o no hay una mejora clara. Comprueba con música al nivel de grabación previsto antes de guardar un perfil.

## Qué significa «overbias»

En un procedimiento de overbias, el técnico busca un máximo en la salida del tono reproducido y aumenta el bias más allá de ese punto hasta que la salida cae la cantidad indicada para ese método de pletina y cinta. Ni la frecuencia del tono ni la caída son universales.

Ejemplo hipotético: «aumenta el bias hasta que el tono caiga 1,5 dB desde su máximo» describe un cambio de salida, no una modificación de 1,5 dB del volumen del ordenador. Es solo un ejemplo, no un ajuste recomendado para casetes.

## Evita mejoras engañosas

Más agudos acompañados de más distorsión constituyen un compromiso, no necesariamente una mejor calibración. Si solo fallan los agudos fuertes, comprueba [la saturación](../high-frequency-saturation/) antes de cambiar el bias. Si la respuesta cambia entre pasadas, revisa primero cinta y transporte.

Un registro útil incluye identidad de la cinta, posición del control y condiciones de respuesta y distorsión. MixtapeForge puede guardar las condiciones de grabación y proponer una corrección digital limitada; no puede ajustar a distancia el oscilador de bias de la pletina.
