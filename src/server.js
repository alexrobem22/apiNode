import app from "./app.js";
import { Sequelize } from "sequelize";
import databaseConfig from "./config/database.js";

const sequelize = new Sequelize(databaseConfig);

const port = process.env.APP_PORT;
app.listen(port, "0.0.0.0", async () => {
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
