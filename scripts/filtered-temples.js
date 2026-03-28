const currentYear = document.querySelector('#currentyear');
const lastModified = document.querySelector('#lastModified');
const menuButton = document.querySelector('#menu-button');
const navigation = document.querySelector('#nav-menu');
const gallery = document.querySelector('.gallery');
const pageTitle = document.querySelector('#page-title');
const navLinks = document.querySelectorAll('#nav-menu a');

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;

menuButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    menuButton.classList.toggle('open');
});

const temples = [
    {
        templeName: "Lima Peru Temple",
        location: "Lima, Peru",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "images/temple1.webp"
    },
    {
        templeName: "Salt Lake Temple",
        location: "Salt Lake City, Utah, USA",
        dedicated: "1893, April, 6",
        area: 253000,
        imageUrl: "images/temple2.webp"
    },
    {
        templeName: "Arequipa Peru Temple",
        location: "Arequipa, Peru",
        dedicated: "2019, December, 15",
        area: 26969,
        imageUrl: "images/temple3.webp"
    },
    {
        templeName: "Rome Italy Temple",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        imageUrl: "images/temple4.webp"
    },
    {
        templeName: "Tokyo Japan Temple",
        location: "Tokyo, Japan",
        dedicated: "1980, October, 27",
        area: 52590,
        imageUrl: "images/temple5.webp"
    },
    {
        templeName: "Mexico City Mexico Temple",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "images/temple6.webp"
    },
    {
        templeName: "Paris France Temple",
        location: "Paris, France",
        dedicated: "2017, May, 21",
        area: 44000,
        imageUrl: "images/temple7.webp"
    },
    {
        templeName: "Bogotá Colombia Temple",
        location: "Bogotá, Colombia",
        dedicated: "1999, April, 24",
        area: 53500,
        imageUrl: "images/temple8.webp"
    },
    {
        templeName: "São Paulo Brazil Temple",
        location: "São Paulo, Brazil",
        dedicated: "1978, October, 30",
        area: 59246,
        imageUrl: "images/temple9.webp"
    },
    {
        templeName: "Payson Utah Temple",
        location: "Payson, Utah, USA",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "images/payson-utah-temple.webp"
    },
    {
        templeName: "Laie Hawaii Temple",
        location: "Laie, Hawaii, USA",
        dedicated: "1919, November, 27",
        area: 42100,
        imageUrl: "images/laie-hawaii-temple.webp"
    },
    {
        templeName: "Philadelphia Pennsylvania Temple",
        location: "Philadelphia, Pennsylvania, USA",
        dedicated: "2016, September, 18",
        area: 61466,
        imageUrl: "images/philadelphia-pennsylvania-temple.webp"
    }
];

function displayTemples(filteredTemples) {
    gallery.innerHTML = "";

    filteredTemples.forEach((temple) => {
        const card = document.createElement('section');
        card.classList.add('temple-card');

        const image = document.createElement('img');
        image.setAttribute('src', temple.imageUrl);
        image.setAttribute('alt', temple.templeName);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '400');
        image.setAttribute('height', '250');

        const cardContent = document.createElement('div');
        cardContent.classList.add('temple-card-content');

        const name = document.createElement('h2');
        name.textContent = temple.templeName;

        const location = document.createElement('p');
        location.innerHTML = `<span>Location:</span> ${temple.location}`;

        const dedicated = document.createElement('p');
        dedicated.innerHTML = `<span>Dedicated:</span> ${temple.dedicated}`;

        const area = document.createElement('p');
        area.innerHTML = `<span>Size:</span> ${temple.area.toLocaleString()} sq ft`;

        cardContent.appendChild(name);
        cardContent.appendChild(location);
        cardContent.appendChild(dedicated);
        cardContent.appendChild(area);

        card.appendChild(image);
        card.appendChild(cardContent);

        gallery.appendChild(card);
    });
}

function setActiveLink(selectedLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    selectedLink.classList.add('active');
}

document.querySelector('#home').addEventListener('click', (event) => {
    event.preventDefault();
    pageTitle.textContent = "Temple Album";
    setActiveLink(event.target);
    displayTemples(temples);
});

document.querySelector('#old').addEventListener('click', (event) => {
    event.preventDefault();
    pageTitle.textContent = "Old Temples";
    setActiveLink(event.target);
    const oldTemples = temples.filter(temple => parseInt(temple.dedicated) < 1900);
    displayTemples(oldTemples);
});

document.querySelector('#new').addEventListener('click', (event) => {
    event.preventDefault();
    pageTitle.textContent = "New Temples";
    setActiveLink(event.target);
    const newTemples = temples.filter(temple => parseInt(temple.dedicated) > 2000);
    displayTemples(newTemples);
});

document.querySelector('#large').addEventListener('click', (event) => {
    event.preventDefault();
    pageTitle.textContent = "Large Temples";
    setActiveLink(event.target);
    const largeTemples = temples.filter(temple => temple.area > 90000);
    displayTemples(largeTemples);
});

document.querySelector('#small').addEventListener('click', (event) => {
    event.preventDefault();
    pageTitle.textContent = "Small Temples";
    setActiveLink(event.target);
    const smallTemples = temples.filter(temple => temple.area < 10000);
    displayTemples(smallTemples);
});

displayTemples(temples);