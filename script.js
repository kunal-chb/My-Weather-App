// MY WEATHER APP

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "4f01c0e27cc8fc3e808ca15357a476ed";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            console.log(weatherData);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please Enter a City!");
    }

});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);
    console.log(response);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    return response.json();
}

function displayWeatherInfo(data){

    const {name: city,
           main: {temp, humidity}, 
           weather: [{description, id}],
           wind: {speed, gust}} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const speedDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    cityDisplay.classList.add("cityDisplay");
    card.appendChild(cityDisplay);

    tempDisplay.textContent = `${(temp-273.15).toFixed(1)}°C`;
    tempDisplay.classList.add("tempDisplay");
    card.appendChild(tempDisplay);

    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityDisplay.classList.add("humidityDisplay");
    card.appendChild(humidityDisplay);

    speedDisplay.textContent = `Speed: ${speed} Km/h`;
    speedDisplay.classList.add("speedDisplay");
    card.appendChild(speedDisplay);

    descDisplay.textContent = description;
    descDisplay.classList.add("descDisplay");
    card.appendChild(descDisplay);

    weatherEmoji.textContent = displayEmoji(id);
    weatherEmoji.classList.add("weatherEmoji");
    card.appendChild(weatherEmoji);



}

function displayEmoji(weatherId){

    switch(true){
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        case (weatherId == 800):
            return "☀️";
        case (weatherId >= 700):
            return "🍃";
        case (weatherId >= 600):
            return "❄️";
        case (weatherId >= 500):
            return "🌧️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 200):
            return "⛈️";
        default:
            return "❓";
        
    }
}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

   card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}