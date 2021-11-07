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
const historyName = [];
let currentNameCity;
let lat;
let lon;
// ----------------------------Card 1-----------------------------------
const calendarDataOne = document.querySelector(".day_one .calendar_data");
const infoTempOne = document.querySelector(".day_one .info_temp");
const infoWindOne = document.querySelector(".day_one .info_wind");
const infoHumidityOne = document.querySelector(".day_one .info_humidity");
const infoUvIndexOne = document.querySelector(".day_one .info_uv_index");
const weatherIconOne = document.querySelector(".day_one .weather_icon");
// ----------------------------Card 2-----------------------------------
const calendarDataTwo = document.querySelector(".day_two .calendar_data");
const infoTempTwo = document.querySelector(".day_two .info_temp");
const infoWindTwo = document.querySelector(".day_two .info_wind");
const infoHumidityTwo = document.querySelector(".day_two .info_humidity");
const infoUvIndexTwo = document.querySelector(".day_two .info_uv_index");
const weatherIconTwo = document.querySelector(".day_two .weather_icon");
// ----------------------------Card 3-----------------------------------
const calendarDataThree = document.querySelector(".day_three .calendar_data");
const infoTempThree = document.querySelector(".day_three .info_temp");
const infoWindThree = document.querySelector(".day_three .info_wind");
const infoHumidityThree = document.querySelector(".day_three .info_humidity");
const infoUvIndexThree = document.querySelector(".day_three .info_uv_index");
const weatherIconThree = document.querySelector(".day_three .weather_icon");
// ----------------------------Card 4-----------------------------------
const calendarDataFour = document.querySelector(".day_four .calendar_data");
const infoTempFour = document.querySelector(".day_four .info_temp");
const infoWindFour = document.querySelector(".day_four .info_wind");
const infoHumidityFour = document.querySelector(".day_four .info_humidity");
const infoUvIndexFour = document.querySelector(".day_four .info_uv_index");
const weatherIconFour = document.querySelector(".day_four .weather_icon");
// ----------------------------Card 5-----------------------------------
const calendarDataFive = document.querySelector(".day_five .calendar_data");
const infoTempFive = document.querySelector(".day_five .info_temp");
const infoWindFive = document.querySelector(".day_five .info_wind");
const infoHumidityFive = document.querySelector(".day_five .info_humidity");
const infoUvIndexFive = document.querySelector(".day_five .info_uv_index");
const weatherIconFive = document.querySelector(".day_five .weather_icon");

async function start(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ade0fb3053d09af11fa65cf8982f5830`;
    currentNameCity = city;
    try {
        let response = await fetch(url);

        if (response.ok) { 
            const data = await response.json();
            lat = data.city.coord.lat;
            lon = data.city.coord.lon;
            const city = data.city;
            const cityNameApi = city.name;

            cityName.innerHTML = cityNameApi;
        } else {
            console.log("Error HTTP: " + response.status);
        };
    } catch(e) {
        console.log(e);
    };
};


async function getUV() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=ade0fb3053d09af11fa65cf8982f5830`;

        let response = await fetch(url);

        if (response.ok) { 
            const data = await response.json();
            window.localStorage.setItem(currentNameCity, JSON.stringify(data));
        } else {
            alert("Error HTTP: " + response.status);
        };
    } catch(e) {
        console.log(e);
    };

    updateData();
};

function updateData() {
    const data = JSON.parse(window.localStorage.getItem(currentNameCity));
    if (data) {
        const currentDayData = data.current;
        const humidity = (currentDayData.humidity) + " " + "💧";
        const temp = Math.floor(currentDayData.temp - 273) + " " + "&#8451";
        const windSpeed = (currentDayData.wind_speed) + " " + "🌬";
        const time = moment().format("MM/DD/YYYY");
        const weather = currentDayData.weather[0];
        const index = (currentDayData.uvi) + " " + "%";
        
        calendarData.innerHTML = time;
        infoTemp.innerHTML = (temp) + "  " + "&#x1F321";
        weatherIcon.removeAttribute('class');
        weatherIcon.classList.add("weather" + weather.icon);
        infoWind.innerHTML = windSpeed;
        infoHumidity.innerHTML = humidity;
        infoUvIndex.innerHTML = index;
        if (currentDayData.uvi <= 2) {
            infoUvIndex.innerHTML = index + " " + "🟢"
        } else if (currentDayData.uvi > 2 && currentDayData.uvi <= 5) {
            infoUvIndex.innerHTML = index + " " + "🟡"
        } else if (currentDayData.uvi > 5 && currentDayData.uvi <= 7) {
            infoUvIndex.innerHTML = index + " " + "🟠"
        } else if (currentDayData.uvi > 7 && currentDayData.uvi <= 10) {
            infoUvIndex.innerHTML = index + " " + "🔴"
        };
        // ----------------------------Card 1-----------------------------------
        const dayOneData = data.daily[0];
        const humidityOne = (dayOneData.humidity) + " " + "💧";
        const tempOne = Math.floor(dayOneData.temp.day - 273) + " " + "&#8451";
        const windSpeedOne = (dayOneData.wind_speed) + " " + "🌬";
        const weatherOne = dayOneData.weather[0];
        const timeOne = moment().add(1, 'days').format("MM/DD/YYYY");
        const indexOne = (dayOneData.uvi) + " " + "%";

        calendarDataOne.innerHTML = timeOne;
        infoTempOne.innerHTML = (tempOne) + "  " + "&#x1F321";
        weatherIconOne.removeAttribute('class');
        weatherIconOne.classList.add("weather" + weatherOne.icon);
        infoWindOne.innerHTML = windSpeedOne;
        infoHumidityOne.innerHTML = humidityOne;
        infoUvIndexOne.innerHTML = indexOne;
        if (dayOneData.uvi <= 2) {
            infoUvIndexOne.innerHTML = index + " " + "🟢"
        } else if (dayOneData.uvi > 2 && dayOneData.uvi <= 5) {
            infoUvIndexOnex.innerHTML = index + " " + "🟡"
        } else if (dayOneData.uvi > 5 && dayOneData.uvi <= 7) {
            infoUvIndexOne.innerHTML = index + " " + "🟠"
        } else if (dayOneData.uvi > 7 && dayOneData.uvi <= 10) {
            infoUvIndexOne.innerHTML = index + " " + "🔴"
        };
        // ----------------------------Card 2-----------------------------------
        const dayTwoData = data.daily[1];
        const humidityTwo = (dayTwoData.humidity) + " " + "💧";
        const tempTwo = Math.floor(dayTwoData.temp.day - 273) + " " + "&#8451";
        const windSpeedTwo = (dayTwoData.wind_speed) + " " + "🌬";
        const weatherTwo = dayTwoData.weather[0];
        const timeTwo = moment().add(2, 'days').format("MM/DD/YYYY");
        const indexTwo = (dayTwoData.uvi) + " " + "%";

        calendarDataTwo.innerHTML = timeTwo;
        infoTempTwo.innerHTML = (tempTwo)  + "  " + "&#x1F321";
        weatherIconTwo.removeAttribute('class');
        weatherIconTwo.classList.add("weather" + weatherTwo.icon);
        infoWindTwo.innerHTML = windSpeedTwo;
        infoHumidityTwo.innerHTML = humidityTwo;
        infoUvIndexTwo.innerHTML = indexTwo;
        if (dayTwoData.uvi <= 2) {
            infoUvIndexTwo.innerHTML = index + " " + "🟢"
        } else if (dayTwoData.uvi > 2 && dayTwoData.uvi <= 5) {
            infoUvIndexTwo.innerHTML = index + " " + "🟡"
        } else if (dayTwoData.uvi > 5 && dayTwoData.uvi <= 7) {
            infoUvIndexTwo.innerHTML = index + " " + "🟠"
        } else if (dayTwoData.uvi > 7 && dayTwoData.uvi <= 10) {
            infoUvIndexTwo.innerHTML = index + " " + "🔴"
        };
        // ----------------------------Card 3-----------------------------------
        const dayThreeData = data.daily[2];
        const humidityThree = (dayThreeData.humidity) + " " + "💧";
        const tempThree = Math.floor(dayThreeData.temp.day - 273) + " " + "&#8451";
        const windSpeedThree = (dayThreeData.wind_speed) + " " + "🌬";
        const weatherThree = dayThreeData.weather[0];
        const timeThree = moment().add(3, 'days').format("MM/DD/YYYY");
        const indexThree = (dayThreeData.uvi) + " " + "%";

        calendarDataThree.innerHTML = timeThree;
        infoTempThree.innerHTML = (tempThree) + "  " + "&#x1F321";
        weatherIconThree.removeAttribute('class');
        weatherIconThree.classList.add("weather" + weatherThree.icon);
        infoWindThree.innerHTML = windSpeedThree;
        infoHumidityThree.innerHTML = humidityThree;
        infoUvIndexThree.innerHTML = indexThree;
        if (dayThreeData.uvi <= 2) {
            infoUvIndexThree.innerHTML = index + " " + "🟢"
        } else if (dayThreeData.uvi > 2 && dayThreeData.uvi <= 5) {
            infoUvIndexThree.innerHTML = index + " " + "🟡"
        } else if (dayThreeData.uvi > 5 && dayThreeData.uvi <= 7) {
            infoUvIndexThree.innerHTML = index + " " + "🟠"
        } else if (dayThreeData.uvi > 7 && dayThreeData.uvi <= 10) {
            infoUvIndexThree.innerHTML = index + " " + "🔴"
        };
        // ----------------------------Card 4-----------------------------------
        const dayFourData = data.daily[3];
        const humidityFour = (dayFourData.humidity) + " " + "💧";
        const tempFour = Math.floor(dayFourData.temp.day - 273) + " " + "&#8451";
        const windSpeedFour = (dayFourData.wind_speed) + " " + "🌬";
        const weatherFour = dayFourData.weather[0];
        const timeFour = moment().add(4, 'days').format("MM/DD/YYYY");
        const indexFour = (dayFourData.uvi) + " " + "%";

        calendarDataFour.innerHTML = timeFour;
        infoTempFour.innerHTML = (tempFour) + "  " + "&#x1F321";
        weatherIconFour.removeAttribute('class');
        weatherIconFour.classList.add("weather" + weatherFour.icon);
        infoWindFour.innerHTML = windSpeedFour;
        infoHumidityFour.innerHTML = humidityFour;
        infoUvIndexFour.innerHTML = indexFour;
        if (dayFourData.uvi <= 2) {
            infoUvIndexFour.innerHTML = index + " " + "🟢"
        } else if (dayFourData.uvi > 2 && dayFourData.uvi <= 5) {
            infoUvIndexFour.innerHTML = index + " " + "🟡"
        } else if (dayFourData.uvi > 5 && dayFourData.uvi <= 7) {
            infoUvIndexFour.innerHTML = index + " " + "🟠"
        } else if (dayFourData.uvi > 7 && dayFourData.uvi <= 10) {
            infoUvIndexFour.innerHTML = index + " " + "🔴"
        };
        // ----------------------------Card 5-----------------------------------
        const dayFiveData = data.daily[4];
        const humidityFive = (dayFiveData.humidity) + " " + "💧";
        const tempFive = Math.floor(dayFiveData.temp.day - 273) + " " + "&#8451";
        const windSpeedFive = (dayFiveData.wind_speed) + " " + "🌬";
        const weatherFive = dayFiveData.weather[0];
        const timeFive = moment().add(5, 'days').format("MM/DD/YYYY");
        const indexFive = (dayFiveData.uvi) + " " + "%";

        calendarDataFive.innerHTML = timeFive;
        infoTempFive.innerHTML = (tempFive) + "  " + "&#x1F321";
        weatherIconFive.removeAttribute('class');
        weatherIconFive.classList.add("weather" + weatherFive.icon);
        infoWindFive.innerHTML = windSpeedFive;
        infoHumidityFive.innerHTML = humidityFive;
        infoUvIndexFive.innerHTML = indexFive;
        if (dayFiveData.uvi <= 2) {
            infoUvIndexFive.innerHTML = index + " " + "🟢"
        } else if (dayFiveData.uvi > 2 && dayFiveData.uvi <= 5) {
            infoUvIndexFive.innerHTML = index + " " + "🟡"
        } else if (dayFiveData.uvi > 5 && dayFiveData.uvi <= 7) {
            infoUvIndexFive.innerHTML = index + " " + "🟠"
        } else if (dayFiveData.uvi > 7 && dayFiveData.uvi <= 10) {
            infoUvIndexFive.innerHTML = index + " " + "🔴"
        };
    } else {
        alert("Error: City Not Found")
    };
};

searchButton.onclick = async () => {
    const inputInfo = inputCity.value;
    if (!inputInfo.length) {
        return;
    };
    if (historyName.indexOf(inputInfo) != -1) {
        await start(inputInfo);
        await getUV();
        inputCity.value = "";
        return;
    };
    const elementDiv = document.createElement("div");
    elementDiv.className = "citi_history_line";
    const text = document.createElement("p");
    text.className = "city_history_name";

    text.innerHTML = inputInfo;
    historyName.push(inputInfo);
    elementDiv.append(text);
    elementDiv.onclick = async (e) => historySearch(e);
    searchCityHistory.insertAdjacentElement("afterbegin", elementDiv);
    await start(inputInfo);
    await getUV();
    inputCity.value = "";
};

async function historySearch (e) {
    await start(e.target.innerHTML);
    await getUV();
};


