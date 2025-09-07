console.log('hello jee tomar')

// const APIkey="225e6a742f20dbc82ecfbb710c306fbe";

async function showWeather(){
    // let cityname = "goa";

    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=goa&appid=225e6a742f20dbc82ecfbb710c306fbe');

    const data = await response.json();

    console.log(" weather data:-> " + data);

    let newPara=document.createElement('p');
    newPara.textContent


}