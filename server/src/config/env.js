// Carga las variables del archivo .env
require('dotenv').config();

/**
 * Validación manual de variables críticas.
 * Si el puerto no existe en el .env, el servidor se detendrá inmediatamente.
 */
if (!process.env.PORT) {
    throw new Error('X ERROR CRÍTICO: El puerto no está definido en el archivo .env');
}

// Exportamos las variables para usarlas en otros archivos
module.exports = {
    PORT: process.env.PORT
};