// WEATHER APP

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const body = document.body;
const apiKey = "9b9c336ba9a48ed62d7793fa192ee7c7";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.log(error);
            displayError(error);
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp - 273.15) * 9 / 5 + 32).toFixed(1)}°F`;
    weatherEmoji.textContent = getWeatherEmoji(id);
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    weatherEmoji.classList.add("weatherEmoji");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(weatherEmoji);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);

    setBackgroundImg(id);
}

function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 804):
            return "⛅️";
        case (weatherId === 804):
            return "☁️";
        default:
            return "❓";
    }
}

function getWeatherBackground(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "https://c4.wallpaperflare.com/wallpaper/972/63/734/clouds-lightning-nature-rain-wallpaper-preview.jpg";
        case (weatherId >= 300 && weatherId < 400):
            return "https://c0.wallpaperflare.com/preview/765/195/605/grey-clouds.jpg"; 
        case (weatherId >= 500 && weatherId < 600):
            return "https://c0.wallpaperflare.com/preview/765/195/605/grey-clouds.jpg"; 
        case (weatherId >= 600 && weatherId < 700):
            return "https://static.vecteezy.com/system/resources/previews/023/803/514/non_2x/christmas-snow-falling-snowflakes-on-blue-background-snowfall-illustration-vector.jpg"; 
        case (weatherId >= 700 && weatherId < 800):
            return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScey5xuB2q-0Vv_iw7qPCkdTnFPd7aow5SZCrM9SyCdisKNzBJWsocxH3L2SGls9nZt9s&usqp=CAU";
        case (weatherId === 800):
            return "https://wallpapers.com/images/hd/sunny-sky-view-frrv352r9lj73oxb.jpg"; 
        case (weatherId >= 801 && weatherId < 804):
            return "https://wallpapers.com/images/hd/sunny-sky-view-frrv352r9lj73oxb.jpg";
        case (weatherId === 804):
            return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScey5xuB2q-0Vv_iw7qPCkdTnFPd7aow5SZCrM9SyCdisKNzBJWsocxH3L2SGls9nZt9s&usqp=CAU";
        default:
            return "https://wallpapers.com/images/hd/sunny-sky-view-frrv352r9lj73oxb.jpg"; 
    }
}

function setBackgroundImg(weatherId) {
    body.style.backgroundImage = `url(${getWeatherBackground(weatherId)})`;
    body.style.backgroundSize = "cover";

}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
