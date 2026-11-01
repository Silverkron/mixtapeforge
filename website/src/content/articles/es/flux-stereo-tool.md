---
id: "flux-stereo-tool"
lang: "es"
title: "FLUX:: Stereo Tool: comprueba el estéreo antes de grabar un casete"
description: "Utiliza una referencia mono, un fragmento musical y una captura de cinta para investigar el estéreo sin procesar a ciegas."
primaryKeyword: "FLUX:: Stereo Tool"
secondaryKeywords: ["fase frente a polaridad","la medida de balance entre canales","las comprobaciones de canal débil","Comprueba la polaridad y el desfase estéreo con una señal mono conocida"]
searchIntent: "task"
answer: "Esta guía trata de FLUX:: Stereo Tool, no de otros procesadores de radiodifusión con nombres parecidos. Ofrece ajustes de canales y medidores estéreo. Descárgalo desde las páginas oficiales de FLUX: freeware describe su precio, no el permiso para distribuirlo dentro de otra aplicación."
category: "calibration"
image: "calibration"
updated: "2026-11-01"
sources: [{"title": "FLUX:: Stereo Tool: página oficial del freeware", "url": "https://www.flux.audio/project/stereo-tool-freeware/"}, {"title": "Stereo Tool: manual oficial", "url": "https://doc.flux.audio/stereotool/"}, {"title": "FLUX:: Center: descargas oficiales", "url": "https://www.flux.audio/download/"}, {"title": "FLUX:: requisitos de los plugins", "url": "https://www.flux.audio/plugin-specifications/"}, {"title": "Manual de REAPER 7: dispositivos, pistas, efectos, mono y exportación", "url": "https://dlx.reaper.fm/userguide/html/"}]
related: ["phase-polarity", "channel-balance", "quiet-channel"]
guideType: "procedure"
prerequisites: ["channel-balance"]
next: ["phase-polarity", "recording-profile"]
---

## Instala el Stereo Tool correcto

Los requisitos publicados incluyen Windows y macOS; Linux no figura. La página del producto exime expresamente a este freeware de activación y llave física. Comprueba el formato de plugin disponible frente a tu programa anfitrión antes de instalar. La etiqueta VST por sí sola no demuestra compatibilidad VST3.

Para este ejercicio utiliza un anfitrión que abra el editor propio del plugin. Es un procedimiento propuesto a partir de su documentación, no un informe de instalación verificada ni de prueba de hardware.

## Un ejemplo concreto de anfitrión: REAPER

Los nombres siguientes son los menús en inglés del manual de REAPER 7. Es un procedimiento documentado, no una afirmación de que este plugin se haya instalado y probado aquí.

1. En **Options > Preferences > Audio > Device**, elige la interfaz y la salida estéreo que quieres utilizar. Crea una pista con **Track > Insert new track**. Importa el WAV de referencia desde Media Explorer con **Insert into project**, sin estirarlo ni normalizarlo.
2. Abre **View > FX Browser**, busca FLUX Stereo Tool y arrástralo al panel de la pista. Abre la ventana FX de la pista y selecciona el plugin para mostrar su editor. Deja el panorama centrado y desactiva los demás efectos.
3. Muestra **View > Master Track**. Utiliza su botón **Mono/Stereo** para comprobar la suma durante el ejercicio siguiente y después restaura el estéreo. Mantén la pletina fuera de REC mientras aprendes los controles.
4. Para guardar una corrección deliberada, deja esta pista en solo y elige **File > Render**. Exporta WAV estéreo a la frecuencia de muestreo del proyecto, sin normalizar y con un nombre nuevo. Comprueba los canales y picos del archivo antes de importarlo a MixtapeForge. Guarda también el proyecto REAPER para poder recuperar los ajustes del plugin.

## Empieza con ajustes neutros

Carga Stereo Tool en una pista estéreo. Restablece sus ajustes, deja ambas ganancias de entrada en **0 dB**, desactiva las inversiones de polaridad y conserva las rutas predeterminadas y la anchura neutra. Desactiva otros procesos durante el ejercicio. Mantén la salida baja y la pletina fuera de REC.

Prepara unos veinte segundos de tu propia voz en un archivo mono, con contenido idéntico enviado a izquierda y derecha. Conserva esa referencia sin modificar. Te da un punto de partida conocido, a diferencia de una mezcla comercial cuyo tratamiento estéreo desconoces.

## Aprende cómo se ve un error de polaridad

El **goniómetro** dibuja la relación entre el audio izquierdo y derecho. La **correlación** resume su similitud: +1 para canales idénticos y −1 para opuestos exactos. Son resultados esperables para la referencia de prueba, no objetivos para cualquier mezcla estéreo. Consulta [fase frente a polaridad](../phase-polarity/).

Reproduce la referencia. Dos canales iguales e idénticos deberían mostrar una imagen mono centrada y correlación cercana a **+1**. Si no ocurre, revisa primero las rutas y desactiva otros efectos.

Invierte temporalmente **un** canal. La relación debería pasar a negativa, cercana a **−1** en esta referencia deliberadamente idéntica. Escucha a volumen bajo con la monitorización mono del anfitrión: la voz sumada debería cancelarse en gran medida. Restaura inmediatamente el control después.

Es una demostración, no una corrección para aplicar a cualquier grabación. Invertir polaridad cambia el signo de un canal; no deshace un error de fase dependiente de la frecuencia ni un desfase temporal.

## Investiga un canal que suena más bajo

Utiliza la referencia mono intacta para seguir el desequilibrio. Compara la fuente digital con una captura estéreo de la pletina. Sigue [la medida de balance entre canales](../channel-balance/) para cuantificar la diferencia. Si solo aparece en el retorno capturado, investiga el recorrido completo, incluidas las ganancias de entrada. La captura de ida y vuelta combina errores de grabación, reproducción e interfaz: una corrección que ayuda a ese recorrido puede no mejorar la escucha en otra pletina.

Si las capturas repetidas muestran una diferencia estable, prueba a atenuar un poco el canal más fuerte. Por ejemplo, **−0,5 dB** es un pequeño ensayo, no un valor de calibración recomendado. Compara de nuevo antes de guardar nada. No fuerces medidores iguales con música corriente: puede haber instrumentos deliberadamente desplazados hacia un lado.

## Comprueba la música sin perseguir la gráfica

Pasa a un fragmento conocido con voz e instrumentos sostenidos. Compara reproducción sin efecto y procesada a una sonoridad parecida. Si experimentas con anchura, haz un cambio moderado y escucha tanto en estéreo como con la monitorización mono del anfitrión.

Una mezcla completa no necesita correlación permanente de +1. Las lecturas negativas breves son un motivo para investigar lo que oyes, no una prueba de fallo. Conserva la versión que mantiene el equilibrio musical y la inteligibilidad en mono; vuelve a ajustes neutros si el cambio no ofrece una mejora clara.

## Devuelve el resultado al flujo de grabación en casete

Para comparar cinta, conserva la captura estéreo original y examina una copia. Una diferencia persistente entre fuente y retorno aporta más que una gráfica en movimiento. Los ajustes estéreo no reparan un transporte inestable, los agudos perdidos por mala alineación ni una cinta dañada.

MixtapeForge muestra actualmente parámetros VST3 genéricos, no el editor nativo con medidores del plugin. La compatibilidad con este plugin concreto no está verificada. Como alternativa, genera un WAV procesado en un anfitrión compatible, impórtalo en la mixtape y evita repetir el mismo procesamiento. Guarda original, preset y condiciones de prueba para poder volver a la versión intacta.

## Problemas habituales y comprobaciones finales

Si el plugin no aparece, comprueba formato instalado, arquitectura del procesador y resultado del escaneo frente a los requisitos actuales de FLUX. Si solo se mueve un medidor, inspecciona las rutas de pista y canales antes de añadir ganancia. Si la escucha mono cancela la referencia invertida a propósito, la demostración ha funcionado: restaura la polaridad antes de probar música.

Un canal persistentemente bajo puede tener varias causas; sigue [las comprobaciones de canal débil](../quiet-channel/) en lugar de aplicar una corrección extrema. Antes de exportar, confirma anchura neutra o deliberada, controles de demostración restaurados, salida sin saturación y nombre claro para el archivo procesado. La compatibilidad con el anfitrión de MixtapeForge sigue necesitando una prueba real del plugin; esta guía no afirma que se haya realizado.
