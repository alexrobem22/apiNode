import Aluno from "../models/Aluno.js";

class HomeController {
  async index(req, res) {
    try {
      // Buscar todos os alunos
      const alunos = await Aluno.findAll();
      res.json(alunos);
    } catch (error) {
      // Lidar com erros
      res.status(500).json({ error: 'Erro ao buscar alunos', details: error });
    }
  }

  async create(req, res) {
    try {
      // Extrai os dados do corpo da requisição
      const { nome, sobrenome, email, idade, peso, altura } = req.body;

      // Valida se todos os campos obrigatórios foram enviados
      if (!nome || !sobrenome || !email || !idade || !peso || !altura) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }

      // Cria o registro no banco de dados
      const aluno = await Aluno.create({
        nome,
        sobrenome,
        email,
        idade,
        peso,
        altura,
      });

      // Retorna o aluno criado
      res.status(201).json(aluno);
    } catch (error) {
      // Lida com erros
      res.status(500).json({ error: 'Erro ao criar aluno', details: error });
    }
  }
}

export default new HomeController();