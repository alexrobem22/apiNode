import User from "../models/User.js";

class UserController {
  async index(req, res) {
    try {

      const { id } =  req.user;

      // Buscar todos os users
      const users = await User.findAll();
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
      const users = await User.findByPk(id);
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
      const user = await User.create({
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
      const users = await User.findByPk(id);
      if(!users){
        return res.status(400).json({ msg: 'nenhum usuario encontrado' });
      }

      const [affectedRows] = await User.update(req.body,{
        where: { id }
      })

       // Verificar se algo foi alterado
    if (affectedRows === 0) {
      return res.status(400).json({ msg: 'Nenhuma alteração realizada.' });
    }

    // Buscar o usuário atualizado
    const updatedUser = await User.findByPk(id);
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
      const users = await User.findByPk(id);
      if(!users){
        return res.status(400).json({ msg: 'nenhum usuario encontrado' });
      }

    // Excluir o usuário
    const deletedRows = await User.destroy({
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

export default new UserController();