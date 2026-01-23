"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

var _multerConfig = require('../config/multerConfig'); var _multerConfig2 = _interopRequireDefault(_multerConfig);
var _Fotos = require('../models/Fotos'); var _Fotos2 = _interopRequireDefault(_Fotos);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
const upload = _multer2.default.call(void 0, _multerConfig2.default).single('foto');


const checkStudent = async (fk_alunos) => {
  return _Aluno2.default.findOne({
    where: {
      id: fk_alunos,
      deleted_at: null,
    },
  });
};

const checkUser = async (fk_users) => {
  return _User2.default.findOne({
    where: {
      id: fk_users,
    },
  });
};

class FotoController {

  store(req, res) {
    return upload(req, res, async (err) => {
      if (err instanceof _multer2.default.MulterError) {
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

      const foto = await _Fotos2.default.create({
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

exports. default = new FotoController();