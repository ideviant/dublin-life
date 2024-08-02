// Holiday
const year = dayjs().year();
let country = "IE";
let day = dayjs().format("YYYY-MM-DD");
let data = [];

// Function to fetch JSON data
async function fetchJsonData(year, country) {
    const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.log("response:", response);
        }
        data = await response.json();
        return data;
    } catch (error) {
        console.error(
            "There has been a problem with your fetch operation:",
            error,
        );
    }
}

function isHoliday(data) {
    var holiday;
    for (i = 0; i < data.length; i++) {
        let forecast = dayjs(data[i]["date"]).diff(day, "day");
        if (forecast >= 0) {
            holiday = data[i];
            break;
        }
    }
    return holiday;
}

fetchJsonData(year, country).then((data) => {
    let holiday = isHoliday(data);
    document.getElementById("holiday-name").innerHTML = holiday["name"];
    document.getElementById("holiday-date").innerHTML = holiday["date"];
});
