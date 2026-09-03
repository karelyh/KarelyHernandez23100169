const express = require('express');

const router = express.Router();

module.exports = (peliculas) => {

    const validarId = (req, res, next) => {

        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({
                error: "Petición incorrecta",
                mensaje: "El ID proporcionado debe ser un número válido."
            });
        }

        next();
    };

    // GET /peliculas/pelicula/:pelicula
    router.get('/pelicula/:pelicula', (req, res) => {

        const pelicula = req.params.pelicula;

        res.send(`Película recibida: ${pelicula}`);
    });

    // GET /peliculas/:id
    router.get('/:id', validarId, (req, res) => {

        const id = parseInt(req.params.id);

        const pelicula = peliculas.find(pelicula => pelicula.id === id);

        if (!pelicula) {
            return res.status(404).json({
                mensaje: "Película no encontrada",
                mensaje: "El ID proporcionado no corresponde a ninguna película."
            });
        }

        res.locals.pelicula = pelicula.titulo;

        res.json(pelicula);
    });

    return router;
};