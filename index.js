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
