const express = require("express");
const hbs = require("hbs");
const path = require("path");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
app.use(express.static(path.join(__dirname, "../public")));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.get("", (req, res) =>
  res.render("index", { title: "Weather App", author: "Bálint László" })
);

app.get("/about", (req, res) => res.render("about"));

app.get("/help", (req, res) =>
  res.render("help", { text: "Please, contant me if any help required!" })
);

app.listen(3000, () => console.log(`Web Server has started on port 3000!`));
