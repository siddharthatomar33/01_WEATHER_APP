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
currentTab.classList.add("ccurrent-tab")