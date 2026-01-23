import User from "../models/User";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

class TokenController {
  async store(req, res) {
    try {
      // Validação de entrada
      await body('email').isEmail().withMessage('Email inválido').run(req);
      await body('password').notEmpty().withMessage('Senha é obrigatória').run(req);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      const user = await User.scope('withPassword').findOne({ where: { email } });

      if (!user || !(await user.passwordIsValid(password))) {
        return res.status(401).json({ errors: ['Credenciais inválidas'] });
      }

      const { id } = user;

      // Geração do token
      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET || 'default_secret', {
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

export default new TokenController();