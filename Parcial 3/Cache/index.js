
const express = require('express');
const { conectarRedis } = require('./redis');

const app = express();

app.use(express.json());

const cacheRoutes = require('./routes/cache');
app.use('/api', cacheRoutes);

app.get('/', (req, res) => {
    res.send('Servidor Express con Redis funcionando');
});

async function iniciarServidor() {
    try {
        await conectarRedis();

        app.listen(3000, () => {
            console.log('Servidor ejecutándose en http://localhost:3000');
        });

    } catch (error) {
        console.error('Error al iniciar servidor:', error);
    }
}

iniciarServidor();
