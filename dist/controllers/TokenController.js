"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _expressvalidator = require('express-validator');

class TokenController {
  async store(req, res) {
    try {
      // Validação de entrada
      await _expressvalidator.body.call(void 0, 'email').isEmail().withMessage('Email inválido').run(req);
      await _expressvalidator.body.call(void 0, 'password').notEmpty().withMessage('Senha é obrigatória').run(req);

      const errors = _expressvalidator.validationResult.call(void 0, req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      const user = await _User2.default.scope('withPassword').findOne({ where: { email } });

      if (!user || !(await user.passwordIsValid(password))) {
        return res.status(401).json({ errors: ['Credenciais inválidas'] });
      }

      const { id } = user;

      // Geração do token
      const token = _jsonwebtoken2.default.sign({ id, email }, process.env.TOKEN_SECRET || 'default_secret', {
        expiresIn: process.env.TOKEN_EXPERATION || '1d',
      });

      return res.status(200).json({
        token,
        user: { id, email }
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno', details: error.message });
    }
  }
}

exports. default = new TokenController();