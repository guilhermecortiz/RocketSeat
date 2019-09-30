const express = require("express");

//http:localhost:3000/teste
const server = express();

// Configura o express para ler JSON na requisição
server.use(express.json());

//Query params = ?teste=1
server.get("/teste", (req, res) => {
  const nome = req.query.nome;
  return res.json({ message: `Buscando usuário ${nome}` });
});
//Route params = /users/1
server.get("/users/:id", (req, res) => {
  const id = req.params.id;
  return res.json({ message: `Buscando usuário ${id}` });
});
// Equivanete ao de cima

// server.get("/users/:id", (req, res) => {
//   const { id } = req.params;
//   return res.json({ message: `Buscando usuário ${id}` });
// });
// //Request body = { "name": Guilherme, "e-mail": "guilherme@teste.com.br"}
server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  return res.json({ message: `Buscando usuário ${id}` });
});

const users = ["Diego", "Claudio", "Victor"];

//CRUD - Create, Read, Update, Delete
//Read
server.get("/users2/:index", (req, res) => {
  const { index } = req.params;
  return res.json(users[index]);
});

server.get("/users2", (req, res) => {
  return res.json(users);
});

//CRUD - Create, Read, Update, Delete
//Create
server.post("/users2", (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});

//CRUD - Create, Read, Update, Delete
//Update
server.put("/users2/:index", (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  users[index] = name;
  return res.json(users);
});

//CRUD - Create, Read, Update, Delete
//Delete
server.delete("/users2/:index", (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  return res.json(users);
});

//Meddleware

//Meddleware Global
server.use((req, res, next) => {
  console.time("Request");
  console.log("A requisição foi chamada!");
  next();
  console.timeEnd("Request");
});

//Meddleware Local
function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: "User name is required" });
  }

  req.user = user;

  return next();
};

function checkUsersExists(req, res, next) {
  if (!users[req.params.index]) {
    return res.status(400).json({ error: "User does not exists" });
  }
  return next();
};

//CRUD - Create, Read, Update, Delete
//Read
server.get("/users3", (req, res) => {
  return res.json(users);
});

server.get("/users3/:index", checkUserInArray, (req, res) => {
  return res.json(req.user);
});

//CRUD - Create, Read, Update, Delete
//Create
server.post("/users3", (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});

//CRUD - Create, Read, Update, Delete
//Update
server.put("/users3/:index", checkUserInArray, checkUsersExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  users[index] = name;
  return res.json(users);
});

//CRUD - Create, Read, Update, Delete
//Delete
server.delete("/users3/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  return res.json(users);
});

server.listen(3000);
