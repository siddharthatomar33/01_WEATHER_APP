const userTab=document.querySelector("[data-userWeather]");
const searchTab=document.querySelector("[data-searchWeather]");
const userContainer=document.querySelector(".weather-container");
const grantAccessContainer=document.querySelector(".grant-location-container");
const searchForm=document.querySelector("[data-searchForm]");
const loadingScreen=document.querySelector(".loading-container");
const userInfoContainer=document.querySelector(".user-info-container");


//initail variables_________________________________________________
let oldTabTab=userTab;// we have to make a current tab which is the user tab
const API_KEY="225e6a742f20dbc82ecfbb710c306fbe";

oldTab.classList.add("current-tab");

//function for switching one tab to other
function switchTab(newTab){
    if(newTab!=oldTab){
        oldTab.classList.remove("current-tab");
        oldTab=newTab;    //pasting properties to current of clicked tab
        oldTab.classList.add("current-tab");

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
            //
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