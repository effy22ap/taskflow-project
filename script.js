import { taskApi } from './server/src/api/cliente.js';

const STORAGE_KEYS = { theme: 'theme' };
let tasks = [];
let activeFilter = 'all';

/** @param {any} raw */
const normalizeTask = (raw) => ({
    id: String(raw.id || raw._id || Date.now()),
    title: String(raw.title ?? ''),
    completed: Boolean(raw.completed)
});

// --- CARGA Y GUARDADO ---
const loadInitialData = async () => {
    try {
        const data = await taskApi.getAll();
        tasks = Array.isArray(data) ? data.map(normalizeTask) : [];
        render();
    } catch (e) { console.error("Error al cargar:", e); }
};

// --- ACCIONES DEL SERVIDOR ---
const addTask = async (title) => {
    try {
        const newTask = await taskApi.create(title);
        tasks.push(normalizeTask(newTask));
        render();
    } catch (e) { alert("Error al guardar en el servidor"); }
};

const deleteTask = async (id) => {
    try {
        await taskApi.delete(id);
        tasks = tasks.filter(t => t.id !== id);
        render();
    } catch (e) { console.error(e); }
};

const toggleTask = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    try {
        const updated = await taskApi.update(id, { completed: !task.completed });
        tasks = tasks.map(t => t.id === id ? normalizeTask(updated) : t);
        render();
    } catch (e) { console.error(e); }
};

// --- EDICIÓN INLINE ---
const startInlineEdit = (li, taskId) => {
    const task = tasks.find(t => t.id === taskId);
    const titleSpan = li.querySelector('[data-role="title"]');
    if (!task || !titleSpan) return;

    const input = document.createElement('input');
    input.value = task.title;
    input.className = "flex-1 bg-white dark:bg-gray-700 border-2 border-brand-purple rounded-lg px-2 py-1 outline-none text-gray-800 dark:text-white";
    
    const saveEdit = async () => {
        const newTitle = input.value.trim();
        if (newTitle && newTitle !== task.title) {
            try {
                const updated = await taskApi.update(taskId, { title: newTitle });
                tasks = tasks.map(t => t.id === taskId ? normalizeTask(updated) : t);
            } catch (e) { console.error(e); }
        }
        render();
    };

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') saveEdit();
        if (e.key === 'Escape') render();
    });

    input.addEventListener('blur', saveEdit);
    titleSpan.replaceWith(input);
    input.focus();
};

// --- RENDERIZADO ---
const render = () => {
    const listEl = document.getElementById('task-list');
    if (!listEl) return;

    const query = (document.getElementById('search-input')?.value ?? '').toLowerCase();
    const visible = tasks.filter(t => {
        const matches = t.title.toLowerCase().includes(query);
        if (activeFilter === 'pending') return matches && !t.completed;
        if (activeFilter === 'completed') return matches && t.completed;
        return matches;
    });

    listEl.innerHTML = '';
    visible.forEach(task => {
        const li = document.createElement('li');
        li.dataset.taskId = task.id;
        li.className = `flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm transition-all ${task.completed ? 'opacity-60' : ''}`;
        
        li.innerHTML = `
            <div class="flex-1 mr-4">
                <span data-role="title" class="cursor-pointer font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-200'}">
                    ${task.title}
                </span>
            </div>
            <div class="flex items-center gap-2">
                <button data-action="toggle" class="relative z-10 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-xl">
                    <span class="pointer-events-none">${task.completed ? '↩️' : '✅'}</span>
                </button>
                <button data-action="edit" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-xl">
                    <span class="pointer-events-none">✏️</span>
                </button>
                <button data-action="delete" class="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-md text-xl">
                    <span class="pointer-events-none">🗑️</span>
                </button>
            </div>
        `;
        listEl.appendChild(li);
    });
    // Actualizar estadísticas
    document.getElementById('stat-total').textContent = tasks.length;
    document.getElementById('stat-pending').textContent = tasks.filter(t => !t.completed).length;
    document.getElementById('stat-completed').textContent = tasks.filter(t => t.completed).length;
    document.getElementById('pending-summary').textContent = `Tienes ${tasks.filter(t => !t.completed).length} tareas pendientes`;
};
// --- INICIALIZACIÓN  ---
document.addEventListener('DOMContentLoaded', () => {
    loadInitialData();

    // Formulario de añadir
    document.getElementById('task-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('task-input');
        if (input.value.trim()) {
            addTask(input.value.trim());
            input.value = '';
        }
    });

    // Delegación
document.getElementById('task-list')?.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-action]');
        const li = e.target.closest('li');
        
        if (!li) return;
        const id = li.dataset.taskId;

        if (btn) {
            e.preventDefault();
            e.stopPropagation();
            const action = btn.dataset.action;
            if (action === 'toggle') toggleTask(id); // Llamamos a la función correcta
            else if (action === 'delete') deleteTask(id);
            else if (action === 'edit') startInlineEdit(li, id);
            return; 
        }

        if (e.target.dataset.role === 'title') {
            startInlineEdit(li, id);
        }
    });
    // Modo Oscuro
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    const applyTheme = (theme) => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem(STORAGE_KEYS.theme, theme);
    };

    darkModeBtn?.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');
        applyTheme(isDark ? 'light' : 'dark');
    });

    applyTheme(localStorage.getItem(STORAGE_KEYS.theme) === 'dark' ? 'dark' : 'light');
});