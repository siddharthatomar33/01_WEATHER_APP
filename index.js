console.log('hello jee tomar')

const API_key="225e6a742f20dbc82ecfbb710c306fbe";

async function showWeather(){
    let city_name = "goa";

    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}');

    const data = await response.json();

    console.log(" weather data:-> " + data);
}