
let tasks = [];

const obtenerTodas = () => {
    return tasks;
};

const crearTarea = (data) => {
    const nuevaTarea = {
        id: Date.now().toString(),
        title: data.title,
        completed: false,
        createdAt: new Date().toISOString()
    };
    tasks.push(nuevaTarea);
    return nuevaTarea;
};

const eliminarTarea = (id) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
        throw new Error('NOT_FOUND');
    }
    tasks.splice(index, 1);
    return true;
};

module.exports = {
    obtenerTodas,
    crearTarea,
    eliminarTarea
};