const path = require('path');
const fs = require('fs');
const swaggerJsdoc = require('swagger-jsdoc');

// leer el readme 
const rutaReadme = fs.existsSync(path.join(__dirname, 'readme.md'))
    ? path.join(__dirname, 'readme.md')
    : path.join(__dirname, '../readme.md');

const readme = fs.readFileSync(rutaReadme, 'utf-8');

const definicionSwagger = {
    openapi: '3.0.0',
    info: {
        title: 'CineAPI - Documentación',
        version: '1.0.0',
        description: readme //tomar el readme 
    },
    servers: [
        {
            url: 'https://localhost:3000',
            description: 'Servidor local HTTPS'
        }
    ],
    tags: [
        { name: 'Autenticación', description: 'Inicio de sesión y obtención de API Key' },
        { name: 'Películas', description: 'Consulta de películas y sus datos' },
        { name: 'Archivos', description: 'Recepción de archivos' }
    ],
    components: {
        securitySchemes: {
            ApiKeyAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'x-api-key',
                description: 'Introduce la API Key obtenida mediante POST /login.'
            }
        },
        schemas: {
            Pelicula: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 8 },
                    titulo: { type: 'string', example: 'Coco' },
                    genero: { type: 'string', example: 'Animación / Fantasía' },
                    año: { type: 'integer', example: 2017 },
                    duracion: { type: 'integer', example: 105 },
                    foto: { type: 'string', example: 'coco.jpeg' }
                }
            },
            Error: {
                type: 'object',
                properties: {
                    error: { type: 'string', example: 'Película no encontrada.' }
                }
            }
        }
    },
    security: [
        { ApiKeyAuth: [] }
    ]
};

// Objeto con opciones de configuración
const opcionesSwagger = {
    definition: definicionSwagger,
    // para tomar los comentarios
    apis: [
        path.join(__dirname, 'index.js'),
        path.join(__dirname, 'routers', 'routerPeliculas.js')
    ]
};

const swaggerSpec = swaggerJsdoc(opcionesSwagger);

module.exports = swaggerSpec;