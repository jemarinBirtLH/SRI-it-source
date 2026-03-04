# Source-IT

Portal web estático con recursos prácticos de redes, sistemas, desarrollo web, herramientas y productividad técnica.

## Qué incluye

- Navegación central desde `index.html` con carga dinámica de secciones (SPA ligera con `fetch` + fallback a `iframe`).
- Guías de redes y administración: subnetting, DHCP, DNS, Linux, VirtualBox, Ventoy.
- Bloque FullStack con contenidos de HTML/CSS/JS, Python y Java.
- Secciones de herramientas y productividad: VS Code, Git/GitHub, Figma, Freeplane.
- Recursos adicionales: IA, hacking ético, replanteos de red y mapa interactivo de Clawdbot.
- Sistema visual global con temas (`assets/js/site-theme.js`) y efectos de sonido (`assets/js/site-sfx.js`).

## Estructura del proyecto

```text
.
├── index.html
├── guia_redes.html
├── replanteos_red.html
├── linux_cheatsheet.html
├── virtualbox.html
├── ventoy.html
├── conversor_binario_hexadecimal.html
├── MySQL.html
├── dhcp_dns.html
├── dummies.html
├── lenguajes_de_marcas.html
├── Css_basico.html
├── Js_basico.html
├── javascript.html
├── python.html
├── java.html
├── figma.html
├── hacking_etico.html
├── ia_lanzadera.html
├── freeplane.html
├── visualstudio_code.html
├── git_github.html
├── clawdbot.html
├── VisualStudioCode_cheatsheet.pdf
└── assets
    ├── css
    │   ├── site.css
    │   └── pages/*.css
    └── js
        ├── site-theme.js
        └── site-sfx.js
```

## Mapa rápido de secciones

- **Redes y sistemas**: `guia_redes.html`, `replanteos_red.html`, `linux_cheatsheet.html`, `virtualbox.html`, `ventoy.html`, `dhcp_dns.html`.
- **Utilidades técnicas**: `conversor_binario_hexadecimal.html`, `MySQL.html`.
- **Ruta FullStack**: `dummies.html`, `lenguajes_de_marcas.html`, `Css_basico.html`, `Js_basico.html`, `javascript.html`, `python.html`, `java.html`.
- **Herramientas y productividad**: `figma.html`, `visualstudio_code.html`, `git_github.html`, `freeplane.html`.
- **Otros contenidos**: `hacking_etico.html`, `ia_lanzadera.html`, `clawdbot.html`.

## Stack técnico

- HTML5
- CSS3 + Bootstrap 5 + Bootstrap Icons
- JavaScript Vanilla
- Google Fonts (CDN)

## Ejecución local

### Opción 1 (rápida)

Abrir `index.html` directamente en el navegador.

### Opción 2 (recomendada)

Levantar un servidor local para que el modo SPA funcione con `fetch` en todas las rutas:

```bash
python -m http.server 5500
```

Luego abrir:

```text
http://localhost:5500/index.html
```

## Notas de arquitectura

- `index.html` es la entrada principal y actúa como router de navegación.
- Si se abre en `file://`, la app usa fallback con `iframe`.
- Los estilos globales viven en `assets/css/site.css` y se complementan con `assets/css/pages/`.
- El README técnico de mantenimiento está en `README_DEV.md`.

## Estado actual

Proyecto educativo en evolución, con contenido modular por páginas y enfoque práctico.

## Autor

Jemarin

Contacto disponible dentro de `index.html`.
