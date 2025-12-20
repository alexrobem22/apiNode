import { where } from "sequelize";
import Aluno from "../models/Aluno";

class AlunoController {
  async index(req, res) {
    try {
      // Buscar todos os alunos
      const alunos = await Aluno.findAll({
        where: { deleted_at: null }
      });

      return res.json(alunos);
    } catch (error) {
      // Lidar com erros
      return res.status(500).json({ error: 'Erro ao buscar alunos', details: error });
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
       return res.status(201).json(aluno);
    } catch (error) {
      // Lida com erros
       return res.status(500).json({ error: 'Erro ao criar aluno', details: error });
    }
  }

  async update(req, res){

    try {

     const { id } = req.body;

      const aluno = await Aluno.findOne({
        where: {
          id,
          deleted_at: null,
        },
      });

      if (!aluno) {
        return res.status(400).json({ error: 'Aluno não encontrado' });
      }

      await aluno.update(req.body);

     return res.status(200).json(aluno);

    } catch (error) {
      // Lida com erros
      res.status(500).json({ error: 'Erro ao atualizar aluno', details: error });
    }
  }

  async delete(req, res){

    try {

     const { id } = req.body;

      const aluno = await Aluno.findOne({
        where: {
          id,
          deleted_at: null,
        },
      });

      if (!aluno) {
        return res.status(400).json({ error: 'Aluno não encontrado' });
      }

      await aluno.update({deleted_at: new Date()});

     return res.status(200).json({msg: "Aluno deletado com sucesso!"});

    } catch (error) {
      // Lida com erros
      return res.status(500).json({ error: 'Erro ao atualizar aluno', details: error });
    }
  }
}

export default new AlunoController();