const express = require("express");
const router = new express.Router();
const Task = require("../models/task");

router.get("/tasks", async (req, res) => {
  try {
    res.status(200).send(await Task.find({}));
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/tasks/:id", async (req, res) => {
  try {
    await Task.findById(req.params.id).then((task) => {
      if (!task) return res.status(404).send();

      res.status(200).send(task);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/tasks", async (req, res) => {
  try {
    res.status(201).send(await new Task(req.body).save());
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowed = ["description", "completed"];

  if (!updates.every((update) => allowed.includes(update))) return res.send(400).send({ error: "Invalid updates!" });

  try {
    await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).then((task) => {
      if (!task) return res.status(404).send();

      res.status(200).send(task);
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id).then((task) => {
      if (!task) return res.status(404).send();

      res.status(204).send(task);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
