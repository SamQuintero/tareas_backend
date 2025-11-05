const { suma, resta, multiplica, divide } = require('./utils');

describe('Operaciones matemáticas', () => {
  test('suma correcta', () => {
    expect(suma(2, 3)).toBe(5);
  });

  test('resta correcta', () => {
    expect(resta(5, 2)).toBe(3);
  });

  test('multiplicación correcta', () => {
    expect(multiplica(3, 4)).toBe(12);
  });

  test('división correcta', () => {
    expect(divide(10, 2)).toBe(5);
  });

  test('lanza error al dividir entre 0', () => {
    expect(() => divide(5, 0)).toThrow('No se puede dividir entre 0');
  });
});
