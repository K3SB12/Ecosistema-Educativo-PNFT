// src/database/indexedDB.js
import { openDB } from 'idb';

const DB_NAME = 'PNFT_Articulador_DB';
const DB_VERSION = 1;

// Stores
const STORES = {
  PLANNINGS: 'plannings',
  EVALUATIONS: 'evaluations',
  LOGBOOK: 'logbook',
  STUDENTS: 'students',
  GROUPS: 'groups',
  SETTINGS: 'settings',
  BACKUPS: 'backups'
};

// Inicializar base de datos
export async function initDB() {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Planeamientos
      if (!db.objectStoreNames.contains(STORES.PLANNINGS)) {
        const planningStore = db.createObjectStore(STORES.PLANNINGS, { keyPath: 'id', autoIncrement: true });
        planningStore.createIndex('cycle_level', ['cycle', 'level']);
        planningStore.createIndex('schoolYear', 'schoolYear');
        planningStore.createIndex('createdAt', 'createdAt');
      }

      // Evaluaciones
      if (!db.objectStoreNames.contains(STORES.EVALUATIONS)) {
        const evalStore = db.createObjectStore(STORES.EVALUATIONS, { keyPath: 'id', autoIncrement: true });
        evalStore.createIndex('groupId', 'groupId');
        evalStore.createIndex('period', 'period');
        evalStore.createIndex('finalGrade', 'finalGrade');
      }

      // Bitácora
      if (!db.objectStoreNames.contains(STORES.LOGBOOK)) {
        const logStore = db.createObjectStore(STORES.LOGBOOK, { keyPath: 'id', autoIncrement: true });
        logStore.createIndex('planningId', 'planningId');
        logStore.createIndex('date', 'date');
        logStore.createIndex('groupId', 'groupId');
        logStore.createIndex('studentId', 'studentId'); // para filtrar por estudiante
      }

      // Estudiantes
      if (!db.objectStoreNames.contains(STORES.STUDENTS)) {
        const studentStore = db.createObjectStore(STORES.STUDENTS, { keyPath: 'id', autoIncrement: true });
        studentStore.createIndex('groupId', 'groupId');
        studentStore.createIndex('cedula', 'cedula', { unique: false }); // puede repetirse?
        studentStore.createIndex('name', 'name');
      }

      // Grupos
      if (!db.objectStoreNames.contains(STORES.GROUPS)) {
        const groupStore = db.createObjectStore(STORES.GROUPS, { keyPath: 'id', autoIncrement: true });
        groupStore.createIndex('schoolYear', 'schoolYear');
        groupStore.createIndex('level', 'level');
        groupStore.createIndex('section', 'section');
      }

      // Configuración
      if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
        db.createObjectStore(STORES.SETTINGS, { keyPath: 'key' });
      }

      // Backups
      if (!db.objectStoreNames.contains(STORES.BACKUPS)) {
        const backupStore = db.createObjectStore(STORES.BACKUPS, { keyPath: 'id', autoIncrement: true });
        backupStore.createIndex('createdAt', 'createdAt');
        backupStore.createIndex('type', 'type');
      }
    },
  });
  return db;
}

// --- Funciones genéricas CRUD ---
export async function addItem(storeName, item) {
  const db = await initDB();
  const id = await db.add(storeName, { ...item, createdAt: new Date().toISOString() });
  return id;
}

export async function getItem(storeName, id) {
  const db = await initDB();
  return db.get(storeName, id);
}

export async function getAll(storeName) {
  const db = await initDB();
  return db.getAll(storeName);
}

export async function updateItem(storeName, item) {
  const db = await initDB();
  await db.put(storeName, { ...item, updatedAt: new Date().toISOString() });
  return item.id;
}

export async function deleteItem(storeName, id) {
  const db = await initDB();
  await db.delete(storeName, id);
  return id;
}

export async function clearStore(storeName) {
  const db = await initDB();
  await db.clear(storeName);
}

// --- Funciones específicas por store ---

// Planeamientos
export async function getPlanningsByCycleAndLevel(cycle, level) {
  const db = await initDB();
  return db.getAllFromIndex(STORES.PLANNINGS, 'cycle_level', [cycle, level]);
}

export async function getPlanningsBySchoolYear(year) {
  const db = await initDB();
  return db.getAllFromIndex(STORES.PLANNINGS, 'schoolYear', year);
}

// Evaluaciones
export async function getEvaluationsByGroup(groupId) {
  const db = await initDB();
  return db.getAllFromIndex(STORES.EVALUATIONS, 'groupId', groupId);
}

export async function getEvaluationsByPeriod(period) {
  const db = await initDB();
  return db.getAllFromIndex(STORES.EVALUATIONS, 'period', period);
}

// Bitácora
export async function getLogbookByPlanning(planningId) {
  const db = await initDB();
  return db.getAllFromIndex(STORES.LOGBOOK, 'planningId', planningId);
}

export async function getLogbookByDate(date) {
  const db = await initDB();
  return db.getAllFromIndex(STORES.LOGBOOK, 'date', date);
}

export async function getLogbookByGroup(groupId) {
  const db = await initDB();
  return db.getAllFromIndex(STORES.LOGBOOK, 'groupId', groupId);
}

export async function getLogbookByStudent(studentId) {
  const db = await initDB();
  return db.getAllFromIndex(STORES.LOGBOOK, 'studentId', studentId);
}

// Estudiantes
export async function getStudentsByGroup(groupId) {
  const db = await initDB();
  return db.getAllFromIndex(STORES.STUDENTS, 'groupId', groupId);
}

export async function getStudentByCedula(cedula) {
  const db = await initDB();
  return db.getFromIndex(STORES.STUDENTS, 'cedula', cedula);
}

// Grupos
export async function getGroupsBySchoolYear(year) {
  const db = await initDB();
  return db.getAllFromIndex(STORES.GROUPS, 'schoolYear', year);
}

// Configuración
export async function getSetting(key) {
  const db = await initDB();
  const setting = await db.get(STORES.SETTINGS, key);
  return setting ? setting.value : null;
}

export async function setSetting(key, value) {
  const db = await initDB();
  await db.put(STORES.SETTINGS, { key, value, updatedAt: new Date().toISOString() });
}

// Backups
export async function saveBackup(backupData, type = 'manual') {
  const db = await initDB();
  const id = await db.add(STORES.BACKUPS, {
    ...backupData,
    type,
    createdAt: new Date().toISOString()
  });
  return id;
}

export async function getLatestBackups(limit = 10) {
  const db = await initDB();
  const backups = await db.getAll(STORES.BACKUPS);
  return backups.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, limit);
}
