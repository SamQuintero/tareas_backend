const request = require('supertest');
const app = require('./index');

describe('Pruebas del endpoint /test', () => {
  test('Debe responder con status 200 y mensaje ok', async () => {
    const res = await request(app).get('/test');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ mensaje: 'ok' });
  });
});