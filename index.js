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
//
getfromSessionStorage();

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
            //in user weathertab,weather display krna hai, check local storage 
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
        //agar coordinates nahi mile,grant access container visible krdo
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
    const data=await response.json();

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

    cityName.innerText=weatherInfo?.name;
    countryIcon.src=`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`; 
    desc.innerText=weatherInfo?.weather?.[0]?.description;
    weatherIcon.src=`http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText=weatherInfo?.main?.temp;
    windSpeed.innerText=weatherInfo?.wind?.speed;
    humidity.innerText=weatherInfo?.main?.humidity;
    cloudiness.innerText=weatherInfo?.cloud?.all;

}

function getLocation(){
    //if browser supports geolocation api
    if(navigator.geolocation){
        //current position or coordinates dega
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{//if browser does not support geolocation api
        alert("Geolocation is not supported by this browser.");
        //alert-show an alert for no geolocation support available

    }
}

function showPosition(position){
    const userCoordinates={
        lat:position.coords.latitude,
        lon:position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

//event listener on GRANT ACCESS BUTTON
const grantAccessButton=document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);//current position dega

const searchInput=document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();//defalt ko hatadeta hai
    let cityName=searchInput.value;
    if(cityName==="")
        return;
    else
        fetchSearchWeatherInfo(cityName);
})
async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try{
        const response=await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data=await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add('active');
        renderWeatherInfo(data);

    }
    catch(err){
        //data
    }
}