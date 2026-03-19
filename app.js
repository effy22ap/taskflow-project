// Archivo principal de la app (nuevo nombre más claro).
// Mantengo el contenido aquí para poder migrar desde `script.js` sin romper el HTML.

/**
 * @typedef {'all' | 'pending' | 'completed'} TaskFilter
 *
 * @typedef Task
 * @property {string} id
 * @property {string} title
 * @property {boolean} completed
 * @property {string} createdAtISO
 */

const searchInput = document.getElementById('searchInput');
const STORAGE_KEYS = {
    tasks: 'taskflow_tasks',
    theme: 'theme',
};

/** @returns {Task[]} */
const loadTasks = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.tasks);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

/** @param {Task[]} nextTasks */
const saveTasks = (nextTasks) => {
    localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(nextTasks));
};

/** @returns {string} */
const createId = () => {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }
    return String(Date.now());
};

/** @type {Task[]} */
let tasks = loadTasks();
/** @type {TaskFilter} */
let activeFilter = 'all';

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskError = document.getElementById('task-error');
const taskListEl = document.getElementById('task-list');
const statTotal = document.getElementById('stat-total');
const statCompleted = document.getElementById('stat-completed');
const statPending = document.getElementById('stat-pending');
const searchInput = document.getElementById('search-input');
const filterAllBtn = document.getElementById('filter-all');
const filterPendingBtn = document.getElementById('filter-pending');
const filterCompletedBtn = document.getElementById('filter-completed');
const completeAllBtn = document.getElementById('complete-all');
const clearCompletedBtn = document.getElementById('clear-completed');

/** @param {string} message */
const showFormError = (message) => {
    if (!taskError) return;
    taskError.textContent = message;
    taskError.classList.remove('hidden');
};

const clearFormError = () => {
    if (!taskError) return;
    taskError.textContent = '';
    taskError.classList.add('hidden');
};

/**
 * @param {string} titleRaw
 * @param {{ ignoreTaskId?: string }} [options]
 * @returns {{ ok: true, value: string } | { ok: false, message: string }}
 */
const validateTaskTitle = (titleRaw, options = {}) => {
    const title = titleRaw.trim();
    if (!title) return { ok: false, message: 'La tarea no puede estar vacía.' };
    if (title.length < 2) return { ok: false, message: 'La tarea debe tener al menos 2 caracteres.' };
    if (title.length > 80) return { ok: false, message: 'La tarea no puede superar 80 caracteres.' };
    if (!/[A-Za-zÀ-ÿ0-9]/.test(title)) return { ok: false, message: 'La tarea debe contener al menos una letra o número.' };

    const normalized = title.toLocaleLowerCase();
    const isDuplicate = tasks.some((t) => {
        if (options.ignoreTaskId && t.id === options.ignoreTaskId) return false;
        return t.title.trim().toLocaleLowerCase() === normalized;
    });
    if (isDuplicate) return { ok: false, message: 'Ya existe una tarea con ese nombre.' };

    return { ok: true, value: title };
};

/** @param {Task[]} next */
const setTasks = (next) => {
    tasks = next;
    saveTasks(tasks);
    render();
};

/** @param {string} title */
const addTask = (title) => {
    /** @type {Task} */
    const newTask = {
        id: createId(),
        title,
        completed: false,
        createdAtISO: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
};

/** @param {string} taskId */
const deleteTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
};

/** @param {string} taskId */
const toggleTaskCompleted = (taskId) => {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)));
};

/** @param {string} taskId */
const editTaskTitle = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const newTitleRaw = prompt('Edita el título de la tarea:', task.title);
    if (newTitleRaw == null) return;

    const validation = validateTaskTitle(newTitleRaw, { ignoreTaskId: taskId });
    if (!validation.ok) {
        alert(validation.message);
        return;
    }

    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, title: validation.value } : t)));
};

const completeAll = () => {
    if (!tasks.length) return;
    setTasks(tasks.map((t) => (t.completed ? t : { ...t, completed: true })));
};

const clearCompleted = () => {
    setTasks(tasks.filter((t) => !t.completed));
};

/** @param {TaskFilter} nextFilter */
const setActiveFilter = (nextFilter) => {
    activeFilter = nextFilter;
    render();
};

/** @returns {Task[]} */
const getVisibleTasks = () => {
    const query = (searchInput?.value ?? '').trim().toLocaleLowerCase();

    return tasks.filter((t) => {
        const matchesQuery = !query || t.title.toLocaleLowerCase().includes(query);
        if (!matchesQuery) return false;
        if (activeFilter === 'pending') return !t.completed;
        if (activeFilter === 'completed') return t.completed;
        return true;
    });
};

/**
 * @param {Task} task
 * @returns {HTMLLIElement}
 */
const createTaskListItem = (task) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.dataset.taskId = task.id;

    const titleSpan = document.createElement('span');
    titleSpan.textContent = task.title;
    if (task.completed) {
        titleSpan.style.textDecoration = 'line-through';
        titleSpan.style.color = 'gray';
    }

    const actions = document.createElement('div');
    actions.className = 'actions';

    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.dataset.action = 'toggle';
    toggleBtn.textContent = task.completed ? '↩️' : '✅';

    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.dataset.action = 'edit';
    editBtn.textContent = '✏️';

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.dataset.action = 'delete';
    deleteBtn.textContent = '🗑️';
    deleteBtn.style.backgroundColor = '#e74c3c';
    deleteBtn.style.color = 'white';

    actions.append(toggleBtn, editBtn, deleteBtn);
    li.append(titleSpan, actions);
    return li;
};

const renderStats = () => {
    const total = tasks.length;
    const completed = tasks.reduce((acc, t) => acc + (t.completed ? 1 : 0), 0);
    statTotal.textContent = String(total);
    statCompleted.textContent = String(completed);
    statPending.textContent = String(total - completed);
};

const renderFilterState = () => {
    const buttons = [filterAllBtn, filterPendingBtn, filterCompletedBtn].filter(Boolean);
    buttons.forEach((btn) => {
        const filter = btn.dataset.filter;
        const isActive = filter === activeFilter;
        btn.setAttribute('aria-pressed', String(isActive));
        btn.classList.toggle('ring-2', isActive);
        btn.classList.toggle('ring-brand-purple', isActive);
    });
};

const renderTaskList = () => {
    taskListEl.innerHTML = '';
    const visible = getVisibleTasks();
    const frag = document.createDocumentFragment();
    visible.forEach((t) => frag.appendChild(createTaskListItem(t)));
    taskListEl.appendChild(frag);
};

const render = () => {
    renderTaskList();
    renderStats();
    renderFilterState();
};

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearFormError();

    const validation = validateTaskTitle(taskInput.value);
    if (!validation.ok) {
        showFormError(validation.message);
        taskInput.focus();
        return;
    }

    addTask(validation.value);
    taskInput.value = '';
    taskInput.focus();
});

taskInput.addEventListener('input', () => {
    if (taskError && !taskError.classList.contains('hidden')) clearFormError();
});

searchInput.addEventListener('input', () => render());

filterAllBtn.addEventListener('click', () => setActiveFilter('all'));
filterPendingBtn.addEventListener('click', () => setActiveFilter('pending'));
filterCompletedBtn.addEventListener('click', () => setActiveFilter('completed'));
completeAllBtn.addEventListener('click', completeAll);
clearCompletedBtn.addEventListener('click', clearCompleted);

taskListEl.addEventListener('click', (e) => {
    const target = /** @type {HTMLElement} */ (e.target);
    const btn = target.closest('button[data-action]');
    if (!btn) return;

    const li = btn.closest('li[data-task-id]');
    if (!li) return;

    const taskId = li.dataset.taskId;
    if (!taskId) return;

    const action = btn.dataset.action;
    if (action === 'toggle') toggleTaskCompleted(taskId);
    if (action === 'edit') editTaskTitle(taskId);
    if (action === 'delete') deleteTask(taskId);
});

const darkModeToggle = document.getElementById('dark-mode-toggle');
const htmlElement = document.documentElement;

if (localStorage.getItem(STORAGE_KEYS.theme) === 'dark') {
    htmlElement.classList.add('dark');
} else {
    htmlElement.classList.remove('dark');
}

darkModeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    localStorage.setItem(STORAGE_KEYS.theme, htmlElement.classList.contains('dark') ? 'dark' : 'light');
});

render();

