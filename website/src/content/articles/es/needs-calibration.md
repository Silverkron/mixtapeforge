---
id: "needs-calibration"
lang: "es"
title: "¿Tu pletina necesita calibración? Una primera comprobación práctica"
description: "Distingue una cinta defectuosa, unos ajustes incorrectos y un problema repetible antes de solicitar una alineación."
primaryKeyword: "¿Tu pletina necesita calibración? Una primera comprobación práctica"
secondaryKeywords: ["una prueba con condiciones repetibles","la prueba de balance","una cinta de referencia de velocidad","Por qué una cinta suena diferente en otra pletina y cómo compararlas"]
searchIntent: "diagnosis"
answer: "Una sola cinta que suena mal no basta para diagnosticar una pletina desajustada. Esta comprobación te ayuda a decidir si debes cambiar un ajuste, sustituir una cinta o reunir información para el servicio técnico."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "NAK T-100: lista de comprobación de medidas", "url": "https://anaxwaves.com/NAKT100/Docs/RefCheckList.html"}, {"title": "REW: configuración de la interfaz de audio", "url": "https://www.roomeqwizard.com/help/help_en-GB/html/soundcard.html"}]
related: ["different-decks", "channel-balance", "speed-test"]
guideType: "troubleshooting"
prerequisites: ["calibration-basics"]
next: ["without-reference-tape"]
---

## Prepara una comparación justa

Usa una cinta pregrabada conocida y en buen estado, dos cintas vírgenes utilizables y un archivo corto de música con voz y platos. La cinta pregrabada es una referencia de escucha cotidiana, no una cinta de calibración certificada. Mantén un volumen moderado y fotografía los controles antes de cambiarlos.

## Sigue estas comprobaciones

1. Reproduce la cinta conocida. Selecciona la reducción de ruido usada al grabarla y el tipo de cinta adecuado para reproducción. Escucha si el tono fluctúa, si los agudos aparecen y desaparecen o si un canal suena siempre más bajo.
2. Reproduce el archivo de música directamente por tu salida habitual. Si aparece el mismo defecto, investiga la fuente o el encaminamiento del audio antes de culpar a la pletina.
3. Graba treinta segundos en la primera cinta virgen, con NR desactivado y un nivel prudente. Rebobina y reproduce manteniendo NR desactivado. Compara a una sonoridad parecida: una versión más baja suele parecer menos clara.
4. Repite en la segunda cinta sin mover los controles. Un defecto que solo aparece en una cinta apunta primero a esa cinta o a su carcasa.
5. Si afecta a ambas, realiza [una prueba con condiciones repetibles](../without-reference-tape/). Conserva las capturas originales y los ajustes, en lugar de tocar tornillos internos.

## Interpreta el patrón

| Observación | Comprobación sencilla | Siguiente acción razonable |
| --- | --- | --- |
| Solo se apagan los platos más fuertes | Graba el mismo fragmento 3 dB más bajo | Investiga la saturación de altas frecuencias |
| Un canal sigue sonando más bajo | Compara contenido mono idéntico en ambos canales | Sigue la prueba de balance entre canales |
| El tono oscila en varias cintas | Compara con otra cinta que sepas que está bien | Investiga el transporte y después mide la estabilidad de velocidad |
| Dolby hace que el sonido se cierre | Comprueba que coincidan los sistemas NR de grabación y reproducción | Revisa niveles y alineación antes de añadir agudos |

Son causas posibles, no diagnósticos. Ejemplo hipotético: dos grabaciones nuevas suenan apagadas, pero las cintas pregrabadas conocidas suenan claras. Eso hace que las condiciones de grabación sean una pista más sólida que la reproducción, pero no identifica un componente averiado.

Para una diferencia estable entre izquierda y derecha, utiliza [la prueba de balance](../channel-balance/). Para un error de tono constante, [una cinta de referencia de velocidad](../speed-test/) aporta más información que la música por sí sola.

## Antes de decidir una reparación

- Confirma el síntoma en más de una cinta.
- Anota los ajustes con los que se reproduce.
- Conserva un fragmento corto original y su captura de retorno.
- Solicita una revisión específica del modelo si persiste un problema mecánico o de alineación: un perfil de EQ no puede repararlo.
