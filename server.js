const express = require("express");

require("./db.js");

const authRoutes = require("./auth");
const alunosRoutes = require("./alunos");

const app = express();

app.use(express.json());


// rotas
app.use("/auth", authRoutes);
app.use("/alunos", alunosRoutes);


app.get("/", (req, res) => {
  res.send("escola");
});


app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});