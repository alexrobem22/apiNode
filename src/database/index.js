import { Sequelize } from "sequelize";
import databaseConfig from "../config/database";
import Aluno from "../models/Aluno";
import Users from "../models/User";

// Lista de modelos a serem inicializados
const models = [Aluno,Users];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Inicializa a conexão com o banco de dados
    this.connection = new Sequelize(databaseConfig);

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

export default new Database();










