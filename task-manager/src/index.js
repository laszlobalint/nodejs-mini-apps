const express = require("express");

require("./db/mongoose");

const User = require("./models/user");
const Task = require("./models/task");

process.env["NO_PROXY"] = "*";
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    res.status(200).send(await User.find({}));
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    await User.findById(req.params.id).then((user) => {
      if (!user) return res.status(404).send();

      res.status(200).send(user);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/users", async (req, res) => {
  try {
    res.status(201).send(await new User(req.body).save());
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/tasks", async (req, res) => {
  try {
    res.status(200).send(await Task.find({}));
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    await Task.findById(req.params.id).then((task) => {
      if (!task) return res.status(404).send();

      res.status(200).send(task);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/tasks", async (req, res) => {
  try {
    res.status(201).send(await new Task(req.body).save());
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => console.log(`Web Server has started on port ${port}!`));
