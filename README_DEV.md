# README_DEV

## 1. Objetivo tecnico
Documentacion de desarrollo para la web `Source-IT`.
Este archivo resume arquitectura, flujo de navegacion, scripts compartidos y funciones por pagina para facilitar mantenimiento y nuevas mejoras.

## 2. Stack y dependencias
- HTML estatico multipagina.
- CSS compartido: `assets/css/site.css`.
- JavaScript vanilla.
- Bootstrap 5 (CSS/JS bundle por CDN).
- Bootstrap Icons por CDN.
- Google Fonts por CDN.

## 3. Estructura del proyecto
```text
index.html
guia_redes.html
linux_cheatsheet.html
virtualbox.html
conversor_binario_hexadecimal.html
MySQL.html
dhcp_dns.html
lenguajes_de_marcas.html
Css_basico.html
Js_basico.html
figma.html
hacking_etico.html
ia_lanzadera.html
git_github.html
freeplane.html
README.md
assets/
  css/
    site.css
  js/
    site-theme.js
    site-sfx.js
```

## 4. Arquitectura general
### 4.1 Capa visual
- `assets/css/site.css` contiene estilos globales (navbar, cards, hero, temas visuales, animaciones) y bloques por pagina (ej. FIGMA PAGE).

### 4.2 Capa de comportamiento global
- `assets/js/site-theme.js`
  - Inyecta hoja de estilos dinamica con variables CSS y variantes visuales.
  - Controla el boton de tema `#themeToggle`.
  - Persiste estilo en `localStorage` (`siteVisualStyle`).
  - Marca enlace activo del navbar.

- `assets/js/site-sfx.js`
  - Inicializa Web Audio API.
  - Desbloquea audio tras primera interaccion del usuario.
  - Reproduce efectos segun tipo de accion (nav, tema, boton, input, etc.).
  - Expone API global `window.siteSfx`.

## 5. Navegacion y flujo SPA (index.html)
`index.html` funciona como home + router SPA ligero.

### 5.1 Rutas controladas
Conjunto `spaRoutes` con paginas internas permitidas (ej. `guia_redes.html`, `figma.html`, `ia_lanzadera.html`, etc.).

### 5.2 Modo de carga
- Si `location.protocol === 'file:'`: usa iframe (`loadRouteInIframe`) para compatibilidad local.
- En http/https: usa `fetch` + `DOMParser` para inyectar contenido sin recargar pagina.
- Si `fetch` falla: fallback a iframe.

### 5.3 Limpieza entre rutas
- `clearSpaAssets()` elimina estilos/scripts inyectados previamente.
- Evita acumulacion de nodos dinamicos y reduce conflictos.

### 5.4 Intercepcion de enlaces
- Listener delegado en `document` intercepta links internos.
- Usa `history.pushState` para actualizar URL hash.
- Maneja `popstate` para navegacion atras/adelante.

## 6. Inventario tecnico de funciones

### 6.1 index.html
| Funcion | Tipo | Responsabilidad |
|---|---|---|
| `normalizeRoute(route)` | util | Normaliza hash/ruta a `home` o archivo destino. |
| `showHomeView()` | vista | Muestra hero/grid home y oculta contenedor SPA. |
| `clearSpaAssets()` | limpieza | Elimina `<style>` y `<script>` inyectados dinamicamente. |
| `ensureSpaFrame()` | fabrica | Crea/reutiliza iframe fallback para carga de rutas. |
| `loadRouteInIframe(normalized, pushState)` | navegacion | Carga ruta en iframe, actualiza title y estado historial. |
| `injectPageStyles(doc, route)` | inyeccion | Copia estilos inline de pagina destino al documento principal. |
| `runPageScripts(doc, route)` | ejecucion | Ejecuta scripts del body de la pagina inyectada (con filtros). |
| `loadRoute(route, pushState)` | orquestacion | Flujo principal de carga de ruta con fetch/parser/fallback. |

### 6.2 guia_redes.html (clase `SubnetCalculator`)
| Metodo | Responsabilidad |
|---|---|
| `bindEvents()` | Conecta listeners de inputs y botones. |
| `toggleSubnetInput()` | Ajusta label/rango/placeholder segun modo de subneteo. |
| `calculate()` | Valida datos, define CIDR objetivo y calcula resultados. |
| `renderResults(base, targetCIDR, subnets)` | Renderiza resumen y tabla de subredes (tope 256 filas visibles). |
| `clear()` | Reinicia formulario y bloques de resultados. |
| `syncMaskFromCIDR()` | Convierte CIDR a mascara decimal. |
| `syncCIDRFromMask()` | Convierte mascara decimal a CIDR (con validacion). |
| `isValidIPv4(ip)` | Valida sintaxis IPv4. |
| `ipToInt(ip)` / `intToIp(intValue)` | Conversion IP string <-> entero 32 bits. |
| `cidrToMask(cidr)` / `maskToCidr(mask)` | Conversion de prefijo y mascara. |
| `calculateNetwork(ip, cidr)` | Calcula red/broadcast base. |
| `getUsableHosts(cidr)` | Calcula hosts utilizables por subred. |
| `generateSubnets(baseNetworkInt, baseCIDR, targetCIDR)` | Genera lista de subredes derivadas. |

### 6.3 conversor_binario_hexadecimal.html
| Funcion | Responsabilidad |
|---|---|
| `populateConversionTable()` | Genera tabla 4 bits -> hex en DOM. |
| `isValidBinary(bin)` | Valida entrada binaria. |
| `isValidHex(hex)` | Valida entrada hexadecimal. |
| `binaryToHex(bin)` | Convierte binario a hex y genera pasos didacticos. |
| `hexToBinary(hex)` | Convierte hex a binario y genera pasos didacticos. |
| `updateMode()` | Ajusta UI segun modo seleccionado. |
| `convert()` | Ejecuta validacion + conversion + pintado de resultado. |
| `clearAll()` | Limpia entrada y resultado. |

### 6.4 Js_basico.html
| Funcion/Evento | Responsabilidad |
|---|---|
| `isValidIpv4(ip)` | Validacion IPv4 con regex. |
| `helloBtn.click` | Saludo personalizado al usuario. |
| `loopBtn.click` | Demostracion de event loop (microtask/macrotask). |
| `validateBtn.click` | Muestra resultado de validacion IPv4. |

### 6.5 Otras paginas con JS inline
| Archivo | Logica |
|---|---|
| `Css_basico.html` | Acordeon manual + demo de evento click y cambio de estilos DOM. |
| `hacking_etico.html` | Acordeon manual de items. |
| `lenguajes_de_marcas.html` | Oculta animacion al finalizar + acordeon manual. |
| `ia_lanzadera.html` | Fallback de logos rotos (`applyLogoFallback`). |

## 7. Convenciones actuales
- Carga de scripts globales al final de cada pagina (`site-sfx.js`, `site-theme.js`).
- Uso mixto de:
  - contenido estatico por pagina
  - logica dinamica centralizada desde `index.html` cuando se navega como SPA.
- CSS mayormente centralizado en `site.css`, aunque historicamente hubo estilos inline en algunas paginas.

## 8. Riesgos/observaciones tecnicas
- Inyeccion de scripts en modo SPA puede producir efectos duplicados si una pagina no esta pensada para reinicializarse multiples veces.
- Existen scripts vacios en varias paginas (bloques `<script></script>` sin contenido); no rompen, pero generan ruido.
- Hay mezcla de nombres de archivo en mayus/minus (`Css_basico.html`, `Js_basico.html`, `MySQL.html`) que puede afectar despliegues en servidores case-sensitive.

## 9. Recomendaciones de mantenimiento
1. Mantener toda logica compartida en `assets/js` y minimizar JS inline por pagina.
2. Estandarizar naming de archivos en minusculas para evitar problemas cross-platform.
3. Eliminar scripts vacios y estilos/markup legacy no usados.
4. Si crece el router SPA, extraer la logica de `index.html` a `assets/js/site-router.js`.

## 10. Referencias rapidas
- Home/router: `index.html`
- Estilos globales: `assets/css/site.css`
- Tema visual: `assets/js/site-theme.js`
- Sonidos UI: `assets/js/site-sfx.js`
- Calculadora de subredes: `guia_redes.html`
- Conversor bin/hex: `conversor_binario_hexadecimal.html`
