// js/router.js
const Router = {
    init: () => {
        // Escuchar clics en enlaces internos
        document.addEventListener('click', e => {
            const link = e.target.closest('a');
            if (!link) return;
            const href = link.getAttribute('href');
            if (href && href.startsWith('/')) {
                e.preventDefault();
                Router.go(href);
            }
        });

        // Escuchar cambios en el historial
        window.addEventListener('popstate', () => {
            Router.go(window.location.pathname, false);
        });

        // Cargar la ruta inicial
        Router.go(window.location.pathname);
    },

    go: (path, addToHistory = true) => {
        if (addToHistory) {
            history.pushState(null, '', path);
        }
        Router.render(path);
    },

    render: (path) => {
        const main = document.querySelector('main');
        if (!main) return;

        // Por ahora, solo mostramos el dashboard
        if (path === '/' || path === '/index.html') {
            main.innerHTML = '<h1>Tablero</h1><p>Contenido del tablero aquí</p>';
        } else {
            main.innerHTML = '<h1>404</h1><p>Página no encontrada</p>';
        }
    }
};

// Iniciar el router cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => Router.init());
