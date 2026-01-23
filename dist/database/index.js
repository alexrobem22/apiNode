"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _databasejs = require('../config/database.js'); var _databasejs2 = _interopRequireDefault(_databasejs);
var _Alunojs = require('../models/Aluno.js'); var _Alunojs2 = _interopRequireDefault(_Alunojs);
var _Userjs = require('../models/User.js'); var _Userjs2 = _interopRequireDefault(_Userjs);
var _Fotosjs = require('../models/Fotos.js'); var _Fotosjs2 = _interopRequireDefault(_Fotosjs);

// Lista de modelos a serem inicializados
const models = [_Alunojs2.default, _Userjs2.default, _Fotosjs2.default];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Inicializa a conexão com o banco de dados
    this.connection = new (0, _sequelize.Sequelize)(_databasejs2.default);

    // Inicializa cada modelo e associa com a conexão
    models.forEach((model) => model.init(this.connection));

    // Caso algum modelo tenha associações, inicialize-as aqui
    models.forEach((model) => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

exports. default = new Database();










