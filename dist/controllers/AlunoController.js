"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Fotos = require('../models/Fotos'); var _Fotos2 = _interopRequireDefault(_Fotos);

class AlunoController {
  async index(req, res) {
    try {
      // Buscar todos os alunos
      const alunos = await _Aluno2.default.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura', 'deleted_at'],
        where: { deleted_at: null },
        order: [['id', 'DESC'], ['Fotos', 'id', 'DESC']],
        include: {
          model: _Fotos2.default,
          attributes: ['id', 'originalname', 'filename', 'mimetype', 'url'],
        },
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
      const aluno = await _Aluno2.default.create({
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

      const aluno = await _Aluno2.default.findOne({
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

      const aluno = await _Aluno2.default.findOne({
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

exports. default = new AlunoController();