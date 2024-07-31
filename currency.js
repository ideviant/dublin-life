// URL of the JSON file
const url =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/cny.json";

var cnyValue = 1000.0;
var cnyToEur = 1.0;

// Function to fetch JSON data
async function fetchJsonData() {
    console.log("fetchJsonData:" + dayjs().format());
    try {
        const response = await fetch(url);
        if (!response.ok) {
            document.getElementById("weather-dublin-icon").src =
                "images/weather/svg/rainbow.svg";
        }
        var data = await response.json();
        console.log(data);
        cnyToEur = data["cny"]["eur"];
        document.getElementById("currency-eur-value").value = (
            data["cny"]["eur"] * cnyValue
        ).toFixed(2);
    } catch (error) {
        document.getElementById("weather-dublin-icon").src =
            "images/weather/svg/rainbow.svg";
        console.error(
            "There has been a problem with your fetch operation:",
            error,
        );
    }
}

// Call the function to fetch and log JSON data
fetchJsonData();

// Update every midnight
// To be tested
function refreshAtMidnight() {
    const now = new Date();
    const nextMidnight = new Date();
    nextMidnight.setHours(24, 0, 0, 0); // Set to next midnight
    const timeUntilMidnight = nextMidnight - now; // Calculate the time difference in milliseconds

    setTimeout(() => {
        fetchJsonData(); // Refresh the page
        refreshAtMidnight(); // Reset the timer for the next midnight
    }, timeUntilMidnight);
}

refreshAtMidnight();

// auto adjust input Width and update EUR/CNY value
function adjustCNYWidth(input) {
    const hidden = document.getElementById("hidden-cny");
    hidden.style.fontSize = getComputedStyle(input).fontSize;
    hidden.style.fontFamily = getComputedStyle(input).fontFamily;
    hidden.style.fontWeight = getComputedStyle(input).fontWeight;
    hidden.textContent = input.value || input.placeholder;
    const width = hidden.offsetWidth;
    console.log("adjustCNYWidth:" + width);
    input.style.width = `${width}px`;

    //update EUR value
    document.getElementById("currency-eur-value").value = (
        cnyToEur * document.getElementById("currency-cny-value").value
    ).toFixed(2);
    const oppHidden = document.getElementById("hidden-eur");
    oppHidden.style.fontSize = getComputedStyle(input).fontSize;
    oppHidden.style.fontFamily = getComputedStyle(input).fontFamily;
    oppHidden.style.fontWeight = getComputedStyle(input).fontWeight;

    oppHidden.textContent = input.value || input.placeholder;
    const oppWidth = oppHidden.offsetWidth;
    console.log("adjustEURWidth:" + oppWidth);
    document.getElementById("currency-eur-value").style.width = `${oppWidth}px`;
}

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("currency-cny-value");
    adjustEURWidth(input);
});

function adjustEURWidth(input) {
    const hidden = document.getElementById("hidden-eur");
    hidden.style.fontSize = getComputedStyle(input).fontSize;
    hidden.style.fontFamily = getComputedStyle(input).fontFamily;
    hidden.style.fontWeight = getComputedStyle(input).fontWeight;

    hidden.textContent = input.value || input.placeholder;
    const width = hidden.offsetWidth;
    console.log("adjustEURWidth:" + width);
    input.style.width = `${width}px`;

    //update CNY value
    document.getElementById("currency-cny-value").value = (
        document.getElementById("currency-eur-value").value / cnyToEur
    ).toFixed(1);
    const oppHidden = document.getElementById("hidden-cny");
    oppHidden.style.fontSize = getComputedStyle(input).fontSize;
    oppHidden.style.fontFamily = getComputedStyle(input).fontFamily;
    oppHidden.style.fontWeight = getComputedStyle(input).fontWeight;

    oppHidden.textContent = input.value || input.placeholder;
    const oppWidth = oppHidden.offsetWidth;
    console.log("adjustCNYWidth:" + oppWidth);
    document.getElementById("currency-eur-value").style.width = `${oppWidth}px`;
}

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("currency-eur-value");
    adjustEURWidth(input);
});
