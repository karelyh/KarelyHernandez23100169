const winston = require('winston');
const fs = require('fs');
const path = require('path');

// Crear carpeta logs si no existe
const carpetaLogs = path.join(__dirname, '..', 'logs');

if (!fs.existsSync(carpetaLogs)) {
    fs.mkdirSync(carpetaLogs);
}

// Configuración de Winston
const logger = winston.createLogger({
    level: 'error',

    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.simple()
    ),

    transports: [
        new winston.transports.File({
            filename: path.join(carpetaLogs, 'errores.log')
        }),
        new winston.transports.Console()
    ]
});

// Manejador central de errores
const manejarError = (err, req, res, next) => {

    const status = err.status || 500;

    let mensaje = err.message || 'Ocurrió un error en el servidor.';

    // No mostrar información interna si es un error del servidor
    if (status >= 500) {
        mensaje = 'Ocurrió un error interno en el servidor.';
    }

    // Guardar información del error en el log
    logger.error(
        `${req.method} ${req.originalUrl} - ${status} - ${err.message}`
    );

    // Respuesta estándar
    res.status(status).json({
        error: true,
        status: status,
        mensaje: mensaje
    });
};

module.exports = manejarError;