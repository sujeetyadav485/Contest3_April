let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  map.setCenter({ lat, lng: lon });

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=98d92d1a7144aae0d9ec1f33579fd179&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const description = data.weather[0].description;
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;

      document.getElementById("description").textContent = `Weather: ${description}`;
      document.getElementById("temperature").textContent = `Temperature: ${temperature}°C`;
      document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
      document.getElementById("wind-speed").textContent = `Wind Speed: ${windSpeed} m/s`;
      document.getElementById("latitude").textContent = `Latitude: ${lat}`;
      document.getElementById("longitude").textContent = `Longitude: ${lon}`;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}
