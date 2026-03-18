// ============================================
// PNFT CURRÍCULO COMPLETO 2026
// ============================================

// ---------- CONSTANTES GLOBALES ----------
const PRACTICAS_PENSADOR_COMPUTACIONAL = [
  { id: 'reconoce_patrones', nombre: 'Reconoce patrones', descripcion: 'Predice a partir de regularidades, similitudes o características comunes de un conjunto de datos o situaciones, patrones que pueda aplicar en la solución a un problema o situación.' },
  { id: 'abstrae', nombre: 'Abstrae', descripcion: 'Concluye cuáles son las características relevantes que debe considerar y cuáles debe omitir, al resolver un problema o situación.' },
  { id: 'generaliza', nombre: 'Generaliza', descripcion: 'Generaliza las funcionalidades o estructuras generales de un elemento que pueda aprovechar en otros contextos al resolver un problema o situación.' },
  { id: 'transfiere', nombre: 'Transfiere', descripcion: 'Transfiere conocimientos, habilidades y estrategias aprendidas previamente en un contexto específico, a situaciones diferentes y nuevas al resolver un problema o situación.' },
  { id: 'modulariza', nombre: 'Modulariza', descripcion: 'Resuelve un problema por partes menos complejas, sin perder de vista el todo que las origina, al resolver un problema o situación.' },
  { id: 'formula_algoritmos', nombre: 'Formula algoritmos', descripcion: 'Formula algoritmos por medio de una secuencia ordenada y detallada de pasos para resolver un problema o situación.' },
  { id: 'remezcla', nombre: 'Remezcla', descripcion: 'Combina diferentes ideas, técnicas o soluciones existentes, con la autorización correspondiente, de manera innovadora y creativa para resolver un problema o situación.' },
  { id: 'depura', nombre: 'Depura', descripcion: 'Valida el funcionamiento de los algoritmos en busca de errores para corregirlos al resolver un problema o situación.' },
  { id: 'programa', nombre: 'Programa', descripcion: 'Programa mediante un entorno o IDE de programación para resolver un problema o situación.' },
  { id: 'comunica', nombre: 'Comunica', descripcion: 'Comunica ideas o soluciones a problemas o situaciones de manera creativa, coherente y comprensible, compartiendo conocimientos con otros al resolver un problema o situación.' },
  { id: 'colabora', nombre: 'Colabora', descripcion: 'Demuestra un trato constructivo y respetuoso para resolver un problema o situación específica, al trabajar con otros y así apoyar su aprendizaje y contribuir al de los demás al resolver un problema o situación.' },
  { id: 'piensa_creativa', nombre: 'Piensa de forma creativa', descripcion: 'Desarrolla soluciones ingeniosas, innovadoras, originales con enfoques no convencionales, al resolver un problema o situación.' },
  { id: 'maneja_etica_segura', nombre: 'Maneja las tecnologías de forma ética y segura', descripcion: 'Aplica de manera consciente fundamentos de ética y seguridad digital al utilizar herramientas y recursos tecnológicos al resolver un problema o situación.' }
];

const ACTITUDES_PENSADOR_COMPUTACIONAL = [
  { id: 'gusto_precision', nombre: 'Gusto por la precisión', descripcion: 'Demuestra ante los procesos de aprendizaje un comportamiento hacia la búsqueda de la exactitud, al ser minucioso con los detalles.' },
  { id: 'aprender_error', nombre: 'Aprender del error', descripcion: 'Demuestra ante los errores un comportamiento que le permita ganar experiencia a partir de lecciones aprendidas producto de los errores, convirtiendo los desaciertos en oportunidades de aprendizaje.' },
  { id: 'flexibilidad_problemas', nombre: 'Flexibilidad para manejar problemas', descripcion: 'Demuestra un comportamiento hacia la adaptabilidad, flexibilidad y resiliencia ante los desafíos o situaciones imprevistas producto del entorno, la interacción con otros, o bien, con los recursos.' },
  { id: 'tolerancia_frustracion', nombre: 'Tolerancia a la frustración', descripcion: 'Demuestra ante los desafíos, un comportamiento hacia la búsqueda de la autoconfianza, motivación, autocontrol, paciencia y persistencia.' }
];

const AREAS_CONOCIMIENTO = [
  { id: 'apropiacion', nombre: 'Apropiación Tecnológica y Digital' },
  { id: 'programacion', nombre: 'Programación y Algoritmos' },
  { id: 'computacion_fisica', nombre: 'Computación Física y Robótica' },
  { id: 'ciencia_datos', nombre: 'Ciencia de Datos e Inteligencia Artificial' }
];

// ---------- FUNCIONES AUXILIARES ----------
function getNiveles() {
  return [
    { ciclo: 'Preescolar', nivel: 'Educación Preescolar', modulos: [1, 2] },
    { ciclo: 'I Ciclo', nivel: 'Primero', modulos: [1, 2] },
    { ciclo: 'I Ciclo', nivel: 'Segundo', modulos: [1, 2] },
    { ciclo: 'I Ciclo', nivel: 'Tercero', modulos: [1, 2] },
    { ciclo: 'II Ciclo', nivel: 'Cuarto', modulos: [1, 2] },
    { ciclo: 'II Ciclo', nivel: 'Quinto', modulos: [1, 2] },
    { ciclo: 'II Ciclo', nivel: 'Sexto', modulos: [1, 2] },
    { ciclo: 'III Ciclo', nivel: 'Sétimo', modulos: [1, 2] },
    { ciclo: 'III Ciclo', nivel: 'Octavo', modulos: [1, 2] },
    { ciclo: 'III Ciclo', nivel: 'Noveno', modulos: [1, 2] }
  ];
}

function getModulo(ciclo, nivel, moduloNumero) {
  // Busca en la estructura CURRICULO
  if (ciclo === 'Preescolar') {
    return CURRICULO.preescolar.find(m => m.nivel === nivel && m.modulo === moduloNumero);
  } else if (ciclo === 'I Ciclo' || ciclo === 'II Ciclo') {
    const nivelData = CURRICULO.primaria[nivel.toLowerCase()];
    return nivelData?.find(m => m.modulo === moduloNumero);
  } else if (ciclo === 'III Ciclo') {
    const nivelData = CURRICULO.secundaria[nivel.toLowerCase()];
    return nivelData?.find(m => m.modulo === moduloNumero);
  }
  return null;
}

// ---------- DATOS DEL PROYECTO (III Ciclo) ----------
const PROYECTO_ETAPAS = {
  inicial: {
    nombre: 'Etapa Inicial',
    porcentaje: 30,
    fases: ['Empatizar', 'Definir', 'Idear'],
    indicadoresEvaluacion: [
      {
        fase: 'Empatizar',
        indicadorLogro: 'Describir las necesidades, deseos y motivaciones de usuarios o clientes que tienen un problema o situación por resolver.',
        indicadorEvaluacion: 'Describe un problema o situación por resolver que es importante para un usuario o cliente. Registra los intereses y necesidades del usuario ante un problema o situación a resolver, por medio de entrevistas, observaciones, grabaciones, encuestas, entre otras.'
      },
      {
        fase: 'Definir',
        indicadorLogro: 'Sintetizar los hallazgos relacionados con los intereses y necesidades del usuario o cliente, de modo que se entienda con claridad el problema o situación a resolver.',
        indicadorEvaluacion: 'Sintetiza los intereses y necesidades del usuario o cliente en la construcción de un producto comunicativo.'
      },
      {
        fase: 'Idear',
        indicadorLogro: 'Seleccionar la idea más eficiente para ofrecer una posible solución a un problema o situación por resolver.',
        indicadorEvaluacion: 'Selecciona la idea que ofrezca la solución más eficiente para resolver el problema o situación. Justifica de manera clara, con al menos dos ideas, por qué la solución elegida es la más eficiente, comparándola con otras.'
      }
    ]
  },
  desarrollo: {
    nombre: 'Etapa de Desarrollo',
    porcentaje: 40,
    fases: ['Prototipar'],
    indicadoresEvaluacion: [
      {
        fase: 'Prototipar',
        indicadorLogro: 'Crear un prototipo tangible o una representación visual.',
        indicadorEvaluacion: 'El prototipo tangible o la representación visual debe ser realista y factible con los recursos actuales. Resuelve el problema o situación.'
      }
    ]
  },
  final: {
    nombre: 'Etapa Final',
    porcentaje: 30,
    fases: ['Probar/Evaluar'],
    indicadoresEvaluacion: [
      {
        fase: 'Probar/Evaluar',
        indicadorLogro: 'Evaluar el alcance del prototipo, qué funciona y qué no.',
        indicadorEvaluacion: 'Recopila retroalimentación de los usuarios o cliente, prueba la efectividad y mejora las soluciones antes de implementarlas.'
      }
    ]
  }
};

// ============================================
// CURRÍCULO COMPLETO
// ============================================
const CURRICULO = {
  preescolar: [
    // ----- Módulo 1 - Básico requerido -----
    {
      id: 'preescolar_mod1_basico',
      ciclo: 'Materno Infantil (Grupo Interactivo II) y Transición',
      nivel: 'Educación Preescolar',
      modulo: 1,
      nombre: 'Básico requerido',
      areas: [
        {
          areaId: 'apropiacion',
          rda: 'Identifica los dispositivos digitales considerando características funcionales, experimentando su utilidad y reconociendo la autoría, durante la accesibilidad, interacción y comunicación en la creación de recursos digitales.',
          saberesConceptuales: [
            {
              concepto: 'Computadora',
              indicadorLogro: 'Identificar qué es una **computadora** y algunas de sus características, a partir de experiencias prácticas de interacción con dispositivos digitales.'
            },
            {
              concepto: 'Software',
              indicadorLogro: 'Reconocer elementos visuales básicos de la interfaz de **software** (iconos, botones, ventanas), interactuando con ellos mediante el uso guiado de dispositivos digitales.'
            },
            {
              concepto: 'Herramientas de creación de contenido multimedia',
              indicadorLogro: 'Reconocer las **herramientas de creación de contenido multimedia** según su utilidad: editor gráfico, grabadora de audio y video, en la creación de recursos digitales.'
            }
          ]
        },
        {
          areaId: 'programacion',
          rda: 'Ordena secuencias integrando conceptos de programación como dato, evento, estado, ciclos, así como nociones de lateralidad y orientación espacial, en la solución de desafíos propuestos, utilizando la programación iconográfica por bloques.',
          saberesConceptuales: [
            {
              concepto: 'Entorno de programación iconográfico',
              indicadorLogro: 'Reconocer el entorno de programación iconográfico, interactuando con bloques de la interfaz, como desplazamiento, apariencia o sonido, mediante el uso guiado del docente.'
            },
            {
              concepto: 'Lateralidad y orientación espacial',
              indicadorLogro: 'Reconocer los conceptos de **lateralidad y orientación espacial** en la construcción de secuencias de acciones para la solución de retos de programación.'
            },
            {
              concepto: 'Evento',
              indicadorLogro: 'Reconocer que un **evento** desencadena una acción, identificando la relación de causa y efecto en juegos o actividades.'
            }
          ]
        }
      ]
    },
    // ----- Módulo 1 - Óptimo -----
    {
      id: 'preescolar_mod1_optimo',
      ciclo: 'Materno Infantil (Grupo Interactivo II) y Transición',
      nivel: 'Educación Preescolar',
      modulo: 1,
      nombre: 'Óptimo',
      areas: [
        {
          areaId: 'apropiacion',
          rda: 'Identifica los dispositivos digitales considerando características funcionales, experimentando su utilidad y reconociendo la autoría, durante la accesibilidad, interacción y comunicación en la creación de recursos digitales.',
          saberesConceptuales: [
            {
              concepto: 'Computadora',
              indicadorLogro: 'Identificar qué es una **computadora** y sus características funcionales, explorando su utilidad al interactuar con diversos dispositivos digitales.'
            },
            {
              concepto: 'Hardware',
              indicadorLogro: 'Reconocer componentes básicos del **hardware**, como dispositivos de entrada y salida de datos, explorando su función al encender, usar o interactuar con la computadora en actividades cotidianas.'
            },
            {
              concepto: 'Software',
              indicadorLogro: 'Reconocer elementos del **software** relacionados con la interfaz de usuario, como iconos, botones de minimizar, maximizar y cerrar, barra de tareas y área de trabajo, interactuando con ellos mediante el uso de dispositivos digitales.'
            },
            {
              concepto: 'Herramientas de creación de contenido multimedia',
              indicadorLogro: 'Seleccionar las **herramientas de creación de contenido multimedia** según su utilidad: editor gráfico, grabadora de audio y video en la creación de recursos digitales.'
            },
            {
              concepto: 'Internet',
              indicadorLogro: 'Reconocer qué es **Internet** y los requerimientos de un dispositivo para conectarse a Internet, realizando una exploración dirigida.'
            }
          ]
        },
        {
          areaId: 'programacion',
          rda: 'Ordena secuencias integrando conceptos de programación como dato, evento, estado, ciclos, así como nociones de lateralidad y orientación espacial, en la solución de desafíos propuestos, utilizando la programación iconográfica por bloques.',
          saberesConceptuales: [
            {
              concepto: 'Entorno de programación iconográfico',
              indicadorLogro: 'Reconocer el entorno de programación iconográfico, según su función con bloques de la interfaz, como desplazamiento, orientación, apariencia, evento, sonido y control, en actividades de creación digital guiada.'
            },
            {
              concepto: 'Lateralidad y orientación espacial',
              indicadorLogro: 'Reconocer los conceptos de **lateralidad y orientación espacial** en la construcción de secuencias de acciones para la solución de retos de programación.'
            },
            {
              concepto: 'Evento',
              indicadorLogro: 'Reconocer que un **evento** desencadena una acción, identificando la relación de causa y efecto en juegos o actividades.'
            }
          ]
        }
      ]
    },
    // ----- Módulo 2 - Básico requerido -----
    {
      id: 'preescolar_mod2_basico',
      ciclo: 'Materno Infantil (Grupo Interactivo II) y Transición',
      nivel: 'Educación Preescolar',
      modulo: 2,
      nombre: 'Básico requerido',
      areas: [
        {
          areaId: 'apropiacion',
          rda: 'Identifica los dispositivos digitales considerando características funcionales, experimentando su utilidad y reconociendo la autoría, durante la accesibilidad, interacción y comunicación en la creación de recursos digitales.',
          saberesConceptuales: [
            {
              concepto: 'Conexión entre dispositivos',
              indicadorLogro: 'Reconocer la **conexión entre dispositivos** por bluetooth y los requerimientos de dispositivos digitales para conectarse, a través de una exploración dirigida.'
            }
          ]
        },
        {
          areaId: 'programacion',
          rda: 'Ordena secuencias integrando conceptos de programación como dato, evento, estado, ciclos, así como nociones de lateralidad y orientación espacial, en la solución de desafíos propuestos, utilizando la programación iconográfica por bloques.',
          saberesConceptuales: [
            {
              concepto: 'Estado',
              indicadorLogro: 'Reconocer el concepto de **estado** programando objetos que modifican las propiedades de orientación y/o dirección.'
            },
            {
              concepto: 'Algoritmo',
              indicadorLogro: 'Reconocer el concepto de **algoritmo** mediante secuencias de acciones lógicas y ordenadas, en la construcción de soluciones a desafíos propuestos.'
            },
            {
              concepto: 'Dato (programación)',
              indicadorLogro: 'Reconocer la importancia del **dato** en contexto físico y en contexto digital mientras soluciona desafíos propuestos.'
            },
            {
              concepto: 'Estructuras repetitivas',
              indicadorLogro: 'Reconocer estructuras repetitivas en secuencias de acciones durante la programación guiada de objetos digitales, distinguiendo si una acción se repite un número limitado o ilimitado de veces.'
            }
          ]
        },
        {
          areaId: 'computacion_fisica',
          rda: 'Reconoce el funcionamiento de los robots, así como sus componentes (cuerpo, sistema sensorial, sistemas de control), al clasificarlos por su uso y programarlos para resolver retos.',
          saberesConceptuales: [
            {
              concepto: 'Robot',
              indicadorLogro: 'Reconocer qué es un **robot**, sus componentes y algunos de sus usos, mediante actividades lúdicas de exploración o programación guiada.'
            }
          ]
        },
        {
          areaId: 'ciencia_datos',
          rda: 'Reconoce los conceptos básicos relacionados con la recopilación, organización e interpretación de datos simples, mediante gráficos pictóricos en la resolución de problemas, fomentando el pensamiento crítico y la curiosidad hacia el mundo que lo rodea.',
          saberesConceptuales: [
            {
              concepto: 'Dato (Ciencias de datos)',
              indicadorLogro: 'Identificar el dato y su importancia en situaciones cotidianas, reconociendo diferentes tipos como texto, imagen, sonido o video.'
            },
            {
              concepto: 'Estrategias para presentar datos',
              indicadorLogro: 'Reconocer gráficos pictóricos como **estrategia para representar datos** recolectados en actividades lúdicas.'
            }
          ]
        }
      ]
    },
    // ----- Módulo 2 - Óptimo -----
    {
      id: 'preescolar_mod2_optimo',
      ciclo: 'Materno Infantil (Grupo Interactivo II) y Transición',
      nivel: 'Educación Preescolar',
      modulo: 2,
      nombre: 'Óptimo',
      areas: [
        {
          areaId: 'apropiacion',
          rda: 'Identifica los dispositivos digitales considerando características funcionales, experimentando su utilidad y reconociendo la autoría, durante la accesibilidad, interacción y comunicación en la creación de recursos digitales.',
          saberesConceptuales: [
            {
              concepto: 'Conexión entre dispositivos',
              indicadorLogro: 'Reconocer formas de **conexión entre dispositivos** por bluetooth y wifi, así como los requerimientos de dispositivos digitales para conectarse a través de una exploración dirigida.'
            }
          ]
        },
        {
          areaId: 'programacion',
          rda: 'Ordena secuencias integrando conceptos de programación como dato, evento, estado, ciclos, así como nociones de lateralidad y orientación espacial, en la solución de desafíos propuestos, utilizando la programación iconográfica por bloques.',
          saberesConceptuales: [
            {
              concepto: 'Estado',
              indicadorLogro: 'Reconocer el concepto de **estado** programando objetos que modifican las propiedades de orientación, dirección y/o tamaño.'
            },
            {
              concepto: 'Algoritmo',
              indicadorLogro: 'Reconocer patrones de repetición en secuencias lógicas y ordenadas, como parte de un **algoritmo**, al construir soluciones a desafíos propuestos.'
            },
            {
              concepto: 'Dato (programación)',
              indicadorLogro: 'Reconocer la importancia del **dato** en contexto físico y en contexto digital mientras soluciona desafíos propuestos.'
            },
            {
              concepto: 'Estructuras repetitivas',
              indicadorLogro: 'Identificar estructuras repetitivas en el contexto del ciclo finito e infinito, en el diseño de secuencias de programación.'
            }
          ]
        },
        {
          areaId: 'computacion_fisica',
          rda: 'Reconoce el funcionamiento de los robots, así como sus componentes (cuerpo, sistema sensorial, sistemas de control), al clasificarlos por su uso y programarlos para resolver retos.',
          saberesConceptuales: [
            {
              concepto: 'Robot',
              indicadorLogro: 'Reconocer qué es un **robot**, sus componentes y algunos de sus usos, mediante actividades lúdicas de exploración o programación guiada.'
            }
          ]
        },
        {
          areaId: 'ciencia_datos',
          rda: 'Reconoce los conceptos básicos relacionados con la recopilación, organización e interpretación de datos simples, mediante gráficos pictóricos en la resolución de problemas, fomentando el pensamiento crítico y la curiosidad hacia el mundo que lo rodea.',
          saberesConceptuales: [
            {
              concepto: 'Dato (Ciencias de datos)',
              indicadorLogro: 'Reconocer el dato según su tipo (texto, imagen, sonido o video) y su importancia al participar en actividades que le permiten organizar información.'
            },
            {
              concepto: 'Estrategias para presentar datos',
              indicadorLogro: 'Crear gráficos pictóricos como una **estrategia para representar datos** al resolver problemas que estimulen la curiosidad y el pensamiento crítico al analizarlos.'
            },
            {
              concepto: 'Visualización de datos',
              indicadorLogro: 'Interpretar gráficos pictóricos como parte de la **visualización de datos** (colores, formas, cantidades), con apoyo del docente, relacionándolos con datos conocidos del entorno.'
            },
            {
              concepto: 'Realidad aumentada',
              indicadorLogro: 'Experimentar con **realidad aumentada** en entornos físicos mediante actividades sensoriales y lúdicas, con acompañamiento del docente.'
            }
          ]
        }
      ]
    }
  ],
  primaria: {
    // Aquí iremos agregando los niveles de primaria
  },
  secundaria: {
    // Aquí iremos agregando los niveles de secundaria
  }
};

// Exponemos las constantes y el currículo globalmente
window.PRACTICAS_PENSADOR_COMPUTACIONAL = PRACTICAS_PENSADOR_COMPUTACIONAL;
window.ACTITUDES_PENSADOR_COMPUTACIONAL = ACTITUDES_PENSADOR_COMPUTACIONAL;
window.AREAS_CONOCIMIENTO = AREAS_CONOCIMIENTO;
window.CURRICULO = CURRICULO;
window.PROYECTO_ETAPAS = PROYECTO_ETAPAS;
window.getNiveles = getNiveles;
window.getModulo = getModulo;
