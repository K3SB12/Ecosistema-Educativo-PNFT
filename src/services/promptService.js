// src/services/promptService.js
import { AREAS_CONOCIMIENTO, PRACTICAS_PENSADOR_COMPUTACIONAL, ACTITUDES_PENSADOR_COMPUTACIONAL } from '../data/pnft-curriculum';

export function generatePrompt({ nivel, modulo, areas, practicas, actitudes, metodologia }) {
  const areasNombres = areas.map(id => AREAS_CONOCIMIENTO.find(a => a.id === id)?.nombre || id).join(', ');
  const practicasNombres = practicas.map(id => PRACTICAS_PENSADOR_COMPUTACIONAL.find(p => p.id === id)?.nombre || id).join(', ');
  const actitudesNombres = actitudes.map(id => ACTITUDES_PENSADOR_COMPUTACIONAL.find(a => a.id === id)?.nombre || id).join(', ');

  const metodologiaTexto = {
    ABJ: 'Aprendizaje Basado en Juegos',
    ABR: 'Aprendizaje Basado en Retos',
    DT: 'Design Thinking',
  }[metodologia] || metodologia;

  return `╔══════════════════════════════════════════════════════════════════════════════╗
║ PNFT - PROGRAMA NACIONAL DE FORMACIÓN TECNOLÓGICA - COSTA RICA          ║
║ MINISTERIO DE EDUCACIÓN PÚBLICA - CURSO LECTIVO 2026                    ║
║ FORMATO: Planeamiento Didáctico según Lineamientos MEP 2026             ║
╚══════════════════════════════════════════════════════════════════════════════╝

[DATOS CURRICULARES]
• Nivel: ${nivel}
• Módulo: ${modulo}
• Duración: 40 minutos (1 lección MEP)
• Metodología: ${metodologiaTexto}

[SABERES SELECCIONADOS]
• Áreas de conocimiento: ${areasNombres || 'No especificadas'}
• Prácticas del pensador computacional: ${practicasNombres || 'No especificadas'}
• Actitudes del pensador computacional: ${actitudesNombres || 'No especificadas'}

[INSTRUCCIONES PARA IA]
Generar una estrategia de mediación de 40 minutos (Inicio 10 min, Desarrollo 20 min, Conclusión 10 min) que incluya:
- 3 indicadores de evaluación con formato ACCIÓN + CONTENIDO + CONDICIÓN.
- Instrumentos sugeridos: rúbrica, lista de cotejo o escala estimativa.
- Momentos: diagnóstica, formativa, sumativa.
- Evidencias observables concretas.
- Lenguaje del currículo oficial PNFT.
- Contextualizar a la realidad del centro educativo costarricense.

[FORMATO DE SALIDA]
Texto estructurado con:
- Inicio: (actividad de exploración, diagnóstico)
- Desarrollo: (actividad principal, práctica guiada, trabajo colaborativo)
- Conclusión: (reflexión, evaluación formativa, cierre)
- Tabla de 3 columnas: Indicadores de Logro | Estrategias de Mediación | Indicadores de Evaluación

[NOTA LEGAL]
Esta estrategia será utilizada en el contexto educativo de Costa Rica, siguiendo el Reglamento de Evaluación de los Aprendizajes del MEP y el currículo del Programa Nacional de Formación Tecnológica.`;
}
