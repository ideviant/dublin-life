// URL of the JSON file
const url =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/cny.json";

// Function to fetch JSON data
async function fetchJsonData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                "Network response was not ok " + response.statusText,
            );
        }
        const data = await response.json();
        console.log(data);
        document.getElementById("currency-eur-value").innerHTML = (
            data["cny"]["eur"] *
            document.getElementById("currency-cny-value").innerHTML()
        ).toFixed(2);
    } catch (error) {
        console.error(
            "There has been a problem with your fetch operation:",
            error,
        );
    }
}

// Call the function to fetch and log JSON data
fetchJsonData();
