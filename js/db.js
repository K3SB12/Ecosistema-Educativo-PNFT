// js/db.js
// Gestor centralizado de IndexedDB para PNFT Articulador

const DB_NAME = 'PNFT_DB';
const DB_VERSION = 5;

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
            
            // Stores existentes (no se tocan si ya existen)
            if (!db.objectStoreNames.contains('plannings')) {
                db.createObjectStore('plannings', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('profile')) {
                db.createObjectStore('profile', { keyPath: 'key' });
            }
            if (!db.objectStoreNames.contains('groups')) {
                // Este es el store que faltaba
                db.createObjectStore('groups', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('periods')) {
                db.createObjectStore('periods', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('evaluation_indicators')) {
                const store = db.createObjectStore('evaluation_indicators', { keyPath: 'id' });
                store.createIndex('groupId', 'groupId', { unique: false });
                store.createIndex('periodId', 'periodId', { unique: false });
            }
            
            // NUEVOS STORES
            if (!db.objectStoreNames.contains('centros_educativos')) {
                db.createObjectStore('centros_educativos', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('school_years')) {
                db.createObjectStore('school_years', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('periods_enhanced')) {
                const store = db.createObjectStore('periods_enhanced', { keyPath: 'id' });
                store.createIndex('schoolYearId', 'schoolYearId', { unique: false });
            }
            if (!db.objectStoreNames.contains('components')) {
                db.createObjectStore('components', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('settings')) {
                db.createObjectStore('settings', { keyPath: 'key' });
            }
            if (!db.objectStoreNames.contains('students')) {
                db.createObjectStore('students', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('attendance')) {
                db.createObjectStore('attendance', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('grades')) {
                db.createObjectStore('grades', { keyPath: 'id' });
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

// Inicializar datos de ejemplo
export async function initDefaultData() {
    // Centro educativo por defecto
    const centros = await getAll('centros_educativos');
    if (centros.length === 0) {
        await put('centros_educativos', {
            id: Date.now(),
            nombre: 'Escuela Tranquilino Sáenz Rojas',
            codigo: 'CE1',
            activo: true
        });
    }
    
    // Año lectivo por defecto
    const years = await getAll('school_years');
    if (years.length === 0) {
        await put('school_years', {
            id: Date.now(),
            nombre: '2026',
            activo: true
        });
    }
    
    // Períodos de ejemplo para el año 2026 (si no existen)
    const periods = await getAll('periods_enhanced');
    if (periods.length === 0) {
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
}
