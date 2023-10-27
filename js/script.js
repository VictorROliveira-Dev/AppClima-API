// Variáveis de URL:
const apiKey = "87dd19ec6964c29244aee0a5cc0a50e7";
const apiCountryURL = "https://flagsapi.com/";
const apiUnsplashURL = "https://source.unsplash.com/1600x900/?";
// Variáveis de seleção de inputs:
const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search");
// Variáveis de seleção de elementos:
const cityElement = document.querySelector("#city");
const temperatureElement = document.querySelector("#temperature span");
const descriptionElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");
const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

// Funções:
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const response = await fetch(apiWeatherURL);
    const data = await response.json();

    toggleLoader();

    return data;
};

const showWeatherData = async (city) => {
    hideInformation();

    const data = await getWeatherData(city);

    if (data.cod === "404") {
        showErrorMessage();
        return;
    }

    cityElement.innerText = data.name;
    temperatureElement.innerText = parseInt(data.main.temp);
    descriptionElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", apiCountryURL + data.sys.country + "/shiny/64.png");
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}KM/H`;

    document.body.style.backgroundImage = `url("${apiUnsplashURL + city}")`;

    weatherContainer.classList.remove("hide");
};

/* Tratamento de erros */
const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
    errorMessageContainer.classList.add("hide");
    weatherContainer.classList.add("hide");
};

// Loader
const toggleLoader = () => {
    loader.classList.toggle("hide");
};


// Eventos:
searchButton.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
})

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city);
    }
})