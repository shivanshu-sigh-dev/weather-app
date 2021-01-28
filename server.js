const express = require('express');
const helper = require('./helper/helper');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/weatherApp.html");
});

app.post('/getWeather', (req, res) => {
    var cityName, lat, lang, weatherString;
    var mainSelection = req.body.mainSelection;
    if(mainSelection === "city"){
        cityName = req.body.cityName;
        if(isNaN(cityName)){
            weatherString = `?city=${cityName}&key=ef8e6a8ae16d4527b68d13205fe6e55c`;
        } else {
            weatherString = "NULL";
        }
    } else {
        lat = parseFloat(req.body.latitude);
        lang = parseFloat(req.body.longitude);
        if(!isNaN(lat) && !isNaN(lang)){
            weatherString = `?lat=${lat}&lon=${lang}&key=ef8e6a8ae16d4527b68d13205fe6e55c`
        } else {
            weatherString = "NULL";
        }
    }
    if(weatherString !== "NULL"){
        helper.getWeatherDetails(weatherString).then((weatherData) => {
            res.send(JSON.stringify(weatherData));
        }).catch((error) => {
            console.log(error);
            if(error.hasOwnProperty("error")){
                res.send(error.error);
            } else {
                res.send(error);
            }
        });
    } else {
        res.send("Invalid Data Sent");
    }
});

app.listen(3000, () => {
    console.log("Server started at port 3000");
});