---
id: "dull-dolby"
lang: "es"
title: "¿Por qué Dolby B hace que la cinta suene apagada?"
description: "Revisa codificación, niveles y respuesta de lectura antes de realzar agudos."
primaryKeyword: "¿Por qué Dolby B hace que la cinta suene apagada?"
secondaryKeywords: ["identificación de modo","EQ de reproducción","nivel de reproducción","Dolby y dbx por software"]
searchIntent: "diagnosis"
answer: "Si Dolby vuelve la cinta anormalmente apagada, no subas los agudos de inmediato. El decodificador responde tanto a frecuencias como a nivel. Tracking significa que su acción variable invierte correctamente la del codificador; una diferencia de nivel o respuesta puede romper esa correspondencia."
category: "troubleshooting"
image: "portable"
updated: "2026-11-01"
sources: [{"title": "Dolby Laboratories · CP45 · Appendix D", "url": "https://www.film-tech.com/warehouse/manuals/DOLBYCP45USERS.pdf"}, {"title": "IASA · TC-04 · 5.4.11", "url": "https://www.iasa-web.org/book/export/html/435"}, {"title": "Anaxwaves · DDi Codec", "url": "https://www.anaxwaves.com/DDiCodec/"}]


guideType: "troubleshooting"
prerequisites: ["dolby-b"]
next: ["playback-level", "muffled-cassettes"]
related: ["software-noise-reduction", "playback-equalization", "recording-sensitivity"]
---

## Aísla la causa con un fragmento

Necesitas notas de grabación, auriculares, la fuente original si existe y otra cinta conocida en buen estado. Mantén estable el volumen y anota cada cambio.

1. Confirma el formato. Una cinta sin NR no debe pasar por B o C. Si hay dudas, utiliza la [identificación de modo](../dolby-b-c-s-playback/).
2. Verifica la [EQ de reproducción](../playback-equalization/) y escucha la cinta conocida. Si ambas están apagadas, revisa y limpia el recorrido accesible según el manual antes de cambiar el procesamiento.
3. Para una copia propia reconstruye la cadena. B del hardware exige NR por software desactivado. Type B por software exige NR de la pletina desactivado al grabar y B al reproducir. Cambiar el volumen no corrige una doble codificación.
4. Compara voces suaves, colas de platillos y pasajes fuertes a volumen **de escucha** parecido al original. No cambies la calibración de grabación para igualarlo.
5. Con decodificación por software conserva la captura original y comprueba la referencia. Un tono documentado permite ajustar; sin él, hacerlo de oído sigue siendo una estimación.

## Qué sugiere el resultado

- **Todas las cintas apagadas:** revisa reproducción y contacto del cabezal.
- **Solo una copia nueva:** revisa tipo de cinta, nivel y un único codificador.
- **Desaparecen sobre todo detalles suaves:** revisa NR y ajuste de nivel/respuesta; no demuestra un fallo del circuito Dolby.
- **Solo cambia un canal:** revisa canal y contacto antes de aplicar EQ global.

Añadir 2 dB después de decodificar iguala el volumen, pero no corrige decisiones frecuenciales ya tomadas. La referencia Type B a 0 en MixtapeForge no desactiva la codificación ni indica un objetivo para el medidor de la pletina. El perfil general no certifica ajuste Dolby. Comprueba después el [nivel de reproducción](../playback-level/) y repite un ensayo musical breve.
