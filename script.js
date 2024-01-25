const apiKey = "b96712596a4902a5a615d746a5a91e80";

const cities = [
    { name: "Tokyo, Japan", lat: 35.6895, lng: 139.6917 },
    { name: "London, United Kingdom", lat: 51.5074, lng: -0.1278 },
    { name: "New York City, USA", lat: 40.7128, lng: -74.0060 },
];

// Load the Google Maps API asynchronously
const script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBWswKUoWuvoDe_RBLb3yxe6qDP1b2DQvU&callback=initMap`;
script.async = true;
document.body.appendChild(script);

function createWeatherCard(city) {
    // Fetch weather data for the city
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            // Extract relevant data from the response
            const weather = data.weather[0];
            const main = data.main;
            const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

            // Create the HTML structure
            const card = document.createElement('div');
            card.classList.add('weather-card');

            const cityName = document.createElement('h2');
            cityName.textContent = city.name;
            card.appendChild(cityName);

            const weatherIcon = document.createElement('img');
            weatherIcon.src = iconUrl;
            weatherIcon.alt = weather.description;
            card.appendChild(weatherIcon);

            const temperature = document.createElement('p');
            temperature.innerHTML = `Temperature: <span>${Math.round(main.temp)}°C</span>`;
            card.appendChild(temperature);

            // Add other data points as needed:

            // - Feels-like temperature
            // - Humidity
            // - Pressure
            // - Wind speed
            // - Country code
            // - Rain volume (historical or current)

            return card;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            // Handle error gracefully, e.g., display an error message
        });
}

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: { lat: 0, lng: 0 },
    });

    const bounds = new google.maps.LatLngBounds();

    cities.forEach((city) => {
        const weatherCard = createWeatherCard(city);
        document.getElementById("weather-cards").appendChild(weatherCard);

        const marker = new google.maps.Marker({
            position: { lat: city.lat, lng: city.lng },
            map: map,
            title: city.name,
        });

        bounds.extend(marker.position);
    });

    map.fitBounds(bounds);