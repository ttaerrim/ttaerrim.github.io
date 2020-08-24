const weather = document.querySelector('.js-weather');
const API_KEY = 'c38259c9ea4ad279063747fb42597046';
const COORDS = 'coords';

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`).then(function (response) {
        return response.json();
    }).then(function (json) {
        let temperature = Math.round(json.main.temp);
        const place = json.name;
        weather.innerText = `${temperature}°C @ ${place}`
    });
    // js에서 url 데이터 얻는 방법: fetch
    // then: 데이터 완전 들어온 다음 함수 호출
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,        // latitude: latitude,
        longitude        // longitude: longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log('Cant access geo location');
}
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}
function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();