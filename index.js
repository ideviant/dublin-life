// Get current time
const now = dayjs().format();
dayjs.extend(dayjs_plugin_utc);
dayjs.extend(dayjs_plugin_timezone);

const beijingDate = dayjs().tz("Asia/Shanghai").format("ddd, DD MMM YYYY");
const beijingTime = dayjs().tz("Asia/Shanghai").format("HH:mm");
const beijingHour = dayjs().tz("Asia/Shanghai").format("HH");

const dublinDate = dayjs().tz("Europe/Dublin").format("ddd, DD MMM YYYY");
const dublinTime = dayjs().tz("Europe/Dublin").format("HH:mm");
const dublinHour = dayjs().tz("Europe/Dublin").format("HH");

// Show date and time
document.getElementById("beijing_location_date").innerHTML = beijingDate;
document.getElementById("dublin_location_date").innerHTML = dublinDate;

document.getElementById("beijing_location_time").innerHTML = beijingTime;
document.getElementById("dublin_location_time").innerHTML = dublinTime;

// Set face status
function isWorkingTime(time) {
    return (parseInt(time) >= 9) & (parseInt(time) < 17);
}

function setFace(locationHour, faceLocation) {
    if (isWorkingTime(locationHour)) {
        document.getElementById(faceLocation).src = "images/face-smile.svg";
    } else {
        document.getElementById(faceLocation).src = "images/face-frown.svg";
    }
}

setFace(beijingHour, "face-beijing");
setFace(dublinHour, "face-dublin");

//Slider
const input = document.getElementById("tzconv_range");
const value = document.getElementById("value");
value.textContent = input.value;
input.addEventListener("input", (event) => {
    value.textContent = event.target.value;
});
