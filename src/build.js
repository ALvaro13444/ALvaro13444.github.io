/*
  Generador de la web de El Moreno.
  Uso:  node src/build.js
  Escribe cada página en su carpeta (/servicios/, /contacto/...) con su propio título,
  descripción y datos estructurados. Las piezas comunes están en src/partials.

  Cuando tengas el dominio definitivo, ponlo en SITE_URL (sin barra final) y vuelve a
  ejecutar el script: se añadirán canonical, og:url, migas de pan en datos estructurados
  y el sitemap.xml.
*/
const SITE_URL = ""; // p. ej. "https://www.talaselmoreno.es"

const fs = require("fs");
const path = require("path");
const OUT = path.resolve(__dirname, "..");
const part = (name) => fs.readFileSync(path.join(__dirname, "partials", `${name}.html`), "utf8");

const PHONE = "605 718 983";
const WA = "https://wa.me/34605718983?text=Hola%2C%20quer%C3%ADa%20pedir%20presupuesto%20para%20un%20%C3%A1rbol.";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const strip = (s) => s.replace(/<[^>]+>/g, "");
const brush = (t, c = "yellow") => `<span class="brush brush--${c}" data-paint>${t}</span>`;

/* ---------- Content ---------- */

const FAQ = [
  ["¿Cuánto cuesta talar o podar un árbol?", "Depende de la altura, del tipo de árbol, de lo que haya alrededor y de los restos que salgan. Por eso damos presupuesto cerrado y sin coste: mándanos un par de fotos por WhatsApp y te orientamos el mismo día."],
  ["¿Os lleváis las ramas y los troncos?", "Sí. La retirada de restos va incluida y la indicamos en el presupuesto. Si prefieres quedarte la leña, nos lo dices y te la dejamos troceada y apilada."],
  ["El árbol está pegado a la casa. ¿Se puede quitar?", "Sí, para eso trabajamos en altura. En lugar de derribarlo entero, lo desmontamos desde arriba y bajamos cada tramo atado con cuerda, sin que caiga sobre tejados, vallas ni coches."],
  ["¿Necesito permiso para talar un árbol?", "Depende del municipio y del tipo de árbol: en algunos casos el ayuntamiento pide una autorización. Antes de empezar te decimos si conviene consultarlo y cómo hacerlo."],
  ["¿Cuándo es mejor podar?", "Para la mayoría de árboles de hoja caduca, a finales de invierno, antes de que broten. Las ramas secas o peligrosas conviene quitarlas en cuanto se detectan, sea la época que sea."],
  ["¿Hasta dónde os desplazáis?", "Trabajamos en Ávila capital y en los pueblos de alrededor. Si estás algo más lejos, pregúntanos igualmente."],
];

const SERVICES = [
  {
    slug: "tala-de-arboles", key: "tala", name: "Tala de árboles", icon: "i-tree",
    title: "Tala de árboles en Ávila | Tala por tramos con cuerda · El Moreno",
    description: "Tala de árboles en Ávila y alrededores: árboles secos, enfermos o pegados a la casa. Desmontaje por tramos con cuerda, retirada de restos incluida y presupuesto sin coste.",
    h1: `Tala de ${brush("árboles")} en Ávila`,
    lede: "Quitamos árboles secos, enfermos, inclinados o demasiado cerca de la casa. Si no hay sitio para tirarlos enteros, los desmontamos desde arriba, tramo a tramo.",
    img: ["tala.webp", 1000, 667, "Operario talando un tronco grueso con motosierra mientras salta el serrín"],
    whenTitle: "¿Cuándo conviene talar un árbol?",
    whenLede: "No todos los árboles problemáticos hay que quitarlos, pero estas señales indican que ha llegado el momento.",
    when: [
      ["Está seco o muerto", "Un árbol sin vida pierde ramas y puede partirse con el viento."],
      ["Se inclina hacia la casa o el camino", "Si la inclinación aumenta o el suelo se levanta en la base, conviene actuar."],
      ["Tiene el tronco dañado", "Grietas, huecos u hongos en la base indican que la madera ha perdido resistencia."],
      ["Sus raíces dan problemas", "Levantan muros, aceras o tuberías y no hay forma de controlarlas."],
    ],
    how: [
      ["Valoramos el árbol y su entorno", "Vemos hacia dónde puede ir cada pieza y qué hay que proteger: tejados, vallas, coches o cables."],
      ["Tala dirigida o por tramos", "Si hay espacio, se derriba en una dirección controlada. Si no, trepamos y lo bajamos por partes atadas con cuerda."],
      ["Recogemos y limpiamos", "Troceamos el tronco, nos llevamos ramas y restos y dejamos la zona barrida."],
    ],
    includes: ["Presupuesto sin coste", "Zona señalizada y protegida", "Desmontaje por tramos cuando hace falta", "Retirada de ramas y troncos", "Limpieza final"],
    faq: [FAQ[2], FAQ[3], ["¿Qué pasa con la leña?", "Nos la llevamos junto al resto de restos. Si la quieres para la chimenea, te la dejamos troceada y apilada donde nos digas."]],
  },
  {
    slug: "poda-en-altura", key: "poda", name: "Poda en altura", icon: "i-shears",
    title: "Poda en altura en Ávila | Poda de árboles con cuerda · El Moreno",
    description: "Poda de árboles en altura en Ávila: reducción de copa, ramas peligrosas sobre tejados y poda de formación. Trabajo con cuerda y arnés, retirada de restos incluida.",
    h1: `Poda ${brush("en altura")} en Ávila`,
    lede: "Podamos árboles grandes desde dentro de la copa, con cuerda y arnés. Cortes limpios para que el árbol cicatrice bien, crezca sano y deje de ser un riesgo.",
    img: ["poda.webp", 760, 1140, "Podador con casco amarillo y arnés de pie sobre una rama gruesa, trabajando en la copa"],
    whenTitle: "¿Qué poda necesita tu árbol?",
    whenLede: "Cada árbol pide un tipo de poda. Te decimos cuál después de verlo.",
    when: [
      ["Reducción de copa", "Para árboles que han crecido demasiado y quitan luz o pesan sobre la casa."],
      ["Ramas sobre tejados y vallas", "Quitamos las que rozan la casa, ensucian canalones o cuelgan sobre el paso."],
      ["Ramas secas o rotas", "Eliminamos las que pueden caer, sobre todo después de un temporal."],
      ["Poda de formación", "En árboles jóvenes, para guiar su crecimiento y evitar problemas más adelante."],
    ],
    how: [
      ["Decidimos qué cortar", "No se poda por podar: cada corte tiene un motivo y un sitio correcto."],
      ["Trepamos y cortamos con cuerda", "Las ramas grandes se bajan atadas para no dañar nada de lo que hay debajo."],
      ["Recogemos los restos", "Troceamos las ramas, las cargamos y limpiamos la zona."],
    ],
    includes: ["Presupuesto sin coste", "Trabajo con cuerda y arnés", "Cortes limpios y bien situados", "Retirada de ramas", "Limpieza final"],
    faq: [
      FAQ[4],
      ["¿Podar mucho es malo para el árbol?", "Sí. Quitar demasiada copa de golpe debilita el árbol y provoca brotes descontrolados. Preferimos podas equilibradas y, si hace falta, repartidas en varias temporadas."],
      ["¿Y si las ramas tocan cables?", "Si hay tendido eléctrico cerca, hay que coordinarlo con la compañía antes de trabajar. Te lo indicamos al ver el árbol."],
    ],
  },
  {
    slug: "retirada-de-restos", key: "restos", name: "Retirada de restos", icon: "i-stump",
    title: "Retirada de restos de poda y tala en Ávila · El Moreno",
    description: "Retiramos ramas, troncos y restos de la poda o la tala en Ávila y alrededores. Troceado, carga y limpieza final incluidos en el presupuesto.",
    h1: `Retirada de ${brush("restos")} de poda y tala`,
    lede: "El trabajo no termina cuando cae la última rama. Troceamos, cargamos y nos llevamos los restos, y barremos antes de irnos.",
    img: ["troncos.webp", 1000, 667, "Pila de troncos recién cortados"],
    whenTitle: "Qué nos llevamos",
    whenLede: "Todo lo que sale de la poda o la tala, para que no tengas que preocuparte de nada.",
    when: [
      ["Ramas y hojas", "Las troceamos para cargarlas sin dejar nada por el camino."],
      ["Troncos", "Los cortamos en piezas manejables y los retiramos."],
      ["Serrín y astillas", "Barremos la zona de trabajo al terminar."],
      ["Leña, si la quieres", "Si prefieres quedártela, te la dejamos troceada y apilada."],
    ],
    how: [
      ["Troceamos", "Ramas y troncos se cortan en piezas que se pueden mover con seguridad."],
      ["Cargamos", "Lo sacamos de la parcela sin dañar el césped, los muros ni las plantas."],
      ["Limpiamos", "Barremos y revisamos que no quede nada antes de irnos."],
    ],
    includes: ["Incluida en el presupuesto de poda o tala", "Troceado de ramas y troncos", "Carga y retirada", "Barrido final"],
    faq: [FAQ[1], ["¿La retirada se cobra aparte?", "No: va incluida en el presupuesto de la poda o la tala y la verás indicada antes de empezar."]],
  },
  {
    slug: "mantenimiento-zonas-verdes", key: "zonas", name: "Mantenimiento de zonas verdes", icon: "i-home",
    title: "Mantenimiento de zonas verdes y arbolado en Ávila · El Moreno",
    description: "Mantenimiento de arbolado y zonas verdes en Ávila para casas, parcelas, comunidades, empresas y espacios públicos. Trabajos puntuales o revisiones de temporada.",
    h1: `Mantenimiento de ${brush("zonas verdes")}`,
    lede: "Para hogares, parcelas, comunidades, empresas y espacios públicos de Ávila y alrededores. Cuidamos el arbolado para que crezca sano y no dé sustos.",
    img: ["copa.webp", 1600, 900, "Arborista con arnés trabajando entre las ramas de un árbol grande sin hojas"],
    whenTitle: "Para quién trabajamos",
    whenLede: "Trabajos puntuales o revisiones de temporada, según lo que necesite cada sitio.",
    when: [
      ["Hogares y chalets", "Árboles del jardín que han crecido demasiado o están cerca de la casa."],
      ["Parcelas y fincas", "Arbolado grande, ramas secas y limpieza después de los trabajos."],
      ["Comunidades de vecinos", "Zonas comunes con árboles que dan sombra, ensucian o preocupan."],
      ["Empresas y espacios públicos", "Mantenimiento del arbolado para que sea seguro para todos."],
    ],
    how: [
      ["Revisamos el arbolado", "Vemos el estado de cada árbol y qué necesita."],
      ["Planificamos los trabajos", "Te decimos qué conviene hacer ahora y qué puede esperar."],
      ["Lo hacemos y lo dejamos limpio", "Podas, talas y retirada de restos, todo en el mismo trabajo."],
    ],
    includes: ["Revisión del estado de los árboles", "Podas y talas necesarias", "Retirada de restos", "Presupuesto sin coste"],
    faq: [
      ["¿Hacéis trabajos puntuales o solo mantenimiento?", "Las dos cosas. Puedes llamarnos para un árbol concreto o para revisar el arbolado cada temporada."],
      ["¿Trabajáis para comunidades y empresas?", "Sí. Trabajamos para particulares, comunidades, empresas y espacios públicos."],
      FAQ[5],
    ],
  },
];

/* ---------- Building blocks ---------- */

const icon = (id) => `<svg aria-hidden="true"><use href="#${id}"/></svg>`;
const waBtn = (cls, label) => `<a class="btn btn--wa ${cls}" href="${WA}" target="_blank" rel="noopener">${icon("i-whatsapp")}${label}</a>`;

const crumbs = (trail) => `<nav class="crumbs" aria-label="Migas de pan"><ol>${trail.map(([name, href], i) =>
  i === trail.length - 1 ? `<li><span aria-current="page">${name}</span></li>` : `<li><a href="${href}">${name}</a></li>`).join("")}</ol></nav>`;

const pageHero = ({ trail, h1, lede, img }) => `
    <section class="hero hero--page" aria-labelledby="page-title">
      <div class="wrap hero__grid">
        <div class="hero__copy">
          ${crumbs(trail)}
          <h1 class="hero__title display" id="page-title">${h1}</h1>
          <p class="hero__lede">${lede}</p>
          <div class="hero__actions">
            ${waBtn("btn--lg", "Pide presupuesto por WhatsApp")}
            <a class="btn btn--ghost btn--lg" href="tel:+34605718983">${icon("i-phone")}Llamar al ${PHONE}</a>
          </div>
        </div>
        <figure class="hero__media">
          <div class="hero__photo" data-parallax>
            <img src="{{root}}assets/img/${img[0]}" width="${img[1]}" height="${img[2]}" alt="${esc(img[3])}" fetchpriority="high">
          </div>
        </figure>
      </div>
    </section>
`;

const faqSection = (items, { title = "Lo que más nos preguntan", more = false, id = "preguntas" } = {}) => `
    <section class="faq" id="${id}" aria-labelledby="${id}-title">
      <div class="wrap faq__grid">
        <div class="faq__head">
          <h2 class="display h2" id="${id}-title">${title}</h2>
          <p class="lede">¿Tu duda no está aquí? Escríbela por WhatsApp y te contestamos.</p>
          ${more ? `<a class="link-arrow" href="{{root}}preguntas-frecuentes/">Ver todas las preguntas ${icon("i-arrow")}</a>` : `<a class="link-arrow" href="{{root}}contacto/">Ir a contacto ${icon("i-arrow")}</a>`}
        </div>
        <div class="faq__list">
${items.map(([q, a]) => `          <details class="qa">
            <summary>${q}</summary>
            <div class="qa__body"><p>${a}</p></div>
          </details>`).join("\n")}
        </div>
      </div>
    </section>
`;

const ctaBand = () => `
    <section class="cta-band" aria-labelledby="cta-title">
      <div class="wrap cta-band__inner">
        <h2 class="display cta-band__title" id="cta-title">¿Un árbol que te preocupa? ${brush("Manda")} ${brush("una foto")}</h2>
        <div class="cta-band__actions">
          <a class="btn btn--wa btn--xl" href="${WA}" target="_blank" rel="noopener">${icon("i-whatsapp")}<span><small>Escríbenos por WhatsApp</small>${PHONE}</span></a>
          <a class="link-arrow" href="{{root}}contacto/">O rellena el formulario de presupuesto ${icon("i-arrow")}</a>
        </div>
      </div>
    </section>
`;

const serviceDetail = (s) => `
    <section class="detail detail--when" aria-labelledby="when-title">
      <div class="wrap detail__grid">
        <div>
          <h2 class="display h2" id="when-title">${s.whenTitle}</h2>
          <p class="lede">${s.whenLede}</p>
        </div>
        <ul class="checks checks--leaf" role="list">
${s.when.map(([t, d]) => `          <li>${icon("i-check")}<div><h3>${t}</h3><p>${d}</p></div></li>`).join("\n")}
        </ul>
      </div>
    </section>

    <section class="detail detail--how" aria-labelledby="how-title">
      <div class="wrap">
        <h2 class="display h2" id="how-title">Cómo lo ${brush("hacemos")}</h2>
        <ol class="how" role="list">
${s.how.map(([t, d]) => `          <li class="how__step"><span class="how__knot" aria-hidden="true"></span><h3>${t}</h3><p>${d}</p></li>`).join("\n")}
        </ol>
      </div>
    </section>

    <section class="detail detail--inc" aria-labelledby="inc-title">
      <div class="wrap detail__grid">
        <div>
          <h2 class="display h2" id="inc-title">Qué incluye</h2>
          <ul class="inc" role="list">
${s.includes.map((t) => `            <li>${icon("i-check")}${t}</li>`).join("\n")}
          </ul>
        </div>
        <aside class="inc__card" aria-label="Pedir presupuesto">
          <p class="inc__card-title display">Presupuesto sin coste</p>
          <p>Mándanos unas fotos del árbol y la ubicación. Te respondemos con una valoración y el precio antes de empezar.</p>
          ${waBtn("btn--block", "Pedir presupuesto")}
          <a class="btn btn--ghost btn--block" href="tel:+34605718983">${icon("i-phone")}Llamar al ${PHONE}</a>
        </aside>
      </div>
    </section>
${faqSection(s.faq, { title: `Dudas sobre ${s.name.toLowerCase()}`, id: "dudas" })}
    <section class="related" aria-labelledby="related-title">
      <div class="wrap">
        <h2 class="related__title" id="related-title">Otros servicios</h2>
        <ul class="related__list" role="list">
${SERVICES.filter((o) => o !== s).map((o) => `          <li><a href="{{root}}servicios/${o.slug}/"><svg class="related__icon" aria-hidden="true"><use href="#${o.icon}"/></svg><span class="display">${o.name}</span>${icon("i-arrow")}</a></li>`).join("\n")}
        </ul>
      </div>
    </section>
`;

/* ---------- Pages ---------- */

const home = ["Inicio", "{{root}}"];
const svcCrumb = ["Servicios", "{{root}}servicios/"];

const pages = [
  {
    path: "", nav: "",
    title: "El Moreno · Talas y podas en altura en Ávila | Presupuesto sin coste",
    description: "Talas y podas en altura en Ávila y alrededores. Trabajo con cuerda y arnés, corte por tramos, retirada de restos incluida y presupuesto sin coste. WhatsApp 605 718 983.",
    preload: true,
    body: () => part("hero") + part("tapes") + part("services") + part("process") + part("safety") + faqSection(FAQ.slice(0, 3), { more: true }) + part("contact").replace(/\{\{contactH\}\}/g, "h2"),
    schema: () => [faqSchema(FAQ.slice(0, 3))],
  },
  {
    path: "servicios/", nav: "servicios",
    title: "Servicios de tala y poda de árboles en Ávila · El Moreno",
    description: "Tala de árboles, poda en altura, retirada de restos y mantenimiento de zonas verdes en Ávila y alrededores. Trabajo con cuerda, zona limpia y presupuesto sin coste.",
    trail: [home, ["Servicios"]],
    body: () => pageHero({ trail: [home, ["Servicios"]], h1: `Servicios de tala y ${brush("poda")} en Ávila`, lede: "Todo lo que necesita un árbol grande, desde la valoración hasta la última rama recogida. Elige un servicio para ver cómo trabajamos.", img: ["motosierra.webp", 800, 834, "Arborista con casco, protección auditiva y ropa anticorte sujetando una motosierra en lo alto del árbol"] }) + part("tapes") + part("services") + part("safety") + ctaBand(),
  },
  ...SERVICES.map((s) => ({
    path: `servicios/${s.slug}/`, nav: "servicios", title: s.title, description: s.description,
    trail: [home, svcCrumb, [s.name]],
    body: () => pageHero({ trail: [home, svcCrumb, [s.name]], h1: s.h1, lede: s.lede, img: s.img }) + serviceDetail(s) + ctaBand(),
    schema: (url) => [serviceSchema(s, url), faqSchema(s.faq)],
    ogImage: s.img[0],
  })),
  {
    path: "como-trabajamos/", nav: "como-trabajamos",
    title: "Cómo trabajamos: tala por tramos y seguridad · El Moreno, Ávila",
    description: "Así talamos y podamos en altura en Ávila: fotos y presupuesto sin coste, zona asegurada, corte por tramos con cuerda y limpieza final. Personal capacitado y equipos de seguridad.",
    trail: [home, ["Cómo trabajamos"]],
    body: () => pageHero({ trail: [home, ["Cómo trabajamos"]], h1: `Cómo trabajamos, ${brush("paso a paso")}`, lede: "Un árbol grande no se corta de un golpe. Se planifica, se asegura la zona y se baja por partes. Baja por la página y míralo.", img: ["poda.webp", 760, 1140, "Podador con casco amarillo y arnés de pie sobre una rama gruesa, trabajando en la copa"] }) + part("process") + part("safety") + ctaBand(),
  },
  {
    path: "preguntas-frecuentes/", nav: "preguntas-frecuentes",
    title: "Preguntas frecuentes sobre tala y poda en Ávila · El Moreno",
    description: "Precio de talar o podar un árbol, permisos, retirada de restos, mejor época para podar y zona de trabajo en Ávila. Respuestas claras de El Moreno.",
    trail: [home, ["Preguntas frecuentes"]],
    body: () => pageHero({ trail: [home, ["Preguntas frecuentes"]], h1: `Preguntas ${brush("frecuentes")}`, lede: "Lo que más nos preguntan antes de pedir presupuesto. Si tu duda no está, escríbenos.", img: ["copa.webp", 1600, 900, "Arborista con arnés trabajando entre las ramas de un árbol grande sin hojas"] }) + faqSection(FAQ, { title: "Todas las respuestas" }) + ctaBand(),
    schema: () => [faqSchema(FAQ)],
  },
  {
    path: "contacto/", nav: "contacto",
    title: "Contacto y presupuesto de tala y poda en Ávila · El Moreno",
    description: "Pide presupuesto sin coste para talar o podar un árbol en Ávila. WhatsApp y teléfono 605 718 983, correo o formulario. Respuesta con valoración y precio.",
    trail: [home, ["Contacto"]],
    body: () => `\n    <div class="wrap contact-crumbs">${crumbs([home, ["Contacto"]])}</div>\n` + part("contact").replace(/\{\{contactH\}\}/g, "h1"),
  },
  {
    path: "404.html", nav: "", absolute: true, noindex: true,
    title: "Página no encontrada · El Moreno",
    description: "Esta página no existe. Vuelve al inicio o pide presupuesto por WhatsApp.",
    body: () => pageHero({ trail: [home, ["Página no encontrada"]], h1: `Esta rama ya ${brush("no está")}`, lede: "La página que buscas no existe o ha cambiado de sitio. Vuelve al inicio o escríbenos directamente.", img: ["troncos.webp", 1000, 667, "Pila de troncos cortados"] }),
  },
];

/* ---------- Structured data ---------- */

const business = (url) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": url ? `${SITE_URL}/#negocio` : undefined,
  name: "El Moreno · Talas y podas en altura",
  description: "Talas de árboles, podas en altura, retirada de restos y mantenimiento de zonas verdes en Ávila y alrededores.",
  telephone: "+34605718983",
  email: "daaviid.ol.2000@gmail.com",
  areaServed: { "@type": "City", name: "Ávila" },
  url: SITE_URL ? `${SITE_URL}/` : undefined,
  image: SITE_URL ? `${SITE_URL}/assets/img/og.jpg` : undefined,
});
const faqSchema = (items) => ({
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
});
const serviceSchema = (s, url) => ({
  "@context": "https://schema.org", "@type": "Service",
  name: `${s.name} en Ávila`, serviceType: s.name, description: s.description,
  areaServed: { "@type": "City", name: "Ávila" },
  provider: { "@type": "LocalBusiness", name: "El Moreno · Talas y podas en altura", telephone: "+34605718983" },
  url: url || undefined,
});
const breadcrumbSchema = (trail, url) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: trail.map(([name, href], i) => ({
    "@type": "ListItem", position: i + 1, name,
    item: i === trail.length - 1 ? url : `${SITE_URL}/${(href || "").replace("{{root}}", "")}`,
  })),
});

/* ---------- Render ---------- */

const render = (pg) => {
  const depth = pg.absolute ? 0 : pg.path.split("/").filter(Boolean).length;
  const root = pg.absolute ? "/" : "../".repeat(depth);
  const url = SITE_URL ? `${SITE_URL}/${pg.path === "404.html" ? "" : pg.path}` : "";
  const ogImg = SITE_URL ? `${SITE_URL}/assets/img/og.jpg` : `${root}assets/img/og.jpg`;
  const schemas = [business(url), ...(pg.schema ? pg.schema(url) : [])];
  if (SITE_URL && pg.trail) schemas.push(breadcrumbSchema(pg.trail, url));

  const head = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${pg.title}</title>
  <meta name="description" content="${esc(pg.description)}">
${pg.noindex ? '  <meta name="robots" content="noindex">\n' : ""}${url && !pg.noindex ? `  <link rel="canonical" href="${url}">\n` : ""}  <meta name="theme-color" content="#0d2614">
  <link rel="icon" href="${root}assets/svg/favicon.svg" type="image/svg+xml">

  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_ES">
  <meta property="og:site_name" content="El Moreno · Talas y podas en altura">
  <meta property="og:title" content="${esc(pg.title)}">
  <meta property="og:description" content="${esc(pg.description)}">
${url ? `  <meta property="og:url" content="${url}">\n` : ""}  <meta property="og:image" content="${ogImg}">
  <meta name="twitter:card" content="summary_large_image">
${pg.preload ? `
  <link rel="preload" as="image" href="${root}assets/img/hero-1000.webp" imagesrcset="${root}assets/img/hero-640.webp 640w, ${root}assets/img/hero-1000.webp 1000w" imagesizes="(min-width: 900px) 42vw, 100vw" fetchpriority="high">` : ""}
  <link rel="stylesheet" href="${root}assets/fonts.css">
  <link rel="stylesheet" href="${root}styles.css">
  <script>document.documentElement.classList.add("js");</script>
${schemas.map((s) => `  <script type="application/ld+json">${JSON.stringify(s)}</script>`).join("\n")}
</head>
<body>
  <a class="skip" href="#contenido">Saltar al contenido</a>

`;
  let header = part("header");
  if (pg.nav) header = header.replace(`href="{{root}}${pg.nav}/">`, `href="{{root}}${pg.nav}/" aria-current="page">`);

  const html = head + part("sprite") + "\n" + header + `\n  <main id="contenido">\n` + pg.body() + `  </main>\n\n` + part("footer") + `\n  <script src="${root}main.js" defer></script>\n</body>\n</html>\n`;
  const out = html.replace(/\{\{root\}\}/g, root);
  const file = pg.path.endsWith(".html") ? pg.path : path.join(pg.path, "index.html");
  fs.mkdirSync(path.join(OUT, path.dirname(file)), { recursive: true });
  fs.writeFileSync(path.join(OUT, file), out);
  return file;
};

const written = pages.map(render);

fs.writeFileSync(path.join(OUT, "robots.txt"), `User-agent: *\nAllow: /\n${SITE_URL ? `\nSitemap: ${SITE_URL}/sitemap.xml\n` : ""}`);
if (SITE_URL) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages.filter((p) => !p.noindex).map((p) => `  <url><loc>${SITE_URL}/${p.path}</loc><lastmod>${today}</lastmod></url>`);
  fs.writeFileSync(path.join(OUT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
}
console.log(`${written.length} páginas:\n  ${written.join("\n  ")}${SITE_URL ? "\n  sitemap.xml" : "\n(sin SITE_URL: no se genera sitemap ni canonical)"}`);
