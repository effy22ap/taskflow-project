const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/env');
const taskRoutes = require('./routes/task.routes'); // Importamos las rutas

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'TaskFlow API v1 is running' });
});

app.listen(PORT, () => {
    console.log(`✅ Servidor profesional corriendo en http://localhost:${PORT}`);
});

// --- Middleware Global de Manejo de Errores ---
app.use((err, req, res, next) => {
    if (err.message === 'NOT_FOUND') {
        return res.status(404).json({ error: 'El recurso solicitado no existe' });
    }

    console.error('❌ Error no controlado:', err.stack); 
    
    res.status(500).json({ 
        error: 'Error interno del servidor',
        message: 'Lo sentimos, algo salió mal en nuestros servidores.' 
    });
});