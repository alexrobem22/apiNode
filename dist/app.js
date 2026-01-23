"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _path = require('path'); // Adicione dirname

// Inicializa a conexão com o banco de dados
require('./database/index');
var _homeRoutes = require('./routes/homeRoutes'); var _homeRoutes2 = _interopRequireDefault(_homeRoutes);
var _userRoutes = require('./routes/userRoutes'); var _userRoutes2 = _interopRequireDefault(_userRoutes);
var _tokenRoutes = require('./routes/tokenRoutes'); var _tokenRoutes2 = _interopRequireDefault(_tokenRoutes);
var _alunoRoutes = require('./routes/alunoRoutes'); var _alunoRoutes2 = _interopRequireDefault(_alunoRoutes);
var _fotoRoutes = require('./routes/fotoRoutes'); var _fotoRoutes2 = _interopRequireDefault(_fotoRoutes);

_dotenv2.default.config(); // Carrega variáveis de ambiente do arquivo .env

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_express2.default.urlencoded({ extended: true })); // Permite receber dados codificados via URL
    this.app.use(_express2.default.json()); // Permite receber dados no formato JSON
    this.app.use(_express2.default.static(_path.resolve.call(void 0, __dirname, "uploads"))); // Servir arquivos estáticos da pasta 'uploads'
  }

  routes() {
    this.app.use("/", _homeRoutes2.default); // Define as rotas principais
    this.app.use("/users", _userRoutes2.default); // Define as rotas principais
    this.app.use("/tokens", _tokenRoutes2.default); // Define as rotas principais
    this.app.use("/aluno", _alunoRoutes2.default); // Define as rotas principais
    this.app.use("/fotos", _fotoRoutes2.default); // Define as rotas principais
  }
}

exports. default = new App().app; // Exporta a aplicação configurada
