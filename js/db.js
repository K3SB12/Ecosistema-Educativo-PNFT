// js/db.js
const DB_NAME = 'PNFT_DB';
const DB_VERSION = 5;

let db = null;

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
            // Crear todos los stores necesarios si no existen
            
            // Store para centros educativos
            if (!db.objectStoreNames.contains('centros_educativos')) {
                db.createObjectStore('centros_educativos', { keyPath: 'id' });
            }
            // Store para años lectivos
            if (!db.objectStoreNames.contains('school_years')) {
                db.createObjectStore('school_years', { keyPath: 'id' });
            }
            // Store para períodos mejorados
            if (!db.objectStoreNames.contains('periods_enhanced')) {
                const periodsStore = db.createObjectStore('periods_enhanced', { keyPath: 'id' });
                periodsStore.createIndex('schoolYearId', 'schoolYearId', { unique: false });
            }
            // Store para componentes
            if (!db.objectStoreNames.contains('components')) {
                db.createObjectStore('components', { keyPath: 'id' });
            }
            // Store para grupos
            if (!db.objectStoreNames.contains('groups')) {
                db.createObjectStore('groups', { keyPath: 'id' });
            }
            // Store para estudiantes
            if (!db.objectStoreNames.contains('students')) {
                const studentsStore = db.createObjectStore('students', { keyPath: 'id' });
                studentsStore.createIndex('groupId', 'groupId', { unique: false });
            }
            // Store para asistencia
            if (!db.objectStoreNames.contains('attendance')) {
                const attendanceStore = db.createObjectStore('attendance', { keyPath: 'id' });
                attendanceStore.createIndex('groupId', 'groupId', { unique: false });
                attendanceStore.createIndex('date', 'date', { unique: false });
            }
            // Store para calificaciones
            if (!db.objectStoreNames.contains('grades')) {
                const gradesStore = db.createObjectStore('grades', { keyPath: 'id' });
                gradesStore.createIndex('groupId', 'groupId', { unique: false });
                gradesStore.createIndex('studentId', 'studentId', { unique: false });
            }
            // Store para configuración
            if (!db.objectStoreNames.contains('settings')) {
                db.createObjectStore('settings', { keyPath: 'key' });
            }
            // Store para indicadores de evaluación (puede que ya exista)
            if (!db.objectStoreNames.contains('evaluation_indicators')) {
                const indicatorsStore = db.createObjectStore('evaluation_indicators', { keyPath: 'id' });
                indicatorsStore.createIndex('groupId', 'groupId', { unique: false });
                indicatorsStore.createIndex('periodId', 'periodId', { unique: false });
            }
        };
    });
}

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

export async function clearStore(storeName) {
    if (!db) await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const req = store.clear();
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    });
}

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

export async function initDefaultData() {
    // Centros educativos
    const centros = await getAll('centros_educativos');
    if (centros.length === 0) {
        await put('centros_educativos', { id: 1001, nombre: 'Escuela Tranquilino Sáenz Rojas', codigo: 'CE1', activo: true });
        await put('centros_educativos', { id: 1002, nombre: 'Liceo de Costa Rica', codigo: 'CE2', activo: true });
    }
    // Años lectivos
    const years = await getAll('school_years');
    if (years.length === 0) {
        await put('school_years', { id: 2026, nombre: '2026', activo: true });
    }
    // Períodos
    const periods = await getAll('periods_enhanced');
    if (periods.length === 0) {
        await put('periods_enhanced', {
            id: 1,
            schoolYearId: 2026,
            nombre: 'I Semestre',
            tipo: 'semestre',
            fechaInicio: '2026-02-23',
            fechaFin: '2026-07-03',
            activo: true,
            porcentajeAnual: 50
        });
        await put('periods_enhanced', {
            id: 2,
            schoolYearId: 2026,
            nombre: 'II Semestre',
            tipo: 'semestre',
            fechaInicio: '2026-07-20',
            fechaFin: '2026-12-09',
            activo: true,
            porcentajeAnual: 50
        });
    }
}
