const taskService = require('../services/task.service');

const getTasks = (req, res) => {
    const tasks = taskService.obtenerTodas();
    res.status(200).json(tasks);
};

const createTask = (req, res) => {
    const { title } = req.body;

    // Validación defensiva
    if (!title || title.trim().length < 2) {
        return res.status(400).json({ error: 'El título es obligatorio y debe tener al menos 2 caracteres' });
    }

    const newTask = taskService.crearTarea({ title });
    res.status(201).json(newTask);
};

const deleteTask = (req, res, next) => {
    try {
        taskService.eliminarTarea(req.params.id);
        res.status(204).send(); 
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTasks,
    createTask,
    deleteTask
};