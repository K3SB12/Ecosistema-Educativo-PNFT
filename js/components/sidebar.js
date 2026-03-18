// js/components/sidebar.js
const Sidebar = {
    render: () => {
        return `
            <aside class="sidebar">
                <div class="sidebar-header">
                    <div class="logo">PNFT</div>
                    <h2>Articulador 2026</h2>
                    <p>MEP Costa Rica</p>
                </div>
                <ul class="nav-menu">
                    <a href="/" data-link><li class="nav-item active"><i class="fas fa-chart-pie"></i> Tablero</li></a>
                    <a href="/planning" data-link><li class="nav-item"><i class="fas fa-clipboard-list"></i> Planeamiento</li></a>
                    <a href="/evaluation" data-link><li class="nav-item"><i class="fas fa-check-circle"></i> Evaluación</li></a>
                    <a href="/logbook" data-link><li class="nav-item"><i class="fas fa-book-open"></i> Bitácora</li></a>
                    <a href="/students" data-link><li class="nav-item"><i class="fas fa-users"></i> Estudiantes</li></a>
                    <a href="/groups" data-link><li class="nav-item"><i class="fas fa-layer-group"></i> Grupos</li></a>
                    <a href="/settings" data-link><li class="nav-item"><i class="fas fa-cog"></i> Configuración</li></a>
                </ul>
            </aside>
        `;
    }
};
