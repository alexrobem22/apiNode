import Sequelize, { Model }  from "sequelize";
import appConfig from '../config/appConfig.js';

export default class Fotos extends Model {
  static init(sequelize) {
    super.init(
      {
        fk_alunos: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        fk_users: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        originalname: {
            type: Sequelize.STRING,
            defaultValue: '',
            validate:{
                notEmpty:{
                    msg: 'Campo não pode ficar vazio.'
                }
            }
        },
        filename: {
            type: Sequelize.STRING,
            defaultValue: '',
            validate:{
                notEmpty:{
                    msg: 'Campo não pode ficar vazio.'
                }
            }
        },
        mimetype: {
            type: Sequelize.STRING,
            defaultValue: '',
            validate:{
                notEmpty:{
                    msg: 'Campo não pode ficar vazio.'
                }
            }
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${appConfig.url}/images/${this.getDataValue('filename')}`;
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
}

