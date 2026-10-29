const express = require('express');
const multer = require('multer');
const halson = require('halson');

const router = express.Router();

// Configuración de Multer
const storage = multer.diskStorage({
    // Carpeta donde se guardarán los archivos
    destination: './routers/files',
    // Mantener el nombre original del archivo
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = (peliculas) => {
    //para validar el ID
    const validarId = (req, res, next) => {
        const id = req.params.id;
        if (isNaN(id)) {
            const error = new Error('El ID proporcionado debe ser un número válido.');
            error.status = 400;

            return next(error);
        }
        next();
    };

    // POST /peliculas/archivo
    router.post('/archivo', upload.single('archivo'), (req, res, next) => {

        if (!req.file) {
            const error = new Error('No se recibió ningún archivo.');
            error.status = 400;

            return next(error);
        }

        res.json({
            mensaje: "Archivo recibido correctamente",
            archivo: req.file.originalname
        });
    });

    /**
     * @openapi
     * /peliculas/pelicula/{pelicula}:
     *   get:
     *     summary: Consultar una película por nombre
     *     description: Devuelve un mensaje con el nombre de película recibido.
     *     tags:
     *       - Películas
     *     parameters:
     *       - in: path
     *         name: pelicula
     *         required: true
     *         description: Nombre o título de la película
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Película recibida correctamente
     *         content:
     *           text/html:
     *             schema:
     *               type: string
     *               example: "Película recibida: Coco"
     *       401:
     *         description: API Key inválida o faltante
     */
    router.get('/pelicula/:pelicula', (req, res) => {
        const pelicula = req.params.pelicula;
        res.send(`Película recibida: ${pelicula}`);
    });

    router.get('/:id', validarId, (req, res, next) => {
    const id = parseInt(req.params.id);
    const pelicula = peliculas.find(pelicula => pelicula.id === id);

        if (!pelicula) {
            const error = new Error('Película no encontrada.');
            error.status = 404;
            return next(error);
        }
        //para que pase la respuesta por halson
        const respuesta = halson(pelicula)
        .addLink('self', `/peliculas/${pelicula.id}`)
        .addLink('peliculas', '/peliculas');
        res.json(respuesta);
    });

    return router;
};