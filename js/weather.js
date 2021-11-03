const inputCity = document.body.querySelector(".search_input");
const searchButton = document.body.querySelector(".search_button");


async function start(city) {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ade0fb3053d09af11fa65cf8982f5830`;

    let response = await fetch(url);

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа (см. про этот метод ниже)
    const data = await response.json();
    // console.log(json);
    console.log(data.main)
    } else {
    alert("Ошибка HTTP: " + response.status);
    };
};

// start();

searchButton.onclick = () => {
const inputInfo = inputCity.value;
start(inputInfo);
inputCity.value = "";
};
