const test = require('node:test');
const assert = require('node:assert');
const aplicarDescuento = require('../src/miModulo.js');

test('aplicarDescuento', async (t) => {
  
  await t.test('debe calcular el descuento correctamente', () => {
    const resultado = aplicarDescuento(100, 20);
    assert.strictEqual(resultado, 80);
  });

  await t.test('debe funcionar con descuento 0', () => {
    const resultado = aplicarDescuento(100, 0);
    assert.strictEqual(resultado, 100);
  });

  await t.test('debe lanzar error con precio negativo', () => {
    assert.throws(
      () => aplicarDescuento(-100, 20),
      {
        message: 'El precio y el descuento deben ser valores positivos.'
      }
    );
  });

  await t.test('debe lanzar error con descuento negativo', () => {
    assert.throws(
      () => aplicarDescuento(100, -20),
      {
        message: 'El precio y el descuento deben ser valores positivos.'
      }
    );
  });
});