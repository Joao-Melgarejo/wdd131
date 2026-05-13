const services = [
  {
    id: 1,
    name: "Servicio de Limpieza de Tanques",
    category: "maintenance",
    image: "images/service-1.webp",
    alt: "Servicio de limpieza de tanques",
    shortDescription:
      "Limpieza y mantenimiento de tanques de agua para mantener el sistema en mejor condición.",
    details:
      "Este servicio ayuda a remover suciedad y mejorar la condición del sistema de tanque de agua.",
  },
  {
    id: 2,
    name: "Detección de Fugas de Agua",
    category: "repair",
    image: "images/service-2.webp",
    alt: "Servicio de detección de fugas de agua",
    shortDescription:
      "Detección de fugas ocultas para reducir pérdida de agua y proteger la propiedad.",
    details:
      "Este servicio ayuda a encontrar fugas ocultas antes de que creen problemas estructurales más grandes.",
  },
  {
    id: 3,
    name: "Instalación y Reparación de Grifería",
    category: "repair",
    image: "images/service-3.webp",
    alt: "Instalación y reparación de grifería",
    shortDescription:
      "Instalación, reparación y reemplazo de sistemas de grifería en cocinas y baños.",
    details:
      "Este servicio incluye reparación, ajuste e instalación de grifería para hogares y negocios.",
  },
  {
    id: 4,
    name: "Instalación de Sistemas de Ducha",
    category: "installation",
    image: "images/service-4.webp",
    alt: "Instalación de sistemas de ducha",
    shortDescription:
      "Montaje e instalación de sistemas de ducha con trabajo de acabado cuidadoso.",
    details:
      "Este servicio incluye instalación y conexión de partes del sistema de ducha para uso diario.",
  },
];

const testimonials = [
  {
    name: "María Torres",
    role: "Gerente de restaurante",
    message:
      "El servicio fue claro y rápido. Fernando explicó el problema y lo resolvió el mismo día.",
  },
  {
    name: "Carlos Rojas",
    role: "Dueño de hogar",
    message:
      "Teníamos una fuga de agua en casa y el trabajo fue muy profesional. Quedé satisfecho con el resultado.",
  },
  {
    name: "Ana Paredes",
    role: "Cliente de negocio local",
    message:
      "Buena comunicación, atención puntual y una forma seria de trabajar. Recomiendo el servicio.",
  },
];

const businessWhatsAppNumber = "51936872862";

function setFooterInfo() {
  const yearElement = document.querySelector("#currentYear");
  const modifiedElement = document.querySelector("#lastModified");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  if (modifiedElement) {
    modifiedElement.textContent = `Última modificación: ${document.lastModified}`;
  }
}

function setupMenu() {
  const menuButton = document.querySelector("#menuButton");
  const mainNav = document.querySelector("#mainNav");

  if (!menuButton || !mainNav) return;

  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.textContent = isOpen ? "\u00d7" : "\u2630";
  });
}

function updateVisitorMessage() {
  const messageElement = document.querySelector("#visitorMessage");
  if (!messageElement) return;

  let visitCount = Number(localStorage.getItem("visitCount")) || 0;
  visitCount += 1;
  localStorage.setItem("visitCount", visitCount);

  if (visitCount === 1) {
    messageElement.textContent = `Bienvenido: esta es tu primera visita.`;
  } else if (visitCount === 2) {
    messageElement.textContent = `Nos alegra verte de nuevo. Esta es tu segunda visita.`;
  } else {
    messageElement.textContent = `Bienvenido de vuelta. Has visitado este sitio web ${visitCount} veces.`;
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

  const filteredServices =
    filter === "all"
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
  const matchingButton = document.querySelector(
    `.filter-btn[data-filter="${savedFilter}"]`,
  );

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
        ${secondary
          .map(
            (t) => `
          <article class="testimonial-card">
            <h3>${t.name}</h3>
            <span class="testimonial-role">${t.role}</span>
            <p>${t.message}</p>
          </article>
        `,
          )
          .join("")}
      </div>
    `;

  container.innerHTML = primaryHTML + secondaryHTML;
  container.classList.add("testimonials-layout");
}

function populateServiceOptions() {
  const serviceSelect = document.querySelector("#service");
  if (!serviceSelect) return;

  const optionsMarkup = services
    .map(
      (service) => `<option value="${service.name}">${service.name}</option>`,
    )
    .join("");

  serviceSelect.insertAdjacentHTML("beforeend", optionsMarkup);
}

function showSavedName() {
  const messageElement = document.querySelector("#savedNameMessage");
  if (!messageElement) return;

  const savedName = localStorage.getItem("clientName");
  if (savedName) {
    messageElement.textContent = `Bienvenido de vuelta, ${savedName}. Puedes actualizar tu solicitud a continuación.`;
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
      responseBox.textContent =
        "Por favor completa todos los campos antes de enviar el formulario.";
      return;
    }

    localStorage.setItem("clientName", fullName);
    localStorage.setItem("lastRequestedService", service);

    const urgencyMessage =
      urgency === "urgent"
        ? "Solicitud urgente"
        : "Servicio regular";

    const whatsappMessage = [
      "Hola Fernando, necesito un servicio de gasfitería.",
      `Nombre: ${fullName}`,
      `Teléfono: ${phone}`,
      `Zona: ${area}`,
      `Servicio: ${service}`,
      `Urgencia: ${urgencyMessage}`,
      `Descripción: ${message}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${businessWhatsAppNumber}?text=${encodeURIComponent(
      whatsappMessage,
    )}`;

    responseBox.className = "form-response success";
    responseBox.textContent =
      "Se abrirá WhatsApp con tu solicitud lista para enviar a Fernando.";

    window.open(whatsappUrl, "_blank", "noopener");

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
