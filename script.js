const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const year = document.querySelector("#year");
const reveals = document.querySelectorAll(".reveal");

if (year) year.textContent = new Date().getFullYear();

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

reveals.forEach((item) => observer.observe(item));

const leadForm = document.querySelector("#leadForm");
if (leadForm) {
  const submitButton = leadForm.querySelector('button[type="submit"]');
  const statusNode = document.createElement("p");
  statusNode.className = "form-note";
  statusNode.setAttribute("role", "status");
  statusNode.setAttribute("aria-live", "polite");
  leadForm.appendChild(statusNode);

  const setFormStatus = (message, isError = false) => {
    statusNode.textContent = message;
    statusNode.style.color = isError ? "#ffb4b4" : "#9cecff";
  };

  leadForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(leadForm);

    formData.set("_subject", "Novi upit sa sajta - Sajt za Biznis");
    formData.set("_template", "table");

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Slanje...";
    }

    setFormStatus("Šaljemo upit, sačekajte trenutak...");

    try {
      const response = await fetch(leadForm.action, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Slanje nije uspelo");
      }

      setFormStatus("Upit je uspešno poslat. Hvala, javićemo se uskoro.");
      leadForm.reset();
    } catch (_error) {
      setFormStatus(
        "Došlo je do greške pri slanju. Pokušajte ponovo ili pošaljite na sajtzabiznis@gmail.com.",
        true,
      );
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Pošalji upit";
      }
    }
  });
}
