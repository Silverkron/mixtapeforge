---
id: "recording-profile"
lang: "es"
title: "Crea y verifica un perfil de grabación en MixtapeForge"
description: "Graba la prueba guiada, captura la reproducción, revisa la corrección propuesta y guarda la combinación exacta de pletina y cinta."
primaryKeyword: "Crea y verifica un perfil de grabación en MixtapeForge"
secondaryKeywords: ["los límites de la EQ","la compatibilidad entre pletinas","Usa EQ para mejorar un casete sin empeorar sus limitaciones","Mide la diferencia entre izquierda y derecha antes de corregir el balance"]
searchIntent: "task"
answer: "Un perfil de grabación recuerda una combinación medida de pletina y cinta y aplica una corrección digital limitada a los másteres posteriores. Resulta útil cuando la misma configuración modifica el sonido de forma repetible. No separa defectos de grabación y reproducción ni hace que todos los reproductores se comporten igual."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100: lista de comprobación de medidas", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "REW: configuración de la interfaz de audio", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}]
related: ["eq-limits", "channel-balance", "frequency-response"]
guideType: "procedure"
prerequisites: ["without-reference-tape"]
next: ["different-decks", "consistent-copies"]
---

Este procedimiento corresponde al **prototipo MixtapeForge 0.1**. La reproducción y captura nativas requieren la aplicación de escritorio. Necesitas una cinta prescindible, una pletina operativa y una interfaz con entradas y salidas de línea estéreo.

## 1. Graba la prueba de la aplicación

1. Conecta salida L/R de interfaz a LINE IN de la pletina. Conecta también LINE OUT L/R a las entradas de línea de la interfaz y mantén desactivada la monitorización de entrada hacia salida.
2. Abre **Calibración** y **Grabar la prueba**. Selecciona la salida hacia la pletina y una frecuencia de muestreo del proyecto admitida por la interfaz. Utiliza **Usar frecuencia del dispositivo** cuando corresponda.
3. Selecciona el tipo de cinta correcto, desactiva Dolby/NR y avanza más allá del tramo transparente inicial. Empieza con salida y REC LEVEL moderados. La prueba llega a **−3 dBFS de pico** digitalmente; eso no predice el nivel analógico de grabación.
4. Pulsa REC en la pletina y después **Iniciar prueba**. La aplicación cuenta **3…2…1** antes de enviar unos **108 segundos** de audio de prueba. Mantén fijos volumen de salida y REC LEVEL y espera hasta el marcador final. La prueba omite EQ, compresión y NR de la mixtape.
5. Detén la pletina y rebobina hasta antes del inicio de la prueba. Abre **Capturar la reproducción**.

## 2. Captura la reproducción real de la cinta

Selecciona la entrada que recibe la pletina. Mantén NR desactivado. Pulsa primero **Iniciar adquisición** en MixtapeForge y después PLAY en la pletina. Observa ambos medidores: si la captura satura, reduce la ganancia de entrada y vuelve a adquirir toda la prueba. No cambies la ganancia a mitad de captura.

La aplicación intenta detener la captura al reconocer el marcador final; sigue disponible la parada manual. Guarda la adquisición si quieres conservar el WAV original y elige **Analizar prueba**. También puedes importar un WAV con la secuencia completa de la aplicación. Un archivo musical cualquiera o un informe de NAK T-100 no equivalen a esa secuencia.

## 3. Revisa y guarda

Lee las advertencias antes de la EQ y la corrección de canales propuestas. Las bandas ruidosas o inestables pueden quedar sin cambios. El análisis describe toda la ida y vuelta; no es una medida certificada de wow/flutter ni de MOL.

El nombre del perfil es el único campo obligatorio y viene rellenado. Usa uno reconocible, por ejemplo **«Pioneer + TDK Type I · prueba de octubre»**. Los campos opcionales permiten anotar pletina, cinta, conexiones y posiciones de controles. Elige **Guardar y usar perfil** y comprueba **Aplica a grabaciones y escucha del master**. Si se guarda la identidad de la salida, utilizar otra puede quedar bloqueado hasta que selecciones la salida utilizada en la medición o desactives el perfil.

## Verifica con música

Graba el mismo fragmento corto con el perfil desactivado y activado, sin mover los controles físicos. Compara la reproducción a una sonoridad parecida. Hipotéticamente, un pequeño ajuste de agudos puede mejorar una cinta y volver más ásperos los platos fuertes: consérvalo solo después de esta segunda prueba.

Si la aplicación no reconoce la secuencia, comprueba que no falte ningún marcador, que hayas capturado la entrada estéreo correcta y que no se haya normalizado ni procesado el archivo. Si los resultados cambian mucho entre pasadas, resuelve esa inestabilidad antes de guardar una corrección.

Comprobación final: marcadores completos, NR desactivado, controles fijos, captura limpia, advertencias revisadas y una nueva comparación musical. Repite la comprobación después de cambiar formulación de cinta, puertos o ganancias. Lee [los límites de la EQ](../eq-limits/) y [la compatibilidad entre pletinas](../different-decks/) antes de distribuir muchas copias.
