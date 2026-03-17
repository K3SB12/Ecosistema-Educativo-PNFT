// js/export.js
import { getAll } from './database.js';

export async function exportarWord(formId) {
    // Esta función toma los datos del formulario y genera un documento Word
    // usando docxtemplater. Requiere tener la plantilla en templates/
    // Por simplicidad, generamos un HTML y lo convertimos a .doc
    const form = document.getElementById(formId);
    if (!form) return;

    const data = new FormData(form);
    let html = `
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body { font-family: Arial; margin: 2cm; }
                h1 { color: #2E7D32; }
                table { border-collapse: collapse; width: 100%; }
                td, th { border: 1px solid #000; padding: 8px; }
            </style>
        </head>
        <body>
        <h1>Planeamiento Didáctico PNFT 2026</h1>
    `;
    // Convertir FormData a objeto
    const obj = {};
    data.forEach((value, key) => { obj[key] = value; });
    html += '<pre>' + JSON.stringify(obj, null, 2) + '</pre>';
    html += '</body></html>';

    const blob = new Blob([html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'planeamiento.doc';
    a.click();
    URL.revokeObjectURL(url);
}

export async function exportarPDF(formId) {
    // Usar jsPDF para generar PDF (versión simple)
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text('Planeamiento Didáctico PNFT 2026', 10, 10);
    // Aquí se puede recorrer el formulario y agregar texto
    const form = document.getElementById(formId);
    if (form) {
        const data = new FormData(form);
        let y = 20;
        data.forEach((value, key) => {
            doc.text(`${key}: ${value}`, 10, y);
            y += 10;
            if (y > 280) {
                doc.addPage();
                y = 20;
            }
        });
    }
    doc.save('planeamiento.pdf');
}

export async function exportarExcel(data, filename = 'calificaciones.xlsx') {
    // data debe ser un array de objetos
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Calificaciones');
    XLSX.writeFile(wb, filename);
}
