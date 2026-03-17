// js/app.js
import { iniciarBackupAutomatico } from './backup.js';

document.addEventListener('DOMContentLoaded', () => {
    // Iniciar backups automáticos si estamos en la página principal
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        iniciarBackupAutomatico();
    }

    // Marcar enlace activo en la navegación
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.style.backgroundColor = '#1976D2'; // azul MEP
            link.style.color = 'white';
        }
    });
});

// Función global para mostrar mensajes
window.mostrarMensaje = function(texto, tipo = 'info') {
    const div = document.createElement('div');
    div.textContent = texto;
    div.style.position = 'fixed';
    div.style.top = '10px';
    div.style.right = '10px';
    div.style.padding = '15px';
    div.style.backgroundColor = tipo === 'error' ? '#f44336' : '#4CAF50';
    div.style.color = 'white';
    div.style.borderRadius = '5px';
    div.style.zIndex = '1000';
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
};
