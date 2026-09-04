const express = require('express');
const multer = require('multer');

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

    // Middleware para validar el ID
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

    // POST /peliculas/archivo
    router.post('/archivo', upload.single('archivo'), (req, res) => {

        res.json({
            mensaje: "Archivo recibido correctamente",
            archivo: req.file.originalname
        });

    });

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
                mensaje: "Película no encontrada"
            });
        }

        res.json(pelicula);
    });

    return router;
};