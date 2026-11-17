# Web de NexGent

Web estática (HTML, CSS y JS), sin compilación. Para verla en local, abre la carpeta en una terminal y ejecuta:

```
python3 -m http.server 8000
```

Después abre http://localhost:8000. Si abres `index.html` con doble clic, las escenas 3D pueden no cargarse.

Se publica en Vercel (proyecto `nexgent-nueva-web`) automáticamente al subir cambios a la rama `main` de GitHub. La página `/consultores` se conserva de la web anterior.

## Estructura

- `index.html`: la home, con hero 3D, recorrido de la clienta, 24/7, voz, funciones, "Todos ganan", cómo trabajamos, caso de éxito con globo 3D, calculadora, sobre nosotros, blog, preguntas y contacto.
- `blog.html`, `legal.html`, `404.html`
- `assets/css/style.css`: todo el diseño. Los colores están en `:root`.
- `assets/js/main.js`: animaciones de scroll (GSAP y Lenis), calculadora y formulario.
- `assets/js/three-scenes.js`: la esfera de partículas del hero y el globo 3D (Three.js).
- `assets/vendor/`: librerías incluidas en local.
- `robots.txt`, `sitemap.xml`, `llms.txt`

## Pendiente

1. **Formulario:** cada solicitud se envía por email a info@nexgent.io con FormSubmit (formsubmit.co), directamente desde el navegador. La primera vez hay que pulsar el enlace «Activate Form» del correo que FormSubmit envía a info@nexgent.io.
2. **Logo:** ya está el oficial (`assets/img/`), en versión oscura y blanca, con favicon.
3. **Caso de éxito:** muestra datos reales de un centro de Hello Nails (recordatorios del 18 oct al 16 nov y llamadas con IA del 27 oct al 16 nov de 2026), sin nombrar a la marca. Antes de publicar, confirmad con Hello Nails que se pueden enseñar.
4. **Equipo:** revisar nombres, cargos y si los cuatro socios quieren salir en la web.
5. **Legal:** faltan el email de contacto y los datos registrales. Las páginas legales las tiene que revisar un abogado.
6. **Cookies:** la web no usa cookies de analítica. Si añadís Google Analytics o el píxel de Meta, hará falta un banner de consentimiento.
7. **Imagen para redes sociales (og:image):** pendiente.
