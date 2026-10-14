
/**
 * Calcula el precio final de un producto después de aplicarle un descuento.
 * @author Karely Guadalupe Hernandez Navarro
 * @version 1.0.0
 * @since 2023-10-26
 * @param {number} precio - El precio original del producto
 * @param {number} descuento - El porcentaje de descuento a aplicar (0 a 100)
 * @returns {number} El precio final con el descuento aplicado
 * @throws {Error} Lanza un error si el precio o el descuento son negativos
 * 
 * @example
 * Devuelve 80
 * const precioFinal = aplicarDescuento(100, 20);
 */
function aplicarDescuento(precio, descuento) {
  if (precio < 0 || descuento < 0) {
    throw new Error("El precio y el descuento deben ser valores positivos.");
  }
  return precio - (precio * (descuento / 100));
}

module.exports = aplicarDescuento;