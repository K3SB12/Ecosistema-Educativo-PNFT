// js/router.js
class Router {
    constructor() {
        this.routes = {
            'dashboard': { render: () => window.Dashboard.render(), title: 'Tablero' },
            'planning': { render: () => window.Planning.render(), title: 'Planeamiento' },
            'evaluation': { render: () => window.Evaluation.render(), title: 'Evaluación' },
            'logbook': { render: () => window.Logbook.render(), title: 'Bitácora' },
            'students': { render: () => window.Students.render(), title: 'Estudiantes' },
            'groups': { render: () => window.Groups.render(), title: 'Grupos' },
            'settings': { render: () => window.Settings.render(), title: 'Configuración' }
        };

        this.container = document.getElementById('app');
        this.init();
    }

    init() {
        // Escuchar cambios en el hash
        window.addEventListener('hashchange', () => this.handleRoute());
        // Cargar la ruta inicial
        if (!window.location.hash) {
            window.location.hash = '#dashboard';
        } else {
            this.handleRoute();
        }
    }

    handleRoute() {
        const hash = window.location.hash.slice(1) || 'dashboard';
        const route = this.routes[hash];
        if (route) {
            this.renderPage(route.render(), hash, route.title);
        } else {
            // Ruta no encontrada, redirigir a dashboard
            window.location.hash = '#dashboard';
        }
    }

    renderPage(content, activePage, title) {
        // Construir la estructura completa: sidebar + main-content
        const html = `
            ${window.Sidebar.render()}
            <main class="main-content">
                ${window.Header.render(title)}
                <div id="page-content">${content}</div>
            </main>
        `;
        this.container.innerHTML = html;

        // Marcar el ítem activo en el menú
        const activeItem = document.querySelector(`.nav-item[data-page="${activePage}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }

        // Disparar evento personalizado para que las páginas puedan adjuntar listeners
        const event = new CustomEvent('page-loaded', { detail: { page: activePage } });
        document.dispatchEvent(event);
    }

    // Método para navegar programáticamente
    navigateTo(page) {
        window.location.hash = page;
    }
}

window.Router = Router;
