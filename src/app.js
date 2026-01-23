import dotenv from "dotenv";
import express from "express";
import { resolve } from "path"; // Adicione dirname

// Inicializa a conexão com o banco de dados
import "./database/index";
import homeRoutes from "./routes/homeRoutes";
import userRoutes from "./routes/userRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import alunoRoutes from "./routes/alunoRoutes";
import fotoRoutes from "./routes/fotoRoutes";

dotenv.config(); // Carrega variáveis de ambiente do arquivo .env

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true })); // Permite receber dados codificados via URL
    this.app.use(express.json()); // Permite receber dados no formato JSON
    this.app.use('/images/', express.static(resolve(__dirname, '..', "uploads", 'images'))); // Servir arquivos estáticos da pasta 'uploads'
  }

  routes() {
    this.app.use("/", homeRoutes); // Define as rotas principais
    this.app.use("/users", userRoutes); // Define as rotas principais
    this.app.use("/tokens", tokenRoutes); // Define as rotas principais
    this.app.use("/aluno", alunoRoutes); // Define as rotas principais
    this.app.use("/fotos", fotoRoutes); // Define as rotas principais
  }
}

export default new App().app; // Exporta a aplicação configurada
