// export.js - Exportación a Word (plantilla oficial), PDF y Excel

// Exportar planeamiento a Word usando la plantilla
async function exportarPlaneamientoWord(planeamientoId) {
    try {
        // Obtener datos del planeamiento
        const planeamiento = await dbAPI.obtenerPorId('plannings', planeamientoId);
        if (!planeamiento) throw new Error('Planeamiento no encontrado');

        // Cargar la plantilla (debe estar en /templates/MEP_Plantilla_2026.docx)
        const response = await fetch('templates/MEP_Plantilla_2026.docx');
        const arrayBuffer = await response.arrayBuffer();
        
        // Usar PizZip y Docxtemplater para rellenar la plantilla
        const zip = new PizZip(arrayBuffer);
        const doc = new window.docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        // Preparar los datos para la plantilla
        const datos = {
            // Datos administrativos
            direccion_regional: planeamiento.direccionRegional || '',
            centro_educativo: planeamiento.centroEducativo || '',
            codigo: planeamiento.codigo || '',
            docente: planeamiento.docente || '',
            asignatura: 'Formación Tecnológica / Informática Educativa',
            curso_lectivo: planeamiento.cursoLectivo || '2026',
            ciclo: planeamiento.ciclo || '',
            nivel: planeamiento.nivel || '',
            lecciones: planeamiento.lecciones || '',
            mes_inicio: planeamiento.mesInicio || '',
            mes_final: planeamiento.mesFinal || '',
            periodicidad: planeamiento.periodicidad || '',
            
            // Ejes transversales (marcar con X)
            ciudadania_etica: planeamiento.ejes?.ciudadania ? 'X' : '',
            pensamiento_computacional: planeamiento.ejes?.pensamiento ? 'X' : '',
            emprendimiento: planeamiento.ejes?.emprendimiento ? 'X' : '',
            
            // Metodología activa
            abj: planeamiento.metodologia === 'ABJ' ? 'X' : '',
            abr: planeamiento.metodologia === 'ABR' ? 'X' : '',
            design_thinking: planeamiento.metodologia === 'Design Thinking' ? 'X' : '',
            
            // Áreas de conocimiento (con sus RdA)
            areas: planeamiento.areas || [],
            
            // Saberes (se generan tablas)
            saberes_conceptuales: planeamiento.saberesConceptuales || [],
            saberes_procedimentales: planeamiento.saberesProcedimentales || [],
            saberes_actitudinales: planeamiento.saberesActitudinales || [],
            
            // Tabla de 3 columnas
            tabla_planeamiento: planeamiento.tabla || [],
            
            // Reflexiones
            reflexiones: planeamiento.reflexiones || {
                funciono: '',
                no_funciono: '',
                mejorar: ''
            },
            observaciones: planeamiento.observaciones || ''
        };

        // Rellenar la plantilla
        doc.setData(datos);
        doc.render();

        // Generar el archivo Word
        const output = doc.getZip().generate({ type: 'blob' });
        const url = window.URL.createObjectURL(output);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Planeamiento_${planeamiento.nivel}_Mod${planeamiento.modulo}.docx`;
        a.click();
        window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error('Error al exportar a Word:', error);
        alert('Error al generar el documento Word. Asegúrate de que la plantilla existe en templates/');
    }
}

// Exportar planeamiento a PDF (usando jsPDF)
async function exportarPlaneamientoPDF(planeamientoId) {
    try {
        const planeamiento = await dbAPI.obtenerPorId('plannings', planeamientoId);
        if (!planeamiento) throw new Error('Planeamiento no encontrado');

        // Crear un elemento temporal para generar el PDF
        const elemento = document.createElement('div');
        elemento.innerHTML = `
            <h1 style="color:#2E7D32;">Planeamiento Didáctico - PNFT 2026</h1>
            <p><strong>Nivel:</strong> ${planeamiento.nivel} | <strong>Módulo:</strong> ${planeamiento.modulo}</p>
            <p><strong>Docente:</strong> ${planeamiento.docente || ''}</p>
            <h2>Indicadores de logro</h2>
            <ul>
                ${planeamiento.indicadores ? planeamiento.indicadores.map(i => `<li>${i}</li>`).join('') : ''}
            </ul>
            <h2>Estrategias de mediación</h2>
            <p>${planeamiento.estrategias?.inicio || ''}</p>
            <p>${planeamiento.estrategias?.desarrollo || ''}</p>
            <p>${planeamiento.estrategias?.cierre || ''}</p>
        `;

        // Usar html2canvas para capturar el elemento y convertirlo a PDF
        const canvas = await html2canvas(elemento);
        const imgData = canvas.toDataURL('image/png');
        
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`Planeamiento_${planeamiento.nivel}_Mod${planeamiento.modulo}.pdf`);

    } catch (error) {
        console.error('Error al exportar a PDF:', error);
        alert('Error al generar el PDF');
    }
}

// Exportar calificaciones a Excel
async function exportarCalificacionesExcel(evaluacionId) {
    try {
        const evaluacion = await dbAPI.obtenerPorId('evaluations', evaluacionId);
        if (!evaluacion) throw new Error('Evaluación no encontrada');

        // Obtener estudiantes del grupo
        const estudiantes = await dbAPI.obtenerEstudiantes();
        const estudiantesGrupo = estudiantes.filter(e => e.groupId === evaluacion.groupId);

        // Construir datos para Excel
        const datos = [];
        datos.push(['Cédula', 'Nombre', 'Trabajo Cotidiano', 'Tareas', 'Pruebas', 'Proyecto', 'Asistencia', 'Nota Final']);
        
        evaluacion.calificaciones.forEach(cal => {
            const estudiante = estudiantesGrupo.find(e => e.id === cal.studentId);
            datos.push([
                estudiante?.cedula || '',
                estudiante?.nombre || '',
                cal.cotidiano,
                cal.tareas,
                cal.pruebas,
                cal.proyecto,
                cal.asistencia,
                cal.final
            ]);
        });

        // Crear hoja de cálculo
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(datos);
        XLSX.utils.book_append_sheet(wb, ws, 'Calificaciones');
        
        // Aplicar formato (opcional)
        ws['!cols'] = [{ wch: 15 }, { wch: 30 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }];
        
        // Exportar
        XLSX.writeFile(wb, `Calificaciones_${evaluacion.groupName || 'grupo'}_P${evaluacion.periodo}.xlsx`);

    } catch (error) {
        console.error('Error al exportar a Excel:', error);
        alert('Error al generar el archivo Excel');
    }
}

// Exponer funciones globalmente
window.exportAPI = {
    planeamientoWord: exportarPlaneamientoWord,
    planeamientoPDF: exportarPlaneamientoPDF,
    calificacionesExcel: exportarCalificacionesExcel
};
