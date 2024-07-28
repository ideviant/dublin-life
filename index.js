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
function isWorkTime(time) {
    return (parseInt(time) >= 10) & (parseInt(time) < 17);
}

function isSleepTime(time) {
    return (parseInt(time) >= 0) & (parseInt(time) < 9);
}

function isFreeTime(time) {
    return (parseInt(time) >= 17) & (parseInt(time) < 24);
}

function setFace(locationHour, faceLocation) {
    if (isFreeTime(locationHour)) {
        document.getElementById(faceLocation).src = "images/face-smile.svg";
    } else if (isSleepTime(locationHour)) {
        document.getElementById(faceLocation).src = "images/face-frown.svg";
    } else {
        document.getElementById(faceLocation).src = "images/face-meh.svg";
    }
}

setFace(beijingHour, "face-beijing");
setFace(dublinHour, "face-dublin");

//Set slider value
document.getElementById("tzconv_range").value = dublinHour;

//Set slider range color
for (let hour = 0; hour < 24; hour++) {
    if (isFreeTime(hour) & isFreeTime(hour + 7)) {
        document.getElementById(`range-${hour}`).style.backgroundColor =
            "#bef264";
    } else if (isSleepTime(hour) | isSleepTime(hour + 7)) {
        document.getElementById(`range-${hour}`).style.backgroundColor =
            "#fda4af";
    } else {
        document.getElementById(`range-${hour}`).style.backgroundColor =
            "#fde047";
    }
}

//Slider action
const input = document.getElementById("tzconv_range");
const value = document.getElementById("value");
input.addEventListener("input", (event) => {
    var selectDublinHour;
    var selectBeijingHour;
    selectDublinHour = event.target.value;
    if (event.target.value < 10) {
        document.getElementById("dublin_location_time").innerHTML =
            "0" + event.target.value + ":00";
    } else {
        document.getElementById("dublin_location_time").innerHTML =
            event.target.value + ":00";
    }
    setFace(selectDublinHour, "face-dublin");

    if (event.target.value < 3) {
        document.getElementById("beijing_location_time").innerHTML =
            "0" + parseInt(parseInt(event.target.value) + 7) + ":00";
        selectBeijingHour = parseInt(parseInt(event.target.value) + 7);
    } else if ((event.target.value >= 3) & (event.target.value <= 16)) {
        document.getElementById("beijing_location_time").innerHTML =
            parseInt(parseInt(event.target.value) + 7) + ":00";
        selectBeijingHour = parseInt(parseInt(event.target.value) + 7);
    } else {
        document.getElementById("beijing_location_time").innerHTML =
            "0" + parseInt(parseInt(event.target.value) - 17) + ":00";
        selectBeijingHour = parseInt(parseInt(event.target.value) - 17);
    }
    setFace(selectBeijingHour, "face-beijing");
});
