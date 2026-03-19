# Diseño de mi primera App
# 💜 TaskFlow: Tu Gestor de Tareas Inteligente

**TaskFlow** es una aplicación de gestión de tareas (To-Do List) moderna, minimalista y diseñada con una estética lila vibrante. Este proyecto nace como un experimento de desarrollo asistido por Inteligencia Artificial (Gemini & Cursor).

## ✨ Características Principales
- **Diseño Moderno:** Interfaz estilizada con Tailwind CSS en tonos púrpuras y lilas.
- **Modo Oscuro:** Adaptación visual automática para cuidar tu vista.
- **Persistencia:** Tus tareas no se borran al cerrar el navegador gracias a `localStorage`.
- **Búsqueda en tiempo real:** Encuentra cualquier tarea al instante. (Funcionalidad IA)
- **Filtros Avanzados:** Organiza tu día filtrando por estado. (Funcionalidad IA)

## 🚀 Ejemplos de Uso
1. **Añadir una tarea:** Escribe "Estudiar JavaScript" en el campo superior y pulsa Enter.
2. **Priorizar:** Puedes añadir etiquetas de texto para organizar tus deberes.
3. **Buscar:** Si tienes muchas tareas, usa la barra de búsqueda superior para filtrar por palabras clave.
4. **Completar:** Haz clic en el círculo de la izquierda para tachar una tarea terminada.

## 🛠️ Tecnologías Utilizadas
- **HTML5 & JavaScript (ES6+)**
- **Tailwind CSS** (Framework de estilos)
- **Git & GitHub** (Control de versiones)
- **AI Tools:** ChatGPT,Claude, Gemini 3 Flash & Cursor IDE.

## 📖 Documentación Técnica
El proyecto cuenta con una carpeta detallada de documentación sobre el uso de IA en `docs/ai/`:
- `ai-comparison.md`: Comparativa entre asistentes.
- `prompt-engineering.md`: Estrategias de comunicación con la IA.
- `mcp-workflow.md`: Uso del Model Context Protocol.

---
Hecho con ❤️ y un toque de IA.

https://taskflow-project-effy22aps-projects.vercel.app/


## 📝 Documentación de Funciones Principales

Se ha utilizado asistencia de IA para documentar la lógica del proyecto mediante JSDoc. Las funciones clave incluyen:
- `saveTasks`: Maneja la persistencia en LocalStorage.
- `render`: Motor de renderizado dinámico que actualiza el DOM de forma eficiente.
- `startInlineEdit`: Sistema de edición reactivo sin necesidad de ventanas modales.
- `getVisibleTasks`: Algoritmo de filtrado combinado (Búsqueda + Estado).