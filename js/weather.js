const inputCity = document.body.querySelector(".search_input");
const searchButton = document.body.querySelector(".search_button");
const searchCityHistory = document.body.querySelector(".search_city_history");
const cityName = document.querySelector(".city_name");
const calendarData = document.querySelector(".calendar_data");
const infoTemp = document.querySelector(".info_temp");
const infoWind = document.querySelector(".info_wind");
const infoHumidity = document.querySelector(".info_humidity");
const infoUvIndex = document.querySelector(".info_uv_index");
const weatherIcon = document.querySelector(".weather_icon");

async function start(city) {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ade0fb3053d09af11fa65cf8982f5830`;

    let response = await fetch(url);

    if (response.ok) { 
        const data = await response.json();
        const currentDayData = data.list[0].main;
        const humidity = currentDayData.humidity;
        const temp = Math.floor(currentDayData.temp - 273) + " " + "&#8451";
        const windObj = data.list[0].wind;
        const windSpeed = windObj.speed;
        const city = data.city;
        const cityNameApi = city.name;
        const time = moment().format("MM/DD/YYYY");
        const weather = data.list[0].weather[0];

        cityName.innerHTML = cityNameApi;
        calendarData.innerHTML = time;
        infoTemp.innerHTML = temp;
        weatherIcon.classList.add("weather" + weather.icon);
        infoWind.innerHTML = windSpeed;
    } else {
        alert("Ошибка HTTP: " + response.status);
    };
};

searchButton.onclick = () => {
    const inputInfo = inputCity.value;
    if (!inputInfo.length) {
        return;
    };
    const elementDiv = document.createElement("div");
    elementDiv.className = "citi_history_line";
    const text = document.createElement("p");
    text.className = "city_history_name";

    text.innerHTML = inputInfo;
    elementDiv.append(text);
    elementDiv.onclick = (e) => historySearch(e);
    searchCityHistory.insertAdjacentElement("afterbegin", elementDiv);
    start(inputInfo);
    inputCity.value = "";
};

function historySearch (e) {
    start(e.target.innerHTML);
};

// $(searchButton).click(function(event){
//     // const parent = event.target.parentElement.parentElement;
//     // const hour = parent.children[0].firstChild.innerHTML;
//     // const message = parent.children[1].firstChild.value;
//     const storage = window.localStorage;
  
//     storage.setItem();
  
//     console.log(event);
//   });