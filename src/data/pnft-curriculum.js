// BASE DE DATOS CURRICULAR PNFT 2026 - TODOS LOS MÓDULOS
// Extraído de documentos oficiales MEP

export const pnftCurriculum = {
  'Preescolar': {
    'Básico Requerido': {
      module1: {
        areas: [
          {
            name: 'Apropiación Tecnológica y Digital',
            rdA: 'Identifica los dispositivos digitales considerando características funcionales, experimentando su utilidad y reconociendo la autoría, durante la accesibilidad, interacción y comunicación en la creación de recursos digitales.',
            conceptualKnowledge: [
              { id: 1, name: 'Computadora', achievementIndicator: 'Identificar qué es una computadora y algunas de sus características, a partir de experiencias prácticas de interacción con dispositivos digitales.' },
              { id: 2, name: 'Software', achievementIndicator: 'Reconocer elementos visuales básicos de la interfaz de software (iconos, botones, ventanas), interactuando con ellos mediante el uso guiado de dispositivos digitales.' },
              { id: 3, name: 'Herramientas de creación de contenido multimedia', achievementIndicator: 'Reconocer las herramientas de creación de contenido multimedia según su utilidad: editor gráfico, grabadora de audio y video, en la creación de recursos digitales.' }
            ]
          },
          {
            name: 'Programación y Algoritmos',
            rdA: 'Ordena secuencias integrando conceptos de programación como dato, evento, estado, ciclos, así como nociones de lateralidad y orientación espacial, en la solución de desafíos propuestos, utilizando la programación iconográfica por bloques.',
            conceptualKnowledge: [
              { id: 4, name: 'Entornos de programación iconográfico', achievementIndicator: 'Reconocer el entorno de programación iconográfico, interactuando con bloques de la interfaz, como desplazamiento, apariencia o sonido, mediante el uso guiado del docente.' },
              { id: 5, name: 'Lateralidad y orientación espacial', achievementIndicator: 'Reconocer los conceptos de lateralidad y orientación espacial en la construcción de secuencias de acciones para la solución de retos de programación.' },
              { id: 6, name: 'Evento', achievementIndicator: 'Reconocer que un evento desencadena una acción, identificando la relación de causa y efecto en juegos o actividades.' }
            ]
          }
        ],
        proceduralKnowledge: [
          { id: 1, name: 'Reconoce patrones', observable: 'Predice a partir de las regularidades, similitudes o características comunes de un conjunto de datos o situaciones, patrones que pueda aplicar en la solución a un problema o situación.' },
          { id: 2, name: 'Transfiere', observable: 'Transfiere conocimientos, habilidades y estrategias aprendidas previamente en un contexto específico, a situaciones diferentes y nuevas al resolver un problema o situación.' },
          { id: 3, name: 'Programa', observable: 'Programa mediante un entorno o IDE de programación para resolver un problema o situación.' },
          { id: 4, name: 'Comunica', observable: 'Comunica ideas o soluciones a problemas o situaciones de manera creativa, coherente y comprensible, compartiendo conocimientos con otros al resolver un problema o situación.' },
          { id: 5, name: 'Colabora', observable: 'Demuestra un trato constructivo y respetuoso para resolver un problema o situación específica, al trabajar con otros y así apoyar su aprendizaje y contribuir al de los demás al resolver un problema o situación.' },
          { id: 6, name: 'Piensa de forma creativa', observable: 'Desarrolla soluciones ingeniosas, innovadoras, originales con enfoques no convencionales, al resolver un problema o situación.' }
        ],
        attitudinalKnowledge: [
          { id: 1, name: 'Aprender del error', observable: 'Demuestra ante los errores un comportamiento que le permita ganar experiencia a partir de lecciones aprendidas producto de los errores, convirtiendo los desaciertos en oportunidades de aprendizaje.' },
          { id: 2, name: 'Flexibilidad para manejar problemas', observable: 'Demuestra un comportamiento hacia la adaptabilidad, flexibilidad y resiliencia ante los desafíos o situaciones imprevistas producto del entorno, la interacción con otros, o bien, con los recursos.' },
          { id: 3, name: 'Tolerancia a la frustración', observable: 'Demuestra ante los desafíos, un comportamiento hacia la búsqueda de la autoconfianza, motivación, autocontrol, paciencia y persistencia.' }
        ]
      },
      module2: { areas: [] }
    },
    'Óptimo': { module1: { areas: [] }, module2: { areas: [] } }
  },
  
  'I Ciclo': {
    '1°': {
      module1: {
        areas: [
          {
            name: 'Apropiación Tecnológica y Digital',
            rdA: 'Selecciona los dispositivos digitales y herramientas de productividad, mediante el uso de software y hardware, en la creación de archivos, creación y edición de multimedios, aprovechando Internet y respetando la propiedad intelectual en la realización de tareas para la accesibilidad a la información de forma segura y responsable.',
            conceptualKnowledge: [
              { id: 1, name: 'Computadora', achievementIndicator: 'Reconocer la computadora como una herramienta tecnológica, identificando sus características básicas, funciones e importancia en la vida cotidiana, por medio de la observación y manipulación práctica.' },
              { id: 2, name: 'Hardware', achievementIndicator: 'Identificar el hardware básico de una computadora, reconociendo dispositivos de entrada, salida y las acciones de encendido y apagado, mediante actividades prácticas guiadas.' },
              { id: 3, name: 'Software', achievementIndicator: 'Identificar el software de una computadora, reconociendo los elementos básicos de la interfaz de usuario mediante actividades prácticas guiadas.' }
            ]
          },
          {
            name: 'Programación y Algoritmos',
            rdA: 'Selecciona conceptos de programación como dato, secuencia, evento, estado, variables, operadores aritméticos y relacionales, condicionales simples, ciclo finito e infinito, en la programación por bloques para la solución de problemas.',
            conceptualKnowledge: [
              { id: 4, name: 'Entornos de programación iconográfico', achievementIndicator: 'Reconocer elementos básicos de un entorno de programación iconográfico, como bloques de desplazamiento, orientación, apariencia, sonido, eventos y control, mediante la navegación en la interfaz con actividades guiadas.' },
              { id: 5, name: 'Reconocimiento de patrones', achievementIndicator: 'Reconocer patrones de movimiento en secuencias de instrucciones simples para que un personaje siga una ruta desde un punto de inicio hasta un punto de llegada.' },
              { id: 6, name: 'Estado', achievementIndicator: 'Reconocer el estado de un objeto digital en relación con su orientación, dirección y tamaño, identificando variaciones en dichos atributos, mediante secuencias de programaciones simples.' },
              { id: 7, name: 'Algoritmo', achievementIndicator: 'Identificar un algoritmo en situaciones de la vida diaria, reconociendo secuencias lógicas y ordenadas de acciones, para ser representadas de forma analógica (dibujos, tarjetas, gestos) y/o digital (entorno iconográfico).' },
              { id: 8, name: 'Evento', achievementIndicator: 'Reconocer el evento como relación de causa y efecto al participar en juegos analógicos, identificando cómo una acción provoca una respuesta o cambio observable durante la dinámica.' }
            ]
          }
        ],
        proceduralKnowledge: [
          { id: 1, name: 'Reconoce patrones', observable: 'Predice a partir de las regularidades, similitudes o características comunes de un conjunto de datos o situaciones, patrones que pueda aplicar en la solución a un problema o situación.' },
          { id: 2, name: 'Abstrae', observable: 'Concluye cuáles son las características relevantes que debe considerar y cuáles debe omitir, al resolver un problema o situación.' },
          { id: 3, name: 'Generaliza', observable: 'Generaliza las funcionalidades o estructuras generales de un elemento que pueda aprovechar en otros contextos al resolver un problema o situación.' },
          { id: 4, name: 'Transfiere', observable: 'Transfiere conocimientos, habilidades y estrategias aprendidas previamente en un contexto específico, a situaciones diferentes y nuevas al resolver un problema o situación.' },
          { id: 5, name: 'Modulariza', observable: 'Resuelve un problema por partes menos complejas, sin perder de vista el todo que las origina, al resolver un problema o situación.' },
          { id: 6, name: 'Formula algoritmos', observable: 'Formula algoritmos por medio de una secuencia ordenada y detallada de pasos para resolver un problema o situación.' },
          { id: 7, name: 'Remezcla', observable: 'Combina diferentes ideas, técnicas o soluciones existentes, con la autorización correspondiente, de manera innovadora y creativa para resolver un problema o situación.' },
          { id: 8, name: 'Depura', observable: 'Valida el funcionamiento de los algoritmos en busca de errores para corregirlos al resolver un problema o situación.' },
          { id: 9, name: 'Programa', observable: 'Programa mediante un entorno o IDE de programación para resolver un problema o situación.' },
          { id: 10, name: 'Comunica', observable: 'Comunica ideas o soluciones a problemas o situaciones de manera creativa, coherente y comprensible, compartiendo conocimientos con otros al resolver un problema o situación.' },
          { id: 11, name: 'Colabora', observable: 'Demuestra un trato constructivo y respetuoso para resolver un problema o situación específica, al trabajar con otros y así apoyar su aprendizaje y contribuir al de los demás al resolver un problema o situación.' },
          { id: 12, name: 'Piensa de forma creativa', observable: 'Desarrolla soluciones ingeniosas, innovadoras, originales con enfoques no convencionales, al resolver un problema o situación.' },
          { id: 13, name: 'Maneja las tecnologías de forma ética y segura', observable: 'Aplica de manera consciente fundamentos de ética y seguridad digital al utilizar herramientas y recursos tecnológicos al resolver un problema o situación.' }
        ],
        attitudinalKnowledge: [
          { id: 1, name: 'Gusto por la precisión', observable: 'Demuestra ante los procesos de aprendizaje un comportamiento hacia la búsqueda de la exactitud, al ser minucioso con los detalles.' },
          { id: 2, name: 'Aprender del error', observable: 'Demuestra ante los errores un comportamiento que le permita ganar experiencia a partir de lecciones aprendidas producto de los errores, convirtiendo los desaciertos en oportunidades de aprendizaje.' },
          { id: 3, name: 'Flexibilidad para manejar problemas', observable: 'Demuestra un comportamiento hacia la adaptabilidad, flexibilidad y resiliencia ante los desafíos o situaciones imprevistas producto del entorno, la interacción con otros, o bien, con los recursos.' },
          { id: 4, name: 'Tolerancia a la frustración', observable: 'Demuestra ante los desafíos, un comportamiento hacia la búsqueda de la autoconfianza, motivación, autocontrol, paciencia y persistencia.' }
        ]
      },
      module2: { areas: [] }
    },
    '2°': { module1: { areas: [] }, module2: { areas: [] } },
    '3°': { module1: { areas: [] }, module2: { areas: [] } }
  },
  
  'II Ciclo': {
    '4°': { module1: { areas: [] }, module2: { areas: [] } },
    '5°': { module1: { areas: [] }, module2: { areas: [] } },
    '6°': { module1: { areas: [] }, module2: { areas: [] } }
  },
  
  'III Ciclo': {
    '7°': {
      module1: {
        areas: [
          {
            name: 'Apropiación Tecnológica y Digital',
            rdA: 'Combina herramientas digitales, tomando en cuenta fundamentos de tecnología, impacto de las TIC, seguridad y privacidad digital y, su experiencia de uso, en la realización de productos digitales.',
            conceptualKnowledge: [
              { id: 1, name: 'Computadora', achievementIndicator: 'Aplicar reglas básicas y responsabilidades durante el uso de una computadora, contribuyendo al cuidado, seguridad y prolongación de su vida útil.' },
              { id: 2, name: 'Hardware', achievementIndicator: 'Clasificar tipos de computadoras y sus componentes principales de hardware, identificando funciones de periféricos comunes al interactuar con dispositivos digitales.' },
              { id: 3, name: 'Software', achievementIndicator: 'Distinguir los tipos de software relacionándolos con sus funciones y usos en tareas cotidianas.' },
              { id: 4, name: 'Redes de comunicación', achievementIndicator: 'Identificar tipos de redes de comunicación y sus dispositivos principales (módem, router y puntos de acceso), explicando su funcionamiento y principios de comunicación durante la conexión a Internet en contextos cotidianos.' },
              { id: 5, name: 'Sistema operativo', achievementIndicator: 'Identificar las categorías de los sistemas operativos (escritorio y dispositivos móviles), describiendo su función básica y el uso de la papelera como herramienta que elimina y/o recupera archivos.' },
              { id: 6, name: 'Gestión de archivos', achievementIndicator: 'Aplicar las propiedades (tamaño, tipo y extensión) en la gestión de archivos para compartir información en diferentes entornos digitales.' },
              { id: 7, name: 'Herramientas de creación de contenido multimedia (editor de gráficos)', achievementIndicator: 'Diseñar productos visuales con herramientas de creación multimedia utilizando editores gráficos, aplicando principios básicos de diseños y formatos adecuados según la calidad requerida.' }
            ]
          },
          {
            name: 'Programación y Algoritmos',
            rdA: 'Integra conceptos de programación como eventos, operadores, estructuras de datos, estructuras de control, procedimientos, funciones, colecciones de datos y algoritmos (diagrama de flujo y pseudocódigo), en la solución de problemas reales.',
            conceptualKnowledge: [
              { id: 18, name: 'Entorno de programación textual o bloques', achievementIndicator: 'Reconocer un entorno de programación textual o por bloques, identificando sus funciones para aplicarlos en la resolución de ejercicios.' },
              { id: 19, name: 'Lógica de programación', achievementIndicator: 'Identificar la lógica de programación con el uso de proposiciones y conectores lógicos (AND, OR, NOT), reconociendo su uso en tablas de verdad para la evaluación de expresiones lógicas.' },
              { id: 20, name: 'Algoritmo', achievementIndicator: 'Reconocer el algoritmo identificando su estructura (entrada, proceso, salida) y aplicando sus características (preciso, finito, definido) como una representación clara y ordenada.' },
              { id: 21, name: 'Dato', achievementIndicator: 'Identificar tipos de dato y formas de almacenamiento, aplicándolos en la creación de algoritmos para resolver desafíos programados.' },
              { id: 22, name: 'Variable', achievementIndicator: 'Identificar tipos de variable, aplicando su gestión mediante declaraciones y asignaciones en un entorno de programación.' },
              { id: 23, name: 'Estructuras condicionales', achievementIndicator: 'Aplicar estructuras condicionales en un entorno de programación para la resolución de desafíos que requieran la toma de decisiones lógicas.' },
              { id: 24, name: 'Estructuras repetitivas', achievementIndicator: 'Aplicar estructuras repetitivas en un entorno de programación para resolver desafíos que requieren la ejecución cíclica de instrucciones.' },
              { id: 25, name: 'Operadores aritméticos', achievementIndicator: 'Aplicar operadores aritméticos (suma, resta, multiplicación y división) para resolver cálculos dentro de ejercicios de programación.' },
              { id: 26, name: 'Operadores relacionales', achievementIndicator: 'Aplicar operadores relacionales para realizar comparaciones dentro de ejercicios de programación.' },
              { id: 27, name: 'Operadores lógicos', achievementIndicator: 'Aplicar operadores lógicos (Y, O, NO) en la resolución de desafíos de programación que impliquen decisiones.' },
              { id: 28, name: 'Evento', achievementIndicator: 'Aplicar un evento como acción que se detona mediante una causa y un efecto al resolver desafíos programados.' }
            ]
          }
        ],
        proceduralKnowledge: [
          { id: 1, name: 'Reconoce patrones', observable: 'Predice a partir de las regularidades, similitudes o características comunes de un conjunto de datos o situaciones, patrones que pueda aplicar en la solución a un problema o situación.' },
          { id: 2, name: 'Abstrae', observable: 'Concluye cuáles son las características relevantes que debe considerar y cuáles debe omitir, al resolver un problema o situación.' },
          { id: 3, name: 'Generaliza', observable: 'Generaliza las funcionalidades o estructuras generales de un elemento que pueda aprovechar en otros contextos al resolver un problema o situación.' },
          { id: 4, name: 'Transfiere', observable: 'Transfiere conocimientos, habilidades y estrategias aprendidas previamente en un contexto específico, a situaciones diferentes y nuevas al resolver un problema o situación.' },
          { id: 5, name: 'Modulariza', observable: 'Resuelve un problema por partes menos complejas, sin perder de vista el todo que las origina, al resolver un problema o situación.' },
          { id: 6, name: 'Formula algoritmos', observable: 'Formula algoritmos por medio de una secuencia ordenada y detallada de pasos para resolver un problema o situación.' },
          { id: 7, name: 'Remezcla', observable: 'Combina diferentes ideas, técnicas o soluciones existentes, con la autorización correspondiente, de manera innovadora y creativa para resolver un problema o situación.' },
          { id: 8, name: 'Depura', observable: 'Valida el funcionamiento de los algoritmos en busca de errores para corregirlos al resolver un problema o situación.' },
          { id: 9, name: 'Programa', observable: 'Programa mediante un entorno o IDE de programación para resolver un problema o situación.' },
          { id: 10, name: 'Comunica', observable: 'Comunica ideas o soluciones a problemas o situaciones de manera creativa, coherente y comprensible, compartiendo conocimientos con otros al resolver un problema o situación.' },
          { id: 11, name: 'Colabora', observable: 'Demuestra un trato constructivo y respetuoso para resolver un problema o situación específica, al trabajar con otros y así apoyar su aprendizaje y contribuir al de los demás al resolver un problema o situación.' },
          { id: 12, name: 'Piensa de forma creativa', observable: 'Desarrolla soluciones ingeniosas, innovadoras, originales con enfoques no convencionales, al resolver un problema o situación.' },
          { id: 13, name: 'Maneja las tecnologías de forma ética y segura', observable: 'Aplica de manera consciente fundamentos de ética y seguridad digital al utilizar herramientas y recursos tecnológicos al resolver un problema o situación.' }
        ],
        attitudinalKnowledge: [
          { id: 1, name: 'Gusto por la precisión', observable: 'Demuestra ante los procesos de aprendizaje un comportamiento hacia la búsqueda de la exactitud, al ser minucioso con los detalles.' },
          { id: 2, name: 'Aprender del error', observable: 'Demuestra ante los errores un comportamiento que le permita ganar experiencia a partir de lecciones aprendidas producto de los errores, convirtiendo los desaciertos en oportunidades de aprendizaje.' },
          { id: 3, name: 'Flexibilidad para manejar problemas', observable: 'Demuestra un comportamiento hacia la adaptabilidad, flexibilidad y resiliencia ante los desafíos o situaciones imprevistas producto del entorno, la interacción con otros, o bien, con los recursos.' },
          { id: 4, name: 'Tolerancia a la frustración', observable: 'Demuestra ante los desafíos, un comportamiento hacia la búsqueda de la autoconfianza, motivación, autocontrol, paciencia y persistencia.' }
        ]
      },
      module2: { areas: [] }
    },
    '8°': {
      module1: {
        areas: [
          {
            name: 'Apropiación Tecnológica y Digital',
            rdA: 'Combina herramientas digitales, tomando en cuenta fundamentos de tecnología, impacto de las TIC, seguridad y privacidad digital y, su experiencia de uso, en la realización de productos digitales.',
            conceptualKnowledge: [
              { id: 1, name: 'Hardware', achievementIndicator: 'Analizar el funcionamiento de los componentes internos del hardware, describiendo cómo influyen en el rendimiento y desempeño del equipo mediante ejemplos prácticos o simulaciones.' },
              { id: 2, name: 'Software', achievementIndicator: 'Analizar los tipos de software según su función, comparando las características y usos en diferentes contextos personales, académicos o sociales.' },
              { id: 3, name: 'Redes de comunicación', achievementIndicator: 'Identificar las funciones de las unidades de almacenamiento de las redes de comunicación, aplicándolas en la gestión y organización de archivos compartidos en entornos digitales.' },
              { id: 4, name: 'Conexión entre dispositivos', achievementIndicator: 'Distinguir las formas de conexión entre dispositivos mediante comunicación física o inalámbrica, identificando sus aplicaciones en contextos cotidianos.' },
              { id: 5, name: 'Sistema Operativo', achievementIndicator: 'Reconocer las características del sistema operativo y la diferencia entre software libre y de paga a partir de su funcionalidad, licencia y uso ético.' },
              { id: 6, name: 'Gestión de archivos', achievementIndicator: 'Aplicar la compresión y descompresión de archivos como parte de la gestión de archivos digitales, durante el almacenamiento y la manipulación de la información.' },
              { id: 7, name: 'Herramientas de creación de contenido multimedia (edición de audio y video)', achievementIndicator: 'Utilizar herramientas de creación de contenido multimedia en la edición de audio o video, aplicando criterios de diseño y formato en relación con la calidad del producto.' },
              { id: 8, name: 'Internet de las cosas', achievementIndicator: 'Analizar aplicaciones del Internet de las cosas en la automatización de tareas, valorando sus ventajas y desventajas en contextos cotidianos.' }
            ]
          },
          {
            name: 'Programación y Algoritmos',
            rdA: 'Integra conceptos de programación como eventos, operadores, estructuras de datos, estructuras de control, procedimientos, funciones, colecciones de datos y algoritmos (diagrama de flujo y pseudocódigo), en la solución de problemas reales.',
            conceptualKnowledge: [
              { id: 9, name: 'Entorno de programación textual o bloques para programar mecanismos robóticos', achievementIndicator: 'Aplicar el entorno de programación textual o por bloques para programar mecanismos robóticos, utilizando estructuras y eventos en la solución de actividades de automatización.' }
            ]
          },
          {
            name: 'Computación Física y Robótica',
            rdA: 'Aplica fundamentos de robótica, computación física, electrónica, mecánica y sistemas robóticos autónomos en la programación y construcción de prototipos que resuelven un problema.',
            conceptualKnowledge: [
              { id: 10, name: 'Robot', achievementIndicator: 'Reconocer qué es un robot, sus tipos y componentes (cuerpo, sistema sensorial y sistema de control), diferenciándolo de otros dispositivos no robóticos.' },
              { id: 11, name: 'Robótica', achievementIndicator: 'Diferenciar la computación física con la robótica, identificando cómo los sensores, actuadores y sistemas de control se integran en mecanismos robóticos.' },
              { id: 12, name: 'Mecánica aplicada a la robótica', achievementIndicator: 'Emplear principios de la mecánica aplicados a la robótica, como la estructura y la estabilidad, en el diseño de mecanismos robóticos.' },
              { id: 13, name: 'Mecanismos', achievementIndicator: 'Reconocer los tipos de mecanismos, identificando su función principal en la transmisión y transformación del movimiento mediante la simulación de prototipos.' },
              { id: 14, name: 'Circuito eléctrico', achievementIndicator: 'Identificar los componentes de un circuito eléctrico y su funcionamiento, comprendiendo la relación entre carga eléctrica, voltaje, corriente, resistencias e interruptores mediante la simulación de prototipos.' },
              { id: 15, name: 'Fundamentos de electrónica', achievementIndicator: 'Identificar fundamentos de electrónica, reconociendo la función de pines de entrada y salida, así como la diferencia entre señales analógicas y digitales durante la simulación o construcción de circuitos.' },
              { id: 16, name: 'Microcontrolador', achievementIndicator: 'Comprender los componentes básicos de un microcontrolador, aplicando la función de pines digitales y analógicos y cómo se establece la comunicación entre el programa y la tarjeta microcontroladora durante la exploración o simulación de prototipos.' }
            ]
          }
        ],
        proceduralKnowledge: [
          { id: 1, name: 'Reconoce patrones', observable: 'Predice a partir de las regularidades, similitudes o características comunes de un conjunto de datos o situaciones, patrones que pueda aplicar en la solución a un problema o situación.' },
          { id: 2, name: 'Abstrae', observable: 'Concluye cuáles son las características relevantes que debe considerar y cuáles debe omitir, al resolver un problema o situación.' },
          { id: 3, name: 'Generaliza', observable: 'Generaliza las funcionalidades o estructuras generales de un elemento que pueda aprovechar en otros contextos al resolver un problema o situación.' },
          { id: 4, name: 'Transfiere', observable: 'Transfiere conocimientos, habilidades y estrategias aprendidas previamente en un contexto específico, a situaciones diferentes y nuevas al resolver un problema o situación.' },
          { id: 5, name: 'Modulariza', observable: 'Resuelve un problema por partes menos complejas, sin perder de vista el todo que las origina, al resolver un problema o situación.' },
          { id: 6, name: 'Formula algoritmos', observable: 'Formula algoritmos por medio de una secuencia ordenada y detallada de pasos para resolver un problema o situación.' },
          { id: 7, name: 'Remezcla', observable: 'Combina diferentes ideas, técnicas o soluciones existentes, con la autorización correspondiente, de manera innovadora y creativa para resolver un problema o situación.' },
          { id: 8, name: 'Depura', observable: 'Valida el funcionamiento de los algoritmos en busca de errores para corregirlos al resolver un problema o situación.' },
          { id: 9, name: 'Programa', observable: 'Programa mediante un entorno o IDE de programación para resolver un problema o situación.' },
          { id: 10, name: 'Comunica', observable: 'Comunica ideas o soluciones a problemas o situaciones de manera creativa, coherente y comprensible, compartiendo conocimientos con otros al resolver un problema o situación.' },
          { id: 11, name: 'Colabora', observable: 'Demuestra un trato constructivo y respetuoso para resolver un problema o situación específica, al trabajar con otros y así apoyar su aprendizaje y contribuir al de los demás al resolver un problema o situación.' },
          { id: 12, name: 'Piensa de forma creativa', observable: 'Desarrolla soluciones ingeniosas, innovadoras, originales con enfoques no convencionales, al resolver un problema o situación.' },
          { id: 13, name: 'Maneja las tecnologías de forma ética y segura', observable: 'Aplica de manera consciente fundamentos de ética y seguridad digital al utilizar herramientas y recursos tecnológicos al resolver un problema o situación.' }
        ],
        attitudinalKnowledge: [
          { id: 1, name: 'Gusto por la precisión', observable: 'Demuestra ante los procesos de aprendizaje un comportamiento hacia la búsqueda de la exactitud, al ser minucioso con los detalles.' },
          { id: 2, name: 'Aprender del error', observable: 'Demuestra ante los errores un comportamiento que le permita ganar experiencia a partir de lecciones aprendidas producto de los errores, convirtiendo los desaciertos en oportunidades de aprendizaje.' },
          { id: 3, name: 'Flexibilidad para manejar problemas', observable: 'Demuestra un comportamiento hacia la adaptabilidad, flexibilidad y resiliencia ante los desafíos o situaciones imprevistas producto del entorno, la interacción con otros, o bien, con los recursos.' },
          { id: 4, name: 'Tolerancia a la frustración', observable: 'Demuestra ante los desafíos, un comportamiento hacia la búsqueda de la autoconfianza, motivación, autocontrol, paciencia y persistencia.' }
        ]
      },
      module2: { areas: [] }
    },
    '9°': { module1: { areas: [] }, module2: { areas: [] } }
  }
};

// Componente Proyecto - III Ciclo (Design Thinking)
export const projectComponent = {
  stage1_initial: {
    name: 'Etapa Inicial',
    designThinkingPhases: ['Empatizar', 'Definir', 'Idear'],
    indicators: [
      {
        phase: 'Empatizar',
        logro: 'Describir las necesidades, deseos y motivaciones de usuarios o clientes que tienen un problema o situación por resolver.',
        evaluacion: 'Describe un problema o situación por resolver que es importante para un usuario o cliente. Registra los intereses y necesidades del usuario ante un problema o situación a resolver, por medio de entrevistas, observaciones, grabaciones, encuestas, entre otras.'
      },
      {
        phase: 'Definir',
        logro: 'Sintetizar los hallazgos relacionados con los intereses y necesidades del usuario o cliente, de modo que se entienda con claridad el problema o situación a resolver.',
        evaluacion: 'Sintetiza los intereses y necesidades del usuario o cliente en la construcción de un producto comunicativo.'
      },
      {
        phase: 'Idear',
        logro: 'Seleccionar la idea más eficiente para ofrecer una posible solución a un problema o situación por resolver.',
        evaluacion: 'Selecciona la idea que ofrezca la solución más eficiente para resolver el problema o situación. Justifica de manera clara, con al menos dos ideas, por qué la solución elegida es la más eficiente, comparándola con otras.'
      }
    ],
    weight: 30
  },
  stage2_development: {
    name: 'Etapa de Desarrollo',
    designThinkingPhases: ['Prototipar'],
    indicators: [
      {
        phase: 'Prototipar',
        logro: 'Crear un prototipo tangible o una representación visual.',
        evaluacion: 'El prototipo tangible o la representación visual debe ser realista y factible con los recursos actuales. Resuelve el problema o situación.'
      }
    ],
    weight: 40
  },
  stage3_final: {
    name: 'Etapa Final',
    designThinkingPhases: ['Probar', 'Evaluar'],
    indicators: [
      {
        phase: 'Probar/Evaluar',
        logro: 'Evaluar el alcance del prototipo, qué funciona y qué no.',
        evaluacion: 'Recopila retroalimentación de los usuarios o cliente, prueba la efectividad y mejora las soluciones antes de implementarlas.'
      }
    ],
    weight: 30
  }
};

// Evaluación MEP 2026
export const evaluationComponents = {
  MEP: {
    periods: 2,
    components: [
      { name: 'Trabajo Cotidiano', percentage: 35, minActivities: null },
      { name: 'Tareas', percentage: 10, minActivities: 3 },
      { name: 'Pruebas', percentage: 30, minActivities: 2 },
      { name: 'Proyecto', percentage: 15, minActivities: null },
      { name: 'Asistencia', percentage: 10, minActivities: null }
    ]
  },
  Privado: {
    periods: 3,
    components: [
      { name: 'Trabajo Cotidiano', percentage: 30, minActivities: null },
      { name: 'Tareas', percentage: 10, minActivities: 3 },
      { name: 'Pruebas', percentage: 30, minActivities: 2 },
      { name: 'Proyecto', percentage: 20, minActivities: null },
      { name: 'Asistencia', percentage: 10, minActivities: null }
    ]
  }
};

export default pnftCurriculum;
