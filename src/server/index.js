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
let API_KEY='6a6f27a2941f0fccb6310f120d141e3b'
// runs the function when post test is called from client

app.post('/test', async (request, response) => {
    try{
        const result = await axios.post(
            `http://api.meaningcloud.com/sentiment-2.1?key=${API_KEY}&lang=en&txt=${request.body}`
        );
        const{ data } = result;
        const{code} = data.status
        console.log(data);
     // status code 200 is failed so runs following if not failed
    if (code !== "200") {
        // stores the below field in its own variable
        const { score_tag } = data;
        const { agreement } = data;
        const { subjectivity } = data;
        const { confidence } = data;
        const { irony } = data;

        // storing the api response
        sentiment = {
            score_tag,
            agreement,
            subjectivity,
            confidence,
            irony
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
    console.log('Example app listening on port 8081!')
})
