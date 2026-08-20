'use strict';

const request = require('supertest');
const createApp = require('../src/app');

describe('API de la aplicacion', () => {
  let app;

  beforeEach(() => {
    app = createApp();
  });

  test('GET / responde con status ok', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /health responde 200 y datos de estado', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  test('GET /api/users devuelve la lista inicial de usuarios', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });

  test('GET /api/users/:id devuelve 404 si el usuario no existe', async () => {
    const res = await request(app).get('/api/users/999');
    expect(res.statusCode).toBe(404);
  });

  test('POST /api/users crea un usuario valido', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Grace Hopper', email: 'grace@example.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Grace Hopper');
  });

  test('POST /api/users rechaza un correo invalido', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Sin Correo', email: 'no-es-un-correo' });
    expect(res.statusCode).toBe(400);
  });

  test('GET /api/utils/sum calcula la suma via query params', async () => {
    const res = await request(app).get('/api/utils/sum?a=5&b=7');
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(12);
  });

  test('GET /api/utils/factorial/:n calcula el factorial', async () => {
    const res = await request(app).get('/api/utils/factorial/4');
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(24);
  });
});
