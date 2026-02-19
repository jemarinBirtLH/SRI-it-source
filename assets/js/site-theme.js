(function () {
    var STYLE_KEY = 'siteVisualStyle';
    var STYLE_IDS = ['aurora', 'paper', 'sunset', 'terminal'];
    var STYLE_LABELS = {
        aurora: 'Aurora Grid',
        paper: 'Paper Studio',
        sunset: 'Sunset Arcade',
        terminal: 'Green Terminal'
    };

    function injectGlobalStyleSheet() {
        if (document.getElementById('site-visual-styles')) return;

        var style = document.createElement('style');
        style.id = 'site-visual-styles';
        style.textContent = [
            ':root {',
            '  --site-body-bg: linear-gradient(135deg, #f5f7fa 0%, #e8eef3 100%);',
            '  --site-text: #102030;',
            '  --site-surface-bg: #ffffff;',
            '  --site-surface-text: #102030;',
            '  --site-border: #d7e1ea;',
            '  --site-title: #0a4d68;',
            '  --site-accent: #05bfdb;',
            '  --site-navbar-bg: #0a0e27;',
            '  --site-navbar-border: #00ff88;',
            '  --site-navbar-shadow: 0 0 30px rgba(0, 255, 136, 0.55), inset 0 0 20px rgba(0, 255, 136, 0.12);',
            '  --site-hero-bg: linear-gradient(135deg, #0a4d68, #088395);',
            '  --site-hero-text: #ffffff;',
            '  --site-footer-bg: #0a4d68;',
            '  --site-footer-text: #ffffff;',
            '  --site-code-bg: #1e1e1e;',
            '  --site-code-text: #61dafb;',
            '}',
            '',
            'body {',
            '  background: var(--site-body-bg) !important;',
            '  color: var(--site-text);',
            '  transition: background .6s ease, color .4s ease;',
            '}',
            '.hero {',
            '  background: var(--site-hero-bg) !important;',
            '  color: var(--site-hero-text) !important;',
            '}',
            '.section-title {',
            '  color: var(--site-title) !important;',
            '  border-bottom-color: var(--site-accent) !important;',
            '}',
            '.card, .card-custom, .step-card, .glossary-section, .accordion-item, table, .container .card {',
            '  background: var(--site-surface-bg) !important;',
            '  color: var(--site-surface-text);',
            '  border-color: var(--site-border) !important;',
            '}',
            '.card-header-custom {',
            '  background: var(--site-hero-bg) !important;',
            '  color: var(--site-hero-text) !important;',
            '}',
            '.code-block, pre {',
            '  background: var(--site-code-bg) !important;',
            '  color: var(--site-code-text) !important;',
            '}',
            '.navbar-neon {',
            '  background: var(--site-navbar-bg) !important;',
            '  border-bottom-color: var(--site-navbar-border) !important;',
            '  box-shadow: var(--site-navbar-shadow) !important;',
            '}',
            '.theme-btn {',
            '  border-color: var(--site-navbar-border) !important;',
            '  color: var(--site-navbar-border) !important;',
            '}',
            'footer, footer.bg-dark {',
            '  background: var(--site-footer-bg) !important;',
            '  color: var(--site-footer-text) !important;',
            '}',
            '',
            'body[data-site-style="aurora"] {',
            '  --site-body-bg: linear-gradient(120deg, #041f31, #0a4d68, #0b7fa3, #03131f);',
            '  --site-text: #dffaff;',
            '  --site-surface-bg: rgba(6, 35, 55, .82);',
            '  --site-surface-text: #e8fbff;',
            '  --site-border: rgba(102, 255, 241, .35);',
            '  --site-title: #7af4ff;',
            '  --site-accent: #53ffd7;',
            '  --site-navbar-bg: linear-gradient(90deg, #031724, #08283a);',
            '  --site-navbar-border: #53ffd7;',
            '  --site-navbar-shadow: 0 0 28px rgba(83,255,215,.55), inset 0 0 22px rgba(83,255,215,.15);',
            '  --site-hero-bg: linear-gradient(140deg, #063145, #0a4d68, #0892ae);',
            '  --site-footer-bg: #062636;',
            '  --site-code-bg: #02111b;',
            '  --site-code-text: #8ffbff;',
            '  background-size: 220% 220% !important;',
            '  animation: siteAuroraShift 14s ease infinite;',
            '}',
            '',
            'body[data-site-style="paper"] {',
            '  --site-body-bg: linear-gradient(160deg, #f8f4ea 0%, #efe6d4 100%);',
            '  --site-text: #352a1e;',
            '  --site-surface-bg: #fffdf7;',
            '  --site-surface-text: #30261b;',
            '  --site-border: #d6c7ae;',
            '  --site-title: #5b3f1f;',
            '  --site-accent: #9f6c2e;',
            '  --site-navbar-bg: linear-gradient(90deg, #3e2f24, #5b4632);',
            '  --site-navbar-border: #d9b36b;',
            '  --site-navbar-shadow: 0 0 22px rgba(108,78,42,.45), inset 0 0 16px rgba(255,255,255,.08);',
            '  --site-hero-bg: linear-gradient(135deg, #7a5b3a, #b88c52);',
            '  --site-footer-bg: #4e3a28;',
            '  --site-code-bg: #2b2018;',
            '  --site-code-text: #f7ddb3;',
            '}',
            '',
            'body[data-site-style="sunset"] {',
            '  --site-body-bg: radial-gradient(circle at 20% 10%, #ffe1b5 0%, #ffb98a 35%, #ff7a7a 70%, #7a3057 100%);',
            '  --site-text: #2f1020;',
            '  --site-surface-bg: rgba(255, 245, 236, .92);',
            '  --site-surface-text: #311122;',
            '  --site-border: rgba(122, 48, 87, .25);',
            '  --site-title: #7a3057;',
            '  --site-accent: #ff7a7a;',
            '  --site-navbar-bg: linear-gradient(90deg, #4f1f3d, #7a3057);',
            '  --site-navbar-border: #ffb98a;',
            '  --site-navbar-shadow: 0 0 26px rgba(255,122,122,.45), inset 0 0 18px rgba(255,185,138,.2);',
            '  --site-hero-bg: linear-gradient(120deg, #7a3057, #d25868, #ff9a76);',
            '  --site-footer-bg: #582240;',
            '  --site-code-bg: #2f1222;',
            '  --site-code-text: #ffd4cf;',
            '}',
            '',
            'body[data-site-style="terminal"] {',
            '  --site-body-bg: #06120b;',
            '  --site-text: #9cffb0;',
            '  --site-surface-bg: #0a1d12;',
            '  --site-surface-text: #b7ffc3;',
            '  --site-border: rgba(116, 255, 133, .25);',
            '  --site-title: #62ff86;',
            '  --site-accent: #3ced6e;',
            '  --site-navbar-bg: #020805;',
            '  --site-navbar-border: #54ff7d;',
            '  --site-navbar-shadow: 0 0 24px rgba(84,255,125,.35), inset 0 0 14px rgba(84,255,125,.1);',
            '  --site-hero-bg: linear-gradient(135deg, #041009, #0a2b18);',
            '  --site-footer-bg: #020805;',
            '  --site-code-bg: #020805;',
            '  --site-code-text: #72ff98;',
            '}',
            'body[data-site-style="terminal"]::before {',
            '  content: "";',
            '  position: fixed;',
            '  inset: 0;',
            '  pointer-events: none;',
            '  background: repeating-linear-gradient(',
            '      to bottom,',
            '      rgba(90,255,120,.05),',
            '      rgba(90,255,120,.05) 1px,',
            '      transparent 2px,',
            '      transparent 4px',
            '  );',
            '  z-index: 1;',
            '}',
            '',
            '@keyframes siteAuroraShift {',
            '  0% { background-position: 0% 50%; }',
            '  50% { background-position: 100% 50%; }',
            '  100% { background-position: 0% 50%; }',
            '}'
        ].join('\n');

        document.head.appendChild(style);
    }

    function removeLegacyNavbarThemeClasses(navbar) {
        if (!navbar) return;
        [
            'theme-cyberpunk',
            'theme-synthwave',
            'theme-holographic',
            'theme-plasma'
        ].forEach(function (cls) {
            navbar.classList.remove(cls);
        });
    }

    function getRandomStyleId(currentId) {
        var pool = STYLE_IDS.filter(function (id) { return id !== currentId; });
        return pool[Math.floor(Math.random() * pool.length)];
    }

    function initVisualStyleButton() {
        var navbar = document.querySelector('.navbar-neon');
        var themeBtn = document.getElementById('themeToggle');
        if (!themeBtn || !document.body) return;

        removeLegacyNavbarThemeClasses(navbar);

        var currentStyle = localStorage.getItem(STYLE_KEY);
        if (!currentStyle || STYLE_IDS.indexOf(currentStyle) === -1) {
            currentStyle = STYLE_IDS[0];
        }

        function applyStyle(styleId) {
            document.body.setAttribute('data-site-style', styleId);
            localStorage.setItem(STYLE_KEY, styleId);
            currentStyle = styleId;
            themeBtn.setAttribute('title', 'Estilo: ' + STYLE_LABELS[styleId] + ' (clic = aleatorio)');
        }

        themeBtn.addEventListener('click', function () {
            var randomStyle = getRandomStyleId(currentStyle);
            applyStyle(randomStyle);
        });

        applyStyle(currentStyle);
    }

    function normalizeNavRoute(route) {
        var clean = (route || '').replace(/^#/, '').trim();
        if (!clean) return '';
        return clean.split('/').pop().split('#')[0].split('?')[0];
    }

    function markActiveNavLink() {
        var path = normalizeNavRoute(window.location.pathname.split('/').pop() || 'index.html');
        var hashRoute = normalizeNavRoute(window.location.hash);
        var currentRoute = hashRoute || path;

        if (currentRoute === 'index.html' || currentRoute === 'home') {
            currentRoute = '';
        }

        var links = document.querySelectorAll('.nav-link-neon');
        links.forEach(function (link) {
            link.classList.remove('active');

            var href = (link.getAttribute('href') || '').trim();
            if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

            var route = normalizeNavRoute(href);
            if (!route || route === 'index.html' || route === 'home') return;
            if (route === currentRoute) link.classList.add('active');
        });
    }

    function syncActiveNavOnNavigation() {
        if (window.__siteNavSyncInstalled) return;
        window.__siteNavSyncInstalled = true;

        var originalPushState = history.pushState;
        history.pushState = function () {
            var result = originalPushState.apply(this, arguments);
            markActiveNavLink();
            return result;
        };

        var originalReplaceState = history.replaceState;
        history.replaceState = function () {
            var result = originalReplaceState.apply(this, arguments);
            markActiveNavLink();
            return result;
        };

        window.addEventListener('hashchange', markActiveNavLink);
        window.addEventListener('popstate', markActiveNavLink);
    }

    document.addEventListener('DOMContentLoaded', function () {
        injectGlobalStyleSheet();
        initVisualStyleButton();
        syncActiveNavOnNavigation();
        markActiveNavLink();
    });
})();
