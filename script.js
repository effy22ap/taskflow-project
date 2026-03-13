// 1. Estado de la aplicacion
let tasks = JSON.parse(localStorage.getItem('taskflow_tasks')) || [];
let currentFilter = 'all'; // Filtro por defecto

// 2. Selectores del DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const statTotal = document.getElementById('stat-total');
const statCompleted = document.getElementById('stat-completed');
const statPending = document.getElementById('stat-pending');

// 3. Persistencia(LocalStorage)
const saveToLocalStorage = () => {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
};

// 4. Funciones logica
const addTask = (title) => {
    const newTask = {
        id: Date.now(),
        title: title,
        completed: false,
        createdAt: new Date()
    };
    tasks.push(newTask);
    updateApp();
};

const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    updateApp();
};

const toggleTask = (id) => {
    tasks = tasks.map(task => {
        if (task.id === id) return { ...task, completed: !task.completed };
        return task;
    });
    updateApp();
};

// Editar tarea(Funcionalidad extra)
const editTask = (id) => {
    const newTitle = prompt("Edita el título de la tarea:");
    if (newTitle && newTitle.trim() !== "") {
        tasks = tasks.map(task => {
            if (task.id === id) return { ...task, title: newTitle.trim() };
            return task;
        });
        updateApp();
    }
};

// Botones globales
const completeAll = () => {
    tasks = tasks.map(task => ({ ...task, completed: true }));
    updateApp();
};

const clearCompleted = () => {
    tasks = tasks.filter(task => !task.completed);
    updateApp();
};

// 5. Renderizado y filtros
const renderTasks = (filterText = '') => {
    taskList.innerHTML = '';

    // Filtrar tareas según el estado y la búsqueda
    let filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(filterText.toLowerCase());
        if (currentFilter === 'pending') return !task.completed && matchesSearch;
        if (currentFilter === 'completed') return task.completed && matchesSearch;
        return matchesSearch;
    });

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span style="${task.completed ? 'text-decoration: line-through; color: gray;' : ''}">
                ${task.title}
            </span>
            <div class="actions">
                <button onclick="toggleTask(${task.id})">${task.completed ? '↩️' : '✅'}</button>
                <button onclick="editTask(${task.id})">✏️</button>
                <button onclick="deleteTask(${task.id})" style="background-color: #e74c3c; color: white;">🗑️</button>
            </div>
        `;
        taskList.appendChild(li);
    });
};

const updateStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    statTotal.textContent = total;
    statCompleted.textContent = completed;
    statPending.textContent = total - completed;
};

const updateApp = () => {
    renderTasks();
    updateStats();
    saveToLocalStorage(); // Guardar automáticamente cada vez que algo cambie
};

// 6. Eventos
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = taskInput.value.trim();
    if (title) {
        addTask(title);
        taskInput.value = '';
    }
});

// Inicializar la app
updateApp();

//.7 Modo Oscuro
const darkModeToggle = document.getElementById('dark-mode-toggle');
const htmlElement = document.documentElement;

// ver si ya estaba en modo oscuro al cargar
if (localStorage.getItem('theme') === 'dark') {
    htmlElement.classList.add('dark');
}else {
    document.documentElement.classList.remove('dark');
}

darkModeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    if (document.documentElement.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});


