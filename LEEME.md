# El Moreno · Talas y podas en altura — web

Web estática (HTML + CSS + JS, sin dependencias) con una página por sección y por servicio:

| URL | Contenido |
|---|---|
| `/` | Inicio |
| `/servicios/` | Todos los servicios |
| `/servicios/tala-de-arboles/` | Tala de árboles en Ávila |
| `/servicios/poda-en-altura/` | Poda en altura en Ávila |
| `/servicios/retirada-de-restos/` | Retirada de restos de poda y tala |
| `/servicios/mantenimiento-zonas-verdes/` | Mantenimiento de zonas verdes |
| `/como-trabajamos/` | Proceso paso a paso (animación de la tala) y seguridad |
| `/preguntas-frecuentes/` | Preguntas frecuentes |
| `/contacto/` | Contacto y formulario de presupuesto |
| `404.html` | Página de error |

Cada página tiene su propio título, descripción, H1, migas de pan y datos estructurados (negocio local, servicio y preguntas frecuentes).

## Publicar
Sube el contenido de la carpeta a cualquier hosting (Netlify, Hostinger, GitHub Pages…), **menos la carpeta `src`**, que solo sirve para generar las páginas. Las URLs quedan limpias: `tudominio.es/servicios/`.
También se puede ver abriendo `index.html` con doble clic; los enlaces se ajustan solos.

## Pendiente antes de publicar
- **Dominio**: cuando exista, ponlo en `SITE_URL` dentro de `src/build.js` y ejecuta `node src/build.js`. Se añadirán `canonical`, `og:url`, las migas de pan en datos estructurados y `sitemap.xml`. Después, da de alta el sitemap en Google Search Console.
- **Fotos** (`assets/img/`): son fotos de muestra de Unsplash. Cámbialas por trabajos reales de El Moreno con el mismo nombre de archivo.
- **Aviso legal y política de privacidad**: hay que redactarlos y enlazarlos en el pie.
- **Formulario**: no envía datos a ningún servidor; prepara el mensaje y lo abre en WhatsApp o en el correo.

## Editar textos
Las páginas se generan con `node src/build.js` a partir de `src/partials/` (cabecera, pie, secciones) y de los textos de `src/build.js`. Si editas los HTML a mano, ese cambio se pierde la próxima vez que ejecutes el script.

## Contenido real usado (del flyer)
Teléfono/WhatsApp 605 718 983 · daaviid.ol.2000@gmail.com · Ávila y alrededores · servicios y lemas del flyer.
No se han inventado reseñas, años de experiencia, certificaciones ni cifras.
