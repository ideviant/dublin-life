function dayOrNight(dt, sunrise, sunset) {
    if ((dt >= sunrise) & (dt <= sunset)) {
        return "d";
    } else {
        return "n";
    }
}

// Function to fetch JSON data
async function fetchJsonData(city) {
    // URL of the JSON file
    // https://home.openweathermap.org/api_keys
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a3fb568687b51f553dc46b63ffc4f635&units=metric`;
    console.log("fetchWeatherData:" + dayjs().format());
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            document.getElementById("weather-dublin-icon").src =
                "images/weather/svg/rainbow.svg";
        }
        var data = await response.json();
        console.log(data);
        condition = data["weather"][0]["id"];
        temp = data["main"]["temp"];
        dt = data["dt"];
        sunrise = data["sys"]["sunrise"];
        sunset = data["sys"]["sunset"];
        dyaNight = dayOrNight(dt, sunrise, sunset);

        return [condition, temp, dyaNight];
    } catch (error) {
        document.getElementById("weather-dublin-icon").src =
            "images/weather/svg/rainbow.svg";
        console.error(
            "There has been a problem with your fetch operation:",
            error,
        );
    }
}

function updateData() {
    console.log("updateWeatherData:" + dayjs().format());

    fetchJsonData("Suzhou").then(([SuzhouCondition, SuzhouTemp, dyaNight]) => {
        document.getElementById("weather-beijing-temp").innerHTML =
            SuzhouTemp + "°";
        if (SuzhouCondition > 800) {
            dyaNight = "x" + dyaNight;
        }

        document.getElementById("weather-beijing-icon").src =
            "images/weather/svg/" +
            SuzhouCondition.toString().slice(0, 2) +
            dyaNight +
            ".svg";
    });

    fetchJsonData("Dublin").then(([dublinCondition, dublinTemp, dyaNight]) => {
        document.getElementById("weather-dublin-temp").innerHTML =
            dublinTemp + "°";
        document.getElementById("weather-dublin-icon").src =
            "images/weather/svg/" +
            dublinCondition.toString().slice(0, 2) +
            dyaNight +
            ".svg";
    });
}

updateData();
setInterval(() => {
    updateData();
}, 3600000);
