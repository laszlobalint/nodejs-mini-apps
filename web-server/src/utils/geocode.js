const request = require("postman-request");

const MAP_API_TOKEN = "pk.eyJ1IjoibGFzemxvLWJhbGludCIsImEiOiJja2dqbW93d2MwNGN4MnhvaDRveDE2a2g5In0.t2okNv2tyGG718dy94WLkA";
const MAP_API_BASE_URL = "https://api.mapbox.com";

const geocode = (location, callback) => {
  const url = `${MAP_API_BASE_URL}/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${MAP_API_TOKEN}&limit=1`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Could not retrieve geocoding information!", undefined);
    } else if (body.error || body.features.length === 0) {
      callback("Unable to do the forward geocoding to get the location!", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
