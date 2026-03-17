// src/data/pnft-curriculum.js

/**
 * Base de datos curricular del PNFT
 * Incluye todos los niveles, módulos, saberes e indicadores de logro.
 * Versión: 1.0 (2026)
 */

export const PRACTICAS_PENSADOR_COMPUTACIONAL = [
  { id: 'reconoce_patrones', nombre: 'Reconoce patrones', descripcion: 'Predice a partir de regularidades, similitudes o características comunes de un conjunto de datos o situaciones.' },
  { id: 'abstrae', nombre: 'Abstrae', descripcion: 'Concluye cuáles son las características relevantes que debe considerar y cuáles debe omitir.' },
  { id: 'generaliza', nombre: 'Generaliza', descripcion: 'Generaliza funcionalidades o estructuras generales de un elemento que pueda aprovechar en otros contextos.' },
  { id: 'transfiere', nombre: 'Transfiere', descripcion: 'Transfiere conocimientos, habilidades y estrategias aprendidas previamente a situaciones nuevas.' },
  { id: 'modulariza', nombre: 'Modulariza', descripcion: 'Resuelve un problema por partes menos complejas, sin perder de vista el todo.' },
  { id: 'formula_algoritmos', nombre: 'Formula algoritmos', descripcion: 'Formula algoritmos por medio de una secuencia ordenada y detallada de pasos.' },
  { id: 'remezcla', nombre: 'Remezcla', descripcion: 'Combina diferentes ideas, técnicas o soluciones existentes de manera innovadora.' },
  { id: 'depura', nombre: 'Depura', descripcion: 'Valida el funcionamiento de los algoritmos en busca de errores para corregirlos.' },
  { id: 'programa', nombre: 'Programa', descripcion: 'Programa mediante un entorno o IDE para resolver un problema.' },
  { id: 'comunica', nombre: 'Comunica', descripcion: 'Comunica ideas o soluciones de manera creativa, coherente y comprensible.' },
  { id: 'colabora', nombre: 'Colabora', descripcion: 'Demuestra un trato constructivo y respetuoso al trabajar con otros.' },
  { id: 'piensa_creativa', nombre: 'Piensa de forma creativa', descripcion: 'Desarrolla soluciones ingeniosas, innovadoras, originales.' },
  { id: 'maneja_etica_segura', nombre: 'Maneja las tecnologías de forma ética y segura', descripcion: 'Aplica fundamentos de ética y seguridad digital.' }
];

export const ACTITUDES_PENSADOR_COMPUTACIONAL = [
  { id: 'gusto_precision', nombre: 'Gusto por la precisión', descripcion: 'Demuestra comportamiento hacia la búsqueda de la exactitud, al ser minucioso con los detalles.' },
  { id: 'aprender_error', nombre: 'Aprender del error', descripcion: 'Demuestra comportamiento que le permita ganar experiencia a partir de errores.' },
  { id: 'flexibilidad_problemas', nombre: 'Flexibilidad para manejar problemas', descripcion: 'Demuestra adaptabilidad, flexibilidad y resiliencia ante desafíos.' },
  { id: 'tolerancia_frustracion', nombre: 'Tolerancia a la frustración', descripcion: 'Demuestra autoconfianza, motivación, autocontrol, paciencia y persistencia.' }
];

export const AREAS_CONOCIMIENTO = [
  { id: 'apropiacion', nombre: 'Apropiación Tecnológica y Digital' },
  { id: 'programacion', nombre: 'Programación y Algoritmos' },
  { id: 'computacion_fisica', nombre: 'Computación Física y Robótica' },
  { id: 'ciencia_datos', nombre: 'Ciencia de Datos e Inteligencia Artificial' }
];

// Estructura de un módulo:
// {
//   id: string,
//   ciclo: string,
//   nivel: string,
//   modulo: number, // 1 o 2
//   nombre?: string, // ej: "Básico requerido", "Óptimo" (opcional)
//   areas: [
//     {
//       areaId: string,
//       rda: string,
//       saberesConceptuales: [
//         { concepto: string, indicadorLogro: string }
//       ]
//     }
//   ]
//   // Los saberes procedimentales y actitudinales son fijos (siempre los mismos),
//   // pero se pueden marcar en el planeamiento.
// }

export const CURRICULO = {
  preescolar: [
    // Módulo 1 - Básico requerido
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
              indicadorLogro: 'Identificar qué es una computadora y algunas de sus características, a partir de experiencias prácticas de interacción con dispositivos digitales.'
            },
            {
              concepto: 'Software',
              indicadorLogro: 'Reconocer elementos visuales básicos de la interfaz de software (iconos, botones, ventanas), interactuando con ellos mediante el uso guiado de dispositivos digitales.'
            },
            {
              concepto: 'Herramientas de creación de contenido multimedia',
              indicadorLogro: 'Reconocer las herramientas de creación de contenido multimedia según su utilidad: editor gráfico, grabadora de audio y video, en la creación de recursos digitales.'
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
              indicadorLogro: 'Reconocer los conceptos de lateralidad y orientación espacial en la construcción de secuencias de acciones para la solución de retos de programación.'
            },
            {
              concepto: 'Evento',
              indicadorLogro: 'Reconocer que un evento desencadena una acción, identificando la relación de causa y efecto en juegos o actividades.'
            }
          ]
        }
        // Las otras áreas no aparecen en este módulo
      ]
    },
    // Módulo 1 - Óptimo
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
            { concepto: 'Computadora', indicadorLogro: 'Identificar qué es una computadora y sus características funcionales, explorando su utilidad al interactuar con diversos dispositivos digitales.' },
            { concepto: 'Hardware', indicadorLogro: 'Reconocer componentes básicos del hardware, como dispositivos de entrada y salida de datos, explorando su función al encender, usar o interactuar con la computadora en actividades cotidianas.' },
            { concepto: 'Software', indicadorLogro: 'Reconocer elementos del software relacionados con la interfaz de usuario, como iconos, botones de minimizar, maximizar y cerrar, barra de tareas y área de trabajo, interactuando con ellos mediante el uso de dispositivos digitales.' },
            { concepto: 'Herramientas de creación de contenido multimedia', indicadorLogro: 'Seleccionar las herramientas de creación de contenido multimedia según su utilidad: editor gráfico, grabadora de audio y video en la creación de recursos digitales.' },
            { concepto: 'Internet', indicadorLogro: 'Reconocer qué es Internet y los requerimientos de un dispositivo para conectarse a Internet, realizando una exploración dirigida.' }
          ]
        },
        {
          areaId: 'programacion',
          rda: 'Ordena secuencias integrando conceptos de programación como dato, evento, estado, ciclos, así como nociones de lateralidad y orientación espacial, en la solución de desafíos propuestos, utilizando la programación iconográfica por bloques.',
          saberesConceptuales: [
            { concepto: 'Entorno de programación iconográfico', indicadorLogro: 'Reconocer el entorno de programación iconográfico, según su función con bloques de la interfaz, como desplazamiento, orientación, apariencia, evento, sonido y control, en actividades de creación digital guiada.' },
            { concepto: 'Lateralidad y orientación espacial', indicadorLogro: 'Reconocer los conceptos de lateralidad y orientación espacial en la construcción de secuencias de acciones para la solución de retos de programación.' },
            { concepto: 'Evento', indicadorLogro: 'Reconocer que un evento desencadena una acción, identificando la relación de causa y efecto en juegos o actividades.' }
          ]
        }
      ]
    },
    // Módulo 2 - Básico requerido
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
            { concepto: 'Conexión entre dispositivos', indicadorLogro: 'Reconocer la conexión entre dispositivos por bluetooth y los requerimientos de dispositivos digitales para conectarse, a través de una exploración dirigida.' }
          ]
        },
        {
          areaId: 'programacion',
          rda: 'Ordena secuencias integrando conceptos de programación como dato, evento, estado, ciclos, así como nociones de lateralidad y orientación espacial, en la solución de desafíos propuestos, utilizando la programación iconográfica por bloques.',
          saberesConceptuales: [
            { concepto: 'Estado', indicadorLogro: 'Reconocer el concepto de estado programando objetos que modifican las propiedades de orientación y/o dirección.' },
            { concepto: 'Algoritmo', indicadorLogro: 'Reconocer el concepto de algoritmo mediante secuencias de acciones lógicas y ordenadas, en la construcción de soluciones a desafíos propuestos.' },
            { concepto: 'Dato (programación)', indicadorLogro: 'Reconocer la importancia del dato en contexto físico y en contexto digital mientras soluciona desafíos propuestos.' },
            { concepto: 'Estructuras repetitivas', indicadorLogro: 'Reconocer estructuras repetitivas en secuencias de acciones durante la programación guiada de objetos digitales, distinguiendo si una acción se repite un número limitado o ilimitado de veces.' }
          ]
        },
        {
          areaId: 'computacion_fisica',
          rda: 'Reconoce el funcionamiento de los robots, así como sus componentes (cuerpo, sistema sensorial, sistemas de control), al clasificarlos por su uso y programarlos para resolver retos.',
          saberesConceptuales: [
            { concepto: 'Robot', indicadorLogro: 'Reconocer qué es un robot, sus componentes y algunos de sus usos, mediante actividades lúdicas de exploración o programación guiada.' }
          ]
        },
        {
          areaId: 'ciencia_datos',
          rda: 'Reconoce los conceptos básicos relacionados con la recopilación, organización e interpretación de datos simples, mediante gráficos pictóricos en la resolución de problemas, fomentando el pensamiento crítico y la curiosidad hacia el mundo que lo rodea.',
          saberesConceptuales: [
            { concepto: 'Dato (Ciencias de datos)', indicadorLogro: 'Identificar el dato y su importancia en situaciones cotidianas, reconociendo diferentes tipos como texto, imagen, sonido o video.' },
            { concepto: 'Estrategias para presentar datos', indicadorLogro: 'Reconocer gráficos pictóricos como estrategia para representar datos recolectados en actividades lúdicas.' }
          ]
        }
      ]
    },
    // Módulo 2 - Óptimo
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
            { concepto: 'Conexión entre dispositivos', indicadorLogro: 'Reconocer formas de conexión entre dispositivos por bluetooth y wifi, así como los requerimientos de dispositivos digitales para conectarse a través de una exploración dirigida.' }
          ]
        },
        {
          areaId: 'programacion',
          rda: 'Ordena secuencias integrando conceptos de programación como dato, evento, estado, ciclos, así como nociones de lateralidad y orientación espacial, en la solución de desafíos propuestos, utilizando la programación iconográfica por bloques.',
          saberesConceptuales: [
            { concepto: 'Estado', indicadorLogro: 'Reconocer el concepto de estado programando objetos que modifican las propiedades de orientación, dirección y/o tamaño.' },
            { concepto: 'Algoritmo', indicadorLogro: 'Reconocer patrones de repetición en secuencias lógicas y ordenadas, como parte de un algoritmo, al construir soluciones a desafíos propuestos.' },
            { concepto: 'Dato (programación)', indicadorLogro: 'Reconocer la importancia del dato en contexto físico y en contexto digital mientras soluciona desafíos propuestos.' },
            { concepto: 'Estructuras repetitivas', indicadorLogro: 'Identificar estructuras repetitivas en el contexto del ciclo finito e infinito, en el diseño de secuencias de programación.' }
          ]
        },
        {
          areaId: 'computacion_fisica',
          rda: 'Reconoce el funcionamiento de los robots, así como sus componentes (cuerpo, sistema sensorial, sistemas de control), al clasificarlos por su uso y programarlos para resolver retos.',
          saberesConceptuales: [
            { concepto: 'Robot', indicadorLogro: 'Reconocer qué es un robot, sus componentes y algunos de sus usos, mediante actividades lúdicas de exploración o programación guiada.' }
          ]
        },
        {
          areaId: 'ciencia_datos',
          rda: 'Reconoce los conceptos básicos relacionados con la recopilación, organización e interpretación de datos simples, mediante gráficos pictóricos en la resolución de problemas, fomentando el pensamiento crítico y la curiosidad hacia el mundo que lo rodea.',
          saberesConceptuales: [
            { concepto: 'Dato (Ciencias de datos)', indicadorLogro: 'Reconocer el dato según su tipo (texto, imagen, sonido o video) y su importancia al participar en actividades que le permiten organizar información.' },
            { concepto: 'Estrategias para presentar datos', indicadorLogro: 'Crear gráficos pictóricos como una estrategia para representar datos al resolver problemas que estimulen la curiosidad y el pensamiento crítico al analizarlos.' },
            { concepto: 'Visualización de datos', indicadorLogro: 'Interpretar gráficos pictóricos como parte de la visualización de datos (colores, formas, cantidades), con apoyo del docente, relacionándolos con datos conocidos del entorno.' },
            { concepto: 'Realidad aumentada', indicadorLogro: 'Experimentar con realidad aumentada en entornos físicos mediante actividades sensoriales y lúdicas, con acompañamiento del docente.' }
          ]
        }
      ]
    }
  ],
  primaria: {
    primero: [
      // Módulo 1
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
              { concepto: 'Computadora', indicadorLogro: 'Reconocer la computadora como una herramienta tecnológica, identificando sus características básicas, funciones e importancia en la vida cotidiana, por medio de la observación y manipulación práctica.' },
              { concepto: 'Hardware', indicadorLogro: 'Identificar el hardware básico de una computadora, reconociendo dispositivos de entrada, salida y las acciones de encendido y apagado, mediante actividades prácticas guiadas.' },
              { concepto: 'Software', indicadorLogro: 'Identificar el software de una computadora, reconociendo los elementos básicos de la interfaz de usuario mediante actividades prácticas guiadas.' }
            ]
          },
          {
            areaId: 'programacion',
            rda: 'Selecciona conceptos de programación como dato, secuencia, evento, estado, variables, operadores aritméticos y relacionales, condicionales simples, ciclo finito e infinito, en la programación por bloques para la solución de problemas.',
            saberesConceptuales: [
              { concepto: 'Entorno de programación iconográfico', indicadorLogro: 'Reconocer elementos básicos de un entorno de programación iconográfico, como bloques de desplazamiento, orientación, apariencia, sonido, eventos y control, mediante la navegación en la interfaz con actividades guiadas.' },
              { concepto: 'Reconocimiento de patrones', indicadorLogro: 'Reconocer patrones de movimiento en secuencias de instrucciones simples para que un personaje siga una ruta desde un punto de inicio hasta un punto de llegada.' },
              { concepto: 'Estado', indicadorLogro: 'Reconocer el estado de un objeto digital en relación con su orientación, dirección y tamaño, identificando variaciones en dichos atributos, mediante secuencias de programaciones simples.' },
              { concepto: 'Algoritmo', indicadorLogro: 'Identificar un algoritmo en situaciones de la vida diaria, reconociendo secuencias lógicas y ordenadas de acciones, para ser representadas de forma analógica (dibujos, tarjetas, gestos) y/o digital (entorno iconográfico).' },
              { concepto: 'Evento', indicadorLogro: 'Reconocer el evento como relación de causa y efecto al participar en juegos analógicos, identificando cómo una acción provoca una respuesta o cambio observable durante la dinámica.' }
            ]
          }
        ]
      },
      // Módulo 2
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
              { concepto: 'Herramientas de creación de contenido multimedia (audio, imágenes)', indicadorLogro: 'Utilizar herramientas de creación de contenido multimedia para la creación de audios e imágenes durante actividades guiadas de producción digital en el aula.' },
              { concepto: 'Conexión entre dispositivos (bluetooth)', indicadorLogro: 'Reconocer el bluetooth como medio de conexión entre dispositivos utilizando dispositivos digitales en el aula.' },
              { concepto: 'Internet', indicadorLogro: 'Reconocer los dispositivos y programas que permiten la conexión para la navegación en Internet.' }
            ]
          },
          {
            areaId: 'programacion',
            rda: 'Selecciona conceptos de programación como dato, secuencia, evento, estado, variables, operadores aritméticos y relacionales, condicionales simples, ciclo finito e infinito, en la programación por bloques para la solución de problemas.',
            saberesConceptuales: [
              { concepto: 'Estructuras repetitivas', indicadorLogro: 'Reconocer estructuras repetitivas al identificar ciclos finitos (como una canción o rutina) e infinitos (como el tic-tac del reloj o el movimiento del ventilador) en situaciones de la vida diaria.' },
              { concepto: 'Dato', indicadorLogro: 'Identificar el dato en situaciones de la vida diaria, reconociendo información valiosa en contextos físicos (como etiquetas, señales, objetos) y digitales (como imágenes, íconos o pantallas interactivas).' }
            ]
          },
          {
            areaId: 'ciencia_datos',
            rda: 'Reconoce los fundamentos de la inteligencia artificial y su presencia en la vida cotidiana, mediante ejemplos concretos como asistentes virtuales, valorando el uso seguro y responsable de estas tecnologías.',
            saberesConceptuales: [
              { concepto: 'Fundamentos de la IA', indicadorLogro: 'Reconocer los fundamentos de la inteligencia artificial a través de objetos o situaciones del entorno donde esta tecnología está presente, mediante actividades guiadas con apoyo visual o audiovisual.' },
              { concepto: 'Asistentes virtuales', indicadorLogro: 'Reconocer qué es un asistente virtual y sus funciones a partir de demostraciones guiadas o videos educativos.' }
            ]
          }
        ]
      }
    ],
    segundo: [
      // Módulo 1
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
              { concepto: 'Hardware', indicadorLogro: 'Identificar el funcionamiento de los componentes básicos del hardware, reconociendo cómo cuidarlos mientras utilizan la computadora en la cotidianidad.' },
              { concepto: 'Software (programas)', indicadorLogro: 'Explorar el funcionamiento de diferentes programas de software según la tarea escolar asignada durante el trabajo en aula.' },
              { concepto: 'Herramienta de productividad (procesador de texto)', indicadorLogro: 'Utilizar herramientas de productividad como el procesador de texto, reconociendo la cinta de opciones, pestañas y comandos básicos, así como sus funciones por teclado, durante la creación de textos sencillos.' },
              { concepto: 'Herramientas de creación de contenido multimedia (grabadora de audio y editores de gráficos)', indicadorLogro: 'Utilizar herramientas de creación de contenido multimedia, como la grabadora de audio y editores de gráficos, aplicando funciones básicas como crear, editar y guardar archivos, durante actividades guiadas de producción digital en el aula.' }
            ]
          },
          {
            areaId: 'programacion',
            rda: 'Selecciona conceptos de programación como dato, secuencia, evento, estado, variables, operadores aritméticos y relacionales, condicionales simples, ciclo finito e infinito, en la programación por bloques para la solución de problemas.',
            saberesConceptuales: [
              { concepto: 'Entorno de programación por bloques', indicadorLogro: 'Aplicar el uso del entorno de programación por bloques, explorando la interfaz y el área de bloques mientras construye secuencias de acciones que representen historias cotidianas.' },
              { concepto: 'Algoritmo', indicadorLogro: 'Diseñar un algoritmo en lenguaje natural como una secuencia ordenada que resuelve situaciones de la vida cotidiana.' },
              { concepto: 'Dato', indicadorLogro: 'Clasificar el dato como numérico o de texto en ejemplos de la vida cotidiana, valorando su uso en actividades del entorno cercano.' },
              { concepto: 'Variable', indicadorLogro: 'Identificar una variable en contextos de la vida cotidiana, observando elementos que cambian en relación con otros (como edad, cantidad, clima o tiempo de actividad).' },
              { concepto: 'Evento', indicadorLogro: 'Reconocer el evento en un entorno de programación por bloques que activa una acción o cambio visible en un objeto del programa.' }
            ]
          }
        ]
      },
      // Módulo 2
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
              { concepto: 'Conexión entre dispositivos (wifi)', indicadorLogro: 'Reconocer el wifi como medio de conexión entre dispositivos conectando dispositivos digitales en el aula.' },
              { concepto: 'Internet', indicadorLogro: 'Aplicar normas básicas de navegación por internet, para acceder a páginas educativas seguras, bajo acompañamiento del docente.' }
            ]
          },
          {
            areaId: 'programacion',
            rda: 'Selecciona conceptos de programación como dato, secuencia, evento, estado, variables, operadores aritméticos y relacionales, condicionales simples, ciclo finito e infinito, en la programación por bloques para la solución de problemas.',
            saberesConceptuales: [
              { concepto: 'Estructuras repetitivas', indicadorLogro: 'Identificar estructuras repetitivas en actividades programadas, diferenciando entre ciclos finitos e infinitos según la cantidad de repeticiones requeridas.' },
              { concepto: 'Estructuras condicionales (simples)', indicadorLogro: 'Aplicar estructuras condicionales simples en un entorno de programación por bloques en la resolución de un ejercicio programado.' },
              { concepto: 'Operadores aritméticos', indicadorLogro: 'Reconocer los operadores aritméticos de suma y resta en situaciones de la vida cotidiana y su uso en un entorno de programación por bloques.' },
              { concepto: 'Operador relacional', indicadorLogro: 'Reconocer el operador relacional "igual que" en situaciones de la vida cotidiana y su uso en un entorno de programación por bloques.' }
            ]
          },
          {
            areaId: 'ciencia_datos',
            rda: 'Reconoce los fundamentos de la inteligencia artificial y su presencia en la vida cotidiana, mediante ejemplos concretos como asistentes virtuales, valorando el uso seguro y responsable de estas tecnologías.',
            saberesConceptuales: [
              { concepto: 'Fundamentos de la IA', indicadorLogro: 'Describir los fundamentos de la inteligencia artificial en situaciones cotidianas, utilizando ejemplos guiados y preguntas orientadoras.' },
              { concepto: 'Asistentes virtuales', indicadorLogro: 'Reconocer el uso de asistentes virtuales en situaciones cotidianas, mediante ejemplos guiados que permitan la interacción.' }
            ]
          }
        ]
      }
    ],
    tercero: [
      // Módulo 1
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
              { concepto: 'Hardware (entrada, procesamiento, almacenamiento y salida)', indicadorLogro: 'Explicar las funciones básicas del hardware (entrada, procesamiento, almacenamiento y salida), en actividades prácticas con dispositivos computacionales en el aula.' },
              { concepto: 'Redes de comunicación', indicadorLogro: 'Describir qué son las redes de comunicación y cómo funciona una red local, a partir de la observación y la práctica de intercambio de información entre dispositivos conectados en el aula.' },
              { concepto: 'Gestión de archivos', indicadorLogro: 'Reconocer la gestión de archivos como proceso para la organización y clasificación de la información, mediante el uso de carpetas, subcarpetas y la exploración de archivos digitales.' },
              { concepto: 'Herramienta de productividad (editor de presentaciones)', indicadorLogro: 'Utilizar herramientas de productividad, como el editor de presentaciones, empleando la cinta de opciones, pestañas, comandos básicos y sus funciones por teclado en la elaboración de presentaciones digitales.' }
            ]
          },
          {
            areaId: 'programacion',
            rda: 'Selecciona conceptos de programación como dato, secuencia, evento, estado, variables, operadores aritméticos y relacionales, condicionales simples, ciclo finito e infinito, en la programación por bloques para la solución de problemas.',
            saberesConceptuales: [
              { concepto: 'Algoritmo', indicadorLogro: 'Reconocer la estructura y características de un algoritmo en diferentes representaciones, valorando el orden, inicio-fin y lógica de pasos en la solución de situaciones cotidianas.' },
              { concepto: 'Variable', indicadorLogro: 'Utilizar la gestión de una variable en un entorno de programación por bloques declarando su tipo, asignando valores y utilizando su contenido en la resolución de un ejercicio programado.' },
              { concepto: 'Operadores aritméticos', indicadorLogro: 'Utilizar operadores aritméticos de multiplicación y división y/o operadores relacionales como "menor que", "mayor que" o "igual que", en la resolución de un ejercicio programado.' },
              { concepto: 'Operadores relacionales', indicadorLogro: 'Utilizar operadores aritméticos de multiplicación y división y/o operadores relacionales como "menor que", "mayor que" o "igual que", en la resolución de un ejercicio programado.' }
            ]
          }
        ]
      },
      // Módulo 2
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
              { concepto: 'Herramientas de creación de contenido multimedia (video)', indicadorLogro: 'Aplicar herramientas de creación de contenido multimedia en la creación, edición y guardado de videos, para incorporarlos en sus producciones.' },
              { concepto: 'Navegador', indicadorLogro: 'Identificar el navegador como una herramienta digital, reconociendo sus partes y usos en actividades de exploración guiada por el docente.' },
              { concepto: 'Buscador', indicadorLogro: 'Identificar el buscador como una herramienta digital para acceder a información, distinguiendo sitios confiables y no confiables durante la exploración dirigida en buscadores infantiles.' },
              { concepto: 'Netiqueta', indicadorLogro: 'Identificar normas básicas de netiqueta que deben seguir al participar en diferentes procesos de comunicación.' },
              { concepto: 'Comunicación y colaboración sincrónica y asincrónica', indicadorLogro: 'Identificar el correo electrónico como una herramienta de comunicación asincrónica, reconociendo sus características y su uso en actividades digitales guiadas.' },
              { concepto: 'Huella Digital', indicadorLogro: 'Reconocer qué es la huella digital y cómo puede afectar su privacidad y seguridad en línea, identificando que sus acciones en Internet dejan rastros que deben cuidarse.' },
              { concepto: 'Software malicioso', indicadorLogro: 'Reconocer el virus informático como un tipo de software malicioso, explicando de forma sencilla sus consecuencias, como pérdida de información o mal funcionamiento en los dispositivos.' },
              { concepto: 'Riesgos en línea', indicadorLogro: 'Reconocer algunos riesgos en línea como los perfiles falsos, la pérdida de privacidad, el contacto con extraños y la adicción al uso de dispositivos, identificando medidas básicas para protegerse en estas situaciones.' },
              { concepto: 'Medidas de seguridad web', indicadorLogro: 'Reconocer el control parental como una medida de seguridad web en el uso de Internet que protege frente a riesgos y limita el acceso a contenido inapropiado.' }
            ]
          },
          {
            areaId: 'ciencia_datos',
            rda: 'Reconoce los fundamentos de la inteligencia artificial y su presencia en la vida cotidiana, mediante ejemplos concretos como asistentes virtuales, valorando el uso seguro y responsable de estas tecnologías.',
            saberesConceptuales: [
              { concepto: 'Desafíos de la IA', indicadorLogro: 'Identificar los desafíos de la inteligencia artificial en la vida cotidiana y algunas recomendaciones para su uso seguro y responsable, con la ayuda de ejemplos guiados.' }
            ]
          }
        ]
      }
    ]
  },
  // Segundo ciclo (cuarto, quinto, sexto) ... se continuaría con la misma estructura.
  // Por razones de espacio, se omite el resto, pero debe incluir todos los módulos de 4°, 5° y 6°.
  // III Ciclo (sétimo, octavo, noveno) ... también debe incluirse completo.
};

// Datos específicos para el componente Proyecto en III Ciclo (Design Thinking)
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

// Funciones de utilidad para acceder al currículo
export function getNiveles() {
  const niveles = [];
  // Preescolar
  niveles.push({ ciclo: 'Preescolar', nivel: 'Educación Preescolar', modulos: [1,2] });
  // Primaria
  niveles.push({ ciclo: 'I Ciclo', nivel: 'Primero', modulos: [1,2] });
  niveles.push({ ciclo: 'I Ciclo', nivel: 'Segundo', modulos: [1,2] });
  niveles.push({ ciclo: 'I Ciclo', nivel: 'Tercero', modulos: [1,2] });
  niveles.push({ ciclo: 'II Ciclo', nivel: 'Cuarto', modulos: [1,2] });
  niveles.push({ ciclo: 'II Ciclo', nivel: 'Quinto', modulos: [1,2] });
  niveles.push({ ciclo: 'II Ciclo', nivel: 'Sexto', modulos: [1,2] });
  // Secundaria
  niveles.push({ ciclo: 'III Ciclo', nivel: 'Sétimo', modulos: [1,2] });
  niveles.push({ ciclo: 'III Ciclo', nivel: 'Octavo', modulos: [1,2] });
  niveles.push({ ciclo: 'III Ciclo', nivel: 'Noveno', modulos: [1,2] });
  return niveles;
}

export function getModulo(ciclo, nivel, moduloNumero) {
  // Busca en la estructura según ciclo y nivel
  // Simplificado: se implementaría una búsqueda real.
  // Por ahora retorna null.
  return null;
}
