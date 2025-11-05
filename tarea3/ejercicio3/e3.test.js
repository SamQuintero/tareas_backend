const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('./index');

describe('Pruebas del middleware y /admin', () => {
  test('Debe responder 401 si no hay token', async () => {
    const res = await request(app).get('/admin');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('mensaje', 'Token requerido');
  });

  test('Debe responder 401 si el token es inválido', async () => {
    const res = await request(app)
      .get('/admin')
      .set('Authorization', 'Bearer token_invalido');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('mensaje', 'Token inválido');
  });

  test('Debe responder 200 y mensaje ok con token válido', async () => {
    const token = jwt.sign({ id: 1, nombre: 'Sam' }, 'secreto');
    const res = await request(app)
      .get('/admin')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ mensaje: 'ok' });
  });
});
