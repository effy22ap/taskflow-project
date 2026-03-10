// 1. estado de la aplicacion
let tasks = [];

// 2. Selectores del DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const statTotal = document.getElementById('stat-total');
const statCompleted = document.getElementById('stat-completed');
const statPending = document.getElementById('stat-pending');

// 3. Funciones reutilizables
// Añadir tarea
const addTask = (title) => {
    const newTask = {
        id: Date.now(), // Genera un ID único basado en el tiempo
        title: title,
        completed: false,
        createdAt: new Date()
    };
    tasks.push(newTask);
    updateApp();
};

// Eliminar tarea
const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    updateApp();
};

// Alternar estado completado
const toggleTask = (id) => {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    updateApp();
};

// Actualizar Estadísticas
const updateStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    statTotal.textContent = total;
    statCompleted.textContent = completed;
    statPending.textContent = pending;
};

// Renderizar Tareas en el DOM
const renderTasks = () => {
    taskList.innerHTML = ''; 

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        // Estructura de la tarea
        li.innerHTML = `
            <span style="${task.completed ? 'text-decoration: line-through; color: #6138adb2' : ''}">
                ${task.title}
            </span>
            <div class="actions">
                <button onclick="toggleTask(${task.id})" style="background-color: #349153; color: white;">${task.completed ? 'Deshacer' : 'Hecho'}</button>
                <button onclick="deleteTask(${task.id})" style="background-color: #dd2e2e; color: white;">Eliminar</button>
            </div>
        `;
        taskList.appendChild(li);
    });
};

// Función maestra para actualizar todo
const updateApp = () => {
    renderTasks();
    updateStats();
};

// 4. EVENTOS
taskForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página se recargue
    const title = taskInput.value.trim();
    
    if (title !== '') {
        addTask(title);
        taskInput.value = ''; // Limpiar el input
        taskInput.focus();
    }
});

// Inicializar la app vacía
updateApp();