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

    /**
     * @openapi
     * /peliculas/archivo:
     *   post:
     *     summary: Subir un archivo de película
     *     tags:
     *       - Archivos
     *     description: |
     *       Permite subir un archivo de imagen o documento asociado al servidor de películas.
     *       
     *       #### **Ejemplo con cURL**
     *       ```bash
     *       curl -k -X POST "https://localhost:3000/peliculas/archivo" \
     *         -H "x-api-key: Karely123" \
     *         -F "archivo=@/ruta/a/tu/imagen.jpg"
     *       ```
     *       
     *       #### **Ejemplo con JavaScript (FormData)**
     *       ```javascript
     *       const formData = new FormData();
     *       formData.append('archivo', fileInput.files[0]);
     *       
     *       fetch('https://localhost:3000/peliculas/archivo', {
     *           method: 'POST',
     *           headers: { 'x-api-key': 'Karely123' },
     *           body: formData
     *       })
     *       .then(res => res.json())
     *       .then(data => console.log(data));
     *       ```
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               archivo:
     *                 type: string
     *                 format: binary
     *                 description: Archivo que se enviará al servidor (campo "archivo")
     *     responses:
     *       200:
     *         description: Archivo cargado correctamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 mensaje:
     *                   type: string
     *                   example: "Archivo recibido correctamente"
     *                 archivo:
     *                   type: string
     *                   example: "BarbieMMP.jpg"
     *       400:
     *         description: No se envió ningún archivo en la petición
     *       401:
     *         description: API Key inválida o no proporcionada
     */
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
     *     tags:
     *       - Películas
     *     description: |
     *       Devuelve un mensaje con el nombre de película recibido.
     *       
     *       #### Ejemplo con cURL
     *       ```bash
     *       curl -k -X GET "https://localhost:3000/peliculas/pelicula/Coco" -H "x-api-key: Karely123"
     *       ```
     *       
     *       #### Ejemplo con JavaScript (Fetch)
     *       ```javascript
     *       fetch('https://localhost:3000/peliculas/pelicula/Coco', {
     *           headers: { 'x-api-key': 'Karely123' }
     *       })
     *       .then(res => res.text())
     *       .then(console.log);
     *       ```
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