// js/components/sidebar.js
(function() {
    function renderSidebar() {
        const menuItems = [
            { id: 'dashboard', icon: 'fa-chart-pie', label: 'Tablero' },
            { id: 'planning', icon: 'fa-clipboard-list', label: 'Planeamiento' },
            { id: 'evaluation', icon: 'fa-check-circle', label: 'Evaluación' },
            { id: 'logbook', icon: 'fa-book-open', label: 'Bitácora' },
            { id: 'students', icon: 'fa-users', label: 'Estudiantes' },
            { id: 'groups', icon: 'fa-layer-group', label: 'Grupos' },
            { id: 'settings', icon: 'fa-cog', label: 'Configuración' }
        ];

        let html = `
            <aside class="sidebar">
                <div class="sidebar-header">
                    <div class="logo">PNFT</div>
                    <h2>Articulador 2026</h2>
                    <p>Programa Nacional de Formación Tecnológica · MEP</p>
                </div>
                <ul class="nav-menu">
        `;

        menuItems.forEach(item => {
            html += `
                <li class="nav-item" data-page="${item.id}">
                    <i class="fas ${item.icon}"></i>
                    <span>${item.label}</span>
                </li>
            `;
        });

        html += `
                </ul>
                <div style="margin-top: auto; padding-top: 2rem;">
                    <div style="background: rgba(255,255,255,0.1); border-radius: 16px; padding: 1rem;">
                        <p style="font-size: 0.8rem; opacity: 0.8;"><i class="fas fa-database" style="margin-right: 0.5rem;"></i> Almacenamiento local</p>
                        <p style="font-size: 0.8rem; opacity: 0.8;"><i class="fas fa-shield-alt" style="margin-right: 0.5rem;"></i> 100% offline</p>
                    </div>
                </div>
            </aside>
        `;

        return html;
    }

    // Exponer la función globalmente
    window.Sidebar = {
        render: renderSidebar
    };
})();
