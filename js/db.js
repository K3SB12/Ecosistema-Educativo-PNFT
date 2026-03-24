// js/db.js
// Gestor centralizado de IndexedDB para el sistema PNFT Articulador
// Versión 5 – Añade stores para centros, años, períodos mejorados, componentes y settings

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
            // Stores existentes (no se tocan)
            if (!db.objectStoreNames.contains('plannings')) db.createObjectStore('plannings', { keyPath: 'id' });
            if (!db.objectStoreNames.contains('profile')) db.createObjectStore('profile', { keyPath: 'key' });
            if (!db.objectStoreNames.contains('groups')) db.createObjectStore('groups', { keyPath: 'id' });
            if (!db.objectStoreNames.contains('periods')) db.createObjectStore('periods', { keyPath: 'id' });
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
        };
    });
}

// Helper genérico para obtener todos los elementos de una store
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

// Eliminar todos (para debugging)
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

// Inicializar datos de ejemplo si es necesario (centro por defecto, año 2026, etc.)
export async function initDefaultData() {
    const centros = await getAll('centros_educativos');
    if (centros.length === 0) {
        await put('centros_educativos', { id: 1, nombre: 'Escuela Tranquilino Sáenz Rojas', codigo: 'CE1', activo: true });
    }
    const years = await getAll('school_years');
    if (years.length === 0) {
        await put('school_years', { id: Date.now(), nombre: '2026', activo: true });
    }
    const settings = await getAll('settings');
    if (settings.length === 0) {
        await put('settings', { key: 'nota_minima_por_nivel', value: { 'I Ciclo': 70, 'II Ciclo': 70, 'III Ciclo': 70, 'Diversificada': 70 } });
    }
}
