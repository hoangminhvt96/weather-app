const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
var S = require('string');
const app = express()

const apiKey = 'b14900631c29994fda6eb4683567f791';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=vi&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Lỗi! Xin thử lại'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Lỗi! Xin thử lại'});
      } else {
        let weatherTemp = S(`Hihi đang là ${weather.main.temp} độ C tại ${weather.name}\r\nHPA: ${weather.main.pressure}\r\n`);
        res.render('index', {weather: weatherTemp, error: null});
        //let weatherPressure = `Sức gió: ${weather.main.pressure} hpA`;

      }
    }
  });
})

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})  