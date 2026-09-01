const express = require('express');

const router = express.Router();

module.exports = (peliculas) => {

    // GET /peliculas/pelicula/:pelicula
    router.get('/pelicula/:pelicula', (req, res) => {

        const pelicula = req.params.pelicula;

        res.send(`Película recibida: ${pelicula}`);
    });

    // GET /peliculas/:id
    router.get('/:id', (req, res) => {

        const id = parseInt(req.params.id);

        const pelicula = peliculas.find(pelicula => pelicula.id === id);

        if (!pelicula) {
            return res.status(404).json({
                mensaje: "Película no encontrada"
            });
        }

        res.json(pelicula);
    });

    return router;
};