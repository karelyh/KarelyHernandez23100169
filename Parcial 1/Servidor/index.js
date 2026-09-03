const express = require('express');
const morgan = require('morgan');

const app = express();

// para morgan
app.use(morgan((tokens, req, res) => {
    return `${tokens.method(req, res)} ${tokens.url(req, res)} - ${res.locals.pelicula} - ${new Date().toLocaleTimeString()}`;
}));

const peliculas = [
    {
        id: 1,
        titulo: "10 cosas que odio de ti",
        genero: "Romance / Comedia",
        año: 1999,
        duracion: 97
    },
    {
        id: 8,
        titulo: "Coco",
        genero: "Animación / Fantasía",
        año: 2017,
        duracion: 105
    },
    {
        id: 16,
        titulo: "Yo antes de ti",
        genero: "Drama / Romance",
        año: 2016,
        duracion: 110
    }
];

// para el router
const routerPeliculas = require('./routers/routerPeliculas')(peliculas);

// Ruta principal
app.get('/', (req, res) => {
    res.send('El servidor está funcionando correctamente');
});

app.use('/peliculas', routerPeliculas);

// para iniciar el server 
app.listen(3000, () => {
    console.log('Servidor ejecutándose en http://localhost:3000');
});