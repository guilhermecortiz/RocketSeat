const express = require("express");

const server = express();

server.use(express.json());

const projects = [{ id: 1, title: "Novo projeto", tasks: ["Nova tarefa"] }];
let qtdreq = 0;

function logRequest(req, res, next) {
  qtdreq += 1;
  console.log(qtdreq);
  next();
}

server.use(logRequest);

/*Crie um middleware que será utilizado em todas rotas que recebem
  o ID do projeto nos parâmetros da URL que verifica se o projeto
  com aquele ID existe. Se não existir retorne um erro, caso
  contrário permita a requisição continuar normalmente;*/
function checkIdExists(req, res, next) {
  const { index } = req.params;
  if (!projects[index]) {
    return res.status(400).json({ error: "Project does not exists" });
  }

  req.index = index;
  return next();
};

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { title } = req.body;
  const { tasks } = req.body;
  const project = { 'id': (projects.length + 1), 'title': title, 'tasks': tasks };
  projects.push(project);
  return res.json(projects);
});

server.put("/projects/:index", checkIdExists, (req, res) => {
  const { title } = req.body;
  projects[req.index].title = title;
  return res.json(projects[req.index]);
});

server.delete("/projects/:index", checkIdExists, (req, res) => {
  projects.splice(req.index, 1);
  return res.json(projects);
});

server.post("/projects/:index/tasks", checkIdExists, (req, res) => {
  const { task } = req.body;
  const { tasks } = projects[req.index];
  tasks.push(task);
  return res.json(projects);
});

server.listen(3001);
