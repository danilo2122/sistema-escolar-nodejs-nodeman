const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      erro: "Token não enviado"
    });
  }

  try {

    const decoded = jwt.verify(token, "segredo");

    req.usuario = decoded;

    next();

  } catch (error) {

    res.status(401).json({
      erro: "Token inválido"
    });

  }

}

module.exports = authMiddleware;