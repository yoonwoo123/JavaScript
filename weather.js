API_KEY = 'f0bf65f2d83b9340fbbd9cefeac18b04';
const COORDS = 'coords';
const weather = document.querySelector('.js-weather');

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
.then(function(response) { // .then은 req가 무사히 도착할 때까지 기다리고 그 후에 함수 실행하게 해줌
    console.log(response);
    return response.json(); // response의 json부분을 보고 싶은데
                                        // return이 오는데 걸리므로 .then을 또 써줌
}).then(function(json) {
    console.log('json :', json);
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperature} @ ${place}`;
});
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoFalse() {
    console.log("Cant access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoFalse);
}


function loadCoords() {
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCords);
        console.log(parseCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }

}
function init() {
    loadCoords();
}

init();