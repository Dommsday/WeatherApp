export function noCity(){

    document.body.style.backgroundImage = "url('src/images/noCity.jpg')";

    const errorCityContainer = document.getElementById("errorCityContainer");
    const titleError = document.getElementById("titleError");
    const weatherContainer = document.getElementById("weatherContainer");

    weatherContainer.style.visibility = "hidden";
    titleError.textContent = "Je ne connais pas cette ville";
    errorCityContainer.style.visibility="visible";
}