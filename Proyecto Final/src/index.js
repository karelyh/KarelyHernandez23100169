const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const morgan = require('morgan');
const Joi = require('joi');
const { apiReference } = require('@scalar/express-api-reference');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const validarApiKey = require('./middlewares/apikey');
const manejarError = require('./middlewares/errores');
const validarJoi = require('./middlewares/validarJoi');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const { SwaggerTheme } = require('swagger-themes');

// para inicializar la app
const app = express();

// rutas para que sean accesibles los recursos de imagenes
app.use('/docs', express.static(path.join(__dirname, 'docs'))); 
app.use('/files', express.static(path.join(__dirname, 'routers', 'files'))); 

// DOCUMENTACIÓN SWAGGER: Configuración de la interfaz gráfica de OpenAPI
const theme = new SwaggerTheme();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: theme.getBuffer('feeling-blue'),
    customSiteTitle: 'CineAPI - Documentación'
}));

// OpenAPI en formato JSON puro
app.get('/api-spec', (req, res) => {
    res.json(swaggerSpec);
});

// Interfaz interactiva con diseño moderno y barra lateral
app.use(
    '/docs-scalar',
    apiReference({
        spec: {
            url: '/api-spec',
        },
        theme: 'saturn', // Temas disponibles: 'purple', 'moon', 'saturn', 'solarized'bluePlanet
    })
);


// MIDDLEWARES GLOBALES
app.use(express.json()); // Analiza las peticiones entrantes con cargas JSON
app.use(morgan('dev')); // Registra en consola las peticiones HTTP para facilitar la depuración

// pata tener las vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// arreglito para tener datos en lo q hago una bd
const peliculas = [
    { id: 1, titulo: "10 cosas que odio de ti", genero: "Romance / Comedia", año: 1999, duracion: 97, foto: "10CosasQueOdioDeTi.jpg" },
    { id: 8, titulo: "Coco", genero: "Animación / Fantasía", año: 2017, duracion: 105, foto: "coco.jpeg" },
    { id: 16, titulo: "Yo antes de ti", genero: "Drama / Romance", año: 2016, duracion: 110, foto: "yo_antes_de_ti.jpg" },
    { id: 19, titulo: "Yo antes de ti pug version", genero: "Drama / Romance", año: 2016, duracion: 110, foto: "yoantesdetipug.jpg" }
];

// validacion de datos que se reciben en un inicio
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

// rutas publicas
app.get('/', (req, res) => {
    res.render('index', { titulo: 'Servidor funcionando' });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/peliculas/vista', (req, res) => {
    res.render('peliculas', { titulo: 'Listado de películas', peliculas: peliculas });
});

app.get('/errores', (req, res) => {
    res.render('errores', { titulo: 'Documentación de errores' });
});

// verificación de credenciales y, si valida contra el esquema Joi, devuelve la APIKey
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

// seguridad para validar apikey
app.use(validarApiKey);

// RUTAS PRIVADAS: Montaje del enrutador modular pasando el arreglo de datos
const routerPeliculas = require('./routers/routerPeliculas')(peliculas);
app.use('/peliculas', routerPeliculas);

// manejo de errores, responde con un JSON formateado
app.use(manejarError);

// Servidor y certificados 
const certificados = path.join(__dirname, 'certs');
const servidor = https.createServer({
    key: fs.readFileSync(path.join(certificados, 'server.key')),
    cert: fs.readFileSync(path.join(certificados, 'server.crt'))
}, app);

servidor.listen(3000, () => {
    console.log('Servidor ejecutándose en https://localhost:3000');
});