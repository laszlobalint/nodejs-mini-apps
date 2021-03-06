const request = require("postman-request");

const WEATHER_API_BASE_URL = "http://api.weatherstack.com";
const WEATHER_API_API_KEY = "1c9531829f8a635edf26944ddc1156c6";

const weather = ({ latitude, longitude, location } = {}, callback) => {
  const url = `${WEATHER_API_BASE_URL}//current?access_key=${WEATHER_API_API_KEY}&query=${latitude},${longitude}&units=m`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Could not retrieve weather information!", undefined);
    } else if (body.error) {
      callback("Unable to find the location!", undefined);
    } else {
      callback(
        undefined,
        `Current weather in ${location}: ${body.current.weather_descriptions[0]}.
        It is currently ${body.current.temperature} degrees out, and feels like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity}%.`
      );
    }
  });
};

module.exports = weather;
