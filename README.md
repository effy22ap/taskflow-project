# Diseño de mi primera App
# 💜 TaskFlow: Tu Gestor de Tareas Inteligente

**TaskFlow** es una aplicación de gestión de tareas (To-Do List) moderna, minimalista y diseñada con una estética lila vibrante. Este proyecto obtiene ayuda de desarrollo asistido por Inteligencia Artificial (Gemini & Cursor), aparte de estar desarrollada como una Single Page Application (SPA), integrada con un backend mediante una API REST.

## ✨ Características Principales
- **Diseño Moderno:** Interfaz estilizada con Tailwind CSS en tonos púrpuras y lilas.
- **Modo Oscuro:** Adaptación visual automática para cuidar tu vista.
- **Persistencia:** Tus tareas no se borran al cerrar el navegador gracias a `localStorage`.
- **Búsqueda en tiempo real:** Encuentra cualquier tarea al instante. (Funcionalidad IA)
- **Filtros Avanzados:** Organiza tu día filtrando por estado. (Funcionalidad IA)
-**🖊️ Edición Inline:** Capacidad de editar el título de las tareas haciendo clic directamente sobre ellas.

-**📊 Estadísticas Reales:** Contadores dinámicos que reflejan el estado actual de la base de datos (Total, Pendientes y Completadas)

## 🚀 Ejemplos de Uso
1. **Añadir una tarea:** Escribe "Estudiar JavaScript" en el campo superior y pulsa Enter.
2. **Priorizar:** Puedes añadir etiquetas de texto para organizar tus deberes.
3. **Buscar:** Si tienes muchas tareas, usa la barra de búsqueda superior para filtrar por palabras clave.
4. **Completar:** Haz clic en el círculo de la izquierda para tachar una tarea terminada.

## 🛠️ Tecnologías Utilizadas
- **HTML5 & JavaScript (ES6+)**
- **Tailwind CSS** (Framework de estilos)
- **Git & GitHub** (Control de versiones)
- **AI Tools:** ChatGPT,Claude, Flash & Cursor IDE.
-**Comunicación:** API Fetch nativa.

## 📖 Documentación Técnica
El proyecto cuenta con una carpeta detallada de documentación sobre el uso de IA en `docs/ai/`:
- `ai-comparison.md`: Comparativa entre asistentes.
- `prompt-engineering.md`: Estrategias de comunicación con la IA.
- `mcp-workflow.md`: Uso del Model Context Protocol.

## 🏗️ Arquitectura del Proyecto
Este proyecto utiliza una arquitectura de **Separación de Responsabilidades**:
- **Frontend:** Vanilla JavaScript con gestión de estado en memoria y comunicación asíncrona.
- **Backend:** API REST construida con Node.js y Express.
- **Comunicación:** Uso de `fetch` API para peticiones HTTP (GET, POST, DELETE).

## 🛠️ Middlewares y Seguridad
- **CORS:** Implementado para permitir peticiones desde el origen del frontend.
- **JSON Parser:** Middleware para procesar cuerpos de mensajes complejos.
- **Manejador de Errores:** Sistema global que intercepta excepciones y devuelve códigos HTTP semánticos (400, 404, 500).

🏗️ 1. Arquitectura del Sistema
El proyecto sigue un patrón de diseño desacoplado donde el frontend y el backend se comunican de forma transparente:

📂 Raíz del Proyecto: Contiene los archivos principales de la interfaz (index.html y script.js).

📂 src/api/: Contiene cliente.js, nuestro archivo dedicado exclusivamente a la comunicación de red (Capa de Red).

📂 server/: Estructura de Node.js donde reside la lógica del servidor, modelos y controladores de la API.

📂 docs/: Documentación técnica adicional sobre herramientas de backend.
## 📡 API Endpoints
- `GET /api/v1/tasks`: Recupera todas las tareas.
- `POST /api/v1/tasks`: Crea una nueva tarea (requiere `{ "title": "..." }`).
- `DELETE /api/v1/tasks/:id`: Elimina una tarea por su ID único.
---
Hecho con ❤️ y un toque de IA.

https://taskflow-project-effy22aps-projects.vercel.app/


## 📝 Documentación de Funciones Principales

Se ha utilizado asistencia de IA para documentar la lógica del proyecto mediante JSDoc. Las funciones clave incluyen:
- `saveTasks`: Maneja la persistencia en LocalStorage.
- `render`: Motor de renderizado dinámico que actualiza el DOM de forma eficiente.
- `startInlineEdit`: Sistema de edición reactivo sin necesidad de ventanas modales.
- `getVisibleTasks`: Algoritmo de filtrado combinado (Búsqueda + Estado).