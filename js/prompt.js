// js/prompt.js
export function generarPrompt(datos) {
    const {
        ciclo, nivel, modulo, metodologia,
        saberesConceptuales, practicas, actitudes
    } = datos;

    let prompt = `╔══════════════════════════════════════════════════════════════════════════════╗
║ PNFT - PROGRAMA NACIONAL DE FORMACIÓN TECNOLÓGICA - COSTA RICA          ║
║ MINISTERIO DE EDUCACIÓN PÚBLICA - CURSO LECTIVO 2026                    ║
║ FORMATO: Planeamiento Didáctico según Lineamientos MEP 2026             ║
╚══════════════════════════════════════════════════════════════════════════════╝

[DATOS CURRICULARES]
• Ciclo: ${ciclo}
• Nivel: ${nivel}
• Módulo: ${modulo}
• Duración: 40 minutos (1 lección MEP)
• Metodología: ${metodologia}

[SABERES SELECCIONADOS]
• Conceptuales:\n`;
    saberesConceptuales.forEach(s => {
        prompt += `  - ${s.concepto}: ${s.indicador}\n`;
    });
    prompt += `• Prácticas del pensador computacional:\n`;
    practicas.forEach(p => prompt += `  - ${p}\n`);
    prompt += `• Actitudes:\n`;
    actitudes.forEach(a => prompt += `  - ${a}\n`);

    prompt += `
[DUA - DISEÑO UNIVERSAL DE APRENDIZAJE]
• Principio I: Múltiples formas de REPRESENTACIÓN
• Principio II: Múltiples formas de ACCIÓN Y EXPRESIÓN
• Principio III: Múltiples formas de IMPLICACIÓN (ENGAGEMENT)

[INSTRUCCIONES ESPECÍFICAS PARA IA]
• Generar estrategia de 40 minutos (Inicio 10, Desarrollo 20, Conclusión 10)
• Incluir 3 indicadores de evaluación (Acción+Contenido+Condición)
• Instrumentos: Rúbrica, Lista de cotejo, Escala estimativa
• Momentos: Diagnóstica, Formativa, Sumativa
• Evidencias observables concretas
• Lenguaje del currículo oficial PNFT
• Contextualizar a realidad del centro educativo

[FORMATO DE SALIDA REQUERIDO]
• Texto estructurado con: Inicio, Desarrollo, Cierre, Indicadores de evaluación e instrumentos.

[NOTA LEGAL]
• Esta estrategia será utilizada en el contexto educativo de Costa Rica
• Siguiendo el Reglamento de Evaluación de los Aprendizajes del MEP
• Y el currículo del Programa Nacional de Formación Tecnológica
`;
    return prompt;
}
