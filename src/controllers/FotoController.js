import multer from 'multer';

import multerConfig from '../config/multerConfig.js';

const upload = multer(multerConfig).single('foto');

class FotoController {

  async store(req, res) {
    return upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ errors: [err.code] });
      } else if (err) {
        return res.status(400).json({ errors: [err.code] });
      }

      return res.json({ foto: req.file });
    });
  }
}

export default new FotoController();