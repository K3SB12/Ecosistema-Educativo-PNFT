// js/components/header.js
(function() {
    function renderHeader(pageTitle) {
        return `
            <div class="top-bar">
                <h1 class="page-title">${pageTitle}</h1>
                <div class="user-info">
                    <span class="user-badge">
                        <i class="fas fa-user-graduate"></i> Docente
                    </span>
                    <span class="user-badge">
                        <i class="fas fa-calendar-alt"></i> 2026
                    </span>
                </div>
            </div>
        `;
    }

    window.Header = {
        render: renderHeader
    };
})();
