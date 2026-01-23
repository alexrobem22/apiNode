"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Aluno extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
            type: _sequelize2.default.STRING,
            defaultValue: '',
            validate:{
                len:{
                    args: [3, 255],
                    msg: 'Campo nome deve ter entre 3 e 255 caracteres'
                }
            }
        },
        sobrenome: {
            type: _sequelize2.default.STRING,
            defaultValue: '',
            validate:{
                len:{
                    args: [3, 255],
                    msg: 'Campo sobrenome deve ter entre 3 e 255 caracteres'
                }
            }
        },
        email: {
            type: _sequelize2.default.STRING,
            defaultValue: '',
            unique: {
                msg: 'Email ja existe'
            },
            validate:{
                isEmail:{
                    msg: 'Email invalido'
                }
            }
        },
        idade: {
            type: _sequelize2.default.INTEGER,
            defaultValue: 0,
            validate:{
                min: {
                    args: [0],
                    msg: 'Idade deve ser um número positivo'
                }
            }
        },
        peso: {
            type: _sequelize2.default.FLOAT,
            defaultValue: 0,
            validate:{
                min: {
                    args: [0],
                    msg: 'Peso deve ser um número positivo'
                }
            }
        },
        altura: {
            type: _sequelize2.default.FLOAT,
            defaultValue: 0,
            validate:{
                min: {
                    args: [0],
                    msg: 'Altura deve ser um número positivo'
                }
            }
        },
        deleted_at: {
          type: _sequelize2.default.DATE,
          allowNull: true,
          defaultValue: null
        }
      },
      {
          sequelize,
      }
    );
    return this;
  }
  static associate(models) {
    this.hasMany(models.Fotos, { foreignKey: 'fk_alunos' });
  }
} exports.default = Aluno;

