"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _appjs = require('./app.js'); var _appjs2 = _interopRequireDefault(_appjs);
var _sequelize = require('sequelize');
var _databasejs = require('./config/database.js'); var _databasejs2 = _interopRequireDefault(_databasejs);

const sequelize = new (0, _sequelize.Sequelize)(_databasejs2.default);

const port = process.env.APP_PORT;
_appjs2.default.listen(port, "0.0.0.0", async () => {
  try {
    // Testa a conexão com o banco de dados
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados foi bem-sucedida!");
  } catch (error) {
    console.error("Não foi possível conectar ao banco de dados:", error);
  }

  console.log("\n=====================================");
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
  console.log("=====================================");
});
