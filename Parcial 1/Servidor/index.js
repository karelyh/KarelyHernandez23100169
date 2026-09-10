const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

// para las vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Para Morgan
app.use(morgan('dev'));
app.use('/files', express.static(path.join(__dirname, 'routers', 'files')));

const peliculas = [
    {
        id: 1,
        titulo: "10 cosas que odio de ti",
        genero: "Romance / Comedia",
        año: 1999,
        duracion: 97,
        foto: "10CosasQueOdioDeTi.jpg"
    },
    {
        id: 8,
        titulo: "Coco",
        genero: "Animación / Fantasía",
        año: 2017,
        duracion: 105,
        foto: "coco.jpeg"
    },
    {
        id: 16,
        titulo: "Yo antes de ti",
        genero: "Drama / Romance",
        año: 2016,
        duracion: 110,
        foto: "yo_antes_de_ti.jpg"
    },
    {
        id: 19,
        titulo: "Yo antes de ti pug version",
        genero: "Drama / Romance",
        año: 2016,
        duracion: 110,
        foto: "yoantesdetipug.jpg"
    }
];

// Para el router
const routerPeliculas = require('./routers/routerPeliculas')(peliculas);

// Ruta principal
app.get('/', (req, res) => {
    res.render('index', {
        titulo: 'Servidor funcionando'
    });
});

// Ruta para mostrar la vista con las películas
app.get('/peliculas/vista', (req, res) => {
    res.render('peliculas', {
        titulo: 'Listado de películas',
        peliculas: peliculas
    });
});

// Usar router
app.use('/peliculas', routerPeliculas);

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor ejecutándose en http://localhost:3000');
});