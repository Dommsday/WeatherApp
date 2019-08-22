import {init} from './main.js';
import { failUrl } from './failURL.js';

export function geolocation(){
    window.addEventListener("load", ()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position=>{
                const long = position.coords.longitude;
                const lat = position.coords.latitude;
                const units = "metric";

                fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=09290ade0b004a4b2b1d695dec899458&units=${units}&lang=fr`)
                .then(response =>{

                    if(response.ok){
                        weatherContainer.style.visibility = "visible";
                        return response.json();
                    }
                    
                })
                .catch(error =>{
                    console.log(error);
                    failUrl();
                })
                .then(data=>{
                    cityposition(data);
                })
            });
        }
    });
}

export function cityposition(results){
    init(results);
}

