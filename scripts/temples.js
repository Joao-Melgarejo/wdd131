const currentYear = document.querySelector('#currentyear');
const lastModified = document.querySelector('#lastModified');
const menuButton = document.querySelector('#menu-button');
const navigation = document.querySelector('#nav-menu');

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;

menuButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    menuButton.classList.toggle('open');
});