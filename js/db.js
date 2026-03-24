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
            console.log('Actualizando DB a versión', DB_VERSION);
            
            // Crear stores si no existen
            if (!db.objectStoreNames.contains('plannings')) {
                db.createObjectStore('plannings', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('profile')) {
                db.createObjectStore('profile', { keyPath: 'key' });
            }
            if (!db.objectStoreNames.contains('groups')) {
                db.createObjectStore('groups', { keyPath: 'id' });
                console.log('Store groups creado');
            }
            if (!db.objectStoreNames.contains('periods')) {
                db.createObjectStore('periods', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('evaluation_indicators')) {
                const store = db.createObjectStore('evaluation_indicators', { keyPath: 'id' });
                store.createIndex('groupId', 'groupId', { unique: false });
                store.createIndex('periodId', 'periodId', { unique: false });
            }
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
