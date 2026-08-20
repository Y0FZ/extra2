'use strict';

const createApp = require('./app');

const PORT = process.env.PORT || 3000;
const app = createApp();

/* istanbul ignore next -- no se ejecuta durante las pruebas unitarias */
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
}

module.exports = app;
