// js/db.js
const DB_NAME = 'PNFT_DB';
const DB_VERSION = 6; // Incrementamos la versión para forzar el upgrade

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
            const oldVersion = event.oldVersion;
            
            // Crear todos los stores si no existen
            const stores = ['plannings', 'profile', 'groups', 'periods', 'evaluation_indicators', 
                           'centros_educativos', 'school_years', 'periods_enhanced', 'components', 
                           'settings', 'students', 'attendance', 'grades'];
            
            for (const storeName of stores) {
                if (!db.objectStoreNames.contains(storeName)) {
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
