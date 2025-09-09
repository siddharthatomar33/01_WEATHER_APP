const userTab=document.querySelector("[data-userWeather]");
const searchTab=document.querySelector("[data-searchWeather]");
const userContainer=document.querySelector(".weather-container");
const grantAccessContainer=document.querySelector(".grant-location-container");
const searchForm=document.querySelector("[data-searchForm]");
const loadingScreen=document.querySelector(".loading-container");
const userInfoContainer=document.querySelector(".user-info-container");


//initail variables_________________________________________________
let currentTab=userTab;// we have to make a current tab which is the user tab
const API_KEY="225e6a742f20dbc82ecfbb710c306fbe";

currentTab.classList.add("current-tab");

//function for switching one tab to other
function switchTab(clickedTab){

    if(clickedTab!=currentTab){

        currentTab.classList.remove("current-tab");
        currentTab=clickedTab;    //pasting properties to current of clicked tab
        currentTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
            //kya search form wala form visible hai? then make it visible
            userInfoContainer.classList.remove("active");
            grantAccessContainerclasslist.remove("active");
            searchForm.classList.add("active");
        }
        else{
            //pehele search wale tab pr thA, aab user weather prr hu
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //in user weather tab,weather display krna hai, check local storage 
            getfromSessionStorage();
        }
    }
}

//function jo user tab ko handle kare
userTab.addEventListener("click", ()=>{
    switchTab(userTab);
});

//function jo search tab ko handle kare
searchTab.addEventListener("click", ()=>{
    switchTab(searchTab);
});

//check for coordinates in session storage
function getfromSessionStorage(){
    const localCoordinates=sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){  //not localCoordinates
        //agar coordinates nahi mile
        grantAccessContainer.classList.add("active");
    }
    else{
        const coordinates=JSON.parse(localCoordinates);//json parse krke object bana rhe
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){
    const {lat,lon}= coordinates;
    //make grant container invisible
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");

//api call
try{
    const response= await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data=response.json();

    loadingScreen.classList.remove("active"); 
    userInfoContainer.classList.add("active");
    renderWeatherInfo(data);
}
catch(err){
    loadingScreen.classList.remove("active");
}

}

function renderWeatherInfo(weatherInfo){

    //firstly we have to fetch the elements
    const cityName=document.querySelector("[data-cityName]");
    const countryIcon=document.querySelector("[data-countryIcon]");
    const desc=document.querySelector("[data-weatherDesc]");
    const weatherIcon=document.querySelector("[data-weatherIcon]");
    const temp=document.querySelector("[data-temp]");
    const windSpeed=document.querySelector("[data-windSpeed]");
    const humidity=document.querySelector("[data-humidity]");
    const cloudiness=document.querySelector("[data-cloudiness]");

    //fetch values from weatherInfo object and put it in UI elements
    

}