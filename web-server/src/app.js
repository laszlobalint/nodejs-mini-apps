const express = require("express");
const hbs = require("hbs");
const path = require("path");

const geocode = require("./utils/geocode");
const weather = require("./utils/weather");

process.env["NO_PROXY"] = "*";
const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
app.use(express.static(path.join(__dirname, "../public")));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.get("", (req, res) => res.render("index", { title: "Weather App" }));

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({ error: "Location must be provided!" });
  }
  geocode(req.query.location, (error, coordinates) => {
    if (error) {
      return res.send({ error });
    } else {
      weather(coordinates, (error, weather) => (error ? res.send({ error }) : res.send({ weather })));
    }
  });
});

app.get("/about", (req, res) => res.render("about", { title: "About", author: "László Bálint" }));

app.get("/help", (req, res) => res.render("help", { title: "Help" }));

app.get("/help/*", (req, res) => res.render("error", { title: "Help", error: "Help article not found." }));

app.get("*", (req, res) => res.render("error", { title: "Not found - 404", error: "Resource not available or found." }));

app.listen(3000, () => console.log(`Web Server has started on port 3000!`));
