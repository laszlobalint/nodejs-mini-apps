const chalk = require("chalk");
const request = require("postman-request");

const WEATHER_API_API_KEY = "1c9531829f8a635edf26944ddc1156c6";
const WEATHER_API_BASE_URL = "http://api.weatherstack.com";

const weather = (coordinates, callback) => {
  const url = `${WEATHER_API_BASE_URL}//current?access_key=${WEATHER_API_API_KEY}&query=${coordinates.latitude},${coordinates.longitude}&units=m`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback(chalk.red.inverse("Could not retrieve weather information!"), undefined);
    } else if (response.body.error) {
      callback(chalk.red.inverse("Unable to find the location!"), undefined);
    } else {
      callback(
        undefined,
        chalk.green.inverse(
          `Current weather in ${coordinates.location}: ${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out.`
        )
      );
    }
  });
};

module.exports = weather;
