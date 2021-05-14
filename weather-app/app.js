const geocode = require("./utils/geocode");
const weather = require("./utils/weather");
process.env["NO_PROXY"] = "*";

geocode(process.argv[2] && "Budapest", (error, coordinates) =>
  error
    ? console.log(error)
    : weather(coordinates, (error, data) => {
        error ? console.log(error) : console.log(data);
      })
);
