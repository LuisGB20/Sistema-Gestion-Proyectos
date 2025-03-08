# Sistema de Gestión de Proyectos

---

# Nombre de Proyecto: 
Sistema de Gestión de Proyectos

-------

# Planteamiento del Problema
En un ámbito empresarial, la gestión de proyectos es clave fundamental para el éxito de cualquier organización. La planificación, ejecución y monitoreo adecuados permiten cumplir con objetivos dentro de los plazos establecidos y optimizar recursos. Un sistema de gestión de proyectos facilita la organización de tareas, asignación de responsabilidades y el seguimiento del progreso, mejorando la colaboración entre equipos y aumentando la eficiencia.

De acuerdo con el gerente de Deloitte Consulting, **Rodríguez Rodrigo**:

> “La gestión adecuada del alcance es esencial para el éxito de un proyecto. La mala gestión de alcance puede tener graves consecuencias y puede llevar a la falla del proyecto. Para superar los problemas asociados con la gestión de alcance, es necesario definir el alcance del proyecto de manera clara y específica, asegurarse de que los requisitos estén documentados adecuadamente y utilizar herramientas y técnicas de gestión de proyectos para planificar y controlar el alcance del proyecto de manera efectiva. Con una gestión adecuada del alcance, los proyectos pueden tener una mayor probabilidad de éxito.”

Teniendo en cuenta su artículo, donde menciona ejemplos de las diversas fallas que se pueden presentar en la gestión de proyectos, podemos destacar:

- Falta de utilización de herramientas y técnicas de gestión de proyectos.
- Falta de comunicación clara y constante.
- Dificultad para llevar un registro preciso de las horas trabajadas y la nómina.
- Escasa visibilidad sobre el avance real de los proyectos.
- Retrasos en la ejecución debido a la falta de sincronización entre equipos y recursos.

Es de ahí donde surge la idea de nuestro proyecto. Para la solución de estos problemas, se requiere una plataforma centralizada que permita gestionar todos los aspectos clave de un proyecto en una sola aplicación, garantizando un flujo de trabajo eficiente y organizado.

---

# Integrantes

- **Gomez Broca Luis Alberto**
- **Valier Sanchez Carlos Francisco**
- **Misael De Jesus Rosado Paat**
- **Fernando Alberto Villafaña Alfonseca** - DEADMOUS3 - **ffernando.villafanalfonseca@gmail.com**
- **Juan Diego Mendoza Gutierrez** - SublimeDevv - **juanmen1404@gmail.com**


----
# Tecnologías y Librerías por Utilizar

### Frameworks y Librerías Principales

- **Vue.js**: Framework progresivo de JavaScript para la construcción de interfaces de usuario. Es reactivo, componible y fácil de integrar con otras tecnologías.
- **Vuetify**: Framework de componentes basado en Vue.js y Material Design. Ofrece una gran variedad de componentes UI listos para usar con un diseño moderno y accesible.
- **Quasar.dev**: Framework de componentes basado en Vue, fácil de customizar e implementar.
- **PrimeVue**: Conjunto de componentes UI altamente personalizables para Vue.js, con una gran variedad de opciones y compatibilidad con estilos modernos.

### Administración del Estado

- **Pinia**: Biblioteca oficial para la gestión del estado en Vue.js. Es modular, ligera y compatible con TypeScript.

### Estilización y Diseño

- **Tailwind CSS**: Framework de CSS basado en utilidades que permite diseñar interfaces rápidamente utilizando clases predefinidas.
- **Heroicons**: Librería de íconos SVG diseñada para ser usada con Tailwind CSS.

### Herramientas de Desarrollo

- **Vite**: Herramienta de construcción moderna que optimiza el desarrollo en Vue.js con recarga rápida y compilación eficiente.
- **Volar**: Extensión para VSCode que proporciona autocompletado, resaltado de sintaxis y otras herramientas avanzadas para Vue.js.
- **vue-tsc**: Herramienta para verificación de tipos en proyectos Vue con TypeScript.
- **ESLint**: Linter para mejorar la calidad del código asegurando buenas prácticas y evitando errores comunes.

### Enrutamiento

- **Vue Router**: Sistema de enrutamiento oficial de Vue.js para manejar la navegación entre páginas o vistas en una aplicación.

### Validaciones

- **Vee Validate**: Biblioteca de validación de formularios para Vue.js. Se encarga del seguimiento de valores, la validación, los errores y los envíos.
- **Yup**: Constructor de esquemas para el análisis y validación de valores en tiempo de ejecución. Permite definir un esquema, transformar un valor para que coincida, verificar la estructura de un valor existente o ambas cosas.

### Manejo de Peticiones HTTP

- **Axios**: Cliente HTTP basado en promesas que facilita la comunicación con APIs REST, soporta interceptores y manejo avanzado de respuestas y errores.

### Manejo de Fechas y Tiempos

- **Moment.js**: Librería para trabajar con fechas y horas de manera sencilla, con soporte para formateo, manipulación y localización.


-----

# ¿Cómo correr el proyecto?

## Configuración de IDE Recomendada

[VSCode](https://code.visualstudio.com/)

## Configuración del Proyecto

Este proyecto requiere la instalación de dependencias y la ejecución de comandos específicos para su desarrollo, pruebas y despliegue. A continuación, se detallan los pasos para configurarlo correctamente.

### Instalación de Dependencias

Antes de ejecutar el proyecto, es necesario instalar todas las dependencias requeridas. Para ello, utiliza el siguiente comando:

```sh
npm install
```

Esto descargará e instalará todas las bibliotecas y paquetes necesarios definidos en el archivo package.json.

### Compilación y Recarga Activa para Desarrollo
Durante el desarrollo, es recomendable utilizar un servidor con recarga automática para visualizar los cambios en tiempo real. Para iniciarlo, ejecuta:

```sh
npm run dev
```
Este comando iniciará el servidor de desarrollo y te permitirá trabajar con la versión en vivo del proyecto.

### Verificación de Tipos, Compilación y Minificación para Producción

Cuando el proyecto esté listo para su despliegue, es necesario compilar y optimizar los archivos. Esto se hace con:

```sh
npm run build
```

Este comando generará una versión lista para producción, optimizando el rendimiento del código y minificando los archivos.

### Ejecución de Pruebas Unitarias con Vitest
Para asegurar que el código funcione correctamente, se pueden ejecutar pruebas unitarias con:

```sh
npm run test:unit
```

Vitest ejecutará las pruebas definidas en el proyecto y reportará los resultados, ayudando a detectar errores antes del despliegue.

Análisis de Código con ESLint
Para mantener un código limpio y seguir buenas prácticas, se recomienda analizar el código con ESLint. Para ello, usa:

```sh
npm run lint
```

Este comando revisará el código en busca de errores de sintaxis, formato y buenas prácticas, sugiriendo correcciones cuando sea necesario.
