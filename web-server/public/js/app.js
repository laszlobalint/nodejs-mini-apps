const weatherForm = document.querySelector("form");
const error = document.querySelector("#error");
const weather = document.querySelector("#weather");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  error.textContent = "";
  weather.textContent = "Loading...";

  fetch(`http://localhost:3000/weather?location=${event.target.location.value}`).then((response) => {
    response
      .json()
      .then((data) => {
        if (data.error) {
          weather.textContent = "";
          error.textContent = data.error;
        } else {
          error.textContent = "";
          weather.textContent = data.weather;
        }
      })
      .catch((error) => (error.textContent = error));
  });
});
