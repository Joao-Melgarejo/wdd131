const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const windChillElement = document.querySelector("#windchill");

const temperature = 8;
const windSpeed = 12;

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

function calculateWindChill(tempC, speedKmh) {
    return 13.12 + 0.6215 * tempC - 11.37 * Math.pow(speedKmh, 0.16) + 0.3965 * tempC * Math.pow(speedKmh, 0.16);
}

if (temperature <= 10 && windSpeed > 4.8) {
    const windChill = calculateWindChill(temperature, windSpeed);
    windChillElement.textContent = `${windChill.toFixed(1)} °C`;
} else {
    windChillElement.textContent = "N/A";
}