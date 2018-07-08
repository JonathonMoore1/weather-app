const request = require('request');
require('dotenv').config();

var getWeather = (latitude, longitude, callback) => {

    request({
        url: `https://api.darksky.net/forecast/${process.env.API_KEY}/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else if (response.statusCode === 400){
            callback(`Error ${body.code}: ${body.error}`);
        } else {
            callback('Unable to connect to Forecast.io server.');
        }
    });
}

module.exports.getWeather = getWeather;