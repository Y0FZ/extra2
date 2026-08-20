'use strict';

const { sum, isEven, reverseString, isValidEmail, factorial, capitalize } = require('../src/utils');

describe('utils.sum', () => {
  test('suma dos numeros positivos correctamente', () => {
    expect(sum(2, 3)).toBe(5);
  });

  test('suma numeros negativos correctamente', () => {
    expect(sum(-4, 10)).toBe(6);
  });

  test('lanza un error si algun argumento no es numero', () => {
    expect(() => sum('a', 1)).toThrow(TypeError);
  });
});

describe('utils.isEven', () => {
  test('identifica correctamente un numero par', () => {
    expect(isEven(4)).toBe(true);
  });

  test('identifica correctamente un numero impar', () => {
    expect(isEven(7)).toBe(false);
  });

  test('lanza un error si el argumento no es entero', () => {
    expect(() => isEven(3.5)).toThrow(TypeError);
  });
});

describe('utils.reverseString', () => {
  test('invierte una cadena de texto', () => {
    expect(reverseString('hola')).toBe('aloh');
  });

  test('invierte una cadena vacia sin fallar', () => {
    expect(reverseString('')).toBe('');
  });
});

describe('utils.isValidEmail', () => {
  test('valida un correo con formato correcto', () => {
    expect(isValidEmail('estudiante@una.ac.cr')).toBe(true);
  });

  test('invalida un correo con formato incorrecto', () => {
    expect(isValidEmail('correo-invalido')).toBe(false);
  });
});

describe('utils.factorial', () => {
  test('calcula el factorial de 5 correctamente', () => {
    expect(factorial(5)).toBe(120);
  });

  test('el factorial de 0 es 1', () => {
    expect(factorial(0)).toBe(1);
  });

  test('lanza un error para numeros negativos', () => {
    expect(() => factorial(-1)).toThrow(TypeError);
  });
});

describe('utils.capitalize', () => {
  test('capitaliza cada palabra de una frase', () => {
    expect(capitalize('ci/cd con github actions')).toBe('Ci/cd Con Github Actions');
  });

  test('devuelve el mismo valor para una cadena vacia', () => {
    expect(capitalize('')).toBe('');
  });
});
