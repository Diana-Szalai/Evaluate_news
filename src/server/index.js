var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
const axios = require("axios");
var cors = require('cors')
const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

console.log(JSON.stringify(mockAPIResponse))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})

let sentiment;
//let API_KEY='6a6f27a2941f0fccb6310f120d141e3b'
//const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
//const apiKey = '&APPID=84b379cb9ec28aaca002d6de5f4d7c07';
const geoNamesURL = 'http://api.geonames.org/searchJSON?q=';
const username = "diana_szalai";
// runs the function when post test is called from client

app.post('/test', async (request, response) => {
    try{
        const result = await axios.post(
            `${geoNamesURL}${goingToText}"&maxRows=1&username="${username}`
        );
        const{ data } = result;
        //const{code} = data.status
        console.log(data);
     // status code 200 is failed so runs following if not failed
     if (data) {
        // stores the below field in its own variable
        const { cityLat} = data.geonames[0].lat;
        const { cityLong } = data.geonames[0].lng;
        const { country } = data.geonames[0].countryName;
        const { population } = data.geonames[0].population;
        const {countryCode } = data.geonames[0].countryCode;
        //const { confidence } = data;
        //const { irony } = data;
        // storing the api response
        sentiment = {
            cityLat,
            cityLong,
            country,
            population,
            countryCode
        };
       response.end("It worked!");
      } else {
        // if error occurs then change the response to false
       sentiment = false;
       response.end("It Failed!");}
      } catch (e) {
          console.log(`Error = ${e}`);
      }
});

// calls the function on get sentiment method
app.get("/sentiment", (req, res) => {
// sends the sentiment variable
//console.log(`/Sentiment request is----------------${res}-----------------${req}`)
res.send(sentiment);
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 5051!')
})
