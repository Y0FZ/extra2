'use strict';

/**
 * Funciones utilitarias de la aplicacion.
 * Se mantienen separadas de las rutas de Express para poder probarlas
 * de forma aislada (pruebas unitarias puras, sin necesidad de supertest).
 */

/**
 * Suma dos numeros.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Ambos argumentos deben ser numeros');
  }
  return a + b;
}

/**
 * Indica si un numero entero es par.
 * @param {number} n
 * @returns {boolean}
 */
function isEven(n) {
  if (!Number.isInteger(n)) {
    throw new TypeError('El argumento debe ser un numero entero');
  }
  return n % 2 === 0;
}

/**
 * Invierte una cadena de texto.
 * @param {string} str
 * @returns {string}
 */
function reverseString(str) {
  if (typeof str !== 'string') {
    throw new TypeError('El argumento debe ser una cadena de texto');
  }
  return str.split('').reverse().join('');
}

/**
 * Valida el formato basico de un correo electronico.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Calcula el factorial de un numero entero no negativo.
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new TypeError('El argumento debe ser un numero entero no negativo');
  }
  return n <= 1 ? 1 : n * factorial(n - 1);
}

/**
 * Capitaliza la primera letra de cada palabra.
 * @param {string} str
 * @returns {string}
 */
function capitalize(str) {
  if (typeof str !== 'string' || str.length === 0) return str;
  return str
    .split(' ')
    .map((word) => (word.length ? word[0].toUpperCase() + word.slice(1).toLowerCase() : word))
    .join(' ');
}

module.exports = {
  sum,
  isEven,
  reverseString,
  isValidEmail,
  factorial,
  capitalize,
};
