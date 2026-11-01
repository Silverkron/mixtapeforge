---
id: "playback-level"
lang: "es"
title: "Comprueba el nivel de reproducción con una referencia magnética conocida"
description: "Entiende la fluxividad, la tensión de salida y las lecturas de los medidores antes de intentar ajustar el nivel de reproducción."
primaryKeyword: "Comprueba el nivel de reproducción con una referencia magnética conocida"
secondaryKeywords: ["la sensibilidad de grabación","comparar distintas pletinas","Comprueba el azimut de reproducción sin perder la alineación original","Calibración de casetes"]
searchIntent: "evaluation"
answer: "Calibrar el nivel de reproducción relaciona una señal magnética conocida en la cinta con una salida eléctrica o una indicación de medidor especificadas. Es la referencia de la que dependen las comparaciones de nivel de grabación. Subir la entrada de la interfaz hasta que un medidor marque cero no calibra la pletina."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "MRL: selección y alcance de las cintas de referencia", "url": "https://mrltapes.com/pages/product-guide"}, {"title": "NAK T-100: especificaciones oficiales", "url": "https://anaxwaves.com/NAKT100/"}, {"title": "REW: espectro, niveles RMS y distorsión", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/spectrum.html"}]
related: ["azimuth-test", "calibration-basics", "different-decks"]
guideType: "measurement"
prerequisites: ["calibration-tapes"]
next: ["recording-sensitivity"]
---

## Reúne la referencia exacta

Necesitas el procedimiento de servicio de la pletina, la cinta de nivel de reproducción que especifica y el voltímetro de corriente alterna indicado o un analizador de audio debidamente calibrado. Anota la **fluxividad** de la cinta en nWb/m, la frecuencia del tono, la ecualización y la tolerancia. Usa la tensión de salida esperada, la carga y las posiciones de controles indicadas en el manual: cambian entre modelos.

Un medidor de ordenador en **dBFS** indica la distancia respecto al máximo digital. La marca 0 VU de una pletina y la escala de tensión calibrada de un analizador son referencias diferentes. NAK T-100 necesita una calibración externa de tensión antes de poder interpretar su indicación de voltios como un valor absoluto.

## Compara sin realizar ajustes internos

1. Confirma que la cinta de referencia cumpla el requisito del manual de servicio. Si no puedes demostrar esa correspondencia, limítate a una comparación relativa en lugar de inventar un objetivo.
2. Conecta LINE OUT de la pletina a la entrada de medida especificada. Si usas una interfaz, selecciona modo de línea y ganancia fija; desactiva efectos y controles automáticos de nivel.
3. Coloca los controles de reproducción y salida, y el estado NR, exactamente como indica el procedimiento de servicio. Deja margen de entrada para evitar saturación.
4. Reproduce el segmento de referencia y espera una lectura estable. Mide izquierda y derecha por separado sobre el mismo tramo.
5. Anota valor observado, valor esperado, identidad de la referencia y posiciones de controles. Repite antes de dar por real una diferencia.
6. Si hace falta ajustar, sigue el procedimiento específico del modelo con los conocimientos adecuados. No compenses con REC LEVEL: actúa en otra parte del sistema.

## Interpreta una diferencia

Ejemplo hipotético: el manual pide 0,50 V RMS y mides 0,45 V en las mismas condiciones. La diferencia es `20 × log10(0,45 / 0,50)`, aproximadamente **−0,92 dB**. Que esté fuera de tolerancia depende de la especificación de servicio y de la incertidumbre de la medida.

Una cinta de referencia de menor nivel puede producir el mismo error aparente. También pueden hacerlo un mando de salida variable, una carga incorrecta o una escala de entrada sin calibrar. Comprueba estas posibilidades antes de modificar la pletina.

Comprobación final: cinta correcta, controles y carga especificados, tensión calibrada cuando sea necesaria, lecturas L/R estables y tolerancia documentada. Cuando la reproducción es fiable, [la sensibilidad de grabación](../recording-sensitivity/) adquiere sentido; de lo contrario, [comparar distintas pletinas](../different-decks/) mezcla varias incógnitas.
