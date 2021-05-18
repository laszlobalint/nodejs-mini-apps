const express = require("express");

require("./db/mongoose");

const User = require("./models/user");
const Task = require("./models/task");

process.env["NO_PROXY"] = "*";
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((error) => res.status(500).send(error));
});

app.get("/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) return res.status(404).send();

      res.status(200).send(user);
    })
    .catch((error) => res.status(500).send(error));
});

app.post("/users", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then((user) => res.status(201).send(user))
    .catch((error) => res.status(400).send(error));
});

app.get("/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => res.status(200).send(tasks))
    .catch((error) => res.status(500).send(error));
});

app.get("/tasks/:id", (req, res) => {
  Task.findById(req.params.id)
    .then((task) => {
      if (!task) return res.status(404).send();

      res.status(200).send(task);
    })
    .catch((error) => res.status(500).send(error));
});

app.post("/tasks", (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then((task) => res.status(201).send(task))
    .catch((error) => res.status(400).send(error));
});

app.listen(port, () => console.log(`Web Server has started on port ${port}!`));