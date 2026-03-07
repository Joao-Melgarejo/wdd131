const yearSpan = document.getElementById("currentyear");
const lastModifiedParagraph = document.getElementById("lastModified");

const today = new Date();

yearSpan.textContent = today.getFullYear();
lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;