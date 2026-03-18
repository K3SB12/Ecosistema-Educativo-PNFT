// ============================================
// PNFT CURRÍCULO COMPLETO 2026
// ============================================

// ---------- CONSTANTES GLOBALES ----------
export const PRACTICAS_PENSADOR_COMPUTACIONAL = [
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

export const ACTITUDES_PENSADOR_COMPUTACIONAL = [
  { id: 'gusto_precision', nombre: 'Gusto por la precisión', descripcion: 'Demuestra ante los procesos de aprendizaje un comportamiento hacia la búsqueda de la exactitud, al ser minucioso con los detalles.' },
  { id: 'aprender_error', nombre: 'Aprender del error', descripcion: 'Demuestra ante los errores un comportamiento que le permita ganar experiencia a partir de lecciones aprendidas producto de los errores, convirtiendo los desaciertos en oportunidades de aprendizaje.' },
  { id: 'flexibilidad_problemas', nombre: 'Flexibilidad para manejar problemas', descripcion: 'Demuestra un comportamiento hacia la adaptabilidad, flexibilidad y resiliencia ante los desafíos o situaciones imprevistas producto del entorno, la interacción con otros, o bien, con los recursos.' },
  { id: 'tolerancia_frustracion', nombre: 'Tolerancia a la frustración', descripcion: 'Demuestra ante los desafíos, un comportamiento hacia la búsqueda de la autoconfianza, motivación, autocontrol, paciencia y persistencia.' }
];

export const AREAS_CONOCIMIENTO = [
  { id: 'apropiacion', nombre: 'Apropiación Tecnológica y Digital' },
  { id: 'programacion', nombre: 'Programación y Algoritmos' },
  { id: 'computacion_fisica', nombre: 'Computación Física y Robótica' },
  { id: 'ciencia_datos', nombre: 'Ciencia de Datos e Inteligencia Artificial' }
];

// ---------- FUNCIONES AUXILIARES ----------
export function getNiveles() {
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

export function getModulo(ciclo, nivel, moduloNumero) {
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
export const PROYECTO_ETAPAS = {
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
export const CURRICULO = {
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
  primaria: {}
};
// ============================================
// CURRÍCULO - PRIMARIA (I y II Ciclo)
// ============================================
CURRICULO.primaria = {
  primero: [
    // ----- Módulo 1 - Primero -----
    {
      id: 'primero_mod1',
      ciclo: 'I Ciclo',
      nivel: 'Primero',
      modulo: 1,
      areas: [
        {
          areaId: 'apropiacion',
          rda: 'Selecciona los dispositivos digitales y herramientas de productividad, mediante el uso de software y hardware, en la creación de archivos, creación y edición de multimedios, aprovechando Internet y respetando la propiedad intelectual en la realización de tareas para la accesibilidad a la información de forma segura y responsable.',
          saberesConceptuales: [
            {
              concepto: 'Computadora',
              indicadorLogro: 'Reconocer la **computadora** como una herramienta tecnológica, identificando sus características básicas, funciones e importancia en la vida cotidiana, por medio de la observación y manipulación práctica.'
            },
            {
              concepto: 'Hardware',
              indicadorLogro: 'Identificar el **hardware** básico de una computadora, reconociendo dispositivos de entrada, salida y las acciones de encendido y apagado, mediante actividades prácticas guiadas.'
            },
            {
              concepto: 'Software',
              indicadorLogro: 'Identificar el **software** de una computadora, reconociendo los elementos básicos de la interfaz de usuario mediante actividades prácticas guiadas.'
            }
          ]
        },
        {
          areaId: 'programacion',
          rda: 'Selecciona conceptos de programación como dato, secuencia, evento, estado, variables, operadores aritméticos y relacionales, condicionales simples, ciclo finito e infinito, en la programación por bloques para la solución de problemas.',
          saberesConceptuales: [
            {
              concepto: 'Entorno de programación iconográfico',
              indicadorLogro: 'Reconocer elementos básicos de un **entorno de programación iconográfico**, como bloques de desplazamiento, orientación, apariencia, sonido, eventos y control, mediante la navegación en la interfaz con actividades guiadas.'
            },
            {
              concepto: 'Reconocimiento de patrones',
              indicadorLogro: '**Reconocer patrones** de movimiento en secuencias de instrucciones simples para que un personaje siga una ruta desde un punto de inicio hasta un punto de llegada.'
            },
            {
              concepto: 'Estado',
              indicadorLogro: 'Reconocer el **estado** de un objeto digital en relación con su orientación, dirección y tamaño, identificando variaciones en dichos atributos, mediante secuencias de programaciones simples.'
            },
            {
              concepto: 'Algoritmo',
              indicadorLogro: 'Identificar un **algoritmo** en situaciones de la vida diaria, reconociendo secuencias lógicas y ordenadas de acciones, para ser representadas de forma analógica (dibujos, tarjetas, gestos) y/o digital (entorno iconográfico).'
            },
            {
              concepto: 'Evento',
              indicadorLogro: 'Reconocer el **evento** como relación de causa y efecto al participar en juegos analógicos, identificando cómo una acción provoca una respuesta o cambio observable durante la dinámica.'
            }
          ]
        }
      ]
    },
    // ----- Módulo 2 - Primero -----
    {
      id: 'primero_mod2',
      ciclo: 'I Ciclo',
      nivel: 'Primero',
      modulo: 2,
      areas: [
        {
          areaId: 'apropiacion',
          rda: 'Selecciona los dispositivos digitales y herramientas de productividad, mediante el uso de software y hardware, en la creación de archivos, creación y edición de multimedios, aprovechando Internet y respetando la propiedad intelectual en la realización de tareas para la accesibilidad a la información de forma segura y responsable.',
          saberesConceptuales: [
            {
              concepto: 'Herramientas de creación de contenido multimedia (audio, imágenes)',
              indicadorLogro: 'Utilizar **herramientas de creación de contenido multimedia** para la creación de audios e imágenes durante actividades guiadas de producción digital en el aula.'
            },
            {
              concepto: 'Conexión entre dispositivos (bluetooth)',
              indicadorLogro: 'Reconocer el bluetooth como medio de **conexión entre dispositivos** utilizando dispositivos digitales en el aula.'
            },
            {
              concepto: 'Internet',
              indicadorLogro: 'Reconocer los dispositivos y programas que permiten la conexión para la navegación en **Internet**.'
            }
          ]
        },
        {
          areaId: 'programacion',
          rda: 'Selecciona conceptos de programación como dato, secuencia, evento, estado, variables, operadores aritméticos y relacionales, condicionales simples, ciclo finito e infinito, en la programación por bloques para la solución de problemas.',
          saberesConceptuales: [
            {
              concepto: 'Estructuras repetitivas',
              indicadorLogro: 'Reconocer **estructuras repetitivas** al identificar ciclos finitos (como una canción o rutina) e infinitos (como el tic-tac del reloj o el movimiento del ventilador) en situaciones de la vida diaria.'
            },
            {
              concepto: 'Dato',
              indicadorLogro: 'Identificar el **dato** en situaciones de la vida diaria, reconociendo información valiosa en contextos físicos (como etiquetas, señales, objetos) y digitales (como imágenes, íconos o pantallas interactivas).'
            }
          ]
        },
        {
          areaId: 'ciencia_datos',
          rda: 'Reconoce los fundamentos de la inteligencia artificial y su presencia en la vida cotidiana, mediante ejemplos concretos como asistentes virtuales, valorando el uso seguro y responsable de estas tecnologías.',
          saberesConceptuales: [
            {
              concepto: 'Fundamentos de la IA',
              indicadorLogro: 'Reconocer los **fundamentos de la inteligencia artificial** a través de objetos o situaciones del entorno donde esta tecnología está presente, mediante actividades guiadas con apoyo visual o audiovisual.'
            },
            {
              concepto: 'Asistentes virtuales',
              indicadorLogro: 'Reconocer qué es un **asistente virtual** y sus funciones a partir de demostraciones guiadas o videos educativos.'
            }
          ]
        }
      ]
    }
  ],
  segundo: [
    // ----- Módulo 1 - Segundo -----
    {
      id: 'segundo_mod1',
      ciclo: 'I Ciclo',
      nivel: 'Segundo',
      modulo: 1,
      areas: [
        {
          areaId: 'apropiacion',
          rda: 'Selecciona los dispositivos digitales y herramientas de productividad, mediante el uso de software y hardware, en la creación de archivos, creación y edición de multimedios, aprovechando Internet y respetando la propiedad intelectual en la realización de tareas para la accesibilidad a la información de forma segura y responsable.',
          saberesConceptuales: [
            {
              concepto: 'Hardware',
              indicadorLogro: 'Identificar el funcionamiento de los componentes básicos del **hardware**, reconociendo cómo cuidarlos mientras utilizan la computadora en la cotidianidad.'
            },
            {
              concepto: 'Software (programas)',
              indicadorLogro: 'Explorar el funcionamiento de diferentes programas de **software** según la tarea escolar asignada durante el trabajo en aula.'
            },
            {
              concepto: 'Herramienta de productividad (procesador de texto)',
              indicadorLogro: 'Utilizar **herramientas de productividad** como el procesador de texto, reconociendo la cinta de opciones, pestañas y comandos básicos, así como sus funciones por teclado, durante la creación de textos sencillos.'
            },
            {
              concepto: 'Herramientas de creación de contenido multimedia (grabadora de audio y editores de gráficos)',
              indicadorLogro: 'Utilizar **herramientas de creación de contenido multimedia**, como la grabadora de audio y editores de gráficos, aplicando funciones básicas como crear, editar y guardar archivos, durante actividades guiadas de producción digital en el aula.'
            }
          ]
        },
        {
          areaId: 'programacion',
          rda: 'Selecciona conceptos de programación como dato, secuencia, evento, estado, variables, operadores aritméticos y relacionales, condicionales simples, ciclo finito e infinito, en la programación por bloques para la solución de problemas.',
          saberesConceptuales: [
            {
              concepto: 'Entorno de programación por bloques',
              indicadorLogro: 'Aplicar el uso del **entorno de programación por bloques**, explorando la interfaz y el área de bloques mientras construye secuencias de acciones que representen historias cotidianas.'
            },
            {
              concepto: 'Algoritmo',
              indicadorLogro: 'Diseñar un **algoritmo** en lenguaje natural como una secuencia ordenada que resuelve situaciones de la vida cotidiana.'
            },
            {
              concepto: 'Dato',
              indicadorLogro: 'Clasificar el **dato** como numérico o de texto en ejemplos de la vida cotidiana, valorando su uso en actividades del entorno cercano.'
            },
            {
              concepto: 'Variable',
              indicadorLogro: 'Identificar una **variable** en contextos de la vida cotidiana, observando elementos que cambian en relación con otros (como edad, cantidad, clima o tiempo de actividad).'
            },
            {
              concepto: 'Evento',
              indicadorLogro: 'Reconocer el **evento** en un entorno de programación por bloques que activa una acción o cambio visible en un objeto del programa.'
            }
          ]
        }
      ]
    },
    // ----- Módulo 2 - Segundo -----
    {
      id: 'segundo_mod2',
      ciclo: 'I Ciclo',
      nivel: 'Segundo',
      modulo: 2,
      areas: [
        {
          areaId: 'apropiacion',
          rda: 'Selecciona los dispositivos digitales y herramientas de productividad, mediante el uso de software y hardware, en la creación de archivos, creación y edición de multimedios, aprovechando Internet y respetando la propiedad intelectual en la realización de tareas para la accesibilidad a la información de forma segura y responsable.',
          saberesConceptuales: [
            {
              concepto: 'Conexión entre dispositivos (wifi)',
              indicadorLogro: 'Reconocer el wifi como medio de **conexión entre dispositivos** conectando dispositivos digitales en el aula.'
            },
            {
              concepto: 'Internet',
              indicadorLogro: 'Aplicar normas básicas de navegación por **internet**, para acceder a páginas educativas seguras, bajo acompañamiento del docente.'
            }
          ]
        },
        {
          areaId: 'programacion',
          rda: 'Selecciona conceptos de programación como dato, secuencia, evento, estado, variables, operadores aritméticos y relacionales, condicionales simples, ciclo finito e infinito, en la programación por bloques para la solución de problemas.',
          saberesConceptuales: [
            {
              concepto: 'Estructuras repetitivas',
              indicadorLogro: 'Identificar **estructuras repetitivas** en actividades programadas, diferenciando entre ciclos finitos e infinitos según la cantidad de repeticiones requeridas.'
            },
            {
              concepto: 'Estructuras condicionales (simples)',
              indicadorLogro: 'Aplicar **estructuras condicionales** simples en un entorno de programación por bloques en la resolución de un ejercicio programado.'
            },
            {
              concepto: 'Operadores aritméticos',
              indicadorLogro: 'Reconocer los **operadores aritméticos** de suma y resta en situaciones de la vida cotidiana y su uso en un entorno de programación por bloques.'
            },
            {
              concepto: 'Operador relacional',
              indicadorLogro: 'Reconocer el **operador relacional** "igual que" en situaciones de la vida cotidiana y su uso en un entorno de programación por bloques.'
            }
          ]
        },
        {
          areaId: 'ciencia_datos',
          rda: 'Reconoce los fundamentos de la inteligencia artificial y su presencia en la vida cotidiana, mediante ejemplos concretos como asistentes virtuales, valorando el uso seguro y responsable de estas tecnologías.',
          saberesConceptuales: [
            {
              concepto: 'Fundamentos de la IA',
              indicadorLogro: 'Describir los **fundamentos de la inteligencia artificial** en situaciones cotidianas, utilizando ejemplos guiados y preguntas orientadoras.'
            },
            {
              concepto: 'Asistentes virtuales',
              indicadorLogro: 'Reconocer el uso de **asistentes virtuales** en situaciones cotidianas, mediante ejemplos guiados que permitan la interacción.'
            }
          ]
        }
      ]
    }
  ],
  tercero: [
    // ----- Módulo 1 - Tercero -----
    {
      id: 'tercero_mod1',
      ciclo: 'I Ciclo',
      nivel: 'Tercero',
      modulo: 1,
      areas: [
        {
          areaId: 'apropiacion',
          rda: 'Selecciona los dispositivos digitales y herramientas de productividad, mediante el uso de software y hardware, en la creación de archivos, creación y edición de multimedios, aprovechando Internet y respetando la propiedad intelectual en la realización de tareas para la accesibilidad a la información de forma segura y responsable.',
          saberesConceptuales: [
            {
              concepto: 'Hardware (entrada, procesamiento, almacenamiento y salida)',
              indicadorLogro: 'Explicar las funciones básicas del **hardware** (entrada, procesamiento, almacenamiento y salida), en actividades prácticas con dispositivos computacionales en el aula.'
            },
            {
              concepto: 'Redes de comunicación',
              indicadorLogro: 'Describir qué son las **redes de comunicación** y cómo funciona una red local, a partir de la observación y la práctica de intercambio de información entre dispositivos conectados en el aula.'
            },
            {
              concepto: 'Gestión de archivos',
              indicadorLogro: 'Reconocer la **gestión de archivos** como proceso para la organización y clasificación de la información, mediante el uso de carpetas, subcarpetas y la exploración de archivos digitales.'
            },
            {
              concepto: 'Herramienta de productividad (editor de presentaciones)',
              indicadorLogro: 'Utilizar **herramientas de productividad**, como el editor de presentaciones, empleando la cinta de opciones, pestañas, comandos básicos y sus funciones por teclado en la elaboración de presentaciones digitales.'
            }
          ]
        },
        {
          areaId: 'programacion',
          rda: 'Selecciona conceptos de programación como dato, secuencia, evento, estado, variables, operadores aritméticos y relacionales, condicionales simples, ciclo finito e infinito, en la programación por bloques para la solución de problemas.',
          saberesConceptuales: [
            {
              concepto: 'Algoritmo',
              indicadorLogro: 'Reconocer la estructura y características de un **algoritmo** en diferentes representaciones, valorando el orden, inicio-fin y lógica de pasos en la solución de situaciones cotidianas.'
            },
            {
              concepto: 'Variable',
              indicadorLogro: 'Utilizar la gestión de una **variable** en un entorno de programación por bloques declarando su tipo, asignando valores y utilizando su contenido en la resolución de un ejercicio programado.'
            },
            {
              concepto: 'Operadores aritméticos',
              indicadorLogro: 'Utilizar **operadores aritméticos** de multiplicación y división y/o **operadores relacionales** como "menor que", "mayor que" o "igual que", en la resolución de un ejercicio programado.'
            },
            {
              concepto: 'Operadores relacionales',
              indicadorLogro: 'Utilizar **operadores aritméticos** de multiplicación y división y/o **operadores relacionales** como "menor que", "mayor que" o "igual que", en la resolución de un ejercicio programado.'
            }
          ]
        }
      ]
    },
    // ----- Módulo 2 - Tercero -----
    {
      id: 'tercero_mod2',
      ciclo: 'I Ciclo',
      nivel: 'Tercero',
      modulo: 2,
      areas: [
        {
          areaId: 'apropiacion',
          rda: 'Selecciona los dispositivos digitales y herramientas de productividad, mediante el uso de software y hardware, en la creación de archivos, creación y edición de multimedios, aprovechando Internet y respetando la propiedad intelectual en la realización de tareas para la accesibilidad a la información de forma segura y responsable.',
          saberesConceptuales: [
            {
              concepto: 'Herramientas de creación de contenido multimedia (video)',
              indicadorLogro: 'Aplicar **herramientas de creación de contenido multimedia** en la creación, edición y guardado de videos, para incorporarlos en sus producciones.'
            },
            {
              concepto: 'Navegador',
              indicadorLogro: 'Identificar el **navegador** como una herramienta digital, reconociendo sus partes y usos en actividades de exploración guiada por el docente.'
            },
            {
              concepto: 'Buscador',
              indicadorLogro: 'Identificar el **buscador** como una herramienta digital para acceder a información, distinguiendo sitios confiables y no confiables durante la exploración dirigida en buscadores infantiles.'
            },
            {
              concepto: 'Netiqueta',
              indicadorLogro: 'Identificar normas básicas de **netiqueta** que deben seguir al participar en diferentes procesos de comunicación.'
            },
            {
              concepto: 'Comunicación y colaboración sincrónica y asincrónica',
              indicadorLogro: 'Identificar el correo electrónico como una herramienta de **comunicación asincrónica**, reconociendo sus características y su uso en actividades digitales guiadas.'
            },
            {
              concepto: 'Huella Digital',
              indicadorLogro: 'Reconocer qué es la **huella digital** y cómo puede afectar su privacidad y seguridad en línea, identificando que sus acciones en Internet dejan rastros que deben cuidarse.'
            },
            {
              concepto: 'Software malicioso',
              indicadorLogro: 'Reconocer el virus informático como un tipo de **software malicioso**, explicando de forma sencilla sus consecuencias, como pérdida de información o mal funcionamiento en los dispositivos.'
            },
            {
              concepto: 'Riesgos en línea',
              indicadorLogro: 'Reconocer algunos **riesgos en línea** como los perfiles falsos, la pérdida de privacidad, el contacto con extraños y la adicción al uso de dispositivos, identificando medidas básicas para protegerse en estas situaciones.'
            },
            {
              concepto: 'Medidas de seguridad web',
              indicadorLogro: 'Reconocer el control parental como una **medida de seguridad web** en el uso de Internet que protege frente a riesgos y limita el acceso a contenido inapropiado.'
            }
          ]
        },
        {
          areaId: 'ciencia_datos',
          rda: 'Reconoce los fundamentos de la inteligencia artificial y su presencia en la vida cotidiana, mediante ejemplos concretos como asistentes virtuales, valorando el uso seguro y responsable de estas tecnologías.',
          saberesConceptuales: [
            {
              concepto: 'Desafíos de la IA',
              indicadorLogro: 'Identificar los **desafíos de la inteligencia artificial** en la vida cotidiana y algunas recomendaciones para su uso seguro y responsable, con la ayuda de ejemplos guiados.'
            }
          ]
        }
      ]
    }
  ],
  cuarto: [
    // ----- Módulo 1 - Cuarto -----
    {
      id: 'cuarto_mod1',
      ciclo: 'II Ciclo',
      nivel: 'Cuarto',
      modulo: 1,
      areas: [
        {
          areaId: 'apropiacion',
          rda: 'Selecciona la configuración de programas locales y en línea para su correcto uso al crear, buscar, compartir, organizar y administrar información en la realización de diferentes tareas de manera comprensiva, segura y responsable.',
          saberesConceptuales: [
            {
              concepto: 'Hardware',
              indicadorLogro: 'Clasificar componentes de **hardware** según su función, distinguiendo entre dispositivos computacionales (computadoras de escritorio, portátiles, teléfonos inteligentes, tabletas) y periféricos (parlantes, micrófonos, audífonos, impresora, cámara, dispositivos de almacenamiento local), en función de su uso en contextos cotidianos.'
            },
            {
              concepto: 'Software',
              indicadorLogro: 'Reconocer el **software** identificando sus tipos (de sistema, de aplicación y utilitarios), valorando su función en el uso cotidiano de dispositivos tecnológicos.'
            },
            {
              concepto: 'Redes de comunicación',
              indicadorLogro: 'Reconocer las **redes de comunicación** identificando la funcionalidad y aplicación de una red local en el intercambio de información entre dispositivos en contextos escolares y/o del hogar.'
            },
            {
              concepto: 'Conexión entre dispositivos',
              indicadorLogro: 'Reconocer la **conexión entre dispositivos** identificando si es física (cableada) o inalámbrica (bluetooth, wifi), según el uso en su entorno cercano.'
            },
            {
              concepto: 'Gestión de archivos',
              indicadorLogro: 'Organizar archivos y carpetas, aplicando acciones básicas como crear, mover, copiar, renombrar y eliminar, en un entorno de sistema operativo para la **gestión de archivos**.'
            },
            {
              concepto: 'Herramienta de productividad (procesador de texto, editor de presentaciones)',
              indicadorLogro: 'Utilizar **herramientas de productividad**, como el procesador de texto y/o editor de presentaciones, en la creación de contenidos que incluyan texto, imágenes y formatos básicos, en función de una consigna dada.'
            }
          ]
        },
        {
          areaId: 'programacion',
          rda: 'Crea algoritmos que integran los conceptos de programación como secuencia, evento, estructuras de control (condicionales simples y ciclos), en la solución a problemas del contexto mediante la programación por bloques.',
          saberesConceptuales: [
            {
              concepto: 'Entorno de programación por bloques',
              indicadorLogro: 'Utilizar el **entorno de programación por bloques**, explorando la interfaz y organizando bloques en el área de programación en la resolución de retos programados.'
            },
            {
              concepto: 'Estado',
              indicadorLogro: 'Identificar el concepto de **estado**, reconociendo cambios en las propiedades de orientación, dirección y tamaño de objetos en la creación de un producto programado.'
            },
            {
              concepto: 'Algoritmo (pseudocódigo)',
              indicadorLogro: 'Hacer uso de **algoritmos** en pseudocódigo utilizando instrucciones de forma lógica y estructurada en la solución de un producto programado.'
            },
            {
              concepto: 'Dato',
              indicadorLogro: 'Organizar **datos** tipo numérico y de texto, reconociendo su uso en situaciones cotidianas.'
            },
            {
              concepto: 'Variable',
              indicadorLogro: 'Gestionar una **variable** en la resolución de ejercicios a través de algoritmos o actividades programadas.'
            },
            {
              concepto: 'Estructuras repetitivas',
              indicadorLogro: 'Utilizar **estructuras repetitivas** en pseudocódigo o programación por bloques, resolviendo ejercicios que requieran repeticiones controladas.'
            },
            {
              concepto: 'Eventos',
              indicadorLogro: 'Utilizar **eventos** en pseudocódigo o programación para el control de acciones y reacciones de objetos dentro de un programa, comprendiendo su relación de causa y efecto.'
            }
          ]
        }
      ]
    },
    // ----- Módulo 2 - Cuarto -----
    {
      id: 'cuarto_mod2',
      ciclo: 'II Ciclo',
      nivel: 'Cuarto',
      modulo: 2,
      areas: [
        {
          areaId: 'apropiacion',
          rda: 'Selecciona la configuración de programas locales y en línea para su correcto uso al crear, buscar, compartir, organizar y administrar información en la realización de diferentes tareas de manera comprensiva, segura y responsable.',
          saberesConceptuales: [
            {
              concepto: 'Herramientas de creación de contenido multimedia (Editor gráfico)',
              indicadorLogro: 'Aplicar **herramientas de creación de contenido multimedia**, como el editor gráfico, utilizando funciones básicas de creación, edición y guardado de imágenes en la elaboración de productos digitales.'
            },
            {
              concepto: 'Navegador',
              indicadorLogro: 'Utilizar **navegadores** y **buscadores** web en la búsqueda de información en internet siguiendo una consigna dada.'
            },
            {
              concepto: 'Buscador',
              indicadorLogro: 'Utilizar **navegadores** y **buscadores** web en la búsqueda de información en internet siguiendo una consigna dada.'
            },
            {
              concepto: 'Internet',
              indicadorLogro: 'Identificar dispositivos que se conectan a **internet** describiendo sus funciones básicas en el contexto de situaciones cotidianas o escolares.'
            },
            {
              concepto: 'Netiqueta',
              indicadorLogro: 'Aplicar normas de **netiqueta** durante la interacción en entornos digitales, reconociendo el tono apropiado, la cortesía y el respeto hacia otros usuarios en actividades de comunicación sincrónica y asincrónica.'
            },
            {
              concepto: 'Comunicación y colaboración sincrónica y asincrónica (chat)',
              indicadorLogro: 'Identificar el chat como una herramienta de **comunicación y colaboración sincrónica y asincrónica**, reconociendo sus características y su uso en actividades digitales guiadas.'
            },
            {
              concepto: 'Huella digital',
              indicadorLogro: 'Identificar los usos e implicaciones de la **huella digital**, reconociendo cómo las acciones realizadas en entornos digitales dejan rastros permanentes relacionados con la privacidad y reputación en línea.'
            },
            {
              concepto: 'Contraseñas seguras',
              indicadorLogro: 'Identificar qué es una **contraseña segura** y sus elementos básicos, reconociendo su importancia en la protección de cuentas y datos personales en entornos digitales.'
            },
            {
              concepto: 'Hackeo',
              indicadorLogro: 'Identificar qué es **hackeo**, phishing y conexiones inseguras (como redes wifi públicas), reconociendo situaciones comunes donde pueden presentarse riesgos para la seguridad digital.'
            },
            {
              concepto: 'Software malicioso',
              indicadorLogro: 'Identificar qué es un virus informático como un tipo de **software malicioso**, reconociendo los riesgos que representan para la información y el funcionamiento de los dispositivos.'
            },
            {
              concepto: 'Antivirus',
              indicadorLogro: 'Identificar la función y características de un **antivirus**, reconociendo su importancia en la protección de dispositivos digitales utilizados.'
            }
          ]
        },
        {
          areaId: 'programacion',
          rda: 'Crea algoritmos que integran los conceptos de programación como secuencia, evento, estructuras de control (condicionales simples y ciclos), en la solución a problemas del contexto mediante la programación por bloques.',
          saberesConceptuales: [
            {
              concepto: 'Estructuras condicionales',
              indicadorLogro: 'Utilizar **estructuras condicionales** simples y compuestas en pseudocódigo o programación, en la ejecución de instrucciones cuando se cumple una condición específica.'
            },
            {
              concepto: 'Operadores aritméticos',
              indicadorLogro: 'Utilizar **operadores aritméticos** de suma, resta, multiplicación y división en pseudocódigo o programación, resolviendo ejercicios que involucren cálculos automáticos.'
            },
            {
              concepto: 'Operadores relacionales',
              indicadorLogro: 'Utilizar **operadores relacionales** en pseudocódigo o programación, comparando valores en la toma de decisiones dentro del programa.'
            }
          ]
        },
        {
          areaId: 'ciencia_datos',
          rda: 'Reconoce cómo se usa la inteligencia artificial; cómo mediante técnicas básicas se recolectan, analizan y representan los datos en tablas y gráficos sencillos.',
          saberesConceptuales: [
            {
              concepto: 'Fundamentos de la IA',
              indicadorLogro: 'Identificar los **fundamentos de la inteligencia artificial**, reconociendo cómo aprende, toma decisiones y se diferencia de otros sistemas automatizados en contextos cotidianos.'
            },
            {
              concepto: 'Asistentes virtuales',
              indicadorLogro: 'Explicar el aporte de los **asistentes virtuales** en situaciones cotidianas, mediante el análisis de ejemplos visuales, simulaciones o actividades guiadas en clase.'
            }
          ]
        }
      ]
    }
  ],
  quinto: [
    // ----- Módulo 1 - Quinto -----
    {
      id: 'quinto_mod1',
      ciclo: 'II Ciclo',
      nivel: 'Quinto',
      modulo: 1,
      areas: [
        {
          areaId: 'apropiacion',
          rda: 'Selecciona la configuración de programas locales y en línea para su correcto uso al crear, buscar, compartir, organizar y administrar información en la realización de diferentes tareas de manera comprensiva, segura y responsable.',
          saberesConceptuales: [
            {
              concepto: 'Hardware',
              indicadorLogro: 'Identificar dispositivos de **hardware** de entrada y salida mixtos como la impresora multifuncional y las pantallas interactivas, reconociendo su funcionamiento y aplicaciones de computación embebida en contextos cotidianos.'
            },
            {
              concepto: 'Software',
              indicadorLogro: 'Identificar la funcionalidad y el propósito de los diferentes **softwares** de ofimática, reconociendo su utilidad en distintos tipos de archivos digitales escolares.'
            },
            {
              concepto: 'Conexión entre dispositivos',
              indicadorLogro: 'Identificar las formas de **conexión entre dispositivos**, comprendiendo los tipos de comunicación (física e inalámbrica) y reconociendo métodos básicos para la transmisión de archivos en situaciones cotidianas.'
            },
            {
              concepto: 'Sistema operativo',
              indicadorLogro: 'Identificar la funcionalidad del escritorio en un **sistema operativo**, reconociendo los elementos básicos de la barra de tareas como altavoces, auriculares, estado de la batería y control de audio, durante el uso cotidiano.'
            },
            {
              concepto: 'Herramienta de productividad (hoja de cálculo)',
              indicadorLogro: 'Identificar la funcionalidad de la hoja de cálculo como **herramienta de productividad**, aplicando opciones de edición y formato para la organización y registro de información.'
            },
            {
              concepto: 'Herramientas de creación de contenido multimedia (audio y video)',
              indicadorLogro: 'Elaborar contenido (audio y/o video) aplicando **herramientas de creación y edición de contenido multimedia** disponibles para integrarlos en las producciones digitales.'
            }
          ]
        },
        {
          areaId: 'programacion',
          rda: 'Crea algoritmos que integran los conceptos de programación como secuencia, evento, estructuras de control (condicionales simples y ciclos), en la solución a problemas del contexto mediante la programación por bloques.',
          saberesConceptuales: [
            {
              concepto: 'Entorno de programación por bloques para computación física',
              indicadorLogro: 'Utilizar el **entorno de programación por bloques para computación física**, explorando la interfaz y organizando bloques en el área de programación en la resolución de retos programados.'
            },
            {
              concepto: 'Lógica de programación',
              indicadorLogro: 'Reconocer proposiciones como afirmaciones verdaderas o falsas en el contexto de la **lógica de programación.**'
            },
            {
              concepto: 'Algoritmo (diagrama de flujo)',
              indicadorLogro: 'Aplicar mediante diagramas de flujo un **algoritmo**, utilizando símbolos y secuencias lógicas durante la solución de desafíos.'
            }
          ]
        },
        {
          areaId: 'computacion_fisica',
          rda: 'Crea algoritmos que permiten la simulación de comportamientos de aparatos tecnológicos, aplicando elementos de la computación física, programación y electrónica para la resolución de un problema.',
          saberesConceptuales: [
            {
              concepto: 'Computación física',
              indicadorLogro: 'Reconocer los componentes básicos de la **computación física**, como el microcontrolador, sensores, actuadores y el entorno de programación, relacionándolos con sus usos y aplicaciones en contextos cotidianos.'
            },
            {
              concepto: 'Circuito eléctrico',
              indicadorLogro: 'Identificar componentes básicos de un **circuito eléctrico**, reconociendo su tipo, el flujo de corriente, la polaridad y la función del interruptor durante la construcción o simulación de prototipos.'
            },
            {
              concepto: 'Fundamentos de electrónica',
              indicadorLogro: 'Identificar **fundamentos de electrónica,** reconociendo la función de los pines de entrada y salida, así como la diferencia entre señales analógicas y digitales durante la construcción o simulación de circuitos.'
            },
            {
              concepto: 'Microcontrolador',
              indicadorLogro: 'Reconocer el funcionamiento básico de un **microcontrolador**, identificando los pines digitales y analógicos, la placa de expansión y la comunicación entre el programa y la tarjeta a través de actividades prácticas o simuladas.'
            }
          ]
        },
        {
          areaId: 'ciencia_datos',
          rda: 'Reconoce cómo se usa la inteligencia artificial; cómo mediante técnicas básicas se recolectan, analizan y representan los datos en tablas y gráficos sencillos.',
          saberesConceptuales: [
            {
              concepto: 'Herramientas generativas',
              indicadorLogro: 'Reconocer **herramientas digitales generativas** (texto, imagen o audio) que producen contenido a partir de instrucciones sencillas, identificando su aplicación en actividades cotidianas de forma ética y segura.'
            },
            {
              concepto: 'Desafíos de la IA',
              indicadorLogro: 'Reconocer **desafíos de la inteligencia artificial** relacionados con la protección de la información personal sensible, cuando se realizan actividades con herramientas digitales.'
            }
          ]
        }
      ]
    },
    // ----- Módulo 2 - Quinto -----
    {
      id: 'quinto_mod2',
      ciclo: 'II Ciclo',
      nivel: 'Quinto',
      modulo: 2,
      areas: [
        {
          areaId: 'apropiacion',
          rda: 'Selecciona la configuración de programas locales y en línea para su correcto uso al crear, buscar, compartir, organizar y administrar información en la realización de diferentes tareas de manera comprensiva, segura y responsable.',
          saberesConceptuales: [
            {
              concepto: 'Herramienta de productividad (hoja de cálculo)',
              indicadorLogro: 'Identificar la funcionalidad de la hoja de cálculo como **herramienta de productividad**, aplicando opciones de edición y formato para la organización y registro de información.'
            },
            {
              concepto: 'Buscador',
              indicadorLogro: 'Realizar búsquedas eficientes en internet utilizando un **buscador**, aplicando filtros y comandos básicos, y reconociendo dominios confiables (.edu, .go, .org, .com) durante la selección de información relevante.'
            },
            {
              concepto: 'Derechos de autor',
              indicadorLogro: 'Reconocer qué es **derecho de autor** y cómo incorporarlo en sus producciones, evitando el plagio al citar adecuadamente las fuentes utilizadas.'
            }
          ]
        },
        {
          areaId: 'programacion',
          rda: 'Crea algoritmos que integran los conceptos de programación como secuencia, evento, estructuras de control (condicionales simples y ciclos), en la solución a problemas del contexto mediante la programación por bloques.',
          saberesConceptuales: [
            {
              concepto: 'Dato (programación y algoritmos)',
              indicadorLogro: 'Utilizar **datos** tipo booleano en la resolución de problemas en entornos de programación, reconociendo su función en la toma de decisiones.'
            },
            {
              concepto: 'Variable',
              indicadorLogro: 'Aplicar la gestión de **variables** en programación, modificando su valor durante la ejecución de algoritmos.'
            },
            {
              concepto: 'Colección de datos',
              indicadorLogro: 'Organizar datos en programación mediante el uso de listas o agrupaciones de elementos con características comunes, como parte del desarrollo de una **colección de datos**.'
            },
            {
              concepto: 'Estructuras condicionales',
              indicadorLogro: 'Aplicar **estructuras condicionales** múltiples en diagramas de flujo o programación para ejecutar diferentes acciones según varias condiciones establecidas.'
            },
            {
              concepto: 'Operadores lógicos',
              indicadorLogro: 'Reconocer **operadores lógicos** de conjunción (Y) y disyunción (O) en la resolución de problemas, representando condiciones que deben cumplirse de manera conjunta o alternativa.'
            },
            {
              concepto: 'Procedimientos/funciones',
              indicadorLogro: 'Reconocer **procedimientos o funciones** en programación, comprendiendo cómo se declaran, invocan y se usan parámetros y argumentos en la resolución de un problema.'
            }
          ]
        },
        {
          areaId: 'computacion_fisica',
          rda: 'Crea algoritmos que permiten la simulación de comportamientos de aparatos tecnológicos, aplicando elementos de la computación física, programación y electrónica para la resolución de un problema.',
          saberesConceptuales: [
            {
              concepto: 'Sensor',
              indicadorLogro: 'Identificar **sensores** integrados y externos, reconociendo su funcionamiento y la forma de conectarlos a VCC y GND durante la exploración o construcción de prototipos.'
            },
            {
              concepto: 'Actuador',
              indicadorLogro: 'Identificar **actuadores** integrados y externos, reconociendo cómo se conectan a VCC y GND mientras generan una salida física en prototipos.'
            },
            {
              concepto: 'Domótica',
              indicadorLogro: 'Identificar usos y aplicaciones de la **domótica**, reconociendo cómo la automatización mejora la comodidad y eficiencia en entornos cotidianos.'
            }
          ]
        },
        {
          areaId: 'ciencia_datos',
          rda: 'Reconoce cómo se usa la inteligencia artificial; cómo mediante técnicas básicas se recolectan, analizan y representan los datos en tablas y gráficos sencillos.',
          saberesConceptuales: [
            {
              concepto: 'Dato (Ciencias de datos)',
              indicadorLogro: 'Identificar el **dato** de tipo numérico y de texto en situaciones cotidianas, a partir del registro de información que evidencie su utilidad.'
            },
            {
              concepto: 'Recolección de datos',
              indicadorLogro: 'Reconocer **técnicas de recolección** de datos según el tipo de información que se desea obtener en situaciones cotidianas.'
            },
            {
              concepto: 'Almacenamiento de datos',
              indicadorLogro: 'Identificar formas de **almacenamiento de datos**, reconociendo cómo se utilizan archivos locales y hojas de cálculo en la organización de información relevante en contextos cotidianos.'
            },
            {
              concepto: 'Visualización de datos',
              indicadorLogro: 'Identificar la **visualización de datos** mediante formas de representación como gráficos o tablas cuando se observan ejemplos en situaciones cotidianas.'
            },
            {
              concepto: 'Estrategias para presentar datos',
              indicadorLogro: 'Reconocer las tablas como una **estrategia para presentar datos** organizadamente, a partir de información recolectada en situaciones cotidianas.'
            }
          ]
        }
      ]
    }
  ],
  sexto: [
    // ----- Módulo 1 - Sexto -----
    {
      id: 'sexto_mod1',
      ciclo: 'II Ciclo',
      nivel: 'Sexto',
      modulo: 1,
      areas: [
        {
          areaId: 'apropiacion',
          rda: 'Selecciona la configuración de programas locales y en línea para su correcto uso al crear, buscar, compartir, organizar y administrar información en la realización de diferentes tareas de manera comprensiva, segura y responsable.',
          saberesConceptuales: [
            {
              concepto: 'Hardware',
              indicadorLogro: 'Analizar las funciones de los componentes internos del **hardware** como la memoria RAM, tarjeta madre, disco duro, microprocesador y tarjetas de red, video y sonido, comprendiendo cómo estas características definen el rendimiento del equipo.'
            },
            {
              concepto: 'Conexión entre dispositivos',
              indicadorLogro: 'Explicar cómo las direcciones IP permiten la **conexión entre dispositivos** y su comunicación dentro de una red local o en internet, comprendiendo su función en situaciones cotidianas.'
            },
            {
              concepto: 'Redes de comunicación',
              indicadorLogro: 'Describir diferentes tipos de **redes de comunicación** (red fija telefónica, red móvil, red de televisión por cable y red satelital), valorando sus beneficios y desafíos en el acceso y transmisión de información en diferentes contextos.'
            },
            {
              concepto: 'Gestión de archivos',
              indicadorLogro: 'Analizar la **gestión de archivos** considerando las propiedades de los archivos digitales (tamaño, tipo y extensión) y aplicando procesos de compresión y descompresión, mejorando así el almacenamiento y la transferencia de datos.'
            },
            {
              concepto: 'Sistema operativo',
              indicadorLogro: 'Identificar la funcionalidad del escritorio en un **sistema operativo**, reconociendo los elementos básicos de la barra de tareas como altavoces, auriculares, estado de la batería y control de audio, durante el uso cotidiano.'
            },
            {
              concepto: 'Herramientas de creación de contenido multimedia',
              indicadorLogro: 'Crear contenido (imagen, audio y/o video) con **herramientas de creación de contenido multimedia** disponibles para integrarlos en las producciones digitales.'
            }
          ]
        },
        {
          areaId: 'programacion',
          rda: 'Crea algoritmos que integran los conceptos de programación como secuencia, evento, estructuras de control (condicionales simples y ciclos), en la solución a problemas del contexto mediante la programación por bloques.',
          saberesConceptuales: [
            {
              concepto: 'Lógica de programación (tablas de verdad)',
              indicadorLogro: 'Aplicar la **lógica de programación** (tablas de verdad) con operadores de conjunción y disyunción, evaluando condiciones en algoritmos para la resolución de desafíos de programación.'
            },
            {
              concepto: 'Procedimientos/funciones',
              indicadorLogro: 'Emplear **procedimientos o funciones** (declaración, invocación, parámetros y argumentos) en la resolución de ejercicios programados.'
            }
          ]
        },
        {
          areaId: 'computacion_fisica',
          rda: 'Crea algoritmos que permiten la simulación de comportamientos de aparatos tecnológicos, aplicando elementos de la computación física, programación y electrónica para la resolución de un problema.',
          saberesConceptuales: [
            {
              concepto: 'Computación física',
              indicadorLogro: 'Aplicar la **computación física** en la creación de soluciones automatizadas, como respuesta a necesidades concretas del entorno cotidiano.'
            },
            {
              concepto: 'Prototipos',
              indicadorLogro: 'Diseñar **prototipos** de sistemas automatizados, aplicando conocimientos de computación física para resolver necesidades concretas.'
            }
          ]
        }
      ]
    },
    // ----- Módulo 2 - Sexto -----
    {
      id: 'sexto_mod2',
      ciclo: 'II Ciclo',
      nivel: 'Sexto',
      modulo: 2,
      areas: [
        {
          areaId: 'apropiacion',
          rda: 'Selecciona la configuración de programas locales y en línea para su correcto uso al crear, buscar, compartir, organizar y administrar información en la realización de diferentes tareas de manera comprensiva, segura y responsable.',
          saberesConceptuales: [
            {
              concepto: 'Herramienta de productividad',
              indicadorLogro: 'Utilizar la **herramienta de productividad** seleccionando entre opciones de ofimática local o en línea, según el contexto de uso, la conectividad o necesidad de colaboración.'
            },
            {
              concepto: 'Internet',
              indicadorLogro: 'Identificar el funcionamiento básico de **Internet**, reconociendo cómo se establece la conectividad y el rol de los proveedores de servicios en la navegación web desde dispositivos.'
            },
            {
              concepto: 'Comunicación y colaboración sincrónica y asincrónica',
              indicadorLogro: 'Aplicar la **comunicación y colaboración sincrónica y asincrónica** en la creación de documentos, organización de carpetas y gestión del correo electrónico.'
            },
            {
              concepto: 'Almacenamiento en la nube',
              indicadorLogro: 'Crear archivos digitales en plataformas de **almacenamiento en la nube,** configurando los permisos de uso compartido para facilitar la colaboración en actividades escolares.'
            },
            {
              concepto: 'Referencias bibliográficas',
              indicadorLogro: 'Aplicar un formato básico de **referencias bibliográficas** (autor, título, fuente y año) en las producciones, valorando la atribución de las fuentes utilizadas.'
            },
            {
              concepto: 'Internet de las cosas',
              indicadorLogro: 'Reconocer aplicaciones del **Internet de las Cosas (IoT)** en la cotidianidad, identificando dispositivos inteligentes conectados que interactúan entre sí.'
            },
            {
              concepto: 'Moneda virtual',
              indicadorLogro: 'Reconocer la utilidad e implicaciones básicas de las **monedas virtuales**, identificando situaciones donde pueden usarse y los riesgos asociados a su manejo en contextos diferentes.'
            },
            {
              concepto: 'Huella digital',
              indicadorLogro: 'Aplicar medidas básicas para proteger la privacidad en línea, gestionando su **huella digital** mediante el control de información compartida y el uso responsable de plataformas virtuales.'
            },
            {
              concepto: 'Contraseñas seguras',
              indicadorLogro: 'Reconocer la importancia de las **contraseñas seguras**, aplicando estrategias básicas como el uso de doble factor para la protección de cuentas personales en entornos digitales.'
            },
            {
              concepto: 'Software malicioso',
              indicadorLogro: 'Identificar las formas comunes de propagación de **software malicioso** (virus informáticos) y estrategias básicas de prevención, reconociendo situaciones de riesgo al usar archivos, plataformas o dispositivos digitales.'
            },
            {
              concepto: 'Riesgos en línea',
              indicadorLogro: 'Identificar **riesgos en línea** como ciberacoso, contenido inapropiado y suplantación de identidad, aplicando protocolos de riesgo en entornos digitales.'
            },
            {
              concepto: 'Medidas de seguridad en la web',
              indicadorLogro: 'Identificar **medidas de seguridad en la web**, comprendiendo la diferencia entre HTTPS y HTTP y la importancia de lectura de los términos y condiciones antes de aceptar.'
            }
          ]
        },
        {
          areaId: 'ciencia_datos',
          rda: 'Reconoce cómo se usa la inteligencia artificial; cómo mediante técnicas básicas se recolectan, analizan y representan los datos en tablas y gráficos sencillos.',
          saberesConceptuales: [
            {
              concepto: 'Dato (registros)',
              indicadorLogro: 'Aplicar registros como **datos** relevantes, organizando información en tablas a partir de gastos, notas, actividades deportivas o registros básicos de salud.'
            },
            {
              concepto: 'Recolección de datos',
              indicadorLogro: 'Seleccionar **técnicas de recolección** de datos aplicándolas según el tipo de información que se desea obtener en situaciones cotidianas.'
            },
            {
              concepto: 'Almacenamientos de datos',
              indicadorLogro: 'Aplicar formas de **almacenamiento de datos** como archivos locales o en línea y herramientas digitales como hojas de cálculo, organizando información recolectada.'
            },
            {
              concepto: 'Estrategias para presentar datos',
              indicadorLogro: 'Crear gráficos de barras o lineales a partir de datos, aplicando **estrategias para representar datos** en la comunicación de información relevante.'
            },
            {
              concepto: 'Visualización de datos',
              indicadorLogro: 'Aplicar técnicas de **visualización de datos**, creando representaciones gráficas simples como gráficos pictóricos o de barras para comunicar información.'
            }
          ]
        }
      ]
    }
  ]
};
// ============================================
// CURRÍCULO - SECUNDARIA (III Ciclo)
// ============================================
CURRICULO.secundaria = {
  setimo: [
    // ----- Módulo 1 - Sétimo -----
    {
      id: 'setimo_mod1',
      ciclo: 'III Ciclo',
      nivel: 'Sétimo',
      modulo: 1,
      areas: [
        {
          areaId: 'apropiacion',
          rda: 'Combina herramientas digitales, tomando en cuenta fundamentos de tecnología, impacto de las TIC, seguridad y privacidad digital y, su experiencia de uso, en la realización de productos digitales.',
          saberesConceptuales: [
            {
              concepto: 'Computadora',
              indicadorLogro: 'Aplicar reglas básicas y responsabilidades durante el uso de una **computadora**, contribuyendo al cuidado, seguridad y prolongación de su vida útil.'
            },
            {
              concepto: 'Hardware',
              indicadorLogro: 'Clasificar tipos de computadoras y sus componentes principales de **hardware**, identificando funciones de periféricos comunes al interactuar con dispositivos digitales.'
            },
            {
              concepto: 'Software',
              indicadorLogro: 'Distinguir los tipos de **software** relacionándolos con sus funciones y usos en tareas cotidianas.'
            },
            {
              concepto: 'Redes de comunicación',
              indicadorLogro: 'Identificar tipos de **redes de comunicación** y sus dispositivos principales (módem, router y puntos de acceso), explicando su funcionamiento y principios de comunicación durante la conexión a Internet en contextos cotidianos.'
            },
            {
              concepto: 'Sistema operativo',
              indicadorLogro: 'Identificar las categorías de los **sistemas operativos** (escritorio y dispositivos móviles), describiendo su función básica y el uso de la papelera como herramienta que elimina y/o recupera archivos.'
            },
            {
              concepto: 'Gestión de archivos',
              indicadorLogro: 'Aplicar las propiedades (tamaño, tipo y extensión) en la **gestión de archivos** para compartir información en diferentes entornos digitales.'
            },
            {
              concepto: 'Herramientas de creación de contenido multimedia (editor de gráficos)',
              indicadorLogro: 'Diseñar productos visuales con **herramientas de creación multimedia** utilizando editores gráficos, aplicando principios básicos de diseños y formatos adecuados según la calidad requerida.'
            }
          ]
        },
        {
          areaId: 'programacion',
          rda: 'Integra conceptos de programación como eventos, operadores, estructuras de datos, estructuras de control, procedimientos, funciones, colecciones de datos y algoritmos (diagrama de flujo y pseudocódigo), en la solución de problemas reales.',
          saberesConceptuales: [
            {
              concepto: 'Entorno de programación textual o por bloques',
              indicadorLogro: 'Reconocer un **entorno de programación textual o por bloques**, identificando sus funciones para aplicarlos en la resolución de ejercicios.'
            },
            {
              concepto: 'Lógica de programación',
              indicadorLogro: 'Identificar la **lógica de programación** con el uso de proposiciones y conectores lógicos (AND, OR, NOT), reconociendo su uso en tablas de verdad para la evaluación de expresiones lógicas.'
            },
            {
              concepto: 'Algoritmo',
              indicadorLogro: 'Reconocer el **algoritmo** identificando su estructura (entrada, proceso, salida) y aplicando sus características (preciso, finito, definido) como una representación clara y ordenada.'
            },
            {
              concepto: 'Dato',
              indicadorLogro: 'Identificar tipos de **dato** y formas de almacenamiento, aplicándolos en la creación de algoritmos para resolver desafíos programados.'
            },
            {
              concepto: 'Variable',
              indicadorLogro: 'Identificar tipos de **variable**, aplicando su gestión mediante declaraciones y asignaciones en un entorno de programación.'
            },
            {
              concepto: 'Estructuras condicionales',
              indicadorLogro: 'Aplicar **estructuras condicionales** en un entorno de programación para la resolución de desafíos que requieran la toma de decisiones lógicas.'
            },
            {
              concepto: 'Estructuras repetitivas',
              indicadorLogro: 'Aplicar **estructuras repetitivas** en un entorno de programación para resolver desafíos que requieren la ejecución cíclica de instrucciones.'
            },
            {
              concepto: 'Operadores aritméticos',
              indicadorLogro: 'Aplicar **operadores aritméticos** (suma, resta, multiplicación y división) para resolver cálculos dentro de ejercicios de programación.'
            },
            {
              concepto: 'Operadores relacionales',
              indicadorLogro: 'Aplicar **operadores relacionales** para realizar comparaciones dentro de ejercicios de programación.'
            },
            {
              concepto: 'Operadores lógicos',
              indicadorLogro: 'Aplicar **operadores lógicos** (Y, O, NO) en la resolución de desafíos de programación que impliquen decisiones.'
            },
            {
              concepto: 'Evento',
              indicadorLogro: 'Aplicar un **evento** como acción que se detona mediante una causa y un efecto al resolver desafíos programados.'
            }
          ]
        }
      ]
    },
    // ----- Módulo 2 - Sétimo -----
    {
      id: 'setimo_mod2',
      ciclo: 'III Ciclo',
      nivel: 'Sétimo',
      modulo: 2,
      areas: [
        {
          areaId: 'apropiacion',
          rda: 'Combina herramientas digitales, tomando en cuenta fundamentos de tecnología, impacto de las TIC, seguridad y privacidad digital y, su experiencia de uso, en la realización de productos digitales.',
          saberesConceptuales: [
            {
              concepto: 'Herramienta de productividad (procesador de texto, editor de presentaciones)',
              indicadorLogro: 'Aplicar la **herramienta de productividad** cómo procesador de texto y/o editor de presentación para crear productos comunicativos adecuados al propósito y contexto de uso.'
            },
            {
              concepto: 'Internet',
              indicadorLogro: 'Reconocer el funcionamiento de **Internet**, comprendiendo la conectividad entre dispositivos y el rol de los proveedores de servicio (ISP) en el acceso a la red.'
            },
            {
              concepto: 'Navegador',
              indicadorLogro: 'Utilizar el **navegador** y el **buscador** web para acceder y localizar información en línea, gestionando pestañas y aplicando estrategias básicas de búsqueda con principios de seguridad digital.'
            },
            {
              concepto: 'Buscador',
              indicadorLogro: 'Utilizar el **navegador** y el **buscador** web para acceder y localizar información en línea, gestionando pestañas y aplicando estrategias básicas de búsqueda con principios de seguridad digital.'
            },
            {
              concepto: 'Netiqueta',
              indicadorLogro: 'Utilizar herramientas de **comunicación y colaboración sincrónica y asincrónica** (correo electrónico, chats, videollamadas), aplicando normas de **netiqueta** en la redacción, interacción y participación respetuosa en entornos digitales.'
            },
            {
              concepto: 'Comunicación y colaboración sincrónica/asincrónica',
              indicadorLogro: 'Utilizar herramientas de **comunicación y colaboración sincrónica y asincrónica** (correo electrónico, chats, videollamadas), aplicando normas de **netiqueta** en la redacción, interacción y participación respetuosa en entornos digitales.'
            },
            {
              concepto: 'Almacenamiento en la nube',
              indicadorLogro: 'Utilizar el **almacenamiento en la nube** para guardar, organizar y compartir archivos digitales, reconociendo sus ventajas en el acceso y colaboración desde diferentes dispositivos.'
            },
            {
              concepto: 'Referencias bibliográficas',
              indicadorLogro: 'Aplicar formatos básicos de **referencias bibliográficas** en producciones digitales o escritas, integrando datos como autor, título, fuente y fecha, reconociendo la procedencia de la información.'
            },
            {
              concepto: 'Criptomonedas',
              indicadorLogro: 'Reconocer la utilidad e implicaciones del uso de **criptomonedas** en entornos digitales cotidianos como juegos, plataformas virtuales o pagos en línea.'
            },
            {
              concepto: 'Contraseñas seguras',
              indicadorLogro: 'Crear **contraseñas seguras** con generadores aleatorios, comprendiendo sus características e importancia para la protección de la información personal en entornos digitales.'
            },
            {
              concepto: 'Software malicioso',
              indicadorLogro: 'Reconocer las características del **software malicioso**, analizando los riesgos asociados al uso de sitios web o aplicaciones potencialmente peligrosas en actividades prácticas.'
            },
            {
              concepto: 'Riesgos en línea',
              indicadorLogro: 'Identificar **riesgos en línea** como la suplantación de identidad, grooming, phishing y noticias falsas, analizando acciones básicas de prevención en sus interacciones digitales.'
            }
          ]
        },
        {
          areaId: 'programacion',
          rda: 'Integra conceptos de programación como eventos, operadores, estructuras de datos, estructuras de control, procedimientos, funciones, colecciones de datos y algoritmos (diagrama de flujo y pseudocódigo), en la solución de problemas reales.',
          saberesConceptuales: [
            {
              concepto: 'Operadores lógicos',
              indicadorLogro: 'Aplicar **operadores lógicos** (Y, O, NO) en la resolución de desafíos de programación que impliquen decisiones.'
            },
            {
              concepto: 'Procedimientos y/o funciones',
              indicadorLogro: 'Aplicar **procedimientos y/o funciones** como estructura modular, a través de su declaración e invocación, haciendo uso de parámetros y argumentos durante la solución de desafíos programados.'
            }
          ]
        },
        {
          areaId: 'ciencia_datos',
          rda: 'Analiza datos mediante el uso de herramientas que permitan su visualización para la toma de decisiones en situaciones cotidianas.',
          saberesConceptuales: [
            {
              concepto: 'Dato (Ciencias de datos)',
              indicadorLogro: 'Identificar tipos de **dato** (numéricos, de texto, de ubicación y de imágenes), analizando cómo influye en decisiones y/o comportamientos en redes sociales, historiales de navegación o sistemas de localización.'
            },
            {
              concepto: 'Fundamentos de la IA',
              indicadorLogro: 'Reconocer los **fundamentos de la inteligencia artificial**, identificando el concepto y sus aplicaciones en el contexto personal y laboral.'
            },
            {
              concepto: 'Asistentes virtuales',
              indicadorLogro: 'Identificar qué son los **asistentes virtuales** basados en inteligencia artificial, reconociendo su utilidad al interactuar con herramientas digitales, bajo criterios de seguridad y responsabilidad.'
            }
          ]
        }
      ]
    }
  ],
  octavo: [
    // ----- Módulo 1 - Octavo -----
    {
      id: 'octavo_mod1',
      ciclo: 'III Ciclo',
      nivel: 'Octavo',
      modulo: 1,
      areas: [
        {
          areaId: 'apropiacion',
          rda: 'Combina herramientas digitales, tomando en cuenta fundamentos de tecnología, impacto de las TIC, seguridad y privacidad digital y, su experiencia de uso, en la realización de productos digitales.',
          saberesConceptuales: [
            {
              concepto: 'Hardware',
              indicadorLogro: 'Analizar el funcionamiento de los componentes internos del **hardware**, describiendo cómo influyen en el rendimiento y desempeño del equipo mediante ejemplos prácticos o simulaciones.'
            },
            {
              concepto: 'Software',
              indicadorLogro: 'Analizar los tipos de **software** según su función, comparando las características y usos en diferentes contextos personales, académicos o sociales.'
            },
            {
              concepto: 'Redes de comunicación',
              indicadorLogro: 'Identificar las funciones de las unidades de almacenamiento de las **redes de comunicación**, aplicándolas en la gestión y organización de archivos compartidos en entornos digitales.'
            },
            {
              concepto: 'Conexión entre dispositivos',
              indicadorLogro: 'Distinguir las formas de **conexión entre dispositivos** mediante comunicación física o inalámbrica, identificando sus aplicaciones en contextos cotidianos.'
            },
            {
              concepto: 'Sistema Operativo',
              indicadorLogro: 'Reconocer las características del **sistema operativo** y la diferencia entre software libre y de paga a partir de su funcionalidad, licencia y uso ético.'
            },
            {
              concepto: 'Gestión de archivos',
              indicadorLogro: 'Aplicar la compresión y descompresión de archivos como parte de la **gestión de archivos** digitales, durante el almacenamiento y la manipulación de la información.'
            },
            {
              concepto: 'Herramientas de creación de contenido multimedia (edición de audio y video)',
              indicadorLogro: 'Utilizar **herramientas de creación de contenido multimedia** en la edición de audio o video, aplicando criterios de diseño y formato en relación con la calidad del producto.'
            },
            {
              concepto: 'Internet de las cosas',
              indicadorLogro: 'Analizar aplicaciones del **Internet de las cosas** en la automatización de tareas, valorando sus ventajas y desventajas en contextos cotidianos.'
            }
          ]
        },
        {
          areaId: 'programacion',
          rda: 'Integra conceptos de programación como eventos, operadores, estructuras de datos, estructuras de control, procedimientos, funciones, colecciones de datos y algoritmos (diagrama de flujo y pseudocódigo), en la solución de problemas reales.',
          saberesConceptuales: [
            {
              concepto: 'Entorno de programación textual o bloques para programar mecanismos robóticos',
              indicadorLogro: 'Aplicar el **entorno de programación textual o por bloques para programar mecanismos robóticos,** utilizando estructuras y eventos en la solución de actividades de automatización.'
            }
          ]
        },
        {
          areaId: 'computacion_fisica',
          rda: 'Aplica fundamentos de robótica, computación física, electrónica, mecánica y sistemas robóticos autónomos en la programación y construcción de prototipos que resuelven un problema.',
          saberesConceptuales: [
            {
              concepto: 'Robot',
              indicadorLogro: 'Reconocer qué es un **robot**, sus tipos y componentes (cuerpo, sistema sensorial y sistema de control), diferenciándolo de otros dispositivos no robóticos.'
            },
            {
              concepto: 'Robótica',
              indicadorLogro: 'Diferenciar la computación física con la **robótica**, identificando cómo los sensores, actuadores y sistemas de control se integran en mecanismos robóticos.'
            },
            {
              concepto: 'Mecánica aplicada a la robótica',
              indicadorLogro: 'Emplear principios de la **mecánica aplicados a la robótica,** como la estructura y la estabilidad, en el diseño de mecanismos robóticos.'
            },
            {
              concepto: 'Mecanismos',
              indicadorLogro: 'Reconocer los tipos de **mecanismos**, identificando su función principal en la transmisión y transformación del movimiento mediante la simulación de prototipos.'
            },
            {
              concepto: 'Circuito eléctrico',
              indicadorLogro: 'Identificar los componentes de un **circuito eléctrico** y su funcionamiento, comprendiendo la relación entre carga eléctrica, voltaje, corriente, resistencias e interruptores mediante la simulación de prototipos.'
            },
            {
              concepto: 'Fundamentos de electrónica',
              indicadorLogro: 'Identificar **fundamentos de electrónica,** reconociendo la función de pines de entrada y salida, así como la diferencia entre señales analógicas y digitales durante la simulación o construcción de circuitos.'
            },
            {
              concepto: 'Microcontrolador',
              indicadorLogro: 'Comprender los componentes básicos de un **microcontrolador,** aplicando la función de pines digitales y analógicos y cómo se establece la comunicación entre el programa y la tarjeta microcontroladora durante la exploración o simulación de prototipos.'
            }
          ]
        }
      ]
    },
    // ----- Módulo 2 - Octavo -----
    {
      id: 'octavo_mod2',
      ciclo: 'III Ciclo',
      nivel: 'Octavo',
      modulo: 2,
      areas: [
        {
          areaId: 'apropiacion',
          rda: 'Combina herramientas digitales, tomando en cuenta fundamentos de tecnología, impacto de las TIC, seguridad y privacidad digital y, su experiencia de uso, en la realización de productos digitales.',
          saberesConceptuales: [
            {
              concepto: 'Herramienta de productividad (hoja de cálculo)',
              indicadorLogro: 'Utilizar la hoja de cálculo como **herramienta de productividad** en la organización y representación de datos.'
            },
            {
              concepto: 'Buscador',
              indicadorLogro: 'Utilizar el **buscador** web como herramienta para la localización de información, aplicando criterios que identifiquen fuentes confiables.'
            },
            {
              concepto: 'Plataformas de creación de contenido',
              indicadorLogro: 'Utilizar **plataformas de creación de contenido** digital en la elaboración de infografías, diagramas o presentaciones, organizando la información de forma visual y coherente según el propósito comunicativo.'
            },
            {
              concepto: 'Licencia',
              indicadorLogro: 'Reconocer la **licencia digital** en el uso de contenido en línea, valorando sus alcances y limitaciones.'
            },
            {
              concepto: 'Internet de las cosas',
              indicadorLogro: 'Analizar aplicaciones del **Internet de las cosas** en la automatización de tareas, valorando sus ventajas y desventajas en contextos cotidianos.'
            },
            {
              concepto: 'Hackeo',
              indicadorLogro: 'Reconocer el **hackeo** como una amenaza digital, diferenciando tipos de hacker, comprendiendo sus implicaciones legales y valorando medidas para su prevención.'
            },
            {
              concepto: 'Software malicioso',
              indicadorLogro: 'Aplicar medidas de protección digital mediante el reconocimiento de tipos de **software malicioso** y el uso adecuado del **antivirus**, valorando su actualización como parte de una ciudadanía digital responsable.'
            }
          ]
        },
        {
          areaId: 'programacion',
          rda: 'Combina herramientas digitales, tomando en cuenta fundamentos de tecnología, impacto de las TIC, seguridad y privacidad digital y, su experiencia de uso, en la realización de productos digitales.',
          saberesConceptuales: [
            {
              concepto: 'Colección de datos',
              indicadorLogro: 'Gestionar una **colección de datos** como listas o arreglos mediante su creación, recorrido y modificación durante la solución de ejercicios programados.'
            }
          ]
        },
        {
          areaId: 'computacion_fisica',
          rda: 'Aplica fundamentos de robótica, computación física, electrónica, mecánica y sistemas robóticos autónomos en la programación y construcción de prototipos que resuelven un problema.',
          saberesConceptuales: [
            {
              concepto: 'Sensor',
              indicadorLogro: 'Utilizar un **sensor** integrado y/o externo, comprendiendo su función y su correcta conexión a VCC y GND durante la construcción o simulación de un prototipo.'
            },
            {
              concepto: 'Actuador',
              indicadorLogro: 'Utilizar un **actuador** integrado y/o externo, comprendiendo su función y cómo se conecta correctamente a VCC y GND durante la construcción o simulación de un prototipo.'
            }
          ]
        },
        {
          areaId: 'ciencia_datos',
          rda: 'Analiza datos mediante el uso de herramientas que permitan su visualización para la toma de decisiones en situaciones cotidianas.',
          saberesConceptuales: [
            {
              concepto: 'Recolección de datos',
              indicadorLogro: 'Aplicar técnicas de **recolección de datos** mediante registros escolares y personales (gastos, notas, actividades deportivas o datos médicos simples), organizando la información en tablas.'
            },
            {
              concepto: 'Fundamentos de la IA',
              indicadorLogro: 'Reconocer los **fundamentos de la inteligencia artificial**, identificando cómo funciona y se diferencia de otros sistemas digitales.'
            },
            {
              concepto: 'Herramientas generativas',
              indicadorLogro: 'Utilizar **herramientas generativas** basadas en inteligencia artificial, aplicando funciones para la creación o modificación de contenido digital (texto, imagen o audio) respetando criterios de seguridad y responsabilidad.'
            }
          ]
        }
      ]
    }
  ],
  noveno: [
    // ----- Módulo 1 - Noveno -----
    {
      id: 'noveno_mod1',
      ciclo: 'III Ciclo',
      nivel: 'Noveno',
      modulo: 1,
      areas: [
        {
          areaId: 'programacion',
          rda: 'Integra conceptos de programación como eventos, operadores, estructuras de datos, estructuras de control, procedimientos, funciones, colecciones de datos y algoritmos (diagrama de flujo y pseudocódigo), en la solución de problemas reales.',
          saberesConceptuales: [
            {
              concepto: 'Entorno de programación textual o bloques para programar mecanismos robóticos',
              indicadorLogro: 'Diseñar soluciones automatizadas en un **entorno de programación textual o por bloques para programar mecanismos robóticos**.'
            },
            {
              concepto: 'Algoritmo',
              indicadorLogro: 'Diseñar un **algoritmo** para resolver un problema, representándolo de forma estructurada mediante pseudocódigo o diagrama de flujo.'
            }
          ]
        },
        {
          areaId: 'computacion_fisica',
          rda: 'Aplica fundamentos de robótica, computación física, electrónica, mecánica y sistemas robóticos autónomos en la programación y construcción de prototipos que resuelven un problema.',
          saberesConceptuales: [
            {
              concepto: 'Movimiento en mecanismos',
              indicadorLogro: 'Identificar el **movimiento en mecanismos** robóticos, diferenciando el movimiento de entrada y salida, a partir de la observación y análisis de simulaciones o prototipos básicos que integren sensores y actuadores.'
            },
            {
              concepto: 'Microcontrolador',
              indicadorLogro: 'Aplicar las funciones de un **microcontrolador**, utilizando pines digitales y analógicos, conexión a VCC y GND y comunicación con sensores y actuadores durante la simulación o construcción de prototipos.'
            },
            {
              concepto: 'Sensor',
              indicadorLogro: 'Integrar un **sensor** en un prototipo, utilizando sus datos como entrada para generar respuestas automatizadas mediante un microcontrolador.'
            },
            {
              concepto: 'Actuador',
              indicadorLogro: 'Integrar un **actuador** en un prototipo, programando su activación como respuesta a entradas digitales o condiciones del sistema mediante un microcontrolador.'
            },
            {
              concepto: 'Domótica',
              indicadorLogro: 'Analizar los usos, aplicaciones y beneficios de la **domótica**, mediante la creación o simulación de un prototipo que responda a necesidades reales en un entorno cotidiano.'
            },
            {
              concepto: 'Prototipos',
              indicadorLogro: 'Construir **prototipos** que integren sensores, actuadores y un microcontrolador, a partir de una necesidad identificada en su contexto.'
            }
          ]
        },
        {
          areaId: 'ciencia_datos',
          rda: 'Analiza datos mediante el uso de herramientas que permitan su visualización para la toma de decisiones en situaciones cotidianas.',
          saberesConceptuales: [
            {
              concepto: 'Dato',
              indicadorLogro: 'Reconocer la importancia de la organización y conservación del **dato,** aplicando criterios de seguridad y responsabilidad en la gestión de información.'
            },
            {
              concepto: 'Almacenamiento de datos',
              indicadorLogro: 'Reconocer el ciclo de vida del dato en el **almacenamiento de datos**, identificando las etapas de creación, uso, conservación y eliminación responsable de la información en contextos educativos o personales.'
            }
          ]
        }
      ]
    },
    // ----- Módulo 2 - Noveno -----
    {
      id: 'noveno_mod2',
      ciclo: 'III Ciclo',
      nivel: 'Noveno',
      modulo: 2,
      areas: [
        {
          areaId: 'apropiacion',
          rda: 'Combina herramientas digitales, tomando en cuenta fundamentos de tecnología, impacto de las TIC, seguridad y privacidad digital y, su experiencia de uso, en la realización de productos digitales.',
          saberesConceptuales: [
            {
              concepto: 'Redes de comunicación',
              indicadorLogro: 'Reconocer las **redes de comunicación** a partir de su arquitectura, protocolos (como HTTP, HTTPS y TCP/IP) e interfaces, comprendiendo su funcionamiento durante el intercambio de datos.'
            },
            {
              concepto: 'Sistema Operativo',
              indicadorLogro: 'Aplicar técnicas de optimización del **sistema operativo**, identificando cómo gestionar memoria, desfragmentar discos, limpiar caché y actualizar el sistema para el mejoramiento del desempeño de dispositivos.'
            },
            {
              concepto: 'Herramienta de productividad (gestor de bases de datos)',
              indicadorLogro: 'Utilizar un gestor de bases de datos como **herramienta de productividad** para la creación de tablas, estableciendo relaciones entre ellas y realizando consultas en la organización de la información.'
            },
            {
              concepto: 'Herramientas de creación de contenido multimedia',
              indicadorLogro: 'Utilizar **herramientas de creación de contenido multimedia** para el modelado 3D, aplicando funciones básicas de creación y edición en productos digitales.'
            },
            {
              concepto: 'Plataformas de creación de contenido',
              indicadorLogro: 'Crear encuestas o formularios mediante **plataformas de creación de contenido,** ajustando su formato y estructura al propósito de recolección o evaluación de datos.'
            },
            {
              concepto: 'Derechos de autor y licenciamiento',
              indicadorLogro: 'Reconocer la importancia de los **derechos de autor** y el **licenciamiento**, aplicando buenas prácticas de uso ético y legal de contenidos digitales.'
            },
            {
              concepto: 'Huella digital',
              indicadorLogro: 'Analizar la utilidad e implicaciones de la **huella digital,** valorando cómo las acciones en línea afectan la identidad, reputación y seguridad personal en entornos digitales.'
            },
            {
              concepto: 'Riesgos en línea',
              indicadorLogro: 'Analizar **riesgos en línea** (acceso a información inapropiada, ciberadicción, ciberacoso y el sexting), valorando estrategias de prevención y autocuidado en sus interacciones digitales.'
            }
          ]
        },
        {
          areaId: 'ciencia_datos',
          rda: 'Analiza datos mediante el uso de herramientas que permitan su visualización para la toma de decisiones en situaciones cotidianas.',
          saberesConceptuales: [
            {
              concepto: 'Herramientas generativas',
              indicadorLogro: 'Aplicar **herramientas generativas** con inteligencia artificial en la producción de contenido digital, considerando criterios de seguridad, propiedad intelectual y responsabilidad digital.'
            },
            {
              concepto: 'Desafíos de la IA',
              indicadorLogro: 'Reconocer los **desafíos de la inteligencia artificial**, identificando riesgos como sesgos, manipulación de información, dependencia tecnológica y privacidad de datos, reflexionando sobre su impacto en la vida laboral, personal y social.'
            }
          ]
        }
      ]
    }
  ]
};

// ============================================
// HACER VARIABLES GLOBALES (agregar esto al FINAL del archivo)
// ============================================
// Esto permite que cualquier otro script (como planning.html) acceda a los datos
window.CURRICULO = CURRICULO;
window.AREAS_CONOCIMIENTO = AREAS_CONOCIMIENTO;
window.PRACTICAS_PENSADOR_COMPUTACIONAL = PRACTICAS_PENSADOR_COMPUTACIONAL;
window.ACTITUDES_PENSADOR_COMPUTACIONAL = ACTITUDES_PENSADOR_COMPUTACIONAL;
window.PROYECTO_ETAPAS = PROYECTO_ETAPAS;

// Mantenemos el export por si acaso (no interfiere)
export default CURRICULO;
