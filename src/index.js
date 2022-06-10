function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `Last updated: ${day} ${hours}:${minutes}`;
}

function getWeather(response) {
  console.log(response.data);
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;
  let feels = Math.round(response.data.main.feels_like);
  document.querySelector("#feels-like").innerHTML = `Feels like: ${feels}°C`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}`;
  document.querySelector(
    "#pressure"
  ).innerHTML = `Pressure: ${response.data.main.pressure} hPa`;
  document.querySelector("#wind").innerHTML = `Wind speed: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("h4").innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "3b1d3e0b3e9d98b9acd6bb3beed84bb6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

function cityOutput(event) {
  event.preventDefault();
  let city = document.querySelector("#text-city").value;
  searchCity(city);
}

let cityEnter = document.querySelector(".search-area");
cityEnter.addEventListener("click", cityOutput);

function showTemperature(response) {
  console.log(response.data);
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;
  let feels = Math.round(response.data.main.feels_like);
  document.querySelector("#feels-like").innerHTML = `Feels like: ${feels}°C`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(
    "#pressure"
  ).innerHTML = `Pressure: ${response.data.main.pressure} hPa`;
  document.querySelector("#wind").innerHTML = `Wind speed: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("h4").innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function handlePosition(response) {
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;
  console.log(response);
  let apiKey = "c72f3fe8e8beb38ac78a224a26b2d893";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentLocationButton = document.querySelector(".location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Seoul");
