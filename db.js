const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./escola.db", (err) => {

  if (err) {
    console.log(err.message);
  }

  console.log("SQLite conectado 🚀");

});


// tabela alunos
db.run(`
  CREATE TABLE IF NOT EXISTS alunos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    idade INTEGER NOT NULL,
    turma TEXT NOT NULL
  )
`);


// tabela usuários
db.run(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL
  )
`);

module.exports = db;