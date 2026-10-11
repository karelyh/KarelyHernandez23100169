const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const morgan = require('morgan');
const Joi = require('joi');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const validarApiKey = require('./middlewares/apikey');
const manejarError = require('./middlewares/errores');
const validarJoi = require('./middlewares/validarJoi');
const app = express();

app.use(express.json());

// para las vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Para Morgan
app.use(morgan('dev'));
app.use('/files', express.static(path.join(__dirname, 'routers', 'files')));

const peliculas = [
    { id: 1, titulo: "10 cosas que odio de ti", genero: "Romance / Comedia", año: 1999, duracion: 97, foto: "10CosasQueOdioDeTi.jpg" },
    { id: 8, titulo: "Coco", genero: "Animación / Fantasía", año: 2017, duracion: 105, foto: "coco.jpeg" },
    { id: 16, titulo: "Yo antes de ti", genero: "Drama / Romance", año: 2016, duracion: 110, foto: "yo_antes_de_ti.jpg" },
    { id: 19, titulo: "Yo antes de ti pug version", genero: "Drama / Romance", año: 2016, duracion: 110, foto: "yoantesdetipug.jpg" }
];

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

// Ruta principal
app.get('/', (req, res) => {
    res.render('index', { titulo: 'Servidor funcionando' });
});

// Vista de login
app.get('/login', (req, res) => {
    res.render('login');
});

// Ruta para mostrar la vista con las películas
app.get('/peliculas/vista', (req, res) => {
    res.render('peliculas', { titulo: 'Listado de películas', peliculas: peliculas });
});

// Página de documentación de errores
app.get('/errores', (req, res) => {
    res.render('errores', { titulo: 'Documentación de errores' });
});

// para el login
app.post('/login', validarJoi(loginSchema), (req, res) => {
    const { email, password } = req.body;
    if (email === 'karely@api.com' && password === 'karely123') {
        return res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            apiKey: process.env.API_KEY || 'Karely123' 
        });
    }
    return res.status(401).json({ error: 'Credenciales incorrectas' });
});

// Todas las rutas de abajo requieren una API key válida
app.use(validarApiKey);

// Para el router
const routerPeliculas = require('./routers/routerPeliculas')(peliculas);

// Usar router
app.use('/peliculas', routerPeliculas);

// Manejador central de errores
app.use(manejarError);

// Iniciar servidor HTTPS de desarrollo
const certificados = path.join(__dirname, 'certs');
const servidor = https.createServer({
    key: fs.readFileSync(path.join(certificados, 'server.key')),
    cert: fs.readFileSync(path.join(certificados, 'server.crt'))
}, app);

servidor.listen(3000, () => {
    console.log('Servidor ejecutándose en https://localhost:3000');
});