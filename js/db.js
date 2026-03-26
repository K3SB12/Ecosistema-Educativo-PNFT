// js/db.js - Versión 8 (estable)
// Gestor centralizado de IndexedDB para PNFT Articulador

const DB_NAME = 'PNFT_DB';
const DB_VERSION = 8;

let db = null;

// ==================== APERTURA Y MIGRACIÓN ====================
export async function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            db = request.result;
            resolve(db);
        };
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            console.log('Actualizando base de datos a versión', DB_VERSION);

            // Lista de stores que deben existir
            const stores = [
                'plannings',
                'profile',
                'groups',
                'periods',
                'evaluation_indicators',
                'centros_educativos',
                'school_years',
                'periods_enhanced',
                'components',
                'settings',
                'students',
                'attendance',
                'grades',
                'subjects',
                'schedules',
                'daily_work_indicators',
                'evaluations',
                'bitacoras',
                'conducta',
                'alertas',
                'accommodation_types'
            ];

            // Crear cada store si no existe
            for (let storeName of stores) {
                if (!db.objectStoreNames.contains(storeName)) {
                    console.log(`Creando store: ${storeName}`);

                    if (storeName === 'evaluation_indicators') {
                        const store = db.createObjectStore(storeName, { keyPath: 'id' });
                        store.createIndex('groupId', 'groupId', { unique: false });
                        store.createIndex('periodId', 'periodId', { unique: false });
                    }
                    else if (storeName === 'periods_enhanced') {
                        const store = db.createObjectStore(storeName, { keyPath: 'id' });
                        store.createIndex('schoolYearId', 'schoolYearId', { unique: false });
                    }
                    else if (storeName === 'subjects') {
                        const store = db.createObjectStore(storeName, { keyPath: 'id' });
                        store.createIndex('groupId', 'groupId', { unique: false });
                        store.createIndex('componentId', 'componentId', { unique: false });
                        store.createIndex('institutionId', 'institutionId', { unique: false });
                    }
                    else if (storeName === 'schedules') {
                        const store = db.createObjectStore(storeName, { keyPath: 'id' });
                        store.createIndex('groupId', 'groupId', { unique: false });
                    }
                    else if (storeName === 'daily_work_indicators') {
                        const store = db.createObjectStore(storeName, { keyPath: 'id' });
                        store.createIndex('groupId', 'groupId', { unique: false });
                        store.createIndex('periodId', 'periodId', { unique: false });
                    }
                    else if (storeName === 'evaluations') {
                        const store = db.createObjectStore(storeName, { keyPath: 'id' });
                        store.createIndex('groupId', 'groupId', { unique: false });
                        store.createIndex('periodId', 'periodId', { unique: false });
                        store.createIndex('type', 'type', { unique: false });
                    }
                    else if (storeName === 'bitacoras') {
                        const store = db.createObjectStore(storeName, { keyPath: 'id' });
                        store.createIndex('groupId', 'groupId', { unique: false });
                        store.createIndex('studentId', 'studentId', { unique: false });
                        store.createIndex('date', 'date', { unique: false });
                    }
                    else if (storeName === 'conducta') {
                        const store = db.createObjectStore(storeName, { keyPath: 'id' });
                        store.createIndex('groupId', 'groupId', { unique: false });
                        store.createIndex('studentId', 'studentId', { unique: false });
                        store.createIndex('periodId', 'periodId', { unique: false });
                    }
                    else if (storeName === 'alertas') {
                        const store = db.createObjectStore(storeName, { keyPath: 'id' });
                        store.createIndex('groupId', 'groupId', { unique: false });
                        store.createIndex('studentId', 'studentId', { unique: false });
                        store.createIndex('status', 'status', { unique: false });
                    }
                    else if (storeName === 'accommodation_types') {
                        const store = db.createObjectStore(storeName, { keyPath: 'id' });
                    }
                    else {
                        db.createObjectStore(storeName, { keyPath: 'id' });
                    }
                }
            }

            // Añadir índices adicionales a stores existentes (si no los tienen)
            if (db.objectStoreNames.contains('students')) {
                const studentStore = event.target.transaction.objectStore('students');
                if (!studentStore.indexNames.contains('id_number')) {
                    studentStore.createIndex('id_number', 'id_number', { unique: false });
                }
                if (!studentStore.indexNames.contains('mep_email')) {
                    studentStore.createIndex('mep_email', 'mep_email', { unique: false });
                }
                if (!studentStore.indexNames.contains('accommodation_type_id')) {
                    studentStore.createIndex('accommodation_type_id', 'accommodation_type_id', { unique: false });
                }
            }
        };
    });
}

// ==================== OPERACIONES BÁSICAS ====================
export async function getAll(storeName) {
    if (!db) await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error);
    });
}

export async function getById(storeName, id) {
    if (!db) await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const req = store.get(id);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

export async function put(storeName, item) {
    if (!db) await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const req = store.put(item);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    });
}

export async function remove(storeName, id) {
    if (!db) await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const req = store.delete(id);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    });
}

// Obtener períodos por año
export async function getPeriodsByYear(schoolYearId) {
    if (!db) await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(['periods_enhanced'], 'readonly');
        const store = tx.objectStore('periods_enhanced');
        const index = store.index('schoolYearId');
        const req = index.getAll(schoolYearId);
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error);
    });
}

// ==================== INICIALIZACIÓN DE DATOS DE EJEMPLO ====================
export async function initDefaultData() {
    // Centros educativos
    const centros = await getAll('centros_educativos');
    if (centros.length === 0) {
        await put('centros_educativos', {
            id: Date.now(),
            nombre: 'Escuela Tranquilino Sáenz Rojas',
            codigo: 'CE1',
            activo: true
        });
    }

    // Años lectivos
    const years = await getAll('school_years');
    if (years.length === 0) {
        await put('school_years', {
            id: Date.now(),
            nombre: '2026',
            activo: true
        });
    }

    // Períodos
    const periodos = await getAll('periods_enhanced');
    if (periodos.length === 0) {
        const year2026 = (await getAll('school_years')).find(y => y.nombre === '2026');
        if (year2026) {
            await put('periods_enhanced', {
                id: Date.now(),
                schoolYearId: year2026.id,
                nombre: 'I Semestre',
                tipo: 'semestre',
                fechaInicio: '2026-02-23',
                fechaFin: '2026-07-03',
                activo: true,
                porcentajeAnual: 50
            });
            await put('periods_enhanced', {
                id: Date.now() + 1,
                schoolYearId: year2026.id,
                nombre: 'II Semestre',
                tipo: 'semestre',
                fechaInicio: '2026-07-20',
                fechaFin: '2026-12-09',
                activo: true,
                porcentajeAnual: 50
            });
        }
    }

    // Componentes de evaluación estándar
    const componentes = await getAll('components');
    if (componentes.length === 0) {
        const standardComponents = [
            {
                id: Date.now(),
                nombre: 'I Ciclo',
                subcomponentes: [
                    { nombre: 'Trabajo cotidiano', porcentaje: 65 },
                    { nombre: 'Tareas', porcentaje: 10 },
                    { nombre: 'Prueba de ejecución', porcentaje: 15 },
                    { nombre: 'Asistencia', porcentaje: 10 }
                ]
            },
            {
                id: Date.now() + 1,
                nombre: 'II Ciclo',
                subcomponentes: [
                    { nombre: 'Trabajo cotidiano', porcentaje: 60 },
                    { nombre: 'Tareas', porcentaje: 10 },
                    { nombre: 'Prueba de ejecución', porcentaje: 20 },
                    { nombre: 'Asistencia', porcentaje: 10 }
                ]
            },
            {
                id: Date.now() + 2,
                nombre: 'III Ciclo',
                subcomponentes: [
                    { nombre: 'Trabajo cotidiano', porcentaje: 50 },
                    { nombre: 'Tareas', porcentaje: 10 },
                    { nombre: 'Proyecto', porcentaje: 30 },
                    { nombre: 'Asistencia', porcentaje: 10 },
                    { nombre: 'Portafolio', porcentaje: 0 }
                ]
            },
            {
                id: Date.now() + 3,
                nombre: 'Diversificada',
                subcomponentes: [
                    { nombre: 'Trabajo cotidiano', porcentaje: 50 },
                    { nombre: 'Tareas', porcentaje: 5 },
                    { nombre: 'Proyecto', porcentaje: 35 },
                    { nombre: 'Asistencia', porcentaje: 10 },
                    { nombre: 'Portafolio', porcentaje: 0 }
                ]
            },
            {
                id: Date.now() + 4,
                nombre: 'Educación Adultos',
                subcomponentes: [
                    { nombre: 'Trabajo cotidiano', porcentaje: 50 },
                    { nombre: 'Tareas', porcentaje: 10 },
                    { nombre: 'Proyecto', porcentaje: 30 },
                    { nombre: 'Asistencia', porcentaje: 10 },
                    { nombre: 'Portafolio', porcentaje: 0 }
                ]
            },
            {
                id: Date.now() + 5,
                nombre: 'Educación Especial',
                subcomponentes: [
                    { nombre: 'Trabajo cotidiano', porcentaje: 60 },
                    { nombre: 'Tareas', porcentaje: 10 },
                    { nombre: 'Proyecto', porcentaje: 20 },
                    { nombre: 'Asistencia', porcentaje: 10 },
                    { nombre: 'Portafolio', porcentaje: 0 }
                ]
            }
        ];
        for (let comp of standardComponents) {
            await put('components', comp);
        }
        console.log('Componentes estándar creados');
    }

    // Tipos de adecuación
    const accommodationTypes = await getAll('accommodation_types');
    if (accommodationTypes.length === 0) {
        const defaultTypes = [
            { id: 1, name: 'No presenta' },
            { id: 2, name: 'Adecuación curricular' },
            { id: 3, name: 'Adecuación significativa' },
            { id: 4, name: 'Adecuación no significativa' }
        ];
        for (let type of defaultTypes) {
            await put('accommodation_types', type);
        }
        console.log('Tipos de adecuación creados');
    }
}

// ==================== FUNCIONES DE CÁLCULO DE NOTAS ====================
/**
 * Obtiene el promedio de un estudiante en un subcomponente específico para un período dado.
 */
export async function getSubcomponentAverage(studentId, periodId, groupId, subcomponentId) {
    const allGrades = await getAll('grades');
    const relevant = allGrades.filter(g =>
        g.studentId === studentId &&
        g.periodId === periodId &&
        g.groupId === groupId &&
        g.subcomponentId === subcomponentId
    );
    if (relevant.length === 0) return null;
    const sum = relevant.reduce((acc, g) => acc + (g.value || 0), 0);
    return sum / relevant.length;
}

/**
 * Obtiene el componente de evaluación de una asignatura.
 */
export async function getSubjectComponent(subjectId) {
    const subject = await getById('subjects', subjectId);
    if (!subject || !subject.componentId) return null;
    return await getById('components', subject.componentId);
}

/**
 * Calcula la nota final de un período para una asignatura específica.
 */
export async function calculatePeriodGrade(studentId, periodId, groupId, subjectId, decimals = 2) {
    const component = await getSubjectComponent(subjectId);
    if (!component || !component.subcomponentes) return null;

    const weights = { daily_work: 0, task: 0, test: 0, attendance: 0, project: 0, portfolio: 0 };
    for (let sub of component.subcomponentes) {
        const name = sub.nombre.toLowerCase();
        if (name.includes('trabajo cotidiano')) weights.daily_work = sub.porcentaje;
        else if (name.includes('tarea')) weights.task = sub.porcentaje;
        else if (name.includes('prueba')) weights.test = sub.porcentaje;
        else if (name.includes('asistencia')) weights.attendance = sub.porcentaje;
        else if (name.includes('proyecto')) weights.project = sub.porcentaje;
        else if (name.includes('portafolio')) weights.portfolio = sub.porcentaje;
    }

    const dailyAvg = await getSubcomponentAverage(studentId, periodId, groupId, 'daily_work');
    const taskAvg = await getSubcomponentAverage(studentId, periodId, groupId, 'task');
    const testAvg = await getSubcomponentAverage(studentId, periodId, groupId, 'test');
    const attendanceAvg = await getSubcomponentAverage(studentId, periodId, groupId, 'attendance');
    const projectAvg = await getSubcomponentAverage(studentId, periodId, groupId, 'project');
    const portfolioAvg = await getSubcomponentAverage(studentId, periodId, groupId, 'portfolio');

    let totalWeight = 0;
    let weightedSum = 0;

    if (weights.daily_work > 0 && dailyAvg !== null) {
        weightedSum += dailyAvg * weights.daily_work;
        totalWeight += weights.daily_work;
    }
    if (weights.task > 0 && taskAvg !== null) {
        weightedSum += taskAvg * weights.task;
        totalWeight += weights.task;
    }
    if (weights.test > 0 && testAvg !== null) {
        weightedSum += testAvg * weights.test;
        totalWeight += weights.test;
    }
    if (weights.attendance > 0 && attendanceAvg !== null) {
        weightedSum += attendanceAvg * weights.attendance;
        totalWeight += weights.attendance;
    }
    if (weights.project > 0 && projectAvg !== null) {
        weightedSum += projectAvg * weights.project;
        totalWeight += weights.project;
    }
    if (weights.portfolio > 0 && portfolioAvg !== null) {
        weightedSum += portfolioAvg * weights.portfolio;
        totalWeight += weights.portfolio;
    }

    if (totalWeight === 0) return null;
    const raw = weightedSum / totalWeight;
    return roundGrade(raw, decimals);
}

/**
 * Calcula la nota anual de un estudiante para una asignatura.
 */
export async function calculateAnnualGrade(studentId, groupId, subjectId, decimals = 2) {
    const group = await getById('groups', groupId);
    if (!group) return null;

    const allPeriods = await getAll('periods_enhanced');
    const yearPeriods = allPeriods.filter(p => p.schoolYearId === group.anioId);
    if (yearPeriods.length === 0) return null;

    const periodPercentages = group.periodosPorcentajes || {};
    let totalWeight = 0;
    let weightedSum = 0;

    for (let period of yearPeriods) {
        let peso = periodPercentages[period.id] || 0;
        if (peso === 0) {
            // Si no se definió peso, repartir equitativamente entre los períodos existentes
            peso = 100 / yearPeriods.length;
        }
        if (peso === 0) continue;

        const periodGrade = await calculatePeriodGrade(studentId, period.id, groupId, subjectId, decimals);
        if (periodGrade !== null) {
            weightedSum += periodGrade * peso;
            totalWeight += peso;
        }
    }

    if (totalWeight === 0) return null;
    const raw = weightedSum / totalWeight;
    return roundGrade(raw, decimals);
}

/**
 * Redondea una nota al número de decimales especificado.
 */
export function roundGrade(value, decimals = 2) {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}

/**
 * Devuelve los detalles de cada subcomponente para un período y asignatura.
 */
export async function getPeriodGradeDetails(studentId, periodId, groupId, subjectId) {
    const component = await getSubjectComponent(subjectId);
    if (!component || !component.subcomponentes) return null;

    const weights = {};
    for (let sub of component.subcomponentes) {
        const name = sub.nombre.toLowerCase();
        if (name.includes('trabajo cotidiano')) weights.daily_work = sub.porcentaje;
        else if (name.includes('tarea')) weights.task = sub.porcentaje;
        else if (name.includes('prueba')) weights.test = sub.porcentaje;
        else if (name.includes('asistencia')) weights.attendance = sub.porcentaje;
        else if (name.includes('proyecto')) weights.project = sub.porcentaje;
        else if (name.includes('portafolio')) weights.portfolio = sub.porcentaje;
    }

    const dailyAvg = await getSubcomponentAverage(studentId, periodId, groupId, 'daily_work');
    const taskAvg = await getSubcomponentAverage(studentId, periodId, groupId, 'task');
    const testAvg = await getSubcomponentAverage(studentId, periodId, groupId, 'test');
    const attendanceAvg = await getSubcomponentAverage(studentId, periodId, groupId, 'attendance');
    const projectAvg = await getSubcomponentAverage(studentId, periodId, groupId, 'project');
    const portfolioAvg = await getSubcomponentAverage(studentId, periodId, groupId, 'portfolio');

    return {
        daily_work: { value: dailyAvg, weight: weights.daily_work || 0 },
        task: { value: taskAvg, weight: weights.task || 0 },
        test: { value: testAvg, weight: weights.test || 0 },
        attendance: { value: attendanceAvg, weight: weights.attendance || 0 },
        project: { value: projectAvg, weight: weights.project || 0 },
        portfolio: { value: portfolioAvg, weight: weights.portfolio || 0 }
    };
}
