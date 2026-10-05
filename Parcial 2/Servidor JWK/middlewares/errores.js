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
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} | ${level.toUpperCase()} | ${message}`;
        })
    ),

    transports: [
        new winston.transports.File({
            filename: path.join(carpetaLogs, 'errores.txt')
        }),
        new winston.transports.Console()
    ]
});

// Manejador central de errores
const manejarError = (err, req, res, next) => {

    const status = err.status || 500;

    let mensaje = err.message || 'Ocurrió un error en el servidor.';

    // No mostrar información interna de errores 500
    if (status >= 500) {
        mensaje = 'Ocurrió un error interno en el servidor.';
    }

    // Información que se guardará en el archivo de texto
    const usuario = req.ip;
    const metodo = req.method;
    const ruta = req.originalUrl;

    logger.error(
        `Usuario: ${usuario} | ${metodo} ${ruta} | Error ${status} | ${err.message}`
    );

    // Respuesta estándar
    res.status(status).json({
        error: true,
        status: status,
        mensaje: mensaje
    });
};

module.exports = manejarError;