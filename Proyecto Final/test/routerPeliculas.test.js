const request = require('supertest');
const assert = require('assert');
const app = require('../src/index');
const apiKey = process.env.API_KEY || 'Karely123';

describe('CineAPI - Pruebas del endpoint de Películas', () => {

  it('Debería obtener una película por ID y responder con status 200', async () => {
    const res = await request(app)
      .get('/peliculas/1')
      .set('x-api-key', apiKey)
      .expect(200);

    assert.strictEqual(res.body.id, 1);
    assert.strictEqual(res.body.titulo, '10 cosas que odio de ti');
  });

  it('Debería denegar el acceso (status 401) si no se proporciona la API Key', async () => {
    const res = await request(app)
      .get('/peliculas/1')
      .expect(401);

    assert.strictEqual(res.body.mensaje, 'API Key no proporcionada');
  });

  it('Debería devolver un status 404 al buscar un ID de película que no existe', async () => {
    const res = await request(app)
      .get('/peliculas/99999')
      .set('x-api-key', apiKey)
      .expect(404);

    assert.strictEqual(res.body.mensaje, 'Película no encontrada.');
  });

});