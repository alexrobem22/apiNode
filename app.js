import dotenv from 'dotenv';
dotenv.config(); // Carrega variáveis de ambiente do arquivo .env

// Inicializa a conexão com o banco de dados
import './src/database';

import express from 'express';
import homeRoutes from './src/routes/homeRoutes';
import userRoutes from './src/routes/userRoutes';
import tokenRoutes from './src/routes/tokenRoutes';

class App {
  constructor() {
    this.app = express(); 
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true })); // Permite receber dados codificados via URL
    this.app.use(express.json()); // Permite receber dados no formato JSON
  }

  routes() {
    this.app.use('/', homeRoutes); // Define as rotas principais
    this.app.use('/users', userRoutes); // Define as rotas principais
    this.app.use('/tokens', tokenRoutes); // Define as rotas principais
  }
}

export default new App().app; // Exporta a aplicação configurada
