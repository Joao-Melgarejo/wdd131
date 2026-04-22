const services = [
    {
        id: 1,
        name: "Limpieza de Tanque",
        category: "mantenimiento",
        image: "images/service-1.webp",
        alt: "Servicio de limpieza de tanque",
        shortDescription: "Limpieza y mantenimiento de tanques de agua para mantener el sistema en mejor estado.",
        details: "Este servicio ayuda a eliminar la suciedad y mejorar las condiciones del sistema del tanque de agua."
    },
    {
        id: 2,
        name: "Detección de Fugas",
        category: "reparación",
        image: "images/service-2.webp",
        alt: "Servicio de detección de fugas",
        shortDescription: "Detección de fugas ocultas para reducir la pérdida de agua y proteger la propiedad.",
        details: "Este servicio ayuda a encontrar fugas escondidas antes de que causen problemas estructurales mayores."
    },
    {
        id: 3,
        name: "Instalación y Reparación de Grifos",
        category: "reparación",
        image: "images/service-3.webp",
        alt: "Instalación y reparación de grifos",
        shortDescription: "Instalación, reparación y reemplazo de sistemas de grifos en cocinas y baños.",
        details: "Este servicio incluye reparación, ajuste e instalación de grifos para hogares y negocios."
    },
    {
        id: 4,
        name: "Instalación de Sistema de Ducha",
        category: "instalación",
        image: "images/service-4.webp",
        alt: "Instalación de sistema de ducha",
        shortDescription: "Montaje e instalación de sistemas de ducha con acabados cuidadosos.",
        details: "Este servicio incluye instalación y conexión de las partes del sistema de ducha para uso diario."
    }
];

const testimonials = [
    {
        name: "María Torres",
        role: "Administradora de restaurante",
        message: "El servicio fue claro y rápido. Fernando explicó el problema y lo solucionó el mismo día."
    },
    {
        name: "Carlos Rojas",
        role: "Propietario de casa",
        message: "Tuvimos una fuga en casa y el trabajo fue muy profesional. Quedé muy satisfecho con el resultado."
    },
    {
        name: "Ana Paredes",
        role: "Cliente de negocio local",
        message: "Buena comunicación, atención puntual y una forma seria de trabajar. Recomiendo el servicio."
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
        messageElement.textContent = `Bienvenido — esta es tu primera visita.`;
    } else if (visitCount === 2) {
        messageElement.textContent = `Qué gusto verte de nuevo. Esta es tu segunda visita.`;
    } else {
        messageElement.textContent = `Bienvenido de vuelta. Has visitado este sitio ${visitCount} veces.`;
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
        messageElement.textContent = `Bienvenido de nuevo, ${savedName}. Puedes actualizar tu solicitud abajo.`;
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
            responseBox.textContent = "Por favor completa todos los campos antes de enviar el formulario.";
            return;
        }

        localStorage.setItem("clientName", fullName);
        localStorage.setItem("lastRequestedService", service);

        const urgencyMessage = urgency === "urgente"
            ? "Entendemos que es una solicitud urgente."
            : "Tu solicitud fue guardada como servicio regular.";

        responseBox.className = "form-response success";
        responseBox.innerHTML = `Gracias, ${fullName}. Tu solicitud de <strong>${service}</strong> en ${area} ha sido guardada. ${urgencyMessage}`;

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
