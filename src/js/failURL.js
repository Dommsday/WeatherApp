export function failUrl(){

    document.body.style.backgroundImage = "url('src/images/errorURL.jpg')";

    const errorCityContainer = document.getElementById("errorCityContainer");
    const titleError = document.getElementById("titleError");
    const weatherContainer = document.getElementById("weatherContainer");

    weatherContainer.style.visibility = "hidden";
    titleError.textContent = "Il semblerait qu'une erreur soit survenue.";
    errorCityContainer.style.visibility="visible";
}