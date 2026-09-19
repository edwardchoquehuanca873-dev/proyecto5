# W+ OBRA

Sitio web de **W+ OBRA** (Willy): construcción y servicios integrales.

Identidad visual a partir de los logos oficiales. No se rediseñó la marca.

## Páginas

- `index.html` — inicio
- `nosotros.html` — Willy y la marca
- `servicios.html` — construcción, acabados, integral
- `galeria.html` — portafolio (vacío hasta que agregues fotos reales)
- `contacto.html` — formulario y canales reales

CSS y JavaScript viven en `assets/` y se reutilizan. Header y pie están en cada HTML para que el sitio funcione sin compilador y el SEO no dependa de JavaScript.

## Configurar datos reales

Edita `assets/js/config.js`:

- `whatsapp`: dígitos con código de país (`573001112233`)
- `phone`, `email`, `address`, `hours`
- `mapsEmbedSrc`: URL de iframe de Google Maps (solo si tienes ubicación pública)

WhatsApp (header, flotante, CTAs) aparece únicamente si hay número.

## Galería

1. Copia fotos a `assets/img/galeria/`
2. Decláralas en `assets/js/gallery-data.js`

Las miniaturas usan `object-fit: cover`; al ampliar se ve la imagen completa sin estirar.

## Publicar

Cualquier hosting estático (Netlify, Cloudflare Pages, GitHub Pages, carpeta del dominio).

Cuando tengas dominio, sustituye las URLs de `sitemap.xml` y los `canonical` por la URL absoluta.

## Notas técnicas

En este equipo no había Node/PHP. El sitio es estático a propósito: rápido, seguro (sin backend ni claves) y fácil de ampliar. Si más adelante instalas Node, se puede migrar a un framework sin cambiar la identidad ni el contenido.
