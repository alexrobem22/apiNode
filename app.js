import dotenv from 'dotenv';
import express from 'express';
import { fileURLToPath } from 'url'; // Adicione isso
import { resolve, dirname } from 'path'; // Adicione dirname

// Inicializa a conexão com o banco de dados
import './src/database/index.js';
import homeRoutes from './src/routes/homeRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import tokenRoutes from './src/routes/tokenRoutes.js';
import alunoRoutes from './src/routes/alunoRoutes.js';
import fotoRoutes from './src/routes/fotoRoutes.js';


dotenv.config(); // Carrega variáveis de ambiente do arquivo .env

// Lógica para o __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true })); // Permite receber dados codificados via URL
    this.app.use(express.json()); // Permite receber dados no formato JSON
    this.app.use(express.static(resolve(__dirname, 'uploads'))); // Servir arquivos estáticos da pasta 'uploads'
  }

  routes() {
    this.app.use('/', homeRoutes); // Define as rotas principais
    this.app.use('/users', userRoutes); // Define as rotas principais
    this.app.use('/tokens', tokenRoutes); // Define as rotas principais
    this.app.use('/aluno', alunoRoutes); // Define as rotas principais
    this.app.use('/fotos', fotoRoutes); // Define as rotas principais
  }
}

export default new App().app; // Exporta a aplicação configurada
