# Equipo de diseño de NexGent

Aquí trabaja el equipo de diseño: **Vera** (dirección de arte del blog) y **Iris** (diseño de redes sociales).
Hacen todas las imágenes: portadas del blog, imagen para compartir (og), posts y carruseles de Instagram y Facebook, e imágenes de LinkedIn.

## Cómo se hace una pieza

1. **Fondo con IA** (Higgsfield, modelo `gpt_image_2_6`, calidad `medium`, 16:9 para blog y LinkedIn, 4:5 para Instagram).
   - La IA genera **solo el fondo**: nunca texto, logos, pantallas legibles ni caras reconocibles.
   - Estilo fijo: escena oscura, casi negra, con luz turquesa (#6fcad8) y azul eléctrico (#3b82f6), fotografía editorial o 3D abstracto, aspecto premium.
   - Escenas que encajan: recepción de un centro de belleza de noche, móvil con notificación sobre un mostrador, ondas de sonido (voz IA), burbujas de chat conectadas, mapa de España con sedes que se encienden, fachadas de franquicias de noche.
   - Si sale algo que no es España, o con texto inventado, o con marcas, se descarta y se repite.
2. **Capa de marca** con `design/render.py` (nunca se escribe el texto con la IA):
   `python3 design/render.py pieza.json carpeta_salida`
   El JSON describe la pieza (tipos: `blog`, `post`, `carrusel`, `dato`, `linkedin`, `historia`; ver la cabecera de render.py).
3. **Revisión visual**: abre la imagen y comprueba que el texto se lee, que no hay cortes y que los datos coinciden con la fuente.

## Dónde va cada cosa

| Pieza | Carpeta | Archivos |
|---|---|---|
| Portada de artículo | `assets/img/blog/<slug>/` | `cover.jpg` (1600×900, sin texto) y `og.jpg` (1200×630). `scripts/blog.py` las detecta solas. |
| Redes sociales | `design/salida/<AAAA-MM-DD>/<pieza>/` | `pieza.json`, los `.jpg` y sus `thumb-*.jpg` |

Después de añadir portadas: `python3 scripts/blog.py`.

## Reglas

- Datos de clientes: solo los publicados en el blog. Hello Nails va anonimizado («una red líder de centros de uñas con más de 230 centros») salvo que el panel diga `permisoHelloNails: true`.
- Nada se publica en redes sin la aprobación de Alejandro: las piezas quedan en el panel como «Para revisar».
- Presupuesto: cada fondo cuesta unos 0,5 créditos de Higgsfield. Máximo 8 fondos por turno. Si el saldo baja de 10 créditos, usa el fondo de marca sin IA (sin `fondo` en el JSON) y avisa en el panel.
- Tipografía: Inter Tight (titulares) e Inter (texto), en `design/fonts` (licencia OFL).

## Historias de Instagram

- `tipo: "historia"` con `diapositivas` (igual que el carrusel: portada, texto, dato, lista, cta) da `h01.jpg`, `h02.jpg`… en 1080×1920.
- Cada historia es una idea: 1 a 3 diapositivas por tanda. Texto grande y poco; la última, una llamada a la acción.
- Instagram tapa los 250 px de arriba y los 340 de abajo: la plantilla ya deja ese espacio libre.
- Se programan según el calendario de `meta/redes.calendario` del panel, nunca todas de golpe.
