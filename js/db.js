// js/db.js - Versión 6
// Gestor centralizado de IndexedDB para PNFT Articulador

const DB_NAME = 'PNFT_DB';
const DB_VERSION = 6;  // Aumentamos la versión para forzar la actualización

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
                'grades'
            ];
            
            // Crear cada store si no existe
            for (let storeName of stores) {
                if (!db.objectStoreNames.contains(storeName)) {
                    console.log(`Creando store: ${storeName}`);
                    if (storeName === 'evaluation_indicators') {
                        const store = db.createObjectStore(storeName, { keyPath: 'id' });
                        store.createIndex('groupId', 'groupId', { unique: false });
                        store.createIndex('periodId', 'periodId', { unique: false });
                    } else if (storeName === 'periods_enhanced') {
                        const store = db.createObjectStore(storeName, { keyPath: 'id' });
                        store.createIndex('schoolYearId', 'schoolYearId', { unique: false });
                    } else {
                        db.createObjectStore(storeName, { keyPath: 'id' });
                    }
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
}
