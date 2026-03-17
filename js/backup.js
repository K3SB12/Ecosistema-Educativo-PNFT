// backup.js - Sistema de backup triple

// Realizar backup manual (exportar todo a JSON)
async function exportarBackupManual() {
    const backup = {
        fecha: new Date().toISOString(),
        version: 1,
        datos: {
            plannings: await dbAPI.obtenerPlaneamientos(),
            evaluations: await dbAPI.obtenerEvaluaciones(),
            logbook: await dbAPI.obtenerBitacora(),
            students: await dbAPI.obtenerEstudiantes(),
            groups: await dbAPI.obtenerGrupos(),
            settings: await obtenerTodasConfiguraciones()
        }
    };
    
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pnft_backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    // Guardar en store de backups
    await dbAPI.guardar('backups', {
        id: Date.now(),
        fecha: new Date().toISOString(),
        tipo: 'manual',
        data: backup
    });
}

// Importar backup (sobrescribe datos existentes)
function importarBackup(archivo) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const backup = JSON.parse(e.target.result);
                if (confirm('⚠️ Importar sobrescribirá todos los datos actuales. ¿Continuar?')) {
                    // Restaurar cada store
                    if (backup.datos.plannings) {
                        for (const p of backup.datos.plannings) {
                            await dbAPI.guardarPlaneamiento(p);
                        }
                    }
                    if (backup.datos.evaluations) {
                        for (const e of backup.datos.evaluations) {
                            await dbAPI.guardarEvaluacion(e);
                        }
                    }
                    if (backup.datos.logbook) {
                        for (const l of backup.datos.logbook) {
                            await dbAPI.guardarBitacora(l);
                        }
                    }
                    if (backup.datos.students) {
                        for (const s of backup.datos.students) {
                            await dbAPI.guardarEstudiante(s);
                        }
                    }
                    if (backup.datos.groups) {
                        for (const g of backup.datos.groups) {
                            await dbAPI.guardarGrupo(g);
                        }
                    }
                    // Configuraciones
                    if (backup.datos.settings) {
                        for (const [clave, valor] of Object.entries(backup.datos.settings)) {
                            await dbAPI.guardarConfiguracion(clave, valor);
                        }
                    }
                    alert('✅ Backup importado correctamente');
                    resolve();
                } else {
                    reject('Importación cancelada');
                }
            } catch (error) {
                reject('Error al importar: ' + error.message);
            }
        };
        reader.readAsText(archivo);
    });
}

// Backup automático diario (18:00)
function programarBackupDiario() {
    const ahora = new Date();
    const horaBackup = 18; // 18:00
    const minutosBackup = 0;
    
    const proximo = new Date(ahora);
    proximo.setHours(horaBackup, minutosBackup, 0, 0);
    if (proximo <= ahora) {
        proximo.setDate(proximo.getDate() + 1);
    }
    
    const tiempoHastaProximo = proximo - ahora;
    setTimeout(() => {
        ejecutarBackupDiario();
        setInterval(ejecutarBackupDiario, 24 * 60 * 60 * 1000);
    }, tiempoHastaProximo);
}

async function ejecutarBackupDiario() {
    console.log('Ejecutando backup diario...');
    const backup = {
        fecha: new Date().toISOString(),
        tipo: 'diario',
        datos: {
            plannings: await dbAPI.obtenerPlaneamientos(),
            evaluations: await dbAPI.obtenerEvaluaciones(),
            logbook: await dbAPI.obtenerBitacora(),
            students: await dbAPI.obtenerEstudiantes(),
            groups: await dbAPI.obtenerGrupos(),
        }
    };
    
    await dbAPI.guardar('backups', {
        id: Date.now(),
        fecha: new Date().toISOString(),
        tipo: 'diario',
        data: backup
    });
    
    // Limpiar backups diarios antiguos (más de 7 días)
    const backups = await dbAPI.obtenerTodos('backups');
    const diarios = backups.filter(b => b.tipo === 'diario');
    diarios.sort((a,b) => new Date(b.fecha) - new Date(a.fecha));
    if (diarios.length > 7) {
        for (let i = 7; i < diarios.length; i++) {
            await dbAPI.eliminar('backups', diarios[i].id);
        }
    }
}

// Backup semanal (viernes 17:00)
function programarBackupSemanal() {
    const ahora = new Date();
    const diaBackup = 5; // Viernes
    const horaBackup = 17;
    const minutosBackup = 0;
    
    const proximo = new Date(ahora);
    proximo.setHours(horaBackup, minutosBackup, 0, 0);
    while (proximo.getDay() !== diaBackup || proximo <= ahora) {
        proximo.setDate(proximo.getDate() + 1);
    }
    
    const tiempoHastaProximo = proximo - ahora;
    setTimeout(() => {
        ejecutarBackupSemanal();
        setInterval(ejecutarBackupSemanal, 7 * 24 * 60 * 60 * 1000);
    }, tiempoHastaProximo);
}

async function ejecutarBackupSemanal() {
    console.log('Ejecutando backup semanal...');
    const backup = {
        fecha: new Date().toISOString(),
        tipo: 'semanal',
        datos: {
            plannings: await dbAPI.obtenerPlaneamientos(),
            evaluations: await dbAPI.obtenerEvaluaciones(),
            logbook: await dbAPI.obtenerBitacora(),
            students: await dbAPI.obtenerEstudiantes(),
            groups: await dbAPI.obtenerGrupos(),
        }
    };
    
    await dbAPI.guardar('backups', {
        id: Date.now(),
        fecha: new Date().toISOString(),
        tipo: 'semanal',
        data: backup
    });
    
    // Limpiar backups semanales antiguos (más de 4 semanas)
    const backups = await dbAPI.obtenerTodos('backups');
    const semanales = backups.filter(b => b.tipo === 'semanal');
    semanales.sort((a,b) => new Date(b.fecha) - new Date(a.fecha));
    if (semanales.length > 4) {
        for (let i = 4; i < semanales.length; i++) {
            await dbAPI.eliminar('backups', semanales[i].id);
        }
    }
}

// Iniciar programación
programarBackupDiario();
programarBackupSemanal();

// Exponer funciones globales
window.backupAPI = {
    exportarManual: exportarBackupManual,
    importar: importarBackup
};

// Helper
async function obtenerTodasConfiguraciones() {
    const settings = await dbAPI.obtenerTodos('settings');
    const obj = {};
    settings.forEach(s => obj[s.clave] = s.valor);
    return obj;
}
