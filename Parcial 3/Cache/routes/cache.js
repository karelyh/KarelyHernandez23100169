
const express = require('express');
const router = express.Router();

const { redisClient } = require('../redis');

// GUARDAR INFORMACION EN REDIS
router.post('/cache', async (req, res) => {
    try {
        const { clave, valor } = req.body;

        if (!clave || valor === undefined) {
            return res.status(400).json({
                mensaje: 'Debes proporcionar una clave y un valor'
            });
        }

        await redisClient.set(
            clave,
            JSON.stringify(valor),
            { EX: 60 }
        );

        res.json({
            mensaje: 'Informacion guardada correctamente',
            clave: clave
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al guardar informacion'
        });
    }
});

// CONSULTAR INFORMACION EN REDIS
router.get('/cache/:clave', async (req, res) => {
    try {
        const clave = req.params.clave;

        const valor = await redisClient.get(clave);
        console.log('DATOS OBTENIDOS DESDE REDIS:', valor);

        if (valor === null) {
            return res.status(404).json({
                mensaje: 'No se encontro informacion en Redis'
            });
        }

        res.json({
            origen: 'Redis',
            clave: clave,
            valor: JSON.parse(valor)
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al consultar informacion'
        });
    }
});

// ELIMINAR INFORMACION DE REDIS
router.delete('/cache/:clave', async (req, res) => {
    try {
        const clave = req.params.clave;

        const eliminado = await redisClient.del(clave);

        res.json({
            mensaje: eliminado
                ? 'Informacion eliminada correctamente'
                : 'La clave no existe',
            eliminado: eliminado > 0
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar informacion'
        });
    }
});

module.exports = router;
