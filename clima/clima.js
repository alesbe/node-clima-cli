const axios = require('axios');

const getClima = async(lat, lng) => {
    let apiKey = '7df21ae10c9b59889ada7a90db545227';
    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`);

    //Farhenheit temp
    const kelvinTemp = resp.data.main.temp;

    let temp = (kelvinTemp - 273.15).toFixed(2);
    const clima = resp.data.weather[0].main;

    return {
        temp,
        clima
    }
}

module.exports = {
    getClima
}