// app.js - Lógica principal y navegación

document.addEventListener('DOMContentLoaded', () => {
    // Navegación por sidebar
    const navItems = document.querySelectorAll('.sidebar li');
    const content = document.getElementById('content');

    // Cargar página según hash o por defecto dashboard
    function loadPageFromHash() {
        const hash = window.location.hash.substring(1) || 'dashboard';
        const targetItem = Array.from(navItems).find(li => li.dataset.page === hash);
        if (targetItem) {
            // Activar item en sidebar
            navItems.forEach(li => li.classList.remove('active'));
            targetItem.classList.add('active');
            // Cargar contenido
            fetchPage(hash);
        }
    }

    // Fetch de página HTML
    async function fetchPage(page) {
        try {
            const response = await fetch(`${page}.html`);
            if (!response.ok) throw new Error('Página no encontrada');
            const html = await response.text();
            content.innerHTML = html;
            // Ejecutar scripts específicos de la página si existen
            if (window[`init_${page}`]) {
                window[`init_${page}`]();
            }
        } catch (error) {
            content.innerHTML = `<div class="alert">Error cargando la página: ${error.message}</div>`;
        }
    }

    // Event listeners para navegación
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            window.location.hash = page;
            loadPageFromHash();
        });
    });

    // Escuchar cambios en el hash
    window.addEventListener('hashchange', loadPageFromHash);

    // Cargar página inicial
    loadPageFromHash();
});
