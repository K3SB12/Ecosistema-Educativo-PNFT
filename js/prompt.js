// prompt.js - Generador de prompts para IA (ChatGPT, Copilot, Gemini)

function generarPromptIA(planeamiento) {
    const {
        nivel = '',
        modulo = '',
        ciclo = '',
        indicadores = [],
        saberesConceptuales = [],
        saberesProcedimentales = [],
        saberesActitudinales = [],
        metodologia = '',
        duracion = '40 minutos'
    } = planeamiento;

    // Construir el prompt según la estructura del prompt maestro
    const prompt = `
╔══════════════════════════════════════════════════════════════════════════════╗
║     PNFT - PROGRAMA NACIONAL DE FORMACIÓN TECNOLÓGICA - COSTA RICA          ║
║     MINISTERIO DE EDUCACIÓN PÚBLICA - CURSO LECTIVO 2026                    ║
║     FORMATO: Planeamiento Didáctico según Lineamientos MEP 2026             ║
╚══════════════════════════════════════════════════════════════════════════════╝

[DATOS CURRICULARES]
• Ciclo: ${ciclo}
• Nivel: ${nivel}
• Módulo: ${modulo}
• Duración: ${duracion} (1 lección MEP)
• Metodología: ${metodologia || '[seleccionada por docente]'}

[SABERES SELECCIONADOS]
• Conceptuales:
${saberesConceptuales.map(s => `  - ${s}`).join('\n') || '  (lista de saberes conceptuales)'}

• Procedimentales:
${saberesProcedimentales.map(s => `  - ${s}`).join('\n') || '  (lista de 13 prácticas - marcadas)'}

• Actitudinales:
${saberesActitudinales.map(s => `  - ${s}`).join('\n') || '  (lista de 4 actitudes - marcadas)'}

[INDICADORES DE LOGRO]
${indicadores.map(i => `• ${i}`).join('\n')}

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
• JSON estricto para importación automática
• O texto estructurado para revisión manual

[NOTA LEGAL]
• Esta estrategia será utilizada en el contexto educativo de Costa Rica
• Siguiendo el Reglamento de Evaluación de los Aprendizajes del MEP
• Y el currículo del Programa Nacional de Formación Tecnológica
`;

    return prompt;
}

// Copiar prompt al portapapeles
function copiarPromptAI(planeamiento) {
    const prompt = generarPromptIA(planeamiento);
    navigator.clipboard.writeText(prompt).then(() => {
        alert('✅ Prompt copiado al portapapeles. Pégalo en ChatGPT, Copilot o Gemini.');
    }).catch(err => {
        console.error('Error al copiar:', err);
        alert('No se pudo copiar automáticamente. Selecciona el texto manualmente.');
    });
}

// Exponer funciones
window.promptAPI = {
    generar: generarPromptIA,
    copiar: copiarPromptAI
};
