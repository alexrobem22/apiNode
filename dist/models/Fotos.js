"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _appConfig = require('../config/appConfig'); var _appConfig2 = _interopRequireDefault(_appConfig);

 class Fotos extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        fk_alunos: {
          type: _sequelize2.default.INTEGER,
          allowNull: true,
        },
        fk_users: {
          type: _sequelize2.default.INTEGER,
          allowNull: true,
        },
        originalname: {
            type: _sequelize2.default.STRING,
            defaultValue: '',
            validate:{
                notEmpty:{
                    msg: 'Campo não pode ficar vazio.'
                }
            }
        },
        filename: {
            type: _sequelize2.default.STRING,
            defaultValue: '',
            validate:{
                notEmpty:{
                    msg: 'Campo não pode ficar vazio.'
                }
            }
        },
        mimetype: {
            type: _sequelize2.default.STRING,
            defaultValue: '',
            validate:{
                notEmpty:{
                    msg: 'Campo não pode ficar vazio.'
                }
            }
        },
        url: {
          type: _sequelize2.default.VIRTUAL,
          get() {
            return `${_appConfig2.default.url}/images/${this.getDataValue('filename')}`;
          },
        },

        // deleted_at: {
        //   type: Sequelize.DATE,
        //   allowNull: true,
        //   defaultValue: null
        // }
      },
      {
        sequelize,
        tableName: 'fotos',
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: 'fk_alunos' });
    this.belongsTo(models.User, { foreignKey: 'fk_users' });
  }
} exports.default = Fotos;

