"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async index(req, res) {
    try {

      const { id } =  req.user;

      // Buscar todos os users
      const users = await _User2.default.findAll();
      if(!users){
        return res.status(400).json({ msg: 'nenhum usuario encontrado' });
      }
      return res.json(users);
    } catch (error) {
      // Lidar com erros
      return res.status(500).json({ msg: 'Erro ao buscar users', errors: error });
    }
  }

  async show(req, res) {
    try {
      const { id } =  req.user;
      // Buscar todos os users
      const users = await _User2.default.findByPk(id);
      if(!users){
        return res.status(400).json({ msg: 'nenhum usuario encontrado' });
      }
      return res.json(users);
    } catch (error) {
      // Lidar com erros
      return res.status(500).json({ msg: 'Erro ao buscar users', errors: error });
    }
  }

  async create(req, res) {
    try {
      // Extrai os dados do corpo da requisição
      const { nome, password, email } = req.body;

      // Valida se todos os campos obrigatórios foram enviados
      if (!nome || !email || !password) {
        return res.status(400).json({ msg: 'Todos os campos são obrigatórios.' });
      }

      // Cria o registro no banco de dados
      const user = await _User2.default.create({
        nome,
        email,
        password
      });

      // Retorna o User criado
      return res.status(201).json(user);
    } catch (error) {
      // Lida com erros
      return res.status(500).json({ msg: 'Erro ao criar User', errors:
          error.errors.map((err) => ({message: err.message,  path: err.path})),
       });

    }
  }

  async update(req, res) {
    try {

      const { id } = req.user;

      if (!id) {
        return res.status(400).json({ msg: 'ID não inviado.' });
      }

      // Buscar todos os users
      const users = await _User2.default.findByPk(id);
      if(!users){
        return res.status(400).json({ msg: 'nenhum usuario encontrado' });
      }

      const [affectedRows] = await _User2.default.update(req.body,{
        where: { id }
      })

       // Verificar se algo foi alterado
    if (affectedRows === 0) {
      return res.status(400).json({ msg: 'Nenhuma alteração realizada.' });
    }

    // Buscar o usuário atualizado
    const updatedUser = await _User2.default.findByPk(id);
    return res.json(updatedUser);

    } catch (error) {
      // Lidar com erros
      return res.status(500).json({ msg: 'Erro ao atualizar', errors:   error.errors.map((err) => ({message: err.message,  path: err.path})) });
    }
  }

  async delete(req, res) {
    try {
      // const { id } = req.params;
      const { id } = req.user;

      if (!id) {
        return res.status(400).json({ msg: 'ID não inviado.' });
      }

      // Buscar todos os users
      const users = await _User2.default.findByPk(id);
      if(!users){
        return res.status(400).json({ msg: 'nenhum usuario encontrado' });
      }

    // Excluir o usuário
    const deletedRows = await _User2.default.destroy({
      where: { id }
    });

    // Verificar se o usuário foi excluído
    if (deletedRows === 0) {
      return res.status(400).json({ msg: 'Não foi possível excluir o usuário.' });
    }

    return res.json({ msg: 'Usuário deletado com sucesso!' });

    } catch (error) {
      // Lidar com erros
      return res.status(500).json({ msg: 'Erro ao atualizar', errors:   error.errors.map((err) => ({message: err.message,  path: err.path})) });
    }
  }

}

exports. default = new UserController();