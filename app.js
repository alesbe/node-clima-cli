const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const colors = require('colors');

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad para obtener el clima',
        demand: true
    }
}).argv;

/*
lugar.getLugar(direccion)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log('Error de conexión con la API de la posición');
    });

clima.getClima(res.lat, res.lng)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log('Error de conexión con la API del clima', err);
    });
*/

const getInfo = async(direccion) => {
    try {
        const coords = await lugar.getLugar(direccion);
        const temp = await clima.getClima(coords.lat, coords.lng);

        return {
            direccion,
            pais: coords.pais,
            lat: coords.lat,
            lng: coords.lng,
            clima: temp.clima,
            temp: temp.temp
        }

    } catch (err) {
        return;
    }
}

getInfo(argv.direccion)
    .then(res => {
        if (res === undefined) {
            return console.log(`No se ha podido encontrar el clima de ${argv.direccion}`.bold.red);
        }
        let separador = ''
        for (let i = 1; i <= res.direccion.length + 2; i++) {
            separador += '=';
        }

        console.log(`${separador}`.green);
        console.log(` ${res.direccion} `.bold.bgGreen);
        console.log(`${separador}`.green);

        console.log(`Temperatura: `.bold.yellow + colors.yellow(res.temp + ` Cº`));
        console.log(`Clima: `.bold.yellow + colors.yellow(res.clima) + `\n`);

        console.log(`Pais: `.bold.yellow + colors.yellow(res.pais));
        console.log(`Latitud: `.bold.yellow + colors.yellow(res.lat));
        console.log(`Longitud: `.bold.yellow + colors.yellow(res.lng));
    })
    .catch(err => {
        console.log(`ERROR \n\n`.bold.bgRed);
    });