
const redis = require('redis');

// Crear cliente de Redis
const redisClient = redis.createClient({
    url: 'redis://127.0.0.1:6379'
});

// Detectar errores
redisClient.on('error', (error) => {
    console.log('Error de Redis:', error);
});

// Conectar con Redis
async function conectarRedis() {
    await redisClient.connect();
    console.log('Redis conectado correctamente');
}

// Exportar cliente y función
module.exports = {
    redisClient,
    conectarRedis
};
