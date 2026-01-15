import Sequelize, { Model }  from "sequelize";

export default class Aluno extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
            type: Sequelize.STRING,
            defaultValue: '',
            validate:{
                len:{
                    args: [3, 255],
                    msg: 'Campo nome deve ter entre 3 e 255 caracteres'
                }
            }
        },
        sobrenome: {
            type: Sequelize.STRING,
            defaultValue: '',
            validate:{
                len:{
                    args: [3, 255],
                    msg: 'Campo sobrenome deve ter entre 3 e 255 caracteres'
                }
            }
        },
        email: {
            type: Sequelize.STRING,
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
            type: Sequelize.INTEGER,
            defaultValue: 0,
            validate:{
                min: {
                    args: [0],
                    msg: 'Idade deve ser um número positivo'
                }
            }
        },
        peso: {
            type: Sequelize.FLOAT,
            defaultValue: 0,
            validate:{
                min: {
                    args: [0],
                    msg: 'Peso deve ser um número positivo'
                }
            }
        },
        altura: {
            type: Sequelize.FLOAT,
            defaultValue: 0,
            validate:{
                min: {
                    args: [0],
                    msg: 'Altura deve ser um número positivo'
                }
            }
        },
        deleted_at: {
          type: Sequelize.DATE,
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
}

