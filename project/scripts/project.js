const services = [
    {
        id: 1,
        name: "Tank Cleaning Service",
        category: "maintenance",
        image: "images/service-1.webp",
        alt: "Tank cleaning service",
        shortDescription: "Cleaning and maintenance for water tanks to keep the system in better condition.",
        details: "This service helps remove dirt and improve the condition of the water tank system."
    },
    {
        id: 2,
        name: "Water Leak Detection",
        category: "repair",
        image: "images/service-2.webp",
        alt: "Water leak detection service",
        shortDescription: "Detection of hidden leaks to reduce water loss and protect the property.",
        details: "This service helps find hidden leaks before they create bigger structural problems."
    },
    {
        id: 3,
        name: "Faucet Installation and Repair",
        category: "repair",
        image: "images/service-3.webp",
        alt: "Faucet installation and repair",
        shortDescription: "Installation, repair, and replacement of faucet systems in kitchens and bathrooms.",
        details: "This service includes faucet repair, adjustment, and installation for homes and businesses."
    },
    {
        id: 4,
        name: "Shower System Installation",
        category: "installation",
        image: "images/service-4.webp",
        alt: "Shower system installation",
        shortDescription: "Assembly and installation of shower systems with careful finishing work.",
        details: "This service includes installation and connection of shower system parts for daily use."
    }
];

const testimonials = [
    {
        name: "María Torres",
        role: "Restaurant manager",
        message: "The service was clear and fast. Fernando explained the problem and solved it the same day."
    },
    {
        name: "Carlos Rojas",
        role: "Home owner",
        message: "We had a water leak at home and the work was very professional. I was happy with the result."
    },
    {
        name: "Ana Paredes",
        role: "Local business client",
        message: "Good communication, punctual attention, and a serious way of working. I recommend the service."
    }
];

function setFooterInfo() {
    const yearElement = document.querySelector("#currentYear");
    const modifiedElement = document.querySelector("#lastModified");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    if (modifiedElement) {
        modifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    }
}

function setupMenu() {
    const menuButton = document.querySelector("#menuButton");
    const mainNav = document.querySelector("#mainNav");

    if (!menuButton || !mainNav) return;

    menuButton.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", isOpen);
        menuButton.textContent = isOpen ? "✕" : "☰";
    });
}

function updateVisitorMessage() {
    const messageElement = document.querySelector("#visitorMessage");
    if (!messageElement) return;

    let visitCount = Number(localStorage.getItem("visitCount")) || 0;
    visitCount += 1;
    localStorage.setItem("visitCount", visitCount);

    if (visitCount === 1) {
        messageElement.textContent = `Welcome — this is your first visit.`;
    } else if (visitCount === 2) {
        messageElement.textContent = `Nice to see you again. This is your second visit.`;
    } else {
        messageElement.textContent = `Welcome back. You have visited this website ${visitCount} times.`;
    }
}

/* Alternating split layout for home page featured services */
function createServiceFeature(service) {
    return `
    <article class="service-feature">
      <div class="service-feature-img">
        <img src="${service.image}" alt="${service.alt}" loading="lazy" width="1024" height="1024">
      </div>
      <div class="service-feature-text">
        <span class="service-feature-tag">${service.category}</span>
        <h3>${service.name}</h3>
        <p>${service.shortDescription}</p>
        <p>${service.details}</p>
      </div>
    </article>
  `;
}

/* Compact horizontal card for services page grid */
function createServiceCard(service) {
    return `
    <article class="service-card">
      <img src="${service.image}" alt="${service.alt}" loading="lazy" width="1024" height="1024">
      <div class="service-card-content">
        <span class="service-tag">${service.category}</span>
        <h3>${service.name}</h3>
        <p>${service.shortDescription}</p>
        <p>${service.details}</p>
      </div>
    </article>
  `;
}

function renderFeaturedServices() {
    const container = document.querySelector("#featuredServices");
    if (!container) return;
    container.innerHTML = services.map(createServiceFeature).join("");
}

function renderAllServices(filter = "all") {
    const container = document.querySelector("#servicesContainer");
    if (!container) return;

    const filteredServices = filter === "all"
        ? services
        : services.filter((service) => service.category === filter);

    container.innerHTML = filteredServices.map(createServiceCard).join("");
}

function setupServiceFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    if (!filterButtons.length) return;

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter;
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
            renderAllServices(selectedFilter);
            localStorage.setItem("selectedServiceFilter", selectedFilter);
        });
    });

    const savedFilter = localStorage.getItem("selectedServiceFilter") || "all";
    const matchingButton = document.querySelector(`.filter-btn[data-filter="${savedFilter}"]`);

    if (matchingButton) {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        matchingButton.classList.add("active");
    }

    renderAllServices(savedFilter);
}

/* Primary (large, dark) + secondary (side cards) layout */
function renderTestimonials() {
    const container = document.querySelector("#testimonialsContainer");
    if (!container) return;

    const [primary, ...secondary] = testimonials;

    const primaryHTML = `
      <div class="testimonial-primary">
        <blockquote>${primary.message}</blockquote>
        <div class="testimonial-primary-divider"></div>
        <span class="testimonial-primary-name">${primary.name}</span>
        <span class="testimonial-primary-role">${primary.role}</span>
      </div>
    `;

    const secondaryHTML = `
      <div class="testimonials-secondary">
        ${secondary.map((t) => `
          <article class="testimonial-card">
            <h3>${t.name}</h3>
            <span class="testimonial-role">${t.role}</span>
            <p>${t.message}</p>
          </article>
        `).join("")}
      </div>
    `;

    container.innerHTML = primaryHTML + secondaryHTML;
    container.classList.add("testimonials-layout");
}

function populateServiceOptions() {
    const serviceSelect = document.querySelector("#service");
    if (!serviceSelect) return;

    const optionsMarkup = services
        .map((service) => `<option value="${service.name}">${service.name}</option>`)
        .join("");

    serviceSelect.insertAdjacentHTML("beforeend", optionsMarkup);
}

function showSavedName() {
    const messageElement = document.querySelector("#savedNameMessage");
    if (!messageElement) return;

    const savedName = localStorage.getItem("clientName");
    if (savedName) {
        messageElement.textContent = `Welcome back, ${savedName}. You can update your request below.`;
    }
}

function fillSavedName() {
    const nameInput = document.querySelector("#fullName");
    if (!nameInput) return;

    const savedName = localStorage.getItem("clientName");
    if (savedName) nameInput.value = savedName;
}

function handleContactForm() {
    const form = document.querySelector("#contactForm");
    const responseBox = document.querySelector("#formResponse");

    if (!form || !responseBox) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const fullName = form.fullName.value.trim();
        const phone = form.phone.value.trim();
        const area = form.area.value.trim();
        const service = form.service.value.trim();
        const urgency = form.urgency.value.trim();
        const message = form.message.value.trim();

        if (!fullName || !phone || !area || !service || !urgency || !message) {
            responseBox.className = "form-response error";
            responseBox.textContent = "Please complete all fields before sending the form.";
            return;
        }

        localStorage.setItem("clientName", fullName);
        localStorage.setItem("lastRequestedService", service);

        const urgencyMessage = urgency === "urgent"
            ? "We understand this is an urgent request."
            : "Your request has been saved as a regular service.";

        responseBox.className = "form-response success";
        responseBox.innerHTML = `Thank you, ${fullName}. Your request for <strong>${service}</strong> in ${area} has been saved. ${urgencyMessage}`;

        form.reset();
    });
}

function init() {
    setFooterInfo();
    setupMenu();
    updateVisitorMessage();
    renderFeaturedServices();
    renderTestimonials();
    setupServiceFilters();
    populateServiceOptions();
    showSavedName();
    fillSavedName();
    handleContactForm();
}

init();
