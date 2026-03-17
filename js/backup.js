// js/backup.js
import { openDB, getAll, addItem } from './database.js';

// Exportar todos los datos a un archivo JSON
export async function exportBackup() {
    const db = await openDB();
    const stores = ['plannings', 'evaluations', 'logbook', 'students', 'groups', 'settings'];
    const backup = {};
    for (let store of stores) {
        backup[store] = await getAll(store);
    }
    backup.version = 1;
    backup.exportedAt = new Date().toISOString();

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pnft_backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);

    // Registrar en historial de backups
    await addItem('backups', {
        createdAt: new Date().toISOString(),
        type: 'manual',
        filename: a.download
    });
}

// Importar datos desde archivo JSON (sobrescribe)
export async function importBackup(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const data = JSON.parse(e.target.result);
                const db = await openDB();
                const stores = ['plannings', 'evaluations', 'logbook', 'students', 'groups', 'settings'];
                // Limpiar stores existentes (opcional, se puede hacer merge)
                for (let storeName of stores) {
                    const tx = db.transaction(storeName, 'readwrite');
                    const store = tx.objectStore(storeName);
                    await store.clear(); // Limpiar
                    if (data[storeName] && Array.isArray(data[storeName])) {
                        for (let item of data[storeName]) {
                            // Eliminar id para que se autoincremente (o mantener si se quiere)
                            delete item.id;
                            await store.add(item);
                        }
                    }
                }
                resolve('Backup importado correctamente');
            } catch (error) {
                reject('Error al importar: ' + error.message);
            }
        };
        reader.readAsText(file);
    });
}

// Backup automático diario (llamar desde app.js con setInterval)
export function iniciarBackupAutomatico() {
    // Programar backups diarios a las 18:00 y semanales los viernes a las 17:00
    const ahora = new Date();
    const proximoDiario = new Date(ahora);
    proximoDiario.setHours(18, 0, 0, 0);
    if (proximoDiario < ahora) proximoDiario.setDate(proximoDiario.getDate() + 1);
    const tiempoDiario = proximoDiario - ahora;

    setTimeout(() => {
        realizarBackupDiario();
        setInterval(realizarBackupDiario, 24 * 60 * 60 * 1000);
    }, tiempoDiario);

    // Backup semanal (viernes 17:00)
    const proximoSemanal = new Date();
    proximoSemanal.setHours(17, 0, 0, 0);
    // Buscar próximo viernes
    while (proximoSemanal.getDay() !== 5) { // 5 = viernes
        proximoSemanal.setDate(proximoSemanal.getDate() + 1);
    }
    if (proximoSemanal < ahora) proximoSemanal.setDate(proximoSemanal.getDate() + 7);
    const tiempoSemanal = proximoSemanal - ahora;

    setTimeout(() => {
        realizarBackupSemanal();
        setInterval(realizarBackupSemanal, 7 * 24 * 60 * 60 * 1000);
    }, tiempoSemanal);
}

async function realizarBackupDiario() {
    const db = await openDB();
    const stores = ['plannings', 'evaluations', 'logbook', 'students', 'groups', 'settings'];
    const backup = {};
    for (let store of stores) {
        backup[store] = await getAll(store);
    }
    backup.version = 1;
    backup.exportedAt = new Date().toISOString();
    const blob = new Blob([JSON.stringify(backup)], { type: 'application/json' });
    // Guardar en IndexedDB o descargar? Según el prompt, se guarda en ./backups/auto/daily/
    // Pero en entorno web no podemos escribir en sistema de archivos. Podemos almacenar en IndexedDB o descargar automáticamente.
    // Para cumplir, podemos guardar en IndexedDB (store backups) y también ofrecer descarga manual.
    await addItem('backups', {
        createdAt: new Date().toISOString(),
        type: 'diario',
        data: backup
    });
    console.log('Backup diario realizado');
}

async function realizarBackupSemanal() {
    const db = await openDB();
    const stores = ['plannings', 'evaluations', 'logbook', 'students', 'groups', 'settings'];
    const backup = {};
    for (let store of stores) {
        backup[store] = await getAll(store);
    }
    backup.version = 1;
    backup.exportedAt = new Date().toISOString();
    await addItem('backups', {
        createdAt: new Date().toISOString(),
        type: 'semanal',
        data: backup
    });
    console.log('Backup semanal realizado');
}
