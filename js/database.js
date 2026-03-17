// js/database.js
const DB_NAME = 'PNFT_Articulador_DB';
const DB_VERSION = 1;

export function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            // Store para planeamientos
            if (!db.objectStoreNames.contains('plannings')) {
                const store = db.createObjectStore('plannings', { keyPath: 'id', autoIncrement: true });
                store.createIndex('cycle', 'cycle', { unique: false });
                store.createIndex('level', 'level', { unique: false });
                store.createIndex('schoolYear', 'schoolYear', { unique: false });
            }

            // Store para evaluaciones
            if (!db.objectStoreNames.contains('evaluations')) {
                const store = db.createObjectStore('evaluations', { keyPath: 'id', autoIncrement: true });
                store.createIndex('groupId', 'groupId', { unique: false });
                store.createIndex('period', 'period', { unique: false });
            }

            // Store para bitácora
            if (!db.objectStoreNames.contains('logbook')) {
                const store = db.createObjectStore('logbook', { keyPath: 'id', autoIncrement: true });
                store.createIndex('planningId', 'planningId', { unique: false });
                store.createIndex('date', 'date', { unique: false });
                store.createIndex('groupId', 'groupId', { unique: false });
            }

            // Store para estudiantes
            if (!db.objectStoreNames.contains('students')) {
                const store = db.createObjectStore('students', { keyPath: 'id', autoIncrement: true });
                store.createIndex('groupId', 'groupId', { unique: false });
                store.createIndex('cedula', 'cedula', { unique: false });
            }

            // Store para grupos
            if (!db.objectStoreNames.contains('groups')) {
                const store = db.createObjectStore('groups', { keyPath: 'id', autoIncrement: true });
                store.createIndex('level', 'level', { unique: false });
                store.createIndex('schoolYear', 'schoolYear', { unique: false });
            }

            // Store para configuración
            if (!db.objectStoreNames.contains('settings')) {
                db.createObjectStore('settings', { keyPath: 'key' });
            }

            // Store para backups (historial)
            if (!db.objectStoreNames.contains('backups')) {
                const store = db.createObjectStore('backups', { keyPath: 'id', autoIncrement: true });
                store.createIndex('createdAt', 'createdAt', { unique: false });
            }
        };
    });
}

// Funciones genéricas CRUD
export async function addItem(storeName, item) {
    const db = await openDB();
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    return new Promise((resolve, reject) => {
        const request = store.add(item);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function getItem(storeName, id) {
    const db = await openDB();
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    return new Promise((resolve, reject) => {
        const request = store.get(id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function updateItem(storeName, item) {
    const db = await openDB();
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    return new Promise((resolve, reject) => {
        const request = store.put(item);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function deleteItem(storeName, id) {
    const db = await openDB();
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    return new Promise((resolve, reject) => {
        const request = store.delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

export async function getAll(storeName) {
    const db = await openDB();
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Función para obtener elementos por índice
export async function getByIndex(storeName, indexName, value) {
    const db = await openDB();
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const index = store.index(indexName);
    return new Promise((resolve, reject) => {
        const request = index.getAll(value);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}
