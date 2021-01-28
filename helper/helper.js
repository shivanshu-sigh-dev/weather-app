var https = require('https');

var getWeatherDetails = (weatherString) => {
    return new Promise((resolve, reject) => {
        const url = "https://api.weatherbit.io/v2.0/current" + weatherString;
        let dataChunks = [];
        https.get(url, (weatherRes) => {
            weatherRes.on('data', (data) => {
                dataChunks.push(data);
            });
            weatherRes.on('end', (d) => {
                let dataChunksConcat = Buffer.concat(dataChunks).toString();
                if(dataChunksConcat.length > 0){
                    var weatherData = JSON.parse(dataChunksConcat);
                    if(weatherData.hasOwnProperty("error")){
                        reject(weatherData);
                    } else{
                        var dataToReturn = {
                            temp: weatherData.data[0].temp,
                            city: weatherData.data[0].city_name,
                            icon: weatherData.data[0].weather.icon,
                            desc: weatherData.data[0].weather.description
                        };
                        resolve(dataToReturn);
                    }
                } else {
                    reject("NULL");
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
};

module.exports = {
    getWeatherDetails
}