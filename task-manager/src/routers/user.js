const express = require("express");
const router = new express.Router();
const User = require("../models/user");

router.post("/users/login", async (req, res) => {
  try {
    await User.findByCredentials(req.body.email, req.body.password).then((user) => res.status(200).send(user));
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/users", async (req, res) => {
  try {
    res.status(200).send(await User.find({}));
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    await User.findById(req.params.id).then((user) => {
      if (!user) return res.status(404).send();

      res.status(200).send(user);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/users", async (req, res) => {
  try {
    res.status(201).send(await new User(req.body).save());
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowed = ["name", "password", "email", "age"];

  if (!updates.every((update) => allowed.includes(update))) return res.send(400).send({ error: "Invalid updates!" });

  try {
    await User.findById(req.params.id)
      .then((user) => {
        updates.forEach((update) => (user[update] = req.body[update]));
        return user.save();
      })
      .then((savedUser) => {
        if (!savedUser) return res.status(404).send();

        res.status(200).send(savedUser);
      });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id).then((user) => {
      if (!user) return res.status(404).send();

      res.status(204).send(user);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;