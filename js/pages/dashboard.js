// js/pages/dashboard.js
(function() {
    function render() {
        return `
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-clipboard-list"></i></div>
                    <div class="stat-content">
                        <h3>Planeamientos</h3>
                        <span class="number">0</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-check-circle"></i></div>
                    <div class="stat-content">
                        <h3>Evaluaciones</h3>
                        <span class="number">0</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-book-open"></i></div>
                    <div class="stat-content">
                        <h3>Bitácoras</h3>
                        <span class="number">0</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-users"></i></div>
                    <div class="stat-content">
                        <h3>Estudiantes</h3>
                        <span class="number">0</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-layer-group"></i></div>
                    <div class="stat-content">
                        <h3>Grupos</h3>
                        <span class="number">0</span>
                    </div>
                </div>
            </div>

            <div class="recent-section">
                <div class="section-header">
                    <h2><i class="fas fa-history" style="margin-right: 0.5rem; color: #2E7D32;"></i> Últimos planeamientos</h2>
                    <a data-page="planning">Ver todos <i class="fas fa-arrow-right"></i></a>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Nivel</th>
                            <th>Módulo</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody id="recentPlannings">
                        <tr>
                            <td colspan="3" class="empty-table">Aún no hay planeamientos guardados</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="recent-section">
                <div class="section-header">
                    <h2><i class="fas fa-bolt" style="margin-right: 0.5rem; color: #2E7D32;"></i> Acciones rápidas</h2>
                </div>
                <div class="quick-actions">
                    <div class="action-btn" data-page="planning">
                        <i class="fas fa-plus-circle"></i>
                        <span>Nuevo planeamiento</span>
                    </div>
                    <div class="action-btn" data-page="evaluation">
                        <i class="fas fa-chart-line"></i>
                        <span>Registrar evaluación</span>
                    </div>
                    <div class="action-btn" data-page="logbook">
                        <i class="fas fa-pen-alt"></i>
                        <span>Añadir bitácora</span>
                    </div>
                    <div class="action-btn" data-page="students">
                        <i class="fas fa-user-plus"></i>
                        <span>Gestionar estudiantes</span>
                    </div>
                    <div class="action-btn" data-page="settings">
                        <i class="fas fa-sliders-h"></i>
                        <span>Configuración</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Exponer la función
    window.Dashboard = { render };
})();
