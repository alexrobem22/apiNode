import Sequelize, { Model }  from "sequelize";
import bcrryptjs from 'bcryptjs';

export default class User extends Model {
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
        password_hash: {
            type: Sequelize.STRING,
            defaultValue: '',
        },
        password: {
            type: Sequelize.VIRTUAL,
            defaultValue: '',
            validate:{
                len: {
                    args: [6, 50],
                    msg: 'A senha precisa ter entre 6 e 5 caracteres'
                }
            }
        },
      },
      {
        sequelize,
        // defaultScope: {
        //   attributes: { exclude: ['password', 'password_hash'] }
        // },
        scopes: {
          withPassword: {
            attributes: { include: ['password_hash'] }
          }
        }
      }
    );
    this.addHook('beforeSave', async (user) => {
      if(user.password){
          user.password_hash = await bcrryptjs.hash(user.password, 8)
      }

    })
    return this;
  }

    toJSON() {
      const attributes = { ...this.get() };
      delete attributes.password;
      delete attributes.password_hash;
      return attributes;
    }

    passwordIsValid(password){
      return bcrryptjs.compare(password, this.password_hash);
    }
}

