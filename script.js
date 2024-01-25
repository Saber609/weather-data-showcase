const apiKey = "1235245cf29f5237baf8eda916c8155e";
const cities = [
    { name: "Tokyo, Japan", lat: 35.6895, lng: 139.6917 },
    { name: "London, United Kingdom", lat: 51.5074, lng: -0.1278 },
    { name: "New York City, USA", lat: 40.7128, lng: -74.0060 },
];

const script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBWswKUoWuvoDe_RBLb3yxe6qDP1b2DQvU&callback=initMap`;
script.async = true;
document.body.appendChild(script);

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
}

function createWeatherCard(city) {
    const card = document.createElement("div");
    card.classList.add("weather-card");

    const h2 = document.createElement("h2");
    h2.textContent = city.name;
    card.appendChild(h2);

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=<span class="math-inline">\{city\.lat\}&lon\=</span>{city.lng}&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
