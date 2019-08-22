import {geolocation} from './geolocation.js';
import { noCity } from './noCity.js';
import { failUrl } from './failURL.js';


const units = "metric";
let searchMethod;
const searchButton = document.getElementById("searchButton");
searchButton.disabled = true;

//PART GEOLOCATION
geolocation();

(function begin(){
    let countries = document.getElementById("countries");

    countries.addEventListener("change", e =>{
        if(countries.value !== "NONE") 
            searchButton.disabled = false;
        else
            searchButton.disabled = true;
            
    });
}());

document.querySelector("form").addEventListener("submit", e=>{
    e.preventDefault();  
    const searchInput = document.getElementById("searchInput").value;
    const countries = document.getElementById("countries").value;
    
    if(searchInput && countries) searchWeather(searchInput, countries);
});

//PART CITY OR ZIPCODE
function getSearchMethod(seachTerm){
    if((seachTerm.length === 5) && `${Number.parseInt(seachTerm)} ` === seachTerm){
        searchMethod = "zip";
    }else{
        searchMethod = "q";
    }
}

function searchWeather(weatherParam, countryCode){
   
        getSearchMethod(weatherParam);

        fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${weatherParam},${countryCode}&appid=09290ade0b004a4b2b1d695dec899458&units=${units}&lang=fr`)
        .then(response =>{
            
            if(response.ok){

                const weatherContainer = document.getElementById("weatherContainer");
                const errorCityContainer = document.getElementById("errorCityContainer");
                weatherContainer.style.visibility = "visible";
                errorCityContainer.style.visibility = "hidden";

                return response.json(); 

            }else{
                noCity();
            }
        })
        .catch(error =>{
            console.error(error.message);
            failUrl();
        })
        .then(data =>{
            init(data);
        })
}

export function init(results){

    switch(results.weather[0].main){
        case 'Thunderstorm':
            document.body.style.backgroundImage = "url('src/images/storm.jpg')";
            break;

        case 'Drizzle':
            document.body.style.backgroundImage = "url('src/images/rain.jpg')";
            break;

        case 'Rain':
            document.body.style.backgroundImage = "url('src/images/rain.jpg')";
            break;

        case 'Snow':
            document.body.style.backgroundImage = "url('src/images/snow.jpg')";
            break;

        case 'Fog':
        case 'Mist':
            document.body.style.backgroundImage = "url('src/images/fog.jpg')";
            break;

        case 'Clear':
            document.body.style.backgroundImage = "url('src/images/clear.jpg')";
            break;

        case 'Clouds':
            document.body.style.backgroundImage = "url('src/images/clouds.jpg')";
            break;

        case 'Tornado':
            document.body.style.backgroundImage = "url('src/images/tornado.jpg')";
            break;

        default:
                document.body.style.backgroundImage = "url('src/images/default.jpg')";
    }

    const weatherDescriptionHeader = document.getElementById("weatherDescriptionHeader");
    const temperatureElement = document.getElementById("temperature");
    const humidityElement = document.getElementById("humidity");
    const windSpeedElement = document.getElementById("windSpeed");
    const cityHeader = document.getElementById("cityHeader");
    const weatherIcon = document.getElementById("documentIconImg"); 
    let textDescription = results.weather[0].description;
    
    weatherIcon.src = `http://openweathermap.org/img/wn/${results.weather[0].icon}.png`;
    weatherIcon.alt = textDescription;

    weatherDescriptionHeader.textContent = textDescription.charAt(0).toUpperCase()+textDescription.slice(1);
    temperatureElement.textContent = `${Math.floor(results.main.temp)} ºC`;
    humidityElement.textContent = `Humidité: ${results.main.humidity}%`;
    windSpeedElement.textContent = `Vent: ${Math.floor(results.wind.speed)} m/s`;
    cityHeader.textContent = results.name;
    
    
}




