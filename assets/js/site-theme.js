(function () {
    function initTheme() {
        var themes = ['rainbow', 'cyberpunk', 'synthwave', 'holographic', 'plasma'];
        var navbar = document.querySelector('.navbar-neon');
        var themeBtn = document.getElementById('themeToggle');
        if (!navbar || !themeBtn) return;

        var currentTheme = localStorage.getItem('navbarTheme') || 'rainbow';

        function applyTheme(theme) {
            navbar.className = 'navbar-neon navbar navbar-expand-lg sticky-top';
            if (theme !== 'rainbow') {
                navbar.classList.add('theme-' + theme);
            }
            localStorage.setItem('navbarTheme', theme);
            currentTheme = theme;
        }

        function nextTheme() {
            var currentIndex = themes.indexOf(currentTheme);
            var nextIndex = (currentIndex + 1) % themes.length;
            applyTheme(themes[nextIndex]);
        }

        themeBtn.addEventListener('click', nextTheme);
        applyTheme(currentTheme);
    }

    function markActiveNavLink() {
        var path = window.location.pathname.split('/').pop() || 'index.html';
        var links = document.querySelectorAll('.nav-link-neon');
        links.forEach(function (link) {
            var href = (link.getAttribute('href') || '').trim();
            if (!href || href.startsWith('http')) return;
            if (href === path) link.classList.add('active');
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initTheme();
        markActiveNavLink();
    });
})();
