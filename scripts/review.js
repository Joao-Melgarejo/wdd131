const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const reviewCount = document.querySelector("#reviewCount");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

let count = Number(localStorage.getItem("reviewCount")) || 0;
count++;
localStorage.setItem("reviewCount", count);
reviewCount.textContent = count;