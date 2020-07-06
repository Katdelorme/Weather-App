// Setup empty JS object to act as endpoint for all routes
// Project requirment
// There should be a JavaScript Object named projectData initiated in the file server.jsto act as the app API endpoint.
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies aka packages
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
// Package let browser and server speak with each other without any security interruptions
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server and Ports
const port = 8000;

//Spin up the server
//code to to successfully initiate a server named server
const server = app.listen(port, listening)

//Callback to debug
function listening(){
	console.log("server is running")
	console.log(`running on local host:${port}`)
}

// FAKE API
/*const fakeData = {
  date: 'July 5, 2020',
  temperature: '82'
}*/

/*app.get('/weatherData', getFakeData)

function getFakeData(req, res){
  res.send(fakeData)
}*/

//You're called in Post Route
const weatherData = []

app.get('/all', getData)

function getData(req, res){
  res.send(weatherData)
  console.log(weatherData)
}

// Post Route First Attempt

app.post('/addWeather', addWeather);

function addWeather(req,res){
  console.log(req.body) //post in terminal
  newEntry = {
    //date: req.body.date,
    temperature: req.body.temperature,
    feeling: req.body.feeling
  }

  //weatherData up above const weatherData = []
  weatherData.push(newEntry)
  res.send(weatherData)
  console.log(weatherData)
}

// Post Route Current

app.post('/', addWeatherSeverSide);

function addWeatherSeverSide(req,res){
  console.log(req.body) //post in terminal
  newEntry = {
    //date: req.body.date,
    temperature: req.body.temperature,
    feeling: req.body.feeling
  }

  //weatherData up above const weatherData = []
  weatherData.push(newEntry)
  //weatherData.push(req.body)
  res.send(weatherData)
  console.log(weatherData)
}

//Test Example See if can post server and client side
/*const data = []
//post argument
//2 arguements: 'url want to use',
app.post('/', addMovie)

function addMovie (req, res){
  data.push(req.body)
  console.log(data)
}*/

// Respond with JS object when a GET request is made to the homepage
//doesn't work
/*app.get('/', function (req, res) {
  res.send(projectData)
})*/
