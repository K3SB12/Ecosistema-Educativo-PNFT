// js/db.js - Versión 8
// Gestor centralizado de IndexedDB para PNFT Articulador
// Añadido: accommodation_types, campos extendidos en students, índices

const DB_NAME = 'PNFT_DB';
const DB_VERSION = 8;  // Aumentamos la versión para nuevas stores e índices

let db = null;

// Abre la base de datos y maneja la actualización
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
                'accommodation_types'      // NUEVA store
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
            
            // Añadir índices a la store 'students' si no existen (para búsquedas)
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

// Obtener todos los elementos de una store
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

// Obtener por clave
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

// Guardar (insertar o actualizar)
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

// Eliminar por clave
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

// Inicializar datos de ejemplo (solo si faltan)
export async function initDefaultData() {
    const centros = await getAll('centros_educativos');
    if (centros.length === 0) {
        await put('centros_educativos', {
            id: Date.now(),
            nombre: 'Escuela Tranquilino Sáenz Rojas',
            codigo: 'CE1',
            activo: true
        });
    }
    
    const years = await getAll('school_years');
    if (years.length === 0) {
        await put('school_years', {
            id: Date.now(),
            nombre: '2026',
            activo: true
        });
    }
    
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
    
    // ===== COMPONENTES ESTÁNDAR =====
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
    
    // ===== TIPOS DE ADECUACIÓN =====
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
