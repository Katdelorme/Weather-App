/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
//document.getElementById("entryHolder").innerHTML = newDate;

// Base URL and Personal API Key for OpenWeatherMap API
////api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key} //default to US if no country code
//fetch(baseURL+zipCodeInfo+apiKey)
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=496c984e088fb1eed39a4a33cee69225';
const zipCodeInfo = document.getElementById('zip').value;

//document.getElementById('generate').addEventListener('click', getInfo);
document.getElementById('generate').addEventListener('click', weatherDisplay);

function getInfo(event){
  //might go here
  //const getWeather = document.getElementById('zip').value;
  //getWeather(baseURL, zipCodeInfo, apiKey)
  //console.log('test');

  //Dynamically updated the UI of an app is - creating or changing DOM elements based on data received in real time from the app or an API.
  //const getZip = document.getElementById('zip').value;
  //const getFeelings = document.getElementById('feelings').value;

  //Old for fake data
  /*getWeather('/weatherData')
  // Using Then. Chaining Promises
  //After the above completes successfully
  .then(function(data){
    // Add data
    console.log(data);
    // wait for the data it needs
    ///**************
    //postData('/addWeather', {date:data.date, temperature: data.temperature, feeling:getFeelings} );
    postData('/addWeather', {zip:getZip, feeling:getFeelings} );
  })
  .then(
    updateUI() //below
  )*/

  getWeather(baseURL, zip, apiKey)
  // Using Then. Chaining Promises
  //After the above completes successfully
  .then(function(data){
    // Add data
    console.log(data);
    // wait the data it needs
    ///**************
    //postData('/addWeather', {date:data.date, temperature: data.temperature, feeling:getFeelings} );
    //postData('/addWeather', {zip:getZip, feeling:getFeelings} );
  })
  .then(
    updateUI() //calls the ui below to insert in webpage
  )

}

const updateUI = async (d) => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();

    //const zipCodeInfo = document.getElementById('zip').value;

    //document.getElementById('temp').innerHTML = 'Temperature: '+allData[0].temperature;
    //document.getElementById('zipPlaced').innerHTML = 'Zipcode: '+zipCodeInfo;
    //document.getElementById('zipPlaced2').innerHTML = 'Zipcode Manual: '+zip;
    //document.getElementById('date').innerHTML = 'Date: '+newDate;
    //document.getElementById('temp').innerHTML = 'Temperature: '+allData[0].temperature+ '&deg;';
    //document.getElementById('content').innerHTML = 'Outfit: '+allData[0].feeling;

  }catch(error){
    console.log('error', error);
  }
}



//const getWeather = async (baseURL, zip, key) => {
const getWeather = async (baseURL, zip, apiKey) => {
  // 1. Build API URL in code using API key
  // For REAL api
  //const res = await fetch(baseURL+zip+key)
  const res = await fetch(baseURL + zip + apiKey)

  //const res = await fetch(baseURL + zipCodeInfo + apiKey)
  /*const key = '5548886cb52a8ef6e1a3b5e86235fdff';
  var zip = document.getElementById('zip').value;
  fetch('https://api.openweathermap.org/data/2.5/weather?zip=' + zip + '&appid=' + key)

  console.log('baseURL ' + baseURL)
  console.log('zip ' + zip)
  console.log('key ' + key)*/
  //2. Call API for FAKE to test code
  //const res = await fetch('/weatherData')
  try {

    const data = await res.json();
    console.log(data);
    //1. Do somehintg with the returned Data

    //2.
    //execute
    return data;
    //FAKE apiKey
    ///postData('/addWeather', data)
    postData('/', data)
  } catch(error) {
    console.log('error', error);
    // handle error better later
  }
}

//For testing a static zipcode
//var key = '5548886cb52a8ef6e1a3b5e86235fdff';
//var zip = '32825';

//console.log(baseURL);
//console.log(apiKey);

function weatherDisplay() {

const zipCodeInfo = document.getElementById('zip').value;
console.log(zipCodeInfo);

  fetch(baseURL + zipCodeInfo + apiKey)
  //fetch('https://api.openweathermap.org/data/2.5/weather?zip=' + zip + '&appid=' + key)

  .then(function(resp) { return resp.json() }) // Convert data to json
  //////////////SERVER??????
  /*.then(function(data){
    // Add data
    console.log(data);
    // wait the data it needs
    //postData('/addWeather', {date:data.date, temperature: data.temperature, feeling:getFeelings} );
    //postData('/', {temperature: data.temperature} );
  })*/
  .then(function(data) {
    console.log(data);
    // Call the below Function
    displayWeather(data);
  })
  .catch(function(error) {
    // catch any errors
    console.log('error', error);
  });
}

function displayWeather(d) {
//Information given in Kelvins so convert to fahrenheit
let fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32);
const getFeelings = document.getElementById('feelings').value;
console.log(getFeelings);

/*var a = d.weather[0].description;
var b = fahrenheit + '&deg;';
var c = d.name;

console.log('a '+a);
console.log('b '+b);
console.log('c '+c);*/

document.getElementById('date').innerHTML = '<h4>  Date: ' + newDate + '</h4>';
document.getElementById('temp').innerHTML = '<h4> Temperature: ' + fahrenheit + '&deg; </h4>';
document.getElementById('content').innerHTML = '<h4> Outfit: ' + getFeelings + '</h4>';
document.getElementById('city').innerHTML = '<h4> City: ' + d.name + '</h4>';
//document.getElementById('content').innerHTML = '<h4>  Outfit: ' +allData[0].feeling + '</h4>';
}

const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header
      body: JSON.stringify(data),
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      } catch(error) {
      console.log('error', error);
      }
  }

//postData declared uptop
//inside info from server.js
//Test Example See if can post server and client side
/*postData('/', {answer:42})
postData('/', {answer:92})*/
