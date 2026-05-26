const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("./db");

const router = express.Router();


// cadastro
router.post("/register", async (req, res) => {

  const { email, senha } = req.body;

  const hash = await bcrypt.hash(senha, 10);

  const sql = `
    INSERT INTO usuarios (email, senha)
    VALUES (?, ?)
  `;

  db.run(sql, [email, hash], function(err) {

    if (err) {
      return res.status(500).json({
        erro: err.message
      });
    }

    res.status(201).json({
      mensagem: "Usuário criado!"
    });

  });

});


// login
router.post("/login", (req, res) => {

  const { email, senha } = req.body;

  db.get(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],

    async (err, usuario) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (!usuario) {
        return res.status(404).json({
          erro: "Usuário não encontrado"
        });
      }

      const senhaValida = await bcrypt.compare(
        senha,
        usuario.senha
      );

      if (!senhaValida) {
        return res.status(401).json({
          erro: "Senha inválida"
        });
      }

      const token = jwt.sign(
        {
          id: usuario.id,
          email: usuario.email
        },
        "segredo",
        {
          expiresIn: "1d"
        }
      );

      res.json({
        token
      });

    }
  );

});

module.exports = router;