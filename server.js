import app from './app.js';
import { Sequelize } from 'sequelize';
import databaseConfig from './src/config/database.js';

const sequelize = new Sequelize(databaseConfig);

const port = 3001;
app.listen(port, async () => {
  try {
    // Testa a conexão com o banco de dados
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados foi bem-sucedida!');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }

  console.log('\n=====================================');
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
  console.log('=====================================');
});
