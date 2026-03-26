// ==================== FUNCIONES DE CÁLCULO DE NOTAS ====================

/**
 * Obtiene el promedio de un estudiante en un subcomponente específico para un período dado.
 * @param {number} studentId - ID del estudiante
 * @param {number} periodId - ID del período
 * @param {number} groupId - ID del grupo (opcional, se usa para filtrar si hay notas de múltiples grupos)
 * @param {string} subcomponentId - Tipo de subcomponente ('daily_work', 'task', 'test', 'attendance', 'project', 'portfolio')
 * @returns {number|null} - Promedio (0-100) o null si no hay notas
 */
export async function getSubcomponentAverage(studentId, periodId, groupId, subcomponentId) {
    const allGrades = await getAll('grades');
    const relevant = allGrades.filter(g =>
        g.studentId === studentId &&
        g.periodId === periodId &&
        g.groupId === groupId &&
        g.subcomponentId === subcomponentId
    );
    if (relevant.length === 0) return null;
    const sum = relevant.reduce((acc, g) => acc + (g.value || 0), 0);
    return sum / relevant.length;
}

/**
 * Obtiene el componente de evaluación de una asignatura.
 * @param {number} subjectId - ID de la asignatura
 * @returns {object|null} - Componente completo con sus subcomponentes
 */
export async function getSubjectComponent(subjectId) {
    const subject = await getById('subjects', subjectId);
    if (!subject || !subject.componentId) return null;
    return await getById('components', subject.componentId);
}

/**
 * Calcula la nota final de un período para una asignatura específica.
 * @param {number} studentId - ID del estudiante
 * @param {number} periodId - ID del período
 * @param {number} groupId - ID del grupo
 * @param {number} subjectId - ID de la asignatura
 * @param {number} [decimals=2] - Número de decimales para redondear
 * @returns {number|null} - Nota final (0-100) o null si no hay datos
 */
export async function calculatePeriodGrade(studentId, periodId, groupId, subjectId, decimals = 2) {
    const component = await getSubjectComponent(subjectId);
    if (!component || !component.subcomponentes) return null;

    // Mapear subcomponentes a sus porcentajes
    const weights = {
        daily_work: 0,
        task: 0,
        test: 0,
        attendance: 0,
        project: 0,
        portfolio: 0
    };
    for (let sub of component.subcomponentes) {
        const name = sub.nombre.toLowerCase();
        if (name.includes('trabajo cotidiano')) weights.daily_work = sub.porcentaje;
        else if (name.includes('tarea')) weights.task = sub.porcentaje;
        else if (name.includes('prueba')) weights.test = sub.porcentaje;
        else if (name.includes('asistencia')) weights.attendance = sub.porcentaje;
        else if (name.includes('proyecto')) weights.project = sub.porcentaje;
        else if (name.includes('portafolio')) weights.portfolio = sub.porcentaje;
    }

    // Obtener promedios de cada subcomponente
    const dailyAvg = await getSubcomponentAverage(studentId, periodId, groupId, 'daily_work');
    const taskAvg = await getSubcomponentAverage(studentId, periodId, groupId, 'task');
    const testAvg = await getSubcomponentAverage(studentId, periodId, groupId, 'test');
    const attendanceAvg = await getSubcomponentAverage(studentId, periodId, groupId, 'attendance');
    const projectAvg = await getSubcomponentAverage(studentId, periodId, groupId, 'project');
    const portfolioAvg = await getSubcomponentAverage(studentId, periodId, groupId, 'portfolio');

    let totalWeight = 0;
    let weightedSum = 0;

    if (weights.daily_work > 0 && dailyAvg !== null) {
        weightedSum += dailyAvg * weights.daily_work;
        totalWeight += weights.daily_work;
    }
    if (weights.task > 0 && taskAvg !== null) {
        weightedSum += taskAvg * weights.task;
        totalWeight += weights.task;
    }
    if (weights.test > 0 && testAvg !== null) {
        weightedSum += testAvg * weights.test;
        totalWeight += weights.test;
    }
    if (weights.attendance > 0 && attendanceAvg !== null) {
        weightedSum += attendanceAvg * weights.attendance;
        totalWeight += weights.attendance;
    }
    if (weights.project > 0 && projectAvg !== null) {
        weightedSum += projectAvg * weights.project;
        totalWeight += weights.project;
    }
    if (weights.portfolio > 0 && portfolioAvg !== null) {
        weightedSum += portfolioAvg * weights.portfolio;
        totalWeight += weights.portfolio;
    }

    if (totalWeight === 0) return null;
    const raw = weightedSum / totalWeight;
    return roundGrade(raw, decimals);
}

/**
 * Calcula la nota anual de un estudiante para una asignatura, considerando los porcentajes de cada período.
 * @param {number} studentId - ID del estudiante
 * @param {number} groupId - ID del grupo
 * @param {number} subjectId - ID de la asignatura
 * @param {number} [decimals=2] - Número de decimales para redondear
 * @returns {number|null} - Nota anual (0-100) o null si no hay datos
 */
export async function calculateAnnualGrade(studentId, groupId, subjectId, decimals = 2) {
    // Obtener el grupo para conocer sus períodos y porcentajes
    const group = await getById('groups', groupId);
    if (!group) return null;

    // Obtener todos los períodos del año lectivo
    const allPeriods = await getAll('periods_enhanced');
    const yearPeriods = allPeriods.filter(p => p.schoolYearId === group.anioId);
    if (yearPeriods.length === 0) return null;

    // Porcentajes de cada período (pueden estar en group.periodosPorcentajes)
    const periodPercentages = group.periodosPorcentajes || {};
    // Si no están definidos, repartir equitativamente
    let totalWeight = 0;
    let weightedSum = 0;

    for (let period of yearPeriods) {
        let peso = periodPercentages[period.id] || 0;
        if (peso === 0 && periodPercentajesAutomatic) {
            // Si no se definió peso para este período, repartir igual entre todos
            peso = 100 / yearPeriods.length;
        }
        if (peso === 0) continue;

        const periodGrade = await calculatePeriodGrade(studentId, period.id, groupId, subjectId, decimals);
        if (periodGrade !== null) {
            weightedSum += periodGrade * peso;
            totalWeight += peso;
        }
    }

    if (totalWeight === 0) return null;
    const raw = weightedSum / totalWeight;
    return roundGrade(raw, decimals);
}

/**
 * Redondea una nota al número de decimales especificado (por defecto 2).
 * @param {number} value - Valor a redondear
 * @param {number} decimals - Número de decimales (0-4)
 * @returns {number}
 */
export function roundGrade(value, decimals = 2) {
    if (decimals === undefined || decimals === null) decimals = 2;
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}

/**
 * Obtiene la nota de un estudiante en un período para una asignatura, devolviendo un objeto con los valores de cada subcomponente.
 * Útil para reportes detallados.
 */
export async function getPeriodGradeDetails(studentId, periodId, groupId, subjectId) {
    const component = await getSubjectComponent(subjectId);
    if (!component || !component.subcomponentes) return null;

    const weights = {};
    for (let sub of component.subcomponentes) {
        const name = sub.nombre.toLowerCase();
        if (name.includes('trabajo cotidiano')) weights.daily_work = sub.porcentaje;
        else if (name.includes('tarea')) weights.task = sub.porcentaje;
        else if (name.includes('prueba')) weights.test = sub.porcentaje;
        else if (name.includes('asistencia')) weights.attendance = sub.porcentaje;
        else if (name.includes('proyecto')) weights.project = sub.porcentaje;
        else if (name.includes('portafolio')) weights.portfolio = sub.porcentaje;
    }

    const dailyAvg = await getSubcomponentAverage(studentId, periodId, groupId, 'daily_work');
    const taskAvg = await getSubcomponentAverage(studentId, periodId, groupId, 'task');
    const testAvg = await getSubcomponentAverage(studentId, periodId, groupId, 'test');
    const attendanceAvg = await getSubcomponentAverage(studentId, periodId, groupId, 'attendance');
    const projectAvg = await getSubcomponentAverage(studentId, periodId, groupId, 'project');
    const portfolioAvg = await getSubcomponentAverage(studentId, periodId, groupId, 'portfolio');

    return {
        daily_work: { value: dailyAvg, weight: weights.daily_work || 0 },
        task: { value: taskAvg, weight: weights.task || 0 },
        test: { value: testAvg, weight: weights.test || 0 },
        attendance: { value: attendanceAvg, weight: weights.attendance || 0 },
        project: { value: projectAvg, weight: weights.project || 0 },
        portfolio: { value: portfolioAvg, weight: weights.portfolio || 0 }
    };
}
