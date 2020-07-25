const axios = require('axios');

const getLugar = async(direccion) => {
    //Escape string
    const encodedDir = encodeURI(direccion);

    const resp = await axios.get(`https://geocode.xyz/${encodedDir}?json=1`);

    if (resp.data.standard.countryname === undefined) {
        throw new Error(`No hay resultados para ${direccion}`);
    }

    const ciudad = resp.data.standard.city;
    const pais = resp.data.standard.countryname;
    const lat = resp.data.latt;
    const lng = resp.data.longt;

    return {
        ciudad,
        pais,
        lat,
        lng
    }
}

module.exports = {
    getLugar
}