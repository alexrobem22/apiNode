import multer from 'multer';

import multerConfig from '../config/multerConfig.js';
import Fotos from '../models/Fotos.js';
import User from '../models/User.js';
import Aluno from '../models/Aluno.js';
const upload = multer(multerConfig).single('foto');


const checkStudent = async (fk_alunos) => {
  return Aluno.findOne({
    where: {
      id: fk_alunos,
      deleted_at: null,
    },
  });
};

const checkUser = async (fk_users) => {
  return User.findOne({
    where: {
      id: fk_users,
    },
  });
};

class FotoController {

  store(req, res) {
    return upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ errors: [err.code] });
      } else if (err) {
        return res.status(400).json({ errors: [err.code] });
      }
      const { originalname, filename, mimetype } = req.file;
      const { fk_alunos, fk_users } = req.body;

      if (fk_alunos && fk_users) {
        return res.status(400).json({
          error: 'Envie apenas fk_alunos OU fk_users, não os dois'
        });
      }

      let registro;
      let nomeModel;

      if (fk_alunos) {

        registro = await checkStudent(fk_alunos);
        nomeModel = 'Aluno';

      }
      else if (fk_users) {

        registro = await checkUser(fk_users);
        nomeModel = 'User';

      }
      else {

        return res.status(400).json({
          error: 'precisa passar fk_alunos ou fk_users'
        });

      }

      if (!registro) {
        return res.status(404).json({
          error: `${nomeModel} não encontrado`
        });
      }

      const foto = await Fotos.create({
        originalname,
        filename,
        mimetype,
        fk_alunos,
        fk_users
      });

      return res.json({ foto: foto });
    });
  }

}

export default new FotoController();