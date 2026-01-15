import jwt from 'jsonwebtoken';
import User from '../models/User.js'
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica se o token está no cabeçalho da requisição
  if (!authHeader) {
    return res.status(401).json({ errors: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1]; // Remove o "Bearer" do token

  // Verifica se o token é válido
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findOne({
      where: {
        id: decoded.id,
        email: decoded.email
      }
    })

    if(!user){
      return res.status(403).json({ errors: 'Usuário inválido ou inativo'});
    }

    req.user = decoded; // Salva os dados do token no objeto `req` para uso posterior
    next(); // Continua para a próxima função ou rota
  } catch (error) {
    return res.status(403).json({ errors: 'Token inválido ou expirado'});
  }
};

export default authenticateToken;