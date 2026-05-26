const express = require("express");

const db = require("./db");

const authMiddleware = require("./middleware");

const router = express.Router();


// rota protegida
router.get("/", authMiddleware, (req, res) => {

  db.all(
    "SELECT * FROM alunos",
    [],
    (err, rows) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(rows);

    }
  );

});


// cadastrar aluno
router.post("/", authMiddleware, (req, res) => {

  const { nome, idade, turma } = req.body;

  const sql = `
    INSERT INTO alunos (nome, idade, turma)
    VALUES (?, ?, ?)
  `;

  db.run(
    sql,
    [nome, idade, turma],

    function(err) {

      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        id: this.lastID,
        nome,
        idade,
        turma
      });

    }
  );

});

module.exports = router;