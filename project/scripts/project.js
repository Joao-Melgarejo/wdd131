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

    if (!menuButton || !mainNav) {
        return;
    }

    menuButton.addEventListener("click", function () {
        const isOpen = mainNav.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", isOpen);
        menuButton.textContent = isOpen ? "✕" : "☰";
    });
}

function handleContactForm() {
    const form = document.querySelector("#contactForm");
    const responseBox = document.querySelector("#formResponse");

    if (!form || !responseBox) {
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const fullName = form.fullName.value.trim();
        const phone = form.phone.value.trim();
        const area = form.area.value.trim();
        const service = form.service.value.trim();
        const message = form.message.value.trim();

        if (!fullName || !phone || !area || !service || !message) {
            responseBox.className = "form-response error";
            responseBox.textContent = "Please complete all fields.";
            return;
        }

        responseBox.className = "form-response success";
        responseBox.textContent = `Thank you, ${fullName}. Your request was saved on this page.`;
        form.reset();
    });
}

function init() {
    setFooterInfo();
    setupMenu();
    handleContactForm();
}

init();
