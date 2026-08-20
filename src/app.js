'use strict';

const express = require('express');
const { sum, isEven, reverseString, isValidEmail, factorial, capitalize } = require('./utils');

/**
 * Crea y configura la instancia de la aplicacion Express.
 * Se exporta como funcion/instancia separada de index.js para poder
 * importarla en las pruebas de integracion (supertest) sin levantar
 * un servidor HTTP real.
 */
function createApp() {
  const app = express();
  app.use(express.json());

  // In-memory "base de datos" de usuarios, solo para fines demostrativos.
  let users = [
    { id: 1, name: 'Ada Lovelace', email: 'ada@example.com' },
    { id: 2, name: 'Alan Turing', email: 'alan@example.com' },
  ];

  app.get('/', (req, res) => {
    res.json({
      message: 'API de demostracion - Trabajo Extraclase CI/CD con GitHub Actions',
      status: 'ok',
    });
  });

  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', uptime: process.uptime() });
  });

  app.get('/api/users', (req, res) => {
    res.status(200).json(users);
  });

  app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    return res.status(200).json(user);
  });

  app.post('/api/users', (req, res) => {
    const { name, email } = req.body || {};
    if (!name || !isValidEmail(email)) {
      return res.status(400).json({ error: 'Nombre y correo valido son requeridos' });
    }
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    return res.status(201).json(newUser);
  });

  app.get('/api/utils/sum', (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    if (Number.isNaN(a) || Number.isNaN(b)) {
      return res.status(400).json({ error: 'Parametros a y b deben ser numericos' });
    }
    return res.status(200).json({ result: sum(a, b) });
  });

  app.get('/api/utils/factorial/:n', (req, res) => {
    const n = Number(req.params.n);
    try {
      return res.status(200).json({ n, result: factorial(n) });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  });

  app.get('/api/utils/reverse/:text', (req, res) => {
    return res.status(200).json({ result: reverseString(req.params.text) });
  });

  app.get('/api/utils/capitalize/:text', (req, res) => {
    return res.status(200).json({ result: capitalize(req.params.text) });
  });

  app.get('/api/utils/is-even/:n', (req, res) => {
    const n = Number(req.params.n);
    try {
      return res.status(200).json({ n, isEven: isEven(n) });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  });

  // Helper de solo-pruebas para reiniciar el estado en memoria entre tests.
  app.resetUsers = () => {
    users = [
      { id: 1, name: 'Ada Lovelace', email: 'ada@example.com' },
      { id: 2, name: 'Alan Turing', email: 'alan@example.com' },
    ];
  };

  return app;
}

module.exports = createApp;
