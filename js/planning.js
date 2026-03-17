// js/planning.js
import { openDB, addItem, getAll, getByIndex } from './database.js';
import { CURRICULO, PRACTICAS_PENSADOR_COMPUTACIONAL, ACTITUDES_PENSADOR_COMPUTACIONAL, PROYECTO_ETAPAS, getNiveles, getModulo } from './curriculum.js';
import { generarPrompt } from './prompt.js';
import { exportarWord, exportarPDF } from './export.js';

// Variables globales del formulario
let currentModuloData = null;

document.addEventListener('DOMContentLoaded', () => {
    cargarNivelesPorCiclo();
    cargarPracticasYActitudes();
    cargarPlaneamientosGuardados();

    // Eventos
    document.getElementById('ciclo').addEventListener('change', cargarNivelesPorCiclo);
    document.getElementById('nivel').addEventListener('change', cargarModulos);
    document.getElementById('modulo').addEventListener('change', cargarAreasYSaberes);
    document.getElementById('generarPromptBtn').addEventListener('click', generarPromptHandler);
    document.getElementById('copiarPromptBtn').addEventListener('click', copiarPrompt);
    document.getElementById('planningForm').addEventListener('submit', guardarPlaneamiento);
    document.getElementById('exportWordBtn').addEventListener('click', exportarWordHandler);
    document.getElementById('exportPDFBtn').addEventListener('click', exportarPDFHandler);
});

function cargarNivelesPorCiclo() {
    const ciclo = document.getElementById('ciclo').value;
    const nivelSelect = document.getElementById('nivel');
    nivelSelect.innerHTML = '<option value="">Seleccione nivel</option>';
    if (!ciclo) return;

    const niveles = getNiveles().filter(n => n.ciclo === ciclo);
    niveles.forEach(n => {
        const option = document.createElement('option');
        option.value = n.nivel;
        option.textContent = n.nivel;
        nivelSelect.appendChild(option);
    });
}

function cargarModulos() {
    const ciclo = document.getElementById('ciclo').value;
    const nivel = document.getElementById('nivel').value;
    const moduloSelect = document.getElementById('modulo');
    moduloSelect.innerHTML = '<option value="">Seleccione módulo</option>';
    if (!ciclo || !nivel) return;

    // Por ahora módulos 1 y 2 fijos (según currículo)
    [1, 2].forEach(mod => {
        const option = document.createElement('option');
        option.value = mod;
        option.textContent = `Módulo ${mod}`;
        moduloSelect.appendChild(option);
    });
}

function cargarAreasYSaberes() {
    const ciclo = document.getElementById('ciclo').value;
    const nivel = document.getElementById('nivel').value;
    const modulo = parseInt(document.getElementById('modulo').value);
    if (!ciclo || !nivel || !modulo) return;

    currentModuloData = getModulo(ciclo, nivel, modulo);
    if (!currentModuloData) {
        alert('No se encontraron datos para este módulo');
        return;
    }

    // Mostrar áreas y saberes conceptuales
    const areasContainer = document.getElementById('areasContainer');
    areasContainer.innerHTML = '';
    currentModuloData.areas.forEach(area => {
        const div = document.createElement('div');
        div.innerHTML = `<strong>${area.areaId}</strong><br>`;
        // Mostrar RDA
        div.innerHTML += `<p><em>${area.rda}</em></p>`;
        areasContainer.appendChild(div);
    });

    // Saberes conceptuales (checkboxes)
    const saberesContainer = document.getElementById('saberesConceptualesContainer');
    saberesContainer.innerHTML = '';
    currentModuloData.areas.forEach(area => {
        area.saberesConceptuales.forEach(saber => {
            const label = document.createElement('label');
            label.innerHTML = `<input type="checkbox" class="saberConceptual" data-area="${area.areaId}" data-concepto="${saber.concepto}" data-indicador="${saber.indicadorLogro}"> ${saber.concepto} - ${saber.indicadorLogro.substring(0, 50)}...`;
            saberesContainer.appendChild(label);
            saberesContainer.appendChild(document.createElement('br'));
        });
    });

    // Actualizar tabla de 3 columnas con los saberes seleccionados
    document.querySelectorAll('.saberConceptual').forEach(cb => {
        cb.addEventListener('change', actualizarTabla3Columnas);
    });
}

function cargarPracticasYActitudes() {
    const practicasContainer = document.getElementById('practicasContainer');
    PRACTICAS_PENSADOR_COMPUTACIONAL.forEach(p => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" name="practica" value="${p.id}"> ${p.nombre}`;
        practicasContainer.appendChild(label);
        practicasContainer.appendChild(document.createElement('br'));
    });

    const actitudesContainer = document.getElementById('actitudesContainer');
    ACTITUDES_PENSADOR_COMPUTACIONAL.forEach(a => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" name="actitud" value="${a.id}"> ${a.nombre}`;
        actitudesContainer.appendChild(label);
        actitudesContainer.appendChild(document.createElement('br'));
    });
}

function actualizarTabla3Columnas() {
    const seleccionados = Array.from(document.querySelectorAll('.saberConceptual:checked')).map(cb => {
        return {
            area: cb.dataset.area,
            concepto: cb.dataset.concepto,
            indicadorLogro: cb.dataset.indicador
        };
    });

    const tablaContainer = document.getElementById('tabla3Columnas');
    tablaContainer.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Indicadores de Logro</th>
                    <th>Estrategias de Mediación</th>
                    <th>Indicadores de Evaluación</th>
                </tr>
            </thead>
            <tbody id="tablaBody">
            </tbody>
        </table>
    `;
    const tbody = document.getElementById('tablaBody');
    seleccionados.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><textarea data-index="${index}" class="indicadorLogro" rows="2">${item.indicadorLogro}</textarea></td>
            <td><textarea data-index="${index}" class="estrategia" rows="2" placeholder="Escriba la estrategia..."></textarea></td>
            <td><textarea data-index="${index}" class="indicadorEvaluacion" rows="2" placeholder="Acción + Contenido + Condición"></textarea></td>
        `;
        tbody.appendChild(tr);
    });
}

function generarPromptHandler() {
    const ciclo = document.getElementById('ciclo').value;
    const nivel = document.getElementById('nivel').value;
    const modulo = document.getElementById('modulo').value;
    const metodologia = document.querySelector('input[name="metodologia"]:checked')?.value || 'No especificada';

    // Saberes conceptuales seleccionados
    const saberesConceptuales = Array.from(document.querySelectorAll('.saberConceptual:checked')).map(cb => ({
        concepto: cb.dataset.concepto,
        indicador: cb.dataset.indicador
    }));

    // Prácticas seleccionadas
    const practicas = Array.from(document.querySelectorAll('input[name="practica"]:checked')).map(cb => cb.value);

    // Actitudes seleccionadas
    const actitudes = Array.from(document.querySelectorAll('input[name="actitud"]:checked')).map(cb => cb.value);

    const prompt = generarPrompt({
        ciclo, nivel, modulo, metodologia,
        saberesConceptuales, practicas, actitudes
    });

    document.getElementById('promptGenerado').value = prompt;
}

function copiarPrompt() {
    const prompt = document.getElementById('promptGenerado');
    prompt.select();
    document.execCommand('copy');
    alert('Prompt copiado al portapapeles');
}

async function guardarPlaneamiento(e) {
    e.preventDefault();
    // Recoger todos los datos del formulario
    const planeamiento = {
        direccionRegional: document.getElementById('direccionRegional').value,
        centroEducativo: document.getElementById('centroEducativo').value,
        codigo: document.getElementById('codigo').value,
        docente: document.getElementById('docente').value,
        asignatura: document.getElementById('asignatura').value,
        cursoLectivo: parseInt(document.getElementById('cursoLectivo').value),
        ciclo: document.getElementById('ciclo').value,
        nivel: document.getElementById('nivel').value,
        modulo: parseInt(document.getElementById('modulo').value),
        lecciones: parseInt(document.getElementById('lecciones').value),
        mesInicio: document.getElementById('mesInicio').value,
        mesFinal: document.getElementById('mesFinal').value,
        periodicidad: document.getElementById('periodicidad').value,
        ejes: {
            ciudadania: document.getElementById('ejeCiudadania').checked,
            pensamiento: document.getElementById('ejePensamiento').checked,
            emprendimiento: document.getElementById('ejeEmprendimiento').checked
        },
        metodologia: document.querySelector('input[name="metodologia"]:checked')?.value,
        saberesConceptuales: Array.from(document.querySelectorAll('.saberConceptual:checked')).map(cb => ({
            area: cb.dataset.area,
            concepto: cb.dataset.concepto,
            indicadorLogro: cb.dataset.indicador
        })),
        practicas: Array.from(document.querySelectorAll('input[name="practica"]:checked')).map(cb => cb.value),
        actitudes: Array.from(document.querySelectorAll('input[name="actitud"]:checked')).map(cb => cb.value),
        tabla: [],
        reflexiones: {
            queFunciono: document.getElementById('queFunciono').value,
            queNoFunciono: document.getElementById('queNoFunciono').value,
            queMejorar: document.getElementById('queMejorar').value,
            aprendizajesPendientes: document.getElementById('aprendizajesPendientes').value
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    // Recoger datos de la tabla
    const filas = document.querySelectorAll('#tablaBody tr');
    filas.forEach((fila, index) => {
        planeamiento.tabla.push({
            indicadorLogro: fila.querySelector('.indicadorLogro').value,
            estrategia: fila.querySelector('.estrategia').value,
            indicadorEvaluacion: fila.querySelector('.indicadorEvaluacion').value
        });
    });

    try {
        const id = await addItem('plannings', planeamiento);
        alert(`Planeamiento guardado con ID: ${id}`);
        cargarPlaneamientosGuardados();
        document.getElementById('planningForm').reset();
    } catch (error) {
        alert('Error al guardar: ' + error.message);
    }
}

async function cargarPlaneamientosGuardados() {
    const lista = document.getElementById('listaPlaneamientos');
    try {
        const plannings = await getAll('plannings');
        if (plannings.length === 0) {
            lista.innerHTML = '<p>No hay planeamientos guardados.</p>';
            return;
        }
        let html = '<ul>';
        plannings.forEach(p => {
            html += `<li>${p.cursoLectivo} - ${p.nivel} - ${p.docente} 
                <button onclick="cargarPlaneamiento(${p.id})">Cargar</button>
                <button onclick="eliminarPlaneamiento(${p.id})">Eliminar</button>
            </li>`;
        });
        html += '</ul>';
        lista.innerHTML = html;
    } catch (error) {
        console.error(error);
    }
}

// Funciones globales para botones
window.cargarPlaneamiento = async function(id) {
    // Implementar carga de planeamiento existente (llenar formulario)
    alert('Función cargar planeamiento pendiente');
};

window.eliminarPlaneamiento = async function(id) {
    if (confirm('¿Está seguro de eliminar este planeamiento?')) {
        // Implementar eliminación
        alert('Eliminar pendiente');
    }
};

function exportarWordHandler() {
    // Obtener datos del formulario y generar Word
    exportarWord('planningForm');
}

function exportarPDFHandler() {
    exportarPDF('planningForm');
}
