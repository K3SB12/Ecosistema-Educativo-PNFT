// database.js - IndexedDB para PNFT Articulador

const DB_NAME = 'PNFT_Articulador_DB';
const DB_VERSION = 1;

let db = null;

// Abrir base de datos y crear stores
function abrirDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            db = request.result;
            resolve(db);
        };
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            
            // Store: plannings (planeamientos didácticos)
            if (!db.objectStoreNames.contains('plannings')) {
                const store = db.createObjectStore('plannings', { keyPath: 'id' });
                store.createIndex('nivel', 'nivel', { unique: false });
                store.createIndex('modulo', 'modulo', { unique: false });
                store.createIndex('fecha', 'fecha', { unique: false });
            }
            
            // Store: evaluations (calificaciones)
            if (!db.objectStoreNames.contains('evaluations')) {
                const store = db.createObjectStore('evaluations', { keyPath: 'id' });
                store.createIndex('groupId', 'groupId', { unique: false });
                store.createIndex('periodo', 'periodo', { unique: false });
            }
            
            // Store: logbook (bitácora)
            if (!db.objectStoreNames.contains('logbook')) {
                const store = db.createObjectStore('logbook', { keyPath: 'id' });
                store.createIndex('planningId', 'planningId', { unique: false });
                store.createIndex('fecha', 'fecha', { unique: false });
                store.createIndex('grupo', 'grupo', { unique: false });
            }
            
            // Store: students (estudiantes)
            if (!db.objectStoreNames.contains('students')) {
                const store = db.createObjectStore('students', { keyPath: 'id' });
                store.createIndex('groupId', 'groupId', { unique: false });
                store.createIndex('nombre', 'nombre', { unique: false });
            }
            
            // Store: groups (grupos)
            if (!db.objectStoreNames.contains('groups')) {
                const store = db.createObjectStore('groups', { keyPath: 'id' });
                store.createIndex('nombre', 'nombre', { unique: false });
                store.createIndex('nivel', 'nivel', { unique: false });
            }
            
            // Store: settings (configuración)
            if (!db.objectStoreNames.contains('settings')) {
                db.createObjectStore('settings', { keyPath: 'clave' });
            }
            
            // Store: backups (respaldos)
            if (!db.objectStoreNames.contains('backups')) {
                const store = db.createObjectStore('backups', { keyPath: 'id' });
                store.createIndex('tipo', 'tipo', { unique: false });
                store.createIndex('fecha', 'fecha', { unique: false });
            }
        };
    });
}

// Funciones CRUD genéricas
function guardar(storeName, datos) {
    return new Promise((resolve, reject) => {
        if (!db) return reject('Base de datos no inicializada');
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put(datos);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function obtenerTodos(storeName) {
    return new Promise((resolve, reject) => {
        if (!db) return reject('Base de datos no inicializada');
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function obtenerPorId(storeName, id) {
    return new Promise((resolve, reject) => {
        if (!db) return reject('Base de datos no inicializada');
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function eliminar(storeName, id) {
    return new Promise((resolve, reject) => {
        if (!db) return reject('Base de datos no inicializada');
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Funciones específicas
async function guardarPlaneamiento(planeamiento) {
    if (!planeamiento.id) planeamiento.id = Date.now();
    return await guardar('plannings', planeamiento);
}

async function obtenerPlaneamientos() {
    return await obtenerTodos('plannings');
}

async function guardarEvaluacion(evaluacion) {
    if (!evaluacion.id) evaluacion.id = Date.now();
    return await guardar('evaluations', evaluacion);
}

async function obtenerEvaluaciones() {
    return await obtenerTodos('evaluations');
}

async function guardarBitacora(entrada) {
    if (!entrada.id) entrada.id = Date.now();
    return await guardar('logbook', entrada);
}

async function obtenerBitacora() {
    return await obtenerTodos('logbook');
}

async function guardarEstudiante(estudiante) {
    if (!estudiante.id) estudiante.id = Date.now();
    return await guardar('students', estudiante);
}

async function obtenerEstudiantes() {
    return await obtenerTodos('students');
}

async function guardarGrupo(grupo) {
    if (!grupo.id) grupo.id = Date.now();
    return await guardar('groups', grupo);
}

async function obtenerGrupos() {
    return await obtenerTodos('groups');
}

async function guardarConfiguracion(clave, valor) {
    return await guardar('settings', { clave, valor });
}

async function obtenerConfiguracion(clave) {
    const todos = await obtenerTodos('settings');
    const item = todos.find(c => c.clave === clave);
    return item ? item.valor : null;
}

// Inicializar base de datos al cargar
window.dbAPI = {
    abrirDB,
    guardarPlaneamiento,
    obtenerPlaneamientos,
    guardarEvaluacion,
    obtenerEvaluaciones,
    guardarBitacora,
    obtenerBitacora,
    guardarEstudiante,
    obtenerEstudiantes,
    guardarGrupo,
    obtenerGrupos,
    guardarConfiguracion,
    obtenerConfiguracion
};

// Abrir DB automáticamente
abrirDB().then(() => console.log('✅ IndexedDB lista')).catch(err => console.error('Error en DB', err));
