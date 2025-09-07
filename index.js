console.log('hello jee tomar')

// const APIkey="225e6a742f20dbc82ecfbb710c306fbe";

function renderWeatherInfo(data){
    let newPara=document.createElement('p');
    newPara.textContent='${data?.main?.temp.toFixed(2)} C' 
    
    document.body.appendChild(newPara);
}

async function fetchWeatherDetails(){
    try{
    // let cityname = "goa";

    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=goa&appid=225e6a742f20dbc82ecfbb710c306fbe');
    const data = await response.json();

    console.log(" weather data:-> ",data);

    renderWeatherInfo(data);
    }
    catch(err){
        //handle the error
        // console.log("error is:-> ",err);
    }
}


async function getCustomWeatherDetails() {
    try{
    let latitude=15.6333;
    let longitude=18.3333;
    
    let result=await fetch('https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon=({longitude}&appid=225e6a742f20dbc82ecfbb710c306fbe');
    let data= await result.json();
    console.log(data);
    }
    catch(err){
        console.log("errrrror is:-> ",err);
    }
}