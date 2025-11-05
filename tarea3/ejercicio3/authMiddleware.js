const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ mensaje: 'Token requerido' });
  }

  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'secreto');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ mensaje: 'Token inválido' });
  }
}

module.exports = authMiddleware;
