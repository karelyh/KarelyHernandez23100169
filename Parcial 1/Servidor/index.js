const express = require('express');

const app = express();

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

const routerPeliculas = require('./routers/routerPeliculas')(peliculas);

// Ruta principal
app.get('/', (req, res) => {
    res.send('El servidor está funcionando correctamente');
});

//  usar el router
app.use('/peliculas', routerPeliculas);


app.listen(3000, () => {
    console.log('Servidor ejecutándose en http://localhost:3000');
});