//Required Libraries
const express = require('express')
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
//Variables

// EJS - Use ejs and set public folder to readable
app.use(express.static('public'));
app.set('view engine', 'ejs')
// use body-parser
app.use(bodyParser.urlencoded({ extended: true }));


//Main website functionality
app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
    let targetUrl = req.body.targetUrl;
    let apiKey = req.body.apiKey;
    let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${targetUrl}&units=imperial&appid=${apiKey}`
    let weather = "Test"
    //Parse response from Post and display it to webpage
    request(apiUrl, function (err, response, body) {
        if(err){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weather = JSON.parse(body)
          if(weather.main == undefined){
            res.render('index', {weather: null, error: 'Error, please try again'});
          } else {
            let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
            res.render('index', {weather: weatherText, error: null});
          }
        }
      });
    })  

app.listen(3000, function () {
    console.log('Listening on port 3000!')
})